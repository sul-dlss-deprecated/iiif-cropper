'use strict';
var hasClass = require('./hasClass');

var Resize = function(state, currentDragHandle, settings) {
  function getActiveEdges(handle) {
    var edges = { top: false, left: false, bottom: false, right: false }
    if (hasClass(handle, 'iiif-crop-top-drag-handle')) {
      edges.top = true
    } else if (hasClass(handle, 'iiif-crop-right-drag-handle')) {
      edges.right = true
    } else if (hasClass(handle, 'iiif-crop-bottom-drag-handle')) {
      edges.bottom = true
    } else if (hasClass(handle, 'iiif-crop-left-drag-handle')) {
      edges.left = true
    } else if (hasClass(handle, 'iiif-crop-top-left-drag-node')) {
      edges.left = true
      edges.top = true
    } else if (hasClass(handle, 'iiif-crop-top-right-drag-node')) {
      edges.right = true
      edges.top = true
    } else if (hasClass(handle, 'iiif-crop-bottom-right-drag-node')) {
      edges.right = true
      edges.bottom = true
    } else if (hasClass(handle, 'iiif-crop-bottom-left-drag-node')) {
      edges.left = true
      edges.bottom = true
    }
    return edges
  }

  this.originalEdges = getActiveEdges(currentDragHandle)
  this.startAspectRatio = state.getWidth() / state.getHeight()
  this.aspectRatioLocked = settings.aspectRatioLocked
  this.state = state
}

Resize.prototype = {
  move: function(interactionEvent) {
    var newState = {}

    var dy = interactionEvent.dy
    var dx = interactionEvent.dx
    var activeEdges = { top: this.originalEdges.top,
                        right: this.originalEdges.right,
                        left: this.originalEdges.left,
                        bottom: this.originalEdges.bottom };

    if (this.aspectRatioLocked) {
      if (this.originalEdges.left && this.originalEdges.top) {
        dx = dy * this.startAspectRatio;
      } else if (this.originalEdges.right && this.originalEdges.top) {
        dx = -dy * this.startAspectRatio;
      } else if (this.originalEdges.left) {
        activeEdges.bottom = true
        dy = -dx / this.startAspectRatio;
      } else if (this.originalEdges.right) {
        activeEdges.bottom = true
        dy = dx / this.startAspectRatio;
      } else if (this.originalEdges.top) {
        activeEdges.right = true
        dx = -dy * this.startAspectRatio;
      } else if (this.originalEdges.bottom) {
        activeEdges.right = true
        dx = dy * this.startAspectRatio;
      }
    }

    if (activeEdges.top)
      newState.top = this.state.top - dy
    if (activeEdges.right)
      newState.right = this.state.right - dx
    if (activeEdges.left)
      newState.left = this.state.left - dx
    if (activeEdges.bottom)
      newState.bottom = this.state.bottom - dy

    this.state.update(newState)
  }
}

module.exports = Resize;
