
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { QtrReportController } from "../controllers/qtrReport";



export class QtrReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public qtrReportController: QtrReportController = new QtrReportController();
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.createQtrReport);
		this.router.get("/qtrReports", this.authController.authenticateJWT, this.qtrReportController.getAllQtrReports);
		this.router.get("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.getQtrReport);
		this.router.put("/qtrReports/:id", this.authController.authenticateJWT, this.qtrReportController.updateQtrReport);
		this.router.post("/qtrReportsDelete", this.authController.authenticateJWT, this.qtrReportController.deleteQtrReports);
		
		this.router.post("/qtrReports/expenseLines/:id", this.authController.authenticateJWT, this.qtrReportController.updateQtrReportExpenseLines);
		// this.router.post("/contactEvents", this.authController.authenticateJWT, this.eventController.createEvent);
		// this.router.get("/contactEvents", this.authController.authenticateJWT, this.eventController.getAllEvents);
		// this.router.get("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.getEvent);
		// this.router.put("/contactEvents/:id", this.authController.authenticateJWT, this.eventController.updateEventInfo);
		// this.router.post("/contactEventsDelete", this.authController.authenticateJWT, this.eventController.deleteEvents);

		// this.router.post("/contactTasks", this.authController.authenticateJWT, this.taskController.createTask);
		// this.router.get("/contactTasks", this.authController.authenticateJWT, this.taskController.getAllTasks);
		// this.router.get("/contactTasks/:id", this.authController.authenticateJWT, this.taskController.getTask);
		// this.router.put("/contactTasks/:id", this.authController.authenticateJWT, this.taskController.updateTaskInfo);
		// this.router.post("/contactTasksDelete", this.authController.authenticateJWT, this.taskController.deleteTasks);

		// this.router.post("/contactComms", this.authController.authenticateJWT, this.commsController.createComm);
		// this.router.get("/contactComms", this.authController.authenticateJWT, this.commsController.getAllComms);
		// this.router.get("/contactComms/:id", this.authController.authenticateJWT, this.commsController.getComm);
		// this.router.put("/contactComms/:id", this.authController.authenticateJWT, this.commsController.updateCommsInfo);
		// this.router.post("/contactCommsDelete", this.authController.authenticateJWT, this.commsController.deleteComs);

		// this.router.post("/contactGroups", this.authController.authenticateJWT, this.contactGoupController.createGroup);
		// this.router.get("/contactGroups", this.authController.authenticateJWT, this.contactGoupController.getAllContactGroups);
		// this.router.get("/contactGroups/:id", this.authController.authenticateJWT, this.contactGoupController.getContactGroup);
		// this.router.put("/contactGroups/:id", this.authController.authenticateJWT, this.contactGoupController.updateContactGroup);
		// this.router.post("/contactGroupsDelete", this.authController.authenticateJWT, this.contactGoupController.deleteContactGroup);
	}
}