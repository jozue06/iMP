import { remote } from 'electron';

const contacts = remote.getGlobal('contacts');
const quarterlyReports = remote.getGlobal('quarterlyReports');

function insertContact(record) {
	contacts.insert({record});
}

function findAllContacts() {
	return new Promise((resolve, reject) => {
		contacts.find({}, (err, docs) => {
			if (err) {
				reject( err);
			} else {
				resolve(docs);
			}
		});
	});
}

function deleteContacts(contactsToDelete) {
	return new Promise((resolve, reject) => {
		contactsToDelete.forEach(contact => {
			contacts.remove({ _id : contact.id }, (err, numDeleted) => {
				if (err) {
					reject(err);
				} else {
					resolve(numDeleted);
				}
			});
		});
	});
}

function findAllQuarterlyReports() {
	return new Promise((resolve, reject) => {
		quarterlyReports.find({}, (err, docs) => {
			if (err) {
				reject( err);
			} else {
				resolve(docs);
			}
		});
	});
}

function insertQuarterlyReport(record) {
	quarterlyReports.insert({record});
}


export { insertContact, findAllContacts, deleteContacts, findAllQuarterlyReports, insertQuarterlyReport }