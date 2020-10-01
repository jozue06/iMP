import { Document, Model, model, Schema, Types } from "mongoose";

export interface IVehicle {
	user: string,
	name: string,
	active?: boolean,
	type?: string,
	year?: string,
	make?: string,
	carModel?: string,
	chassisNumber?: string,
	motorNumber?: string,
	stlAgreementNumber?: string,
	comments?: string,
	address?: string,
	city?: string,
	state?: string,
	zip?: string,
	country?: string
}

const VehicleSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
		required: true,
	},

	name: {
		type: String,
		required: true,
	},

	active: {
		type: Boolean,
		required: false,
	},

	default: {
		type: Boolean,
		required: false,
	},
	
	type: {
		type: String,
		required: false,
	},

	year: {
		type: String,
		required: false,
	},

	make: {
		type: String,
		required: false,
	},

	model: {
		type: String,
		required: false,
	},

	chassisNumber: {
		type: String,
		required: false,
	},

	motorNumber: {
		type: String,
		required: false,
	},

	stlAgreementNumber: {
		type: String,
		required: false,
	},

	comments: {
		type: String,
		required: false,
	},

	address: {
		type: String,
		required: false,
	},

	city: {
		type: String,
		required: false,
	},

	state: {
		type: String,
		required: false,
	},

	zip: {
		type: String,
		required: false,
	},

	country: {
		type: String,
		required: false,
	},

});

export interface VehicleDocument extends IVehicle, Document { }
export interface VehicleModel extends Model<VehicleDocument> { }
export const Vehicle = model<VehicleDocument>("vehicle", VehicleSchema);