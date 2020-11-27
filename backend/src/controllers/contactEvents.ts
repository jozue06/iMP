import { Event, EventDocument } from "../models/contactEvent"
import { Contact, ContactDocument } from '../models/contact';
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class EventController {
	public createEvent = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const event = new Event(req.body.event);
		event.contact = req.body.event.contactId;
		event.save().then((savedEvent: EventDocument) => {
			Contact.findOneAndUpdate({ _id: req.body.event.contactId }, {$push: {events: savedEvent._id}}, { useFindAndModify: true, new: true }).then((saved: ContactDocument) => {
				res.send(saved);
			});
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(e.errors));
		});
	};

	public getAllEvents = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.find({ "userId": userId }).then((events: EventDocument[]) => {
			res.send(events);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getEvent = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.findById(req.params.id).then(event => {
			res.send(event);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public updateEventInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.findOneAndUpdate({"_id": req.body.event._id}, {...req.body.event }, { useFindAndModify: true }).then((savedEvent: EventDocument) => {
			res.send(savedEvent);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public toggleMany = (userId: string, req: Request, res: Response, next: NextFunction) => {		
		let ids = req.body.events.map((event: EventDocument) => event._id);
		let completedToSet = req.body.completedToSet;
		Event.updateMany({"_id": { $in: ids } }, { isCompleted: completedToSet }, { useFindAndModify: true }).then((r: EventDocument[]) => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public deleteEvents = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.deleteMany( {"_id": { $in: req.body.eventIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};
}