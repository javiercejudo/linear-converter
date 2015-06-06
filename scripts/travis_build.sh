#!/bin/bash

set -e

gulp test

if [ "$TRAVIS_NODE_VERSION" = "iojs" ]; then
  if [ "$SAUCE_ACCESS_KEY" ]; then
    BROWSERS=$SL_BROWSERS
  else
    BROWSERS=PhantomJS
  fi

  echo -e '\nO_o Browser tests with floating-point numbers'
  ARBITRARY_PRECISION=false ./node_modules/karma/bin/karma start --single-run --browsers $BROWSERS

  echo -e '\nO_o Browser tests with arbitrary precision'
  ARBITRARY_PRECISION=true  ./node_modules/karma/bin/karma start --single-run --browsers $BROWSERS
fi
