/*jshint node:true */

'use strict';

var rescaleFactory = require('rescale');
var twoOfAKind = require('olsen');
var unitPreset = require('unit-preset');

/**
 * Returns the linear converter api based on the given adapter
 *
 * @param {Object} Decimal instance of decimal library
 *
 * @return {Object} Linear converter API
 */
module.exports = function factory(Decimal) {
  var rescale = rescaleFactory(Decimal);
  var api = {};

  /**
   * Linearly converts x as described by a preset
   *
   * @param {Number} x The number to be converted
   * @param {Array} preset The preset that describes the conversion
   *
   * @return {Number} The converted x
   */
  api.convert = function convert(x, preset) {
    return rescale.rescale(x, preset[0], preset[1]);
  };

  /**
   * Inverts a preset to change the direction of the conversion
   *
   * @param {Array} preset The preset to invert
   *
   * @return {Array} The inverted preset
   */
  api.invertPreset = function invertPreset(preset) {
    return preset.slice().reverse();
  };

  /**
   * Composes two presets to create a single preset
   *
   * @param {Array} presetA The first preset to compose
   * @param {Array} presetB The second preset to compose
   *
   * @return {Array} The composed preset
   */
  api.composePresets = function composePresets(presetA, presetB) {
    return [
      presetA[0].map(function(x) {
        return rescale.rescale(x, unitPreset[0], unitPreset[1]);
      }),
      presetA[1].map(function(x) {
        return rescale.rescale(x, presetB[0], presetB[1]);
      })
    ];
  };

  /**
   * Calculates the a coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its a coefficient
   *
   * @return {Number} The coefficient a
   */
  api.getCoefficientA = function getCoefficientA(preset) {
    return new Decimal(preset[1][1].toString()).minus(new Decimal(preset[1][0].toString()))
      .div(new Decimal(preset[0][1].toString()).minus(new Decimal(preset[0][0].toString())));
  };

  /**
   * Calculates the b coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its b coefficient
   *
   * @return {Number} The coefficient b
   */
  api.getCoefficientB = function getCoefficientB(preset) {
    return rescale.rescale(0, preset[0], preset[1]);
  };

  /**
   * Check equivalence of two presets
   *
   * @param {Array} presetA The first preset to check for equivalence
   * @param {Array} presetB The second preset to check for equivalence
   *
   * @return {Boolean} whether the presets are equivalent or not
   */
  api.equivalentPresets = function equivalentPresets(presetA, presetB) {
    return presetEquivalenceRequisites().map(wrapPresetEquivalenceRequisite)
      .every(twoOfAKind(presetA, presetB));
  };

  /**
   * Returns an array of api functions that determine equivalence
   *
   * @return {Array}
   */
  function presetEquivalenceRequisites() {
    return [
      api.getCoefficientA,
      api.getCoefficientB
    ];
  }

  /**
   * Wraps a preset equivalence requisite to return a stringified version
   *
   * @param {Function} presetEquivalenceRequisite [description]
   *
   * @return {Function}
   */
  function wrapPresetEquivalenceRequisite(presetEquivalenceRequisite) {
    return function(preset) {
      return presetEquivalenceRequisite(preset).toString();
    };
  }

  return api;
};
