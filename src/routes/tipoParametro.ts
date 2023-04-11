import { Router } from "express";
import { TipoParametroController } from "../controller";

const tipoParametro = Router();

tipoParametro.post("/cadastro", TipoParametroController.postTipoParametro);
tipoParametro.get("/pegarTiposParametro", TipoParametroController.getAllTipoParametro)
tipoParametro.get("/pegarTipoParametro/:id", TipoParametroController.getTipoParametroById)
tipoParametro.put("/atualizarEstado/:id", TipoParametroController.atualizarAtividadeTipoParametro);

export default tipoParametro;