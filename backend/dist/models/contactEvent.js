"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.Schema({
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
    type: {
        type: String,
        required: false,
        default: ""
    },
    details: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    amountReceived: {
        type: Number,
        required: false,
        default: 0,
    },
});
exports.EventSchema.index({ contact: 1, date: 1, time: 1 }, { unique: true });
exports.Event = mongoose_1.model("event", exports.EventSchema);
//# sourceMappingURL=contactEvent.js.map