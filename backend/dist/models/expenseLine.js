"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseLine = void 0;
const mongoose_1 = require("mongoose");
const ExpenseLineSchema = new mongoose_1.Schema({
    qtrReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "qtrReport",
    },
    itinReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "qtrReport",
    },
    sdrReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sdrReport",
    },
    institutionalReport: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "institutionalReport",
    },
    date: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    codeDescription: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    exchangeRate: {
        type: Number,
        required: false,
    },
    foreignAmount: {
        type: Number,
        required: false,
    },
    dollarAmount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    multiPart: {
        type: Boolean,
        required: false,
    },
    receiptReq: {
        type: Boolean,
        required: false,
    },
    imageURL: {
        type: String,
        required: false,
    }
});
exports.ExpenseLine = mongoose_1.model("expenseLine", ExpenseLineSchema);
//# sourceMappingURL=expenseLine.js.map