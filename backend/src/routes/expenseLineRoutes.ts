import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { ExpenseLineController } from "../controllers/expenseLines";

export class ExpenseLineRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();

	public expenseLineController: ExpenseLineController = new ExpenseLineController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/expenseLines", this.authController.authenticateJWT, this.expenseLineController.createExpenseLine);
		this.router.put("/expenseLines/:id", this.authController.authenticateJWT, this.expenseLineController.updateExpenseLine);
		this.router.post("/expenseLines/uploadImage", this.authController.authenticateJWT, this.expenseLineController.uploadExpensePhoto);
		this.router.post("/expenseLinesDelete", this.authController.authenticateJWT, this.expenseLineController.deleteExpenseLines);
	}
}