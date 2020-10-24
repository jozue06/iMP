import { Document, Model, model, Schema, Types, } from "mongoose";

export interface ITask {
	contact: Types.ObjectId,
	date: string;
	type: string;
	details?: number;
	completed?: boolean;
}

export const TaskSchema = new Schema({

	date: {
		type: Date,
		required: true,
		default: new Date(),
	},

	type: {
		type: String,
		required: true
	},

	details: {
		type: String,
		required: false
	},

	completed: {
		type: Boolean,
		required: false,
		default: false
	},

	contact: {
		type: Types.ObjectId,
		ref: "contact",
	},
});

export interface TaskDocument extends ITask, Document {}
export interface TasktModel extends Model<TaskDocument> {}
export const Task = model<TaskDocument>("task", TaskSchema);