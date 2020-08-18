import { Document, Model } from "mongoose";

export interface Task {
	date: Date;
	type: number;
	contactId: number;
	details?: number;
	completed?: boolean;
	lastUpdated?: Date;
}

export interface TaskDocument extends Task, Document {}
export interface TaskModel extends Model<TaskDocument> {}