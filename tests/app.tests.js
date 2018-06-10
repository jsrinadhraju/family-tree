const expect = require("expect");
const request = require("supertest");

const {app} = require('./../server');
const {Todo} = require('./../model/Todo');


describe('Get Person by Id', () => {
  it('should get the correct person object', (done) => {
    request(app)
      .get('/get/5b1d2388f4efe9210b6e64c8')
      .expect(200)
      .end(done);
  })
})
