import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User, AuthToken, IUser} from "../models/userModel";
import { JWT_SECRETE } from "../utils/secret";
import ValidationException from '../exceptions/ValidationException';
import { WriteError } from "mongodb";
const sgMail = require('@sendgrid/mail');
import { GRID_SEND_KEY } from "../utils/secret";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";

export class UserController {

	public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.body.username || req.body.username == "") {
			next(new ValidationException("Please Enter a Valid User Name"));
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
			return next(new ValidationException("Please Enter a Valid User Name"));
		}

		const username = req.body.username
		await User.findOne({ username }, async (err, user: any) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(new ValidationException(`User with user name  ${username} not found.`));
			}
			await user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
				if (err) { return next(err); }
				if (isMatch) {
					const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
					return res.status(200).send({ token });
				} else {
					return next(new ValidationException(`Username or password incorrect not found.`));
				}
			});
		});
	}

	public postForgot = async (req: Request, res: Response, next: NextFunction) => {
		console.log('here',);
		
		if (!req.body.username || req.body.username == "") {
			return next(new ValidationException("Please Enter a Valid User Name"));
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
						return next(new ValidationException(`User with user name  ${req.body.username } not found.`));
					}
					user.passwordResetToken = token;
					user.passwordResetExpires = Date.now() + 3600000; // 1 hour

					user.save(() => {
						done(err, token, user);
					});
				});
			},

			function sendForgotPasswordEmail(token: AuthToken, user: IUser, done: Function) {				
				// sgMail.setApiKey(GRID_SEND_KEY);
				let options = { service: 'gmail',
					auth: {
						user: 'jozue06@gmail.com',
						pass: 'Magnolia14!'
					}
				}
				let transport = nodemailer.createTransport(options, )
				const msg = {
					to: "jozue06@gmail.com",
					from: 'jozue06@gmail.com',
					subject: 'Sending with Twilio SendGrid is Fun',
					html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
						Please click on the following link, or paste this into your browser to complete the process:\n\n
						http://localhost:8080/#/user/reset/${token}\n\n
						If you did not request this, please ignore this email and your password will remain unchanged.\n
						<strong>and easy to do anywhere, even with Node.js</strong>`,
				};

				transport.sendMail(msg)
				.then(()	=> {
					return res.sendStatus(200);
				})
				.catch((e:any) => console.error('err', e));

				// sgMail.send(msg).then(() => {					
				// 	return res.sendStatus(200);
				// })
				// .catch((e:any) => console.error('err', e));
			},
		], (err) => {
			if (err) { 
			
				return next(err); 
			}
			// res.redirect("/forgot");
		});
	};

	public postReset = async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.token || req.body.token == "") {
			return next(new ValidationException("An error occured"));
		}

		async.waterfall([
			function resetPassword(done: Function) {
				User.findOne({ passwordResetToken: req.body.token })
					.where("passwordResetExpires").gt(Date.now())
					.exec((err, user: any) => {
						if (err) { return next(err); }
						if (!user) {
							return next(new ValidationException("Password reset token is invalid or has expired."));
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

			function sendForgotPasswordEmail(token: AuthToken, user: IUser, done: Function) {
				sgMail.setApiKey(GRID_SEND_KEY);

				const msg = {
					to: "jozue06@gmail.com",
					from: 'jozue06@gmail.com',
					subject: "Your password has been changed",
					text: `Hello,\n\nThis is a confirmation that the password for your account ${user.settings.email} has just been changed.\n`
				};

				sgMail.send(msg);
			},
		], (err) => {
			if (err) { return next(err); }
			res.redirect("/");
		});
	};

	public getSettings = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		await User.findOne({ _id: userId})
			.populate("setting")
			.then(user => {
				res.send(user);
			});
	}

	public saveSettings = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let settings = req.body.settings;
		console.log('settings ; ', settings);
		
		await User.findOneAndUpdate({ _id: userId}, { $set: {settings: settings}})
			.then(user => {
				res.send(user);
			});
	}
}