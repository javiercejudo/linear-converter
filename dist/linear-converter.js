require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "metricPrefixes": {
    "noneToExa": [[0, 1e+18], [0, 1]],
    "noneToPeta": [[0, 1e+15], [0, 1]],
    "noneToTera": [[0, 1e+12], [0, 1]],
    "noneToGiga": [[0, 1e+9], [0, 1]],
    "noneToMega": [[0, 1e+6], [0, 1]],
    "noneToKilo": [[0, 1000], [0, 1]],
    "noneToHecto": [[0, 100], [0, 1]],
    "noneToDeca": [[0, 10], [0, 1]],
    "noneToDeci": [[0, 1], [0, 10]],
    "noneToCenti": [[0, 1], [0, 100]],
    "noneToMilli": [[0, 1], [0, 1000]],
    "noneToMicro": [[0, 1], [0, 1e+6]],
    "noneToNano": [[0, 1], [0, 1e+9]],
    "noneToPico": [[0, 1], [0, 1e+12]],
    "noneToFemto": [[0, 1], [0, 1e+15]],
    "noneToAtto": [[0, 1], [0, 1e+18]]
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
    "metreToKilometre": [[0, 1000], [0, 1]],
    "metreToCentimetre": [[0, 1], [0, 100]],
    "metreToMillimetre": [[0, 1], [0, 1000]],
    "metreToMile": [[0, 1609.344], [0, 1]],
    "metreToYard": [[0, 0.9144], [0, 1]],
    "metreToFoot": [[0, 0.3048], [0, 1]],
    "metreToInch": [[0, 0.0254], [0, 1]],
    "metreToNauticalMile": [[0, 1852], [0, 1]]
  },
  "mass": {
    "kilogramToMetricTon": [[0, 1000], [0, 1]],
    "kilogramToGram": [[0, 1], [0, 1000]],
    "kilogramToMilligram": [[0, 1], [0, 1e+6]],
    "kilogramToMicrogram": [[0, 1], [0, 1e+9]],
    "kilogramToLongTon": [[0, 1016], [0, 1]],
    "kilogramToShortTon": [[0, 907.18474], [0, 1]],
    "kilogramToStone": [[0, 6.35029318], [0, 1]],
    "kilogramToPound": [[0, 0.45359237], [0, 1]],
    "kilogramToOunce": [[0, 0.02834952312], [0, 1]]
  },
  "time": {
    "secondToNanosecond": [[0, 1], [0, 1e+9]],
    "secondToMicrosecond": [[0, 1], [0, 1e+6]],
    "secondToMillisecond": [[0, 1], [0, 1000]],
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

exports.scale = function scale(x, scale) {
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

},{"linear-presets":2,"rescale":8,"rescale-util":3}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbGluZWFyLXByZXNldHMvZGF0YS9wcmVzZXRzLmpzb24iLCJub2RlX21vZHVsZXMvbGluZWFyLXByZXNldHMvc3JjL2xpbmVhci1wcmVzZXRzLmpzIiwibm9kZV9tb2R1bGVzL3Jlc2NhbGUtdXRpbC9zcmMvcmVzY2FsZS11dGlsLmpzIiwibm9kZV9tb2R1bGVzL3Jlc2NhbGUvbm9kZV9tb2R1bGVzL25vcm1hbGlzZS9zcmMvbm9ybWFsaXNlLmpzIiwibm9kZV9tb2R1bGVzL3Jlc2NhbGUvbm9kZV9tb2R1bGVzL3NjYWxlLW5vcm1hbGlzZWQvc3JjL3NjYWxlLmpzIiwibm9kZV9tb2R1bGVzL3Jlc2NhbGUvc3JjL3Jlc2NhbGUuanMiLCJzcmMvY29udmVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm1ldHJpY1ByZWZpeGVzXCI6IHtcbiAgICBcIm5vbmVUb0V4YVwiOiBbWzAsIDFlKzE4XSwgWzAsIDFdXSxcbiAgICBcIm5vbmVUb1BldGFcIjogW1swLCAxZSsxNV0sIFswLCAxXV0sXG4gICAgXCJub25lVG9UZXJhXCI6IFtbMCwgMWUrMTJdLCBbMCwgMV1dLFxuICAgIFwibm9uZVRvR2lnYVwiOiBbWzAsIDFlKzldLCBbMCwgMV1dLFxuICAgIFwibm9uZVRvTWVnYVwiOiBbWzAsIDFlKzZdLCBbMCwgMV1dLFxuICAgIFwibm9uZVRvS2lsb1wiOiBbWzAsIDEwMDBdLCBbMCwgMV1dLFxuICAgIFwibm9uZVRvSGVjdG9cIjogW1swLCAxMDBdLCBbMCwgMV1dLFxuICAgIFwibm9uZVRvRGVjYVwiOiBbWzAsIDEwXSwgWzAsIDFdXSxcbiAgICBcIm5vbmVUb0RlY2lcIjogW1swLCAxXSwgWzAsIDEwXV0sXG4gICAgXCJub25lVG9DZW50aVwiOiBbWzAsIDFdLCBbMCwgMTAwXV0sXG4gICAgXCJub25lVG9NaWxsaVwiOiBbWzAsIDFdLCBbMCwgMTAwMF1dLFxuICAgIFwibm9uZVRvTWljcm9cIjogW1swLCAxXSwgWzAsIDFlKzZdXSxcbiAgICBcIm5vbmVUb05hbm9cIjogW1swLCAxXSwgWzAsIDFlKzldXSxcbiAgICBcIm5vbmVUb1BpY29cIjogW1swLCAxXSwgWzAsIDFlKzEyXV0sXG4gICAgXCJub25lVG9GZW10b1wiOiBbWzAsIDFdLCBbMCwgMWUrMTVdXSxcbiAgICBcIm5vbmVUb0F0dG9cIjogW1swLCAxXSwgWzAsIDFlKzE4XV1cbiAgfSxcbiAgXCJ0ZW1wZXJhdHVyZVwiOiB7XG4gICAgXCJjZWxzaXVzVG9GYWhyZW5oZWl0XCI6IFtbMCwgMTAwXSwgWzMyLCAyMTJdXSxcbiAgICBcImNlbHNpdXNUb0tlbHZpblwiOiBbWzAsIDEwMF0sIFsyNzMuMTUsIDM3My4xNV1dLFxuICAgIFwiY2Vsc2l1c1RvUmFua2luZVwiOiBbWzAsIDEwMF0sIFs0OTEuNjcsIDY3MS42N11dLFxuICAgIFwiY2Vsc2l1c1RvRGVsaXNsZVwiOiBbWzAsIDEwMF0sIFsxNTAsIDBdXSxcbiAgICBcImNlbHNpdXNUb05ld3RvblwiOiBbWzAsIDEwMF0sIFswLCAzM11dLFxuICAgIFwiY2Vsc2l1c1RvUmVhdW11clwiOiBbWzAsIDEwMF0sIFswLCA4MF1dLFxuICAgIFwiY2Vsc2l1c1RvUm9tZXJcIjogW1swLCAxMDBdLCBbNy41LCA2MF1dXG4gIH0sXG4gIFwiZGlzdGFuY2VcIjoge1xuICAgIFwibWV0cmVUb0tpbG9tZXRyZVwiOiBbWzAsIDEwMDBdLCBbMCwgMV1dLFxuICAgIFwibWV0cmVUb0NlbnRpbWV0cmVcIjogW1swLCAxXSwgWzAsIDEwMF1dLFxuICAgIFwibWV0cmVUb01pbGxpbWV0cmVcIjogW1swLCAxXSwgWzAsIDEwMDBdXSxcbiAgICBcIm1ldHJlVG9NaWxlXCI6IFtbMCwgMTYwOS4zNDRdLCBbMCwgMV1dLFxuICAgIFwibWV0cmVUb1lhcmRcIjogW1swLCAwLjkxNDRdLCBbMCwgMV1dLFxuICAgIFwibWV0cmVUb0Zvb3RcIjogW1swLCAwLjMwNDhdLCBbMCwgMV1dLFxuICAgIFwibWV0cmVUb0luY2hcIjogW1swLCAwLjAyNTRdLCBbMCwgMV1dLFxuICAgIFwibWV0cmVUb05hdXRpY2FsTWlsZVwiOiBbWzAsIDE4NTJdLCBbMCwgMV1dXG4gIH0sXG4gIFwibWFzc1wiOiB7XG4gICAgXCJraWxvZ3JhbVRvTWV0cmljVG9uXCI6IFtbMCwgMTAwMF0sIFswLCAxXV0sXG4gICAgXCJraWxvZ3JhbVRvR3JhbVwiOiBbWzAsIDFdLCBbMCwgMTAwMF1dLFxuICAgIFwia2lsb2dyYW1Ub01pbGxpZ3JhbVwiOiBbWzAsIDFdLCBbMCwgMWUrNl1dLFxuICAgIFwia2lsb2dyYW1Ub01pY3JvZ3JhbVwiOiBbWzAsIDFdLCBbMCwgMWUrOV1dLFxuICAgIFwia2lsb2dyYW1Ub0xvbmdUb25cIjogW1swLCAxMDE2XSwgWzAsIDFdXSxcbiAgICBcImtpbG9ncmFtVG9TaG9ydFRvblwiOiBbWzAsIDkwNy4xODQ3NF0sIFswLCAxXV0sXG4gICAgXCJraWxvZ3JhbVRvU3RvbmVcIjogW1swLCA2LjM1MDI5MzE4XSwgWzAsIDFdXSxcbiAgICBcImtpbG9ncmFtVG9Qb3VuZFwiOiBbWzAsIDAuNDUzNTkyMzddLCBbMCwgMV1dLFxuICAgIFwia2lsb2dyYW1Ub091bmNlXCI6IFtbMCwgMC4wMjgzNDk1MjMxMl0sIFswLCAxXV1cbiAgfSxcbiAgXCJ0aW1lXCI6IHtcbiAgICBcInNlY29uZFRvTmFub3NlY29uZFwiOiBbWzAsIDFdLCBbMCwgMWUrOV1dLFxuICAgIFwic2Vjb25kVG9NaWNyb3NlY29uZFwiOiBbWzAsIDFdLCBbMCwgMWUrNl1dLFxuICAgIFwic2Vjb25kVG9NaWxsaXNlY29uZFwiOiBbWzAsIDFdLCBbMCwgMTAwMF1dLFxuICAgIFwic2Vjb25kVG9NaW51dGVcIjogW1swLCA2MF0sIFswLCAxXV0sXG4gICAgXCJzZWNvbmRUb0hvdXJcIjogW1swLCAzNjAwXSwgWzAsIDFdXSxcbiAgICBcInNlY29uZFRvRGF5XCI6IFtbMCwgODY0MDBdLCBbMCwgMV1dLFxuICAgIFwic2Vjb25kVG9XZWVrXCI6IFtbMCwgNjA0ODAwXSwgWzAsIDFdXSxcbiAgICBcInNlY29uZFRvTW9udGhcIjogW1swLCAyNjI5NzQ2XSwgWzAsIDFdXSxcbiAgICBcInNlY29uZFRvWWVhclwiOiBbWzAsIDMxNTU2OTUyXSwgWzAsIDFdXSxcbiAgICBcInNlY29uZFRvRGVjYWRlXCI6IFtbMCwgMzE1NTY5NTIwXSwgWzAsIDFdXSxcbiAgICBcInNlY29uZFRvQ2VudHVyeVwiOiBbWzAsIDMxNTU2OTUyMDBdLCBbMCwgMV1dLFxuICAgIFwic2Vjb25kVG9NaWxsZW5uaXVtXCI6IFtbMCwgMzE1NTY5NTIwMDBdLCBbMCwgMV1dXG4gIH0sXG4gIFwiZWxlY3RyaWNDdXJyZW50XCI6IHtcbiAgICBcImFtcGVyZVRvQWJhbXBlcmVcIjogW1swLCAxMF0sIFswLCAxXV1cbiAgfSxcbiAgXCJhbW91bnRPZlN1YnN0YW5jZVwiOiB7XG4gICAgXCJtb2xlVG9Qb3VuZE1vbGVcIjogW1swLCA0NTMuNTkyMzddLCBbMCwgMV1dXG4gIH0sXG4gIFwic3BlZWRcIjoge1xuICAgIFwibWV0cmVzU2Vjb25kVG9NaWxlc0hvdXJcIjogW1swLCAxXSwgWzAsIDIuMjM2OTM2MjkyMDU0NDAyXV0sXG4gICAgXCJtZXRyZXNTZWNvbmRUb0ZlZXRTZWNvbmRcIjogW1swLCAxXSwgWzAsIDMuMjgwODM5ODk1MDEzMTIzXV0sXG4gICAgXCJtZXRyZXNTZWNvbmRUb0tpbG9tZXRyZXNIb3VyXCI6IFtbMCwgMV0sIFswLCAzLjZdXSxcbiAgICBcIm1ldHJlc1NlY29uZFRvS25vdFwiOiBbWzAsIDFdLCBbMCwgMS45NDM4NDQ0OTI0NDA2MDVdXVxuICB9LFxuICBcImFyZWFcIjoge1xuICAgIFwic3F1YXJlTWV0cmVUb1NxdWFyZUtpbG9tZXRyZVwiOiBbWzAsIDEwMDAwMDBdLCBbMCwgMV1dLFxuICAgIFwic3F1YXJlTWV0cmVUb0hlY3RhcmVcIjogW1swLCAxMDAwMF0sIFswLCAxXV0sXG4gICAgXCJzcXVhcmVNZXRyZVRvU3F1YXJlTWlsZVwiOiBbWzAsIDI1ODk5ODguMTEwMzM2XSwgWzAsIDFdXSxcbiAgICBcInNxdWFyZU1ldHJlVG9BY3JlXCI6IFtbMCwgNDA0Ni44NTY0MjI0XSwgWzAsIDFdXSxcbiAgICBcInNxdWFyZU1ldHJlVG9TcXVhcmVZYXJkXCI6IFtbMCwgMC44MzYxMjczNl0sIFswLCAxXV0sXG4gICAgXCJzcXVhcmVNZXRyZVRvU3F1YXJlRm9vdFwiOiBbWzAsIDAuMDkyOTAzMDRdLCBbMCwgMV1dLFxuICAgIFwic3F1YXJlTWV0cmVUb1NxdWFyZUluY2hcIjogW1swLCAwLjAwMDY0NTE2XSwgWzAsIDFdXVxuICB9XG59XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLlBSRVNFVFMgPSByZXF1aXJlKCcuLi9kYXRhL3ByZXNldHMuanNvbicpO1xuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVycm9yID0gJycsXG4gICAgdmFsaWRTY2FsZUV4YW1wbGUgPSAnRWcuIFswLCAxXScsXG4gICAgdmFsaWRQcmVzZXRFeGFtcGxlID0gJ0VnLiBbWzAsIDEwMF0sIFszMiwgMjEyXV0nLFxuICAgIHZhbGlkUHJlc2V0c0V4YW1wbGUgPSAnRWcuIFtbWzAsIDEwMF0sIFszMiwgMjEyXV0sIFtbMCwgMTAwXSwgWy0yNzMuMTUsIC0xNzMuMTVdXV0nLFxuICAgIGFwaSA9IHt9O1xuXG5mdW5jdGlvbiBSZXNjYWxlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm5hbWUgPSAnUmVzY2FsZUVycm9yJztcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG59XG5cblJlc2NhbGVFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5SZXNjYWxlRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVzY2FsZUVycm9yO1xuXG5leHBvcnRzLlJlc2NhbGVFcnJvciA9IFJlc2NhbGVFcnJvcjtcblxuZXhwb3J0cy5pc1ZhbGlkU2NhbGUgPSBhcGkuaXNWYWxpZFNjYWxlID0gZnVuY3Rpb24gaXNWYWxpZFNjYWxlKHNjYWxlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShzY2FsZSkgfHwgc2NhbGUubGVuZ3RoICE9PSAyKSB7XG4gICAgc2V0U2NhbGVFcnJvcigndGhlIHNjYWxlIG11c3QgYmUgYW4gQXJyYXkgd2l0aCB0d28gZWxlbWVudHMnKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHNjYWxlWzBdKSB8fCAhTnVtYmVyLmlzRmluaXRlKHNjYWxlWzFdKSkge1xuICAgIHNldFNjYWxlRXJyb3IoJ3RoZSBleHRyZW1lcyBtdXN0IGJlIGZpbml0ZSBudW1iZXJzJyk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2NhbGVbMF0gPT09IHNjYWxlWzFdKSB7XG4gICAgc2V0U2NhbGVFcnJvcigndGhlIGV4dHJlbWVzIGNhbm5vdCBiZSB0aGUgc2FtZScpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnRzLmlzVmFsaWRQcmVzZXQgPSBhcGkuaXNWYWxpZFByZXNldCA9IGZ1bmN0aW9uIGlzVmFsaWRQcmVzZXQocHJlc2V0KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShwcmVzZXQpIHx8IHByZXNldC5sZW5ndGggIT09IDIpIHtcbiAgICBzZXRQcmVzZXRFcnJvcignYSBwcmVzZXQgbXVzdCBiZSBhbiBBcnJheSB3aXRoIHR3byBzY2FsZXMnKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwcmVzZXQuZXZlcnkoZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgcmV0dXJuIGFwaS5pc1ZhbGlkU2NhbGUoc2NhbGUpO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuYXJlVmFsaWRQcmVzZXRzID0gZnVuY3Rpb24gYXJlVmFsaWRQcmVzZXRzKHByZXNldHMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHByZXNldHMpKSB7XG4gICAgc2V0UHJlc2V0c0Vycm9yKCdwcmVzZXRzIG11c3QgYmUgYW4gQXJyYXkgd2l0aCBwcmVzZXRzJyk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcHJlc2V0cy5ldmVyeShmdW5jdGlvbiAocHJlc2V0KSB7XG4gICAgcmV0dXJuIGFwaS5pc1ZhbGlkUHJlc2V0KHByZXNldCk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5nZXRMYXN0RXJyb3IgPSBmdW5jdGlvbiBnZXRMYXN0RXJyb3IoKSB7XG4gIHJldHVybiBlcnJvcjtcbn07XG5cbmV4cG9ydHMucmVzZXRMYXN0RXJyb3IgPSBmdW5jdGlvbiBnZXRMYXN0RXJyb3IoKSB7XG4gIGVycm9yID0gJyc7XG59O1xuXG5mdW5jdGlvbiBzZXRTY2FsZUVycm9yKG5ld0Vycm9yKSB7XG4gIGVycm9yID0gbmV3RXJyb3IgKyAnLiAnICsgdmFsaWRTY2FsZUV4YW1wbGU7XG59XG5cbmZ1bmN0aW9uIHNldFByZXNldEVycm9yKG5ld0Vycm9yKSB7XG4gIGVycm9yID0gbmV3RXJyb3IgKyAnLiAnICsgdmFsaWRQcmVzZXRFeGFtcGxlO1xufVxuXG5mdW5jdGlvbiBzZXRQcmVzZXRzRXJyb3IobmV3RXJyb3IpIHtcbiAgZXJyb3IgPSBuZXdFcnJvciArICcuICcgKyB2YWxpZFByZXNldHNFeGFtcGxlO1xufVxuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlc2NhbGVVdGlsID0gcmVxdWlyZSgncmVzY2FsZS11dGlsJyk7XG52YXIgUmVzY2FsZUVycm9yID0gcmVzY2FsZVV0aWwuUmVzY2FsZUVycm9yO1xuXG5leHBvcnRzLm5vcm1hbGlzZSA9IGZ1bmN0aW9uIG5vcm1hbGlzZSh4LCBzY2FsZSkge1xuICBpZiAodHlwZW9mIHNjYWxlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB4O1xuICB9XG5cbiAgaWYgKCFyZXNjYWxlVXRpbC5pc1ZhbGlkU2NhbGUoc2NhbGUpKSB7XG4gICAgdGhyb3cgbmV3IFJlc2NhbGVFcnJvcihyZXNjYWxlVXRpbC5nZXRMYXN0RXJyb3IoKSk7XG4gIH1cblxuICByZXR1cm4gKHggLSBzY2FsZVswXSkgLyAoc2NhbGVbMV0gLSBzY2FsZVswXSk7XG59O1xuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlc2NhbGVVdGlsID0gcmVxdWlyZSgncmVzY2FsZS11dGlsJyk7XG52YXIgUmVzY2FsZUVycm9yID0gcmVzY2FsZVV0aWwuUmVzY2FsZUVycm9yO1xuXG5leHBvcnRzLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUoeCwgc2NhbGUpIHtcbiAgaWYgKHR5cGVvZiBzY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIGlmICghcmVzY2FsZVV0aWwuaXNWYWxpZFNjYWxlKHNjYWxlKSkge1xuICAgIHRocm93IG5ldyBSZXNjYWxlRXJyb3IocmVzY2FsZVV0aWwuZ2V0TGFzdEVycm9yKCkpO1xuICB9XG5cbiAgcmV0dXJuIHNjYWxlWzBdICsgeCAqIChzY2FsZVsxXSAtIHNjYWxlWzBdKTtcbn07XG4iLCIvKmpzaGludCBub2RlOnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbm9ybWFsaXNlID0gcmVxdWlyZSgnbm9ybWFsaXNlJyk7XG52YXIgc2NhbGUgPSByZXF1aXJlKCdzY2FsZS1ub3JtYWxpc2VkJyk7XG5cbmV4cG9ydHMucmVzY2FsZSA9IGZ1bmN0aW9uIHJlc2NhbGUoeCwgb2xkU2NhbGUsIG5ld1NjYWxlKSB7XG4gIGlmICh0eXBlb2YgbmV3U2NhbGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG5vcm1hbGlzZS5ub3JtYWxpc2UoeCwgb2xkU2NhbGUpO1xuICB9XG5cbiAgcmV0dXJuIHNjYWxlLnNjYWxlKG5vcm1hbGlzZS5ub3JtYWxpc2UoeCwgb2xkU2NhbGUpLCBuZXdTY2FsZSk7XG59O1xuIiwiLypqc2hpbnQgbm9kZTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlc2NhbGUgPSByZXF1aXJlKCdyZXNjYWxlJyk7XG52YXIgcmVzY2FsZVV0aWwgPSByZXF1aXJlKCdyZXNjYWxlLXV0aWwnKTtcbnZhciBsaW5lYXJQcmVzZXRzID0gcmVxdWlyZSgnbGluZWFyLXByZXNldHMnKS5QUkVTRVRTO1xuXG52YXIgUmVzY2FsZUVycm9yID0gcmVzY2FsZVV0aWwuUmVzY2FsZUVycm9yO1xuXG5leHBvcnRzLlBSRVNFVFMgPSBsaW5lYXJQcmVzZXRzO1xuXG4vKipcbiAqIExpbmVhcmx5IGNvbnZlcnRzIHggYXMgZGVzY3JpYmVkIGJ5IGEgcHJlc2V0XG4gKlxuICogQHBhcmFtICB7TnVtYmVyfSB4IFRoZSBudW1iZXIgdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0gIHtBcnJheX0gcHJlc2V0IFRoZSBwcmVzZXQgdGhhdCBkZXNjcmliZXMgdGhlIGNvbnZlcnNpb25cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb252ZXJ0ZWQgeFxuICogQHRocm93cyB7UmVzY2FsZUVycm9yfVxuICovXG5leHBvcnRzLmNvbnZlcnQgPSBmdW5jdGlvbiBjb252ZXJ0KHgsIHByZXNldCkge1xuICBpZiAodHlwZW9mIHByZXNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIGFzc2VydFByZXNldChwcmVzZXQpO1xuXG4gIHJldHVybiByZXNjYWxlLnJlc2NhbGUoeCwgcHJlc2V0WzBdLCBwcmVzZXRbMV0pO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgcHJlc2V0IHRvIGNoYW5nZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBjb252ZXJzaW9uXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcHJlc2V0IFRoZSBwcmVzZXQgdG8gaW52ZXJ0XG4gKlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBpbnZlcnRlZCBwcmVzZXRcbiAqIEB0aHJvd3Mge1Jlc2NhbGVFcnJvcn1cbiAqL1xuZXhwb3J0cy5pbnZlcnRQcmVzZXQgPSBmdW5jdGlvbiBpbnZlcnRQcmVzZXQocHJlc2V0KSB7XG4gIGFzc2VydFByZXNldChwcmVzZXQpO1xuXG4gIHJldHVybiBwcmVzZXQuc2xpY2UoMCkucmV2ZXJzZSgpO1xufTtcblxuLyoqXG4gKiBDb21wb3NlcyB0d28gb3IgbW9yZSBwcmVzZXRzIHRvIGNyZWF0ZSBhIHNpbmdsZSBwcmVzZXRcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwcmVzZXRzIFRoZSBhcnJheSBvZiB0aGUgcHJlc2V0cyB0byBjb21wb3NlXG4gKlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBjb21wb3NlZCBwcmVzZXRcbiAqIEB0aHJvd3Mge1Jlc2NhbGVFcnJvcn1cbiAqL1xuZXhwb3J0cy5jb21wb3NlUHJlc2V0cyA9IGZ1bmN0aW9uIGNvbXBvc2VQcmVzZXRzKHByZXNldHMpIHtcbiAgYXNzZXJ0UHJlc2V0cyhwcmVzZXRzKTtcblxuICByZXR1cm4gcHJlc2V0cy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzUHJlc2V0LCBjdXJyZW50UHJlc2V0KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHByZXZpb3VzUHJlc2V0WzBdLFxuICAgICAgW1xuICAgICAgICByZXNjYWxlLnJlc2NhbGUocHJldmlvdXNQcmVzZXRbMV1bMF0sIGN1cnJlbnRQcmVzZXRbMF0sIGN1cnJlbnRQcmVzZXRbMV0pLFxuICAgICAgICByZXNjYWxlLnJlc2NhbGUocHJldmlvdXNQcmVzZXRbMV1bMV0sIGN1cnJlbnRQcmVzZXRbMF0sIGN1cnJlbnRQcmVzZXRbMV0pXG4gICAgICBdXG4gICAgXTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGEgY29lZmZpY2llbnQgaW4gdGhlIGYoeCkgPSBheCArIGIgZnVuY3Rpb24gdGhhdCBkZXNjcmliZXNcbiAqIHRoZSBnaXZlbiBwcmVzZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcHJlc2V0IFRoZSBwcmVzZXQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSBpdHMgYSBjb2VmZmljaWVudFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvZWZmaWNpZW50IGFcbiAqIEB0aHJvd3Mge1Jlc2NhbGVFcnJvcn1cbiAqL1xuZXhwb3J0cy5nZXRDb2VmZmljaWVudEEgPSBmdW5jdGlvbiBnZXRDb2VmZmljaWVudEEocHJlc2V0KSB7XG4gIGFzc2VydFByZXNldChwcmVzZXQpO1xuXG4gIHJldHVybiAocHJlc2V0WzFdWzFdIC0gcHJlc2V0WzFdWzBdKSAvIChwcmVzZXRbMF1bMV0gLSBwcmVzZXRbMF1bMF0pO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBiIGNvZWZmaWNpZW50IGluIHRoZSBmKHgpID0gYXggKyBiIGZ1bmN0aW9uIHRoYXQgZGVzY3JpYmVzXG4gKiB0aGUgZ2l2ZW4gcHJlc2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHByZXNldCBUaGUgcHJlc2V0IGZvciB3aGljaCB0byBjYWxjdWxhdGUgaXRzIGIgY29lZmZpY2llbnRcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb2VmZmljaWVudCBiXG4gKiBAdGhyb3dzIHtSZXNjYWxlRXJyb3J9XG4gKi9cbmV4cG9ydHMuZ2V0Q29lZmZpY2llbnRCID0gZnVuY3Rpb24gZ2V0Q29lZmZpY2llbnRCKHByZXNldCkge1xuICBhc3NlcnRQcmVzZXQocHJlc2V0KTtcblxuICByZXR1cm4gcmVzY2FsZS5yZXNjYWxlKDAsIHByZXNldFswXSwgcHJlc2V0WzFdKTtcbn07XG5cbi8qKlxuICogQXNzZXJ0cyBhIHZhbGlkIHByZXNldCBpcyBnaXZlblxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHByZXNldCBUaGUgcHJlc2V0IHRvIGFzc2VydFxuICpcbiAqIEB0aHJvd3Mge1Jlc2NhbGVFcnJvcn1cbiAqL1xuZnVuY3Rpb24gYXNzZXJ0UHJlc2V0KHByZXNldCkge1xuICBpZiAoIXJlc2NhbGVVdGlsLmlzVmFsaWRQcmVzZXQocHJlc2V0KSkge1xuICAgIHRocm93IG5ldyBSZXNjYWxlRXJyb3IocmVzY2FsZVV0aWwuZ2V0TGFzdEVycm9yKCkpO1xuICB9XG59XG5cbi8qKlxuICogQXNzZXJ0cyBhbiBhcnJheSBvZiB2YWxpZCBwcmVzZXQgaXMgZ2l2ZW5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwcmVzZXRzIFRoZSBhcnJheSBvZiBwcmVzZXRzIHRvIGFzc2VydFxuICpcbiAqIEB0aHJvd3Mge1Jlc2NhbGVFcnJvcn1cbiAqL1xuZnVuY3Rpb24gYXNzZXJ0UHJlc2V0cyhwcmVzZXRzKSB7XG4gIGlmICghcmVzY2FsZVV0aWwuYXJlVmFsaWRQcmVzZXRzKHByZXNldHMpKSB7XG4gICAgdGhyb3cgbmV3IFJlc2NhbGVFcnJvcihyZXNjYWxlVXRpbC5nZXRMYXN0RXJyb3IoKSk7XG4gIH1cbn1cbiJdfQ==
