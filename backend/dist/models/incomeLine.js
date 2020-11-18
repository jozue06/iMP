"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeLine = void 0;
const mongoose_1 = require("mongoose");
const IncomeSchema = new mongoose_1.Schema({
    reportId: {
        type: mongoose_1.Types.ObjectId,
        ref: "institutionReport",
    },
    amount: {
        type: Number,
    },
    comments: {
        type: String,
    },
});
exports.IncomeLine = mongoose_1.model("incomeLine", IncomeSchema);
//# sourceMappingURL=incomeLine.js.map