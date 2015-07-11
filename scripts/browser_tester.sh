#!/bin/bash

set -e

if [ "$TRAVIS_NODE_VERSION" = "iojs" ]; then
  if [ "$SAUCE_ACCESS_KEY" ]; then
    BROWSERS=$SL_BROWSERS
  else
    BROWSERS=PhantomJS
  fi

  echo -e '\nO_o Browser tests'
  ./node_modules/karma/bin/karma start --single-run --browsers $BROWSERS
fi
