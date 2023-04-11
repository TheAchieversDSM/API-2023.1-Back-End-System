import {Router} from "express";
import { ReportController } from "../controller";

const report = Router();

report.get("/pegarReports/", ReportController.getAllReports);
report.get("/pegarReportPorId/:id", ReportController.getReportById);
report.put("/atualizarEstado/:id", ReportController.atualizarAtividadeReport);

export default report;