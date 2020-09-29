import { Document, Schema, Model, model, Error, Types } from "mongoose";
import { SettingsDocument } from "./settings"
import bcrypt from "bcrypt-nodejs";

export interface IUser {
	username: string;
	password: string;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	settings?: SettingsDocument;
}

export interface AuthToken {
	accessToken: string;
}

export const UserSchema: Schema = new Schema({
	username: String,
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,

	settings: {
		type: Schema.Types.ObjectId,
		ref: "setting"
	},
});

UserSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
	bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
		callback(err, isMatch);
	});
};
export interface UserDocument extends IUser, Document { }
export interface UserModel extends Model<UserDocument> { }
export const User = model<UserDocument>("user", UserSchema);