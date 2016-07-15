'use strict';
var hasClass = require('./hasClass');

var SelectionDOMRenderer = function(options, state) {
  var selectionBox,
      currentDragHandle;

  var canvas = options.osd.canvas;
  var lastPosition = {};

  function render(state) {

    if (!state.enabled) {
      options.osd.removeOverlay(selectionBox);
      return;
    }

    if (!selectionBox === true) {
      selectionBox = buildSelectionBox();
      canvas.appendChild(selectionBox);
      bindSelectionEvents(selectionBox);
      update(selectionBox, state);
    } else {
      update(selectionBox, state);
    }
  }

  function update(selectionBox, state) {
    selectionBox.style.left = state.left;
    selectionBox.style.top = state.top;
    selectionBox.style.width = state.getWidth();
    selectionBox.style.height = state.getHeight();
  }

  function buildSelectionBox() {
    var selectionDOM = document.createElement('div');
      selectionDOM.classList.add('iiif-crop-selection');

    var handleList = [
      'iiif-crop-top-drag-handle',
      'iiif-crop-bottom-drag-handle',
      'iiif-crop-left-drag-handle',
      'iiif-crop-right-drag-handle',
    ];

    var dragNodeList = [
      'iiif-crop-top-left-drag-node',
      'iiif-crop-top-right-drag-node',
      'iiif-crop-bottom-left-drag-node',
      'iiif-crop-bottom-right-drag-node'
    ];

    handleList.forEach(function(handleName) {
      var handle = document.createElement('div');
      handle.classList.add(handleName);
      handle.classList.add('iiif-crop-dragHandle');
      selectionDOM.appendChild(handle);
    });

    dragNodeList.forEach(function(nodeName) {
      var dragNode = document.createElement('div');
      dragNode.classList.add(nodeName);
      dragNode.classList.add('iiif-crop-dragNode');
      selectionDOM.appendChild(dragNode);
    });

    return selectionDOM;
  }

  function bindSelectionEvents(selectionBox) {
    // Below, stopPropagation() must be
    // used on the mousedown, mouseup, and
    // click events to prevent OSD from
    // receiving them. The "click-to-zoom"
    // function in OSD is constructed from
    // the mouseup and mousedown events.
    selectionBox.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
    });

    selectionBox.addEventListener('mousedown', handleDragStart);
    selectionBox.addEventListener('mouseup', function(e) {
      e.stopPropagation();
      e.preventDefault();

      currentDragHandle = undefined;
      canvas.removeEventListener('mousemove', handleSelectionDrag);
    });
  }

  function handleDragStart(event) {
    event.stopPropagation();
    event.preventDefault();

    lastPosition = {}
    currentDragHandle = event.target;
    canvas.addEventListener('mousemove', handleSelectionDrag);
  }

  function updateState(newState) {
    state.left = newState.left;
    state.top = newState.top;
    state.right = newState.right;
    state.bottom = newState.bottom;
  }

  function handleSelectionDrag(event) {
    event.stopPropagation();
    event.preventDefault();

    // var mousePosition = options.osd.viewport.windowToViewportCoordinates(OpenSeadragon.getMousePosition(event)),
    var mousePosition = {
      x: event.clientX - canvas.getBoundingClientRect().left,
      y: event.clientY - canvas.getBoundingClientRect().top,
    };

    if (hasClass(currentDragHandle, 'iiif-crop-selection')) {
      if (typeof(lastPosition.x) != 'undefined') {
        var dx = lastPosition.x - mousePosition.x
        var dy = lastPosition.y - mousePosition.y
        var newState = {
          left: state.left - dx,
          top: state.top - dy,
          right: state.right - dx,
          bottom: state.bottom - dy
        };
        updateState(newState);
      }
      lastPosition = { x: mousePosition.x, y: mousePosition.y }
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-drag-handle')) {
      var newState = {
        left: state.left,
        top: mousePosition.y,
        right: state.right,
        bottom: state.bottom
      };

      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-right-drag-handle')) {
      newState = {
        left: state.left,
        top: state.top,
        right: mousePosition.x,
        bottom: state.bottom
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-drag-handle')) {
      newState = {
        left: state.left,
        top: state.top,
        right: state.right,
        bottom: mousePosition.y
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-left-drag-handle')) {
      newState = {
        left: mousePosition.x,
        top: state.top,
        right: state.right,
        bottom: state.bottom
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-left-drag-node')) {
      newState = {
        left: mousePosition.x,
        top:  mousePosition.y,
        right: state.right,
        bottom: state.bottom
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-right-drag-node')) {
      newState = {
        left: state.left,
        top:  mousePosition.y,
        right: mousePosition.x,
        bottom: state.bottom
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-right-drag-node')) {
      newState = {
        left: state.left,
        top:  state.top,
        right: mousePosition.x,
        bottom: mousePosition.y
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-left-drag-node')) {
      newState = {
        left: mousePosition.x,
        top:  state.top,
        right: state.right,
        bottom: mousePosition.y
      };
      updateState(newState);
    };

    render(state);
  }

  return { update: function() { render(state) }}
};

module.exports = SelectionDOMRenderer;
