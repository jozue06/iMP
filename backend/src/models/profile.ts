import { Document, Model, model, Schema, Types } from "mongoose";

export interface IProfile {
	user: {},
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
}

const ProfileSchema = new Schema({
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
		required: true,
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
});

export interface ProfileDocument extends IProfile, Document { }
export interface ProfileModel extends Model<ProfileDocument> { }
export const Profile = model<ProfileDocument>("profile", ProfileSchema);