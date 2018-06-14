var {mongoose} = require('./mongoose');
var {PersonSchema} = require('./schema');

// compile our model
 var Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
