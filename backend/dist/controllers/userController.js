"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jwt = __importStar(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const secret_1 = require("../utils/secret");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const async_1 = __importDefault(require("async"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserController {
    constructor() {
        this.postForgot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.username || req.body.username == "") {
                return next(new ValidationException_1.default({ "message": "Please Enter a Valid User Name and Password" }));
            }
            async_1.default.waterfall([
                function createRandomToken(done) {
                    crypto_1.default.randomBytes(16, (err, buf) => {
                        const token = buf.toString("hex");
                        done(err, token);
                    });
                },
                function setRandomToken(token, done) {
                    userModel_1.User.findOne({ username: req.body.username }, (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return next(new ValidationException_1.default({ "message": `User with user name  ${req.body.username} not found.` }));
                        }
                        user.passwordResetToken = token;
                        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                        user.save(() => {
                            done(err, token, user);
                        });
                    });
                },
                function sendForgotPasswordEmail(token, user, done) {
                    if (!user.settings || !user.settings.email || user.settings.email == "") {
                        return next(new ValidationException_1.default({ "message": `You have not setup an e-mail address for this account. Please email us at imp.app.info@gmail.com to reset your account` }));
                    }
                    let options = { service: 'gmail',
                        auth: {
                            user: 'imp.app.info@gmail.com',
                            pass: 'My4p3t^t4WMKTxqy'
                        }
                    };
                    let transport = nodemailer_1.default.createTransport(options);
                    const msg = {
                        to: user.settings.email,
                        from: 'noreply@gmail.com',
                        subject: 'Imp APP Info',
                        html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
						Please click on the following link, or paste this into your browser to complete the process:\n\n
						http://localhost:8080/#/user/reset/${token}\n\n
						<strong>If you did not request this, please contact us at imp.app.info@gmail.com .</strong>\n`,
                    };
                    transport.sendMail(msg).then(() => {
                        return res.sendStatus(200);
                    }).catch((e) => console.error('err', e));
                },
            ], (err) => {
                if (err) {
                    return next(err);
                }
            });
        });
        this.postReset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.token || req.body.token == "") {
                return next(new ValidationException_1.default({ "message": "An error occurred" }));
            }
            async_1.default.waterfall([
                function resetPassword(done) {
                    userModel_1.User.findOne({ passwordResetToken: req.body.token })
                        .where("passwordResetExpires").gt(Date.now())
                        .exec((err, user) => {
                        if (err) {
                            return next(err);
                        }
                        if (!user) {
                            return next(new ValidationException_1.default({ "message": "Password reset token is invalid or has expired." }));
                        }
                        user.password = bcrypt_nodejs_1.default.hashSync(req.body.password, bcrypt_nodejs_1.default.genSaltSync(10));
                        user.passwordResetToken = undefined;
                        user.passwordResetExpires = undefined;
                        user.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            return res.sendStatus(200);
                        });
                    });
                },
                function sendForgotPasswordEmail(token, user, done) {
                    let options = { service: 'gmail',
                        auth: {
                            user: 'imp.app.info@gmail.com',
                            pass: 'My4p3t^t4WMKTxqy'
                        }
                    };
                    let transport = nodemailer_1.default.createTransport(options);
                    const msg = {
                        to: user.settings.email,
                        from: 'noreply@gmail.com',
                        subject: "Your Imp APP password has been changed",
                        html: `Hello,\n\nThis is a confirmation that the password for your account ${user.settings.email} has just been changed.\n
					<strong>If you did not request this, please contact us at imp.app.info@gmail.com .</strong>\n`,
                    };
                    transport.sendMail(msg).then(() => {
                        return res.sendStatus(200);
                    }).catch((e) => console.error('err', e));
                }
            ], (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        });
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.username || req.body.username == "") {
                next(new ValidationException_1.default({ "message": "Please Enter a Valid User Name and Password" }));
            }
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(req.body.password, bcrypt_nodejs_1.default.genSaltSync(10));
            const userCreated = userModel_1.User.create({
                username: req.body.username,
                password: hashedPassword,
            });
            const token = jwt.sign({ userId: (yield userCreated)._id, username: req.body.username, scope: req.body.scope }, secret_1.JWT_SECRETE);
            res.status(200).send({ token });
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.username || req.body.username == "" || !req.body.password || req.body.password == "") {
                return next(new ValidationException_1.default({ "message": "Please Enter a Valid User Name and Password" }));
            }
            const username = req.body.username;
            yield userModel_1.User.findOne({ username }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(new ValidationException_1.default({ "message": `User with user name  ${username} not found.` }));
                }
                yield user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        return next(err);
                    }
                    if (isMatch) {
                        const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, secret_1.JWT_SECRETE);
                        return res.status(200).send({ token });
                    }
                    else {
                        return next(new ValidationException_1.default({ "message": "Username or password incorrect." }));
                    }
                });
            }));
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map