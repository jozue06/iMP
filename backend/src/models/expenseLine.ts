import { Document, Model, model, Schema } from "mongoose";

export interface IExpenseLine {
	qtrReport?: string,
	itinReport?: string,
	date: string,
	paymentMethod: string,
	code: number,
	codeDescription: string,
	currency: string,
	exchangeRate?: number,
	foreignAmount?: number,
	dollarAmount: number,
	description?: string,
	multiPart?: boolean,
	receiptReq?: boolean,
}

const ExpenseLineSchema = new Schema({
	qtrReport: {
		type: Schema.Types.ObjectId,
		ref: "qtrReport",
	},

	itinReport: {
		type: Schema.Types.ObjectId,
		ref: "qtrReport",
	},

	date: {
		type: String,
		required: true,
	},

	paymentMethod: {
		type: String,
		required: true,
	},

	code: {
		type: Number,
		required: true,
	},

	codeDescription: {
		type: String,
		required: true,
	},

	currency: {
		type: String,
		required: true,
	},

	exchangeRate: {
		type: Number,
		required: false,
	},

	foreignAmount: {
		type: Number,
		required: false,
	},

	dollarAmount: {
		type: Number,
		required: true,
	},

	description: {
		type: String,
		required: false,
	},

	multiPart: {
		type: Boolean,
		required: false,
	},

	receiptReq: {
		type: Boolean,
		required: false,
	},

});

export interface ExpenseLineDocument extends IExpenseLine, Document { }
export interface ExpenseLineModel extends Model<ExpenseLineDocument> { }
export const ExpenseLine = model<ExpenseLineDocument>("expenseLine", ExpenseLineSchema);