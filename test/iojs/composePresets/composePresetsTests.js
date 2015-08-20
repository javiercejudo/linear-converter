/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

function scaleVals(scale) {
  return scale.map(function(x) {
    return x.val().val();
  })
}

exports.composeThePresets = function() {
  var Decimal = arbitraryPrecision(floatingAdapter);
  var compose = lcFactory(Decimal).composePresets;

  it('should compose the presets', function() {
    compose(
      [[0, 10], [10, 20]],
      [[10, 20], [50, 60]]
    ).map(scaleVals).should.eql([[0, 10], [50, 60]]);

    compose(
      [[0, 1], [0, -2]],
      [[0, 3], [0, -9]]
    ).map(scaleVals).should.eql([[0, 1], [0, 6]]);

    [
      [[1, 2], [2, 4]],
      [[1, 3], [3, 9]],
      [[1000, Number(Math.E.toFixed(14))], [999, Number(Math.E.toFixed(14)) - 1]]
    ].reduce(compose).map(scaleVals).should.eql([[1, 2], [5, 11]]);
  });
};
