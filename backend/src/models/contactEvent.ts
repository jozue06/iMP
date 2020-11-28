import { Document, Model, model, Schema, Types, } from "mongoose";

export interface EventInterface {
	contact: Types.ObjectId,
	date: string,
	time: string
	type?: string,
	details?: string,
	isCompleted?: boolean,
	amountReceived?: number
}

export const EventSchema = new Schema({
	contact: {
		type: Types.ObjectId,
		ref: "contact",
	},

	date: {
		type: String,
		required: true
	},

	time: {
		type: String,
		required: true
	},

	type: {
		type: String,
		required: false,
		default: ""
	},

	details: {
		type: String,
		required: false,
	},

	isCompleted: {
		type: Boolean,
		required: false,
		default: false,
	},

	amountReceived: {
		type: Number,
		required: false,
		default: 0,
	},
});

EventSchema.index({contact: 1, date: 1, time: 1}, {unique: true});

export interface EventDocument extends EventInterface, Document {}
export interface EventModel extends Model<EventDocument> {}
export const Event = model<EventDocument>("event", EventSchema);