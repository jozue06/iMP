import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import { Settings } from "../models/settings";
import { Vehicle } from "../models/vehicle";

export class VehiclesController {
	public getVehicles = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		await User.findOne({ _id: userId})
			.populate("settings")
			.then(user => {
				res.send(user.settings.vehicles);
			});
	}

	public saveVehicle = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let vehicle = req.body.vehicle;
		await Vehicle.findOneAndUpdate({_id: vehicle._id}, {...vehicle},).then(savedVehicle => {
			res.send(savedVehicle);
		});
	}

	public createVehicle = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let vehicle = req.body.vehicle;
		vehicle.user = userId;
		await Vehicle.create(vehicle).then(vehicle => {
			Settings.findOneAndUpdate({ user: userId }, { $push: {vehicles: vehicle}}).then(() => {
				res.send(vehicle);
			});
		});
	}
}