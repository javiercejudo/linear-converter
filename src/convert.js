/*jshint node:true */

'use strict';

var rescale = require('rescale');

exports.PRESETS = require('./presets.json');

exports.convert = function convert(x, preset) {
  return rescale.rescale(x, preset[0], preset[1]);
};

exports.invertPreset = function invertPreset(preset) {
  return preset.slice(0).reverse();
};

exports.composePresets = function composePresets(presets) {
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
