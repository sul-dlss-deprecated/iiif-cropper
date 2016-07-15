'use strict';

var Selection = function(options, dispatcher) {
  this.top = 0 || options.top;
  this.left = 0 || options.left;
  this.right = 0 || options.right;
  this.bottom = 0 || options.bottom;
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
  top: function() {}, // getter/setter
  left: function() {}, // getter/setter
  right: function() {}, // getter/setter
  bottom: function() {},
  update: function(options) {
    this.top = options.top;
    this.left = options.left;
    this.bottom = options.bottom;
    this.right = options.right;
  },
  getWidth: function () {
    return this.right - this.left;
  },
  getHeight: function () {
    return this.bottom - this.top;
  }
};

module.exports = Selection;
