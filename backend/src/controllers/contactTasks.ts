import { Task, TaskDocument } from "../models/contactTask";
import { Contact, ContactDocument } from '../models/contact';
import { Request, Response, NextFunction } from "express";
import ValidationException from '../exceptions/ValidationException';

export class TaskController {
	public createTask = (userId: String, req: Request, res: Response, next: NextFunction) => {
		const task = new Task(req.body.task);
		task.contact = req.body.task.contactId;
		task.save().then((savedTask: TaskDocument) => {
			Contact.findOneAndUpdate({ _id: req.body.task.contactId }, { $push: { tasks: savedTask._id } }, { useFindAndModify: true, new: true }).then((saved: ContactDocument) => {
				res.send(saved);
			});

		}).catch(e => {
			console.error('eeek ', e);
			next(new ValidationException(e.errors));
		});
	};

	public getAllTasks = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Task.find({ "userId": userId }).then((tasks: TaskDocument[]) => {
			res.send(tasks);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public getTask = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Task.findById(req.params.id).then((task: TaskDocument) => {
			res.send(task);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public updateTaskInfo = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Task.findOneAndUpdate({"_id": req.body.task._id}, {...req.body.task }, { useFindAndModify: true }).then((r: TaskDocument) => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public toggleMany = (userId: string, req: Request, res: Response, next: NextFunction) => {		
		let ids = req.body.tasks.map((task: TaskDocument) => task._id);
		let completedToSet = req.body.completedToSet;
		Task.updateMany({"_id": { $in: ids } }, { completed: completedToSet }, { useFindAndModify: true }).then((r: TaskDocument[]) => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public deleteTasks = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Task.deleteMany( {"_id": { $in: req.body.taskIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};
}