import { QtrReport, QtrReportDocument } from "../models/qrtReport"
import { User } from "../models/userModel"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class QtrReportController {
	public createQtrReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const qtrReport = req.body.qtrReport;
			qtrReport.user = user._id;
			const newQtrReport = new QtrReport(qtrReport);
			newQtrReport.save().then((report: QtrReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				next(new ValidationException(JSON.stringify(e.errors)));
			});
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllQtrReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		QtrReport.find({ "user": userId }).then(qtrReports => {
			res.send(qtrReports);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getQtrReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		QtrReport.findById(req.params.id)
			.populate("expenseLines")
			.populate("mileageLogs")
			.populate("statements")
			.populate("otherIncomeLines").then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(JSON.stringify(e.errors)));
			});
	};

	public updateQtrReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		QtrReport.findOneAndUpdate({"_id": req.body.qtrReport._id}, {... req.body.qtrReport}).then((r: QtrReportDocument) => {
			res.send(r);
		}).catch(e => {
			console.error('eeek ', e);

			next(new ValidationException(JSON.stringify(e.errors)));
		})
	};

	public deleteQtrReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		QtrReport.deleteMany( {"_id": { $in: req.body.qtrReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}