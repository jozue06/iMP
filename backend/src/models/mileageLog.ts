import { Document, Model, model, Schema, Types } from "mongoose";
import { VehicleDocument } from "./vehicle";

export interface MileageLogInterface {
	qtrReport: string,
	date: string,
	odometerStart: number,
	odometerEnd: number,
	type: string,
	description?: string,
	vehicle: VehicleDocument,
}

const MileageLogSchema = new Schema({
	qtrReport: {
		type: Schema.Types.ObjectId,
		ref: "qtrReport",
	},

	date: {
		type: String,
		required: true,
	},

	odometerStart: {
		type: Number,
		required: true,
	},

	odometerEnd: {
		type: Number,
		required: true,
	},

	type: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: false,
	},

	vehicle: {
		type: Types.ObjectId,
		ref: "vehicle",
		required: false,
	},
});

export interface MileageLogDocument extends MileageLogInterface, Document { }
export interface MileageLogModel extends Model<MileageLogDocument> { }
export const MileageLog = model<MileageLogDocument>("mileageLog", MileageLogSchema);