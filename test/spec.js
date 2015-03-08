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

describe('built-in presets', function() {
  var presets = converter.PRESETS;
  var convert = converter.convert;
  var invert = converter.invertPreset;
  var compose = converter.composePresets;

  it('should include length', function() {
    var lengthPresets = presets.distance;

    (42.195).should.be.exactly(convert(42195, invert(lengthPresets.kilometreToMetre)), 'kilometreToMetre')
      .and.exactly(convert(4219500, invert(lengthPresets.kilometreToCentimetre)), 'kilometreToCentimetre')
      .and.exactly(convert(42195000, invert(lengthPresets.kilometreToMillimetre)), 'kilometreToMillimetre')
      .and.approximately(convert(26.2187575, invert(lengthPresets.kilometreToMile)), 10e-8, 'kilometreToMile')
      .and.approximately(convert(46145.0131, invert(lengthPresets.kilometreToYard)), 10e-4, 'kilometreToYard')
      .and.approximately(convert(138435.039, invert(lengthPresets.kilometreToFoot)), 10e-6, 'kilometreToFoot')
      .and.approximately(convert(1661220.47, invert(lengthPresets.kilometreToInch)), 10e-5, 'kilometreToInch')
      .and.approximately(convert(22.7834773, invert(lengthPresets.kilometreToNauticalMile)), 10e-8, 'kilometreToNauticalMile');
  });

  it.skip('should include mass', function() {
    should(converter.PRESETS.mass).be.an.Object.and.not.eql({});
  });

  it.skip('should include time', function() {
    should(converter.PRESETS.time).be.an.Object.and.not.eql({});
  });

  it.skip('should include electric current', function() {
    should(converter.PRESETS.electricCurrent).be.an.Object.and.not.eql({});
  });

  it('should include temperature', function() {
    var temperaturePresets = presets.temperature;

    (40).should.be.exactly(convert(104, invert(temperaturePresets.celsiusToFahrenheit)), 'celsiusToFahrenheit')
      .and.exactly(convert(313.15, invert(temperaturePresets.celsiusToKelvin)), 'celsiusToKelvin')
      .and.approximately(convert(563.67, invert(temperaturePresets.celsiusToRankine)), 10e-14, 'celsiusToRankine')
      .and.exactly(convert(90, invert(temperaturePresets.celsiusToDelisle)), 'celsiusToDelisle')
      .and.exactly(convert(13.2, invert(temperaturePresets.celsiusToNewton)), 'celsiusToNewton')
      .and.exactly(convert(32, invert(temperaturePresets.celsiusToReaumur)), 'celsiusToReaumur')
      .and.exactly(convert(28.5, invert(temperaturePresets.celsiusToRomer)), 'celsiusToRomer');
  });

  it.skip('should include amount of substance', function() {
    should(converter.PRESETS.amountOfSubstance).be.an.Object.and.not.eql({});
  });

  it.skip('should include luminous intensity', function() {
    should(converter.PRESETS.luminousIntensity).be.an.Object.and.not.eql({});
  });

  it.skip('should include speed', function() {
    should(converter.PRESETS.speed).be.an.Object.and.not.eql({});
  });

  it.skip('should include volume', function() {
    should(converter.PRESETS.volume).be.an.Object.and.not.eql({});
  });

  it.skip('should include area', function() {
    should(converter.PRESETS.area).be.an.Object.and.not.eql({});
  });

  it.skip('should include fuel consumption', function() {
    should(converter.PRESETS.fuelConsumption).be.an.Object.and.not.eql({});
  });

  it.skip('should include digital storage', function() {
    should(converter.PRESETS.digitalStorage).be.an.Object.and.not.eql({});
  });
});
