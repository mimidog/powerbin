/**
 * fieldset - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */
(function($) {
    $.fn.fieldset = function(options, param) {
        if (typeof options == "string") {
            return $.fn.fieldset.methods[options](this, param);
        }
        var options = options || {};

        this.each(function() {
            var state = $.data(this, "fieldset");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                opts = $.extend({},
                $.fn.fieldset.defaults, $.fn.fieldset.parseOptions(this), options);
                $.data(this, "fieldset", {
                    options: opts
                });
            }
            var fieldset = $(this);
            fieldset.attr("class", 'fieldset');
            var legend = fieldset.children('legend').length ? fieldset.children('legend') : $('<legend>' + opts.title + '</legend>').appendTo(fieldset);

            //var d = legend.next('div').length ? legend.next('div') : $('<div/>').insertAfter(legend);
            legend.bind('click',
            function() {
                if (opts.animation) {					
                    $(this).next().slideToggle(opts.speed);
                } else {
					
                    $(this).next().toggle();
                }
            });
            if (!opts.collapsed) {
                $(legend).next().slideUp();
            }

        });
    };

    $.fn.fieldset.methods = {
        options: function(jq) {
            return $.data(jq[0], "fieldset").options;
        },
        hideFieldsetContent: function(jq, opts) {
            return jq.each(function() {
                hideFieldsetContent(this, opts);
            });
        },
        showFieldsetContent: function(jq, opts) {
            return jq.each(function() {
                showFieldsetContent(this, opts);
            });
        }
    };

    $.fn.fieldset.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.parser.parseOptions(target));
    };

    $.fn.fieldset.defaults = {
        title: "",
        collapsed: false,
        animation: true,
        speed: 'fast'
    };

    function hideFieldsetContent(obj, options) {
        var childs = $.data(obj, "fieldset");
        hideFieldset(childs, options, obj);
    }

    function showFieldsetContent(obj, options) {
        var childs = $.data(obj, "fieldset");
        showFieldset(childs, options, obj);
    }

    function hideFieldset(childs, opts, obj) {
        for (var i = 0; i < childs.length; i++) {
            var tag = childs[i];
            var nodeName = childs[i].nodeName;
            if (nodeName != "LEGEND") {
                if (opts.animation) {
                    $(tag).slideUp(opts.speed);
                } else {
                    $(tag).hide();
                }
            }
        }
        obj.removeClass("expanded");
        obj.addClass("collapsed");
    }

    function showFieldset(childs, opts, obj) {
        for (var i = 0; i < childs.length; i++) {
            var tag = childs[i];
            var nodeName = childs[i].nodeName;
            if (nodeName != "LEGEND") {
                if (opts.animation) {
                    $(tag).slideDown(opts.speed);
                } else {
                    $(tag).show();
                }
            }
        }
        obj.removeClass("collapsed");
        obj.addClass("expanded");
    }
})(jQuery);