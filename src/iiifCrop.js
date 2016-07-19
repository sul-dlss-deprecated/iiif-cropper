'use strict';

var ee =                   require('event-emitter'),
    SelectionDOMRenderer = require('./selectionDOMRenderer.js'),
    TransformSelection =   require('./transformSelection.js'),
    Selection =            require('./selection.js') 

// This is a factory, not a constructor.
// The API is designed so that it is only
// callable from the OSD Viewer instance,
// so that this will always be that instance.
var IiifCrop = function(options) {
  if (!options) { var options = { enabled: true,
                                  left: 50,
                                  top: 44,
                                  right: 250,
                                  bottom: 144
                                };
  }
  options.osd = this;

  // options: {
  // region: [] || {} // Gives selection in image coordinates
  // animate: true || false // Tells whether to smoothly animate the region when it is forcibly set
  // enabled: true || false // Should the cropper tool be visible
  // aspectRatioLocked: true || false // Prevents the region from changing shape
  // scaleWithCanvas: true || false // false by default, determines how the user selects region
  //}

  var dispatcher = ee();

  var actionConstants = {
    enable: 'enable',
    disable: 'disable',
    expandUp: 'expandUp',
    expandRight: 'expandRight',
    expandDown: 'expandDown',
    expandLeft: 'expandLeft',
    expandUpAndRight: 'expandUpAndRight',
    expandDownAndRight: 'expandDownAndRight',
    expandDownAndLeft: 'expandDownAndLeft',
    expandUpAndLeft: 'expandUpAndLeft',
    setRegion: 'setRegion',
    lockAspectRatio: 'lockAspectRatio',
    unlockAspectRatio: 'lockAspectRatio',
    enableAnimation: 'enableAnimation',
    disableAnimation: 'disableAnimation',
    enableScaling: 'enableScaling',
    disableScaling: 'disableScaling'
  };

  var settingsStore = {
    enabled: options.enabled || true,
    aspectRatioLocked: options.aspectRatioLocked || false,
    animationEnabled: options.animationEnabled || true
  };

  var regionStore = new Selection(options, dispatcher);

  var renderer = new SelectionDOMRenderer(options, regionStore, settingsStore, dispatcher);
  renderer.update();

  this.cropper = {
    enable: function() {},
    disable: function() { dispatcher.emit('disable') },

    // Maps the selected area into an IiifRegion
    getIiifSelection: function() {
      return this.getTransformer().toImageRegion(regionStore);
    },

    getTransformer: function() {
      return new TransformSelection(options.osd)
    },
    getRegion: function() {},

    // Given image coordinates, put the crop region in the correct location.
    setRegion: function(x, y, width, height) {
      var rect =  { x: x, y: y, height: height, width: width };
      var region = this.getTransformer().fromImageRegion(rect);
      regionStore.update(region);
      renderer.update();
    },

    lockAspectRatio: function() {
      settingsStore.aspectRatioLocked = true;
    },
    unlockAspectRatio: function(){
      settingsStore.aspectRatioLocked = false;
    },
    enableAnimation:function() {},
    disableAnimation: function() {},
    enableScaling: function() {},
    disableScaling: function() {},
    dispatcher: dispatcher
  };
};

module.exports = IiifCrop;
