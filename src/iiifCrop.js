'use strict';

var ee = require('event-emitter'),
    IiifRegion = require('./iiifRegion.js'),
    SelectionDOMRenderer = require('./selectionDOMRenderer.js'),

// This is a factory, not a constructor.
// The API is designed so that it is only
// callable from the OSD Viewer instance,
// so that this will always be that instance.
var IiifCrop = function(options) {
  if (!options) { var options = {}; }
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

  var regionStore = new IiifRegion(options, dispatcher);

  var renderer = new SelectionDOMRenderer(options, regionStore, dispatcher);

  this.cropper = {
    enable: function() {},
    disable: function() { dispatcher.emit('disable') },
    getIiifSelection: function() { return  },
    getRegion: function() {},
    setRegion: function() {},
    lockAspectRatio: function() {},
    unlockAspectRatio: function(){},
    enableAnimation:function() {},
    disableAnimation: function() {},
    enableScaling: function() {},
    disableScaling: function() {},
    dispatcher: dispatcher
  };
};

module.exports = IiifCrop;
