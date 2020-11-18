"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeLineController = void 0;
const institutionalReport_1 = require("../models/institutionalReport");
const incomeLine_1 = require("../models/incomeLine");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class IncomeLineController {
    constructor() {
        this.createIncomeLine = (userId, req, res, next) => {
            const incomeLine = new incomeLine_1.IncomeLine(req.body.incomeLine);
            incomeLine.save().then((savedIncomeLine) => {
                institutionalReport_1.InstitutionalReport.findOneAndUpdate({ _id: req.body.incomeLine.reportId }, { $push: { incomeLines: savedIncomeLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllIncomeLines = (userId, req, res, next) => {
            incomeLine_1.IncomeLine.find({ "userId": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getIncomeLine = (userId, req, res, next) => {
            incomeLine_1.IncomeLine.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateIncomeLine = (userId, req, res, next) => {
            incomeLine_1.IncomeLine.findOneAndUpdate({ "_id": req.body.incomeLine._id }, Object.assign({}, req.body.incomeLine), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteIncomeLines = (userId, req, res, next) => {
            incomeLine_1.IncomeLine.deleteMany({ "_id": { $in: req.body.incomeLineIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.IncomeLineController = IncomeLineController;
//# sourceMappingURL=incomeLines.js.map