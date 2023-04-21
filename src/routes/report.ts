import { Router } from "express";
import { ReportController } from "../controller";

const report = Router();

report.get("/pegarReports/", ReportController.getAllReports);
report.get("/pegarReportPorId/:id", ReportController.getReportById);
report.get(
  "/pegarReportPelaEstacao/:uid",
  ReportController.getReportsByStationId
);
report.get("/redis-alertas", ReportController.GetReportsAlerts);

export default report;
