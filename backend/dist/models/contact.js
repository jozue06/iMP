"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
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
    state: {
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
    postalCode: {
        type: String,
        required: false,
    },
    orgName: {
        type: String,
        required: false,
    },
    isIndividual: {
        type: Boolean,
        required: false,
    },
    secretary: {
        type: String,
        required: false,
    },
    missionsContact: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    section: {
        type: String,
        required: false,
    },
    secondAddress: {
        type: String,
        required: false,
    },
    secondCity: {
        type: String,
        required: false,
    },
    secondCountry: {
        type: String,
        required: false,
    },
    secondEmail: {
        type: String,
        required: false,
    },
    secondPhone: {
        type: String,
        required: false,
    },
    secondPostalCode: {
        type: String,
        required: false,
    },
    contactStatus: {
        type: Number,
        required: true,
        default: 0,
    },
    commitmentAmt: {
        type: Number,
        required: false,
        default: 0
    },
    accountNumber: {
        type: String,
        required: false,
    },
    events: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'event'
        }],
    tasks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'task'
        }],
    comms: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'comm'
        }],
    contactGroups: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'contactGroup',
            defaut: []
        }],
});
exports.Contact = mongoose_1.model("contact", ContactSchema);
//# sourceMappingURL=contact.js.map