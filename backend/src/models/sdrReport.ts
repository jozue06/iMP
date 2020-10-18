import { Document, Model, model, Schema, Types, } from "mongoose";
import { ExpenseLineDocument } from "./expenseLine";
import { StatementDocument } from "./statement";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

export interface SDRReportInterface {
	user: string,
	reportLocationType?: number, // US = 0, Foreign = 1;
	dateCompleted?: Date,

	sdrNumber?: string,
	field?: string,
	sdrDate?: Date,
	disbursmentDate?: Date,
	
	receivingFunds?: number,
	receivingFundsDescription?: string,
	sdrReferenceNumber?: string,
	specialCheckDate?: Date,

	purpose?: string,
	accountCharged?: string,
	class?: string,
	source?: string,
	sdrAmount?: number,
	
	comments?: string,
	statement?: StatementDocument,
	expenseLines?: ExpenseLineDocument[],
}

const SDRReportSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	reportLocationType: { 
		type: Number, // US = 0, Foreign = 1;
		required: false,
	},

	dateCompleted: { 
		type: Date,
		required: false,
	},

	sdrNumber: { 
		type: String,
		required: false,
	},

	field: { 
		type: String,
		required: false,
	},

	sdrDate: { 
		type: Date,
		required: false,
	},

	disbursmentDate: { 
		type: Date,
		required: false,
	},
	
	receivingFunds: { 
		type: Number,
		required: false,
	},

	receivingFundsDescription: { 
		type: String,
		required: false,
	},

	sdrReferenceNumber: { 
		type: String,
		required: false,
	},

	specialCheckDate: { 
		type: Date,
		required: false,
	},

	purpose: { 
		type: String,
		required: false,
	},

	accountCharged: { 
		type: String,
		required: false,
	},

	class: { 
		type: String,
		required: false,
	},

	source: { 
		type: String,
		required: false,
	},

	sdrAmount: { 
		type: Number,
		required: false,
	},
	
	comments: { 
		type: String,
		required: false,
	},

	statement: {
		type: Schema.Types.ObjectId,
		ref: 'statement',
		defaut: []
	},

	expenseLines: [{
		type: Schema.Types.ObjectId,
		ref: 'expenseLine',
		defaut: []
	}],
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

export interface SDRReportDocument extends SDRReportInterface, Document {}
export interface SDRReportModel extends Model<SDRReportDocument> { }
export const SDRReport = model<SDRReportDocument>("sdrReport", SDRReportSchema);

SDRReportSchema.path("receivingFunds").get((num: number) => unformatNumber(num));
SDRReportSchema.path("receivingFunds").set((num: string) => formatNumber(num));

SDRReportSchema.path("sdrAmount").get((num: number) => unformatNumber(num));
SDRReportSchema.path("sdrAmount").set((num: string) => formatNumber(num));