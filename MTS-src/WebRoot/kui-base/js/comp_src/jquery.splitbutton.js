/**
 * splitbutton - KINGDOM-UI 
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *   linkbutton
 *   menu
 * 
 */

(function($) {
    $.fn.splitbutton = function(options) {
        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'splitbutton');
            if (state) {
                $.extend(state.options, options);
            } else {
                var t = $(this);
                $.data(this, 'splitbutton', {
                    options: $.extend({},
                    $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), options)
                });
                $(this).removeAttr('disabled');
            }
            init(this);
        });
    };

    $.fn.splitbutton.parseOptions = function(target) {
        return $.extend({},
        $.fn.linkbutton.parseOptions(target), $.parser.parseOptions(target, ["menu", {
            plain: "boolean",
            duration: "number"
        }]));
    };

    $.fn.splitbutton.defaults = $.extend({},
    $.fn.linkbutton.defaults, {
        plain: true,
        menu: null,
        duration: 100
    });

    function init(target) {
        var opts = $.data(target, 'splitbutton').options;

        if (opts.menu) {
            $(opts.menu).menu({
                onShow: function() {
                    btn.addClass((opts.plain == true) ? 's-btn-plain-active': 's-btn-active');
                },
                onHide: function() {
                    btn.removeClass((opts.plain == true) ? 's-btn-plain-active': 's-btn-active');
                }
            });
        }

        var btn = $(target);
        btn.removeClass('s-btn-active s-btn-plain-active');
        btn.linkbutton($.extend({},
        opts, {
            text: opts.text + "<span class=\"s-btn-downarrow\">&nbsp;</span>"
        }));

        var menubtn = btn.find('.s-btn-downarrow');
        menubtn.unbind('.splitbutton');
        if (opts.disabled == false && opts.menu) {
            menubtn.bind('click.splitbutton',
            function() {
                showMenu();
                return false;
            });
            var timeout = null;
            menubtn.bind('mouseenter.splitbutton',
            function() {
                timeout = setTimeout(function() {
                    showMenu();
                },
                opts.duration);
                return false;
            }).bind('mouseleave.splitbutton',
            function() {
                if (timeout) {
                    clearTimeout(timeout);
                }
            });
        }
        function showMenu() {
            var left = btn.offset().left;
            if (left + $(opts.menu).outerWidth() + 5 > $(window).width()) {
                left = $(window).width() - $(opts.menu).outerWidth() - 5;
            }

            $('.menu-top').menu('hide');
            $(opts.menu).menu('show', {
                left: left,
                top: btn.offset().top + btn.outerHeight()
            });
            btn.blur();
        }
    }
})(jQuery);