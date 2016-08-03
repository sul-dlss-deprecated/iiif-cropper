describe("InteractionEvent", function() {
  var InteractionEvent = require('../../src/interactionEvent.js')
  var evt = {}
  var canvas = { getBoundingClientRect: function() { return { top: 77, left: 88 } }}
  var ie = new InteractionEvent(evt, canvas);

  describe("dx/dy", function() {
    it("are zero when there is no previous event", function() {
      expect(ie.dx).toEqual(0);
      expect(ie.dy).toEqual(0);
    });
  })
});


