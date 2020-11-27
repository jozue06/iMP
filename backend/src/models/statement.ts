import { Document, Model, model, Schema, Types } from "mongoose";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface StatementInterface {
	qtrReport?: string,
	institutionalReport?: string,
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

StatementSchema.path("amountOne").get((num: number) => unformatNumber(num));
StatementSchema.path("amountOne").set((num: string) => formatNumber(num));

StatementSchema.path("amountTwo").get((num: number) => unformatNumber(num));
StatementSchema.path("amountTwo").set((num: string) => formatNumber(num));

StatementSchema.path("amountThree").get((num: number) => unformatNumber(num));
StatementSchema.path("amountThree").set((num: string) => formatNumber(num));

StatementSchema.path("reimbursementOne").get((num: number) => unformatNumber(num));
StatementSchema.path("reimbursementOne").set((num: string) => formatNumber(num));

StatementSchema.path("reimbursementTwo").get((num: number) => unformatNumber(num));
StatementSchema.path("reimbursementTwo").set((num: string) => formatNumber(num));

StatementSchema.path("reimbursementThree").get((num: number) => unformatNumber(num));
StatementSchema.path("reimbursementThree").set((num: string) => formatNumber(num));

export interface StatementDocument extends StatementInterface, Document { }
export interface StatementModel extends Model<StatementDocument> { }
export const Statement = model<StatementDocument>("statement", StatementSchema);