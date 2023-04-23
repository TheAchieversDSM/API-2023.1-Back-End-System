import { Router } from "express";
import { TipoParametroController } from "../controller";
import { auth } from "../middleware/auth";

const tipoParametro = Router();

tipoParametro.use(auth);
tipoParametro.post("/cadastro", TipoParametroController.postTipoParametro);
tipoParametro.get(
  "/pegarTiposParametro",
  TipoParametroController.getAllTipoParametro
);
tipoParametro.get(
  "/pegarTipoParametro/:id",
  TipoParametroController.getTipoParametroById
);

export default tipoParametro;
