/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.convertBasedOnTheProvidedConversion = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var convert = lcFactory(Decimal).convert;

  it('convert based on the provided conversion', function() {
    convert([[0, 10], [10, 20]], -273.15).equals(new Decimal('-263.15')).should.be.exactly(true);
    convert([[0, 10], [10, 20]], 24).equals(new Decimal('34')).should.be.exactly(true);
  });
};
