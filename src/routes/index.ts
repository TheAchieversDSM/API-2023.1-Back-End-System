import { Router } from "express";

import estacao from "./estacao";

const router = Router();

router.use("/estacao", estacao);

export default router;
