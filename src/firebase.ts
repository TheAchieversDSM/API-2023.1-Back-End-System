import { ref, Query as ReferenceQuery, limitToLast, update, onChildAdded, off, DatabaseReference, orderByChild, set, equalTo, query } from "firebase/database";
import { Dados, IAlertas, IEstacoes, IParametro, IParametros, MedidaConvertidas, ReturnValuesEstacao } from "./interfaces/interfaces";
import { Alerta, Estacao, Medida, Parametro, Report } from "./models";
import { DataBaseSource } from "./config/database";
import { createClientRedis } from './config/redis'
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { DeepPartial } from "typeorm";



const firebaseConfig = {
  apiKey: "AIzaSyCgfuy3kgkBEVOyZT556tZKKnSjWJGndNo",
  authDomain: "tecsus-59210.firebaseapp.com",
  databaseURL: "https://tecsus-59210-default-rtdb.firebaseio.com",
  projectId: "tecsus-59210",
  storageBucket: "tecsus-59210.appspot.com",
  messagingSenderId: "330289243582",
  appId: "1:330289243582:web:5c8b9e1502bba0642985ef",
};

const app = initializeApp(firebaseConfig);
const rt = getDatabase(app);

try {
  createClientRedis.connect()
  DataBaseSource.initialize().then(() => RealTimeDataBase())
} catch (err) {
  console.log("err", err);
}

export async function RealTimeDataBase() {
  const refRealTime = ref(rt, `esp32TEMP/`);
  const onChildAdd = onChildAdded(refRealTime, (snapShot) => {
    const uidGataWay: string | null = snapShot.key;
    const refRealTime: DatabaseReference = ref(rt, `esp32TEMP/${uidGataWay}`);
    const queryRealTime: ReferenceQuery = query( refRealTime, limitToLast(1), orderByChild("enviado"), equalTo(false) );
    const updateValuesGataway = onChildAdded(queryRealTime,
      async (updateSnapShot) => {
        const updateBooleanValue: string | null = updateSnapShot.key;
        const referenceUpdate: DatabaseReference = ref( rt, `esp32TEMP/${uidGataWay}/${updateBooleanValue}` );
        const values: Dados | any = updateSnapShot.exists() ? updateSnapShot.val() : null;
        InsertDataToMySQL(values, referenceUpdate);
      }
    );
    off(refRealTime, "value", updateValuesGataway);
  });
  off(refRealTime, "value", onChildAdd);
}

async function InsertDataToMySQL(valores: Dados, reference: DatabaseReference) {
  const GataWayUid: string = valores._uid;
  const GataWayUnixTime: string = valores._unixtime;
  const GetGataWayUid = await GetEstacaoUid(GataWayUid).then((res) => res);
  if (GetGataWayUid !== null) {
    const GetMedidaConvertidas = await CalcularOffSetAndFator( valores, GataWayUid, GataWayUnixTime, reference );
    await InsertMedida(valores, GetGataWayUid, GetMedidaConvertidas, reference);
    await InsertReport(GetMedidaConvertidas, GataWayUid, GataWayUnixTime);
  }
}

async function InsertMedida( valores: Dados, estacao: ReturnValuesEstacao, conversao: MedidaConvertidas[], reference: DatabaseReference ) {
  try {
    valores.parametros.map(async (values) => {
      const parametros = await GetParametro( values, estacao.uid, valores._unixtime, reference ).then((res) => res);
      const filterConversaoNotUnderfined = conversao.filter((i) => i !== undefined && parametros?.nome === i.parametro).map((i) => i.conversao);
      const medidaRepository = DataBaseSource.getRepository(Medida);
      if (parametros !== undefined) {
        const insertMedidas = medidaRepository.create({ estacao: Number(estacao.id), unixtime: valores._unixtime, valorMedido: filterConversaoNotUnderfined[0], parametros: parametros.parametro_id, } as unknown as DeepPartial<Report>);
        await medidaRepository.save(insertMedidas);
      }
    });
    update(reference, {enviado: true});
  } catch (error) {
    console.log(`Erro a  o inserir no banco a medida`, error);
  }
}

