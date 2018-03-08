"use strict";
module.exports = function () {
    var mongoose = require('mongoose');
    var db = mongoose.connection;
    mongoose.connect('mongodb://localhost:27017/foo', {
        useMongoClient: true
    });
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        console.log('Db Connected!');
    });
};
//# sourceMappingURL=db.config.js.map