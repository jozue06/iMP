import { InstitutionalReport, InstitutionalReportDocument } from "../models/institutionalReport";
import { User } from "../models/userModel"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class InstitutionalReportController {
	public createInstitutionalReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			const institutionalReport = req.body.institutionalReport;			
			institutionalReport.user = user._id;
			const newInstitutionalReport = new InstitutionalReport(institutionalReport);
			newInstitutionalReport.save().then((report: InstitutionalReportDocument) => {
				res.send(report);
			}).catch((e: any) => {
				next(new ValidationException(JSON.stringify(e.errors)));
			});
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllInstitutionalReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		InstitutionalReport.find({ "user": userId }).then(institutionalReports => {
			res.send(institutionalReports);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getInstitutionalReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		InstitutionalReport.findById(req.params.id)
			.populate("expenseLines")
			.populate("statement")
			.populate("incomeLines").then(report => {
				res.send(report);
			}).catch(e => {
				console.error('ee', e);
				next(new ValidationException(JSON.stringify(e.errors)));
			});
	};

	public updateInstitutionalReport = (userId: string, req: Request, res: Response, next: NextFunction) => {
		InstitutionalReport.findOneAndUpdate({"_id": req.body.institutionalReport._id}, {... req.body.institutionalReport}).then((r: InstitutionalReportDocument) => {
			res.send(r);
		}).catch(e => {
			console.error('eeek ', e);

			next(new ValidationException(JSON.stringify(e.errors)));
		})
	};

	public deleteInstitutionalReports = (userId: string, req: Request, res: Response, next: NextFunction) => {
		InstitutionalReport.deleteMany( {"_id": { $in: req.body.institutionalReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}