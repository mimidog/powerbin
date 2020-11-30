/*
 *待办任务管理
 */
//init
var rs;
window.$ready = function () {
	using("textinput");
	$('#counterSignVal').textinput('disable');
	$('#counterSignVal').textinput({required:false});
	$("#counterSignVal").removeClass("validatebox-must");
    using(["datagrid", "combobox"], function () {
        var conf = $.builder.format.datagrid($.parser.getConfigs(["UWK_ruTaskMrg"]));
        conf['columns'][0].push({ title:'操作', field:'showPicture', formatter:'function(value,row,index){return set_optCol(row);}'});
        $("#UWK_ruTaskMrg").datagrid(conf);
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0001001'
                }
            ],
            func:function (data) {
                rs = data[0];
            }
        });

        if (rs.length > 0) {
            $("#touser").combobox({
                width:'140',
                editable:false,
                valueField:'USER_CODE',
                textField:'USER_NAME',
                data:rs
            });
        }

    });

}
function changeNextState(d) {
    var dict_des = d.text;
    var dict_val = d.value;
    if (dict_des != '') {
    	$("#counterSignVal").addClass("validatebox-must");
        $('#counterSignVal').textinput('enable');
        $('#counterSignVal').textinput({required:true});
    }
}
function clearFun(){
	$('#counterSignVal').textinput({required:false});
	$("#counterSignVal").removeClass("validatebox-must");
}
//设置操作列
function set_optCol(row) {
    var picCol = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row.processInstanceId + '\');" >查看监控流程图</a>';
//            +'&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:void(0)" onclick="showProcessDetail()">查看详情&nbsp;&nbsp;</a>';
    return picCol;
}
function clearCountersignUser(){
	 $('select[name=countersignUsersLeft]').empty();
    $('select[name=countersignUsersRight]').empty();
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

//传阅
function circularize(){
	
	var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    }
    $('select[id=waitCircularizeUser]').empty();
    $('select[name=selectedCircularizeUser]').empty();
    ajaxRequest({
        async:false,
        req:[
            {
                service:'P0001001'
            }
        ],
        func:function (data) {
            var usersInThisOrg = data[0];
            if (usersInThisOrg.length > 0) {
                $('select[id=waitCircularizeUser]').empty();
                for (var i = 0; i < usersInThisOrg.length; i++) {
                    var ipt = $('<option VALUE="' + usersInThisOrg[i].USER_CODE + '"> ' + usersInThisOrg[i].USER_CODE + "-" +  usersInThisOrg[i].USER_NAME + '</option>');
                    $('select[id=waitCircularizeUser]').append(ipt);
                }
            } else {
                $('select[id=waitCircularizeUser]').empty();
                var ipt = $('<option>--无对应用户--</option>');
                $('select[id=waitCircularizeUser]').append(ipt);
            }
        }
    });
      
      using("dialog", function () {
            $('#DIV_circularize').dialog({
                title:'传阅',
                modal:true,
                draggable:false,
                width:400,
                height:300,
                buttons:[
                    {
                        text:'确定',
                        iconCls:'icon-save',
                        handler:function () {
                            var taskId = row['taskId'];
                            var extraAssignees = '';
                            if(!$('#DIV_circularizeForm').form("validate")){
                            	return false ;
                            }
                            var $v = $('#DIV_circularizeForm').find('select[name=selectedCircularizeUser]');
	                        var extraAssigneesArray = $v[0].options;
                            if (extraAssigneesArray.length > 0 && (extraAssigneesArray[0].value).trim() != '----请选择用户----') {
                                for (var i = 0; i < extraAssigneesArray.length; i++) {
                                    extraAssignees += extraAssigneesArray[i].value + ',';
                                }
                            } else if (extraAssigneesArray[0] != null && (extraAssigneesArray[0].value).trim() == '----请选择用户----') {
                                $.message.alert("请选择需要传阅的用户");
                                return;
                            }
                            if(extraAssignees == ''){
                            	$.message.alert("请选择需要传阅的用户");
                                return;
                            }
                            extraAssignees = extraAssignees.substring(0, extraAssignees.length - 1);


                            $('#DIV_circularizeForm').form('submit', {
                                req:[
                                    {
                                        service:'P0005001',
                                        BPM_OP:'circularizeTask',
                    					taskId:taskId,
                    					viewers:extraAssignees
                                    }
                                ],
                                success:function (data) {
                                    $.message.alert("传阅成功！");
                                    $('#DIV_circularize').dialog('close');
                                    $("#UWK_ruTaskMrg").datagrid('reload');
                                }
                            });
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#DIV_circularize').dialog('close');
                        }
                    }
                ]
            });
        });
}

