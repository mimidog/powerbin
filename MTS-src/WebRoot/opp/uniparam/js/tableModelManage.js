window.$ready = function () {
    var cw = $(window).width();
    var ch = $(window).height() - 1;
    var tabmanageWidth = (cw / 2) - 45;
    
    $("#GEN_KGE_TABSManage").parent().parent().find(".panel-tool").remove();
    
    if(tabmanageWidth > 518){
        $("#GEN_KGE_TABSManage_Panel")[0].style.width = 518 + 'px';
        $("#GEN_KGE_TAB_COLSManage_Panel")[0].style.width = cw - 520 + 'px';
    }
    else {
    	$("#GEN_KGE_TABSManage_Panel")[0].style.width = '510px';
        $("#GEN_KGE_TAB_COLSManage_Panel")[0].style.width = cw - 520 + 'px';
    }

    //重写页面字段校验方法
    $(".numcharClass").bind("blur", function () {
        var validate_obj = $.fn.validatebox.defaults.rules.numchar;
        validate_obj.validator = function (value, param) {
            var regularExpression =/^([a-zA-z]{1})([_0-9a-zA-z_]*)$/;
            var type = regularExpression.test(value);
            var num = value.length >= param[0] && value.length <= param[1];
            return type && num;
        }
        if (!validate_obj.validator($(this).val(), [1, 30])) {
            validate_obj.message = "请输入 {0} 到 {1}个字符,只能输入数字或英文字符且以字母开头"
            return false;
        }
    });
}
function getOracleKeyWords() {
    var oracleKeyWords = " ACCESS access ADD add ALL all ALTER alter AND and ANY any AS as ASC asc AUDIT audit BETWEEN between BY by CHAR char CHECK heck CLUSTER cluster COLUMN column COMMENT comment COMPRESS compress CONNECT connect CREATE create CURRENT current DATE date DECIMAL decimal DEFAULT default DELETE delete DESC desc DISTINCT distinct DROP drop ELSE else EXCLUSIVE exclusive EXISTS exists FILE file FLOAT float FOR for FROM from GRANT grant GROUP group HAVING having IDENTIFIED identified IMMEDIATE immediate IN in INCREMENT increment INDEX index INITIAL initial INSERT insert INTEGER integer INTERSECT intersect INTO into IS is LEVEL level LIKE like LOCK lock LONG long MAXEXTENTS maxextents MINUS minus MLSLABEL mlslabel MODE mode MODIFY modify NOAUDIT noaudit NOCOMPRESS nocompress NOT not NOWAIT nowait NULL null NUMBER number OF of OFFLINE offline ON on ONLINE online OPTION option OR or ORDER order PCTFREE pctfree PRIOR prior PRIVILEGES privileges PUBLIC public RAW raw RENAME rename RESOURCE resource REVOKE revoke ROW row ROWID rowid ROWNUM rownum ROWS rows SELECT select SESSION session SET set SHARE share SIZE size SMALLINT smallint START start SUCCESSFUL successful SYNONYM synonym SYSDATE sysdate TABLE table THEN then TO to TRIGGER trigger UID uid UNION union UNIQUE unique UPDATE update USER user VALIDATE validate VALUES values VARCHAR varchar VARCHAR2 varchar2 VIEW view WHENEVER whenever WHERE where WITH with ";
    return oracleKeyWords;

}

String.prototype.trim = function()  
{  
  return this.replace(/(^\s*)|(\s*$)/g, "");  
}  

