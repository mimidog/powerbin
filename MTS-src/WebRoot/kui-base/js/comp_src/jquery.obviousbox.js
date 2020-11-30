/**
 * obvious box - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	combo
 */

(function($) {
    $.fn.obviousbox = function(options, param) {
        if (typeof options == 'string') {
            var method = $.fn.obviousbox.methods[options];
            if (method){
				return method(this, param);
			} else {
				return $.fn.combo.methods[options](this, param);
			}
        }
        options = options || {};
        return this.each(function() {
        	 var state = $.data(this, 'obviousbox');

             if (state) {
                 $.extend(state.options, options);
             } else {
                 state = $.data(this, 'obviousbox', {
                     options: $.extend({},
                     $.fn.obviousbox.defaults, $.fn.obviousbox.parseOptions(this), options)
                 });
             }
             init(this);
             if (state.options.dict) {
                 setDict(this, state.options.dict);
             } else {
                 request(this);
             }
        });
    };
    
    $.fn.obviousbox.parseOptions = function(target) {
        var jq = $(target);
        return $.extend({},
        $.parser.parseOptions(target, [{
            colNumbers: "number"
        }], {
            req: (jq.attr("req") ? eval(jq.attr("req")) : undefined)
        }));
    };
    
    $.fn.obviousbox.methods = {
		options:function(jq){
			var opts = $.data(jq[0],'obviousbox').options;
			return opts;
		},
        submit: function(jq, options) {
            return jq.each(function() {
                ajaxSubmit(this, $.extend({},
                $.fn.form.defaults, options || {}));
            });
        },
        loadData: function(jq, data) {
            return jq.each(function() {
            	loadData(this, data);
            });
        },
        setValue: function(jq,id){
        	return jq.each(function() {
                setValue(this,id);
            });
        },
		setValues: function(jq,values){
        	return jq.each(function() {
                setValues(this,values);
            });
        },
		selectAll: function(jq){
			return jq.each(function() {
                selectAll(this);
            });
		},
		getSelected: function(jq){
			return getSelected(jq);
		},
		reverse: function(jq){
			return jq.each(function() {
                reverse(this);
            });
		},
        reset: function(jq, isClearChangeStatus) {
            return jq.each(function() {
                reset(this, isClearChangeStatus);
            });
        },
		hasChanged: function(jq){
			return hasChanged(jq[0]);
		},
		getAddedItem: function(jq){
			return getAddedItem(jq[0]);
		},
		getDeletedItem: function(jq){
			return getDeletedItem(jq[0]);
		}
    };
         
    $.fn.obviousbox.defaults = {
        url: null,
        req: [],
        autoSubmit:true,
        multiple:false,
		valueField:null,
		textField:null,
		toolbar:true,
		data:[],
		loaded:false,
        maxRows:100,
        selected:[],
		isDevFlag:false,
        dftValue:null,
        onSubmit:function(data){},
        success: function(data) {},
        onBeforeLoad: function(param) {},
        onLoadSuccess: function(data) {},
        onLoadError: function() {},
		onSelect: function(key){},
		onUnSelect:function(key){},
		loader:function(param,success,error){
			var opts = $(this).obviousbox('options');
			if(!opts.url && (!opts.req || opts.req.length == 0)) return false;
			if(opts.req && opts.req.length > 0){
				if(!opts.req[0].service)
					opts.req[0]["service"] = "P9999999";
			}
			var resFunc = function(rtnData){
				var data = rtnData[0];
				success(data);
			};
			var p = {
				url:opts.url,
				type:opts.method,
				dataType:'xml',
				async:true,
				responseType:'xml',
				func:resFunc,
				error:function(){
					error.apply(this,arguments)
				},
				req:opts.req || []
			};
			ajaxRequest(p);
		},
		loadFilter:function(data){return data;},
		onClear:function(){}
    };

    /**
     * initial the obvious form
     */
    function init(target) {
    	var opts = $.data(target, "obviousbox").options;
    	$(target).hide();
    	$(target).addClass('obviousbox-f');
    	var container = ["<div class=\"obviousbox\">",
						 "<div class=\"ovs-box-options\">",
						 "<div class=\"ovs-item-clear\" style=\"display:none\">",
						  opts.toolbar?"<a class=\"ovs-clear-button\">清空</a>":"",
						 "</div>",
						  opts.title?"<div class='ovs-box-title'><span>"+opts.title+"</span></div>" : "",
						 "</div>",
						 "</div>"
						];
		$(container.join("")).insertAfter($(target));
		if(opts && opts.data)
			loadData(target,opts.data);
    }
	
	/**
	* request remote data if the url property is setted.
	*/
	function request(target,url,param,remainText){
		var opts = $.data(target,'obviousbox').options;
		if(url){
			opts.url = url;
		}
		param = param || {};
		if(opts.onBeforeLoad.call(target,param) == false) return;
		opts.loader.call(target,param,function(data){
			loadData(target,data,remainText);
		},function(){
			opts.onLoadError.apply(this,arguments);
		});
	}

    /**
     * load form data
     * 
	 * data format:
	 * 	[{"key":"aaa"},{"key":"bbb"},...]
	 */
    function loadData(target, data) {
    	if(data && !$.isEmptyObject(data)){
			var options = new Array();//create options table;
			var option;
			if(typeof data == "string")
				option = eval("("+data+")");
			else
				option = data;
			var opts = $.data(target, "obviousbox").options;
			option = opts.loadFilter.call(target,option);
			$(".ovs-box-options",$(target).next()).css("height","").find(".ovs-item").remove();
			$(".combo-value",$(target).next()).remove();
			var dft = opts.dftValue;
			if(dft){
				options.push("<div class=\"ovs-item\" style=\"width:"+(opts.itemWidth ? (opts.itemWidth+"px"):"240px")+"\">");
				for(k in dft){
					options.push("<a data-value=\""+k+"\" class=\"ovs-item-a ovs-item-dft ovs-item-a-on\">"+dft[k]+"</a>");
				}
				options.push("</div>");
			}
			
			$.each(option,function(j,b){
				options.push("<div class=\"ovs-item\" style=\"width:"+(opts.itemWidth ? (opts.itemWidth+"px"):"240px")+"\">");
				if(opts.checkbox)
					options.push("<input type='checkbox' class='item-checkbox' value='"+b[opts.valueField]+"' name='"+b[opts.valueField]+"'/>");
				var text = "";
				if(opts.textField){
					var arr = opts.textField.split(",");
					for(var i=0,len=arr.length;i<len;i++){
						text += b[arr[i]];
						if(i+1 != len)
							text += "-";
					}
				}
				options.push("<a data-value=\""+b[opts.valueField]+"\" class=\"ovs-item-a\">"+text+"</a>");
				options.push("</div>");
			});
			$(".ovs-box-options",$(target).next()).append(options.join(""));
			$(target).next().append($("<input class=\"combo-value\" type=\"hidden\" name=\""+$(target).attr("name")+"\" value=\"\"/>"));
			setSize(target);
			bindEvents(target);
		}
    }
	
    function bindEvents(target){
    	$(".ovs-box-options",$(target).next()).unbind(".obviousbox").bind("click.obviousbox",function(e){
    		var $it = $(e.target);
    		var opts = $.data(target, "obviousbox").options;
    		var $container = $(".ovs-box-options",$(target).next());
    		if($it.hasClass("ovs-item-a")){
				var $checkbox = $it.prev("input:checkbox");
				opts.isDevFlag = true;
				$checkbox.click();
    		} else if($it.hasClass("item-checkbox")){
				if($it.is(":checked") && opts.isDevFlag){
					$it.removeClass().addClass("item-checkbox");
					if(opts.loaded && opts.multiple) {//做数据选择改变判断
						if(isInBaseData(target,$it.attr("value"))){
							$it.next().addClass("item-change-deleted");
						} else {
							$it.next().removeClass().addClass("ovs-item-a");
						}
					}
					opts.onUnSelect.call(target);
				}else if(!$it.is(":checked") && !opts.isDevFlag){
					$it.removeClass().addClass("item-checkbox");
					if(opts.loaded && opts.multiple){//做数据选择改变判断
						if(isInBaseData(target,$it.attr("value"))){
							$it.next().addClass("item-change-deleted");
						}else
							$it.next().removeClass().addClass("ovs-item-a");
					}
					opts.onUnSelect.call(target);
				}else{
					$it.addClass("item-checkbox-checked");
					if(opts.toolbar)
						$(".ovs-item-clear",$(target).next()).show();
					if(!opts.multiple){
						$it.parent().siblings("div.ovs-item").find("input.item-checkbox-checked").each(function(){
							$(this).attr("checked",false);
							$(this).removeClass().addClass("item-checkbox");
						});
					}
					if(opts.loaded && opts.multiple){//做数据选择改变判断
						if(isInBaseData(target,$it.attr("value")))
							$it.next().removeClass().addClass("ovs-item-a");
						else
							$it.next().addClass("item-change-added");
					}
					opts.onSelect.call(target,$it.attr("value"));
				}
				opts.isDevFlag = false;
				$(target).next().find("input.combo-value").attr("value",getSelected(target));
			} else if($it.hasClass("ovs-clear-button")) {
    			reset(target, true);
    			$it.parent().hide();
    			$(target).next().find("input.combo-value").attr("value","");
    			opts.selected = [];
    		} else if($it.hasClass("ovs-more-button")) {
    			var $more = $it.parent();
    			moreButtonHandler($more,$container);
    		}else if($it[0].nodeName == "B") {
    			var $more = $it.closest("div.ovs-item-more");
    			moreButtonHandler($more,$container);
    		}
		});
    	
    	function moreButtonHandler($more,$container){
    		if($more.hasClass("more-expand")){
				$container.css({"overflow":"auto","height":"72px"});
				$more.removeClass().addClass("ovs-item-more more-close");
				$more.find("a.ovs-more-button").text("收起").append("<b></b>");
				$(".ovs-box-title").css("height",($(".ovs-box-options",$(target).next())[0].scrollHeight+20)+"px");
			} else {
				$container.css({"overflow":"hidden","height":"36px"});
				$more.removeClass().addClass("ovs-item-more more-expand");
				$more.find("a.ovs-more-button").text("展开").append("<b></b>");
				$(".ovs-box-options",$(target).next()).scrollTop(0);
				$(".ovs-box-title").css("height","100%");
			}
    	}
    }
    
    function setDict(target, dict){
    	//TODO set options width dictionary
    }
	
	function isInBaseData(target,value){
		var opts = $.data(target, "obviousbox").options;
		var data = opts.data;
		for(var i=0,len=data.length;i<len;i++){
			if(data[i] == value)
				return true;
		}
		return false;
	}
	
	function hasChanged(target){
		return $("a[class*='item-change']",$(target).next()).length > 0;
	}
	
	function getAddedItem(target){
		var added = [];
		$(".item-change-added",$(target).next()).each(function(){
			added.push($(this).attr("data-value"));
		});
		return added;
	}
	
	function getDeletedItem(target){
		var deleted = [];
		$(".item-change-deleted",$(target).next()).each(function(){
			deleted.push($(this).attr("data-value"));
		});
		return deleted;
	}
	
	function selectAll(target){
		var opts = $.data(target, "obviousbox").options;
		$(".item-checkbox",$(target).next()).each(function(){
			if(!$(this).is(":checked")){
				opts.isDevFlag = true;
				$(this).click();
			}
		});
	}
    
    function getSelected(target){
		var selected = [];
    	$(".ovs-box-options",$(target).next()).find("input.item-checkbox-checked").each(function(){
			selected.push($(this).val());
		});
		return selected;
    }
	
	function reverse(target){
		var opts = $.data(target, "obviousbox").options;
		$("input.item-checkbox",$(target).next()).each(function(){
			opts.isDevFlag = true;
			$(this).click();
		});
	}
    
    function setValue(target,value){
		var opts = $.data(target, "obviousbox").options;
		opts.isDevFlag = true;
    	$(".item-checkbox[value='"+value+"']",$(target).next()).click();
    }
	
	function setValues(target,values){
		var opts = $.data(target, "obviousbox").options;
		opts.loaded = true;
		if(!values || values.length == 0) return;
		opts.data = values;
		for(var i=0; i<values.length; i++){
			opts.isDevFlag = true;
			$(".item-checkbox[name='"+values[i]+"']",$(target).next()).click();
		}
	}
    
    function reset(target, isClearChangeStatus){
        isClearChangeStatus = "undefined" === $.type(isClearChangeStatus) ? true : !!isClearChangeStatus;
		var opts = $.data(target, "obviousbox").options;
        var $checkeds=$(".item-checkbox-checked",$(target).next());
        if(!isClearChangeStatus) {
            $checkeds.each(function(){
                opts.isDevFlag = true;
                $(this).click();
            });
        }else{
            opts.loaded = false;
            opts.data = [];
            $checkeds.each(function(){
                opts.isDevFlag = true;
                $(this).click();
            });
            $("a[class*='item-change']",$(target).next()).each(function(){
                $(this).removeClass().addClass("ovs-item-a");
            });
        }
		opts.onClear.call(target);
    }

	function setSize(target){
		var opts = $.data(target, "obviousbox").options;
    	var $container = $(".ovs-box-options",$(target).next());
    	var scrollHeight = $container.outerHeight();
    	if(scrollHeight > 48 && opts.toolbar){
    		$container.css({"overflow":"hidden","height":"36px"});
    		var $more = $("<div class=\"ovs-item-more more-expand\"><a class=\"ovs-more-button\"><b></b>展开</a></div>");
    		$container.prepend($more);
    	}else{
			var height = opts.scrollHeight || scrollHeight;
			$container.css({"overflow":"auto","height":(height < 36 ? 36 : height)+"px"});
		}
    }
    
})(jQuery);
