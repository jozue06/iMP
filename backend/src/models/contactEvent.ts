import { Document, Model, model, Schema, Types, } from "mongoose";

export interface IEvent {
	contact: Types.ObjectId,
	date: string,
	time: string
	type?: number,
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
		type: Number,
		required: false,
		default: 0
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

export interface EventDocument extends IEvent, Document {}
export interface EventModel extends Model<EventDocument> {}
export const Event = model<EventDocument>("event", EventSchema);