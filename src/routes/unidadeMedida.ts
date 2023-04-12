import { Router } from "express";
import { UnidadeMedidaController } from "../controller";

const unidadeMedida = Router();

unidadeMedida.post("/cadastro", UnidadeMedidaController.postUnidadeMedida);
unidadeMedida.get("/pegarUnidadeDeMedidas", UnidadeMedidaController.getAllUnidadeMedida);
unidadeMedida.get("/pegarUnidadeDeMedidasPorId/:id", UnidadeMedidaController.getUnidadeMedidaById);

export default unidadeMedida;