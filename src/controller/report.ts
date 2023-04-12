import { Request, Response, NextFunction } from "express";
import { DataBaseSource } from "../config/database";
import { Report } from "../models/index";
import { log } from "console";

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

  public async getReportsByParameter(req: Request, res: Response, next: NextFunction) {
    const { parameter } = req.params;
    console.log("teste");
    
    try {
      const getReportsByParameter = await reportRepository
        .createQueryBuilder("report")
        .select([
          "al",
          "rp",
          "md"
        ])
        .from("report", "rp")
        .leftJoin("rp.alerta", "al")
        .leftJoin("al.medida", "md")
        .leftJoin("al.parametro", "pa")
        .where("md.estacao = :parameter", { parameter: parameter })
        .getMany();
      res.json(getReportsByParameter);
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

}
export default new ReportController();