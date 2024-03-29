
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { ContactController } from "../controllers/contacts";
import { EventController } from "../controllers/contactEvents";
import { TaskController } from "../controllers/contactTasks";
import { CommsController } from "../controllers/contactComms";
import { ContactGroupController } from "../controllers/contactGroups";


export class ContactRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public contactController: ContactController = new ContactController();
	public eventController: EventController = new EventController();
	public taskController: TaskController = new TaskController();
	public commsController: CommsController = new CommsController();
	public contactGoupController: ContactGroupController = new ContactGroupController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/contacts", this.authController.authenticateJWT, this.contactController.createContact);
		this.router.get("/contacts", this.authController.authenticateJWT, this.contactController.getAllContacts);
		this.router.get("/contacts/:id", this.authController.authenticateJWT, this.contactController.getContact);
		this.router.put("/contacts/:id", this.authController.authenticateJWT, this.contactController.updateContactInfo);
		this.router.post("/contactsDelete", this.authController.authenticateJWT, this.contactController.deleteContacts);
		this.router.post("/contacts/search", this.authController.authenticateJWT, this.contactController.search);

		this.router.post("/contactEvents", this.authController.authenticateJWT, this.eventController.createEvent);
		this.router.get("/contactEvents", this.authController.authenticateJWT, this.eventController.getAllEvents);
		this.router.get("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.getEvent);
		this.router.put("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.updateEventInfo);
		this.router.post("/contactEvents/massToggle", this.authController.authenticateJWT, this.eventController.toggleMany);
		this.router.post("/contactEventsDelete", this.authController.authenticateJWT, this.eventController.deleteEvents);

		this.router.post("/contactTasks", this.authController.authenticateJWT, this.taskController.createTask);
		this.router.get("/contactTasks", this.authController.authenticateJWT, this.taskController.getAllTasks);
		this.router.get("/contactTasks/:id", this.authController.authenticateJWT, this.taskController.getTask);
		this.router.put("/contactTasks/:id", this.authController.authenticateJWT, this.taskController.updateTaskInfo);
		this.router.post("/contactTasks/massToggle", this.authController.authenticateJWT, this.taskController.toggleMany);
		this.router.post("/contactTasksDelete", this.authController.authenticateJWT, this.taskController.deleteTasks);

		this.router.post("/contactComms", this.authController.authenticateJWT, this.commsController.createComm);
		this.router.get("/contactComms", this.authController.authenticateJWT, this.commsController.getAllComms);
		this.router.get("/contactComms/:id", this.authController.authenticateJWT, this.commsController.getComm);
		this.router.put("/contactComms/:id", this.authController.authenticateJWT, this.commsController.updateCommsInfo);
		this.router.post("/contactCommsDelete", this.authController.authenticateJWT, this.commsController.deleteComs);

		this.router.post("/contactGroups", this.authController.authenticateJWT, this.contactGoupController.createGroup);
		this.router.get("/contactGroups", this.authController.authenticateJWT, this.contactGoupController.getAllContactGroups);
		this.router.get("/contactGroups/:id", this.authController.authenticateJWT, this.contactGoupController.getContactGroup);
		this.router.put("/contactGroups/:id", this.authController.authenticateJWT, this.contactGoupController.updateContactGroup);
		this.router.post("/contactGroupsDelete", this.authController.authenticateJWT, this.contactGoupController.deleteContactGroup);

	}
}