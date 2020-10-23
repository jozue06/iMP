import { QtrReport } from "../models/qrtReport";
import { SDRReport } from "../models/sdrReport";
import { ItinReport } from "../models/itinerationReport";
import { InstitutionalReport } from "../models/institutionalReport";
import { Statement } from "../models/statement";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';
import { MAReport } from "../models/maReport";

export class StatementController {
	public createStatement = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const reportType = req.body.statement.reportType;
		const statement = new Statement(req.body.statement);
		statement.save().then(savedStatement => {
			
			if (reportType === 0) {
				QtrReport.findOneAndUpdate({ _id: req.body.statement.qtrReportId }, {statement: savedStatement._id}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

			if (reportType === 1) {
				ItinReport.findOneAndUpdate({ _id: req.body.statement.itinReportId }, {statement: savedStatement._id}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}
			if (reportType === 2) {
				MAReport.findOneAndUpdate({ _id: req.body.statement.maReportId }, {statement: savedStatement._id}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

			if (reportType === 3) {
				SDRReport.findOneAndUpdate({ _id: req.body.statement.sdrReportId }, {statement: savedStatement._id}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

			if (reportType === 4) {
				InstitutionalReport.findOneAndUpdate({ _id: req.body.statement.institutionalReportId }, {statement: savedStatement._id}, { useFindAndModify: true, new: true }).then(saved => {
					res.send(saved);
				});
			}

		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllStatements = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.find({ "userId": userId }).then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getStatement = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateStatement = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.findOneAndUpdate({"_id": req.body.statement._id}, { ...req.body.statement }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteStatements = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.deleteMany( {"_id": { $in: req.body.statementIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}