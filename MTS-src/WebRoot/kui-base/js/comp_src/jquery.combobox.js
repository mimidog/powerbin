/**
 * combobox - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *    combo
 *
 */
(function($) {
    $.fn.combobox = function(options, param) {

        if (typeof options == 'string') {
            var method = $.fn.combobox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }
        options = options || {};
        return this.each(function() {
           
            var state = $.data(this, 'combobox');
            if (state) {
                $.extend(state.options, options);
                create(this);
            } else {
                state = $.data(this, 'combobox', {
                    options: $.extend({},
                    $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options)
                });
                create(this);
                bindEvents(this);
            }          
            
            var transData = transformData(this);
			//装载数据
            if (transData.length) {
                loadData(this, transData);				  
            } else if (state.options.data) {				
                loadData(this, state.options.data);				  
            } else if (state.options.dict) {
                setDict(this, state.options.dict);
            } else {
                request(this);
            }

            comboOptions = $.data(this, 'combo').options;
            comboOptions.text = $(this).combo("getText");
            state.options.text = $(this).combo("getText");
        });

    };
    $.fn.combobox.methods = {
        options: function(jq) {
            var opts = $.data(jq[0], 'combobox').options;
            opts.originalValue = jq.combo('options').originalValue;
            return opts;
        },
        getData: function(jq) {
            return $.data(jq[0], 'combobox').data;
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                setValues(this, values);
            });
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                setValues(this, [value]);
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var opts = $(this).combobox('options');
                if (opts.multiple) {
                    $(this).combobox('setValues', opts.originalValue);
                } else {
                    $(this).combobox('setValue', opts.originalValue);
                }
            });
        },
        loadData: function(jq, data) {
            return jq.each(function() {
                loadData(this, data);
            });
        },
        reload: function(jq, url, param) {
            return jq.each(function() {
                request(this, url, param);
            });
        },
        select: function(jq, value) {
            return jq.each(function() {
                select(this, value);
            });
        },
        unselect: function(jq, value) {
            return jq.each(function() {
                unselect(this, value);
            });
        },
        setDict: function(jq, dictCode) {
            return jq.each(function() {
                setDict(this, dictCode);
            });
        }
    };
    $.fn.combobox.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.fn.combo.parseOptions(target), $.parser.parseOptions(target, ['valueField', 'textField', 'mode', 'method', 'url']));
    };
    $.fn.combobox.defaults = $.extend({},
    $.fn.combo.defaults, {
    	showDictValue: true,
        width: "auto",
        panelWidth: null,
        panelHeight: 'auto',
        valueField: 'value',
        textField: 'text',
        mode: 'local',
        // or 'remote'
        method: 'post',
        editable: true,
        enableQuery: true,
        autoFill: false,
        sort: null,
        url: null,
        data: null,
        req: [],
        keyHandler: {
            up: function() {
                selectPrev(this);
            },
            down: function() {
                selectNext(this);
            },
            enter: function() {
            	var panel = $(this).data("combo").panel,
                	values = $(this).combobox('getValues');
            	
            	values = values.length ? values : [panel.find("div.combobox-item:visible:first").attr("value")];
            	select(this, values[0]);
                //$(this).combobox('setValues', values);
                $(this).combobox('hidePanel');
            },
            query: function(q) {
            	var opts = $(this).combobox("options");
            	if(opts.enableQuery) {
            		doQuery(this, q);
            	}
            }
        },
        filter: function(q, row) {
            var opts = $(this).combobox('options');
            if (opts.textField.indexOf(",") > -1) {
                var sArr = opts.textField.split(",");
                return -1 != row[sArr[0]].indexOf(q) || -1 != row[sArr[1]].indexOf(q) || -1 != row[opts.valueField].indexOf(q);
            } else {
                return -1 != row[opts.textField].indexOf(q);
            }
        },
        formatter: function(row) {
            var opts = $(this).combobox('options');
            if (opts.textField.indexOf(",") > -1) {
                var sArr = opts.textField.split(",");
                return row[sArr[0]] + (row[sArr[0]] ? "-" : "") + row[sArr[1]];
            } else {
                return row[opts.textField];
            }
        },
        loader: function(param, success, error) {
            var opts = $(this).combobox('options');
            if (!opts.url && (!opts.req || opts.req.length == 0)) return false;
            if (opts.req && opts.req.length > 0) {
                if (!opts.req[0].service) opts.req[0]["service"] = "P9999999";
            }
            var resFunc = function(rtnData) {
                if (rtnData && rtnData[0] && $.isFunction(success)) {
                    success(rtnData[0]);
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
                    error.apply(this, arguments)
                },
                req: opts.req || []
            };
            ajaxRequest(p);
        },
        onBeforeLoad: function(param) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onSelect: function(record) {},
        onUnselect: function(record) {},
        onSelectAll: function(records) {},    //by  2015/08/28
        onUnselectAll: function(records) {},    //by  2015/08/28
        onClear: $.noop
    });
    /**
   * scroll panel to display the specified item
   */
    function scrollTo(target, value) {
        var panel = $(target).combo('panel');
        var item = panel.find('div.combobox-item[value="' + value + '"]');
        if (item.length) {
            if (item.position().top <= 0) {
                var h = panel.scrollTop() + item.position().top;
                panel.scrollTop(h);
            } else if (item.position().top + item.outerHeight() > panel.height()) {
                var h = panel.scrollTop() + item.position().top + item.outerHeight() - panel.height();
                panel.scrollTop(h);
            }
        }
    }

    function setSize(target, width) {
        $(target).combo('resize', width);
    }

    /**
   * select previous item
   */
    function selectPrev(target) {
        var panel = $(target).combo('panel'),
        	values = $(target).combo('getValues'),
        	item = panel.find('div.combobox-item[value="' + values.pop() + '"]').prevAll(':visible:first'),
        	value;
        
        if (!item.length) {
        	item = panel.find('div.combobox-item:visible:last');
        }
        value = item.attr('value');
        select(target, value);
        scrollTo(target, value);
    }

    function selectNext(target) {
        var panel = $(target).combo('panel'),
        	values = $(target).combo('getValues'),
        	item, value;
        
        if(isComboboxEmpty(target)) {	//getValues的值为空
        	item = getEmptyItem(target);
        	if(item.length && isItemSelected(item)) {
        		item = item.next(":visible");
        	} else {
        		item = panel.find("div.combobox-item:visible:first");
        	}
        } else {
        	item = panel.find('div.combobox-item[value="' + values.pop() + '"]').nextAll(':visible:first');
        }
        
        if (!item.length) {
        	 item = panel.find('div.combobox-item:visible:first');
        }
        value = item.attr('value');
        select(target, value);
        scrollTo(target, value);
    }
    
    
    function isComboboxEmpty(target) {
    	var values = $(target).combo('getValues');
    	return !values.length || (1 === values.length && "" === values[0])
    }
    
    function getEmptyItem(target) {
    	return $(target).combo('panel').find("div.combobox-item[value='']");
    }
    
    function isItemSelected(item) {
    	return item.hasClass("combobox-item-selected");
    }

    function select(target, value) {
        var opts = $.data(target, 'combobox').options;
        var data = $.data(target, 'combobox').data || [];
        if (opts.multiple) {
            var values = $(target).combo('getValues');

            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) return;
            }
            values.push(value);
            setValues(target, values);
        } else {
            setValues(target, [value]);
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onSelect.call(target, data[i]);
                break;
            }
        }
    }

    /**
   * unselect the specified value
   */
    function unselect(target, value) {
        var opts = $.data(target, 'combobox').options;
        var data = $.data(target, 'combobox').data;
        var values = $(target).combo('getValues');
        for (var i = 0; i < values.length; i++) {
            if (values[i] == value) {
                values.splice(i, 1);
                setValues(target, values);
                break;
            }
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i][opts.valueField] == value) {
                opts.onUnselect.call(target, data[i]);
                return;
            }
        }
    }

    function reverseSelect(target, values) {
        var opts = $.data(target, 'combobox').options;
        var data = $.data(target, 'combobox').data;
        var key = new Array;
        for (var k = 0; k < data.length; k++) {
            key[k] = data[k][opts.valueField];
        }

        for (var i = 0; i < key.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (key[i] == values[j]) {
                    key.splice($.inArray(values[j], key), 1);
                }
            }
        }

        setValues(target, key);
        activeUnSelectAllEvet(target, key)  //by  2015/08/28

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (data[i][opts.valueField] == values[j]) {
                    opts.onUnselect.call(target, data[i]);
                    return;
                }
            }
        }
    }

    function setValues(target, values, remainText) {
        var opts = $.data(target, 'combobox').options;
        var data = $.data(target, 'combobox').data || [];
        var panel = $(target).combo('panel');
        if (!opts.acceptInput && (!data || !data.length)) {
        	$(target).combo('setText', "");
        	return;
        }
        panel.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        panel.find("input[type='checkbox']").removeAttr('checked');
        var vv = [],
        ss = [];
        if (Object.prototype.toString.apply(values) === '[object Array]') {
            vv = values;
        } else {
            if (opts.multiple) {
                if (values.indexOf(",") != -1) vv = values.split(",");
                else if (data && data.length > 0 && data[data.length - 1][opts.valueField].length == 1) vv = values.split("");
                else vv = [values];
            } else {
                vv = [values];
            }
        }
        for (var i = 0; i < vv.length; i++) {
            var v = vv[i];
            ss.push(getDiaplayText(v) || v);
            panel.find('div.combobox-item[value="' + v + '"]').addClass('combobox-item-selected');
            if (opts.multiple) {
                panel.find(':checkbox[value="' + v + '"]').attr('checked', true);
            }
        }
        $(target).combo('setValues', vv, remainText);
        if (!remainText) {
            $(target).combo('setText', ss.join(opts.separator));
        }
        function getDiaplayText(value) {
            var text;
            for (var j = 0; j < data.length; j++) {
                if (!data[j]) continue;
                if (data[j][opts.valueField] == value) {
                    if (opts.textField.indexOf(",") > -1) {
                        var sArr = opts.textField.split(",");
                        text = data[j][sArr[0]] + (data[j][sArr[0]] ? "-" : "") + data[j][sArr[1]];
                    } else {
                        text = data[j][opts.textField];
                    }
                    break;
                }
            }
            return text;
        }
    }

    function transformData(target) {
        var opts = $.data(target, 'combobox').options;
        var data = [];
        $('>option', target).each(function() {
            var item = {};
            item[opts.valueField] = $(this).attr('value') != undefined ? $(this).attr('value') : $(this).html();
            item[opts.textField] = $(this).html();
            item['selected'] = $(this).attr('selected');
            data.push(item);
        });
        return data;
    }

    function setDict(target, dictCode) {
        var opts = $.data(target, 'combobox').options;
        var dictArr = kui.getSysDict(dictCode);
        var data = [];
        data = data.concat(dictArr);
        if (opts && opts["default"]) {
            var defs = opts["default"].split(":");
            data.unshift({
                'dict_val': defs[0],
                'dict_des': defs[1]
            });
        }
        opts['valueField'] = 'dict_val';
        opts['textField'] = 'dict_des';
        loadData(target, data);
    }

    function loadData(target, data, remainText) {
        var opts = $.data(target, 'combobox').options;
        var panel = $(target).combo('panel');
        $.data(target, 'combobox').data = $.extend([], data);
        var selected = $(target).combobox('getValues');
        panel.empty(); // clear old data
        if (typeof(data) == 'undefined' || data.length == 0) return;
        var cData = $.extend([], data);
        if (opts.sort) cData = opts.sort.call(target, cData);
		
        if (opts.loadFilter) cData = opts.loadFilter.call(target, cData);
		
        if (opts.extItems) {
        	opts.extItems = $.isArray(opts.extItems) ? opts.extItems : eval("(" + opts.extItems + ")");
        	
        	opts.extItems.sort(function(prev, next) {	//空值元素置前
        		if("" === next[opts.valueField]) {
        			return 1;
        		}
        		return 0;
        	});
        	
        	var extItems = [];
        	$.each(opts.extItems, function(i, item) {
        		var sItem = {};
        		sItem[opts.valueField] = item[opts.valueField];
        		sItem[opts.textField] = item[opts.textField];
        		extItems.push(sItem);
        	});
            $.data(target, 'combobox').data = $.extend([], cData = extItems.concat(cData));
        }
        
        if(opts.dict && opts.showDictValue) {
        	opts.valueField = "dict_val";
        	opts.textField = "dict_val,dict_des";
        }
        
        for (var i = 0; i < cData.length; i++) {
            if (typeof(cData[i]) == 'undefined') {
                return;
            }
            var v = cData[i][opts.valueField];
            var s;
            if (opts.textField.indexOf(",") > -1) {
                var sArr = opts.textField.split(",");
                s = cData[i][sArr[0]] + (cData[i][sArr[0]] ? "-" : "") + cData[i][sArr[1]];
            } else {
                s = cData[i][opts.textField];
            }
            var item = $('<div class="combobox-item"></div>').appendTo(panel);
            item.attr('value', v);
           
            if (opts.formatter) {
                item.html(opts.multiple ? '<input type="checkbox" value="' + v + '"><span>' + opts.formatter.call(target, cData[i]) + '</span>': opts.formatter.call(target, cData[i]));
            } else {
                item.html(opts.multiple ? '<input type="checkbox" value="' + v + '"><span>' + s + '</span>': s);
            }
            if (cData[i]['selected']) { (function() {
                    for (var i = 0; i < selected.length; i++) {
                        if (v == selected[i]) return;
                    }
                    selected.push(v);
                })();
            }
        }
        $(".combobox-item :even",panel).addClass("combobox-item-even");
	
        if (selected.length == 0 || selected[0] == "") {
            if (cData.length > 0 && opts.autoFill) {
                selected.push(cData[0][opts.valueField]);
            }
        }
        if (selected.length > 0 && selected.length != 1 || selected[0] != "") {
            if (opts.multiple) {
            	if(selected[0] == "@"){
            		var panel = $.data(target, "combo").panel;
		        	var $select = panel.parent().find(".combo-selectAll");
			  		$select.find("span:eq(0)").trigger("click");
            	}else{
            		setValues(target, selected, remainText);
            	}
            } else {
                if (selected.length) {
                    setValues(target, [selected[selected.length - 1]], remainText);
                } else {
                    setValues(target, [], remainText);
                }
            }
        }
        opts.onLoadSuccess.call(target, cData);
        $('.combobox-item', panel).hover(function() {
            $(this).addClass('combobox-item-hover');
        },
        function() {
            $(this).removeClass('combobox-item-hover');
        }).click(function() {
            var item = $(this);
            if (opts.multiple) {
                if (item.hasClass('combobox-item-selected')) {
                    item.find(':checkbox').attr('checked', false);
                    item.removeClass("combobox-item-selected");
                    unselect(target, item.attr('value'));
                } else {
                    item.find(':checkbox').attr('checked', true);
                    item.addClass("combobox-item-selected");
                    select(target, item.attr('value'));
                }
            } else {
                select(target, item.attr('value'));
                $(target).combo('hidePanel');
            }
        });
    }
      //by  2015/08/28
    function activeSelectAllEvet(target,values){
        var opts = $.data(target, 'combobox').options;
        opts.onSelectAll.call(target, values);
    }
    //by  2015/08/28
    function activeUnSelectAllEvet(target,values){
        var opts = $.data(target, 'combobox').options;
        opts.onUnselectAll.call(target, values);
    }
    function bindEvents(target) {
        var opts = $.data(target, 'combobox').options;
        var panel = $.data(target, "combo").panel;
        var $select = panel.parent().find(".combo-selectAll");
        $select.find("span:eq(0)").unbind("click").bind("click",
        function() {
            $(".combobox-item", panel).find("input").attr("checked", "true");
            $(".combobox-item", panel).addClass("combobox-item-selected");
            var values = [],
            texts = [];
            $(".combobox-item", panel).each(function() {
                var v = $(this).attr("value");
                values.push(v);
            });
           /* for (var i = 0; i < values.length; i++) {
                select(target, values[i]);
            }*/
			if(opts.onSelect){
				var data = $.data(target, 'combobox').data || [];
				for (var i = 0; i < data.length; i++) {
					opts.onSelect.call(target, data[i]);
				}				
			}
			setValues(target, values);
            activeSelectAllEvet(target, values)  //by  2015/08/28
        });

        $select.find("span:eq(1)").unbind("click").bind("click",
        function() {
            var panel = $.data(target, "combo").panel;
            var values = [],
            texts = [];

            $(".combobox-item", panel).find("input").each(function() {
                if ($(this).attr("checked")) {
                    var v = $(this).attr("value");
                    values.push(v);
                }
                if ($(this).attr("checked")) {
                    $(this).parent().removeClass("combobox-item-selected");
                } else {
                    $(this).parent().addClass("combobox-item-selected");
                }
                $(this).attr("checked", !this.checked);

            });
            reverseSelect(target, values);

        });
    }

    /**
   * request remote data if the url property is setted.
   */
    function request(target, url, param, remainText) {
        var opts = $.data(target, 'combobox').options;
        if (url) {
            opts.url = url;
        }
        param = param || {};
        if (opts.onBeforeLoad.call(target, param) == false) return;
        opts.loader.call(target, param,
        function(data) {
            loadData(target, data, remainText);
        },
        function() {
            opts.onLoadError.apply(this, arguments);
        });
    }

    /**
     * do the query action
     */
    function doQuery(target, value) {
        var opts = $.data(target, 'combobox').options,
        	panel = $(target).combo('panel'),
        	data = $.data(target, 'combobox').data || [],
        	vArr = [];
        
        clearValue(target);
        resetPanel(target);
        
        if(!value) {
        	 panel.find('div.combobox-item').show();
        	 return;
        }
        
        value = opts.multiple ? value.split(/[\,\，]/) : [value];
        
        panel.find('div.combobox-item').hide();
        $.each(data, function(i, sData) {
        	$.each(value, function(j, sValue) {
        		if(sValue && opts.filter.call(target, sValue, sData)) {
        			 panel.find('div.combobox-item[value="' + sData[opts.valueField] + '"]').show();
        			 if(-1 === $.inArray(sData[opts.valueField], vArr)) {
                		 vArr.push(sData[opts.valueField] || "");
                	 }
        		}
        	});
        });
        
        if(!panel.find('div.combobox-item:visible').length) {
        	$(target).combobox('hidePanel');
        }

		if(vArr.length && !opts.multiple) {//多选情况，不自动选中赋值
			setValues(target, opts.multiple ? vArr : [vArr[0]], true);
		}
    }

    function clearValue(target) {
    	var combo = $.data(target, "combo").combo;
    	combo.find("input.combo-value").remove();
    	$("<input type=\"hidden\" class=\"combo-value\">").appendTo(combo);
    }
    
    function resetPanel(target) {
    	$(target).combo('panel').find('div.combobox-item-selected').removeClass('combobox-item-selected').find(':checkbox').attr('checked', false);
    }
    /**
     * create the component
     */
    function create(target) {
        var state = $.data(target, 'combobox');
        var opts = state.options;
        $(target).addClass('combobox-f');
        $(target).combo($.extend({}, opts, {
            onShowPanel: function() {
				var ph='auto',data = $.data(target, 'combobox').data;
                $(target).combo('panel').find('div.combobox-item').show();
                scrollTo(target, $(target).combobox('getValue'));
                opts.onShowPanel.call(target);
				//在没有设置高度情况下判断是否需要显示滚动条
				if(data && data.length>10){
	             	ph = opts.panelHeight === ph ? 260 : opts.panelHeight;
		        } else{
		        	ph = opts.panelHeight === ph ? ph : opts.panelHeight;
		        }
		        $(target).combo("panel").css({
		        	height:ph
		        });
            },
            onClear: function() {
            	resetPanel(this);
            	opts.onClear.call(target);
            },
            onBlur: function(e) {
            	var text = $.data(target, "combo").combo.find("input.combo-text"),
            		sValues = $(target).combo("getValues");
            	
    			if(text.val()) {
    				if(isComboboxEmpty(target)) {
    					setValues(target, getEmptyItem(target).length ? [""] : []);
    				} else {
    					setValues(target, sValues);
    				}
    			}
            }
        }));
    }
})(jQuery);