const mongoose = require('mongoose');
const {UserSchema} = require('./schema');

var User = mongoose.model('User', UserSchema);

module.exports = {User};
