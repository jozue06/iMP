import { MAReport, MAReportDocument } from "../models/maReport";
import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class MAReportController {
	public createMAReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const maReport = req.body.maReport;
			maReport.user = user._id;
			const newMaReport = new MAReport(maReport);

			newMaReport.save().then((report: MAReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				if (e.code == 11000) {
					let message = `An MA Report for month ${e.keyValue.month} and year ${e.keyValue.year} already exists`;					
					return next(new ValidationException({"message":message}));
				}
				next(new ValidationException(e.errors));
			});
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getAllMAReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MAReport.find({ "user": userId }).then(reports => {
			res.send(reports);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getMAReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MAReport.findById(req.params.id)
			.populate("statements")
			.then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(e.errors));
			});
	};

	public updateMAReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MAReport.findOneAndUpdate({"_id": req.body.maReport._id}, {...req.body.maReport}).populate("statements").then((r: MAReportDocument) => {
			res.send(r);
		}).catch(e => {
			if (e.code == 11000) {
				let message = `An MA Report for month ${e.keyValue.month} and year ${e.keyValue.year} already exists`;					
				return next(new ValidationException({"message":message}));
			}
			next(new ValidationException(e.errors));
		})
	};

	public deleteMAReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		MAReport.deleteMany( {"_id": { $in: req.body.maReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};
}