/*
---

name: mootstrapButton

description: port of twitter button.js to mootools

authors: Dimitar Christoff

license: MIT-style license.

version: 1.0

requires:
  - Core/Event
  - Core/Element
  - Core/Array
  - Core/Class

provides:
  - mootstrapButton
  - Element.data

...
*/
(function(scope) {

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


    // main export: scope.Button is the new class name
    var Button = scope.moostrapButton = new Class({

        Implements: [Options, Events],

        options: {
            activeClass: 'active',
            disabledClass: 'disabled',
            loadingText: 'loading...',
            loadingTime: 0,
            parentSelector: "[data-toggle='buttons-radio']",
            preferDataProperties: true
        },

        initialize: function(element, options) {
            this.setOptions(options);
            this.element = document.id(element);

            // do data-attributes take precedence over options?
            var data = this.element.data();
            data && this.options.preferDataProperties && this.setOptions(data);
        },

        toggle: function() {
            // compat for twitter bootstrap...
            var parent = this.element.retrieve("buttonParent") || this.element.getParent(this.options.parentSelector);

            // cache parent
            parent && this.element.store("buttonParent", parent) && parent.getElements('.' + this.options.activeClass).removeClass(this.options.activeClass);

            this.element.toggleClass(this.options.activeClass);

            // vals of interest. can be input[type=submit/reset] or button so different property.
            var prop = this.element.retrieve('buttonProp') || this.element.get('tag') == 'input' ? 'value' : 'html',
                val = this.element.get(prop),
                self = this,
                options = this.options,
                loading  = this.element.hasClass(this.options.activeClass);

            // cache it to avoid further dom access
            this.element.store('buttonProp', prop);

            // store the reset text to old value, if none supplied
            options.resetText || this.setOptions({
                resetText: val
            });

            // change to loading text...
            this.element.set(prop, loading ? options.loadingText : options.resetText);

            // defer so it does not block form submissions that go through...
            (function() {
                this.element.toggleClass(options.disabledClass).set('disabled', loading);

                // auto reset

                loading && options.loadingTime && (options.loadingTime) > 0 && this.toggle.delay(options.loadingTime, this);
            }).delay(0, this);

            this.fireEvent('toggle');
            this.fireEvent(loading ? 'lock' : 'unlock');
        }

    });


    // you can access any element's button instance through the special getter/setter
    Element.Properties.button = {

        set: function(options){
            this.get('button').setOptions(options);
            return this;
        },

        get: function(){
            var button = this.retrieve('button');
            if (!button){
                button = new Button(this);
                this.store('button', button);
            }
            return button;
        }

    };

})(this);