'use strict';

var ee = require('event-emitter'),
    IiifRegion = require('./iiifRegion.js'),
    SelectionDOMRenderer = require('./selectionDOMRenderer.js'),
    getJson = require('./getJson.js');

// This is a factory, not a constructor.
// The API is designed so that it is only
// callable from the OSD Viewer instance,
// so that this will always be that instance.
var IiifCrop = function(options) {
  if (!options) { var options = {}; }
  options.osd = this;

  var dispatcher = ee();

  var actions = {
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
    unlockAspectRatio: 'lockAspectRatio'
  };

  var state = {
    enabled: options.enabled || true,
    selection: new IiifRegion(options)
  };

  var renderer = new SelectionDOMRenderer(options, state, dispatcher);

  this.cropper = {
    disable: function() { state.enabled = false; },
    getState: function() { return state }
  };
};

module.exports = IiifCrop;
