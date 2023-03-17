import { Router } from "express";
import { ParametroController } from "../controller";

const parametro = Router();

parametro.get("/parametros/", ParametroController.getAllParametro);
parametro.get("/parametros/:id", ParametroController.getParametroById);
parametro.post("/cadastro", ParametroController.postParametro);

export default parametro;