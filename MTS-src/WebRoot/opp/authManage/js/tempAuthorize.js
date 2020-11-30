(function(){
	function TempAuth(){};
	TempAuth.prototype = {
			constructor:TempAuth,
			init:function(){
				this.initTempUser();
			},
			initTreegrid:function(target,req){
                var centerPanelW = $("#centerPanel").width();
                var centerPanelH = $("#centerPanel").height();
					target.treegrid({
                        fit:true,
						idField:'PERM_ID',
						treeField:'PERM_NAME',
						singleSelect : false,
						deepCascadeCheck : true,
						treeExpand:0,
						req:req,
						columns:[[
							{title:'PERM_ID',field:'PERM_ID',checkbox : true},
							{field:'PERM_NAME',title:'权限名称',width:centerPanelW-150}
						]],
						curRowCascadeCheck:function(curRow){
							if(curRow.PERM_TYPE < 5){
								return true;
							}
							return false;
						},
						loadFilter:$PermUtil.dataFilter
					});
			},
			initTempUser:function(){
				var HAS_USER_CODE = "1,8888" ;
			        $('#tempUserId').combogrid({
			          panelHeight:360,
			          panelWidth:500,
			          idField:'USER_CODE',
			          textField:'USER_NAME',
			          required:true,
			          fallParas:[{enable:true}],
			          req:[{
			            service:'P0001008',
			            HAS_USER_CODE:HAS_USER_CODE
			          }],
			          queryCols:[{
			              'text':'查询',
			              'icon':'icon-search',
			              collapsed:true,
			              cols:[{
			                title:'人员姓名',
			                field:'USER_NAME',
			                editor:{
			                  type:'text',
			                  options:{
			                	  validType:'val[0,64]'
			                  }
			                }
			              }]
			          }],
			          columns:[[
			            {field:'USER_CODE',title:'ID号',sortType:"number",width:70},
			            {field:'USER_NAME',title:'人员姓名',width:160},
			            {field:'ORG_NAME',title:'机构名称',width:70},
			            {field:'USER_STA',title:'人员状态',width:70,formatter:"function(value){ return getSysDictOpt('USER_STA',value); }"}
			          ]],
			          onClickRow:function(rowIndex, rowData){
			        	  var userCode = rowData["USER_CODE"];
			        	  var req = [{
				        	  service:'P0002232',
				          	  OBJ_ID:userCode,
				          	  OBJ_TYPE:'2',
				          	  AUTH_TYPE:'1',
				          	  PERM_TYPE:'5,6'
				            }];
                          var permTreePanel=$("#permTreePanel");
                          var proAuthTreePanel=$("#proAuthTreePanel");
                          $("<div id='authTree' ></div>").appendTo(permTreePanel);
                          $("<div id='proAuthTree' ></div>").appendTo(proAuthTreePanel);
			        	  $TempAuth.queryPermTree($('#authTree'),req);
			        	  $TempAuth.initTreegrid($('#proAuthTree'),req);
			        	  $TempAuth.otherOperQuery(userCode);
			        	  $("#dateMin").datetimebox("setValue","");
			        	  $("#dateMax").datetimebox("setValue","");
			          },
                        onChange:function(newValue, oldValue){
                            if(newValue==undefined&&oldValue!=''){
                                $("#authTree").empty();
                                $PermUtil.unAllSelect($('#proAuthTree'));
                            }
                        },
                        onClear:function(){
                        	$('#tempUserId').combogrid("grid").datagrid("clearSelections");
                        	$('#otherOper').combogrid("grid").datagrid("clearSelections");
                        	var req = [{
				        	  service:'P0002232',
				          	  OBJ_ID:'',
				          	  OBJ_TYPE:'2',
				          	  AUTH_TYPE:'1',
				          	  PERM_TYPE:'5,6'
				            }];
			        	  $TempAuth.queryPermTree($('#authTree'),req);
			        	  $TempAuth.initTreegrid($('#proAuthTree'),req);
			        	  $TempAuth.otherOperQuery('');
			        	  $("#dateMin").datetimebox("setValue","");
			        	  $("#dateMax").datetimebox("setValue","");
                        }
			        });
//			      },500);
			},
			queryPermTree:function(target,req){
                var wpWidth = $("#westPanel").width();
                var wpHeight = $("#westPanel").height();
					target.tree({
						width:wpWidth-10,
			            animate:true,
			            req:req,
			            conf:{
			                nodeId:'PERM_ID',
			                nodeName:'PERM_NAME',
			                treeType:'1',
			                parNode:'PAR_PERM'
			           }
					});
//				});
			},
			otherOperQuery:function(userCode){
				var HAS_USER_CODE = "1,8888" ;
			        $('#otherOper').combogrid({
			          panelHeight:360,
			          panelWidth:500,
			          idField:'USER_CODE',
			          textField:'USER_NAME',
			          required:true,
			          fallParas:[{enable:true}],
			          req:[{
			            service:'P0001008',
			            BESIDES_USER_CODE:userCode,
			            HAS_USER_CODE:HAS_USER_CODE,
			            USER_STA:'1'
			          }],
			          queryCols:[{
			              'text':'查询',
			              'icon':'icon-search',
			              collapsed:true,
			              cols:[{
			                title:'人员姓名',
			                field:'USER_NAME',
			                editor:{
			                  type:'text',
			                  options:{
			                	  validType:'val[0,64]'
			                  }
			                }
			              }]
			          }],
			          columns:[[
			            {field:'USER_CODE',title:'ID号',sortType:"number",width:70},
			            {field:'USER_NAME',title:'人员姓名',width:160},
			            {field:'ORG_NAME',title:'机构名称',width:70},
			            {field:'USER_STA',title:'人员状态',width:70,formatter:"function(value){ return getSysDictOpt('USER_STA',value); }"}
			          ]],
			          onShowPanel:function(){
			        	  if( $('#otherOper').combogrid("grid").length > 0){
                      		if(typeof $('body').find(".datagrid-queryForm form")[1] != "undefined"){
                      			$('body').find(".datagrid-queryForm form").find("input[name=USER_NAME]").val("");
                      		}
                      		$('#otherOper').combogrid("grid").datagrid("reload");
                          }
			          },
			          onClickRow:function(rowIndex, rowData){
			        	  var userCode = rowData["USER_CODE"];
			        	  var agentUserCode = $("#tempUserId").combogrid("getValue");
			        	  
			        	  //$("input[type=checkbox]").attr("checked", false);  
			        	  $("#proAuthTree").treegrid("unselectAll");
			        	 ajaxRequest({
			                  req:[{
			                	  	service:'P0002233',
			      	        		USER_CODE:userCode,
			      	        		AGENT_USER_CODE:agentUserCode
			                  }],
			                  func:function(data){
			                		var returnData = data[0];
			                		if(returnData.length>0){
			                		  	var val = "" ;
			                		  	
			                	        for(var i=0;i<returnData.length;i++){
			                	        	$("#dateMin").datetimebox("setValue",returnData[i].DATE_MIN);
			                       		  	$("#dateMax").datetimebox("setValue",returnData[i].DATE_MAX);
			                       		  	$("#proAuthTree").treegrid("select", returnData[i].PERM_ID);
			                	        }
			                	      }else{
			                	      		$("#dateMin").datetimebox("setValue","");
			                       		  	$("#dateMax").datetimebox("setValue","");
			                       		  	$("#proAuthTree").treegrid("reload");
			                	      }
			                  }
			                });
			          },
                        onClear:function(){
                          $('#otherOper').combogrid("grid").datagrid("clearSelections");
			        	  $('#proAuthTree').treegrid('unselectAll');
			        	  $("#dateMin").datetimebox("setValue","");
			        	  $("#dateMax").datetimebox("setValue","");
                        }
			        });
			},
			showPanelFun:function(){
				var agentUserCode = $("#tempUserId").combogrid("getValue");
				if(agentUserCode == ""){
					alert("请选择授权人！");
					return false ;
				}
			},
			saveProPerm:function(){
				 if(!$('#tempAuthForm').form('validate')){
	        		return false ;
	        	}
				var agentUserCode = $("#tempUserId").combogrid("getValue");
				 if(agentUserCode.trim().length == 0){
					 alert("请选择授权人！");
					 return false;
				 }
				var userCode = $("#otherOper").combogrid("getValue");
				 if(userCode.trim().length == 0){
					 alert("请选择代理人！");
					 return false;
				 }
				 var dateMin = $("#dateMin").datetimebox("getValue");
				 var dateMax = $("#dateMax").datetimebox("getValue");
				 if(dateMin=="" || dateMax==""){
					 alert("请输入代理日期！");
					 return false;
				 } 
				 
				 if($PermUtil.getTime($PermUtil.getCurentTime()) >= $PermUtil.getTime(dateMax) || $PermUtil.getTime($PermUtil.getCurentTime())  >= $PermUtil.getTime(dateMin) ){
					 alert("开始日期时间和结束日期时间不能小于当前日期时间！");
					 return false;
				 }
				 if($PermUtil.getTime(dateMin) > $PermUtil.getTime(dateMax)){
					 alert("开始日期时间不能大于结束日期时间！");
					 return false;
				 }
				 var checkNode = new Array();
				 var mrg_checkNode = $('#proAuthTree').treegrid('getSelections');
				 for ( var i = 0; i < mrg_checkNode.length; i++) {
				     checkNode.push(mrg_checkNode[i].PERM_ID) ;
				 }
				 checkNode = $PermUtil.filter(checkNode).join(",");
				 /*ajaxRequest({
				        req:[{
				        	service:'P0002235',
				        	USER_CODE:userCode,
				        	AGENT_USER_CODE:agentUserCode
				        }],
				        func:function(data){
				        }
				    }); */
				ajaxRequest({
			        req:[{
			        	service:'P0002234',
			        	USER_CODE:userCode,
			        	AGENT_USER_CODE:agentUserCode,
			        	PERM_ID:checkNode.toString(),
			        	DATE_MIN:dateMin,
			        	DATE_MAX:dateMax
			        }],
			        func:function(data){
			          //if(data[0]["service"]["flag"]=="0"){
			            alert("授权成功！");
			            var req=[{
			              service:'P0002233',
			              USER_CODE:userCode,
			              AGENT_USER_CODE:agentUserCode
			            }];
			            $TempAuth.queryPermTree($("#agrentAuthTree"),req);
			          //}
			        },
			        error:function(){
			          alert('授权失败！');
			        }
			    });
			}
	} ;
	window.$TempAuth = new TempAuth();
})();

window.$ready=function(){
    using(["treegrid","combogrid","tree"],function(){
        $TempAuth.init();
    });
};
$(window).resize(function () {
    $(".kui-layout").layout("resize");
    $("#permTreePanel").panel("resize");
    $("#proAuthTreePanel").panel("resize");
    if($("#proAuthTree").length!=0){
        $("#proAuthTree").treegrid("resize");
    }
});