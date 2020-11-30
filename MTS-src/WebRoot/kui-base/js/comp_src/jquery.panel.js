/**
 * panel - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */
(function($) {
	//入口函数
    $.fn.panel = function(options, param) {
        if (typeof options == "string") {
            return $.fn.panel.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "panel");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({},
                $.fn.panel.defaults, $.fn.panel.parseOptions(this), options);
                $(this).attr("title", "");
                state = $.data(this, "panel", {
                    options: opts,
                    panel: wrapPanel(this),
                    isLoaded: false
                });
            }
            if (opts.content) {
                $(this).html(opts.content);
                if ($.parser) {
                    $.parser.parse(this);
                }
            }
            addHeader(this);
            setBorder(this);
            if (opts.doSize == true) {				
                state.panel.css("display", "block");
                setSize(this);
            }
            if (opts.closed == true || opts.minimized == true) {
                state.panel.hide();
            } else {
                openPanel(this);
            }
            if (String(opts.resizable) == "true") {				
                resizeEvent(this);
            }			
        });
    };

    //panel方法
    $.fn.panel.methods = {
        options: function(jq) {
            return $.data(jq[0], "panel").options;
        },
        panel: function(jq) {
            return $.data(jq[0], "panel").panel;
        },
        header: function(jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-header");
        },
        body: function(jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-body");
        },
        getPanelContent: function(jq) {
            return getPanelContent(jq[0]);
        },
        setTitle: function(jq, param) {
            return jq.each(function() {
                setTitle(this, param);
            });
        },
        open: function(jq, param) {
            return jq.each(function() {
                openPanel(this, param);
            });
        },
        close: function(jq, param) {
            return jq.each(function() {
                closePanel(this, param);
            });
        },
        destroy: function(jq, param) {
            return jq.each(function() {
                destroyPanel(this, param);
            });
        },
        refresh: function(jq, href) {
            return jq.each(function() {
                $.data(this, "panel").isLoaded = false;
                if (href) {
                    $.data(this, "panel").options.href = href;
                }
                loadData(this);
            })
        },
        resize: function(jq, param) {
            return jq.each(function() {
                setSize(this, param);
            });
        },
        move: function(jq, param) {
            return jq.each(function() {
                movePanel(this, param);
            });
        },
        maximize: function(jq) {
            return jq.each(function() {
                maximizePanel(this);
            });
        },
        minimize: function(jq) {
            return jq.each(function() {
                minimizePanel(this);
            });
        },
        restore: function(jq) {
            return jq.each(function() {
                restorePanel(this);
            });
        },
        collapse: function(jq, param) {
            return jq.each(function() {
                collapsePanel(this, param);
            });
        },
        expand: function(jq, param) {
            return jq.each(function() {
                expandPanel(this, param);
            });
        }
    };

    $.fn.panel.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.parser.parseOptions(target, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "resizable", {
            cache: "boolean",
            fit: "boolean",
            border: "boolean",
            noheader: "boolean",
            fieldset: "boolean"
        },
        {
            collapsible: "boolean",
            minimizable: "boolean",
            maximizable: "boolean"
        },
        {
            closable: "boolean",
            collapsed: "boolean",
            minimized: "boolean",
            maximized: "boolean",
            closed: "boolean"
        }]), {
            loadingMessage: t.attr("loadingMessage") || undefined
        });
    };

    //默认属性
    $.fn.panel.defaults = {
        id: null,
        title: null,
        iconCls: null,
        width: "auto",
        height: "auto",
        left: null,
        top: null,
        cls: null,
        resizable: false,
        headerCls: null,
        bodyCls: null,
        style: {},
        cache: true,
        fit: false,
        border: true,
        doSize: true,
        noheader: false,
        content: null,
        fieldset: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsed: false,
        minimized: false,
        maximized: false,
        closed: false,
        tools: null,
        href: null,
        loadingMessage: "Loading...",
        extractor: function(data) {
            var pattern = /&lt;body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches = pattern.exec(data);
            if (matches) {
                return matches[1]; // only extract body content
            } else {
                return data;
            }

        },
        onLoad: function() {},
        onBeforeOpen: function() {},
        onOpen: function() {},
        onBeforeClose: function() {},
        onClose: function() {},
        onBeforeDestroy: function() {},
        onDestroy: function() {},
        onResize: function(width, height) {},
        onMove: function(left, top) {},
        onMaximize: function() {},
        onRestore: function() {},
        onMinimize: function() {},
        onBeforeCollapse: function() {},
        onBeforeExpand: function() {},
        onCollapse: function() {},
        onExpand: function() {}
    };
    //删除节点
    function removeNode(node) {
        node.each(function() {
            $(this).remove();
            if ($.browser.msie) {
                this.outerHTML = "";
            }
        });
    };

    //设置大小 宽，高
    function setSize(target, param) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var pheader = panel.children("div.panel-header");
        var pbody = panel.children("div.panel-body");

        if (param) {
            if (param.width) opts.width = param.width;
            if (param.height) opts.height = param.height;
            if (param.left != null) opts.left = param.left;
            if (param.top != null) opts.top = param.top;
        }

        if (opts.fit == true) {
            var parent = panel.parent();
            parent.addClass("panel-noscroll");
            if (parent[0].tagName == "BODY") {
                $("html").addClass("panel-fit");
            }
            opts.width = parent.width();
            opts.height = parent.height();
        }
        panel.css({
            left: opts.left,
            top: opts.top
        });
        if (!isNaN(opts.width)) {
            panel._outerWidth(opts.width);
        } else {
            panel.width("auto");
        }
        pheader.add(pbody)._outerWidth(panel.width());
        if (!isNaN(opts.height)) {
            panel._outerHeight(opts.height);
            pbody._outerHeight(panel.height() - pheader._outerHeight());
        } else {
            pbody.height("auto");
        }
        panel.css("height", "");
        opts.onResize.apply(target, [opts.width, opts.height]);
        panel.find(">div.panel-body>div").triggerHandler("_resize");
    };

    //移动panel
    function movePanel(target, param) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (param) {
            if (param.left != null) {
                opts.left = param.left;
            }
            if (param.top != null) {
                opts.top = param.top;
            }
        }
        panel.css({
            left: opts.left,
            top: opts.top
        });
        opts.onMove.apply(target, [opts.left, opts.top]);
    }

    //封装panel
    function wrapPanel(target) {
        $(target).addClass("panel-body");
        var panel = $("<div class=\"panel\"></div>").insertBefore(target);
        panel[0].appendChild(target);		
        panel.bind("_resize",
        function() {
            var opts = $.data(target, "panel").options;
            if (opts.fit == true) {
                setSize(target);
            }
            return false;
        });
		
        return panel;
    };

    //添加头信息
    function addHeader(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        if (opts.tools && typeof opts.tools == "string") {
            panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
        }
        removeNode(panel.children("div.panel-header"));		
        if (opts.title && !opts.noheader) {
            var header = new Array();
            var icoPanel = "";
            header.push("<div class=\"panel-header\"><div class=\"panel-title\">");
            if (opts.iconCls) {
                //header.push("panel-with-icon");
                icoPanel = "<span class=\"ui-tool-icons " + opts.iconCls + "\"></span>";
            }
            //header.push("\">");
			header.push(icoPanel);
            header.push(opts.title);
            header.push("</div>");
            header.push("<div class=\"panel-tool\">");
            if (opts.collapsible) {
                header.push("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>");
            }
            if (opts.minimizable) {
                header.push("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>");
            }
            if (opts.maximizable) {
                header.push("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>");
            }
            if (opts.closable) {
                header.push("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>");
            }
			var hd = "";
            if (opts.tools) {
                if (typeof opts.tools === "string") {
                    $(opts.tools).children().each(function() {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a");
                    });
                    header.push($(opts.tools).html());
                    $(opts.tools).remove();
                } else {
                    for (var i = 0; i < opts.tools.length; i++) {						
                        header.push("<a href=\"javascript:void(0)\" class=\"");
                        header.push(opts.tools[i].iconCls);
						header.push("\"");
						if(opts.tools[i].handle){
							opts.tools[i].handle = eval(opts.tools[i].handle);
							header.push(" _kuiIndex=\"");
							header.push(i);
							header.push("\">");
						}
                        header.push("</a>");
						
                    }
                }
            }
            header.push("</div></div>");
            var jqHeader = $(header.join(""));
            jqHeader.prependTo(panel);
            jqHeader.find(".panel-tool").bind("click",
            function(e) {
                var jqE = $(e.target);
                if (jqE.hasClass("panel-tool-collapse")) {					
                    onToggle(jqE);
                } else if (jqE.hasClass("panel-tool-min")) {
                    onMin(e);
                } else if (jqE.hasClass("panel-tool-max")) {
                    onMax(jqE);
                } else if (jqE.hasClass("panel-tool-close")) {
                    onClose(e);
                } else if (jqE.attr('_kuiIndex')>-1) {
                    var idx = jqE.attr('_kuiIndex');
                    opts.tools[idx].handle();
                }
                return false;
            });
            panel.children("div.panel-body").removeClass("panel-body-noheader");
        } else {
            panel.children("div.panel-body").addClass("panel-body-noheader");
        }
        function onToggle(jq) {
            if (jq.hasClass("panel-tool-expand")) {
				expandPanel(target, true);
            } else {
                collapsePanel(target, true);
            }
            return false;
        }

        function onMin() {
            minimizePanel(target);
            return false;
        }
        function onMax(jq) {			
            if (jq.hasClass("panel-tool-restore")) {
                restorePanel(target);
            } else {
                maximizePanel(target);
            }
            return false;
        }

        function onClose() {
            closePanel(target);
            return false;
        }
    };

    //加载数据 load content from remote site if the href attribute is defined
    function loadData(target) {
        var state = $.data(target, "panel");
        if (state.options.href && (!state.isLoaded || !state.options.cache)) {
            state.isLoaded = false;
            destroy(target);
            var pbody = state.panel.find(">div.panel-body");
            pbody.empty();
            if (state.options.loadingMessage) {
                pbody.html($("<div class=\"panel-loading\"></div>").html(state.options.loadingMessage));
            }
            var frame = $("<iframe frameBorder=0 width=100% height=99%></iframe>").attr('src', state.options.href).appendTo(pbody);
            frame.bind('load',
            function loadFrame() {
                pbody.children("div.panel-loading").remove();
                state.options.onLoad.apply(target, arguments);
                state.isLoaded = true;
                setTimeout(function() {
                    frame.unbind();
                },
                100);
            });
        }
    };

    function getPanelContent(target) {
        var state = $.data(target, "panel");
        if (state.options.href) {
            return $(target).find(":first-child")[0].contentWindow;
        } else {
            return $(target).find(":first-child");
        }
    }

    function destroy(target) {
        var t = $(target);
        t.find(".combo-f").each(function() {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function() {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function() {
            $(this).splitbutton("destroy");
        });
    };

    function trigger(target) {
        $(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
            $(this).triggerHandler("_resize", [true]);
        });
    };

    //打开panel
    function openPanel(target, forceOpen) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;

        if (forceOpen != true) {
            if (opts.onBeforeOpen.call(target) == false) {
                return;
            }
        }
        panel.show();
        opts.closed = false;
        opts.minimized = false;
        opts.onOpen.call(target);
        if (opts.maximized == true) {
            opts.maximized = false;
            maximizePanel(target)
        };
        if (opts.collapsed == true) {
            opts.collapsed = false;
            collapsePanel(target);
        }
        if (!opts.collapsed) {
            loadData(target);
            trigger(target);
        }
    };

    //关闭panel
    function closePanel(target, forceClose) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;

        if (forceClose != true) {
            if (opts.onBeforeClose.call(target) == false) return;
        }
        panel.hide();
        opts.closed = true;
        opts.onClose.call(target);
    };

    //销毁panel
    function destroyPanel(target, forceDestroy) {
        if (!$.data(target, "panel")) return;
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;

        if (forceDestroy != true) {
            if (opts.onBeforeDestroy.call(target) == false) {
                return;
            }
        }
        destroy(target);
        removeNode(panel);
        opts.onDestroy.call(target);
    };

    //缩小panel
    function collapsePanel(target, animate) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var body = panel.children("div.panel-body");
        var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");

        if (opts.collapsed == true) return;

        body.stop(true, true); // stop animation
        if (opts.onBeforeCollapse.call(target) == false) return;

        tool.addClass("panel-tool-expand");
        if (animate == true) {
            body.slideUp("normal",
            function() {
                opts.collapsed = true;
                opts.onCollapse.call(target);
            });
        } else {
            body.hide();
            opts.collapsed = true;
            opts.onCollapse.call(target);
        }
    }

    //展开panel
    function expandPanel(target, animate) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var body = panel.children("div.panel-body");
        var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");

        if (opts.collapsed == false) return;

        body.stop(true, true); // stop animation
        if (opts.onBeforeExpand.call(target) == false) {
            return;
        }
        tool.removeClass("panel-tool-expand");
        if (animate == true) {
            body.slideDown("normal",
            function() {
                opts.collapsed = false;
                opts.onExpand.call(target);
                loadData(target);
                trigger(target);
            });
        } else {
            body.show();
            opts.collapsed = false;
            opts.onExpand.call(target);
            loadData(target);
            trigger(target);
        }
    }

    //最大化panel
    function maximizePanel(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var tool = panel.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == true) {
            return;
        }
        tool.addClass("panel-tool-restore");
        if (!$.data(target, "panel").original) {
            $.data(target, "panel").original = {
                width: opts.width,
                height: opts.height,
                left: opts.left,
                top: opts.top,
                fit: opts.fit
            };
        }
        opts.left = 0;
        opts.top = 0;
        opts.fit = true;
        setSize(target);
        opts.minimized = false;
        opts.maximized = true;
        opts.onMaximize.call(target);
    }

    //最小化panel
    function minimizePanel(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        panel.hide();
        opts.minimized = true;
        opts.maximized = false;
        opts.onMinimize.call(target);
    };

    //还原panel
    function restorePanel(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var tool = panel.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == false) {
            return;
        }
        panel.show();
        tool.removeClass("panel-tool-restore");
        var original = $.data(target, "panel").original;
        opts.width = original.width;
        opts.height = original.height;
        opts.left = original.left;
        opts.top = original.top;
        opts.fit = original.fit;
        setSize(target);
        opts.minimized = false;
        opts.maximized = false;
        $.data(target, "panel").original = null;
        opts.onRestore.call(target);
    }

    //设置边界样式
    function setBorder(target) {
        var opts = $.data(target, "panel").options;
        var panel = $.data(target, "panel").panel;
        var header = $(target).panel("header");
        var body = $(target).panel("body");
        panel.css(opts.style);
        panel.addClass(opts.cls);
        if (opts.border) {
            header.removeClass("panel-header-noborder");
            body.removeClass("panel-body-noborder")
        } else {
            header.addClass("panel-header-noborder");
            body.addClass("panel-body-noborder")
        }
        header.addClass(opts.headerCls);
        body.addClass(opts.bodyCls);
        if (opts.id) {
            $(target).attr("id", opts.id)
        } else {
            $(target).attr("id", "")
        }
    };

    //设置标题信息
    function setTitle(target, title) {
        $.data(target, "panel").options.title = title;
        $(target).panel("header").find("div.panel-title").html(title);
    };

    var TO = false;
    var flag = true;
    $(window).unbind(".panel").bind("resize.panel",
    function() {		
        if (!flag) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function() {
            flag = false;
            var layout = $("body.layout");
            if (layout.length) {
                layout.layout("resize");
            } else {				
                $("body").children("div.panel,div.accordion,div.tabs-container,div.layout").triggerHandler("_resize");
            }
            flag = true;
            TO = false;
        },
        200);
    });

    function resizeEvent(target) {
        var state = $.data(target, "panel");
        state.panel.resizable({
            handles: "s",
            disabled: state.options.resizable == false,
            onStartResize: function(e) {
                state.pmask = $('<div class="panel-proxy-mask"></div>').insertAfter(state.panel);
                state.pmask.css({
                    left: e.data.left,
                    top: e.data.top,
                    width: state.panel._outerWidth(),
                    height: state.panel._outerHeight()
                });
                if (!state.proxy) {
                    state.proxy = $('<div class="panel-proxy"></div>').insertAfter(state.panel);
                }
                state.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
            },
            onResize: function(e) {
                state.proxy.css({
                    left: e.data.left,
                    top: e.data.top
                });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
                return false;
            },
            onStopResize: function(e) {
                $.extend(state.options, {
                    left: e.data.left,
                    top: e.data.top,
                    width: e.data.width,
                    height: e.data.height
                });
                setSize(target);
                state.pmask.remove();
                state.pmask = null;
                state.proxy.remove();
                state.proxy = null;
            }
        });
    }
})(jQuery);