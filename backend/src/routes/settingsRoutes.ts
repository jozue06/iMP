import { Router } from "express";
import { SettingsController } from "../controllers/userSettings";
import { AuthController } from "../controllers/authController";

export class SettingsRoutes {

	router: Router;
	public settingsController: SettingsController = new SettingsController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/settings", this.authController.authenticateJWT, this.settingsController.getSettings);
		this.router.post("/settings", this.authController.authenticateJWT, this.settingsController.createSettings);
		this.router.put("/settings/:id", this.authController.authenticateJWT, this.settingsController.saveSettings);
	}
}