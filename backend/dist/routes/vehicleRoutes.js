"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoutes = void 0;
const express_1 = require("express");
const vehicles_1 = require("../controllers/vehicles");
const authController_1 = require("../controllers/authController");
class VehicleRoutes {
    constructor() {
        this.vehiclesController = new vehicles_1.VehiclesController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/vehicles", this.authController.authenticateJWT, this.vehiclesController.getVehicles);
        this.router.post("/vehicles", this.authController.authenticateJWT, this.vehiclesController.createVehicle);
        this.router.put("/vehicles/:id", this.authController.authenticateJWT, this.vehiclesController.saveVehicle);
        this.router.post("/vehiclesDelete", this.authController.authenticateJWT, this.vehiclesController.deleteVehicles);
    }
}
exports.VehicleRoutes = VehicleRoutes;
//# sourceMappingURL=vehicleRoutes.js.map