import { Document, Model, model, Schema, Types, } from "mongoose";
import { ExpenseLineDocument } from "./expenseLine";
import { MileageLogDocument } from "./mileageLog";
import { OfferingDocument } from "./offeringLine";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface ItinerationReportInterface {
	user: string,

	month: string,
	year: string,
	dateCompleted?: string,

	carMiles?: number,
	carCentsPerMile?: number,

	trailerMiles?: number,
	trailerCentsPerMile?: number,

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

const ItinReportSchema = new Schema({
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

	carCentsPerMile: {
		type: Number,
	},

	trailerMiles: {
		type: Number,
	},

	trailerCentsPerMile: {
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
		ref: 'offeringLine',
		defaut: []
	}],
	
	mileageLogs: [{
		type: Schema.Types.ObjectId,
		ref: 'mileageLog' ,
		defaut: []
	}],
	
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

ItinReportSchema.path("carMiles").get((num: number) => unformatNumber(num));
ItinReportSchema.path("carMiles").set((num: string) => formatNumber(num));

ItinReportSchema.path("carCentsPerMile").get((num: number) => unformatNumber(num));
ItinReportSchema.path("carCentsPerMile").set((num: string) => formatNumber(num));

ItinReportSchema.path("trailerCentsPerMile").get((num: number) => unformatNumber(num));
ItinReportSchema.path("trailerCentsPerMile").set((num: string) => formatNumber(num));


export interface ItinReportDocument extends ItinerationReportInterface, Document {}
export interface ItinReportModel extends Model<ItinReportDocument> { }
export const ItinReport = model<ItinReportDocument>("itinReport", ItinReportSchema);