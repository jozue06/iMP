"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItinReportController = void 0;
const itinerationReport_1 = require("../models/itinerationReport");
const userModel_1 = require("../models/userModel");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const statement_1 = require("../models/statement");
class ItinReportController {
    constructor() {
        this.createItinReport = (userId, req, res, next) => {
            userModel_1.User.findById(userId).then(user => {
                const itinReport = req.body.itinReport;
                itinReport.user = user._id;
                const newItinReport = new itinerationReport_1.ItinReport(itinReport);
                newItinReport.statement = new statement_1.Statement();
                newItinReport.statement.save();
                newItinReport.save().then((report) => {
                    res.send(report);
                }).catch((e) => {
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllItinReports = (userId, req, res, next) => {
            itinerationReport_1.ItinReport.find({ "user": userId }).then(itinReports => {
                res.send(itinReports);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getItinReport = (userId, req, res, next) => {
            itinerationReport_1.ItinReport.findById(req.params.id)
                .populate("expenseLines")
                .populate("mileageLogs")
                .populate("offeringLines")
                .populate("contact")
                .populate("statement")
                .then(report => {
                res.send(report);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateItinReport = (userId, req, res, next) => {
            itinerationReport_1.ItinReport.findOneAndUpdate({ "_id": req.body.itinReport._id }, Object.assign({}, req.body.itinReport)).then((r) => {
                r.populate("expenseLines")
                    .populate("mileageLogs")
                    .populate("offeringLines")
                    .populate("contact");
                res.send(r);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteItinReports = (userId, req, res, next) => {
            itinerationReport_1.ItinReport.deleteMany({ "_id": { $in: req.body.itinReportIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.ItinReportController = ItinReportController;
//# sourceMappingURL=itinReports.js.map