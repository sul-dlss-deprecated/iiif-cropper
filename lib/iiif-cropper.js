!function(global) {
  'use strict';

  var previousFancyInput = global.FancyInput;

  function IiifCropper(options) {
    this.options = options || {};
  }

  IiifCropper.noConflict = function noConflict() {
    global.IiifCropper = previousFancyInput;
    return IiifCropper;
  };

  global.IiifCropper = IiifCropper;
}(this);
