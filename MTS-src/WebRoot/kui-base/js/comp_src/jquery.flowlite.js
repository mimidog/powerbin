/**
 * flowlite - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 * @author liuqing 2014-7-22 更轻量级的flow插件
 */
(function($) {
	
var defaults = {
		freeTodoNode: false,	//true-所有的todo节点都触发onTodoNodeClick事件，false-紧跟在selected节点后的todo节点才触发onTodoNodeClick事件
		data: null,
		onDoneNodeClick: $.noop,
		onSelectedNodeClick: $.noop,
		onIngNodeClick: $.noop,
		onTodoNodeClick: $.noop,
		onBeforeNodeJump: $.noop,
		onNodeJumpSuccess: $.noop,
		scrollPixel: 150,
		scrollSpeed: 200
	},
	
	core = {
		parseOptions: function(target) {
			return $.extend({}, $.parser.parseOptions(target));
		},
		
		init: function(target) {
			var opts = target.data("flowlite").options,
				nodeTxt, nodeCfg;
			
			if(!opts.data) {
				opts.data = [];
				target.find(">div").each(function() {
					nodeTxt = $(this).text();
					nodeCfg = $.parser.parseOptions(this);
					nodeCfg["text"] = nodeTxt ? nodeTxt : nodeCfg["text"];
					opts.data.push(nodeCfg);
				});
			}
			
			if(!opts.data.length) {
				return;
			}
			
			target.empty();
			
			opts.ui = {
				flowPanel: target.addClass("flow-panel"),
				scrollLeftBtn: $("<div class='flow-scroll flow-scroll-left'></div>").appendTo(target),
				flowCenter: $("<div class='flow-center'></div>").appendTo(target),
				flowNodes: $("<div class='flow-nodes'></div>").appendTo(target.find(".flow-center")),
				scrollRightBtn: $("<div class='flow-scroll flow-scroll-right'></div>").appendTo(target)
			};
			
			core.render(target);
		},
		
		render: function(target) {
			var opts = target.data("flowlite").options,
				data = opts.data,
				i = 0, l = data.length,				
				sData, currentIndex, arrow, node,
				width = 0;
			
			for(; i < l; i++) {
				sData = data[i];
				sData["index"] = i;
				arrow = $("<div class='flow-arrow'>");
				node = $("<div class='flow-node'></div>").text(sData.text).attr("title", sData.text).attr("data-index", i);
				
				if(sData.isCurrent) {
					currentIndex = i;
				}
				
				if("number" === $.type(currentIndex)) {
					if(i === currentIndex) {
						arrow.addClass("flow-arrow-done");
						node.addClass("flow-node-ing").addClass("node-selected");
					} else {
						arrow.addClass("flow-arrow-todo");
						node.addClass("flow-node-todo");
					}
				} else {
					node.addClass("flow-node-done");
					arrow.addClass("flow-arrow-done");
				}
				
				if(i > 0) {
					opts.ui.flowNodes.append(arrow);
				}
				opts.ui.flowNodes.append(node);
				
				width += arrow.outerWidth(true) + node.outerWidth(true);
			}
			
			opts.ui.flowNodes.width(width + 1);
			core.resize(target);
			core.regEvents(target);
		},
		
		resize: function(target) {
			var opts = target.data("flowlite").options,
				ui = opts.ui,
				width = $(ui.flowPanel.parent()).width(),
				flowNodesWidth = ui.flowNodes.width(),
				centerWidth = width - ui.scrollLeftBtn.outerWidth(true) - ui.scrollRightBtn.outerWidth(true);
			
			centerWidth = centerWidth > flowNodesWidth ? flowNodesWidth : centerWidth;
			ui.flowCenter.width(centerWidth);
			core.toggleScroll(target);
		},
		
		toggleScroll: function(target) {
			var opts = target.data("flowlite").options,
				ui = opts.ui,
			
				centerWidth = ui.flowCenter.width(),
				flowNodesWidth = ui.flowNodes.width(),
				scrollLeft = ui.flowCenter.scrollLeft();
		
			setVisible.call(ui.scrollLeftBtn, !!scrollLeft);
			setVisible.call(ui.scrollRightBtn, centerWidth < flowNodesWidth && scrollLeft < flowNodesWidth - centerWidth);
					
			function setVisible(flag) {
				$(this).css("visibility", flag ? "visible" : "hidden");
			}
		},
		
		regEvents: function(target) {
			var opts = target.data("flowlite").options,
				ui = opts.ui;
			
			ui.flowNodes.find(".flow-node").hover(function(e) {
				var node = $(e.target);
				if(core.isNodeEnabled(target, node)) {
					node.addClass("node-pointer");
				}
			}, function() {
				$(this).removeClass("node-pointer");
			});
			
			ui.flowPanel.find(".flow-scroll").click(function() {
				core.scroll(target, $(this).hasClass("flow-scroll-right") ? opts.scrollPixel : -opts.scrollPixel);
			});
			
			ui.flowNodes.click(function(e) {
				var node = $(e.target);
				if(!core.isNode(node) || !core.isNodeEnabled(target, node)) {
					return false;
				}
				
				if(node.hasClass("node-selected")) {
					opts.onSelectedNodeClick.call(node, e, core.getNodeData(target, node));
					return false;
				}
				
				if(node.hasClass("flow-node-done")) {
					opts.onDoneNodeClick.call(node, e, core.getNodeData(target, node), target);
				} else if(node.hasClass("flow-node-ing")) {
					opts.onIngNodeClick.call(node, e, core.getNodeData(target, node), target);
				} else if(node.hasClass("flow-node-todo")) {
					opts.onTodoNodeClick.call(node, e, core.getNodeData(target, node), target);
				}
			});
		},
		
		scroll: function(target, offset) {
			var opts = target.data("flowlite").options,
				ui = opts.ui,
				scrollLeft = ui.flowCenter.scrollLeft();
			
			ui.flowCenter.animate({scrollLeft : scrollLeft + offset}, opts.scrollSpeed, function() {
				core.toggleScroll(target);
			});
		},
		
		isNodeEnabled: function(target, node) {
			var opts = target.data("flowlite").options,
				nodeData = core.getNodeData(target, node),
				preNode = node.prev().prev(),
				preData = core.getNodeData(target, preNode);
		
			return opts.freeTodoNode || (!!node.length && 
						((node.hasClass("flow-node-done") && false !== nodeData.revisit) || 
							node.hasClass("flow-node-ing") || 
								(preNode.hasClass("flow-node-ing") && preNode.hasClass("node-selected") && !preData.isEnd)));
		},
		
		getNodeData: function(target, arg) {
			var data = target.data("flowlite").options.data;
			
			if(!arg) {
				return data;
			}
			return data["number" === $.type(arg) ? arg : $(arg).data("index")];
		},
		
		getCurrentNode: function(target) {
			return target.find(".flow-node-ing");
		},
		
		getSelectedNode: function(target) {
			return target.find(".node-selected");
		},
		
		isNode: function(node) {
			return node.hasClass("flow-node");
		},
		
		isIngNode: function(node) {
            return this.isNode(node) && node.hasClass("flow-node-ing");
        },

		isDoneNode: function(node) {
            return this.isNode(node) && node.hasClass("flow-node-done");
        },
        
        isTodoNode: function(node) {
        	return this.isNode(node) && node.hasClass("flow-node-todo");
        },
        
        isSelectedNode: function(node) {
        	return this.isNode(node) && node.hasClass("node-selected");
        },
        
		getPrevNode: function(target, node) {
			node = node ? node.prev().prev() : core.getSelectedNode(target).prev().prev();
			return !node.length || core.isNodeEnabled(target, node) ? 
						node : core.getPrevNode(target, node);
		},
		
		getNextNode: function(target, node) {
			node = node ? node.next().next() : core.getSelectedNode(target).next().next();
			return !node.length || core.isNodeEnabled(target, node) ? 
						node : core.getNextNode(target, node);
		},
		
		go2Node: function(target, node, restart) {
			var opts = target.data("flowlite").options,
				offsetPre = core.getSelectedNode(target).offset(),
				offset = offsetPre ? node.offset().left - offsetPre.left : 0,
				sibDiv;
			
			if(false === opts.onBeforeNodeJump.call(node, core.getNodeData(target, node))) {
				return;
			}

			node.prevAll("div").each(function() {
				sibDiv = $(this);
				if(core.isNode(sibDiv)) {	//node
					if(core.isSelectedNode(sibDiv)) {
						sibDiv.removeClass("node-selected");
					}
					
					if(core.isIngNode(sibDiv)) {
						sibDiv.removeClass("flow-node-ing").addClass("flow-node-done");
					}
					
					if(core.isTodoNode(sibDiv)) {
						sibDiv.removeClass("flow-node-todo").addClass("flow-node-done");
					}
				} else {	//arrow
					if(sibDiv.hasClass("flow-arrow-todo")) {
						sibDiv.removeClass("flow-arrow-todo").addClass("flow-arrow-done")
					}
				}
			});
			
			node.nextAll("div").each(function() {
				sibDiv = $(this);
				if(core.isNode(sibDiv)) {	//node
					if(core.isSelectedNode(sibDiv)) {
						sibDiv.removeClass("node-selected");
					}
					
					if(restart && core.isDoneNode(sibDiv)) {
						sibDiv.removeClass("flow-node-done").addClass("flow-node-todo");
					}
					
					if(restart && core.isIngNode(sibDiv)) {
						sibDiv.removeClass("flow-node-ing").addClass("flow-node-todo");
					}
				} else {	//arrow
					if(restart && sibDiv.hasClass("flow-arrow-done")) {
						sibDiv.removeClass("flow-arrow-done").addClass("flow-arrow-todo")
					}
				}
			});
			node.addClass("node-selected");
			if(restart || core.isTodoNode(node)) {
				node.removeClass("flow-node-todo").addClass("flow-node-ing");
			}
			
			opts.onNodeJumpSuccess.call(node, core.getNodeData(target, node));
			core.scroll(target, offset);
		}
	},
	
	methods = {
		options: function() {
			return this.data("flowlite").options;
		},
		
		getNodeData: function(arg) {
			return core.getNodeData(this, arg);
		},
		
		resize: function() {
			this.each(function() {
				core.resize($(this));
			});
		},
		
		getPrevNode: function(node) {
			return core.getPrevNode(this, node);
		},
		
		getNextNode: function(node) {
			return core.getNextNode(this, node);
		},
		
		go2Node: function(node, restart) {
			core.go2Node(this, node, restart);
		},
		
		isDoneNode: function(node) {
			return core.isDoneNode(node);
		},
		
		isIngNode: function(node) {
			return core.isIngNode(node);
		},
		
		isTodoNode: function(node) {
			return core.isTodoNode(node);
		},
		
		destroy: function() {
			this.removeClass("flow-panel").empty();
		},
		
		getCurrentNode: function() {
			return core.getCurrentNode(this);
		},
		getSelectedNode:function(){
			return core.getSelectedNode(this);
		},
		isNodeEnabled:function(node){
			return core.isNodeEnabled(node);
		}
	};
	
$.fn.flowlite = function(options) {
	var target,
		slice = Array.prototype.slice;
	
    if ("string" === $.type(options)) {
    	return methods[options].apply(this, slice.call(arguments, 1));
    }
    
    return this.each(function() {
    	target = $(this);
    	if(!target.data("flowlite")) {
    		target.data("flowlite", {
                 options: $.extend({}, defaults, core.parseOptions(this), options)
             });
    	}
    	core.init(target);
    });
};
$.fn.flowlite.methods = methods;
$.fn.flowlite.defaults = defaults;
})(jQuery);