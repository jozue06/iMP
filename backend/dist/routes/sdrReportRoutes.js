"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDRReportRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const sdrReports_1 = require("../controllers/sdrReports");
class SDRReportRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.sdrReportController = new sdrReports_1.SDRReportController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/sdrReports", this.authController.authenticateJWT, this.sdrReportController.createSDRReport);
        this.router.get("/sdrReports", this.authController.authenticateJWT, this.sdrReportController.getAllSDRReports);
        this.router.get("/sdrReports/:id", this.authController.authenticateJWT, this.sdrReportController.getSDRReport);
        this.router.put("/sdrReports/:id", this.authController.authenticateJWT, this.sdrReportController.updateSDRReport);
        this.router.post("/sdrReportsDelete", this.authController.authenticateJWT, this.sdrReportController.deleteSDRReports);
    }
}
exports.SDRReportRoutes = SDRReportRoutes;
//# sourceMappingURL=sdrReportRoutes.js.map