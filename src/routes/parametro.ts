import { Router } from "express";
import { ParametroController } from "../controller";
import { auth } from "../middleware/auth";

const parametro = Router();

parametro.get("/pegarParametros/", ParametroController.getAllParametro);
parametro.get(
  "/pegarParametrosPorId/:id",
  ParametroController.getParametroById
);
parametro.get(
  "/pegarMedidaEstacaoParametro/:id",
  ParametroController.GetMedidaParametroPorEstacao
);

parametro.use(auth);
parametro.post("/cadastro", ParametroController.postParametro);

export default parametro;
