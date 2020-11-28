"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDRReportController = void 0;
const sdrReport_1 = require("../models/sdrReport");
const userModel_1 = require("../models/userModel");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const statement_1 = require("../models/statement");
class SDRReportController {
    constructor() {
        this.createSDRReport = (userId, req, res, next) => {
            userModel_1.User.findById(userId).then(user => {
                const sdrReport = req.body.sdrReport;
                sdrReport.user = user._id;
                const newSDRReport = new sdrReport_1.SDRReport(sdrReport);
                let statement = new statement_1.Statement();
                statement.save();
                newSDRReport.statement.push(statement);
                newSDRReport.save().then((report) => {
                    res.send(report);
                }).catch((e) => {
                    if (e.code == 11000) {
                        let message = `An SDR Report for the date of ${e.keyValue.sdrDate} already exists`;
                        return next(new ValidationException_1.default({ "message": message }));
                    }
                    next(new ValidationException_1.default(e.errors));
                });
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getAllSDRReports = (userId, req, res, next) => {
            sdrReport_1.SDRReport.find({ "user": userId }).then(sdrReports => {
                res.send(sdrReports);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getSDRReport = (userId, req, res, next) => {
            sdrReport_1.SDRReport.findById(req.params.id)
                .populate("expenseLines")
                .populate("statement")
                .then(report => {
                res.send(report);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateSDRReport = (userId, req, res, next) => {
            sdrReport_1.SDRReport.findOneAndUpdate({ "_id": req.body.sdrReport._id }, Object.assign({}, req.body.sdrReport)).then((r) => {
                res.send(r);
            }).catch(e => {
                if (e.code == 11000) {
                    let message = `An SDR Report for the date of ${e.keyValue.sdrDate} already exists`;
                    return next(new ValidationException_1.default({ "message": message }));
                }
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.deleteSDRReports = (userId, req, res, next) => {
            sdrReport_1.SDRReport.deleteMany({ "_id": { $in: req.body.sdrReportIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
    }
}
exports.SDRReportController = SDRReportController;
//# sourceMappingURL=sdrReports.js.map