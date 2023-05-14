import { Request, Response, NextFunction } from 'express';
import { DataBaseSource } from '../config/database';
import { Report } from '../models/index';
import { createClientRedis } from '../config/redis';
const reportRepository = DataBaseSource.getRepository(Report);

class ReportController {
  public async getReportById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const getById = await reportRepository
        .createQueryBuilder('report')
        .select(['al', 'rp'])
        .from('report', 'rp')
        .leftJoin('rp.alerta', 'al')
        .where('rp.report_id = :id', { id: id })
        .getOne();
      res.json(getById);
    } catch (error) {
      res.json(error);
    }
  }

  public async getReportsByStationId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { uid } = req.params;
    console.log('teste');
    try {
      const getReportsByStationId = await reportRepository.find({
        where: {
          estacao_uid: uid
        },
        order: {
          unixtime: 'DESC'
        },
        relations: {
          alerta: true
        }
      });
      res.json(getReportsByStationId);
    } catch (error) {
      res.json(error);
    }
  }
  public async GetReportsAlerts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await createClientRedis.connect();
    const keys = await createClientRedis.keys('*');
    const keyValuePairs = keys.map((key: any) => ({ key }));
    const results: any[] = [];
    try {
      await Promise.all(
        keyValuePairs.map(async (item: any) => {
          const value = await createClientRedis.hGetAll(item.key);
          results.push({ key: item.key, ...value });
        })
      );
      res.json(results);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    } finally {
      createClientRedis.quit();
    }
  }

  public async getAllReports(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllReports = await reportRepository
        .createQueryBuilder('report')
        .select(['al', 'rp'])
        .from('report', 'rp')
        .leftJoin('rp.alerta', 'al')
        .getMany();
      res.json(getAllReports);
    } catch (error) {
      res.json(error);
    }
  }
}
export default new ReportController();
