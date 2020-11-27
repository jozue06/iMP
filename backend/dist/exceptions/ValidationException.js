"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class ValidationException extends HttpException_1.default {
    constructor(message) {
        const errors = [];
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(message))));
        map.forEach((v, k) => {
            if (typeof v === 'object') {
                Object.values(v).forEach((e) => {
                    if (e.message) {
                        if (e.message.includes("Path")) {
                            e.message = e.message.replace("Path ", "");
                        }
                        errors.push(e.message);
                    }
                });
            }
            else if (v.message) {
                if (v.message.includes("Path")) {
                    v.message = v.message.replace("Path ", "");
                }
                errors.push(v.message);
            }
            else if (k === "message" && !v.includes("validation failed")) {
                errors.push(v);
            }
        });
        console.log('errors', errors);
        super(422, errors);
    }
}
exports.default = ValidationException;
//# sourceMappingURL=ValidationException.js.map