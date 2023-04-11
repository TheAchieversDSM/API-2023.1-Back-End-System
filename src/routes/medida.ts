import { Router } from "express";
import { MedidaController } from "../controller";

const medida = Router();

medida.get("/pegarMedidas/", MedidaController.getAllMedidas);
medida.get("/pegarMedidasPorId/:id", MedidaController.getMedidaById);
medida.put("/atualizarEstado/:id", MedidaController.atualizarAtividadeMedida);


export default medida; 