"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactGroup = exports.ContactGroupSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ContactGroupSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
    },
    contacts: [{
            type: mongoose_1.Types.ObjectId,
            ref: "contact",
        }],
    name: {
        type: String,
        required: true,
    },
});
exports.ContactGroup = mongoose_1.model("contactGroup", exports.ContactGroupSchema);
//# sourceMappingURL=contactGroup.js.map