//处理任务
function dueTask() {
	$('#counterSignVal').textinput('disable');
	$('#counterSignVal').textinput({required:false});
	$("#counterSignVal").removeClass("validatebox-must");
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        var taskId = row['taskId'];
        var processDefinitionId = row['processDefinitionId'];
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
                var viewId = data[0]['BPM_DATA'][0].formKey;
                if (viewId.indexOf("UWK_") != -1) {
                    $('#formDiv').empty();
                    var ipt = $('<form class="kui-form" id=' + viewId + '></form>');
                    $('#formDiv').append(ipt);
                    $.parser.director($("#formDiv"));
                    $("#" + viewId).find('input[name=taskId]').val(taskId);
                    $("#" + viewId).find('input[name=BPM_OP]').val("completeTask");
                    $('#formDialog').dialog({
                        title:'填写表单',
                        modal:true,
                        draggable:true,
                        width:500,
                        height:300,
                        buttons:[
                            {
                                text:'提交',
                                iconCls:'icon-save',
                                handler:function () {
                                    $("#" + viewId).form('submit', {
                                        success:function (data) {
                                            $.message.alert('处理成功！');
                                            $('#UWK_ruTaskMrg').datagrid('reload');
                                            $('#formDialog').dialog('close');
                                        }
                                    });
                                }
                            },
                            {
                                text:'取消',
                                iconCls:'icon-cancel',
                                handler:function () {
                                    $('#formDialog').dialog('close');
                                }
                            }
                        ]
                    });
                } else if (viewId.indexOf("DIV_") != -1) {
					$('#DIV_shenpiForm').form('reset');
                    $('#' + viewId).dialog({
                        title:'处理任务表单',
                        modal:true,
                        draggable:true,
                        width:380,
                        height:450,
                        buttons:[
                            {
                                text:'提交',
                                iconCls:'icon-save',
                                handler:function () {
                                	
                                	if(!$('#DIV_shenpiForm').form('validate')){
										return false ;
									}
                                    var name = $("#name").val();
                                    var days = $("#days").val();
                                    var multiTaskType = $("#multiTaskType").combobox("getValue");
                                    var counterSignType = $("#counterSignType").combobox("getValue");
                                    var counterSignVal = $("#counterSignVal").val();
                                    var countersignUsers = '';
	                                var $v = $('#' + viewId).find(".kui-form").find('select[name=countersignUsersRight]');
	                                var countersignUsersArray = $v[0].options;
	                                if (countersignUsersArray.length > 0 && (countersignUsersArray[0].value).trim() != '----请选择用户----') {
	                                    for (var i = 0; i < countersignUsersArray.length; i++) {
	                                        countersignUsers += countersignUsersArray[i].value + ',';
	                                    }
	                                } else if (countersignUsersArray[0] != null && (countersignUsersArray[0].value).trim() == '----请选择用户----') {
	                                    countersignUsers = '';
	                                }
	                                countersignUsers = countersignUsers.substring(0, countersignUsers.length - 1);
	                               if($("#counterSignVal").hasClass("validatebox-must") && counterSignVal == 0 ){
	                                	$.message.alert("条件值必须大于0！");
	                                    return;
	                                }
	                                var regularExpression = /^[1-9]\d*$/;
	                                if (counterSignType == "number" && !regularExpression.test(counterSignVal)) {
	                                    $.message.alert("条件值请输入正整数！");
	                                    return;
	                                }
	                                
	                                if (counterSignType == "number" && counterSignVal > countersignUsersArray.length) {
	                                    $.message.alert("条件值不能大于已选用户数量！");
	                                    return;
	                                }
	                                
	                                if (counterSignType == "rate" && counterSignVal > 1) {
	                                    $.message.alert("条件值不能大于1！");
	                                    return;
	                                }
                                    ajaxRequest({
                                        async:false,
                                        req:[
                                            {
                                                service:'P0005001',
                                                BPM_OP:'completeTask',
                                                taskId:taskId,
                                                name:name,
                                                days:days,
                                                multiTaskType:multiTaskType,
                                                counterSignType:counterSignType,
                                                counterSignVal:counterSignVal,
                                                countersignUsers:countersignUsers
                                            }
                                        ],
                                        func:function (data) {
                                            $.message.alert('处理成功！');
                                            $("#UWK_ruTaskMrg").datagrid("reload");
                                            $('#' + viewId).dialog('close');
                                        }
                                    });
                                }
                            },
                            {
                                text:'取消',
                                iconCls:'icon-cancel',
                                handler:function () {
                                    $('#' + viewId).dialog('close');
                                    $('#' + viewId).dialog("refresh");
                                }
                            }
                        ]
                    });
                    $('#' + viewId).dialog('refresh');
                }

                $("#formDiv").show();
            }
        });
