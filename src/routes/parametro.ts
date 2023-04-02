import { Router } from "express";
import { ParametroController } from "../controller";

const parametro = Router();

parametro.get("/pegarParametros/", ParametroController.getAllParametro);
parametro.get("/pegarParametrosPorId/:id", ParametroController.getParametroById);
parametro.post("/cadastro", ParametroController.postParametro);
parametro.get("/pegarMedidaEstacaoParametro/:id", ParametroController.GetMedidaParametroPorEstacao);

export default parametro;