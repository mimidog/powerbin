/**
 * numberspinner - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 spinner
 *   numberbox
 * 
 */
(function($){
	$.fn.numberspinner = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.numberspinner.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.spinner(options, param);
			}
		}		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'numberspinner');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'numberspinner', {
					options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), options)
				});
			}
			create(this);
		});
	};
	
	$.fn.numberspinner.methods = {
		options: function(jq){
			var opts = $.data(jq[0], 'numberspinner').options;
			return $.extend(opts, {
				value: jq.val()
			});
		},
		setValue: function(jq, value){
			return jq.each(function(){
				$(this).val(value).numberbox('fix');
			});
		}
	};
	
	$.fn.numberspinner.parseOptions = function(target){
		return $.extend({}, $.fn.spinner.parseOptions(target), $.fn.numberbox.parseOptions(target));
	};
	
	$.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
		spin: function(down){doSpin(this, down);}		
	});
	function create(target){
		var opts = $.data(target, 'numberspinner').options;
		$(target).spinner(opts).numberbox(opts);
	}
	
	function doSpin(target, down){
		var opts = $.data(target, 'numberspinner').options;
		var val=$(target).val().replace(/,/g,'');
        var v = parseFloat(val || opts.value.replace(/,/g,'')) || 0;
		var idot = (''+opts.increment).indexOf('.');
		idot = idot<0?0:(''+opts.increment).length-idot;
        var vdot = (''+v).indexOf('.');
		vdot = vdot<0?0:(''+v).length-vdot;
		var maxDot = Math.max(idot,vdot)>0?Math.max(idot,vdot)-1:0;
		var plusTen = Math.max(0,maxDot);
		var plus = plusTen>0?Math.pow(10,plusTen):1;
		if (down == true){
			v = (v*plus) - (opts.increment*plus);
		} else {
			v = (v*plus) + (opts.increment*plus);
		}
		v=(v/plus);
		if(maxDot>0) {
			v=v.toFixed(maxDot);
		}
		$(target).val(v).numberbox('fix');
	}	
})(jQuery);