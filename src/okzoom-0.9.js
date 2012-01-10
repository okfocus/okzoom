/*

  OKShadow by OKFocus
  http://okfoc.us // @okfocus
  Copyright 2012 OKFocus
  Licensed under the MIT License

*/

$(function($){

  var loupe = document.createElement("div");
  loupe.style.position = "absolute";
  loupe.style.backgroundRepeat = "no-repeat";
  loupe.style.pointerEvents = "none";
  loupe.style.display = "none";
  loupe.style.zIndex = 7879;
  document.body.appendChild(loupe);
  
  $.okzoom = function(el, options){
    var base = this;       
    base.$el = $(el);
    base.el = el;        
    base.$el.data("okzoom", base);
        
    base.init = function(){            
      base.options = $.extend({}, $.okzoom.options, options);
      base.el.onmouseover = base.build;
      base.el.onmousemove = base.mousemove;
      base.el.onmouseout = base.mouseout;
      
      loupe.style.width = loupe.style.height = base.options.size + "px";
      
      base.$el.load( base.build );
      if (base.el.complete) base.$el.trigger("load");
    };
    
    base.build = function(){
      base.offset = base.$el.offset();
      base.width = base.$el.width();
      base.height = base.$el.height();
      base.naturalWidth = base.el.naturalWidth;
      base.naturalHeight = base.el.naturalHeight;
      base.width_ratio = base.naturalWidth / base.width;
      base.height_ratio = base.naturalHeight / base.height;
      loupe.style.border = base.options.border;
      loupe.style.background = base.options.background + " url(" + base.el.src + ")";
      loupe.style.backgroundRepeat = base.options.backgroundRepeat;
      if (base.options.round) {
        loupe.style.borderRadius = 
        loupe.style.OBorderRadius = 
        loupe.style.MozBorderRadius = 
        loupe.style.WebkitBorderRadius = base.options.size + "px"
      }
      
      loupe.style.boxShadow = base.options.shadow;

    };
    
    base.mousemove = function (e) {
      var shim = base.options.size / 2;
      var scale_left = -1 * Math.floor( (e.pageX - base.offset.left) * base.width_ratio - shim );
      var scale_top  = -1 * Math.floor( (e.pageY - base.offset.top) * base.height_ratio - shim );

      document.body.style.cursor = "none";
      loupe.style.display = "block";
      loupe.style.top = e.pageY - shim + "px";
      loupe.style.left = e.pageX - shim + "px";
      loupe.style.backgroundPosition = scale_left + "px " + scale_top + "px";
    };
    
    base.mouseout = function () {
      loupe.style.display = "none";
      document.body.style.cursor = "auto";
    };
    
    base.init();
  };

  $.okzoom.options = {
    "size": 150,
    "round": true,
    "background": "#fff",
    "backgroundRepeat": "no-repeat",
    "shadow": "0 0 5px #000",
    "border": 0
  };
  
  $.fn.okzoom = function(options){
    return this.each(function(){
      (new $.okzoom(this, options));            
    });
  };
  
});

