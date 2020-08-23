import { Comm } from "../models/contactComms"
import { Contact } from '../models/contact';
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class CommsController {
	public createComm = (userId: String, req: Request, res: Response, next: NextFunction) => {		
		const comm = new Comm(req.body.comm);
		comm.contact = req.body.comm.contactId;
		comm.save().then((savedComm) => {
			Contact.findOneAndUpdate({ _id: req.body.comm.contactId }, { $push: { comms: savedComm._id } }, { useFindAndModify: true, new: true }).then(saved => {
				res.send(saved);
			});
			
		}).catch(e => {
			console.log('eeek ', e);
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getAllComms = (userId: string, req: Request, res: Response, next: NextFunction) => {				
		Comm.find({ "userId": userId }).then(comms => {
			res.send(comms);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public getComm = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Comm.findById(req.params.id).then(comm => {
			res.send(comm);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};

	public updateCommsInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Comm.findOneAndUpdate({"_id": req.body.comm._id}, {...req.body.comm }, { useFindAndModify: true }).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};	

	public deleteComs = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Comm.deleteMany( {"_id": { $in: req.body.commsIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(JSON.stringify(e.errors)));
		});
	};	
}