"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAReportRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const maReports_1 = require("../controllers/maReports");
class MAReportRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.MAReportController = new maReports_1.MAReportController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/maReports", this.authController.authenticateJWT, this.MAReportController.createMAReport);
        this.router.get("/maReports", this.authController.authenticateJWT, this.MAReportController.getAllMAReports);
        this.router.get("/maReports/:id", this.authController.authenticateJWT, this.MAReportController.getMAReport);
        this.router.put("/maReports/:id", this.authController.authenticateJWT, this.MAReportController.updateMAReport);
        this.router.post("/maReportsDelete", this.authController.authenticateJWT, this.MAReportController.deleteMAReports);
    }
}
exports.MAReportRoutes = MAReportRoutes;
//# sourceMappingURL=maReportRoutes.js.map