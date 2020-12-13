"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const statementParser_1 = require("../utils/statementParser");
const statementLine_1 = require("../models/statementLine");
class StatementController {
    constructor() {
        this.createStatement = (userId, req, res, next) => {
            req.body.statement.user = userId;
            const reportType = req.body.statement.reportType;
            const statement = new statement_1.Statement(req.body.statement);
            statement.save().then(savedStatement => {
                if (reportType === 0) {
                    qrtReport_1.QtrReport.findOneAndUpdate({ _id: req.body.statement.qtrReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (reportType === 1) {
                    itinerationReport_1.ItinReport.findOneAndUpdate({ _id: req.body.statement.itinReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (reportType === 2) {
                    maReport_1.MAReport.findOneAndUpdate({ _id: req.body.statement.maReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (reportType === 3) {
                    sdrReport_1.SDRReport.findOneAndUpdate({ _id: req.body.statement.sdrReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (reportType === 4) {
                    institutionalReport_1.InstitutionalReport.findOneAndUpdate({ _id: req.body.statement.institutionalReportId }, { $push: { statements: savedStatement } }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                res.send(savedStatement);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            });
            return;
        };
        this.getAllStatements = (userId, req, res, next) => {
            statement_1.Statement.find({ "user": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getStatement = (userId, req, res, next) => {
            statement_1.Statement.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateStatement = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const savedStatement = yield statement_1.Statement.findOneAndUpdate({ "_id": req.body.statement._id }, Object.assign({}, req.body.statement), { useFindAndModify: true, new: true });
                if (savedStatement.qtrReportId) {
                    qrtReport_1.QtrReport.findOne({ _id: savedStatement.qtrReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (savedStatement.itinReportId) {
                    itinerationReport_1.ItinReport.findOne({ _id: savedStatement.itinReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (savedStatement.maReportId) {
                    maReport_1.MAReport.findOne({ _id: savedStatement.maReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (savedStatement.sdrReportId) {
                    sdrReport_1.SDRReport.findOne({ _id: savedStatement.sdrReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                if (savedStatement.institutionalReportId) {
                    institutionalReport_1.InstitutionalReport.findOne({ _id: savedStatement.institutionalReportId }, { useFindAndModify: true, new: true }).populate("statements").then(saved => {
                        res.send(saved);
                        return;
                    });
                }
                res.send(savedStatement);
            }
            catch (e) {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            }
        });
        this.deleteStatements = (userId, req, res, next) => {
            statement_1.Statement.deleteMany({ "_id": { $in: req.body.statementIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.uploadStatementCsv = (userId, req, res, next) => {
            statementParser_1.parseCsv(userId, req.file.originalname, req.file.buffer, req.body.createContacts).then(() => {
                res.sendStatus(200);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getStatementWithLines = (userId, req, res, next) => {
            statement_1.Statement.findById(req.params.id).populate("statementLines").then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.saveStatementLine = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const statementLine = new statementLine_1.StatementLine(req.body.statementLine);
            try {
                const savedLine = yield statementLine.save();
                statement_1.Statement.findOneAndUpdate({ "_id": savedLine.statement }, { $push: { statementLines: savedLine._id } }, { useFindAndModify: true, new: true }).populate("statementLines").then(savedStatement => {
                    res.send(savedStatement);
                }).catch(e => {
                    next(new ValidationException_1.default(e.errors));
                });
            }
            catch (e) {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            }
        });
        this.updateStatementLine = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const statementLine = req.body.statementLine;
            try {
                const savedLine = yield statementLine_1.StatementLine.findByIdAndUpdate({ "_id": statementLine._id }, Object.assign({}, statementLine));
                statement_1.Statement.findById({ "_id": savedLine.statement }).populate("statementLines").then(savedStatement => {
                    res.send(savedStatement);
                }).catch(e => {
                    next(new ValidationException_1.default(e.errors));
                });
            }
            catch (e) {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            }
        });
        this.deleteStatementLines = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let ids = req.body.statementLineIds;
            try {
                const statement = yield statement_1.Statement.findById({ _id: req.body.statement._id });
                /***<@ We are filtering out the ids we want to delete from the statements objects statement lines
                 * and then updating the statement so the statements lines length is correct
                 * because mango doesn't have native 'remove orphaned' functionality.
                 * We have to call "l.toString()" on the line, as its type is stored in the db as as schema.object.Id type, not a string, or a number or something else.
                 * thanks mango. :(
                */
                statement.statementLines = statement.statementLines.filter(l => !ids.includes(l.toString()));
                /***
                 *
                 * /@>
                */
                yield statementLine_1.StatementLine.deleteMany({ "_id": { $in: ids } }).then(r => {
                    statement.save().then((savedStatement) => {
                        res.send(r);
                    }).catch((e) => {
                        next(new ValidationException_1.default(e.errors));
                    });
                }).catch(e => {
                    next(new ValidationException_1.default(e.errors));
                });
            }
            catch (error) {
                next(new ValidationException_1.default(error));
            }
        });
    }
}
exports.StatementController = StatementController;
//# sourceMappingURL=statements.js.map