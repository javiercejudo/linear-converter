/*jshint node:true */

'use strict';

var rescale = require('rescale');
var rescaleUtil = require('rescale-util');

var RescaleError = rescaleUtil.RescaleError;

exports.PRESETS = require('./presets.json');

exports.convert = function convert(x, preset) {
  if (typeof preset === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidPreset(preset)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return rescale.rescale(x, preset[0], preset[1]);
};

exports.invertPreset = function invertPreset(preset) {
  if (!rescaleUtil.isValidPreset(preset)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return preset.slice(0).reverse();
};

exports.composePresets = function composePresets(presets) {
  if (!rescaleUtil.areValidPresets(presets)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

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
