import { Router } from "express";
import { ParametroController } from "../controller";

const parametro = Router();


parametro.post("/cadastro", ParametroController.postParametro);

export default parametro;