//                        using(["flow", "dialog","form"], function () {
////
//                            $('#formDiv').empty();
//                            var titles = '报销申请，二级部门审批，财务审批';//这里的逗号要跟下面split的逗号格式一致
//                            var titleStr = titles.split("，");
//                            var dataArray = [];
//                            var src = "formTest.html";  //需要传回来动态解析
//                            for (var i = 0; i < titleStr.length; i++) {
//                                dataArray.push({title:titleStr[i], url:src, img:"step-icon-pic" + (i + 1) + ".png"});
//                            }
//                            $('#formDiv').flow({
//                                stepNum:titleStr.length,
//                                panelHeight:"245", //修改的是外面的框
//                                frameHeight:"200", //修改的是form表单内容的高度
//                                showIndex:2,
//                                imgPath:"../../frame/images/steps/",
//                                data:dataArray
//                            });
//                            $('#formDiv').flow("resize", 625);
//                            $('#formDiv').flow("hideToolButtom");   //hideToolButtom
//                            $.parser.director("#formDiv");
//                            var viewId = data[0]['bpmData'][0].formKey;
//                            var oFrameWin=null;
//                            window.setTimeout(function(){
//                                oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
//                                $(oFrameWin.getElementById("innerForm")).empty();
//                                $("<form id="+viewId+" class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
//                                $.parser.director($(oFrameWin.getElementById("innerForm")));
//                                $(oFrameWin.getElementsByName("BPM_OP")[0]).val("completeTask");
//                                $(oFrameWin.getElementsByName("taskId")[0]).val(taskId);
//                            }, 500);
//                                $('#formDialog').dialog({
//                                    title:'填写表单',
//                                    modal:true,
//                                    draggable:true,
//                                    width:650,
//                                    height:450,
//                                    buttons:[
//                                        {
//                                            text:'提交',
//                                            iconCls:'icon-save',
//                                            handler:function () {
//                                                var oForm = $(oFrameWin.getElementsByName("viewName")[0]);
//                                                oForm.form('submit', {
//                                                    success:function (data) {
//                                                        var flagSta = data[0]['bpmMessage'][0].flag;
//                                                        if (flagSta == '0') {
//                                                            $.message.alert('处理成功');
//                                                            $('#UWK_ruTaskMrg').datagrid('reload');
//                                                            $('#formDialog').dialog('close');
//                                                        }
//                                                    },
//                                                    error:function () {
//                                                        $.message.alert('处理失败');
//                                                        return;
//                                                    }
//                                                });
//                                            }
//                                        },
//                                        {
//                                            text:'取消',
//                                            iconCls:'icon-cancel',
//                                            handler:function () {
//                                                $('#formDialog').dialog('close');
//                                            }
//                                        }
//                                    ]
//                                });
//                                $("#formDiv").show();
//
//                        });
//                    },
//                    error:function () {
//                        $.message.alert("获取表单错误");
//                    }
//                }
//        );
//    }
    }
}

//认领任务
function claimTask() {
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确定认领?', '确定认领此任务吗?', function (isOK) {
            if (isOK) {
                var taskId = row['taskId'];
                var processDefinitionId = row['processDefinitionId'];
                var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'claimTask',
                            PROCESS_KEY:PROCESS_KEY,
                            taskId:taskId
                        }
                    ],
                    func:function (data) {
                        $.message.alert('认领成功！');
                        $('#UWK_ruTaskMrg').datagrid('reload');
                    }
                });
            }});
    }
}

