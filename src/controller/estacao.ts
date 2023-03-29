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
  public async pegarEstacaoRelacao(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const select = await estacaoRepositorio
        .createQueryBuilder("estacao")
        .select([
          "estacao.nome",
          "parametro.id",
          "parametro.unidadeDeMedida",
          "parametro.nome",
        ])
        .leftJoin("estacao.parametros", "parametro")
        .where("estacao.id = :id", { id: id })
        .getMany();
      res.json(select);
    } catch (error) {
      console.log(error);
      res.json({ err: error });
    }
  }
  public async PegarMedidasComParametroEstacao(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { idParametro, idEstacao } = req.params;
      const select = await estacaoRepositorio
        .createQueryBuilder("estacao")
        .select(["medidas"])
        .leftJoin("estacao.medidas", "medidas")
        .leftJoin("medidas.parametros", "ps")
        .where("medidas.estacaoId = :idEstacao", { idEstacao: idEstacao })
        .andWhere("medidas.parametrosId = :idParametro", {
          idParametro: idParametro,
        })
        .execute();
      res.json(select);
    } catch (error) {
      console.log(error);
      res.json({ err: error });
    }
  }
}
export default new EstacaoController();
