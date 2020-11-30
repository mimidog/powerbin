/**
 * 新开户流程待办任务管理
 */
//init
window.$ready = function () {
    using(["form", "combogrid", "datagrid"], function () {
        var conf = $.builder.format.datagrid($.parser.getConfigs(["UWK_newKaihuRunningProcessTaskManage"]));
        conf['columns'][0].push({ title:'操作', field:'showPicture', formatter:'function(value,row,index){return set_optCol(row);}'});
        $("#UWK_newKaihuRunningProcessTaskManage").datagrid(conf);
    });
}

//转义业务类型
function parseBusinessType(value) {
    var value = value.split(",");
    var businessType = '';
    for (var i = 0; i < value.length; i++) {
        if (value[i] == '1') {
            businessType += '证券业务,'
        } else if (value[i] == '2') {
            businessType += '开放式基金,'
        } else if (value[i] == '3') {
            businessType += '场外柜台,'
        } else if (value[i] == '4') {
            businessType += '个股期权,'
        } else if (value[i] == '5') {
            businessType += '融资融券,'
        } else if (value[i] == '6') {
            businessType += '理财业务,'
        }
    }
    return businessType.substring(0, businessType.length - 1);
}

//转义机构代码
function parseOrgCode(value) {
    var ORG_NAME = '';
    if (value != '' && value != null) {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0001031',
                    ORG_CODE:value
                }
            ],
            func:function (data) {
                if (data[0].length != 0) {
                    ORG_NAME = data[0][0]['ORG_NAME'];
                } else if (data[0].length == 0) {
                    ORG_NAME = "<font color='red'>" + value + "（已不存在此机构）</font>";
                }
            }
        });
    }
    return ORG_NAME;
}

//设置操作列
function set_optCol(row) {
    var picCol = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row.processInstanceId + '\');" >查看流程图</a>';
    return picCol;
}

//显示流程图
function showFlowPicture(value) {
    $('#flowPicture_showDiv').attr('src', '../../kjdp_modeler?method=graphHistoryProcessInstance&processInstanceId=' + value);
    var loadFlowPicture=window.setInterval(function () {
        var errorMessage = document.getElementById("flowPicture_showDiv").contentWindow.window.document.body.innerHTML;
        var IRETCODE = errorMessage.substring(errorMessage.indexOf('IRETCODE') + 11, errorMessage.indexOf('IRETCODE') + 13);
        if (IRETCODE == '-6') {
            confirm('提示', '您的服务器会话已过期，是否重新登录?\n', function (flag) {
                if (flag) {
                    try {
                        top.window.location.reload();
                    } catch (e) {
                    }
                } else {
                    window.location.replace("about:blank");
                }
            });
        } else {
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

//处理当前任务
function dueCurrentTask(e) {
    var row = $('#UWK_newKaihuRunningProcessTaskManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        var processInstanceId = row['processInstanceId'];
        var currentPriority = row['priority'];
        var currentFormKey = row['currentTaskFormKey'];
        var allTaskName = '';
        var viewId = '';
        var priority = '';
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0005001',
                    BPM_OP:'getUserTasksSortedByPriority',
                    processInstanceId:processInstanceId
                }
            ],
            func:function (data) {
                var bd = data[0]['BPM_DATA'];
                for (var i = 0; i < bd.length; i++) {
                    allTaskName += bd[i].activityName + "，";
                    viewId += bd[i].formKey + "，";
                    priority += bd[i].priority + "，";
                }
                var titleStr = allTaskName.substring(0, allTaskName.length - 1).split("，");
                var priorityArray = priority.substring(0, priority.length - 1).split("，");
                var viewIdArray = viewId.substring(0, viewId.length - 1).split("，");
                if (allTaskName != '') {
                    //设置flow窗口
                    initFlow(e, titleStr, viewIdArray, priorityArray, processInstanceId, currentPriority, currentFormKey);
                }
            }
        });
    }

}

