"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItinReport = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const ItinReportSchema = new mongoose_1.Schema({
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
    carMiles: {
        type: Number,
    },
    carCentsPerMile: {
        type: Number,
    },
    trailerMiles: {
        type: Number,
    },
    trailerCentsPerMile: {
        type: Number,
    },
    trailerLodgingNights: {
        type: Number,
    },
    trailerLodgingPrice: {
        type: Number,
    },
    trailerParkNights: {
        type: Number,
    },
    trailerParkPrice: {
        type: Number,
    },
    commitmentAmount: {
        type: Number,
        default: 0,
    },
    cashAmount: {
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
    startReceiptNo: {
        type: String,
    },
    endReceiptNo: {
        type: String,
    },
    comments: {
        type: String,
    },
    personalNotes: {
        type: String,
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
    offeringLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'offeringLine',
            defaut: []
        }],
    mileageLogs: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'mileageLog',
            defaut: []
        }],
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
ItinReportSchema.path("carMiles").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("carMiles").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("carCentsPerMile").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("carCentsPerMile").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("trailerMiles").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("trailerMiles").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("trailerCentsPerMile").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("trailerCentsPerMile").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("trailerLodgingPrice").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("trailerLodgingPrice").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("trailerParkPrice").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("trailerParkPrice").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("commitmentAmount").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("commitmentAmount").set((num) => moneyUtils_1.formatNumber(num));
ItinReportSchema.path("cashAmount").get((num) => moneyUtils_1.unformatNumber(num));
ItinReportSchema.path("cashAmount").set((num) => moneyUtils_1.formatNumber(num));
exports.ItinReport = mongoose_1.model("itinReport", ItinReportSchema);
//# sourceMappingURL=itinerationReport.js.map