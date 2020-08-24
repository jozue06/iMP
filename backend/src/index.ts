import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorMiddleware from './middleware/error.middleware';
import { AuthRoutes } from "./routes/authRoutes";
import mongoose from "mongoose";
import { MONGO_DB_URI } from "./utils/secret";
import { ContactRoutes } from "./routes/contactRoutes";
import { QtrReportRoutes } from "./routes/qtrReportRoutes";
import passport from "passport";

dotenv.config();
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		this.mongo();
		this.app.use(errorMiddleware);
	}

	public routes(): void {
		this.app.use("/user", new AuthRoutes().router);
		this.app.use("/", new ContactRoutes().router);
		this.app.use("/", new QtrReportRoutes().router);
	}

	public config(): void {
		this.app.set("port", process.env.SERVER_PORT || 3000);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(passport.initialize());
//   app.use(passport.session());
	}

	private mongo() {
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("Mongo Connection Established");
		});

		connection.on("reconnected", () => {
			console.log("Mongo Connection Reestablished");
		});

		connection.on("disconnected", () => {
			console.log("Mongo Connection Disconnected");
			console.log("Trying to reconnect to Mongo ...");
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
			console.log("Mongo Connection Closed");
		});

		connection.on("error", (error: Error) => {
			console.log("Mongo Connection ERROR: " + error);
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
			console.log("API is running at http://localhost:%d", this.app.get("port"));
		});
	}
}

const server = new Server();
server.start();