"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementController = void 0;
const qrtReport_1 = require("../models/qrtReport");
const sdrReport_1 = require("../models/sdrReport");
const itinerationReport_1 = require("../models/itinerationReport");
const institutionalReport_1 = require("../models/institutionalReport");
const statement_1 = require("../models/statement");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const maReport_1 = require("../models/maReport");
class StatementController {
    constructor() {
        this.createStatement = (userId, req, res, next) => {
            const reportType = req.body.statement.reportType;
            const statement = new statement_1.Statement(req.body.statement);
            statement.save().then(savedStatement => {
                if (reportType === 0) {
                    qrtReport_1.QtrReport.findOneAndUpdate({ _id: req.body.statement.qtrReportId }, { statement: savedStatement._id }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
                if (reportType === 1) {
                    itinerationReport_1.ItinReport.findOneAndUpdate({ _id: req.body.statement.itinReportId }, { statement: savedStatement._id }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
                if (reportType === 2) {
                    maReport_1.MAReport.findOneAndUpdate({ _id: req.body.statement.maReportId }, { statement: savedStatement._id }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
                if (reportType === 3) {
                    sdrReport_1.SDRReport.findOneAndUpdate({ _id: req.body.statement.sdrReportId }, { statement: savedStatement._id }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
                if (reportType === 4) {
                    institutionalReport_1.InstitutionalReport.findOneAndUpdate({ _id: req.body.statement.institutionalReportId }, { statement: savedStatement._id }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllStatements = (userId, req, res, next) => {
            statement_1.Statement.find({ "userId": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getStatement = (userId, req, res, next) => {
            statement_1.Statement.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateStatement = (userId, req, res, next) => {
            statement_1.Statement.findOneAndUpdate({ "_id": req.body.statement._id }, Object.assign({}, req.body.statement), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteStatements = (userId, req, res, next) => {
            statement_1.Statement.deleteMany({ "_id": { $in: req.body.statementIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.StatementController = StatementController;
//# sourceMappingURL=statements.js.map