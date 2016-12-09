describe("TransformSelection", function() {
  var TransformSelection = require('../../src/transformSelection.js')
  var Selection = require('../../src/selection.js')
  var viewport = {
    pointFromPixel: function(pixel) {
      return pixel;
    },
    viewportToImageCoordinates: function(pixel) {
      return { x: pixel.x * 2, y: pixel.y * 2 };
    },
    pixelFromPoint: function(pixel) {
      return pixel;
    },
    imageToViewportCoordinates: function(x, y) {
      return { x: x / 2, y: y / 2 };
    },
  }

  var osdCanvas = { viewport: viewport, source: { '@id': 'http://example.com/foo/id' } };

  var transformer = new TransformSelection(osdCanvas);
  var selection = new Selection({ left: 5, top: 6, right: 15, bottom: 26 });
  var negativeSelection = new Selection({ left: 15, top: 26, right: 5, bottom: 6 });

  describe("toImageRegion", function() {
    it("transforms coordinates", function() {
      var region = transformer.toImageRegion(selection)
      expect(region.getUrl()).toEqual('http://example.com/foo/id/10,12,20,40/full/0/default.jpg');
    });

    it("does not allow for selection heights or widths less that 1", function() {
      var region = transformer.toImageRegion(negativeSelection);
      expect(region.getUrl()).toEqual('http://example.com/foo/id/30,52,1,1/full/0/default.jpg')
    });
  })

  describe("fromImageRegion", function() {
    var region = { x: 10, y: 12, width: 20, height: 40 }
    it("transforms coordinates", function() {
      var selection = transformer.fromImageRegion(region)
      expect(selection.left).toEqual(5);
      expect(selection.top).toEqual(6);
      expect(selection.right).toEqual(15);
      expect(selection.bottom).toEqual(26);
    });
  })
});
