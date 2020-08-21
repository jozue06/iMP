import { Router } from "express";
import { UserController } from "../controllers/userController";

export class AuthRoutes {

	router: Router;
	public userController: UserController = new UserController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/register", this.userController.registerUser);
		this.router.post("/login", this.userController.loginUser);
		this.router.post("/athenticate", this.userController.authenticateUser);
	}
}