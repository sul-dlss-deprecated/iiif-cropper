'use strict';

var Selection = function(options, dispatcher) {
  this.top = 0 || options.top;
  this.left = 0 || options.left;
  this.right = 0 || options.right;
  this.bottom = 0 || options.bottom;
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
    if (typeof options.left !== 'undefined')
      this.left = options.left;
    if (typeof options.top !== 'undefined')
      this.top = options.top;
    if (typeof options.right !== 'undefined')
      this.right = options.right;
    if (typeof options.bottom !== 'undefined')
      this.bottom = options.bottom;
  },
  getWidth: function () {
    return this.right - this.left;
  },
  getHeight: function () {
    return this.bottom - this.top;
  }
};

module.exports = Selection;
