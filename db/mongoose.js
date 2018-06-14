const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
