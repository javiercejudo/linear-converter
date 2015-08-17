/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var rescaleFactory = require('rescale');
var twoOfAKind = require('olsen');
var everyAgainstFirst = require('every-against-first');

/**
 * Returns the linear converter api based on the given adapter
 *
 * @param {Object} adapter Linear converter adapter
 *
 * @return {Object} Linear converter API
 */
module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var rescale = rescaleFactory(adapter);
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
    return preset.slice(0).reverse();
  };

  /**
   * Composes two or more presets to create a single preset
   *
   * @param {Array} presets The array of the presets to compose
   *
   * @return {Array} The composed preset
   */
  api.composePresets = function composePresets(presets) {
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
  api.getCoefficientA = function getCoefficientA(preset) {
    return Number(
      new Decimal(preset[1][1].toString()).minus(new Decimal(preset[1][0].toString()))
        .div(new Decimal(preset[0][1].toString()).minus(new Decimal(preset[0][0].toString())))
    );
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
   * Check equivalence of two or more presets
   *
   * @param {Array} presets The array of the presets to check for equivalence
   *
   * @return {Boolean} whether the presets are equivalent or not
   */
  api.equivalentPresets = function equivalentPresets(presets) {
    return everyAgainstFirst(presets, equivalent2presets);
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
   * Check equivalence of two presets
   *
   * @param {Array} presetA The first preset to check for equivalence
   * @param {Array} presetB The second preset to check for equivalence
   *
   * @return {Boolean} whether the presets are equivalent or not
   */
  function equivalent2presets(presetA, presetB) {
    return presetEquivalenceRequisites().every(twoOfAKind(presetA, presetB));
  }

  return api;
};
