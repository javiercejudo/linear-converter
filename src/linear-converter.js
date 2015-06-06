/*jshint node:true */

'use strict';

var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var RescaleError = rescaleUtil.RescaleError;
var decimal = arbitraryPrecision.load();

/**
 * @type {Object}
 */
exports.PRESETS = require('linear-presets').PRESETS;

/**
 * Linearly converts x as described by a preset
 *
 * @param  {Number} x The number to be converted
 * @param  {Array} preset The preset that describes the conversion
 *
 * @return {Number} The converted x
 * @throws {RescaleError}
 */
exports.convert = function convert(x, preset) {
  if (typeof preset === 'undefined') {
    return x;
  }

  assertPreset(preset);

  return rescale.rescale(x, preset[0], preset[1]);
};

/**
 * Inverts a preset to change the direction of the conversion
 *
 * @param {Array} preset The preset to invert
 *
 * @return {Array} The inverted preset
 * @throws {RescaleError}
 */
exports.invertPreset = function invertPreset(preset) {
  assertPreset(preset);

  return preset.slice(0).reverse();
};

/**
 * Composes two or more presets to create a single preset
 *
 * @param {Array} presets The array of the presets to compose
 *
 * @return {Array} The composed preset
 * @throws {RescaleError}
 */
exports.composePresets = function composePresets(presets) {
  assertPresets(presets);

  if (presets.length === 0) {
    return presets;
  }

  return presets.reduce(compose2presets);
};

/**
 * Calculates the a coefficient in the f(x) = ax + b function that describes
 * the given preset.
 *
 * @param {Array} preset The preset for which to calculate its a coefficient
 *
 * @return {Number} The coefficient a
 * @throws {RescaleError}
 */
exports.getCoefficientA = function getCoefficientA(preset) {
  assertPreset(preset);

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
 * @throws {RescaleError}
 */
exports.getCoefficientB = function getCoefficientB(preset) {
  assertPreset(preset);

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

/**
 * Asserts a valid preset is given
 *
 * @param {Array} preset The preset to assert
 *
 * @throws {RescaleError}
 */
function assertPreset(preset) {
  if (!rescaleUtil.isValidPreset(preset)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}

/**
 * Asserts an array of valid preset is given
 *
 * @param {Array} presets The array of presets to assert
 *
 * @throws {RescaleError}
 */
function assertPresets(presets) {
  if (!rescaleUtil.areValidPresets(presets)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}
