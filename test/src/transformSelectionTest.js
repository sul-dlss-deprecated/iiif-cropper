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
  }

  var osdCanvas = { viewport: viewport, source: { '@id': 'http://example.com/foo/id' } };

  var transformer = new TransformSelection(osdCanvas);
  var selection = new Selection({ x: 5, y: 6, width: 10, height: 20 });

  it("transforms coordinates", function() {
    var region = transformer.toImageRegion(selection)
    expect(region.getUrl()).toEqual('http://example.com/foo/id/10,12,20,40/full/0/default.jpg');
  });
});
