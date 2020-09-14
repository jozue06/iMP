import { QtrReport } from "../models/qrtReport";
import { ItinReport } from "../models/itinerationReport";
import { MileageLog } from "../models/mileageLog";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class MileageLogController {
	public createMileageLog = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const mileageLog = new MileageLog(req.body.mileageLog);
		mileageLog.save().then((savedMileageLog) => {
			if (req.body.isQtrReport) {
				QtrReport.findOneAndUpdate({ _id: req.body.mileageLog.qtrReportId }, {$push: {mileageLogs: savedMileageLog._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			} else {
				ItinReport.findOneAndUpdate({ _id: req.body.mileageLog.itinReportId }, {$push: {mileageLogs: savedMileageLog._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllMileageLogs = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MileageLog.find({ "userId": userId }).then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getMileageLog = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MileageLog.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateMileageLog = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MileageLog.findOneAndUpdate({"_id": req.body.mileageLog._id}, { ...req.body.mileageLog }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteMileageLogs = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MileageLog.deleteMany( {"_id": { $in: req.body.mileageLogIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}