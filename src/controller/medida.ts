import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Medida } from "../models";

const medidaRepository = DataBaseSource.getRepository(Medida);

class MedidaController{

    public async getMedidaById(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        try {
            const getById = await medidaRepository
                .createQueryBuilder("medida")
                .where("medida.id = :id", { id: id})
                .getOne();
            res.json(getById);
        } catch (error) {
            res.json(error);
        }
    }

    public async getAllMedidas(req: Request, res: Response, next: NextFunction){
        try{
            const getAllMedidas = await medidaRepository
                .createQueryBuilder("medida")
                .getMany();
            res.json(getAllMedidas);
        } catch (error) {
            res.json(error);
        }
    }
}

export default new MedidaController();