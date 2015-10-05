/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

function scaleVals(scale) {
  return scale.map(Number);
}

exports.invertTheConversion = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var invert = lcFactory(Decimal).invertConversion;

  it('should invert the conversion', function() {
    invert([[0, 10], [10, 20]])
      .map(scaleVals)
      .should.eql([[10, 20], [0, 10]]);

    invert([[-5, 4], [0.05, -5.4]])
      .map(scaleVals)
      .should.eql([[0.05, -5.4], [-5, 4]]);
  });
};
