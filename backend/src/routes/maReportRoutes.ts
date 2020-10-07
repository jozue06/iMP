import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { MAReportController } from "../controllers/maReports";

export class MAReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public MAReportController: MAReportController = new MAReportController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/maReports", this.authController.authenticateJWT, this.MAReportController.createMAReport);
		this.router.get("/maReports", this.authController.authenticateJWT, this.MAReportController.getAllMAReports);
		this.router.get("/maReports/:id", this.authController.authenticateJWT, this.MAReportController.getMAReport);
		this.router.put("/maReports/:id", this.authController.authenticateJWT, this.MAReportController.updateMAReport);
		this.router.post("/maReportsDelete", this.authController.authenticateJWT, this.MAReportController.deleteMAReports);
	}
}