//解锁任务
function unclaimTask() {
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
    	confirm('是否确认解锁?', '确认解锁吗?', function (isOK) {
            if (isOK) {
		        var taskId = row['taskId'];
		        var processDefinitionId = row['processDefinitionId'];
		        var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
		        ajaxRequest({
		            async:false,
		            req:[
		                {
		                    service:'P0005001',
		                    BPM_OP:'unclaimTask',
		                    PROCESS_KEY:PROCESS_KEY,
		                    taskId:taskId
		                }
		            ],
		            func:function (data) {
		                $.message.alert('解锁成功！');
		                $('#UWK_ruTaskMrg').datagrid('reload');
		            }
		        });
		    }
    	});
    }
}

//代理任务
function delegateTask() {
    using(["form", "combogrid"], function () {
        var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
        if (row == null) {
            $.message.alert('请选择一条记录！');
            return;
        } else {
            var taskId = row['taskId'];
            var processDefinitionId = row['processDefinitionId'];
            var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
            $('#delegateForm').empty();
            var formOpt = '<form id=\"UWK_delegateForm\" class=\"kui-form\"></form>';
            $("#delegateForm").append(formOpt);
            var formConfig = $.parser.getConfigs(['UWK_delegateForm']);
            if (formConfig['render'] != undefined) {
                var view_config = $.builder.format.form(formConfig);
                $('#delegateForm>form').form(view_config);
                $('#delegateForm>form').find('input[name=touser]').combogrid({
                    panelWidth:350,
                    panelHeight:240,
                    singleSelect:true,
                    required:true,
                    multiple:false,
                    idField:'USER_CODE',
                    textField:'USER_NAME',
                    fallParas:[{enable:true}],
                    req:[
                        { service:'P0001008', USER_STA:'1', CURRENT_USER_CODE:g_user.userId
                        }
                    ],
                    queryCols:[
                        {
                            'text':'查询',
                            'icon':'icon-search',
                            collapsed:true,
                            cols:[
                                {
                                    title:'用户名称',
                                    field:'USER_NAME',
                                    editor:{
                                        type:'text',
                                        options:{
                                            validType:'val[1,64]'
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    columns:[
                        [
                            {field:'USER_CODE', title:'用户编号', width:100},
                            {field:'USER_NAME', title:'用户名称', width:200}
                        ]
                    ]
                });

                $('#delegateForm>form').find('input[comboname=touser]').combogrid('clear');


                $('#delegateTaskDialog').dialog({
                    title:'代理',
                    modal:true,
                    draggable:true,
                    width:400,
                    height:150,
                    buttons:[
                        {
                            text:'确定',
                            iconCls:'icon-save',
                            handler:function () {
                            	if(!$('#UWK_delegateForm').form('validate')){
									return false ;
								}
                                var touser = $("[name='touser']").val();
                                if (touser == null || touser == '') {
                                    $.message.alert('请选择代理人！');
                                    return;
                                } else {
                                    ajaxRequest({
                                        async:false,
                                        req:[
                                            {
                                                service:'P0005001',
                                                BPM_OP:'delegateTask',
                                                PROCESS_KEY:PROCESS_KEY,
                                                taskId:taskId,
                                                touser:touser

                                            }
                                        ],
                                        func:function (data) {
                                            $.message.alert('代理成功！');
                                            $('#delegateTaskDialog').dialog('close');
                                            $('#UWK_ruTaskMrg').datagrid('reload');
                                        }
                                    });
                                }

                            }
                        },
                        {
                            text:'取消',
                            iconCls:'icon-cancel',
                            handler:function () {
                                $('#delegateTaskDialog').dialog('close');
                            }
                        }
                    ]
                });
            }
        }
    });

}

//回退任务
function backTask() {
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否确认回退?', '确认回退吗?', function (isOK) {
            if (isOK) {
                var taskId = row['taskId'];
                var processDefinitionId = row['processDefinitionId'];
                var PROCESS_KEY = processDefinitionId.substring(0, processDefinitionId.indexOf(':'));
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'rollbackTask',
                            PROCESS_KEY:PROCESS_KEY,
                            taskId:taskId
                        }
                    ],
                    func:function (data) {
                        $.message.alert('回退成功！');
                        $('#UWK_ruTaskMrg').datagrid('reload');
                    }
                });
            }
        });
    }
}

