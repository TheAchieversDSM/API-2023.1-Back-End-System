import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import {
  Estacao,
  Alerta,
  User,
  Parametro,
  TipoParametro,
  Medida,
  Report,
  UnidadeMedida,
} from "../models";

dotenv.config();

export const DataBaseSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [Estacao, Alerta, Parametro, User, TipoParametro, Medida, Report, UnidadeMedida],
});
