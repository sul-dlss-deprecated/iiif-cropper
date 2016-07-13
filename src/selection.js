'use strict';

var Selection = function(options, dispatcher) {
  this.x = 0 || options.x;
  this.y = 0 || options.y;
  this.width = 0 || options.width;
  this.height = 0 || options.height;
  this.enabled = options.enabled;
  // aspectRatioLocked
};

// This models the selected region.

// When the region is updated, the dom
// element representing the selection
// must be updated.

// There are 8 ways to transform the selection
// through the UI, and 9 ways to transform
// the selection total (sizing).

// The programmer must be able to listen for
// changes in the dimensions, the creation
// of the region, and the cancelation of
// the region.

Selection.prototype = {
  x: function() {}, // getter/setter
  y: function() {}, // getter/setter
  width: function() {}, // getter/setter
  height: function() {},
  getRegion: function() {
    return this.x + ',' + this.y + ',' + this.width + ',' + this.height;
  },
};

module.exports = Selection;
