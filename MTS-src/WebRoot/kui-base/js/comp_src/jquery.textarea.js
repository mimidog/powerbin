/**
 * textarea - KINGDOM-UI 
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *   validatebox
 * 
 */
(function($) {
    $.fn.textarea = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.textarea.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.validatebox(options, param);
            }
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'textarea');
            if (state) {
                $.extend(state.options, options);
            } else {
                var t = $(this);
                state = $.data(this, "textarea", {
                    options: $.extend({},
                    $.fn.textarea.defaults, $.fn.textarea.parseOptions(this), options)
                });
                t.removeAttr('disabled');
            }
            if (state.options.cols) $(this).attr('cols', state.options.cols);
            if (state.options.rows) $(this).attr('rows', state.options.rows);
            setValue(this, state.options.value);
            setDisabled(this, state.options.disabled);
            setReadonly(this, state.options.readonly);
            setMaxLength(this, state.options.maxLength);
            validate(this);
            bindEvents(this);
        });
    };

    $.fn.textarea.methods = {
        options: function(jq) {
            return $.data(jq[0], "textarea").options;
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
                var opts = $.data(this, "textarea");
                $(this).val("");
            });
        },
        /*重置成初始值value*/
        reset: function(jq) {
            return jq.each(function() {
                var opts = $.data(this, "textarea").defaultValue;
                $(this).val(opts);
            });
        },
        validate: function(jq) {
            return jq.each(function() {
                validate(this);
            });
        },

        /*添加错误提示信息*/
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

    $.fn.textarea.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, ["maxLength"]), {
            disabled: (t.attr("disabled") ? true: undefined)
        });
    };

    $.fn.textarea.defaults = $.extend({},
    $.fn.validatebox.defaults, {
        disabled: false,
        maxLength: null,
        onChange: function(options, param) {}
    });
    /**
	 * do the validate if necessary.
	 */
    function validate(target) {
        if ($.fn.validatebox) {
            var opts = $.data(target, 'textarea').options;
            var textarea = $(target);

            $(target).validatebox(opts);
        }
    }

    function bindEvents(target) {
        var $inp = $(target);
		$inp.unbind('keydown');
        $inp.bind('blur focus change error',
        function(e) {
            var _type = {
                'blur': 'onBlur',
                'focus': 'onFocus',
                'change': 'onChange',
                'error': 'onError'
            };
            var opts = $.data(target, 'textarea').options;
            if (opts[_type[e.type]]) {
                opts[_type[e.type]]();
            }
        });

        $(target).bind('keyup',
        function(e) {
            var opts = $.data(target, 'textarea').options;
            var maxLength = opts.maxLength;
            if (maxLength) {
                this.value = this.value.slice(0, maxLength);
            }
        });
    }

    function setDisabled(target, disabled) {
        var opts = $.data(target, 'textarea').options;
        if (disabled) {
            opts.disabled = true;
            $(target).attr('disabled', true);
        } else {
            opts.disabled = false;
            $(target).removeAttr('disabled');
        }
    }

    function setReadonly(target, readonly) {
        var opts = $.data(target, 'textarea').options;
        if (readonly) {
            opts.readonly = true;
            $(target).attr('readonly', 'readonly');
        } else {
            opts.readonly = false;
            $(target).removeAttr('readonly');
        }
    }

    function setMaxLength(target, param) {
        if(param)$(target).attr('maxlength', param);
    }

    function setValue(target, param) {		
        var opts = $.data(target, 'textarea').options;
        if (param != null) {			
            $(target).val(param);
        }
    }
})(jQuery);