/*jshint mocha:true */
/*global require, Should */

(function($hould) {
  'use strict';

  var converter = require('linear-converter');

  describe('browser support', function() {
    // main converter method
    var convert = converter.convert;

    // built-in presets for temperature, length, mass and more
    var temp = converter.PRESETS.temperature;

    // easy inversion of presets
    var invert = converter.invertPreset;

    // convert presets any to any using inversion and composition
    var compose = converter.composePresets;

    it('should support convertion', function() {
      convert(25, temp.celsiusToFahrenheit).should.be.exactly(77);
    });

    it('should support preset invertion', function() {
      convert(77, invert(temp.celsiusToFahrenheit)).should.be.exactly(25);
    });

    it('should support preset composition', function() {
      var kelvinToFahrenheit = compose([
        invert(temp.celsiusToKelvin),
        temp.celsiusToFahrenheit
      ]);

      convert(293.15, kelvinToFahrenheit).should.be.exactly(68);
    });

    it('should support calculating coefficients', function() {
      // calculate the coefficients for the underlying
      // linear function from a preset
      // using Should() to make IE9 happy: https://github.com/tj/should.js/wiki/Known-Bugs#ie9
      $hould(converter.getCoefficientA([[0, 1], [1, 3]])).be.exactly(2);
      converter.getCoefficientB([[0, 1], [1, 3]]).should.be.exactly(1);
    });
  });
}(Should));
