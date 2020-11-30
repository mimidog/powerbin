/**
 * 流程发布管理
 * @param value
 * @return {String}
 */
//添加链接
function processLink(value,row) {
    var optName = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row['processDefinitionKey'] + '\');" >查看流程图</a>';
    return optName;
}

//显示详情
function showDetail(value) {

}

//显示流程图
function showFlowPicture(value) {
    $('#flowPicture_showDiv').attr('src', encodeURI(encodeURI('../../kjdp_modeler?method=graphProcessDefinition&PROCESS_KEY=' + value)));
    var loadFlowPicture=window.setInterval(function () {
        var errorMessage = document.getElementById("flowPicture_showDiv").contentWindow.window.document.body.textContent;
        //var IRETCODE = errorMessage.substring(errorMessage.indexOf('IRETCODE') + 11, errorMessage.indexOf('IRETCODE') + 13);
        if(errorMessage != ""){
         	var errMsg = JSON.parse(errorMessage).ANSWERS[0].ANS_MSG_HDR ;
	   		var msg_code = errMsg.MSG_CODE;
	   		var msg_txt = errMsg.MSG_TEXT;
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
	        }else if(msg_code == '9999'){
	        	alert(msg_txt);
	        } 
	        clearInterval(loadFlowPicture);
         }else {
            using('dialog', function () {
                $('#flowPicture_showDialog').dialog({
                    title:'流程图',
                    width:850,
                    height:420,
                    modal:true,
                    buttons:[
                        {text:'关闭',
                            iconCls:'icon-cancel',
                            handler:function () {
                                $('#flowPicture_showDialog').dialog('close');
                            }
                        }
                    ]
                });
            });
        }
        clearInterval(loadFlowPicture);
    }, 1000);
}

//部署流程
function reDeploymentAdd() {
    using(["uploadify", "dialog", "form"],
        function () {
            $('#procdefFileUpload').empty();
            var ipt = $('<input name="procdefFile" id="procdefFile" type="file" />');
            $('#procdefFileUpload').append(ipt);
            ipt.uploadify({
                dir:'workflow',
                fileTypeDesc:'请选择流程包文件',
                fileTypeExts:'*.zip;*.bpmn;*.bar',
                fileNumLimit:1
            });
            $('#procdefForm').form('clear');
            $('#procdefForm').find("div.alt").remove();
             $('#procdefForm').append($("<div class='alt' align='center' style='color:red'>注：只能上传一个文件!</div>"));
            $('#procdefDialog').dialog({
                title:'部署流程包',
                modal:true,
                draggable:true,
                width:500,
                height:200,
                buttons:[
                    {
                        text:'部署',
                        iconCls:'icon-save',
                        handler:function () {
                            var fileNum = $("div").children(".uploadify-queue-item");
                            if (fileNum.length > 1) {
                                //$.message.alert('不能同时上传多个文件');
                                return;
                            } else if (fileNum.length == 0) {
                                $.message.alert('请选择需要上传的流程包文件');
                                return;
                            } else {
                                var fileName = $(".uploadify-queue-item").attr("filecon");

                                ajaxRequest({
                                    async:false,
                                    req:[
                                        {
                                            service:'P0005001',
                                            BPM_OP:'deployProcess',
                                            fileName:fileName
                                        }
                                    ],
                                    func:function (data) {
                                        $.message.alert('部署成功！');
                                        $('#procdefDialog').dialog('close');
                                        $('#UWK_processManage').datagrid('reload');
                                    }
                                });
                            }
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#procdefDialog').dialog('close');
                        }
                    }
                ]
            });
        });
}

//删除已部署流程
function deleteProcess() {
    var row = $('#UWK_processManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认删除?', '确认删除吗?', function (isOK) {
            if (isOK) {
                var processDefinitionId = row['processDefinitionId'];
                var processDefinitionKey = row['processDefinitionKey'];
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'deleteProcess',
                            PROCESS_KEY:processDefinitionKey,
                            processDefinitionId:processDefinitionId
                        }
                    ],
                    func:function (data) {
                        $.message.alert('删除流程成功！');
                        $('#UWK_processManage').datagrid('reload');
                    }
                });
            }
        });
    }
}