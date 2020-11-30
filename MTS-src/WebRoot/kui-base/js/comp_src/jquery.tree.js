/**
 * tree - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	draggable,droppable
 */

(function($) {
    $.fn.tree = function(options, param) {
        if (typeof options == "string") {
            return $.fn.tree.methods[options](this, param);
        }
        var options = options || {};
        return this.each(function() {
            var state = $.data(this, "tree");
            var opts,content;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                opts = $.extend({},
                $.fn.tree.defaults, $.fn.tree.parseOptions(this), options);
                
                $.data(this, "tree", {
                    options: opts,
                    tree: wrapTree(this)
                });
                var contents = getContents(this);
                if (contents.length && !opts.data) {
                    opts.data = contents;
					content = true;
                }
                
            }
            if (opts.lines) {
                $(this).addClass("tree-lines");
            }
            
            if (opts.data) {
				opts.base = opts.data;
				var data;
				if(content){
					data = opts.data;
				}else if(opts.data.pid)
					data = opts.data;
				else{
					opts = $.extend(opts,opts.conf);
					data = opts.makeTreeData && typeof opts.makeTreeData == "function" ? opts.makeTreeData.call(this,opts,opts.data) : makeTreeData(opts,opts.data);
				}
				loadData(this, this, data);
            } else {
                if (opts.dnd) {
                    dragFile(this);
                } else {
                    //draDisable(this);
                }
            }
          //if(!opts.required){
            request(this, this);
          //}

        });
    };

    $.fn.tree.methods = {
        options: function(jq) {
            return $.data(jq[0], "tree").options;
        },
        loadData: function(jq, data) {
            return jq.each(function() {
                loadData(this, this, data);
            });
        },
        getNode: function(jq, _e2) {
            return getNode(jq[0], _e2);
        },
        getData: function(jq, _e3) {
            return getData(jq[0], _e3);
        },
        reload: function(jq, _e4) {
            return jq.each(function() {
                if (_e4) {
                    var _e5 = $(_e4);
                    var hit = _e5.children("span.tree-hit");
                    hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    _e5.next().remove();
                    expand(this, _e4);
                } else {
                    $(this).empty();
                    request(this, this);
                }
            });
        },
        getRoot: function(jq) {
            return getRoot(jq[0]);
        },
        getRoots: function(jq) {
            return getRoots(jq[0]);
        },
        getParent: function(jq, _e6) {
            return getParent(jq[0], _e6);
        },
        getChildren: function(jq, _e7) {
            return getChildren(jq[0], _e7);
        },
        getChecked: function(jq) {
            return getChecked(jq[0]);
        },
        getCascadeCheckNode:function(jq){
        	return getCascadeCheckNode(jq[0]);
        },
		getSelectedBase:function(jq){
			return getSelectedBase(jq[0]);
		},
        getSelected: function(jq) {
            return getSelected(jq[0]);
        },
        isLeaf: function(jq, _e8) {
            return getHitNode(jq[0], _e8);
        },
        find: function(jq, id) {
            return find(jq[0], id);
        },
        select: function(jq, _e9) {
            return jq.each(function() {
                onSelect(this, _e9);
            });
        },
        check: function(jq, _ea) {
            return jq.each(function() {
                setCheckbox1(this, _ea, true);
            });
        },
        checkNoCascade:function(jq, _ea) {
          return jq.each(function() {
            setCheckboxNoCascadeCheck(this, _ea, true);
          });
        },
        uncheck: function(jq, _eb) {
            return jq.each(function() {
                setCheckbox1(this, _eb, false);
            });
        },
        collapse: function(jq, _ec) {
            return jq.each(function() {
                collapse(this, _ec);
            });
        },
        expand: function(jq, _ed) {
            return jq.each(function() {
                expand(this, _ed);
            });
        },
        collapseAll: function(jq, _ee) {
            return jq.each(function() {
                collapseAll(this, _ee);
            });
        },
        expandAll: function(jq, _ef) {
            return jq.each(function() {
                expandAll(this, _ef);
            });
        },
        expandTo: function(jq, _f0) {
            return jq.each(function() {
                expandTo(this, _f0);
            });
        },
        toggle: function(jq, _f1) {
            return jq.each(function() {
                toggle(this, _f1);
            });
        },
        append: function(jq, _f2) {
            return jq.each(function() {
                append(this, _f2);
            });
        },
        insert: function(jq, _f3) {
            return jq.each(function() {
                insert(this, _f3);
            });
        },
        remove: function(jq, _f4) {
            return jq.each(function() {
                remove(this, _f4);
            });
        },
        pop: function(jq, _f5) {
            var param = jq.tree("getData", _f5);
            jq.tree("remove", _f5);
            return param;
        },
        update: function(jq, _f7) {
            return jq.each(function() {
                update(this, _f7);
            });
        },
        enableDnd: function(jq) {
            return jq.each(function() {
                dragFile(this);
            });
        },
        disableDnd: function(jq) {
            return jq.each(function() {
                draDisable(this);
            });
        },
        beginEdit: function(jq, _f8) {
            return jq.each(function() {
                beginEdit(this, _f8);
            });
        },
        endEdit: function(jq, _f9) {
            return jq.each(function() {
                endEdit(this, _f9);
            });
        },
        cancelEdit: function(jq, _fa) {
            return jq.each(function() {
                cancelEdit(this, _fa);
            });
        },
		setCascade:function (jq,flag){
			 return jq.each(function() {
               var opts = $.data(this, "tree").options;
			   opts.cascadeCheck = flag;
            });
        }
    };

    $.fn.tree.parseOptions = function(_fb) {
        var t = $(_fb);
        return $.extend({},
        $.parser.parseOptions(_fb, ["url", "method", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        },
        {
            animate: "boolean",
            lines: "boolean",
            dnd: "boolean"
        }]));
    };

    $.fn.tree.defaults = {
        url: null,
        method: "post",
        animate: false,
        animateSpeed: 100,
        checkbox: false,
        cascadeCheck: true,
        onlyLeafCheck: false,
        lines: false,
        dnd: false,
        data: null,
        required:false,
		base: null,
        req: [],
        conf: {},
        /**
		//特殊数据构造树,形如：
		conf:{
			nodeId:"menu_id",//树节点id字段名
			nodeName:"menu_name",//树节点显示字段名
			treeType:"1",//树类型，1：父级 2：层级
			parNode:"par_menu", //树父节点字段名：树类型为1
			lvlNode:"menu_lvl",//树层级字段：树类型为2时用此字段可以分析出其父节点
			lvlLength:"2",//树层级的长度，例如menu_lvl为0102，lvlLength为2 那么其父节点的menu_lvl为截取0102的前两个字段为menu_lvl为01对应的nodeId
		},
		*/
        treeExpand:0,
        /**
         * 0 不展开  
		   1 展开第一层 
		   2 展开第二层
		   ...
		   all 展开所有
         */
        loader: function(param, onLoadSuccess, onLoadError) {
            var opts = $(this).tree("options");
            if (!opts.req && !opts.url) {
                return false;
            }
            var resFunc = function(rtnData) {
                if (rtnData && rtnData[0] ) {
                    var data = rtnData[0];
                    //var config = rtnData[0].config;
                    if (data) {
						opts.base = data;
                        var conf = $.extend({},/*config.conf,*/ typeof opts.conf == "string" ? eval("("+opts.conf+")") : opts.conf);
                        if (!$.isEmptyObject(conf)) {
                            data = opts.makeTreeData && typeof opts.makeTreeData == "function" ? opts.makeTreeData.call(this,conf,data) : makeTreeData(conf,data);;
                        }
                        onLoadSuccess(data);
                    }
                }
            };
            var p = {
                url: opts.url,
                type: opts.method,
                dataType: 'xml',
                async: true,
                responseType: 'xml',
                func: resFunc,
                error: function() {
                    onLoadError.apply(this, arguments);
                },
                req: opts.req || []
            };
            if (opts.req && opts.req.length > 0 || opts.url) {
                ajaxRequest(p);
            }
        },
        loadFilter: function(data, _100) {
            return data;
        },
        onBeforeLoad: function(node, _101) {},
        onLoadSuccess: function(node, data) {},
        onLoadError: function() {},
        onClick: function(node) {},
        onDblClick: function(node) {},
        onBeforeExpand: function(node) {},
        onExpand: function(node) {},
        onBeforeCollapse: function(node) {},
        onCollapse: function(node) {},
        onCheck: function(node, _102) {},
        onBeforeSelect: function(node) {},
        onSelect: function(node) {},
        onContextMenu: function(e, node) {},
        onDrop: function(_103, _104, _105) {},
        onBeforeEdit: function(node) {},
        onAfterEdit: function(node) {},
        onCancelEdit: function(node) {},
        onBeforeDrag: function(e) {},
        onStartDrag: function(e) {},
        onDrag: function(e) {},
        onStopDrag: function(e) {},
        onRevert: function(e) {}
    };

    function wrapTree(target) {
        var tree = $(target);
        tree.addClass("tree");
        return tree;
    };
    //得到目录
    function getContents(target) {
        var param = [];
        getContent(param, $(target));
        function getContent(aa, ul) {
            //一级目录
            ul.children("li").each(function() {
                var li = $(this);
                var options = $.extend({},
                $.parser.parseOptions(this, ["id", "iconCls", "state"]), {
                    checked: (li.attr("checked") ? true: undefined)
                });
                options.text = li.children("span").html();
                if (!options.text) {
                    options.text = li.html();
                }
                //二级目录
                var subul = li.children("ul");
                if (subul.length) {
                    options.children = [];
                    //递归子目录
                    getContent(options.children, subul);
                }
                aa.push(options);
            });
        };
        return param;
    };
    
    function bindEvents(target){
    	bindTreeEvent(target,"dblclick");
    	bindTreeEvent(target,"click");
    	bindTreeEvent(target,"mouseover");
    	bindTreeEvent(target,"mouseout");
    	bindTreeEvent(target,"contextmenu");
    	bindTreeEvent(target,"mousedown");
    }
    
    function bindTreeEvent(target,event){
    	_addEvent(target,event,function(e){
    		 _treeEventHandler(e,event,target);
    	});
    }
    
    function _addEvent(element,event,callback){
    	if(!callback || !element || !event) return false;
    	var jqEvent = event + ".trees";
    	$(element).unbind(jqEvent).bind(jqEvent,callback);
    }
    
    function _treeEventHandler(e,event,target){
    	var opts = $.data(target, "tree").options;
    	var $tt = $(e.target);
    	switch(event){
    	case 'contextmenu':
    		opts.onContextMenu.call(target, e, getNode(target, this));
    		e.stopPropagation();
    		break;
    	case 'mouseover':
    		var $div = $tt.closest("div.tree-node");
    		$div.addClass("tree-node-hover");
    		if($tt.hasClass("tree-hit")){
    			if ($tt.hasClass("tree-expanded")) {
    				$tt.addClass("tree-expanded-hover");
                } else {
                	$tt.addClass("tree-collapsed-hover");
                }
    		}
    		return ;
    		break;
    	case 'mouseout':
    		var $div = $tt.closest("div.tree-node");
    		$div.removeClass("tree-node-hover");
    		if($tt.hasClass("tree-hit")){
    			if ($tt.hasClass("tree-expanded")) {
    				$tt.removeClass("tree-expanded-hover");
                } else {
                	$tt.removeClass("tree-collapsed-hover");
                }
    		}
    		return ;
    		break;
    	case 'mousedown':
    		if($tt.hasClass("tree-hit") || $tt.hasClass("tree-checkbox") )
    			return ;
    		break;
    	case 'click':
    		if($tt.hasClass("tree-hit")){
    			var $node = $tt.parent();
                toggle(target, $node[0]);
                return ;
    		}else if($tt.hasClass("tree-checkbox")){
    			var $node = $tt.parent();
                setCheckbox1(target, $node[0], !$tt.hasClass("tree-checkbox1"));
                return ;
    		} else {
    			var $node = $tt.closest("div.tree-node");
    			onSelect(target, $node[0]);
                opts.onClick.call(target, getSelected(target));
                e.stopPropagation();
    		}
    		break;
    	case 'dblclick':
    		var $node = $tt.closest("div.tree-node");
    		onSelect(target, $node);
            opts.onDblClick.call(target, getSelected(target));
            e.stopPropagation();
    		break;
    	default:
    		break;
    	}
    }
    
    /**
	将具有树层次结构的数据转换成树结构数据
	*/
    function makeTreeData(conf, data) {
        var treeType = conf.treeType;		
        var lvlLength = conf.lvlLength;
        var id, pid, text, iconCls;
       
        if (treeType == "1") {
            id = conf.nodeId;
            pid = conf.parNode;
            text = conf.nodeName;
        } else if (treeType == "2"||treeType == "3") {
            id = conf.nodeId;
            pid = conf.lvlNode;
            text = conf.nodeName;
        }
		iconCls = conf.iconCls||"";		
        var nodeData = [];
		if (treeType == "1") {
			for (var i = 0; i < data.length; i++) {
				var node = {};
				node.id = data[i][id] || "";
				node.iconCls = node.iconCls||iconCls;
				var texts = text.split(",");
				var dispField = "";
                for (var j = 0; j < texts.length; j++) {
                	dispField += (typeof(data[i][texts[j]]) =="undefined"?"":data[i][texts[j]]) + " ";
                }
				node.text = dispField || "";
				node.pid = data[i][pid] == "-1" ? "0": (data[i][pid] || "");  
				nodeData.push(node);
			}
		} else if (treeType == "2") {
			data = kui.quickSort(data,pid);
			for (var i = 0; i < data.length; i++) {
				var node = {};
				node.id = data[i][id] || "";
				node.iconCls = node.iconCls||iconCls;
				var texts = text.split(",");
				var dispField = "";
                for (var j = 0; j < texts.length; j++) {
                	dispField += (typeof(data[i][texts[j]]) =="undefined"?"":data[i][texts[j]]) + " ";
                }
				node.text = dispField || "";
				var lvlNode = data[i][pid] || "";
				var parentLvlNode = (lvlNode).substring(0, lvlNode.length - lvlLength);
				for (var j = 0; j < data.length; j++) {
					var nodeId = data[j][id] || "";
					var lvlNodeId = data[j][pid] || "";					
					if (lvlNodeId == parentLvlNode) {
						node.pid = nodeId;
						break;
					}
				} 
				nodeData.push(node);
			}
		}  else if (treeType == "3") {
			data = kui.quickSort(data,pid);
			for (var i = 0; i < data.length; i++) {
				var node = {};
				node.id = data[i][id] || "";
				node.iconCls = node.iconCls||iconCls;
				var texts = text.split(",");
				var dispField = "";
                for (var j = 0; j < texts.length; j++) {
                	dispField += (typeof(data[i][texts[j]]) =="undefined"?"":data[i][texts[j]]) + " ";
                }
				node.text = dispField || "";
				var lvlNode = data[i][pid].replace("@","") || "";
				var parentLvlNode1 = (lvlNode).substring(0, lvlNode.length - lvlLength);
				for (var j = i; j >=0 ; j--) {
					var nodeId = data[j][id] || "";
					var lvlNodeId = data[j][pid].replace("@","") || "";					
					if (lvlNodeId == parentLvlNode1) {
						node.pid = nodeId;
						break;
					}
				}
				if(!node.pid && lvlNode.length>2){
					var parentLvlNode2 = (lvlNode).substring(0, lvlNode.length - 2);
					for (var j = i; j >=0 ; j--) {
						var nodeId = data[j][id] || "";
						var lvlNodeId = data[j][pid].replace("@","") || "";					
						if (lvlNodeId == parentLvlNode2) {
							node.pid = nodeId;
							break;
						}
					}
				}
				nodeData.push(node);
			}
		} 
        return nodeData;
    }

    //拖动失效
    function draDisable(target) {
        var node = $(target).find("div.tree-node");
        node.draggable("disable");
        node.css("cursor", "pointer");
    };

    //拖动文件
    function dragFile(target) {
        var opts = $.data(target, "tree").options;
        var tree = $.data(target, "tree").tree;
        
        if(opts.dragLeafOnly) {
        	tree.find("div.tree-node").filter(function() {
        		return $(this).next("ul").length == 0
        	}).draggable({
                disabled: false,
                revert: true,
                cursor: opts.cursor || "pointer",
                proxy: opts.proxy || function(target) {
                	 var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
                    p.html($(target).find(".tree-title").html());
                    p.hide();
                    return p;
                },
                deltaX: 15,
                deltaY: 15,
                onBeforeDrag: function(e) {
                    if (e.which != 1) {
                        return false;
                    }
                    opts.onBeforeDrag.call(target, e);
                },
                onStartDrag: function(e) {
                    $(this).draggable("proxy").css({
                        left: -10000,
                        top: -10000
                    });
                    opts.onStartDrag.call(target, e);
                },
                onDrag: function(e) {
                    var x1 = e.pageX,
                    y1 = e.pageY,
                    x2 = e.data.startX,
                    y2 = e.data.startY;
                    var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    if (d > 3) {
                        $(this).draggable("proxy").show();
                    }
                    this.pageY = e.pageY;
                    opts.onDrag.call(target, e);
                },
                onStopDrag: function(e) {
                    opts.onStopDrag.call(target, e);
                },
                onRevert:function(e) {
                	opts.onRevert.call(target, e);
                }
            });        	
        	return ;
        }
        
        tree.find("div.tree-node").draggable({
            disabled: false,
            revert: true,
            cursor: "pointer",
            proxy: function(target) {
                var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
                p.html($(target).find(".tree-title").html());
                p.hide();
                return p;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function(e) {
                if (e.which != 1) {
                    return false;
                }
                $(this).next("ul").find("div.tree-node").droppable({
                    accept: "no-accept"
                });
                var indents = $(this).find("span.tree-indent");
                if (indents.length) {
                    e.data.startLeft += indents.length * indents.width();
                }
            },
            onStartDrag: function() {
                $(this).draggable("proxy").css({
                    left: -10000,
                    top: -10000
                });
            },
            onDrag: function(e) {
                var x1 = e.pageX,
                y1 = e.pageY,
                x2 = e.data.startX,
                y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 3) {
                    $(this).draggable("proxy").show();
                }
                this.pageY = e.pageY;
            },
            onStopDrag: function() {
                $(this).next("ul").find("div.tree-node").droppable({
                    accept: "div.tree-node"
                });
            }
        }).droppable({
            accept: "div.tree-node",
            onDragOver: function(e, _1b) {
                var y = _1b.pageY;
                var top = $(this).offset().top;
                var outheight = top + $(this).outerHeight();
                $(_1b).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                if (y > top + (outheight - top) / 2) {
                    if (outheight - y < 5) {
                        $(this).addClass("tree-node-bottom");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                } else {
                    if (y - top < 5) {
                        $(this).addClass("tree-node-top");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                }
            },
            onDragLeave: function(e, _1e) {
                $(_1e).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            },
            onDrop: function(e, _target) {
                var t = this;
                var handler, position;
                if ($(this).hasClass("tree-node-append")) {
                	handler = dragIn;
                } else {
                	handler = dragOut;
                	position = $(this).hasClass("tree-node-top") ? "top": "bottom";
                }
                setTimeout(function() {
                	handler(_target, t, position);
                },0);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            }
        });

        function dragIn(_target, div) {
            if (getNode(target, div).state == "closed") {
                expand(target, div,
                function() {
                    _eventHandler();
                });
            } else {
            	_eventHandler();
            }
            function _eventHandler() {
                var param = $(target).tree("pop", _target);
                $(target).tree("append", {
                    parent: div,
                    data: [param]
                });
                opts.onDrop.call(target, div, param, "append");
            };
        };

        function dragOut(_29, _2a, _2b) {
            var _2c = {};
            if (_2b == "top") {
                _2c.before = _2a;
            } else {
                _2c.after = _2a;
            }
            var param = $(target).tree("pop", _29);
            _2c.data = param;
            $(target).tree("insert", _2c);
            opts.onDrop.call(target, _2a, param, _2b);
        };
    };
    //设置选中状态
    function setCheckbox1(target, div, state) {
        var opts = $.data(target, "tree").options;
        if (!opts.checkbox) {
            return;
        }
        var d = $(div);
        var ck = d.find(".tree-checkbox");
        ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        if (state) {
            ck.addClass("tree-checkbox1");
        } else {
            ck.addClass("tree-checkbox0");
        }

        if ("true" == String(opts.cascadeCheck)) {
            setCascadeCheck(d);
            setChildCheckbox(d);
        }

        var node = getNode(target, div);
        opts.onCheck.call(target, node, state);
        function setChildCheckbox(target) {
            var checknode = target.next().find(".tree-checkbox");
            checknode.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
            if (target.find(".tree-checkbox").hasClass("tree-checkbox1")) {
                checknode.addClass("tree-checkbox1");
            } else {
                checknode.addClass("tree-checkbox0");
            }
        };
        //设置级联选中
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
        };
    };
  function setCheckboxNoCascadeCheck(target, div, state) {
    var opts = $.data(target, "tree").options;
    if (!opts.checkbox) {
      return;
    }
    var d = $(div);
    var ck = d.find(".tree-checkbox");
    ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
    if (state) {
      ck.addClass("tree-checkbox1");
    } else {
      ck.addClass("tree-checkbox0");
    }

    //if (opts.cascadeCheck) {
     // setCascadeCheck(d);
     // setChildCheckbox(d);
//    }

    var node = getNode(target, div);
    opts.onCheck.call(target, node, state);
    function setChildCheckbox(target) {
      var checknode = target.next().find(".tree-checkbox");
      checknode.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
      if (target.find(".tree-checkbox").hasClass("tree-checkbox1")) {
        checknode.addClass("tree-checkbox1");
      } else {
        checknode.addClass("tree-checkbox0");
      }
    };
    //设置级联选中
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
    };
  };
    function setCheckbox(target, div) {
        var opts = $.data(target, "tree").options;
        var d = $(div);
        if (getHitNode(target, div)) {
            var ck = d.find(".tree-checkbox");
            if (ck.length) {
                if (ck.hasClass("tree-checkbox1")) {
                    setCheckbox1(target, div, true);
                } else {
                    setCheckbox1(target, div, false);
                }
            } else {
                if (opts.onlyLeafCheck) {
                    $("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(d.find(".tree-title"));
                    bindEvents(target);
                }
            }
        } else {
            var ck = d.find(".tree-checkbox");
            if (opts.onlyLeafCheck) {
                ck.remove();
            } else {
                if (ck.hasClass("tree-checkbox1")) {
                    setCheckbox1(target, div, true);
                } else {
                    if (ck.hasClass("tree-checkbox2")) {
                        var _44 = true;
                        var _45 = true;
                        var children = getChildren(target, div);
                        for (var i = 0; i < children.length; i++) {
                            if (children[i].checked) {
                                _45 = false;
                            } else {
                                _44 = false;
                            }
                        }
                        if (_44) {
                            setCheckbox1(target, div, true);
                        }
                        if (_45) {
                            setCheckbox1(target, div, false);
                        }
                    }
                }
            }
        }
    };

    //删除已经追加的树节点：nodeId,减少函数：childrensObject中递归次数
    function deleteContent(nodeId, contents) {
        var childrens = {};
        //没有nodeId的时候由于不能唯一确定node的id所以不能确定该节点是否唯一
        if (!nodeId) {
            return contents;
        };
        var array = [];
        for (var i = 0; i < contents.length; i++) {
            var node = contents[i];
            var id = node.id;
            if (nodeId != id) {
                array.push(node);
            }
        }
        return array;
    };

    //统计节点是否有子节点，如果返回数据中有：leaf:true这种的话（是否是叶子节点）就更好，不用在这里统计了
    function childrensObject(nodeId, contents) {
        var childrens = {};
        if (!contents) {
            return childrens;
        }
        var array = [];
        for (var i = 0; i < contents.length; i++) {
            var node = contents[i];
            var pid = node.pid;
            if (nodeId == pid) {
                array.push(node);
            }
        }
        childrens.children = array;
        return childrens;
    };

    //加载树
    function loadData(target, ul, data, isAppend) {
        var opts = $.data(target, "tree").options;
        data = opts.loadFilter.call(target, data, $(ul).prev("div.tree-node")[0]);
        if (!isAppend) {
            $(ul).empty();
            opts.data = data || {};
        }
        var params = [],
        	treeResult = [],
        	added = {};
        	
        renderNodes();
        bindEvents(target);
        if (opts.dnd) {
            dragFile(target);
        } else {
            //draDisable(target);
        }
        for (var i = 0; i < params.length; i++) {
        	var $div = $('div.tree-node[node-id=' + params[i] + ']', $(target));
            setCheckbox1(target, $div[0], true);
        }
        setTimeout(function() {
        	createTreeStyle(target, target);
        },0);
        var dragNode = null;
        if (target != ul) {
            var prev = $(ul).prev();
            dragNode = getNode(target, prev[0]);
        }
        opts.onLoadSuccess.call(target, dragNode, data);
        function renderNodes () {
        	var length = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length,
        		treeNodes = [""];
        	
	        parseNodes(treeNodes, data, length, target, data);
	       
	        joinNodes(treeNodes);
	        $(ul).append(treeResult.join(""));
	        //saveNodeData();
        }
        function parseNodes(ul, contents, _length, target, contentsAll) {
            for (var i = 0; i < contents.length; i++) { //几个父节点
                var node = contents[i];
                if(isAppend && node.target){
                	var nodeid = node.target.getAttribute("node-id");
                	node = $.extend(node, getNodeData(nodeid,opts));
                }
                var pid = node.pid;
                var childrens = {};
                var nodeId = node.id;
                if (nodeId) {
                    if (added[nodeId]) {
                        continue;
                    }
                    childrens = childrensObject(nodeId, contentsAll);
                    if (childrens.children && childrens.children.length > 0) {
                        node.children = childrens.children;
                    }
                }
                ul.push("<li>");
                
                if (node.state != "open" && node.state != "closed") {
                    node.state = "open";
                }
                ul.push("<div class=\"tree-node\" node-id=\""+nodeId+"\">");
                added[nodeId] = true;
                for (var j = 0; j < _length; j++) {
                	ul.push("<span class=\"tree-indent\"></span>");
                }
                
                if (node.children && node.children.length) { 
                	 
                     var display = undefined;
                     /*
                     if (node.state == "open") {
                    	 ul.push("<span class=\"tree-hit tree-expanded\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-folder tree-folder-open "+(node.iconCls ? node.iconCls : "")+"\"></span>");
                     } else {
                    	 ul.push("<span class=\"tree-hit tree-collapsed\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-folder "+(node.iconCls ? node.iconCls : "")+"\"></span>");
                     	 display = "none";
                     }*/
                     
                     if(opts.treeExpand=="all" || opts.treeExpand > _length){
                    	 ul.push("<span class=\"tree-hit tree-expanded\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-folder tree-folder-open "+(node.iconCls ? node.iconCls : "")+"\"></span>");
                     }else{
                    	 ul.push("<span class=\"tree-hit tree-collapsed\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-folder "+(node.iconCls ? node.iconCls : "")+"\"></span>");
                     	 display = "none";
                     }
                     
                     
                     addCheckbox(ul,node);
                     var index = ul.length;
                     ul[index] = [];
                     ul[index].push( display ? ("<ul style=\"display:"+display+"\">") : "<ul>");
                     contentsAll = deleteContent(node.id, contentsAll);
                    
                     parseNodes(ul[index], node.children, _length + 1, target, contentsAll);
                     ul[index].push("</ul>");
                 } else {
                     if (node.state == "closed") {
                    	 ul.push("<span class=\"tree-hit tree-collapsed\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-folder "+ (node.iconCls ? node.iconCls : "") +"\"></span>");
                     } else {
                    	 ul.push("<span class=\"tree-indent\"></span>");
                     	 ul.push("<span class=\"tree-icon tree-file "+(node.iconCls ? node.iconCls : "")+"\"></span>");
                     }
                     addCheckbox(ul,node);
                 }
                ul.push("</li>");
            }
        }
       
        function addCheckbox(ul,node){
        	if (eval(opts.checkbox)) {
                if (opts.onlyLeafCheck) {
                    if (node.state == "open" && (!node.children || !node.children.length)) {
                        if (node.checked) {
                        	ul.push("<span class=\"tree-checkbox tree-checkbox1\"></span>");
                        } else {
                        	ul.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
                        }
                    }
                } else {
                    if (node.checked) {
                    	ul.push("<span class=\"tree-checkbox tree-checkbox1\"></span>");
                        params.push(node.id);
                    } else {
                    	ul.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
                    }
                }
            }
            var txt = node.text ? node.text : $(node.target).find("span.tree-title").text() ;
            ul.push("<span class=\"tree-title\" title='"+txt+"'>"+txt+"</span>");
            ul.push("</div>");
        }
        
        function joinNodes(nodes){
        	if(typeof nodes == "string"){
        		treeResult.push(nodes);
        	} else {
        		for(var i=0, len=nodes.length; i<len; i++){
                	if(Object.prototype.toString.apply(nodes[i]) === '[object Array]'){
                		joinNodes(nodes[i]);
                	} else {
                		treeResult.push(nodes[i]);
                	}
                }
        	}
        }
        
        function saveNodeData(){
        	for(var i = 0; i < data.length; i++){
        		var node = data[i];
        		if(node.id){
	        		var $div = $('div.tree-node[node-id=' + node.id + ']', $(target));
	        		$.data($div[0], "tree-node", {
	        			id: node.id,
	        			text: node.text,
	        			iconCls: node.iconCls,
	        			attributes: node.attributes
	        		});
        		}
        	}
        }
    };

    function createTreeStyle(target, ul, recursion) {
        var opts = $.data(target, "tree").options;
        if (!opts.lines) {
            return;
        }
        if (!recursion) {
        	recursion = true;
            $(target).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            $(target).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var roots = $(target).tree("getRoots");
            if (roots.length > 1) {
                $(roots[0].target).addClass("tree-root-first");
            } else if(roots.length != 0){
                $(roots[0].target).addClass("tree-root-one");
            }
        }
        $(ul).children("li").each(function() {
            var $node = $(this).children("div.tree-node");
            var ul = $node.next("ul");
            if (ul.length) {
                if ($(this).next().length) {
                    addLine($node);
                }
                createTreeStyle(target, ul, recursion);
            } else {
                addIcon($node);
            }
        });
        var lastNode = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
        lastNode.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
        function addIcon(node, _61) {
            var icon = node.find("span.tree-icon");
            icon.prev("span.tree-indent").addClass("tree-join");
        };
        function addLine(node) {
            var spanL = node.find("span.tree-indent, span.tree-hit").length;
            node.next().find("div.tree-node").each(function() {
                $(this).children("span:eq(" + (spanL - 1) + ")").addClass("tree-line");
            });
        };
    };
    
    
    function getNodeData(nodeId,opts){		
    	if(nodeId){
    		var data = opts.data;
    		if(data){
	    		for(var i=data.length-1; i>=0; i--){
	    			if(nodeId == data[i].id) return data[i];
	    		}
    		}
    	}
    	return {};
    }

    function request(target, ul, options, _68) {
        var opts = $.data(target, "tree").options;
        options = options || {};
        var param = null;
        if (target != ul) {
            var div = $(ul).prev();
            param = getNode(target, div[0]);
        }
        if (opts.onBeforeLoad.call(target, param, options) == false) {
            return;
        }
        var floder = $(ul).prev().children("span.tree-folder");
        floder.addClass("tree-loading");
        var state = opts.loader.call(target, options,
        function(data) {
            floder.removeClass("tree-loading");
            loadData(target, ul, data);
            if (_68) {
                _68();
            }
        },
        function() {
            floder.removeClass("tree-loading");
            opts.onLoadError.apply(target, arguments);
            if (_68) {
                _68();
            }
        });
        
        if (state == false) {
            floder.removeClass("tree-loading");
        }
    };
    //打开节点
    function expand(target, u, _72) {
        var opts = $.data(target, "tree").options;
        var hit = $(u).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            return;
        }
        var param = getNode(target, u);
        if (opts.onBeforeExpand.call(target, param) == false) {
            return;
        }
        hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        hit.next().addClass("tree-folder-open");
        var ul = $(u).next();
        if (ul.length) {
            if (opts.animate) {
                ul.slideDown(opts.animateSpeed,
                function() {
                    opts.onExpand.call(target, param);
                    if (_72) {
                        _72();
                    }
                });
            } else {
                ul.css("display", "block");
                opts.onExpand.call(target, param);
                if (_72) {
                    _72();
                }
            }
        } else {
            var dul = $("<ul style=\"display:none\"></ul>").insertAfter(u);
            request(target, dul[0], {
                id: param.id
            },
            function() {
                if (dul.is(":empty")) {
                    dul.remove();
                }
                if (opts.animate) {
                    dul.slideDown(opts.animateSpeed,
                    function() {
                        opts.onExpand.call(target, param);
                        if (_72) {
                            _72();
                        }
                    });
                } else {
                    dul.css("display", "block");
                    opts.onExpand.call(target, param);
                    if (_72) {
                        _72();
                    }
                }
            });
        }
    };
    //关闭节点
    function collapse(target, ul) {
        var opts = $.data(target, "tree").options;
        var hit = $(ul).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-collapsed")) {
            return;
        }
        var param = getNode(target, ul);
        if (opts.onBeforeCollapse.call(target, param) == false) {
            return;
        }
        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        hit.next().removeClass("tree-folder-open");
        var ul = $(ul).next();
        if (opts.animate) {
            ul.slideUp(opts.animateSpeed,
            function() {
                opts.onCollapse.call(target, param);
            });
        } else {
            ul.css("display", "none");
            opts.onCollapse.call(target, param);
        }
    };

    //打开或关闭节点的触发器
    function toggle(_7c, _7d) {
        var hit = $(_7d).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            collapse(_7c, _7d);
        } else {
            expand(_7c, _7d);
        }
    };

    //打开所有的节点
    function expandAll(_7f, _80) {
        var _81 = getChildren(_7f, _80);
        if (_80) {
            _81.unshift(getNode(_7f, _80));
        }
        for (var i = 0; i < _81.length; i++) {
            expand(_7f, _81[i].target);
        }
    };

    //打开从根节点到指定节点之间的所有节点
    function expandTo(target, node) {
        var param = [];
        var p = getParent(target, node);
        while (p) {
            param.unshift(p);
            p = getParent(target, p.target);
        }
        for (var i = 0; i < param.length; i++) {
            expand(target, param[i].target);
        }
    };

    //关闭所有的节点
    function collapseAll(target, node) {
        var children = getChildren(target, node);
        if (node) {
            children.unshift(getNode(target, node));
        }
        for (var i = 0; i < children.length; i++) {
            collapse(target, children[i].target);
        }
    };
    //获取根节点，返回节点对象
    function getRoot(target) {
        var param = getRoots(target);
        if (param.length) {
            return param[0];
        } else {
            return null;
        }
    };
    //获取根节点，返回节点数组
    function getRoots(target) {
        var param = [];
        $(target).children("li").each(function() {
            var node = $(this).children("div.tree-node");
            param.push(getNode(target, node[0]));
        });
        return param;
    };
    //获取子节点
    function getChildren(target, _93) {
        var param = [];
        if (_93) {
            _95($(_93));
        } else {
            var roots = getRoots(target);
            for (var i = 0; i < roots.length; i++) {
                param.push(roots[i]);
                _95($(roots[i].target));
            }
        }
        function _95(t) {
            t.next().find("div.tree-node").each(function() {
                param.push(getNode(target, this));
            });
        };
        return param;
    };
    //获取父节点
    function getParent(target, _99) {
        var ul = $(_99).parent().parent();
        if (ul[0] == target) {
            return null;
        } else {
            return getNode(target, ul.prev()[0]);
        }
    };

    //获取所有被选择的节点
    function getChecked(target) {
        var param = [];
        $(target).find(".tree-checkbox1").each(function() {
            var parent = $(this).parent();
            param.push(getNode(target, parent[0]));
        });
        return param;
    };

    function getCascadeCheckNode(target){
    	var param = [];
    	$(target).find(".tree-checkbox2").each(function() {
            var parent = $(this).parent();
            param.push(getNode(target, parent[0]));
        });
        $(target).find(".tree-checkbox1").each(function() {
            var parent = $(this).parent();
            param.push(getNode(target, parent[0]));
        });
        return param;
    }
    
    
    //获取被选择的节点并返回，如果没有节点被选择则返回null
    function getSelected(target) {
        var selected = $(target).find("div.tree-node-selected");
        if (selected.length) {
            return getNode(target, selected[0]);
        } else {
            return null;
        }
    };
	
	function getSelectedBase(target){
		var selected = $(target).find("div.tree-node-selected"),
			opts = $.data(target, "tree").options,
			conf = $.extend({},opts,opts.conf);
			base = opts.base;
        if (selected.length && base) {
            var node = getNode(target, selected[0]);
			var nodeId = conf.nodeId || "id";
			for(var i=0, len=base.length; i<len; i++){
				if(base[i][nodeId] == node.id) return base[i];
			}
        } else {
            return null;
        }
	}

    //添加若干子节点到一个父节点
    function append(target, options) {
        var parent = $(options.parent);
        var ul;
        if (parent.length == 0) {
            ul = $(target);
        } else {
            ul = parent.next();
            if (ul.length == 0) {
                ul = $("<ul></ul>").insertAfter(parent);
            }
        }
        if (options.data && options.data.length) {
            var icon = parent.find("span.tree-icon");
            if (icon.hasClass("tree-file")) {
                icon.removeClass("tree-file").addClass("tree-folder");
                var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(icon);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
        }
        loadData(target, ul[0], options.data, true);
        setCheckbox(target, ul.prev());
    };

    function insert(target, _a8) {
        var ref = _a8.before || _a8.after;
        var _a9 = getParent(target, ref);
        var li;
        if (_a9) {
            append(target, {
                parent: _a9.target,
                data: [_a8.data]
            });
            li = $(_a9.target).next().children("li:last");
        } else {
            append(target, {
                parent: null,
                data: [_a8.data]
            });
            li = $(target).children("li:last");
        }
        if (_a8.before) {
            li.insertBefore($(ref).parent());
        } else {
            li.insertAfter($(ref).parent());
        }
    };
    function remove(_ab, _ac) {
        var _ad = getParent(_ab, _ac);
        var _ae = $(_ac);
        var li = _ae.parent();
        var ul = li.parent();
        li.remove();
        if (ul.children("li").length == 0) {
            var _ae = ul.prev();
            _ae.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
            _ae.find(".tree-hit").remove();
            $("<span class=\"tree-indent\"></span>").prependTo(_ae);
            if (ul[0] != _ab) {
                ul.remove();
            }
        }
        if (_ad) {
            setCheckbox(_ab, _ad.target);
        }
        createTreeStyle(_ab, _ab);
    };

    //获取特定的节点数据，包括它的子节点。
    function getData(target, _b1) {
        function getSubNode(aa, ul) {
            ul.children("li").each(function() {
                var node = $(this).children("div.tree-node");
                var n = getNode(target, node[0]);
                var sub = $(this).children("ul");
                if (sub.length) {
                    n.children = [];
                    getSubNode(n.children, sub);
                }
                aa.push(n);
            });
        };
        if (_b1) {
            var opts = getNode(target, _b1);
            opts.children = [];
            getSubNode(opts.children, $(_b1).next());
            return opts;
        } else {
            return null;
        }
    };
    function update(target, params) {
        var _b9 = $(params.target);
        var node = getNode(target, params.target);
        if (node.iconCls) {
            _b9.find(".tree-icon").removeClass(node.iconCls);
        }
        var opts = $.extend({},
        node, params);
        $.data(params.target, "tree-node", opts);
        _b9.attr("node-id", opts.id);
        _b9.find(".tree-title").html(opts.text);
        if (opts.iconCls) {
            _b9.find(".tree-icon").addClass(opts.iconCls);
        }
        if (node.checked != opts.checked) {
            setCheckbox1(target, params.target, opts.checked);
        }
    };

    //获取特定的节点对象。
    function getNode(target, div) {
    	var opts = $.data(target, "tree").options;
    	var nodeid = undefined,
    		data = undefined;
    	if(div && div.getAttribute){
    		nodeid = div.getAttribute("node-id");
    	}
    	var data = $.extend({}, getNodeData(nodeid,opts), {target: div, checked: $(div).find(".tree-checkbox").hasClass("tree-checkbox1")});
        if (!getHitNode(target, div)) {
            data.state = $(div).find(".tree-hit").hasClass("tree-expanded") ? "open": "closed";
        }
        return data;
    };
    
    //查找指定的节点并返回节点对象
    function find(target, id) {
        var node = $(target).find("div.tree-node[node-id=" + id + "]");
        if (node.length) {
            return getNode(target, node[0]);
        } else {
            return null;
        }
    };

    function onSelect(target, node) {
        var opts = $.data(target, "tree").options;
        var $node = getNode(target, node);
        if (opts.onBeforeSelect.call(target, $node) == false) {
            return;
        }
        $("div.tree-node-selected", target).removeClass("tree-node-selected");
        $(node).addClass("tree-node-selected");
        opts.onSelect.call(target, $node);
    };

    //判断该节点下是否有含有子节点的节点
    function getHitNode(_c7, target) {
        var ul = $(target);
        var hit = ul.children("span.tree-hit");
        return hit.length == 0;
    };

    //开始编辑节点
    function beginEdit(target, node) {
        var opts = $.data(target, "tree").options;
        var _ce = getNode(target, node);
        if (opts.onBeforeEdit.call(target, _ce) == false) {
            return;
        }
        $(node).css("position", "relative");
        var nt = $(node).find(".tree-title");
        var _cf = nt.outerWidth();
        nt.empty();
        var _d0 = $("<input class=\"tree-editor\">").appendTo(nt);
        _d0.val(_ce.text).focus();
        _d0.width(_cf + 20);
        _d0.height(document.compatMode == "CSS1Compat" ? (18 - (_d0.outerHeight() - _d0.height())) : 18);
        _d0.bind("click",
        function(e) {
            return false;
        }).bind("mousedown",
        function(e) {
            e.stopPropagation();
        }).bind("mousemove",
        function(e) {
            e.stopPropagation();
        }).bind("keydown",
        function(e) {
            if (e.keyCode == 13) {
                endEdit(target, node);
                return false;
            } else {
                if (e.keyCode == 27) {
                    cancelEdit(target, node);
                    return false;
                }
            }
        }).bind("blur",
        function(e) {
            e.stopPropagation();
            endEdit(target, node);
        });
    };

    //结束编辑节点
    function endEdit(target, node) {
        var opts = $.data(target, "tree").options;
        $(node).css("position", "");
        var editor = $(node).find("input.tree-editor");
        var val = editor.val();
        editor.remove();
        var param = getNode(target, node);
        param.text = val;
        update(target, param);
        opts.onAfterEdit.call(target, param);
    };

    //取消编辑节点
    function cancelEdit(target, node) {
        var opts = $.data(target, "tree").options;
        $(node).css("position", "");
        $(node).find("input.tree-editor").remove();
        var param = getNode(target, node);
        update(target, param);
        opts.onCancelEdit.call(target, param);
    };
})(jQuery);