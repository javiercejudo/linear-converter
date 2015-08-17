/*jshint node:true, mocha:true */

'use strict';

require('should');

var equivalent = require('../../../src/linear-converter')(require('floating-adapter')).equivalentPresets;

exports.returnTrue = function() {
  it('should return true', function() {
    equivalent([
      [[0, 10], [10, 20]],
      [[430245.1, -44.5], [430255.1, -34.5]]
    ]).should.be.exactly(true);

    equivalent([
      [[1, 5], [3, -9]],
      [[0, 2], [6, 0]],
      [[-1, 100], [9, -294]],
    ]).should.be.exactly(true);

    equivalent([
      [[0, 1], [0, 1]],
      [[0, 1], [0, 1]]
    ]).should.be.exactly(true);

    equivalent([
      [[0, 1], [0, 3]],
      [[0, 3], [0, 9]]
    ]).should.be.exactly(true);

    equivalent([
      [[0, 1], [0, 1]],
    ]).should.be.exactly(true);

    equivalent([]).should.be.exactly(true);
  });
};

exports.returnFalse = function() {
  it('should return false', function() {
    equivalent([
      [[0, 1], [0, 2]],
      [[0, 1], [0, 3]]
    ]).should.be.exactly(false);

    equivalent([
      [[0, 1], [1, 3]],
      [[0, 1], [2, 4]]
    ]).should.be.exactly(false);
  });
};
