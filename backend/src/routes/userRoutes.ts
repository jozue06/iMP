import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class UserRoutes {

	router: Router;
	public userController: UserController = new UserController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/settings", this.authController.authenticateJWT, this.userController.getSettings);
		// this.router.post("/login", this.authController.authorizeJWT, this.userController.loginUser);
	}
}