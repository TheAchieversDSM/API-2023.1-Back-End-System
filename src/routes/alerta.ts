import { Router } from "express";
import { AlertaController } from "../controller/";

const alerta = Router();

alerta.post("/cadastro", AlertaController.postAlerta);

export default alerta;