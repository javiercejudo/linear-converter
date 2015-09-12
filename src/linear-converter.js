/*jshint node:true */

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
   * Linearly converts x as described by a preset
   *
   * @param {Array} preset The preset that describes the conversion
   * @param {Number} x The number to be converted
   * @return {Number} The converted x
   */
  api.convert = function convert(preset, x) {
    return rescale.rescale(preset[0], preset[1], x);
  };

  /**
   * Inverts a preset to change the direction of the conversion
   *
   * @param {Array} preset The preset to invert
   * @return {Array} The inverted preset
   */
  api.invertPreset = function invertPreset(preset) {
    return api.composePresets(preset.slice().reverse(), unitPreset);
  };

  /**
   * Composes two presets to create a single preset
   *
   * @param {Array} presetA The first preset to compose
   * @param {Array} presetB The second preset to compose
   * @return {Array} The composed preset
   */
  api.composePresets = function composePresets(presetA, presetB) {
    return [
      [api.convert(unitPreset, presetA[0][0]), api.convert(unitPreset, presetA[0][1])],
      [api.convert(presetB, presetA[1][0]), api.convert(presetB, presetA[1][1])]
    ];
  };

  /**
   * Calculates the a coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its a coefficient
   * @return {Number} The coefficient a
   */
  api.getCoefficientA = function getCoefficientA(preset) {
    return api.convert(preset, 1).minus(api.getCoefficientB(preset));
  };

  /**
   * Calculates the b coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its b coefficient
   * @return {Number} The coefficient b
   */
  api.getCoefficientB = function getCoefficientB(preset) {
    return api.convert(preset, 0);
  };

  /**
   * Check equivalence of two presets
   *
   * @param {Array} presetA The first preset to check for equivalence
   * @param {Array} presetB The second preset to check for equivalence
   * @return {Boolean} whether the presets are equivalent or not
   */
  api.equivalentPresets = function equivalentPresets(presetA, presetB) {
    return [api.getCoefficientB, api.getCoefficientA].every(function(coefficient) {
      return coefficient(presetA).equals(coefficient(presetB));
    });
  };

  return api;
};
