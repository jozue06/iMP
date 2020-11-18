"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAReport = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const MAReportSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    dateCompleted: {
        type: String,
    },
    expectedDateToField: {
        type: String,
    },
    totalOfferings: {
        type: Number,
        default: 0,
    },
    estimatedExpenses: {
        type: Number,
        default: 0,
    },
    numberOfServices: {
        type: Number,
        default: 0,
    },
    numberOfAppointments: {
        type: Number,
        default: 0,
    },
    letters: {
        type: Number,
        default: 0,
    },
    phoneCalls: {
        type: Number,
        default: 0,
    },
    otherComms: {
        type: Number,
        default: 0,
    },
    receiptBooksNeeded: {
        type: Number,
        default: 0,
    },
    commitmentFormsNeeded: {
        type: Number,
        default: 0,
    },
    statement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'statement',
        defaut: []
    },
    comments: {
        type: String,
    },
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
MAReportSchema.path("totalOfferings").get((num) => moneyUtils_1.unformatNumber(num));
MAReportSchema.path("totalOfferings").set((num) => moneyUtils_1.formatNumber(num));
MAReportSchema.path("estimatedExpenses").get((num) => moneyUtils_1.unformatNumber(num));
MAReportSchema.path("estimatedExpenses").set((num) => moneyUtils_1.formatNumber(num));
exports.MAReport = mongoose_1.model("maReport", MAReportSchema);
//# sourceMappingURL=maReport.js.map