import { rt } from "../config/firebase";
import {
  onValue,
  ref,
  onChildChanged,
  query,
  limitToLast,
  orderByKey,
} from "firebase/database";
import { DataBaseSource } from "../config/database";
import { Alerta, Estacao, Medida, Report } from "../models/index";
import EventEmitter from "events";
import { createClientRedis } from "../config/redis";
const alertaRepository = DataBaseSource.getRepository(Alerta);
const medidaRepository = DataBaseSource.getRepository(Medida);
const reportRepository = DataBaseSource.getRepository(Report);
const estacaoRepository = DataBaseSource.getRepository(Estacao);

const myEmitter = new EventEmitter();

myEmitter.on("start", () => {
  DataBaseSource.initialize().then(() => {
    RealTime();
  });
});
myEmitter.emit("start");

interface IAlertas {
  alerta_id: number;
  nome: string;
  valorMax: number;
  valorMinimo: number;
  nivel: number;
  parametro: {
    parametro_id: number;
    nome: string;
    formula: string;
    fator: number;
    offset: number;
  };
}

interface IEstacoes {
  estacao_id: string;
  nome: string;
  uid: string;
}
const GetAlerta = async (nome: string) => {
  try {
    const resultados: IAlertas | any = await alertaRepository.find({
      where: {
        parametro: {
          nome: nome,
        },
      },
      relations: {
        parametro: true,
      },
    });
    const objetosFormatados = resultados.map(
      (resultado: {
        valorMax: number;
        parametro: { parametro_id: number; nome: string };
        alerta_id: number;
        nome: string;
        valorMinimo: number;
        nivel: number;
      }) => {
        return {
          max: resultado.valorMax,
          nivel: resultado.nivel,
          min: resultado.valorMinimo,
          id_parametro: resultado?.parametro?.parametro_id,
          id: resultado.alerta_id,
          nome_alerta: resultado.nome,
          nome_parametro: resultado.parametro.nome,
        };
      }
    );
    return objetosFormatados;
  } catch (error) {
    console.log(error);
  }
};

const GetEstacaoUid = async (uid: string) => {
  try {
    const resultados: IEstacoes | any = await estacaoRepository.find({
      where: {
        uid: uid,
      },
    });
    const objetosFormatados = resultados.map(
      (resultado: { uid: string; estacao_id: number; nome: string }) => {
        return {
          uid: resultado.uid,
          id: resultado.estacao_id,
          nome: resultado.nome,
        };
      }
    );
    return objetosFormatados;
  } catch (error) {
    console.log(error);
  }
};

export default function RealTime() {
  let refData = ref(rt, `esp32/`);
  onChildChanged(refData, (onSnapShot) => {
    refData = ref(rt, `esp32/${onSnapShot.key}`);
    const latestValue = query(refData, orderByKey(), limitToLast(1));
    const promise = new Promise((resolve, reject) => {
      onValue(
        latestValue,
        (obj) => {
          const latestKey = Object.keys(obj.val())[0];
          resolve(obj.child(latestKey).val());
        },
        reject
      );
    });
    promise
      .then(async (value: any) => {
        value = String(value).split("_");
        const alertasMedidas = await GetAlerta(value[2]);
        const getEstacaoByUid = await GetEstacaoUid(String(onSnapShot.key));
        const medida = medidaRepository.create({
          parametros: alertasMedidas[0]["id_parametro"],
          estacao: getEstacaoByUid[0]["id"],
          unixtime: value[0],
          valorMedido: value[1],
        });
        await medidaRepository.save(medida);

        const matchingAlerts = alertasMedidas.filter(
          (itens: any) => value[1] >= itens.min && value[1] <= itens.max
        );
        for (const alert of matchingAlerts) {
          const createReports = reportRepository.create({
            nivelAlerta: alert.nivel,
            tipoParametro: value[2],
            valorEmitido: value[1],
            alerta: alert.id,
            msg: `Parametro: ${value[2]}, ${
              value[1] > alert.max
                ? `Valor Maximo: ${value[1]} `
                : `Valor Minimo: ${value[1]} `
            }, UID: ${onSnapShot.key}`,
            unixtime: value[0],
            estacao_uid: String(onSnapShot.key),
          });
          await reportRepository.save(createReports);
          await RedisInsertAlert(
            String(onSnapShot.key),
            value[0],
            value[2],
            alert.id,
            value[1]
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

async function RedisInsertAlert(
  uid: string,
  ut: string,
  parametro: string,
  nivelAlerta: string,
  valor: string
) {
  if (!createClientRedis.connect()) {
    await createClientRedis.connect();
  }
  await createClientRedis.hSet(`${uid}:${ut}`, {
    estacao: uid,
    tempo: ut,
    parametro: parametro,
    nivel: nivelAlerta,
    valor: valor,
  });
  createClientRedis.expire(`${uid}:${ut}`, 120);
  createClientRedis.quit();
}
