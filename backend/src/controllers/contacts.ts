import { ContactSchema } from "../models/contact.model"
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';


export let createContact = (req: Request, res: Response, next: NextFunction) => {
	const contact = new ContactSchema(req.body.contact);
	contact.save().then(() =>{
		res.send(contact);
	}).catch(e => {
		next(new ValidationException(JSON.stringify(e.errors)));
	});
};

export let allBooks = (req: Request, res: Response) => {
  res.send("Returns all Books");
};

export let getBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let deleteBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let updateBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};