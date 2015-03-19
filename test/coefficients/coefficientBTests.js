/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var getCoefficientB = require('../../src/convert.js').getCoefficientB;

exports.returnCoefficientB = function() {
  it('be able to be computed', function() {
    getCoefficientB([[0, 1], [1, 3]]).should.be.exactly(1);

    getCoefficientB([[0, 100], [32, 212]])
      .should.be.exactly(32);

    getCoefficientB([[0, 100], [150, 0]])
      .should.be.exactly(150);
  });
};

exports.throwAnError = function() {
  var getLastErrorStub;

  beforeEach(function() {
    getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');
    getLastErrorStub.returns('an error');
  });

  afterEach(function() {
    getLastErrorStub.restore();
  });

  it('should throw an error', function() {
    (function() {
      getCoefficientB(2);
    }).should.throw(rescaleUtil.RescaleError, {message: 'an error'});
  });
};
