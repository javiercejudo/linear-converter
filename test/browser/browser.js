/*jshint mocha:true */
/*global require, Should */

(function($hould) {
  'use strict';

  var PRESETS = require('linear-presets').PRESETS;
  var bigjsAdapter = require('bigjs-adapter');
  var floatingAdapter = require('floating-adapter');
  var lcFactory = require('linear-converter');

  describe('general support', function() {
    var temp = PRESETS.temperature;
    var converter = lcFactory(floatingAdapter);
    var convert = converter.convert;
    var invert = converter.invertPreset;
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
      // using Should() to make IE9 happy: https://github.com/shouldjs/should.js/wiki/Known-Bugs#ie9
      $hould(converter.getCoefficientA([[0, 0.1], [0.1, 0.3]])).be.approximately(2, 1e-15);
      converter.getCoefficientB([[0.1, 0.3], [0, 0.1]]).should.be.approximately(-0.05, 1e-15);
    });
  });

  describe('arbitrary precision support', function() {
    var converter = lcFactory(bigjsAdapter);

    it('should support calculating coefficients', function() {
      converter.getCoefficientA([[0, 0.1], [0.1, 0.3]]).should.be.exactly(2);
      converter.getCoefficientB([[0.1, 0.3], [0, 0.1]]).should.be.exactly(-0.05);
    });
  })
}(Should));
