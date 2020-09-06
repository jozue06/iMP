
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { QtrReportController } from "../controllers/qtrReports";
import { ExpenseLineController } from "../controllers/expenseLines";
import { MileageLogController } from "../controllers/mileageLogs";
import { StatementController } from "../controllers/statements";

export class QtrReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public qtrReportController: QtrReportController = new QtrReportController();
	public expenseLineController: ExpenseLineController = new ExpenseLineController();
	public mileageLogController: MileageLogController = new MileageLogController();
	public statementController: StatementController = new StatementController();
	
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
		
		this.router.post("/qtrReports/expenseLines", this.authController.authenticateJWT, this.expenseLineController.createExpenseLine);
		this.router.put("/qtrReports/expenseLines/:id", this.authController.authenticateJWT, this.expenseLineController.updateExpenseLine);
		this.router.post("/qtrReports/expenseLinesDelete", this.authController.authenticateJWT, this.expenseLineController.deleteExpenseLines);

		this.router.post("/qtrReports/mileageLogs", this.authController.authenticateJWT, this.mileageLogController.createMileageLog);
		this.router.put("/qtrReports/mileageLogs/:id", this.authController.authenticateJWT, this.mileageLogController.updateMileageLog);
		this.router.post("/qtrReports/mileageLogsDelete", this.authController.authenticateJWT, this.mileageLogController.deleteMileageLogs);

		this.router.post("/qtrReports/statements", this.authController.authenticateJWT, this.statementController.createStatement);
		this.router.put("/qtrReports/statements/:id", this.authController.authenticateJWT, this.statementController.updateStatement);
		this.router.post("/qtrReports/statementsDelete", this.authController.authenticateJWT, this.statementController.deleteStatements);
	}
}