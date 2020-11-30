(function () {
    function PermManage() {
    };
    PermManage.prototype = {
        constructor: PermManage,
        init: function () {
            this.userQuery();
            this.initTreegrid('P0002268', $('#useAuthTree'), '1,2,3,5,6,8,9', 1);
            this.initTreegrid('P0002268', $('#authTree'), '1,2,3,5,6,8,9', 2);
            this.bindEvent();
        },
        bindEvent: function () {
            $("#txtUser").bind({
                keyup: function (e) {
                    if (e.keyCode == 13) {
                        $PermManage.permInfoQuery();
                    }
                }
            });
        },
        permInfoQuery: function () {
            var val = $("#txtUser").val();
            var regularExpression = /^\d*$/;
            var flag = regularExpression.test(val);
            $(".datagrid-header-check").find("input").removeAttr("checked");
            if (val.length > 18) {
                alert('ID号不能大于18位！');
                $("#txtUser").val("");
                return false;
            }
            if (!flag) {
                val = -2;
            } else {
                val = (val == "" ? -2 : val);
            }
            if (val == '1' || val == '8888') {
                alert("超级用户默认拥有所用权限，不得更改！");
                return false;
            }
            $PermManage.queryPermFun('P0002232', val, '2', '1');
            $PermManage.queryPermFun('P0002232', val, '2', '2');
            $PermManage.userInfo(val);
            var req = [
                {
                    service: 'P0002221',
                    OBJ_ID: val
                }
            ];
            $PermManage.queryPermTree($('#owerPermTree'), req);
        },
        initTreegrid: function (serv, target, permType, v) {
            var wPWidth=$("#westPanel").width() - 5;
            var cls = [];
            if (v == 1) {
                cls = [
                    [
                        {title: 'PERM_ID', field: 'PERM_ID', checkbox: true},
                        {field: 'PERM_NAME', title: '权限名称', sortable: false, width: (wPWidth/3)*2},
                        {field: 'CONS_ID', title: '约束操作', sortable: false, width: (wPWidth/3)-70, align: 'center', formatter: function (value, row, index) {
                            if (value != "") {
                                return "<div style='border: 1px solid #A0A0A0;cursor:pointer; width: 60px;height:16px;background-color:#F0F0F0 ' align='center' onclick='$PermManage.createConsForm(" + row.PERM_ID + "," + JSON.stringify(row.PERM_NAME) + ",event);return false;' >约束</div>";
                            }
                        }}
                    ]
                ];
            } else {
                cls = [
                    [
                        {title: 'PERM_ID', field: 'PERM_ID', checkbox: true},
                        {field: 'PERM_NAME', title: '权限名称', width: wPWidth-70}
                    ]
                ];
            }
            target.treegrid({
                fit: true,
                idField: 'PERM_ID',
                treeField: 'PERM_NAME',
                singleSelect: false,
                deepCascadeCheck: true,
                treeExpand: 0,
                req: [
                    {
                        service: serv,
                        PERM_TYPE: permType
                    }
                ],
                columns: cls,
                curRowCascadeCheck: function (curRow) {
                    if (curRow.PERM_TYPE < 5) {
                        return true;
                    }
                    return false;
                },
                loadFilter: $PermUtil.dataFilter,
                onLoadSuccess: function (row, data) {
                    var _data = data.rows;
                    var ids = [];
                    $("body").removeData("authIds");
                    if (_data) {
                        for (var i = 0; i < _data.length; i++) {
                            ids.push(_data[i].PERM_ID);
                        }
                        $("body").data("authIds", ids);
                    }
                }
            });
        },
        createConsForm: function (id, permName, event) {
            var e = (event) ? event : window.event;
            if (window.event) {// IE
                e.cancelBubble = true;
            } else { // FF
                e.stopPropagation();
            }

            var tr = '';
            ajaxRequest({
                req: [
                    {
                        service: 'P0002222',
                        PERM_ID: id
                    }
                ],
                func: function (data) {
                    //if(data[0]["service"]["flag"]=='0'){
                    var d = data[0];
                    $("#perm_id").val(id);
                    if (d.length > 0) {
                        $("#consForm").children().remove();
                    }

                    for (var i = 0; i < d.length; i++) {
                        var permConData = data[0][i];
                        var permId = permConData.PERM_ID;
                        var consId = permConData.CONS_ID;
                        var consName = permConData.CONS_NAME;
                        var consType = permConData.CONS_TYPE;
                        if (consType == 1) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始时间：</td ><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_" + permId + "' value='" + permId + "'/><input type='hidden' id='consId_" + consId + "' value='" + consId + "'/><input type='text' id='perId" + permId + "_consId" + consId + "_tMin' class='kui-timespinner' style='width:128px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_tMax' class='kui-timespinner' style='width:128px'/></td></tr>";
                        } else if (consType == 2) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_" + permId + "' value='" + permId + "'/><input type='hidden' id='consId_" + consId + "' value='" + consId + "'/><input type='text' id='perId" + permId + "_consId" + consId + "_dMin' class='kui-datebox' style='width:133px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期：</td><td style='padding-top: 10px;width: 200px;'><input type='text' class='kui-datebox' id='perId" + permId + "_consId" + consId + "_dMax' style='width:133px'/></td></tr>";
                        } else if (consType == 3) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_" + permId + "' value='" + permId + "'/><input type='hidden' id='consId_" + consId + "' value='" + consId + "'/><input type='text' id='perId" + permId + "_consId" + consId + "_dtMin' class='kui-datetimebox' style='width:133px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_dtMax' class='kui-datetimebox' style='width:133px'/></td></tr>";
                        } else if (consType == 4) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>IP段：</td><td style='padding-top: 10px;width: 200px;'><input type='hidden' id='perId_" + permId + "' value='" + permId + "'/><input type='hidden' id='consId_" + consId + "' value='" + consId + "'/><input type='text' id='perId" + permId + "_consId" + consId + "_ipMin' class='kui-validatebox' kui-options=\"validType:'ip'\" style='width:130px'/></td><td style='padding-top: 10px;width: 100px;' align='right'>至：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_ipMax' class='kui-validatebox' kui-options=\"validType:'ip'\" style='width:130px'/></td></tr>";
                        }
                    }

                    $("#consForm").append(tr);
                    $.parser.director($("#consForm"));
                    var operId = $('#txtUser').val();
                    if (operId == '') {
                        alert('请选择人员！');
                        return;
                    }
                    if (typeof(operId) != "undefined") {
                        $PermManage.fillData('2', operId, id);
                    }
                    $PermManage.consCondiction($("#consPermDialog"), permName);
                    //}
                }
            });
        },
        fillData: function (objType, objId, permId) {
            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            var authType;
            if (index == 0) {
                authType = '1';
            } else if (index == 1) {
                authType = '2';
            }
            ajaxRequest({
                req: [
                    {
                        service: 'P0002223',
                        PERM_ID: permId,
                        OBJ_TYPE: objType,
                        OBJ_ID: objId,
                        ASS_TYPE: '1',
                        AUTH_TYPE: authType
                    }
                ],
                func: function (data) {
                    //if(data[0]["service"]["flag"]=='0'){
                    var d = data[0];
                    //如果有约束就填充
                    for (var i = 0; i < d.length; i++) {
                        var cId = d[i].CONS_ID;
                        var cMax = d[i].CONS_MAX;
                        var cMin = d[i].CONS_MIN;
                        var cType = d[i].CONS_TYPE;
                        var pId = d[i].PERM_ID;
                        $('#consForm').find('tr').each(function (index, tr) {
                            $(tr).find('input').each(function (i, input) {
                                var id = $(input).attr("id");
                                if (typeof(id) != "undefined") {
                                    if (id.indexOf(pId) > 0 && id.indexOf(cId) > 0) {
                                        $PermUtil.setVal(cType, id, cMin, cMax, cType);
                                    }
                                }
                            });
                        });
                    }
                    //}
                }
            });
        },
        userQuery: function () {
            var HAS_USER_CODE = "1,8888";
            $('#txtUser').combogrid({
                panelHeight:280,
                panelWidth:600,
                idField:'USER_CODE',
                textField:'USER_CODE',
                required:'true',
                fallParas:[{enable:true}],
                req:[{
                    service:'P0001008'
                }],
                columns:[[
                    {field:'USER_CODE',title:'ID号',width:70,sortable:true,sortType:"number"},
                    {field:'USER_NAME',title:'人员名称',width:70},
                    {field:'USER_TYPE',title:'人员类型',width:70,
                        formatter: function(value,row,index){
                            return getSysDictOpt('USER_TYPE',value);
                        }
                    },
                    {field:'USER_STA',title:'人员状态',width:70,
                        formatter: function(value,row,index){
                            return getSysDictOpt('USER_STA',value);
                        }},
                    {field:'OPEN_DATE',title:'开户日期',width:70},
                    {field:'OFF_TEL',title:'办公电话',width:70},
                    {field:'MOBILE',title:'手机号'},
                    {field:'EMAIL',title:'电子邮箱',width:120}
                ]],
                queryCols:[{
                    text:'查询',
                    cols:[{field:'USER_CODE',title:'ID号',
                        editor:{
                            type:'text',
                            options:{
                                validType:'int[18]'
                            }
                        }
                    },{field:'USER_NAME',title:'人员名称',
                        editor:{
                            type:'text',
                            options:{
                                validType:'val[0,64]'
                            }
                        }
                    },{field:'MOBILE',title:'手机号',
                        editor:{
                            type:'text',
                            options:{
                                validType:'val[0,32]'
                            }
                        }
                    }]
                }],
                onClear:function(){
                    $('#txtUser').combogrid("grid").datagrid("clearSelections");
                },onSelect:function (rowIndex, rowData) {
                    var userCode = rowData['USER_CODE'];
                    if (userCode == '1' || userCode == '8888') {
                        alert("超级用户默认拥有所用权限，不得更改！");
                        return false;
                    }
                    $PermManage.queryPermFun('P0002232', userCode, '2', '1');
                    $PermManage.queryPermFun('P0002232', userCode, '2', '2');
                    $PermManage.userInfo(userCode);
                    var req = [
                        {
                            service: 'P0002221',
                            OBJ_ID: userCode
                        }
                    ];
                    $PermManage.queryPermTree($('#owerPermTree'), req);

                }
            })

            /*$("#txtUser").autocomplete({
                width: 200,
                req: [
                    {service: 'P0001001', HAS_USER_CODE: HAS_USER_CODE}
                ],
                keyField: 'USER_CODE',
                params: 'QUERY_PARAM',
                sourceField: 'USER_CODE,USER_NAME,ORG_NAME',
                matchCase: true,
                useCache: false,
                required: true,
                onSelect: function (value) {
                    var userCode = value;
                    if (userCode == '1' || userCode == '8888') {
                        alert("超级用户默认拥有所用权限，不得更改！");
                        return false;
                    }
                    $PermManage.queryPermFun('P0002232', userCode, '2', '1');
                    $PermManage.queryPermFun('P0002232', userCode, '2', '2');
                    $PermManage.userInfo(userCode);
                    var req = [
                        {
                            service: 'P0002221',
                            OBJ_ID: userCode
                        }
                    ];
                    $PermManage.queryPermTree($('#owerPermTree'), req);
                }/!*,
                 onChange: function(newValue, oldValue) {
                 $PermManage.permInfoQuery();
                 }*!/
            });*/
        },
        userInfo: function (userCode) {
            ajaxRequest({
                req: [
                    {
                        service: "P0001001",
                        USER_CODE: userCode
                    }
                ],
                func: function (data) {
                    var returnData = data[0];
                    if (returnData.length > 0) {
                        $("#userCode").text(returnData[0].USER_CODE);
                        $("#userName").text(returnData[0].USER_NAME);
                        $("#org").text(returnData[0].ORG_NAME);
                        /*$("#role").text(returnData[0].ROLES_NAME)  ;*/
                        $("#post").text(returnData[0].POST_NAME);
                        $("#mail").text(returnData[0].EMAIL);
                        $("#tel").text(returnData[0].MOBILE);
                    } else {
                        $("#userCode").text("");
                        $("#userName").text("");
                        $("#org").text("");
                        /*$("#role").text("")  ;*/
                        $("#post").text("");
                        $("#mail").text("");
                        $("#tel").text("");
                    }
                }
            });
        },
        queryPermTree: function (target, req) {
            var wPWidth=$("#westPanel").width() - 5;
            target.treegrid({
                idField: 'PERM_ID',
                treeField: 'PERM_NAME',
                singleSelect: false,
                deepCascadeCheck: true,
                treeExpand: 0,
                req: req,
                columns: [
                    [
                        //{title:'PERM_ID',field:'PERM_ID',checkbox : true},
                        {field: 'PERM_NAME', title: '权限名称', width: wPWidth/2},
                        {field: 'OBJ_TYPE', title: '所属权限', width: (wPWidth/2)-50, formatter: function (value, row, index) {
                            if (typeof value != "undefined") {
                                var val = value.split(",");
                                var str = [];
                                for (var i = 0; i < val.length; i++) {
                                    switch (val[i]) {
                                        case "1":
                                            str.push("角色");
                                            break;
                                        case "2":
                                            str.push("人员");
                                            break;
                                        case "3":
                                            str.push("岗位");
                                            break;
                                        case "4":
                                            str.push("组织机构");
                                            break;
                                        case "5":
                                            str.push("代理");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                return str.toString();
                            }
                        }}
                    ]
                ],
                loadFilter: $PermUtil.dataFilter
            });
        },
        queryPermFun: function (serv, objId, ObjType, authType) {
            ajaxRequest({
                req: [
                    {
                        service: serv,
                        OBJ_ID: objId,
                        OBJ_TYPE: ObjType,
                        AUTH_TYPE: authType
                    }
                ],
                func: function (data) {
                    $PermManage.succDataDeal(data, authType);
                }
            });
        },
        succDataDeal: function (data, authType) {
            var returnData = data[0];
            if (returnData.length > 0) {
                if (authType == 1) {
                    $PermUtil.unAllSelect($('#useAuthTree'));
                    $("body").removeData("u_operIdData");
                    $("body").data("u_operIdData", returnData);
                    for (var i = 0; i < returnData.length; i++) {
                        var permId = returnData[i].PERM_ID;
                        $("#useAuthTree").treegrid("select", permId);
                    }
                } else if (authType == 2) {
                    $PermUtil.unAllSelect($('#authTree'));
                    $("body").removeData("operIdData");
                    $("body").data("operIdData", returnData);
                    for (var i = 0; i < returnData.length; i++) {
                        var permId = returnData[i].PERM_ID;
                        $("#authTree").treegrid("select", permId);
                    }

                }
            } else if (typeof returnData == "undefined" || returnData.length == 0) {
                if (authType == 1) {
                    $PermUtil.unAllSelect($('#useAuthTree'));
                    $("body").removeData("u_operIdData");
                    $("body").data("u_operIdData", returnData);
                } else if (authType == 2) {
                    $PermUtil.unAllSelect($('#authTree'));
                    $("body").removeData("operIdData");
                    $("body").data("operIdData", returnData);
                }
            }
        },
        saveOperPerm: function () {
            var operId = $('#txtUser').combogrid('getValue');
            var detailUserCode = $('#userCode').text();
            var reg = new RegExp("^[0-9]*$");
            if (!$('#operPremForm').form('validate')) {
                return false;
            }

            if (operId == '' || !reg.test(operId)) {
                alert('请选择正确的ID号！');
                return false;
            } else {
                if (operId.length > 18) {
                    alert('ID号不能大于18位！');
                    $("#txtUser").val("");
                    return false;
                }
                if (operId != detailUserCode) {
                    alert('请确认选择了ID号！');
                    return false;
                }
            }
            if (operId == '1') {
                alert("超级用户默认拥有所用权限，不得更改！");
                return false;
            }
            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            if (g_user.userId != 1 && operId == g_user.userId && index == 1) {
                alert('您没有授权权限！');
                return false;
            }
            ajaxRequest({
                req: [
                    {
                        service: 'P0001001',
                        USER_CODE: operId
                    }
                ],
                func: function (data) {
                    //if(data[0]["service"]["flag"]=='0'){
                    var d = data[0];
                    if (d.length == 0) {
                        alert("该人员不存在!");
                        return false;
                    } else if (d.length > 0) {
                        if (d[0].USER_STA == '2') {
                            alert("该人员已被冻结!");
                            return false;
                        } else if (d[0].USER_STA == '9') {
                            alert("该人员已被注销!");
                            return false;
                        }
                        $PermManage.ajaxRequestFun('2', operId);
                    }
                    //}
                }
            });
        },
        ajaxRequestFun: function (objType, objId) {

            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            var returnData;
            var rows;
            var authType;
            if (index == 0) {
                authType = '1';
                returnData = $("body").data("u_operIdData");
                rows = $('#useAuthTree').treegrid('getSelections');

            } else if (index == 1) {
                authType = '2';
                returnData = $("body").data("operIdData");
                rows = $('#authTree').treegrid('getSelections');
            }

            var oldPermId = new Array();

            if (typeof(returnData) != 'undefined') {
                for (var i = 0; i < returnData.length; i++) {
                    oldPermId.push(returnData[i].PERM_ID);
                }

                var $ids = $("body").data("authIds");
                if (typeof($ids) != 'undefined') {
                    oldPermId = $PermUtil.getSameVal(oldPermId, $ids);
                }
            }
            var newPermId = new Array();
            if (typeof(rows) != 'undefined') {
                for (var i = 0; i < rows.length; i++) {
                    newPermId.push(rows[i].PERM_ID);
                }
            }


            var sameVal = $PermUtil.getSameVal(oldPermId, newPermId);
            var delId = $PermUtil.getDiffVal(sameVal, oldPermId);
            var addId = $PermUtil.getDiffVal(sameVal, newPermId);

            ajaxRequest({
                async: false,
                req: [
                    {
                        service: 'P0002229',
                        DEL_PERM_ID: delId.toString(),
                        ADD_PERM_ID: addId.toString(),
                        OBJ_ID: objId,
                        OBJ_TYPE: objType,
                        ASS_TYPE: '1',
                        AUTH_TYPE: authType
                    }
                ],
                func: function (data) {
                    if (index == 0) {
                        $PermManage.queryPermFun('P0002232', objId, '2', '1');
                    } else if (index == 1) {
                        $PermManage.queryPermFun('P0002232', objId, '2', '2');
                    }
                    alert("授权成功！");
                }
            });
        },
        chooseIndex: function () {
            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            if (index == 2) {
                $("#btn").hide();
                var operId = $('#txtUser').val();
                var reg = new RegExp("^[0-9]*$");
                if (operId == '' || !reg.test(operId)) {
                    alert('请选择正确的ID号！');
                    return false;
                } else {
                    if (operId.length > 18) {
                        alert('ID号不能大于18位！');
                        $("#txtUser").val("");
                        return false;
                    }
                }
                var req = [
                    {
                        service: 'P0002221',
                        OBJ_ID: operId
                    }
                ];
                $PermManage.queryPermTree($('#owerPermTree'), req);
            } else {
                $("#btn").show();
            }
        },
        consCondiction: function (target, permName) {
            target.dialog({
                modal: true,
                title: permName + "约束条件",
                width: 730,
                height: 230,
                buttons: [
                    {
                        text: '保存',
                        iconCls: 'icon-save',
                        handler: function () {
                            $PermManage.saveCons(permName);
                        }
                    },
                    {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            target.dialog("close");
                        }
                    }
                ]
            });
            $.parser.director($("#consForm"));
            $("#consForm").find(".combo-text").attr("readonly", "readonly");
        },
        saveCons: function (permName) {
            if (!$("#consForm").form('validate')) return false;
            var permConsVals = $PermUtil.permConsValsFun("consForm");
            var permId = $("#perm_id").val();
            var userId = $('#txtUser').val();
            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            if ($PermManage.compTime(permConsVals) === false) return false;
            if (index == 0) {
                $PermManage.consReq('2', userId, permId, permConsVals, '1', permName);
                $PermManage.queryPermFun('P0002232', userId, '2', '1');
            } else if (index == 1) {
                $PermManage.consReq('2', userId, permId, permConsVals, '2');
                $PermManage.queryPermFun('P0002232', userId, '2', '2');
            }
        },
        consReq: function (objType, objId, permId, permConsVals, authType, permName) {
            ajaxRequest({
                async: false,
                req: [
                    {
                        service: 'P0002230',
                        OBJ_TYPE: objType,
                        OBJ_ID: objId,
                        ASS_TYPE: '1',
                        PERM_ID: permId,
                        AUTH_TYPE: authType,
                        PERMCONSVALS: permConsVals
                    }
                ],
                func: function (data) {
                    alert(permName + "约束条件设置成功！");
                    $("#consPermDialog").dialog("close");
                }
            });
        },
		compTime: function(permConsVals) {
			var consArr = permConsVals.split("|");
	    	for(var k=0;k<consArr.length;k++) {
	        	var consObjArr = consArr[k].split(",");
	        	if (consObjArr[2] != "" && consObjArr[3] != "") {
	        		if (consObjArr[2].length == 8 && consObjArr[3].length == 8) {
	        			var strDate = new Date(consObjArr[2].substring(0,4)+'/'+consObjArr[2].substring(4,6)+'/'+consObjArr[2].substring(6,8));
	        			var endDate = new Date(consObjArr[3].substring(0,4)+'/'+consObjArr[3].substring(4,6)+'/'+consObjArr[3].substring(6,8));
	        			if (strDate > endDate) {
	            			alert("结束日期不能小于开始日期！");
	            			return false;
	            		}
	        		} else if (consObjArr[2].length == 5 && consObjArr[3].length == 5){
	        			var sDate = new Date;
	        			var eDate = new Date;
	        			var s = consObjArr[2].split(/\:/g); 
	        			var e = consObjArr[3].split(/\:/g);
	        		    sDate.setHours(s[0]); 
	        		    sDate.setMinutes(s[1]);
	        		    eDate.setHours(e[0]); 
	        		    eDate.setMinutes(e[1]);
	        		    if (sDate > eDate) {
	        				alert("结束时间不能小于开始时间！");
	        				return false;
	        			}
	        		} else if (consObjArr[2].length == 17 && consObjArr[3].length == 17){
	        			var time1Arr = consObjArr[2].split(" ");
	        			var time2Arr = consObjArr[3].split(" ");
	        			var stimedate = new Date(time1Arr[0].substring(0,4)+'/'+time1Arr[0].substring(4,6)+'/'+time1Arr[0].substring(6,8));
	        			var etimedate = new Date(time2Arr[0].substring(0,4)+'/'+time2Arr[0].substring(4,6)+'/'+time2Arr[0].substring(6,8));
	        			var s = time1Arr[1].split(/\:/g); 
	        			var e = time2Arr[1].split(/\:/g);
	        			stimedate.setHours(s[0]); 
	        			stimedate.setMinutes(s[1]);
	        			stimedate.setSeconds(s[2]);
	        			etimedate.setHours(e[0]); 
	        			etimedate.setMinutes(e[1]);
	        			etimedate.setSeconds(e[2]);
	        		    if (stimedate > etimedate) {
	        				alert("结束时间不能小于开始时间！");
	        				return false;
	        			}
	        		}
	        	}
	        }
	    	return true;
		}
    };
    window.$PermManage = new PermManage();
})();