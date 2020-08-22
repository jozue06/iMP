import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passportJwt from "passport-jwt";
import { User } from "../models/userModel";
import { JWT_SECRETE } from "../utils/secret";
import ValidationException from '../exceptions/ValidationException';

const ExtractJwt = passportJwt.ExtractJwt;
export class UserController {

	public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.body.username || req.body.username == "") {
			next(new ValidationException("Please Enter a Valid User Name"));
		}

		const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		await User.create({
			username: req.body.username,
			password: hashedPassword,
		});

		const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
		res.status(200).send({ token: token });
	}

	public loginUser(req: Request, res: Response, next: NextFunction) {

		if (!req.body.username || req.body.username == "" || !req.body.password || req.body.password == "") {
			next(new ValidationException("Please Enter a Valid User Name"));
		}

		let username = req.body.username
		User.findOne({ username: username.toLowerCase() }, (err, user: any) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(new ValidationException(`User with user name  ${username} not found.`));
			}
			user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
				if (err) { return next(err); }
				if (isMatch) {
					const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
					return res.status(200).send({ token: token });
				}
			});
		});
	}
}