import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { TipoParametro } from "../models";
import { Parametro } from "../models/Parametro";

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
  public async Teste(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const getAllParametro = await parametroRepositorio.find({
        where: {
          medidas: {
            estacao: {
              estacao_id: Number(id),
            },
          },
        },
        relations: {
          medidas: true,
          tipo: true,
          unidadeDeMedida: true,
        },
      });
      console.log("Teste");
      res.json(getAllParametro);
    } catch (error) {
      res.json(error);
    }
  }
}
export default new ParametroController();
