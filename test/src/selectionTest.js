describe("Selection", function() {
  var Selection = require('../../src/selection.js')
  var selection = new Selection({ left: 5, top: 6, right: 15, bottom: 26 });

  describe("update", function() {
    it("can update to zero", function() {
      selection.update({ left: 5, top: 0, right: 15, bottom: 26 })
      expect(selection.top).toEqual(0);
    });
  })
});

