import { Router } from "express";

import estacao from "./estacao";
import parametro from "./parametro";

const router = Router();

router.use("/estacao", estacao);
router.use("/parametro", parametro)

export default router;
