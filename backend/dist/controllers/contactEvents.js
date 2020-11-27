"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const contactEvent_1 = require("../models/contactEvent");
const contact_1 = require("../models/contact");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class EventController {
    constructor() {
        this.createEvent = (userId, req, res, next) => {
            const event = new contactEvent_1.Event(req.body.event);
            event.contact = req.body.event.contactId;
            event.save().then((savedEvent) => {
                contact_1.Contact.findOneAndUpdate({ _id: req.body.event.contactId }, { $push: { events: savedEvent._id } }, { useFindAndModify: true, new: true }).then((saved) => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getAllEvents = (userId, req, res, next) => {
            contactEvent_1.Event.find({ "userId": userId }).then((events) => {
                res.send(events);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getEvent = (userId, req, res, next) => {
            contactEvent_1.Event.findById(req.params.id).then(event => {
                res.send(event);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateEventInfo = (userId, req, res, next) => {
            contactEvent_1.Event.findOneAndUpdate({ "_id": req.body.event._id }, Object.assign({}, req.body.event), { useFindAndModify: true }).then((savedEvent) => {
                res.send(savedEvent);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.toggleMany = (userId, req, res, next) => {
            let ids = req.body.events.map((event) => event._id);
            let completedToSet = req.body.completedToSet;
            contactEvent_1.Event.updateMany({ "_id": { $in: ids } }, { isCompleted: completedToSet }, { useFindAndModify: true }).then((r) => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.deleteEvents = (userId, req, res, next) => {
            contactEvent_1.Event.deleteMany({ "_id": { $in: req.body.eventIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
    }
}
exports.EventController = EventController;
//# sourceMappingURL=contactEvents.js.map