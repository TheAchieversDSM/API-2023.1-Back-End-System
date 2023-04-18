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

import { Alerta, Estacao, Medida, Report, User } from "../models/index";
const alertaRepository = DataBaseSource.getRepository(Alerta);
const medidaRepository = DataBaseSource.getRepository(Medida);
const reportRepository = DataBaseSource.getRepository(Report);
const estacaoRepository = DataBaseSource.getRepository(Estacao);

interface teste {
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

interface estacao {
  estacao_id: string;
  nome: string;
  uid: string;
}
const TesteDeGet = async (nome: string) => {
  const resultados: teste | any = await alertaRepository.find({
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
      valorMax: any;
      parametro: { parametro_id: any; nome: any };
      alerta_id: any;
      nome: any;
      valorMinimo: any;
    }) => {
      return {
        max: resultado.valorMax,
        min: resultado.valorMinimo,
        id_parametro: resultado?.parametro?.parametro_id,
        id: resultado.alerta_id,
        nome_alerta: resultado.nome,
        nome_parametro: resultado.parametro.nome,
      };
    }
  );
  return objetosFormatados;
};

const GetEstacaoUid = async (uid: string) => {
  const resultados: estacao | any = await estacaoRepository.find({
    where: {
      uid: uid,
    },
  });
  const objetosFormatados = resultados.map(
    (resultado: { uid: any; estacao_id: any; nome: any }) => {
      return {
        uid: resultado.uid,
        id: resultado.estacao_id,
        nome: resultado.nome,
      };
    }
  );
  return objetosFormatados;
};

export const RealTime = () => {
  console.log("Oi");
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
        const alertasMedidas = await TesteDeGet(value[2]);
        const getEstacaoByUid = await GetEstacaoUid(String(onSnapShot.key));
        if (
          value[1] > alertasMedidas[0]["max"] ||
          value[1] < alertasMedidas[0]["min"]
        ) {
          console.log("Gerando Report");
          const testando = reportRepository.create({
            alerta: alertasMedidas[0]["id"],
            msg: `Parametro: ${value[2]}, ${
              value[1] > alertasMedidas[0]["max"]
                ? `Valor Maximo: ${value[1]} `
                : `Valor Minimo: ${value[1]} `
            }, Data: ${value[0]}`,
            unixtime: value[0],
          });
          /* Medida: ${value[1]} */
          await reportRepository.save(testando);
        }
        const medida = medidaRepository.create({
          parametros: alertasMedidas[0]["id_parametro"],
          estacao: getEstacaoByUid[0]["id"],
          unixtime: value[0],
          valorMedido: value[1],
        });
        await medidaRepository.save(medida);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
