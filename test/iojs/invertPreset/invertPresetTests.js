/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var invert = require('../../../src/linear-converter').invertPreset;

exports.invertThePreset = function() {
  it('should invert the preset', function() {
    invert([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
    invert([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
  });
};
