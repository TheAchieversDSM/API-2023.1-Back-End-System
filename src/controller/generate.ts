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

    await usuarioRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          nome: "Usuario 1",
          email: "usuario1@theAchievers.com",
          senha: passwordHash,
          tipoUsuario: 1
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
          tipo: () => "2",
          ativo: 1,
        },
        {
          nome: "Pluviosidade",
          fator: 10,
          offset: 10,
          formula: "10",
          unidadeDeMedida: () => "22",
          tipo: () => "4",
          ativo: 1,
        },
        {
          nome: "temperatura",
          fator: 10,
          offset: 10,
          formula: "2 + 2 = 4",
          unidadeDeMedida: () => "3",
          tipo: () => "1",
          ativo: 1,
        },
        {
          nome: "umidade",
          fator: 15,
          offset: 25,
          formula: "2 + 4 = 24",
          unidadeDeMedida: () => "9",
          tipo: () => "3",
          ativo: 1,
        },
      ])
      .execute();

    await estacaoRepository
      .createQueryBuilder()
      .insert()
      .into(Estacao)
      .values([
        {
          lati: -23.1626672200757,
          long: -45.797295066664,
          nome: "Estação Antonio",
          uid: "08B61F2AF460",
          UTC: "0",
          unixtime: Math.round(new Date().getTime() / 1000),
          ativo: 1,
        },
        {
          lati: -23.1626672200757,
          long: -45.797295066664,
          nome: "Estação Matheus",
          uid: "4022D875FD88",
          UTC: "0",
          unixtime: Math.round(new Date().getTime() / 1000),
          ativo: 1,
        },
      ])
      .execute();

    await DataBaseSource.createQueryBuilder()
      .insert()
      .into(`estacao_parametro`)
      .values([
        { estacaoEstacaoId: 1, parametroParametroId: 3 },
        { estacaoEstacaoId: 2, parametroParametroId: 4 },
      ])
      .execute();

    await alertaRepository
      .createQueryBuilder()
      .insert()
      .into(Alerta)
      .values([
        {
          nome: "Alerta de Temperatura 1",
          valorMax: -1,
          valorMinimo: 0,
          nivel: 1,
          parametro: () => "3",
          ativo: 1,
        },
        {
          nome: "Alerta de Temperatura 2",
          valorMax: 1,
          valorMinimo: 1.5,
          nivel: 2,
          parametro: () => "3",
          ativo: 1,
        },
        {
          nome: "Alerta de Temperatura 3",
          valorMax: 2,
          valorMinimo: 1.6,
          nivel: 3,
          parametro: () => "3",
          ativo: 1,
        },
        {
          nome: "Alerta de Umidade 1",
          valorMax: 0,
          valorMinimo: -1,
          nivel: 1,
          parametro: () => "4",
          ativo: 1,
        },
        {
          nome: "Alerta de Umidade 2",
          valorMax: -1.1,
          valorMinimo: -2,
          nivel: 2,
          parametro: () => "4",
          ativo: 1,
        },
        {
          nome: "Alerta de Umidade 3",
          valorMax: -2.1,
          valorMinimo: -3,
          nivel: 3,
          parametro: () => "4",
          ativo: 1,
        },
      ])
      .execute();

    console.log("Dados gerados com sucesso");
  } catch (error) {
    console.log("Erro ao gerar dados", error);
  }
};
