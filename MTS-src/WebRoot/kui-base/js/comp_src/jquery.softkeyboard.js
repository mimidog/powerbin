/**
 * combobox - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies: softkeyboard
 * 
 */
(function($) {
	$.fn.softkeyboard = function(options, param) {
		if (typeof options == 'string') {
			var method = $.fn.softkeyboard.methods[options];
			if (method) {
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, 'softkeyboard');
			if (state) {
				$.extend(state.options, options);
				create(this);
			} else {
				state = $.data(this, 'softkeyboard', {
					options : $.extend({}, $.fn.softkeyboard.defaults, $.fn.softkeyboard.parseOptions(this), options)
				});
				create(this);
			}
		});
	};

	$.fn.softkeyboard.methods = {
		getValue : function(jq) {
			var $combo = $.data(jq[0], 'combo').combo;
			var $input = $combo.find('input.combo-text');
			return $input.val();
		},
		setValue : function(jq, value) {
			return jq.each(function() {
				setValue(this, value);
			});
		},
		clear : function(jq) {
			return jq.each(function() {
				setValue(this, '');
			});
		}
	};

	$.fn.softkeyboard.parseOptions = function(target) {
		var t = $(target);
		return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, [ 'valueField' ]));
	};

	$.fn.softkeyboard.defaults = $.extend({
		shifted : true,
		mark : '*',
		maxLength : 10,
		// encrypt : 如果softkeyboard在组件form中，是否不能够被form读取。true表示不能够，false表示能够。
		encrypt : true
	}, $.fn.combo.defaults, {
		panelWidth : 'auto',
		editable : true,
		multiple : true
	});

	function create(target) {
		var opts = $.data(target, 'softkeyboard').options;
		$(target).addClass('softkeyboard-f');
		target.inputType = 'password'; // 控制在combo中生成的input的类型
		$(target).combo(opts);
		var $combo = $.data(target, 'combo').combo.addClass('softkeyboard');
		var $input = $combo.find('input.combo-text');
		var $panel = $.data(target, 'combo').panel;
		$panel.addClass('softkeyboard-panel').html(getKeyboardHtml(opts.shifted));
		opts.panelClick = function(e) {
			var key = e.target ? $(e.target).val() : '';
			var value = e.target ? $input.val() : e;
			if (key == '<--') {
				value = value.length ? value.substring(0, value.length - 1) : value;
			} else if (key == 'shift') {
				$panel.html(getKeyboardHtml((opts.shifted = !opts.shifted)));
			} else if (key.length == 1 && value.length < opts.maxLength) {
				value += key;
			} else if (key == '确定') {
				$panel.panel('close');
			} else if (key == '清空') {
				value = '';
			}
			opts.value = value;
			$input.val(value);
			value = opts.encrypt ? opts.mark : value;
			$(target).val(value).combo('setValue', value);
			return false;
		};
		$panel.unbind('click.softkeyboard').bind('click.softkeyboard', opts.panelClick);
		$input.unbind('blur.softkeyboard').bind('blur.softkeyboard', function() {
			opts.panelClick($(this).val());
		});
		if(typeof opts.value != 'undefined') {
			opts.panelClick(opts.value);
		}
	}

	function setValue(target, value) {
		var opts = $.data(target, 'softkeyboard').options;
		opts.panelClick(value);
	}

	function getKeyboardHtml(shifted) {
		var htm = [ '<ul>' ], keys = shifted ? [ "`1234567890-=", "backspace", "<br/>", " ", "qwertyuiop[]//", "<br/>", " ", " ", "asdfghjkl;", "'", "<br/>", "shift", "zxcvbnm,./", "shift", "<br/>" ] : [ "~!@#$%^&*()_+", "backspace", "<br/>", " ", "QWERTYUIOP{}|", "<br/>", " ", " ", "ASDFGHJKL:", '"', "<br/>", "shift", "ZXCVBNM<>?", "shift", "<br/>" ];
		var esp = {
			"'" : '<li><input type="button" value="\'" /></li>',
			'"' : "<li><input type='button' value='\"' /></li>",
			"<br/>" : "<div style=\"clear:both;\"></div>",
			" " : "<li>&nbsp;</li>",
			"backspace" : '<li><input type="button" value="<--" /></li>',
			"shift" : '<li><input type="button" style="width:50px;" value="shift" /></li>'
		};
		for ( var j = 0; j < keys.length; j++) {
			if (esp[keys[j]]) {
				htm.push(esp[keys[j]]);
			} else {
				var x = new Date().getMilliseconds() % keys[j].length;
				keys[j] = keys[j].substr(x, keys[j].length) + keys[j].substr(0, x);
				for ( var i = 0; i < keys[j].length; i++) {
					htm.push("<li><input type='button' value='" + keys[j].charAt(i) + "' /></li>");
				}
			}
		}
		htm.push('</ul><div style="width:360px;"><div style="width:140px;margin:auto;"><input type="button" value="确定" style="margin-right:20px;" mce_style="margin-right:20px;" /><input type="button" value="清空" /></div></div>');
		return htm.join("");
	}

})(jQuery);
