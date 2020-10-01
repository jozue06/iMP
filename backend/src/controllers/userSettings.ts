import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import { Settings } from "../models/settings";

export class SettingsController {
	public getSettings = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		await Settings.findOne({ user: userId})
			.populate("vehicles")
			.then(settings => {
				res.send(settings);
			});
	}

	public saveSettings = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let settings = req.body.settings;
		settings.user = userId;
		await Settings.findOneAndUpdate({_id: settings._id}, {...settings},).then(savedSettings => {			
			User.findOneAndUpdate({ _id: userId}, { $set: {settings: savedSettings}}).then(user => {
				res.send(user);
			});
		});
	}

	public createSettings = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let settings = req.body.settings;
		settings.user = userId;
		await Settings.create(settings).then(savedSettings => {			
			User.findOneAndUpdate({ _id: userId}, { $set: {settings: savedSettings}}).then(user => {
				res.send(user);
			});
		});
	}
}