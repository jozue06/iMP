import { ItinReport, ItinReportDocument } from "../models/itinerationReport"
import { User } from "../models/userModel"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class ItinReportController {
	public createItinReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const itinReport = req.body.itinReport;
			itinReport.user = user._id;
			const newItinReport = new ItinReport(itinReport);
			newItinReport.save().then((report: ItinReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				next(new ValidationException(JSON.stringify(e.errors)));
			});
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllItinReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.find({ "user": userId }).then(itinReports => {
			res.send(itinReports);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getItinReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.findById(req.params.id)
			.populate("expenseLines")
			.populate("mileageLogs")
			.populate("offeringLines")
			.populate("contact")
			.then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(JSON.stringify(e.errors)));
			});
	};

	public updateItinReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.findOneAndUpdate({"_id": req.body.itinReport._id}, {...req.body.itinReport}).then((r: ItinReportDocument) => {
			res.send(r);
		}).catch(e => {
			console.error('eeek ', e);

			next(new ValidationException(JSON.stringify(e.errors)));
		})
	};

	public deleteItinReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ItinReport.deleteMany( {"_id": { $in: req.body.itinReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}