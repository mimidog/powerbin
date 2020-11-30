/**
 * 门户引擎核心类库
 * @author liuqing
 */
; (function($, window, undefined) {
	
var document = window.document,
	location = window.location;

var	kPortal = (function() {
	var kPortal = function() {
		return new kPortal.fn._init();
	},
	
	//save a local copy for kPortal so that we can recover it after calling kPortal.noConflict
	_kPortal = window.kPortal,
	_kportal = window.kportal;

	kPortal.fn = kPortal.prototype = {
		constructor: kPortal,
		
		version: "kjdp3.5.0",
		
		_init: function() {
			this.context = $(document);
			this.cache = {};
		}
	}	
	
	//static reference to jQuery.extend
	kPortal.extend = kPortal.fn.extend = $.extend;
	
	//utils
	kPortal.extend({
		
		noConflict: function() {
			if(window.kPortal === kPortal) {
				window.kPortal = _kPortal;
			}
			if(window.kportal === kportal) {
				window.kportal = _kportal;
			}
			return kPortal;
		},
		
		registNamespace: function(nameSpaceName) {
			var nsArray = nameSpaceName.split('.'),
				sEval = "",
				sNS = "";
			for(var i = 0;i < nsArray.length; i++) {
				if(i != 0) {
					sNS += ".";
				}
				sNS += nsArray[i];		        
				sEval += "if (typeof(" + sNS + ")=='undefined') {"
				+ sNS+"=new Object(); "
				+ "}";
			}
			if(sEval.length > 0) {     
				eval(sEval);
				return eval(sNS);
			}		
		},
		
		parsUrl : function(url) {
            var a = document.createElement('a');
            //创建一个链接
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':',''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function(){
                    var ret = {},
                    seg = decodeURI(a.search.replace(/^\?/, '')).split('&'),
                    len = seg.length, i = 0, s;
                    for (;i<len;i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                hash: a.hash.replace('#',''),
                path: a.pathname.replace(/^([^\/])/,'/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
                segments: a.pathname.replace(/^\//,'').split('/')
            };			
		},
		
		getURLParam: function(url) {
            return this.parsUrl(url || window.location.href).params || {};
		}
	});
	
	kPortal.fn._init.prototype = kPortal.fn;
	
	return kPortal;
})();

//internal classes
kPortal.extend({
	Event: function(eventObj) {
		this.eventObj = eventObj;
		
		this.getEventName = function() {
			return this.eventObj["name"] || "KEventName";
		} 
		this.getEventType = function() {
			return this.eventObj["type"] || "KEvent";
		} 
		this.getEventData = function() {
			return this.eventObj["data"] || {};
		} 
		this.getHandler = function() {
			return this.eventObj["handler"] || $.noop;
		}
	},
	
	EventDispatcher: function() {
		this.eventsMap = {};
		
		this.addEventListener = function(event) {
			var eName = event.getEventName();
			if(!this.eventsMap[eName]) {
				this.eventsMap[eName] = [];
			}
			this.eventsMap[eName].push(event);
		}
		
		this.post = function(eName, param) {
			var eventArr = this.eventsMap[eName],
				result = [];
			if(eventArr) {
				for(var i = 0, l = eventArr.length; i < l; i++) {
					var event = eventArr[i];
					result.push(event.getHandler().call(event, param));
				}
			}
			return result;
		}
		
		this.postDomEvent = function(eName, extData) {
			var origType = extData.handleObj.origType.toLowerCase();
			for(var i = 0, len = (this.eventsMap[eName] || []).length; i < len; i++) {
				var event = this.eventsMap[eName][i];
				if(-1 != event.getEventType().indexOf(origType)) {
					event.getHandler().call(extData.target, extData, event.getEventData(), origType);
				}
			}
		}
		
		this.remove = function(eName) {
			delete this.eventsMap[eName];
		}
	},
	
	AbstractPage: function(context) {
	    this.context = context;
	    this.regObj = {};
	    this.domEventDispatcher = new kPortal.EventDispatcher();
	}
});

//add methods to internal classes
kPortal.extend(kPortal.AbstractPage.prototype, {

    addEventListener: function(eName, eType, dataObj, handler) {
        var event = new kPortal.Event({"name":eName, "type":eType, "data":dataObj, "handler":handler});
        this.domEventDispatcher.addEventListener(event);
    },

    registerDelegate: function(selector, trigger) {
        var _this = this, 
        	regTriggerArr = _this.regObj[selector] || [],
        	isNewTrigger = true;

        for(var i = 0, len = regTriggerArr.length; i < len; i++) {
            var regTrigger = regTriggerArr[i];
            if(trigger == regTrigger) {
                isNewTrigger = false;
                break;
            }
        }

        if(isNewTrigger) {
            regTriggerArr.push(trigger);
            _this.regObj[selector] = regTriggerArr;
            _this.context.undelegate(selector, trigger).delegate(selector, trigger, function(e) {
                var eventName = $(e.target).attr("data-event");
                if(eventName) {
                    try {
                        if(_this.domEventDispatcher) {
                            _this.domEventDispatcher.postDomEvent(eventName, e);
                        }
                    } catch(ex) {
                        alert(ex.message);
                    }
                    e.stopPropagation();
                }
            });
        }
    }
});

/**
 * 门户引擎对外的接口
 */
kPortal.fn.extend({
	
	compEventDispatcher: new kPortal.EventDispatcher(),
	
	addCompListener: function(eName, callback, eData) {
		var event = new kPortal.Event({"name":eName, "handler":callback, "data":eData});
		this.compEventDispatcher.addEventListener(event);
	},
	
	triggerCompHandler: function(eName, param) {
		return this.compEventDispatcher.post(eName, param);
	},
	
	removeCompListener: function(eName) {
		this.compEventDispatcher.remove(eName);
	},
	
	dialog: function(params) {
		var defautObj = {
			title: "对话框",
			modal: true,
			width: 650,
			height: 500,
			buttons: [{
				text: "关闭",
				handler: function(e, dialog) {
					dialog.dialog("destroy");
				}
			}],
			onClose: function() {
				$(this).dialog("destroy");
			}
		};
		var params = $.extend(defautObj, params);
		
		return $("<div></div>").append(params.content || "").dialog(params);
	},
	
	/**
	 * 装载主题（组件中调用）
	 * @param menuId 菜单编号
	 * @param userCode 用户代码
	 * @param pObj 装载主题的参数，参数加在主题中的组件url后
	 * @param title 任务栏显示标题（不需要修改则传入null）
	 * @param readonly 是否只读（适用于流程菜单，true-只装载流程控制组件，false-装载流程控制组件和流程工具组件）
     * @param uuid 新的任务栏编号
	 * @param framewindow 组件的window对象，用于获取需要装载主题的父元素
	 */
	buildTheme: function(menuId, userCode, pObj, title, readonly, uuid, framewindow) {
		var context = this,
			lWrap = context.taskBar.getTaskObjByWindow(framewindow).related;
			
		if(title) {
			context.taskBar.renameTask.call(lWrap, title);
		}

        if(uuid) {
            context.taskBar.setTaskUUID.call(lWrap, uuid);
        }
		
		lWrap.addClass("panel-loading").empty();
		context.loadMenuCompCfg({
			service: "P0004024", 
			MENU_ID: menuId, 
			USER_CODE: userCode
		}, function(data) {
			lWrap.removeClass("panel-loading");
			if(data && data.length > 0) {
				if("4" === data[0]["MENU_PUR"]) {	//流程菜单，制造默认的两个数据
					var cfg = context.data("flowMenuCfg");
					if(cfg) {
						data = [];
						data.push($.extend({LAYOUT_ID:cfg.layoutId, BOARD_INDEX:"0", FIXED_DIRECTION:"0", FIXED_HEIGHT:"53"}, cfg.comp[0]));
						if(!readonly) {
							data.push($.extend({LAYOUT_ID:cfg.layoutId, BOARD_INDEX:"0", FIXED_DIRECTION:"2", FIXED_HEIGHT:"30"}, cfg.comp[1]));
						}
					}
				}
				context.buildAllComp(lWrap.empty(), data, null, pObj || {});
			} else {
				lWrap.remove();
				alert("未能获取到菜单组件配置");
			}
		}, function() {
			lWrap.removeClass("panel-loading");
			alert("未能获取到菜单组件配置");
		});	
	},
	
	/**
	 * 在新的任务栏中装载主题
	 * @param menuId 菜单编号
	 * @param userCode 用户代码
	 * @param pObj 装载主题的参数，参数加在主题中的组件url后
	 * @param title 任务栏显示标题
	 * @param readonly 是否只读（适用于流程菜单，true-只装载流程控制组件，false-装载流程控制组件和流程工具组件）
	 */	
	buildThemeInNewTab: function(menuId, userCode, pObj, title, readonly, uuid) {
		var context = this,
			taskItem = this.taskBar.getTaskItem(uuid);
		if(taskItem.length) {
			context.taskBar.minAllTask();
			this.taskBar.maxTask.call(taskItem);
			return;
		}
		
		title = title || "业务主题";
		var pInst = $("#plat_instance>div:visible"),
			isSelfPlat = "-1" === pInst.attr("plat_id"),
			mainPanel = pInst.find(".main-panel"),
			lWrap = $("<div class='layout-wrap'></div>").attr("menu_id", menuId);
		
		context.loadMenuCompCfg({
			service: "P0004024", 
			MENU_ID: menuId, 
			USER_CODE: userCode
		}, function(data) {
			if(!data || !data.length) {
				alert("未能获取到菜单组件配置");
				return;
			}
			
			context.taskBar.minAllTask();
			if(isSelfPlat) {
				context.taskBar.addTaskItem.call(null, title, {
					title: title,
					width: $(window).width() - 100,
					height: $(window).height() - 100,
					minimizable: true,
					onOpen: function() {
						lWrap.appendTo($(this)).show();
					}
				}, true, uuid);
			} else {
				lWrap.appendTo(mainPanel).show();
				context.taskBar.addTaskItem.call(lWrap, title, null, true, uuid);
			}
			
			if("4" === data[0]["MENU_PUR"]) {	//流程菜单，制造默认的两个数据
				var cfg = context.data("flowMenuCfg");
				if(cfg) {
					data = [];
					data.push($.extend({LAYOUT_ID:cfg.layoutId, BOARD_INDEX:"0", FIXED_DIRECTION:"0", FIXED_HEIGHT:"53"}, cfg.comp[0]));
					if(!readonly) {
						data.push($.extend({LAYOUT_ID:cfg.layoutId, BOARD_INDEX:"0", FIXED_DIRECTION:"2", FIXED_HEIGHT:"30"}, cfg.comp[1]));
					}
				}
			}
			lWrap.data("isBuildInNewTab", true);
			context.buildAllComp(lWrap.empty(), data, null, pObj || {});
		}, function() {
			alert("未能获取到菜单组件配置");
		});
	},
	
	/**
	 * 装载流程菜单主题（组件中调用）
	 * @param menuId 菜单编号
	 * @param userCode 用户代码
	 * @param pObj 装载主题的参数，参数加在主题中的组件url后
	 * @param title 任务栏显示标题（不需要修改则传入null）
	 * @param framewindow 组件的window对象
	 */
	buildFlowTheme: function(menuId, userCode, pObj, title, framewindow) {
		var context = this,
            taskObj = context.taskBar.getTaskObjByWindow(framewindow),
			lWrap = taskObj.related,
			taskItem = taskObj.item;
			
		if(title && taskItem) {
			taskItem.text(title);
		}
		context.loadMenuCompCfg({
			service: "P0004024", 
			MENU_ID: menuId, 
			USER_CODE: userCode
		}, function(data) {
			if(data[0] && data[0]["MENU_PUR"] !== "4") {
				alert("装载的菜单不是流程菜单，请使用流程菜单编号");
				return false;
			}
			if(lWrap.attr("layout_id") !== context.data("flowMenuCfg").layoutId) {
				alert("流程菜单的布局和当前主题的布局不一致");
				return false;
			}

			lWrap.find(".comp-wrap").filter(function() {
				return $.type($(this).attr("fixed_direction")) === "undefined";
			}).each(function() {
                context.removeIframe($(this).find("iframe")[0]);
            }).remove();
			context.buildAllComp(lWrap, data, null, pObj || {}, true);
		}, function() {
			alert("未能获取到菜单组件配置");
		});	
	},
	
	/**
	 * 重置主题
	 * @param framewindow 组件的window对象
     * @param title 任务栏标题，不传则重置为最初的标题
	 */
	resetTheme: function(framewindow, title) {
		var context = this,
            lWrap = context.taskBar.getTaskObjByWindow(framewindow).related,
            buildArguments = lWrap.empty().data("buildArguments"),
            pWin = lWrap.parent(),
            isInWindow = pWin.hasClass("window-body");

        context.taskBar.setTaskUUID.call(lWrap);    //重置任务编号
        if(lWrap.data("isBuildInNewTab")) { //通过buildThemeInNewTab接口装载的主题直接移除
            context.taskBar.closeTask.call(isInWindow ? pWin : lWrap);
        } else {
            context.taskBar.renameTask.call(lWrap, title);
            this.buildAllComp.apply(this, buildArguments);
        }
	},
	
	/**
	 * 装载组件
	 * @param parent 需要装载组件的父元素
	 * @param compId 组件编号
	 * @param obj 装载组件时的参数
	 * @param callback 装载成功的回调函数
	 */
	buildComponent: function(parent, compId, obj) {
		var context = this;
		context.requestService({
			service: "P0004135", 
			COMP_ID: compId
		}, function(data) {
			context.createIframe(parent, {src: buildURL(data[0][0]["LINK_PAGE"], obj || {})});
		}, function() {
			alert("组件信息查询失败");
		});
	},

	renameTab: function(title, arg) {
		this.taskBar.renameTask.call($.isWindow(arg) ?
			this.taskBar.getTaskObjByWindow(arg).item : this.taskBar.getTaskItem(arg), title);
	},
	
	addTab: function(title, url, closable, uuid) {
		var taskItem = this.taskBar.getTaskItem(uuid);
		if(taskItem.length) {
			this.taskBar.renameTask.call(taskItem, title);
			this.taskBar.maxTask.call(taskItem);
			this.taskBar.replaceTaskURL(taskItem, url);
			return uuid;
		}
		
		var context = this,
			mainPanel = context.plat.getPlatMainPanel(),
			lWrap = $("<div class='layout-wrap'></div>").appendTo(mainPanel).show(),
			iframeOpts = {
				src: url,
				width: mainPanel.width() - 25,
				height: mainPanel.height() - 20
			};
		
		context.taskBar.minAllTask();
		lWrap.width(mainPanel.width()).height(mainPanel.height());
		context.createIframe(lWrap, iframeOpts);
		return context.taskBar.addTaskItem.call(lWrap, title, null, "undefined" === $.type(closable) ? true : !!closable, uuid);
	},
	
	addWindowTab: function(title, url, opts, closable, uuid) {
		var taskItem = this.taskBar.getTaskItem(uuid);
		if(taskItem.length) {
			this.taskBar.renameTask.call(taskItem, title);
			this.taskBar.maxTask.call(taskItem);
			this.taskBar.replaceTaskURL(taskItem, url);
			return uuid;
		}
		
		var context = this,
			w = $(window).width(),
			h = $(window).height(),
			pInst = context.plat.getPlatInstance(),
			topHeight = $("#top_bar").height(),
			leftWidth = pInst.find(".left-toolbar").outerWidth(),
			bottomHeight = pInst.find(".bottom-bar").height();
		context.taskBar.minAllTask();
		return context.taskBar.addTaskItem.call(null, title, $.extend({
			url: url,
			title: title,
			width: w - leftWidth,
			height: h - topHeight - bottomHeight,
			left: leftWidth,
			top: topHeight,
			minimizable: "undefined" === typeof closable ? true : closable,
			closable: "undefined" === typeof closable ? true : closable
		}, opts), closable, uuid);
	},

    closeTab: function(arg) {
        var taskObj, item;
        if($.isWindow(arg)) {
            taskObj = this.taskBar.getTaskObjByWindow(arg);
            item = taskObj.item;
        } else {
            item = this.taskBar.getTaskItem(String(arg));
        }
        if(item.length) {
            this.taskBar.closeTask.call(item);
        }
    },

    openMenu: function(menuId) {
      this.frame.openMenu(menuId);
    },

	isTabSelected: function(framewindow) {
        var taskObj = this.taskBar.getTaskObjByWindow(framewindow),
            item = taskObj.item;
        return item.hasClass("task-bar-item-selected");
	},
	
	getTabMenuData: function(menuCode) {
		var menuData = this.data("kbssMenuData"),
			pMenuData = $.grep(menuData, function(sMenuData) {
				return sMenuData["MENU_CODE"] === menuCode;
			}),
			pMenuPos, tabMenuData;
		
		if(pMenuData.length) {
			pMenuPos = pMenuData[0]["MENU_POS"];
			tabMenuData = $.grep(menuData, function(sMenuData) {
				return pMenuPos !== sMenuData["MENU_POS"] && 0 === sMenuData["MENU_POS"].indexOf(pMenuPos) && 
					(sMenuData["MENU_POS"].length - 1) === sMenuData["MENU_POS"].lastIndexOf("@");
			});
			return tabMenuData;
		}
		return [];
	},
	
	getMenuData: function(menuId) {
		if(menuId) {
			return $.grep(this.data("priMenuData"), function(sMenuData) {
				return sMenuData["MENU_ID"] === menuId;
			})[0];
		}
		return this.data("priMenuData");
	},
	
	getPlatData: function() {
		return this.data("priPlatData");
	},

    refreshSysInfo: function() {
        var sysInfoConf = window.sysConf.sysInfoConf,
            statusBarContent = $("#status_bar").find(".status-bar-content");

        if(sysInfoConf) {
            if(arguments.length && sysInfoConf.render) {
                sysInfoConf.render.apply(statusBarContent, arguments);
                return;
            }

            if(sysInfoConf.req && sysInfoConf.render) {
                this.requestService(sysInfoConf.req, function() {
                    sysInfoConf.render.apply(statusBarContent, this);
                });
            }
        }
    }
});

//instance methods
kPortal.fn.extend({
	
	regPageEvents: function(cfgArr) {
		while(cfgArr[0]) {
			(function(cfg) {
				for(var i = 0, l = cfg.types.length; i < l; i++) {
					$(cfg.selector).bind(cfg.types[i], function(e) {
						if($.isFunction(cfg.handler)) {
							cfg.handler.apply(this, arguments);
							e.stopPropagation();
						}
					});
				}
			})(cfgArr.shift());
		}
	},
	
	openWindow: function(options) {
		var wHtml = $("<div closable='true' collapsible='false' resizable='false' minimizable='false' maximizable='false'></div>").appendTo("body"),
			w = $(window).width(), 
			h = $(window).height();	
		
		options = $.extend({}, {width: 600, height: 400}, options);
		
		if(options["width"] && options["width"] > w - 50) {
			options["width"] = w - 50;
		}
		
		if(options["height"] && options["height"] > h - 50) {
			options["height"] = h - 50;
		}
		wHtml.window(options);
		
		if(options.url) {
			this.createIframe(wHtml, {width: "100%", height: "99%", src: options.url});
		}
		return wHtml;	
	},
	
	requestService: function(param, success, error) {
		return ajaxRequest($.extend({}, 
				"string" === $.type(param) ? 
						{url: param} : {req: $.isArray(param) ? param : [param]}, {
			async: "undefined" === $.type(param.async) ? true : !!param.async,
			func: function(data) {
				if($.isFunction(success)) {
					var argData = [];
					for(var i = 0, l = this.length; i < l; i++) {
						argData.push(this[i]["ANS_COMM_DATA"]);
					}
					success.call(argData, argData[0]);
				}
			},
			error: function() {
				if($.isFunction(error)) {
					error.apply(this, arguments);
				}
			}
		}));
	},
	
	formatRecord: function(sKey, sAttr, data) {
		data = $.extend(true, [], data);
		var o = {}, first = data[0] || [], second = data[1] || [];
		for(var i = 0, l = first.length; i < l; i++) {
			o[first[i][sKey]] = first[i];
			if(sAttr) {
				o[first[i][sKey]][sAttr] = [];
				for(var j = 0, lj = second.length; j < lj; j++) {
					if(second[j][sKey] === first[i][sKey]) {
						o[first[i][sKey]][sAttr].push(second[j]);
					}
				}					
			}
		}
		return o;
	},
	
	getTData: function(type, id) {
		switch(type) {
			case "layout" : 
				return this.data("layout_data")[id];
			case "cont" : 
				return this.data("cont_data")[id];
			case "comp" : 
				return this.data("comp_data")[id];
		};
	},
	
	createFrontMenu: function(data, mLen) {
		var mbox = $("<div class='menu-box'></div>"),
			mcenter = $("<div class='menu-box-center'></div>");
		
		if(0 === data.length) {
			return $();
		}
		
		var mLeft = $("<div class='menu-box-btn menu-box-left' title='上一页'></div>");
		var mRight = $("<div class='menu-box-btn menu-box-right' title='下一页'></div>");		
		
		mbox.append(mLeft).append(mcenter).append(mRight);
		
		var menuIdArr = [];
		
		for(var i = 0, l = data.length; i < l; i++) {
			if(data[i].MENU_LVL.length !== 12) {
				continue;
			}
			
			var mbtn = $("<div class='menu-button'></div>");
			mbtn.attr("title", data[i]["MENU_NAME"]);
			mbtn.attr("menu_id", data[i]["MENU_ID"]);
			mbtn.attr("menu_pur", data[i]["MENU_PUR"]);
			
			var icon = $("<div class='menu-button-icon'></div>");
			icon.addClass(data[i]["MENU_ICO"]);
			
			var bottom = $("<div class='menu-button-bottom'></div>");
			bottom.text(data[i]["MENU_NAME"]);
			
			mcenter.append(mbtn.append(icon).append(bottom));
		}
		this.regScrollEvent.call(mcenter, mLen || 5);
		
		return mbox;
	},
	
	regHoverEvent: function(selectedClass, hoverClass, reselect, select, menu, onBeforeMenuShow) {
		var allItems = $(this).unbind("mouseenter").unbind("mouseleave").unbind("click"),
			selectedClass = selectedClass || "",
			hoverClass = hoverClass || "",
			reselect = reselect || $.noop,
			select = select || $.noop,
			
			item,
			preItem,
			
			hoverObj = {
				getPrevItem: function() {
					return preItem;
				},
				
				cancelClick: cancelClick
			};
		
		allItems.hover(function() {
			item = $(this);
			if(!item.hasClass(selectedClass)) {
				item.addClass(hoverClass);
			}			
		}, function() {
			$(this).removeClass(hoverClass);
		}).click(hoverObj, function(e) {
			preItem = allItems.filter(function() {
				return $(this).hasClass(selectedClass);
			});
			item = $(this);
			
			if(item.hasClass(selectedClass)) {
				if(true === reselect.apply(item, arguments)) {
					item.removeClass(selectedClass);
				}
			} else {
				item.removeClass(hoverClass);
				item.addClass(selectedClass).siblings().removeClass(selectedClass);
				if(false === select.apply(item, arguments)) {
					cancelClick();
				}
			}
		});
		
		if(menu) {
			allItems.bind("contextmenu", function(e) {
				onBeforeMenuShow = $.isFunction(onBeforeMenuShow) ? onBeforeMenuShow : $.noop;
				if(false !== onBeforeMenuShow.call(this, e)) {
					menu.data("menu").contextParent = $(this);
					menu.menu("show", {
						left: e.pageX,
						top: e.pageY
					});
					e.preventDefault();
				}
			});	
		}
		
		function cancelClick() {
			preItem.addClass(selectedClass);
			item.removeClass(selectedClass);
		}
	},
	
	regScrollEvent: function (dispCount) {
		var mcenter = this, 
			mLeft = hidden(mcenter.prev()),
			mRight = hidden(mcenter.next()),
			allItems = mcenter.find(">div").hide(),
			selectedItem;
			
		allItems.each(function(i, ele) {
			var item = $(this);
			if(i + 1 <= dispCount) {
				item.show();
			}
			if(isItemSelect(item)) {
				selectedItem = item;
			}
		});
		
		if(dispCount && allItems.length > dispCount) {
			visiable(mRight);
		}
		
		mLeft.unbind("click").click(function(e) {
			moveMenu(false);			
		});
		mRight.unbind("click").click(function(e) {
			moveMenu(true);
		});
		
		if(selectedItem) {	//跳转到选中元素这一页
			var preCount = selectedItem.prevAll("div").length,	//选中元素前的兄弟元素个数
				loop = parseInt((preCount >= dispCount ? preCount : 0) / dispCount);
			while(loop--) {
				mRight.click();
			}
		}
		
		/**
		 * 判断滚动元素是否选中
		 * 由于元素的class是不确定的，一般而言都是一个基本样式加一个选中样式(selected)用空格分隔
		 * 所以这里用了一个不太靠谱的方式：元素的class拆分后长度为2就认为是选中的元素
		 */
		function isItemSelect(ele) {
			return $(ele).attr("class").split(" ").length === 2;
		}
		
		function moveMenu(next) {
			var visibles = mcenter.find(">div:visible"),
				hiddens = visibles.filter(":last").nextAll("div");

			if(!next) {
				hiddens = visibles.filter(":first").prevAll("div");
			}
			visibles.hide();
			hiddens.filter(function(i, ele) {
				return (i + 1) <= dispCount;
			}).show();
			
			if(hiddens.length <= dispCount) {
				hidden(next ? mRight : mLeft);
			}			
			visiable(next ? mLeft : mRight);
		}
		
		function visiable(ele) {
			return ele.css("visibility", "visible");
		}
		
		function hidden(ele) {
			return ele.css("visibility", "hidden");
		}
	},	
	
	loadMenuCompCfg: function(param, success, error) {
		if($.isArray(param)) {
			for(var i = 0; i < param.length; i++) {
				param[i] = handleParam(param[i]);
			}
		} else {
			param = handleParam(param);
		}
		
		this.requestService(param, function(data) {
			var retData = [], i = 0, l = this.length;
			if($.isFunction(success)) {
				for(; i < l; i++) {
					retData.push(format(this[i]));
				}
				success.call(retData, retData[0]);
			}
		}, error);
		
		
		function handleParam(param) {
			param["service"] = param["service"] || "P0004152";
			param["USER_CODE"] = param["USER_CODE"] || "";
			param["USER_ROLE"] = param["USER_ROLE"] || "";
			return param;
		}
		
		function format(data) {
			var first = data[0];	//第一个结果集,菜单组件
			if(first.length === 0) {
				return [];
			}
			
			var res = [];
			var third = data[2];	//第三个结果集,组件参数
			for(var i = 0, li = first.length; i < li; i++) {
				var sFirst = first[i];
				if(sFirst["COMP_ID"] && "" !== sFirst["COMP_ID"]) {
					sFirst._param = getCompParam(sFirst["MENU_COMP_ID"], third, "comp");
				} else if(sFirst["CONT_ID"] && "" !== sFirst["CONT_ID"]) {
					sFirst._components = getContComponents(sFirst["MENU_COMP_ID"], data[1], third);	//第二个结果集,菜单容器
					sFirst._tab = getContTab(sFirst["MENU_COMP_ID"], data[3]);	//第四个结果集，容器页签
				}
				res.push(sFirst);
			}	
			
			function getContComponents(id, second, third) {
				var arr = [];
				for(var i = 0, l = second.length; i < l; i++) {
					var sSecond = second[i];
					if(id === sSecond["MENU_COMP_ID"]) {
						sSecond._param = getCompParam(sSecond["MENU_CONT_COMP_ID"], third, "cont");		
						arr.push(sSecond);
					}
				}
				return arr;
			}
			
			function getContTab(id, fourth) {
				var arr = [];
				for(var i = 0; i < fourth.length; i++) {
					if(id === fourth[i]["MENU_COMP_ID"]) {
						arr.push(fourth[i]);
					}
				}
				return arr;
			}
			function getCompParam(id, third, gType) {
				var pObj = {};
				for(var i = 0, l = third.length; i < l; i++) {
					var sThird = third[i];
					if("comp" == gType && !sThird["MENU_CONT_COMP_ID"] 
						&& sThird["MENU_COMP_ID"] && sThird["MENU_COMP_ID"] === id) {
						pObj[sThird["PARAM_CODE"]] = sThird["PARAM_VAL"];
						continue;
					}
					if("cont" == gType && sThird["MENU_CONT_COMP_ID"] && sThird["MENU_CONT_COMP_ID"] === id) {
						pObj[sThird["PARAM_CODE"]] = sThird["PARAM_VAL"];
						continue;
					}
				}
				return pObj;
			}
			
			return res;
		}
	},
	
	/**
	 * 根据主题配置装载主题中的所有组件
	 * @param lWrap 父元素
	 * @param data 主题配置数据
	 * @param layoutId 布局编号，默认取data中的布局
	 * @param pObj 参数
	 * @param filterFixed 是否忽略停靠的组件
	 */
	buildAllComp: function(lWrap, data, layoutId, pObj, filterFixed) {
		var context = this,
			parent = lWrap.parent();
		lWrap.width(parent.width()).height(parent.height());
		
		if(data.length === 0) {
			alert("未能获取到对应的菜单组件配置");
			return;
		}
		
		lWrap.attr("menu_id", data[0]["MENU_ID"]);
		if(!lWrap.data("buildArguments")) {
			lWrap.data("buildArguments", arguments);
		}
		
		if(!filterFixed) {
			buildLayout.call(lWrap, context.getTData("layout", data[0]["LAYOUT_ID"] || layoutId));	//解析布局
			context.resizeBoards(lWrap);
		}
		
		for(var i = 0, li = data.length; i < li; i++) {
			var sData = data[i];
			if(filterFixed && "" !== sData["FIXED_DIRECTION"] && undefined !== sData["FIXED_DIRECTION"]) {
				continue;
			}
			
			if(sData["COMP_ID"] && "" !== sData["COMP_ID"]) {	//解析组件
				if(sData["_compInfo"]) {
					sData = $.extend({}, sData["_compInfo"], sData);
					delete sData["_compInfo"];
				}
				createComp(context, lWrap.find(".layout-board-preview:eq('" + sData["BOARD_INDEX"] + "')"), sData, pObj);
			} else if(sData["CONT_ID"] && "" !== sData["CONT_ID"]) {	//解析容器
				if(sData["_contInfo"]) {
					sData = $.extend({}, sData["_contInfo"], sData);
					delete sData["_contInfo"];
				}				
				createCont(context, lWrap.find(".layout-board-preview:eq('" + sData["BOARD_INDEX"] + "')"), sData, pObj);
			}
		}
		
		function buildLayout(lData) {
			var parent = this;
			parent.attr("layout_id", lData.LAYOUT_ID);
			for(var i = 0, l = lData["_board"].length; i < l; i++) {
				var lBoard = $("<div class='layout-board-preview'></div>");
				lBoard.attr("board_id", lData["_board"][i]["BOARD_ID"]);
				lBoard.addClass(lData["_board"][i]["BOARD_CLASS"]);
				parent.append(lBoard);
			}			
		}	
			
		function createCont(context, parent, sData, pObj) {
			var cWrap = $("<div class='comp-wrap'></div>").data("sData", sData),
				cBody = $("<div class='comp-body'></div>"),
				w = $(window).width(),
				h = $(window).height(),
				pInst = context.plat ? context.plat.getPlatInstance() : $(),
				topHeight = $("#top_bar").height(),
				leftWidth = pInst.find(".left-toolbar").outerWidth(),
				bottomHeight = pInst.find(".bottom-bar").height();
			
			if(sData["CONT_TYPE"] === "2") {
				cWrap.attr("tab_direction", sData["TAB_DIRECTION"] || 0);
			}			
			cWrap.append(cBody).appendTo(parent);
			
			if("1" == sData["DISP_TITLE"]) {
				cBody.before("<div class='comp-title' title='" + sData["TITLE"] + "'>" + sData["TITLE"] + "</div>");
			} else {
				cWrap.addClass("comp-wrap-no-head");
			}
			cBody.append(createContTab(sData["CONT_TYPE"], sData._tab, sData["TAB_DIRECTION"] || 0));
			
			var d = context.calSize(parent, sData);
			if(sData["FIXED_DIRECTION"]) {
				cWrap.attr("fixed_direction", sData["FIXED_DIRECTION"]);
				cWrap.attr("fixed_width", d["width"]);
				cWrap.attr("fixed_height", d["height"] + ("0" === sData["FIXED_DIRECTION"] ? 1 : 0));
			}
			
			cWrap.css({position:"absolute", left:d["left"], top:d["top"]});
			cWrap.animate({width:d["width"] + "px", height:d["height"] + "px"}, 300, function() {
				context.resizeTab(cWrap);
				for(var i = 0, l = sData._tab.length; i < l; i++) {
					var sTab = sData._tab[i]
					var b = cWrap.find(".cont-tab-body[tab_index='" + sTab["TAB_INDEX"] + "']"), dispType = b.attr("disp_type");
					b.show();
					for(var j = 0, lj = sData._components.length; j < lj; j++) {
						var sComp = sData._components[j];
						if(sComp["_compInfo"]) {
							sComp = $.extend({}, sComp["_compInfo"], sComp);
							delete sComp["_compInfo"];
						}						
						if(sComp["TAB_INDEX"] === sTab["TAB_INDEX"]) {
							if("1" === dispType) {
								if(sComp["DIR_NAME"] && !context.existDir(b, sComp["DIR_NAME"])) {
									createContDir(context, b, sComp["DIR_NAME"]);
								}
								if(sComp["COMP_ID"]) {
									createContItem(context, b, sComp, pObj);
								}
							} else {									
								createComp(context, b, sComp, pObj)
							}
						}
					}
				}
			});
			
			function createContDir(context, cPar, dirName) {
				var dWrap = $("<div class='drag-wrap shortcut-drag-wrap'></div>"),
					dBody = $("<div class='drag-body'></div>"),
					dName = $("<div class='drag-name'></div>");		
				dBody.addClass("shortcut-icon-dir");
				dName.text(dirName);
				dWrap.addClass("drag-dir").append(dBody).append(dName).hide().attr("title", dirName);
				var fComp = cPar.find(".drag-comp:first");
				if(fComp.length !== 0) {
					fComp.before(dWrap);
				} else {
					cPar.append(dWrap);
				}
				dWrap.show(200).click(function(e) {
					context.taskBar.minAllTask();
					if(dWrap.data("window")) {
						context.taskBar.maxTask.call(dWrap.data("window"));
						return false;
					}
					context.taskBar.addTaskItem.call(null, dName.text(), {
						refTarget: dWrap,
						title: dName.text(),
						minimizable: !!!context.context.find("#id_layout_wrap_preview").length,
						width: w - leftWidth,
						height: h - topHeight - bottomHeight,
						left: leftWidth,
						top: topHeight,
						onOpen: function() {
							var pBody = $(this);
							cPar.find(".drag-comp[dir_name='" + dName.text() + "']").each(function() {
								var iconEle = $(this),
									cloneEle = iconEle.clone().removeClass("droppable").removeClass("drag-comp").addClass("item-in-dir").show();
								cloneEle.click(function(e) {
									shortcutClick.call(this, e, context);
								}).appendTo(pBody);
							});
						}
					});
				});
			}
			
			function createContItem(context, cPar, sComp, pObj) {
				var dWrap = $("<div class='drag-wrap shortcut-drag-wrap'></div>"),
					dBody = $("<div class='drag-body'></div>").addClass(sComp["ICON"]).css("cursor", "pointer"),
					dName = $("<div class='drag-name'></div>").text(sComp["TITLE"]);		
				dWrap.attr("comp_id", sComp["COMP_ID"]).attr("title", sComp["TITLE"]).attr("win_width", sComp["WIN_WIDTH"]).attr("win_height", sComp["WIN_HEIGHT"]);
				dWrap.addClass("drag-comp").append(dBody).append(dName).hide();
				dWrap.attr("link_page", buildURL(sComp["LINK_PAGE"], $.extend(sComp._param || {}, pObj, {
                    OPP_COMP_ID: sComp["COMP_ID"]
                })));
				dWrap.click(function(e) {
					shortcutClick.call(this, e, context);
				});
				
				if(sComp["DIR_NAME"]) {
					dWrap.hide().appendTo(cPar).attr("dir_name", sComp["DIR_NAME"]);
				} else {
					dWrap.appendTo(cPar).show(200);
				}
			}
			
			function shortcutClick(e, context) {
				var shortcut = $(this),
					shortcutName = shortcut.find(".drag-name").text();
				
				context.taskBar.minAllTask();
				if(shortcut.data("window")) {
					context.taskBar.maxTask.call(shortcut.data("window"));
					return false;
				}		
				context.taskBar.addTaskItem.call(null, shortcutName, {
					refTarget: shortcut,
					url: shortcut.attr("link_page"),
					title: shortcutName,
					width: w - leftWidth,
					height: h - topHeight - bottomHeight,
					left: leftWidth,
					top: topHeight,
					minimizable: true,
					onOpen: function() {
						$(this).attr("comp_id", shortcut.attr("comp_id"));
					}
				});	
			}
			
			function createContTab(contType, arrTab, direction) {
				var cfg = {
					"0":{
						itemClass:"cont-tab-item-top",
						itemSelected:"cont-tab-item-top-selected"
					},
					"1":{
						itemClass:"cont-tab-item-right",
						itemSelected:"cont-tab-item-right-selected"
					},
					"2":{
						itemClass:"cont-tab-item-bottom",
						itemSelected:"cont-tab-item-bottom-selected"
					},
					"3":{
						itemClass:"cont-tab-item-left",
						itemSelected:"cont-tab-item-left-selected"
					}
				};
				var w = $("<div class='cont-tab-wrap'></div>");
				var h = $("<div class='cont-tab-head'></div>");
				w.append(h);
				for(var i = 0, l = arrTab.length; i < l; i++) {
					var sTab = arrTab[i];
					
					var t = $("<div class='cont-tab-item'>" + sTab["TAB_TITLE"] + "</div>").addClass(cfg[direction].itemClass);
					t.attr("title", sTab["TAB_TITLE"]);
					t.attr("tab_index", sTab["TAB_INDEX"]);
					t.attr("disp_type", sTab["DISP_TYPE"]);
					h.append(t);
					
					var b = $("<div class='cont-tab-body'></div>");
					b.attr("tab_index", sTab["TAB_INDEX"]);
					b.attr("disp_type", sTab["DISP_TYPE"]);
					
					w.append(b);
				}
				var ti = h.find(".cont-tab-item");
				ti.click(function() {
					var _this = $(this);
					w.find(".cont-tab-body").hide();
					_this.addClass(cfg[direction].itemSelected).siblings().removeClass(cfg[direction].itemSelected);
					w.find(".cont-tab-body[tab_index='" + _this.attr("tab_index") + "']").css("z-index", "0").show();
				});
				$(ti[0]).click();
				
				if("1" === contType) {
					h.remove();
				}					
				return w;
			}				
		}			
		
		function createComp(context, parent, sData, pObj) {
			var cWrap = $("<div class='comp-wrap'></div>").data("sData", sData),
				cBody = $("<div class='comp-body'></div>");
			
			cWrap.append(cBody);
			
			if("1" === sData["DISP_TITLE"]) {
				cBody.before("<div class='comp-title' title='" + sData["TITLE"] + "'>" + sData["TITLE"] + "</div>");
			} else {
				cWrap.addClass("comp-wrap-no-head");
			}
			
			cWrap.appendTo(parent);
			
			var d = context.calSize(parent, sData);
			if(sData["FIXED_DIRECTION"]) {
				cWrap.attr("fixed_direction", sData["FIXED_DIRECTION"]);
				cWrap.attr("fixed_width", d["width"]);
				cWrap.attr("fixed_height", d["height"] + ("0" === sData["FIXED_DIRECTION"] ? 1 : 0));
			}
			
			cWrap.css({position:"absolute", left:d["left"], top:d["top"] + "px"});
			cWrap.animate({width:d["width"], height:d["height"]}, 300, function() {
				context.createIframe(cBody, {
					src: buildURL(sData["LINK_PAGE"], $.extend(sData._param || {}, pObj, {
						OPP_COMP_ID: sData["COMP_ID"]
                    })),
					width: d["width"],
					height: cWrap.height() - cWrap.find(".comp-title").innerHeight()
				});
			});
		}
	},
	
	createIframe: function(parent, attrs) {
		attrs.width = attrs.width || parent.width();
		attrs.height = attrs.height || parent.height();
		return $("<iframe border='0' frameBorder='0' allowTransparency='true'/>").attr("width", attrs.width).attr("height", attrs.height).appendTo(parent).attr("src", attrs.src);
	},
	
	createMask: function(parent, klass) {
		parent = parent || $(document).find("body");
		return $("<div class='ui-mask'></div>").addClass(klass || "").css({
			width: $(parent).outerWidth(), 
			height: $(parent).outerHeight()
		}).appendTo(parent);
	},
	
	createSyncMask: function(msg, parent) {
		parent = parent || $(document).find("body");
		var pw = $(parent).outerWidth(), ph = $(parent).outerHeight(),
			mask = $("<div class='sync-mask'></div>").css({width:pw, height:ph}),
			content = $("<div class='content'>" + msg + "</div>");
		mask.append(content).appendTo(parent);
		content.css("margin-left", (pw - content.outerWidth()) / 2 + "px");
		content.css("margin-top", (ph - content.outerHeight()) / 2 + "px");
		return mask;
	},
	
	data: function(key, value) {
		if("undefined" === $.type(value)) {
			return this.cache[key];
		}
		return this.cache[key] = value;
	},
	
	removeData: function(key) {
		delete this.cache[key];
	},
	
	showConfirm: function(msg, ok, cancle) {
		confirm("提示", msg, function(flag) {
			if(flag) {
				if($.isFunction(ok)) {
					ok.call(this);
				}
			} else {
				if($.isFunction(cancle)) {
					cancle.call(this);
				}
			}
		});
	},
	
	getFixedDnR: function(parent, fromAttr) {
		var top = parent.find(">div[fixed_direction='0']"),
			right = parent.find(">div[fixed_direction='1']"),
			bottom = parent.find(">div[fixed_direction='2']"),
			left = parent.find(">div[fixed_direction='3']");
		return {
			dnr:{
				top:top, right:right, bottom:bottom, left:left				
			},
			size:{
				top:parseFloat(fromAttr ? top.attr("fixed_height") || 0 : top.outerHeight() || 0),
				right:parseFloat(fromAttr ? right.attr("fixed_width") || 0 : right.outerWidth() || 0),
				bottom:parseFloat(fromAttr ? bottom.attr("fixed_height") || 0 : bottom.outerHeight() || 0),
				left:parseFloat(fromAttr ? left.attr("fixed_width") || 0 : left.outerWidth() || 0)
			}
		};
	},
	
	calSize: function(parent, sData) {
		var context = this,
			size = {},
			parWidth = parent.width(),
			parHeight = parent.height();
			
		if(sData["FIXED_DIRECTION"]) {
			if("0" === sData["FIXED_DIRECTION"]) {	//top
				size["left"] = 0;
				size["top"] = 0;
				size["width"] = parWidth * 0.999;
				size["height"] = parseFloat(sData["FIXED_HEIGHT"] || 0);
			} else if("2" === sData["FIXED_DIRECTION"]) {	//bottom
				size["left"] = 0;
				size["top"] = parHeight - parseFloat(sData["FIXED_HEIGHT"] || 0);
				size["width"] = parWidth * 0.999;
				size["height"] =  parseFloat(sData["FIXED_HEIGHT"] || 0);
			} else if("3" === sData["FIXED_DIRECTION"]) {	//left
				size["left"] = 0;size["top"] = 0;
				size["width"] =  parseFloat(sData["FIXED_WIDTH"]);
				size["height"] = parHeight * 0.999;
			} else if("1" === sData["FIXED_DIRECTION"]) {	//right
				size["left"] = parWidth -  parseFloat(sData["FIXED_WIDTH"]);
				size["top"] = 0;
				size["width"] =  parseFloat(sData["FIXED_WIDTH"]);
				size["height"] =  parHeight * 0.999;
			}
		} else {
			var fixedSize = context.getFixedDnR(parent, true).size,
				pWidth = parWidth - fixedSize.left - fixedSize.right,
				pHeight = parHeight - fixedSize.top - fixedSize.bottom;
			
			size["left"] = pWidth * parseFloat(sData["COMP_LEFT"]) + fixedSize.left;
			size["top"] = pHeight * parseFloat(sData["COMP_TOP"]) + fixedSize.top;
			size["width"] = pWidth * parseFloat(sData["COMP_WIDTH"]);
			size["height"] = pHeight * parseFloat(sData["COMP_HEIGHT"]);
		}
		return size;
	},
	
	resizeBoards: function(lWrap, difObj) {
		var boards = lWrap.find(">div"), l = boards.length,
			h = lWrap.height(), w = lWrap.width();
		boards.each(function(i) {
			var board = $(this),
				mt = parseInt(board.css("margin-top")),
				mb = parseInt(board.css("margin-bottom")),
				ml = parseInt(board.css("margin-left")),
				bh = board.css("height"),
				bw = board.css("width");
			
			bh = -1 === bh.indexOf("%") ? parseFloat(bh) : h * (parseFloat(bh) / 100);
			bw = -1 === bw.indexOf("%") ? parseFloat(bw) : w * (parseFloat(bw) / 100);
			
			if(difObj) {
				board.width(bw + difObj.width / l).height(bh + difObj.height);
			} else {
				board.width(bw - ml - ((i === l - 1) ? ml + 1 : 0) - 2).height(h - mt - mb - 2);
			}
		});	
	},
	
	resizeTab: function(parent) {
		var context = this, 
			direction = parent.attr("tab_direction"),
			isDnR = parent.hasClass("drag-wrap");	//门户设计为true，门户首页为false
		
		var tt = parent.find(".drag-title"), 
			th = parent.find(".cont-tab-head"),
			tb = parent.find(".cont-tab-body");
		
		var w = -4, h = -4, headH = 17, headW = 15;
		
		if(!isDnR) {
			tt = parent.find(".comp-title");
			w = 0; h = 0; headH = 23; headW = 23;
		}

		var	pw = parent.width(),
			ph = parent.height(),
			tth = tt.outerHeight(),
			thh = th.outerHeight();
		
		if(direction === undefined) {	//面板容器
			tb.width(pw + w);
			tb.height(ph - tth - thh + h);	
		} else {	//tab容器
			if(isDnR) {
				th.removeAttr("style");
				tb.removeAttr("style");
				tb.css("z-index", parent.css("z-index"));
			} else {
				tb.each(function(i) {
					var tabBody = $(this);
					if(i === 0 || tabBody.is(":visible")) {
						return true;
					}
					tabBody.css("z-index", "-11")
				});
			}
			switch(direction) {	
			case "0":	//top
				th.css({top:tth,left:0,height:headH,width:pw});
				tb.width(pw + w).css({top:tth + th.outerHeight()});
				tb.height(ph - tth - th.outerHeight() + h);
				break;
			case "1":	//right
				th.css({top:tth,right:0,height:ph - tth,width:headW});
				tb.width(pw - headW + w).css({top:tth,left:0});
				tb.height(ph - tth + h);
				break;
			case "2":	//bottom
				tb.height(ph - tth - headH + h).css({left:0,top:tth});
				th.css({top:tth + tb.outerHeight(),height:headH,width:"100%"});
				tb.width(pw + w);
				break;
			case "3":	//left
				th.css({top:tth,left:0,height:ph - tth,width:headW});
				tb.width(pw - headW + w).css({top:tth,left:headW});
				tb.height(ph - tth + h);
				break;
			}
			parent.find(".cont-tab-item-selected").click();				
		}
		
		if(isDnR) {
			tb.each(function() {
				var stb = $(this);
				if(stb.attr("disp_type") === "1") {
					return true;
				}
				context.alignAllDnR(stb);	//组件视图需要重绘tab里的组件
			});		
		}
	},
	
	existDir: function(tBody, dName) {
		var flag = false, dragDir = tBody.find(".drag-dir");
		dragDir.each(function(i, ele) {
			if($(ele).find(".drag-name").text() === dName) {
				flag = true;
			}
		});
		return flag;
	},
	
	getFlowMenuConfig: function() {
		var layoutCfg = getSysDict("FLOW_MENU_LAYOUT"),
			compCfg = getSysDict("FLOW_MENU_COMP");
		return {
			layoutId:layoutCfg && layoutCfg[0] ? layoutCfg[0].dict_val : "",
			compId:[compCfg && compCfg[0] ? compCfg[0].dict_val : "", compCfg && compCfg[1] ? compCfg[1].dict_val : ""]
		};
	},
		
	handleMenuData: function(menuData, isManager) {
		var platData = this.data("plat_data"),
			res = {},
			menuPur = $.grep(kui.getSysDict("MENU_PUR"), function(sData) {
				return sData["dict_val"] !== "1";
			}),
			
			key, i, l,
			gData, mLvl,
			tObj, menuData;

		if(!menuPur.length) {
			menuPur = [{dict_val: "2", dict_desc: "门户菜单"}]
		}

		l = menuPur.length;
		
		for(key in platData) {
			gData = $.grep(menuData, function(sData) {
				mLvl = sData["MENU_LVL"].length;
				return window.isKjdp || isManager ?
					4 !== mLvl && 8 !== mLvl && sData["MENU_PLAT"] === platData[key].ID : sData["MENU_PLAT"] === platData[key].ID;
			});
			if(gData.length) {
				res[key] = gData;
			}
		}
		
		for(key in res) {
			tObj = {};
			for(i = 0; i < l; i++) {
				menuData = $.grep(res[key], function(sData) {
					return sData["MENU_PUR"] === menuPur[i].dict_val;
				});
				if(menuData.length) {
					tObj[menuPur[i].dict_val] = {
						menuName:menuPur[i].dict_des,
						menuData:menuData
					}
				}
			}
			
			if(isManager && !platData[key]["IS_MAIN"]) {	//门户设计，非主平台过滤门户菜单
				delete tObj["2"];
			}
			
			if($.isEmptyObject(tObj)) {
				delete res[key]
				continue;
			}
			res[key] = tObj;
		}
		return res;
	},
	
	buildURL: buildURL,

    removeIframe: function(iframe) {
        try{
            iframe.src = "about:blank";
            iframe.contentWindow.document.write("");
            iframe.contentWindow.document.clear();
            $(iframe).remove();
        } catch(e) {};
    }
});

function buildURL(url, param) {
	var pArr = [];
	for(var key in param) {
		pArr.push(key + "=" + (param[key] || ""));
	}
	var eStr = encodeURI(pArr.join("&"));
	return url.lastIndexOf("?") > 0 ? 
			(pArr.length > 0 ? url + "&" + eStr : url) : 
				(pArr.length > 0 ? url + "?" + eStr : url);
}

//门户引擎核心构造器，包含了一些工具方法和工具类
//组件中使用请勿构造实例，需要调用实例方法请使用$k.portal
//实例方法不要乱调用哦，因为你不知道会出什么问题
window.kPortal = window.kportal = kPortal;
})(jQuery, window);