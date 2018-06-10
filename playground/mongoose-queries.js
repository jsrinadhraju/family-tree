const {ObjectId} = require('mongodb');

const {mongoose} = require('./../db/mongoose');
const Person = require('./../db/model');

var id = '5b1d2388f4efe9210b6e64c8';

if (!ObjectId.isValid(id)) {
  console.log("Object Id is not valid");
  return;
}
Person.find({name: {lastname: 'Datla'}})
  .then(
    (docs) => { console.log('Data', JSON.stringify(docs, undefined, 2));}
  );
//Person.findOne({_id: id}).then((doc) => {console.log('Data', JSON.stringify(doc, undefined, 2));});

// Person.findById(id).then((doc) => {
//   if (!doc) {
//     console.log("Id not found");
//     return;
//   }
//   console.log('Data', JSON.stringify(doc, undefined, 2));})
//   .catch((err) => console.log(err));
