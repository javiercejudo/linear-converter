/*jshint node:true, mocha:true */
/*global converter */

(function($hould) {
  'use strict';

  var converter = require('linear-converter');

  describe('browser support', function() {
    it('should cover the basics', function() {
      // main converter method
      var convert = converter.convert;

      // built-in presets for temperature, length, mass and more
      var temp = converter.PRESETS.temperature;

      convert(25, temp.celsiusToFahrenheit).should.be.exactly(77);

      // easy inversion of presets
      var invert = converter.invertPreset;

      convert(77, invert(temp.celsiusToFahrenheit)).should.be.exactly(25);

      // convert presets any to any using inversion and composition
      var compose = converter.composePresets;

      var kelvinToFahrenheit = compose([
        invert(temp.celsiusToKelvin),
        temp.celsiusToFahrenheit
      ]);

      convert(293.15, kelvinToFahrenheit).should.be.exactly(68);

      // calculate the coefficients for the underlying
      // linear function from a preset
      // using Should() to make IE9 happy: https://github.com/tj/should.js/wiki/Known-Bugs#ie9
      $hould(converter.getCoefficientA([[0, 1], [1, 3]])).be.exactly(2);
      converter.getCoefficientB([[0, 1], [1, 3]]).should.be.exactly(1);
    });
  });
}(Should));
