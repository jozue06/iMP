import { InstitutionalReport } from "../models/institutionalReport";
import { IncomeLine } from "../models/incomeLine";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class IncomeLineController {
	public createIncomeLine = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const incomeLine = new IncomeLine(req.body.incomeLine);
		incomeLine.save().then((savedIncomeLine) => {
			InstitutionalReport.findOneAndUpdate({ _id: req.body.incomeLine.reportId }, {$push: {incomeLines: savedIncomeLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
				res.send(saved);
			});
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllIncomeLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		IncomeLine.find({ "userId": userId }).then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getIncomeLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		IncomeLine.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateIncomeLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		IncomeLine.findOneAndUpdate({"_id": req.body.incomeLine._id}, { ...req.body.incomeLine }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteIncomeLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		IncomeLine.deleteMany( {"_id": { $in: req.body.incomeLineIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}