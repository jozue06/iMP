import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { InstitutionalReportController } from "../controllers/institutionalReports";
import { ExpenseLineController } from "../controllers/expenseLines";
import { IncomeLineController } from "../controllers/incomeLines";
import { StatementController } from "../controllers/statements";

export class InstitutionalReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public institutionalReportController: InstitutionalReportController = new InstitutionalReportController();
	public expenseLineController: ExpenseLineController = new ExpenseLineController();
	public incomeLineController: IncomeLineController = new IncomeLineController();
	public statementController: StatementController = new StatementController();

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

		this.router.post("/institutionalReports/expenseLines", this.authController.authenticateJWT, this.expenseLineController.createExpenseLine);
		this.router.put("/institutionalReports/expenseLines/:id", this.authController.authenticateJWT, this.expenseLineController.updateExpenseLine);
		this.router.post("/institutionalReports/expenseLinesDelete", this.authController.authenticateJWT, this.expenseLineController.deleteExpenseLines);

		this.router.post("/institutionalReports/incomeLines", this.authController.authenticateJWT, this.incomeLineController.createIncomeLine);
		this.router.put("/institutionalReports/incomeLines/:id", this.authController.authenticateJWT, this.incomeLineController.updateIncomeLine);
		this.router.post("/institutionalReports/incomeLinesDelete", this.authController.authenticateJWT, this.incomeLineController.deleteIncomeLines);

		this.router.post("/institutionalReports/statements", this.authController.authenticateJWT, this.statementController.createStatement);
		this.router.put("/institutionalReports/statements/:id", this.authController.authenticateJWT, this.statementController.updateStatement);
		this.router.post("/institutionalReports/statementsDelete", this.authController.authenticateJWT, this.statementController.deleteStatements);
	}
}