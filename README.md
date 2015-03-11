# linear-converter

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter.svg)](https://travis-ci.org/javiercejudo/linear-converter)

Flexible linear converter with built in conversions for common units

## Install

    npm i linear-converter

## Basic usage

```js
var lc = require('linear-converter');

lc.convert(25, lc.PRESETS.temperature.celsiusToFahrenheit); // => 77
```

## Custom conversions

Custom conversion are easily achieved by passing an array with 2 scales, each
of those an array with 2 values. For example `[[0, 1], [0, 2]]` means that 0 and
1 in the first scale map respectively to 0 and 2 in the second scale; in short,
it multiplies by 2. Any linear function can be described in this way. The
previous example is equivalent to `[[-50, 4], [-100, 8]]`. More examples:

```js
// f(x) = 3x;
lc.convert(5, [[0, 1/3], [0, 1]]); // => 15

f(x) = -πx - 42;
lc.convert(-42/Math.PI, [[-1, 1], [Math.PI - 42, -Math.PI - 42]]); // => ~0 (4.973799150320701e-14)
```

In general, `f(x) = ax + b` can be described in ways such as:

```js
lc.convert(x, [[0, 1], [b, a + b]]); // => f(x)
lc.convert(x, [[Math.sqrt(a), -b/a], [b, 0]]); // => f(x)
```

## See more

- [walk-through](test/walk-through.js)
- [spec](test/spec.js)
- [all presets](src/presets.json)
