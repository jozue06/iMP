"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementLine = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const StatementLineSchema = new mongoose_1.Schema({
    statement: {
        type: mongoose_1.Types.ObjectId,
        ref: "statement"
    },
    date: {
        type: String,
    },
    donorAccount: {
        type: String,
    },
    churchOrg: {
        type: String,
    },
    fullName: {
        type: String,
    },
    amount: {
        type: Number,
    },
    class: {
        type: String,
    },
    pledgeDate: {
        type: String,
    },
    pledgeAmount: {
        type: Number,
    },
    yearToDateAmount: {
        type: Number,
    },
    receiptCount: {
        type: Number,
    },
    contact: {
        type: mongoose_1.Types.ObjectId,
        ref: "contact"
    },
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
StatementLineSchema.path("amount").get((num) => moneyUtils_1.unformatNumber(num));
StatementLineSchema.path("amount").set((num) => moneyUtils_1.formatNumber(num));
StatementLineSchema.path("pledgeAmount").get((num) => moneyUtils_1.unformatNumber(num));
StatementLineSchema.path("pledgeAmount").set((num) => moneyUtils_1.formatNumber(num));
StatementLineSchema.path("yearToDateAmount").get((num) => moneyUtils_1.unformatNumber(num));
StatementLineSchema.path("yearToDateAmount").set((num) => moneyUtils_1.formatNumber(num));
exports.StatementLine = mongoose_1.model("statementLine", StatementLineSchema);
//# sourceMappingURL=statementLine.js.map