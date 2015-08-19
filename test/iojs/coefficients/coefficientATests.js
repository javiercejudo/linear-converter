/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var Decimal = arbitraryPrecision(bigjsAdapter);
  var getCoefficientA = lcFactory(Decimal).getCoefficientA;

  it('should work with arbitrary precision', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).val().eq(new Decimal('2').val())
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [32, 212]]).val().eq(new Decimal('9').div(new Decimal('5')).val())
      .should.be.exactly(true);

    getCoefficientA([[0, 100], [150, 0]]).val().eq(new Decimal('-3').div(new Decimal('2')).val())
      .should.be.exactly(true);
  });
};

exports.workWithFloatingPointNumbers = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var getCoefficientA = lcFactory(Decimal).getCoefficientA;

  it('work with floating-point numbers', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).val().val()
      .should.be.exactly(1.9999999999999998);

    getCoefficientA([[0, 100], [32, 212]]).val().val()
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]]).val().val()
      .should.be.exactly(-3/2);
  });
};
