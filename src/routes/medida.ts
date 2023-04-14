import { Router } from "express";
import { MedidaController } from "../controller";

const medida = Router();

medida.get("/pegarMedidas/", MedidaController.getAllMedidas);
medida.get("/pegarMedidasPorId/:id", MedidaController.getMedidaById);


export default medida; 