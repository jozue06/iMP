"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtrReport = void 0;
const mongoose_1 = require("mongoose");
const QtrReportSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
    quarterNumber: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    dateCompleted: {
        type: Date,
    },
    baseAmount: {
        type: Number,
    },
    comments: {
        type: String,
    },
    deficitReimbursement: {
        type: Number,
    },
    otherAGWMIncome: {
        type: Number,
    },
    otherNonAGWMIncome: {
        type: Number,
    },
    sdrReferenceNumbers: {
        type: String,
    },
    sdrBalance: {
        type: Number,
    },
    otherFundsHeld: {
        type: Number,
    },
    personalOfferingsRetained: {
        type: Number,
    },
    expenseLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'expenseLine',
            default: []
        }],
    mileageLogs: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'mileageLog',
            default: []
        }],
    statements: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'statement',
            default: []
        }],
    otherIncomeLines: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'otherIncomeLine',
            default: []
        }],
});
exports.QtrReport = mongoose_1.model("qtrReport", QtrReportSchema);
//# sourceMappingURL=qrtReport.js.map