/**
 * message - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *     draggable,resizable,linkbutton,panel,window
 *
 */

(function ($) {
    $.message = {
        show: function (options) {
            return createWin(options);
        },
        alert: function (title, msg, type, fn, onCloseCallback) {
            if (!msg) {
                msg = title;
                title = "消息提示";
            }
            var content = "<div class='messager-text'>" + msg + "</div>";
            if(type){
                if(typeof type=="function"){
                    if(typeof fn=="function"){
                        onCloseCallback=fn;
                    }
                    fn=type;
                }
                type=typeof type=="function"?"info":type;
            } else {
	    	type = "info";
	    }
            switch (type) {
                case "error":
                    content = "<div class=\"messager-icon messager-error\"></div>" + content;
                    break;
                case "info":
                    content = "<div class=\"messager-icon messager-info\"></div>" + content;
                    break;
                case "question":
                    content = "<div class=\"messager-icon messager-question\"></div>" + content;
                    break;
                case "warning":
                    content = "<div class=\"messager-icon messager-warning\"></div>" + content;
                    break;
            }
            content += "<div style=\"clear:both;\"/>";
            var buttons = {};
            buttons[$.message.defaults.ok] = function () {
                if (fn) {
                    fn();
                }
                win.window("close");
            };
            var win = createDialog(title, content, buttons,false, onCloseCallback);
            return win;
        },
        confirm: function (title, msg, fn, parse, onCloseCallback) {
            var content = "<div class=\"messager-icon messager-question\"></div>" + "<div class='messager-text'>" + msg + "</div>" + "<div style=\"clear:both;\"/>";
            if(typeof parse=="function"){
                onCloseCallback=parse;
                parse=false;
            }
            var button = {};
            button[$.message.defaults.ok] = function () {
                if (fn) {
                    fn(true, win);
                }
                if (!parse)
                    win.window("close");
            };
            button[$.message.defaults.cancel] = function () {
                if (fn) {
                    fn(false);
                }
                win.window("close");
            };
            var win = createDialog(title, content, button, parse, onCloseCallback);
            return win;
        },

        prompt: function (title, msg, fn, validFn, onCloseCallback) {
            var content = "<div class=\"messager-icon messager-info\"></div>" + "<div class='messager-text'>" + msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>";
            var button = {};
            button[$.message.defaults.ok] = function () {
                var v = $.trim($(".messager-input", win).val());
                validFn = $.isFunction(validFn) ? validFn : function () {
                    return true
                };
                if (v && false !== validFn(v)) {
                    if (fn) {
                        fn(v);
                    }
                    win.window("close");
                }
            };
            button[$.message.defaults.cancel] = function () {
                if (fn) {
                    fn();
                }
                win.window("close");
            };
            var win = createDialog(title, content, button,false,onCloseCallback);
            win.find("input.messager-input").focus();
            return win;
        },
        progress: function (options) {
            var bar = {
                bar: function () {
                    return $("body>div.messager-window").find("div.messager-p-bar");
                },
                close: function () {
                    var win = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                    if (win.length) {
                        win.window("close");
                    }
                }
            };
            if (typeof options == "string") {
                var type1 = bar[options];
                return type1();
            }
            var opts = $.extend({
                    title: "",
                    msg: "",
                    text: undefined,
                    interval: 300,
                    onCloseCallback:function(){}
                },
                    options || {});
            var content = "<div class=\"messager-progress\"><div class=\"messager-p-msg\"></div><div class=\"messager-p-bar\"></div></div>";
            var win = createDialog(opts.title, content, null);
            win.find("div.messager-p-msg").html(opts.msg);
            var bar = win.find("div.messager-p-bar");
            bar.progressbar({
                text: opts.text
            });
            win.window({
                closable: true,
                onClose: function () {
                    if(typeof opts.onCloseCallback=="function"){
                        opts.onCloseCallback();
                    }
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    $(this).window("destroy");
                }
            });
            if (opts.interval) {
                win[0].timer = setInterval(function () {
                        var v = bar.progressbar("getValue");
                        v += 10;
                        if (v > 100) {
                            v = 0;
                        }
                        bar.progressbar("setValue", v);
                    },
                    opts.interval);
            }
            return win;
        },
        error: function (msg, estack, fn, onCloseCallback) {
            var title = "错误提示";
            var content = "<div style='line-height:32px;'>" + msg + "</div>";
            content = "<div class=\"messager-icon messager-error\"></div>" + content;
            content += "<div class=\"messager-detail\">" + estack + "</div>"
            content += "<div class=\"messager-link\">错误详情</div>"
            content += "<div style=\"clear:both;\"/>";
            var buttons = {};
            buttons[$.message.defaults.ok] = function () {
                if (fn) {
                    fn();
                }
                win.window("close");
            };
            var win = createDialog(title, content, buttons, false, onCloseCallback);
            win.find("div.messager-link").on('click', function (e) {
                win.find("div.messager-detail").toggle();
            });
            return win;
        },
        loading: function (text){
            var win,content;
            text = text || "操作中，请稍后！";
            content= '<div class="progress-mask-msg">'+text+'</div>';
            win = createDialog(false, content, false,false,false);
            win.addClass("messager-loading-body").closest("div.messager-window").addClass("message-loading").next("div.window-shadow").remove();
            return win;
        }
    };
    $.message.defaults = {
        ok: "Ok",
        cancel: "Cancel"
    };

    function show(win, type, speed, timeout) {
        var win = $(win).window("window");
        if (!win) {
            return;
        }
        switch (type) {
            case null:
                win.show();
                break;
            case "slide":
                win.slideDown(speed);
                break;
            case "fade":
                win.fadeIn(speed);
                break;
            case "show":
                win.show(speed);
                break;
        }
        var timer = null;
        if (timeout > 0) {
            timer = setTimeout(function () {
                    hide(win, type, speed);
                },
                timeout);
        }
        win.hover(function () {
                if (timer) {
                    clearTimeout(timer);
                }
            },
            function () {
                if (timeout > 0) {
                    timer = setTimeout(function () {
                            hide(win, type, speed);
                        },
                        timeout);
                }
            });
    }

    function hide(win, type, speed) {
        if (win.locked == true) {
            return;
        }
        win.locked = true;
        var win = $(win).window("window");
        if (!win) {
            return;
        }
        switch (type) {
            case null:
                win.hide();
                break;
            case "slide":
                win.slideUp(speed);
                break;
            case "fade":
                win.fadeOut(speed);
                break;
            case "show":
                win.hide(speed);
                break;
        }
        setTimeout(function () {
                $(win).window("destroy");
            },
            speed);
    }

    function createWin(options) {
        var options = $.extend({},
            $.fn.window.defaults, {
                collapsible: false,
                minimizable: false,
                maximizable: false,
                shadow: false,
                draggable: false,
                resizable: false,
                closed: true,
                style: {
                    left: "",
                    top: "",
                    right: 0,
                    zIndex: $.fn.window.defaults.zIndex++,
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                },
                onBeforeOpen: function () {
                    show(this, options.showType, options.showSpeed, options.timeout);
                    return false;
                },
                onBeforeClose: function () {
                    hide(this, options.showType, options.showSpeed);
                    return false;
                }
            },
            {
                title: "",
                width: 250,
                height: 100,
                showType: "slide",
                showSpeed: 600,
                msg: "",
                timeout: 4000
            },
            options);
        options.style.zIndex = $.fn.window.defaults.zIndex++;
        var wind = $("<div class=\"messager-body\"></div>").html(options.msg).appendTo("body");
        wind.window(options);
        wind.window("window").css(options.style);
        wind.window("open");
        return wind;
    }

    function createDialog(title, content, buttons, parser, onCloseCallback) {
        var win = $("<div class=\"messager-body\"></div>").appendTo("body");
        win.append(content);
        if (parser)
            $.parser.director(win);
        if (buttons) {
            var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
            for (var label in buttons) {
                $("<a></a>").attr("href", "javascript:void(0)").text(label).css("margin-left", 10).bind("click", eval(buttons[label])).appendTo(tb).linkbutton();
            }
        }
        win.window({
            title: title,
            noheader: (title ? false : true),
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            onClose: function () {
                setTimeout(function () {
                        if(typeof onCloseCallback=="function"){
                            onCloseCallback();
                            return false;
                        }
                        win.window("destroy");
                    },
                    100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").find("a:first").focus();
        return win;
    }

    $alert = window.alert;
    $confirm = window.confirm;
    $prompt = window.prompt;
    window.alert = $.message.alert;
    window.confirm = $.message.confirm;
    window.prompt = $.message.prompt;
})(jQuery);

