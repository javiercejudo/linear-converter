/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var compose = require('../../../src/linear-converter').composePresets;

exports.throwAnError = function() {
  var getLastErrorStub;

  beforeEach(function() {
    getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');
    getLastErrorStub.returns('some other error');
  });

  afterEach(function() {
    getLastErrorStub.restore();
  });

  it('should throw an error', function() {
    (function() {
      compose(2, 2);
    }).should.throw(rescaleUtil.RescaleError, {message: 'some other error'});
  });
};

exports.delegateTheirValidationToRescaleUtil = function() {
  var rescaleUtilMock;

  afterEach(function() {
    rescaleUtilMock.verify();
  });

  it('should delegate their validation to rescale util', function() {
    rescaleUtilMock = sinon.mock(rescaleUtil);

    rescaleUtilMock.expects('areValidPresets')
      .withExactArgs([[[0, 5], [0, 10]], [[-5, 1], [Math.E, 10.2]]]).returns(true);

    compose([[[0, 5], [0, 10]], [[-5, 1], [Math.E, 10.2]]]);
  });
};

exports.throwAnotherError = function() {
  var areValidPresetsStub, getLastErrorStub;

  beforeEach(function() {
    areValidPresetsStub = sinon.stub(rescaleUtil, 'areValidPresets');
    getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');

    areValidPresetsStub.returns(false);
    getLastErrorStub.returns('yet another error');
  });

  afterEach(function() {
    areValidPresetsStub.restore();
    getLastErrorStub.restore();
  });

  it('should throw another error', function() {
    (function() {
      compose([[[0, 10], [10, Infinity]], [[10, 20], [50, 60]]]);
    }).should.throw('yet another error');

    (function() {
      compose();
    }).should.throw('yet another error');
  });
};

exports.composeThePresets = function() {
  var areValidPresetsStub;

  beforeEach(function() {
    areValidPresetsStub = sinon.stub(rescaleUtil, 'areValidPresets');
    areValidPresetsStub.returns(true);
  });

  afterEach(function() {
    areValidPresetsStub.restore();
  });

  it('should compose the presets', function() {
    compose([
      [[0, 10], [10, 20]],
      [[10, 20], [50, 60]]
    ]).should.eql([[0, 10], [50, 60]]);

    compose([
      [[0, 1], [0, -2]],
      [[0, 3], [0, -9]]
    ]).should.eql([[0, 1], [0, 6]]);

    compose([
      [[1, 2], [2, 4]],
      [[1, 3], [3, 9]],
      [[1000, Math.E], [999, Math.E - 1]]
    ]).should.eql([[1, 2], [5, 11]]);

    compose([
      [[1, 2], [2, 4]]
    ]).should.eql([[1, 2], [2, 4]]);

    should(compose([])).eql([]);
  });
};
