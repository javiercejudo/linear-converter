/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var compose = require('../../../src/linear-converter').composePresets;

exports.composeThePresets = function() {
  it('should compose the presets', function() {
    compose([
      [[0, 10], [10, 20]],
      [[10, 20], [50, 60]]
    ]).should.eql([[0, 10], [50, 60]]);

    compose([
      [[0, 1], [0, -2]],
      [[0, 3], [0, -9]]
    ]).should.eql([[0, 1], [0, 6]]);

    compose([
      [[1, 2], [2, 4]],
      [[1, 3], [3, 9]],
      [[1000, Number(Math.E.toFixed(14))], [999, Number(Math.E.toFixed(14)) - 1]]
    ]).should.eql([[1, 2], [5, 11]]);

    compose([
      [[1, 2], [2, 4]]
    ]).should.eql([[1, 2], [2, 4]]);
  });
};
