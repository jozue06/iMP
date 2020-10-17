import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { StatementController } from "../controllers/statements";

export class StatementRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public statementController: StatementController = new StatementController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/statements", this.authController.authenticateJWT, this.statementController.createStatement);
		this.router.put("/statements/:id", this.authController.authenticateJWT, this.statementController.updateStatement);
		this.router.post("/statementsDelete", this.authController.authenticateJWT, this.statementController.deleteStatements);
	}
}