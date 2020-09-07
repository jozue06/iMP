import { Document, Model, model, Schema, Types, } from "mongoose";
import { ContactDocument } from "./contact";

export interface IContactGroup {
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

export interface ContactGroupDocument extends IContactGroup, Document {}
export interface ContactGroupModel extends Model<ContactGroupDocument> {}
export const ContactGroup = model<ContactGroupDocument>("contactGroup", ContactGroupSchema);