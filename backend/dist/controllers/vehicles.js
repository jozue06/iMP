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
exports.VehiclesController = void 0;
const settings_1 = require("../models/settings");
const vehicle_1 = require("../models/vehicle");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class VehiclesController {
    constructor() {
        this.getVehicles = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield vehicle_1.Vehicle.find({ user: userId }).then(vehicles => {
                res.send(vehicles);
            });
        });
        this.deleteVehicles = (userId, req, res, next) => {
            vehicle_1.Vehicle.deleteMany({ "_id": { $in: req.body.vehicleIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.saveVehicle = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let vehicle = req.body.vehicle;
            yield vehicle_1.Vehicle.findOneAndUpdate({ _id: vehicle._id }, Object.assign({}, vehicle)).then(savedVehicle => {
                res.send(savedVehicle);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        });
        this.createVehicle = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let vehicle = req.body.vehicle;
            vehicle.user = userId;
            yield vehicle_1.Vehicle.create(vehicle).then(vehicle => {
                settings_1.Settings.findOneAndUpdate({ user: userId }, { $push: { vehicles: vehicle } }).then(settings => {
                    res.send(settings.vehicles);
                });
            });
        });
    }
}
exports.VehiclesController = VehiclesController;
//# sourceMappingURL=vehicles.js.map