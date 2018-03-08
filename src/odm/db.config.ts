export = () => {
	let mongoose = require('mongoose');
	let db = mongoose.connection;
	mongoose.connect('mongodb://localhost:27017/foo', {
		useMongoClient: true
	});
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', () => {
		console.log('Db Connected!');
	});
};
