/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var Decimal = arbitraryPrecision(bigjsAdapter);
  var getCoefficientB = lcFactory(Decimal).getCoefficientB;

  Decimal.setPrecision(52);

  it('should work with arbitrary precision', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).equals(new Decimal('-0.05'))
      .should.be.exactly(true);

    getCoefficientB([[-5, 100], [-17, 193]]).val().toFixed(50)
      .should.be.exactly(new Decimal('-7').val().toFixed(50));
  });
};

exports.workWithFloatingPointNumbers = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var getCoefficientB = lcFactory(Decimal).getCoefficientB;

  it('work with floating-point numbers', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).equals(new Decimal('-0.05000000000000002'))
      .should.be.exactly(true);

    getCoefficientB([[0, 100], [32, 212]]).equals(new Decimal('32'))
      .should.be.exactly(true);
  });
};
