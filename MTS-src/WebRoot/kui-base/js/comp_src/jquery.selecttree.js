/**
 * selecttree - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	draggable,droppable
 */
(function($) {
	function init(target) {
		var opts = $.data(target, "selecttree").options;
		var trees = $.data(target, "selecttree").tree;
		$(target).addClass("selecttree-f");
		$(target).combo(opts);
		var panel = $(target).combo("panel");
		if (!trees) {
			trees = $("<ul></ul>").appendTo(panel);
			$.data(target, "selecttree").tree = trees;
		}
		trees.tree($.extend({},
		opts, {
			checkbox: opts.multiple,
			onLoadSuccess: function() {
				var value = $(target).selecttree("getValues");
				if (opts.multiple) {
					var checkValues = trees.tree("getChecked");
					for (var i = 0; i < checkValues.length; i++) {
						var id = checkValues[i].id; (function() {
							for (var i = 0; i < opts.length; i++) {
								if (id == opts[i]) {
									return;
								}
							}
							opts.push(id);
						})();
					}
				}
				if(value!='')$(target).selecttree("setValues", value);
			 comboOptions=$.data(target,'combo').options;
			 comboOptions.text=$(target).combo("getText");
			 opts.text=$(target).combo("getText");
			},
			onClick: function(_a) {
				getChecked(target);
				$(target).combo("hidePanel");
				opts.onClick.call(this, _a);
			},
			onCheck: function(_b, _c) {
				getChecked(target);
				opts.onCheck.call(this, _b, _c);
			}
		}));
	};
	function getChecked(_e) {
		var opts = $.data(_e, "selecttree").options;
		var trees = $.data(_e, "selecttree").tree;
		var vv = [],
		ss = [];
		if (opts.multiple) {
			var checked = trees.tree("getChecked");
			for (var i = 0; i < checked.length; i++) {
				vv.push(checked[i].id);
				ss.push(checked[i].text);
			}
		} else {
			var selected = trees.tree("getSelected");
			if (selected) {
				vv.push(selected.id);
				ss.push(selected.text);
			}
		}
		
		$(_e).combo("setValues", vv).combo("setText", ss.join(opts.separator));
	};
	
	function setValues(target, param) {
		var opts = $.data(target, "selecttree").options;
		var trees = $.data(target, "selecttree").tree;
		trees.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
		var vv = [],
		ss = [];
		for (var i = 0; i < param.length; i++) {
			var v = param[i];
			var s = v;
			var node = trees.tree("find", v);
			if (node) {
				s = node.text;
				trees.tree("check", node.target);
				trees.tree("select", node.target);
			}
			vv.push(v);
			ss.push(s);
		}
		$(target).combo("setValues", vv).combo("setText", ss.join(opts.separator));
	};
	
	
	$.fn.selecttree = function(options, param) {
		if (typeof options == "string") {
			var methods = $.fn.selecttree.methods[options];
			if (methods) {
				return methods(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		options = options || {};
		return this.each(function() {
			var opts = $.data(this, "selecttree");
			if (opts) {
				$.extend(opts.options, options);
			} else {
				opts=$.data(this, "selecttree", {
					options: $.extend({},
					$.fn.selecttree.defaults, $.fn.selecttree.parseOptions(this), options)
				});
			}
			init(this);
			 
		});
	};
	$.fn.selecttree.methods = {
		options: function(jq) {
			return $.data(jq[0], "selecttree").options;
		},
		tree: function(jq) {
			return $.data(jq[0], "selecttree").tree;
		},
		loadData: function(jq, data) {
			return jq.each(function() {
				var opts = $.data(this, "selecttree").options;
				opts.data = data;
				var trees = $.data(this, "selecttree").tree;
				trees.tree("loadData", data);
			});
		},
		reload: function(jq, url) {
			return jq.each(function() {
				var opts = $.data(this, "selecttree").options;
				var trees = $.data(this, "selecttree").tree;
				if (url) {
					opts.url = url;
				}
				trees.tree({
					url: opts.url
				});
			});
		},
		setValues: function(jq, value) {
			return jq.each(function() {
				setValues(this, value);
			});
		},
		setValue: function(jq, _value) {
			return jq.each(function() {
				setValues(this, [_value]);
			});
		},
		clear: function(jq) {
			return jq.each(function() {
				var trees = $.data(this, "selecttree").tree;
				trees.find("div.tree-node-selected").removeClass("tree-node-selected");
				var cc = trees.tree("getChecked");
				for (var i = 0; i < cc.length; i++) {
					trees.tree("uncheck", cc[i].target);
				}
				$(this).combo("clear");
			});
		}
	};
	$.fn.selecttree.parseOptions = function(target) {
		return $.extend({},
		$.fn.combo.parseOptions(target), $.fn.tree.parseOptions(target));
	};
	$.fn.selecttree.defaults = $.extend({},
	$.fn.combo.defaults, $.fn.tree.defaults, {
		editable: false
	});
})(jQuery);