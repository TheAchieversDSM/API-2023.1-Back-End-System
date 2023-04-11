import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { TipoParametro } from "../models";

const tipoParametroRepositorio = DataBaseSource.getRepository(TipoParametro);

class TipoParametroController {

    public async postTipoParametro(req: Request, res: Response, next: NextFunction) {
        const { nome, parametro } = req.body;

        try {
            const create_tipoParametro = tipoParametroRepositorio.create({
                nome: nome,
                parametro: parametro,
                ativo: 1
            });
            await tipoParametroRepositorio.save(create_tipoParametro);
            return res
                .status(201)
                .json({ ok: `Cadastro do tipo de parametro '${nome}' feito com sucesso` });

        } catch (error) {
            return res.status(406).json({ error: error });
        }
    }

    public async getAllTipoParametro(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllTipoParametro = await tipoParametroRepositorio
                .createQueryBuilder("tipoParametro")
                .getMany();
            res.json(getAllTipoParametro);
        } catch (error) {
            res.json(error);
        }

    }

    public async getTipoParametroById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const getById = await tipoParametroRepositorio
                .createQueryBuilder("tipoParametro")
                .where("tipoParametro.tipo_id = :id", { id: id})
                .getOne();
            res.json(getById);
        } catch (error) {
            res.json(error);
        }
    }


	public async atualizarAtividadeTipoParametro( req: Request, res: Response, next: NextFunction ) {
		const { ativo } = req.body;
		const { id } = req.params;

		try {
			await tipoParametroRepositorio
				.createQueryBuilder("tipo_parametro")
				.update(TipoParametro)
				.set({
					ativo: ativo
				})
				.where("tipo_parametro.tipo_id = :id", { id: id })
				.execute()
			return res
				.status(201)
				.json({
					ok: `Estado atualizado`
				});
			
		} catch (error){
			return res.status(406).json({ error: error });
		}
	}


}

export default new TipoParametroController;