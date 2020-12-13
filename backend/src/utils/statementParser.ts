import csvParser from "csv-parser";
import { Readable } from 'stream'
import { Statement, StatementDocument } from "../models/statement";
import { StatementLine, StatementLineDocument } from "../models/statementLine";
import { Constants } from "./constants"
import { StatementLineContact } from "../models/statementLineContact";
import { Contact, ContactDocument } from "../models/contact";
import { magicMeshPredicate } from './magicMesh';
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

const existingContactPredicate = (contact: ContactDocument, newContact: StatementLineContact) => contact.firstName == newContact.firstName && contact.lastName == newContact.lastName && contact.orgName == newContact.orgName;

export async function parseCsv(userId: string, fileName: string, buffer: Buffer, useMagicMesh: Boolean, createContacts: Boolean): Promise<StatementDocument> {
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
	
	let headers = Constants.allStatementCsvHeaders;

	try {
		let contacts: ContactDocument[] = await Contact.find({userId: userId});
		const parsedData = await readCsv(buffer, headers);
		let lines:StatementLineDocument[] = [];

		let errorsList = [];

		// THIS IS IMPORTANT we need to skip the fist line of the data, as it is just the header names
		parsedData.shift();
		
		try {
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
				statementLine.receiptCount = el.ReceiptCount != "" ? Number(el.ReceiptCount) : 0;
				
				let newContact = {
					firstName: el.DonorFirstName,
					lastName: el.DonorLastName,
					accountNumber: el.DonorAcctNo,
					address: el.DonorStreet,
					city: el.DonorCity,
					state: el.DonorState,
					postalCode: el.DonorZipPlus4 != "" ? el.DonorZip + " " + el.DonorZipPlus4 : el.DonorZip,
					phone: el.DonorTelephone,
					email: el.DonorEmail,
					district: el.District,
					section: el.Section,
					orgName: el.DonorName,
				};

				statementLine.statementLineContact = new StatementLineContact(newContact);

				if (createContacts) {
					if (!contacts.filter(c => existingContactPredicate(c, statementLine.statementLineContact)).length) {
						let createdContact = new Contact(statementLine.statementLineContact);
						createdContact.userId = userId;

						// await createdContact.validate();

						createdContact.save();
						contacts.push(createdContact);
						statementLine.contact = createdContact._id;
					}
				}

				if (useMagicMesh) {
					// do auto meshing of contacts. autoMesh strategy is if account number is the same OR if first name AND last name match
					let foundContact = contacts.find(c => magicMeshPredicate(c, statementLine.statementLineContact));

					if (foundContact) {
						statementLine.contact = foundContact._id;
					}
				}
				
				lines.push(statementLine);
			});
			
		} catch (error) {
			return new Promise((resolve, reject) => {
				return reject(error);
			});
		}
		if (errorsList.length == 0) {
			let savedLines = await saveAllLines(lines);
			let statement:StatementDocument = await createStatementAndSaveLines(userId, date, savedLines);
			return statement;
		}
		return;
	} catch (error) {
		return new Promise((resolve, reject) => {
			return reject(error);
		});
	}
}