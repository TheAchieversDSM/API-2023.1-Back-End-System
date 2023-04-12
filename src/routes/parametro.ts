import { Router } from "express";
import { ParametroController } from "../controller";

const parametro = Router();

parametro.get("/pegarParametros/", ParametroController.getAllParametro);
parametro.get("/pegarParametrosAtivos/", ParametroController.getAllParametrosAtivos);
parametro.get("/pegarParametrosInativos/", ParametroController.getAllParametrosInativos);
parametro.get("/pegarParametrosPorId/:id", ParametroController.getParametroById);
parametro.post("/cadastro", ParametroController.postParametro);
parametro.get("/pegarMedidaEstacaoParametro/:id", ParametroController.GetMedidaParametroPorEstacao);
parametro.put("/atualizarParametro/:id", ParametroController.atualizarParametro);
parametro.put("/atualizarEstado/:id", ParametroController.atualizarAtividadeParametro);


export default parametro;