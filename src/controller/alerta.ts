import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Alerta } from "../models/index";

const alertaRepository = DataBaseSource.getRepository(Alerta);

class AlertaController {
  public async postAlerta(req: Request, res: Response, next: NextFunction) {
    const { nome, valorMax, valorMinimo, nivel, parametro_id } = req.body;
    try {
      const create_alerta = alertaRepository.create({
        nome: nome,
        valorMax: valorMax,
        valorMinimo: valorMinimo,
        ativo: 1,
        nivel: nivel,
        parametro: parametro_id,
      });
      await alertaRepository.save(create_alerta);
      return res
        .status(201)
        .json({ ok: `Cadastro do alerta '${nome}' feito com sucesso` });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }

  public async getAlertaById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const getById = await alertaRepository
        .createQueryBuilder("alerta")
        .select(["alerta", "pr"])
        .leftJoin("alerta.parametro", "pr")
        .where("alerta.alerta_id = :id", { id: id })
        .getOne();
      res.json(getById);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllAlertas(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllAlertas = await alertaRepository
        .createQueryBuilder("alerta")
        .select(["alerta", "pr"])
        .leftJoin("alerta.parametro", "pr")
        .getMany();
      res.json(getAllAlertas);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllAlertasAtivos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      const getAllAtivos = await alertaRepository
        .createQueryBuilder("alerta")
        .select(["alerta", "pr"])
        .leftJoin("alerta.parametro", "pr")
        .where("alerta.ativo = :ativo", { ativo: 1 })
        .getMany();
      res.json(getAllAtivos);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllAlertasInativos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      const getAllInativos = await alertaRepository
        .createQueryBuilder("alerta")
        .select(["alerta", "pr"])
        .leftJoin("alerta.parametro", "pr")
        .where("alerta.ativo = :ativo", { ativo: 0 })
        .getMany();
      res.json(getAllInativos);
    } catch (error) {
      res.json(error);
    }
  }

  public async GetAllReportsWithAlertId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const select = await alertaRepository.findOne({
        where: {
          alerta_id: Number(id),
        },
        relations: {
          medida: {
            parametros: {
              tipo: true,
            },
          },
          reports: true,
        },
      });
      res.json(select);
    } catch (error) {
      console.log(error);
    }
  }

  public async atualizarAtividadeAlerta(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ativo } = req.body;
    const { id } = req.params;

    try {
      await alertaRepository
        .createQueryBuilder("alerta")
        .update(Alerta)
        .set({
          ativo: ativo,
        })
        .where("alerta.alerta_id = :id", { id: id })
        .execute();
      return res.status(201).json({
        ok: `Estado atualizado`,
      });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }
  public async atualizarAlertaById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { nome, valorMax, valorMinimo, nivel, parametro_id } = req.body;
    try {
      const update = await alertaRepository
        .createQueryBuilder()
        .update(Alerta)
        .set({
          nome: nome,
          valorMax: valorMax,
          valorMinimo: valorMinimo,
          nivel: nivel,
          parametro: parametro_id,
        })
        .where("alerta_id = :id", { id: id })
        .execute();
      return res.status(201).json({ ok: `Alerta '${nome}' atualizado` });
    } catch (error) {
      res.json(error);
    }
  }
}

export default new AlertaController();
