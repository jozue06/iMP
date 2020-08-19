import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "./database";
import { createContact } from "./controllers/contacts";
import errorMiddleware from './middleware/error.middleware';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

// connecting mongoDB
connect();

// define a route handler for the default home page
app.get("/", ( req, res ) => {
	res.send( "Hello world!" );
});

app.post("/contacts", (req, res, next) => {
	createContact(req, res, next);
});

// start the Express server
app.listen( port, () => {
	 // tslint:disable-next-line:no-console
	console.log( `server started at http://localhost:${ port }` );
});
app.use(errorMiddleware);