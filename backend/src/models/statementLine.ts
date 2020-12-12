import { Document, Model, model, Schema, Types } from "mongoose";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface StatementLineInterface {
	statement?: Types.ObjectId
	date?: string,
	donorAccount?: string,
	churchOrg?: string,
	fullName?: string,
	amount?: string,
	class?: string,
	pledgeDate?: string,
	pledgeAmount?: number
	yearToDateAmount?: number
	receiptCount?: number
	contact?: Types.ObjectId,
}

const StatementLineSchema = new Schema({
	statement: {
		type: Types.ObjectId,
		ref: "statement"
	},
	
	date: {
		type: String,
	},
	
	donorAccount: {
		type: String,
	},
	
	churchOrg: {
		type: String,
	},
	
	fullName: {
		type: String,
	},
	
	amount: {
		type: Number,
	},
	
	class: {
		type: String,
	},
	
	pledgeDate: {
		type: String,
	},
	
	pledgeAmount: {
		type: Number,
	},

	yearToDateAmount: {
		type: Number,
	},

	receiptCount: {
		type: Number,
	},

	contact: {
		type: Types.ObjectId,
		ref: "contact"
	},
},
{
	toObject: {getters: true},
	toJSON: {getters: true},
}
);

StatementLineSchema.path("amount").get((num: number) => unformatNumber(num));
StatementLineSchema.path("amount").set((num: string) => formatNumber(num));

StatementLineSchema.path("pledgeAmount").get((num: number) => unformatNumber(num));
StatementLineSchema.path("pledgeAmount").set((num: string) => formatNumber(num));

StatementLineSchema.path("yearToDateAmount").get((num: number) => unformatNumber(num));
StatementLineSchema.path("yearToDateAmount").set((num: string) => formatNumber(num));

export interface StatementLineDocument extends StatementLineInterface, Document { }
export interface StatementLineModel extends Model<StatementLineDocument> { }
export const StatementLine = model<StatementLineDocument>("statementLine", StatementLineSchema);