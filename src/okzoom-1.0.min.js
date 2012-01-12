/*

  OKZoom by OKFocus
  http://okfoc.us // @okfocus
  Copyright 2012 OKFocus
  Licensed under the MIT License

*/

$(function(c){var b=document.createElement("div");b.id="ok-lorgnette";b.style.position="absolute";b.style.backgroundRepeat="no-repeat";b.style.pointerEvents="none";b.style.display="none";b.style.zIndex=7879;document.body.appendChild(b);c.okzoom=function(d,e){var a=this;a.$el=c(d);a.el=d;a.$el.data("okzoom",a);a.init=function(){a.options=c.extend({},c.okzoom.options,e);a.el.onmouseover=a.build;a.el.onmousemove=a.mousemove;a.el.onmouseout=a.mouseout;a.options.height=a.options.height||a.options.width;
var b=a.$el.data("okimage");a.has_data_image="undefined"!==typeof b;if(a.has_data_image)a.img=new Image,a.img.src=b};a.build=function(){if(!a.has_data_image)a.img=a.el;a.offset=a.$el.offset();a.width=a.$el.width();a.height=a.$el.height();a.options.scaleWidth?(a.naturalWidth=a.options.scaleWidth,a.naturalHeight=Math.round(a.img.naturalHeight*a.options.scaleWidth/a.img.naturalWidth)):(a.naturalWidth=a.img.naturalWidth,a.naturalHeight=a.img.naturalHeight);a.widthRatio=a.naturalWidth/a.width;a.heightRatio=
a.naturalHeight/a.height;b.style.width=a.options.width+"px";b.style.height=a.options.height+"px";b.style.border=a.options.border;b.style.background=a.options.background+" url("+a.img.src+")";b.style.backgroundRepeat=a.options.backgroundRepeat;b.style.backgroundSize=a.options.scaleWidth?a.naturalWidth+"px "+a.naturalHeight+"px":"auto";b.style.borderRadius=b.style.OBorderRadius=b.style.MozBorderRadius=b.style.WebkitBorderRadius=a.options.round?a.options.width+"px":0;b.style.boxShadow=a.options.shadow};
a.mousemove=function(c){var d=a.options.width/2,f=a.options.height/2,e=-1*Math.floor((c.pageX-a.offset.left)*a.widthRatio-d),g=-1*Math.floor((c.pageY-a.offset.top)*a.heightRatio-f);document.body.style.cursor="none";b.style.display="block";b.style.left=c.pageX-d+"px";b.style.top=c.pageY-f+"px";b.style.backgroundPosition=e+"px "+g+"px"};a.mouseout=function(){b.style.display="none";b.style.background="none";document.body.style.cursor="auto"};a.init()};c.okzoom.options={width:150,height:null,scaleWidth:null,
round:!0,background:"#fff",backgroundRepeat:"no-repeat",shadow:"0 0 5px #000",border:0};c.fn.okzoom=function(b){return this.each(function(){new c.okzoom(this,b)})}});
