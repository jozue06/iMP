import { Document, Model, model, Schema, Types, } from "mongoose";
import { ExpenseLineDocument } from "./expenseLine";
import { MileageLogDocument } from "./mileageLog";
import { StatementDocument } from "./statement";
import { OtherIncomeDocument } from "./otherIncomeLine";

export interface QtrReportInterface {
	user: string,
	quarterNumber?: number,
	year?: string,
	dateCompleted?: Date,
	baseAmount?: number,
	comments?: string,
	deficitReimbursement?: number,
	otherAGWMIncome?: number,
	otherNonAGWMIncome?: number,
	sdrReferenceNumbers?: string,
	sdrBalance?: number,
	otherFundsHeld?: number,
	personalOfferingsRetained?: number,

	expenseLines?: ExpenseLineDocument[],
	mileageLogs?: MileageLogDocument[],
	statement?: StatementDocument[],
	otherIncomeLines?: OtherIncomeDocument[],
}

const QtrReportSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	quarterNumber: {
		type: Number,
		// required: true,
	},

	year: {
		type: String,
		// required: true,
	},

	dateCompleted: {
		type: Date,
	},

	baseAmount: {
		type: Number,
	},

	comments: {
		type: String,
	},

	deficitReimbursement: {
		type: Number,
	},

	otherAGWMIncome: {
		type: Number,
	},

	otherNonAGWMIncome: {
		type: Number,
	},

	sdrReferenceNumbers: {
		type: String,
	},

	sdrBalance: {
		type: Number,
	},

	otherFundsHeld: {
		type: Number,
	},

	personalOfferingsRetained: {
		type: Number,
	},

	expenseLines: [{
		type: Schema.Types.ObjectId,
		ref: 'expenseLine',
		default: []
	}],

	mileageLogs: [{
		type: Schema.Types.ObjectId,
		ref: 'mileageLog' ,
		default: []
	}],

	statement: {
		type: [Schema.Types.ObjectId],
		ref: 'statement',
		default: [],
	},

	otherIncomeLines: [{
		type: Schema.Types.ObjectId,
		ref: 'otherIncomeLine',
		default: []
	}],
});

QtrReportSchema.index({ user: 1, quarterNumber: 1, year: 1}, {unique: true});

export interface QtrReportDocument extends QtrReportInterface, Document {}
export interface QtrReportModel extends Model<QtrReportDocument> { }
export const QtrReport = model<QtrReportDocument>("qtrReport", QtrReportSchema);