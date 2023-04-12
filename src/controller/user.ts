import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { User } from "../models/index";
import user from "../routes/user";

const userRepositorio = DataBaseSource.getRepository(User);

class UserControler {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, senha, nome } = req.body;
    if (!email || !senha || email.trim() === "" || senha.trim() === "") {
      return res.json({
        error:
          "Para cadastrar um novo usuario, porfavor insira o E-mail e senha",
      });
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

  public async deleteUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await userRepositorio
        .createQueryBuilder("user")
        .delete()
        .from(User)
        .where("user.user_id = :id", { id: id })
        .execute();

      return res
        .status(201)
        .json({
          ok: `Usuário de ID '${id}' deletado`
        })
    } catch (error) {
      return res.status(406).json({ error: error });

    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getUserById = await userRepositorio
        .createQueryBuilder("user")
        .where("user.user_id = :id", { id: id })
        .getOne();
      res.json(getUserById);
    } catch (error) {
      res.json({ err: error });
    }
  }
  public async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllUser = await userRepositorio
        .createQueryBuilder("user")
        .getMany();
      res.json(getAllUser);
    } catch (error) {
      res.json({ err: error });
    }
  }
}
export default new UserControler();
