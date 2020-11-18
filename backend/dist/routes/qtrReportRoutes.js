"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtrReportRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const qtrReports_1 = require("../controllers/qtrReports");
const otherIncomeLines_1 = require("../controllers/otherIncomeLines");
class QtrReportRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.qtrReportController = new qtrReports_1.QtrReportController();
        this.otherIncomeLineController = new otherIncomeLines_1.OtherIncomeLineController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.createQtrReport);
        this.router.get("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.getAllQtrReports);
        this.router.get("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.getQtrReport);
        this.router.put("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.updateQtrReport);
        this.router.post("/qtrReportsDelete", this.authController.authenticateJWT, this.qtrReportController.deleteQtrReports);
        this.router.post("/qtrReports/otherIncomeLines", this.authController.authenticateJWT, this.otherIncomeLineController.createOtherIncomeLine);
        this.router.put("/qtrReports/otherIncomeLines/:id", this.authController.authenticateJWT, this.otherIncomeLineController.updateOtherIncomeLine);
        this.router.post("/qtrReports/otherIncomeLinesDelete", this.authController.authenticateJWT, this.otherIncomeLineController.deleteOtherIncomeLines);
    }
}
exports.QtrReportRoutes = QtrReportRoutes;
//# sourceMappingURL=qtrReportRoutes.js.map