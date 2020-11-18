"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferingLine = void 0;
const mongoose_1 = require("mongoose");
const OfferingSchema = new mongoose_1.Schema({
    itinReportId: {
        type: mongoose_1.Types.ObjectId,
        ref: "itinReport",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
        default: 0,
    },
    receiptNo: {
        type: String,
    },
    workSupportAmt: {
        type: Number,
    },
    specialAmt: {
        type: Number,
    },
    otherAmt: {
        type: Number,
    },
    hospitality: {
        type: Number,
    },
    equipment: {
        type: Number,
    },
    otherNonCash: {
        type: Number,
    },
    contactType: {
        type: Number,
        default: 0,
    },
    contact: {
        type: mongoose_1.Types.ObjectId,
        ref: "contact",
    }
});
exports.OfferingLine = mongoose_1.model("offeringLine", OfferingSchema);
//# sourceMappingURL=offeringLine.js.map