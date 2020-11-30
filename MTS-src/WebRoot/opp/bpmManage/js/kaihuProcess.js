/**
 * 开户流程管理
 * @param e
 */
//开始办理
function start(e) {
    var hasCheckValue = document.getElementsByName("kaihu");
    var hasCheckValueNum = hasCheckValue.length;
    var BUS_TYPE = "";
    for (i = 0; i < hasCheckValueNum; i++) {
        if (hasCheckValue[i].checked == true) {
            BUS_TYPE += hasCheckValue[i].value + ",";
        }
    }
    BUS_TYPE = BUS_TYPE.substring(0, BUS_TYPE.length - 1);
    if (BUS_TYPE == "") {
        $.message.alert("请选择需要办理的业务！");
        return;
    } else {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0005001',
                    BPM_OP:'startProcess',
                    PROCESS_KEY:"openCust",
                    BUS_TYPE:BUS_TYPE
                }
            ],
            func:function (data) {
                var d = data[0]['BPM_DATA'][0];
                var processInstanceId = d.processInstanceId;
                var allTaskName = '';
                var viewId = '';
                var priority = '';
                //获取所有任务节点和表单请求
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
                            initFlow(e, titleStr, viewIdArray, priorityArray, processInstanceId);
                        }
//                            }
                    }
                });
            }
        })
        ;
    }
}
//初始化流程流
function initFlow(e, titleStr, viewIdArray, priorityArray, processInstanceId) {
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
            dataArray.push({title:titleStr[i], url:src, img:"step-icon-pic1.png"});
        }
        $('#flowDiv').flow({
            stepNum:titleStr.length,
            panelHeight:"200", //修改的是外面的框
            frameHeight:"180", //修改的是form表单内容的高度
            imgPath:"../../frame/images/steps/",
            data:dataArray,
            prevCallblack:function () {
                //先判断是否有权限查看
//                ajaxRequest({
//                    async:false,
//                    req:[
//                        {
//                            service:'P0005001',
//                            BPM_OP:'hasTaskPermissionByPriority',
//                            processInstanceId:processInstanceId,
//                            priority:priorityArray[($("#flowDiv").flow("getCurrStep"))-1],
//                            operType:"SHOW"
//                        }
//                    ],
//                    func:function (data) {
//                        var flagSta = data[0]['bpmMessage'][0].flag;
//                        if (flagSta == '9999') {
//                            $.message.alert("操作失败");
//                            return;
//                        } else {
//                            var ff= data[0]['bpmData'][0].hasPermission;
//                            if(ff!="true"){
//                                $.message.alert("你没有上一步查看权限");
//                                $('#formDialog').dialog("close");
//                                return;
//                            }
//                        }
//                    }
//                });
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
                        var getPriority = d.priority;
                        var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                        var currentPriority = $(oFrameWin.getElementsByName("priority")[0]).val();

                        if (getPriority != currentPriority || getPriority == '-1') {
                            var curentNextPriority = priorityArray[($("#flowDiv").flow("getCurrStep")) - 1];
                            if (curentNextPriority != getPriority || getPriority == '-1') {
                                if (curentNextPriority == undefined && getPriority == '-1') {
                                    oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                    $(oFrameWin.getElementById("innerForm")).empty();
                                    $("<span>业务办理流程已全部完成！谢谢</span>").appendTo($(oFrameWin.getElementById("innerForm")));
                                    $.parser.director($(oFrameWin.getElementById("innerForm")));
                                    return;
                                }

                                ajaxRequest({
                                    async:false,
                                    req:[
                                        {
                                            service:'P0005001',
                                            BPM_OP:'getTaskVariablesByPriority',
                                            processInstanceId:processInstanceId,
                                            priority:priorityArray[($("#flowDiv").flow("getCurrStep")) - 1]
                                        }
                                    ],
                                    func:function (data) {
                                        //判断下一步是否有查看权限
//                                                ajaxRequest({
//                                                    async:false,
//                                                    req:[
//                                                        {
//                                                            service:'P0005001',
//                                                            BPM_OP:'hasTaskPermissionByPriority',
//                                                            processInstanceId:processInstanceId,
//                                                            priority:priorityArray[($("#flowDiv").flow("getCurrStep"))-1],
//                                                            operType:"SHOW"
//                                                        }
//                                                    ],
//                                                    func:function (data) {
//                                                        var flagSta = data[0]['bpmMessage'][0].flag;
//                                                        if (flagSta == '9999') {
//                                                            $.message.alert("操作失败");
//                                                            return;
//                                                        } else {
//                                                            var ff= data[0]['bpmData'][0].hasPermission;
//                                                            if(ff!="true"){
//                                                                $.message.alert("当前任务已完成,你没有下一步查看权限");
////                                                                $("#flowDiv").flow("goBack");
////                                                                return;
//                                                            $('#formDialog').dialog("close");
//                                                            return;
//                                                            }
//                                                        }
//                                                    }
//                                                });

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
                            } else {
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
                        } else {
                            var oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                            var oForm = $(oFrameWin.getElementsByName("viewName")[0]);
                            oForm.form('submit', {
                                success:function (data) {
                                    //判断下一步是否有处理权限
                                    ajaxRequest({
                                        async:false,
                                        req:[
                                            {
                                                service:'P0005001',
                                                BPM_OP:'hasTaskPermissionByPriority',
                                                processInstanceId:processInstanceId,
                                                priority:priorityArray[($("#flowDiv").flow("getCurrStep")) - 1],
                                                operType:"COMPLETE"
                                            }
                                        ],
                                        func:function (data) {
                                            var ff = data[0]['BPM_DATA'][0].hasPermission;
                                            if (ff != "true") {
                                                $.message.alert("当前任务已完成,你没有下一步处理权限");
                                                $('#formDialog').dialog("close");
                                                return;
                                            }
                                        }
//                                                }
                                    });
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
                                    });
                                    var currStep = $("#flowDiv").flow("getCurrStep");
                                    window.setTimeout(function () {
                                        oFrameWin = document.getElementById("myFrame").contentWindow.window.document;
                                        $(oFrameWin.getElementById("innerForm")).empty();
                                        $("<form id=" + viewIdArray[priorityArray.indexOf(getAfterSubmitPriority)] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
//                                                $("<form id=" + viewIdArray[currStep - 1] + " class=\"kui-form\" name=\"viewName\"></form>").appendTo($(oFrameWin.getElementById("innerForm")));
                                        $.parser.director($(oFrameWin.getElementById("innerForm")));
                                        $(oFrameWin.getElementsByName("BPM_OP")[0]).val("completeTasksByPriority");
                                        $(oFrameWin.getElementsByName("processInstanceId")[0]).val(processInstanceId);
                                        $(oFrameWin.getElementsByName("priority")[0]).val(getAfterSubmitPriority);
//                                                $(oFrameWin.getElementsByName("priority")[0]).val(priorityArray[currStep - 1]);
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
            }
        });
        for (var i = 0; i < titleStr.length; i++) {
            $("#flowDiv").flow("disable", i);
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
            width:880,
            height:450
        });
        $("#flowDiv").show();
    });
}
//init
window.$ready = function () {
    if ($("#kaihuForm") != null) {
        $(".processPanel").mouseover(function () {
            $(this).addClass("on_processPanel");
        });
        $(".processPanel").mouseout(function () {
            $(this).removeClass("on_processPanel");
        });
    }
    $.parser.director($("#kaihuFlowDiv"));
}
