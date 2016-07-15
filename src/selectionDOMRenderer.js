'use strict';
var hasClass = require('./hasClass');

var SelectionDOMRenderer = function(options, state) {
  var selectionBox,
      currentDragHandle,
      activeEdges;

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
    selectionBox.addEventListener('mouseup', handleDragStop);
  }

  function handleDragStop(e) {
    e.stopPropagation();
    e.preventDefault();

    currentDragHandle = undefined;
    canvas.removeEventListener('mousemove', handleSelectionDrag);
  }

  function handleDragStart(event) {
    event.stopPropagation();
    event.preventDefault();

    lastPosition = {}
    currentDragHandle = event.target;
    activeEdges = getActiveEdges(currentDragHandle);
    canvas.addEventListener('mousemove', handleSelectionDrag);
  }

  function getActiveEdges(handle) {
    var edges = { top: false, left: false, bottom: false, right: false }
    if (hasClass(currentDragHandle, 'iiif-crop-top-drag-handle')) {
      edges.top = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-right-drag-handle')) {
      edges.right = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-bottom-drag-handle')) {
      edges.bottom = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-left-drag-handle')) {
      edges.left = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-top-left-drag-node')) {
      edges.left = true
      edges.top = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-top-right-drag-node')) {
      edges.right = true
      edges.top = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-bottom-right-drag-node')) {
      edges.right = true
      edges.bottom = true
    } else if (hasClass(currentDragHandle, 'iiif-crop-bottom-left-drag-node')) {
      edges.left = true
      edges.bottom = true
    }
    return edges
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

  // A drag event is either a move or a resize
  function handleSelectionDrag(event) {
    event.stopPropagation();
    event.preventDefault();

    // var mousePosition = options.osd.viewport.windowToViewportCoordinates(OpenSeadragon.getMousePosition(event)),
    var mousePosition = {
      x: event.clientX - canvas.getBoundingClientRect().left,
      y: event.clientY - canvas.getBoundingClientRect().top,
    };

    if (hasClass(currentDragHandle, 'iiif-crop-selection')) {
      handleSelectionMove(mousePosition);
    } else {
      handleSelectionResize(mousePosition);
    }
    render(state);
  }

  function handleSelectionMove(mousePosition) {
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
  }

  function handleSelectionResize(mousePosition) {
    var newState = {}
    if (activeEdges.top)
      newState.top = mousePosition.y
    if (activeEdges.right)
      newState.right = mousePosition.x
    if (activeEdges.left)
      newState.left = mousePosition.x
    if (activeEdges.bottom)
      newState.bottom = mousePosition.y
    updateState(newState)
  }

  return { update: function() { render(state) }}
};

module.exports = SelectionDOMRenderer;
