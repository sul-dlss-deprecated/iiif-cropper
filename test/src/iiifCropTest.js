describe("iiifCrop API Layer (and DOM rendering)", function() {
  var osd;
  beforeEach(function () {
    var HTMLElements = {};
    spyOn(document, 'getElementById').and.callFake(function(ID) {
       if(!HTMLElements[ID]) {
          var newElement = document.createElement('div');
          HTMLElements[ID] = newElement;
       }
       return HTMLElements[ID];
    });

    var IiifCrop = require('../../src/iiifCrop.js');
    var OpenSeadragon = require('../../node_modules/openseadragon/build/openseadragon/openseadragon.min.js')
    OpenSeadragon.Viewer.prototype.iiifCrop = IiifCrop;
    osd = new OpenSeadragon({ id: 'osdCanvas1',
                                  showNavigationControl: false });
    osd.iiifCrop();
  });

  describe("getTransformer", function() {
    it("passes the canvas to the transformer", function() {
      expect(osd.cropper.getTransformer().osdCanvas).toEqual(osd)
    });
  });

  describe("getIiifSelection", function() {
    var transformer = { toImageRegion: function(region) { } }

    beforeEach(function () {
      spyOn(transformer, 'toImageRegion')
      spyOn(osd.cropper, 'getTransformer').and.returnValue(transformer)
    });

    it("passes the canvas to the transformer", function() {
      osd.cropper.getIiifSelection()
      expect(transformer.toImageRegion).toHaveBeenCalled()
    });
  });
});
