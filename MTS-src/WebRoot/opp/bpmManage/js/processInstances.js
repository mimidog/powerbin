/**
 * 流程实例管理
 */
//init
window.$ready = function () {
    using('datagrid', function () {
        var conf = $.builder.format.datagrid($.parser.getConfigs(["UWK_processInstancesMrg"]));
        conf['columns'][0].push({title:'操作', field:'showPicture', width:'200', formatter:'function(value,row){return setOptCol(row);}'});
        $("#UWK_processInstancesMrg").datagrid(conf);
    });
}

//设置操作列
function setOptCol(row) {
    var picCol = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row.processInstanceId + '\');">查看监控流程图</a>';
    return picCol;
}

function hideEndProcess(rowIndex, rowData){
	var $panel = $(this).datagrid('getPanel') ;
	if(rowData.processInstanceState == 1){
		$('a.l-btn:eq(1)', $panel).linkbutton('disable');
	}else{
		$('a.l-btn:eq(1)', $panel).linkbutton('enable');
	}
}

//显示流程图
function showFlowPicture(value) {
    $('#flowPicture_showDiv').attr('src', '../../kjdp_modeler?method=graphHistoryProcessInstance&processInstanceId=' + value);
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

//删除流程实例
function deleteProcessInstance() {
    var row = $('#UWK_processInstancesMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认删除?', '确认删除吗?', function (isOK) {
            if (isOK) {
                var processInstanceId = row['processInstanceId'];
                var processDefinitionKey = row['processDefinitionKey'];
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'deleteProcessInstance',
                            PROCESS_KEY:processDefinitionKey,
                            processInstanceId:processInstanceId,
                            reason:'XXX理由'
                        }
                    ],
                    func:function (data) {
                        $.message.alert('删除流程实例成功！');
                        $('#UWK_processInstancesMrg').datagrid('reload');

                    }
                });
            }
        });
    }
}

//删除流程实例
function deleteProcessInstanceWithoutCascade() {
    var row = $('#UWK_processInstancesMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认结束?', '确认结束吗?', function (isOK) {
            if (isOK) {
                var processInstanceId = row['processInstanceId'];
                var processDefinitionKey = row['processDefinitionKey'];
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'deleteProcessInstanceWithoutCascade',
                            PROCESS_KEY:processDefinitionKey,
                            processInstanceId:processInstanceId,
                            reason:'XXX理由'
                        }
                    ],
                    func:function (data) {
                        $.message.alert('结束流程实例成功！');
                        $('#UWK_processInstancesMrg').datagrid('reload');

                    }
                });
            }
        });
    }
}