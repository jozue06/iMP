
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { ItinReportController } from "../controllers/itinReports";
import { ExpenseLineController } from "../controllers/expenseLines";
import { OfferingLineController } from "../controllers/offeringLines";
import { MileageLogController } from "../controllers/mileageLogs";


export class ItinReportRoutes {

	public router: Router;
	public authController: AuthController = new AuthController();
	public itinReportController: ItinReportController = new ItinReportController();
	public expenseLineController: ExpenseLineController = new ExpenseLineController();
	public offeringLineController: OfferingLineController = new OfferingLineController();
	public mileageLogController: MileageLogController = new MileageLogController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post("/itinReports", this.authController.authenticateJWT, this.itinReportController.createItinReport);
		this.router.get("/itinReports", this.authController.authenticateJWT, this.itinReportController.getAllItinReports);
		this.router.get("/itinReports/:id", this.authController.authenticateJWT, this.itinReportController.getItinReport);
		this.router.put("/itinReports/:id", this.authController.authenticateJWT, this.itinReportController.updateItinReport);
		this.router.post("/itinReportsDelete", this.authController.authenticateJWT, this.itinReportController.deleteItinReports);
		
		this.router.post("/itinReports/offeringLines", this.authController.authenticateJWT, this.offeringLineController.createOfferingLine);
		this.router.put("/itinReports/offeringLines/:id", this.authController.authenticateJWT, this.offeringLineController.updateOfferingLine);
		this.router.post("/itinReports/offeringLinesDelete", this.authController.authenticateJWT, this.offeringLineController.deleteOfferingLines);
	}
}