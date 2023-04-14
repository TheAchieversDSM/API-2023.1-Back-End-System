import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { User } from "../models/index";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
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
  public async loginUserAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userRepositorio.find({
        where: {
          email,
        },
      });
      if (user.length == 1) {
        if (await bcrypt.compare(password, user[0].senha as string)) {
          const token = jwt.sign(
            { id: user[0].user_id },
            process.env.APP_SECRET as string,
            {
              expiresIn: "1D",
            }
          );
          const data = {
            ...user[0],
            token,
          };
          return res.json(data);
        } else {
          return res.status(404).json({ message: "Senha incorreta" });
        }
      } else {
        return res.status(404).json({ message: "E-mail incorreto" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default new UserControler();
