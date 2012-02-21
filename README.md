Twitter Button port to Mootools
===============================

![Screenshot](https://github.com/DimitarChristoff/mootstrap-button/raw/master/button.png)

This is a port of the Twitter Bootstrap Button to MooTools. It extends it further and makes it more
flexible.

To those that are unfamiliar with it, it allows you to add blocking behaviour to buttons, making
them disabled and styling them in any way you like. This allows you to:
 - give the users feedback that their click/submit action has worked
 - automatically protects buttons to prevent double or further clicks
 - enables you to script around it and have events

How to use
----------

Read the source code for a full idea, it's self explanatory. Default use case works with
no options at all.

```javascript

    // example via .get when needed with delegation:
    document.getElement("div.row").addEvent("click:relay(.btn)", function(e, el) {
        this.get("button").toggle();
    });

    // example on a particular button:
    new mootstrapButton("someid", {
        loadingText: "Thank you."
    });

    // example via constructor setter / getter and events.
    new Element("button", {
        button: {
            loadingText: "Please wait",
            loadingTime: 3000,
            onToggle: function() {
                console.log("we are off!");
            },
            onUnlock: function() {
                console.log("we can click again!");
            }
        },
        text: "click me",
        events: {
            click: function() {
                this.get("button").toggle();
            }
        }
    });

    // example via a normal setter and events:
    document.id("resetForm").set("button", {
        loadingText: "Please wait",
        loadingTime: 3000,
        onLock: function() {
            this.element.fade(.1);
        },
        onUnlock: function() {
            this.element.fade(1);
        }
    }).get("button").toggle();

    // example on a A link to act as a toggle handler via data-toggle-target="someid"
    var links = document.getElements("a.toggler");
    links.each(function(e, el) {
        el.set("button", {
            onToggle: function() {
                document.id(this.options.toggleTarget).toggleClass("displayNone");
            }
        });
        el.addEvent("click", function(e) {
            e && e.stop && e.stop();
            this.get("button").toggle();
        });
    });

```

Demo with bootstrap buttons
---------------------------

[http://jsfiddle.net/dimitar/JR7Hj/](http://jsfiddle.net/dimitar/JR7Hj/)
