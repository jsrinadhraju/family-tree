var express = require("express");
var bodyParser = require("body-parser");

const Person = require('./db/model');
const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const port = process.env.PORT || 3001;
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
app.listen(port, () => console.log(`Server started on port ${port}`));
