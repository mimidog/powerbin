/**
 * scroll - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies: draggable,mousewheel
 * 
 * @author liuqing 2014-9-18
 */
(function($) {

var defaults = {
		overflow: "auto",	//auto, x, y, hidden
		deltaX: 20,
		deltaY: 20,
		scrollSize: 7
	},
	
	core = {
		init: function(target) {
			var opts = target.data("scrollbox").options;
			opts.ui = core.render(target);
			setInterval(function() {
				core.setSize(target, {
					width: opts.width,
					height: opts.height
				});
			}, 100);
			
			core.bindEvents(target);
		},
		
		render: function(target) {
			var opts = target.data("scrollbox").options,
				scrollBox = $("<div class='scrollbox'></div>"),
				scrollView = $("<div class='scroll-view'></div>"),
				scrollX = $("<div class='scrollbar scrollbar-x'></div>"),
				scrollY = $("<div class='scrollbar scrollbar-y'></div>"),
				ui;
			
			target.addClass("scroll-panel").wrap(scrollView);
			scrollView = target.parent();
			
			scrollView.wrap(scrollBox);
			scrollBox = scrollView.parent();
			
			ui = {
				scrollBox: scrollBox,	
				scrollView: scrollView
			};
			
			switch(opts.overflow.toLowerCase()) {
			case "auto":
				scrollX.appendTo(scrollBox);
				scrollY.appendTo(scrollBox);
				ui["scrollX"] = scrollX;
				ui["scrollY"] = scrollY;
				break;
			case "x":
				scrollX.appendTo(scrollBox);
				ui["scrollX"] = scrollX;
				ui["scrollY"] = $();
				break;
			case "y":
				scrollY.appendTo(scrollBox);
				ui["scrollX"] = $();
				ui["scrollY"] = scrollY;
				break;
			case "hidden":
				ui["scrollX"] = $();
				ui["scrollY"] = $();
				break;
			default: 
				scrollX.appendTo(scrollBox);
				scrollY.appendTo(scrollBox);
				ui["scrollX"] = scrollX;
				ui["scrollY"] = scrollY;
			}
			scrollX.hide().height(opts.scrollSize);
			scrollY.hide().width(opts.scrollSize);
			return ui;
		},
		
		setSize: function(target, size) {
			var opts = target.data("scrollbox").options,
				ui = opts.ui,
				scrollX = ui.scrollX || $(),
				scrollY = ui.scrollY || $(),
				targetWidth = target[0].scrollWidth || target.outerWidth(true),
				targetHeight = target[0].scrollHeight || target.outerHeight(true),
				viewWidth, viewHeight;
			
			$.each([ui.scrollView, ui.scrollBox], function() {
				$(this).css({
					width: size.width || ui.scrollBox.parent().width(),
					height: size.height || ui.scrollBox.parent().height()
				});
			});
			
			viewWidth = ui.scrollView.width();
			viewHeight = ui.scrollView.height();
			
			scrollX.css({
				width: viewWidth >= targetWidth ? 0 : viewWidth * viewWidth / targetWidth,
				top: ui.scrollView.innerHeight() - scrollX.height(),
				left: viewWidth * ui.scrollView.scrollLeft() / targetWidth
			});
			scrollY.css({
				height: viewHeight >= targetHeight ? 0 : viewHeight * viewHeight / targetHeight,
				top: viewHeight * ui.scrollView.scrollTop() / targetHeight,
				left: ui.scrollView.innerWidth() - scrollY.width()
			});
		},
		
		bindEvents: function(target) {
			var opts = target.data("scrollbox").options,
				ui = opts.ui,
				isShiftDown = false,
				delta;
			ui.scrollView.mousewheel(function(e, delta) {
				delta = (delta > 0 ? -1 : 1) * opts.deltaX;
				if(isShiftDown) {
					core.scrollLeft(target, ui.scrollView.scrollLeft() + delta);
				} else {
					core.scrollTop(target, ui.scrollView.scrollTop() + delta);
				}
			});
			
			$(document).keydown(function(e) {
				if(e.keyCode === 16) {
					isShiftDown = true;
				}
			}).keyup(function(e) {
				if(e.keyCode === 16) {
					isShiftDown = false;
				}
			});
			
			ui.scrollBox.hover(function() {
				ui.scrollX.fadeIn(100);
				ui.scrollY.fadeIn(100);
			}, function() {
				ui.scrollX.fadeOut(100);
				ui.scrollY.fadeOut(100);
			});
			
			ui.scrollX.draggable({
				cursor: "cursor",
				axis: "h",
				onDrag: function(e) {
					var dragWidth = ui.scrollX.width(),
						viewWidth = ui.scrollView.width();
					
					if(e.data.left < 0) {
						e.data.left = 0;
					}
					if(viewWidth < e.data.left + dragWidth) {
						e.data.left = viewWidth - dragWidth;
					}
					core.scrollLeft(target, (target[0].scrollWidth || target.outerWidth(true)) * ui.scrollX.position().left / viewWidth);
				}
			});
			
			ui.scrollY.draggable({
				cursor: "cursor",
				axis: "v",
				onDrag: function(e) {
					var dragHeight = ui.scrollY.height(),
						viewHeight = ui.scrollView.height();
					
					if(e.data.top < 0) {
						e.data.top = 0;
					}
					if(viewHeight < e.data.top + dragHeight) {
						e.data.top = viewHeight - dragHeight;
					}
					core.scrollTop(target, (target[0].outerHeight || target.outerHeight(true)) * ui.scrollY.position().top / viewHeight);
				}
			});
		},
		
		scrollTop: function(target, top) {
			var ui = target.data("scrollbox").options.ui;
			if("undefined" === typeof top) {
				return ui.scrollView.scrollTop();
			}
			ui.scrollView.scrollTop(top);
			core.moveY(target, ui.scrollView.height() * top / target.outerHeight(true));
		},
		
		moveY: function(target, top) {
			var ui = target.data("scrollbox").options.ui,
				min = 0,
				max = ui.scrollView.height() - ui.scrollY.height();
			
			if(top <= min) {
				top = min;
			} else if(top >= max) {
				top = max;
			}
			ui.scrollY.css("top", top);
		},
		
		scrollLeft: function(target, left) {
			var ui = target.data("scrollbox").options.ui;
			if("undefined" === typeof left) {
				return ui.scrollView.scrollLeft();
			}
			ui.scrollView.scrollLeft(left);
			core.moveX(target, ui.scrollView.width() * left / target.outerWidth(true));
		},
		
		moveX: function(target, left) {
			var ui = target.data("scrollbox").options.ui,
				min = 0,
				max = ui.scrollView.width() - ui.scrollX.width();
			
			if(left <= min) {
				left = min;
			} else if(left >= max) {
				left = max;
			}
			ui.scrollX.css("left", left);
		}
	},
	
	methods = {
		resize: function(size) {
			core.setSize(this, size || {});
		},
		
		scrollLeft: function(left) {
			if("undefined" === typeof left) {
				return core.scrollTop(this);
			}
			core.scrollLeft(this, left);
		},
		
		scrollTop: function(top) {
			if("undefined" === typeof top) {
				return core.scrollTop(this);
			} 
			core.scrollTop(this, top);
		}
	};
	
$.fn.scrollbox = function(options) {
	var target,
		slice = Array.prototype.slice;
	
    if ("string" === $.type(options)) {
    	return methods[options].apply(this, slice.call(arguments, 1));
    }
    
    return this.each(function() {
    	target = $(this);
    	if(!target.data("scrollbox")) {
    		target.data("scrollbox", {
                 options: $.extend({}, defaults, $.parser.parseOptions(this), options)
             });
    	}
    	core.init(target);
    });
};
$.fn.scrollbox.methods = methods;
$.fn.scrollbox.defaults = defaults;
})(jQuery);