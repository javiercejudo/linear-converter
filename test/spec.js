/*jshint node:true, mocha:true */

'use strict';

var better = require('betterer').better;
var convertTests = require('./convert/convertTests.js');
var invertPresetTests = require('./invertPreset/invertPresetTests.js');
var composePresetsTests = require('./composePresets/composePresetsTests.js');
var coefficientATests = require('./coefficients/coefficientATests.js');
var coefficientBTests = require('./coefficients/coefficientBTests.js');

var o_o = describe;

o_o('converting', function() { var o_O = convertTests;
  o_o('without a preset', better('be the identity', o_O));
  o_o('with a preset', better('delegate its validation to rescale util', o_O));
  o_o('with a valid preset', better('delegate the conversion to rescale', o_O));
  o_o('with an invalid preset', better('throw an error', o_O));
});

o_o('inverting', function() { var o_O = invertPresetTests;
  o_o('any preset', better('delegate its validation to rescale util', o_O));
  o_o('with an invalid preset', better('throw an error', o_O));
  o_o('with a valid preset', better('invert the preset', o_O));
});

o_o('composing', function() { var o_O = composePresetsTests;
  o_o('with invalid input', better('throw an error', o_O));
  o_o('any presets', better('delegate their validation to rescale util', o_O));
  o_o('with invalid presets', better('throw another error', o_O));
  o_o('with valid presets', better('compose the presets', o_O));
});

o_o('computing coefficient a', function() { var o_O = coefficientATests;
  o_o('with a valid preset', better('return coefficient a', o_O));
  o_o('with an invalid preset', better('throw an error', o_O));
});

o_o('computing coefficient b', function() { var o_O = coefficientBTests;
  o_o('with a valid preset', better('return coefficient b', o_O));
  o_o('with an invalid preset', better('throw an error', o_O));
});
