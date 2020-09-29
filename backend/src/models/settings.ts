import { Document, Model, model, Schema, Types } from "mongoose";
import { ContactGroupDocument } from "./contactGroup"
import { VehicleDocument } from "./vehicle";

export interface SettingsInterface {
	user: string,
	firstName?: string,
	spouseName?: string,
	lastName?: string,
	address?: string,
	city?: string,
	country?: string,
	email?: string,
	phone?: string,
	mobilePhone?: string,
	postalCode?: string,
	field?: string,
	accountNumber?: string,
	homeDistrict?: string,
	currentStatus?: string,
	contactGroups?: [ContactGroupDocument]
	vehicles?: [VehicleDocument]
}

const SettingsSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
	},

	firstName: {
		type: String,
		required: false,
	},

	spouseName: {
		type: String,
		required: false,
	},

	lastName: {
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

	country: {
		type: String,
		required: false,
	},

	email: {
		type: String,
		required: false,
	},

	phone: {
		type: String,
		required: false,
	},

	mobilePhone: {
		type: String,
		required: false,
	},

	postalCode: {
		type: String,
		required: false,
	},

	field: {
		type: String,
		required: false,
	},

	accountNumber: {
		type: String,
		required: false,
	},

	homeDistrict: {
		type: String,
		required: false,
	},

	currentStatus: {
		type: String,
		required: false,
	},

	contactGroups: [{
		type: Types.ObjectId,
		ref: "contactGroup",
		required: false,
	}],

	vehicles: [{
		type: Types.ObjectId,
		ref: "vehicle",
		required: false,
	}]
});

export interface SettingsDocument extends SettingsInterface, Document { }
export interface SettingsModel extends Model<SettingsDocument> { }
export const Settings = model<SettingsDocument>("setting", SettingsSchema);