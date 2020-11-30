//操作流水详情
function upm_sysSerRecDetail(e) {
	var records = e.data.target.datagrid("getSelections");
	 if (records.length == 0) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
	var dialog =$('#sysSerRecDetailDialog');
	if(dialog.length>0){
		$("table",dialog).remove();
		$(".datagrid-queryForm",dialog).append('<table id=\"detailPanel\" cellpadding=\"6\"></table>');
		dialog.dialog('open');
	}else{
		dialog = $('<div id="sysSerRecDetailDialog" style="width:570px;height:300px;"><div class="datagrid-queryForm"><table id=\"detailPanel\" cellpadding=\"6\"></table></div></div>').appendTo($('body'));
		using('dialog',function(){
			dialog.dialog({
				modal:true,
				title:'操作流水详情',
				iconCls:'icon-client-detail'
			});
		});
	}
	
	ajaxRequest({
			async: false,
			req: [{
				service: 'P0000101',
				SER_REC_NO: records[0]["REC_NO"]
			}],
			func: function(data) {
				if (data[0]) {
					var dom = ["<tr>",
							   "<td class=\"form-label\" >服务代码:</td>",
							   "<td width=\"100\">"+records[0]["SERVICE_CODE"]+"</td>",
							   "<td class=\"form-label\" >服务名称:</td>",
							   "<td width=\"100\" colspan=\"3\">"+records[0]["SERVICE_NAME"]+"</td>",
							   "</tr><tr>",
							   "<td class=\"form-label\" valign=\"top\">操作参数:</td>",
							   "<td width=\"400\" colspan=\"5\">"+records[0]["OPT_PAR"]+"</td>",
							   "</tr><tr>",
							   "<td  colspan=\"6\">--------------------------------------------参数明细--------------------------------------------</td>",
							   "</tr>"];
					var rows = data[0];
					for(var i = 0;i<rows.length;i++){
						if(i%3==0){
							dom.push("<tr>");	
						}else if(i%3==3){
							dom.push("</tr>");
						}
						dom.push("<td class=\"form-label\">"+rows[i]["PAR_NAME"]+":</td>");
						dom.push("<td width=\"100\">"+(rows[i]["PAR_VAL"]||"")+"</td>");
					}
					$("#detailPanel").append(dom.join(""));
				}
			}
		});
		}
}

function busCommDialog(formId,config){
	var dialog = $("#"+formId);
	if(dialog.length>0){
		$("form", dialog).remove();
		$(".dialog-content",dialog).append($("<form class=\"kui-form\"></form>"));
		dialog.dialog('open');
	}else{
		dialog = $("<div id='"+formId+"'><form class='kui-form'></form></div>").appendTo($('body'));
		config.modal = config.modal||true;
		config.iconCls = config.iconCls||'icon-edit';
		config.title = config.title ||'弹出窗口';
		config.width = config.width||500;
		config.height = config.height||300;
		dialog.dialog(config);
	}
}

function userInfoModify(e){
	var record = e.data.target.datagrid("getSelected");
	if(!record){
		alert('提示',"请选择一条数据！");
		return false;
	}	
	var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userInfoUpdateForm"]));
	var dialogConf = {
		title:'人员资料修改',
		width:600,
		height:300,
		iconCls:'icon-edit',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var d = $("#userInfoUpdateDialog"),dForm = $('form',d);
                dForm.form('submit',{
					success:function(){
						alert('人员资料修改成功！');
						d.dialog("close");
						e.data.target.datagrid("reload");
					},
					onSubmit:function(req){
                        return dForm.form('validate');
					}
				});
			}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				$("#userInfoUpdateDialog").dialog('close');
			}
		}]
	};
	busCommDialog("userInfoUpdateDialog",dialogConf);
	formConf["common"]=true;
	$.parser.director($("#userInfoUpdateDialog"),{config:formConf,record:record});
}

