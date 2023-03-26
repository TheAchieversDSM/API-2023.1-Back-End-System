import { DataBaseSource } from "./config/database";
import express from "express";
import cors from "cors";
import router from "./routes/";
import { generate } from "./controller/generate";
const app = express();

try {
  DataBaseSource.initialize()
    .then(() => console.log("Banco conectado com sucesso"))
    .then(() => generate())
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
