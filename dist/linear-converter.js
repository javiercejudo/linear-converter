/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v2.0.0
 * @link https://github.com/javiercejudo/linear-converter#readme
 * @license MIT
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint node:true */

'use strict';

/**
 * Returns the package for the given name if found or undefined otherwise
 *
 * @param  {String} The name of the package to load
 *
 * @return {*}
 */
exports.optionale = function optionale(optioanlDependency) {
  try {
    return require(optioanlDependency);
  } catch (er) {
    return;
  }
};

},{}],2:[function(require,module,exports){
/*jshint node:true */

'use strict';

var optionale = require('optionale');

var decimal;

/**
 * Returns arbitrary precision library if available or undefined otherwise
 *
 * @return {*}
 */
exports.load = function load() {
  decimal = optionale.optionale('big.js');

  return decimal;
};

/**
 * Returns true if arbitrary precision is available and false otherwise
 *
 * @return {Boolean} Arbitrary precision availability
 */
exports.isAvailable = function isAvailable() {
  return typeof decimal !== 'undefined';
};

},{"optionale":1}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(normaliseDecimal(x, scale));
  }

  return normaliseNative(x, scale);
};

function normaliseDecimal(x, scale) {
  return decimal(x).minus(scale[0])
    .div(decimal(scale[1]).minus(scale[0]));
}

function normaliseNative(x, scale) {
  return (x - scale[0]) / (scale[1] - scale[0]);
}

},{"rescale-arbitrary-precision":2}],4:[function(require,module,exports){
/*jshint node:true */

'use strict';

var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(scaleDecimal(x, scale));
  }

  return scaleNative(x, scale);
};

function scaleDecimal(x, scale) {
  return decimal(scale[1]).minus(scale[0]).times(x).plus(scale[0]);
}

function scaleNative(x, scale) {
  return scale[0] + x * (scale[1] - scale[0]);
}

},{"rescale-arbitrary-precision":2}],5:[function(require,module,exports){
/*jshint node:true */

'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

exports.rescale = function rescale(x, oldScale, newScale) {
  if (typeof newScale === 'undefined') {
    return normalise.normalise(x, oldScale);
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(rescaleDecimal(x, oldScale, newScale));
  }

  return rescaleNative(x, oldScale, newScale);
};

function rescaleDecimal(x, oldScale, newScale) {
  return scaleDecimal(normaliseDecimal(x, oldScale), newScale);
}

function normaliseDecimal(x, scale) {
  return decimal(x).minus(scale[0])
    .div(decimal(scale[1]).minus(scale[0]));
}

function scaleDecimal(x, scale) {
  return decimal(scale[1]).minus(scale[0]).times(x).plus(scale[0]);
}

function rescaleNative(x, oldScale, newScale) {
  return scale.scale(normalise.normalise(x, oldScale), newScale);
}

},{"normalise":3,"rescale-arbitrary-precision":2,"scale-normalised":4}],"linear-converter":[function(require,module,exports){
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

},{"rescale":5,"rescale-arbitrary-precision":2}]},{},[]);
