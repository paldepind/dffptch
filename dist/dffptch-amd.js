define(function () {
  var exports = {};

// dffptch

var O = Object; // Our own binding to Object – global objects can't be minified
var keys = O.keys; // Same for keys, we use this funcion quite a bit

exports.diff = function diff(a, b) {
  var aKeys = keys(a).sort(),
      bKeys = keys(b).sort(),
      delta = {}, adds = {}, mods = {}, dels = [], recurses = {},
      aI = 0, bI = 0;
  while(aKeys[aI] || bKeys[bI]) {
    var aKey = aKeys[aI], shortAKey = String.fromCharCode(aI+48),
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
  var operation, key, val, longKey, objKeys = keys(obj).sort();
  for (operation in delta) {
    for (key in delta[operation]) {
      val = delta[operation][key];
      longKey = objKeys[(operation != 'd' ? key : val).charCodeAt()-48];
      operation == 'a' ? obj[key] = val : // addition
      operation == 'm' ? obj[longKey] = val : // modification
      operation == 'd' ? delete obj[longKey] : // deletion
                        patch(obj[longKey], val); // recuse
    }
  }
};

  return exports;
});
