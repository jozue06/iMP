"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comm = exports.CommSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommSchema = new mongoose_1.Schema({
    contact: {
        type: mongoose_1.Types.ObjectId,
        ref: "contact",
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    contactPersonType: {
        type: String,
        required: false,
        default: 0
    },
    contactPersonName: {
        type: String,
        required: false,
    },
    contactVia: {
        type: String,
        required: false,
    },
    purpose: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    response: {
        type: String,
        required: false,
    },
});
exports.Comm = mongoose_1.model("comm", exports.CommSchema);
//# sourceMappingURL=contactComms.js.map