function userInfoAdd(e){
	var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userInfoAddForm"]));
	var dialogConf = {
		title:'人员资料新增',
		width:600,
		height:350,
		iconCls:'icon-add',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var d = $("#userInfoAddDialog"),
                    dForm = $('form',d);
                dForm.form('submit',{
					success:function(){
						alert('人员资料新增成功！');
						d.dialog("close");
						e.data.target.datagrid("reload");
					},
					onSubmit:function(req){
                        if(dForm.form('validate')){
                            var pass = req[0]["USER_PASS"];
                            var userCode = req[0]["USER_CODE"];
                            req[0]["USER_PASS"] =  encrypt(pass, userCode);
                            return true;
                        }
                        return false;
					}
				});
			}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				$("#userInfoAddDialog").dialog('close');
			}
		}]
	};
	busCommDialog("userInfoAddDialog",dialogConf);
	formConf["common"]=true;
	$.parser.director($("#userInfoAddDialog"),{config:formConf});
	$("div.form-group-inline:eq(0)",$("#userInfoAddDialog")).append("<a href=\"javascript:void(0)\" class=\"kui-linkbutton\" kui-options=\"iconCls:\'icon-ok\'\" onclick=\"createUserCode(event)\" >生成</a>");
}
function createUserCode(e){
	ajaxRequest({
		req: [{
			service: 'P0000112'
		}],
		func: function(data) {
			var userCode = data[0][0]["USER_CODE"];
			$("input[name='USER_CODE']",$("#userInfoAddDialog")).val(userCode);
		}
	});
}
function userPasswordReset(e){
	var record = e.data.target.datagrid("getSelected");
	if(!record){
		alert('提示',"请选择一条数据！");
		return false;
	}	
	var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userPasswordResetForm"]));
	var dialogConf = {
		title:'用户密码重置',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var d = $("#userPasswordResetDialog");
				$('form',d).form('submit',{
					success:function(){
						alert('重置密码成功！');
						d.dialog("close");
						e.data.target.datagrid("reload");
					},
					onSubmit:function(req){
						if($(this).form('validate')){
							var pass = req[0]["USER_PASS"];
							var conPass = req[0]["CONFIRM_PASS"];
							var userCode = req[0]["USER_CODE"];
							
							if(pass!=conPass){
								alert("登陆密码与确认密码不一致!");
								return false;
							}
							req[0]["USER_PASS"] =  encrypt(pass, userCode);
							return true;
						}
						return false;
					}
				});
			}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				$("#userPasswordResetDialog").dialog('close');
			}
		}]
	};
	busCommDialog("userPasswordResetDialog",dialogConf);
	formConf["common"]=true;
	$.parser.director($("#userPasswordResetDialog"),{config:formConf,record:record});
}


function userStatusModify(e){
	var record = e.data.target.datagrid("getSelected");
	if(!record){
		alert('提示',"请选择一条数据！");
		return false;
	}	
	var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userStatusModifyForm"]));
	var dialogConf = {
		title:'人员状态修改',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var d = $("#userStatusModifyDialog");
				$('form',d).form('submit',{
					success:function(){
						alert('人员状态修改成功！');
						d.dialog("close");
						e.data.target.datagrid("reload");
					}
				});
			}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				$("#userStatusModifyDialog").dialog('close');
			}
		}]
	};
	busCommDialog("userStatusModifyDialog",dialogConf);
	formConf["common"]=true;
	$.parser.director($("#userStatusModifyDialog"),{config:formConf,record:record});
}
//系统错误速查表详情
function upm_sysErrorDetail(e) {
    var records = e.data.target.datagrid("getSelections");
    if (records.length == 0) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        var dialog =$('#sysErrorDetailDialog');
        if(dialog.length>0){
            $("table",dialog).remove();
            $(".datagrid-queryForm",dialog).append('<table id=\"detailPanel\" cellpadding=\"6\"></table>');
            dialog.dialog('open');
        }else{
            dialog = $('<div id="sysErrorDetailDialog" style="width:570px;height:300px;"><div class="datagrid-queryForm"><table id=\"detailPanel\"  cellpadding=\"6\"></table></div></div>').appendTo($('body'));
            using('dialog',function(){
                dialog.dialog({
                    modal:true,
                    title:'系统错误速查表详情',
                    iconCls:'icon-client-detail'
                });
            });
        }
        ajaxRequest({
            async: false,
            req: [{
                service: 'P0000081',
                ERR_CODE: records[0]["ERR_CODE"]
            }],
            func: function(data) {
                if (data[0]) {
                    var ERR_LVL_NAME='';
                    ajaxRequest({
                        async: false,
                        req: [{
                            service:'P0000021',
                            DICT_CODE:'ERR_LVL'
                        }],
                        func: function(data) {
                            var rs= data[0];
                            if(rs.length>0){
                                for(var i=0;i<rs.length;i++){
                                    if(records[0]["ERR_LVL"]==rs[i].DICT_ITEM){
                                        ERR_LVL_NAME=rs[i].DICT_ITEM_NAME;
                                    }
                                }
                            }
                        }
                    });
                    var dom = ["<tr>",
                        "<td class=\"form-label\" >错误代码:</td>",
                        "<td width=\"100\">"+records[0]["ERR_CODE"]+"</td>",
                        "<td class=\"form-label\" >错误级别:</td>",
                        "<td width=\"270\" >"+ERR_LVL_NAME+"</td>",
                        "</tr><tr>",
                        "<td class=\"form-label\" >错误消息:</td>",
                        "<td  colspan=\"3\">"+records[0]["ERR_MSG"]+"</td>",
                        "</tr><tr>",
                        "<td class=\"form-label\" >错误说明:</td>",
                        "<td  colspan=\"3\">"+records[0]["REMARK"]+"</td>",
                        "</tr>"];
                    $("#detailPanel").append(dom.join(""));
                }
            }
        });
    }
}
