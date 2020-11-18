"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MileageLog = void 0;
const mongoose_1 = require("mongoose");
const MileageLogSchema = new mongoose_1.Schema({
    qtrReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "qtrReport",
    },
    date: {
        type: String,
        required: true,
    },
    odometerStart: {
        type: Number,
        required: true,
    },
    odometerEnd: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    vehicle: {
        type: mongoose_1.Types.ObjectId,
        ref: "vehicle",
        required: false,
    },
});
exports.MileageLog = mongoose_1.model("mileageLog", MileageLogSchema);
//# sourceMappingURL=mileageLog.js.map