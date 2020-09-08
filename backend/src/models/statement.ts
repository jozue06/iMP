import { Document, Model, model, Schema, Types } from "mongoose";

export interface IStatement {
	qtrReport: string,
	user: string,
	dateOne?: string;
	amountOne?: number;
	reimbursementOne?: number;
	dateTwo?: string;
	amountTwo?: number;
	reimbursementTwo?: number;
	dateThree?: string;
	amountThree?: number;
	reimbursementThree?: number;
}

const StatementSchema = new Schema({
	qtrReport: {
		type: Schema.Types.ObjectId,
		ref: "qtrReport",
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},

	dateOne: {
		type: String,
	},

	amountOne: {
		type: Number,
	},

	reimbursementOne: {
		type: Number,
	},

	dateTwo: {
		type: String,
	},

	amountTwo: {
		type: Number,
	},

	reimbursementTwo: {
		type: Number,
	},

	dateThree: {
		type: String,
	},

	amountThree: {
		type: Number,
	},

	reimbursementThree: {
		type: Number,
	},
});

export interface StatementDocument extends IStatement, Document { }
export interface StatementModel extends Model<StatementDocument> { }
export const Statement = model<StatementDocument>("statement", StatementSchema);