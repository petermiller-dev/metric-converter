'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // Define the API route for unit conversion
  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (!initNum || !initUnit) {
        res.json({ error: 'Invalid input' });
        return;
      }

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    });
};
