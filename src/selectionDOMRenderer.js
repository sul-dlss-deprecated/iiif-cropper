'use strict';
var hasClass = require('./hasClass');

var SelectionDOMRenderer = function(options, state) {
  var selectionBox;
  var state = {
    enabled: true,
    x: 0,
    y: 0,
    width: 0.3,
    height: 0.4
  }

  function render(state) {

    if (!state.enabled) {
      options.osd.removeOverlay(selectionBox);
      return;
    }

    if (!selectionBox === true) {
      selectionBox = buildSelectionBox();
      options.osd.addOverlay({
        element: selectionBox,
        location: new OpenSeadragon.Rect(state.x, state.y, state.width, state.height)
      });

      bindSelectionEvents(selectionBox);
    } else {
      update(selectionBox, state);
    }
  }

  function update(selectionBox, state) {
    console.log(state);
    options.osd.updateOverlay(selectionBox, new OpenSeadragon.Rect(state.x, state.y, state.width, state.height));
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
    });

    selectionBox.addEventListener('mousedown', handleDragStart);
    selectionBox.addEventListener('mouseup', function(e) {
      e.stopPropagation();
      selectionBox.removeEventListener('mousemove', handleSelectionDrag);
    });
  }

  function handleDragStart(event) {
    event.stopPropagation();
    selectionBox.addEventListener('mousemove', handleSelectionDrag);
  }

  function handleSelectionDrag(event) {
    event.stopPropagation();

    var mousePosition = options.osd.viewport.windowToViewportCoordinates(OpenSeadragon.getMousePosition(event)),
        newState;

    if (hasClass(event.target, 'iiif-crop-selection')) {
      newState = {
        x: mousePosition.x - state.width/2,
        y: mousePosition.y - state.height/2,
        width: state.width,
        height: state.height
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-top-drag-handle')) {
      newState = {
        x: state.x,
        y: mousePosition.y,
        width: state.width,
        height: state.height + (state.y - mousePosition.y)
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-right-drag-handle')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width + (mousePosition.x - (state.width + state.x)),
        height: state.height
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-bottom-drag-handle')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height + (mousePosition.y - (state.height + state.y))
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-left-drag-handle')) {
      newState = {
        x: mousePosition.x,
        y: state.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-top-left-drag-node')) {
      newState = {
        x: mousePosition.x,
        y: mousePosition.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height + (state.y - mousePosition.y)
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-top-right-drag-node')) {
      newState = {
        x: state.x,
        y: mousePosition.y,
        width: state.width + (mousePosition.x - (state.x + state.width)),
        height: state.height + (state.y - mousePosition.y)
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-bottom-right-drag-node')) {
      newState = {
        x: state.x,
        y: state.y,
        width: state.width + (mousePosition.x - (state.x + state.width)),
        height: state.height + (mousePosition.y - (state.y + state.height))
      };

      state = newState;
    };
    if (hasClass(event.target, 'iiif-crop-bottom-left-drag-node')) {
      newState = {
        x: mousePosition.x,
        y: state.y,
        width: state.width + (state.x - mousePosition.x),
        height: state.height + (mousePosition.y - (state.height + state.y))
      };

      state = newState;
    };

    update(selectionBox, newState);
  }

  render(state);
};

module.exports = SelectionDOMRenderer;
