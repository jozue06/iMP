
import { Router } from "express";
import { ContactController } from "../controllers/contacts";
import { EventController } from "../controllers/contactEvents";
import { AuthController } from "../controllers/authController";


export class Routes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public contactController: ContactController = new ContactController();
	public eventController: EventController = new EventController();

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
		
		this.router.post("/contactEvents", this.authController.authenticateJWT, this.eventController.createEvent);
		this.router.get("/contactEvents", this.authController.authenticateJWT, this.eventController.getAllEvents);
		this.router.get("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.getEvent);
		this.router.put("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.updateEventInfo);
		// this.router.delete("/contacts/:id", this.authController.authenticateJWT, this.productController.deleteProduct);

	}
}