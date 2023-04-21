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

import * as bcrypt from "bcrypt";

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
    const passwordHash = await bcrypt.hash("secret", 8);

    // Criando dados

    await usuarioRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          nome: "Usuario 1",
          email: "usuario1@theAchievers.com",
          senha: passwordHash,
        },
      ])
      .execute();

    await TipoUnidadeMedida.createQueryBuilder()
      .insert()
      .into(UnidadeMedida)
      .values([
        { nome: "m/s" },
        { nome: "km/h" },
        { nome: "°C" },
        { nome: "°F" },
        { nome: "K" },
        { nome: "mm/h" },
        { nome: "V" },
        { nome: "g/m³" },
        { nome: "%" },
        { nome: "Pa" },
        { nome: "N/m²" },
        { nome: "mb" },
        { nome: "mmHg" },
        { nome: "N" },
        { nome: "NE" },
        { nome: "E" },
        { nome: "SE" },
        { nome: "S" },
        { nome: "SW" },
        { nome: "W" },
        { nome: "NW" },
        { nome: "mm" },
        { nome: "L/m²" },
        { nome: "J/m²" },
        { nome: "Wh/m²" },
      ])
      .execute();

    await parametroRepository
      .createQueryBuilder()
      .insert()
      .into(Parametro)
      .values([
        {
          nome: "Velocidade do Vento",
          fator: 8,
          offset: 5,
          formula: "1 + 1 = 2",
          unidadeDeMedida: () => "2",
        },
        {
          nome: "temperatura",
          fator: 10,
          offset: 10,
          formula: "2 + 2 = 4",
          unidadeDeMedida: () => "3",
        },
        {
          nome: "Pluviosidade",
          fator: 10,
          offset: 10,
          formula: "10",
          unidadeDeMedida: () => "22",
        },
      ])
      .execute();

    await tipoParametroRepository
      .createQueryBuilder()
      .insert()
      .into(TipoParametro)
      .values([
        {
          nome: "temperatura",
        },
        {
          nome: "Velocidade do Vento",
        },
        {
          nome: "Direção do Vento",
        },
        {
          nome: "Pluviômetro",
        },
        {
          nome: "Bateria",
        },
        {
          nome: "Umidade Relativa do Ar",
        },
        {
          nome: "Pressão Atmosférica",
        },
        {
          nome: "Precipitação (chuva)",
        },
        {
          nome: "Radiação Solar Global",
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
          unixtime: 1617062877,
        },
        {
          valorMedido: "20",
          unixtime: 1617062877,
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
          unixtime: 1617062877,
        },
        {
          nome: "Fatec_SJC",
          uid: "08B61F2AF460",
          UTC: "UTC-3",
          lati: 10,
          long: 10,
          unixtime: 1617062877,
        },
        {
          nome: "Estação 2",
          uid: "123",
          UTC: "UTC-3",
          lati: 15,
          long: 10,
          unixtime: 1617062877, 
        },
      ])
      .execute();

    await reportRepository
      .createQueryBuilder()
      .insert()
      .into(Report)
      .values([
        {
          unixtime: 1617062877,
          alerta: () => "1",
        },
      ])
      .execute();

    // Relacionando dados

    parametroRepository
      .createQueryBuilder()
      .update(Parametro)
      .set({
        tipo: () => "2",
      })
      .where("parametro_id = :id", {
        id: 1,
      })
      .execute();

    await DataBaseSource.createQueryBuilder()
      .insert()
      .into("alerta_medida")
      .values([
        {
          alertaAlertaId: 1,
          medidaMedidaId: 1,
        },
      ])
      .execute();

    await DataBaseSource.createQueryBuilder()
      .insert()
      .into("estacao_parametro")
      .values([
        { parametroParametroId: 1, estacaoEstacaoId: 1 },
        { parametroParametroId: 2, estacaoEstacaoId: 1 },
        { parametroParametroId: 3, estacaoEstacaoId: 1 },
        { parametroParametroId: 3, estacaoEstacaoId: 2 },
      ])
      .execute();

    medidaRepository
      .createQueryBuilder()
      .update(Medida)
      .set({
        parametros: () => "1",
      })
      .where("medida_id = :id", { id: 1 })
      .execute();
    console.log("Dados gerados com sucesso");
  } catch (error) {
    console.log("Erro ao gerar dados", error);
  }
};
