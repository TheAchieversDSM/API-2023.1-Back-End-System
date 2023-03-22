import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import {
  Estacao,
  Alerta,
  User,
  Parametro,
  EstacaoParametro,
  TipoParametro,
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
  logging: true,
  entities: [Estacao, Alerta, Parametro, User, EstacaoParametro, TipoParametro],
});
