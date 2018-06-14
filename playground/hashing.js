const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var message = "I am user no 6";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

var data = {
  id: 47
};

var token = jwt.sign(data, 'Shard@007');
console.log(token);

var decoded = jwt.verify(token, 'Shard@007');

console.log(decoded);
