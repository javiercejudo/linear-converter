/*jshint node:true, mocha:true */

'use strict';

var better = require('betterer').better;
var convertTests = require('./convert/convertTests');
var invertPresetTests = require('./invertPreset/invertPresetTests');
var composePresetsTests = require('./composePresets/composePresetsTests');
var coefficientATests = require('./coefficients/coefficientATests');
var coefficientBTests = require('./coefficients/coefficientBTests');

var o_o = describe;

o_o('converting', function() { var o_O = convertTests;
  o_o('without a preset', better('be the identity', o_O));
  o_o('with a preset', better('delegate its validation to rescale util', o_O));
  o_o('with a valid preset', better('delegate the conversion to rescale', o_O));
  o_o('with an invalid preset', better('throw an error', o_O));
});

o_o('inverting', function() { var o_O = invertPresetTests;
  o_o('any preset', better('delegate its validation to rescale util', o_O));
  o_o('an invalid preset', better('throw an error', o_O));
  o_o('a valid preset', better('invert the preset', o_O));
});

o_o('composing', function() { var o_O = composePresetsTests;
  o_o('with invalid input', better('throw an error', o_O));
  o_o('any presets', better('delegate their validation to rescale util', o_O));
  o_o('invalid presets', better('throw another error', o_O));
  o_o('valid presets', better('compose the presets', o_O));
});

o_o('computing coefficient a', function() { var o_O = coefficientATests;
  o_o('when big.js is available', better('work with arbitrary precision', o_O));
  o_o('when big.js is not available', better('work with floating-point numbers', o_O));
  o_o('of an invalid preset', better('throw an error', o_O));
});

o_o('computing coefficient b', function() { var o_O = coefficientBTests;
  o_o('with a valid preset', better('delegate to rescale with x=0', o_O));
  o_o('of an invalid preset', better('throw an error', o_O));
});
