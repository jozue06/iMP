"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionalReportRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const institutionalReports_1 = require("../controllers/institutionalReports");
const incomeLines_1 = require("../controllers/incomeLines");
class InstitutionalReportRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.institutionalReportController = new institutionalReports_1.InstitutionalReportController();
        this.incomeLineController = new incomeLines_1.IncomeLineController();
        this.router = express_1.Router();
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
exports.InstitutionalReportRoutes = InstitutionalReportRoutes;
//# sourceMappingURL=institutionalReportRoutes.js.map