import { Document, Model, model, Schema, Types, } from "mongoose";

export interface IComm {
	contact: Types.ObjectId,
	date: string,
	time: string
	contactPersonType?: string,
	contactPersonName?: string,
	contactVia?: string;
	purpose?: string;
	notes?: string;
	response?: string;
}

export const CommSchema = new Schema({
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

	contactPersonType: {
		type: String,
		required: false,
		default: 0
	},

	contactPersonName: {
		type: String,
		required: false,
	},

	contactVia: {
		type: String,
		required: false,
	},

	purpose: {
		type: String,
		required: false,
	},

	notes: {
		type: String,
		required: false,
	},

	response: {
		type: String,
		required: false,
	},
});

export interface CommDocument extends IComm, Document {}
export interface CommModel extends Model<CommDocument> {}
export const Comm = model<CommDocument>("comm", CommSchema);