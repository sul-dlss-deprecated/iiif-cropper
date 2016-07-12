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

  toImageRegion: function(selection) {
    var x = Math.round(selection.x);
    var y = Math.round(selection.y);
    var top_left = this.coordinateForPixel(x, y);
    var bottom_right = this.coordinateForPixel(x + selection.width, y + selection.height);

    return new IiifRegion({ x:           top_left.x,
                            y:           top_left.y,
                            height:      bottom_right.y - top_left.y,
                            width:       bottom_right.x - top_left.x,
                            serviceBase: this.osdCanvas.source['@id']
                           });
  }
}

module.exports = TransformSelection;
