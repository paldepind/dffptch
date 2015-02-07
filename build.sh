#!/bin/bash

# Build global
cat ./wrappers/global-pre.js ./dffptch.js ./wrappers/global-post.js > ./dist/dffptch-global.js
cat ./dist/dffptch-global.js | uglifyjs -c -m > dist/dffptch-global.min.js

# Build CommonJS/Node
cat ./dffptch.js ./wrappers/commonjs-post.js > ./dist/dffptch-node.js

# Build AMD/Require.JS
cat ./wrappers/amd-pre.js ./dffptch.js ./wrappers/amd-post.js > ./dist/dffptch-amd.js
cat ./dist/dffptch-amd.js | uglifyjs -c -m > dist/dffptch-amd.min.js
