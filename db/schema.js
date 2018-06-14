const {mongoose} = require('./mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var PersonSchema = new Schema({
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

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    },
    trim: true,
    minlenth: 1
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'Scr008').toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

module.exports = {PersonSchema, UserSchema};
