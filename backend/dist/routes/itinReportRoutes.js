"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItinReportRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const itinReports_1 = require("../controllers/itinReports");
const expenseLines_1 = require("../controllers/expenseLines");
const offeringLines_1 = require("../controllers/offeringLines");
const mileageLogs_1 = require("../controllers/mileageLogs");
class ItinReportRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.itinReportController = new itinReports_1.ItinReportController();
        this.expenseLineController = new expenseLines_1.ExpenseLineController();
        this.offeringLineController = new offeringLines_1.OfferingLineController();
        this.mileageLogController = new mileageLogs_1.MileageLogController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/itinReports", this.authController.authenticateJWT, this.itinReportController.createItinReport);
        this.router.get("/itinReports", this.authController.authenticateJWT, this.itinReportController.getAllItinReports);
        this.router.get("/itinReports/:id", this.authController.authenticateJWT, this.itinReportController.getItinReport);
        this.router.put("/itinReports/:id", this.authController.authenticateJWT, this.itinReportController.updateItinReport);
        this.router.post("/itinReportsDelete", this.authController.authenticateJWT, this.itinReportController.deleteItinReports);
        this.router.post("/itinReports/offeringLines", this.authController.authenticateJWT, this.offeringLineController.createOfferingLine);
        this.router.put("/itinReports/offeringLines/:id", this.authController.authenticateJWT, this.offeringLineController.updateOfferingLine);
        this.router.post("/itinReports/offeringLinesDelete", this.authController.authenticateJWT, this.offeringLineController.deleteOfferingLines);
    }
}
exports.ItinReportRoutes = ItinReportRoutes;
//# sourceMappingURL=itinReportRoutes.js.map