/**
 * combogrid - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 combo,datagrid
 * 
 */
(function($) {
	$.fn.combogrid = function(options, param) {
		if (typeof options == "string") {
			var method = $.fn.combogrid.methods[options];
			if (method) {
				return method(this, param);
			} else {
				return $.fn.combo.methods[options](this, param);
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "combogrid");
			if (state) {
				$.extend(state.options, options);
			} else {
				state = $.data(this, "combogrid", {
					options : $.extend( {}, $.fn.combogrid.defaults,
							$.fn.combogrid.parseOptions(this), options)
				});
			}
			create(this);
			bindEvents(this);
		});
		
		
		
	};
	$.fn.combogrid.methods = {
		options : function(jq) {
			return $.data(jq[0], "combogrid").options;
		},
		grid : function(jq) {
			return $.data(jq[0], "combogrid").grid;
		},
		setValues : function(jq, values) {
			return jq.each(function() {
				setValues(this, values);
			});
		},
		setValue : function(jq, value) {
			return jq.each(function() {
				setValues(this, [ value ]);
			});
		},
		clear : function(jq) {
			return jq.each(function() {
				$(this).combogrid("grid").datagrid("clearSelections");
				$(this).combo("clear");
			});
		}
	};
	$.fn.combogrid.parseOptions = function(target) {
		var t = $(target);
		return $.extend( {}, $.fn.combo.parseOptions(target), $.fn.datagrid
				.parseOptions(target), {
			idField : (t.attr("idField") || undefined),
			textField : (t.attr("textField") || undefined),
			mode : t.attr("mode")
		});
	};
	/**
	 * 默认属性
	 * @param {Object} title
	 */
	$.fn.combogrid.defaults = $.extend( {}, $.fn.combo.defaults,
		$.fn.datagrid.defaults, {
			loadMsg : null,
			idField : null,
			textField : null,
			mode : "local",
			keyHandler : {
				up : function() {
					selectRow(this, -1);
				},
				down : function() {
					selectRow(this, 1);
				},
				enter : function() {
					selectRow(this, 0);
					$(this).combo("hidePanel");
				},
				query : function(q) {
					doQuery(this, q);
				}
			},
			filter : function(q, row) {
				var opts = $(this).combogrid("options");
				return row[opts.textField].indexOf(q) == 0;
			},
			onShowPanel : function (){
				var opts = $(this).combogrid("options"),
					panel = $.data(this, "combo").panel,
					grid = $(this).combogrid("grid"),
					queryForm = panel.find(".datagrid-queryForm form");

				if(queryForm.length) {
					queryForm.form("clear");
				}
				/**
				 * grid-reload 记录是否已经reload过一次
				 * 多次reload会引起不必要的 onSelect onCheck执行
				 */
				if(grid.length > 0 && !$(this).data("grid-reload")){
					grid.datagrid("reload");
					$(this).data("grid-reload","1");
				}
			}
		});
		
		
	function bindEvents(target){
		var opts = $.data(target, 'combogrid').options;
    	var grid = $.data(target, "combogrid").grid;
		
    	var panel = $.data(target, "combo").panel;
    	var $select = panel.parent().find(".combo-selectAll") ;
    	$select.find("span:eq(0)").unbind("click").bind("click",function(){
    		var values = [],texts = [] ;
    		var inputNode = $(".datagrid-cell-check",panel).find("input") ;
    		$(".datagrid-header-check",panel).find("input").attr("checked","true");
    		inputNode.attr("checked","true");
    		$(".datagrid-body",panel).find("tr").addClass("datagrid-row-selected");
			var rows = grid.datagrid("getRows");
			if(rows.length > 0){
				for(var i = 0; i < rows.length; i++){
					var index = grid.datagrid("getRowIndex", rows[i][opts.idField]);
					grid.datagrid("selectRow", index ,false,false);
				}
			}
			var rowsData = grid.datagrid("getSelections"),
				objResult = {};
			for ( var i = 0; i < rowsData.length; i++) {
				values.push(rowsData[i][opts.idField]);
				texts.push(rowsData[i][opts.textField]);
			}
			$(target).combo("setValues", values);
			$(target).combo("setText", texts);

			opts.onSelectAll(rowsData);
        });
        
        $select.find("span:eq(1)").unbind("click").bind("click",function(){
    		$(".datagrid-cell-check",panel).find("input").each(function(index){
    			var parentNode = $(this).parent().parent().parent() ; 
			   	if($(this).attr("checked")){
			   		parentNode.removeClass("datagrid-row-alt").removeClass("datagrid-row-selected");
			   	}else{
			   		parentNode.addClass("datagrid-row-alt").addClass("datagrid-row-selected");
			   	}
			   	var rowIndex = parentNode.attr("datagrid-row-index") ;
			   	if(this.checked){
			   		grid.datagrid("unselectRow", rowIndex);
			   	}else{
			   		grid.datagrid("selectRow", rowIndex,false,false);
			   	}
			});
			var rows = grid.datagrid("getSelectRows");
			
			var vv = [], ss = [];
			
			if(rows.length > 0){
				for ( var i = 0; i < rows.length; i++) {
					var index = grid.datagrid("getRowIndex", rows[i][opts.idField]);
					grid.datagrid("selectRow", index,false,false);
				}
			}else{
				$(".datagrid-header-check",panel).find("input").removeAttr("checked");
			}
			var rowsData = grid.datagrid("getSelections"),
				objResult = {};
			for ( var i = 0; i < rowsData.length; i++) {
				vv.push(rowsData[i][opts.idField]);
				ss.push(rowsData[i][opts.textField]);
				objResult[rowsData[i][opts.idField]] = rowsData[i][opts.textField];
			}
			
			if (!opts.multiple) {
				$(target).combo("setValues", (vv.length ? vv : [ "" ]));
			} else {
				$(target).combo("setValues", vv);
			}
			$(target).combo("setText", ss.join(opts.separator));
			opts.onUnselectAll(rowsData);
        });
	}	
		
	function create(target) {
		var opts = $.data(target, "combogrid").options;
		var grid = $.data(target, "combogrid").grid;
		$(target).addClass("combogrid-f");
		$(target).combo(opts);
		var panel = $(target).combo("panel");
		if (!grid) {
			grid = $("<table></table>").appendTo(panel);
			$.data(target, "combogrid").grid = grid;
		}
		$(target).combo($.extend({}, opts, {
        	onClear: function() {
	        	$(this).combogrid("grid").datagrid("clearSelections");
	        	opts.onClear.call(target);
        	}
       }));
		grid.datagrid($.extend( {}, opts, {
			required : false,
			border : false,
			fit : true,
			singleSelect : (!opts.multiple),
			onLoadSuccess : function(data) {
				var remainText = $.data(target, "combogrid").remainText;
				var values = $(target).combo("getValues");
				setValues(target, values, remainText);
				opts.onLoadSuccess.apply(target, arguments);
			},
			onClickRow : onClickRow,
			onSelect : function(rowIndex, rowData) {
				retrieveValues();
				opts.onSelect.call(this, rowIndex, rowData);
			},
			onUnselect : function(rowIndex, rowData) {
				retrieveValues();
				opts.onUnselect.call(this, rowIndex, rowData);
			},
			onSelectAll : function(rows) {
				retrieveValues();
				opts.onSelectAll.call(this, rows);
			},
			onUnselectAll : function(rows) {
				if (opts.multiple) {
					retrieveValues();
				}
				opts.onUnselectAll.call(this, rows);
			},
            onLoadSuccess:function () {
                if (opts.onLoadSuccess) {
                    opts.onLoadSuccess()
                }
                f(target);
            }
		}));
        function f(k) {
            var opts = $.data(k, "combogrid").options;
            if(opts.fallParas[0].enable){
	            	return false;
	        }
            /*var h = $.data(k, "combogrid").grid;
            var j = $("<span style='float:left;height:30px;line-height:30px;color:red;cursor:pointer;'>&nbsp;&nbsp;清空</span>");
            h.datagrid("getPanel").find("div.pagination-info").after(j);
            j.on("click", function () {
                $(k).combo("setValues", "").combo("setText", "");
                h.datagrid("clearSelections");
                $(k).combo("hidePanel");
//                i.onClearData.call();
            });*/
            $(target).combogrid("setValues", $(target).combo("getValues"));
        }
        
		function onClickRow(rowIndex, row) {
			$.data(target, "combogrid").remainText = false;
			retrieveValues();
			if (!opts.multiple) {
				$(target).combo("hidePanel");
			}
			opts.onClickRow.call(this, rowIndex, row);
		};
		function retrieveValues() {
			var remainText = $.data(target, "combogrid").remainText;
			var grid = $.data(target, "combogrid").grid;
			//var rows = grid.datagrid("getSelectRows");
			var rows = grid.datagrid("getSelections");
			var vv = [], ss = [];
			for ( var i = 0; i < rows.length; i++) {
				vv.push(rows[i][opts.idField]);
				ss.push(rows[i][opts.textField]);
			}
			if (!opts.multiple) {
				$(target).combo("setValues", (vv.length ? vv : [ "" ]));
			} else {
				$(target).combo("setValues", vv);
			}
			if (!remainText) {
				$(target).combo("setText", ss.join(opts.separator));
			}
			
		};
	};
	function selectRow(target, step) {
		var opts = $.data(target, "combogrid").options;
		var grid = $.data(target, "combogrid").grid;
		var length = grid.datagrid("getRows").length;
		$.data(target, "combogrid").remainText = false;
		var index;
		var rows = grid.datagrid("getSelections");
		if (rows.length) {
			index = grid.datagrid("getRowIndex", rows[rows.length - 1][opts.idField]);
			index += step;
			if (index < 0) {
				index = 0;
			}
			if (index >= length) {
				index = length - 1;
			}
		} else {
			if (step > 0) {
				index = 0;
			} else {
				if (step < 0) {
					index = length - 1;
				} else {
					index = -1;
				}
			}
		}
		if (index >= 0) {
			grid.datagrid("clearSelections");
			grid.datagrid("selectRow", index);
		}
	};
	function setValues(target, values, remainText) {
		var opts = $.data(target, "combogrid").options;
		var grid = $.data(target, "combogrid").grid;
        var rows = grid.datagrid("getOriginalRowsData");  //获取所有的行数据

        var ss = [];
		for ( var i = 0; i < values.length; i++) {
			var index = grid.datagrid("getRowIndex", values[i]);
			if (index >= 0) {
				grid.datagrid("selectRow", index);
				ss.push(rows[index][opts.textField]);
			} else {
                var tag = true;
                for(var j = 0,len = rows.length; j<len; j++ ){
                    if(values[i] === rows[j][opts.idField]){
                        tag = false;
                        ss.push(rows[j][opts.textField]);
                        break;
                    }
                }
                tag && ss.push(values[i]);
			}
		}
        //在组件异步获取后台数据时，而又调用setValue方法会致文本显示错误，故注销下面return
//		if ($(target).combo("getValues").join(",") == values.join(",")) {
//			return;
//		}
		$(target).combo("setValues", values);
		if (!remainText) {
			$(target).combo("setText", ss.join(opts.separator));
		}
	};
	function doQuery(target, q) {
		var opts = $.data(target, "combogrid").options;
		var grid = $.data(target, "combogrid").grid;
		$.data(target, "combogrid").remainText = true;
		if (opts.multiple && !q) {
			setValues(target, [], true);
		} else {
			setValues(target, [ q ], true);
		}
		if (opts.mode == "remote") {
			grid.datagrid("clearSelections");
			grid.datagrid("load", {
				q : q
			});
		} else {
			if (!q) {
				return;
			}
			var rows = grid.datagrid("getRows");
			for ( var i = 0; i < rows.length; i++) {
				if (opts.filter.call(target, q, rows[i])) {
					grid.datagrid("clearSelections");
					grid.datagrid("selectRow", i);
					return;
				}
			}
		}
	};
	
})(jQuery);
