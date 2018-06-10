var {mongoose} = require('./mongoose');
var personSchema = require('./schema');

// compile our model
 var Person = mongoose.model('Person', personSchema);

module.exports = Person;
