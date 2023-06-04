import {createClientRedis} from "./config/redis";
import {DataBaseSource} from "./config/database";
import {generate} from "./controller/generate";
import {User} from "./models/index";
import router from "./routes/";
import express from "express";
import "./config/firebase";
import cors from "cors";

const app = express();
createClientRedis.connect()
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

app.listen(5000, () => console.log("Server conectado"));
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
