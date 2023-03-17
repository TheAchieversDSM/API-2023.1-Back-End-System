import { Router } from "express";
import alerta from "./alerta";
import estacao from "./estacao";

const router = Router();

router.use("/estacao", estacao);
router.use("/alerta", alerta);

export default router;
