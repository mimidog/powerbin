/**
 * 代理任务管理
 */
//init
window.$ready=function () {
    using('datagrid', function () {
        var conf = $.builder.format.datagrid($.parser.getConfigs(["UWK_delegateTaskMrg"]));
        conf['columns'][0].push({ title:'操作', field:'showPicture', formatter:'function(value,row,index){return set_optCol(row);}'});
        $("#UWK_delegateTaskMrg").datagrid(conf);
    });
}

//设置操作列
function set_optCol(row) {
    var picCol = '&nbsp;<a href="javascript:void(0)" onclick="showFlowPicture(\'' + row.processInstanceId + '\');" >查看监控流程图</a>';
    return picCol;
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
         }else{
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

var hasCheckflag=false;
var rs;
//转义用户名
function findName(value) {
    if(!hasCheckflag){
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