const chai = require('chai');
const { assert } = chai;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  // Test 1: convertHandler should correctly read a whole number input.
  test('Whole number input', function () {
    const input = '10L';
    const result = convertHandler.getNum(input);
    assert.equal(result, 10);
  });

  // Test 2: convertHandler should correctly read a decimal number input.
  test('Decimal number input', function () {
    const input = '3.5gal';
    const result = convertHandler.getNum(input);
    assert.equal(result, 3.5);
  });

  // Test 3: convertHandler should correctly read a fractional input.
  test('Fractional input', function () {
    const input = '1/2km';
    const result = convertHandler.getNum(input);
    assert.equal(result, 0.5);
  });

  // Test 4: convertHandler should correctly read a fractional input with a decimal.
  test('Fractional input with a decimal', function () {
    const input = '1.5/2km';
    const result = convertHandler.getNum(input);
    assert.equal(result, 0.75);
  });

  // Test 5: convertHandler should correctly return an error on a double-fraction (i.e., 3/2/3).
  test('Double-fraction input should return an error', function () {
    const input = '3/2/3kg';
    const result = convertHandler.getNum(input);
    assert.isNull(result);
  });

  // Test 6: convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('No numerical input should default to 1', function () {
    const input = 'kg';
    const result = convertHandler.getNum(input);
    assert.equal(result, 1);
  });

 
