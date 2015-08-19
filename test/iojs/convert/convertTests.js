/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.convertBasedOnTheProvidedPreset = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var convert = lcFactory(Decimal).convert;

  it('convert based on the provided preset', function() {
    convert(-273.15, [[0, 10], [10, 20]]).val().val().should.be.exactly(-263.15);
    convert(24, [[0, 10], [10, 20]]).val().val().should.be.exactly(34);
  });
};
