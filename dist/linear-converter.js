/**
 * linear-converter - Copyright 2015 Javier Cejudo <javier@javiercejudo.com> (http://www.javiercejudo.com)
 * @version v3.0.0
 * @link https://github.com/javiercejudo/linear-converter#readme
 * @license MIT
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2015 Sergii Iefremov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
module.exports = function(value, error) {
  if (!error) {
    throw new Error('error required');
  }

  if (value) return;
  throw error;
};

},{}],2:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{}],3:[function(require,module,exports){
/*jshint node:true */

'use strict';

var isString = require('lodash.isstring');
var assert = require('assert-error');

module.exports = factory;

function factory(adapter) {
  var Impl = adapter.getInstance();

  function Decimal(x) {
    assert(this instanceof Decimal, new Error('Decimal must be called with new'));
    assert(isString(x), new TypeError('Expected a string but instead got ' + typeof x));

    var value = new Impl(adapter.parseInput(x));

    this.val = function val() {
      return value;
    };
  }

  Decimal.getPrecision = getPrecision;
  Decimal.setPrecision = setPrecision;
  Decimal.JSONReviver = JSONReviver;

  var p = Decimal.prototype;

  p.plus = function plus(x) {
    return newDecimalFromImpl(adapter.plus(this.val(), x.val()));
  };

  p.minus = function minus(x) {
    return newDecimalFromImpl(adapter.minus(this.val(), x.val()));
  };

  p.times = function times(x) {
    return newDecimalFromImpl(adapter.times(this.val(), x.val()));
  };

  p.div = function div(x) {
    return newDecimalFromImpl(adapter.div(this.val(), x.val()));
  };

  p.toString = p.toJSON = function toString() {
    return adapter.toString(this.val());
  };

  p.valueOf = function valueOf() {
    return adapter.valueOf(this.val());
  };

  function getPrecision() {
    return adapter.getPrecision(Impl);
  }

  function setPrecision(n) {
    adapter.setPrecision(Impl, n);
  }

  function JSONReviver(key, x) {
    if (key === '') {
      return x;
    }

    return new Decimal(x);
  }

  function newDecimalFromImpl(x) {
    return new Decimal(adapter.toString(x))
  }

  return Decimal;
}

},{"assert-error":1,"lodash.isstring":2}],4:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],5:[function(require,module,exports){
/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var isUndefined = require('lodash.isundefined');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var api = {};

  api.normalise = function normalise(x, scale) {
    if (isUndefined(scale)) {
      return x;
    }

    var scale0 = new Decimal(scale[0].toString());

    return Number(
      new Decimal(x.toString()).minus(scale0)
        .div(new Decimal(scale[1].toString()).minus(scale0))
    );
  };

  return api;
};

},{"linear-arbitrary-precision":3,"lodash.isundefined":4}],6:[function(require,module,exports){
/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var isUndefined = require('lodash.isundefined');
var normaliseFactory = require('normalise');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var normalise = normaliseFactory(adapter).normalise;
  var api = {};

  api.rescale = function rescale(x, oldScale, newScale) {
    if (isUndefined(newScale)) {
      return normalise(x, oldScale);
    }

    var newScale0 = new Decimal(newScale[0].toString());
    var oldScale0 = new Decimal(oldScale[0].toString());

    return Number(
      new Decimal(x.toString()).minus(oldScale0).times(new Decimal(newScale[1].toString()).minus(newScale0))
        .div(new Decimal(oldScale[1].toString()).minus(oldScale0)).plus(newScale0)
    );
  };

  return api;
};

},{"linear-arbitrary-precision":3,"lodash.isundefined":4,"normalise":5}],"linear-converter":[function(require,module,exports){
/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var rescaleFactory = require('rescale');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var rescale = rescaleFactory(adapter);
  var api = {};

  api.rescale = rescale;

  /**
   * Linearly converts x as described by a preset
   *
   * @param  {Number} x The number to be converted
   * @param  {Array} preset The preset that describes the conversion
   *
   * @return {Number} The converted x
   */
  api.convert = function convert(x, preset) {
    return rescale.rescale(x, preset[0], preset[1]);
  };

  /**
   * Inverts a preset to change the direction of the conversion
   *
   * @param {Array} preset The preset to invert
   *
   * @return {Array} The inverted preset
   */
  api.invertPreset = function invertPreset(preset) {
    return preset.slice(0).reverse();
  };

  /**
   * Composes two or more presets to create a single preset
   *
   * @param {Array} presets The array of the presets to compose
   *
   * @return {Array} The composed preset
   */
  api.composePresets = function composePresets(presets) {
    return presets.reduce(compose2presets);
  };

  /**
   * Calculates the a coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its a coefficient
   *
   * @return {Number} The coefficient a
   */
  api.getCoefficientA = function getCoefficientA(preset) {
    return Number(
      new Decimal(preset[1][1].toString()).minus(new Decimal(preset[1][0].toString()))
        .div(new Decimal(preset[0][1].toString()).minus(new Decimal(preset[0][0].toString())))
    );
  };

  /**
   * Calculates the b coefficient in the f(x) = ax + b function that describes
   * the given preset.
   *
   * @param {Array} preset The preset for which to calculate its b coefficient
   *
   * @return {Number} The coefficient b
   */
  api.getCoefficientB = function getCoefficientB(preset) {
    return rescale.rescale(0, preset[0], preset[1]);
  };

  /**
   * Composes two presets to create a single preset
   *
   * @param {Array} presetA The first preset to compose
   * @param {Array} presetB The second preset to compose
   *
   * @return {Array} The composed preset
   */
  function compose2presets(presetA, presetB) {
    return [
      presetA[0],
      presetA[1].map(function(x) {
        return rescale.rescale(x, presetB[0], presetB[1]);
      })
    ];
  }

  return api;
};

},{"linear-arbitrary-precision":3,"rescale":6}]},{},[]);
