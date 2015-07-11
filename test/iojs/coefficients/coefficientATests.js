/*jshint node:true, mocha:true */

'use strict';

require('should');

var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var getCoefficientA = lcFactory(bigjsAdapter).getCoefficientA;

  it('should work with arbitrary precision', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).should.be.exactly(2);

    getCoefficientA([[0, 100], [32, 212]])
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]])
      .should.be.exactly(-3/2);
  });
};

exports.workWithFloatingPointNumbers = function() {
  var getCoefficientA = lcFactory(floatingAdapter).getCoefficientA;

  it('work with floating-point numbers', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).should.be.exactly(1.9999999999999998);

    getCoefficientA([[0, 100], [32, 212]])
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]])
      .should.be.exactly(-3/2);
  });
};
