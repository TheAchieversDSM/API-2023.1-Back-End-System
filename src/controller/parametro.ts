import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Parametro } from "../models/Parametro";

const parametroRepositorio = DataBaseSource.getRepository(Parametro);

class ParametroController {
    public async postParametro(req: Request, res: Response, next: NextFunction) {
        const { tipo_parametro, nome_parametro, unidadeDeMedida_parametro, fator_parametro, offset_parametro } = req.body;
        try {
            const create_parametro = parametroRepositorio.create({
                tipo: tipo_parametro,
                nome: nome_parametro,
                unidadeDeMedida: unidadeDeMedida_parametro,
                fator: fator_parametro,
                offset: offset_parametro
            });
            await parametroRepositorio.save(create_parametro);
            return res
                .status(201)
                .json({ ok: `Cadastro do parâmetro '${nome_parametro}' feito com sucesso` });
        } catch (error) {
            return res.status(406).json({ error: error });
        }
    }

    public async getParametroById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const getById = await parametroRepositorio
                .createQueryBuilder("parametro")
                .where("parametro.parametro_id = :id", { id: id })
                .getOne();
            res.json(getById);
        } catch (error) {
            res.json(error);
        }
    }

    public async getAllParametro(req: Request, res: Response, next: NextFunction){
        try{
            const getAllParametro = await parametroRepositorio
                .createQueryBuilder("parametro")
                .getMany();
            res.json(getAllParametro);
        } catch ( error ) {
            res.json(error);
        }
    }
}
export default new ParametroController();