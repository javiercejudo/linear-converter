/*jshint mocha:true */
/*global require, Should */

(function($hould) {
  'use strict';

  var arbitraryPrecision = require('arbitrary-precision');
  var bigjsAdapter = require('bigjs-adapter');
  var floatingAdapter = require('floating-adapter');
  var presetFactory = require('linear-preset-factory');
  var lcFactory = require('linear-converter');
  var temp = presetFactory(require('linear-presets').PRESETS.temperature);
  var better = require('betterer').better;
  var convertTests = require('convertTests');

  var o_o = describe;

  o_o('converting', function() { var o_O = convertTests;
    o_o('with a valid conversion', better('convert based on the provided conversion', o_O));
  });

  describe('general support', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var converter = lcFactory(Decimal);

    var convert = converter.convert;
    var invert = converter.invertConversion;
    var compose = converter.composeConversions;
    var getCoefficientA = converter.getCoefficientA;
    var getCoefficientB = converter.getCoefficientB;
    var equivalent = converter.equivalentConversions;

    it('should support conversion', function() {
      convert(temp.celsius_fahrenheit, 25).equals(new Decimal('77')).should.be.exactly(true);
    });

    it('should support conversion invertion', function() {
      convert(invert(temp.celsius_fahrenheit), 77).equals(new Decimal('25')).should.be.exactly(true);
    });

    it('should support conversion composition', function() {
      var kelvinToFahrenheit = compose(
        invert(temp.celsius_kelvin),
        temp.celsius_fahrenheit
      );

      convert(kelvinToFahrenheit, 293.15).equals(new Decimal('68')).should.be.exactly(true);
    });

    it('should support calculating coefficients', function() {
      // using Should() to make IE9 happy: https://github.com/shouldjs/should.js/wiki/Known-Bugs#ie9
      $hould(getCoefficientA([[0, 0.1], [0.1, 0.3]]).val().val())
        .be.approximately(2, 1e-15);

      getCoefficientB([[0.1, 0.3], [0, 0.1]]).val().val()
        .should.be.approximately(-0.05, 1e-15);
    });

    it('should support checking for conversion equivalence', function() {
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
    var getCoefficientA = converter.getCoefficientA;
    var getCoefficientB = converter.getCoefficientB;

    it('should support calculating coefficients with arbitrary precision', function() {
      getCoefficientA([[0, 0.1], [0.1, 0.3]]).equals(new Decimal('2'))
        .should.be.exactly(true);

      getCoefficientB([[0.1, 0.3], [0, 0.1]]).equals(new Decimal('-0.05'))
        .should.be.exactly(true);
    });
  });
}(Should));
