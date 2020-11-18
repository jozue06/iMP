"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAReportController = void 0;
const maReport_1 = require("../models/maReport");
const userModel_1 = require("../models/userModel");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const statement_1 = require("../models/statement");
class MAReportController {
    constructor() {
        this.createMAReport = (userId, req, res, next) => {
            userModel_1.User.findById(userId).then(user => {
                const maReport = req.body.maReport;
                maReport.user = user._id;
                const newMaReport = new maReport_1.MAReport(maReport);
                newMaReport.statement = new statement_1.Statement();
                newMaReport.statement.save();
                newMaReport.save().then((report) => {
                    res.send(report);
                }).catch((e) => {
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllMAReports = (userId, req, res, next) => {
            maReport_1.MAReport.find({ "user": userId }).then(reports => {
                res.send(reports);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getMAReport = (userId, req, res, next) => {
            maReport_1.MAReport.findById(req.params.id)
                .populate("statement")
                .then(report => {
                res.send(report);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateMAReport = (userId, req, res, next) => {
            maReport_1.MAReport.findOneAndUpdate({ "_id": req.body.maReport._id }, Object.assign({}, req.body.maReport)).then((r) => {
                res.send(r);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteMAReports = (userId, req, res, next) => {
            maReport_1.MAReport.deleteMany({ "_id": { $in: req.body.maReportIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.MAReportController = MAReportController;
//# sourceMappingURL=maReports.js.map