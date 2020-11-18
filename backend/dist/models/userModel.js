"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
exports.UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    settings: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "setting"
    },
});
exports.UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        callback(err, isMatch);
    });
};
exports.User = mongoose_1.model("user", exports.UserSchema);
//# sourceMappingURL=userModel.js.map