
//人员资料管理js
window.$ready = function () {
    var $operInfoManage = $("#UUM_operInfoManage").datagrid("resize", {height: $(window).height()});
    ajaxRequest({
        req: [
            {service: 'P0001067'}
        ],
        func: function (data) {
            allExcluData = data[0];
        }
    });
    $operInfoManage.datagrid({onSelect: function(){
        var rowData = arguments[1] || {};
        if("系统管理员" === rowData.MAIN_POST_NAME || "系统管理" === rowData.MAIN_POST_NAME || 
            "超级管理员" === rowData.MAIN_POST_NAME || "超级管理" === rowData.MAIN_POST_NAME
           || "运行平台管理员" === rowData.MAIN_POST_NAME || rowData.USER_CODE==='9999'){
            $("#jobAllocateBtn").linkbutton("disable");
        }else{
            $("#jobAllocateBtn").linkbutton("enable");
        }
    }});

    var operJobManage = "<div id=\"div1\"><div id=\"operJobManage\" class=\"kui-dialog\" style=\"width:650px;height:300px\" kui-options=\"title:'人员岗位管理',closed:true,iconCls:'icon-regist',modal:true,onClose:function(){window.location.reload();}\"> <table id=\"UUM_job\" class=\"kui-datagrid\" style=\"height: 275px\"></table></div></div>";
    var operJobSetDialog = '<div id="operJobSetDialog" style="display: none;width: 500px;height: 350px;" ><table name="POST_IDS" id="UUM_POST_IDS" kui-options="fit:true" class="kui-datagrid"> </table></div>';
    $("body").append($(operJobManage));
    $("body").append($(operJobSetDialog));
    $.parser.director($("#div1"));
    $.parser.director($("#operJobSetDialog"));
}
var allExcluData;
function busCommDialog(formId, config) {
    var dialog = $("#" + formId);
    if (dialog.length > 0) {
        $("form", dialog).remove();
        $(".dialog-content", dialog).append($("<form class=\"kui-form\"></form>"));
        dialog.dialog('open');
    } else {
        dialog = $("<div id='" + formId + "'><form class='kui-form'></form></div>").appendTo($('body'));
        config.modal = config.modal || true;
        config.iconCls = config.iconCls || 'icon-edit';
        config.title = config.title || '弹出窗口';
        config.width = config.width || 500;
        config.height = config.height || 300;
        dialog.dialog(config);
    }
}
function userInfoAdd(e) {
    var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userInfoAddForm"]));
    var dialogConf = {
        title: '人员资料新增',
        width: 580,
        height: 280,
        iconCls: 'icon-add',
        buttons: [
            {
                text: '确定',
                iconCls: 'icon-save',
                handler: function () {
                    var d = $("#userInfoAddDialog"),
                        dForm = $('form', d);

                        var USER_CODE =d.find("input[name=USER_CODE]").val();
                        if($.trim(USER_CODE)==''){
                            alert('人员ID号不能空！');
                            return;
                        }
                        
                    dForm.form('submit', {
                        success: function () {
                            alert('人员资料新增成功！');
                            d.dialog("close");
                            e.data.target.datagrid("reload");
                        },
                        onSubmit: function (req) {
                            if (dForm.form('validate')) {
                                var pass = req[0]["USER_PASS"];
                                var userCode = req[0]["USER_CODE"];
                                req[0]["USER_PASS"] = encrypt(pass, userCode);
                                req[0]["POST_LVL"]='1';
                                return true;
                            }
                            return false;
                        }
                    });
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $("#userInfoAddDialog").dialog('close');
                }
            }
        ]
    };
    busCommDialog("userInfoAddDialog", dialogConf);
    formConf["common"] = true;
    $.parser.director($("#userInfoAddDialog"), {config: formConf});
    $('#userInfoAddDialog').find('div.form-box').css({'width':530});
    $("div.form-group-inline:eq(3)", $("#userInfoAddDialog")).append("<a id='btnCreateEmpId' href=\"javascript:void(0)\" class=\"kui-linkbutton\" kui-options=\"iconCls:\'icon-add\'\" onclick=\"createUserCode(event)\" ></a>");
    $("div.form-group-inline:eq(3)", $("#userInfoAddDialog")).css({'width':300});

    $.parser.director($("div.form-group-inline:eq(3)", $("#userInfoAddDialog")));

     $('#btnCreateEmpId').linkbutton('enable');

    $('input[comboname=ORG_CODE]',$("#userInfoAddDialog")).combotree('enable');

}
function userInfoModify(e) {
    var record = e.data.target.datagrid("getSelected");
    if (!record) {
        alert('提示', "请选择一条数据！");
        return false;
    }
    var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userInfoUpdateForm"]));
    var dialogConf = {
        title: '人员资料修改',
        width: 600,
        height: 300,
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '确定',
                iconCls: 'icon-save',
                handler: function () {
                    var d = $("#userInfoUpdateDialog"), dForm = $('form', d);
                    dForm.form('submit', {
                        success: function () {
                            alert('人员资料修改成功！');
                            d.dialog("close");
                            e.data.target.datagrid("reload");
                        },
                        onSubmit: function (req) {
                            return dForm.form('validate');
                        }
                    });
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $("#userInfoUpdateDialog").dialog('close');
                }
            }
        ]
    };
    busCommDialog("userInfoUpdateDialog", dialogConf);
    formConf["common"] = true;
    $.parser.director($("#userInfoUpdateDialog"), {config: formConf, record: record});
}

