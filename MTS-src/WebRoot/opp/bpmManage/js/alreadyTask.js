/**
 * 已办任务管理
 *
 */
//init
window.$ready = function () {
    using('datagrid', function () {
        var conf = $.builder.format.datagrid($.parser.getConfigs(["UWK_hiTaskinstMrg"]));
        conf['columns'][0].push({ title:'操作', field:'showPicture', formatter:'function(value,row,index){return set_optCol(row);}'});
        $("#UWK_hiTaskinstMrg").datagrid(conf);
    });
}

//设置操作列
function set_optCol(row) {
    var picCol = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row.processInstanceId + '\');" >查看监控流程图</a>';
//            +'&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:void(0)"    onclick="uwk_alreadyTaskDetail(\''+row.taskId+'\',\''+row.taskName+'\')">查看详情&nbsp;&nbsp;</a>';
    return picCol;
}

//显示详情
function showDetail(taskId) {
    using("form", function () {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0005001',
                    BPM_OP:'getFormKey',
                    taskId:taskId
                }
            ],
            func:function (data) {
                $('#formDiv').empty();
                var formOpt = '<form id=' + viewId + '></form>';
                $("#formDiv").append(formOpt);
                var formConfig = $.parser.getConfigs([viewId]);
                if (formConfig['render'] != undefined) {
                    var view_config = $.builder.format.form(formConfig);
                    $('#formDiv>form').form(view_config);
                    $("#" + viewId).find('input[name=taskId]').val(taskId);
                    $('#formDialog').dialog({
                        title:'填写表单',
                        modal:true,
                        draggable:true,
                        width:500,
                        height:300
                    });
                    ajaxRequest({
                        async:false,
                        req:[
                            {
                                service:'P0005001',
                                BPM_OP:'getTaskVariables',
                                taskId:taskId
                            }
                        ],
                        func:function (data) {

                            var formData = data[0]['BPM_DATA'][0];
                            $("#" + viewId).form('load', formData);
                        }
                    });
                } else {
                    $.message.alert("获取表单错误");
                }
            }
        });
    });

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
//撤销流程
function cancelHiTaskinst() {
    var row = $('#UWK_hiTaskinstMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认撤销?', '确认撤销吗?', function (isOK) {
            if (isOK) {
                var taskId = row['taskId'];
                var processDefinitionId = row['processDefinitionId'];
                var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'withdrawTask',
                            PROCESS_KEY:PROCESS_KEY,
                            taskId:taskId
                        }
                    ],
                    func:function (data) {
                        $.message.alert('撤销成功');
                        $('#UWK_hiTaskinstMrg').datagrid('reload');
                    }
                });
            }
        });
    }
}
var hasCheckflag = false;
var rs;
//转义用户名
function findName(value) {
    if (!hasCheckflag) {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0001001',
                    USER_STA:'1'
                }
            ],
            func:function (data) {
                rs = data[0];
                hasCheckflag = true;
            }
        });
    }
    if (rs.length > 0) {
        if (value != '') {
            var userName
            for (var i = 0; i < rs.length; i++) {
                if (value == rs[i].USER_CODE) {
                    userName = rs[i].USER_NAME;
                }
            }
            return userName;
        } else {
            return value;
        }
    }
}

//转义删除原因
function parseDelReason(val) {
    var v = '';
    if (val != '') {
        if (val == 'deleted') {
            v = '删除';
        } else if (val == 'completed') {
            v = '正常提交';
        } else if (val == 'RollbackSource') {
            v = '回退';
        } else if (val == "RollbackDestination") {
            v = '处理回退';
        }else{
            v='强制结束';
        }
    }
    return v;
}

//显示已办任务详情
function uwk_alreadyTaskDetail() {
    var row = $('#UWK_hiTaskinstMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        var taskId = row['taskId'];
        var processDefinitionId = row['processDefinitionId'];
        var processDefinitionName = row['processDefinitionName'];
        var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
        ajaxRequest({
                async:false,
                req:[
                    {
                        service:'P0005001',
                        BPM_OP:'getFormKey',
                        PROCESS_KEY:PROCESS_KEY,
                        taskId:taskId
                    }
                ],
                func:function (data) {
                    using(["flow", "dialog", "form"], function () {
                        $('#formDiv').empty();
                        ajaxRequest({
                            async:false,
                            req:[
                                {
                                    service:'P0005001',
                                    BPM_OP:'listDoneTask',
                                    PROCESS_KEY:PROCESS_KEY,
                                    taskId:taskId,
                                    processDefinitionName:processDefinitionName
                                }
                            ],
                            func:function (data) {
                                var titles = '';
                                if (data[0]['BPM_DATA'][0].length > 0) {
                                    for (var i = 0; i < data[0]['BPM_DATA'].length; i++) {
                                        titles = titles + data[0]['BPM_DATA'][0]['taskName'] + "，";
                                    }
//                                               var titles = '报销申请，二级部门审批，财务审批';//这里的逗号要跟下面split的逗号格式一致
                                    var titleStr = titles.split("，");
                                    var dataArray = [];
                                    var src = "formTest.html";  //需要传回来动态解析
                                    for (var i = 0; i < titleStr.length; i++) {
                                        dataArray.push({title:titleStr[i], url:src, img:"step-icon-pic" + (i + 1) + ".png"});
                                    }
                                    $('#formDiv').flow({
                                        stepNum:titleStr.length,
                                        panelHeight:"245", //修改的是外面的框
                                        frameHeight:"200", //修改的是form表单内容的高度
                                        showIndex:2,
                                        imgPath:"../../frame/images/steps/",
                                        data:dataArray
                                    });
                                    $('#formDiv').flow("resize", 625);
                                    $('#formDiv').flow("hideToolButtom");   //hideToolButtom

                                    var viewId = data[0]['BPM_DATA'][0].formKey;
                                    ajaxRequest({
                                        async:false,
                                        req:[
                                            {
                                                service:'P0005001',
                                                BPM_OP:'getTaskVariables',
                                                PROCESS_KEY:PROCESS_KEY,
                                                taskId:taskId
                                            }
                                        ],
                                        func:function (data) {
                                            var setValue = window.setInterval(function () {
                                                var form = $("#formDiv").flow("getForm", "#busForm");
                                                form.attr("id", viewId);
                                                var idd2 = $("#formDiv").flow("getForm", "#" + viewId).attr("id");
                                                var form1 = $("#formDiv").flow("getForm", "#" + viewId);
                                                form1.find("input[name=BPM_OP]").val("completeTask");
                                                form1.find("input[name=taskId]").val(taskId);
                                                form1.find("input[name=PAR_NAME]").val(data[0]['BPM_DATA'][0].PAR_NAME);
                                                form1.find("input[name=PAR_VAL]").val(data[0]['BPM_DATA'][0].PAR_VAL);
                                                form1.find("input[name=MAINTAIN_FLAG]").val(data[0]['BPM_DATA'][0].MAINTAIN_FLAG);
                                                form1.find("input[name=PAR_CLS]").val(data[0]['BPM_DATA'][0].PAR_CLS);
                                                form1.find("input[name=PAR_CODE]").val(data[0]['BPM_DATA'][0].PAR_CODE);
                                            }, 1);
                                        }
                                    });
                                    $('#formDialog').dialog({
                                        title:'填写表单',
                                        modal:true,
                                        draggable:true,
                                        width:650,
                                        height:450
                                    });
                                }
                            }
                        });
                    });
                }
            }
        );
    }

}