import { Router } from "express";
import { AlertaController } from "../controller/";
import { auth } from "../middleware/auth";

const alerta = Router();

alerta.use(auth);
alerta.post("/cadastro", AlertaController.postAlerta);
alerta.get("/pegarAlertas", AlertaController.getAllAlertas);
alerta.get("/pegarAlertasPorId/:id", AlertaController.getAlertaById);
alerta.put("/atualizarEstado/:id", AlertaController.atualizarAtividadeAlerta);
alerta.get(
  "/pegarReportsAtravesDoAlerta/:id",
  AlertaController.GetAllReportsWithAlertId
);
alerta.get("/pegarAlertasAtivos", AlertaController.getAllAlertasAtivos);
alerta.get("/pegarAlertasInativos", AlertaController.getAllAlertasInativos);
alerta.put("/atualizarAlertaPorId/:id", AlertaController.atualizarAlertaById);

export default alerta;
