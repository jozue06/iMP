import { remote } from 'electron';
let uri = remote.getGlobal('databaseUri');

var Camo = require('camo');
var database;
Camo.connect(uri).then((db) => {
	database = db;
}).catch(e => {
	console.log('other ee', e);
});

function getDb() {	
	return database;
}

export { getDb }