//初始化流程流
function initFlow(e, titleStr, viewIdArray, priorityArray, processInstanceId, currentPriority, currentFormKey) {
    using(["flow", "dialog", "form"], function () {
        var dialog = $('#dialog');
        if (dialog.length > 0) {
            $("div").remove("#flowDiv");
            $("#dialog").append('<div id="flowDiv"></div>');
        } else {
            $('<div id="dialog"><div id="flowDiv"></div></div>').appendTo($("#formDialog"));
        }
        var dataArray = [];
        var src = "formTest.html";
        for (var i = 0; i < titleStr.length; i++) {
            dataArray.push({title:titleStr[i], url:src, img:"step-icon-pic2.png"});
        }
        $('#flowDiv').flow({
            stepNum:titleStr.length,
            panelHeight:"200", //修改的是外面的框
            frameHeight:"180", //修改的是form表单内容的高度
            imgPath:"../../frame/images/steps/",
            showIndex:priorityArray.indexOf(currentPriority) + 1,
            data:dataArray,
            prevCallblack:function () {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'getTaskVariablesByPriority',
                            processInstanceId:processInstanceId,
                            priority:priorityArray[$("#flowDiv").flow("getCurrStep") - 1]
                        }
                    ],
                    func:function (data) {
                       var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                        var currStep = $("#flowDiv").flow("getCurrStep");
                        window.setTimeout(function () {
                            oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                            $(oFrameWin.getElementById("innerForm")).empty();
                            $("<form id=" + viewIdArray[currStep - 1] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
                            $.parser.director($(oFrameWin.getElementById("innerForm")));
                            var formData = data[0]['BPM_DATA'][0];
                            $(oFrameWin.getElementById(viewIdArray[currStep - 1])).form('reset');
                            $(oFrameWin.getElementById(viewIdArray[currStep - 1])).form('load', formData);
                        }, 1000);
                    }
                });
            },
            nextCallblack:function () {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0005001',
                            BPM_OP:'getCurrentPriority',
                            processInstanceId:processInstanceId
                        }
                    ],
                    func:function (data) {
                        var d = data[0]['BPM_DATA'][0];
                        var getPriority = d.priority; //获取到当前需要处理的优先级
                        var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                        var currentPriority = $(oFrameWin.getElementsByName("priority")[0]).val();//获取到当前任务的优先级
                        //判断当前需要处理的优先级和当前任务的优先级是否相等，或者当前需要处理的优先级为-1表示已经跑完的流程
                        if (getPriority != currentPriority || getPriority == '-1') {//两个优先级不相等时，一种情况是回填表单，一种是最后结束节点的情况
                            var curentNextPriority = priorityArray[($("#flowDiv").flow("getCurrStep")) - 1];
                            if (curentNextPriority != getPriority || getPriority == '-1') { //判断是否是结束节点，或者流程已经跑完的情况
                                //当 curentNextPriority为undefined（结束节点）并且已完成的流程 显示完成欢迎提示页面
                                if (curentNextPriority == undefined && getPriority == '-1') {
                                    oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                    $(oFrameWin.getElementById("innerForm")).empty();
                                    $("<span>业务办理流程已全部完成！谢谢</span>").appendTo($(oFrameWin.getElementById("innerForm")));
                                    $.parser.director($(oFrameWin.getElementById("innerForm")));
                                    return;
                                }
                                //获取回填表单参数
                                ajaxRequest({
                                    async:false,
                                    req:[
                                        {
                                            service:'P0005001',
                                            BPM_OP:'getTaskVariablesByPriority',
                                            processInstanceId:processInstanceId,
                                            priority:curentNextPriority
                                        }
                                    ],
                                    func:function (data) {
                                        //回填表单
                                        var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                        var currStep = $("#flowDiv").flow("getCurrStep");
                                        window.setTimeout(function () {
                                            oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                            $(oFrameWin.getElementById("innerForm")).empty();
                                            $("<form id=" + viewIdArray[currStep - 1] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
                                            $.parser.director($(oFrameWin.getElementById("innerForm")));
                                            var formData = data[0]['BPM_DATA'][0];
                                            $(oFrameWin.getElementById(viewIdArray[currStep - 1])).form('reset');
                                            $(oFrameWin.getElementById(viewIdArray[currStep - 1])).form('load', formData);
                                        }, 1000);
//                                            }
                                    }
                                });
                            }
                            else if (curentNextPriority == getPriority) {
                                var currStep = $("#flowDiv").flow("getCurrStep");
                                var oFrameWin = null;
                                window.setTimeout(function () {
                                    oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                    $(oFrameWin.getElementById("innerForm")).empty();
                                    $("<form id=" + viewIdArray[currStep - 1] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
                                    $.parser.director($(oFrameWin.getElementById("innerForm")));
                                    $(oFrameWin.getElementsByName("BPM_OP")[0]).val("completeTasksByPriority");
                                    $(oFrameWin.getElementsByName("processInstanceId")[0]).val(processInstanceId);
                                    $(oFrameWin.getElementsByName("priority")[0]).val(priorityArray[currStep - 1]);
                                }, 1000);
                            }
                        } else if (getPriority == currentPriority) { //当前需要处理的优先级等于当前页面获取到的优先级时执行提交操作
                            var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                            var oForm = $(oFrameWin.getElementsByName("viewName")[0]);
                            oForm.form('submit', {
                                success:function (data) {
                                    //如果当前的优先级是最后一个优先级，提交完成显示欢迎信息
                                    if (getPriority == priorityArray[priorityArray.length - 1]) {
                                        oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                        $(oFrameWin.getElementById("innerForm")).empty();
                                        $("<span>业务办理流程已全部完成！谢谢</span>").appendTo($(oFrameWin.getElementById("innerForm")));
                                        $.parser.director($(oFrameWin.getElementById("innerForm")));
                                        return;
                                    }
                                    var getAfterSubmitPriority = '';
                                    ajaxRequest({
                                        async:false,
                                        req:[
                                            {
                                                service:'P0005001',
                                                BPM_OP:'getCurrentPriority',
                                                processInstanceId:processInstanceId
                                            }
                                        ],
                                        func:function (data) {
                                            var d = data[0]['BPM_DATA'][0];
                                            getAfterSubmitPriority = d.priority;
                                        }
//                                                }
                                    });

                                    var currStep = $("#flowDiv").flow("getCurrStep");
//                                            $('#flowDiv').flow("showIndex", priorityArray.indexOf(getAfterSubmitPriority)+1);
                                    window.setTimeout(function () {
                                        oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                        $(oFrameWin.getElementById("innerForm")).empty();
                                        $("<form id=" + viewIdArray[priorityArray.indexOf(getAfterSubmitPriority)] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
                                        $.parser.director($(oFrameWin.getElementById("innerForm")));
                                        $(oFrameWin.getElementsByName("BPM_OP")[0]).val("completeTasksByPriority");
                                        $(oFrameWin.getElementsByName("processInstanceId")[0]).val(processInstanceId);
                                        $(oFrameWin.getElementsByName("priority")[0]).val(getAfterSubmitPriority);
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
            }
        });
        for (var i = 0; i < titleStr.length; i++) {
            //$("#flowDiv").flow("disable", i);
        }
        $('#flowDiv').flow("resize", 850);
        $('#flowDiv').flow("showToolButtom");   //hideToolButtom
        $.parser.director("#flowDiv");
        var currStep = $("#flowDiv").flow("getCurrStep");
        var oFrameWin = null;
        window.setTimeout(function () {
            oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
            $(oFrameWin.getElementById("innerForm")).empty();
            $("<form id=" + viewIdArray[currStep - 1] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
            $.parser.director($(oFrameWin.getElementById("innerForm")));
            $(oFrameWin.getElementsByName("BPM_OP")[0]).val("completeTasksByPriority");
            $(oFrameWin.getElementsByName("processInstanceId")[0]).val(processInstanceId);
            $(oFrameWin.getElementsByName("priority")[0]).val(priorityArray[currStep - 1]);
        }, 1000);
        $('#formDialog').dialog({
            title:'填写表单',
            modal:true,
            draggable:true,
            width:900,
            height:500,
            buttons:[
                {
                    text:'取消',
                    iconCls:'icon-cancel',
                    handler:function () {
                        $('#formDialog').dialog('close');
                        $('#UWK_newKaihuRunningProcessTaskManage').datagrid('reload');
                    }
                }
            ]
        });
        $("#flowDiv").show();
    });
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
            for (var i = 0; i < rs.length; i++) {
                if (value == rs[i].USER_CODE) {
                    var userName = rs[i].USER_NAME;
                    return userName;
                }
            }
        } else {
            return value;
        }
    }
}
