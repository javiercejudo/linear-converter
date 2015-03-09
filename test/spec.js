/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var converter = require('../src/convert.js');

var presets = converter.PRESETS;
var convert = converter.convert;
var invert = converter.invertPreset;
var compose = converter.composePresets;

describe('converting', function() {
  describe('without a preset', function() {
    it('should be the identity', function() {
      convert(1).should.be.exactly(1);
      convert(Math.E).should.be.exactly(Math.E);
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

      convert(2.5, [[0, 5], [0, 10]]);
      convert(-3, [[-5, 1], [Math.E, 10.2]]);
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
      convert('anything', [[0, 10], [10, 20]]).should.be.exactly(Math.PI);
      convert('anything', [[0, 10], [10, 20]]).should.be.exactly(34);
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
        convert(2, 2);
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

      invert([[0, 5], [0, 10]]);
      invert([[-5, 1], [Math.E, 10.2]]);
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
        invert(2, 2);
      }).should.throw('some error');
    });
  });

  describe('with a valid preset', function() {
    it('should invert the preset', function() {
      invert([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
      invert([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
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
        compose(2, 2);
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

      compose([[[0, 5], [0, 10]], [[-5, 1], [Math.E, 10.2]]]);
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
        compose([[[0, 10], [10, Infinity]], [[10, 20], [50, 60]]]);
      }).should.throw('yet another error');
    });
  });

  describe('with valid presets', function() {
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
    });
  });
});

describe('built-in presets', function() {
  it('should include length', function() {
    var length = presets.distance;

    (42195).should.be.exactly(convert(42.195, invert(length.metreToKilometre)), 'metreToKilometre')
      .and.exactly(convert(4219500, invert(length.metreToCentimetre)), 'metreToCentimetre')
      .and.exactly(convert(42195000, invert(length.metreToMillimetre)), 'metreToMillimetre')
      .and.approximately(convert(26.218757, invert(length.metreToMile)), 10e-4, 'metreToMile')
      .and.approximately(convert(46145.013, invert(length.metreToYard)), 10e-4, 'metreToYard')
      .and.approximately(convert(138435.04, invert(length.metreToFoot)), 10e-4, 'metreToFoot')
      .and.approximately(convert(1661220.5, invert(length.metreToInch)), 10e-4, 'metreToInch')
      .and.approximately(convert(22.783477, invert(length.metreToNauticalMile)), 10e-4, 'metreToNauticalMile');
  });

  it('should include mass', function() {
    var mass = presets.mass;

    (10).should.be.exactly(convert(0.01, invert(mass.kilogramToMetricTon)), 'kilogramToMetricTon')
      .and.exactly(convert(10000, invert(mass.kilogramToGram)), 'kilogramToGram')
      .and.exactly(convert(1e+7, invert(mass.kilogramToMilligram)), 'kilogramToMilligram')
      .and.exactly(convert(1e+10, invert(mass.kilogramToMicrogram)), 'kilogramToMicrogram')
      .and.approximately(convert(0.0098420, invert(mass.kilogramToLongTon)), 10e-4, 'kilogramToLongTon')
      .and.approximately(convert(0.0110231, invert(mass.kilogramToShortTon)), 10e-5, 'kilogramToShortTon')
      .and.approximately(convert(1.57473, invert(mass.kilogramToStone)), 10e-6, 'kilogramToStone')
      .and.approximately(convert(22.0462, invert(mass.kilogramToPound)), 10e-5, 'kilogramToPound')
      .and.approximately(convert(352.74, invert(mass.kilogramToOunce)), 10e-5, 'kilogramToOunce');
  });

  it('should include time', function() {
    var time = presets.time;

    (259200).should.be.exactly(convert(259200000000000, invert(time.secondToNanosecond)), 'secondToNanosecond')
      .and.exactly(convert(259200000000, invert(time.secondToMicrosecond)), 'secondToMicrosecond')
      .and.exactly(convert(259200000000, invert(time.secondToMicrosecond)), 'secondToMicrosecond')
      .and.exactly(convert(259200000, invert(time.secondToMillisecond)), 'secondToMillisecond')
      .and.exactly(convert(4320, invert(time.secondToMinute)), 'secondToMinute')
      .and.exactly(convert(72, invert(time.secondToHour)), 'secondToHour')
      .and.exactly(convert(3, invert(time.secondToDay)), 'secondToDay')
      .and.exactly(convert(0.42857142857142856, invert(time.secondToWeek)), 'secondToWeek')
      .and.approximately(convert(0.09856465225158627, invert(time.secondToMonth)), 10e-11, 'secondToMonth')
      .and.exactly(convert(0.008213721020965523, invert(time.secondToYear)), 'secondToYear')
      .and.exactly(convert(0.0008213721020965523, invert(time.secondToDecade)), 'secondToDecade')
      .and.exactly(convert(0.00008213721020965523, invert(time.secondToCentury)), 'secondToCentury')
      .and.approximately(convert(0.000008213721020965523, invert(time.secondToMillennium)), 10e-11, 'secondToMillennium');
  });

  it.skip('should include electric current', function() {
    should(converter.PRESETS.electricCurrent).be.an.Object.and.not.eql({});
  });

  it('should include temperature', function() {
    var temp = presets.temperature;

    (40).should.be.exactly(convert(104, invert(temp.celsiusToFahrenheit)), 'celsiusToFahrenheit')
      .and.exactly(convert(313.15, invert(temp.celsiusToKelvin)), 'celsiusToKelvin')
      .and.approximately(convert(563.67, invert(temp.celsiusToRankine)), 10e-14, 'celsiusToRankine')
      .and.exactly(convert(90, invert(temp.celsiusToDelisle)), 'celsiusToDelisle')
      .and.exactly(convert(13.2, invert(temp.celsiusToNewton)), 'celsiusToNewton')
      .and.exactly(convert(32, invert(temp.celsiusToReaumur)), 'celsiusToReaumur')
      .and.exactly(convert(28.5, invert(temp.celsiusToRomer)), 'celsiusToRomer');
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
