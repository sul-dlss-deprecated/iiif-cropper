'use strict';
var Move = function(state) {
  this.state = state;
}

Move.prototype = {
  move: function(interactionEvent) {
    if (interactionEvent.hasMoved()) {
      var newState = {
        left: this.state.left - interactionEvent.dx,
        top: this.state.top - interactionEvent.dy,
        right: this.state.right - interactionEvent.dx,
        bottom: this.state.bottom - interactionEvent.dy
      };
      this.state.update(newState);
    }
  }
}

module.exports = Move;