var totalNumbers = '';
function onClickLeftTableRow(index, row) {
    var reqParam = {};
    var mainTableOpts = $("#GEN_KGE_TABSManage").data().datagrid.options;
    var mainColumns = mainTableOpts.columns[0];
    reqParam[mainColumns[1].field] = row['tabName'];
    var $second = $("#GEN_KGE_TAB_COLSManage");
    $second.datagrid("loadData", {});
    if (!$.isEmptyObject(reqParam)) {
        var secondOpts = $second.data().datagrid.options;
        var service = {'service':'P006011'};
        secondOpts.req = [$.extend(service, reqParam)];
        $second.datagrid("reload");
        $.data($second[0], "datagrid").options.onLoadSuccess = function (data) {
            totalNumbers = data.total;
        }
    }
    if (mainTableOpts["id"] == "GEN_KGE_TABSManage") {
        switch (row['status']) {
            case '1':
                $('.datagrid-toolbar a:gt(0)').linkbutton('enable');
                break;
            case '2':
                $('.datagrid-toolbar a:gt(0)').linkbutton('disable');
                break;
            default :
                break;
        }
    }
}
//对象模型操作
function addTable() {

    using('dialog', function () {
        $('#addOrEditTableForm').form('reset');
        var date = new Date();
        var tabId = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds();
        $("#tabId").val(tabId);
        $("#lastUpdateUser").val(g_user.userName);
        $('#addOrEditTableFormDialog').dialog({
            iconCls:'icon-add',
            title:'新增对象模型',
            modal:true,
            draggable:true,
            width:600,
            height:200,
            buttons:[
                {
                    text:'保存',
                    iconCls:'icon-save',
                    handler:function () {
                        var paramJson = kui.serialize2Json(kui.serialize('#addOrEditTableForm'));
                        $('#addOrEditTableForm').form('submit', {
                            req:[
                                {
                                    service:'P006002',
                                    tabId:paramJson['tabId'],
                                    tabName:paramJson['tabName'],
                                    tabCname:paramJson['tabCname'],
                                    tabSpace:paramJson['tabSpace'],
                                    lastUpdateUser:g_user.userId
                                }
                            ],
                            onSubmit:function (req) {
                                if ($(this).form('validate')) {
                                    if(checkTableNameUnique(paramJson))
                                    {
                                    	return false;
                                    }
                                    var tabNameVal = paramJson['tabName'];
                                    if (getOracleKeyWords().indexOf(' ' + tabNameVal.trim().toUpperCase() + ' ') > 0) {
                                        alert('表名不能是数据库的关键字，请重新输入！');
                                        return false;
                                    }
                                    return true;
                                }
                                return false;
                            },
                            success:function (data) {
                                $.message.alert('保存成功！')
                                $('#addOrEditTableFormDialog').dialog('close');
                                $('#GEN_KGE_TABSManage').datagrid('reload');
                            }
                        });
                    }
                },
                {
                    text:'取消',
                    iconCls:'icon-cancel',
                    handler:function () {
                        $('#addOrEditTableFormDialog').dialog('close');
                    }
                }
            ]
        });
    });

}
function editTable(row) {
    $('#addOrEditTableForm').form('reset');
    var row = $('#GEN_KGE_TABSManage').datagrid('getSelected');
    var index2=$('#GEN_KGE_TABSManage').datagrid("getRowIndex",row);
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {

        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P006001',
                    tabName:row['tabName']
                }
            ],
            func:function (data) {
                $('#addOrEditTableForm').form("load", data[0][0]);
                $('#GEN_KGE_TABSManage').datagrid('reload');
                //for (var i = 0; i < rs.length; i++) {
                //    if (rs[i]['USER_CODE'] == data[0][0]['lastUpdateUser']) {
                //        $("#lastUpdateUser").val(rs[i]['USER_NAME']);
                //    }
                //}
            }
        });
        $('#addOrEditTableFormDialog').dialog({
            iconCls:'icon-edit',
            title:'修改对象模型',
            modal:true,
            draggable:true,
            width:600,
            height:200,
            buttons:[
                {
                    text:'保存',
                    iconCls:'icon-save',
                    handler:function () {
                        var paramJson = kui.serialize2Json(kui.serialize('#addOrEditTableForm'));
                        
                        $('#addOrEditTableForm').form('submit', {
                            req:[
                                {
                                    service:'P006003',
                                    tabId:paramJson['tabId'],
                                    tabName:paramJson['tabName'],
                                    tabCname:paramJson['tabCname'],
                                    tabSpace:paramJson['tabSpace'],
                                    lastUpdateUser:g_user.userId,
                                    oldTabName:row['tabName']
                                }
                            ],
                            onSubmit:function (req) {
                                if ($(this).form('validate')) {
                                    if(checkTableNameUnique(paramJson))
                                    {
                                    	return false;
                                    }
                                    
                                    var tabNameVal = paramJson['tabName'];
                                    if (getOracleKeyWords().indexOf(' ' + tabNameVal.trim().toUpperCase() + ' ') > 0) {
                                        alert('表名不能是数据库的关键字，请重新输入！');
                                        return false;
                                    }
                                    return true;
                                }
                                return false;
                            },
                            success:function (data) {
                                $.message.alert('修改成功！')
                                $('#addOrEditTableFormDialog').dialog('close');
                                $('#GEN_KGE_TABSManage').datagrid('reload');
                                var $reloadTab = $("#GEN_KGE_TABSManage");
                                $.data($reloadTab[0], "datagrid").options.onLoadSuccess = function (data) {
                                	$('#GEN_KGE_TABSManage').datagrid('selectRow',index2);
                                	var row2 = $('#GEN_KGE_TABSManage').datagrid('getSelected');
                                    onClickLeftTableRow(index2,row2);
                                }
                            }
                        });
                    }
                },
                {
                    text:'取消',
                    iconCls:'icon-cancel',
                    handler:function () {
                        $('#addOrEditTableFormDialog').dialog('close');
                    }
                }
            ]
        });
        
    }
}
function removeTable(row) {
    var row = $('#GEN_KGE_TABSManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
    	var subRowsSize = $('#GEN_KGE_TAB_COLSManage').datagrid("getRows").length;
    	var deleteAlertMesg = "";
    	if(subRowsSize >0){
    		deleteAlertMesg = "删除该数据项会级联删除对象模型字段项,您确定要继续操作?";
    	}else{
       		deleteAlertMesg = "您确定要删除吗?";	
    	}
        confirm('是否确认删除?', deleteAlertMesg, function (isOK) {
            if (isOK) {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P006004',
                            tabId:row['tabId'],
                            tabName:row['tabName']

                        }
                    ],
                    func:function (data) {
                        $.message.alert('删除成功！');
                        $('#GEN_KGE_TABSManage').datagrid('reload');
                        //$('#GEN_KGE_TAB_COLSManage').datagrid('reload');
                    }
                });
            }
        });
    }
}
//数据模型表生成
function tabGenerator(index, data) {
    var row = $('#GEN_KGE_TABSManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
    	var alertMesg = '';
    	if(!checkHasPks(row)) alertMesg='表无主键，后续无法进行修改、删除操作, ';
        confirm('是否确认生成配置?', alertMesg+'确认生成配置吗?', function (isOK) {
            if (isOK) {
            	doGenerator(row);
            	//refreshsubFrame();
            }
        });
    }
}

function checkHasPks(row)
{
	var hasPk = true;
    ajaxRequest({
        async:false,
        req:[
            {
                service:'P0006020',
                tabId:row['tabId'],
                tabName:row['tabName'],
                checkPk:'checkPk'
            }
        ],
        func:function (data) {
            if (data[0] && data[0][0] && 'nonpk' == data[0][0]["genMesg"]) {
            	hasPk = false;
            	//alert(hasPk);
            }
        }
    });

   return hasPk;
}

function doGenerator(row)
{
	ajaxRequest({
	    async:false,
	    req:[
	        {
	            service:'P0006020',
	            tabId:row['tabId'],
	            tabName:row['tabName'],
	            tabCname:row['tabCname'],
	            tabSpace:row['tabSpace']
	        }
	    ],
	    func:function (data) {
	        if (data[0] && data[0][0] && 'exist' == data[0][0]["genMesg"]) {
	            confirm('提示', '表已经存在，是否继续生成配置?', function (isOK) {
	                genConfigurationOnly(isOK, row);
	            });
	        }else if (data[0] && data[0][0] && 'exist' != data[0][0]["genMesg"]) {
	        	alert(data[0][0]["genMesg"]);
	        } else {
	            $('.datagrid-toolbar a:gt(0)').linkbutton('disable');
	            delayRun();
	        }
	    }
	});
}

