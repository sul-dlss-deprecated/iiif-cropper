'use strict';
var Move = function(state) {
  this.state = state;
  this.lastPosition = {};
}

Move.prototype = {
  move: function(mousePosition) {
    if (typeof(this.lastPosition.x) != 'undefined') {
      var dx = this.lastPosition.x - mousePosition.x
      var dy = this.lastPosition.y - mousePosition.y
      var newState = {
        left: this.state.left - dx,
        top: this.state.top - dy,
        right: this.state.right - dx,
        bottom: this.state.bottom - dy
      };
      this.state.update(newState);
    }
    this.lastPosition = { x: mousePosition.x, y: mousePosition.y }
  }

}

module.exports = Move;
