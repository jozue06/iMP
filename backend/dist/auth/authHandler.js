"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const userModel_1 = require("../models/userModel");
const secret_1 = require("../utils/secret");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const LocalStrategy = passport_local_1.default.Strategy;
const JwtStrategy = passport_jwt_1.default.Strategy;
passport_1.default.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    userModel_1.User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `username ${username} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid username or password." });
        });
    });
}));
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret_1.JWT_SECRETE
}, function (jwtToken, done) {
    userModel_1.User.findOne({ username: jwtToken.username }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            user;
            return done(undefined, user, jwtToken);
        }
        else {
            return done(undefined, false);
        }
    }).populate("settings");
}));
//# sourceMappingURL=authHandler.js.map