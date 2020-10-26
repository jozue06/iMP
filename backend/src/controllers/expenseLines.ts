import { QtrReport } from "../models/qrtReport";
import { SDRReport } from "../models/sdrReport";
import { ItinReport } from "../models/itinerationReport";
import { InstitutionalReport } from "../models/institutionalReport";
import { ExpenseLine, ExpenseLineDocument } from "../models/expenseLine";
import { Request, Response, NextFunction } from "express";
import ValidationException from "../exceptions/ValidationException";
import { uploadToS3, removeFromS3 } from "../controllers/awsController";

export class ExpenseLineController {
	public createExpenseLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		let type = Number(req.body.expenseLineType);
		if (req.file) {
			const expenseLine = new ExpenseLine(JSON.parse(req.body.expenseLine));
			expenseLine.validate().catch(e => {
				console.error("expenseLine.validate error ", e)
				return next(new ValidationException(JSON.stringify(e.errors)));
			});

			uploadToS3(userId, req.file.originalname, req.file.buffer).then(re => {
				expenseLine.imageURL = re.Location;
				this.saveExpenseLineAndUpdateReport(type, expenseLine, res, next).catch(e => {
					console.error("saveExpenseLine ", e)
					next(new ValidationException(JSON.stringify(e.errors)));
				});
			}).catch(e => {
				console.error("uploadToS3 ", e)
				next(new ValidationException(JSON.stringify(e.errors)));
			});
		} else {
			const expenseLine = new ExpenseLine(req.body.expenseLine);

			this.saveExpenseLineAndUpdateReport(type, expenseLine, res, next).catch(e => {
				next(new ValidationException(JSON.stringify(e.errors)));
			});
		}
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

	public updateExpenseLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.findOneAndUpdate({"_id": req.body.expenseLine._id}, { ...req.body.expenseLine }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e));
		});

	};

	public deleteExpenseLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.deleteMany( {"_id": { $in: req.body.expenseLineIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public uploadExpensePhoto = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ExpenseLine.findOne({"_id": req.params.id}).then(found => {
			let foundExpenseLine: ExpenseLineDocument = found;

			uploadToS3(userId, req.file.originalname, req.file.buffer).then(re => {
				foundExpenseLine.imageURL = re.Location;
				foundExpenseLine.save().then(r => {
					res.send(r);
				}).catch(e => {
					next(new ValidationException(e));
				});
			}).catch(e => {
				console.error("uploadToS3 ", e)
				next(new ValidationException(e));
			});
		}).catch(e => {
			next(new ValidationException(e));
		});
	}

	public deleteExpensePhoto = (userId: string, req: Request, res: Response, next: NextFunction) => {
		let expenseLineId = req.body.expenseLine._id;		
		removeFromS3(req.body.expenseLine.imageURL).then(re => {
			req.body.expenseLine.imageURL = "";
			ExpenseLine.findOneAndUpdate({"_id": expenseLineId}, { ...req.body.expenseLine }, { useFindAndModify: true }).then(r => {
				res.send("Image Deleted and Removed from S3");
			}).catch(e => {
				next(new ValidationException(e));
			});			
		}).catch(e => {
			console.error('eeek removeFromS3 error ', e);
			next(new ValidationException(e));
		});
	}

	private saveExpenseLineAndUpdateReport = async (expenseLineType: number, expenseLine: ExpenseLineDocument, res: Response, next: NextFunction) => {
		await expenseLine.save().then(async (savedExpenseLine: ExpenseLineDocument) => {
			if (expenseLineType === 0) {
				
				await QtrReport.findOneAndUpdate({ _id: expenseLine.qtrReport }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {					
					return res.send(savedExpenseLine);
				});
			} 
			
			if (expenseLineType === 1) {
				await ItinReport.findOneAndUpdate({ _id: expenseLine.itinReport }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					return res.send(savedExpenseLine);
				});
			}

			if (expenseLineType === 3) {
				await SDRReport.findOneAndUpdate({ _id: expenseLine.sdrReport }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					return res.send(savedExpenseLine);
				});
			}

			if (expenseLineType === 4) {
				await InstitutionalReport.findOneAndUpdate({ _id: expenseLine.institutionalReport }, {$push: {expenseLines: savedExpenseLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
					return res.send(savedExpenseLine);
				});
			}
		}).catch(e => {
			next(new ValidationException(e));
		});
	}
}