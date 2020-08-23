import { Document, Model, model, Schema, Types, } from "mongoose";

export interface ITask {
	contact: Types.ObjectId,
	date: string;
	type: number;
	details?: number;
	completed?: boolean;
	lastUpdated?: string;
}

export const TaskSchema = new Schema({

	date: {
		type: Date,
		required: true,
		default: new Date(),
	},

	type: {
		type: Number,
		required: true
	},

	details: {
		type: String,
		required: false
	},

	completed: {
		type: Boolean,
		required: false
	},

	contact: {
		type: Types.ObjectId,
		ref: "contact",
	},
});

export interface TaskDocument extends ITask, Document {}
export interface TasktModel extends Model<TaskDocument> {}
export const Task = model<TaskDocument>("task", TaskSchema);