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

		this.router.get("/statements", this.authController.authenticateJWT, this.statementController.getAllStatements);
		this.router.get("/statements/:id", this.authController.authenticateJWT, this.statementController.getStatement);
		this.router.post("/statements/uploadStatementCsv", this.authController.authenticateJWT, this.statementController.uploadStatementCsv);
		
		this.router.get("/statements/lines/:id", this.authController.authenticateJWT, this.statementController.getStatementWithLines);
		this.router.post("/statements/lines", this.authController.authenticateJWT, this.statementController.saveStatementLine);
		this.router.put("/statements/lines/:id", this.authController.authenticateJWT, this.statementController.updateStatementLine);
		this.router.post("/statements/lines/delete", this.authController.authenticateJWT, this.statementController.deleteStatementLines);
	}
}