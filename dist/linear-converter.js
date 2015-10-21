/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v7.0.2
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

},{"rescale":2,"unit-preset":4}]},{},[]);
