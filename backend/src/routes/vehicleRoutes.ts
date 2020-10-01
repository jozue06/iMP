import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles";
import { AuthController } from "../controllers/authController";

export class VehicleRoutes {

	router: Router;
	public vehiclesController: VehiclesController = new VehiclesController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/vehicles", this.authController.authenticateJWT, this.vehiclesController.getVehicles);
		this.router.post("/vehicles", this.authController.authenticateJWT, this.vehiclesController.createVehicle);
		this.router.put("/vehicles/:id", this.authController.authenticateJWT, this.vehiclesController.saveVehicle);
	}
}