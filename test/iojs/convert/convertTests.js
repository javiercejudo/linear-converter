/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var convert = require('../../../src/linear-converter').convert;

exports.beTheIdentity = function() {
  it('should be the identity', function() {
    convert(1).should.be.exactly(1);
    convert(Math.E).should.be.exactly(Math.E);
  });
};

exports.delegateItsValidationToRescaleUtil = function() {
  var rescaleUtilMock;

  afterEach(function() {
    rescaleUtilMock.verify();
  });

  it('should delegate its validation to rescale util', function() {
    rescaleUtilMock = sinon.mock(rescaleUtil);

    rescaleUtilMock.expects('isValidPreset')
      .withExactArgs([[0, 5], [0, 10]]).returns(true);

    rescaleUtilMock.expects('isValidPreset')
      .withExactArgs([[-5, 1], [Math.E, 10.2]]).returns(true);

    convert(2.5, [[0, 5], [0, 10]]);
    convert(-3, [[-5, 1], [Math.E, 10.2]]);
  });
};

exports.delegateTheConversionToRescale = function() {
  var rescaleStub;

  beforeEach(function() {
    rescaleStub = sinon.stub(rescale, 'rescale');

    rescaleStub.withArgs('anything', [0, 10], [10, 20])
      .onFirstCall().returns(Math.PI)
      .onSecondCall().returns(34);
  });

  afterEach(function() {
    rescaleStub.restore();
  });

  it('should delegate the conversion to rescale', function() {
    convert('anything', [[0, 10], [10, 20]]).should.be.exactly(Math.PI);
    convert('anything', [[0, 10], [10, 20]]).should.be.exactly(34);
  });
};

exports.throwAnError = function() {
  var isValidPresetStub, getLastErrorStub;

  beforeEach(function() {
    isValidPresetStub = sinon.stub(rescaleUtil, 'isValidPreset');
    getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');

    isValidPresetStub.returns(false);
    getLastErrorStub.returns('an error');
  });

  afterEach(function() {
    isValidPresetStub.restore();
    getLastErrorStub.restore();
  });

  it('should throw an error', function() {
    (function() {
      convert(2, 2);
    }).should.throw(rescaleUtil.RescaleError, {message: 'an error'});
  });
};
