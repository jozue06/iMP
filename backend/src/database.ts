import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
	const uri = 'mongodb://localhost:27017/test';
	if (database) {
		return;
	}

	mongoose.connect(uri, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	database = mongoose.connection;

	database.once("open", async () => {
		// tslint:disable-next-line:no-console
		console.log("Connected to database");
	});

	database.on("error", () => {
		// tslint:disable-next-line:no-console
		console.log("Error connecting to database");
	});
};

export const disconnect = () => {
	if (!database) {
		return;
	}
	mongoose.disconnect();
};