$(function($){

  var lorgnette = document.createElement("div");
  lorgnette.style.position = "absolute";
  lorgnette.style.backgroundRepeat = "no-repeat";
  lorgnette.style.pointerEvents = "none";
  lorgnette.style.display = "none";
  lorgnette.style.zIndex = 7879;
  lorgnette.id = "ok-lorgnette";
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
      
      base.options.height = base.options.height || base.options.width;
      
      // base.$el.load( base.build );
      // if (base.el.complete)
      //  base.$el.trigger("load");
    };
    
    base.build = function(){
      base.offset = base.$el.offset();
      base.width = base.$el.width();
      base.height = base.$el.height();
      if (base.options.scaleWidth) {
        base.naturalWidth = base.options.scaleWidth;
        base.naturalHeight = Math.round( base.el.naturalHeight * base.options.scaleWidth / base.el.naturalWidth );
      } else {
        base.naturalWidth = base.el.naturalWidth;
        base.naturalHeight = base.el.naturalHeight;
      }
      base.widthRatio = base.naturalWidth / base.width;
      base.heightRatio = base.naturalHeight / base.height;

      lorgnette.style.width = base.options.width + "px";
      lorgnette.style.height = base.options.height + "px";
      lorgnette.style.border = base.options.border;
      lorgnette.style.background = base.options.background + " url(" + base.el.src + ")";
      lorgnette.style.backgroundRepeat = base.options.backgroundRepeat;
      lorgnette.style.backgroundSize = base.options.scaleWidth ? base.naturalWidth + "px " + base.naturalHeight + "px" : "auto";
      lorgnette.style.borderRadius = 
      lorgnette.style.OBorderRadius = 
      lorgnette.style.MozBorderRadius = 
      lorgnette.style.WebkitBorderRadius = base.options.round ? base.options.width + "px" : 0;
      
      lorgnette.style.boxShadow = base.options.shadow;
    };
    
    base.mousemove = function (e) {
      var shimLeft = base.options.width / 2;
      var shimTop = base.options.height / 2;
      var scaleLeft = -1 * Math.floor( (e.pageX - base.offset.left) * base.widthRatio - shimLeft );
      var scaleTop  = -1 * Math.floor( (e.pageY - base.offset.top) * base.heightRatio - shimTop );

      document.body.style.cursor = "none";
      lorgnette.style.display = "block";
      lorgnette.style.left = e.pageX - shimLeft + "px";
      lorgnette.style.top = e.pageY - shimTop + "px";
      lorgnette.style.backgroundPosition = scaleLeft + "px " + scaleTop + "px";
    };
    
    base.mouseout = function () {
      lorgnette.style.display = "none";
      lorgnette.style.background = "none";
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
