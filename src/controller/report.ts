import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Report } from "../models/index";

const reportRepository = DataBaseSource.getRepository(Report);

class ReportController {

  public async getReportById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const getById = await reportRepository
        .createQueryBuilder("report")
        .select([
          "al",
          "rp",
          "md"
        ])
        .from("report", "rp")
        .leftJoin("rp.alertas", "al")
        .leftJoin("al.medidas", "md")
        .where("report.report_id = :id", { id: id })
        .getOne();
      res.json(getById);
    } catch (error) {
      res.json(error);
    }
  }

  public async getAllReports(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllReports = await reportRepository
        .createQueryBuilder("report")
        .select([
          "al",
          "rp",
          "md"
        ])
        .from("report", "rp")
        .leftJoin("rp.alertas", "al")
        .leftJoin("al.medidas", "md")
        .getMany();
      res.json(getAllReports);
    } catch (error) {
      res.json(error);
    }
  }

  
	public async atualizarAtividadeReport( req: Request, res: Response, next: NextFunction ) {
		const { ativo } = req.body;
		const { id } = req.params;

		try {
			await reportRepository
				.createQueryBuilder("report")
				.update(Report)
				.set({
					ativo: ativo
				})
				.where("report.report_id = :id", { id: id })
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
export default new ReportController();