#!/bin/bash

BUNDLE=tmp/bundle.js
BUNDLE_MIN=tmp/bundle.min.js
DISC=tmp/disc.html
DISC_MIN=tmp/disc.min.html

browserify --full-paths src/linear-converter.js > $BUNDLE
cat $BUNDLE | uglifyjs > $BUNDLE_MIN

discify $BUNDLE > $DISC
discify $BUNDLE_MIN > $DISC_MIN
