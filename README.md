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

Custom conversions are easily achieved by passing an array with 2 scales, each
of those an array with 2 values. For example, `[[0, 1], [0, 2]]` means that 0 and
1 in the first scale map to 0 and 2 in the second scale respectively; in short,
it multiplies by 2. Any linear function can be described that way:

```js
lc.convert(x, [[0, 1], [b, a + b]]); // => ax + b
lc.convert(x, [[Math.sqrt(a), -b/a], [b, 0]]); // => ax + b
```

More examples:

```js
// degrees to radians
lc.convert(240, [[0, 180], [0, Math.Pi]]); // => 4.1887902047863905 === 4 * Math.PI / 3

// f(x) = 3x;
lc.convert(5, [[0, 1/3], [0, 1]]); // => 15

// f(x) = -2x - 46;
lc.convert(-23, [[0, 1], [-46, -48]]); // => 0
```

## See more

- [walk-through](test/walk-through.js)
- [spec](test/spec.js)
- [all presets](src/presets.json)
