"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const contactTask_1 = require("../models/contactTask");
const contact_1 = require("../models/contact");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class TaskController {
    constructor() {
        this.createTask = (userId, req, res, next) => {
            const task = new contactTask_1.Task(req.body.task);
            task.contact = req.body.task.contactId;
            task.save().then((savedTask) => {
                contact_1.Contact.findOneAndUpdate({ _id: req.body.task.contactId }, { $push: { tasks: savedTask._id } }, { useFindAndModify: true, new: true }).then((saved) => {
                    res.send(saved);
                });
            }).catch(e => {
                console.error('eeek ', e);
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getAllTasks = (userId, req, res, next) => {
            contactTask_1.Task.find({ "userId": userId }).then((tasks) => {
                res.send(tasks);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.getTask = (userId, req, res, next) => {
            contactTask_1.Task.findById(req.params.id).then((task) => {
                res.send(task);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.updateTaskInfo = (userId, req, res, next) => {
            contactTask_1.Task.findOneAndUpdate({ "_id": req.body.task._id }, Object.assign({}, req.body.task), { useFindAndModify: true }).then((r) => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.toggleMany = (userId, req, res, next) => {
            let ids = req.body.tasks.map((task) => task._id);
            let completedToSet = req.body.completedToSet;
            contactTask_1.Task.updateMany({ "_id": { $in: ids } }, { completed: completedToSet }, { useFindAndModify: true }).then((r) => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
        this.deleteTasks = (userId, req, res, next) => {
            contactTask_1.Task.deleteMany({ "_id": { $in: req.body.taskIds } }).then(r => {
                res.send(r);
            }).catch(e => {
                next(new ValidationException_1.default(e.errors));
            });
        };
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=contactTasks.js.map