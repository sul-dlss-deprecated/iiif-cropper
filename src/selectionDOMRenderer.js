'use strict';
var hasClass = require('./hasClass');
var Move = require('./move');
var Resize = require('./resize');

var SelectionDOMRenderer = function(options, state) {
  var selectionBox,
      listener;

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

    listener = undefined;
    canvas.removeEventListener('mousemove', mouseMoved);
  }

  function handleDragStart(event) {
    event.stopPropagation();
    event.preventDefault();

    var currentDragHandle = event.target;
    if (hasClass(currentDragHandle, 'iiif-crop-selection')) {
      listener = new Move(state);
    } else {
      listener = new Resize(state, currentDragHandle);
    }
    lastPosition = {}
    canvas.addEventListener('mousemove', mouseMoved);
  }

  function mouseMoved(event) {
    event.stopPropagation();
    event.preventDefault();

    // var mousePosition = options.osd.viewport.windowToViewportCoordinates(OpenSeadragon.getMousePosition(event)),
    var mousePosition = {
      x: event.clientX - canvas.getBoundingClientRect().left,
      y: event.clientY - canvas.getBoundingClientRect().top,
    };

    listener.move(mousePosition);
    render(state);
  }

  return { update: function() { render(state) }}
};

module.exports = SelectionDOMRenderer;
