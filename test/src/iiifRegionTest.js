describe("iiifRegion Object", function() {
  var IiifRegion = require('../../src/iiifRegion.js');
  var region = new IiifRegion({ serviceBase: 'http://example.com/images/1',
                                x: 100,
                                y: 150,
                                height: 200,
                                width: 250
                              });

  describe("getUrl", function() {
    it("has full size when no argument is passed", function() {
      expect(region.getUrl()).toEqual('http://example.com/images/1/100,150,250,200/full/0/default.jpg');
    });

    it("uses scale when it's passed", function() {
      expect(region.getUrl({ scale: '600,' })).toEqual('http://example.com/images/1/100,150,250,200/600,/0/default.jpg');
    });
  });
});
