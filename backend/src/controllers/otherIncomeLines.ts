import { QtrReport } from "../models/qrtReport";
import { OtherIncomeLine } from "../models/otherIncomeLine";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class OtherIncomeLineController {
	public createOtherIncomeLine = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const otherIncomeLine = new OtherIncomeLine(req.body.otherIncomeLine);
		otherIncomeLine.save().then((savedOtherIncomeLine) => {
			QtrReport.findOneAndUpdate({ _id: req.body.otherIncomeLine.qtrReportId }, {$push: {otherIncomeLines: savedOtherIncomeLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
				res.send(saved);
			});
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllOtherIncomeLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OtherIncomeLine.find({ "userId": userId }).populate("contact").then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getOtherIncomeLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OtherIncomeLine.findById(req.params.id).populate("contact").then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateOtherIncomeLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OtherIncomeLine.findOneAndUpdate({"_id": req.body.otherIncomeLine._id}, { ...req.body.otherIncomeLine }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteOtherIncomeLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OtherIncomeLine.deleteMany( {"_id": { $in: req.body.otherIncomeLineIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}