'use strict';

var ee = require('event-emitter');

var IiifRegion = function(options, dispatcher) {
  this.serviceBase = options.serviceBase;
  this.x = 0 || options.x;
  this.y = 0 || options.y;
  this.width = 0 || options.width;
  this.height = 0 || options.height;
};

// The purpose of this component is to
// extract a IIIF url for a cropped
// region of an image, from an OpenSeadragon
// instance.

// So the core data structure is just the region
// selected. The region must be able to be
// be retrieved as a url with a specified
// size, rotation, etc.

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

IiifRegion.prototype = {
  x: function() {}, // getter/setter
  y: function() {}, // getter/setter
  width: function() {}, // getter/setter
  height: function() {},

  getRegion: function() {
    return [this.x, this.y, this.width, this.height];
  },

  getUrl: function(opts) {
    opts = opts || {};
    var rotation = opts.rotation || 0;
    var scale = opts.scale || 'full';
    var quality = opts.quality || 'default';
    var format = opts.format || 'jpg';
    return this.serviceBase + '/' + this.getRegion() + '/' + scale + '/' + rotation + '/' + quality + '.' + format;
  }
};

module.exports = IiifRegion;
