/**
 * statistics - KINGDOM-UI
 * 
 * Copyright (c) 2009-2014 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies: leiyong 2014-10-10 datagrid统计插件
 * 	 
 * 
 */
;(function($) {
    $.fn.statistics = function(options, context) {
        if (typeof options == "string") {
            return $.fn.statistics.methods[options](this, context);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "statistics");
            if (state) {
                $.extend(state.options, options);
            } else {
				$.data(this, 'statistics', {
                    options: $.extend({},
						$.fn.statistics.defaults, $.fn.statistics.parseOptions(this), options)
                });
            }
            createPanel(this);
        });
    };

    $.fn.statistics.methods = {
        options: function(jq) {
            return $.data(jq[0], "statistics").options;
        },
        showPanel: function(jq) {
            return jq.each(function() {
                isShowPanel(this, true);
            });
        },
        hidePanel: function(jq) {
            return jq.each(function() {
                isShowPanel(this, false);
            });
        },
		refresh:function(jq){
			return jq.each(function() {
                refresh(this);
            });
		}
    };

    $.fn.statistics.parseOptions = function(target) {
        return $.extend({}, $.parser.parseOptions(target));
    };
	
	

    $.fn.statistics.defaults = {
		columns: undefined,
		refreshed:true,
		rows:undefined,
		dc:undefined,
		onLoaded:function(){
		}
       
    };
	
	function isShowPanel(target,isShow){
		var data = $.data(target, "statistics");
		if(!data){
			alert("无数据统计！");
			return false;
		}
        var opts = data.options;
		var statistics = opts.dc.view.find(".datagrid-footer");
		isShow ? statistics.show() : statistics.hide();
		opts.onLoaded.call(target);
	};
	

	
	//刷新时重新加载数据
	function refresh(target){
		var data = $.data(target, "statistics");
        var opts = data.options;
		opts.refreshed = false;
		createPanel(target);
	};
	
	//分析统计数据
	function getAnalyzeData(target,rows,columns){
	
		var statisticsType = getStatisticsType(target);
		
		for(var j=0;j<columns.length;j++){
			var col = columns[j],		//字段属性
				field = col["field"],   //字段名
				val = {};
			
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				if($.isNumeric(row[field])){
					for(var key in statisticsType){
						if(col[key]){
							var tmp = statisticsType[key].getValue(val,rows,row,field,i);
							if(i==rows.length-1){
								statisticsType[key].item.push({
									"field":col["field"],
									"title":col["title"],
									"formatter":col[key+"formatter"],
									"value":tmp
								});
							}
						}
					}
				}
			}
		}
		return statisticsType;
	};
	
	//创建统计数据区域
	function createPanel(target) {
        var data = $.data(target, "statistics"),
			opts = data.options,
			columns = opts.columns,
			rows = opts.rows,
			dc = opts.dc,
			fields = opts.fields,
			$statistics = dc.view.nextAll(".datagrid-row-statistics");
        if ($statistics.length > 0) {
            if ($statistics.is(':hidden')) {
				if(!opts.refreshed){
					$statistics.remove();
				}else{
					$statistics.show();
					opts.onLoaded.call(target);
					return false;
				}
            }else{
				$statistics.remove();
			}
        }
		
		var analyzeData = getAnalyzeData(target,rows,columns),  //四种所有的统计数据
			index=0,
			statistics = [];

		statistics.push("<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
		for(var key in analyzeData){ 
			if(analyzeData[key]["item"].length>0){
				statistics.push("<tr class=\"datagrid-header-row\" datagrid-row-index=\"" + index + "\">");
				var row = {},stsDescField,stsDescFieldIndex = opts.stsDescFieldIndex;
				for(var i=0;i<analyzeData[key]["item"].length;i++){
					var item =analyzeData[key]["item"][i],
						value = item.value,
						field  = item.field,
						formatter = item["formatter"];
						
                    if (typeof formatter == "string") {
                    	eval("formatter=" + formatter);
                    }
					if($.isFunction(formatter)){
						value = formatter.call(null,value);
					}
					row[field] = value;
				}
				if(stsDescFieldIndex>=fields.length)stsDescFieldIndex=fields.length-1;
				stsDescField = fields[stsDescFieldIndex]; 
				row[stsDescField] = analyzeData[key]["name"];//默认用第二个字段作为统计描述字段
				statistics.push(opts.view.renderRow.call(this,target, fields, false, index, row));
                statistics.push("</tr>");
				index++;
			}
		}
		
		statistics.push("</tbody></table>");
		var footer = dc.view.find(".datagrid-view2").find(".datagrid-footer-inner");
		footer.empty();
		$(statistics.join("")).appendTo(footer);
		footer.show();
		opts.refreshed = true;
		opts.onLoaded.call(target);
    };
	
	//获取统计类型
	function getStatisticsType(target){
		var data = $.data(target, "statistics"),
			opts = data.options,
			statisticsTexts = opts.statisticsTexts || [];
		return {
			max:{
				name:statisticsTexts[0] || "最大值",
				item:[],
				getValue:function(val,rows,row,field,i){
					return getMax(val,rows,row,field,i);
				}
			},
			min:{
				name:statisticsTexts[1] || "最小值",
				item:[],
				getValue:function(val,rows,row,field,i){
					return getMin(val,rows,row,field,i);
				}
			},
			avg:{
				name:statisticsTexts[2] || "均值",
				item:[],
				getValue:function(val,rows,row,field,i){
					return getAvg(val,rows,row,field,i);
				}
			},
			sum:{
				name:statisticsTexts[3] || "合计",
				item:[],
				getValue:function(val,rows,row,field,i){
					return getSum(val,rows,row,field,i);
				}
			}
		};
	};
	//最大值
	function getMax(val,rows,row,field){
		var key = "max"+field,
			fieldVal = Number(row[field]),
			n = val[key] || 0;
		if(n < fieldVal){
			val[key] = fieldVal;
		}
		return val[key];
	};

	//最小值
	function getMin(val,rows,row,field){
		var key = "min"+field,
			fieldVal = Number(row[field]),
			n = val[key] || row[field];
		if(n >= fieldVal){
			val[key] = fieldVal;
		}
		return val[key];	
	};
	
	//均值
	function getAvg(val,rows,row,field,i){
		var key = "avg"+field,
			n = val[key] || 0;
			
		val[key] = n + row[field]*1;
		if(rows.length-1 == i){
			val[key] = val[key]/rows.length
		}
		return val[key];	
	};
	
	//合计
	function getSum(val,rows,row,field){
		var key = "sum"+field,
			n = val[key] || 0;
		
		val[key] = n + row[field]*1;
		return val[key];
	};
	//根据字符计算所占的长度
	function caculateCharLength(cString) {
		cString = cString+""; // 确保是字符串类型
        var len = 0;
        if (!cString || cString == "") return len;
        for (i = 0; i < cString.length; i++) {
            if (cString.charCodeAt(i) > 256) {
                len += 2 + 12;
            } else if (cString.charCodeAt(i) < 65) {
                len += 8; // 7
            } else {
                len += 9; //   
            }
        }
        return len;
    }

})(jQuery);