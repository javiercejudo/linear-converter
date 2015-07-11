/*jshint node:true, mocha:true */

'use strict';

require('should');

var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.workWithArbitraryPrecision = function() {
  var getCoefficientB = lcFactory(bigjsAdapter).getCoefficientB;

  it('should work with arbitrary precision', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).should.be.exactly(-0.05);
    getCoefficientB([[-5, 100], [-17, 193]]).should.be.exactly(-7);
  });
};

exports.workWithFloatingPointNumbers = function() {
  var getCoefficientB = lcFactory(floatingAdapter).getCoefficientB;

  it('work with floating-point numbers', function() {
    getCoefficientB([[0.1, 0.3], [0, 0.1]]).should.be.exactly(-0.05000000000000002);
    getCoefficientB([[0, 100], [32, 212]]).should.be.exactly(32);
  });
};
