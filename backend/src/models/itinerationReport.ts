import { Document, Model, model, Schema, Types, } from "mongoose";
import { ExpenseLineDocument } from "./expenseLine";
import { MileageLogDocument } from "./mileageLog";
import { OfferingDocument } from "./offeringLine";

export interface ItinerationReportInterface {
	user: string,

	month: string,
	year: string,
	dateCompleted?: string,

	carMiles?: number,
	carCentsPerMiles?: number,

	trailerMiles?: number,
	trailerCentsPerMiles?: number,

	trailerLodgingNights?: number,
	trailerLodgingPrice?: number,

	trailerParkNights?: number,
	trailerParkPrice?: number,

	commitmentAmount?: number,
	cashAmount?: number,

	numberOfServices?: number,
	numberOfAppointments?: number,

	startReceiptNo?: string,
	endReceiptNo?: string,
	personaNotes?: string,
	comments?: string,

	expenseLines?: ExpenseLineDocument[],
	mileageLogs?: MileageLogDocument[],
	offeringLines?: OfferingDocument[],
}

const ItenReportSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	month: {
		type: String,
		required: true,
	},

	year: {
		type: String,
		required: true,
	},

	dateCompleted: {
		type: String,
	},

	carMiles: {
		type: Number,
	},

	carCentsPerMiles: {
		type: Number,
	},

	trailerMiles: {
		type: Number,
	},

	trailerCentsPerMiles: {
		type: Number,
	},

	trailerLodgingNights: {
		type: Number,
	},

	trailerLodgingPrice: {
		type: Number,
	},


	trailerParkNights: {
		type: Number,
	},

	trailerParkPrice: {
		type: Number,
	},

	commitmentAmount: {
		type: Number,
	},

	cashAmount: {
		type: Number,
	},

	numberOfServices: {
		type: Number,
	},

	numberOfAppointments: {
		type: Number,
	},

	startReceiptNo: {
		type: String,
	},

	endReceiptNo: {
		type: String,
	},

	comments: {
		type: String,
	},

	personalNotes: {
		type: String,
	},

	expenseLines: [{
		type: Schema.Types.ObjectId,
		ref: 'expenseLine',
		defaut: []
	}],

	offeringLines: [{
		type: Schema.Types.ObjectId,
		ref: 'offering',
		defaut: []
	}],
	
	mileageLogs: [{
		type: Schema.Types.ObjectId,
		ref: 'mileageLog' ,
		defaut: []
	}],
});

export interface ItinReportDocument extends ItinerationReportInterface, Document {}
export interface ItinReportModel extends Model<ItinReportDocument> { }
export const ItinReport = model<ItinReportDocument>("itinReport", ItenReportSchema);