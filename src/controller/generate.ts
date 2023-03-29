import { DataBaseSource } from "../config/database";
import {
  Alerta,
  Estacao,
  Parametro,
  Medida,
  TipoParametro,
  Report,
  User,
  UnidadeMedida,
} from "./../models/index";

const alertaRepository = DataBaseSource.getRepository(Alerta);
const estacaoRepository = DataBaseSource.getRepository(Estacao);
const parametroRepository = DataBaseSource.getRepository(Parametro);
const medidaRepository = DataBaseSource.getRepository(Medida);
const tipoParametroRepository = DataBaseSource.getRepository(TipoParametro);
const reportRepository = DataBaseSource.getRepository(Report);
const usuarioRepository = DataBaseSource.getRepository(User);
const TipoUnidadeMedida = DataBaseSource.getRepository(UnidadeMedida);

export const generate = async () => {
  try {
    console.log("Dados gerados com sucesso");

    // Criando dados

    await usuarioRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          nome: "Usuario 1",
          email: "usuario1@theAchievers.com",
          senha: "123",
        },
      ])
      .execute();

    await TipoUnidadeMedida.createQueryBuilder()
      .insert()
      .into(UnidadeMedida)
      .values([{ nome: "m/s" }])
      .execute();

    await parametroRepository
      .createQueryBuilder()
      .insert()
      .into(Parametro)
      .values([
        {
          nome: "Parâmetro 1",
          fator: 8,
          offset: 5,
          formula: "1 + 1 = 2",
          unidadeDeMedida: () => "1",
        },
        {
          nome: "Parâmetro 2",
          fator: 10,
          offset: 10,
          formula: "2 + 2 = 4",
          unidadeDeMedida: () => "1",
        },
        {
          nome: "Parâmetro 3",
          fator: 10,
          offset: 10,
          formula: "10",
          unidadeDeMedida: () => "1",
        },
      ])
      .execute();

    await tipoParametroRepository
      .createQueryBuilder()
      .insert()
      .into(TipoParametro)
      .values([
        {
          nome: "Chuva",
        },
        {
          nome: "Vento",
        },
      ])
      .execute();

    await medidaRepository
      .createQueryBuilder()
      .insert()
      .into(Medida)
      .values([
        {
          valorMedido: "10",
          unixtime: 10,
        },
        {
          valorMedido: "20",
          unixtime: 20,
        },
      ])
      .execute();

    await alertaRepository
      .createQueryBuilder()
      .insert()
      .into(Alerta)
      .values([
        {
          nome: "Alerta 1",
          valorMax: 10,
          valorMinimo: 2,
          nivel: 1,
        },
        {
          nome: "Alerta 2",
          valorMax: 5,
          valorMinimo: 1,
          nivel: 2,
        },
      ])
      .execute();

    await estacaoRepository
      .createQueryBuilder()
      .insert()
      .into(Estacao)
      .values([
        {
          nome: "Estação 1",
          uid: "123456",
          UTC: "UTC-3",
          lati: 10,
          long: 10,
          unixtime: 10,
        },
        {
          nome: "Estação 2",
          uid: "123",
          UTC: "UTC-3",
          lati: 15,
          long: 10,
          unixtime: 1454,
        },
      ])
      .execute();

    await reportRepository
      .createQueryBuilder()
      .insert()
      .into(Report)
      .values([
        {
          unixtime: 123,
          nivel: 1,
          alerta: () => "1",
        },
      ])
      .execute();

    // Relacionando dados

    parametroRepository
      .createQueryBuilder()
      .update(Parametro)
      .set({
        tipo: () => "1",
      })
      .where("id = :id", {
        id: 1,
      })
      .execute();

    await DataBaseSource.createQueryBuilder()
      .insert()
      .into("alerta_medida")
      .values([
        {
          alertaId: 1,
          medidaId: 1,
        },
      ])
      .execute();

    medidaRepository
      .createQueryBuilder()
      .update(Medida)
      .set({
        parametros: () => "1",
      })
      .where("id = :id", { id: 1 })
      .execute();
  } catch (error) {
    console.log("Erro ao gerar dados");
  }
};
