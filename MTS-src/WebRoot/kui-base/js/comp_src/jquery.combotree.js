/**
 * combotree - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 combo,tree
 * 
 */
(function($) {

    $.fn.combotree = function(options, param) {
        if (typeof options == "string") {
            var methods = $.fn.combotree.methods[options];
            if (methods) {
                return methods(this, param);
            } else {
                return this.combo(options, param);
            }
        }
        options = options || {};

        return this.each(function() {
            var state = $.data(this, "combotree");
            if (state) {
                state = $.extend(state.options, options);
            } else {
                state = $.data(this, "combotree", {
                    options: $.extend({},
                    $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), options)
                });
            }
            init(this);
           /* var width = 125;
            if (options && options.width) width = options.width;
            setSize(this, width);*/
			
            bindEvent(this);
        });
    };
    
    $.fn.combotree.methods = {
        options: function(jq) {
            return $.data(jq[0], "combotree").options;
        },
        tree: function(jq) {
            return $.data(jq[0], "combotree").tree;
        },
        loadData: function(jq, data) {
            return jq.each(function() {
                var opts = $.data(this, "combotree").options;
                opts.data = data;
                var trees = $.data(this, "combotree").tree;
                trees.tree("loadData", data);
            });
        },
        reload: function(jq, url) {
            return jq.each(function() {
                var opts = $.data(this, "combotree").options;
                var trees = $.data(this, "combotree").tree;
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
        setValue: function(jq, _23) {
            return jq.each(function() {
                setValues(this, [_23]);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                var trees = $.data(this, "combotree").tree;
                trees.find("div.tree-node-selected").removeClass("tree-node-selected");
                trees.tree("uncheck",trees.find("div.tree-node"));
                getChecked(this);
            });
        }
    };
    $.fn.combotree.parseOptions = function(target) {
        return $.extend({},
        $.fn.combo.parseOptions(target), $.fn.tree.parseOptions(target));
    };
    
    $.fn.combotree.defaults = $.extend({},
    $.fn.combo.defaults, $.fn.tree.defaults, {
        editable: true,
		keyDisplay:false,
        keyHandler:{
            up:function(){},
            down:function(){},
            enter:function(){},
            query:function(q){
                doQuery(this,q)
            }
        },
        onHidePanel:function(){// 当下拉面板隐藏时触动
            var opts = $.data(this, "combotree").options;
            getChecked(this);
        }
    });

    function init(target) {
        var opts = $.data(target, "combotree").options;
        var trees = $.data(target, "combotree").tree;
        $(target).addClass("combotree-f");
        $(target).combo($.extend({}, opts, {
        	onClear: function() {
	        	$(target).combotree("clear");
	        	opts.onClear.call(target);
        	}, 
        	onShowPanel: function() {
        		if(!opts.multiple) {
        			var v = $(target).combotree("getValue"),
        				panel = $(target).data("combo").panel,
        				node = trees.find("div.tree-node[node-id='" + v + "']");
        			if(node.length) {
        				trees.css("position", "relative").tree("expandTo", node);
            			panel.scrollTop(node.position().top);
        			}
        		}
        	}
        }));
        var panel = $(target).combo("panel");
        /*if(panel.find('div[func=del]').length == 0){
		      var cancel = $('<div func="del" class="datebox-button"><a style="color: red;cursor: pointer;font-weight:bolder;line-height: 20px;">清空</a></div>');
          panel.append(cancel);
          cancel.unbind('click').bind('click',function(){
            $(target).combotree("clear");
            $(target).combo("hidePanel");
            var $opts = $(target).combo("options");
            $opts.onClear.call();
            //$(target).combo('setValues', '').combo('setText', '');
          });
        }*/
        if (!trees) {
            trees = $("<ul></ul>").appendTo(panel);
            $.data(target, "combotree").tree = trees;
        }
        trees.tree($.extend({},
        opts, {
            checkbox: opts.multiple,
            onLoadSuccess: function(node, data) {
                var vals = $(target).combotree("getValues");
                if (opts.multiple) {
                    var _9 = trees.tree("getChecked");
                    for (var i = 0; i < _9.length; i++) {
                        var id = _9[i].id; (function() {
                            for (var i = 0; i < vals.length; i++) {
                                if (id == vals[i]) {
                                    return;
                                }
                            }
                            vals.push(id);
                        })();
                    }
                }
                $(target).combotree("setValues", vals);
                opts.onLoadSuccess.call(this, node, data);
                comboOptions = $.data(target, 'combo').options;
                comboOptions.text = $(target).combo("getText");
                opts['text']= $(target).combo("getText");
            },
            onClick: function(node) {
                getChecked(target);
                $(target).combo("hidePanel");
                opts.onClick.call(this, node);
            },
            onCheck: function(_b, _c) {
                getChecked(target);
                opts.onCheck.call(this, _b, _c);
            }
        }));
    }
    /**
     * @author 郭军
     * method：doQuery
     * 根据输入值搜索对应的节点
     */
    function doQuery(target,q){
        var opts = $.data(target,"combotree").options;
        var trees = $.data(target,"combotree").tree;
        var v = $(target).combo("getText");
        var panel = $(target).combo('panel')
        var checked = trees.tree("getChecked");
        for (var i = 0; i < checked.length; i++) {
            trees.tree("uncheck", checked[i].target);
        }
        if(opts.editable){
            if(v){
                var vv = [];
                if(opts.multiple){
                    vv = v.split(",");
                } else{
                   if(v.indexOf(',')>0)  v = v.substring(0,v.indexOf(','));
                   vv[0] = v;
                }
                var h;
                for(var i=0;i<vv.length;i++){
                    var node = trees.tree("find",vv[i]);
                    if(node&&!node.checked){
                        trees.tree("check",node.target);
                        trees.tree("select",node.target);
                        var item = panel.find('div.tree-node[node-id="' + vv[i] + '"]');
                        if(item.length){
                            h = panel.scrollTop() + item.position().top+ item.outerHeight() - panel.height()/2;
                            panel.scrollTop(h);
                        }
                    }
                }
            }else $(target).combotree("clear");
            $(target).combo("setText", v);
        }
    }
    
    function setCascadeCheck(d) {
            var parent = getParent(target, d[0]);
            if (parent) {
                var ck = $(parent.target).find(".tree-checkbox");
                ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                if (isAllSelected(d)) {
                    ck.addClass("tree-checkbox1");
                } else {
                    if (isCheckbox0(d)) {
                        ck.addClass("tree-checkbox0");
                    } else {
                      if(opts.cascadeCheckValue && opts.cascadeCheck === true)
                        ck.addClass("tree-checkbox1");
                      else
                        ck.addClass("tree-checkbox2");
                    }
                }
                setCascadeCheck($(parent.target));
            }
            function isAllSelected(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function() {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
                        b = false;
                    }
                });
                return b;
            };
            //节点未选中
            function isCheckbox0(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function() {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
                        b = false;
                    }
                });
                return b;
            };
    }
    
    /**
     * @author 郭军
     * method：bindEvent
     * 绑定事件 ：输入框失去焦点时获取选中的节点值
     */
    function bindEvent(target){
        var opts = $.data(target, "combotree").options;
        var $input =  $(target).next().children("input");
        if (!opts.disabled) {
            $input.bind("blur.combo", function(){
                getChecked(target) ;
             });
        }
        
        var panel = $.data(target, "combo").panel;
    	var $select = panel.parent().find(".combo-selectAll") ;
    	$select.find("span:eq(0)").unbind("click").bind("click",function(){
    		var t = $(target).combotree('tree');
    		t.tree("check",t.find("div.tree-node"));
    		getChecked(target);
    	});
    	$select.find("span:eq(1)").unbind("click").bind("click",function(){
    		var t = $(target).combotree('tree');
    		var checkboxs = t.find("div.tree-node").find(".tree-checkbox");
    		checkboxs.each(function(){
    			if($(this).hasClass("tree-checkbox0")){
    				$(this).removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass("tree-checkbox1");
    			}else if($(this).hasClass("tree-checkbox1")){
    				$(this).removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass("tree-checkbox0");
    			}
    		});
    		getChecked(target);
    	});
    }
    
    function getChecked(_e) {
        var opts = $.data(_e, "combotree").options;
        var trees = $.data(_e, "combotree").tree;
        if(opts.value == "@") {
        	return;
        }
        var vv = [],
			ss = [];
        if (String(opts.multiple) == "true") {
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
		var text = ss.join(opts.separator);
		if(opts.keyDisplay)
			text = vv.join(opts.separator);
        $(_e).combo("setValues", vv).combo("setText", text);
    }

    function setSize(target, width) {
        $(target).combo('resize', width);
    }

    function setValues(target, param) {
        var opts = $.data(target, "combotree").options;
        var trees = $.data(target, "combotree").tree;
        trees.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var vv = [],
        ss = [];
        if(param.length == 1 && param[0] == "@") {
        	ss.push(param[0]);
        } else {
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
        }
        $(target).combo("setValues", vv);
		//$alert(ss[0]);
		if(ss.length>1||ss[0])$(target).combo("setText", ss.join(opts.separator));
    }

})(jQuery);