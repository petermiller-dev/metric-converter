const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // Test 1: Convert a valid input such as 10L
  test('Convert a valid input (e.g., 10L)', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' }) // Valid input
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'l');
        assert.isNumber(res.body.returnNum);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  // Test 2: Convert an invalid input such as 32g
  test('Convert an invalid input (e.g., 32g)', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' }) // Invalid input
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid input');
        done();
      });
  });

  // Test 3: Convert an invalid number such as 3/7.2/4kg
  test('Convert an invalid number (e.g., 3/7.2/4kg)', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' }) // Invalid number format
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid input');
        done();
      });
  });

  // Test 4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram
  test('Convert an invalid number and unit (e.g., 3/7.2/4kilomegagram)', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' }) // Invalid number and unit
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid input');
        done();
      });
  });

  // Test 5: Convert with no number such as kg
  test('Convert with no number (e.g., kg)', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' }) // No numerical input
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        assert.equal(res.body.initNum, 1); // Default to 1
        assert.equal(res.body.initUnit, 'kg');
        assert.isNumber(res.body.returnNum);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
