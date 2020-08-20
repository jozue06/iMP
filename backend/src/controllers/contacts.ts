import { ContactSchema } from "../models/contact.model"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class ContactController {
	public createContact = (req: Request, res: Response, next: NextFunction) => {
		const contact = new ContactSchema(req.body.contact);
		contact.save().then(() =>{
			res.send(contact);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}