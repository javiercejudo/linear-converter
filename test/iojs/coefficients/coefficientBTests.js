/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var Decimal = arbitraryPrecision(bigjsAdapter);
  var getCoefficientB = lcFactory(Decimal).getCoefficientB;

  Decimal.setPrecision(52);

  it('should work with arbitrary precision', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).val().eq(new Decimal('-0.05').val())
      .should.be.exactly(true);

    getCoefficientB([[-5, 100], [-17, 193]]).val().toFixed(50)
      .should.be.exactly(new Decimal('-7').val().toFixed(50));
  });
};

exports.workWithFloatingPointNumbers = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var getCoefficientB = lcFactory(Decimal).getCoefficientB;

  it('work with floating-point numbers', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).val().val()
      .should.be.exactly(-0.05000000000000002);

    getCoefficientB([[0, 100], [32, 212]]).val().val()
      .should.be.exactly(32);
  });
};
