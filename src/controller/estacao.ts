import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Estacao } from "../models/index";

const estacaoRepositorio = DataBaseSource.getRepository(Estacao);

class EstacaoController {
  public async postEstacao(req: Request, res: Response, next: NextFunction) {
    const {
      nome_estacao,
      latitude,
      longitude,
      utc,
      uid,
      parametroParametroId,
    } = req.body;
    try {
      const create_estacao = estacaoRepositorio.create({
        lati: latitude,
        long: longitude,
        nome: nome_estacao,
        uid: uid,
        UTC: utc,
        unixtime: Math.round(new Date().getTime() / 1000),
      });
      await estacaoRepositorio.save(create_estacao);
      await DataBaseSource.createQueryBuilder()
        .relation(Estacao, "parametros")
        .of(create_estacao.estacao_id)
        .add(parametroParametroId);
      return res.status(201).json({
        ok: `Cadastro do '${create_estacao.estacao_id}' feito com sucesso`,
      });
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

  public async pegarEstacoesRelacoes(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const select = await estacaoRepositorio.findOne({
        where: {
          estacao_id: Number(id),
        },
        relations: {
          parametros: {
            unidadeDeMedida: true,
            medidas: true,
          },
        },
      });
      res.json(select);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new EstacaoController();
