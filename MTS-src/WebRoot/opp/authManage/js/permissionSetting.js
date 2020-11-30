(function(){
	
	var PermsetSetting = function(){};
	
	PermsetSetting.prototype = {
			constructor: PermsetSetting,
			init:function(target){
				this.createGrid(target);
			},
			resize:function(){
				var ch = $(window).height();
				$("#permSetTbl").css("height",ch);
			},
			createGrid:function(target){
				using("datagrid",function(){
					target.datagrid({
						fit:true,
						/*idField:'PERM_SET_ID',*/
				        textField:'PERM_SET_NAME',
				        req:[{
				        	  service:"P0002241"
				        }],
				        toolbar: [{
				        	text:'添加成员',
				    		iconCls: 'icon-add',
				    		handler: permSet.sysServiceList
				    	},{
				    		text:'新增',
				    		iconCls: 'icon-add',
				    		handler: createAddDialog
				    	},{
				    		text:'修改',
				    		iconCls: 'icon-edit',
				    		handler: createEditDialog
				    	},{
				    		text:'删除',
				    		iconCls: 'icon-remove',
				    		handler: createDelDialog
				    	}],
				        queryCols:[{
				              'text':'查询',
				              'icon':'icon-search',
				              collapsed:true,
				              cols:[{
				                title:'权限集名称',
				                field:'PERM_SET_NAME',
				                editor:{
				                  type:'text',
				                  options:{
				                	  validType:'val[0,64]'
				                  }
				                }
				              }]
				          }],
				        columns:[[
				            {field:'PERM_SET_ID',title:'权限集编号',sortable:true,sortType:'number',width:80},
				            {field:'PERM_SET_NAME',title:'权限集名称',width:160},
				            {field:'REMARK',title:'备注',width:200}
				        ]]
					});
				});
			},
			createSysServiceGrid:function(PERM_SET_ID){
				using('datagrid',function(){
			        $('#sysService').datagrid({
			          singleSelect:false,
			          idField:'SERVICE_CODE',
			          textField:'SERVICE_NAME',
			          req:[{
			            service:'P0002248',
			            PERM_SET_ID:PERM_SET_ID
			          }],
			          queryCols:[{
			              'text':'查询',
			              'icon':'icon-search',
			              collapsed:true,
			              cols:[{
			                title:'服务名称',
			                field:'SERVICE_NAME',
			                editor:{
			                  type:'text',
			                  options:{
			                	  validType:'val[0,64]'
			                  }
			                }
			              }]
			          }],
			          columns:[[
			            {checkbox:true},
			            {field:'SERVICE_CODE',title:'服务编号',width:160},
			            {field:'SERVICE_NAME',title:'服务名称',width:160}
			          ]],
			          onLoadSuccess:function(data){
			        	  //permSet.checkedRows();
						}
			        });
			      });
			},
			sysServiceListGrid:function(PERM_SET_ID){
				using('datagrid',function(){
			        $('#sysServiceList').datagrid({
			          singleSelect:false,
			          idField:'SERVICE_CODE',
			          textField:'SERVICE_NAME',
			          req:[{
			            service:'P0002247',
	        	  		PERM_SET_ID:PERM_SET_ID
			          }],
			          toolbar: [{
				        	text:'添加',
				    		iconCls: 'icon-add',
				    		handler: createFunSetDialog
				    	},{
				    		text:'删除',
				    		iconCls: 'icon-remove',
				    		handler: permSet.deleteSysService
				    	}],
			          columns:[[
			            {checkbox:true},
			            {field:'SERVICE_CODE',title:'服务编号',width:160},
			            {field:'SERVICE_NAME',title:'服务名称',width:160}
			          ]]
			        });
			      });
			},
			deleteSysService:function(){
				var row = $('#permSetTbl').datagrid('getSelections');
				var rows = $('#sysServiceList').datagrid('getSelections');
			    if(rows.length==0){
			      alert('请选择一条数据！');
			      return false ;
			    }
			    confirm("提示","确定删除该数据？",function(isOk){
					if(isOk){
						var serviceCode = [] ;
						var obj = {} ;
						for(var i=0;i<rows.length;i++){
							/*obj = {
								  service:'P0002249',
				            	  PERM_SET_ID:row[0].PERM_SET_ID,
				            	  SERVICE_CODE:rows[i].SERVICE_CODE
							};
							req.push(obj);*/
							serviceCode.push(rows[i].SERVICE_CODE);
						}
						ajaxRequest({
				            req:[{
				            	service:'P0002249',
				            	PERM_SET_ID:row[0].PERM_SET_ID,
				            	SERVICE_CODE:serviceCode.toString()
				            }],
				            func:function(data){
			            		alert("删除成功！");
				            	$("#sysServiceList").datagrid("reload");
				            }
				        });
				        $("#sysServiceList").datagrid("unselectAll");
					}
				});
			},
			checkedRows:function(){
				var row = $('#permSetTbl').datagrid('getSelections');
				var PERM_SET_ID = row[0].PERM_SET_ID ;
				ajaxRequest({
			        req:[{
			        	  service:'P0002247',
			        	  PERM_SET_ID:PERM_SET_ID
			            }],
			        func:function(data){
			        	var querData = data[0];
			        	$("body").data("sysServData",querData);
			        	if(typeof(querData) == 'undefined'){
			        		return false;
			        	}
			        	for(var i=0;i<querData.length;i++){
		            		$("#sysService").datagrid("selectRecord",querData[i].SERVICE_CODE);
		            	}
			        }
			    });
			},
			sysServiceList:function(){
				var row = $('#permSetTbl').datagrid('getSelections');
			    if(row.length==0){
			      alert('请选择一条数据！');
			      return false ;
			    }
			    var PERM_SET_ID = row[0].PERM_SET_ID ;
			   
			    using("dialog",function(){
				$("#permSetInfoDialog").dialog({
					width:600,
					height:380,
					modal:true,
					title:'功能集列表',
					buttons:[{
						text:'取消',
						iconCls:'icon-cancel',
						handler:function(){
							$("#permSetInfoDialog").dialog("close");
						} }]
					});
				});
				 permSet.sysServiceListGrid(PERM_SET_ID);
			    $("#sysServiceList").datagrid("clearSelections");
				$('#sysServiceList').datagrid("resize");
			}
	};
	
	
	
	function createFunSetDialog(){
		var row = $('#permSetTbl').datagrid('getSelections');
	    if(row.length==0){
	      alert('请选择一条数据！');
	      return false ;
	    }
	    if(typeof $('body').find(".datagrid-queryForm form")[1] != "undefined"){
  			$('body').find(".datagrid-queryForm form")[1].reset();
  		}
  		var PERM_SET_ID = row[0].PERM_SET_ID ;
	   
		using("dialog",function(){
			$("#addFunSetDialog").dialog({
				width:600,
				height:380,
				modal:true,
				title:'添加功能集',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						saveFunSet();
						$("#sysService").datagrid("clearSelections");
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
						$("#addFunSetDialog").dialog("close");
					}
				}]
			});
		});
		 permSet.createSysServiceGrid(PERM_SET_ID);
	    $('#sysService').datagrid({pageNumber:1});
	    $('#sysService').datagrid("reload");
	    $("#sysService").datagrid("clearSelections");
		$('#sysService').datagrid("resize");
		
	}

	
	function createAddDialog(){
		$("#permSetForm").form("clear");
		$("#PERM_SET_NAME").focus();
		using("dialog",function(){
			$("#permSetDialog").dialog({
				width:400,
				height:200,
				modal:true,
				title:'新增',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						savePermSet();
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
                        if($("#PERM_SET_NAME").hasClass("validatebox-invalid")){
                            $("#PERM_SET_NAME").removeClass("validatebox-invalid");
                        }
                        if($("#REMARK").hasClass("varlidataTextarea-invalid")){
                            $("#REMARK").removeClass("varlidataTextarea-invalid");
                        }
						$("#permSetDialog").dialog("close");
					}
				}],
                onClose:function(){
                    if($("#PERM_SET_NAME").hasClass("validatebox-invalid")){
                        $("#PERM_SET_NAME").removeClass("validatebox-invalid");
                    }
                    if($("#REMARK").hasClass("varlidataTextarea-invalid")){
                        $("#REMARK").removeClass("varlidataTextarea-invalid");
                    }
                }
			});
		});
	}

	function createEditDialog(){
		$("#permSetForm").form("clear");
		$("#PERM_SET_NAME").focus();
		var row = $('#permSetTbl').datagrid('getSelections');
	    if(row.length==0){
	      alert('请选择一条数据！');
	      return false ;
	    }
	    $("#PERM_SET_ID").val(row[0].PERM_SET_ID);
	    $("#PERM_SET_NAME").val(row[0].PERM_SET_NAME);
	    $("#REMARK").val(row[0].REMARK);
	    using("dialog",function(){
			$("#permSetDialog").dialog({
				width:400,
				height:200,
				modal:true,
				title:'修改',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						modifyPermSet();
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
                        if($("#PERM_SET_NAME").hasClass("validatebox-invalid")){
                            $("#PERM_SET_NAME").removeClass("validatebox-invalid");
                        }
                        if($("#REMARK").hasClass("varlidataTextarea-invalid")){
                            $("#REMARK").removeClass("varlidataTextarea-invalid");
                        }
						$("#permSetDialog").dialog("close");
					}
				}],
                onClose:function(){
                    if($("#PERM_SET_NAME").hasClass("validatebox-invalid")){
                        $("#PERM_SET_NAME").removeClass("validatebox-invalid");
                    }
                    if($("#REMARK").hasClass("varlidataTextarea-invalid")){
                        $("#REMARK").removeClass("varlidataTextarea-invalid");
                    }
                }
			});
		});
	}

	function savePermSet(){
		if(!$('#permSetForm').form('validate')){
			return false ;
		}
		var PERM_SET_NAME = $("#PERM_SET_NAME").val();
		var REMARK = $("#REMARK").val();
        var $dialogD=$("#permSetDialog");
        $dialogD.find(".l-btn").linkbutton("disable");
		ajaxRequest({
	        req:[{
	        	  service:'P0002242',
	        	  PERM_SET_NAME:PERM_SET_NAME,
	        	  REMARK:REMARK
	            }],
	        func:function(data){
                $dialogD.find(".l-btn").linkbutton("enable");
                $("#permSetDialog").dialog("close");
                $.message.alert("添加成功！");
                $("#permSetTbl").datagrid("reload");
	        },
            error:function(e){
                $dialogD.find(".l-btn").linkbutton("enable");
                $.message.alert("添加失败！");
            }
	    });
	}
	function modifyPermSet(){
		if(!$('#permSetForm').form('validate')){
			return false ;
		}
		var PERM_SET_ID = $("#PERM_SET_ID").val();
		var PERM_SET_NAME = $("#PERM_SET_NAME").val();
		var REMARK = $("#REMARK").val();
        var $dialogD=$("#permSetDialog");
        $dialogD.find(".l-btn").linkbutton("disable");
		ajaxRequest({
	        req:[{
	        	  service:'P0002243',
	        	  PERM_SET_ID:PERM_SET_ID,
	        	  PERM_SET_NAME:PERM_SET_NAME,
	        	  REMARK:REMARK
	            }],
	        func:function(data){
                $dialogD.find(".l-btn").linkbutton("enable");
                $("#permSetDialog").dialog("close");
                $.message.alert("修改成功！");
                $("#permSetTbl").datagrid("reload");
	        },
            error:function(e){
                $dialogD.find(".l-btn").linkbutton("enable");
                $.message.alert("修改失败！");
            }
	    });
	}
	function createDelDialog(){
		var row = $('#permSetTbl').datagrid('getSelections');
	    if(row.length==0){
	      alert('请选择要删除的数据！');
	      return false ;
	    }
		confirm("提示","确定删除该数据？",function(isOk){
			if(isOk){
                $(".l-btn").linkbutton("disable");
				ajaxRequest({
		            req:[{
		            	  service:'P0002244',
		            	  PERM_SET_ID:row[0].PERM_SET_ID
		                }],
		            func:function(data){
                        alert("删除成功！");
                        $(".l-btn").linkbutton("enable");
                        $("#permSetTbl").datagrid("reload");
		            },
                    error:function(e){
                        alert("删除失败！");
                        $(".l-btn").linkbutton("enable");
                    }
		        });
			}
		});
	}
	
	function saveFunSet(){
		var row = $('#permSetTbl').datagrid('getSelected');
		var perm_set_id = row.PERM_SET_ID;
		var querData = $("body").data("sysServData");
		var requestParams = new Array();
		var req = {
	            	  service:'P0002246',
	            	  PERM_SET_ID:perm_set_id
	                };
    	if(typeof(querData) != 'undefined'){
			/*ajaxRequest({
				async:false,
	            req:[{
	            	  service:'P0002246',
	            	  PERM_SET_ID:perm_set_id
	                }],
	            func:function(data){
	            	
	            }
	        });*/
    		requestParams.push(req);
    	}
		
		
		var rowData = $('#sysService').datagrid('getSelections');
		if(typeof rowData != "undefined" && rowData.length>0){
			var serviceCodes = [] ;
			for(var i=0;i<rowData.length;i++){
				var service_code = rowData[i].SERVICE_CODE;
				serviceCodes.push(service_code);
				/*var r = {
		            	  service:'P0002245',
		            	  PERM_SET_ID:perm_set_id,
		            	  SERVICE_CODE:service_code
		                };
		        requestParams.push(r);*/
				/*ajaxRequest({
					async:false,
		            req:[{
		            	  service:'P0002245',
		            	  PERM_SET_ID:perm_set_id,
		            	  SERVICE_CODE:service_code
		                }],
		            func:function(data){
		            }
		        });*/
			}
			
			ajaxRequest({
				async:false,
	            req:[{
	            	service:'P0002245',
            	    PERM_SET_ID:perm_set_id,
            	    SERVICE_CODE:serviceCodes.toString()
	            }],
	            func:function(data){
	            	$("#addFunSetDialog").dialog("close");
					$("#sysServiceList").datagrid("reload");
					$("#sysServiceList").datagrid("clearSelections");
		    		alert("保存成功！");
	            }
	        });
		}else{
    		alert("请选择要添加的数据！");
		}
	}
	
	window.permSet = new PermsetSetting();
})();

window.$ready=function(){
	permSet.init($("#permSetTbl"));
};

