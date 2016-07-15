'use strict';
var hasClass = require('./hasClass');

var SelectionDOMRenderer = function(options, state) {
  var selectionBox,
      currentDragHandle;

  var canvas = options.osd.canvas;

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
    selectionBox.style.left = state.x;
    selectionBox.style.top = state.y;
    selectionBox.style.width = state.width;
    selectionBox.style.height = state.height;
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

    currentDragHandle = event.target;
    canvas.addEventListener('mousemove', handleSelectionDrag);
  }

  function updateState(newState) {
    state.x = newState.x;
    state.y = newState.y;
    state.width = newState.width;
    state.height = newState.height;
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
      var newState = {
        x: mousePosition.x - state.width/2,
        y: mousePosition.y - state.height/2,
        width: state.width,
        height: state.height
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-drag-handle')) {
      var newState = {
        x: state.x,
        y: mousePosition.y,
        width: state.width,
        height: state.height + (state.y - mousePosition.y)
      };

      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-right-drag-handle')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width + (mousePosition.x - (state.width + state.x)),
        height: state.height
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-drag-handle')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height + (mousePosition.y - (state.height + state.y))
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-left-drag-handle')) {
      newState = {
        x: mousePosition.x,
        y: state.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-left-drag-node')) {
      newState = {
        x: mousePosition.x,
        y: mousePosition.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height + (state.y - mousePosition.y)
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-top-right-drag-node')) {
      newState = {
        x: state.x,
        y: mousePosition.y,
        width: state.width + (mousePosition.x - (state.x + state.width)),
        height: state.height + (state.y - mousePosition.y)
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-right-drag-node')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width + (mousePosition.x - (state.x + state.width)),
        height: state.height + (mousePosition.y - (state.y + state.height))
      };
      updateState(newState);
    };

    if (hasClass(currentDragHandle, 'iiif-crop-bottom-left-drag-node')) {
      newState = {
        x: mousePosition.x,
        y: state.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height + (mousePosition.y - (state.height + state.y))
      };
      updateState(newState);
    };

    render(state);
  }

  return { update: function() { render(state) }}
};

module.exports = SelectionDOMRenderer;
