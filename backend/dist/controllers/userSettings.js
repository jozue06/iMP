"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const userModel_1 = require("../models/userModel");
const settings_1 = require("../models/settings");
class SettingsController {
    constructor() {
        this.getSettings = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield settings_1.Settings.findOne({ user: userId })
                .populate("vehicles")
                .then(settings => {
                res.send(settings);
            });
        });
        this.saveSettings = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let settings = req.body.settings;
            settings.user = userId;
            yield settings_1.Settings.findOneAndUpdate({ _id: settings._id }, Object.assign({}, settings)).then(savedSettings => {
                userModel_1.User.findOneAndUpdate({ _id: userId }, { $set: { settings: savedSettings } }).then(user => {
                    res.send(user);
                });
            });
        });
        this.createSettings = (userId, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let settings = req.body.settings;
            settings.user = userId;
            yield settings_1.Settings.create(settings).then(savedSettings => {
                userModel_1.User.findOneAndUpdate({ _id: userId }, { $set: { settings: savedSettings } }).then(user => {
                    res.send(user);
                });
            });
        });
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=userSettings.js.map