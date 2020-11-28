import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User, AuthToken, UserInterface} from "../models/userModel";
import { JWT_SECRETE } from "../utils/secret";
import ValidationException from '../exceptions/ValidationException';
import { WriteError } from "mongodb";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
 
export class UserController {

	public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.body.username || req.body.username == "") {
			next(new ValidationException({"message":"Please Enter a Valid User Name and Password"}));
		}

		const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

		const userCreated = User.create({
			username: req.body.username,
			password: hashedPassword,
		});

		const token = jwt.sign({ userId: (await userCreated)._id, username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
		res.status(200).send({ token });
	}


	public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.body.username || req.body.username == "" || !req.body.password || req.body.password == "") {
			return next(new ValidationException({"message":"Please Enter a Valid User Name and Password"}));
		}

		const username = req.body.username
		await User.findOne({ username }, async (err, user: any) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(new ValidationException({"message":`User with user name  ${username} not found.`}));
			}
			await user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
				if (err) { return next(err); }
				if (isMatch) {
					const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
					return res.status(200).send({ token });
				} else {
					return next(new ValidationException({"message":"Username or password incorrect."}));
				}
			});
		});
	}

	public postForgot = async (req: Request, res: Response, next: NextFunction) => {		
		if (!req.body.username || req.body.username == "") {
			return next(new ValidationException({"message":"Please Enter a Valid User Name and Password"}));
		}
		async.waterfall([
			
			function createRandomToken(done: Function) {
				crypto.randomBytes(16, (err, buf) => {
					const token = buf.toString("hex");
					done(err, token);
				});
			},

			function setRandomToken(token: AuthToken, done: Function) {
				User.findOne({ username: req.body.username }, (err, user: any) => {
					if (err) { 
						return done(err); 
					}

					if (!user) {
						return next(new ValidationException({"message":`User with user name  ${req.body.username } not found.`}));
					}
					user.passwordResetToken = token;
					user.passwordResetExpires = Date.now() + 3600000; // 1 hour

					user.save(() => {
						done(err, token, user);
					});
				});
			},

			function sendForgotPasswordEmail(token: AuthToken, user: UserInterface, done: Function) {
				if (!user.settings || !user.settings.email || user.settings.email == "") {
					return next(new ValidationException({"message":`You have not setup an e-mail address for this account. Please email us at imp.app.info@gmail.com to reset your account`})); 
				}
				let options = { service: 'gmail',
					auth: {
						user: 'imp.app.info@gmail.com',
						pass: 'My4p3t^t4WMKTxqy'
					}
				}
				let transport = nodemailer.createTransport(options);
				
				const msg = {
					to: user.settings.email,
					from: 'noreply@gmail.com',
					subject: 'Imp APP Info',
					html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
						Please click on the following link, or paste this into your browser to complete the process:\n\n
						http://localhost:8080/#/user/reset/${token}\n\n
						<strong>If you did not request this, please contact us at imp.app.info@gmail.com .</strong>\n`,
				};

				transport.sendMail(msg).then(() => {
					return res.sendStatus(200);
				}).catch((e:any) => console.error('err', e));
			},
		], (err) => {
			if (err) { 
				return next(err); 
			}
		});
	};

	public postReset = async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.token || req.body.token == "") {
			return next(new ValidationException({"message":"An error occurred"}));
		}

		async.waterfall([
			function resetPassword(done: Function) {
				User.findOne({ passwordResetToken: req.body.token })
					.where("passwordResetExpires").gt(Date.now())
					.exec((err, user: any) => {
						if (err) { return next(err); }
						if (!user) {
							return next(new ValidationException({"message":"Password reset token is invalid or has expired."}));
						}

						user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

						user.passwordResetToken = undefined;
						user.passwordResetExpires = undefined;

						user.save((err: WriteError) => {
							if (err) { return next(err); }
							return res.sendStatus(200);
						});
					});
			},

			function sendForgotPasswordEmail(token: AuthToken, user: UserInterface, done: Function) {
			let options = { service: 'gmail',
				auth: {
					user: 'imp.app.info@gmail.com',
					pass: 'My4p3t^t4WMKTxqy'
				}
			}
			let transport = nodemailer.createTransport(options);
			
			const msg = {
				to: user.settings.email,
				from: 'noreply@gmail.com',
				subject: "Your Imp APP password has been changed",
				html: `Hello,\n\nThis is a confirmation that the password for your account ${user.settings.email} has just been changed.\n
					<strong>If you did not request this, please contact us at imp.app.info@gmail.com .</strong>\n`,
			};

			transport.sendMail(msg).then(() => {
				return res.sendStatus(200);
			}).catch((e:any) => console.error('err', e));

		}], (err) => {
			if (err) { return next(err); }
			res.redirect("/");
		});
	};
}