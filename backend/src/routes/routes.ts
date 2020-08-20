
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
		this.router.post("/", this.authController.authenticateJWT, this.productController.createContact);
		// this.router.get("/", this.authController.authenticateJWT, this.productController.getProducts);
		// this.router.get("/:id", this.authController.authenticateJWT, this.productController.getProduct);
		// this.router.put("/:id", this.authController.authenticateJWT, this.productController.updateProduct);
		// this.router.delete("/:id", this.authController.authenticateJWT, this.productController.deleteProduct);
	}
}