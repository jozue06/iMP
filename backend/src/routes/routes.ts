
import { Router } from "express";
import { ContactController } from "../controllers/contacts";
import { AuthController } from "../controllers/authController";


export class Routes {

	public router: Router;
	public contactController: ContactController = new ContactController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/contacts", this.authController.authenticateJWT, this.contactController.createContact);
		this.router.get("/contacts", this.authController.authenticateJWT, this.contactController.getAllContacts);
		this.router.get("/contacts/:id", this.authController.authenticateJWT, this.contactController.getContact);
		this.router.put("/contacts/:id", this.authController.authenticateJWT, this.contactController.updateContactInfo);
		// this.router.delete("/contacts/:id", this.authController.authenticateJWT, this.productController.deleteProduct);
	}
}