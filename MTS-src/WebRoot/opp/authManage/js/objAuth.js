(function(){
	function ObjAuth(){};
	ObjAuth.prototype = {
			constructor:ObjAuth,
			init:function(){
				this.initPermTree($('#permTree'), "1,2,3,5,6");
				this.initOperGrid();
				this.initPostGrid();
				this.initOrgGrid();
			},
			initPermTree:function(target,permType){
                var wpWidth = $("#westPanel").width();
                var wpHeight = $("#westPanel").height();
					target.tree({
						width:wpWidth,
			            animate:true,
			            checkbox:false,
			            req:[{service:'P0002268',PERM_TYPE:permType}],
			            multiple:false,
			            panelWidth:200,
			            panelHeight:350,
			            conf:{
			                nodeId:'PERM_ID',
			                nodeName:'PERM_NAME',
			                treeType:'1',
			                parNode:'PAR_PERM'
			           },
			           onClick:function(node){
			        	   var tab = $('#objTab').tabs('getSelected');
			        	   var index = $('#objTab').tabs('getTabIndex',tab);
			        	  if(node != null){
			       			  var checkNode = new Array();
			       			  checkNode.push(node.id);
			       			  checkNode = $PermUtil.filter(checkNode).join(",");
			       			  $ObjAuth.getPerm(checkNode,index,true);
			        	  }
			 	     	}
					});
			},
			initOperGrid:function(){
                var centerPanelW = $("#centerPanel").width();
                var centerPanelH = $("#centerPanel").height();
				var HAS_USER_CODE = "1,8888" ;
					$('#AUTH_operTbl').datagrid({
                        fit:true,
						idField : 'USER_CODE',
						showRowDetail : false,
						singleSelect : false,
						fallParas:[{enable:true}],
						req : [ {
							service : 'P0001008',
							USER_STA:'1',
							HAS_USER_CODE:HAS_USER_CODE
						} ],
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
						columns : [ [ {
							checkbox : true
						},{
							title : 'ID号',
							width : (centerPanelW-10)/3-100 ,
							sortType:'number',
							field : 'USER_CODE'
						}, {
							title : '人员姓名',
							field : 'USER_NAME',
							width : (centerPanelW-10)/3
						}, {
							title : '机构名称',
							field : 'ORG_NAME',
							width : (centerPanelW-10)/3
						} ] ],
						onLoadSuccess:function(data){
							$ObjAuth.checkedRows();
						}
					});
			},
			initPostGrid:function(){
                var centerPanelW = $("#centerPanel").width();
                var centerPanelH = $("#centerPanel").height();
					$('#AUTH_postTbl').datagrid({
                        fit:true,
						idField : 'POST_ID',
						showRowDetail : false,
						singleSelect : false,
						req :[{
							service: 'P0001045',
	                        POST_STA: '1'
				          }],
						queryCols:[{
				              'text':'查询',
				              'icon':'icon-search',
				              collapsed:true,
				              cols:[{
				                title:'岗位名称',
				                field:'POST_NAME',
				                editor:{
				                  type:'text',
				                  options:{
				                	  validType:'val[0,64]'
				                  }
				                }
				              }]
				          }],
						columns : [ [ {
							checkbox : true
						},{
							title : '岗位编号',
							width : (centerPanelW-10)/3-100 ,
							sortType:'number',
							field : 'POST_ID'
						}, {
							title : '岗位名称',
							field : 'POST_NAME',
							width : (centerPanelW-10)/3
						}, {
							title : '岗位状态',
							field : 'POST_STA',
							width : (centerPanelW-10)/3,
							formatter : function(value) {
								return getSysDictOpt('POST_STA', value);
							}
						} ] ],
						onLoadSuccess:function(data){
							$ObjAuth.checkedRows();
						}
					});
			},
			initOrgGrid:function(){
                var centerPanelW = $("#centerPanel").width();
                var centerPanelH = $("#centerPanel").height();
					$('#AUTH_orgTbl').treegrid({
                        fit:true,
						idField:'ORG_CODE',
						treeField:'ORG_CODE_NAME',
						singleSelect : false,
						deepCascadeCheck : true,
						treeExpand:0,
						req:[{service:'P0001031',ORG_STA:'1'}],
						columns:[[
							{title:'ORG_CODE',field:'ORG_CODE',checkbox : true},
							{field:'ORG_CODE_NAME',title:'组织机构名称',sortable:false,width:centerPanelW-100}
						]],
						loadFilter:$ObjAuth.dataFilter
					});
			},
			dataFilter:function(data){
				if (!data[0]){
					return {
						total : data[0].length,
						rows : data[0]
					};
				}
				if (data[0].length > 0) {
					for ( var i = 0, len = data[0].length; i < len; i++) {
						if (data[0][i]['ORG_LVL'].length == 4) {
							delete data[0][i]['PAR_ORG'] ;
						} else {
							data[0][i]['pid'] = data[0][i]['PAR_ORG'];
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
			checkedRows:function(){
				var tab = $('#objTab').tabs('getSelected');
				var index = $('#objTab').tabs('getTabIndex',tab);
				var node = $('#permTree').tree('getSelected');
				if(node != null){
					var checkNode = new Array();
					checkNode.push(node.id);
					checkNode = $PermUtil.filter(checkNode).join(",");
					$ObjAuth.getPerm(checkNode,index,false);
				}
			},
			getPerm:function(id, v,flag){
				if (v == 0) {
					$ObjAuth.req("P0002225", id, $("#AUTH_operTbl"), "USER_CODE",v,flag);
				} else if (v == 1) {
					$ObjAuth.req("P0002226", id, $("#AUTH_postTbl"), "POST_ID",v,flag);
				} else if (v == 2) {
					$ObjAuth.req("P0002227", id, $("#AUTH_orgTbl"), "ORG_CODE",v,flag);
				}
			},
			unAllSelect:function (treeObj){
			    var roots = treeObj.tree('getRoots');
			    for(var i=0;i<roots.length;i++){
			      var node=treeObj.tree('find',roots[i].id);  //分别获取单个节点
			      treeObj.tree('uncheck',node.target);    //设置节点的未选中状态。
			    }
			},
			req:function(serv, id, target, idField,v,flag){
				if(flag){
					if(v != 2){
						target.datagrid("clearSelections");
					}else{
						//$ObjAuth.unAllSelect(target);
						target.treegrid("unselectAll");
					}
				}
				ajaxRequest({
					req : [ {
						service : serv,
						PERM_ID : id.toString()
					} ],
					func : function(data) {
						var querData = data[0];
						if (typeof (querData) == 'undefined') {
							return false;
						}
						if (v == 0) {
							$("body").removeData("operQuerData");
							$("body").data("operQuerData",querData);
						} else if (v == 1) {
							$("body").removeData("postQuerData");
							$("body").data("postQuerData",querData);
						} else if (v == 2) {
							$("body").removeData("orgQuerData");
							$("body").data("orgQuerData",querData);
						}
						for ( var i = 0; i < querData.length; i++) {
							if(v == 2){
						        var orgCode = querData[i].ORG_CODE;
								target.treegrid("select", orgCode);

							}else{
								target.datagrid("selectRecord", querData[i][idField]);
							}

						}
					}
				});
			},
			getSelectNode:function(checkNode,node){
				var childNode = node.children;
				if(typeof childNode != "undefined"){
					for(var i=0;i<childNode.length;i++){
						checkNode.push(childNode[i].id);
						$ObjAuth.getSelectNode(checkNode,childNode[i]);
					}
				}
			},
			getPermVal:function(){
				var checkNode = new Array();
				var node = $('#permTree').tree('getSelected');
				if(node == null){
					alert("请选择权限菜单！");
					return false ;
				}
				checkNode.push(node.id);
				return checkNode;
			},
			selectFun:function(title,index){
				var _id = "" ;
				using("tree",function(){
					var node = $('#permTree').tree('getSelected');
					if(node == null){
						return false ;
					}
					_id = node.id;
					if(index == 0){
						$ObjAuth.getPerm(_id,0);
					}else if(index == 1){
						$ObjAuth.getPerm(_id,1);
					}else if(index == 2){
						$ObjAuth.getPerm(_id,2);
					}
				});
			},
			saveObjReq:function(objType,delId,addId,index){
				var node = $('#permTree').tree('getSelected');
				if(node == null){
					alert("请选择权限菜单！");
					return false ;
				}
				var checkNode = $ObjAuth.getPermVal();
				ajaxRequest({
			        req:[{
			        	service:'P0002228',
			         	OBJ_TYPE:objType,
			         	DEL_OBJ_ID:delId.toString(),
			        	ADD_OBJ_ID:addId.toString(),
			        	ASS_TYPE:'1',
			        	PERM_ID:checkNode.toString(),
			        	AUTH_TYPE:'1'
			        }],
			        func:function(data){
			        	$ObjAuth.getPerm(checkNode.toString(),index,false);
			        	alert("授权成功！");
			        }
			   });


			},
            savePerm:function(){
                var tab = $('#objTab').tabs('getSelected');
                var index = $('#objTab').tabs('getTabIndex', tab);
                if (index == 0) {
                    $ObjAuth.saveOperPerm();
                } else if (index == 1) {
                    $ObjAuth.savePostPerm();
                } else if (index == 2) {
                    $ObjAuth.saveOrgPerm();
                }
            },
			saveOperPerm:function(){

				var oldPermId = new Array();
				var returnData = $("body").data("operQuerData");
				if(typeof(returnData) != 'undefined' ){
				    for(var i=0;i<returnData.length;i++){
				    	oldPermId.push(returnData[i]['USER_CODE']) ;
				    }
				}
				var newPermId = new Array();
				var rows = $('#AUTH_operTbl').datagrid('getSelections');
				for(var i=0;i<rows.length;i++){
					newPermId.push(rows[i]['USER_CODE']) ;
			    }

				var sameVal = $PermUtil.getSameVal(oldPermId,newPermId);
				var delId = $PermUtil.getDiffVal(sameVal,oldPermId);
				var addId = $PermUtil.getDiffVal(sameVal,newPermId);

				$ObjAuth.saveObjReq("2",delId,addId,0);
			},
			savePostPerm:function(){

				var oldPermId = new Array();
				var returnData = $("body").data("postQuerData");
				if(typeof(returnData) != 'undefined' ){
				    for(var i=0;i<returnData.length;i++){
				    	oldPermId.push(returnData[i]['POST_ID']) ;
				    }
				}
				var newPermId = new Array();
				var rows = $('#AUTH_postTbl').datagrid('getSelections');
				for(var i=0;i<rows.length;i++){
					newPermId.push(rows[i]['POST_ID']) ;
			    }

				var sameVal = $PermUtil.getSameVal(oldPermId,newPermId);
				var delId = $PermUtil.getDiffVal(sameVal,oldPermId);
				var addId = $PermUtil.getDiffVal(sameVal,newPermId);

				$ObjAuth.saveObjReq("3",delId,addId,1);
			},
			saveOrgPerm:function(){
				var oldPermId = new Array();
				var returnData = $("body").data("orgQuerData");
				if(typeof(returnData) != 'undefined' ){
				    for(var i=0;i<returnData.length;i++){
				    	oldPermId.push(returnData[i].ORG_CODE) ;
				    }
				}
				var newPermId = new Array();
				var rows = $('#AUTH_orgTbl').treegrid('getSelections');
				for(var i=0;i<rows.length;i++){
					newPermId.push(rows[i].ORG_CODE) ;
			    }
				var sameVal = $PermUtil.getSameVal(oldPermId,newPermId);
				var delId = $PermUtil.getDiffVal(sameVal,oldPermId);
				var addId = $PermUtil.getDiffVal(sameVal,newPermId);

				$ObjAuth.saveObjReq("4",delId,addId,2);
			}
	};
	window.$ObjAuth = new ObjAuth();
})();

window.$ready=function(){
    using(["tree","combotree","datagrid","treegrid"],function(){
        $ObjAuth.init();
    });
};
$(window).resize(function () {
    $(".kui-layout").layout("resize");
    $("#permTreePanel").panel("resize");
    $("#objPanel").panel("resize");
    $("#objTab").tabs("resize");
});