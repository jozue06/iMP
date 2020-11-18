"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDRReport = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const SDRReportSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
    reportLocationType: {
        type: Number,
        required: false,
    },
    dateCompleted: {
        type: Date,
        required: false,
    },
    sdrNumber: {
        type: String,
        required: false,
    },
    field: {
        type: String,
        required: false,
    },
    sdrDate: {
        type: Date,
        required: false,
    },
    disbursmentDate: {
        type: Date,
        required: false,
    },
    receivingFunds: {
        type: Number,
        required: false,
    },
    receivingFundsDescription: {
        type: String,
        required: false,
    },
    sdrReferenceNumber: {
        type: String,
        required: false,
    },
    specialCheckDate: {
        type: Date,
        required: false,
    },
    purpose: {
        type: String,
        required: false,
    },
    accountCharged: {
        type: String,
        required: false,
    },
    class: {
        type: String,
        required: false,
    },
    source: {
        type: String,
        required: false,
    },
    sdrAmount: {
        type: Number,
        required: false,
    },
    comments: {
        type: String,
        required: false,
    },
    statement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'statement',
        defaut: []
    },
    expenseLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'expenseLine',
            defaut: []
        }],
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
exports.SDRReport = mongoose_1.model("sdrReport", SDRReportSchema);
SDRReportSchema.path("receivingFunds").get((num) => moneyUtils_1.unformatNumber(num));
SDRReportSchema.path("receivingFunds").set((num) => moneyUtils_1.formatNumber(num));
SDRReportSchema.path("sdrAmount").get((num) => moneyUtils_1.unformatNumber(num));
SDRReportSchema.path("sdrAmount").set((num) => moneyUtils_1.formatNumber(num));
//# sourceMappingURL=sdrReport.js.map