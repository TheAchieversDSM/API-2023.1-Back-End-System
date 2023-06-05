import {createClientRedis} from "./config/redis";
import {DataBaseSource} from "./config/database";
import {generate} from "./controller/generate";
import {User} from "./models/index";
import router from "./routes/";
import express from "express";
import "./config/firebase";
import https from "https";
import cors from "cors";
import path from 'path';
import fs from "fs";

const certPath = path.join(__dirname, 'fullchain.pem');
const keyPath = path.join(__dirname, 'privkey.pem')

const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

const serverOptions = {
  cert: cert,
  key: key,
};

const api = express();

createClientRedis.connect();
const usuarioRepository = DataBaseSource.getRepository(User);
try {
  DataBaseSource.initialize()
    .then(async () => {
      const usuarioInicial = await usuarioRepository.findOne({
        where: {
          email: "usuario1@theAchievers.com",
        },
      });
      if (!usuarioInicial) {
        generate();
      }
      console.log("Banco conectado com sucesso");
    })
    .catch(({err}) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
}
const app = https.createServer(serverOptions, api);
app.listen(5000, () => {
  console.log("Servidor Express com HTTPS em execução na porta 3000");
});
api.use(cors());
api.use(express.json());
api.use(router);

export default app;