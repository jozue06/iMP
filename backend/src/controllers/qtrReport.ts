import { QtrReport, QtrReportDocument } from "../models/qrtReport"
import { ExpenseLine, ExpenseLineDocument } from "../models/expenseLine"
import { User } from "../models/userModel"
import e, { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';
import { any } from "async";

export class QtrReportController {
	public createQtrReport = (userId: String, req: Request, res: Response, next: NextFunction) => {
		User.findById(userId).then(user => {
			let qtrReport = req.body.qtrReport;
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
			.populate("mileageLog")
			.populate("statement")
			.populate("otherIncomeLine").then(report => {				
				res.send(report);
			}).catch(e => {
				console.log('ee', e);
				next(new ValidationException(JSON.stringify(e.errors)));
			});
	};

	public updateQtrReport = (userId: string, req: Request, res: Response, next: NextFunction) => {		
		let linesToUpdate: ExpenseLineDocument[] = req.body.qtrReport.expenseLines.filter((l: ExpenseLineDocument) => l._id);
		let lineToAdd: ExpenseLineDocument = req.body.qtrReport.expenseLines.find((l: ExpenseLineDocument) => !l._id);
		console.log('do we have a lineToAdd ?? ', lineToAdd);
		
		QtrReport.findOne({"_id": req.body.qtrReport._id}).then(async(r: QtrReportDocument) => {
			if (lineToAdd) {
				let newLine: ExpenseLineDocument = new ExpenseLine(lineToAdd);
				await newLine.save().then(async re => {
					r.expenseLines.push(re._id);
					r.markModified('expenseLines');
					r.markModified('mileageLogs');
					r.markModified('statements');
					r.markModified('otherIncomeLines');
					await r.save();
				});
			}

			linesToUpdate.forEach(async(eLine: ExpenseLineDocument) => {
				await ExpenseLine.findOneAndUpdate({ "_id": eLine._id },  { ...eLine }, { useFindAndModify: true, upsert: true, new: true }).then(async res => {
				})
			});
			
			await r.save();
			res.send(r);
		}).catch(e => {
			console.log('eeek ', e);

			next(new ValidationException(JSON.stringify(e.errors)));
		})
	};

	public updateQtrReportExpenseLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		
	};

	public deleteQtrReports = (userId: string, req: Request, res: Response, next: NextFunction) => {		
		QtrReport.deleteMany( {"_id": { $in: req.body.qtrReportIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}