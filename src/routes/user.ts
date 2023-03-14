import { Router } from "express";
import { UserControler } from "../controller";

const user = Router();

user.use("/cadastro", UserControler.createUser);

export default user;
