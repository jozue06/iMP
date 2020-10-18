import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { QtrReportController } from "../controllers/qtrReports";
import { OtherIncomeLineController } from "../controllers/otherIncomeLines";

export class QtrReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public qtrReportController: QtrReportController = new QtrReportController();
	public otherIncomeLineController: OtherIncomeLineController = new OtherIncomeLineController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.createQtrReport);
		this.router.get("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.getAllQtrReports);
		this.router.get("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.getQtrReport);
		this.router.put("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.updateQtrReport);
		this.router.post("/qtrReportsDelete", this.authController.authenticateJWT, this.qtrReportController.deleteQtrReports);

		this.router.post("/qtrReports/otherIncomeLines", this.authController.authenticateJWT, this.otherIncomeLineController.createOtherIncomeLine);
		this.router.put("/qtrReports/otherIncomeLines/:id", this.authController.authenticateJWT, this.otherIncomeLineController.updateOtherIncomeLine);
		this.router.post("/qtrReports/otherIncomeLinesDelete", this.authController.authenticateJWT, this.otherIncomeLineController.deleteOtherIncomeLines);
	}
}