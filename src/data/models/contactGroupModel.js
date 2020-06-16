import { Document as Schema } from 'camo';
import { EmbeddedDocument } from 'camo';
import Contact from "./contactModel"
import { getDb } from "../camo.js"
getDb();

class ContactGroup extends Schema {
	constructor() {
		super();
		this.groupName = String;

		this.contacts = [EmbeddedContact];

	}

	static collectionName() {
		return 'contactGroups';
	}
}

class EmbeddedContact extends EmbeddedDocument {
	constructor() {
		super();
		Contact.Contact;
	}
}

export { ContactGroup }