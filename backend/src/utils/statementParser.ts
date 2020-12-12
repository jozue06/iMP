import csvParser from "csv-parser";
import { Readable } from 'stream'
import { Statement, StatementDocument } from "../models/statement";
import { StatementLine, StatementLineDocument } from "../models/statementLine";
import { Constants } from "./constants"
import moment from "moment";
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

async function createStatementAndSaveLines(userId: string, date: string, statementLines: StatementLineDocument[]): Promise<StatementDocument> {
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

function getDateFromFileName(fileName: string) : string {
	let dateParts:string[] = fileName.split("-");
	let datePart:string = dateParts[1] + "-" + dateParts[2];

	return moment(datePart, "YYYY-MM").format("YYYY-MM-DD");
}

export async function parseCsv(userId: string, fileName: string, buffer: Buffer, createContacts: Boolean): Promise<StatementDocument> {
	let date:string = getDateFromFileName(fileName);
	
	if (date === "Invalid date") {
		return new Promise((resolve, reject) => {
			let errorObject = {
				"errors": {
					"message":"Invalid Date"
				}
			}
			return reject(errorObject);
		});
	}

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
			statementLine.yearToDateAmount = el.YTDAmt;
			statementLine.receiptCount = el.ReceiptCount;

			if (createContacts) {
				// do contact stuff

			}
			
			lines.push(statementLine);
		});

		const savedLines = saveAllLines(lines)
		return savedLines;
	}).then(async lines => {
		const savedStatement = await createStatementAndSaveLines(userId, date, lines);
		return savedStatement;
	});
}