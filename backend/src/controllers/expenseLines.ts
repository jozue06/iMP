import { QtrReport } from "../models/qrtReport";
import { SDRReport } from "../models/sdrReport";
import { ItinReport } from "../models/itinerationReport";
import { InstitutionalReport } from "../models/institutionalReport";
import { ExpenseLine } from "../models/expenseLine";
import { Request, Response, NextFunction } from "express";
import ValidationException from "../exceptions/ValidationException";
import { uploadToS3 } from "../controllers/awsController";

export class ExpenseLineController {
	public createExpenseLine = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const expenseLine = new ExpenseLine(req.body.expenseLine);

		expenseLine.save().then((savedExpenseLine) => {
			if (req.body.expenseLineType === 0) {
				QtrReport.findOneAndUpdate({ _id: req.body.expenseLine.qtrReportId }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			} 
			
			if (req.body.expenseLineType === 1) {
				ItinReport.findOneAndUpdate({ _id: req.body.expenseLine.itinReportId }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

			if (req.body.expenseLineType === 3) {
				SDRReport.findOneAndUpdate({ _id: req.body.expenseLine.sdrReportId }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

			if (req.body.expenseLineType === 4) {
				InstitutionalReport.findOneAndUpdate({ _id: req.body.expenseLine.institutionalReportId }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	// public getAllExpenseLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
	// 	ExpenseLine.find({ "userId": userId }).then(lines => {
	// 		res.send(lines);
	// 	}).catch(e => {
	// 		next(new ValidationException(JSON.stringify(e.errors)));
	// 	});
	// };

	public getExpenseLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public uploadExpensePhoto = (userId: string, req: Request, res: Response, next: NextFunction) => {
		uploadToS3(userId, req.file.originalname, req.file.buffer).then(re => 
			{console.log('res ', re)
			res.send(re);
		}).catch(e => {
			console.log("eee ", e)
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	}

	public updateExpenseLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.findOneAndUpdate({"_id": req.body.expenseLine._id}, { ...req.body.expenseLine }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteExpenseLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.deleteMany( {"_id": { $in: req.body.expenseLineIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}