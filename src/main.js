// The main wrapper attaches the tool to
// OpenSeadragon as a constructor. If the
// programmer wants to initialise it, they
// call it from the OpenSeadragon instance,
// or "viewer", similar to a jQuery plugin.

'use strict';

var IiifCrop = require('./iiifCrop.js');

// We attach the iiifCrop Object to the
// prototype of the viewer. This makes the
// method available on each _instance_ of
// the OpenSeadragon viewer, not the library
// as a whole.
//
// Note that iiifCrop is a factory, not a
// constructor, so "this" is still accessible
// as the instance of osd that is called.
OpenSeadragon.Viewer.prototype.iiifCrop = IiifCrop;
