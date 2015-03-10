/*jshint node:true, mocha:true */

'use strict';

var convertTests = require('./convert/convertTests.js');
var invertPresetTests = require('./invertPreset/invertPresetTests.js');
var composePresetsTests = require('./composePresets/composePresetsTests.js');

var o_o = describe;
var camelCase = require('camel-case');

function better(description, context) {
  return context[camelCase(description)];
}

o_o('converting', function() {
  o_o('without a preset', better('be the identity', convertTests));
  o_o('with a preset', better('delegate its validation to rescale util', convertTests));
  o_o('with a valid preset', better('delegate the conversion to rescale', convertTests));
  o_o('with an invalid preset', better('throw an error', convertTests));
});

o_o('inverting', function() {
  o_o('any preset', better('delegate its validation to rescale util', invertPresetTests));
  o_o('with an invalid preset', better('throw an error', invertPresetTests));
  o_o('with a valid preset', better('invert the preset', invertPresetTests));
});

o_o('composing', function() {
  o_o('with invalid input', better('throw an error', composePresetsTests));
  o_o('any presets', better('delegate their validation to rescale util', composePresetsTests));
  o_o('with invalid presets', better('throw another error', composePresetsTests));
  o_o('with valid presets', better('compose the presets', composePresetsTests));
});
