import { DataBaseSource } from "./config/database";
import express from "express";
import cors from "cors";
import router from "./routes/";
import { generate } from "./controller/generate";
import { User } from "./models/index";
import "./config/firebase";
import { RealTime } from "./controller/firebase";

const app = express();
const usuarioRepository = DataBaseSource.getRepository(User);
RealTime();
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
    .catch(({ err }) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
}

app.listen(5000, () => console.log("Server conectado"));
app.use(cors());
app.use(express.json());
app.use(router);
