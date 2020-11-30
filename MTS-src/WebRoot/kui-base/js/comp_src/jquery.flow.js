/**
 * flow - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	
 */

(function($) {
    $.fn.flow = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.flow.methods[options](this,param);
        }
        options = options || {};
        return this.each(function() {
            if (!$.data(this, 'flow')) {
                $.data(this, 'flow', {
                    options: $.extend({},
                    $.extend({},
                    $.fn.flow.defaults), $.fn.flow.parseOptions(this), options)
                });
            }
            init(this);
        });
    };
    
    $.fn.flow.parseOptions = function(target) {
        return $.extend({},
        $.parser.parseOptions(target, [{
            colNumbers: "number"
        }]));
    };
    
    $.fn.flow.methods = {
        submit: function(jq, options) {
            return jq.each(function() {
                ajaxSubmit(this, $.extend({},
                $.fn.flow.defaults, options || {}));
            });
        },
        loadData: function(jq, data) {
            return jq.each(function() {
            	loadData(this, data);
            });
        },
		changeStatus: function(jq,params){
			return jq.each(function(){
				changeStatus(this,params);
			});
		},
		getStepStatus: function(jq,index){
			return getStepStatus(jq[0],index);
		},
		enableToolButton: function(jq,op){
			return jq.each(function(){
				enableToolButton(this,op);
			});
		},
		disableToolButton: function(jq,op){
			return jq.each(function(){
				disableToolButton(this,op);
			});
		},
        getValue: function(jq){
        	return getSelected(jq);
        },
        setValue: function(jq,id){
        	return jq.each(function() {
                select(this,id);
            });
        },
		resetStep:function(jq,start,end){
			return jq.each(function() {
                resetStep(this,start,end);
            });
		},
        reset: function(jq) {
            return jq.each(function() {
                reset(this);
            });
        },
		//跳转下一步 by  2016/06/05
		nextStep:function(jq){
			var opts = $.data(jq[0], "flow").options;
			stepTo(jq[0],"next",opts.state,opts.state+1);

		},//跳转上一步 by  2016/06/05
		prevStep:function(jq){
			var opts = $.data(jq[0], "flow").options;
			stepTo(jq[0],"prev",opts.state,opts.state-1);
		}
    };
         
    $.fn.flow.defaults = {
    	steps:null,
    	pages:null,
    	data:[],
    	loadType:null,// iframe,view,html, default load type - iframe
    	configs:{},
		status:{},
		state:null, // current index of step
    	render:{
    		iframe: function(target,config){
    			var $page = $("<div id=\"flow_page_"+config.id+"\"></div>").appendTo(target);
    			var $iframe = $("<iframe scrolling=\"auto\" frameborder=\"0\" allowtransparency=\"true\" style=\"width:100%;height:100%;overflow:auto;\"></iframe>")
    			$iframe.appendTo($page);
    			$iframe.attr("src",config.link);
    		},
    		view: function(target,config){
    			//TODO init view in flow page
    		},
    		html: function(target,config){
    			var $page = $("<div id=\"flow_page_"+config.id+"\"></div>").appendTo(target);
    			$page.load(config.link,{},function(){
					$.parser.director($page);
				});
    		}
    	},
        onBeforeLoad: function(param) {},
        onLoadSuccess: function(data) {},
        onStepSuccess: function() {return true;}
    };

    /**
     * initial the obvious form
     */
    function init(target) {
    	$(target).addClass("flow-f");
    	var $ul = $("<ul class='task-flows'></ul>");
    	var $pages = $("<div class='flow-views'></div>");
		var $tools = $("<div class='flow-tools'><a href='#' class='flow-prev'>上一步</a> <a href='#' class='flow-next'>下一步</a></div>");
    	$(target).append($ul).append($pages).append($tools);
    	var opts = $.data(target, "flow").options;
    	opts.steps = $ul;
    	opts.pages = $pages;
    	if(opts.data && opts.data.length > 0)
    		loadData(target,opts.data);
    }

    /**
     * load flow data
     * 
	 * data format:
	 * 	[
	 *		{title:'1.操作员资料录入',link:'../flow/page1.html'},
	 *		{title:'2.操作员密码设置',link:'../flow/page1.html'},
	 *		{title:'3.操作员岗位设置',link:'../flow/page1.html'},
	 *		{title:'4.操作员菜单授权',link:'../flow/page1.html'}
	 *  ]
	 */
    function loadData(target, data) {
    	if(data && !$.isEmptyObject(data)){
			var steps = new Array();//create options table;
			if(typeof data == "string")
				data = eval("("+data+")");
			var opts = $.data(target, "flow").options;
			var aWidth = $(target).outerWidth();
			var stepWidth = 99.9 / data.length;
			$.each(data,function(i,s){
				var stepId = s.id ? s.id : (i+1);
					stepClass = "";
				if(i==0)
					stepClass = "normal-selected";
				else if(i == data.length-1)
					stepClass = "disabled-end";
				else
					stepClass = "normal-disabled";
				
				s.id = stepId;
				if(s.onClickNext)
					s.onClickNext = eval(s.onClickNext);
				opts.configs[stepId] = s;
				changeStatus(target,{"disable":stepId});
				steps.push("<li id=\"flow_step_"+stepId+"\" link=\""+s.link+"\" class=\""+stepClass+"\" style=\"width:"+stepWidth+"%;\">");
				steps.push("<span>"+s.title+"</span>");
				steps.push("</li>");
			});
			$(steps.join("")).appendTo(opts.steps);
			loadPage(target,1);
			hideToolButton(target,"prev");
			disableToolButton(target,"next");
			bindEvents(target);
		}
    }
	
	function resetStep(target,start,end){
		if(!start) return;
    	var opts = $.data(target, "flow").options;
		end = end || opts.data.length;
		start = Number(start);
		for(var i=start; i< end+1; i++){
			var pageId = "flow_page_"+i;
			var $page = $("#"+pageId,opts.pages);
			$page.remove();
			opts.status[i] = "disable";
		}
		disableToolButton(target,"next");
	}
    
    function loadPage(target,index){
    	var pageId = "flow_page_"+index;
    	var opts = $.data(target, "flow").options;
    	var $page = $("#"+pageId,opts.pages);
		opts.state = index;
    	if($page.length>0 && !opts.configs[index].reload) {
    		$page.show();
    	} else {
			if($page.length>0){
				$page.remove();
			}
    		var config = opts.configs[index],
    			render = opts.render;
    		switch (config.render) {
			case "iframe":
				render["iframe"](opts.pages,config);
				break;
			case "view":
				render["view"](opts.pages,config);
				break;
			case "html":
				render["html"](opts.pages,config);
				break;
			default:
				render["iframe"](opts.pages,config);
				break;
			}
			setSize(target);
    	}
    }
    
    function bindEvents(target){
		var opts = $.data(target, "flow").options;
    	var tools = $(target).find(".flow-tools > a").unbind(".flow").bind("click.flow",function(e){
			if($(this).hasClass("flow-button-disabled")) return;
			if($(this).hasClass("flow-next")){
				stepTo(target,"next",opts.state,opts.state+1);
			} else if($(this).hasClass("flow-prev")){
				stepTo(target,"prev",opts.state,opts.state-1);
			}
		});
		$("html").addClass("panel-fit");
		$(target).parents().css("height","100%");
		setSize(target);
		$(window).resize(function(){
			setSize(target);
		});
    }
	
	function stepTo(target,flow,current,next){
		var opts = $.data(target, "flow").options;
		if(flow == "next"){
			if(opts.configs[current].onClickNext){
				if(!opts.configs[current].onClickNext.call())
					return;
			}
			showToolButton(target,"prev");
			if(opts.status[next] == "disable" || opts.status[next] == "running")
				changeStatus(target,{"running":next});
			if(current-1 > 0){
				$("#flow_step_"+(current-1)).removeClass().addClass("other-completed");
			}
			$("#flow_step_"+current).removeClass().addClass("normal-completed");
			if(opts.data.length == next){
				$("#flow_step_"+next).removeClass().addClass("selected-end");
				hideToolButton(target,"next");
				/*$(target).find(".flow-tools > a.flow-next").show().removeClass("flow-button-disabled").empty().append("完成");*/
			} else {
				if($("#flow_step_"+(next+1)).hasClass("other-completed") || $("#flow_step_"+(next+1)).hasClass("completed-end")){
					$("#flow_step_"+next).removeClass().addClass("prev-selected");
				}else{
					$("#flow_step_"+next).removeClass().addClass("normal-selected");
				}
			}
		} else if(flow == "prev"){
			showToolButton(target,"next");
			if(opts.status[next] == "success"){
				enableToolButton(target,"next");
			}
			if(current == opts.data.length)
				$("#flow_step_"+current).removeClass().addClass("completed-end");
			else {
				if($("#flow_step_"+(current+1)).hasClass("normal-disabled") || $("#flow_step_"+(current+1)).hasClass("disabled-end")){
					$("#flow_step_"+current).removeClass().addClass("next-disabled");
				}else {
					$("#flow_step_"+current).removeClass().addClass("other-completed");
				}
			}
			if(1 == next){
				$("#flow_step_"+next).removeClass().addClass("prev-selected");
				hideToolButton(target,"prev");
			} else {
				$("#flow_step_"+next).removeClass().addClass("prev-selected");
				$("#flow_step_"+(next-1)).removeClass().addClass("prev-completed");
			}
		}
		$("#flow_page_"+current,opts.pages).hide();
		loadPage(target,next);
	}
	
	//params 接收两种参数 string or json
	function changeStatus(target,params){
		var opts = $.data(target, "flow").options;
		if(!params) return;
		if(typeof params == "string"){
			opts.status[opts.state] = params;
			if(params == "success"){
				enableToolButton(target,"next");
			} else if(params == "running"){
				disableToolButton(target,"next");
			}
		} else {
			for(var key in params){
				var index = params[key];
				opts.status[index] = key;
				if(key == "success"){
					enableToolButton(target,"next");
				} else if(key == "running"){
					disableToolButton(target,"next");
				}
			}
		}
	}
	
	function getStepStatus(target,index){
		var opts = $.data(target, "flow").options;
		return opts.status[Number(index)];
	}
    
    function setDict(target, dict){
    	//TODO set options width dictionary
    }
	
    function getSelected(target){
    	var opts = $.data(target, "obviousbox").options;
    	if(opts.selected.length > 0)
    		return opts.selected.join(",");
    }
    
    function setValue(target,value){
    	$(".ovs-item-a[data-value='"+value+"']",$(target).next()).click();
    }
    
    function reset(target){
    	var $clear = $(target).next().find(".ovs-item-clear");
    	if($clear.css("display") != "none"){
    		$clear.find("a.ovs-clear-button").click();
    	}
    }
	
	function showToolButton(target,operation){
		if(operation == "prev"){
			$(target).find(".flow-tools > a.flow-prev").show();
		}else if(operation == "next"){
			$(target).find(".flow-tools > a.flow-next").empty().append("下一步").show();
		}
	}
	
	function hideToolButton(target,operation){
		if(operation == "prev"){
			$(target).find(".flow-tools > a.flow-prev").hide();
		}else if(operation == "next"){
			$(target).find(".flow-tools > a.flow-next").hide();
		}
	}
	
	function disableToolButton(target,operation){
		if(operation == "prev"){
			$(target).find(".flow-tools > a.flow-prev").addClass("flow-button-disabled");
		} else if(operation == "next"){
			$(target).find(".flow-tools > a.flow-next").addClass("flow-button-disabled");
		}
	}
	
	function enableToolButton(target,operation){
		if(operation == "prev"){
			$(target).find(".flow-tools > a.flow-prev").removeClass("flow-button-disabled");
		} else if(operation == "next"){
			$(target).find(".flow-tools > a.flow-next").removeClass("flow-button-disabled");
		}
	}
    
    function setSize(target){
		var $parent = $(target).parent();
		var height = $parent.height();
		var width = $parent.width();
		var outer = $(target).siblings()._outerHeight();
		if(!$parent.hasClass("panel-body") && $parent[0].tagName != "BODY")
			outer += $parent.siblings()._outerHeight();
		var $views = $(target).find(".flow-views");
		$views.css("height",(height-outer-58) + "px");
		var vWidth = width - 10;
		$views.find("div[id^='flow_page_']").css({"width":vWidth + "px","margin":"auto",height:'100%'});
	}
    
    function request(){
    	//TODO request options width ajax
    }
    
})(jQuery);
