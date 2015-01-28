#!/bin/sh
#
#  OKZoom by OKFocus
#  http://okfoc.us // @okfocus
#  Copyright 2012 OKFocus
#  Licensed under the MIT License
#
# Minify using uglify

uglify -s okzoom.js -o okzoom.ugly.js
cat PREAMBLE okzoom.ugly.js > okzoom.min.js
rm okzoom.ugly.js


