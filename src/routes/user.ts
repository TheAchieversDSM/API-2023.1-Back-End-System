import { Router } from "express";
import { UserControler } from "../controller";

const user = Router();

user.post("/cadastro", UserControler.createUser);
user.get("/usuarios/:id", UserControler.getUserById);
user.get("/usuarios/", UserControler.getAllUser);
export default user;
