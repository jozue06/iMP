import { Document, Model, model, Schema, Types } from "mongoose";

export interface IStatement {
	qtrReport: string,
	user: string,
	dateOne: string;
	amountOne: number;
	reimbursementOne: number;
	dateTwo: string;
	amountTwo: number;
	reimbursementTwo: number;
	dateThree: string;
	amountThree: number;
	reimbursementThree: number;
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
		required: true,
	},

	amountOne: {
		type: Number,
		required: true,
	},

	reimbursementOne: {
		type: Number,
		required: true,
	},

	dateTwo: {
		type: String,
		required: true,
	},

	amountTwo: {
		type: Number,
		required: true,
	},

	reimbursementTwo: {
		type: Number,
		required: true,
	},

	dateThree: {
		type: String,
		required: true,
	},

	amountThree: {
		type: Number,
		required: true,
	},

	reimbursementThree: {
		type: Number,
		required: true,
	},
});

export interface StatementDocument extends IStatement, Document { }
export interface StatementModel extends Model<StatementDocument> { }
export const Statement = model<StatementDocument>("statement", StatementSchema);