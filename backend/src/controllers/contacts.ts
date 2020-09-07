import { Contact } from "../models/contact"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class ContactController {
	public createContact = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const incomingContact = req.body.contact;
		incomingContact.userId = userId;
		const contact = new Contact(incomingContact);
		contact.save().then(() => {
			res.send(contact);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllContacts = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.find({ "userId": userId }).then(contacts => {
			res.send(contacts);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getContact = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.findById(req.params.id).populate("events").populate("tasks").populate("comms").then(contact => {
			res.send(contact);
		}).catch(e => {
			console.error('ee', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateContactInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.findOneAndUpdate({"_id": req.body.contact._id}, {...req.body.contact }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}