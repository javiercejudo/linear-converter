/*jshint mocha:true */
/*global require, Should */

(function($hould) {
  'use strict';

  var arbitraryPrecision = require('arbitrary-precision');
  var bigjsAdapter = require('bigjs-adapter');
  var floatingAdapter = require('floating-adapter');
  var lcFactory = require('linear-converter');
  var temp = require('linear-presets').PRESETS.temperature;

  describe('general support', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var converter = lcFactory(Decimal);

    var convert = converter.convert;
    var invert = converter.invertPreset;
    var compose = converter.composePresets;
    var equivalent = converter.equivalentPresets;

    it('should support convertion', function() {
      convert(25, temp.celsiusToFahrenheit).val().val().should.be.exactly(77);
    });

    it('should support preset invertion', function() {
      convert(77, invert(temp.celsiusToFahrenheit)).val().val().should.be.exactly(25);
    });

    it('should support preset composition', function() {
      var kelvinToFahrenheit = compose(
        invert(temp.celsiusToKelvin),
        temp.celsiusToFahrenheit
      );

      convert(293.15, kelvinToFahrenheit).val().val().should.be.exactly(68);
    });

    it('should support calculating coefficients', function() {
      // using Should() to make IE9 happy: https://github.com/shouldjs/should.js/wiki/Known-Bugs#ie9
      $hould(converter.getCoefficientA([[0, 0.1], [0.1, 0.3]]).val().val())
        .be.approximately(2, 1e-15);

      converter.getCoefficientB([[0.1, 0.3], [0, 0.1]]).val().val()
        .should.be.approximately(-0.05, 1e-15);
    });

    it('should support checking for preset equivalence', function() {
      equivalent(
        [[1, 5], [3, -9]],
        [[-1, 100], [9, -294]]
      ).should.be.exactly(true);

      equivalent(
        [[0, 1], [0, 2]],
        [[0, 1], [0, 3]]
      ).should.be.exactly(false);

      equivalent(
        [[0, 1], [1, 3]],
        [[0, 1], [2, 4]]
      ).should.be.exactly(false);
    });
  });

  describe('arbitrary precision support', function() {
    var Decimal = arbitraryPrecision(bigjsAdapter);
    var converter = lcFactory(Decimal);

    it('should support calculating coefficients with arbitrary precision', function() {
      converter.getCoefficientA([[0, 0.1], [0.1, 0.3]]).val().eq(new Decimal('2').val())
        .should.be.exactly(true);

      converter.getCoefficientB([[0.1, 0.3], [0, 0.1]]).val().eq(new Decimal('-0.05').val())
        .should.be.exactly(true);
    });
  })
}(Should));
