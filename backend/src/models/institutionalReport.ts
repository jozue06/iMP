import { Document, Model, model, Schema, Types, } from "mongoose";
import { ExpenseLineDocument } from "./expenseLine";
import { StatementDocument } from "./statement";
import { IncomeDocument } from "./incomeLine";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface InstitutionalReportInterface {
	user: string,

	institution: string,
	account: string,
	field?: string,

	month: number,
	year: string,
	beginningAmount?: number,

	usBankFunds?: number,
	localBankFunds?: number,
	pettyCashFunds?: number,
	LFTLsdrBalance?: number,
	nonLFTLsdrBalance?: number,
	
	dateCompleted?: Date,

	comments?: string,
	statement?: StatementDocument,
	expenseLines?: ExpenseLineDocument[],
	incomeLines?: IncomeDocument[],
}

const InstitutionalReportSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	month: {
		type: Number,
		required: true,
	},

	year: {
		type: String,
		required: true,
	},

	institution: {
		type: String,
		required: true,
	},

	account: {
		type: String,
		required: true,
	},

	field: {
		type: String,
		required: false,
	},

	dateCompleted: {
		type: Date,
	},

	beginningAmount: {
		type: Number,
	},

	usBankFunds: {
		type: Number,
	},
	
	localBankFunds: {
		type: Number,
	},

	pettyCashFunds: {
		type: Number,
	},

	LFTLsdrBalance: {
		type: Number,
	},

	nonLFTLsdrBalance: {
		type: Number,
	},

	comments: {
		type: String,
	},

	expenseLines: [{
		type: Schema.Types.ObjectId,
		ref: 'expenseLine',
		default: []
	}],

	incomeLines: [{
		type: Schema.Types.ObjectId,
		ref: 'incomeLine',
		default: []
	}],

	statement: {
		type: Schema.Types.ObjectId,
		ref: 'statement',
	},
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

InstitutionalReportSchema.path("beginningAmount").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("beginningAmount").set((num: string) => formatNumber(num));

InstitutionalReportSchema.path("usBankFunds").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("usBankFunds").set((num: string) => formatNumber(num));

InstitutionalReportSchema.path("localBankFunds").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("localBankFunds").set((num: string) => formatNumber(num));

InstitutionalReportSchema.path("pettyCashFunds").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("pettyCashFunds").set((num: string) => formatNumber(num));

InstitutionalReportSchema.path("LFTLsdrBalance").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("LFTLsdrBalance").set((num: string) => formatNumber(num));

InstitutionalReportSchema.path("nonLFTLsdrBalance").get((num: number) => unformatNumber(num));
InstitutionalReportSchema.path("nonLFTLsdrBalance").set((num: string) => formatNumber(num));

export interface InstitutionalReportDocument extends InstitutionalReportInterface, Document {}
export interface InstitutionalReportModel extends Model<InstitutionalReportDocument> { }
export const InstitutionalReport = model<InstitutionalReportDocument>("institutionalReport", InstitutionalReportSchema);