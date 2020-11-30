/**
 * draggable - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 
 * 
 */
(function($) {
	//入口函数
    $.fn.draggable = function(options, param) {
        if (typeof options == "string") {
            return $.fn.draggable.methods[options](this, param);
        }
        return this.each(function() {
            var opts;
            var state = $.data(this, "draggable");
            if (state) {
                state.handle.unbind(".draggable");
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({},
                $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), options || {});
            }
           
            var handle = null;
            if (typeof opts.handle == "undefined" || opts.handle == null) {
                handle = $(this);
            } else {
                handle = (typeof opts.handle == "string" ? $(opts.handle, this) : opts.handle);
            }
            $.data(this, "draggable", {
                options: opts,
                handle: handle
            });
            
            //draggable数据保存到$.cache里再return
            if (opts.disabled == true) {
                $(this).css("cursor", "");
                return;
            }
            
            handle.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            },
            onMouseMove).bind("mouseleave.draggable", {
                target: this
            },
            function(e) {
                $(this).css("cursor", "");
            }).bind("mousedown.draggable", {
                target: this
            },
            onMouseDown);

            function onMouseMove(e) {
                if (dragging) {
                    return;
                }
				
                var opts = $.data(e.data.target, "draggable").options;
                if (checkArea(e)) {
                    $(this).css("cursor", opts.cursor);
                } else {
                    $(this).css("cursor", "");
                }
            }

            function onMouseDown(e) {
                if (checkArea(e) == false) {
                    return;
                }
                var opts = $.data(e.data.target, "draggable").options,
                
                	position = opts.offsetParent ? $(e.data.target).position() : $(e.data.target).offset(),
                			
                	data = {
                    startPosition: $(e.data.target).css("position"),
                    startLeft: position.left,
                    startTop: position.top,
                    left: position.left,
                    top: position.top,
                    startX: e.pageX,
                    startY: e.pageY,
                    target: e.data.target,
                    parent: $(e.data.target).parent()[0]
                };
                $.extend(e.data, data);
               
                if (opts.onBeforeDrag.call(e.data.target, e) == false) {
                    return;
                }
                $(document).unbind(".draggable");
                $(document).bind("mousedown.draggable", e.data, doDown);
                $(document).bind("mousemove.draggable", e.data, doMove);
                $(document).bind("mouseup.draggable", e.data, doUp);
            }

            function checkArea(e) {
                var opts = $.data(e.data.target, "draggable");
                var handle = opts.handle;
                var offset = $(handle).offset();
                var width = $(handle)._outerWidth();
                var height = $(handle)._outerHeight();
                var t = e.pageY - offset.top;
                var r = offset.left + width - e.pageX;
                var b = offset.top + height - e.pageY;
                var l = e.pageX - offset.left;
                return Math.min(t, r, b, l) > opts.options.edge;
            }
        })
    };

    $.fn.draggable.methods = {
        options: function(jq) {
            return $.data(jq[0], "draggable").options;
        },
        proxy: function(jq) {
            return $.data(jq[0], "draggable").proxy;
        },
        enable: function(jq) {
            return jq.each(function() {
                $(this).draggable({
                    disabled: false
                })
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                $(this).draggable({
                    disabled: true
                })
            });
        }
    };

    $.fn.draggable.parseOptions = function(target) {
        var jq = $(target);
        return $.extend({},
        $.parser.parseOptions(jq, ["cursor", "handle", "axis", {
            "revert": "boolean",
            "deltaX": "number",
            "deltaY": "number",
            "edge": "number"
        }]), {
            disabled: (jq.attr("disabled") ? true: undefined)
        })
    };

    $.fn.draggable.defaults = {
    	//是否在对象拖动时以offsetParent计算偏移位置
    	offsetParent: true,
        proxy: null,
        revert: false,
        cursor: "move",
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: false,
        delay: 100,
        edge: 0,
        axis: null,
        onBeforeDrag: function(e) {},
        onStartDrag: function(e) {},
        onDrag: function(e) {},
        onStopDrag: function(e) {},
        onRevert: function(e){}
    }

    var dragging = false,canDrag = false;
    function drag(e) {
        var opts = $.data(e.data.target, "draggable").options;
        if (!canDrag) return false;
        var dragData = e.data;
        var left = dragData.startLeft + e.pageX - dragData.startX;
        var top = dragData.startTop + e.pageY - dragData.startY;
        if (opts.deltaX != null && opts.deltaX != undefined) {
            left = e.pageX + opts.deltaX;
        }
        if (opts.deltaY != null && opts.deltaY != undefined) {
            top = e.pageY + opts.deltaY;
        }
        if (e.data.parent != document.body) {
            left += $(e.data.parent).scrollLeft();
            top += $(e.data.parent).scrollTop();
        }
        if (opts.axis == "h") {
            dragData.left = left;
        } else {
            if (opts.axis == "v") {
                dragData.top = top;
            } else {
                dragData.left = left;
                dragData.top = top;
            }
        }
    };

    function applyDrag(e) {
        if (!canDrag) {
            return false;
        }
        var opts = $.data(e.data.target, "draggable").options;
        var proxy = $.data(e.data.target, "draggable").proxy;
        if (!proxy) {
            proxy = $(e.data.target);
        }
        proxy.css({
            left: e.data.left,
            top: e.data.top
        }).show();
        $("body").css("cursor", opts.cursor);
    };

    function doDown(e) {
        dragging = true;
        canDrag = false;
        var opts = $.data(e.data.target, "draggable").options;
        if (opts.delay) {
            setTimeout(function() {
                canDrag = true;
            },
            opts.delay);
        }
        var droppables = $(".droppable:visible").filter(function() {
            return e.data.target != this;
        }).filter(function() {
        	var dOpts = $.data(this, "droppable").options;
        	if(dOpts.disabled == true) {
        		return false;
        	}
            var accept = dOpts.accept;
            if (accept) {
                return $(accept).filter(function() {
                    return this == e.data.target
                }).length > 0;
            } else {
                return true;
            }
        });
        $.data(e.data.target, "draggable").droppables = droppables;
        var proxy = $.data(e.data.target, "draggable").proxy;
        if (!proxy) {
            if (opts.proxy) {
                if (opts.proxy == "clone") {
                    proxy = $(e.data.target).clone();
                } else {
                    proxy = opts.proxy.call(e.data.target, e.data.target);
                }

                if (!canDrag) proxy.hide();
                $.data(e.data.target, "draggable").proxy = proxy;
            } else {
                proxy = $(e.data.target);
            }
        }
        proxy.css("position", "absolute");

        drag(e);
        applyDrag(e);
        opts.onStartDrag.call(e.data.target, e);
        return false;
    };

    function doMove(e) {
        drag(e);
        if ($.data(e.data.target, "draggable").options.onDrag.call(e.data.target, e) != false) {
            applyDrag(e);
        }
        handleDroppables($.data(e.data.target, "draggable").droppables, e, true);
        return false;
    };

    function doUp(e) {
        dragging = false;
        canDrag = false;
        drag(e);
        var proxy = $.data(e.data.target, "draggable").proxy;
        var opts = $.data(e.data.target, "draggable").options;
        if (opts.revert) {
            if (checkDrop() == true) {
                removeProxy();
                $(e.data.target).css({
                    position: e.data.startPosition,
                    left: e.data.startLeft,
                    top: e.data.startTop
                });
            } else {
                if (proxy) {
                    proxy.animate({
                        left: e.data.startLeft,
                        top: e.data.startTop
                    },
                    function() {
                        removeProxy();
                        opts.onRevert.call(e.data.target, e);
                    });
                } else {
                    $(e.data.target).animate({
                        left: e.data.startLeft,
                        top: e.data.startTop
                    },
                    function() {
                        $(e.data.target).css("position", e.data.startPosition);
                      opts.onRevert.call(e.data.target, e);
                    });
                }
            }
        } else {
        	checkDrop();
            removeProxy();
        }
        opts.onStopDrag.call(e.data.target, e);
        $(document).unbind(".draggable");
        setTimeout(function() {
            $("body").css("cursor", "")
        },
        100);

        function removeProxy() {
            if (proxy) {
                proxy.remove();
            }
            var dObj = $.data(e.data.target, "draggable");
            if(dObj) {
            	dObj.proxy = null;
            }
        };

        function checkDrop() {
            var dropped = false;
            $.each(handleDroppables($.data(e.data.target, "draggable").droppables, e), function() {
                if(isInDropArea.call(this, e)) {
                	if (opts.revert) {
                        $(e.data.target).css({
                            position: e.data.startPosition,
                            left: e.data.startLeft,
                            top: e.data.startTop
                        });
                    }
                    dropped = ($(this).triggerHandler("_drop", [e.data.target]) == false ? false : true);
                    this.entered = false;               	
                }           	
            });
            return dropped;
        };
        return false;
    };
    
    /**
     * @author liuqing 2014-3-20 多个droppable位置重叠的问题修复
     * 
     * 处理所有droppable，返回一个数组，包含最大z-index的droppable和无z-index的droppables
     */
    function handleDroppables(drops, e, trigHover) {
    	//含有z-index的droppables
    	var zindexDrops = drops.filter(function() {
    		if(!/\d/.test($(this).css("z-index"))) {
    			return false;
    		}
    		if(isInDropArea.call(this, e)) {
    			return true;
    		}
    		if(trigHover) moveout.call(this, e);	//只触发out事件
    		return false;
    	});
    	var zindexDropsArr = $.makeArray(zindexDrops);
    	
    	//按z-index降序排列
    	zindexDropsArr.sort(function(v1, v2) {
    		var z1 = parseInt($(v1).css("z-index"));
    		var z2 = parseInt($(v2).css("z-index"));
    		if(z1 > z2) {
    			return -1;
    		}
    		else if(z1 < z2) {
    			return 1
    		}
    		return 0;
    	});
    	
    	//保留z-index最大的
    	var arr = [];
    	$.each(zindexDropsArr, function(i, item) {
    		if(arr.length === 0) {
    			arr.push(item);
    			return true;
    		}
    		var cz = parseInt($(item).css("z-index"));
    		var lz = parseInt($(arr[arr.length - 1]).css("z-index"));
    		if(cz < lz) {
    			return false;
    		}
    		arr.push(item);
    	});
    	
    	if(trigHover) {
    		$.each(arr,	function(i, arrEle) {
    			$.each(zindexDropsArr, function(j, zindexEle) {
    				if(zindexEle != arrEle) {
    					moveout.call(this, e);	//拖入顶层droppable时立刻触发下层的out事件
    				}
    			});
    			moveover.call(this, e);	//触发顶层droppable的enter或over事件,out事件可能在下一次move时选择含z-index的droppable时触发
    		});
    	}
    	
    	//还需要包括不含有z-index的droppables,扁平化数组再返回
    	return arr.concat($.makeArray(drops.filter(function() {
    	    		if(/\d/.test($(this).css("z-index"))) {
    	    			return false;
    	    		}
    	    		if(isInDropArea.call(this, e)) {
    	    			if(trigHover) moveover.call(this, e);
    	    			return true;
    	    		}
    	    		if(trigHover) moveout.call(this, e);
    	    		return false;
    	    	})));
    	
    	function moveout(e) {
			if (this.entered) {
                $(this).trigger("_dragleave", [e.data.target]);
                this.entered = false;
            }
    	}
    	
    	function moveover(e) {
			if (!this.entered) {
                $(this).trigger("_dragenter", [e.data.target]);
                this.entered = true;
            }
			$(this).trigger("_dragover", [e.data.target]);
    	}
    }
	
    /**
     * 判断鼠标是否拖放到droppable中
     */
	function isInDropArea(e) {
		var dropObj = $(this), p2 = dropObj.offset();
		return e.pageX > p2.left && e.pageX < p2.left + dropObj._outerWidth() && 
					e.pageY > p2.top && e.pageY < p2.top + dropObj._outerHeight();
	}
})(jQuery);