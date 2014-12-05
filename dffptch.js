// dffptch

(function (exports) {

function shortyMap(strings, // passed array
                   prev, // previously returned element
                   map, // the map
                   n, // new element to be returned
                   cutPos // string size counter
                   ) {
  map = {};
  strings.map(function(string) {
    for(cutPos = 1; (n = string.slice(0,cutPos++)) <= prev;);
    map[prev = n] = string;
  });
  return map;
}

var O = Object;
var keys = O.keys;

exports.diff = function diff(a, b) {
  var aKeys = keys(a).sort(),
      bKeys = keys(b).sort(),
      shorts = keys(shortyMap(aKeys)),
      delta = {}, adds = {}, mods = {}, dels = [], recurses = {},
      aI = 0, bI = 0;
  while(aKeys[aI] || bKeys[bI]) {
    var aKey = aKeys[aI], shortAKey = shorts[aI],
        bKey = bKeys[bI],
        aVal = a[aKey], bVal = b[bKey];
    if (aKey == bKey) {
      // modification
      if (O(aVal) === aVal && O(bVal) === bVal) {
        var rDelta = diff(aVal, bVal);
        if (keys(rDelta)) recurses[shortAKey] = rDelta;
      } else if (aVal !== bVal) {
        mods[shortAKey] = bVal;
      }
      aI++; bI++;
    } else if (aKey > bKey || !aKey) {
      // addition
      adds[bKey] = bVal;
      bI++;
    } else {
      // deletion
      dels.push(shortAKey);
      aI++;
    }
  }
  if (dels[0]) delta.d = dels;
  if (keys(adds)[0]) delta.a = adds;
  if (keys(mods)[0]) delta.m = mods;
  if (keys(recurses)[0]) delta.r = recurses;
  return delta;
};

exports.patch = function patch(obj, delta) {
  var map = shortyMap(keys(obj).sort());
  // handle additions
  keys(delta.a || {}).map(function(key) {
    obj[key] = delta.a[key];
  });
  // handle modifications
  keys(delta.m || {}).map(function(key) {
    obj[map[key]] = delta.m[key];
  });
  // handle deletions
  (delta.d || []).map(function(key) {
    delete obj[map[key]];
  });
  // recurse
  keys((delta.r || {})).map(function(key) {
    patch(obj[map[key]], delta.r[key]);
  });
};

}(this.dffptch = {}));
