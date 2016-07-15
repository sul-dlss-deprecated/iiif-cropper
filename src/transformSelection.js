'use strict';

var IiifRegion = require('./iiifRegion.js')

var TransformSelection = function(osdCanvas) {
  this.osdCanvas = osdCanvas;
}

TransformSelection.prototype = {
  // Transform a web coordinate into an image coordinate
  coordinateForPixel: function(x, y) {
    var pixel = new OpenSeadragon.Point(x, y);
    var view_point = this.osdCanvas.viewport.pointFromPixel(pixel);
    var image_point = this.osdCanvas.viewport.viewportToImageCoordinates(view_point)
    // For some reason these points are floats. Convert to ints:
    return { x: Math.round(image_point.x), y: Math.round(image_point.y) }
  },

  // Map a rectangle defined in web coordinates to image coordinates
  toImageRegion: function(selection) {
    var x = Math.round(selection.left);
    var y = Math.round(selection.top);
    var top_left = this.coordinateForPixel(x, y);
    var bottom_right = this.coordinateForPixel(selection.right, selection.bottom);

    return new IiifRegion({ x:           top_left.x,
                            y:           top_left.y,
                            height:      bottom_right.y - top_left.y,
                            width:       bottom_right.x - top_left.x,
                            serviceBase: this.osdCanvas.source['@id']
                           });
  },

  pixelForCoordinate: function(x, y) {
    var view_coord = this.osdCanvas.viewport.imageToViewportCoordinates(x, y);
    return this.osdCanvas.viewport.pixelFromPoint(view_coord);
  },

  // Map a rectangle defined in image coordinates to web coordinates
  // TODO Should this return a Selection instance?
  fromImageRegion: function(image_region) {
    var x1 = image_region.x;
    var y1 = image_region.y;
    var x2 = image_region.x + image_region.width;
    var y2 = image_region.y + image_region.height;
    var top_left = this.pixelForCoordinate(x1, y1)
    var bottom_right = this.pixelForCoordinate(x2, y2)
    return { left:      top_left.x,
             top:      top_left.y,
             bottom: bottom_right.y,
             right:  bottom_right.x,
           };
  }
}

module.exports = TransformSelection;
