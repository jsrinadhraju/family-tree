const expect = require("expect");

const utils = require('./utils');
const request = require('supertest');
const app = require('./../app').app;

describe('Get Person by Id', () => {
  it('should get the correct person object', (done) => {
    request(app)
      .get('/get/5b1e1fed2ed76fc50a461130')
      .expect(200)
      .end(done);
  })
})


describe('Check add function', () => {
  it('should add two numbers', () => {
    var res = utils.add(5,4);
    expect(res).toBe(9);
  })
  it('should add t55wo numbers', () => {
    var res = utils.add(11,22);
    if (res !== 33) {
      throw new Error("Number not equal to 33");
    }
  })
  it('should add tw33o numbers', () => {
    var res = utils.add(11,22);
    if (res !== 33) {
      throw new Error("Number not equal to 33");
    }
  })
});
