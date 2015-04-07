require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "metricPrefixes": {
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
    "noneToAtto": [[0, 1], [0, 1e18]]
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
  "speed": {
    "metresSecondToMilesHour": [[0, 1], [0, 2.236936292054402]],
    "metresSecondToFeetSecond": [[0, 1], [0, 3.280839895013123]],
    "metresSecondToKilometresHour": [[0, 1], [0, 3.6]],
    "metresSecondToKnot": [[0, 1], [0, 1.943844492440605]]
  },
  "area": {
    "squareMetreToSquareKilometre": [[0, 1000000], [0, 1]],
    "squareMetreToHectare": [[0, 10000], [0, 1]],
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
    "cubicMetreToUSFluidOunce": [[0, 0.000473176473], [0, 1]],
    "cubicMetreToUSGill": [[0, 0.000473176473], [0, 1]],
    "cubicMetreToUSPint": [[0, 0.000473176473], [0, 1]],
    "cubicMetreToUSQuart": [[0, 0.000473176473], [0, 1]],
    "cubicMetreToUSGallon": [[0, 0.000473176473], [0, 1]]
  }
}

},{}],2:[function(require,module,exports){
/*jshint node:true */

'use strict';

exports.PRESETS = require('../data/presets.json');

},{"../data/presets.json":1}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var error = '',
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

  if (!Number.isFinite(scale[0]) || !Number.isFinite(scale[1])) {
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
  error = '';
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

},{}],4:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],5:[function(require,module,exports){
/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var RescaleError = rescaleUtil.RescaleError;

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return (x - scale[0]) / (scale[1] - scale[0]);
};

},{"rescale-util":4}],6:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],7:[function(require,module,exports){
/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var RescaleError = rescaleUtil.RescaleError;

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return scale[0] + x * (scale[1] - scale[0]);
};

},{"rescale-util":6}],8:[function(require,module,exports){
/*jshint node:true */

'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');

exports.rescale = function rescale(x, oldScale, newScale) {
  if (typeof newScale === 'undefined') {
    return normalise.normalise(x, oldScale);
  }

  return scale.scale(normalise.normalise(x, oldScale), newScale);
};

},{"normalise":5,"scale-normalised":7}],"linear-converter":[function(require,module,exports){
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
 * @param {Array} presets The array of presets to assert
 *
 * @throws {RescaleError}
 */
function assertPresets(presets) {
  if (!rescaleUtil.areValidPresets(presets)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}

},{"linear-presets":2,"rescale":8,"rescale-util":3}]},{},[]);
