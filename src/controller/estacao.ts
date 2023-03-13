import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Estacao } from "../models/index";

const userReposiroty = DataBaseSource.getRepository(Estacao);

class EstacaoController {
  public async postEstacao(req: Request, res: Response, next: NextFunction) {
    const { nome_estacao, latitude, longitude } = req.body;
    try {
      const create_estacao = userReposiroty.create({
        lati: latitude,
        long: longitude,
        nome: nome_estacao,
        unixtime: Math.round(new Date().getTime() / 1000),
      });
      await userReposiroty.save(create_estacao);
      return res
        .status(201)
        .json({ ok: `Cadastro do '${nome_estacao}' feito com sucesso` });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }
}
export default new EstacaoController();
