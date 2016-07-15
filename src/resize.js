'use strict';
var hasClass = require('./hasClass');

var Resize = function(state, currentDragHandle) {
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

  this.activeEdges = getActiveEdges(currentDragHandle)
  this.state = state
}

Resize.prototype = {
  move: function(mousePosition) {
    var newState = {}
    if (this.activeEdges.top)
      newState.top = mousePosition.y
    if (this.activeEdges.right)
      newState.right = mousePosition.x
    if (this.activeEdges.left)
      newState.left = mousePosition.x
    if (this.activeEdges.bottom)
      newState.bottom = mousePosition.y
    this.state.update(newState)
  }
}

module.exports = Resize;
