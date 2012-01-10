#!/bin/sh
#
#  OKZoom by OKFocus
#  http://okfoc.us // @okfocus
#  Copyright 2012 OKFocus
#  Licensed under the MIT License
#
# We minify using the Closure Compiler.
# http://code.google.com/closure/compiler/

java -jar ~/bin/closure/compiler.jar --js=okzoom-1.0.js --js_output_file=okzoom.min.js
cat PREAMBLE okzoom.min.js > okzoom-1.0.min.js

