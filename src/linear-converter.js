/*jshint node:true */

'use strict';

var rescale = require('rescale');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

/**
 * Linearly converts x as described by a preset
 *
 * @param  {Number} x The number to be converted
 * @param  {Array} preset The preset that describes the conversion
 *
 * @return {Number} The converted x
 */
exports.convert = function convert(x, preset) {
  return rescale.rescale(x, preset[0], preset[1]);
};

/**
 * Inverts a preset to change the direction of the conversion
 *
 * @param {Array} preset The preset to invert
 *
 * @return {Array} The inverted preset
 */
exports.invertPreset = function invertPreset(preset) {
  return preset.slice(0).reverse();
};

/**
 * Composes two or more presets to create a single preset
 *
 * @param {Array} presets The array of the presets to compose
 *
 * @return {Array} The composed preset
 */
exports.composePresets = function composePresets(presets) {
  return presets.reduce(compose2presets);
};

/**
 * Calculates the a coefficient in the f(x) = ax + b function that describes
 * the given preset.
 *
 * @param {Array} preset The preset for which to calculate its a coefficient
 *
 * @return {Number} The coefficient a
 */
exports.getCoefficientA = function getCoefficientA(preset) {
  if (arbitraryPrecision.isAvailable()) {
    return Number(getCoefficientADecimal(preset));
  }

  return getCoefficientANative(preset);
};

/**
 * Calculates the b coefficient in the f(x) = ax + b function that describes
 * the given preset.
 *
 * @param {Array} preset The preset for which to calculate its b coefficient
 *
 * @return {Number} The coefficient b
 */
exports.getCoefficientB = function getCoefficientB(preset) {
  return rescale.rescale(0, preset[0], preset[1]);
};

/**
 * Composes two presets to create a single preset
 *
 * @param {Array} presetA The first preset to compose
 * @param {Array} presetB The second preset to compose
 *
 * @return {Array} The composed preset
 */
function compose2presets(presetA, presetB) {
  return [
    presetA[0],
    presetA[1].map(function(x) {
      return rescale.rescale(x, presetB[0], presetB[1]);
    })
  ];
}

/**
 * Calculates the a coefficient in the f(x) = ax + b function that describes
 * the given preset using floating-point numbers.
 *
 * @param {Array} preset The preset for which to calculate its a coefficient
 *
 * @return {Number} The coefficient a
 */
function getCoefficientANative(preset) {
  return (preset[1][1] - preset[1][0]) / (preset[0][1] - preset[0][0]);
}

/**
 * Calculates the a coefficient in the f(x) = ax + b function that describes
 * the given preset using arbitrary precision.
 *
 * @param {Array} preset The preset for which to calculate its a coefficient
 *
 * @return {Big} The coefficient a
 */
function getCoefficientADecimal(preset) {
  return decimal(preset[1][1]).minus(preset[1][0])
    .div(decimal(preset[0][1]).minus(preset[0][0]));
}
