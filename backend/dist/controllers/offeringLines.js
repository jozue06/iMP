"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferingLineController = void 0;
const itinerationReport_1 = require("../models/itinerationReport");
const offeringLine_1 = require("../models/offeringLine");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class OfferingLineController {
    constructor() {
        this.createOfferingLine = (userId, req, res, next) => {
            const offeringLine = new offeringLine_1.OfferingLine(req.body.offeringLine);
            offeringLine.save().then((savedOfferingLine) => {
                itinerationReport_1.ItinReport.findOneAndUpdate({ _id: req.body.offeringLine.itinReportId }, { $push: { offeringLines: savedOfferingLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllOfferingLines = (userId, req, res, next) => {
            offeringLine_1.OfferingLine.find({ "userId": userId }).then(lines => {
                res.send(lines);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getOfferingLine = (userId, req, res, next) => {
            offeringLine_1.OfferingLine.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateOfferingLine = (userId, req, res, next) => {
            offeringLine_1.OfferingLine.findOneAndUpdate({ "_id": req.body.offeringLine._id }, Object.assign({}, req.body.offeringLine), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteOfferingLines = (userId, req, res, next) => {
            offeringLine_1.OfferingLine.deleteMany({ "_id": { $in: req.body.offeringLineIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.OfferingLineController = OfferingLineController;
//# sourceMappingURL=offeringLines.js.map