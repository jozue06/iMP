"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtrReportController = void 0;
const qrtReport_1 = require("../models/qrtReport");
const userModel_1 = require("../models/userModel");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const statement_1 = require("../models/statement");
class QtrReportController {
    constructor() {
        this.createQtrReport = (userId, req, res, next) => {
            userModel_1.User.findById(userId).then(user => {
                const qtrReport = req.body.qtrReport;
                qtrReport.user = user._id;
                const newQtrReport = new qrtReport_1.QtrReport(qtrReport);
                newQtrReport.statement = new statement_1.Statement();
                newQtrReport.statement.save();
                newQtrReport.save().then((report) => {
                    res.send(report);
                }).catch((e) => {
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllQtrReports = (userId, req, res, next) => {
            qrtReport_1.QtrReport.find({ "user": userId }).then(qtrReports => {
                res.send(qtrReports);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getQtrReport = (userId, req, res, next) => {
            qrtReport_1.QtrReport.findById(req.params.id)
                .populate("expenseLines")
                .populate("mileageLogs")
                .populate("statement")
                .populate("otherIncomeLines").then(report => {
                res.send(report);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateQtrReport = (userId, req, res, next) => {
            qrtReport_1.QtrReport.findOneAndUpdate({ "_id": req.body.qtrReport._id }, Object.assign({}, req.body.qtrReport)).then((r) => {
                res.send(r);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteQtrReports = (userId, req, res, next) => {
            qrtReport_1.QtrReport.deleteMany({ "_id": { $in: req.body.qtrReportIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.QtrReportController = QtrReportController;
//# sourceMappingURL=qtrReports.js.map