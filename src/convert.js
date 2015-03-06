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
