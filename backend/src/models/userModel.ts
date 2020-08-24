import { Document, Schema, Model, model, Error, Types } from "mongoose";
import { ProfileDocument } from "./profile"
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
	id: Types.ObjectId;
	username: string;
	password: string;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	profile?: ProfileDocument
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
	}
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {	
	bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {		
		callback(err, isMatch);
	});
};

export const User: Model<IUser> = model<IUser>("user", userSchema);