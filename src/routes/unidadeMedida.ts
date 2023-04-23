import { Router } from "express";
import { UnidadeMedidaController } from "../controller";
import { auth } from "../middleware/auth";

const unidadeMedida = Router();

unidadeMedida.use(auth);
unidadeMedida.post("/cadastro", UnidadeMedidaController.postUnidadeMedida);
unidadeMedida.get(
  "/pegarUnidadeDeMedidas",
  UnidadeMedidaController.getAllUnidadeMedida
);
unidadeMedida.get(
  "/pegarUnidadeDeMedidasPorId/:id",
  UnidadeMedidaController.getUnidadeMedidaById
);

export default unidadeMedida;
