(function($) {
	$.fn.selection = function(options, param) {
		if (typeof options == "string") {
            return $.fn.selection.methods[options](this, param);
        }
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "selection");
            if (state) {
                $.extend(state.options, options);
            } else {
            	state = $.data(this,'selection',{
                    options:$.extend({},$.fn.selection.defaults,$.fn.selection.parseOptions(this),options)
                });
            	var target = $(this);
            	init(target,state.options);
            }
		});
	};
	
	$.fn.defaults = {
			width:'auto',
			height:'auto',
			panelWidth:'auto',
			multiple: false,
			name:null,
			editable: false,
	        disabled: false,
			data:[]
	};
	
	$.fn.selection.parseOptions = function(target) {
		var t = $(target);
        return $.extend({},$.parser.parseOptions(target, ["width",{
        	panelWidth: "number",
            multiple: "boolean",
            editable: "boolean",
            disabled: "boolean"
        }]), {
        	panelWidth: (t.attr("panelWidth") == "auto" ? "auto": parseInt(t.attr("panelWidth")) || undefined),
            multiple: (t.attr("multiple")==true ? true: undefined),
            editable: (t.attr("disabled")==true ? true: undefined),
            disabled: (t.attr("disabled")==true ? true: undefined),
            value: (t.val() || undefined)
        });
	};
	    
	$.fn.selection.methods={
		options: function(jq) {
            return $.data(jq[0], "selection").options;
        },
		getValue:function(jq) {
			return getValue(jq[0]);
		},
		getValues: function(jq) {
            return getValues(jq[0]);
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                setValues(this, values);
            });
        },
		resize: function(jq, width) {
            return jq.each(function() {
                setSize(this, width);
            });
        },
        getText: function(jq) {
            return getText(jq[0]);
        },
        setText: function(jq, text) {
            return jq.each(function() {
            	setText(this, text);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                setDisabled(this, true);
                bindEvents(this);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                setDisabled(this, false);
                bindEvents(this);
            });
        }
	};
	
	function init(target,opt){
		createCombobox(target,opt);
		setSize(target,opt);
		bindEvents(target,opt);
	}
	function getText(target) {
	    return $(target).find(".select_input").val();
	}
	function setText(target, text) {
        $(target).find(".select_input").val(text);
    }
	function getValue(target) {
        return  $(target).find(".vle").val();
    }
	
	function getValues(target) {
        var values = [];
        $(target).find(".vle").each(function() {
            values.push($(this).val());
        });
        return values;
    }
	function setValues(target,values){
		$(target).find(".vle").val(values);
	}
	function setSize(target,opt){
		$(target).css({'width':opt.width,'height':'25px'});
		$(target).find(".select_panel").css({'width':opt.width,'height':'25px'});
		$(target).find(".select_input").css({'width':opt.width-30,'border-width':'0px'});
		$(target).find(".select_icon").css({'width':'24px','height':'25px'});
		$(target).find("#select_box").css({'width':opt.panelWidth,'height':'220px',"position":"relative"});  
		$(target).find(".option_text").css('width',opt.panelWidth);
	}
	function setDisabled(target, disabled) {
		var opts = $.data(target, "selection").options;
        if (String(disabled) == "true" || disabled == "disabled") {
        	opts.disabled = true;
            $(target).attr("disabled", true);
        } else {
        	opts.disabled = false;
            $(target).removeAttr("disabled");
        }
    }
	function bindEvents(target,opt){
		var selectDataTxt = [];
		var selectDataVal = [];
		
		$(document).bind("click.selection", function(e){
			var select_box = $(target).find("#select_box") ;
			if (select_box.hasClass("select_box_selected")) {
				select_box.removeClass("select_box_selected").addClass("select_box");
	        }
		});
		
		$(target).find(".select_panel").live("click",function(e){
			if($(target).find("div.datagrid-view").length > 0){
				$(target).combogrid("grid").combogrid("resize");
			}
			var select_box = $(target).find("#select_box") ;
			if(select_box.css("display") == "none"){
				e.stopPropagation();
				$(".select_box_selected").removeClass("select_box_selected").addClass("select_box");
				select_box.removeClass("select_box").addClass("select_box_selected");
			}else{
				select_box.removeClass("select_box_selected").addClass("select_box");
			}
		});
		$(target).find(".option_text").bind("click",function(e){
			var _multiple = opt.multiple ;
			var _v = $(this).attr("value");
			var _txt = $(this).text();
			if(_multiple){
				var _obj = $(this).find("input");
				var hidObj = $(target).find(".vle");
				if(!_obj.is(":checked")){
					_obj.attr("checked",false);
					selectDataTxt.splice($.inArray(_txt,selectDataTxt),1);
					selectDataVal.splice($.inArray(_v,selectDataVal),1);
					$(target).find(".select_input").attr("value",selectDataTxt.toString());
					hidObj.attr("value",selectDataVal.toString());
				}else{
					selectDataTxt.push(_txt);
					selectDataVal.push(_v);
					hidObj.attr("value",selectDataVal.toString());
					$(target).find(".select_input").attr("value",selectDataTxt.toString());
					_obj.attr("checked",true);
				}
			}else{
				$(target).find(".select_input").attr("value",_txt);
				$(target).find(".select_input").attr("name",_v);
				$(target).find("#select_box").removeClass("select_box_selected").addClass("select_box");
			}
		});
		
		$(target).find(".select_box").live("click",function(e){
			e.stopPropagation();//阻止事件向上冒泡 
		});
		
		
    }
	
	
	function createOptions(target,opt){
		var _d = opt.data ;
		var n = _d.length ;
		var _multiple = opt.multiple ;
		if(_multiple && n > 0){
			for(var i=0;i<n;i++){
				var option_span = $("<div class='option_text' value='"+_d[i].value+"'><input type='checkbox' name='"+opt.name+"'/>"+_d[i].text+"</div>");
				$(target).find(".select_box").append(option_span);
			}
		}else{
			$(target).find(".select_box").children('div').remove();
			for(var i=0;i<n;i++){
				var option_span = $("<div class='option_text' value='"+_d[i].value+"'>"+_d[i].text+"</div>");
				$(target).find(".select_box").append(option_span);
			}
		}
	}
	
	
	function createCombobox(target,opt){
		var select_panel = $("<div class='select_panel'></div>");
		var select_box = $("<div id='select_box' class='select_box'></div>");
		target.append(select_panel);
		target.append(select_box);
		var _input = $("<input type='text' class='select_input'/><input type='hidden' name='"+opt.name+"' class='vle'/>");
		var _icon = $("<div class='select_icon'></div>");
		
		select_panel.append(_input);
		select_panel.append(_icon);
		
		if(opt.data){
			select_panel.attr("disabled", opt.disabled);
			createOptions(target,opt);
		}
	}
	
	
	
})(jQuery);