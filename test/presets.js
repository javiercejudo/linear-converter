/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescale = require('rescale');
var converter = require('../src/convert.js');

var presets = converter.PRESETS;
var convert = converter.convert;
var invert = converter.invertPreset;

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
