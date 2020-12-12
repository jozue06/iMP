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
        required: true,
    },
    date: {
        type: String,
    },
    amount: {
        type: Number,
    },
    reimbursementAmount: {
        type: Number,
    },
    statementLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "statementLine"
        }],
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
StatementSchema.path("amount").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("amount").set((num) => moneyUtils_1.formatNumber(num));
StatementSchema.path("reimbursementAmount").get((num) => moneyUtils_1.unformatNumber(num));
StatementSchema.path("reimbursementAmount").set((num) => moneyUtils_1.formatNumber(num));
exports.Statement = mongoose_1.model("statement", StatementSchema);
//# sourceMappingURL=statement.js.map