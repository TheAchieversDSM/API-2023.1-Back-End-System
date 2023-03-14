import { Router } from "express";

import estacao from "./estacao";
import user from "./user";

const router = Router();

router.use("/estacao", estacao);
router.use("/user", user);

export default router;
