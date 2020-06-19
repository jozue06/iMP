import { Document as Schema } from 'camo';
import { EmbeddedDocument } from 'camo';
import { getDb } from "../camo.js"
getDb();
class QuarterlyReport extends Schema {
	constructor() {
		super();
		this.quarterNumber = Number;
		this.year = String;
		this.dateCompleted = String;
		this.baseAmount = Number;
		this.deficitReimbursement = Number;
		this.otherAGWMIncome = Number
		this.otherNonAGWMIncome = Number;
		
		this.sdrReferenceNumbers = String;
		this.sdrBalance = Number;
		this.otherFundsHeld = Number;
		this.personalOfferingsRetained = Number;

		this.expenseLines = [ExpenseLine];
		this.directDonorLines = [DirectDonorLine];
		this.personalOfferingLines = [PersonalOfferingLine];
	}

	static collectionName() {
		return 'quarterlyReports';
	}
}

class ExpenseLine extends EmbeddedDocument {
	constructor() {
		super();
		
		this.date = String;
		this.paymentMethod = String;
		this.code = Number;
		this.codeDescription = String;
		this.currency = String;
		this.exchangeRate = Number;
		this.foreignAmount = Number
		this.dollarAmount = Number;
		this.description = String;

		this.multiPart = {
			type: Boolean,
			default: false,
		};

		this.receiptReq = {
			type: Boolean,
			default: false,
		}
	
	}

	static collectionName() {
		return 'expenseLines';
	}
}

class DirectDonorLine extends EmbeddedDocument {
	constructor() {
		super();
		
		this.date = String;
		this.paymentMethod = String;
		this.code = Number;
		this.codeDescription = String;
		this.currency = String;
		this.exchangeRate = Number;
		this.foreignAmount = Number
		this.dollarAmount = Number;
		this.description = String;

		this.multiPart = {
			type: Boolean,
			default: false,
		};

		this.receiptReq = {
			type: Boolean,
			default: false,
		}
		this.contactId = String;
	}

	static collectionName() {
		return 'directDonorLines';
	}
}

class PersonalOfferingLine extends EmbeddedDocument {
	constructor() {
		super();
		
		this.date = String;
		this.paymentMethod = String;
		this.code = Number;
		this.codeDescription = String;
		this.currency = String;
		this.exchangeRate = Number;
		this.foreignAmount = Number
		this.dollarAmount = Number;
		this.description = String;

		this.multiPart = {
			type: Boolean,
			default: false,
		};

		this.receiptReq = {
			type: Boolean,
			default: false,
		}
		this.contactId = String;
	}

	static collectionName() {
		return 'personalOfferingLines';
	}
}

export { QuarterlyReport, ExpenseLine }