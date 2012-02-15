Twitter Button port to Mootools
===============================

![Screenshot](https://github.com/DimitarChristoff/mootstrap-scrollspy/raw/master/button.png)

This is a port of the Twitter Button to MooTools. It extends it further and makes it more
flexible

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


```

Demo with bootstrap buttons
---------------------------

[http://jsfiddle.net/dimitar/JR7Hj/](http://jsfiddle.net/dimitar/JR7Hj/)
