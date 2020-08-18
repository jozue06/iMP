import { TaskDocument, TaskModel } from "../models/task.types";

export async function findById(this: TaskModel, taskId: string): Promise<TaskDocument> {
	return await this.findOne({ taskId });
}

export async function findAll(this: TaskModel): Promise<TaskDocument[]> {
	return await this.find();
}

export async function create(this: TaskModel): Promise<TaskDocument> {
	return this.create();
}

export async function update(task: TaskModel): Promise<TaskDocument> {
	return this.update({task});
}

export async function deleteTask(this: TaskModel, taskId: string): Promise<object> {
	return await this.deleteOne({taskId});
}