function genConfigurationOnly(isOK, row) {
    if (!isOK) return false;
    ajaxRequest({
        async:false,
        req:[
            {
                service:'P0006020',
                tabId:row['tabId'],
                tabName:row['tabName'],
                tabCname:row['tabCname'],
                tabSpace:row['tabSpace'],
                createdConfOnly:'true'
            }
        ],
        func:function (data) {
            $('.datagrid-toolbar a:gt(0)').linkbutton('disable');
            delayRun();
        }
    });
}

function copyOriginCols2Model(index, data) {
    var row = $('#GEN_KGE_TABSManage').datagrid('getSelected');
    if (row == null) {
        $.message.alert('请选择一条记录！');
        return;
    } else {
        confirm('是否同步', '同步后【字段中文名、添加查询栏、输入类型】3个字段需手工设置, 确认同步'+row['tabName']+'的字段到对象模型字段管理中吗?', function (isOK) {
            if (isOK) {
                var tabId = row['tabId'];
                var tabName = row['tabName'];
                var tabCname = row['tabCname'];
                var tabSpace = row['tabSpace'];
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P0006020',
                            tabId:row['tabId'],
                            tabName:row['tabName'],
                            tabCname:row['tabCname'],
                            //tabSpace:row['tabSpace'],
                            copyConf:'true'
                        }
                    ],
                    func:function (data) {
                        alert('同步字段成功!');
                        //$('.datagrid-toolbar a:gt(0)').linkbutton('disable');
                        //$('#GEN_KGE_TAB_COLSManage').datagrid('reload');
                        $('#GEN_KGE_TABSManage').datagrid('reload');  
                    }
                });
            }
        });
    }
}

function refreshsubFrame()
{
    $('#GEN_KGE_TAB_COLSManage').datagrid("loadData", {});
}

