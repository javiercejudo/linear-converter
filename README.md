# linear-converter

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter.svg)](https://travis-ci.org/javiercejudo/linear-converter)

Flexible linear converter with built in conversions for common units

## Install

    npm i linear-converter

## Basic usage

```js
var converter = require('convert');

converter.convert(25, converter.PRESETS.temperature.celsiusToFahrenheit); // => 77
```

## See more

- [walk-through](test/walk-through.js)
- [spec](test/spec.js)
- [all presets](src/presets.json)
