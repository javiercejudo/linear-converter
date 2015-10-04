/*jshint node:true, mocha:true */

'use strict';

var better = require('betterer').better;
var convertTests = require('./convert/convertTests');
var invertConversionTests = require('./invertConversion/invertConversionTests');
var composeConversionsTests = require('./composeConversions/composeConversionsTests');
var coefficientATests = require('./coefficients/coefficientATests');
var coefficientBTests = require('./coefficients/coefficientBTests');
var equivalenceTests = require('./equivalence/equivalenceTests');

var o_o = describe;

o_o('converting', function() { var o_O = convertTests;
  o_o('with a valid conversion', better('convert based on the provided conversion', o_O));
});

o_o('inverting', function() { var o_O = invertConversionTests;
  o_o('a valid conversion', better('invert the conversion', o_O));
});

o_o('composing', function() { var o_O = composeConversionsTests;
  o_o('valid conversions', better('compose the conversions', o_O));
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
  o_o('when conversions are equivalent', better('return true', o_O));
  o_o('when conversions are not equivalent', better('return false', o_O));
});
