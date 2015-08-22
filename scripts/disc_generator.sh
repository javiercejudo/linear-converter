#!/bin/bash

BUNDLE=tmp/bundle.js
BUNDLE_MIN=tmp/bundle.min.js
DISC=tmp/disc.html
DISC_MIN=tmp/disc.min.html
NODE_BIN=node_modules/.bin

browserify --full-paths src/linear-converter.js > $BUNDLE
cat $BUNDLE | uglifyjs > $BUNDLE_MIN

echo -e '\nO_o Generating discs'
$NODE_BIN/discify $BUNDLE > $DISC
$NODE_BIN/discify $BUNDLE_MIN > $DISC_MIN
