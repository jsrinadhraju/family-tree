var env = process.env.NODE_ENV || 'development';
console.log('env*********', env);
if (env === 'development') {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/family-tree';
} else if (env === 'test') {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/family-treeTest';
}

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');

const Person = require('./db/model');
const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const port = process.env.PORT;
var app = express();
app.use(bodyParser.json());


app.post('/addperson', (req, res) => {
  var personObj = new Person({
    _id: req.body._id,
    name: req.body.name,
    gender: req.body.gender,
    leftUs: req.body.leftUs,
    nickName: req.body.nickName,
    bloodGroup: req.body.bloodGroup,
    dateOfBirth: req.body.dateOfBirth,
    occupation: req.body.occupation,
    highestQualification: req.body.highestQualification,
    geoTag: req.body.geoTag,
    hobbies: req.body.qualification,
    mobileNo: req.body.mobileNo,
    emailId: req.body.emailId,
    address: req.body.address,
    mother: req.body.mother,
    father: req.body.father,
    spouse: req.body.spouse,
    sons: req.body.sons,
    daughters: req.body.daughters,
    photos: req.body.photos
    });
  personObj.save().then((doc) => {
    console.log("1-->", doc);
    res.send(doc);
  }, (e) => {
    res.status(400);
    res.send(e);
  })
});

app.get('/getall', (req, res) => {
    Person.find().then((doc) => {
      console.log(JSON.stringify(doc, undefined, 2));
      res.send(doc);
    });
});

app.get('/get/:id', (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    console.log("Object Id is not valid");
    res.status(400).send("Object Id is not valid");
    return;
  }
  Person.findById(req.params.id).then((doc) => {
    if (!doc) {
      res.status(400).send("Id not found");
      return console.log("Id not found");
    }
    res.status(200).send(JSON.stringify(doc, undefined, 2));
    console.log('Data', JSON.stringify(doc, undefined, 2));})
    .catch((err) => console.log(err));
});

app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id);
  Person.findByIdAndRemove(req.params.id).then((todo) => {
    res.end();
    return console.log("Object removed success fully", todo);
  }, (e) => {
    res.end();
    return console.log("Object not found");
  });
});

app.patch('/update/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'gender']);
  console.log("Body --> ", body);
  if (!ObjectId.isValid(req.params.id)) {
    console.log("Object Id is not valid");
    return res.status(400).send("Object Id is not valid");
  }

  if (body.gender === 'male') {
    console.log('No update required');
    res.status(400).send("No update required");
  } else {
    body.gender = "female";
    body.lastUpdated = new Date().getTime();
    Person.findByIdAndUpdate(id, {$set: body}, {new: true})
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }
        res.status(200).send({todo});
      }, (e) => { res.status(404).send();
    }).catch((e) => {
      console.log("error-->", e);
    })
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = {app};
