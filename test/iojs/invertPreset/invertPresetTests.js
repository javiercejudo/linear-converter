/*jshint node:true, mocha:true */

'use strict';

require('should');

var floatingAdapter = require('floating-adapter');
var lcFactory = require('../../../src/linear-converter');

exports.invertThePreset = function() {
  var invert = lcFactory(floatingAdapter).invertPreset;

  it('should invert the preset', function() {
    invert([[0, 10], [10, 20]]).should.eql([[10, 20], [0, 10]]);
    invert([[-5, 4], [0.05, -5.4]]).should.eql([[0.05, -5.4], [-5, 4]]);
  });
};
