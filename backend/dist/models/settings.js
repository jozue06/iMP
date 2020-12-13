"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = require("mongoose");
const moneyUtils_1 = require("../utils/moneyUtils");
const SettingsSchema = new mongoose_1.Schema({
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
        required: false,
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
    carCentsPerMile: {
        type: Number,
        required: false,
        default: 0
    },
    trailerCentsPerMile: {
        type: Number,
        required: false,
        default: 0
    },
    trailerLodgingPrice: {
        type: Number,
        required: false,
        default: 0
    },
    totalPledgesRequired: {
        type: Number,
        required: false,
        default: 0
    },
    totalCashRequired: {
        type: Number,
        required: false,
        default: 0
    },
    contactGroups: [{
            type: mongoose_1.Types.ObjectId,
            ref: "contactGroup",
            required: false,
        }],
    vehicles: [{
            type: mongoose_1.Types.ObjectId,
            ref: "vehicle",
            required: false,
        }],
    defaultCurrency: {
        type: String,
        required: false,
        default: "USD",
    },
    userCurrencies: {
        type: Array,
        required: false,
        default: [],
    },
    theme: {
        type: String,
        default: "light",
    }
}, {
    toObject: { getters: true },
    toJSON: { getters: true },
});
SettingsSchema.path("carCentsPerMile").get((num) => moneyUtils_1.unformatNumber(num));
SettingsSchema.path("carCentsPerMile").set((num) => moneyUtils_1.formatNumber(num));
SettingsSchema.path("trailerCentsPerMile").get((num) => moneyUtils_1.unformatNumber(num));
SettingsSchema.path("trailerCentsPerMile").set((num) => moneyUtils_1.formatNumber(num));
SettingsSchema.path("trailerLodgingPrice").get((num) => moneyUtils_1.unformatNumber(num));
SettingsSchema.path("trailerLodgingPrice").set((num) => moneyUtils_1.formatNumber(num));
SettingsSchema.path("totalPledgesRequired").get((num) => moneyUtils_1.unformatNumber(num));
SettingsSchema.path("totalPledgesRequired").set((num) => moneyUtils_1.formatNumber(num));
SettingsSchema.path("totalCashRequired").get((num) => moneyUtils_1.unformatNumber(num));
SettingsSchema.path("totalCashRequired").set((num) => moneyUtils_1.formatNumber(num));
exports.Settings = mongoose_1.model("setting", SettingsSchema);
//# sourceMappingURL=settings.js.map