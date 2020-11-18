"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const secret_1 = require("./utils/secret");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const authRoutes_1 = require("./routes/authRoutes");
const contactRoutes_1 = require("./routes/contactRoutes");
const qtrReportRoutes_1 = require("./routes/qtrReportRoutes");
const itinReportRoutes_1 = require("./routes/itinReportRoutes");
const maReportRoutes_1 = require("./routes/maReportRoutes");
const sdrReportRoutes_1 = require("./routes/sdrReportRoutes");
const institutionalReportRoutes_1 = require("./routes/institutionalReportRoutes");
const settingsRoutes_1 = require("./routes/settingsRoutes");
const vehicleRoutes_1 = require("./routes/vehicleRoutes");
const expenseLineRoutes_1 = require("./routes/expenseLineRoutes");
const mileageLogRoutes_1 = require("./routes/mileageLogRoutes");
const statementRoutes_1 = require("./routes/statementRoutes");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.upload = multer_1.default();
        this.app = express_1.default();
        this.config();
        this.mongo();
        this.routes();
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../frontend/dist')));
        this.app.use(error_middleware_1.default);
    }
    routes() {
        this.app.use("/user", new authRoutes_1.AuthRoutes().router);
        this.app.use("/", new contactRoutes_1.ContactRoutes().router);
        this.app.use("/", new qtrReportRoutes_1.QtrReportRoutes().router);
        this.app.use("/", new itinReportRoutes_1.ItinReportRoutes().router);
        this.app.use("/", new maReportRoutes_1.MAReportRoutes().router);
        this.app.use("/", new settingsRoutes_1.SettingsRoutes().router);
        this.app.use("/", new vehicleRoutes_1.VehicleRoutes().router);
        this.app.use("/", new sdrReportRoutes_1.SDRReportRoutes().router);
        this.app.use("/", new institutionalReportRoutes_1.InstitutionalReportRoutes().router);
        this.app.use("/", new expenseLineRoutes_1.ExpenseLineRoutes().router);
        this.app.use("/", new mileageLogRoutes_1.MileageLogRoutes().router);
        this.app.use("/", new statementRoutes_1.StatementRoutes().router);
        this.app.get('/', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../../frontend', 'dist', 'index.html'));
        });
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
        this.app.use(passport_1.default.initialize());
        this.app.use(this.upload.single("file"));
    }
    mongo() {
        const connection = mongoose_1.default.connection;
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
                mongoose_1.default.connect(secret_1.MONGO_DB_URI, {
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
        connection.on("error", (error) => {
            console.info("Mongo Connection ERROR: " + error);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(secret_1.MONGO_DB_URI, {
                useNewUrlParser: true,
                keepAlive: true,
                useUnifiedTopology: true
            });
        });
        run().catch(error => console.error(error));
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.info("API is running on port:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map