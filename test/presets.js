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
  it('should include metric prefixes', function() {
    var metric = presets.metricPrefixes;

    (1).should.be.exactly(convert(1e-18, invert(metric.noneToExa)), 'noneToExa')
      .and.exactly(convert(1e-15, invert(metric.noneToPeta)), 'noneToPeta')
      .and.exactly(convert(1e-12, invert(metric.noneToTera)), 'noneToTera')
      .and.exactly(convert(1e-9, invert(metric.noneToGiga)), 'noneToGiga')
      .and.exactly(convert(1e-6, invert(metric.noneToMega)), 'noneToMega')
      .and.exactly(convert(0.001, invert(metric.noneToKilo)), 'noneToKilo')
      .and.exactly(convert(0.01, invert(metric.noneToHecto)), 'noneToHecto')
      .and.exactly(convert(0.1, invert(metric.noneToDeca)), 'noneToDeca')
      .and.exactly(convert(10, invert(metric.noneToDeci)), 'noneToDeci')
      .and.exactly(convert(100, invert(metric.noneToCenti)), 'noneToCenti')
      .and.exactly(convert(1000, invert(metric.noneToMilli)), 'noneToMilli')
      .and.exactly(convert(1e+6, invert(metric.noneToMicro)), 'noneToMicro')
      .and.exactly(convert(1e+9, invert(metric.noneToNano)), 'noneToNano')
      .and.exactly(convert(1e+12, invert(metric.noneToPico)), 'noneToPico')
      .and.exactly(convert(1e+15, invert(metric.noneToFemto)), 'noneToFemto')
      .and.exactly(convert(1e+18, invert(metric.noneToAtto)), 'noneToAtto');

    (0).should.be.exactly(convert(0, metric.noneToExa), 'noneToExa')
      .and.exactly(convert(0, metric.noneToPeta), 'noneToPeta')
      .and.exactly(convert(0, metric.noneToTera), 'noneToTera')
      .and.exactly(convert(0, metric.noneToGiga), 'noneToGiga')
      .and.exactly(convert(0, metric.noneToMega), 'noneToMega')
      .and.exactly(convert(0, metric.noneToKilo), 'noneToKilo')
      .and.exactly(convert(0, metric.noneToHecto), 'noneToHecto')
      .and.exactly(convert(0, metric.noneToDeca), 'noneToDeca')
      .and.exactly(convert(0, metric.noneToDeci), 'noneToDeci')
      .and.exactly(convert(0, metric.noneToCenti), 'noneToCenti')
      .and.exactly(convert(0, metric.noneToMilli), 'noneToMilli')
      .and.exactly(convert(0, metric.noneToMicro), 'noneToMicro')
      .and.exactly(convert(0, metric.noneToNano), 'noneToNano')
      .and.exactly(convert(0, metric.noneToPico), 'noneToPico')
      .and.exactly(convert(0, metric.noneToFemto), 'noneToFemto')
      .and.exactly(convert(0, metric.noneToAtto), 'noneToAtto');
  });

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

    (0).should.be.exactly(convert(0, length.metreToKilometre), 'metreToKilometre')
      .and.exactly(convert(0, length.metreToCentimetre), 'metreToCentimetre')
      .and.exactly(convert(0, length.metreToMillimetre), 'metreToMillimetre')
      .and.exactly(convert(0, length.metreToMile), 'metreToMile')
      .and.exactly(convert(0, length.metreToYard), 'metreToYard')
      .and.exactly(convert(0, length.metreToFoot), 'metreToFoot')
      .and.exactly(convert(0, length.metreToInch), 'metreToInch')
      .and.exactly(convert(0, length.metreToNauticalMile), 'metreToNauticalMile');
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

    (0).should.be.exactly(convert(0, mass.kilogramToMetricTon), 'kilogramToMetricTon')
      .and.exactly(convert(0, mass.kilogramToGram), 'kilogramToGram')
      .and.exactly(convert(0, mass.kilogramToMilligram), 'kilogramToMilligram')
      .and.exactly(convert(0, mass.kilogramToMicrogram), 'kilogramToMicrogram')
      .and.exactly(convert(0, mass.kilogramToLongTon), 'kilogramToLongTon')
      .and.exactly(convert(0, mass.kilogramToShortTon), 'kilogramToShortTon')
      .and.exactly(convert(0, mass.kilogramToStone), 'kilogramToStone')
      .and.exactly(convert(0, mass.kilogramToPound), 'kilogramToPound')
      .and.exactly(convert(0, mass.kilogramToOunce), 'kilogramToOunce');
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

    (0).should.be.exactly(convert(0, time.secondToNanosecond), 'secondToNanosecond')
      .and.exactly(convert(0, time.secondToMicrosecond), 'secondToMicrosecond')
      .and.exactly(convert(0, time.secondToMicrosecond), 'secondToMicrosecond')
      .and.exactly(convert(0, time.secondToMillisecond), 'secondToMillisecond')
      .and.exactly(convert(0, time.secondToMinute), 'secondToMinute')
      .and.exactly(convert(0, time.secondToHour), 'secondToHour')
      .and.exactly(convert(0, time.secondToDay), 'secondToDay')
      .and.exactly(convert(0, time.secondToWeek), 'secondToWeek')
      .and.exactly(convert(0, time.secondToMonth), 'secondToMonth')
      .and.exactly(convert(0, time.secondToYear), 'secondToYear')
      .and.exactly(convert(0, time.secondToDecade), 'secondToDecade')
      .and.exactly(convert(0, time.secondToCentury), 'secondToCentury')
      .and.exactly(convert(0, time.secondToMillennium), 'secondToMillennium');
  });

  it.skip('should include electric current', function() {
    var current = presets.electricCurrent;

    convert(10, current.ampereToAbampere).should.be.exactly(1);
    convert(9, current.ampereToAbampere).should.be.exactly(0);
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

    (0).should.be.exactly(convert(32, invert(temp.celsiusToFahrenheit)), 'celsiusToFahrenheit')
      .and.exactly(convert(273.15, invert(temp.celsiusToKelvin)), 'celsiusToKelvin')
      .and.exactly(convert(491.67, invert(temp.celsiusToRankine)), 'celsiusToRankine')
      .and.exactly(convert(150, invert(temp.celsiusToDelisle)), 'celsiusToDelisle')
      .and.exactly(convert(0, invert(temp.celsiusToNewton)), 'celsiusToNewton')
      .and.exactly(convert(0, invert(temp.celsiusToReaumur)), 'celsiusToReaumur')
      .and.exactly(convert(7.5, invert(temp.celsiusToRomer)), 'celsiusToRomer');
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
