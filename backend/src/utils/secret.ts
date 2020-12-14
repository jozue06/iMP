import dotenv from "dotenv";
dotenv.config();
export const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
	console.info("No mongo connection string. Set MONGODB_URI environment variable.");
	process.exit(1);
}

export const JWT_SECRETE = process.env.JWT_SECRETE;

if (!JWT_SECRETE) {
	console.info("No JWT secret string. Set JWT_SECRET environment variable.");
	process.exit(1);
}

export const BUCKET_NAME = process.env.BUCKET_NAME;
export const IAM_USER_KEY = process.env.IAM_USER_KEY;
export const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
export const BUCKET_NAME_FOR_CUSTOMER_SITES = process.env.BUCKET_NAME_FOR_CUSTOMER_SITES;