function isSelectMainTableRow() {
    var mainId = 'GEN_KGE_TABSManage';
    var selectRow = $("#" + mainId).datagrid("getSelected") || {};
    var mainTitle = $("#" + mainId + "_Panel").parent().find(".panel-title").text();
    var row = true;
    if ($.isEmptyObject(selectRow)) {
        $.message.alert("请选择" + mainTitle + "的一条记录！");
        row = false;
        return row;
    }
    return row;
}
//对象模型字段操作
function addCol(e) {
    var mainId = 'GEN_KGE_TABSManage';
    var selectRow = $("#" + mainId).datagrid("getSelected") || {};
    var mainTitle = $("#" + mainId + "_Panel").parent().find(".panel-title").text();
    if ($.isEmptyObject(selectRow)) {
        $.message.alert("请选择" + mainTitle + "的一条记录！");
        return;
    } else {
        using(['dialog', 'combobox'], function () {
            $('#addOrEditColForm').form('reset');
            var date = new Date();
            var colId = selectRow['tabName'] + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds();
            $("#colId").val(colId);
            $("#tabName2").val(selectRow['tabName']);
            $("#isnull").combobox("setValue", '1').combobox('enable');
            $("#ispk").combobox("setValue", '2').combobox('enable');
            $("#isQryItem").combobox("setValue", '2').combobox('enable');
            $("#dataType").combobox("setValue", '12').combobox('enable');
            $('#dataLength').textinput('enable');
            $('#colDefault').textinput('enable');
            $("#inputType").combobox("enable");
            $("#reqDict").textarea("enable");
            $('#orderNo').val(parseInt(totalNumbers) + 1);
            $('#addOrEditColFormDialog').dialog({
                iconCls:'icon-add',
                title:'新增对象模型字段',
                modal:true,
                draggable:true,
                width:650,
                height:400,
                buttons:[
                    {
                        text:'保存',
                        iconCls:'icon-save',
                        handler:function () {
                            var paramJson = kui.serialize2Json(kui.serialize('#addOrEditColForm'));
                            $('#addOrEditColForm').form('submit', {
                                req:[
                                    {
                                        service:'P006012',
                                        colId:paramJson['colId'],
                                        tabName:paramJson['tabName'],
                                        colName:paramJson['colName'],
                                        colCname:paramJson['colCname'],
                                        inputType:paramJson['inputType'],
                                        dataType:paramJson['dataType'],
                                        dataLength:paramJson['dataLength'],
                                        colDefault:paramJson['colDefault'],
                                        isnull:paramJson['isnull'],
                                        ispk:paramJson['ispk'],
                                        isQryItem:paramJson['isQryItem'],
                                        orderNo:paramJson['orderNo'],
                                        reqDict:paramJson['reqDict']
                                    }
                                ],
                                onSubmit:function (req) {
                                    if(req[0]['reqDict'].indexOf('\"')>0){
                                        req[0]['reqDict']=req[0]['reqDict'].replace(/"/g, "'");
                                        req[0]['reqDict']=req[0]['reqDict'].replace(/\\/g, "");
                                    }
                                    if ($(this).form('validate')) {
                                        if(!checkColName4ComboGrid(paramJson))
                                        {
                                        	return false;
                                        }
                                        if(checkColNameUnique (paramJson)){
                                        	return false;
                                        } 
                                        var colNameVal = paramJson['colName'];
                                        if (getOracleKeyWords().indexOf(' ' + colNameVal.trim().toUpperCase() + ' ') > 0) {
                                            alert('字段名不能是数据库的关键字，请重新输入！');
                                            return false;
                                        }
                                        var dataLengthVal = paramJson['dataLength'];
                                        var colDefaultVal = paramJson['colDefault'];
                                        var dataType = paramJson['dataType'];
                                        var inputType = paramJson['inputType'];
                                        if (dataType == '12' || dataType == '1') {
                                            if (dataLengthVal != '') {
                                                var patternNum = /^[1-9]+[0-9]*$/g;
                                                if (!patternNum.test(dataLengthVal)) {
                                                    alert('字段类型为VARCHAR2/CHAR，字段长度只能输入正整数！');
                                                    //$("#dataLength").focus();
                                                    return false;
                                                } else if (parseFloat(dataLengthVal) > 4000 && dataType == '12') {
                                                    alert('字段类型为VARCHAR2，字段长度只能输入正整数且最大值不大于4000！');
                                                    //$("#dataLength").focus();
                                                    return false;
                                                } else if (parseFloat(dataLengthVal) > 2000 && dataType == '1') {
                                                    alert('字段类型为CHAR，字段长度只能输入正整数且最大值不大于2000！');
                                                    //$("#dataLength").focus();
                                                    return false;
                                                }
                                            }
                                            if(inputType){
                                            	if(dataLengthVal<32){
                                            		alert("输入类型不为空时，字段长度不能小于32");
                                                    //$("#dataLength").focus();
                                                    return false;
                                            	}
                                                if (colDefaultVal != '') {//该处考虑到字典取值，默认值多余qingk强制设置默认值为空，
                                            			alert("输入类型不为空时，默认值应为空！");
                                                        $("#colDefault").focus();
                                                        return false;
                                                    }
                                            }
                                            
                                            if (colDefaultVal != '') {
                                                if (colDefaultVal.getBytesLen() > parseInt(dataLengthVal)) {
                                                    alert("字段类型为VARCHAR2/CHAR，默认值的字节长度不能大于字段长度！");
                                                    $("#colDefault").focus();
                                                    return false;
                                                }
                                            }

                                        } else if (dataType == '4') {
                                            if (colDefaultVal != '') {
                                                if (paramJson['colDefault'].length > 15) {
                                                    alert('字段类型为INTEGER，默认值长度不能大于15位且为正整数！');
                                                    $("#colDefault").focus();
                                                    return false;
                                                }
                                                var pattern = /^[1-9][0-9]*$/g;
                                                if (!pattern.test(paramJson['colDefault'])) {
                                                    alert('字段类型为INTEGER，默认值只能输入正整数！');
                                                    $("#colDefault").focus();
                                                    return false;
                                                }
                                            }

                                        } else if (dataType == '2') {
                                            if (dataLengthVal != '') {
                                                var ifFloat = dataLengthVal.indexOf(',');
                                                if (ifFloat > 0) {
                                                    var beforeStr=dataLengthVal.substring(0, ifFloat);
                                                    var afterStr=dataLengthVal.substring(ifFloat + 1, dataLengthVal.length);
                                                    var beforePartStrLen = beforeStr.length;
                                                    var afterPartStrLen = afterStr.length;
                                                    var len = parseInt(beforePartStrLen)+ parseInt(afterPartStrLen);
                                                    var patternNum = /^[1-9]\d*(,[1-9]\d*)$/;
                                                    if (!patternNum.test(dataLengthVal)) {
                                                        alert('字段类型为NUMERIC，字段长度只能由正整数或半角逗号组成！(如10,2)');
                                                        //$("#dataLength").focus();
                                                        return false;
                                                    }
                                                    var totalLength = parseInt(beforeStr);
                                                    var afterPart = parseInt(afterStr);
                                                    var beforePart = totalLength - afterPart;
                                                    var maxVal = Math.pow(10, beforePart) - 1;
                                                    var xiaoShuVal =Math.pow(10, afterPart) - 1;
                                                    if (totalLength > 15) {
                                                        alert("字段类型为NUMERIC，字段总长度值不大于有效值15");
                                                        //$("#dataLength").focus();
                                                        return false;
                                                    }else if (beforePart <0) {
                                                        alert("字段类型为NUMERIC，字段总长度应大于或等于小数长度！");
                                                        //$("#dataLength").focus();
                                                        return false;
                                                    } else if(afterPart>6 || afterStr.length>1 || afterStr =='0'){
                                                        alert("字段类型为NUMERIC，小数部分应为1-6的正整数，请输入正确的正整数！");
                                                        //$("#dataLength").focus();
                                                        return false;
                                                    } else {
                                                        if (colDefaultVal != '') {
                                                        	//判断是否有效数字
                                                            var re = /^[0-9]+.?[0-9]*$/;         
                                                            if (!re.test(colDefaultVal))  
                                                             {  
                                                                alert("默认值输入错误，请输入有效数字!(例:0.02)"); 
                                                               $("#colDefault").focus();
                                                               return false;
                                                             }  
                                                            var f = colDefaultVal.indexOf('.');
                                                            if (f > 0) {
                                                                var intPart = parseInt(colDefaultVal.substring(0, f));
                                                                var xiaoShuPartStr = colDefaultVal.substring(f + 1, colDefaultVal.length);
                                                                var xiaoShuPart = parseInt(xiaoShuPartStr);
                                                                if (intPart > maxVal) {
                                                                    alert("字段类型为NUMERIC，默认值整数部分应在[0-" + maxVal + "]之间");
                                                                    $("#colDefault").focus();
                                                                    return false;
                                                                }
                                                                if (xiaoShuPartStr.length > 6) {
                                                                    alert("字段类型为NUMERIC，默认值小数部分长度不能大于6位");
                                                                    $("#colDefault").focus();
                                                                    return false;
                                                                }
                                                                if (xiaoShuPart > xiaoShuVal) {
                                                                    alert("字段类型为NUMERIC，默认值小数部分应在[0-0." + xiaoShuVal + "]之间");
                                                                    $("#colDefault").focus();
                                                                    return false;
                                                                }
                                                            } else {
                                                                var colDefVal = parseInt(colDefaultVal);
                                                                if (colDefVal > maxVal) {
                                                                    alert("字段类型为NUMERIC，默认值整数位大小应在[0-" + maxVal + "]之间");
                                                                    $("#colDefault").focus();
                                                                    return false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    alert('字段类型为NUMERIC，格式有错！如：12,2');
                                                    return false;
                                                }
                                            }

                                        }
                                        return true;
                                    }
                                    return false;
                                },
                                success:function (data) {
                                    $.message.alert('保存成功！')
                                    $('#addOrEditColFormDialog').dialog('close');
                                    $('#GEN_KGE_TAB_COLSManage').datagrid('reload');
                                }
                            });
                        }
                    },
                    {
                        text:'取消',
                        iconCls:'icon-cancel',
                        handler:function () {
                            $('#addOrEditColFormDialog').dialog('close');
                        }
                    }
                ]
            });
        });

    }

}
function editCol() {
    var row = $('#GEN_KGE_TAB_COLSManage').datagrid('getSelected');
    var rowFlag = isSelectMainTableRow();
    if (!rowFlag) {
        return;
    } else if (row == null) {
        $.message.alert('请选择一条对象模型字段记录！');
        return;
    } else {
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P006011',
                    colId:row['colId']
                }
            ],
            func:function (data) {
                $('#addOrEditColForm').form('reset');
                $('#addOrEditColForm').form("load", data[0][0]);
                var dataTypeVal = data[0][0]['dataType'];
                if (dataTypeVal == '12' || dataTypeVal == '1') {//VARCHAR  CHAR
                    $('#dataLength').textinput('enable');
                    $('#ispk').combobox('enable');
                    $('#isQryItem').combobox('enable');
                    $('#colDefault').textinput('enable');
                    $("#inputType").combobox("enable");
                    $("#reqDict").textarea("enable");
                } else {
                    if (dataTypeVal == '2') {//NUMERIC
                        $('#dataLength').textinput('enable');
                        $('#ispk').combobox('enable');
                        $('#isQryItem').combobox('enable');
                        $('#colDefault').textinput('enable');
                    } else if (dataTypeVal == '4') {//INTERGER
                        $("#dataLength").textinput("disable");
                        $('#ispk').combobox('enable');
                        $('#isQryItem').combobox('enable');
                        $('#colDefault').textinput('enable');
                    } else if (dataTypeVal == '91') {// DATE
                        $("#dataLength").textinput("disable");
                        $('#ispk').combobox('enable');
                        $('#isQryItem').combobox('enable');
                        $('#colDefault').textinput('disable');
                    } else if (dataTypeVal == '2004' || dataTypeVal == '2005') {//BLOB CLOB
                        $("#dataLength").textinput("disable");
                        $('#ispk').combobox('disable');
                        $('#isQryItem').combobox('disable');
                        $('#colDefault').textinput('disable');
                    }
                    $("#inputType").combobox("clear").combobox("disable");
                    $("#reqDict").textarea("clear").textarea("disable");
                }
                if (data[0][0]['ispk'] == '1') {
                    $("#isnull").combobox('disable');
                } else {
                    $("#isnull").combobox('enable');
                }
                $('#addOrEditColForm').form("load", data[0][0]);
                $('#GEN_KGE_TAB_COLSManage').datagrid('reload');
            }
        });
        $('#addOrEditColFormDialog').dialog({
            iconCls:'icon-edit',
            title:'修改对象模型字段',
            modal:true,
            draggable:true,
            width:650,
            height:400,
            buttons:[
                {
                    text:'保存',
                    iconCls:'icon-save',
                    handler:function () {
                        var paramJson = kui.serialize2Json(kui.serialize('#addOrEditColForm'));
                        
                        $('#addOrEditColForm').form('submit', {
                            req:[
                                {
                                    service:'P006013',
                                    colId:paramJson['colId'],
                                    tabName:paramJson['tabName'],
                                    colName:paramJson['colName'],
                                    colCname:paramJson['colCname'],
                                    inputType:paramJson['inputType'],
                                    dataType:paramJson['dataType'],
                                    dataLength:paramJson['dataLength'],
                                    colDefault:paramJson['colDefault'],
                                    isnull:paramJson['isnull'],
                                    ispk:paramJson['ispk'],
                                    isQryItem:paramJson['isQryItem'],
                                    orderNo:paramJson['orderNo'],
                                    reqDict:paramJson['reqDict']
                                }
                            ],
                            onSubmit:function (req) {
                                if(req[0]['reqDict'].indexOf('\"')>0){
                                    req[0]['reqDict']=req[0]['reqDict'].replace(/"/g, "'");
                                    req[0]['reqDict']=req[0]['reqDict'].replace(/\\/g, "");
                                }
                                if ($(this).form('validate')) {
                                    if(!checkColName4ComboGrid(paramJson))
                                    {
                                    	return false;
                                    }
                                    if(checkColNameUnique (paramJson)){
                                    	return false;
                                    } 
                                    var colNameVal = paramJson['colName'];
                                    if (getOracleKeyWords().indexOf(' ' + colNameVal.trim().toUpperCase() + ' ') > 0) {
                                        alert('字段名不能是数据库的关键字，请重新输入！');
                                        return false;
                                    }
                                    var dataLengthVal = paramJson['dataLength'];
                                    var colDefaultVal = paramJson['colDefault'];
                                    var dataType = paramJson['dataType'];
                                    var inputType = paramJson['inputType'];
                                    if (dataType == '12' || dataType == '1') {
                                        if (dataLengthVal != '') {
                                            var patternNum = /^[1-9]+[0-9]*$/;
                                            if (!patternNum.test(dataLengthVal)) {
                                                alert('字段类型为VARCHAR2/CHAR，字段长度只能输入正整数！');
                                                $("#dataLength").focus();
                                                return false;
                                            } else if (parseFloat(dataLengthVal) > 4000 && dataType == '12') {
                                                alert('字段类型为VARCHAR2，字段长度只能输入正整数且最大值不大于4000！');
                                                $("#dataLength").focus();
                                                return false;
                                            } else if (parseFloat(dataLengthVal) > 2000 && dataType == '1') {
                                                alert('字段类型为CHAR，字段长度只能输入正整数且最大值不大于2000！');
                                                $("#dataLength").focus();
                                                return false;
                                            }
                                        }
                                        
                                        if(inputType){
                                        	if(dataLengthVal<32){
                                        		alert("输入类型不为空时，字段长度不能小于32");
                                                $("#dataLength").focus();
                                                return false;
                                        	}
                                            if (colDefaultVal != '') {//该处考虑到字典取值，默认值多余qingk强制设置默认值为空，
                                        			alert("输入类型不为空时，默认值应为空！");
                                                    $("#colDefault").focus();
                                                    return false;
                                                }
                                        }
                                        if (colDefaultVal != '') {
                                            if (colDefaultVal.getBytesLen() > parseInt(dataLengthVal)) {
                                                alert("字段类型为VARCHAR2/CHAR，默认值的字节长度不能大于字段长度！");
                                                $("#colDefault").focus();
                                                return false;
                                            }
                                        }

                                    } else if (dataType == '4') {
                                        if (colDefaultVal != '') {
                                            if (paramJson['colDefault'].length > 15) {
                                                alert('字段类型为INTEGER，默认值长度不能大于15位且为正整数！');
                                                $("#colDefault").focus();
                                                return false;
                                            }
                                            var pattern = /^[1-9][0-9]*$/g;
                                            if (!pattern.test(paramJson['colDefault'])) {
                                                alert('字段类型为INTEGER，默认值只能输入正整数！');
                                                $("#colDefault").focus();
                                                return false;
                                            }
                                        }

                                    } else if (dataType == '2') {
                                        if (dataLengthVal != '') {
                                            var patternNum = /^[1-9]\d*(,[1-9]\d*)$/;
                                            if (!patternNum.test(dataLengthVal)) {
                                                alert('字段类型为NUMERIC，字段长度只能由正整数或半角逗号组成！(如10,2)');
                                                $("#dataLength").focus();
                                                return false;
                                            }
                                            var ifFloat = dataLengthVal.indexOf(',');
                                            if (ifFloat > 0) {
                                                var totalLength = parseInt(dataLengthVal.substring(0, ifFloat));
                                                var afterStr = dataLengthVal.substring(ifFloat + 1, dataLengthVal.length);
                                                var afterPart = parseInt(afterStr);
                                                var beforePart = totalLength - afterPart;
                                                var maxVal = Math.pow(10, beforePart) - 1;
                                                var xiaoShuVal =Math.pow(10, afterPart) - 1;
                                                if (totalLength > 15) {
                                                    alert("字段类型为NUMERIC，字段长度不能大于最大有效值15");
                                                    $("#dataLength").focus();
                                                    return false;
                                                } else if (beforePart < 0) {
                                                    alert("字段类型为NUMERIC，字段总长度应大于或等于小数长度！");
                                                    $("#dataLength").focus();
                                                    return false;
                                                } else if(afterPart>6 || afterStr.length>1  || afterStr =='0'){
                                                    alert("字段类型为NUMERIC，小数部分应为1-6的正整数，请输入正确的正整数！");
                                                    $("#dataLength").focus();
                                                    return false;
                                                } else {
                                                    if (colDefaultVal != '') {
                                                       	//判断是否有效数字
                                                        var re = /^[0-9]+.?[0-9]*$/;         
                                                        if (!re.test(colDefaultVal))  
                                                         {  
                                                           alert("默认值输入错误，请输入有效数字!(例:0.02)"); 
                                                           $("#colDefault").focus();
                                                           return false;
                                                         } 
                                                        var f = colDefaultVal.indexOf('.');
                                                        if (f > 0) {
                                                            var intPart = parseInt(colDefaultVal.substring(0, f));
                                                            var xiaoshuPartStr = colDefaultVal.substring(f + 1, colDefaultVal.length);
                                                            var xiaoShuPart = parseInt(xiaoshuPartStr);
                                                            if (intPart > maxVal) {
                                                                alert("字段类型为NUMERIC，默认值整数部分应在[0-" + maxVal + "]之间");
                                                                $("#colDefault").focus();
                                                                return false;
                                                            }
                                                            if (xiaoshuPartStr.length >6) {
                                                                alert("字段类型为NUMERIC，默认值小数部分长度不能大于6位");
                                                                $("#colDefault").focus();
                                                                return false;
                                                            }
                                                            if (xiaoShuPart > xiaoShuVal) {
                                                                alert("字段类型为NUMERIC，默认值小数部分应在[0-0." + xiaoShuVal + "]之间");
                                                                $("#colDefault").focus();
                                                                return false;
                                                            }
                                                        } else {
                                                            var colDefVal = parseInt(colDefaultVal);
                                                            if (colDefVal > maxVal) {
                                                                alert("字段类型为NUMERIC，默认值大小应在[0-" + maxVal + "]之间");
                                                                $("#colDefault").focus();
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                alert('字段类型为NUMERIC，格式有错！如：12,2');
                                                return false;
                                            }
                                        }

                                    }
                                    return true;
                                }
                                return false;
                            },
                            success:function (data) {
                                $.message.alert('修改成功！')
                                $('#addOrEditColFormDialog').dialog('close');
                                $('#GEN_KGE_TAB_COLSManage').datagrid('reload');
                            }
                        });
                    }
                },
                {
                    text:'取消',
                    iconCls:'icon-cancel',
                    handler:function () {
                        $('#addOrEditColFormDialog').dialog('close');
                    }
                }
            ]
        });
    }
}
function removeCol(row) {
    var row = $('#GEN_KGE_TAB_COLSManage').datagrid('getSelected');
    var rowFlag = isSelectMainTableRow();
    if (!rowFlag) {
        return;
    } else if (row == null) {
        $.message.alert('请选择一条对象模型字段记录！');
        return;
    } else {
        confirm('是否确认删除?', '确认删除吗?', function (isOK) {
            if (isOK) {
                ajaxRequest({
                    async:false,
                    req:[
                        {
                            service:'P006014',
                            colId:row['colId']

                        }
                    ],
                    func:function (data) {
                        $.message.alert('删除成功！');
                        $('#GEN_KGE_TAB_COLSManage').datagrid('reload');
                    }
                });
            }
        });
    }
}

var hasCheckflag = false;

function parseLastUpdateUser(value) {
    //if (!hasCheckflag) {
	var user_name = value;
        ajaxRequest({
            async:false,
            req:[
                {
                    service:'P0001001',
                    USER_STA:'1',
                    USER_CODE:value
                }
            ],
            func:function (data) {
            	var rs = data[0];
                if(rs.length > 0 ){
                	user_name =  rs[0].USER_NAME;
                }
            }
        });
        return user_name;
    //}
//    if (rs.length > 0) {
//        if (value != '') {
//            for (var i = 0; i < rs.length; i++) {
//                if (value == rs[i].USER_CODE) {
//                    return rs[i].USER_NAME;
//                }
//            }
//        } else {
//            return value;
//        }
//    }
}

//改变数据类型
function changeDataType(record) {
    var dict_des = record.dict_des;
    var dict_val = record.dict_val;
    if (dict_val == '1') {
        $("#reqDict").textarea("enable");
        $("#reqDict").textarea("setValue", 'colspan=3;type=textarea');
    } else if (dict_val == '2') {
        $("#reqDict").textarea("enable");
        $("#reqDict").textarea("setValue", 'edt_panelHeight=200;edt_dict=CURRENCY_CODE');
    } else if (dict_val == '3') {
        $("#reqDict").textarea("enable");
        $("#reqDict").textarea("setValue", "edt_panelWidth=250;edt_panelHeight=200;edt_req=[{service:'P0001031',ORG_STA:'1'}];edt_nodeId=ORG_CODE;edt_nodeName=ORG_NAME;edt_parNode=PAR_ORG;edt_treeType=1");
    } else if (dict_val == '4') {
        $("#reqDict").textarea("enable");
        $("#reqDict").textarea("setValue", "edt_panelHeight=360;edt_panelWidth=500;edt_idField=USER_CODE;edt_textField=USER_NAME;formatter=convertUserName;edt_req=[{service:'P0001001',USER_STA:'1'}];edt_queryCols=[{'text':'查询','icon':'icon-search',collapsed:true,cols:[{title:'人员姓名',field:'USER_NAME',editor:{type:'text',options:{validType:'val[1,64]'}}}]}];edt_columns=[[{field:'USER_CODE',title:'ID号',width:70},{field:'USER_NAME',title:'人员姓名',width:160},{field:'ORG_NAME',title:'机构名称',width:70}]]");
    } else {
        $("#reqDict").textarea("disable");
        $("#reqDict").textarea("clear");
    }
}

//检查下拉表格存在的时候，字段必须为下拉表格条件的edt_idField对应的值
//如条件包含：edt_idField=USER_CODE，则字段必须为USER_CODE
function checkColName4ComboGrid(paramJson)
{
    var colName=paramJson['colName'];
    var inputType=paramJson['inputType'];
	if(inputType !='4')
		return true;
	var reqDict =paramJson['reqDict'];
	if(reqDict !=''){
		var attrs = reqDict.split(";");
		for(var i=0;i< attrs.length;i++){
			if(attrs[i].indexOf("edt_idField") != -1) 
			{
				var filedArray = attrs[i].split("=");
				if(filedArray.length ==2){
					var name = filedArray[1].trim();
					if(colName != name)
					{
						alert("输入类型为下拉表格时，字段名称必须为【"+name+"】");
					    return false;
					}
				}
			}
		}
	}
	return true;
}
//改变数据长度
function changeDataLengthType(d) {
    var dict_des = d.dict_des;
    var dict_val = d.dict_val;
    if (dict_des == 'DATE') {
        $('#dataLength').textinput('clear').textinput('disable');
        $('#ispk').combobox("setValue", '2').combobox('enable');
        $('#isQryItem').combobox("setValue", '2').combobox('enable');
        $('#colDefault').textinput('clear').textinput('disable');
        $("#inputType").combobox("disable");
        $("#reqDict").textarea("disable");
    } else if (dict_des == 'INTEGER') {
        $('#dataLength').textinput('clear').textinput('disable');
        $('#ispk').combobox("setValue", '2').combobox('enable');
        $('#isQryItem').combobox("setValue", '2').combobox('enable');
        $('#colDefault').textinput('clear').textinput('enable');
        $("#inputType").combobox("disable");
        $("#reqDict").textarea("disable");
    } else if (dict_des == 'VARCHAR') {
        $('#dataLength').textinput('clear').textinput('enable');
        $('#ispk').combobox("setValue", '2').combobox('enable');
        $('#isQryItem').combobox("setValue", '2').combobox('enable');
        $('#colDefault').textinput('clear').textinput('enable');
        $("#inputType").combobox("enable");
        $("#reqDict").textarea("enable");
    }  else if (dict_des == 'CHAR') {
        $('#dataLength').textinput('clear').textinput('enable');
        $('#ispk').combobox("setValue", '2').combobox('enable');
        $('#isQryItem').combobox("setValue", '2').combobox('enable');
        $('#colDefault').textinput('clear').textinput('enable');
        $("#inputType").combobox("disable");
        $("#reqDict").textarea("disable");
    } else if (dict_des == 'NUMERIC') {
        $('#dataLength').textinput('clear').textinput('enable');
        $('#ispk').combobox("setValue", '2').combobox('enable');
        $('#isQryItem').combobox("setValue", '2').combobox('enable');
        $('#colDefault').textinput('clear').textinput('enable');
        $("#inputType").combobox("disable");
        $("#reqDict").textarea("disable");

    } else if (dict_des == 'CLOB' || dict_des == 'BLOB') {
        $('#dataLength').textinput('clear').textinput('disable');
        $('#ispk').combobox("setValue", '2').combobox('disable');
        $('#isQryItem').combobox("setValue", '2').combobox('disable');
        $('#colDefault').textinput('clear').textinput('disable');
        $("#inputType").combobox("disable");
        $("#reqDict").textarea("disable");
    }
    $("#inputType").combobox("clear");
    $("#reqDict").textarea("clear");
}

//改变是否空
function changeIsnull(v) {
    var dict_des = v.dict_des;
    var dict_val = v.dict_val;
    if (dict_val == '1') {
        $("#isnull").combobox("disable").combobox("setValue", '2');
    } else {
        $("#isnull").combobox("enable");
    }

}
//数据模型表生成状态判断处理函数
function tabStateControl(index, data) {
    $('a.l-btn:gt(0):lt(3)', $(this).datagrid('getPanel')).linkbutton('enable');
    switch (data['status']) {
        case '1':
            $('a.l-btn:eq(2)', $(this).datagrid('getPanel')).linkbutton('enable');
            $('a.l-btn:eq(3)', $(this).datagrid('getPanel')).linkbutton('enable');
            $('a.l-btn:eq(4)', $(this).datagrid('getPanel')).linkbutton('enable');
            break;
        case '2':
            $('a.l-btn:eq(2)', $(this).datagrid('getPanel')).linkbutton('disable');
            $('a.l-btn:eq(3)', $(this).datagrid('getPanel')).linkbutton('disable');
            $('a.l-btn:eq(4)', $(this).datagrid('getPanel')).linkbutton('disable');
            break;
        default :
            break;
    }
}

function checkTableNameUnique (paramJson)
 {
	var b = true;
	var tabId = paramJson['tabId'];
	ajaxRequest({
		async : false,
		req : [ {
			service : 'P006001',
			tabId : tabId,
			tabName : paramJson['tabName']
		} ],
		func : function(data) {
			if (data[0] && data[0][0]) {
				if(tabId ==data[0][0].tabId) 
					b = false;//修改	
				else
					alert("表名称已经存在！");
			} else {
				b = false;
			}
		},
		error : function(error) {
			// $.message.alert('查询出错！');
			b = false;//忽略
		}
	});
	return b;
}

function checkColNameUnique (paramJson)
 {
	var b = true;
	var colId = paramJson['colId'];
	ajaxRequest({
		async : false,
		req : [ {
            service:'P006011',
            tabName:paramJson['tabName'],
            colId: colId,
            colNameCheck:paramJson['colName']
		} ],
		func : function(data) {
			if (data[0] && data[0][0]) {
				if(colId ==data[0][0].colId)
					b= false;// 修改
				else 
					alert("字段名称已经存在！");
			} else {
				b = false;
			}
		},
		error : function(error) {
			//$.message.alert('查询出错！');
			b = false;//忽略
		}
	});
    //主键唯一判断
	if(!b && checkColPKOnlyOne(paramJson)){
		b = true;
	} 

	return b;
}
//判断唯一主键
function checkColPKOnlyOne (paramJson)
{
	var b = true;//存在
	var colId = paramJson['colId'];
	var ispk = paramJson['ispk'];
	if(ispk == '2') return false;//ispk = '2' 非主键
	ajaxRequest({
		async : false,
		req : [ {
           service:'P006011',
           tabName:paramJson['tabName'],
           ispk:ispk
		} ],
		func : function(data) {
			if(data[0])
			{
			  if(data[0].length == 1 && data[0][0])
			  {
				if(colId ==data[0][0].colId)
					b= false;// 修改
				else 
					alert("表已存在主键！(不支持多主键)");
			  }else if(data[0].length >1){
				  alert("表已存在主键！(不支持多主键)");
			  } else{
				  b= false;//此前，表未曾有主键
			  } 
		    }else{
		    	 b= false;//此前，表未曾有主键
		    }
		},
		error : function(error) {
			b= false;// 忽略
		}
	});
	return b;
}

String.prototype.getBytesLen = function()
{
    var cArr = this.match(/[^x00-xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}

//遮罩层
function delayRun() {
	var parent = $(window.document).find("body"),
		pw = $(parent).outerWidth(),
		ph = $(parent).outerHeight(),
		mask = $("<div class='sync-mask'></div>").css({width:pw, height:ph}),
		content = $("<div class='content'>请稍等，正在生成配置。。。</div>");
	mask.append(content).appendTo(parent);
	content.css("margin-left", (pw - content.outerWidth()) / 2 + "px");
	content.css("margin-top", (ph - content.outerHeight()) / 2 + "px");
	serviceRunSuccess(mask);
	return mask;
}

function serviceRunSuccess(mask)
{
	setTimeout(function() {
		if(checkServiceIsRunning()){
			mask.remove();
			alert("生成配置成功！");
	        $('#GEN_KGE_TABSManage').datagrid('reload');
		}else{
			serviceRunSuccess(mask);
		}

	},3000);
}

function checkServiceIsRunning ()
{
   var b = false;//存在
   ajaxRequest({
   async : false,
	 req : [ {
	       service:'P006001'
		} ],
	 func : function(data) {
			if(data[0] && data[0][0])
			{
				b = true;
			}
		},
	 error : function(error) {
		}
	});
	return b;
}
function tabsucess(data) {
//	$('#GEN_KGE_TABSManage').datagrid('selectRow',index2);
//    onClickLeftTableRow(index2,row);
	alert('1');
}
