/**
 * 流程定义管理
 */
//新建流程模型定义
function newModel() {
    using("form", function () {
        $('#formDiv').empty();
        var formOpt = '<form id=\"UWK_newModelForm\"></form>';
        $("#formDiv").append(formOpt);
        var formConfig = $.parser.getConfigs(['UWK_newModelForm']);
        if (formConfig['render'] != undefined) {
            var view_config = $.builder.format.form(formConfig);
            $('#formDiv>form').form(view_config);
            $('#newModelFormDialog').dialog({
                title:'填写流程信息',
                modal:true,
                draggable:true,
                width:500,
                height:300,
                buttons:[
                    {
                        text:'创建',
                        iconCls:'icon-save',
                        handler:function () {
                            var paramJson = kui.serialize2Json(kui.serialize('#UWK_newModelForm'))
                            $('#UWK_newModelForm').form('submit', {
                                req:[
                                    {
                                        service:'P0005001',
                                        BPM_OP:'newModel',
                                        MODEL_KEY:paramJson['MODEL_KEY'],
                                        MODEL_NAME:paramJson['MODEL_NAME'],
                                        MODEL_DESCRIPTION:paramJson['MODEL_DESCRIPTION']
                                    }
                                ],
                                success:function (data) {
                                    $('#UWK_modelManage').datagrid('reload');
                                    var MODEL_ID = data['BPM_DATA'][0]['MODEL_ID'];
                                    top.$k.addTabs(MODEL_ID, paramJson['MODEL_NAME'] + '设计器', 'bpm/editor/editor.html?id=' + MODEL_ID)
                                    $('#newModelFormDialog').dialog('close');
                                }
                            });
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#newModelFormDialog').dialog('close');
                        }
                    }
                ]
            });
        }

    });


}

//部署模型定义
function deployModel() {
    var row = $('#UWK_modelManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0005001',
                    BPM_OP:'deployModel',
                    MODEL_ID:row['MODEL_ID']
                }
            ],
            error:function(pa, p, w){
            	//$.message.alert('部署失败！');
            },
            func:function (data) {
                $.message.alert('部署成功！');
                $('#UWK_modelManage').datagrid('reload');
            }
        });
    }
}

//修改模型定义
function editModel() {
    var row = $('#UWK_modelManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        top.$k.addTabs(row['MODEL_ID'], row['MODEL_NAME'] + '设计器', 'bpm/editor/editor.html?id=' + row['MODEL_ID']);
    }
}

//导入模型定义
function importModel() {
	if(!top.kjdp.login.checkSession()){
		confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
            if (flag) {
                try {
                    top.window.location.reload();
                } catch (e) {
                }
            } else {
                window.location.replace("about:blank");
            }
        });
		return false;
	}
	
    using(["uploadify", "dialog", "form"],
        function () {
            $('#processFileUpload').empty();
            var ipt = $('<input name="processFile" id="processFile" type="file" />');
            $('#processFileUpload').append(ipt);
            ipt.uploadify({
                dir:'workflow',
                fileTypeDesc:'请选择流程文件',
                fileTypeExts:'*.zip;*.bpmn;*.bar',
                fileNumLimit:1
            });
            //$('#importProcessForm').form('clear');
             $('#importProcessForm').show();
             $('#importProcessForm').find("div.alt").remove();
             $('#importProcessForm').append($("<div class='alt' align='center' style='color:red'>注：只能上传一个文件!</div>"));
            $('#importProcessDialog').dialog({
                title:'导入流程',
                modal:true,
                draggable:true,
                width:600,
                height:200,
                buttons:[
                    {
                        text:'导入',
                        iconCls:'icon-save',
                        handler:function () {
                            var fileNum = $("div").children(".uploadify-queue-item");
                            if (fileNum.length > 1) {
                                //$.message.alert('不能同时上传多个文件');
                                return;
                            } else if (fileNum.length == 0) {
                                $.message.alert('请选择需要导入的流程包文件！');
                                return;
                            } else {
                                var fileName = $(".uploadify-queue-item").attr("filecon");
                                ajaxRequest({
                                    async:false,
                                    req:[
                                        {
                                            service:'P0005001',
                                            BPM_OP:'importModel',
                                            fileName:fileName
                                        }
                                    ],
                                    func:function (data) {
                                        $.message.alert('导入成功！');
                                        $('#importProcessDialog').dialog('close');
                                        $('#UWK_modelManage').datagrid('reload');

                                    }
                                });
                            }
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#importProcessDialog').dialog('close');
                        }
                    }
                ]
            });
        });
}
//导出模型定义
function exportModel() {
    var row = $('#UWK_modelManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
//        var url = '../../kjdp_modeler?method=export&MODEL_ID=' + row['MODEL_ID'];
//	    $('#exportModelDiv').attr('src', url);
	    $.ajax({
			url: '../../kjdp_modeler?method=export&MODEL_ID=' + row['MODEL_ID'],
			contentType: 'text/xml; charset=utf-8',
			async:false,
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				if(data.indexOf("xml") > -1){
					var url = '../../kjdp_modeler?method=export&MODEL_ID=' + row['MODEL_ID'];
	   				$('#exportModelDiv').attr('src', url);
					return false ;
				}
				var errorCode=JSON.parse(data).ANSWERS[0].ANS_MSG_HDR.MSG_CODE;
                var errorMsg=JSON.parse(data).ANSWERS[0].ANS_MSG_HDR.MSG_TEXT;
                if(errorCode=='9999'){
                    $('#flowPicture_showDialog').dialog('close');
                    $.message.alert(errorMsg);
                    return false;
                }
                if (errorCode == '8888888888') {
                    confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
                        if (flag) {
                            try {
                                top.window.location.reload();
                            } catch (e) {
                            }
                        } else {
                            window.location.replace("about:blank");
                        }
                    });
                }
			}
		});
        /*var getErrorMsg=window.setInterval(function () {
            var errorMessage = document.getElementById("exportModelDiv").contentWindow.window.document.body.textContent;
           	
            if (errorMessage != '') {
            	var errMsg = JSON.parse(errorMessage).ANSWERS[0].ANS_MSG_HDR ;
           		var msg_code = errMsg.MSG_CODE;
           		var msg_txt = errMsg.MSG_TEXT;
                //var IRETCODE = errorMessage.substring(errorMessage.indexOf('IRETCODE') + 11, errorMessage.indexOf('IRETCODE') + 13);
                if (msg_code == '8888888888') {
                    confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
                        if (flag) {
                            try {
                                top.window.location.reload();
                            } catch (e) {
                            }
                        } else {
                            window.location.replace("about:blank");
                        }
                    });
                }
                if(msg_code == '9999'){
	            	alert(msg_txt);
	            	clearInterval(getErrorMsg);
	        	}
            }
            clearInterval(getErrorMsg);
        }, 1000);*/
        
        
    }
}

//删除模型定义
function removeModel() {
    var row = $('#UWK_modelManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认删除?', '确认删除吗?', function (isOK) {
            if (isOK) {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'removeModel',
                            MODEL_ID:row['MODEL_ID']
                        }
                    ],
                    func:function (data) {
                        $.message.alert('删除成功！');
                        $('#UWK_modelManage').datagrid('reload');
                    }
                });
            }
        });

    }
}