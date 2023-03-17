import { Router } from "express";
import alerta from "./alerta";
import estacao from "./estacao";
import parametro from "./parametro";

const router = Router();

router.use("/estacao", estacao);
router.use("/alerta", alerta);
router.use("/parametro", parametro)

export default router;
