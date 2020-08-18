import { model } from "mongoose";
import { TaskDocument } from "./task.types";
import Task from "./task.schema";

export const TaskSchema = model<TaskDocument>("task", Task);