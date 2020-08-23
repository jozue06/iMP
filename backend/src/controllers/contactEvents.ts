import { Event } from "../models/contactEvent"
import { Contact } from '../models/contact';
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class EventController {
	public createEvent = (userId: String, req: Request, res: Response, next: NextFunction) => {		
		const event = new Event(req.body.event);
		event.contact = req.body.event.contactId;
		event.save().then((savedEvent) => {
			Contact.findOneAndUpdate({ _id: req.body.event.contactId }, {$push: {events: savedEvent._id}}, { useFindAndModify: true });
			res.send(savedEvent);
		}).catch(e => {
			console.log('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllEvents = (userId: string, req: Request, res: Response, next: NextFunction) => {				
		Event.find({ "userId": userId }).then(events => {
			res.send(events);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getEvent = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.findById(req.params.id).then(event => {
			res.send(event);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateEventInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Event.findOneAndUpdate({"_id": req.body.event._id}, {...req.body.event }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};	
}