//转义用户名
function findName(value) {
    if (rs.length > 0) {
        if (value != "") {
            var valueItems = value.split(",");
            var userName = '';
            for (var j = 0; j <= valueItems.length; j++) {
                for (var i = 0; i < rs.length; i++) {
                    if (valueItems[j] == rs[i].USER_CODE) {
                        userName += rs[i].USER_NAME + ",";
                    }
                }
            }
            return userName.substring(0, userName.length - 1);
        } else {
            return value;
        }
    }
}

//显示流程详情
function showProcessDetail() {
    using(["flow"], function () {
        $('#step').empty();
        var titles = '报销申请，二级部门审批，财务审批';//这里的逗号要跟下面split的逗号格式一致
        var titleStr = titles.split("，");
        var dataArray = [];
        var src = "formTest.html";  //需要传回来动态解析
        for (var i = 0; i < titleStr.length; i++) {
            dataArray.push({title:titleStr[i], url:src, img:"step-icon-pic" + (i + 1) + ".png"});
        }
        $('#step').flow({
            stepNum:titleStr.length,
            panelHeight:"200", //修改的是外面的框
            frameHeight:"190", //修改的是form表单内容的高度
            showIndex:2,
            imgPath:"../../frame/images/steps/",
            data:dataArray
        });
        $('#step').flow("resize", 780);
        $('#step').flow("hideToolButtom");   //hideToolButtom showToolButtom
        $('#flow_showDetailWindow').window('open');
    });
}

//选择机构用户
function selectOrgUser(node) {
   $('select[name=countersignUsersLeft]').empty();
    $('select[name=countersignUsersRight]').empty();
    var ORG_CODE = node.id;
//    if (isLeaf) {
    ajaxRequest({
        async:false,
        req:[
            {

                service:'P0001001',
                ORG_CODE:ORG_CODE
            }
        ],
        func:function (data) {
            var usersInThisOrg = data[0];
            if (usersInThisOrg.length > 0) {
                $('select[name=countersignUsersLeft]').empty();
                for (var i = 0; i < usersInThisOrg.length; i++) {
                    var ipt = $('<option VALUE="' + usersInThisOrg[i].USER_CODE + '"> ' + usersInThisOrg[i].USER_CODE + "-" +   usersInThisOrg[i].USER_NAME + '</option>');
                    $('select[name=countersignUsersLeft]').append(ipt);
                }
            } else {
                $('select[name=countersignUsersLeft]').empty();
                var ipt = $('<option>--无对应用户--</option>');
                $('select[name=countersignUsersLeft]').append(ipt);
            }
        }
    });
}

//移动单一元素
function moveSingleItem(sourceSelect, targetSelect) {
    //selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。注释：若允许多重选择，则仅会返回第一个被选选项的索引号。
    if (sourceSelect.selectedIndex == -1) { //如果没有选择任何项目则返回
        return;
    }
    if (sourceSelect.options[0].text == "----请选择用户----") {
        return;
    }
    if (targetSelect.options[0].text == "----请选择用户----") {
        targetSelect.options.remove(0);
    }
    var nowSelectedText = sourceSelect.options[sourceSelect.selectedIndex].text;
    var nowSelectedValue = sourceSelect.options[sourceSelect.selectedIndex].value;
    targetSelect.options.add(new Option(nowSelectedText, nowSelectedValue));//这里Option为什么要大写?
    sourceSelect.options.remove(sourceSelect.selectedIndex);

    if (sourceSelect.options.length == 0) {
        sourceSelect.options.add(new Option("----请选择用户----"));
    }
}

//移动全部元素
function moveAllItems(sourceSelect, targetSelect) {
    if (sourceSelect.options[0].text == "----请选择用户----") { //如果没有选择任何项目则返回
        return;
    }

    if (targetSelect.options[0].text == "----请选择用户----") {
        targetSelect.options.remove(0);
    }

    var selectLength = sourceSelect.length;
    for (var i = 0; i < selectLength; i++) {
        var nowSelectedText = sourceSelect.options[i].text;
        var nowSelectedValue = sourceSelect.options[i].value;
        targetSelect.options.add(new Option(nowSelectedText, nowSelectedValue));
    }
    while (( k = sourceSelect.length - 1) >= 0) {
        if (sourceSelect.options[0].text == "----请选择用户----") {
            break;
        }
        sourceSelect.options.remove(k);

        if (sourceSelect.options.length == 0) {
            sourceSelect.options.add(new Option("----请选择用户----"));
        }
    }
}

