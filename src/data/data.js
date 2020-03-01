import { remote } from 'electron';

	const db = remote.getGlobal('db');


function insertContact(record) {
	db.insert({record});
}

function findAllContacts() {
	return new Promise((resolve, reject) => {
		db.find({}, (err, docs) => {
			if (err) {
				reject( err);
			} else {
				resolve(docs);
			}
		});
	});
}

function deleteContacts(contacts) {
	return new Promise((resolve, reject) => {
		contacts.forEach(contact => {
			db.remove({ _id : contact.id }, (err, numDeleted) => {
				if (err) {
					reject(err);
				} else {
					resolve(numDeleted);
				}
			});
		});
	});
}

export { insertContact, findAllContacts, deleteContacts }