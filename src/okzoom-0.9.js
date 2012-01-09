/*

  OKShadow by OKFocus
  http://okfoc.us // @okfocus
  Copyright 2012 OKFocus
  Licensed under the MIT License

*/

$(function($){

  var lorgnette = document.createElement("div");
  lorgnette.style.position = "absolute";
  lorgnette.style.backgroundRepeat = "no-repeat";
  lorgnette.style.pointerEvents = "none";
  lorgnette.style.display = "none";
  lorgnette.style.zIndex = 7879;
  document.body.appendChild(lorgnette);
  
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
      
      lorgnette.style.width = lorgnette.style.height = base.options.size + "px";
      
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
      lorgnette.style.border = base.options.border;
      lorgnette.style.background = base.options.background + " url(" + base.el.src + ")";
      lorgnette.style.backgroundRepeat = base.options.backgroundRepeat;
      if (base.options.round) {
        lorgnette.style.borderRadius = 
        lorgnette.style.OBorderRadius = 
        lorgnette.style.MozBorderRadius = 
        lorgnette.style.WebkitBorderRadius = base.options.size + "px"
      }
      
      lorgnette.style.boxShadow = base.options.shadow;

    };
    
    base.mousemove = function (e) {
      var shim = base.options.size / 2;
      var scale_left = -1 * Math.floor( (e.pageX - base.offset.left) * base.width_ratio - shim );
      var scale_top  = -1 * Math.floor( (e.pageY - base.offset.top) * base.height_ratio - shim );

      document.body.style.cursor = "none";
      lorgnette.style.display = "block";
      lorgnette.style.top = e.pageY - shim + "px";
      lorgnette.style.left = e.pageX - shim + "px";
      lorgnette.style.backgroundPosition = scale_left + "px " + scale_top + "px";
    };
    
    base.mouseout = function () {
      lorgnette.style.display = "none";
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

