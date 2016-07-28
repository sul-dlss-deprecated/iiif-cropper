'use strict';

var InteractionEvent = function(event, canvas, prevInteraction) {
  this.mousePosition = {
    x: event.clientX - canvas.getBoundingClientRect().left,
    y: event.clientY - canvas.getBoundingClientRect().top
  };

  if (typeof(prevInteraction) !== 'undefined') {
    // copying prevInteraction.mousePosition here so that we don't hold a
    // reference to prevInteraction which could lead to a memory leak
    this.dx = prevInteraction.mousePosition.x - this.mousePosition.x;
    this.dy = prevInteraction.mousePosition.y - this.mousePosition.y;
  }
};

InteractionEvent.prototype = {
  hasMoved: function() {
    return typeof(this.dx) !== 'undefined';
  }
};

module.exports = InteractionEvent;
