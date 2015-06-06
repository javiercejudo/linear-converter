/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var rescale = require('rescale');
var getCoefficientB = require('../../../src/linear-converter').getCoefficientB;

exports.delegateToRescaleWithX0 = function() {
  var rescaleMock;

  beforeEach(function() {
    rescaleMock = sinon.mock(rescale);

    rescaleMock.expects('rescale')
      .withExactArgs(0, [0, 1], [2, 3]).returns('anything');

    rescaleMock.expects('rescale')
      .withExactArgs(0, [5, -60], [5.7, Math.PI]).returns('whatever');
  });

  afterEach(function() {
    rescaleMock.verify();
  });

  it('delegate to rescale with x=0', function() {
    getCoefficientB([[0, 1], [2, 3]]).should.be.exactly('anything');
    getCoefficientB([[5, -60], [5.7, Math.PI]]).should.be.exactly('whatever');
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
