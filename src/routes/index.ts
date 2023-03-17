import { Router } from "express";

import alerta from "./alerta";
import estacao from "./estacao";
import user from "./user";
import parametro from "./parametro";

const router = Router();

router.use("/estacao", estacao);
router.use("/user", user);
router.use("/alerta", alerta);
router.use("/parametro", parametro)

export default router;
