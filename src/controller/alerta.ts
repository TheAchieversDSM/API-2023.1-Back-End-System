import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Alerta } from "../models/index";

const alertaRepository = DataBaseSource.getRepository(Alerta);

class AlertaController {
  public async postAlerta(req: Request, res: Response, next: NextFunction) {
    const { nome, valorMax, valorMinimo, nivel } = req.body;
    try {
      const create_alerta = alertaRepository.create({
        nome: nome,
        valorMax: valorMax,
        valorMinimo: valorMinimo,
        nivel: nivel,
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
        .getMany();
      res.json(getAllAlertas);
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
}
export default new AlertaController();