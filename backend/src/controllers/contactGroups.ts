import { ContactGroup } from "../models/contactGroup"
import { Contact } from '../models/contact';
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class ContactGroupController {
	public createGroup = (userId: string, req: Request, res: Response, next: NextFunction) => {
		const contactGroup = new ContactGroup(req.body.contactGroup);
		contactGroup.user = userId;
		contactGroup.save().then((savedGroup) => {
			res.send(savedGroup);
		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllContactGroups = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ContactGroup.find({ "user": userId }).then(comms => {
			res.send(comms);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getContactGroup = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ContactGroup.findById(req.params.id).populate("contacts").then(group => {
			res.send(group);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateContactGroup = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ContactGroup.findOneAndUpdate({ "_id": req.body.contactGroup._id }, { ...req.body.contactGroup }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public deleteContactGroup = (userId: string, req: Request, res: Response, next: NextFunction) => {
		ContactGroup.deleteMany( {"_id": { $in: req.body.contactGroupIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};
}