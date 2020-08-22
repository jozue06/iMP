
import { Router } from "express";
import { ContactController } from "../controllers/contacts";
import { AuthController } from "../controllers/authController";


export class Routes {

	public router: Router;
	public productController: ContactController = new ContactController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/contacts", this.authController.authenticateJWT, this.productController.createContact);
		this.router.get("/contacts", this.authController.authenticateJWT, this.productController.getAllContacts);
		// this.router.get("/contacts/:id", this.authController.authenticateJWT, this.productController.getProduct);
		// this.router.put("/contacts/:id", this.authController.authenticateJWT, this.productController.updateProduct);
		// this.router.delete("/contacts/:id", this.authController.authenticateJWT, this.productController.deleteProduct);
	}
}