/**
 * 流程组件
 * @author liuqing 2014-5-28 
 */
(function(window, $, undefined) {
var document = window.document,
	location = window.location;
	
var Flow = (function() {
	
		//流程组件默认配置
	var flowDefaults = {
			onNodeClick : $.noop,
			scrollPixel : 150,	//滚动偏移量
			scrollSpeed : 200,	//滚动动画速度
			disabledDone : ["50"], //在数组中的已完成节点将被禁用
			endPriority : null	//流程终止节点，默认流程到最后的节点
		},
		
		//流程组件构造器
		Flow = function(flowData, configs, rootPanel) {
			return new Flow.fn.init(flowData, configs, rootPanel);
		};
	
	Flow.fn = Flow.prototype = {
			
		version : "1.0",
		
		constructor : Flow,
		
		init : function(flowData, configs, rootPanel) {
			
			//流程组件ui
			var flowPanel = rootPanel ? rootPanel : $("#flow_panel");
			this.ui = {
				flowPanel : flowPanel,
				flowCenter : flowPanel.find(".flow-center"),
				flowNodes : flowPanel.find(".flow-nodes"),
				scrollLeftBtn : flowPanel.find(".flow-scroll-left"),
				scrollRightBtn : flowPanel.find(".flow-scroll-right")
			};
			
			/**
			 * 流程数据
			 * [{
			 *		activityId : "sid-D9A795BA-FB02-4E24-B700-2BFFF47830F7",
			 *		formKey : "1802",
			 *		priority : "20",
			 *		isCurrent : "false",
			 *		activityName : "账户信息"
			 *	},{...}]
			 */
			this.data = flowData;
			
			//流程组件配置
			this.config = $.extend({}, flowDefaults, configs);
			
			this.render();
		}
	};
	
	Flow.fn.init.prototype = Flow.fn;
	
	Flow.extend = Flow.fn.extend = $.extend;
	
	Flow.fn.extend({
		
		render : function() {
			var flowData = this.data,
				currentIdx;
			for(var i = 0, l = flowData.length; i < l; i++) {
				var sData = flowData[i],
					arrow = $("<div class='flow-arrow'>"),
					node = $("<div class='flow-node'></div>").text(sData.activityName).attr("title", sData.activityName);
				
				if(JSON.parse(sData.isCurrent)) {
					currentIdx = i;
				}
				
				if("number" === $.type(currentIdx)) {
					if(i === currentIdx) {
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
				
				if(i === 0) {
					this.ui.flowNodes.append(node);
				} else {
					this.ui.flowNodes.append(arrow).append(node);
				}
				
				node.attr("data-index", i);
			}
			this.resize();
			this.regEvents();
		},
		
		regEvents : function() {
			var context = this,
				config = context.config,
				ui = context.ui,
				data = context.data;
			
			$(window).resize(function() {
				context.resize();
			});
			
			//左右滚动按钮点击事件控制
			ui.flowPanel.find(".flow-scroll").click(function() {
				var isPositive = $(this).hasClass("flow-scroll-right"),
					offset = isPositive ? config.scrollPixel : -config.scrollPixel;
				context.scroll(offset);
			});
			
			///流程节点鼠标样式控制
			ui.flowNodes.find(".flow-node").hover(function(e) {
				var target = $(e.target);
				if(context.isNodeEnabled(target)) {
					target.addClass("mouse-pointer");
				}
			}, function() {
				$(this).removeClass("mouse-pointer");
			});
			
			//流程节点点击事件控制（通过判断节点是否有mouse-pointer样式控制onNodeClick事件）
			ui.flowNodes.click(function(e) {
				var target = $(e.target);
				if(!target.hasClass("flow-node")) {
					return false;
				}
				if(target.hasClass("mouse-pointer")) {
					config.onNodeClick.call(target, e);
				}
			});
		},
		
		isNodeEnabled : function(node) {
			var context = this,
				config = context.config,
				nodeData = context.getNodeData(node),
				preNode = node.prev().prev(),
				preData = context.getNodeData(preNode);
			
			return !!node.length && 
						(node.hasClass("flow-node-done") && ($.inArray(nodeData.priority, config.disabledDone) === -1) || 
						node.hasClass("flow-node-ing") ||
							(preNode.hasClass("flow-node-ing") && 
									preNode.hasClass("node-selected") && !(preData.priority === config.endPriority)));				
		},
		
		/**
		 * 获得当前流程的数据
		 */
		getFlowData : function(node) {
			return this.data;
		},
		
		/**
		 * 获得当前节点的数据
		 */
		getNodeData : function(node) {
			return this.data[node.data("index")];
		},
		
		/**
		 * 获得当前流程所到的节点，界面有class=flow-node-ing的节点
		 */
		getCurrentNode : function() {
			return this.ui.flowNodes.find(".flow-node-ing");
		},
		
		/**
		 * 获得当前选中节点的前一个可用节点
		 * @param node 内部使用
		 */
		getPrevNode : function(node /* internal use only */) {
			node = node ? node : this.getSelectedNode().prev().prev();
			return !node.length || this.isNodeEnabled(node) ? 
						node : this.getPrevNode(node.prev().prev());
		},
		
		/**
		 * 获得当前选中的节点，界面有class=node-selected的节点
		 */
		getSelectedNode : function() {
			return this.ui.flowNodes.find(".node-selected");
		},
		
		/**
		 * 获得当前选中节点的后一个可用节点
		 * @param node 内部使用
		 */
		getNextNode : function(node /* internal use only */) {
			node = node ? node : this.getSelectedNode().next().next();
			return !node.length || this.isNodeEnabled(node) ? 
						node : this.getNextNode(node.next().next());
		},
		
		/**
		 * 跳转界面并改变相应节点样式，这里只做了界面更新
		 */
		go2Node : function(node, callback) {
			var context = this,
				config = context.config;
			
				preSelected = node.siblings(".flow-node").filter(
							function() {
								return $(this).hasClass("node-selected");
							}).removeClass("node-selected"),
				offsetPre = preSelected.offset(),
				offset = offsetPre ? node.offset().left - offsetPre.left : 0;
				
			node.addClass("node-selected");
			if(node.hasClass("flow-node-todo")) {
				node.prev().prev().removeClass("flow-node-ing").addClass("flow-node-done");
				
				node.removeClass("flow-node-todo").addClass("flow-node-ing");
				node.prev().removeClass("flow-arrow-todo").addClass("flow-arrow-done");
			}
			context.scroll(offset);
			if($.isFunction(callback)) {
				callback.call(node, preSelected);
			}
		},
		
		//界面尺寸控制
		resize : function() {
			var ui = this.ui,
				width = $(window).width(),
				centerWidth = width - 60,
				nodesWrapWidth = (function() {
					var w = 0;
					ui.flowNodes.find(">div").each(function() {
						w += $(this).outerWidth(true);
					});
					return w;
				})();
			
			ui.flowCenter.width(centerWidth);
			ui.flowNodes.width(nodesWrapWidth);
			
			this.toggleScroll();
		},
		
		//滚动按钮界面控制
		toggleScroll : function() {
			var ui = this.ui,
				
				centerWidth = ui.flowCenter.width(),
				nodesWrapWidth = ui.flowNodes.width(),
				scrollLeft = ui.flowCenter.scrollLeft();
			
			scrollLeft ? 
					ui.scrollLeftBtn.fadeIn() : ui.scrollLeftBtn.fadeOut();
					
			centerWidth < nodesWrapWidth && scrollLeft < nodesWrapWidth - centerWidth ?
					ui.scrollRightBtn.fadeIn() : ui.scrollRightBtn.fadeOut();	
		},
		
		/**
		 * 设置流程条偏移位置
		 * @param offset 偏移量，正数右移，负数左移
		 */
		scroll : function(offset) {
			var context = this,
				config = context.config,
				ui = context.ui,
				scrollLeft = ui.flowCenter.scrollLeft();
			
			ui.flowCenter.animate({scrollLeft : scrollLeft + offset}, config.scrollSpeed, function() {
				context.toggleScroll();
			});
		}
	});
	
	return Flow;
})();	

window.Flow = Flow;
})(window, jQuery);