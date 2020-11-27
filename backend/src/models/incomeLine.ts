import { Document, Model, model, Schema, Types } from "mongoose";

export interface IncomeLineInterface {
	reportId: string,
	date: string,
	code: number,
	codeDescription: string,

	currency: string,

	exchangeRate?: number,
	foreignAmount?: number,
	dollarAmount: number,
	description?: string,

	comments?: string,
}

const IncomeSchema = new Schema({
	reportId: {
		type: Types.ObjectId,
		ref: "institutionReport",
	},

	amount: {
		type: Number,
	},

	comments: {
		type: String,
	},

});

export interface IncomeDocument extends IncomeLineInterface, Document { }
export interface IncomeModel extends Model<IncomeDocument> { }
export const IncomeLine = model<IncomeDocument>("incomeLine", IncomeSchema);