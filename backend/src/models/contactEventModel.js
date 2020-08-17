import { Document as Schema } from "camo";

class Event extends Schema {
	constructor() {
		super();
		this.date = String;
		this.time = String;
		this.type = String;
		this.details = String;
		this.isCompleted = Boolean;
		this.amountReceived = {
			type: Number,
			required: false,
			default: 0
		}
		this.contactId = String;
	}

	static collectionName() {
		return "events";
	}
}

export { Event }