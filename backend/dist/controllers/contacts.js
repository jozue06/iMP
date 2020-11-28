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
                if (e.code == 11000) {
                    let message = "";
                    if (e.keyValue.orgName) {
                        message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} and ${e.keyValue.orgName} already exists`;
                    }
                    else {
                        message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} already exists`;
                    }
                    return next(new ValidationException_1.default({ "message": message }));
                }
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getAllContacts = (userId, req, res, next) => {
            contact_1.Contact.find({ "userId": userId }).then(contacts => {
                res.send(contacts);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getContact = (userId, req, res, next) => {
            contact_1.Contact.findById(req.params.id).populate("events").populate("tasks").populate("comms").then(contact => {
                res.send(contact);
            }).catch(e => {
                console.error('ee', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateContactInfo = (userId, req, res, next) => {
            contact_1.Contact.findOneAndUpdate({ "_id": req.body.contact._id }, Object.assign({}, req.body.contact), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                if (e.code == 11000) {
                    let message = "";
                    if (e.keyValue.orgName) {
                        message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} and ${e.keyValue.orgName} already exists`;
                    }
                    else {
                        message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} already exists`;
                    }
                    return next(new ValidationException_1.default({ "message": message }));
                }
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.deleteContacts = (userId, req, res, next) => {
            contact_1.Contact.deleteMany({ "_id": { $in: req.body.contactIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.search = (userId, req, res, next) => {
            let textValue = req.body.textValue.trim();
            if (!textValue.length) {
                return res.send([]);
            }
            let regex = new RegExp(textValue, "gi");
            let orArray = [
                {
                    firstName: regex,
                },
                {
                    firstName: textValue.toLowerCase(),
                },
                {
                    firstName: textValue.toUpperCase(),
                },
                {
                    firstName: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    lastName: regex,
                },
                {
                    lastName: textValue.toLowerCase(),
                },
                {
                    lastName: textValue.toUpperCase(),
                },
                {
                    lastName: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    city: regex,
                },
                {
                    city: textValue.toLowerCase(),
                },
                {
                    city: textValue.toUpperCase(),
                },
                {
                    city: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    country: regex,
                },
                {
                    country: textValue.toLowerCase(),
                },
                {
                    country: textValue.toUpperCase(),
                },
                {
                    country: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    address: regex,
                },
                {
                    address: textValue.toLowerCase(),
                },
                {
                    address: textValue.toUpperCase(),
                },
                {
                    address: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    email: regex,
                },
                {
                    email: textValue.toLowerCase(),
                },
                {
                    email: textValue.toUpperCase(),
                },
                {
                    email: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    phone: regex,
                },
                {
                    phone: textValue.toLowerCase(),
                },
                {
                    phone: textValue.toUpperCase(),
                },
                {
                    phone: textValue[0].toUpperCase() + textValue.slice(1),
                },
                {
                    orgName: regex,
                },
                {
                    orgName: textValue.toLowerCase(),
                },
                {
                    orgName: textValue.toUpperCase(),
                },
                {
                    orgName: textValue[0].toUpperCase() + textValue.slice(1),
                }
            ];
            contact_1.Contact.find({ "userId": userId, $or: orArray }).then(results => {
                res.send(results);
            }).catch(e => {
                console.error('eeee', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contacts.js.map