// import { Document as Schema } from 'camo';
// import { EmbeddedDocument } from 'camo';
// import { getDb } from "../camo.js"
// getDb();
// class QuarterlyReport extends Schema {
// 	constructor() {
// 		super();
// 		this.quarterNumber = Number;
// 		this.year = String;
// 		this.dateCompleted = String;
// 		this.baseAmount = Number;
// 		this.comments = String;

// 		this.deficitReimbursement = Number;
// 		this.otherAGWMIncome = Number
// 		this.otherNonAGWMIncome = Number;
		
// 		this.sdrReferenceNumbers = String;
// 		this.sdrBalance = Number;
// 		this.otherFundsHeld = Number;
// 		this.personalOfferingsRetained = Number;

// 		this.expenseLines = [ExpenseLine];
// 		this.mileageLogs = [MileageLog];
// 		this.statements = [Statement];
// 		this.otherIncomeLines = [OtherIncomeLine];

// 	}

// 	static collectionName() {
// 		return 'quarterlyReports';
// 	}
// }

// class ExpenseLine extends EmbeddedDocument {
// 	constructor() {
// 		super();
		
// 		this.date = String;
// 		this.paymentMethod = String;
// 		this.code = Number;
// 		this.codeDescription = String;
// 		this.currency = String;
// 		this.exchangeRate = Number;
// 		this.foreignAmount = Number
// 		this.dollarAmount = Number;
// 		this.description = String;

// 		this.multiPart = {
// 			type: Boolean,
// 			default: false,
// 		};

// 		this.receiptReq = {
// 			type: Boolean,
// 			default: false,
// 		}
	
// 	}

// 	static collectionName() {
// 		return 'expenseLines';
// 	}
// }

// class OtherIncomeLine extends EmbeddedDocument {
// 	constructor() {
// 		super();
// 		this.type = Number; // can be 'direct donor', or 'personal'
// 		this.firstName = String;
// 		this.lastName = String;
		
// 		this.address = String;
// 		this.city = String;
		
// 		this.country = {
// 			type: String,
// 			required: false,
// 		}

// 		this.amount = Number;
// 		this.comments = String;

// 		this.contactId = String;
// 	}

// 	static collectionName() {
// 		return 'otherIncomeLines';
// 	}
// }

// class MileageLog extends EmbeddedDocument {
// 	constructor() {
// 		super();
		
// 		this.date = String;
// 		this.vehicle = String;
// 		this.odometerStart = Number;
// 		this.odometerEnd = Number;
// 		this.description = String;
// 		this.type = String;
// 	}

// 	static collectionName() {
// 		return 'mileageLogs';
// 	}
// }

// class Statement extends EmbeddedDocument {
// 	constructor() {
// 		super();
		
// 		this.date = String;
// 		this.amount = Number;
// 	}

// 	static collectionName() {
// 		return 'statements';
// 	}
// }

// export { QuarterlyReport, ExpenseLine, OtherIncomeLine, MileageLog, Statement }