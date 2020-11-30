/**
 * linkbutton - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */
(function($) {
    $.fn.linkbutton = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.linkbutton.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'linkbutton');
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, 'linkbutton', {
                    options: $.extend({},
                    $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
                });
                $(this).removeAttr('disabled');
                createButton(this);
            }
        });
    };

    $.fn.linkbutton.methods = {
        options: function(jq) {
            return $.data(jq[0], 'linkbutton').options;
        },
        enable: function(jq) {
            return jq.each(function() {
                setDisabled(this, false);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                setDisabled(this, true);
            });
        }
    };

    $.fn.linkbutton.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.parser.parseOptions(target, ['id', 'iconCls', 'iconAlign', {
            plain: 'boolean'
        }]), {
            disabled: (t.attr('disabled') ? true: undefined),
            text: $.trim(t.html()),
            iconCls: (t.attr('icon') || t.attr('iconCls'))
        });
    };

    $.fn.linkbutton.defaults = {
        id: null,
        disabled: false,
        plain: false,
        text: '',
        iconCls: null,
        iconAlign: 'left',
        onClick:function(target){}
    };

    function createButton(target) {
        var opts = $.data(target, 'linkbutton').options;

        $(target).empty();
        $(target).addClass('l-btn');
        if (opts.id) {
            $(target).attr('id', opts.id);
        } else {
            $(target).attr('id', '');
        }
        if (opts.plain) {
            $(target).addClass('l-btn-plain');
        } else {
            $(target).removeClass('l-btn-plain');
        }
		var sdom = ['<span class="l-btn-left"><span class="l-btn-text">'];
		if (opts.iconCls) {
			var iconStyle = ""
			if("right" == opts.iconAlign){
				iconStyle = 'style="float:right;"'
			}
			sdom.push('<span class="ui-tool-icons '+opts.iconCls+'" '+iconStyle+'></span>');
		}
		if (opts.text) {
			sdom.push(opts.text);
		}
		sdom.push('</span></span>');
		$(target).append(sdom.join(""));
		
        $(target).wrap("<div class='l-btn-wrap'>");

        var disableMask = $("<div class='l-btn-disable-mask'></div>").insertAfter(target);
        disableMask.attr("linkbutton-name", $(target).attr("name") || $(target).attr("id"));
        opts.disableMask = disableMask;
        opts.btnWrap = $(target).parent(".l-btn-wrap");
        opts.btnWrap.append(disableMask);

        $(target).unbind('.linkbutton').bind('focus.linkbutton',
			function() {		
				if (!opts.disabled) {
					$(this).find('span.l-btn-text').addClass('l-btn-focus');
				}
			}
		).bind('blur.linkbutton',
			function() {
				$(this).find('span.l-btn-text').removeClass('l-btn-focus');
			}
		).bind("click.linkbutton",
            function(){
                opts.onClick.call(this);
            }
        );
        setDisabled(target, opts.disabled);
        
        if(window && window.onbeforeunload) {
	        $(target).unbind(".linkbutton").bind("click.linkbutton", function(e) {
        		return false;
	        });
        }
    }
    
    function setDisabled(target, disabled) {
        var state = $.data(target, 'linkbutton');
        if (disabled) {
            state.options.disabled = true;
            var href = $(target).attr('href');
            if (href) {
                state.href = href;
                $(target).attr('href', 'javascript:void(0)');
            }
			if (target.onclick) {
                state.onclick = target.onclick;
                target.onclick = null;
            }
            $(target).addClass('l-btn-disabled');
            state.options.disableMask.show();
        } else {
            state.options.disabled = false;
            if (state.href) {
                $(target).attr('href', state.href);
            }
			if (state.onclick) {
                target.onclick = state.onclick;
            }
            
            $(target).removeClass('l-btn-disabled');
            state.options.disableMask.hide();
        }
    }
})(jQuery);