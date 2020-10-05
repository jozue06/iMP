import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/authHandler";

export class AuthController {

	public authenticateJWT(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("jwt", function (err, user, jwtToken) {
			if (err) {
				return res.status(401).json({ status: "error", code: "unauthorized" });
			}
			if (!user) {
				return res.status(401).json({ status: "error", code: "no user" });
			} else {
				return next(user._id);
			}
		})(req, res, next);
	}

	public authorizeJWT(req: Request, res: Response, next: NextFunction):void {
		passport.authenticate("jwt", function (err, user, jwtToken) {
			if (err) {
				return res.status(401).json({ status: "error", code: "unauthorized" });
			}
			if (!user) {
				return res.status(401).json({ status: "error", code: "unauthorized" });
			} else {
				return res.status(200).json({message:"welcome back"});
			}
		}) (req, res, next);
	}
}