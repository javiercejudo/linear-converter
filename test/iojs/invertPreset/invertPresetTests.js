/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.invertThePreset = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var invert = lcFactory(Decimal).invertPreset;

  it('should invert the preset', function() {
    invert([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
    invert([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
  });
};
