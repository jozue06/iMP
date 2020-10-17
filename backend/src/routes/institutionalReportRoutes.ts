import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { InstitutionalReportController } from "../controllers/institutionalReports";
import { IncomeLineController } from "../controllers/incomeLines";

export class InstitutionalReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public institutionalReportController: InstitutionalReportController = new InstitutionalReportController();
	public incomeLineController: IncomeLineController = new IncomeLineController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/institutionalReports", this.authController.authenticateJWT, this.institutionalReportController.createInstitutionalReport);
		this.router.get("/institutionalReports", this.authController.authenticateJWT, this.institutionalReportController.getAllInstitutionalReports);
		this.router.get("/institutionalReports/:id", this.authController.authenticateJWT, this.institutionalReportController.getInstitutionalReport);
		this.router.put("/institutionalReports/:id", this.authController.authenticateJWT, this.institutionalReportController.updateInstitutionalReport);
		this.router.post("/institutionalReportsDelete", this.authController.authenticateJWT, this.institutionalReportController.deleteInstitutionalReports);

		this.router.post("/institutionalReports/incomeLines", this.authController.authenticateJWT, this.incomeLineController.createIncomeLine);
		this.router.put("/institutionalReports/incomeLines/:id", this.authController.authenticateJWT, this.incomeLineController.updateIncomeLine);
		this.router.post("/institutionalReports/incomeLinesDelete", this.authController.authenticateJWT, this.incomeLineController.deleteIncomeLines);
	}
}