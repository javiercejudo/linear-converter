/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v6.0.2
 * @link https://github.com/javiercejudo/linear-converter#readme
 * @license MIT
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint node:true */

'use strict';

module.exports = function factory(Decimal) {
  var api = {};

  api.normalise = function normalise(scale, x) {
    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(x.toString()).minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  };

  return api;
};

},{}],2:[function(require,module,exports){
/*jshint node:true */

'use strict';

var normaliseFactory = require('normalise');
var scaleFactory = require('scale-normalised');

module.exports = function factory(Decimal) {
  var normalise = normaliseFactory(Decimal).normalise;
  var scale = scaleFactory(Decimal).scale;
  var api = {};

  api.rescale = function rescale(oldScale, newScale, x) {
    return scale(newScale, normalise(oldScale, x));
  };

  return api;
};

},{"normalise":1,"scale-normalised":3}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

module.exports = function factory(Decimal) {
  var api = {};

  api.scale = function scaleNormalised(scale, x) {
    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(scale[1].toString()).minus(scale0)
      .times(new Decimal(x.toString())).plus(scale0);
  };

  return api;
};

},{}],4:[function(require,module,exports){
/* jshint node:true */

'use strict';

var unitScale = require('unit-scale');

module.exports = [unitScale, unitScale];

},{"unit-scale":5}],5:[function(require,module,exports){
/* jshint node:true */

'use strict';

module.exports = [0, 1];

},{}],"linear-converter":[function(require,module,exports){
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

},{"rescale":2,"unit-preset":4}]},{},[]);
