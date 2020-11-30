/**
 * obvious box - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	combo
 */

(function($) {
    $.fn.selected = function(options, param) {
        if (typeof options == 'string') {
            var method = $.fn.selected.methods[options];
            if (method){
				return method(this, param);
			} 
        }
        options = options || {};
        return this.each(function() {
        	 if (!$.data(this, 'selected')) {
                 $.data(this, 'selected', {
                     options: $.extend({},
                     $.extend({},
                     $.fn.selected.defaults), $.fn.selected.parseOptions(this), options)
                 });
             }
             init(this);
        });
    };
    
    $.fn.selected.parseOptions = function(target) {
        return $.extend({},
        $.parser.parseOptions(target, [{
        }]));
    };
    
    
    
    $.fn.selected.methods = {
		options:function(jq){
			var opts = $.data(jq[0],'selected').options;
			return opts;
		},
		setValue:function(jq,data){
			setValue(jq[0],data);
		},
        reSize:function(jq, width) {
            return jq.each(function() {
            	setSize(this,width);
            });
        }
    };
         
    $.fn.selected.defaults = {
    		width : 'auto',
    		height : 'auto'
    };

    function setValue(target,data){
    	$(".obvious-condic-panel",target).removeClass("obvious-condic-panel").addClass("obvious-condic-selected-panel");
    	var selectPanel = new Array();
		var txt = data.text;
		var id = data.id ;
		var paramName = data.paramName;
		var parName = data.parName ;
		var multi = data.multiple;
		var opts = $.data(target,'selected').options;
		var obj = $(".obvious-condic-selected-panel",target).find("#"+id);
		var len = obj.length;
		if(len > 0){
			return false ;
		}
		if(!multi){
			var num = $(".obvious-condic-selected-panel",target).find("."+paramName).length;
			if(num > 0){
				return false ;
			}
		}
		selectPanel.push("<ul><li id='"+id+"' class='"+paramName+"' >"+parName+": "+txt+"  <span class='obv-close-icon'></span></li><input type='hidden' name='"+paramName+"' value='"+id+"'/></ul>");
		$(selectPanel.join("")).appendTo($(".obv-selected-item",target));
		bindEvents(target);
		setSize(target,opts.width);
    }
    
    function bindEvents(target){
    	
    	$(".obv-close-icon",target).bind("click",function(e){
    		e.stopPropagation();
    		$(this).parent().parent().remove();
    		if ($(".obvious-condic-selected-panel",target).find("ul").length == 0) {
    			$(".obvious-condic-selected-panel",target).removeClass("obvious-condic-selected-panel").addClass("obvious-condic-panel");
    		}
    	});
    	$(".closeAll",target).bind("click",function(e){
    		$("ul",target).remove();
    		if ($(".obvious-condic-selected-panel",target).find("ul").length == 0) {
    			$(".obvious-condic-selected-panel",target).removeClass("obvious-condic-selected-panel").addClass("obvious-condic-panel");
    		}
    	});
    };
    
    function init(target) {
    	var opts = $.data(target, "selected").options;
    	$(target).css({"width":opts.width+"px","height":opts.height+"px"});
    	var condicPanel = $("<div class='obvious-condic-panel'><div class='obv-t'><span class='obv-select-type'>所选条件：</span></div><div class='obv-selected-item'></div><span class='closeAll'>撤销</span></div>");
    	
    	$(target).append(condicPanel);
    }

    function setSize(target,width){
    	$(".obv-selected-item",target).css("width",(width - 110)+"px");
    	$(".closeAll",target).css({"margin-right":(-width+120)+"px","float":"right","margin-top":"6px","cursor":"pointer"});
    }
    
})(jQuery);
