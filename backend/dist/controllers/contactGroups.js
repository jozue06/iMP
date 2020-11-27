"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactGroupController = void 0;
const contactGroup_1 = require("../models/contactGroup");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class ContactGroupController {
    constructor() {
        this.createGroup = (userId, req, res, next) => {
            const contactGroup = new contactGroup_1.ContactGroup(req.body.contactGroup);
            contactGroup.user = userId;
            contactGroup.save().then((savedGroup) => {
                res.send(savedGroup);
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getAllContactGroups = (userId, req, res, next) => {
            contactGroup_1.ContactGroup.find({ "user": userId }).then(comms => {
                res.send(comms);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getContactGroup = (userId, req, res, next) => {
            contactGroup_1.ContactGroup.findById(req.params.id).populate("contacts").then(group => {
                res.send(group);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateContactGroup = (userId, req, res, next) => {
            contactGroup_1.ContactGroup.findOneAndUpdate({ "_id": req.body.contactGroup._id }, Object.assign({}, req.body.contactGroup), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.deleteContactGroup = (userId, req, res, next) => {
            contactGroup_1.ContactGroup.deleteMany({ "_id": { $in: req.body.contactGroupIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
    }
}
exports.ContactGroupController = ContactGroupController;
//# sourceMappingURL=contactGroups.js.map