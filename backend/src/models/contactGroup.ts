import { Document, Model, model, Schema, Types, } from "mongoose";
import { ContactDocument } from "./contact";

export interface ContactGroupInterface {
	user: string,
	name: string,
	contacts: [ContactDocument],
}

export const ContactGroupSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "user",
	},

	contacts: [{
		type: Types.ObjectId,
		ref: "contact",
	}],

	name: {
		type: String,
		required: true,
	},

});

ContactGroupSchema.index({user:1, name: 1}, {unique: true});

export interface ContactGroupDocument extends ContactGroupInterface, Document {}
export interface ContactGroupModel extends Model<ContactGroupDocument> {}
export const ContactGroup = model<ContactGroupDocument>("contactGroup", ContactGroupSchema);