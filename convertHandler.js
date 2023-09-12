function ConvertHandler() {
  this.getNum = function (input) {
    const validUnitRegex = /^[0-9]+(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)?/;
    const numMatch = input.match(validUnitRegex);

    if (numMatch) {
      const numStr = numMatch[0];
      if (numStr.includes('/')) {
        const parts = numStr.split('/');
        if (parts.length === 2) {
          return parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
          return null; // Invalid fraction format
        }
      } else {
        return parseFloat(numStr);
      }
    } else {
      return 1; // Default to 1 if no numerical input
    }
  };

 this.getUnit = function (input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const result = input.toLowerCase().replace(this.getNum(input).toString(), '').trim();

    if (validUnits.includes(result)) {
      if (result === 'l') {
        return 'L'; // Represent liter as uppercase 'L'
      } else {
        return result;
      }
    } else {
      return null; // Invalid unit
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'l': 'L',
      'gal': 'L',
      'lbs': 'kg',
      'mi': 'km',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const conversions = {
      'gal': 3.78541,
      'l': 0.264172,
      'mi': 1.60934,
      'km': 0.621371,
      'lbs': 0.453592,
      'kg': 2.20462
    };

    return parseFloat((initNum * conversions[initUnit]).toFixed(5));
  };

 this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    if (!spelledOutInitUnit && !spelledOutReturnUnit) {
      return 'invalid number and unit';
    } else if (!spelledOutInitUnit) {
      return 'invalid unit';
    } else if (!spelledOutReturnUnit) {
      return 'invalid unit';
    } else {
      return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
    }
  };
}

module.exports = ConvertHandler;
