/**
 * textinput - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 * 	 validatebox
 * 
 */
(function($) {
    $.fn.textinput = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.textinput.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.validatebox(options, param);
            }
        }

        options = options || {};
        return this.each(function() {

            var state = $.data(this, 'textinput');
            if (state) {
                $.extend(state.options, options);
            } else {
                var t = $(this);
                state = $.data(this, "textinput", {
                    options: $.extend({},
                    $.fn.textinput.defaults, $.fn.textinput.parseOptions(this), options)
                });
                t.removeAttr('disabled');
            }
            setValue(this, state.options.value);
            setDisabled(this, state.options.disabled);
            setReadonly(this, state.options.readonly);
            setMaxLength(this, state.options.maxLength);
            setHide(this, state.options.hidden);

            validate(this);
            bindEvents(this);
        });
    };

    $.fn.textinput.methods = {
        options: function(jq) {
            return $.data(jq[0], "textinput").options;
        },
        destroy: function(jq) {
            return jq.each(function() {
                $(this).validatebox("destroy");
                $(this).remove();
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                setDisabled(this, true);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                setDisabled(this, false);
            });
        },
        setValue: function(jq, strValue) {
            return jq.each(function() {
                setValue(this, strValue);
            });
        },

        clear: function(jq) {
            return jq.each(function() {
                var opts = $.data(this, "textinput");
                $(this).val("");
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var defaultValue = $.data(this, "textinput").options.defaultValue;
                $(this).val(defaultValue);
            });
        },
        hide: function(jq) {
            return jq.each(function() {
                setHide(this, true);
            });
        },
        show: function(jq) {
            return jq.each(function() {
                setHide(this, false);
            });
        },
        validate: function(jq) {
            return jq.each(function() {
                validate(this);
            });
        },
        addError: function(jq, errorStr) {
            return jq.each(function() {
                $.data(this, "validatebox").options.invalidMessage = errorStr;
            });
        },
        removeError: function(jq) {
            return jq.each(function() {
                $.data(this, "validatebox").options.invalidMessage = null;
            });
        }

    };

    $.fn.textinput.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, ["maxLength"]), {
            disabled: (t.attr("disabled") ? true: undefined),
            value: (t.attr("value") ? t.attr("value") : undefined)
        });
    };

    $.fn.textinput.defaults = $.extend({},
    $.fn.validatebox.defaults, {
        value: null,
        name: null,
        hidden: false,
        readonly: false,
        disabled: false,
        maxLength: null,
        validate: {},
        onChange: function(options, param) {}
    });
    /**
	 * do the validate if necessary.
	 */
    function validate(target) {
        if ($.fn.validatebox) {
            var opts = $.data(target, 'textinput').options;
            /*var textinput = $(target);
            if (opts.required) {
                var text = textinput.parent().prev().text();
                textinput.parent().prev().html("<label class=\"required-star\"> <span>" + text + "</span> </label>");
            }
			*/
            $(target).validatebox(opts);
        }
    }
    var liveEvent;
    /*绑定blur focus change error事件*/
    function bindEvents(target) {

    	//以上代码会导致重复设置事件，这里给它换一种实现方式，只有第一次加载时会设置事件。
	var opts = $.data(target, 'textinput').options;
	$(target).unbind('.textinput').bind('blur.textinput focus.textinput change.textinput error.textinput keyup.textinput', function(e) {
		
		var _type = {
			'blur' : 'onBlur',
			'focus' : 'onFocus',
			'change' : 'onChange',
			'error' : 'onError',
			'keyup':'onKeyup'
		};
		if (opts[_type[e.type]]) {
			opts[_type[e.type]].call(target, e);
		}
		if(e.type == "keyup" && e.keyCode == 13){
			opts.onChange.call(target, e);
		}
		$(target).attr("title",$(target).val());
      });
		
    }
    
    
    function setDisabled(target, disabled) {
        var opts = $.data(target, 'textinput').options;
        if (String(disabled) == "true" || disabled == "disabled") {
            opts.disabled = true;
            $(target).attr('disabled', true);
			$(target).addClass('form-input-disabled');
        } else {
            opts.disabled = false;
            $(target).removeAttr('disabled');
			$(target).removeClass('form-input-disabled');
        }
    }
    function setHide(target, hidden) {
        var opts = $.data(target, 'textinput').options;
        if (hidden) {
            opts.hidden = true;
            $(target).hide();
        } else {
            opts.hidden = false;
            $(target).show();
        }
    }
    function setReadonly(target, readonly) {
        var opts = $.data(target, 'textinput').options;
        if (readonly) {
            opts.readonly = true;
            $(target).attr('readonly', 'readonly');
        } else {
            opts.readonly = false;
            $(target).removeAttr('readonly');
        }
    }

    function setMaxLength(target, param) {
        var opts = $.data(target, 'textinput').options;
        $(target).attr('maxlength', param);
    }

    function setValue(target, param) {
        var opts = $.data(target, 'textinput').options;
        if (param != null) {
            $(target).val(param);
        }
    }
})(jQuery);