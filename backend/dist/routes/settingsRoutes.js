"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = require("express");
const userSettings_1 = require("../controllers/userSettings");
const authController_1 = require("../controllers/authController");
class SettingsRoutes {
    constructor() {
        this.settingsController = new userSettings_1.SettingsController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/settings", this.authController.authenticateJWT, this.settingsController.getSettings);
        this.router.post("/settings", this.authController.authenticateJWT, this.settingsController.createSettings);
        this.router.put("/settings/:id", this.authController.authenticateJWT, this.settingsController.saveSettings);
    }
}
exports.SettingsRoutes = SettingsRoutes;
//# sourceMappingURL=settingsRoutes.js.map