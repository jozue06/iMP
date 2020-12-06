import csvParser from "csv-parser";
import { Readable } from 'stream'
import { Statement, StatementDocument } from "../models/statement";
import { StatementLine, StatementLineDocument } from "../models/statementLine";
import { Constants } from "./constants"
function readCsv(buffer: Buffer, headers:any[]): Promise<any> {
	const results: any = [];
	return new Promise((resolve, reject) => {
		const readable = new Readable()
		readable._read = () => { }
		readable.push(buffer)
		readable.push(null)
		readable.pipe(csvParser(headers))
			.on('data', (data) => results.push(data))
			.on('end', () => {
				resolve(results);
			});
	});
}

async function createStatementAndSaveLines(userId: string, statementLines: StatementLineDocument[]): Promise<StatementDocument> {
	let statement = new Statement();
	statement.user = userId;
	statementLines.forEach(statementLine => {
		statementLine.statement = statement._id;
		statement.statementLines.push(statementLine)
	});
	
	const savedStatement = await statement.save();
	return savedStatement;
}

async function saveAllLines(lines:StatementLineDocument[]) {
	const savedLines = await StatementLine.insertMany(lines);
	return savedLines;
}

export async function parseCsv(userId: string, buffer: Buffer, createContacts: Boolean): Promise<StatementDocument> {
	let headers = createContacts ? Constants.allStatementCsvHeaders : Constants.noContactStatementCsvHeaders;

	return readCsv(buffer, headers).then(parsedData => {
		let lines:StatementLineDocument[] = [];

		parsedData.forEach((el: any) => {
			let statementLine = new StatementLine();
			statementLine.date = el.CurrentDate;
			statementLine.donorAccount = el.DonorAcctNo;
			statementLine.churchOrg = el.DonorName;
			statementLine.fullName = el.DonorFirstName + " " + el.DonorLastName;
			statementLine.amount = el.CurrentAmt;
			statementLine.class = el.ClassNo;
			statementLine.pledgeDate = el.PledgeDate;
			statementLine.pledgeAmount = el.PledgeAmt;

			if (createContacts) {
				// do contact stuff

			}
			
			lines.push(statementLine);
		});

		const savedLines = saveAllLines(lines)
		return savedLines;
	}).then(async lines => {
		const savedStatement = await createStatementAndSaveLines(userId, lines);
		return savedStatement;
	});
}