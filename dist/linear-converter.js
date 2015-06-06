/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v1.2.0-beta.1
 * @link https://github.com/javiercejudo/linear-converter#readme
 * @license MIT
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "metricPrefixes": {
    "noneToYotta": [[0, 1e24], [0, 1]],
    "noneToZetta": [[0, 1e21], [0, 1]],
    "noneToExa": [[0, 1e18], [0, 1]],
    "noneToPeta": [[0, 1e15], [0, 1]],
    "noneToTera": [[0, 1e12], [0, 1]],
    "noneToGiga": [[0, 1e9], [0, 1]],
    "noneToMega": [[0, 1e6], [0, 1]],
    "noneToKilo": [[0, 1e3], [0, 1]],
    "noneToHecto": [[0, 100], [0, 1]],
    "noneToDeca": [[0, 10], [0, 1]],
    "noneToDeci": [[0, 1], [0, 10]],
    "noneToCenti": [[0, 1], [0, 100]],
    "noneToMilli": [[0, 1], [0, 1e3]],
    "noneToMicro": [[0, 1], [0, 1e6]],
    "noneToNano": [[0, 1], [0, 1e9]],
    "noneToPico": [[0, 1], [0, 1e12]],
    "noneToFemto": [[0, 1], [0, 1e15]],
    "noneToAtto": [[0, 1], [0, 1e18]],
    "noneToZepto": [[0, 1], [0, 1e21]],
    "noneToYocto": [[0, 1], [0, 1e24]]
  },
  "temperature": {
    "celsiusToFahrenheit": [[0, 100], [32, 212]],
    "celsiusToKelvin": [[0, 100], [273.15, 373.15]],
    "celsiusToRankine": [[0, 100], [491.67, 671.67]],
    "celsiusToDelisle": [[0, 100], [150, 0]],
    "celsiusToNewton": [[0, 100], [0, 33]],
    "celsiusToReaumur": [[0, 100], [0, 80]],
    "celsiusToRomer": [[0, 100], [7.5, 60]]
  },
  "temperatureDifference": {
    "celsiusToFahrenheit": [[0, 5], [0, 9]],
    "celsiusToKelvin": [[0, 1], [0, 1]],
    "celsiusToRankine": [[0, 5], [0, 9]],
    "celsiusToDelisle": [[0, 2], [0, -3]],
    "celsiusToNewton": [[0, 100], [0, 33]],
    "celsiusToReaumur": [[0, 5], [0, 4]],
    "celsiusToRomer": [[0, 40], [0, 21]]
  },
  "distance": {
    "metreToKilometre": [[0, 1e3], [0, 1]],
    "metreToCentimetre": [[0, 1], [0, 100]],
    "metreToMillimetre": [[0, 1], [0, 1e3]],
    "metreToMile": [[0, 1609.344], [0, 1]],
    "metreToYard": [[0, 0.9144], [0, 1]],
    "metreToFoot": [[0, 0.3048], [0, 1]],
    "metreToInch": [[0, 0.0254], [0, 1]],
    "metreToNauticalMile": [[0, 1852], [0, 1]]
  },
  "mass": {
    "kilogramToMetricTon": [[0, 1e3], [0, 1]],
    "kilogramToGram": [[0, 1], [0, 1e3]],
    "kilogramToMilligram": [[0, 1], [0, 1e6]],
    "kilogramToMicrogram": [[0, 1], [0, 1e9]],
    "kilogramToLongTon": [[0, 1016], [0, 1]],
    "kilogramToShortTon": [[0, 907.18474], [0, 1]],
    "kilogramToStone": [[0, 6.35029318], [0, 1]],
    "kilogramToPound": [[0, 0.45359237], [0, 1]],
    "kilogramToOunce": [[0, 0.02834952312], [0, 1]]
  },
  "time": {
    "secondToNanosecond": [[0, 1], [0, 1e9]],
    "secondToMicrosecond": [[0, 1], [0, 1e6]],
    "secondToMillisecond": [[0, 1], [0, 1e3]],
    "secondToMinute": [[0, 60], [0, 1]],
    "secondToHour": [[0, 3600], [0, 1]],
    "secondToDay": [[0, 86400], [0, 1]],
    "secondToWeek": [[0, 604800], [0, 1]],
    "secondToMonth": [[0, 2629746], [0, 1]],
    "secondToYear": [[0, 31556952], [0, 1]],
    "secondToDecade": [[0, 315569520], [0, 1]],
    "secondToCentury": [[0, 3155695200], [0, 1]],
    "secondToMillennium": [[0, 31556952000], [0, 1]]
  },
  "electricCurrent": {
    "ampereToAbampere": [[0, 10], [0, 1]]
  },
  "amountOfSubstance": {
    "moleToPoundMole": [[0, 453.59237], [0, 1]]
  },
  "velocity": {
    "metresSecondToMilesHour": [[0, 1], [0, 2.236936292054402]],
    "metresSecondToFeetSecond": [[0, 1], [0, 3.280839895013123]],
    "metresSecondToKilometresHour": [[0, 1], [0, 3.6]],
    "metresSecondToKnot": [[0, 1], [0, 1.943844492440605]]
  },
  "area": {
    "squareMetreToSquareKilometre": [[0, 1e6], [0, 1]],
    "squareMetreToHectare": [[0, 1e4], [0, 1]],
    "squareMetreToSquareMile": [[0, 2589988.110336], [0, 1]],
    "squareMetreToAcre": [[0, 4046.8564224], [0, 1]],
    "squareMetreToSquareYard": [[0, 0.83612736], [0, 1]],
    "squareMetreToSquareFoot": [[0, 0.09290304], [0, 1]],
    "squareMetreToSquareInch": [[0, 0.00064516], [0, 1]]
  },
  "volume": {
    "cubicMetreToMillilitre": [[0, 1], [0, 1e6]],
    "cubicMetreToLitre": [[0, 1], [0, 1e3]],
    "cubicMetreToCubicInch": [[0, 0.000016387064], [0, 1]],
    "cubicMetreToCubicFoot": [[0, 0.028316846592000004], [0, 1]],
    "cubicMetreToImperialFluidOunce": [[0, 0.0000284130625], [0, 1]],
    "cubicMetreToImperialGill": [[0, 0.0001420653125], [0, 1]],
    "cubicMetreToImperialPint": [[0, 0.00056826125], [0, 1]],
    "cubicMetreToImperialQuart": [[0, 0.0011365225], [0, 1]],
    "cubicMetreToImperialGallon": [[0, 0.00454609], [0, 1]],
    "cubicMetreToUSDram": [[0, 0.0000036966911953125], [0, 1]],
    "cubicMetreToUSFluidOunce": [[0, 0.0000295735295625], [0, 1]],
    "cubicMetreToUSGill": [[0, 0.00011829411825], [0, 1]],
    "cubicMetreToUSCup": [[0, 0.0002365882365], [0, 1]],
    "cubicMetreToUSPint": [[0, 0.000473176473], [0, 1]],
    "cubicMetreToUSQuart": [[0, 0.000946352946], [0, 1]],
    "cubicMetreToUSGallon": [[0, 0.003785411784], [0, 1]]
  },
  "luminousIntensity": {
    "candelaToCandlepower": [[0, 0.981], [0, 1]],
    "candelaToHefnerkerze": [[0, 0.920], [0, 1]]
  },
  "angle": {
    "radianToTurn": [[0, 6.283185307179586], [0, 1]],
    "radianToDegree": [[0, 6.283185307179586], [0, 360]],
    "radianToGradian": [[0, 6.283185307179586], [0, 400]]
  },
  "digitalInformation": {
    "byteToBit": [[0, 1], [0, 8]],
    "byteToKibibyte": [[0, 1024], [0, 1]],
    "byteToMebibyte": [[0, 1048576], [0, 1]],
    "byteToGibibyte": [[0, 1073741824], [0, 1]],
    "byteToTebibyte": [[0, 1099511627776], [0, 1]],
    "byteToPebibyte": [[0, 1125899906842624], [0, 1]],
    "byteToExbibyte": [[0, 1152921504606846976], [0, 1]],
    "byteToZebibyte": [[0, 1180591620717411303424], [0, 1]],
    "byteToYobibyte": [[0, 1208925819614629174706176], [0, 1]]
  }
}

},{}],2:[function(require,module,exports){
/*jshint node:true */

'use strict';

exports.PRESETS = require('../data/presets.json');

},{"../data/presets.json":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"optionale":3}],5:[function(require,module,exports){
/*jshint node:true */

'use strict';

var initialError = '',
    error = initialError,
    validScaleExample = 'Eg. [0, 1]',
    validPresetExample = 'Eg. [[0, 100], [32, 212]]',
    validPresetsExample = 'Eg. [[[0, 100], [32, 212]], [[0, 100], [-273.15, -173.15]]]',
    api = {};

function RescaleError(message) {
  this.name = 'RescaleError';
  this.message = message;
  this.stack = (new Error()).stack;
}

RescaleError.prototype = Object.create(Error.prototype);
RescaleError.prototype.constructor = RescaleError;

exports.RescaleError = RescaleError;

exports.isValidScale = api.isValidScale = function isValidScale(scale) {
  if (!Array.isArray(scale) || scale.length !== 2) {
    setScaleError('the scale must be an Array with two elements');

    return false;
  }

  if (!isFinite(scale[0]) || !isFinite(scale[1]) || typeof scale[0] !== 'number' || typeof scale[1] !== 'number') {
    setScaleError('the extremes must be finite numbers');

    return false;
  }

  if (scale[0] === scale[1]) {
    setScaleError('the extremes cannot be the same');

    return false;
  }

  return true;
};

exports.isValidPreset = api.isValidPreset = function isValidPreset(preset) {
  if (!Array.isArray(preset) || preset.length !== 2) {
    setPresetError('a preset must be an Array with two scales');

    return false;
  }

  return preset.every(function (scale) {
    return api.isValidScale(scale);
  });
};

exports.areValidPresets = function areValidPresets(presets) {
  if (!Array.isArray(presets)) {
    setPresetsError('presets must be an Array with presets');

    return false;
  }

  return presets.every(function (preset) {
    return api.isValidPreset(preset);
  });
};

exports.getLastError = function getLastError() {
  return error;
};

exports.resetLastError = function getLastError() {
  error = initialError;
};

function setScaleError(newError) {
  error = newError + '. ' + validScaleExample;
}

function setPresetError(newError) {
  error = newError + '. ' + validPresetExample;
}

function setPresetsError(newError) {
  error = newError + '. ' + validPresetsExample;
}

},{}],6:[function(require,module,exports){
/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var RescaleError = rescaleUtil.RescaleError;
var decimal = arbitraryPrecision.load();

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
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

},{"rescale-arbitrary-precision":4,"rescale-util":5}],7:[function(require,module,exports){
/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var RescaleError = rescaleUtil.RescaleError;
var decimal = arbitraryPrecision.load();

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
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

},{"rescale-arbitrary-precision":4,"rescale-util":5}],8:[function(require,module,exports){
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

},{"normalise":6,"rescale-arbitrary-precision":4,"scale-normalised":7}],"linear-converter":[function(require,module,exports){
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
 * @param {Array} preset The first preset to compose
 * @param {Array} preset The second preset to compose
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

},{"linear-presets":2,"rescale":8,"rescale-arbitrary-precision":4,"rescale-util":5}]},{},[]);
