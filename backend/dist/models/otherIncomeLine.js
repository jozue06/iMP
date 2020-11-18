"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherIncomeLine = void 0;
const mongoose_1 = require("mongoose");
const OtherIncomeSchema = new mongoose_1.Schema({
    qtrReport: {
        type: mongoose_1.Types.ObjectId,
        ref: "qtrReport",
    },
    contact: {
        type: mongoose_1.Types.ObjectId,
        ref: "contact",
    },
    type: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    amount: {
        type: Number,
    },
    comments: {
        type: String,
    },
});
exports.OtherIncomeLine = mongoose_1.model("otherIncomeLine", OtherIncomeSchema);
//# sourceMappingURL=otherIncomeLine.js.map