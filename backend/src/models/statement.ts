import { Document, Model, model, Schema, Types } from "mongoose";

export interface IStatement {
	qtrReport: string,
	user: string,
	date: Date;
	amount: number;
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

	date: {
		type: Date,
		required: true,
	},

	amount: {
		type: Number,
		required: true,
	}
});

export interface StatementDocument extends IStatement, Document { }
export interface StatementModel extends Model<StatementDocument> { }
export const Statement = model<StatementDocument>("statement", StatementSchema);