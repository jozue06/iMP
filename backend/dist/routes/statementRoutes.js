"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const statements_1 = require("../controllers/statements");
class StatementRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.statementController = new statements_1.StatementController();
        this.router = express_1.Router();
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
exports.StatementRoutes = StatementRoutes;
//# sourceMappingURL=statementRoutes.js.map