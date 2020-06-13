import { Document as Schema } from 'camo';
import { getDb } from "../camo.js"
getDb();
class Contact extends Schema {
	constructor() {
		super();
		
		this.firstName = String;
		this.lastName = String;
		this.address = String;
		this.city = String;
		this.country = String;
		this.email = String;
		this.phone = String;
		this.postalCode = Number;
	}

	static collectionName() {
		return 'contacts';
	}
}

export { Contact }