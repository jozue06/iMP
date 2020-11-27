import { Document, Model, model, Schema, Types, } from "mongoose";

export interface TaskInterface {
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

TaskSchema.index({contact: 1, date: 1, type: 1}, {unique: true});

export interface TaskDocument extends TaskInterface, Document {}
export interface TaskModel extends Model<TaskDocument> {}
export const Task = model<TaskDocument>("task", TaskSchema);