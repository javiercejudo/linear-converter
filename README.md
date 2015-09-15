# linear-converter

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter.svg)](https://travis-ci.org/javiercejudo/linear-converter)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/linear-converter/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/linear-converter?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/linear-converter/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/linear-converter)
[![Inline docs](http://inch-ci.org/github/javiercejudo/linear-converter.svg?branch=master)](http://inch-ci.org/github/javiercejudo/linear-converter)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/linear-converter.svg)](https://saucelabs.com/u/linear-converter)

Flexible linear converter

## Table of contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Preset inversion](#preset-inversion)
- [Presets composition](#presets-composition)
- [Custom conversions](#custom-conversions)
- [Coefficients](#coefficients)
- [Preset equivalence](#preset-equivalence)
- [Arbitrary precision](#arbitrary-precision)
- [Currying](#currying)
- [See more](#see-more)
- [Related projects](#related-projects)

## Installation

### npm

    npm i linear-converter

### Bower

    bower install linear-converter

To use it in the browser, include the following on your site:

```js
<script src="bower_components/linear-converter/dist/linear-converter.min.js"></script>
```

## Basic usage

*linear-converter* uses [arbitrary-precision](https://github.com/javiercejudo/arbitrary-precision)
to support arbitrary precision. See [all available adapters](https://www.npmjs.com/browse/keyword/arbitrary-precision-adapter).

```js
var Decimal = require('arbitrary-precision')(require('floating-adapter'));
var lc = require('linear-converter')(Decimal);

var temp = require('linear-presets').PRESETS.temperature;

lc.convert(temp.celsiusToFahrenheit, 25); // => new Decimal('77')

// also accepts Decimals
lc.convert(temp.celsiusToFahrenheit, new Decimal('25'));
```

For a quick interactive intro, see [CodePen example](http://codepen.io/javiercejudo/pen/PwvePd?editors=101).

Variants:

- [linear-converter-to-go](https://github.com/javiercejudo/linear-converter-to-go): opinionated, zero-configuration version with floating point precision and built-in conversion presets.
- [linear-conversion](https://github.com/javiercejudo/linear-conversion): if you prefer the object-oriented paradigm.
- [linear-converter-cli](https://github.com/javiercejudo/linear-converter-cli): for CLI use.

## Preset inversion

```js
var fahrenheitToCelsius = lc.invertPreset(temp.celsiusToFahrenheit);

lc.convert(fahrenheitToCelsius, 77); // => 25 (as decimal)
```

## Presets composition

```js
var kelvinToFahrenheit = lc.composePresets(
  lc.invertPreset(temp.celsiusToKelvin),
  temp.celsiusToFahrenheit
);

lc.convert(kelvinToFahrenheit, 293.15); // => 68 (as decimal)
```

## Custom conversions

Custom conversions are easily achieved by passing an array with 2 scales, each
of those an array with 2 values. For example, **[[0, 1], [0, 2]]** means that 0 and
1 in the first scale map to 0 and 2 in the second scale respectively; in short,
it multiplies by 2. Any linear conversion can be described that way:

```js
// f(x) = ax + b
lc.convert([[0, 1], [b, a+b]], x); // => ax + b
lc.convert([[1/a, -b/a], [b+1, 0]], x); // => ax + b
```

For an arbitrary f(_x_) = _ax + b_, any [[_x<sub>1</sub>_, _x<sub>2</sub>_], [f(_x<sub>1</sub>_), f(_x<sub>2</sub>_)]] is a valid preset.

More examples:

```js
// degrees to radians
lc.convert([[0, 180], [0, Math.PI]], 240); // => 4 * Math.PI / 3

// f(x) = 3x
lc.convert([[0, 1/3], [0, 1]], 5); // => 15

// f(x) = -2x - 46
lc.convert([[0, 1], [-46, -48]], -23); // => 0
```

## Coefficients

Creating presets from a given function is trivial; to find the function from a given preset, two methods are provided: `getCoefficientA` and `getCoefficientB`.

```js
// f(x) = 2x + 1
lc.getCoefficientA([[0, 1], [1, 3]]); // => 2
lc.getCoefficientB([[0, 1], [1, 3]]); // => 1

// f(x) = ax + b
lc.getCoefficientA([[x1, x2], [f(x1), f(x2)]]); // => a
lc.getCoefficientB([[x1, x2], [f(x1), f(x2)]]); // => b
```

## Preset equivalence

```js
// f(x) = -3x + 6
lc.equivalentPresets(
  [[1, 5], [3, -9]],
  [[-1, 100], [9, -294]]
); // => true

lc.equivalentPresets(
  [[0, 1], [0, 2]], // f(x) = 2x
  [[0, 1], [0, 3]]  // f(x) = 3x
); // => false
```

## Arbitrary precision

Arbitrary precision support is provided via [arbitrary-precision](https://github.com/javiercejudo/arbitrary-precision).
See [all available adapters](https://www.npmjs.com/browse/keyword/arbitrary-precision-adapter).

```js
// without arbitrary precision (very lightweight)
var Decimal = require('arbitrary-precision')(require('floating-adapter'));
var lc = require('linear-converter')(Decimal);

lc.getCoefficientA([[0, 0.1], [0.1, 0.3]]); // => 1.9999999999999998

// with arbitrary precision
var Decimal = require('arbitrary-precision')(require('bigjs-adapter'));
var lc = require('linear-converter')(Decimal);

lc.getCoefficientA([[0, 0.1], [0.1, 0.3]]); // => 2
```

See [CodePen example](http://codepen.io/javiercejudo/pen/WvEWdQ?editors=101).

## Currying

The `convert` function is designed to play nicely with currying:

```js
var curry = require('lodash.curry');

var curriedConvert = curry(lc.convert);

var celsiusToFahrenheit = curriedConvert(temp.celsiusToFahrenheit);
var fahrenheitToCelsius = curriedConvert(lc.invertPreset(temp.celsiusToFahrenheit));

celsiusToFahrenheit(25); // => new Decimal('77')
fahrenheitToCelsius(77); // => new Decimal('25')
```

See [CodePen example](http://codepen.io/javiercejudo/pen/wKKbLV?editors=101).

## See more

- [spec](test/iojs/spec.js)
- [all presets](https://github.com/javiercejudo/linear-presets#presets)

## Related projects

- [linear-conversion](https://github.com/javiercejudo/linear-conversion): linear conversion class for linear-converter.
- [linear-converter-cli](https://github.com/javiercejudo/linear-converter-cli): CLI for linear-converter.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
