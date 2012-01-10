/*

  OKShadow by OKFocus
  http://okfoc.us // @okfocus
  Copyright 2012 OKFocus
  Licensed under the MIT License

*/

$(function($){
    
  var loupe = document.createElement("div");
  loupe.id = "ok-loupe";
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
      
      base.options.height = base.options.height || base.options.width;
      
      var image_from_data = base.$el.data("okimage");
      base.has_data_image = typeof image_from_data !== "undefined";
      
      if (base.has_data_image) {
        base.img = new Image ();
        base.img.src = image_from_data;
      }
      
      // base.$el.load( base.build );
      // if (base.el.complete)
      //  base.$el.trigger("load");
    };
    
    base.build = function(){
    
      if (! base.has_data_image) {
        base.img = base.el;
      }
      
      base.offset = base.$el.offset();
      base.width = base.$el.width();
      base.height = base.$el.height();
      
      if (base.options.scaleWidth) {
        base.naturalWidth = base.options.scaleWidth;
        base.naturalHeight = Math.round( base.img.naturalHeight * base.options.scaleWidth / base.img.naturalWidth );
      } else {
        base.naturalWidth = base.img.naturalWidth;
        base.naturalHeight = base.img.naturalHeight;
      }
      
      base.widthRatio = base.naturalWidth / base.width;
      base.heightRatio = base.naturalHeight / base.height;

      loupe.style.width = base.options.width + "px";
      loupe.style.height = base.options.height + "px";
      loupe.style.border = base.options.border;
      loupe.style.background = base.options.background + " url(" + base.img.src + ")";
      loupe.style.backgroundRepeat = base.options.backgroundRepeat;
      loupe.style.backgroundSize = base.options.scaleWidth ? base.naturalWidth + "px " + base.naturalHeight + "px" : "auto";
      loupe.style.borderRadius = 
      loupe.style.OBorderRadius = 
      loupe.style.MozBorderRadius = 
      loupe.style.WebkitBorderRadius = base.options.round ? base.options.width + "px" : 0;
      
      loupe.style.boxShadow = base.options.shadow;
    };
    
    base.mousemove = function (e) {
      var shimLeft = base.options.width / 2;
      var shimTop = base.options.height / 2;
      var scaleLeft = -1 * Math.floor( (e.pageX - base.offset.left) * base.widthRatio - shimLeft );
      var scaleTop  = -1 * Math.floor( (e.pageY - base.offset.top) * base.heightRatio - shimTop );

      document.body.style.cursor = "none";
      loupe.style.display = "block";
      loupe.style.left = e.pageX - shimLeft + "px";
      loupe.style.top = e.pageY - shimTop + "px";
      loupe.style.backgroundPosition = scaleLeft + "px " + scaleTop + "px";
    };
    
    base.mouseout = function () {
      loupe.style.display = "none";
      loupe.style.background = "none";
      document.body.style.cursor = "auto";
    };
    
    base.init();
  };

  $.okzoom.options = {
    "width": 150,
    "height": null,
    "scaleWidth": null,
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
