import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import mongoose from "mongoose";
import { MONGO_DB_URI } from "./utils/secret";

import errorMiddleware from './middleware/error.middleware';
import { AuthRoutes } from "./routes/authRoutes";
import { ContactRoutes } from "./routes/contactRoutes";
import { QtrReportRoutes } from "./routes/qtrReportRoutes";
import { ItinReportRoutes } from "./routes/itinReportRoutes";
import { MAReportRoutes } from "./routes/maReportRoutes";
import { SDRReportRoutes } from "./routes/sdrReportRoutes";
import { InstitutionalReportRoutes } from "./routes/institutionalReportRoutes";
import { SettingsRoutes } from "./routes/settingsRoutes";
import { VehicleRoutes } from "./routes/vehicleRoutes";
import { ExpenseLineRoutes } from "./routes/expenseLineRoutes";
import { MileageLogRoutes } from "./routes/mileageLogRoutes";
import { StatementRoutes } from "./routes/statementRoutes";

dotenv.config();
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.mongo();
		this.routes();
		this.app.use(express.static(path.resolve(__dirname, '../../frontend/dist')));
		this.app.use(errorMiddleware);
	}

	public routes(): void {
		this.app.use("/user", new AuthRoutes().router);
		this.app.use("/", new ContactRoutes().router);
		this.app.use("/", new QtrReportRoutes().router);
		this.app.use("/", new ItinReportRoutes().router);
		this.app.use("/", new MAReportRoutes().router);
		this.app.use("/", new SettingsRoutes().router);
		this.app.use("/", new VehicleRoutes().router);
		this.app.use("/", new SDRReportRoutes().router);
		this.app.use("/", new InstitutionalReportRoutes().router);
		this.app.use("/", new ExpenseLineRoutes().router);
		this.app.use("/", new MileageLogRoutes().router);
		this.app.use("/", new StatementRoutes().router);
		this.app.get('/', (req,res) => {
			res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'))
		});
	}

	public config(): void {
		this.app.set("port", process.env.PORT || 3000);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(passport.initialize());
	}

	private mongo() {
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.info("Mongo Connection Established");
		});

		connection.on("reconnected", () => {
			console.info("Mongo Connection Reestablished");
		});

		connection.on("disconnected", () => {
			console.info("Mongo Connection Disconnected");
			console.info("Trying to reconnect to Mongo ...");
			setTimeout(() => {
				mongoose.connect(MONGO_DB_URI, {
					useNewUrlParser: true,
					autoReconnect: true,
					socketTimeoutMS: 3000,
					connectTimeoutMS: 3000,
					useUnifiedTopology: true
				});
			}, 3000);
		});

		connection.on("close", () => {
			console.info("Mongo Connection Closed");
		});

		connection.on("error", (error: Error) => {
			console.info("Mongo Connection ERROR: " + error);
		});

		const run = async () => {
			await mongoose.connect(MONGO_DB_URI, {
				useNewUrlParser: true,
				keepAlive: true,
				useUnifiedTopology: true
			});
		};
		run().catch(error => console.error(error));
	}

	public start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.info("API is running on port:", this.app.get("port"));
		});
	}
}

const server = new Server();
server.start();