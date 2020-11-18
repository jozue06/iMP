"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
    },
    firstName: {
        type: String,
        required: false,
    },
    spouseName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    mobilePhone: {
        type: String,
        required: false,
    },
    postalCode: {
        type: String,
        required: false,
    },
    field: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: false,
    },
    homeDistrict: {
        type: String,
        required: false,
    },
    currentStatus: {
        type: String,
        required: false,
    },
});
exports.Profile = mongoose_1.model("profile", ProfileSchema);
//# sourceMappingURL=profile.js.map