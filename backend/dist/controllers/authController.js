"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
require("../auth/authHandler");
class AuthController {
    authenticateJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, jwtToken) {
            if (err) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "no user" });
            }
            else {
                return next(user._id);
            }
        })(req, res, next);
    }
    authorizeJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, jwtToken) {
            if (err) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            else {
                return res.status(200).json({ message: "welcome back" });
            }
        })(req, res, next);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map