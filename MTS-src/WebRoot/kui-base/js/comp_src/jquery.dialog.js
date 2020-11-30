/**
 * dialog - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 window
 * 
 */
(function($) {
    //组件入口函数
    $.fn.dialog = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.dialog.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.window(options, param);
            }
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "dialog");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({},
                    $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), options),
                    contentPanel: wrapDialog(this)
                });
            }
            buildDialog(this);
            $(this).dialog('resize');
        });
    };
	//组件接口
    $.fn.dialog.methods = {
        options: function(jq) {
            var opts = $.data(jq[0], "dialog").options;
            var panel = jq.panel("options");
            $.extend(opts, {
                closed: panel.closed,
                collapsed: panel.collapsed,
                minimized: panel.minimized,
                maximized: panel.maximized
            });
            var contentPanel = $.data(jq[0], "dialog").contentPanel;
            return opts;
        },
        dialog: function(jq) {
            return jq.window("window");
        },
//        destroy: function(jq) {
//            jq.remove();
//        },
        refresh: function(jq, href) {
            return jq.each(function() {
                refresh(this, href);
            })
        },
        getContent: function(jq) {
            return getContent(jq[0]);
        }
    };
    $.fn.dialog.parseOptions = function(target) {
        return $.extend({},
        $.fn.window.parseOptions(target), $.parser.parseOptions(target, ["toolbar", "buttons"]))
    };
    $.fn.dialog.defaults = $.extend({},
    $.fn.window.defaults, {
        title: " ",
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        toolbar: null,
        buttons: null
    });

    //创建内容面板
    function wrapDialog(target) {
        var jq = $(target);
        jq.wrapInner("<div class=\"dialog-content\"></div>"); //将面板放入页面div
        var contentPanel = jq.children("div.dialog-content");
        contentPanel.attr("style", jq.attr("style"));
        jq.removeAttr("style").css("overflow", "hidden"); //隐藏页面的div
        contentPanel.panel({
            border: false,
            doSize: false
        });
        return contentPanel;
    }

    //创建对话框
    function buildDialog(target) {
        var opts = $.data(target, "dialog").options;
        var contentPanel = $.data(target, "dialog").contentPanel;

        //创建工具栏
        if (opts.toolbar && opts.toolbar.length) {
            if (typeof opts.toolbar == "string") {
                $(opts.toolbar).addClass("dialog-toolbar").prependTo(target);
                $(opts.toolbar).show();
            } else {
                $(target).find("div.dialog-toolbar").remove();
				var toolbar = new Array();
				toolbar.push("<div class=\"dialog-toolbar\">");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var p = opts.toolbar[i];
                    if (p == "-") {
                        toolbar.push("<div class=\"dialog-tool-separator\"></div>");
                    } else {
                        toolbar.push("<a href=\"javascript:void(0)\" _kuiIndex=\""+i+"\" ></a>");
                    }
                }
				toolbar.push("<div style=\"clear:both\"></div></div>");
                var jqToolbar = $(toolbar.join("")).prependTo(target);
				jqToolbar.find(">a").css("float", "left").each(function(){
					var idx = $(this).attr("_kuiIndex");
					this.onclick=opts.toolbar[idx].handler || function() {};
					$(this).linkbutton($.extend({},opts.toolbar[idx],{plain: true}));
				});			

            }
        } else {
            $(target).find("div.dialog-toolbar").remove();
        }
        //创建按钮
        if (opts.buttons && opts.buttons.length) {
            if (typeof opts.buttons == "string") {
                $(opts.buttons).addClass("dialog-button").appendTo(target);
                $(opts.buttons).show()
            } else {
                $(target).find("div.dialog-button").remove();
                var buttons = $("<div class=\"dialog-button\"></div>").appendTo(target);
                for (var i = 0; i < opts.buttons.length; i++) {
                	(function(p) {
                		var button = $("<a href=\"javascript:void(0)\"></a>").appendTo(buttons);
                        button[0].onclick = function(e) {
                        	if(p && $.isFunction(p.handler)) {
                        		p.handler.call(this, e, $(target));
                        	}
                        };
                        button.linkbutton(p);
                	})(opts.buttons[i]);
                }
            }
        } else {
            $(target).find("div.dialog-button").remove();
        }

        var href = opts.href;
        var content = opts.content;
        opts.href = null;
        opts.content = null;

        contentPanel.panel({
            closed: opts.closed,
            cache: opts.cache,
            href: href,
            content: content,
            onLoad: function() {
                if (opts.height == "auto") {
                    $(target).window("resize");
                }
                opts.onLoad.apply(target, arguments);
            }
        });

        $(target).window($.extend({},
        opts, {
            onOpen: function() {
                contentPanel.panel("open");
                if (opts.onOpen) {
                    opts.onOpen.call(target);
                }
            },
            onResize: function(width, height) {
                var wbody = $(target).panel("panel").find(">div.panel-body");
                contentPanel.panel("panel").show();
                contentPanel.panel("resize", {
                    width: wbody.width(),
                    height: (height == "auto") ? "auto": wbody.height() - wbody.find(">div.dialog-toolbar")._outerHeight() - wbody.find(">div.dialog-button")._outerHeight()
                });

                if (opts.onResize) {
                    opts.onResize.call(target, width, height);
                }
            }
        }));
        opts.href = href;
        opts.content = content;
        contentPanel.show();
    };

    function refresh(target) {
        var contentPanel = $.data(target, "dialog").contentPanel;
        contentPanel.panel("refresh");
    };

    function getContent(target) {
        var contentPanel = $.data(target, "dialog").contentPanel;
        return contentPanel.panel("getPanelContent");
    };

})(jQuery);