(function(){
	var Utils = function(){};
	Utils.prototype = {
			/**
			 * 去除数组arr1在数组arr2中的相同元素
			 * @param arr1 
			 * @param arr2 
			 * @returns arr2
			 */
			getDiffVal : function(arr1,arr2){
				var temp = $.extend([], arr2);
				for(var i= 0,len = arr1.length;i<len;i++) {
					for (var index = $.inArray(arr1[i], temp); index >= 0;index = $.inArray(arr1[i], temp)) {
						temp.splice(index, 1);
					}
				}

				var result = [];
				for(var i= 0,len = temp.length;i<len;i++) {
					if($.inArray(temp[i], result)<0) {
						result.push(temp[i]);
					}
				}
				return result;
			},
			/**
			 * 获得arr1和arr2相同的元素
			 * @param arr1
			 * @param arr2
			 * @returns {Array}
			 */
			getSameVal:function(arr1,arr2){
				var sameVal = new Array();
				for(var i=0;i<arr1.length;i++){
					for(var j=0;j<arr2.length;j++){
						if(arr1[i]==arr2[j]){
							if($.inArray(arr1[i],sameVal)<0) {
								sameVal.push(arr1[i]);
							}
						}
					}	
				}
				return sameVal ;
			},
			dataFilter:function(data){
				if (!data[0]){
					return {
						total : data[0].length,
						rows : data[0]
					};
				}
				if (data[0].length > 0 && data[0].length > 0) {
					for ( var i = 0, len = data[0].length; i < len; i++) {
						if (data[0][i]['PAR_PERM'] == "0") {
						} else {
							data[0][i]['pid'] = data[0][i]['PAR_PERM'];
						}
					}
				}else{
					$(".datagrid-header-check").find("input").removeAttr("checked");
				}
				return {
					total : data[0].length,
					rows : data[0]
				};
			},
			unAllSelect:function(treeObj){
				treeObj.treegrid('unselectAll');
			},
			filter:function(arr){
				for ( var i = 0, o; o = arr[i]; i++)
				for ( var j = arr.length - 1; j > i; j--)
					if (arr[j] === o)
						arr.splice(j, 1);
				return arr;
			},
			setVal:function(consType,id,consMin,consMax,cType){
				if(id.indexOf('_tMin') > -1 && cType == 1){
					$("#"+id).val(consMin);
				}else if(id.indexOf('_tMax') > -1  && cType == 1){
					$("#"+id).val(consMax);
				}else if(id.indexOf('_dMin') > -1  && cType == 2){
					$("#"+id).datebox("setValue",consMin);
				}else if(id.indexOf('_dMax') > -1  && cType == 2){
					$("#"+id).datebox("setValue",consMax);
				}else if(id.indexOf('_dtMin') > -1  && cType == 3){
					$("#"+id).datetimebox("setValue",consMin);
				}else if(id.indexOf('_dtMax') > -1  && cType == 3){
					$("#"+id).datetimebox("setValue",consMax);
				}else if(id.indexOf('_ipMin') > -1  && cType == 4){
					$("#"+id).val(consMin);
				}else if(id.indexOf('_ipMax') > -1  && cType == 4){
					$("#"+id).val(consMax);
				}
			},
			fillData:function(objType,objId,permId){
				ajaxRequest({
			        req:[{
			        	service:'P0002223',
			        	PERM_ID:permId,
			        	OBJ_TYPE:objType,
		            	OBJ_ID:objId,
		            	ASS_TYPE:'1',
		            	AUTH_TYPE:'1'
			        }],
			        func:function(data){
			        	//if(data[0]["service"]["flag"]=='0'){
			        		var d = data[0];
			        		//如果有约束就填充
			        	    for(var i = 0 ;i < d.length ; i++){
			        		   var cId = d[i].CONS_ID;
			           		   var cMax = d[i].CONS_MAX;
			           		   var cMin = d[i].CONS_MIN;
			           		   var cType = d[i].CONS_TYPE; 
			           		   var pId = d[i].PERM_ID;
			           		   $('#consForm').find('tr').each(function(index,tr){
			        					$(tr).find('input').each(function(i,input){
			        						var id = $(input).attr("id");
			        						if(typeof(id) != "undefined"){
			        							if(id.indexOf(pId)>0 && id.indexOf(cId)>0){
			        								$PermUtil.setVal(cType,id,cMin,cMax,cType);
			        							}
			        							
			        						}
			        					});
			        				});
			        		}
			        	}
			        //}
				});
			},
			permConsValsFun:function(target){
				var permConsVals = '';
				$('#'+target).find('tr').each(function(index,tr){
					var permConsVal = '';
					$(tr).find('input').each(function(i,input){
						var id = $(input).attr("id");	
						if(typeof(id) != "undefined"){
							var arr = id.split('_');
							if(arr.length == 2){
								permConsVal = permConsVal + $('#'+id).val() +",";
							}else if(arr.length == 3){
								if(id.indexOf('_tM') > -1){
									permConsVal = permConsVal + $('#'+id).val() +",";
								}else if(id.indexOf('_dM') > -1){
									permConsVal = permConsVal + $('#'+id).datebox("getValue") +",";
								}else if(id.indexOf('_dtM') > -1){
									permConsVal = permConsVal + $('#'+id).datetimebox("getValue") +",";
								}else if(id.indexOf('_ip') > -1){
									permConsVal = permConsVal + $('#'+id).val() +",";
								}
							}
							
						}
					});
					if(permConsVal.length > 1){
						permConsVal = permConsVal.substring(0,permConsVal.length-1);
					}
					permConsVals = permConsVals + permConsVal + '|' ;
				});
				if(permConsVals.length > 1 ){
					permConsVals = permConsVals.substring(0,permConsVals.length-1);
				}
				return permConsVals ;
			},
			consReq:function(objType,objId,permId,permConsVals){
				ajaxRequest({
		   			async:false,
		            req:[{
		            	service:'P0002230',
		            	OBJ_TYPE:objType,
		            	OBJ_ID:objId,
		            	ASS_TYPE:'1',
		            	PERM_ID:permId,
		            	AUTH_TYPE:'1',
		            	PERMCONSVALS:permConsVals 
		            }],
		            func:function(data){
		            	alert("约束条件设置成功！");
		            	$("#consPermDialog").dialog("close");
		            }
		        });
			},
			getTime:function(dataTime){
				var year = dataTime.substring(0,4);
				var month = Number(dataTime.substring(4,6)) - 1 ;
				var date = Number(dataTime.substring(6,8)) ;
				var time = dataTime.substring(9) ;
				var t = time.split(":");
				var h = Number(t[0]);
				var m = Number(t[1]);
				var s = Number(t[2]);
				var _date = new Date(year,month,date,h,m,s);
				return _date.getTime();
			},
			vaildSpecialChar:function(v){
				
			},
			getCurentTime:function()
		    { 
		        var now = new Date();
		       
		        var year = now.getFullYear();       //年
		        var month = now.getMonth() + 1;     //月
		        var day = now.getDate();            //日
		       
		        var hh = now.getHours();            //时
		        var mm = now.getMinutes();          //分
		        var ss = now.getSeconds();          //分
		       
		        var clock = year + "";
		       
		        if(month < 10)
		            clock += "0";
		       
		        clock += month + "";
		       
		        if(day < 10)
		            clock += "0";
		           
		        clock += day + " ";
		       
		        if(hh < 10)
		            clock += "0";
		           
		        clock += hh + ":";
		        if (mm < 10) clock += '0'; 
		        clock += mm + ":";
		        
		        if (ss < 10) clock += '0'; 
		        clock += ss;
		        
		        return clock; 
		    } 
			
			
	};
	window.$PermUtil = new Utils();
})();


