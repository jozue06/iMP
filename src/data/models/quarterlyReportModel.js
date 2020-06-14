import { Document as Schema } from 'camo';
import { EmbeddedDocument } from 'camo';
import { getDb } from "../camo.js"
getDb();
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
class QuarterlyReport extends Schema {
	constructor() {
		super();
		this.quarterNumber = Number;
		this.reportDate = String;
		this.expenseLines = [ExpenseLine]
	}

	static collectionName() {
		return 'quarterlyReports';
	}
}

export { QuarterlyReport, ExpenseLine }