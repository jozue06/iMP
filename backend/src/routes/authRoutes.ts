import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class AuthRoutes {

	router: Router;
	public userController: UserController = new UserController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/register", this.userController.registerUser);
		this.router.post("/login", this.userController.loginUser);
		this.router.post("/authorize", this.authController.authorizeJWT);
	}
}