import { Document, Model } from "mongoose";

export interface Contact {
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

export interface ContactDocument extends Contact, Document {}
export interface ContactModel extends Model<ContactDocument> {}