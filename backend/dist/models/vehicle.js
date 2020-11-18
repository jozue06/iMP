"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const mongoose_1 = require("mongoose");
const VehicleSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: false,
    },
    default: {
        type: Boolean,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    make: {
        type: String,
        required: false,
    },
    model: {
        type: String,
        required: false,
    },
    chassisNumber: {
        type: String,
        required: false,
    },
    motorNumber: {
        type: String,
        required: false,
    },
    stlAgreementNumber: {
        type: String,
        required: false,
    },
    comments: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
});
exports.Vehicle = mongoose_1.model("vehicle", VehicleSchema);
//# sourceMappingURL=vehicle.js.map