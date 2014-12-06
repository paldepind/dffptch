#!/bin/bash

# Build global
cat ./wrappers/global-pre.js ./dffptch.js ./wrappers/global-post.js > ./dist/dffptch-global.js
cat ./dist/dffptch-global.js | uglifyjs -c -m > dist/dffptch-global.min.js

# 'Build' CommonJS/Node
cp ./dffptch.js ./dist/dffptch-node.js
# uglifyjs ./dffptch.js -c -m toplevel -r exports > dist/dffptch-node.min.js

# Build AMD/Require.JS
cat ./wrappers/amd-pre.js ./dffptch.js ./wrappers/amd-post.js > ./dist/dffptch-amd.js
cat ./dist/dffptch-amd.js | uglifyjs -c -m > dist/dffptch-amd.min.js
