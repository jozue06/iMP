"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_1 = require("../models/contact");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class ContactController {
    constructor() {
        this.createContact = (userId, req, res, next) => {
            const incomingContact = req.body.contact;
            incomingContact.userId = userId;
            const contact = new contact_1.Contact(incomingContact);
            contact.save().then(() => {
                res.send(contact);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getAllContacts = (userId, req, res, next) => {
            contact_1.Contact.find({ "userId": userId }).then(contacts => {
                res.send(contacts);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.getContact = (userId, req, res, next) => {
            contact_1.Contact.findById(req.params.id).populate("events").populate("tasks").populate("comms").then(contact => {
                res.send(contact);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateContactInfo = (userId, req, res, next) => {
            contact_1.Contact.findOneAndUpdate({ "_id": req.body.contact._id }, Object.assign({}, req.body.contact), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contacts.js.map