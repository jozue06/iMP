import { Document, Schema, Model, model, Error, Types } from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
	id: Types.ObjectId;
	username: string;
	password: string;
}

export const userSchema: Schema = new Schema({
	username: String,
	password: String,
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {	
	bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {		
		callback(err, isMatch);
	});
};

export const User: Model<IUser> = model<IUser>("User", userSchema);