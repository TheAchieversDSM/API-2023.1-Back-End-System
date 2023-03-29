import { Router } from "express";

import alerta from "./alerta";
import estacao from "./estacao";
import user from "./user";
import parametro from "./parametro";
import report from "./report";
import medida from "./medida";

const router = Router();

router.use("/estacao", estacao);
router.use("/user", user);
router.use("/alerta", alerta);
router.use("/parametro", parametro);
router.use("/report", report);
router.use("/medida", medida)

export default router;
