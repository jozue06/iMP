"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherIncomeLineController = void 0;
const qrtReport_1 = require("../models/qrtReport");
const otherIncomeLine_1 = require("../models/otherIncomeLine");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class OtherIncomeLineController {
    constructor() {
        this.createOtherIncomeLine = (userId, req, res, next) => {
            const otherIncomeLine = new otherIncomeLine_1.OtherIncomeLine(req.body.otherIncomeLine);
            otherIncomeLine.save().then((savedOtherIncomeLine) => {
                qrtReport_1.QtrReport.findOneAndUpdate({ _id: req.body.otherIncomeLine.qtrReportId }, { $push: { otherIncomeLines: savedOtherIncomeLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllOtherIncomeLines = (userId, req, res, next) => {
            otherIncomeLine_1.OtherIncomeLine.find({ "userId": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getOtherIncomeLine = (userId, req, res, next) => {
            otherIncomeLine_1.OtherIncomeLine.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateOtherIncomeLine = (userId, req, res, next) => {
            otherIncomeLine_1.OtherIncomeLine.findOneAndUpdate({ "_id": req.body.otherIncomeLine._id }, Object.assign({}, req.body.otherIncomeLine), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteOtherIncomeLines = (userId, req, res, next) => {
            otherIncomeLine_1.OtherIncomeLine.deleteMany({ "_id": { $in: req.body.otherIncomeLineIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.OtherIncomeLineController = OtherIncomeLineController;
//# sourceMappingURL=otherIncomeLines.js.map