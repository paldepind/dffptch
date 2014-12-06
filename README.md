dffptch.js
==========
A micro library for diffing and patching JSON objects using a compact diff format.

Why
---
The author of dffptch.js needed a library for generating diffs clientside in
order to send just those instead of entire modified JSON objects to a
backend. But all the libraries he chould find was way too complex and/or didn't
generate diffs that he found compact and space saving enough.

Features
--------
* __Does what you expect__ – Handles all types of changes. Added, modified and
  deleted properties. Nested objects and arrays included.
* __Compact one way diffs__ – No needles verbosity. When possible
  property names are shortened while still remaining unambiguous.
* __Performant__ – Sane choices of algorithms. For instance, when generating
  the delta the keys of the old and new object are sorted, and then all changes
  are found in a single pass over both objects at the same time.
* __Very small__ – Too many huge libraries claim to be lightweight! This one is
  not among them. By having a tight focus on its targeted use case and a
  carefull implementation dffptch.js is < 800B minified. Gzipped it's < 500KB.
* __Readable source code__ – Well commented and less than 70 sloc. It's
  slightly golfed but thanks to UglifyJS2 it can be kept to a minimum. 
