"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TaskSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    type: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    contact: {
        type: mongoose_1.Types.ObjectId,
        ref: "contact",
    },
});
exports.Task = mongoose_1.model("task", exports.TaskSchema);
//# sourceMappingURL=task.js.map