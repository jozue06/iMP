"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommsController = void 0;
const contactComms_1 = require("../models/contactComms");
const contact_1 = require("../models/contact");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class CommsController {
    constructor() {
        this.createComm = (userId, req, res, next) => {
            const comm = new contactComms_1.Comm(req.body.comm);
            comm.contact = req.body.comm.contactId;
            comm.save().then((savedComm) => {
                contact_1.Contact.findOneAndUpdate({ _id: req.body.comm.contactId }, { $push: { comms: savedComm._id } }, { useFindAndModify: true, new: true }).then(saved => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllComms = (userId, req, res, next) => {
            contactComms_1.Comm.find({ "userId": userId }).then(comms => {
                res.send(comms);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getComm = (userId, req, res, next) => {
            contactComms_1.Comm.findById(req.params.id).then(comm => {
                res.send(comm);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateCommsInfo = (userId, req, res, next) => {
            contactComms_1.Comm.findOneAndUpdate({ "_id": req.body.comm._id }, Object.assign({}, req.body.comm), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.deleteComs = (userId, req, res, next) => {
            contactComms_1.Comm.deleteMany({ "_id": { $in: req.body.commsIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.CommsController = CommsController;
//# sourceMappingURL=contactComms.js.map