/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var big = require('big.js');
var arbitraryPrecision = require('rescale-arbitrary-precision');
var getCoefficientA = require('../../../src/linear-converter').getCoefficientA;

exports.workWithArbitraryPrecision = function() {
  var hasArbitraryPrecisionStub;

  beforeEach(function() {
    hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
    hasArbitraryPrecisionStub.returns(true);
  });

  afterEach(function() {
    hasArbitraryPrecisionStub.restore();
  });

  it('should work with arbitrary precision', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).should.be.exactly(2);

    getCoefficientA([[0, 100], [32, 212]])
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]])
      .should.be.exactly(-3/2);
  });
};

exports.workWithFloatingPointNumbers = function() {
  var hasArbitraryPrecisionStub;

  beforeEach(function() {
    hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
    hasArbitraryPrecisionStub.returns(false);
  });

  afterEach(function() {
    hasArbitraryPrecisionStub.restore();
  });

  it('work with floating-point numbers', function() {
    getCoefficientA([[0, 0.1], [0.1, 0.3]]).should.be.exactly(1.9999999999999998);

    getCoefficientA([[0, 100], [32, 212]])
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]])
      .should.be.exactly(-3/2);
  });
};
