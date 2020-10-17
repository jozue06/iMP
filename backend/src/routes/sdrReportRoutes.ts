import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { SDRReportController } from "../controllers/sdrReports";

export class SDRReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public sdrReportController: SDRReportController = new SDRReportController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/sdrReports", this.authController.authenticateJWT, this.sdrReportController.createSDRReport);
		this.router.get("/sdrReports", this.authController.authenticateJWT, this.sdrReportController.getAllSDRReports);
		this.router.get("/sdrReports/:id", this.authController.authenticateJWT, this.sdrReportController.getSDRReport);
		this.router.put("/sdrReports/:id", this.authController.authenticateJWT, this.sdrReportController.updateSDRReport);
		this.router.post("/sdrReportsDelete", this.authController.authenticateJWT, this.sdrReportController.deleteSDRReports);
	}
}