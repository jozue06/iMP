import { ContactDocument, ContactModel } from "../models/Contact.types";

export async function findById(this: ContactModel, taskId: string): Promise<ContactDocument> {
	return await this.findOne({ taskId });
}

export async function findAll(this: ContactModel): Promise<ContactDocument[]> {
	return await this.find();
}

export async function create(this: ContactModel): Promise<ContactDocument> {
	return this.create();
}

export async function update(task: ContactModel): Promise<ContactDocument> {
	return this.update({task});
}

export async function deleteTask(this: ContactModel, taskId: string): Promise<object> {
	return await this.deleteOne({taskId});
}