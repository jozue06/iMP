import { Document as Schema } from "camo";

class Task extends Schema {
	constructor() {
		super();
		this.date = String;
		this.type = String;
		this.details = String;
		this.completed = Boolean;
		this.contactId = String;
	}

	static collectionName() {
		return "tasks";
	}
}

export { Task }