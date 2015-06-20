/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var convert = require('../../../src/linear-converter').convert;

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
