import {Router} from "express";
import { ReportController } from "../controller";

const report = Router();

report.get("/pegarReports/", ReportController.getAllReports);
report.get("/pegarReportPorId/:id", ReportController.getReportById);
report.get('/pegarReportPeloParametro/:parameter', ReportController.getReportsByParameter);


export default report;