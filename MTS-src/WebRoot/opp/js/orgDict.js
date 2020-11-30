/**
 * General parameter and query page builder  - kui base js library
 * Use to initial genp and genq page.
 * 
 * Copyright(c) 2009-2012 zhangxs [ zhangxs@szkingdom.com ] 
 * 
 */

;(function($){
	var cw = $(window).width();
	var ch = $(window).height()-1;
	var general = {
		mainTable:undefined,
		secondTable:undefined,
		tableDiv: "<table id=\"#table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"\" title=\" \"></table>",
		singleTable:"<table id=\"#table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"height:"+ch+"px\" title=\" \"></table>",
		coupleTables:["<div>",
		             "<div id=\"#west_table_id#_panel\" class=\"kui-panel\" title=\"机构数据字典\">",
		             "<table id=\"#west_table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"height:200px;\"></table>",
		             "</div>",
		             "<div id=\"#center_table_id#_panel\" kui-options=\"region:'center',title:' ',split:true,iconCls:'icon-ok'\">",
		             "<table id=\"#center_table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"height:300px;\"></table>",
		             "</div>",
		             "</div>"
		             ],
		verticalLayout:["<div id=\"#west_table_id#_panel\" class=\"kui-panel\" kui-options=\"resizable:true\" style=\"height:350px;\">",
						 "<table id=\"#west_table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"\"></table>",
						 "</div>",
						 "<div id=\"#center_table_id#_panel\" title=\" \" class=\"kui-panel\" kui-options=\"resizable:true\" style=\"height:250px;margin:10px 0;\">",
						 "<table id=\"#center_table_id#\" class=\"kui-datagrid\" kui-options=\"#queryParams#\" style=\"\"></table>",
						 "</div>"
						 ],             
		init: function(){
			var pageInfo = this._getGeneralPageInfo();
			var paramInfo = this._getGeneralParam();
			$._urlparam = this._getGeneralParam();
			this._createContainer(pageInfo,paramInfo);
			
		},
		
		_createContainer: function(pageInfo,paramInfo){
			var queryParams = '';
			for(var name in paramInfo){
				if(paramInfo[name] != undefined){
					queryParams = queryParams + name + ":" + paramInfo[name] + ",";
				}
			}
			if(queryParams != ''){
				queryParams = 'queryParams:{' + queryParams.substring(0,queryParams.length-1) + '}';
			}
			
			var viewId = pageInfo.VIEW_ID;
			if(viewId){
				var views = viewId.split(",");				
				if(views.length == 1){
					var table = this.singleTable.replace("#table_id#", views[0]).replace(/#queryParams#/g, queryParams);
					$("body").append($(table));
				} else if(views.length == 2) {
					var	westId = views[0];
					var	centerId = views[1];
					var tables = this.coupleTables.join("");
					tables = tables.replace(/#west_table_id#/g, westId).replace(/#center_table_id#/g, centerId).replace(/#queryParams#/g, queryParams);
					$("body").append($(tables));
					this.mainTable = westId;
					this.secondTable = centerId;
				}
			}
			else{
				var funcData = pageInfo.TAB_CODE;
				if(funcData) funcData = funcData.split(",");
				if(!funcData || funcData.length == 1){
					var table = this.singleTable;
					var tableId =pageInfo.type+"_" + pageInfo.MENU_CODE + (pageInfo.TAB_CODE ? ("_" + pageInfo.TAB_CODE) : "");
					table = table.replace("#table_id#", tableId).replace(/#queryParams#/g, queryParams);
					$("body").append($(table));
				} else if(funcData.length == 2) {
					var	westId = pageInfo.type+"_" + pageInfo.MENU_CODE + "_" + funcData[0];
					var	centerId = pageInfo.type+"_" + pageInfo.MENU_CODE + "_" + funcData[1];
					var tables = this.coupleTables.join("");
					if(pageInfo.type == "GENQ")
						tables = this.verticalLayout.join("");
					tables = tables.replace(/#west_table_id#/g, westId).replace(/#center_table_id#/g, centerId).replace(/#queryParams#/g, queryParams);
					$("body").append($(tables));
					this.mainTable = westId;
					this.secondTable = centerId;
				}
			}
		},
		
		_getGeneralPageInfo: function(){
			var reg = new RegExp("(MENU_CODE|TAB_CODE|VIEW_ID)=([^&]*)", "g");
		    var r = window.location.search.substr(1).match(reg);
		    var info = {};
		    if (r != null) {
		    	for(var i = 0; i < r.length; i++){
		    		var rArray = r[i].split("=");
		    		info[rArray[0]] = rArray[1];
		    	}
		    }
		    if(window.location.pathname.indexOf("genericParam.html") != -1) {
		    	info["type"] = "GENP";
		    } else {
		    	info["type"] = "GENQ";
		    }
		    return info;
		},
		
		_getGeneralParam: function(){
			var param = window.location.search.substr(window.location.search.indexOf('&')+1);
			if(param != null){
				var paramArray = param.split("&");
				var info = {};
				if (paramArray != null) {
			    	for(var i = 0; i < paramArray.length; i++){
			    		var rArray = paramArray[i].split("=");
			    		if(rArray.length>1&&rArray[0] != "_"){
			    			var reg = new RegExp("\\$\\{.+\\}");
			    			var r = rArray[1].match(reg);
			    			if(r != null ){
			    				var str = rArray[1].substring(2,rArray[1].length-1);
			    				if(eval(str) != undefined){
									try{
			    						info[rArray[0]] = eval(str);
									}catch(e){}
			    				}
			    			}else{
			    				info[rArray[0]] = rArray[1];
			    			}
			    		}
			    	}
			    }
			}
			return info;
		}
	};
	
	$.general = function(){
		return {
			main: general.mainTable,
			second: general.secondTable
		};
	};
	$(function(){
		general.init();
	});
	
	$._urlparam = {}
	
})(jQuery);