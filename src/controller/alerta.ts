import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Alerta } from "../models/index";

const userReposiroty = DataBaseSource.getRepository(Alerta);

class AlertaController {
  public async postAlerta(req: Request, res: Response, next: NextFunction) {
    const { nome, id_estacao, id_parametro, valorMax, valorMinimo } = req.body;
    try {
      const create_alerta= userReposiroty.create({
        nome: nome,
        id_estacao: id_estacao,
        id_parametro: id_parametro,
        valorMax: valorMax,
        valorMinimo: valorMinimo,
      });
      await userReposiroty.save(create_alerta);
      return res
        .status(201)
        .json({ ok: `Cadastro do alerta '${nome}' feito com sucesso` });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }
}
export default new AlertaController();