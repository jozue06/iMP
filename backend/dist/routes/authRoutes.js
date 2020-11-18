"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.loginUser);
        this.router.post("/authorize", this.authController.authorizeJWT);
        this.router.post("/forgot", this.userController.postForgot);
        this.router.post("/reset", this.userController.postReset);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=authRoutes.js.map