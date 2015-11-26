# eternal-scroll

Where most "infinite/endless" scrolling libraries aim to replace native scrolling with JavaScript-based scrolling/animation Eternal Scroll really only cares about managing DOM bloat within overlfow:auto'd elements and thus relies on native features to do all scrolling.

As Eternal Scroll relies on native behavior for scrolling the behavior you will see should be very predictable. On desktop there wont be any inertia while on mobile devices you will certainly see the native scrolling (inertia) behavior. As well you will see the default scroll bars on both desktop and mobile devices. Finaly, on desktop the scrollwheel will of course work as well.

Eternal Scroll pays attention to the scroll bar in so far as while it swaps out content it does so in a way to ensure that the scroll bar is always the correct size and in the correct position relative to where the content would naturaly be if it were all in the DOM. In other words, imagine a list consisting of 2000 rows. Scroll mid-way and the scroll bar is... well in the middle - and, all of the non-visible rows are still in the DOM. Now imagine the exact same thing with Eternal Scroll - the scroll bar is the exact same size and at the same position but without @2000 elements in the DOM.

This is a work-in-progress, meant for use on mobie devices where controlling DOM bloat is paramount.

# To Do

* auto insert or wrap content so you dont have to suppy an empty DIV of your own within the wrapper
* detecct the overlfow of the wrapper and set it if it is missing
* Horizontal Scrolling

# Setup

Eternal Scroll will eventually do some of the mundane things for you - but at this point requires the following:

* A wrapper DIV whose css overflow property is set to enable scrolling
* The wrapper DIV needs a selector ID
* An empty DIV must reside within the wrapper (Eternal Scroll will take care of this in the near future)
* Your "Data Function" must currently return a string of concatenated HTML - based on the start and end values sent to it (the later is optional)
* Each "row" or "item" in your list must contain a data-num attribute that represents its order in the list of data

# Methods

**init()**

Initiate the Eternal Scroll instance. Currently accepts the following params:
* Wrapper Id
* "Get Data" function reference
* "Scroll End" callback
 
 
 For example:
 
```javascript
function returnData(start,end){
    // return data to Eternal Scroll
}

function scrollEnd(e){
    // your scroll end callback
    console.log(e);
}

// create a new Eternal Scroll instance
var myScrollingDiv = new EternalScroll();

// init the instance
    myScrollingDiv.init('wrapperDivID',returnData,scrollEnd);      
```


**destroy()**

Unregisters event listeners and renders the Eternal Scroll instance inert.

```javascript
myscrollingDiv.destroy()
```

**Callbacks**

Eternal Scroll currently has one callback for 'onScrollEnd'. An example of the returned event object:

```javascript
{target: [DOM element reference]}
```
