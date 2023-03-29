import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { UnidadeMedida } from "../models/UnidadeMedida";

const unidadeMedidaRepositorio = DataBaseSource.getRepository(UnidadeMedida);

class UnidadeMedidaController {

    public async postUnidadeMedida(req: Request, res: Response, next: NextFunction) {
        const { nome, parametro } = req.body;
        try {
            const create_unidadeMedida = unidadeMedidaRepositorio.create({
                nome: nome,
                parametro: parametro
            });
            await unidadeMedidaRepositorio.save(create_unidadeMedida);
            return res
                .status(201)
                .json({ ok: `Cadastro da unidade de medida '${nome}' feito com sucesso` });

        } catch (error) {
            return res.status(406).json({error: error});
        }
    }

    public async getUnidadeMedidaById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const getById = await unidadeMedidaRepositorio
                .createQueryBuilder("unidadeDeMedida")
                .where("unidadeDeMedida.unidade_id = :id", { id: id })
                .getOne();
            res.json(getById);
        } catch (error) {
            res.json(error);
        }
    }

    public async getAllUnidadeMedida(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllUnidadeMedida = await unidadeMedidaRepositorio
                .createQueryBuilder("unidadeDeMedida")
                .getMany();
            res.json(getAllUnidadeMedida);
        } catch (error) {
            res.json(error);
        }
    }

}
export default new UnidadeMedidaController;