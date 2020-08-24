import { Document, Schema, Model, model, Error, Types } from "mongoose";
import { ProfileDocument } from "./profile"
import { ContactGroupDocument } from "./contactGroup"
import { VehicleDocument } from "./vehicle";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
	id: Types.ObjectId;
	username: string;
	password: string;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	profile?: ProfileDocument;
	contactGroups?: [ContactGroupDocument]
	vehicles?: [VehicleDocument]
}

export interface AuthToken {
	accessToken: string;
}

export const userSchema: Schema = new Schema({
	username: String,
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,

	profile: {
		type: Types.ObjectId,
		ref: "profile"
	},

	contactGroups: [{
		type: Types.ObjectId,
		ref: "contactGroup"
	}],

	vehicles: [{
		type: Types.ObjectId,
		ref: "vehicle"
	}]

});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {	
	bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {		
		callback(err, isMatch);
	});
};

export const User: Model<IUser> = model<IUser>("user", userSchema);