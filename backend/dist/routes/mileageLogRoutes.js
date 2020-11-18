"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MileageLogRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const mileageLogs_1 = require("../controllers/mileageLogs");
class MileageLogRoutes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.mileageLogController = new mileageLogs_1.MileageLogController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/mileageLogs", this.authController.authenticateJWT, this.mileageLogController.createMileageLog);
        this.router.put("/mileageLogs/:id", this.authController.authenticateJWT, this.mileageLogController.updateMileageLog);
        this.router.post("/mileageLogsDelete", this.authController.authenticateJWT, this.mileageLogController.deleteMileageLogs);
    }
}
exports.MileageLogRoutes = MileageLogRoutes;
//# sourceMappingURL=mileageLogRoutes.js.map