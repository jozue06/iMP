import { QtrReport } from "../models/qrtReport";
import { SDRReport } from "../models/sdrReport";
import { ItinReport } from "../models/itinerationReport";
import { InstitutionalReport } from "../models/institutionalReport";
import { Statement } from "../models/statement";
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';
import { MAReport } from "../models/maReport";
import { parseCsv } from "../utils/statementParser";

export class StatementController {
	public createStatement = (userId: String, req: Request, res: Response, next: NextFunction) => {
		req.body.statement.user = userId;
		const reportType = req.body.statement.reportType;
		const statement = new Statement(req.body.statement);
		statement.save().then(savedStatement => {
			if (reportType === 0) {
				QtrReport.findOneAndUpdate({ _id: req.body.statement.qtrReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {					
					res.send(saved);
					return;
				});
			}

			if (reportType === 1) {
				ItinReport.findOneAndUpdate({ _id: req.body.statement.itinReportId }, { $push: {statements: savedStatement} }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}
			if (reportType === 2) {
				MAReport.findOneAndUpdate({ _id: req.body.statement.maReportId }, { $push: {statements: savedStatement} }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}

			if (reportType === 3) {
				SDRReport.findOneAndUpdate({ _id: req.body.statement.sdrReportId }, { $push: {statements: savedStatement} }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}

			if (reportType === 4) {
				InstitutionalReport.findOneAndUpdate({ _id: req.body.statement.institutionalReportId }, { $push: {statements: savedStatement} }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}
			res.send(savedStatement);
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(e.errors));
		});
		return;
	};

	public getAllStatements = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.find({ "user": userId }).then(lines => {
			res.send(lines);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getStatement = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.findById(req.params.id).then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getStatementWithLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.findById(req.params.id).populate("statementLines").then(line => {
			res.send(line);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public updateStatement = async (userId: string, req: Request, res: Response, next: NextFunction) => {		
		try {
			const savedStatement = await Statement.findOneAndUpdate({ "_id": req.body.statement._id }, { ...req.body.statement }, { useFindAndModify: true });
			if (savedStatement.qtrReportId) {
				QtrReport.findOne({ _id: savedStatement.qtrReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}

			if (savedStatement.itinReportId) {
				ItinReport.findOne({ _id: savedStatement.itinReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}
			if (savedStatement.maReportId) {
				MAReport.findOne({ _id: savedStatement.maReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}

			if (savedStatement.sdrReportId) {
				SDRReport.findOne({ _id: savedStatement.sdrReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}

			if (savedStatement.institutionalReportId) {
				InstitutionalReport.findOne({ _id: savedStatement.institutionalReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
					res.send(saved);
					return;
				});
			}
			res.send(savedStatement);
		} catch (e) {
			console.error('eeek ', e);
			next(new ValidationException(e.errors));
		}
	};

	public deleteStatements = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Statement.deleteMany( {"_id": { $in: req.body.statementIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public uploadStatementCsv = (userId: string, req: Request, res: Response, next: NextFunction) => {
		parseCsv(userId, req.file.originalname, req.file.buffer, req.body.createContacts).then(() => {
			res.sendStatus(200);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	}
}