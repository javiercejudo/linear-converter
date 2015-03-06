# linear-converter

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter.svg)](https://travis-ci.org/javiercejudo/linear-converter)

Flexible linear converter with built in conversions for common units

## Install

    npm i linear-converter

## Usage

```js
var converter = require('convert');

var celsiusToFahrenheit = converter.PRESETS.temperature.celsiusToFahrenheit;
var fahrenheitToCelsius = converter.invert(celsiusToFahrenheit);

converter.convert(25, celsiusToFahrenheit); // => 77
converter.convert(104, fahrenheitToCelsius); // => 40
```

See [spec](test/spec.js).
