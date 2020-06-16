import { Document as Schema } from 'camo';
import { EmbeddedDocument } from 'camo';

import { getDb } from "../camo.js"
getDb();

class Contact extends Schema {
	constructor() {
		super();
		this.firstName = String;
		this.lastName = String;
		
		this.address = String;
		this.city = String;
		
		this.country = {
			type: String,
			required: false,
		}
		
		this.email = {
			type: String,
			required: false 
		}
		
		this.phone = String;
		this.postalCode = Number;
		
		this.orgName = String;
		this.isIndividual = Boolean;

		this.secretary = {
			type: String, 
			required: false,
		}
		
		this.missionsContact = {
			type: String,
			required: false,
		}
		
		this.district = {
			type: String,
			required: false,
		}
		
		this.section = {
			type: String,
			required: false,
		}

		this.secondAddress = {
			type: String,
			required: false,
		}

		this.secondCity = {
			type: String,
			required: false,
		}

		this.secondCountry = {
			type: String,
			required: false,
		}

		this.secondEmail = {
			type: String,
			required: false,
		}

		this.secondPhone = {
			type: String,
			required: false,
		}

		this.secondPostalCode = {
			type: Number,
			required: false,
		}

		this.notes = ContactNotes;

		this.contactStatus = {
			type: Number,
			required: true,
			default: 0
		}

		this.commitmentAmt = {
			type: Number,
			required: false,
			default: 0
		}

		this.accountNumber = {
			type: String,
			required: false,
			default: ""
		}
	}

	static collectionName() {
		return 'contacts';
	}
}

class ContactNotes extends EmbeddedDocument {
	constructor() {
		super();
		this.text = String;
	}
}

export { Contact, ContactNotes }