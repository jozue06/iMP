import { Document, Model, model, Schema } from "mongoose";

export interface IContact {
	userId: string,
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	country: string,
	email: string,
	phone: string,
	postalCode: string,
	orgName: string,
	isIndividual: boolean,
	secretary?: string,
	missionsContact?: string,
	district?: string,
	section?: string,
	secondAddress?: string,
	secondCity?: string,
	secondCountry?: string,
	secondEmail?: string,
	secondPhone?: string,
	secondPostalCode?: string,
	contactStatus: number,
	commitmentAmt?: number,
	accountNumber?: string
}

const ContactSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},

	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
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

	postalCode: {
		type: String,
		required: false,
	},

	orgName: {
		type: String,
		required: false,
	},

	isIndividual: {
		type: Boolean,
		required: false,
	},

	secretary: {
		type: String,
		required: false,
	},

	missionsContact: {
		type: String,
		required: false,
	},

	district: {
		type: String,
		required: false,
	},

	section: {
		type: String,
		required: false,
	},

	secondAddress: {
		type: String,
		required: false,
	},

	secondCity: {
		type: String,
		required: false,
	},

	secondCountry: {
		type: String,
		required: false,
	},

	secondEmail: {
		type: String,
		required: false,
	},

	secondPhone: {
		type: String,
		required: false,
	},

	secondPostalCode: {
		type: String,
		required: false,
	},

	contactStatus: {
		type: Number,
		required: true,
		default: 0,
	},

	commitmentAmt: {
		type: Number,
		required: false,
		default: 0
	},

	accountNumber: {
		type: String,
		required: false,

	},

	events: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'event' 
	}],
});

export interface ContactDocument extends IContact, Document { }
export interface ContactModel extends Model<ContactDocument> { }
export const Contact = model<ContactDocument>("contact", ContactSchema);