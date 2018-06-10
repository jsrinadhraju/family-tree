var {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  _id: Schema.ObjectId,
  name: {lastname:String, firstname:String},
  gender: String,
  leftUs: Date,
  nickName: String,
  bloodGroup: String,
  dateOfBirth: String,
  occupation: String,
  highestQualification: String,
  hobbies: [String],
  mobileNo: Number,
  emailId: String,
  address: {addr: String, city: String, state: String, pincode: String},
  geoTag: String,
  mother: Schema.ObjectId,
  father: Schema.ObjectId,
  spouse: Schema.ObjectId,
  sons: [Schema.ObjectId],
  daughters: [Schema.ObjectId],
  photos: [String],
  lastUpdated: {type:Date, default: Date.now}
});

module.exports = personSchema;
