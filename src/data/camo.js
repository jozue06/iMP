import { remote } from 'electron';

let uri = remote.getGlobal('databaseUri');

var Camo = require('camo');
var database;
Camo.connect(uri).then(function(db) {
	database = db;
});

function getDb() {
	return database;
}

export { getDb }