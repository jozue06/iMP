
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { SDRReportController } from "../controllers/sdrReports";
import { ExpenseLineController } from "../controllers/expenseLines";
import { OtherIncomeLineController } from "../controllers/otherIncomeLines";
import { MileageLogController } from "../controllers/mileageLogs";
import { StatementController } from "../controllers/statements";

export class SDRReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public sdrReportController: SDRReportController = new SDRReportController();
	public expenseLineController: ExpenseLineController = new ExpenseLineController();

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

		this.router.post("/sdrReports/expenseLines", this.authController.authenticateJWT, this.expenseLineController.createExpenseLine);
		this.router.put("/sdrReports/expenseLines/:id", this.authController.authenticateJWT, this.expenseLineController.updateExpenseLine);
		this.router.post("/sdrReports/expenseLinesDelete", this.authController.authenticateJWT, this.expenseLineController.deleteExpenseLines);
	}
}