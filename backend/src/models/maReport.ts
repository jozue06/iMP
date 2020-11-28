import { Document, Model, model, Schema, Types, } from "mongoose";
import { StatementDocument } from "./statement";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface MAReportInterface {
	user: string,

	month?: string,
	year?: string,
	dateCompleted?: string,

	expectedDateToField?: string,

	totalOfferings?: number,
	estimatedExpenses?: number,

	numberOfServices?: number,

	numberOfAppointments?: number,
	
	letters?: number,

	phoneCalls?: number,

	otherComms?: number,

	receiptBooksNeeded?: number,
	commitmentFormsNeeded?: number,
	statement?: StatementDocument[],
	comments?: string,
}

const MAReportSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	month: {
		type: String,
	},

	year: {
		type: String,
	},

	dateCompleted: {
		type: String,
	},

	expectedDateToField: {
		type: String,
	},

	totalOfferings: {
		type: Number,
		default: 0,
	},

	estimatedExpenses: {
		type: Number,
		default: 0,
	},

	numberOfServices: {
		type: Number,
		default: 0,
	},

	numberOfAppointments: {
		type: Number,
		default: 0,
	},

	letters: {
		type: Number,
		default: 0,
	},

	phoneCalls: {
		type: Number,
		default: 0,
	},

	otherComms: {
		type: Number,
		default: 0,
	},

	receiptBooksNeeded: {
		type: Number,
		default: 0,
	},
	
	commitmentFormsNeeded: {
		type: Number,
		default: 0,
	},

	statement: {
		type: [Schema.Types.ObjectId],
		ref: 'statement',
		default: []
	},

	comments: {
		type: String,
	},	
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

MAReportSchema.path("totalOfferings").get((num: number) => unformatNumber(num));
MAReportSchema.path("totalOfferings").set((num: string) => formatNumber(num));

MAReportSchema.path("estimatedExpenses").get((num: number) => unformatNumber(num));
MAReportSchema.path("estimatedExpenses").set((num: string) => formatNumber(num));

export interface MAReportDocument extends MAReportInterface, Document {}
export interface MAReportModel extends Model<MAReportDocument> { }
export const MAReport = model<MAReportDocument>("maReport", MAReportSchema);