import { SDRReport, SDRReportDocument } from "../models/sdrReport";
import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class SDRReportController {
	public createSDRReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const sdrReport = req.body.sdrReport;
			sdrReport.user = user._id;
			const newSDRReport = new SDRReport(sdrReport);

			newSDRReport.save().then((report: SDRReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				if (e.code == 11000) {
					let message = `An SDR Report for the date of ${e.keyValue.sdrDate} already exists`;					
					return next(new ValidationException({"message":message}));
				}
				next(new ValidationException(e.errors));
			});
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getAllSDRReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		SDRReport.find({ "user": userId }).then(sdrReports => {
			res.send(sdrReports);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getSDRReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		SDRReport.findById(req.params.id)
			.populate("expenseLines")
			.populate("statements")
			.then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(e.errors));
			});
	};

	public updateSDRReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		SDRReport.findOneAndUpdate({"_id": req.body.sdrReport._id}, {... req.body.sdrReport}).populate("statements").then((r: SDRReportDocument) => {
			res.send(r);
		}).catch(e => {
			if (e.code == 11000) {
				let message = `An SDR Report for the date of ${e.keyValue.sdrDate} already exists`;					
				return next(new ValidationException({"message":message}));
			}
			next(new ValidationException(e.errors));
		})
	};

	public deleteSDRReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		SDRReport.deleteMany( {"_id": { $in: req.body.sdrReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};
}