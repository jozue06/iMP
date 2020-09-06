import dotenv from "dotenv";
dotenv.config();
export const MONGO_DB_URI = process.env["MONGO_DB_URI"];

if (!MONGO_DB_URI) {
	console.info("No mongo connection string. Set MONGODB_URI environment variable.");
	process.exit(1);
}

export const JWT_SECRETE = process.env["JWT_SECRETE"];

if (!JWT_SECRETE) {
	console.info("No JWT secret string. Set JWT_SECRET environment variable.");
	process.exit(1);
}

export const GRID_SEND_KEY = process.env.SEND_GRIDE_API_KEY;