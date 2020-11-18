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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseLineController = void 0;
const qrtReport_1 = require("../models/qrtReport");
const sdrReport_1 = require("../models/sdrReport");
const itinerationReport_1 = require("../models/itinerationReport");
const institutionalReport_1 = require("../models/institutionalReport");
const expenseLine_1 = require("../models/expenseLine");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const awsController_1 = require("../controllers/awsController");
class ExpenseLineController {
    constructor() {
        this.createExpenseLine = (userId, req, res, next) => {
            let type = Number(req.body.expenseLineType);
            if (req.file) {
                const expenseLine = new expenseLine_1.ExpenseLine(JSON.parse(req.body.expenseLine));
                expenseLine.validate().catch(e => {
                    console.error("expenseLine.validate error ", e);
                    return next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
                awsController_1.uploadToS3(userId, req.file.originalname, req.file.buffer).then(re => {
                    expenseLine.imageURL = re.Location;
                    this.saveExpenseLineAndUpdateReport(type, expenseLine, res, next).catch(e => {
                        console.error("saveExpenseLine ", e);
                        next(new ValidationException_1.default(JSON.stringify(e.errors)));
                    });
                }).catch(e => {
                    console.error("uploadToS3 ", e);
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }
            else {
                const expenseLine = new expenseLine_1.ExpenseLine(req.body.expenseLine);
                this.saveExpenseLineAndUpdateReport(type, expenseLine, res, next).catch(e => {
                    next(new ValidationException_1.default(JSON.stringify(e.errors)));
                });
            }
        };
        // public getAllExpenseLines = (userId: string, req: Request, res: Response, next: NextFunction) => {
        // 	ExpenseLine.find({ "userId": userId }).then(lines => {
        // 		res.send(lines);
        // 	}).catch(e => {
        // 		next(new ValidationException(JSON.stringify(e.errors)));
        // 	});
        // };
        this.getExpenseLine = (userId, req, res, next) => {
            expenseLine_1.ExpenseLine.findById(req.params.id).then(line => {
                res.send(line);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.updateExpenseLine = (userId, req, res, next) => {
            expenseLine_1.ExpenseLine.findOneAndUpdate({ "_id": req.body.expenseLine._id }, Object.assign({}, req.body.expenseLine), { useFindAndModify: true }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e));
            });
        };
        this.deleteExpenseLines = (userId, req, res, next) => {
            expenseLine_1.ExpenseLine.deleteMany({ "_id": { $in: req.body.expenseLineIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(JSON.stringify(e.errors)));
            });
        };
        this.uploadExpensePhoto = (userId, req, res, next) => {
            expenseLine_1.ExpenseLine.findOne({ "_id": req.params.id }).then(found => {
                let foundExpenseLine = found;
                awsController_1.uploadToS3(userId, req.file.originalname, req.file.buffer).then(re => {
                    foundExpenseLine.imageURL = re.Location;
                    foundExpenseLine.save().then(r => {
                        res.send(r);
                    }).catch(e => {
                        next(new ValidationException_1.default(e));
                    });
                }).catch(e => {
                    console.error("uploadToS3 ", e);
                    next(new ValidationException_1.default(e));
                });
            }).catch(e => {
                next(new ValidationException_1.default(e));
            });
        };
        this.deleteExpensePhoto = (userId, req, res, next) => {
            let expenseLineId = req.body.expenseLine._id;
            awsController_1.removeFromS3(req.body.expenseLine.imageURL).then(re => {
                req.body.expenseLine.imageURL = "";
                expenseLine_1.ExpenseLine.findOneAndUpdate({ "_id": expenseLineId }, Object.assign({}, req.body.expenseLine), { useFindAndModify: true }).then(r => {
                    res.send("Image Deleted and Removed from S3");
                }).catch(e => {
                    next(new ValidationException_1.default(e));
                });
            }).catch(e => {
                console.error('eeek removeFromS3 error ', e);
                next(new ValidationException_1.default(e));
            });
        };
        this.saveExpenseLineAndUpdateReport = (expenseLineType, expenseLine, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield expenseLine.save().then((savedExpenseLine) => __awaiter(this, void 0, void 0, function* () {
                if (expenseLineType === 0) {
                    yield qrtReport_1.QtrReport.findOneAndUpdate({ _id: expenseLine.qtrReport }, { $push: { expenseLines: savedExpenseLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        return res.send(savedExpenseLine);
                    });
                }
                if (expenseLineType === 1) {
                    yield itinerationReport_1.ItinReport.findOneAndUpdate({ _id: expenseLine.itinReport }, { $push: { expenseLines: savedExpenseLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        return res.send(savedExpenseLine);
                    });
                }
                if (expenseLineType === 3) {
                    yield sdrReport_1.SDRReport.findOneAndUpdate({ _id: expenseLine.sdrReport }, { $push: { expenseLines: savedExpenseLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        return res.send(savedExpenseLine);
                    });
                }
                if (expenseLineType === 4) {
                    yield institutionalReport_1.InstitutionalReport.findOneAndUpdate({ _id: expenseLine.institutionalReport }, { $push: { expenseLines: savedExpenseLine._id } }, { useFindAndModify: true, new: true }).then(saved => {
                        return res.send(savedExpenseLine);
                    });
                }
            })).catch(e => {
                next(new ValidationException_1.default(e));
            });
        });
    }
}
exports.ExpenseLineController = ExpenseLineController;
//# sourceMappingURL=expenseLines.js.map