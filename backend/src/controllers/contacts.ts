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
			
			if (e.code == 11000) {
				let message = "";
				if (e.keyValue.orgName) {
					message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} and ${e.keyValue.orgName} already exists`;
				} else {
					message = `A Contact for ${e.keyValue.firstName} ${e.keyValue.lastName} already exists`;
				}
				console.log('message ?? ', message);
				
				return next(new ValidationException({"message":message}));
			}

			next(new ValidationException(e.errors));
		});
	};

	public getAllContacts = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.find({ "userId": userId }).then(contacts => {
			res.send(contacts);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getContact = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.findById(req.params.id).populate("events").populate("tasks").populate("comms").then(contact => {
			res.send(contact);
		}).catch(e => {
			console.error('ee', e);
			next(new ValidationException(e.errors));
		});
	};

	public updateContactInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.findOneAndUpdate({"_id": req.body.contact._id}, {...req.body.contact }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public deleteContacts = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Contact.deleteMany( { "_id": { $in: req.body.contactIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public search = (userId: string, req: Request, res: Response, next: NextFunction) => {
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
			
		Contact.find({"userId": userId, $or: orArray }).then(results => {
			res.send(results);
		}).catch(e => {
			console.error('eeee' , e);
			next(new ValidationException(e.errors));
		});
	};
}