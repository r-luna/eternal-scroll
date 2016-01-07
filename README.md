# eternal-scroll

(Project started as a challenge to see what it would take to do endless scrolling.)

Where most "infinite/endless" scrolling libraries aim to replace native scrolling with JavaScript-based scrolling/animation Eternal Scroll really only cares about managing DOM bloat within overlfow:auto'd elements and thus relies on native features to do all scrolling.

As Eternal Scroll relies on native behavior for scrolling the behavior you will see should be very predictable. On desktop there wont be any inertia while on mobile devices you will certainly see the native scrolling (inertia) behavior. As well you will see the default scroll bars on both desktop and mobile devices. Obviously on desktop the scrollwheel will work.

Eternal Scroll pays attention to the scroll bar in so far as while it swaps out content it does so in a way to ensure that the scroll bar is always the correct size and in the correct position relative to where the content would naturaly be if it were all in the DOM. In other words, imagine a list consisting of 2000 rows. Scroll mid-way and the scroll bar is... well in the middle - and, all of the non-visible rows are still in the DOM. Now imagine the exact same thing with Eternal Scroll - the scroll bar is the exact same size and at the same position but without the thousands of unseen elements in the DOM.

This is a work-in-progress, meant for use on mobile devices where controlling DOM bloat is paramount.

# To Do

* Auto insert or wrap content so you dont have to supply an empty DIV of your own within the wrapper
* Detect the overlfow of the wrapper and set it if it is missing
* Horizontal Scrolling
* Recycle DOM elements

# Setup

Eternal Scroll will eventually do some of the mundane things for you - but at this point requires the following:

* A wrapper DIV whose css overflow property is set to enable scrolling
* The wrapper DIV needs a selector ID
* An empty DIV must reside within the wrapper (Eternal Scroll will take care of this in the near future)
* Your "Data Function" (see below)

About the "Data Function":

You must create a "data function" that returns a string of html or an array of element objects to be used as content. You pass a reference of this function into Eternal Scroll via the config object used to init the instance.

The function that you create will be sent 3 numbers from Eternal Scroll: startnumber, number of rows, buffer number. From these three numberrs you should be able to construct a function that returns the correct content data.

Each "row" in your list must contain a data-num attribute that represents its order in the list of data.

See the examples.

# Methods

**init()**

Initiate the Eternal Scroll instance by passing in a configuration object.

For example:

```javascript
// create a new Eternal Scroll instance
var myScrollingDiv = new EternalScroll();

// init the instance
    myScrollingDiv.init({
        wid:'verticalScroll', // id of the wrapper element
        datafunc: returnContentData, // your data function
        onscrollend: yourScrollEndCallBack, // your cb for the scroll end event
        buffer: 15 // buffer of rows to append to the end of the list
    });
```

**destroy()**

Unregisters event listeners.

```javascript
myscrollingDiv.destroy()
```

#Callbacks

**onScrollEnd**

Eternal Scroll currently has a callback for an "onScrollEnd event" that is set when you init the instance. An example of the returned event object:

```javascript
{target: 'DOM element reference',scrollposition: number}
```
