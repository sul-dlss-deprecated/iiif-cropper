'use strict';

var ee = require('event-emitter');

var IiifRegion = function(options, dispatcher) {
  this.serviceBase = options.serviceBase;
  this.x = 0 || options.x;
  this.y = 0 || options.y;
  this.width = 0 || options.width;
  this.height = 0 || options.height;
  this.rotation = 0 || options.rotation;
  this.scale = options.scale;
  this.quality = options.quality;
  // aspectRatioLocked

  // var url = serviceBase + '/' + identifier + '/' + x + y + width + height + size + mirroring + rotation + quality + '.jpg';
};

// The whole point of this component is to
// be able to extract a iiif url for a cropped
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
  objectFromUrl: function() {},
  tilesourceFromInfoJson: function() {},
  urlFromObject: function() {},
  x: function() {}, // getter/setter
  y: function() {}, // getter/setter
  width: function() {}, // getter/setter
  height: function() {}, // getter/setter
  size: function() {} // getter/setter
};

module.exports = IiifRegion;
