'use strict';

var hasClass = function(element, selector) {
    var className = " " + selector + " ";
    return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(selector) > -1;
};

module.exports = hasClass;
