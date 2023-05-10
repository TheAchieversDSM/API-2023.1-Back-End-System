import { rt } from "../config/firebase";
import {
  ref,
  query,
  limitToLast,
  orderByKey,
  update,
  onChildAdded,
  off,
  remove,
} from "firebase/database";
import { DataBaseSource } from "../config/database";
import EventEmitter from "events";

import {
  Dados,
  IAlertas,
  IEstacoes,
  ReturnValuesAlertas,
  ReturnValuesEstacao,
} from "../interfaces/interfaces";
import { DeepPartial } from "typeorm";
import { Alerta, Estacao, Medida, Report } from "../models";
import { createClientRedis } from "../config/redis";

const myEmitter = new EventEmitter();

myEmitter.on("start", () => {
  console.log("Start Worker FireBase");
  createClientRedis.connect();
  DataBaseSource.initialize().then(() => {
    RealTimeDataBase();
  });
});
myEmitter.emit("start");

export async function RealTimeDataBase() {
  const refRealTime = ref(rt, `esp32TEMP/`);
  onChildAdded(refRealTime, async (querySnapshot) => {
    if (querySnapshot.exists()) {
      const dispositivoId = querySnapshot.key;
      const refRealTime = ref(rt, `esp32TEMP/${dispositivoId}`);
      const queryReference = query(refRealTime, orderByKey(), limitToLast(1));
      const onChildDispositivo = onChildAdded(
        queryReference,
        async (snapshot) => {
          console.log(new Date());
          const lastValue: Dados | null = snapshot.exists()
            ? snapshot.val()
            : null;
          const getawayUid: ReturnValuesEstacao = await GetEstacaoUid(
            String(dispositivoId),
            String(snapshot.key)
          ).then((res) => res);
          const alerta: ReturnValuesAlertas[] = await GetAlerta(
            String(lastValue?._nomeParametro)
          ).then((res) => res);
          await InsertIntoMedidas(getawayUid, alerta, lastValue);
        }
      );
      off(queryReference, "child_added", onChildDispositivo);
    }
  });
}

/* Funções envolvendo data-source */
const GetAlerta = async (nome: string) => {
  const alertaRepository = DataBaseSource.getRepository(Alerta);
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
    if (resultados.length !== 0) {
      const objetosFormatados = resultados.map(
        (resultado: {
          valorMax: number;
          parametro: {
            parametro_id: number;
            nome: string;
            offset: number;
            fator: number;
          };
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
            offset_parametro: resultado.parametro.offset,
            fator_parametro: resultado.parametro.fator,
          };
        }
      );
      return objetosFormatados;
    } else {
      console.log("Cadastre um Alerta com o parametro: ", nome);
    }
  } catch (error) {
    console.log(error);
  }
};

const GetEstacaoUid = async (uid: string, key: string) => {
  const estacaoRepository = DataBaseSource.manager.getRepository(Estacao);
  try {
    const resultados: IEstacoes | any = await estacaoRepository.find({
      where: {
        uid: uid,
      },
    });
    if (resultados.length !== 0) {
      const objetosFormatados = resultados.map(
        (resultado: { uid: string; estacao_id: number; nome: string }) => {
          return {
            uid: resultado.uid,
            id: resultado.estacao_id,
            nome: resultado.nome,
          };
        }
      );
      return objetosFormatados[0];
    } else {
      console.log("Porfavor, cadastre a estação com o UID", uid);
      const unixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      RedisEstacaoDosentExist(uid, unixTimeInSeconds);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};


async function InsertIntoMedidas(
  estation: ReturnValuesEstacao,
  alerts: ReturnValuesAlertas[],
  values: Dados | null
) {
  const medidaRepository = DataBaseSource.getRepository(Medida);
  if (values !== null && estation !== null && alerts !== null) {
    const conversao = (
      Number(values?._medida) * alerts[0].fator_parametro +
      1 * alerts[0].offset_parametro
    ).toFixed(2);
    const medida = medidaRepository.create({
      parametros: alerts[0]?.id_parametro,
      unixtime: values?._unixtime,
      valorMedido: conversao,
      estacao: estation.id,
    } as unknown as DeepPartial<Medida>);
    await medidaRepository.save(medida);
    await CreateReports(estation, conversao, alerts, values);
  }
}

async function CreateReports(
  estation: ReturnValuesEstacao,
  conversao: string,
  alerts: ReturnValuesAlertas[],
  values: Dados | null
) {
  const reportRepository = DataBaseSource.getRepository(Report);

  const matchingAlerts = alerts.filter(
    (itens: any) =>
      Number(conversao) >= itens.min && Number(conversao) <= itens.max
  );
  if (matchingAlerts.length !== 0) {
    const report = reportRepository.create({
      alerta: matchingAlerts[0].id,
      estacao_uid: estation.uid,
      msg: `Parametro: ${values?._nomeParametro}, ${
        Number(conversao) > matchingAlerts[0].max
          ? `Valor Maximo: ${matchingAlerts[0].max} `
          : `Valor Minimo: ${matchingAlerts[0].min} `
      }, UID: ${estation.uid}`,
      nivelAlerta: matchingAlerts[0].nivel,
      tipoParametro: values?._nomeParametro,
      unixtime: values?._unixtime,
      valorEmitido: conversao,
    } as unknown as DeepPartial<Report>);
    await reportRepository.save(report);
    await RedisInsertAlert(
      estation.uid,
      String(values?._unixtime),
      String(values?._nomeParametro),
      matchingAlerts[0].nivel,
      conversao
    );
  }
}
/* Redis */
async function RedisInsertAlert(
  uid: string,
  ut: string,
  parametro: string,
  nivelAlerta: number,
  valor: string
) {
  await createClientRedis.hSet(`${uid}:${ut}`, {
    estacao: uid,
    tempo: ut,
    parametro: parametro,
    nivel: nivelAlerta,
    valor: valor,
  });
  createClientRedis.expire(`${uid}:${ut}`, 120);
}

async function RedisEstacaoDosentExist(uid: string, ut: number | string) {
  await createClientRedis.hSet(`${uid}:${ut}:not_exist`, {
    estacao: uid,
    unixtime: ut,
    msg: `Estação com o UID: ${uid} não está cadastrada no sistema`,
  });
  createClientRedis.expire(`${uid}:${ut}`, 60);
}

/* Melhorar */
async function DeleteResultFromFirebase(uid: string, key: string) {
  try {
    await update(ref(rt, `esp32TEMP/${uid}/${key}`), {
      _medida: null,
      _nomeParametro: null,
      _unixtime: null,
    })
      .then(() => console.log("Item Removido"))
      .catch((err) => console.log(err));
    return;
  } catch (error) {
    console.log(error);
  }
}
