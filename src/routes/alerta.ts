import { Router } from "express";
import { AlertaController } from "../controller/";

const alerta = Router();

alerta.post("/cadastro", AlertaController.postAlerta);
alerta.get("/pegarAlertas", AlertaController.getAllAlertas);
alerta.get("/pegarAlertasPorId", AlertaController.getAlertaById);

export default alerta;