async function InsertReport(values: any, uid: string, unixtime: string) {
  try {
    const GetAlertas = await GetAlerta(values);
    GetAlertas?.filter(async (valores) => {
      const reportRepository = DataBaseSource.getRepository(Report);
      if (valores !== undefined) {
        const createReport = reportRepository.create({ estacao_uid: uid, alerta: valores.alertaId, msg: `Parametro: ${valores.nomeParametro}, ${   Number(valores.valorMedido) > valores.valorMaximo     ? `Valor Maximo: ${valores.valorMaximo} `     : `Valor Minimo: ${valores.valorMinimo} ` }, UID: ${uid}`, nivelAlerta: valores.nivel, tipoParametro: valores.parametroId, unixtime: Number(unixtime), valorEmitido: valores.valorMedido, } as unknown as DeepPartial<Report>);
        await reportRepository.save(createReport);
        await RedisInsertAlert( uid, unixtime, valores.nomeParametro, valores.nivel, String(valores.valorMedido) );
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function GetAlerta(medidaConvertidas: MedidaConvertidas[]) {
  const alertaRepositorio = DataBaseSource.getRepository(Alerta);
  try {
    const returnAlertas = await Promise.all(medidaConvertidas.map(async (i) => {
        if (i !== undefined) {
          const records: IAlertas | any = await alertaRepositorio.createQueryBuilder("alerta").select(["alerta", "parametro"]).leftJoin("alerta.parametro", "parametro").where("parametro.nome = :nome", {nome: i.parametro}).andWhere(  "alerta.valorMax >= :conversao AND alerta.valorMinimo <= :conversao",  {conversao: Number(i.conversao)}).getOne();
          if (records !== null) {
            return { alertaId: records?.alerta_id, parametroId: records?.parametro.parametro_id, nomeParametro: records?.parametro.nome, valorMaximo: records?.valorMax, valorMinimo: records?.valorMinimo, nivel: records?.nivel, valorMedido: i.conversao, };
          }
        }
      })
    );
    return returnAlertas;
  } catch (error) {
    console.log(error);
  }
}

const GetParametro = async ( parametroNome: IParametros, estacao: string, unixtime: string, reference: DatabaseReference ) => {
  const parametroRepository = DataBaseSource.manager.getRepository(Parametro);
  try {
    const resultados = await parametroRepository.find({
      where: { nome: parametroNome._nomeParametro },
    });
    if (resultados.length !== 0) {
      const objetosFormatados = resultados.map((result: IParametro) => {
        return { ativo: result.ativo, fator: result.fator, formula: result.formula, nome: result.nome, offset: result.offset, parametro_id: result.parametro_id, };
      });
      return objetosFormatados[0];
    } else {
      await ParametroDosentExist(parametroNome, unixtime, estacao, reference);
    }
  } catch (error) {
    console.log(error);
  }
};

const GetEstacaoUid = async (uid: string) => {
  const estacaoRepository = DataBaseSource.manager.getRepository(Estacao);
  try {
    const resultados: IEstacoes | any = await estacaoRepository.find({
      where: {uid: uid},
    });
    if (resultados.length !== 0) {
      const objetosFormatados = resultados.map(
        (resultado: {uid: string; estacao_id: number; nome: string}) => {
          return { uid: resultado.uid, id: resultado.estacao_id, nome: resultado.nome };
        }
      );
      return objetosFormatados[0];
    } else {
      const unixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      await RedisEstacaoDosentExist(uid, unixTimeInSeconds);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

async function GetLastValue(parametroId: number){
  const lastValueRepositoy = DataBaseSource.manager.getRepository(Medida);
  try {
    const getLastValue: any = lastValueRepositoy
    .createQueryBuilder("medida")
    .select("medida.valorMedido")
    .where("medida.parametrosParametroId = :parametro_id", { parametro_id: parametroId })
    .orderBy("medida.unixtime", 'DESC')
    .limit(1)
    const result = await getLastValue.getOne();
    if( result !== null && result.valorMedido !== 0 ){
      return { last: result.valorMedido }
    }else{
      return { last: 0 }
    }
  } catch (error) {
    console.log(error)
  }
}

async function CalcularOffSetAndFator(values: Dados, estacao: string, unixtime: string, reference: DatabaseReference) {
  const conversao: MedidaConvertidas[] | any = await Promise.all(
    values.parametros.map(async (valores: IParametros) => {
      const returnParametro = await GetParametro(valores,estacao,unixtime,reference).then((res) => res);
      if( returnParametro?.nome == valores._nomeParametro && valores._nomeParametro === "chuva" ){
        console.log(valores._medida)
        if( Number(valores._medida) === 0 ){
          const matematica = 0;
          return {conversao: matematica, parametro: returnParametro.nome}
        }else{
          const last = await GetLastValue(returnParametro.parametro_id).then((res) => res?.last)
          const matematica = last === 0 ? Number(valores._medida) : (Number(valores._medida) - last ).toFixed(2)
          return {conversao: matematica, parametro: returnParametro.nome}
        }
      }
      if (returnParametro?.nome == valores._nomeParametro) {
        const matematica = Number(valores._medida);
        return {conversao: matematica, parametro: returnParametro.nome};
      }
    })
  );
  return conversao;
}

async function RedisInsertAlert(uid: string,ut: string,parametro: string,nivelAlerta: number,valor: string) {
  createClientRedis.hSet(`${uid}:${ut}`, { estacao: uid, tempo: ut, parametro: parametro, nivel: nivelAlerta, valor: valor,  });
  createClientRedis.expire(`${uid}:${ut}`, 120);
}

async function RedisEstacaoDosentExist(uid: string, ut: number | string) {
  createClientRedis.hSet(`${uid}:not_exist`, { estacao: uid, unixtime: ut, msg: `Estação com o UID '${uid}' não está cadastrada no sistema` })
  createClientRedis.expire(`${uid}:not_exist`, 60);
}

async function ParametroDosentExist(parametro: IParametros, ut: number | string, estacao: string, reference: DatabaseReference){
  createClientRedis.hSet(`${parametro._nomeParametro}:not_exist`, { parametro: parametro._nomeParametro, unixtime: ut, msg: `O Parametro '${parametro._nomeParametro}' não existe`, });
  createClientRedis
    .expire(`${parametro._nomeParametro}:not_exist`, 60)
    .then(() => {
      set(ref(rt, `backups_inserts_failed/${estacao}/${reference.key}`), { _unixtime: ut, _uid: estacao, enviado: false, parametros: {...parametro}, });
    });
}