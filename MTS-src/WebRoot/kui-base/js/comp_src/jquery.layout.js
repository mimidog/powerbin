/**
 * layout - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 *   resizable 
 *   panel 	 
 * 
 */
(function($) {
    $.fn.layout = function(options, param) {
        if (typeof options == "string") {
            return $.fn.layout.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "layout");
            if (state) {
                $.extend(state.options, options);
            } else {
                var opts = $.extend({},
                $.fn.layout.defaults, $.fn.layout.parseOptions(this), options);
                $.data(this, "layout", {
                    options: opts,
                    panels: {
                        center: $(),
                        north: $(),
                        south: $(),
                        east: $(),
                        west: $()
                    }
                });
                init(this);
                bindEvents(this);
            }
            setSize(this);
            setCollapse(this);
			opts.onInitSuccess.call(this,this);
        });
    };
    $.fn.layout.methods = {
        resize: function(jq) {
            return jq.each(function() {
                setSize(this);
            });
        },
        panel: function(jq, param) {
            return $.data(jq[0], "layout").panels[param];
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
        },
        add: function(jq, param) {
            return jq.each(function() {
                createPanel(this, param);
                setSize(this);
                if ($(this).layout("panel", param.region).panel("options").collapsed) {
                    collapsePanel(this, param.region, 0);
                }
            });
        },
        remove: function(jq, param) {
            return jq.each(function() {
                destroy(this, param);
                setSize(this);
            });
        }
    };
    $.fn.layout.parseOptions = function(options) {
        return $.extend({},
        $.parser.parseOptions(options, [{
            fit: "boolean"
        }]));
    };
    $.fn.layout.defaults = {
        fit: false,
		onInitSuccess:function(target){}
    };

    var resizing = false;
    function setSize(container) {
        var opts = $.data(container, "layout").options;
        var panels = $.data(container, "layout").panels;
        var cc = $(container);
        opts.fit ? cc.css(cc._fit()) : cc._fit(false);
        var cpos = {
            top: 0,
            left: 0,
            width: cc.width(),
            height: cc.height()
        };
        function setNorthSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: cc.width(),
                height: pp.panel("options").height,
                left: 0,
                top: 0
            });
            cpos.top += pp.panel("options").height;
            cpos.height -= pp.panel("options").height;
        }
        if (isVisible(panels.expandNorth)) {
            setNorthSize(panels.expandNorth);
        } else {
            setNorthSize(panels.north);
        }
        function setSouthSize(pp) {
            if (pp.length == 0) {
                return;
            }
            pp.panel("resize", {
                width: cc.width(),
                height: pp.panel("options").height,
                left: 0,
                top: cc.height() - pp.panel("options").height
            });
            cpos.height -= pp.panel("options").height;
        }
        if (isVisible(panels.expandSouth)) {
            setSouthSize(panels.expandSouth);
        } else {
            setSouthSize(panels.south);
        }
        function setEastSize(pp) {
            if (pp.length == 0) return;
            pp.panel("resize", {
                width: pp.panel("options").width,
                height: cpos.height,
                left: cc.width() - pp.panel("options").width,
                top: cpos.top
            });
            cpos.width -= pp.panel("options").width;
        }

        if (isVisible(panels.expandEast)) {
            setEastSize(panels.expandEast);
        } else {
            setEastSize(panels.east);
        }
        function setWestSize(pp) {
            if (pp.length == 0) return;
            pp.panel("resize", {
                width: pp.panel("options").width,
                height: cpos.height,
                left: 0,
                top: cpos.top
            });
            cpos.left += pp.panel("options").width;
            cpos.width -= pp.panel("options").width;
        }
        if (isVisible(panels.expandWest)) {
            setWestSize(panels.expandWest);
        } else {
            setWestSize(panels.west);
        }
        panels.center.panel("resize", cpos);
    };

    function init(container) {
        var cc = $(container);
        if (cc[0].tagName == "BODY") {
            $("html").addClass("panel-fit");
        }
        cc.addClass("layout");
        function resizePanel(cc) {
            cc.children("div").each(function() {
                var opts = $.parser.parseOptions(this, ["region"]);
                var r = opts.region;
                if (r == "north" || r == "south" || r == "east" || r == "west" || r == "center") {
                    createPanel(container, opts, this);
                }
            });
        }
        cc.children("form").length ? resizePanel(cc.children("form")) : resizePanel(cc);
        $("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
        $("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
        cc.bind("_resize",
        function(e, flag) {
            var opts = $.data(container, "layout").options;
            if (opts.fit == true || flag) {
                setSize(container);
            }
            return false;
        });
    }

    function createPanel(container, opts, el) {
        opts.region = opts.region || "center";
        var panels = $.data(container, "layout").panels;
        var cc = $(container);
        var dir = opts.region;
        if (panels[dir].length) {
            return;
        }
        var pp = $(el);
        if (!pp.length) {
            pp = $("<div></div>").appendTo(cc);
        }
		
        pp.panel($.extend({},{
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
            height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
            split: (pp.attr("split") ? pp.attr("split") == "true": undefined),
            doSize: false,
            cls: ("layout-panel layout-panel-" + dir),
            bodyCls: "layout-body",
            onOpen: function() {
                if(opts.collapsable === false) {
                    return;
                }

                var regions = {
                    north: "up",
                    south: "down",
                    east: "right",
                    west: "left"
                };
                if (!regions[dir]) {
                    return;
                }				
                var clsName = "layout-button-" + regions[dir];
                var tools = $(this).panel("header").children("div.panel-tool");
                if (!tools.children("a." + clsName).length) {
                    var t = $("<a href=\"javascript:void(0)\"></a>").addClass(clsName).appendTo(tools);
                    t.bind("click", {
                        dir: dir
                    },
                    function(e) {
                        collapsePanel(container, e.data.dir);
                        return false;
                    });
                }
            }
        },opts));
        panels[dir] = pp;
		
        if (pp.panel("options").split) {
            var panel = pp.panel("panel");
            panel.addClass("layout-split-" + dir);
            var handles = "";
            if (dir == "north") {
                handles = "s";
            }
            if (dir == "south") {
                handles = "n";
            }
            if (dir == "east") {
                handles = "w";
            }
            if (dir == "west") {
                handles = "e";
            }
            panel.resizable({
                handles: handles,
                onStartResize: function(e) {
                    resizing = true;
                    var proxy = "";
                    if (dir == "north" || dir == "south") {
                        var proxy = $(">div.layout-split-proxy-v", container);
                    } else {
                        var proxy = $(">div.layout-split-proxy-h", container);
                    }
                    var pos = {
                        display: "block"
                    };
                    if (dir == "north") {
                        pos.top = parseInt(panel.css("top")) + panel.outerHeight() - proxy.height();
                        pos.left = parseInt(panel.css("left"));
                        pos.width = panel.outerWidth();
                        pos.height = proxy.height();
                    } else if (dir == "south") {
                        pos.top = parseInt(panel.css("top"));
                        pos.left = parseInt(panel.css("left"));
                        pos.width = panel.outerWidth();
                        pos.height = proxy.height();
                    } else if (dir == "east") {
                        pos.top = parseInt(panel.css("top")) || 0;
                        pos.left = parseInt(panel.css("left")) || 0;
                        pos.width = proxy.width();
                        pos.height = panel.outerHeight();
                    } else if (dir == "west") {
                        pos.top = parseInt(panel.css("top")) || 0;
                        pos.left = panel.outerWidth() - proxy.width();
                        pos.width = proxy.width();
                        pos.height = panel.outerHeight();
                    }
                    proxy.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                },
                onResize: function(e) {
                    if (dir == "north" || dir == "south") {
                        var proxy = $(">div.layout-split-proxy-v", container);
                        proxy.css("top", e.pageY - $(container).offset().top - proxy.height() / 2);
                    } else {
                        var proxy = $(">div.layout-split-proxy-h", container);
                        proxy.css("left", e.pageX - $(container).offset().left - proxy.width() / 2);
                    }
                    return false;
                },
                onStopResize: function() {
                    $(">div.layout-split-proxy-v", container).css("display", "none");
                    $(">div.layout-split-proxy-h", container).css("display", "none");
                    var opts = pp.panel("options");
                    opts.width = panel.outerWidth();
                    opts.height = panel.outerHeight();
                    opts.left = panel.css("left");
                    opts.top = panel.css("top");
                    pp.panel("resize");
                    setSize(container);
                    resizing = false;
                    cc.find(">div.layout-mask").remove();
                }
            });
        }
    }

    function destroy(target, param) {
        var pp = $.data(target, "layout").panels;
        if (pp[param].length) {
            pp[param].panel("destroy");
            pp[param] = $();
            var dir = "expand" + param.substring(0, 1).toUpperCase() + param.substring(1);
            if (pp[dir]) {
                pp[dir].panel("destroy");
                pp[dir] = undefined;
            }
        }
    }

    function collapsePanel(container, region, speed) {
        var panels = $.data(container, "layout").panels;
        var p = panels[region];
        if (p.panel("options").onBeforeCollapse.call(p) == false) {
            return;
        }
        var expRegion = "expand" + region.substring(0, 1).toUpperCase() + region.substring(1);
        if (!panels[expRegion]) {
            panels[expRegion] = createExpandPanel(region);
            panels[expRegion].panel("panel").click(function() {
                var states = getStates();
                p.panel("expand", false).panel("open").panel("resize", states.collapse);
                p.panel("panel").animate(states.expand);
                return false;
            });
        }
        var states = getStates();
        if (!isVisible(panels[expRegion])) {
            panels.center.panel("resize", states.center);
        }
        p.panel("panel").animate(states.collapse, speed || "normal",
        function() {
            p.panel("collapse", false).panel("close");
            panels[expRegion].panel("open").panel("resize", states.pos);
        });
        function createExpandPanel(dir) {
            var icon;
            if (dir == "east") {
                icon = "layout-button-left";
            } else if (dir == "west") {
                icon = "layout-button-right";
            } else if (dir == "north") {
                icon = "layout-button-down";
            } else if (dir == "south") {
                icon = "layout-button-up";
            }
            var p = $("<div></div>").appendTo(container).panel({
                cls: "layout-expand",
                title: "&nbsp;",
                closed: true,
                doSize: false,
                tools: [{
                    iconCls: icon,
                    handle: function() {
                        expandPanel(container, region);
                        return false;
                    }
                }]
            });
            p.panel("panel").hover(function() {
                $(this).addClass("layout-expand-over");
            },
            function() {
                $(this).removeClass("layout-expand-over");
            });
            return p;
        }

        function getStates() {
            var cc = $(container);
            if (region == "east") {
                return {
                    center: {
                        width: panels.center.panel("options").width + panels["east"].panel("options").width - 28
                    },
                    expand: {
                        left: cc.width() - panels["east"].panel("options").width
                    },
                    pos: {
                        top: panels["east"].panel("options").top,
                        left: cc.width() - 28,
                        width: 28,
                        height: panels["center"].panel("options").height
                    },
                    collapse: {
                        left: cc.width()
                    }
                };
            } else if (region == "west") {
                return {
                    center: {
                        width: panels.center.panel("options").width + panels["west"].panel("options").width - 28,
                        left: 28
                    },
                    expand: {
                        left: 0
                    },
                    pos: {
                        left: 0,
                        top: panels["west"].panel("options").top,
                        width: 28,
                        height: panels["center"].panel("options").height
                    },
                    collapse: {
                        left: -panels["west"].panel("options").width
                    }
                };
            } else if (region == "north") {
                var hh = cc.height() - 28;
                if (isVisible(panels.expandSouth)) {
                    hh -= panels.expandSouth.panel("options").height;
                } else {
                    if (isVisible(panels.south)) {
                        hh -= panels.south.panel("options").height;
                    }
                }
                panels.east.panel("resize", {
                    top: 28,
                    height: hh
                });
                panels.west.panel("resize", {
                    top: 28,
                    height: hh
                });
                if (isVisible(panels.expandEast)) {
                    panels.expandEast.panel("resize", {
                        top: 28,
                        height: hh
                    });
                }
                if (isVisible(panels.expandWest)) {
                    panels.expandWest.panel("resize", {
                        top: 28,
                        height: hh
                    });
                }
                return {
                    center: {
                        top: 28,
                        height: hh
                    },
                    expand: {
                        top: 0
                    },
                    pos: {
                        top: 0,
                        left: 0,
                        width: cc.width(),
                        height: 28
                    },
                    collapse: {
                        top: -panels["north"].panel("options").height
                    }
                };
            } else if (region == "south") {
                var hh = cc.height() - 28;
                if (isVisible(panels.expandNorth)) {
                    hh -= panels.expandNorth.panel("options").height;
                } else {
                    if (isVisible(panels.north)) {
                        hh -= panels.north.panel("options").height;
                    }
                }
                panels.east.panel("resize", {
                    height: hh
                });
                panels.west.panel("resize", {
                    height: hh
                });
                if (isVisible(panels.expandEast)) {
                    panels.expandEast.panel("resize", {
                        height: hh
                    });
                }
                if (isVisible(panels.expandWest)) {
                    panels.expandWest.panel("resize", {
                        height: hh
                    });
                }
                return {
                    center: {
                        height: hh
                    },
                    expand: {
                        top: cc.height() - panels["south"].panel("options").height
                    },
                    pos: {
                        top: cc.height() - 28,
                        left: 0,
                        width: cc.width(),
                        height: 28
                    },
                    collapse: {
                        top: cc.height()
                    }
                };
            }
        };
		
		var panels = $.data(container, "layout").panels;
		var layout = p.parents("div.layout");
		
		//获取当前region的配置属性
		var opts = p.panel("options");
		//获取key
		var expandKey = "expand" + opts.region.substring(0, 1).toUpperCase() + opts.region.substring(1);
		//从layout的缓存对象中取得对应的收缩对象
		var epanel = layout.data("layout").panels[expandKey];
		
		//针对横向和竖向的不同处理方式
		if (opts.region == "west" || opts.region == "east") {
			//竖向的文字打竖,其实就是切割文字加br
			var split = [];
			for (var i = 0; i < opts.title.length; i++) {
				split.push(opts.title.substring(i, i + 1));
			}
			
			epanel.panel("body").addClass("panel-title").css(
				{"font-size":"12px","text-align":"center"}).html(split.join("<br/>"));
		} else {
			epanel.panel("setTitle", opts.title);
		}
    }

    function expandPanel(container, region) {
        var panels = $.data(container, "layout").panels;
        var states = getStates();
        var p = panels[region];
        if (p.panel("options").onBeforeExpand.call(p) == false) {
            return;
        }
        var expRegion = "expand" + region.substring(0, 1).toUpperCase() + region.substring(1);
        panels[expRegion].panel("close");
        p.panel("panel").stop(true, true);
        p.panel("expand", false).panel("open").panel("resize", states.collapse);
        p.panel("panel").animate(states.expand,
        function() {
            setSize(container);
        });
        function getStates() {
            var cc = $(container);
            if (region == "east" && panels.expandEast) {
                return {
                    collapse: {
                        left: cc.width()
                    },
                    expand: {
                        left: cc.width() - panels["east"].panel("options").width
                    }
                };
            } else if (region == "west" && panels.expandWest) {
                return {
                    collapse: {
                        left: -panels["west"].panel("options").width
                    },
                    expand: {
                        left: 0
                    }
                };
            } else if (region == "north" && panels.expandNorth) {
                return {
                    collapse: {
                        top: -panels["north"].panel("options").height
                    },
                    expand: {
                        top: 0
                    }
                };
            } else if (region == "south" && panels.expandSouth) {
                return {
                    collapse: {
                        top: cc.height()
                    },
                    expand: {
                        top: cc.height() - panels["south"].panel("options").height
                    }
                };
            }
        };
    }

    function bindEvents(container) {
        var panels = $.data(container, "layout").panels;
        var cc = $(container);
        if (panels.east.length) {
            panels.east.panel("panel").bind("mouseover", "east", collapse);
        }
        if (panels.west.length) {
            panels.west.panel("panel").bind("mouseover", "west", collapse);
        }
        if (panels.north.length) {
            panels.north.panel("panel").bind("mouseover", "north", collapse);
        }
        if (panels.south.length) {
            panels.south.panel("panel").bind("mouseover", "south", collapse);
        }
        panels.center.panel("panel").bind("mouseover", "center", collapse);
        function collapse(e) {
            if (resizing == true) {
                return;
            }
            if (e.data != "east" && isVisible(panels.east) && isVisible(panels.expandEast)) {
                collapsePanel(container, "east");
            }
            if (e.data != "west" && isVisible(panels.west) && isVisible(panels.expandWest)) {
                collapsePanel(container, "west");
            }
            if (e.data != "north" && isVisible(panels.north) && isVisible(panels.expandNorth)) {
                collapsePanel(container, "north");
            }
            if (e.data != "south" && isVisible(panels.south) && isVisible(panels.expandSouth)) {
                collapsePanel(container, "south");
            }
            return false;
        };
    }

    function isVisible(pp) {
        if (pp && pp.length) {
            return pp.panel("panel").is(":visible");
        } else {
            return false;
        }
    }

    function setCollapse(container) {
        var panels = $.data(container, "layout").panels;
        if (panels.east.length && panels.east.panel("options").collapsed) {
            collapsePanel(container, "east", 0);
        }
        if (panels.west.length && panels.west.panel("options").collapsed) {
            collapsePanel(container, "west", 0);
        }
        if (panels.north.length && panels.north.panel("options").collapsed) {
            collapsePanel(container, "north", 0);
        }
        if (panels.south.length && panels.south.panel("options").collapsed) {
            collapsePanel(container, "south", 0);
        }
    }

})(jQuery);