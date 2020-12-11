import { Document, Model, model, Schema, Types } from "mongoose";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";
import { StatementLineDocument } from "./statementLine";

export interface StatementInterface {
	user: string,
	qtrReport?: string,
	institutionalReport?: string,
	date?: string;
	amount?: number;
	reimbursementAmount?: number;
	statementLines?: StatementLineDocument[]
}

const StatementSchema = new Schema({
	qtrReportId: {
		type: Schema.Types.ObjectId,
		ref: "qtrReport",
	},

	institutionalReportId: {
		type: Schema.Types.ObjectId,
		ref: "institutionalReport",
	},
	
	itinReportId: {
		type: Schema.Types.ObjectId,
		ref: "itinerationReport",
	},
	
	sdrReportId: {
		type: Schema.Types.ObjectId,
		ref: "sdrReport",
	},

	maReportId: {
		type: Schema.Types.ObjectId,
		ref: "maReport",
	},
	
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},

	date: {
		type: String,
	},

	amount: {
		type: Number,
	},
	
	reimbursementAmount: {
		type: Number,
	},

	statementLines: [{
		type: Schema.Types.ObjectId,
		ref: "statementLine"
	}],
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

StatementSchema.path("amount").get((num: number) => unformatNumber(num));
StatementSchema.path("amount").set((num: string) => formatNumber(num));

StatementSchema.path("reimbursementAmount").get((num: number) => unformatNumber(num));
StatementSchema.path("reimbursementAmount").set((num: string) => formatNumber(num));

export interface StatementDocument extends StatementInterface, Document { }
export interface StatementModel extends Model<StatementDocument> { }
export const Statement = model<StatementDocument>("statement", StatementSchema);