// The main wrapper attaches the tool to
// OpenSeadragon as a constructor. If the
// programmer wants to initialise it, they
// can call it from OpenSeadragon.

'use strict';

var IiifRegion = require('./iiifRegion.js');
// var IiifCrop = require('./iiifCrop.js');

OpenSeadragon.Viewer.prototype.iiifCrop = function(options) {
  if (!options) { var options = {}; }
  options.osd = this;

  this.selection = new IiifRegion(options);
  // this.iiifCrop = new IiifCrop(options);
  this.osd = options.osd;
};
