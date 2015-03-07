/*jshint node:true */

'use strict';

var rescale = require('rescale');

exports.PRESETS = require('./presets.json');

exports.convert = function convert(x, preset) {
  return rescale.rescale(x, preset[0], preset[1]);
};

exports.invert = function invert(preset) {
  return preset.slice(0).reverse();
};

exports.compose = function compose(presets) {
  return presets.reduce(function (previousPreset, currentPreset) {
    if (previousPreset[1][0] !== currentPreset[0][0] ||
        previousPreset[1][1] !== currentPreset[0][1]) {
      throw new Error('The presets are not composable. Future versions might work this out automatically.');
    }

    return [previousPreset[0], currentPreset[1]];
  });
};
