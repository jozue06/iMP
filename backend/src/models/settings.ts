import { Document, Model, model, Schema, Types } from "mongoose";
import { ContactGroupDocument } from "./contactGroup"
import { VehicleDocument } from "./vehicle";
import { formatNumber, unformatNumber } from "../utils/moneyUtils";

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
	carCentsPerMile?: number,
	trailerCentsPerMile?: number,
	trailerLodgingPrice?: number,
	totalPledgesRequired?: number,
	totalCashRequired?: number,
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

	carCentsPerMile: {
		type: Number,
		required: false,
		default: 0
	},

	trailerCentsPerMile: {
		type: Number,
		required: false,
		default: 0
	},

	trailerLodgingPrice: {
		type: Number,
		required: false,
		default: 0
	},

	totalPledgesRequired: {
		type: Number,
		required: false,
		default: 0
	},

	totalCashRequired: {
		type: Number,
		required: false,
		default: 0
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
},
	{
		toObject: {getters: true},
		toJSON: {getters: true},
	}
);

SettingsSchema.path("carCentsPerMile").get((num: number) => unformatNumber(num));
SettingsSchema.path("carCentsPerMile").set((num: string) => formatNumber(num));

SettingsSchema.path("trailerCentsPerMile").get((num: number) => unformatNumber(num));
SettingsSchema.path("trailerCentsPerMile").set((num: string) => formatNumber(num));

SettingsSchema.path("trailerLodgingPrice").get((num: number) => unformatNumber(num));
SettingsSchema.path("trailerLodgingPrice").set((num: string) => formatNumber(num));

SettingsSchema.path("totalPledgesRequired").get((num: number) => unformatNumber(num));
SettingsSchema.path("totalPledgesRequired").set((num: string) => formatNumber(num));

SettingsSchema.path("totalCashRequired").get((num: number) => unformatNumber(num));
SettingsSchema.path("totalCashRequired").set((num: string) => formatNumber(num));

export interface SettingsDocument extends SettingsInterface, Document { }
export interface SettingsModel extends Model<SettingsDocument> { }
export const Settings = model<SettingsDocument>("setting", SettingsSchema);