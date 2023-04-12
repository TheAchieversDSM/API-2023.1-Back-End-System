import { Request, Response, NextFunction } from "express";
import { FindOperator } from "typeorm";
import { DataBaseSource } from "../config/database";
import { Estacao, Medida } from "../models/index";

const estacaoRepositorio = DataBaseSource.getRepository(Estacao);
const medidaRepositorio = DataBaseSource.getRepository(Medida);

class EstacaoController {
	public async postEstacao(req: Request, res: Response, next: NextFunction) {
		const { nome_estacao, latitude, longitude, utc, uid, parametros } =
			req.body;
		try {
			console.log(parametros);
			const create_estacao = estacaoRepositorio.create({
				lati: latitude,
				long: longitude,
				nome: nome_estacao,
				uid: uid,
				UTC: utc,
				ativo: 1,
				unixtime: Math.round(new Date().getTime() / 1000),
			});
			await estacaoRepositorio.save(create_estacao);
			await DataBaseSource.createQueryBuilder()
				.relation(Estacao, "parametros")
				.of(create_estacao.estacao_id)
				.add(
					parametros.map(
						(ids: { parametroParametroId: number }) => ids.parametroParametroId
					)
				);
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
				.where("estacao.estacao_id = :id", { id: id })
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
				.select(["estacao", "parametro", "tipo", "unidadeMedida"])
				.leftJoin("estacao.parametros", "parametro")
				.leftJoin("parametro.tipo", "tipo")
				.leftJoin("parametro.unidadeDeMedida", "unidadeMedida")
				.getMany();
			res.json(getAllEstacao);
		} catch (error) {
			res.json(error);
		}
	}

	public async getAllEstacaoAtivos(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const getAllAtivos = await estacaoRepositorio
				.createQueryBuilder("estacao")
				.where("estacao.ativo = :ativo", { ativo: 1 })
				.select(["estacao", "parametro", "tipo", "unidadeMedida"])
				.leftJoin("estacao.parametros", "parametro")
				.leftJoin("parametro.tipo", "tipo")
				.leftJoin("parametro.unidadeDeMedida", "unidadeMedida")
				.getMany();
			res.json(getAllAtivos);
		} catch (error) {
			res.json(error);
		}
	}

	public async getAllEstacaoInativos(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const getAllInativos = await estacaoRepositorio
				.createQueryBuilder("estacao")
				.where("estacao.ativo = :ativo", { ativo: 0 })
				.select(["estacao", "parametro", "tipo", "unidadeMedida"])
				.leftJoin("estacao.parametros", "parametro")
				.leftJoin("parametro.tipo", "tipo")
				.leftJoin("parametro.unidadeDeMedida", "unidadeMedida")
				.getMany();
			res.json(getAllInativos);
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
	public async getEstacaoParametro(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { idEstacao } = req.params;
		try {
			const select = await medidaRepositorio.find({
				where: {
					estacao: {
						estacao_id: Number(idEstacao),
					},
				},
				relations: {
					parametros: {
						unidadeDeMedida: true,
						tipo: true,
					},
				},
			});
			res.json(select);
		} catch (error) {
			console.log(error);
		}
	}

	public async atualizarAtividadeEstacao(req: Request, res: Response, next: NextFunction) {
		const { ativo } = req.body;
		const { id } = req.params;

		try {
			await estacaoRepositorio
				.createQueryBuilder("estacao")
				.update(Estacao)
				.set({
					ativo: ativo
				})
				.where("estacao.estacao_id = :id", { id: id })
				.execute()
			return res
				.status(201)
				.json({
					ok: `Estado atualizado`
				});

		} catch (error) {
			return res.status(406).json({ error: error });
		}
	}

}
export default new EstacaoController();
