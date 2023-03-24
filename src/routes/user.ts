import { Router } from "express";
import { UserControler } from "../controller";

const user = Router();

user.post("/cadastro", UserControler.createUser);
user.get("/pegarUsuariosPorId/:id", UserControler.getUserById);
user.get("/pegarUsuarios/", UserControler.getAllUser);
export default user;