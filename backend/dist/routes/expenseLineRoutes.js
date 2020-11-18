"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseLineRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const expenseLines_1 = require("../controllers/expenseLines");
class ExpenseLineRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.expenseLineController = new expenseLines_1.ExpenseLineController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/expenseLines", this.authController.authenticateJWT, this.expenseLineController.createExpenseLine);
        this.router.put("/expenseLines/:id", this.authController.authenticateJWT, this.expenseLineController.updateExpenseLine);
        this.router.post("/expenseLines/uploadImage/:id", this.authController.authenticateJWT, this.expenseLineController.uploadExpensePhoto);
        this.router.post("/expenseLines/deleteImage", this.authController.authenticateJWT, this.expenseLineController.deleteExpensePhoto);
        this.router.post("/expenseLinesDelete", this.authController.authenticateJWT, this.expenseLineController.deleteExpenseLines);
    }
}
exports.ExpenseLineRoutes = ExpenseLineRoutes;
//# sourceMappingURL=expenseLineRoutes.js.map