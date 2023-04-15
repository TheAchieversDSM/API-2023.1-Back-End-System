import { Router } from "express";
import { AlertaController } from "../controller/";
import { Alerta } from "../models";

const alerta = Router();

alerta.post("/cadastro", AlertaController.postAlerta);
alerta.get("/pegarAlertas", AlertaController.getAllAlertas);
alerta.get("/pegarAlertasPorId/:id", AlertaController.getAlertaById);
alerta.get(
  "/pegarReportsAtravesDoAlerta/:id",
  AlertaController.GetAllReportsWithAlertId
);
alerta.put("/atualizarEstado/:id", AlertaController.atualizarAtividadeAlerta);

alerta.put("/atualizarAlertaPorId/:id", AlertaController.atualizarAlertaById);

export default alerta;
