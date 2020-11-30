/**
 * kui-biz - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * 
 */
//业务公用函数

    
(function() {
	  
      kui.onSelectInstType = function (record){
			var $form = $(this).closest("form");
			var $cls = ($form.find("input[comboname='INST_CLS']")[0])?$form.find("input[comboname='INST_CLS']"):$form.find("input[comboname='INST_CLSS']")
			var opts = $cls.combobox("options");
			var onData = [];
			var parData = $(this).combo("getValues")
			if(opts.data && opts.data.length > 0){
				if(parData.length==1&&parData==""){
					onData = opts.data;
				}else{
					for(var j=0;j<parData.length;j++){
						for(var i=0,len=opts.data.length; i<len; i++){
							if(opts.data[i]["dict_val"].substring(0,1) == parData[j])
								onData.push(opts.data[i]);
						}
					}
				}
			}
			$cls.combobox("clear");
			$cls.combobox("loadData",onData);
		};
		kui.onSelectInstTypes = function(record){
			var $form = $(this).closest("form");
			var $cls = ($form.find("input[comboname='INST_CLS']")[0])?$form.find("input[comboname='INST_CLS']"):$form.find("input[comboname='INST_CLSES']")
			var opts = $cls.combobox("options");
			var onData = [];
			var parData = $(this).combo("getValues")
			if(opts.data && opts.data.length > 0){
				for(var j=0;j<parData.length;j++){
					for(var i=0,len=opts.data.length; i<len; i++){
						if(opts.data[i]["dict_val"].substring(0,1) == parData[j])
							onData.push(opts.data[i]);
					}
				}

			}
			$cls.combobox("clear");
			$cls.combobox("loadData",onData);
		}
		
		kui.dataSort = function(data){
            for (var i = 0; i < data.length; i++) {
                for (var j = data.length - 1; j > 0; j--) {
                    if (Number(data[j]['pid']) < Number(data[j - 1]['pid'])) {
                        var temp = data[j - 1];
                        data[j - 1] = data[j];
                        data[j] = temp;
                    }
                }
            }
			return data;
		}
		//有逗号112,113,
		kui.returnDictMultTextComma = function(value,row,index,col){
			var arr = new Array();
			if(col.editor.options.multiple){
				if(typeof value == "string"){
					arr=value.split(',');
					return getEdtMutlDictText(arr,col);
				} else {
					return getEdtMutlDictText(arr,col);
				}
			} else {
				return value;
			}
		};
		//无逗号
		kui.returnDictMultText = function(value,row,index,col){
			var arr = new Array();
			if(col.editor.options.multiple){
				if(typeof value == "string"){
					for(var i =0; i<value.length;i++){
						arr.push(value.substring(i,i+1));
						if(i == value.length-1){
							break;
						}
					}
					return kui.getEdtMutlDictText(arr,col);
				} else {
					return kui.getEdtMutlDictText(arr,col);
				}
			} else {
				return value;
			}
		};
		//构建复选文本串
		kui.getEdtMutlDictText = function(arr,col){
			if(arr && arr.length==0){
				return ""
			}
			if(arr.length==1 && arr[0]=="@"){
				return "全部";
			}
			if(!col.editor.options.data || (col.editor.options.data && col.editor.options.data.length==0)){
				return ""
			}
			var dictData = col.editor.options.data,
				valueField = col.editor.options.valueField || "dict_val",
				textField = col.editor.options.textField || "dict_des",
				dictText = "";
			if("combotree" === col.editor.type){
				valueField = col.editor.options.nodeId;
				textField = col.editor.options.nodeName;
			}
			for(var i=0;i<dictData.length;i++){
				for(var j=0;j<arr.length;j++){
					if(dictData[i][valueField]==arr[j]){
						dictText += dictData[i][textField]+',';
					}
				}
			}
			return dictText.substring(0, dictText.length-1);
		};

		function getUserSpecialRights() {
			return g_user["specialRights"]="";
		};

		kui.filterGridMenuWithUserSpecialRights = function(menuString) {
			if(!top.sysConf || !top.sysConf.useSpecialRights) {
				return menuString;
			}
			var specialRights = {
				"8": "fileExport", // 可存盘
				"d": "printReport" // 可打印
			};
			var gridMenus = menuString.split(',');
			var gridMenuRights = getUserSpecialRights().split("");
			$.each(specialRights,function(name, value) {
				var index = -1;
				if((index = $.inArray(value, gridMenus))!==-1 && $.inArray(name, gridMenuRights)==-1) {
					gridMenus.splice(index,1);
				}
			});
			return gridMenus.join(',');
		}
	window.returnDictMultTextComma = kui.returnDictMultTextComma;
	window.returnDictMultText = kui.returnDictMultText;
	window.dataSort = kui.dataSort;
	window.onSelectInstType = kui.onSelectInstType;
	window.onSelectInstTypes = kui.onSelectInstTypes;
	window.filterGridMenuWithUserSpecialRights = kui.filterGridMenuWithUserSpecialRights;
})();