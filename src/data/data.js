import { remote } from 'electron';

const db = remote.getGlobal('db');


function insertContact(record) {
    db.insert({record});
}

function findAllContacts(callback) {
    db.find({}, (err, docs) => {
        if (err) {
          callback(null, err);
          return;
        }
        callback(docs);
      });
}
export { insertContact, findAllContacts }