//加签
function AddTaskInstance() {
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
		
        using(['combotree', 'combobox', 'combo'], function () {
            $('#extraAssignees').combotree('clear');

        });
        //var multiTaskType = row['multiTaskType'];
        var multiTaskType = $("#multiTaskTypeVal").val();
        if (multiTaskType == '2') {
        	$("#addSequentialType").combobox({required:false});
            $('#addSequentialTypColTest').hide();
            $('#addSequentialTypColField').hide();
        }
        else {
            $('#addSequentialTypColTest').show();
            $('#addSequentialTypColField').show();
        }
        $('#DIV_jiaqianForm').form('reset');
        using("dialog", function () {
            $('#DIV_jiaqian').dialog({
                title:'加签',
                modal:true,
                draggable:false,
                width:400,
                height:400,
                buttons:[
                    {
                        text:'确定',
                        iconCls:'icon-save',
                        handler:function () {
                            var taskId = row['taskId'];
                            var multiTaskType = row['multiTaskType'];
                            var addSequentialType = $("#addSequentialType").combobox("getValue");
                            var extraAssignees = '';
                            if(!$('#DIV_jiaqianForm').form("validate")){
                            	return false ;
                            }
                            var $v = $('#DIV_jiaqianForm').find('select[name=countersignUsersRight]');
	                                var extraAssigneesArray = $v[0].options;
                           // var extraAssigneesArray = document.getElementById('countersignUsersRight').options;
                            if (extraAssigneesArray.length > 0 && (extraAssigneesArray[0].value).trim() != '----请选择用户----') {
                                for (var i = 0; i < extraAssigneesArray.length; i++) {
                                    extraAssignees += extraAssigneesArray[i].value + ',';
                                }
                            } else if (extraAssigneesArray[0] != null && (extraAssigneesArray[0].value).trim() == '----请选择用户----') {
                                $.message.alert("请选择需要加签的用户");
                                return;
                            }
                            if(extraAssignees == ''){
                            	$.message.alert("请选择需要加签的用户");
                                return;
                            }
                            extraAssignees = extraAssignees.substring(0, extraAssignees.length - 1);


                            $('#DIV_jiaqianForm').form('submit', {
                                req:[
                                    {
                                        service:'P0005001',
                                        BPM_OP:'addTaskInstance',
                                        taskId:taskId,
                                        multiTaskType:multiTaskType,
                                        addSequentialType:addSequentialType,
                                        extraAssignees:extraAssignees
                                    }
                                ],
                                success:function (data) {
                                    $.message.alert("加签成功！");
                                    $('#DIV_jiaqian').dialog('close');
                                    $("#UWK_ruTaskMrg").datagrid('reload');
                                }
                            });
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#DIV_jiaqian').dialog('close');
                        }
                    }
                ]
            });
        });
        $('select[name=countersignUsersRight]').empty();
        var textLeft = document.getElementById('countersignUsersLeft').options;
        var textRight = document.getElementById('countersignUsersRight').options;
        $('#DIV_jiaqianForm').form('reset');
        if (textLeft[0].value.trim() != '----请选择用户----') {
            $('select[name=countersignUsersLeft]').empty();
            document.getElementById('countersignUsersLeft').options.add(new Option("----请选择用户----"));
        }
        if (typeof textRight[0] != "undefined" && textRight[0].value.trim() != '----请选择用户----') {
            $('select[name=countersignUsersRight]').empty();
            document.getElementById('countersignUsersRight').options.add(new Option("----请选择用户----"));
        }
        
    }

}

