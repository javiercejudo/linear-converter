/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var Decimal = arbitraryPrecision(bigjsAdapter);
  var getCoefficientA = lcFactory(Decimal).getCoefficientA;

  it('should work with arbitrary precision', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).equals(new Decimal('2'))
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [32, 212]]).equals(new Decimal('9').div(new Decimal('5')))
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [150, 0]]).equals(new Decimal('-3').div(new Decimal('2')))
      .should.be.exactly(true);
  });
};

exports.workWithFloatingPointNumbers = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var getCoefficientA = lcFactory(Decimal).getCoefficientA;

  it('work with floating-point numbers', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).equals(new Decimal('1.9999999999999998'))
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [32, 212]]).equals(new Decimal('9').div(new Decimal('5')))
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [150, 0]]).equals(new Decimal('-3').div(new Decimal('2')))
      .should.be.exactly(true);
  });
};
