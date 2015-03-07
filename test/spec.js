/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaler = require('rescale');
var converter = require('../src/convert.js');

describe('converter', function() {
  var celsiusToFahrenheit = converter.PRESETS.temperature.celsiusToFahrenheit;
  var fahrenheitToCelsius = converter.invert(celsiusToFahrenheit);

  var celsiusToKelvin = converter.PRESETS.temperature.celsiusToKelvin;
  var kelvinToCelcius = converter.invert(celsiusToKelvin);
  var kelvinToFahrenheit = converter.compose([kelvinToCelcius, celsiusToFahrenheit]);

  it.skip('should delegate to rescale', function () {
  });

  it('should convert correctly', function () {
    converter.convert(25, celsiusToFahrenheit).should.be.exactly(77);
    converter.convert(104, fahrenheitToCelsius).should.be.exactly(40);

    converter.convert(293.15, kelvinToFahrenheit).should.be.exactly(68);
  });
});
