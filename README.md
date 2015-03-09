# linear-converter

[![Build Status](https://travis-ci.org/javiercejudo/linear-converter.svg)](https://travis-ci.org/javiercejudo/linear-converter)

Flexible linear converter with built in conversions for common units

## Install

    npm i linear-converter

## Walk-through

```js
var converter = require('convert');

// main converter method

var convert = converter.convert;

// built-in presets for temperature, length, mass and more

var temp = converter.PRESETS.temperature;

convert(25, temp.celsiusToFahrenheit).should.be.exactly(77);

// easy inversion of presets

var invert = converter.invertPreset;

converter.convert(77, invert(temp.celsiusToFahrenheit)).should.be.exactly(25);

// convert presets any to any using inversion and composition

var compose = converter.composePresets;

var kelvinToFahrenheit = compose([
  invert(temp.celsiusToKelvin),
  temp.celsiusToFahrenheit
]);

converter.convert(293.15, kelvinToFahrenheit).should.be.exactly(68);
```

See [spec](test/spec.js).

See [all presets](src/presets.json).
