/*jshint node:true, mocha:true */

'use strict';

require('should');

var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.convertBasedOnTheProvidedPreset = function() {
  var convert = lcFactory(floatingAdapter).convert;

  it('convert based on the provided preset', function() {
    convert(-273.15, [[0, 10], [10, 20]]).should.be.exactly(-263.15);
    convert(24, [[0, 10], [10, 20]]).should.be.exactly(34);
  });
};
