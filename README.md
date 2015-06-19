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
- [Arbitrary precision](#arbitrary-precision)
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

```js
var PRESETS = require('linear-presets').PRESETS;
var lc = require('linear-converter');

lc.convert(25, PRESETS.temperature.celsiusToFahrenheit); // => 77
```

See [CodePen example](http://codepen.io/javiercejudo/pen/PwvePd?editors=101) for a quick interactive intro.

For CLI use, see [linear-converter-cli](https://github.com/javiercejudo/linear-converter-cli).

## Preset inversion

```js
var fahrenheitToCelsius = lc.invertPreset(PRESETS.temperature.celsiusToFahrenheit);

lc.convert(77, fahrenheitToCelsius); // => 25
```

## Presets composition

```js
var kelvinToFahrenheit = lc.composePresets([
  lc.invertPreset(PRESETS.temperature.celsiusToKelvin),
  PRESETS.temperature.celsiusToFahrenheit
]);

lc.convert(293.15, kelvinToFahrenheit); // => 68
```

## Custom conversions

Custom conversions are easily achieved by passing an array with 2 scales, each
of those an array with 2 values. For example, **[[0, 1], [0, 2]]** means that 0 and
1 in the first scale map to 0 and 2 in the second scale respectively; in short,
it multiplies by 2. Any linear conversion can be described that way:

```js
// f(x) = ax + b
lc.convert(x, [[0, 1], [b, a+b]]); // => ax + b
lc.convert(x, [[1/a, -b/a], [b+1, 0]]); // => ax + b
```

For an arbitrary f(_x_) = _ax + b_, any [[_x<sub>1</sub>_, _x<sub>2</sub>_], [f(_x<sub>1</sub>_), f(_x<sub>2</sub>_)]] is a valid preset.

More examples:

```js
// degrees to radians
lc.convert(240, [[0, 180], [0, Math.PI]]); // => 4 * Math.PI / 3

// f(x) = 3x
lc.convert(5, [[0, 1/3], [0, 1]]); // => 15

// f(x) = -2x - 46
lc.convert(-23, [[0, 1], [-46, -48]]); // => 0
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

## Arbitrary precision

By default, *linear-converter* works with native floating-point numbers.
However, it will work with arbitrary precision if
[big.js](https://github.com/MikeMcl/big.js) is available;

```js
// without big.js
lc.getCoefficientA([[0, 0.1], [0.1, 0.3]]); // => 1.9999999999999998

// with big.js
lc.getCoefficientA([[0, 0.1], [0.1, 0.3]]); // => 2
```

In the browser, you will need to generate a bundled *big.js* package by
running the following command:

    browserify -r node_modules/big.js/big.js:big.js > browserified-big.js

Alternatively, grab it from https://wzrd.in/bundle/big.js.

Then simply include that file before *linear-converter*.

## See more

- [spec](test/iojs/spec.js)
- [all presets](https://github.com/javiercejudo/linear-presets/blob/master/data/presets.json)

## Related projects

- [linear-converter-cli](https://github.com/javiercejudo/linear-converter-cli): CLI for linear-converter.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
- [rescale-arbitrary-precision](https://github.com/javiercejudo/rescale-arbitrary-precision): arbitrary precision for rescale.
