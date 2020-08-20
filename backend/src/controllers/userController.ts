import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/authHandler";
import { User } from "../models/userModel";
import { JWT_SECRETE } from "../utils/secret";
import NoUserException from '../exceptions/NoUserException';

export class UserController {

	public async registerUser(req: Request, res: Response): Promise<void> {
		const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		console.log('here :: ', );
		
		await User.create({
			username: req.body.username,
			password: hashedPassword,

		});

		const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRETE);
		res.status(200).send({ token: token });
	}

	public authenticateUser(req: Request, res: Response, next: NextFunction) {		
		passport.authenticate('local', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { 				
				console.log('no user found');
				return next(new NoUserException('no user found'));
				// return res.status(401).json({ status: "error", code: "unauthorized" });
			}
			req.logIn(user, function(err) {
				console.log('in longin');
				
				if (err) { 
					console.log('erro r longin', err);
					
					// return next(new ValidationException(JSON.stringify(err.error))); 
				}
			//   return res.redirect('/users/' + user.username);
			});
		})(req, res, next);
	}
}