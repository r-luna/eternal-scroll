# eternal-scroll

Similar to iScroll, Eternal Scroll can display a list of elements while scrolling in an infinite manner. 
Eternal Scroll will display the elements that fit within a containing element and will pad/buffer the list with additional 
non-visible elements at the beginning and end of the list. Given a function reference that returns a list of elements 
Eternal Scroll will send the start and end range to the function reference to receive the list of elements it needs to 
update the containing element with.

Unlike iScroll, Eternal Scroll does not seek to emulate scrolling but instead relies on native scrolling. On desktop then there 
wont be any inertia while on mobile devices you will certainly see the native scrolling behavior. As well you will see the default
scroll bars on both desktop and mobile devices.

Eternal Scroll simply seeks to allow an element to eternaly (infinitely) scroll its content...
