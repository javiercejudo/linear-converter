/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.convertWithTheUnitPreset = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var convert = lcFactory(Decimal).convert;

  it('convert with the unit preset', function() {
    convert(10.5).equals(new Decimal('10.5')).should.be.exactly(true);
    convert(0).equals(new Decimal('0')).should.be.exactly(true);
  });
};


exports.convertBasedOnTheProvidedPreset = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var convert = lcFactory(Decimal).convert;

  it('convert based on the provided preset', function() {
    convert(10.5).equals(new Decimal('10.5')).should.be.exactly(true);
    convert(-273.15, [[0, 10], [10, 20]]).equals(new Decimal('-263.15')).should.be.exactly(true);
    convert(24, [[0, 10], [10, 20]]).equals(new Decimal('34')).should.be.exactly(true);
  });
};
