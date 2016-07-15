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
    if (newState.left)
      state.left = newState.left;
    if (newState.top)
      state.top = newState.top;
    if (newState.right)
      state.right = newState.right;
    if (newState.bottom)
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
      updateState({
        top: mousePosition.y,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-right-drag-handle')) {
      updateState({
        right: mousePosition.x,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-drag-handle')) {
      updateState({
        bottom: mousePosition.y,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-left-drag-handle')) {
      updateState({
        left: mousePosition.x,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-left-drag-node')) {
      updateState({
        left: mousePosition.x,
        top:  mousePosition.y,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-right-drag-node')) {
      updateState({
        top:  mousePosition.y,
        right: mousePosition.x,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-right-drag-node')) {
      updateState({
        right: mousePosition.x,
        bottom:  mousePosition.y,
      });
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-left-drag-node')) {
      updateState({
        left: mousePosition.x,
        bottom:  mousePosition.y,
      });
    };

    render(state);
  }

  return { update: function() { render(state) }}
};

module.exports = SelectionDOMRenderer;
