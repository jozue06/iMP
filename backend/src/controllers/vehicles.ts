import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import { Settings } from "../models/settings";
import { Vehicle } from "../models/vehicle";
import ValidationException from '../exceptions/ValidationException';

export class VehiclesController {
	public getVehicles = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		await Vehicle.find({ user: userId}).then(vehicles => {
			res.send(vehicles);
		});
	};

	public deleteVehicles = (userId: string, req: Request, res: Response, next: NextFunction) => {
		Vehicle.deleteMany( {"_id": { $in: req.body.vehicleIds } } ).then(r => {
			res.send(r);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	};

	public saveVehicle = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let vehicle = req.body.vehicle;
		await Vehicle.findOneAndUpdate({_id: vehicle._id}, {...vehicle}).then(savedVehicle => {
			res.send(savedVehicle);
		}).catch(e => {
			next(new ValidationException(e.errors));
		});
	}

	public createVehicle = async (userId: string, req: Request, res: Response, next: NextFunction) => {
		let vehicle = req.body.vehicle;
		vehicle.user = userId;
		await Vehicle.create(vehicle).then(vehicle => {
			Settings.findOneAndUpdate({ user: userId }, { $push: {vehicles: vehicle}}, { useFindAndModify: true, new: true }).then(settings => {
				res.send(settings.vehicles);
			});
		});
	}
}