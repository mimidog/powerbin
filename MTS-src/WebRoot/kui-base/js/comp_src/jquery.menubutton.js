/**
 * menubutton - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 *   linkbutton
 *   menu	 
 * 
 */
(function($) {
    $.fn.menubutton = function(options, param) {
        if (typeof options == "string") {
            return $.fn.menubutton.methods[options](this, param)
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "menubutton");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "menubutton", {
                    options: $.extend({},
                    $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), options)
                });
                $(this).removeAttr("disabled");
            }
            init(this);
        });
    };
    //menubutton方法
    $.fn.menubutton.methods = {
        options: function(jq) {
            return $.data(jq[0], "menubutton").options
        },
        enable: function(jq) {
            return jq.each(function() {
                setDisabled(this, false)
            })
        },
        disable: function(jq) {
            return jq.each(function() {
                setDisabled(this, true)
            })
        },
        destroy: function(jq) {
            return jq.each(function() {
                var opts = $(this).menubutton("options");
                if (opts.menu) {
                    $(opts.menu).menu("destroy")
                }
                $(this).remove()
            })
        }
    };

    $.fn.menubutton.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.fn.linkbutton.parseOptions(target), $.parser.parseOptions(target, ["menu", {
            plain: "boolean",
            duration: "number"
        }]))
    };

    //menubutton属性
    //引用linkbutton
    $.fn.menubutton.defaults = $.extend({},$.fn.linkbutton.defaults, {
        plain: true,
        menu: null,
        duration: 100
    })
    //初始化menubutton
    function init(target) {
        var opts = $.data(target, "menubutton").options;
        var btn = $(target);
        btn.removeClass("m-btn-active m-btn-plain-active").addClass("m-btn");
        btn.linkbutton($.extend({},
        opts, {
            text: opts.text + "<span class=\"m-btn-downarrow\">&nbsp;</span>"
        }));
        if (opts.menu) {
            $(opts.menu).menu({
                onShow: function() {
                    btn.addClass((opts.plain == true) ? "m-btn-plain-active": "m-btn-active");
                },
                onHide: function() {
                    btn.removeClass((opts.plain == true) ? "m-btn-plain-active": "m-btn-active");
                }
            });
        }
        setDisabled(target, opts.disabled)
    };
    //设置menubutton可用或不可用
    function setDisabled(target, disabled) {
        var opts = $.data(target, "menubutton").options;
        opts.disabled = disabled;
        var btn = $(target);
        if (disabled) {
            btn.linkbutton("disable");
            btn.unbind(".menubutton")
        } else {
            btn.linkbutton("enable");
            btn.unbind(".menubutton");
            btn.bind("click.menubutton",
            function() {
                showMenu();
                return false;
            });
            var timeout = null;
            btn.bind("mouseenter.menubutton",
            function() {
                timeout = setTimeout(function() {
                    showMenu();
                },
                opts.duration);
                return false;
            }).bind("mouseleave.menubutton",
            function() {
                if (timeout) {
                    clearTimeout(timeout);
                }
            });
        }
        //显示menu
        function showMenu() {
            if (!opts.menu) {
                return
            }
            var left = btn.offset().left;
            if (left + $(opts.menu).outerWidth() + 5 > $(window).width()) {
                left = $(window).width() - $(opts.menu).outerWidth() - 5;
            }
            $("body>div.menu-top").menu("hide");
            $(opts.menu).menu("show", {
                left: left,
                top: btn.offset().top + btn.outerHeight()
            });
            btn.blur();
        }
    }

})(jQuery);