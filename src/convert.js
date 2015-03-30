/*jshint node:true */

'use strict';

var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var linearPresets = require('linear-presets').PRESETS;

var RescaleError = rescaleUtil.RescaleError;

exports.PRESETS = linearPresets;

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

  return presets.reduce(function (previousPreset, currentPreset) {
    return [
      previousPreset[0],
      [
        rescale.rescale(previousPreset[1][0], currentPreset[0], currentPreset[1]),
        rescale.rescale(previousPreset[1][1], currentPreset[0], currentPreset[1])
      ]
    ];
  });
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

  return (preset[1][1] - preset[1][0]) / (preset[0][1] - preset[0][0]);
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
 * @param {Array} preset The array of presets to assert
 *
 * @throws {RescaleError}
 */
function assertPresets(presets) {
  if (!rescaleUtil.areValidPresets(presets)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}
