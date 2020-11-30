/**
 * 发起流程管理
 */
//
using(['dialog', 'form', 'combotree', 'combo', 'tree','textinput']);
//发起流程
function start(e) {
	$('#counterSignVal').textinput('disable');
	$('#counterSignVal').textinput({required:false});
	$("#counterSignVal").removeClass("validatebox-must");
    var PROCESS_KEY = $(e.target).closest("a.kui-linkbutton").attr("name");
    ajaxRequest({
        async:false,
        req:[
            {
                service:'P0005001',
                BPM_OP:'startProcess',
                PROCESS_KEY:PROCESS_KEY
            }
        ],
        func:function (data) {
            var viewId = data[0]['BPM_DATA'][0].formKey;
            if (viewId == undefined) {
                $.message.alert('发起成功！');
            } else if (viewId.indexOf("UWK_") != -1) {
                $('#formDiv').empty();
                var ipt = $('<form class="kui-form" id=' + viewId + ' ></form>');
                $('#formDiv').append(ipt);
                $.parser.director($("#formDiv"));
                $("#" + viewId).find('input[name=BPM_OP]').val("startProcessByForm");
                $("#" + viewId).find('input[name=PROCESS_KEY]').val(PROCESS_KEY);
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
                                        $.message.alert('发起成功！');
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
                $('select[name=countersignUsersLeft]').empty();
                $('select[name=countersignUsersRight]').empty();
                using(['combotree', 'combo'], function () {
                    $('#countersignUsers').combotree('clear');
                    $('#countersignUsers1').combotree('clear');
                    $('#countersignUsers2').combotree('clear');
                });
                var formId = $('#' + viewId).find(".kui-form").attr("id");
                $('#counterSignVal').textinput('disable');
                $("#" + formId).form('clear');
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
                            	if(!$('#' + formId).form('validate')) return false;
                                var paramJson = kui.serialize2Json(kui.serialize('#' + formId));
                                var name = paramJson["name"];
                                var days = paramJson["days"];
                                var multiTaskType = '';
                                if (paramJson["multiTaskType"] != undefined) {
                                    multiTaskType = paramJson["multiTaskType"];
                                }
                                var counterSignType = '';
                                if (paramJson["counterSignType"] != undefined) {
                                    counterSignType = paramJson["counterSignType"];
                                }
                                var counterSignVal = '';
                                if (paramJson["counterSignVal"] != undefined) {
                                    counterSignVal = paramJson["counterSignVal"];
                                }
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
                                
                                

                                $('#DIV_shenpiForm').form('submit', {
                                    req:[
                                        {
                                            service:'P0005001',
                                            BPM_OP:'startProcessByForm',
                                            PROCESS_KEY:PROCESS_KEY,
                                            name:name,
                                            days:days,
                                            multiTaskType:multiTaskType,
                                            counterSignType:counterSignType,
                                            counterSignVal:counterSignVal,
                                            countersignUsers:countersignUsers
                                        }
                                    ],
                                    success:function (data) {
                                        $.message.alert('发起成功！');
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
        }
    });
}


function clearCountersignUser(){
	 $('select[name=countersignUsersLeft]').empty();
    $('select[name=countersignUsersRight]').empty();
}

//init
window.$ready = function () {
    ajaxRequest({
        async:false,
        req:[
            {
                service:'P0005001',
                BPM_OP:'listProcessDefinition'
            }
        ],
        func:function (data) {
            if (data[0].BPM_DATA.length > 0) {
                for (var i = 0; i < data[0].BPM_DATA.length; i++) {
                    var processDefinitionName1 = data[0].BPM_DATA[i].processDefinitionName;
                    var processDefinitionName2 = '';
                    if (processDefinitionName1.length < 10) {
                        processDefinitionName2 = processDefinitionName1;
                    } else {
                        processDefinitionName2 = processDefinitionName1.substring(0, 10) + "...";
                    }
                    var ipt = $('<div class=\"processPanel\">' +
                        '<div class=\"processTitle\" title='+processDefinitionName1+'><br>' + processDefinitionName2 + '</div>' +
                        '<div class=\"processButton\"><a href=\"javascript:void(0)\" class=\"kui-linkbutton\" kui-options=\"iconCls:\'icon-ok\'\" onclick=\"start(event)\"   name=\"' + data[0].BPM_DATA[i].processDefinitionKey + '\" >发起</a>' +
                        '</div> <div class=\"processButton\"><a href=\"javascript:void(0)\" class=\"kui-linkbutton\" kui-options=\"iconCls:\'icon-flow\'\"  onclick=\"showFlowPicture(\'' + data[0].BPM_DATA[i].processDefinitionKey + '\')\" >流程图</a>' +
                        '</div></div>');
                    $('#flowDiv').append(ipt);
                    if (ipt != null) {
                        $(".processPanel").mouseover(function () {
                            $(this).addClass("on_processPanel");
                        });
                        $(".processPanel").mouseout(function () {
                            $(this).removeClass("on_processPanel");
                        });
                    }
                    
                }
                $.parser.director($("#flowDiv"));
            }
        }
    });
}

//显示流程图
function showFlowPicture(value) {
	$.ajax({
		url: encodeURI(encodeURI('../../kjdp_modeler?method=graphProcessDefinition&PROCESS_KEY=' + value)),
		//contentType: 'text/xml; charset=utf-8',
		async:false,
		dataType: 'text',
		type: 'POST',
		success: function(data) {
			if(data.indexOf("ANSWERS") > -1){
				var errorCode=JSON.parse(data).ANSWERS[0].ANS_MSG_HDR.MSG_CODE;
	            var errorMsg=JSON.parse(data).ANSWERS[0].ANS_MSG_HDR.MSG_TEXT;
	            if (errorCode == '8888888888') {
		            confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
		                if (flag) {
		                    try {
		                        top.window.location.reload();
		                        return false;
		                    } catch (e) {
		                    }
		                } else {
		                    window.location.replace("about:blank");
		                }
		            });
		        }
	            if(errorCode=='9999'){
	                //$('#flowPicture_showDialog').dialog('close');
	                $.message.alert(errorMsg);
	                return false;
	            }
				return false ;
			}
			if(data.indexOf("PNG") > -1){
				$('#flowPicture_showDiv').attr('src', encodeURI(encodeURI('../../kjdp_modeler?method=graphProcessDefinition&PROCESS_KEY=' + value)));
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
				return false ;
			}
		}
	});
}

function startRequest(value){
    var xmlHttp;
    if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
    try{
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4){
                if (xmlHttp.status == 200 || xmlHttp.status == 0){
                    var xmlDOM = xmlHttp.responseXML;
                    var msg=xmlHttp.responseText;
                    try{
                        var msgJSON=eval("(" + msg + ")");
                    }catch(e){
                        $('#flowPicture_showDiv').attr('src', encodeURI(encodeURI('../../kjdp_modeler?method=graphProcessDefinition&PROCESS_KEY=' + value)));
                        return false;
                    }
                    var errorCode=msgJSON.ANSWERS[0].ANS_MSG_HDR.MSG_CODE;
                    var errorMsg=msgJSON.ANSWERS[0].ANS_MSG_HDR.MSG_TEXT;
                    if(errorCode=='9999'){
                        $('#flowPicture_showDialog').dialog('close');
                        $.message.alert(errorMsg);
                        return false;
                    }
                }
            }
        };
        xmlHttp.open("GET", encodeURI(encodeURI("../../kjdp_modeler?method=graphProcessDefinition&PROCESS_KEY=" + value, true)));
        xmlHttp.send(null);
    }catch(exception){
        alert("您要访问的资源不存在!");
    }
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
                    var ipt = $('<option VALUE="' + usersInThisOrg[i].USER_CODE + '"> ' + usersInThisOrg[i].USER_CODE + "-" + usersInThisOrg[i].USER_NAME + '</option>');
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