function userStatusModify(e) {
    var record = e.data.target.datagrid("getSelected");
    if (!record) {
        alert('提示', "请选择一条数据！");
        return false;
    }
    var formConf = $.builder.format.form($.parser.getConfigs(["UPM_userStatusModifyForm"]));
    var dialogConf = {
        title: '人员状态修改',
        buttons: [
            {
                text: '确定',
                iconCls: 'icon-save',
                handler: function () {
                    var d = $("#userStatusModifyDialog");
                    $('form', d).form('submit', {
                        success: function () {
                            alert('人员状态修改成功！');
                            d.dialog("close");
                            e.data.target.datagrid("reload");
                        }
                    });
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $("#userStatusModifyDialog").dialog('close');
                }
            }
        ]
    };
    busCommDialog("userStatusModifyDialog", dialogConf);
    formConf["common"] = true;
    $.parser.director($("#userStatusModifyDialog"), {config: formConf, record: record});
}

function jobAllocate() {
    var row = $('#UUM_operInfoManage').datagrid('getSelected');
    if (row == null) {
        alert('请选择一个人员！');
        return;
    } else {
        var USER_CODE = row['USER_CODE'];
        var opt = $('#UUM_job').datagrid('options');
        opt.req = [$.extend(opt.req[0], {USER_CODE: USER_CODE})];
        $('#UUM_job').datagrid('reload');
        $('#operJobManage').dialog('open');
    }
}
function closeUser(e) {
    var row = e.data.target.datagrid("getSelected");
    if (row == null) {
        alert('请选择一个人员！');
        return;
    } else {
        var USER_CODE = row['USER_CODE'];
        var USER_STA = '9';
        $.message.confirm('提示信息','确定注销该人员?',function(isOK){
            if (isOK){
            	ajaxRequest({
                    req: [
                        {
                            service: 'P0001005',
                            USER_STA: USER_STA,
                            USER_CODE: USER_CODE
                        }
                    ],
                    error: function () {
                        alert('人员注销失败！');
                    },
                    func: function (data) {
                        alert('人员注销成功！');
                        e.data.target.datagrid("reload");
                    }
                });   
            }   
        });
    }
}
function checkExcluJob(index, row) {
    var POST_ID = row['POST_ID'];
    var grid = $('#UUM_POST_IDS');
    var excluDatas = [], selected = grid.datagrid("getSelections");//选项中已选择的项
    $.each(allExcluData, function () {
        if (this.POST_ID == POST_ID) {
            excluDatas.push(this);
        }
    });
    $.each(selected, function() {
        for(var i=0;i<excluDatas.length;i++){
            if(this.POST_ID==excluDatas[i].POST_EXCLU_ID){
                var index2=grid.datagrid("getRowIndex",this);
                $.message.alert("提示信息","当前选择的岗位与已选中的岗位【"+this.POST_ID+"-"+this.POST_NAME+"】互斥！","info",function(){
                    	grid.datagrid("unselectRow",index);
                    }
                );
                
            }
        }
    });
}
function operAddJob() {
    var row = $('#UUM_operInfoManage').datagrid('getSelected');
    var rows = $('#UUM_job').datagrid('getRows');
    var USER_CODE = row['USER_CODE'];
    $('#UUM_POST_IDS').datagrid("clearSelections");
    var opt = $('#UUM_POST_IDS').data().datagrid.options;
    opt.req = [$.extend(opt.req[0], {USER_CODE: USER_CODE})];
    $('#UUM_POST_IDS').datagrid('reload');
    using('dialog', function () {
        var d = $('#operJobSetDialog');
        d.dialog({
            title: '人员分配岗位',
            width: 500,
            modal: true,
            buttons: [
                {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        var USER_CODE = row['USER_CODE'];
                        var POST_IDS = $('#UUM_POST_IDS').datagrid('getSelections');
                        if (POST_IDS[0] == null || POST_IDS[0] == '') {
                            alert("请选择要添加的岗位！");
                            return;
                        } else {
                            if (POST_IDS.length > 0) {
                                var postIds = [];
                                for (var i = 0; i < POST_IDS.length; i++) {
                                    postIds[i] = POST_IDS[i].POST_ID;
                                }
                                d.find(".l-btn").linkbutton("disable");
                                ajaxRequest({
                                    req: [
                                        {
                                            service: 'P0001063',
                                            USER_CODE: USER_CODE,
                                            POST_ID: postIds.toString()
                                        }
                                    ],
                                    error: function () {
                                        alert('人员岗位设置失败！');
                                        d.find(".l-btn").linkbutton("enable");
                                    },
                                    func: function (data) {
                                        alert('人员岗位设置成功！');
                                        d.find(".l-btn").linkbutton("enable");
                                        $('#UUM_POST_IDS').datagrid("clearSelections");
                                        $('#operJobSetDialog').dialog('close');
                                        $('#UUM_job').datagrid('reload');
                                    }
                                });
                            } else {
                                alert('请选择要添加的岗位');
                                return;
                            }
                        }
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#operJobSetDialog').dialog('close');
                    }
                }
            ]
        });
    });
    $('#operJobSetDialog').dialog("move", {left: 290, top: 120});
}

