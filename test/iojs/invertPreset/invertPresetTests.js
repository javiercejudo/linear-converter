/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var invert = require('../../../src/linear-converter').invertPreset;

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

    invert([[0, 5], [0, 10]]);
    invert([[-5, 1], [Math.E, 10.2]]);
  });
};

exports.throwAnError = function() {
  var isValidPresetStub, getLastErrorStub;

  beforeEach(function() {
    isValidPresetStub = sinon.stub(rescaleUtil, 'isValidPreset');
    getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');

    isValidPresetStub.returns(false);
    getLastErrorStub.returns('some error');
  });

  afterEach(function() {
    isValidPresetStub.restore();
    getLastErrorStub.restore();
  });

  it('should throw an error', function() {
    (function() {
      invert(2, 2);
    }).should.throw(rescaleUtil.RescaleError, {message: 'some error'});
  });
};

exports.invertThePreset = function() {
  it('should invert the preset', function() {
    invert([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
    invert([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
  });
};
