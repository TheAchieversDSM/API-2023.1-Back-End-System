import { Router } from "express";

import alerta from "./alerta";
import estacao from "./estacao";
import user from "./user";
import parametro from "./parametro";
import report from "./report";
import medida from "./medida";
import unidadeMedida from "./unidadeMedida";
import tipoParametro from "./tipoParametro";

const router = Router();

router.use("/estacao", estacao);
router.use("/user", user);
router.use("/alerta", alerta);
router.use("/parametro", parametro);
router.use("/report", report);
router.use("/medida", medida)
router.use("/unidadeMedida", unidadeMedida)
router.use("/tipoParametro", tipoParametro);

export default router;
