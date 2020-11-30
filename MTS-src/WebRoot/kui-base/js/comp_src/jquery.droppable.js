/**
 * droppable - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 
 * 
 */
(function($) {
	$.fn.droppable = function(options) {
		if (typeof options == "string") {
			return $.fn.droppable.methods[options](this)
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "droppable");
			if (state) {
				$.extend(state.options, options);
			}
			 else {
				init(this);
				$.data(this, "droppable", {options: $.extend({},
													$.fn.droppable.defaults, 
													$.fn.droppable.parseOptions(this), 
													options)});
			}
		})
	};

	$.fn.droppable.methods = {
		options: function(jq) {
			 return $.data(jq[0], "droppable").options;
		},
		
        enable: function(jq) {
            return jq.each(function() {
                $(this).droppable({
                    disabled: false
                })
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                $(this).droppable({
                    disabled: true
                })
            });
        }			
	};
	
	$.fn.droppable.parseOptions = function(options) {
		return $.extend({},
					  $.parser.parseOptions(options, ["accept"]));
	};

	$.fn.droppable.defaults = {
		accept: null,
		onDragEnter: function(e, source) {},
		onDragOver: function(e, source) {},
		onDragLeave: function(e, source) {},
		onDrop: function(e, source) {}
	}

	function init(target) {
		$(target).addClass("droppable");
		$(target).bind("_dragenter", function(e, source) {
			e.stopPropagation();
			$.data(target, "droppable").options.onDragEnter.apply(target, [e, source]);
		});
		$(target).bind("_dragleave", function(e, source) {
			e.stopPropagation();
			$.data(target, "droppable").options.onDragLeave.apply(target, [e, source]);
		});
		$(target).bind("_dragover", function(e, source) {
			e.stopPropagation();
			$.data(target, "droppable").options.onDragOver.apply(target, [e, source]);
		});
		$(target).bind("_drop", function(e, source) {
			e.stopPropagation();
			return $.data(target, "droppable").options.onDrop.apply(target, [e, source]);
		})
	};
})(jQuery);