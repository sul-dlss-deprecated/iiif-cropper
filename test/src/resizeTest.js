describe("Resize", function() {
  var Resize = require('../../src/resize.js');
  var Selection = require('../../src/selection.js');
  var state;
  var settings = { }
  var resize;
  var interaction = { dx: 8, dy: 5 }

  describe("move", function() {
    beforeEach(function () {
      state = new Selection({ top: 100, bottom: 200, left: 50, right: 75 })
    });

    describe("free select", function() {
      describe("the top", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-top-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 95, left: 50, right: 75, bottom: 200 })
        });
      });

      describe("the bottom", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-bottom-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 50, right: 75, bottom: 195 })
        });
      });

      describe("the left", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-left-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 42, right: 75, bottom: 200 })
        });
      });

      describe("the right", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-right-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 50, right: 67, bottom: 200 })
        });
      });
    });

    describe("locked aspect ratio", function() {
      beforeEach(function() {
        settings = { aspectRatioLocked: true };
      });

      describe("the top", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-top-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 95, left: 50, right: 76.25, bottom: 200 })
        });
      });

      describe("the bottom", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-bottom-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 50, right: 73.75, bottom: 195 })
        });
      });

      describe("the left", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-left-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 42, right: 75, bottom: 232 })
        });
      });

      describe("the right", function() {
        beforeEach(function () {
          var currentDragHandle = { className: 'iiif-crop-right-drag-handle' };
          resize = new Resize(state, currentDragHandle, settings);
        });

        it("updates the state", function() {
          resize.move(interaction);
          expect(state).toEqual({ top: 100, left: 50, right: 67, bottom: 168 })
        });
      });
    });

  });
});
