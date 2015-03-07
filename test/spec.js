/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var converter = require('../src/convert.js');

describe('converting', function() {
  describe('without a preset', function() {
    it('should be the identity', function() {
      converter.convert(1).should.be.exactly(1);
      converter.convert(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with a preset', function() {
    var rescaleUtilMock;

    afterEach(function() {
      rescaleUtilMock.verify();
    });

    it('should delegate its validation to rescale-util', function() {
      rescaleUtilMock = sinon.mock(rescaleUtil);

      rescaleUtilMock.expects('isValidPreset')
        .withExactArgs([[0, 5], [0, 10]]).returns(true);

      rescaleUtilMock.expects('isValidPreset')
        .withExactArgs([[-5, 1], [Math.E, 10.2]]).returns(true);

      converter.convert(2.5, [[0, 5], [0, 10]]);
      converter.convert(-3, [[-5, 1], [Math.E, 10.2]]);
    });
  });

  describe('with a valid preset', function() {
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
      converter.convert('anything', [[0, 10], [10, 20]]).should.be.exactly(Math.PI);
      converter.convert('anything', [[0, 10], [10, 20]]).should.be.exactly(34);
    });
  });

  describe('with an invalid preset', function() {
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
        converter.convert(2, 2);
      }).should.throw('an error');
    });
  });
});

describe('inverting', function() {
  describe('any preset', function() {
    var rescaleUtilMock;

    afterEach(function() {
      rescaleUtilMock.verify();
    });

    it('should delegate its validation to rescale-util', function() {
      rescaleUtilMock = sinon.mock(rescaleUtil);

      rescaleUtilMock.expects('isValidPreset')
        .withExactArgs([[0, 5], [0, 10]]).returns(true);

      rescaleUtilMock.expects('isValidPreset')
        .withExactArgs([[-5, 1], [Math.E, 10.2]]).returns(true);

      converter.invertPreset([[0, 5], [0, 10]]);
      converter.invertPreset([[-5, 1], [Math.E, 10.2]]);
    });
  });

  describe('with an invalid preset', function() {
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
        converter.invertPreset(2, 2);
      }).should.throw('some error');
    });
  });

  describe('with a valid preset', function() {
    it('should invert the preset', function() {
      converter.invertPreset([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
      converter.invertPreset([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
    });
  });
});

describe('composing', function() {
  describe('with invalid input', function() {
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
        converter.composePresets(2, 2);
      }).should.throw('some other error');
    });
  });

  describe('any presets', function() {
    var rescaleUtilMock;

    afterEach(function() {
      rescaleUtilMock.verify();
    });

    it('should delegate their validation to rescale-util', function() {
      rescaleUtilMock = sinon.mock(rescaleUtil);

      rescaleUtilMock.expects('areValidPresets')
        .withExactArgs([[[0, 5], [0, 10]], [[-5, 1], [Math.E, 10.2]]]).returns(true);

      converter.composePresets([[[0, 5], [0, 10]], [[-5, 1], [Math.E, 10.2]]]);
    });
  });

  describe('with invalid presets', function() {
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

    it('should throw an error', function() {
      (function() {
        converter.composePresets([[[0, 10], [10, Infinity]], [[10, 20], [50, 60]]]);
      }).should.throw('yet another error');
    });
  });

  describe('with valid presets', function() {
    it('should compose the presets', function() {
      converter.composePresets([[[0, 10], [10, 20]], [[10, 20], [50, 60]]])
        .should.eql([[0, 10], [50, 60]]);

      converter.composePresets([[[0, 1], [0, -2]], [[0, 3], [0, -9]]])
        .should.eql([[0, 1], [0, 6]]);

      converter.composePresets([[[1, 2], [2, 4]], [[1, 3], [3, 9]], [[1000, Math.E], [999, Math.E - 1]]])
        .should.eql([[1, 2], [5, 11]]);
    });
  });
});
