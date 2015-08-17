/*jshint node:true, mocha:true */

'use strict';

var better = require('betterer').better;
var convertTests = require('./convert/convertTests');
var invertPresetTests = require('./invertPreset/invertPresetTests');
var composePresetsTests = require('./composePresets/composePresetsTests');
var coefficientATests = require('./coefficients/coefficientATests');
var coefficientBTests = require('./coefficients/coefficientBTests');
var equivalenceTests = require('./equivalence/equivalenceTests');

var o_o = describe;

o_o('converting', function() { var o_O = convertTests;
  o_o('with a valid preset', better('convert based on the provided preset', o_O));
});

o_o('inverting', function() { var o_O = invertPresetTests;
  o_o('a valid preset', better('invert the preset', o_O));
});

o_o('composing', function() { var o_O = composePresetsTests;
  o_o('valid presets', better('compose the presets', o_O));
});

o_o('computing coefficient a', function() { var o_O = coefficientATests;
  o_o('when arbitrary precision is available', better('work with arbitrary precision', o_O));
  o_o('when arbitrary precision is not available', better('work with floating-point numbers', o_O));
});

o_o('computing coefficient b', function() { var o_O = coefficientBTests;
  o_o('when arbitrary precision is available', better('work with arbitrary precision', o_O));
  o_o('when arbitrary precision is not available', better('work with floating-point numbers', o_O));
});

o_o('checking for equivalence', function() { var o_O = equivalenceTests;
  o_o('when presets are equivalent', better('return true', o_O));
  o_o('when presets are not equivalent', better('return false', o_O));
});
