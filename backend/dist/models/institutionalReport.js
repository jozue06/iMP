"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionalReport = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const InstitutionalReportSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: false,
    },
    dateCompleted: {
        type: Date,
    },
    beginningAmount: {
        type: Number,
    },
    usBankFunds: {
        type: Number,
    },
    localBankFunds: {
        type: Number,
    },
    pettyCashFunds: {
        type: Number,
    },
    LFTLsdrBalance: {
        type: Number,
    },
    nonLFTLsdrBalance: {
        type: Number,
    },
    comments: {
        type: String,
    },
    expenseLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'expenseLine',
            default: []
        }],
    incomeLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'incomeLine',
            default: []
        }],
    statement: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'statement',
        default: []
    },
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
InstitutionalReportSchema.path("beginningAmount").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("beginningAmount").set((num) => moneyUtils_1.formatNumber(num));
InstitutionalReportSchema.path("usBankFunds").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("usBankFunds").set((num) => moneyUtils_1.formatNumber(num));
InstitutionalReportSchema.path("localBankFunds").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("localBankFunds").set((num) => moneyUtils_1.formatNumber(num));
InstitutionalReportSchema.path("pettyCashFunds").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("pettyCashFunds").set((num) => moneyUtils_1.formatNumber(num));
InstitutionalReportSchema.path("LFTLsdrBalance").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("LFTLsdrBalance").set((num) => moneyUtils_1.formatNumber(num));
InstitutionalReportSchema.path("nonLFTLsdrBalance").get((num) => moneyUtils_1.unformatNumber(num));
InstitutionalReportSchema.path("nonLFTLsdrBalance").set((num) => moneyUtils_1.formatNumber(num));
exports.InstitutionalReport = mongoose_1.model("institutionalReport", InstitutionalReportSchema);
//# sourceMappingURL=institutionalReport.js.map