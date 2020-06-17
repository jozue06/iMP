import { Document as Schema } from "camo";
import { EmbeddedDocument } from "camo";
import { getDb } from "../camo.js";
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
		this.postalCode = String;
		
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
			type: String,
			required: false,
		}

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

		this.contactGroupIds = [];

		this.notes = ContactNotes;
		this.communications = [ContactComms];
		this.taskIds = [];
	}

	static collectionName() {
		return "contacts";
	}
}

class ContactNotes extends EmbeddedDocument {
	constructor() {
		super();
		this.text = String;
	}
}

class ContactComms extends EmbeddedDocument {
	constructor() {
		super();
		this.date = Object;
		this.time = Object;
		this.contactPersonType = String;
		this.contactPersonName = String;
		this.contactVia = String;
		this.purpose = String;
		this.notes = String;
		this.response = String;
	}
}

export { Contact, ContactNotes, ContactComms }