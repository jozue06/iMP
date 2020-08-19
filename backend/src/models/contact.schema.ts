import { Schema } from "mongoose";

const ContactSchema = new Schema({

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

});

export default ContactSchema;