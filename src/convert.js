/*jshint node:true */

'use strict';

var rescale = require('rescale');
var rescaleUtil = require('rescale-util');
var linearPresets = require('linear-presets').PRESETS;

var RescaleError = rescaleUtil.RescaleError;

exports.PRESETS = linearPresets;

exports.convert = function convert(x, preset) {
  if (typeof preset === 'undefined') {
    return x;
  }

  assertPreset(preset);

  return rescale.rescale(x, preset[0], preset[1]);
};

exports.invertPreset = function invertPreset(preset) {
  assertPreset(preset);

  return preset.slice(0).reverse();
};

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

exports.getCoefficientA = function getCoefficientA(preset) {
  assertPreset(preset);

  return (preset[1][1] - preset[1][0]) / (preset[0][1] - preset[0][0]);
};

exports.getCoefficientB = function getCoefficientB(preset) {
  assertPreset(preset);

  return rescale.rescale(0, preset[0], preset[1]);
};

function assertPreset(preset) {
  if (!rescaleUtil.isValidPreset(preset)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}

function assertPresets(presets) {
  if (!rescaleUtil.areValidPresets(presets)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }
}
