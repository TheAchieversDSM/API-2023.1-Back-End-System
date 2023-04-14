import { Router } from "express";
import { AlertaController } from "../controller/";
import { auth } from "../middleware/auth";

const alerta = Router();

alerta.get(
  "/pegarReportsAtravesDoAlerta/:id",
  AlertaController.GetAllReportsWithAlertId
);
alerta.use(auth);
alerta.post("/cadastro", AlertaController.postAlerta);
alerta.get("/pegarAlertas", AlertaController.getAllAlertas);
alerta.get("/pegarAlertasPorId/:id", AlertaController.getAlertaById);

export default alerta;
