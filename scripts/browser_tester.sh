#!/bin/bash

set -e

BROWSERS=PhantomJS

if [[ "$TRAVIS_NODE_VERSION" = "4" && "$SAUCE_ACCESS_KEY" ]]; then
  BROWSERS=$SL_BROWSERS
fi

echo -e '\nO_o Browser tests'
echo -e '\nO_o Preparing...'
gulp dev

echo -e '\nO_o Running browser tests...'
karma start --single-run --browsers $BROWSERS
