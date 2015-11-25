

/* EternalScroll: Constructor, will infinite scroll the contents of a div given the following are passed to the init function:
 *   - element wrapper id 
 *   - function reference to a function that can return a string of html with which to populate the content wrapper (complete replacement of content)
 *
 * Example:
 *   var myScrollingDiv = new EternalScroll('myWrapperID',myContentFunction);
 *
 * Where "myContentFunction" will accept a number representing the beginning of a range and whose returned content contains "data-num" attributes 
 * containing the row numbers of the represented data.
 *
 * EternalScroll assumes that the wrapper div contains a single element that contains all content.
 *
 * See the examples below......
 *
 */

var EternalScroll = function(){
    var that = this;
    var timer = null;
    var scrollPos = 0; // scrollTop of wrapping element
    var onScrollStop = null;
    this.wrapperEl = null; // the overall wrapping element
    this.wrapperElHeight = null; // height of the overall wrapping element
    this.contentEl = null; // the content wrapper
    this.dataFuncRef = null; // function reference to the func that populates the content area
    this.rowHeight = null; // height of each row
    this.rowsPerWindow = null; // number of rows that can fit in each window
    this.preScrollBuffer = null;
    this.postScrollBuffer = null;
    

    /* populate content */
    function _populate(startNum){
        that.contentEl.innerHTML = that.dataFuncRef(startNum);
    }

    /* update position of content wrapper and update the content wrapper height */
    function _updateWhenScrolling(e){
        var firstEl = that.contentEl.firstChild;
        var firstElRect = firstEl.getBoundingClientRect();
        var lastEl = that.contentEl.lastChild;
        var lastElRect = lastEl.getBoundingClientRect();
        var startNumber = null;
        
        // has the last el moved within the bottom of the wrapper?
        if (lastElRect.top < that.wrapperElHeight){
            startNumber = +(lastEl.getAttribute('data-num')) - that.rowsPerWindow; // determine where new spread of rows starts
            _populate(startNumber);
            that.contentEl.style.marginTop = Math.ceil(startNumber * that.rowHeight) + 'px'; // position the content wrapper (not the overall wrapper)
        }
        // has the first el moved within the top of the wrapper?
        if (firstElRect.top > that.wrapperEl.getBoundingClientRect().top){
            startNumber = +(firstEl.getAttribute('data-num')) - that.rowsPerWindow; // determine where new spread of rows starts
            startNumber = startNumber < 0 ? 0 : startNumber;
            _populate(startNumber);
            that.contentEl.style.marginTop = ~~(startNumber * that.rowHeight) + 'px'; // position the content wrapper (not the overall wrapper)
        }
        scrollPos = e.target.scrollTop;
        window.clearTimeout(timer);
        timer = window.setTimeout(_detectScrollStop,200);
    }

    function _detectScrollStop(){
        if (that.wrapperEl.scrollTop === scrollPos){
            timer = null;
            onScrollStop && (onScrollStop())
        }
    }
    this.destroy = function(){
        that.wrapperEl.removeEventListener('scroll',_updateWhenScrolling); 
        that.contentEl.style.marginTop = '0px';
    };

    /* init scrolling */
    this.init = function(wid,dataFuncRef,scrollStopFuncRef,preScrollBuffer,postScrollBuffer){
        onScrollStop = scrollStopFuncRef || null;
        that.preScrollBuffer = preScrollBuffer;
        that.postScrollBuffer = postScrollBuffer;
        that.dataFuncRef = dataFuncRef;
        that.wrapperEl = document.getElementById(wid);
        that.contentEl = that.wrapperEl.children[0];
        _populate(0);
        that.wrapperElHeight = that.wrapperEl.offsetHeight;
        that.rowHeight = that.contentEl.firstChild.offsetHeight;
        that.rowsPerWindow = Math.ceil(that.wrapperElHeight / that.rowHeight);
        that.wrapperEl.addEventListener('scroll',_updateWhenScrolling,false);
        window.addEventListener('scrollend',function(e){
            console.log('stopped',e);   
        },false);
    };
};




