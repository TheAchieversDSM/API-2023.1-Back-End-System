import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Estacao } from "../models";
import { Parametro } from "../models/Parametro";

dotenv.config();

export const DataBaseSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [Estacao, Parametro],
});
