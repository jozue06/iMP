import { ItinReport } from "../models/itinerationReport";
import { OfferingLine } from "../models/offeringLine";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class OfferingLineController {
	public createOfferingLine = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const offeringLine = new OfferingLine(req.body.offeringLine);
		offeringLine.save().then((savedOfferingLine) => {
			ItinReport.findOneAndUpdate({ _id: req.body.offeringLine.itinReportId }, {$push: {offeringLines: savedOfferingLine._id}}, { useFindAndModify: true, new: true }).then(saved => {
				res.send(saved);
			});
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllOfferingLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OfferingLine.find({ "userId": userId }).then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getOfferingLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OfferingLine.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateOfferingLine = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OfferingLine.findOneAndUpdate({"_id": req.body.offeringLine._id}, { ...req.body.offeringLine }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteOfferingLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		OfferingLine.deleteMany( {"_id": { $in: req.body.offeringLineIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}