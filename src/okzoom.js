/*
 * OKZoom by OKFocus v1.1
 * http://okfoc.us // @okfocus
 * Copyright 2012 OKFocus
 * Licensed under the MIT License
**/

$(function($){
  $.fn.okzoom = function(options){
    options = $.extend({}, $.fn.okzoom.defaults, options);

    return this.each(function(){
      var base = {};
      var el = this;
      base.options = options;
      base.$el = $(el);
      base.el = el;

      base.listener = document.createElement('div');
      base.$listener = $(base.listener).addClass('ok-listener').css({
        position: 'absolute',
        zIndex: 10000
      });
      $('body').append(base.$listener);

      var loupe = document.createElement("div");
      loupe.id = "ok-loupe";
      loupe.style.position = "absolute";
      loupe.style.backgroundRepeat = "no-repeat";
      loupe.style.pointerEvents = "none";
      loupe.style.display = "none";
      loupe.style.zIndex = 7879;
      $('body').append(loupe);
      base.loupe = loupe;

      base.$el.data("okzoom", base);

      base.options = options;
      $(base.el).bind('mouseover', (function(b) {
        return function(e) { $.fn.okzoom.build(b, e); };
      }(base)));

      base.$listener.bind('mousemove', (function(b) {
        return function(e) { $.fn.okzoom.mousemove(b, e); };
      }(base)));

      base.$listener.bind('mouseout', (function(b) {
        return function(e) { $.fn.okzoom.mouseout(b, e); };
      }(base)));

      base.options.height = base.options.height || base.options.width;

      base.image_from_data = base.$el.data("okimage");
      base.has_data_image = typeof base.image_from_data !== "undefined";

      if (base.has_data_image) {
        base.img = new Image ();
        base.img.src = base.image_from_data;
      }

      base.msie = -1; // Return value assumes failure.
      if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
          base.msie = parseFloat(RegExp.$1);
      }
    });
  };

  $.fn.okzoom.defaults = {
    "width": 150,
    "height": null,
    "scaleWidth": null,
    "round": true,
    "background": "#fff",
    "backgroundRepeat": "no-repeat",
    "shadow": "0 0 5px #000",
    "border": 0
  };

  $.fn.okzoom.build = function(base, e){
    if (! base.has_data_image) {
      base.img = base.el;
    }
    else if (base.image_from_data != base.$el.attr('data-okimage')) {
      // data() returns cached values, whereas attr() returns from the dom.
      base.image_from_data = base.$el.attr('data-okimage');

      $(base.img).remove();
      base.img = new Image();
      base.img.src = base.image_from_data;
    }

    if (base.msie > -1 && base.msie < 9.0 && !base.img.naturalized) {
      var naturalize = function(img) {
        img = img || this;
        var io = new Image();

        io.el = img;
        io.src = img.src;

        img.naturalWidth = io.width;
        img.naturalHeight = io.height;
        img.naturalized = true;
      };
      if (base.img.complete) naturalize(base.img);
      else return;
    }

    base.offset = base.$el.offset();
    base.width = base.$el.width();
    base.height = base.$el.height();
    base.$listener.css({
      display: 'block',
      width: base.$el.outerWidth(),
      height: base.$el.outerHeight(),
      top: base.$el.offset().top,
      left: base.$el.offset().left
    });

    if (base.options.scaleWidth) {
      base.naturalWidth = base.options.scaleWidth;
      base.naturalHeight = Math.round( base.img.naturalHeight * base.options.scaleWidth / base.img.naturalWidth );
    } else {
      base.naturalWidth = base.img.naturalWidth;
      base.naturalHeight = base.img.naturalHeight;
    }

    base.widthRatio = base.naturalWidth / base.width;
    base.heightRatio = base.naturalHeight / base.height;

    base.loupe.style.width = base.options.width + "px";
    base.loupe.style.height = base.options.height + "px";
    base.loupe.style.border = base.options.border;
    base.loupe.style.background = base.options.background + " url(" + base.img.src + ")";
    base.loupe.style.backgroundRepeat = base.options.backgroundRepeat;
    base.loupe.style.backgroundSize = base.options.scaleWidth ?
        base.naturalWidth + "px " + base.naturalHeight + "px" : "auto";
    base.loupe.style.borderRadius =
    base.loupe.style.OBorderRadius =
    base.loupe.style.MozBorderRadius =
    base.loupe.style.WebkitBorderRadius = base.options.round ? base.options.width + "px" : 0;

    base.loupe.style.boxShadow = base.options.shadow;
    base.initialized = true;
    $.fn.okzoom.mousemove(base, e);
  };

  $.fn.okzoom.mousemove = function (base, e) {
    if (!base.initialized) return;
    var shimLeft = base.options.width / 2;
    var shimTop = base.options.height / 2;
    var pageX = typeof e.pageX !== 'undefined' ? e.pageX :
        (e.clientX + document.documentElement.scrollLeft);
    var pageY = typeof e.pageY !== 'undefined' ? e.pageY :
        (e.clientY + document.documentElement.scrollTop);
    var scaleLeft = -1 * Math.floor( (pageX - base.offset.left) * base.widthRatio - shimLeft );
    var scaleTop  = -1 * Math.floor( (pageY - base.offset.top) * base.heightRatio - shimTop );

    document.body.style.cursor = "none";
    base.loupe.style.display = "block";
    base.loupe.style.left = pageX - shimLeft + "px";
    base.loupe.style.top = pageY - shimTop + "px";
    base.loupe.style.backgroundPosition = scaleLeft + "px " + scaleTop + "px";
  };

  $.fn.okzoom.mouseout = function (base, e) {
    base.loupe.style.display = "none";
    base.loupe.style.background = "none";
    base.listener.style.display = "none";
    document.body.style.cursor = "auto";
  };

});
