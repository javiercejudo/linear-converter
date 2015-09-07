/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v4.0.1
 * @link https://github.com/javiercejudo/linear-converter#readme
 * @license MIT
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint node:true */

'use strict';

/**
 * Returns a two of a kind check
 *
 * @param {*} a
 * @param {*} b
 *
 * @return {Function} [description]
 */
module.exports = function olsen(a, b) {
  /**
   * Two of a kind check
   *
   * @param {Function} function to compare against
   *
   * @return {Boolean}
   */
  return function check(kind) {
    return kind(a) === kind(b);
  };
};

},{}],2:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');

module.exports = function factory(Decimal) {
  var api = {};

  api.normalise = function normalise(x, scale) {
    scale = scale || [0, 1];

    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(x.toString()).minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  };

  return api;
};

},{"lodash.isundefined":2}],4:[function(require,module,exports){
/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');

module.exports = function factory(Decimal) {
  var api = {};

  api.scale = function scaleNormalised(x, scale) {
    scale = scale || [0, 1];

    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(scale[1].toString()).minus(scale0)
      .times(new Decimal(x.toString())).plus(scale0);
  };

  return api;
};

},{"lodash.isundefined":2}],5:[function(require,module,exports){
/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');
var normaliseFactory = require('normalise');
var scaleFactory = require('scale-normalised');

module.exports = function factory(Decimal) {
  var normalise = normaliseFactory(Decimal).normalise;
  var scale = scaleFactory(Decimal).scale;
  var api = {};

  api.rescale = function rescale(x, oldScale, newScale) {
    return scale(normalise(x, oldScale), newScale);
  };

  return api;
};

},{"lodash.isundefined":2,"normalise":3,"scale-normalised":4}],"linear-converter":[function(require,module,exports){
/*jshint node:true */

'use strict';

var rescaleFactory = require('rescale');
var twoOfAKind = require('olsen');

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
        return rescale.rescale(x);
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

},{"olsen":1,"rescale":5}]},{},[]);
