import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { User } from "../models/index";

const userRepositorio = DataBaseSource.getRepository(User);

class UserControler {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, senha, nome } = req.body;
    if (!email || !senha || email.trim() === "" || senha.trim() === "") {
      return res.json({ error: "Para cadastrar um novo usuario, porfavor insira o E-mail e senha" });
    }
    const obj = new User();
    obj.email = email;
    obj.senha = senha;
    obj.nome = nome;
    const usuario: any = await userRepositorio.manager
      .save(User, obj)
      .catch((e) => {
        if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
          return { error: "e-mail já existe" };
        }
        return { error: e.message };
      });
    if (usuario.id) {
      return res.json({
        id: usuario.id,
        email: usuario.mail,
      });
    }
    return res.json(usuario);
  }
}
export default new UserControler();
