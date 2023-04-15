import { Router } from "express";
import { UserControler } from "../controller";
import { auth } from "../middleware/auth";

const user = Router();

user.use(auth);
user.post("/cadastro", UserControler.createUser);
user.get("/pegarUsuariosPorId/:id", UserControler.getUserById);
user.get("/pegarUsuarios/", UserControler.getAllUser);
user.delete("/deletarUsuario/", UserControler.deleteUserById);
user.put("/atualizarUsuario/:id", UserControler.atualizarUsuario);

export default user;
