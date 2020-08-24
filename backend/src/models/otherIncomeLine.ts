import { Document, Model, model, Schema, Types } from "mongoose";

export interface IOtherIncome {
	qtrReport: string,
	contact?: string,
	type: string, // can be 'direct donor', or 'personal
	firstName?: string,
	lastName?: string,	
	address?: string,
	city?: string,
	country?: string,
	amount: number,
	comments?: string,
}

const OtherIncomeSchema = new Schema({
	qtrReport: {
		type: Types.ObjectId,
		ref: "qtrReport",
	},

	contact: {
		type: Types.ObjectId,
		ref: "contact",
	},

	type: {
		type: String,
		required: true
	},

	firstName: {
		type: String,
	},

	lastName: {
		type: String,	
	},

	address: {
		type: String,
	},

	city: {
		type: String,
	},

	country: {
		type: String,
	},

	amount: {
		type: Number,
	},

	comments: {
		type: String,
	},

});

export interface OtherIncomeDocument extends IOtherIncome, Document { }
export interface OtherIncomeModel extends Model<OtherIncomeDocument> { }
export const OtherIncome = model<OtherIncomeDocument>("otherIncome", OtherIncomeSchema);