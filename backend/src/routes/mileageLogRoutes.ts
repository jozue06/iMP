import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { MileageLogController } from "../controllers/mileageLogs";

export class MileageLogRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public mileageLogController: MileageLogController = new MileageLogController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/mileageLogs", this.authController.authenticateJWT, this.mileageLogController.createMileageLog);
		this.router.put("/mileageLogs/:id", this.authController.authenticateJWT, this.mileageLogController.updateMileageLog);
		this.router.post("/mileageLogsDelete", this.authController.authenticateJWT, this.mileageLogController.deleteMileageLogs);
	}
}
