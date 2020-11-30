(function(){
	function SpecialAuth(){};
	SpecialAuth.prototype = {
			constructor:SpecialAuth,
			init:function(){
				this.userQuery();
				this.initTreegrid();
				this.bindEvent();
			},
			bindEvent:function(){
				$("#txtUser").bind({
					keyup:function(e){
						if(e.keyCode==8){
							$SpecialAuth.permInfoQuery();
						}else if(e.keyCode==13){
							$SpecialAuth.permInfoQuery();
						}
					}
				});
			},
			permInfoQuery:function(){
				var val = $("#txtUser").val();
				var regularExpression = /^\d*$/;
                var flag = regularExpression.test(val);
                $(".datagrid-header-check").find("input").removeAttr("checked");
                if(val.length>18){
		    		alert('ID号不能大于18位！');
		    		$("#txtUser").val("");
				    return false;
		    	}
                if(!flag){
                	val = -2 ;
                }else{
                	val = (val == "" ? -2 : val) ;
                }
        		
        		$SpecialAuth.queryPermFun('P0002237',val);
        		$SpecialAuth.userInfo(val);
			},
			userQuery:function(){
					$("#txtUser").autocomplete({
						width: 200,
						req:[{service:'P0001001',USER_STA:'1'}],
						keyField:'USER_CODE',
						params:'QUERY_PARAM',
						sourceField:'USER_CODE,USER_NAME,ORG_NAME',
						matchCase:true,
						useCache:false,
						required:true,
						onSelect:function(value){
							var userCode = value ;
							$("body").removeData("speciaPermData");
							$SpecialAuth.queryPermFun('P0002237',userCode);
							$SpecialAuth.userInfo(userCode);
			            }/*,
			            onChange: function(newValue, oldValue) {
			            	$("body").removeData("speciaPermData");
			            	$SpecialAuth.permInfoQuery();
			            }*/
					});
			},
			initTreegrid:function(){
                var wpWidth = $("#westPanel").width();
                var wpHeight = $("#westPanel").height();
					$('#authTree').treegrid({
                        fit: true,
						idField:'PERM_ID',
						treeField:'PERM_NAME',
						singleSelect : false,
						deepCascadeCheck : true,
						treeExpand:0,
						req:[{
				            service:'P0002231',
				            PERM_TYPE:'4'
				          }],
						columns:[[
							{title:'PERM_ID',field:'PERM_ID',checkbox : true},
							{field:'PERM_NAME',title:'权限名称',sortable:false,width:wpWidth * 2 / 3},
							{field:'CONS_ID',title:'约束操作',sortable:false,width: (wpWidth / 3) - 100,align:'center',formatter : function(value,row,index) {
								if(value != ""){
									return "<div style='border: 1px solid #A0A0A0;cursor:pointer;width: 60px;height:16px;background-color:#F0F0F0 ' align='center' onclick='$SpecialAuth.createConsForm("+row.PERM_ID+",event, \""+row.PERM_NAME+"\");return false;' >约束</div>";
								}
							}}
						]],
						curRowCascadeCheck:function(curRow){
							if(curRow.PERM_TYPE < 5){
								return true;
							}
							return false;
						},
						loadFilter:$PermUtil.dataFilter
					});
//				});
			},
			queryPermFun:function(serv,objId,ObjType){
				$PermUtil.unAllSelect($('#authTree'));
				ajaxRequest({
			        req:[{
			        	  service:serv,
			        	  USER_CODE:objId
			            }],
			        func:function(data){
			        	$SpecialAuth.succDataDeal(data);
			        }
			    });
			},
			userInfo:function(userCode){
				ajaxRequest({
			        req:[{
			        	  service:"P0001001",
			        	  USER_CODE:userCode,
			        	  USER_STA:'1'
			            }],
			        func:function(data){
			        	var returnData = data[0] ;
			    		if(returnData.length>0){
		    				$("#userCode").text(returnData[0].USER_CODE) ;	 
		    				$("#userName").text(returnData[0].USER_NAME) ;
		    				$("#org").text(returnData[0].ORG_NAME) ;
		    				/*$("#role").text(returnData[0].ROLES_NAME)  ;*/
		    				$("#post").text(returnData[0].POST_NAME) ;
		    				$("#mail").text(returnData[0].EMAIL) ;
		    				$("#tel").text(returnData[0].MOBILE) ;
			    		}else{
			    			$("#userCode").text("") ;	 
		    				$("#userName").text("") ;
		    				$("#org").text("") ;
		    				/*$("#role").text("")  ;*/
		    				$("#post").text("") ;
		    				$("#mail").text("") ;
		    				$("#tel").text("") ;
			    		}
			        }
			    });
			},
			succDataDeal:function(data){
				var returnData = data[0] ;
				if(returnData.length>0){
				  $("body").removeData("speciaPermData");
				  $("body").data("speciaPermData",returnData);
			      for(var i=0;i<returnData.length;i++){
			      	var permId = returnData[i].PERM_ID ;	
			      	$("#authTree").treegrid("select",permId);
			      } 
			   }
			},
			createConsForm:function(id,event,PERM_NAME){
				var e = (event) ? event : window.event;
				 if (window.event) {//IE
				  e.cancelBubble=true;
				 } else { //FF
				  e.stopPropagation();
				 }
				var tr = '';
				ajaxRequest({
			        req:[{
			        	service:'P0002222',
			        	PERM_ID:id
			        }],
			        func:function(data){
			        	//if(data[0]["service"]["flag"]=='0'){
			        		var d = data[0];
			        		$("#perm_id").val(id);
			        		if(d.length > 0){
			        			$("#consForm").children().remove();
			        		}
			        		
			        		for(var i = 0 ;i < d.length ; i++){
			            		  var permConData = data[0][i];
			            		  var permId = permConData.PERM_ID ;
			            		  var consId = permConData.CONS_ID ;
			            		  var consName = permConData.CONS_NAME;
			            		  var consType = permConData.CONS_TYPE;
			            		  if(consType == 1){
			                		  tr = tr + "<tr><td style='width: 100px;'><span>"+consName+"：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始时间：</td ><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_"+permId+"' value='"+permId+"'/><input type='hidden' id='consId_"+consId+"' value='"+consId+"'/><input type='text' id='perId"+permId+"_consId"+consId+"_tMin' class='kui-timespinner' style='width:128px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId"+permId+"_consId"+consId+"_tMax' class='kui-timespinner' style='width:128px'/></td></tr>";
			                	  }else if(consType == 2){
			                		  tr = tr + "<tr><td style='width: 100px;'><span>"+consName+"：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_"+permId+"' value='"+permId+"'/><input type='hidden' id='consId_"+consId+"' value='"+consId+"'/><input type='text' id='perId"+permId+"_consId"+consId+"_dMin' class='kui-datebox' style='width:133px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期：</td><td style='padding-top: 10px;width: 200px;'><input type='text' class='kui-datebox' id='perId"+permId+"_consId"+consId+"_dMax' style='width:133px'/></td></tr>";
			                	  }else if(consType == 3){
			                		  tr = tr + "<tr><td style='width: 100px;'><span>"+consName+"：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_"+permId+"' value='"+permId+"'/><input type='hidden' id='consId_"+consId+"' value='"+consId+"'/><input type='text' id='perId"+permId+"_consId"+consId+"_dtMin' class='kui-datetimebox' style='width:133px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId"+permId+"_consId"+consId+"_dtMax' class='kui-datetimebox' style='width:133px'/></td></tr>";
			                	  }else if(consType == 4){
			                		  tr = tr + "<tr><td style='width: 100px;'><span>"+consName+"：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>IP段：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_"+permId+"' value='"+permId+"'/><input type='hidden' id='consId_"+consId+"' value='"+consId+"'/><input type='text' id='perId"+permId+"_consId"+consId+"_ipMin' class='kui-validatebox' kui-options=\"validType:'ip'\" style='width:130px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>至：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId"+permId+"_consId"+consId+"_ipMax' class='kui-validatebox' kui-options=\"validType:'ip'\" style='width:130px'/></td></tr>";
			                	  }
			            	}
			        		
			        		$("#consForm").append(tr);
			          	    $.parser.director($("#consForm"));
			          	 	 var operId = $('#txtUser').val();
			    			if(operId==''){
			    		       alert('请选择人员！');
			    		       return;
			    		    }
			    			if(typeof(operId) != "undefined"){
			    				$SpecialAuth.fillData('2',operId,permId);
			    			}
			    			$SpecialAuth.consCondiction(PERM_NAME);
			        	//}
			        }
				});
			},
			fillData:function(objType,objId,permId){
				ajaxRequest({
			        req:[{
			        	service:'P0002223',
			        	PERM_ID:permId,
			        	OBJ_TYPE:objType,
			        	OBJ_ID:objId,
			        	ASS_TYPE:'1',
			        	AUTH_TYPE:'3'
			        }],
			        func:function(data){
			        	//if(data[0]["service"]["flag"]=='0'){
			        		var d = data[0] ;
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
			        	//}
			        }
				});
			},
			consCondiction:function(PERM_NAME){
			     	$("#consPermDialog").dialog({
			     		modal:true,
			     		title:PERM_NAME,
			     		width:730,
			     		height:230,
			     		buttons:[{
							text:'保存',
							iconCls:'icon-save',
							handler:function(){$SpecialAuth.saveCons(PERM_NAME)}
						},{
							text:'取消',
							iconCls:'icon-cancel',
							handler:function(){
								$("#consPermDialog").dialog("close");
							}
						}]
			     	});
			     	$.parser.director($("#consForm"));
				$("#consForm").find(".combo-text").attr("readonly","readonly");
			},
			consReq:function(objType,objId,permId,permConsVals,PERM_NAME){
				ajaxRequest({
					async:false,
			        req:[{
			        	service:'P0002230',
			        	OBJ_TYPE:objType,
			        	OBJ_ID:objId,
			        	ASS_TYPE:'1',
			        	PERM_ID:permId,
			        	AUTH_TYPE:'3',
			        	PERMCONSVALS:permConsVals 
			        }],
			        func:function(data){
			        	alert(PERM_NAME+"约束条件设置成功！");
			        	$SpecialAuth.queryPermFun('P0002237',objId);
			        	$("#consPermDialog").dialog("close");
			        }
			    });
			},
			saveCons:function(PERM_NAME){
				if(!$("#consForm").form('validate')) return false;
				var permConsVals = $PermUtil.permConsValsFun("consForm");
				var permId = $("#perm_id").val(); 
				var userId = $('#txtUser').val();
				if ($SpecialAuth.compTime(permConsVals) === false) return false;
				$SpecialAuth.consReq('2',userId,permId,permConsVals,PERM_NAME);
			},
			saveOpeSpeciaPerm:function(){
				var operId = $('#txtUser').val();
				var detailUserCode = $('#userCode').text();
				var reg = new RegExp("^[0-9]*$");
				if(!$('#specialAuthForm').form('validate')){
	        		return false ;
	        	}
				if(operId=='' || !reg.test(operId)){
			       alert('请选择正确的ID号！');
			       return false;
			    }else {
			    	if(operId.length>18){
			    		alert('ID号不能大于18位！');
			    		$("#txtUser").val("");
					    return false;
			    	}
			    	if(operId != detailUserCode){
			    		alert('请确认选择了ID号！');
			    		return false;
			    	}
			    }
				ajaxRequest({
			        req:[{
			        	service:'P0001001',
			        	USER_CODE:operId
			        }],
			        func:function(data){
			        	//if(data[0]["service"]["flag"]=='0'){
			        		var d = data[0];
			        		if(d.length == 0){
			        			alert("该人员不存在!");
			        			return false ;
			        		}else if(d.length > 0){
			        			if(d[0].USER_STA == '2'){
			        				alert("该人员已被冻结!");
				        			return false ;
			        			}else if(d[0].USER_STA == '9'){
			        				alert("该人员已被注销!");
				        			return false ;
			        			}
			        			$SpecialAuth.ajaxRequestFun('2',operId);
			        		}
			        	//}
			        }
			   });
			},
			ajaxRequestFun:function(objType, objId){
				var oldPermId = new Array();
				var returnData = $("body").data("speciaPermData");
				if(typeof(returnData) != 'undefined' ){
				    for(var i=0;i<returnData.length;i++){
				    	oldPermId.push(returnData[i].PERM_ID) ;	
				    }
				}
				var newPermId = new Array();
				var rows = $('#authTree').treegrid('getSelections');
				for(var i=0;i<rows.length;i++){
					newPermId.push(rows[i].PERM_ID) ;
			    }
				
				var sameVal = $PermUtil.getSameVal(oldPermId,newPermId);
				var delId = $PermUtil.getDiffVal(sameVal,oldPermId);
				var addId = $PermUtil.getDiffVal(sameVal,newPermId);
				ajaxRequest({
					async:false,
			        req:[{
			        	service:'P0002229',
			        	DEL_PERM_ID:delId.toString(),
			        	ADD_PERM_ID:addId.toString(),
			        	OBJ_ID:objId,
			        	OBJ_TYPE:objType,
			        	ASS_TYPE:'1',
			        	AUTH_TYPE:'3'
			        }],
			        func:function(data){
			           // if(data[0]["service"]["flag"]){
			            	$("body").removeData("speciaPermData");
			            	$SpecialAuth.queryPermFun('P0002237',objId);
			                alert("授权成功！");
			            //}
			        },
			        error:function(){
			            //alert("授权失败！");
			        }
			   });
			},
			compTime: function(permConsVals) {
				var consArr = permConsVals.split("|");
		    	for(var k=0;k<consArr.length;k++) {
		        	var consObjArr = consArr[k].split(",");
		        	if (consObjArr[2] != "" && consObjArr[3] != "") {
		        		if (consObjArr[2].length == 8 && consObjArr[3].length == 8) {
		        			var strDate = new Date(consObjArr[2].substring(0,4)+'/'+consObjArr[2].substring(4,6)+'/'+consObjArr[2].substring(6,8));
		        			var endDate = new Date(consObjArr[3].substring(0,4)+'/'+consObjArr[3].substring(4,6)+'/'+consObjArr[3].substring(6,8));
		        			if (strDate > endDate) {
		            			alert("结束日期不能小于开始日期！");
		            			return false;
		            		}
		        		} else if (consObjArr[2].length == 5 && consObjArr[3].length == 5){
		        			var sDate = new Date;
		        			var eDate = new Date;
		        			var s = consObjArr[2].split(/\:/g); 
		        			var e = consObjArr[3].split(/\:/g);
		        		    sDate.setHours(s[0]); 
		        		    sDate.setMinutes(s[1]);
		        		    eDate.setHours(e[0]); 
		        		    eDate.setMinutes(e[1]);
		        		    if (sDate > eDate) {
		        				alert("结束时间不能小于开始时间！");
		        				return false;
		        			}
		        		}
		        	}  else if (consObjArr[2].length == 17 && consObjArr[3].length == 17){
	        			var time1Arr = consObjArr[2].split(" ");
	        			var time2Arr = consObjArr[3].split(" ");
	        			var stimedate = new Date(time1Arr[0].substring(0,4)+'/'+time1Arr[0].substring(4,6)+'/'+time1Arr[0].substring(6,8));
	        			var etimedate = new Date(time2Arr[0].substring(0,4)+'/'+time2Arr[0].substring(4,6)+'/'+time2Arr[0].substring(6,8));
	        			var s = time1Arr[1].split(/\:/g); 
	        			var e = time2Arr[1].split(/\:/g);
	        			stimedate.setHours(s[0]); 
	        			stimedate.setMinutes(s[1]);
	        			stimedate.setSeconds(s[2]);
	        			etimedate.setHours(e[0]); 
	        			etimedate.setMinutes(e[1]);
	        			etimedate.setSeconds(e[2]);
	        		    if (stimedate > etimedate) {
	        				alert("结束时间不能小于开始时间！");
	        				return false;
	        			}
	        		}
		        }
		    	return true;
			}
	};
	window.$SpecialAuth = new SpecialAuth();
})();

window.$ready=function(){
    using(["autocomplete","treegrid","dialog",""],function(){
        $SpecialAuth.init();
    });
};
$(window).resize(function () {
    $(".kui-layout").layout("resize");
    $("#authTreePanel").panel("resize");
    $("#operPanel").panel("resize");
    $("#authTree").treegrid("resize");
});