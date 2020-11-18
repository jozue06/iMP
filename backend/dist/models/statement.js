"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const StatementSchema = new mongoose_1.Schema({
    qtrReportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "qtrReport",
    },
    institutionalReportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "institutionalReport",
    },
    itinReportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "itinerationReport",
    },
    sdrReportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sdrReport",
    },
    maReportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "maReport",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    dateOne: {
        type: String,
    },
    amountOne: {
        type: Number,
    },
    reimbursementOne: {
        type: Number,
    },
    dateTwo: {
        type: String,
    },
    amountTwo: {
        type: Number,
    },
    reimbursementTwo: {
        type: Number,
    },
    dateThree: {
        type: String,
    },
    amountThree: {
        type: Number,
    },
    reimbursementThree: {
        type: Number,
    },
});
StatementSchema.path("amountOne").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("amountOne").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("amountTwo").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("amountTwo").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("amountThree").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("amountThree").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("reimbursementOne").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("reimbursementOne").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("reimbursementTwo").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("reimbursementTwo").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("reimbursementThree").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("reimbursementThree").set((num) => moneyUtils_1.formatNumber(num));
exports.Statement = mongoose_1.model("statement", StatementSchema);
//# sourceMappingURL=statement.js.map