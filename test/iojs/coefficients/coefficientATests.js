/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var getCoefficientA = require('../../../src/convert.js').getCoefficientA;

exports.returnCoefficientA = function() {
  it('should return coefficient a', function() {
    getCoefficientA([[0, 1], [1, 3]]).should.be.exactly(2);

    getCoefficientA([[0, 100], [32, 212]])
      .should.be.exactly(9/5);

    getCoefficientA([[0, 100], [150, 0]])
      .should.be.exactly(-3/2);
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
      getCoefficientA(2);
    }).should.throw(rescaleUtil.RescaleError, {message: 'an error'});
  });
};
