import { Document, Model, model, Schema, Types } from "mongoose";

export interface OfferingInterface {
	itinReportId: string,
	date: string,
	contact: string
	type: number,
	receiptNo?: string,
	workSupportAmt?: number,
	specialAmt?: number,
	otherAmt?: number,
	hospitality?: number,
	equipment?: number,
	otherNonCash?: number,
	contactType?: number,
}

const OfferingSchema = new Schema({
	itinReportId: {
		type: Types.ObjectId,
		ref: "itinReport",
		required: true,
	},

	date: {
		type: String,
		required: true,
	},

	type: {
		type: Number,
		required: true,
		default: 0,
	},

	receiptNo: {
		type: String,
	},

	workSupportAmt: {
		type: Number,
	},

	specialAmt: {
		type: Number,
	},

	otherAmt: {
		type: Number,
	},

	hospitality: {
		type: Number,
	},

	equipment: {
		type: Number,
	},

	otherNonCash: {
		type: Number,
	},

	contactType: {
		type: Number,
		default: 0,
	},

	contact: {
		type: Types.ObjectId,
		ref: "contact",
	}
});

export interface OfferingDocument extends OfferingInterface, Document { }
export interface OfferingModel extends Model<OfferingDocument> { }
export const OfferingLine = model<OfferingDocument>("offeringLine", OfferingSchema);