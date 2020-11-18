"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MileageLogController = void 0;
const qrtReport_1 = require("../models/qrtReport");
const itinerationReport_1 = require("../models/itinerationReport");
const mileageLog_1 = require("../models/mileageLog");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class MileageLogController {
    constructor() {
        this.createMileageLog = (userId, req, res, next) => {
            const mileageLog = new mileageLog_1.MileageLog(req.body.mileageLog);
            mileageLog.save().then((savedMileageLog) => {
                if (req.body.isQtrReport) {
                    qrtReport_1.QtrReport.findOneAndUpdate({ _id: req.body.mileageLog.qtrReportId }, { $push: { mileageLogs: savedMileageLog._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
                else {
                    itinerationReport_1.ItinReport.findOneAndUpdate({ _id: req.body.mileageLog.itinReportId }, { $push: { mileageLogs: savedMileageLog._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        res.send(saved);
                    });
                }
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllMileageLogs = (userId, req, res, next) => {
            mileageLog_1.MileageLog.find({ "userId": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getMileageLog = (userId, req, res, next) => {
            mileageLog_1.MileageLog.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateMileageLog = (userId, req, res, next) => {
            mileageLog_1.MileageLog.findOneAndUpdate({ "_id": req.body.mileageLog._id }, Object.assign({}, req.body.mileageLog), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteMileageLogs = (userId, req, res, next) => {
            mileageLog_1.MileageLog.deleteMany({ "_id": { $in: req.body.mileageLogIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.MileageLogController = MileageLogController;
//# sourceMappingURL=mileageLogs.js.map