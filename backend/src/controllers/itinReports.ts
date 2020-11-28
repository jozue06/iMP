import { ItinReport, ItinReportDocument } from "../models/itinerationReport"
import { User } from "../models/userModel"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';
import { Statement } from "../models/statement";

export class ItinReportController {
	public createItinReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const itinReport = req.body.itinReport;
			itinReport.user = user._id;
			const newItinReport = new ItinReport(itinReport);
			let statement = new Statement();
			statement.save();
			newItinReport.statement.push(statement);
			newItinReport.save().then((report: ItinReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				if (e.code == 11000) {
					let message = `A Quarterly Report for month ${e.keyValue.month} and year ${e.keyValue.year} already exists`;					
					return next(new ValidationException({"message":message}));
				}
				next(new ValidationException(e.errors));
			});
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getAllItinReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.find({ "user": userId }).then(itinReports => {
			res.send(itinReports);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getItinReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.findById(req.params.id)
			.populate("expenseLines")
			.populate("mileageLogs")
			.populate("offeringLines")
			.populate("contact")
			.populate("statement")
			.then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(e.errors));
			});
	};

	public updateItinReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.findOneAndUpdate({"_id": req.body.itinReport._id}, {...req.body.itinReport}).then((r: ItinReportDocument) => {
			r.populate("expenseLines")
			.populate("mileageLogs")
			.populate("offeringLines")
			.populate("contact")
			res.send(r);
		}).catch(e => {
			if (e.code == 11000) {
				let message = `A Quarterly Report for month ${e.keyValue.month} and year ${e.keyValue.year} already exists`;					
				return next(new ValidationException({"message":message}));
			}
			next(new ValidationException(e.errors));
		})
	};

	public deleteItinReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.deleteMany( {"_id": { $in: req.body.itinReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};
}