"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAM_USER_SECRET = exports.IAM_USER_KEY = exports.BUCKET_NAME = exports.JWT_SECRETE = exports.MONGO_DB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_DB_URI = process.env.MONGO_DB_URI;
if (!exports.MONGO_DB_URI) {
    console.info("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
exports.JWT_SECRETE = process.env.JWT_SECRETE;
if (!exports.JWT_SECRETE) {
    console.info("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
exports.BUCKET_NAME = process.env.BUCKET_NAME;
exports.IAM_USER_KEY = process.env.IAM_USER_KEY;
exports.IAM_USER_SECRET = process.env.IAM_USER_SECRET;
//# sourceMappingURL=secret.js.map