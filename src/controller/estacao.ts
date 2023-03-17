import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Estacao } from "../models/index";

const estacaoRepositorio = DataBaseSource.getRepository(Estacao);

class EstacaoController {
  public async postEstacao(req: Request, res: Response, next: NextFunction) {
    const { nome_estacao, latitude, longitude } = req.body;
    try {
      const create_estacao = estacaoRepositorio.create({
        lati: latitude,
        long: longitude,
        nome: nome_estacao,
        unixtime: Math.round(new Date().getTime() / 1000),
      });
      await estacaoRepositorio.save(create_estacao);
      return res
        .status(201)
        .json({ ok: `Cadastro do '${nome_estacao}' feito com sucesso` });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }
  public async getEstacaoById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const getById = await estacaoRepositorio
        .createQueryBuilder("estacao")
        .where("estacao.id = :id", { id: id })
        .getOne();
      res.json(getById);
    } catch (error) {
      res.json(error);
    }
  }
  public async getAllEstacao(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllEstacao = await estacaoRepositorio
        .createQueryBuilder("estacao")
        .getMany();
      res.json(getAllEstacao);
    } catch (error) {
      res.json(error);
    }
  }
}
export default new EstacaoController();
