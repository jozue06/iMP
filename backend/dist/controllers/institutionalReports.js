"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionalReportController = void 0;
const institutionalReport_1 = require("../models/institutionalReport");
const userModel_1 = require("../models/userModel");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const statement_1 = require("../models/statement");
class InstitutionalReportController {
    constructor() {
        this.createInstitutionalReport = (userId, req, res, next) => {
            userModel_1.User.findById(userId).then(user => {
                const institutionalReport = req.body.institutionalReport;
                institutionalReport.user = user._id;
                const newInstitutionalReport = new institutionalReport_1.InstitutionalReport(institutionalReport);
                newInstitutionalReport.statement = new statement_1.Statement();
                newInstitutionalReport.statement.save();
                newInstitutionalReport.save().then((report) => {
                    res.send(report);
                }).catch((e) => {
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllInstitutionalReports = (userId, req, res, next) => {
            institutionalReport_1.InstitutionalReport.find({ "user": userId }).then(institutionalReports => {
                res.send(institutionalReports);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getInstitutionalReport = (userId, req, res, next) => {
            institutionalReport_1.InstitutionalReport.findById(req.params.id)
                .populate("expenseLines")
                .populate("statement")
                .populate("incomeLines").then(report => {
                res.send(report);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateInstitutionalReport = (userId, req, res, next) => {
            institutionalReport_1.InstitutionalReport.findOneAndUpdate({ "_id": req.body.institutionalReport._id }, Object.assign({}, req.body.institutionalReport)).then((r) => {
                res.send(r);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteInstitutionalReports = (userId, req, res, next) => {
            institutionalReport_1.InstitutionalReport.deleteMany({ "_id": { $in: req.body.institutionalReportIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.InstitutionalReportController = InstitutionalReportController;
//# sourceMappingURL=institutionalReports.js.map