function operDelJob() {
    var row = $('#UUM_job').datagrid('getSelections');
    var d = $('#operJobSetDialog');
    if (row.length == 0) {
        alert('请选择要删除的数据！');
    } else {
        var postIds = [];
        var userCode = [];
        for (var i = 0; i < row.length; i++) {
            var POST_ID = row[i]['POST_ID'];
            postIds[i] = POST_ID;
        }
        confirm('提示信息', '是否确认删除?', function (isOK) {
            if (isOK) {
                d.find(".l-btn").linkbutton("disable");
                ajaxRequest({
                    req: [
                        {
                            service: 'P0001054',
                            POST_ID: postIds.toString(),
                            USER_CODE: row[0]['USER_CODE']
                        }
                    ],
                    error: function () {
                        alert('岗位删除失败！');
                        d.find(".l-btn").linkbutton("enable");
                    },
                    func: function (data) {
                        alert('岗位删除成功！');
                        d.find(".l-btn").linkbutton("enable");
                        $('#UUM_job').datagrid('reload');
                    }
                });
            }
        });
    }
}

function setPrimaryJob() {
    var row = $('#UUM_job').datagrid('getSelections');
    if (row.length == 0 || row.length > 1) {
        alert('请选择一条数据进行操作！');
        $('#UUM_job').datagrid('unselectAll');
        return false;
    }
    var d = $("#operJobManage");
    d.find(".l-btn").linkbutton("disable");
    ajaxRequest({
        req: [
            {
                service: 'P0001059',
                USER_CODE: row[0].USER_CODE,
                POST_ID: row[0].POST_ID
            }
        ],
        func: function (data) {
            alert('主岗位设置成功！');
            d.find(".l-btn").linkbutton("enable");
            $('#UUM_job').datagrid('reload');
        },
        error: function (e) {
            alert('主岗位设置失败！');
            d.find(".l-btn").linkbutton("enable");
        }
    });
}

    function createUserCode(e){
        var empOrg=$("#userInfoAddDialog").find(':input[name=ORG_CODE]').val();
        if($.trim(empOrg)==''){
            alert('请选择机构名称！');
            return;
        }

        ajaxRequest({
            async: false,
            req: [{
                service:'M0000093',
                ORG_CODE:empOrg
            }],
            func: function(data) {
              var   newEmpId = data[0][0]["USER_CODE"];
                $("#userInfoAddDialog").find(':input[name=USER_CODE]').val(newEmpId);
                $('#btnCreateEmpId').linkbutton('disable');
                $('input[comboname=ORG_CODE]',$("#userInfoAddDialog")).combotree('disable');
            }
        });




    			/*var userCodeMax = "";
				//把人员序号查询出来。
				ajaxRequest({
					async: false,
					req: [{
						service: 'P0000111'
					}],
					func: function(data) {
						userCodeMax = data[0][0]["USER_CODE"];
					}
				});
				if(parseInt(userCodeMax)  >= 9999999999){
					alert('ID号已超过最大值,请扩大用户代码序号范围！');
					return false;
				}else{ 
					//判断如果生成的ID号不大于系统最大长度进行操作
						ajaxRequest({
							req: [{
								service: 'P0000112'
							}],
							func: function(data) {
								var userCode = data[0][0]["USER_CODE"];
								   $("form[class=kui-form] input[name=USER_CODE]").val(userCode);
							}
						});
				}*/
    }
    
    function sortOrg(data) {
    	data = kui.quickSort(data,"id");
    	return data;
    }
    
    
  //重置所有密码
    function batchAdd(e) {
    	confirm("提示", "确定批量修改密码？", function (isOk) {
            if (isOk) {
		        var rows = $.data(e.data.target[0], "datagrid").originalRows;
		        var reqData = [{service:'P0001009'}];   
		        //reqData = reqData.substring(1);
		    	e.data.target.datagrid("loading");
		        ajaxRequest({
		            req: reqData,
		            func: function(data) {
		                alert('修改密码成功！');
		    			e.data.target.datagrid("loaded");
		            },
		            error: function() {
		                alert('修改密码失败！');
		    			e.data.target.datagrid("loaded");
		            }
		        });
            }
        });
    }
