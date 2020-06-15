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

		this.secondaddress = {
			type: String,
			required: false,
		}

		this.secondcity = {
			type: String,
			required: false,
		}

		this.secondcountry = {
			type: String,
			required: false,
		}

		this.secondemail = {
			type: String,
			required: false,
		}

		this.secondphone = {
			type: String,
			required: false,
		}

		this.secondpostalCode = {
			type: Number,
			required: false,
		}

		this.notes = ContactNotes;
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