//减签
function removeTaskInstance() {
    var row = $('#UWK_ruTaskMrg').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        using("dialog", function () {
            var assignee = row['assignee'];
            var assigneeArray = assignee.split(',');
            $('#countersignUsersLeft1').empty();
            $('#countersignUsersRight1').empty();
            document.getElementsByName('countersignUsersRight1')[0].options.add(new Option("----请选择用户----"));
            for (var i = 0; i < assigneeArray.length; i++) {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:"P0001001",
                            USER_CODE:assigneeArray[i]
                        }
                    ],
                    func:function (data) {
                        var returnData = data[0];
                        if (returnData.length > 0) {
                            var ipt = $('<option VALUE="' + returnData[0].USER_CODE + '"> ' + returnData[0].USER_CODE + "-" +  returnData[0].USER_NAME + '</option>');
                            $('#countersignUsersLeft1').append(ipt);
                        }
                    }
                });
            }
            $('#DIV_jianqian').dialog({
                title:'减签',
                modal:true,
                draggable:false,
                width:380,
                height:300,
                buttons:[
                    {
                        text:'确定',
                        iconCls:'icon-save',
                        handler:function () {
                            var taskId = row['taskId'];
                            var multiTaskType = row['multiTaskType'];
                            var extraAssignees = '';
                            var extraAssigneesArray = document.getElementById('countersignUsersRight1').options;
                            if (extraAssigneesArray.length > 0 && (extraAssigneesArray[0].value).trim() != '----请选择用户----') {
                                for (var i = 0; i < extraAssigneesArray.length; i++) {
                                    extraAssignees += extraAssigneesArray[i].value + ',';
                                }
                            } else if (extraAssigneesArray[0] != null && (extraAssigneesArray[0].value).trim() == '----请选择用户----') {
                                $.message.alert("请选择需要减签的用户");
                                return;
                            }
                            extraAssignees = extraAssignees.substring(0, extraAssignees.length - 1);

                            $('#DIV_jianqianForm').form('submit', {
                                req:[
                                    {
                                        service:'P0005001',
                                        BPM_OP:'subTaskInstance',
                                        taskId:taskId,
                                        multiTaskType:multiTaskType,
                                        extraAssignees:extraAssignees
                                    }
                                ],
                                success:function (data) {
                                    $.message.alert("减签成功！");
                                    $('#DIV_jianqian').dialog('close');
                                    $("#UWK_ruTaskMrg").datagrid('reload');
                                }
                            });
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#DIV_jianqian').dialog('close');
                        }
                    }
                ]
            });
        });
    }

}

//移动单一元素
function moveSingleItem(sourceSelect, targetSelect) {

    //selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。注释：若允许多重选择，则仅会返回第一个被选选项的索引号。
    if (sourceSelect.selectedIndex == -1) { //如果没有选择任何项目则返回
        return;
    }
    if (sourceSelect.options[0] != undefined && sourceSelect.options[0].text == "----请选择用户----") {
        return;
    }
    if (targetSelect.options[0] != undefined && targetSelect.options[0].text == "----请选择用户----") {
        targetSelect.options.remove(0);
    }
    var nowSelectedText = sourceSelect.options[sourceSelect.selectedIndex].text;
    var nowSelectedValue = sourceSelect.options[sourceSelect.selectedIndex].value;
    targetSelect.options.add(new Option(nowSelectedText, nowSelectedValue));//这里Option为什么要大写?
    sourceSelect.options.remove(sourceSelect.selectedIndex);

    if (sourceSelect.options.length == 0) {
        sourceSelect.options.add(new Option("----请选择用户----"));
    }
}

function moveAllItems(sourceSelect, targetSelect) {
    if (sourceSelect.options[0] != undefined && sourceSelect.options[0].text == "----请选择用户----") { //如果没有选择任何项目则返回
        return;
    }

    if (targetSelect.options[0] != undefined && targetSelect.options[0].text == "----请选择用户----") {
        targetSelect.options.remove(0);
    }

    var selectLength = sourceSelect.length;
    for (var i = 0; i < selectLength; i++) {
        var nowSelectedText = sourceSelect.options[i].text;
        var nowSelectedValue = sourceSelect.options[i].value;
        targetSelect.options.add(new Option(nowSelectedText, nowSelectedValue));
    }
    while (( k = sourceSelect.length - 1) >= 0) {
        if (sourceSelect.options[0] != undefined && sourceSelect.options[0].text == "----请选择用户----") {
            break;
        }
        sourceSelect.options.remove(k);

        if (sourceSelect.options.length == 0) {
            sourceSelect.options.add(new Option("----请选择用户----"));
        }
    }
}