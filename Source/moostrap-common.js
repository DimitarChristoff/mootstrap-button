/*
---

name: mootstrapCommon

description: port of twitter button.js to mootools

authors: Dimitar Christoff

license: MIT-style license.

version: 1.1

requires:
  - Core/Element
  - Core/Array

provides:
  - Element.data

...
*/
(function(scope) {
    "use strict";

    if (!Element.prototype.data) {
        // mimic the data attribute polifill api in jquery for mootools. kind of.
        var formatDataProperty = function(prop) {
            return prop.replace('data-', '').camelCase();
        };


        [Document, Element].invoke('implement', {
            data: function(property, value) {
                var data = this.retrieve('dataCollection');
                if (!data) {
                    data = {};
                    var hasData = false, attribs = this.attributes || [];
                    if (!attribs.length)
                        attribs = [];

                    for (var ii = 0, len = attribs.length; ii < len; ++ii) {
                        if (attribs[ii].name.indexOf('data-') === 0) {
                            data[formatDataProperty(attribs[ii].name)] = attribs[ii].value;
                            hasData = true;
                        }
                    }

                    if (!hasData)
                        data = null;
                    this.store('dataCollection', data);
                }

                if (!property)
                    return data;

                if (value) {
                    data[property] = value;
                    this.store('dataCollection', data);
                }

                return data[formatDataProperty(property)] || null;
           }

        });
    }

})(this);
