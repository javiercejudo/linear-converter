'use strict';

var rescaleFactory = require('rescale');
var unitPreset = require('unit-preset');

/**
 * Returns the linear converter api based on the given adapter
 *
 * @param {Object} Decimal instance of decimal library
 * @return {Object} Linear converter API
 */
module.exports = function factory(Decimal) {
  var rescale = rescaleFactory(Decimal);
  var api = {};

  /**
   * Linearly converts x as described by a conversion
   *
   * @param {Array} conversion The conversion
   * @param {Number} x The number to be converted
   * @return {Number} The converted x
   */
  api.convert = function convert(conversion, x) {
    return rescale.rescale(conversion[0], conversion[1], x);
  };

  /**
   * Inverts a conversion
   *
   * @param {Array} conversion The conversion to invert
   * @return {Array} The inverted conversion
   */
  api.invertConversion = function invertConversion(conversion) {
    return api.composeConversions(conversion.slice().reverse(), unitPreset);
  };

  /**
   * Composes two conversions to create a single conversion
   *
   * @param {Array} conversionA The first conversion to compose
   * @param {Array} conversionB The second conversion to compose
   * @return {Array} The composed conversion
   */
  api.composeConversions = function composeConversions(conversionA, conversionB) {
    return [
      [api.convert(unitPreset, conversionA[0][0]), api.convert(unitPreset, conversionA[0][1])],
      [api.convert(conversionB, conversionA[1][0]), api.convert(conversionB, conversionA[1][1])]
    ];
  };

  /**
   * Calculates the a coefficient in the f(x) = ax + b function that describes
   * the given conversion.
   *
   * @param {Array} conversion The conversion for which to calculate its a coefficient
   * @return {Number} The coefficient a
   */
  api.getCoefficientA = function getCoefficientA(conversion) {
    return api.convert(conversion, 1).minus(api.getCoefficientB(conversion));
  };

  /**
   * Calculates the b coefficient in the f(x) = ax + b function that describes
   * the given conversion.
   *
   * @param {Array} conversion The conversion for which to calculate its b coefficient
   * @return {Number} The coefficient b
   */
  api.getCoefficientB = function getCoefficientB(conversion) {
    return api.convert(conversion, 0);
  };

  /**
   * Check equivalence of two conversions
   *
   * @param {Array} conversionA The first conversion to check for equivalence
   * @param {Array} conversionB The second conversion to check for equivalence
   * @return {Boolean} whether the conversions are equivalent or not
   */
  api.equivalentConversions = function equivalentConversions(conversionA, conversionB) {
    return [api.getCoefficientB, api.getCoefficientA].every(function(coefficient) {
      return coefficient(conversionA).equals(coefficient(conversionB));
    });
  };

  return api;
};
