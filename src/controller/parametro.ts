import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { TipoParametro } from "../models";
import { Parametro } from "../models/Parametro";
import { Between } from "typeorm";

const parametroRepositorio = DataBaseSource.getRepository(Parametro);

class ParametroController {
  public async postParametro(req: Request, res: Response, next: NextFunction) {
    const {
      tipo_parametro,
      nome_parametro,
      unidadeDeMedida_parametro,
      fator_parametro,
      offset_parametro,
      formula_parametro,
    } = req.body;
    try {
      const create_parametro = parametroRepositorio.create({
        tipo: tipo_parametro,
        nome: nome_parametro,
        unidadeDeMedida: unidadeDeMedida_parametro,
        fator: fator_parametro,
        offset: offset_parametro,
        ativo: 1,
        formula: formula_parametro,
      });
      await parametroRepositorio.save(create_parametro);
      await parametroRepositorio
        .createQueryBuilder()
        .relation(Parametro, "tipo")
        .of(tipo_parametro)
        .set(tipo_parametro);
      return res.status(201).json({
        ok: `Cadastro do parâmetro '${nome_parametro}' feito com sucesso`,
      });
    } catch (error) {
      console.log(error);
      return res.status(406).json({ error: error });
    }
  }

  public async getParametroById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      const getById = await parametroRepositorio
        .createQueryBuilder("parametro")
        .select(["parametro", "tipo", "unidadeDeMedida"])
        .leftJoin("parametro.tipo", "tipo")
        .leftJoin("parametro.unidadeDeMedida", "unidadeDeMedida")
        .where("parametro.parametro_id = :id", { id: id })
        .getOne();
      res.json(getById);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllParametro(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getAllParametro = await parametroRepositorio
        .createQueryBuilder("parametro")
        .select(["parametro", "tipo", "unidadeDeMedida"])
        .leftJoin("parametro.tipo", "tipo")
        .leftJoin("parametro.unidadeDeMedida", "unidadeDeMedida")
        .getMany();
      res.json(getAllParametro);
    } catch (error) {
      res.json(error);
    }
  }
  public async getAllParametrosAtivos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      const getAllAtivos = await parametroRepositorio
        .createQueryBuilder("parametro")
        .where("parametro.ativo = :ativo", { ativo: 1 })
        .select(["parametro", "tipo", "unidadeDeMedida"])
        .leftJoin("parametro.tipo", "tipo")
        .leftJoin("parametro.unidadeDeMedida", "unidadeDeMedida")
        .getMany();
      res.json(getAllAtivos);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllParametrosInativos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      const getAllInativos = await parametroRepositorio
        .createQueryBuilder("parametro")
        .where("parametro.ativo = :ativo", { ativo: 0 })
        .select(["parametro", "tipo", "unidadeDeMedida"])
        .leftJoin("parametro.tipo", "tipo")
        .leftJoin("parametro.unidadeDeMedida", "unidadeDeMedida")
        .getMany();
      res.json(getAllInativos);
    } catch (error) {
      res.json(error);
    }
  }

  public async GetMedidaParametroPorEstacao(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { startTime, endTime } = req.query
    console.log(startTime,endTime)
    try {
      const getAllParametro = await parametroRepositorio
      .createQueryBuilder("parametro")
      .leftJoinAndSelect("parametro.medidas", "medida")
      .leftJoinAndSelect("parametro.tipo", "tipo")
      .leftJoinAndSelect("parametro.unidadeDeMedida", "unidadeDeMedida")
      .where("medida.estacao.estacao_id = :id", { id: Number(id) })
      .andWhere("medida.unixtime >= :startTime", { startTime: Number(startTime) })
      .andWhere("medida.unixtime <= :endTime", { endTime: Number(endTime) })
      .getMany();

    res.json(getAllParametro);
    } catch (error) {
      res.json(error);
    }
  }

  public async atualizarParametro(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      tipo_parametro,
      nome_parametro,
      unidadeDeMedida_parametro,
      fator_parametro,
      offset_parametro,
      formula_parametro,
    } = req.body;
    const { id } = req.params;

    try {
      await parametroRepositorio
        .createQueryBuilder("parametro")
        .update(Parametro)
        .set({
          tipo: tipo_parametro,
          nome: nome_parametro,
          unidadeDeMedida: unidadeDeMedida_parametro,
          fator: fator_parametro,
          offset: offset_parametro,
          formula: formula_parametro,
        })
        .where("parametro.parametro_id = :id", { id: id })
        .execute();

      return res.status(201).json({
        ok: `Parametro '${nome_parametro}' atualizado`,
      });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }

  public async atualizarAtividadeParametro(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ativo } = req.body;
    const { id } = req.params;

    try {
      await parametroRepositorio
        .createQueryBuilder("parametro")
        .update(Parametro)
        .set({
          ativo: ativo,
        })
        .where("parametro.parametro_id = :id", { id: id })
        .execute();
      return res.status(201).json({
        ok: `Estado atualizado`,
      });
    } catch (error) {
      return res.status(406).json({ error: error });
    }
  }
}
export default new ParametroController();
