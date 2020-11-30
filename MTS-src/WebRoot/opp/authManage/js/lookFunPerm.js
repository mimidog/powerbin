(function () {
    function LookFunPerm() {
    };
    LookFunPerm.prototype = {
        constructor: LookFunPerm,
        init: function () {
            this.initOper();
            this.createDom(2);
        },
        initOper: function () {
            var HAS_USER_CODE = "1,8888";
            $('#FUN_OPER_ID').combogrid({
                panelHeight: 280,
                panelWidth: 500,
                idField: 'USER_CODE',
                textField: 'USER_NAME',
                fallParas: [
                    {enable: true}
                ],
                req: [
                    {
                        service: 'P0001008',
                        HAS_USER_CODE: HAS_USER_CODE
                    }
                ],
                queryCols: [
                    {
                        'text': '查询',
                        'icon': 'icon-search',
                        collapsed: true,
                        cols: [
                            {
                                title: '人员名称',
                                field: 'USER_NAME',
                                editor: {
                                    type: 'text',
                                    options: {
                                        validType: 'val[0,64]'
                                    }
                                }
                            }
                        ]
                    }
                ],
                columns: [
                    [
                        {field: 'USER_CODE', title: 'ID号', sortType: 'number', width: 70},
                        {field: 'USER_NAME', title: '人员名称', width: 120},
                        {field: 'ORG_NAME', title: '机构名称', width: 120},
                        {field: 'USER_STA', title: '人员状态', width: 100, formatter: function (value) {
                            return getSysDictOpt('USER_STA', value);
                        }}
                    ]
                ],
                onClickRow: function (rowIndex, rowData) {
                    var userCode = rowData["USER_CODE"];
                    $LookFunPerm.initTreegrid('P0002232', userCode, '2');
                    $LookFunPerm.userInfo(userCode);
                },
                onClear: function () {
                    $('#FUN_OPER_ID').combogrid("grid").datagrid("clearSelections");
                    $LookFunPerm.initTreegrid('P0002232', "-9999999", '2');
                    $("#userCode").text("");
                    $("#userName").text("");
                    $("#userState").text("");
                    $("#org").text("");
                    $("#post").text("");
                    $("#mail").text("");
                    $("#tel").text("");
                }
            });
        },
        initTreegrid: function (serv, objId, ObjType) {
            var req = [
                {
                    service: serv,
                    OBJ_ID: objId,
                    OBJ_TYPE: ObjType,
                    AUTH_TYPE: '1'
                }
            ];
            var wpWidth = $("#westPanel").width();
            var wpHeight = $("#westPanel").height();
            $('#permTree').treegrid({
                idField: 'PERM_ID',
                treeField: 'PERM_NAME',
                singleSelect: false,
                deepCascadeCheck: true,
                treeExpand: 0,
                req: req,
                columns: [
                    [
                        {title: 'PERM_ID', field: 'PERM_ID', hidden: true},
                        {field: 'PERM_NAME', title: '权限名称', width: wpWidth / 3 * 2},
                        {field: 'CONS_ID', title: '约束操作', width: (wpWidth / 3) - 100, align: 'center', formatter: function (value, row, index) {
                            if (value != "") {
                                return "<div style='border: 1px solid #A0A0A0;cursor:pointer; width: 80px;height:16px;background-color:#F0F0F0 ' align='center' onclick='$LookFunPerm.createConsForm(" + row.PERM_ID + ",event);return false;' >查看约束</div>";
                            }
                        }}
                    ]
                ],
                loadFilter: $PermUtil.dataFilter
            });
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
                        switch (returnData[0].USER_STA) {
                            case '1':
                                $("#userState").text("正常");
                                break;
                            case '2':
                                $("#userState").text("冻结");
                                break;
                            case '9':
                                $("#userState").text("注销");
                                break;
                        }

                        $("#post").text(returnData[0].POST_NAME);
                        $("#mail").text(returnData[0].EMAIL);
                        $("#tel").text(returnData[0].MOBILE);

                    }
                }
            });
        },
        createConsForm: function (id, event) {
            var e = (event) ? event : window.event;
            if (window.event) {//IE
                e.cancelBubble = true;
            } else { //FF
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
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始时间：</td ><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_tMin' readonly='readonly'  style='border:none'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_tMax' readonly='readonly' style='border:none'/></td></tr>";
                        } else if (consType == 2) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_dMin' readonly='readonly' style='border:none'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期：</td><td style='padding-top: 10px;width: 200px;'><input type='text'  id='perId" + permId + "_consId" + consId + "_dMax' readonly='readonly' style='border:none'/></td></tr>";
                        } else if (consType == 3) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>开始日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_dtMin' readonly='readonly' style='border:none'/></td><td style='padding-top: 10px;width: 100px;' align='right'>结束日期时间：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_dtMax' readonly='readonly' style='border:none'/></td></tr>";
                        } else if (consType == 4) {
                            tr = tr + "<tr><td style='width: 100px;'><span>" + consName + "：</span></td><td style='padding-left: 15px;padding-top: 10px;width: 100px;' align='right'>IP段：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_ipMin' readonly='readonly' style='border:none'/></td><td style='padding-top: 10px;width: 100px;' align='right'>至：</td><td style='padding-top: 10px;width: 200px;'><input type='text' id='perId" + permId + "_consId" + consId + "_ipMax' readonly='readonly' style='border:none'/></td></tr>";
                        }
                    }

                    $("#consForm").append(tr);
                    $.parser.director($("#consForm"));

                    var v = $("#objId").combobox("getValue");
                    if (v == 2) {
                        var operId = $('#FUN_OPER_ID').combogrid('getValue');
                        if (operId == '') {
                            alert('请选择人员！');
                            return;
                        }
                        if (typeof(permId) != "undefined") {
                            $LookFunPerm.fillData('2', operId, permId);
                        }

                    } else if (v == 3) {
                        var postId = $('#FUN_POST_ID').combogrid('getValue');
                        if (postId == '') {
                            alert('请选择岗位！');
                            return;
                        }
                        if (typeof(permId) != "undefined") {
                            $LookFunPerm.fillData('3', postId, permId);
                        }
                    } else if (v == 4) {
                        var node = $('#FUN_ORG_CODE').combotree("tree").tree('getSelected');
                        var orgCode = node.id;
                        if (orgCode == '') {
                            alert('请选择机构！');
                            return;
                        }
                        if (typeof(permId) != "undefined") {
                            $LookFunPerm.fillData('4', orgCode, permId);
                        }
                    }
                    $LookFunPerm.consCondiction();
                    //}
                }
            });
        },
        setVal: function (consType, id, consMin, consMax, cType) {
            if (id.indexOf('_tMin') > -1 && cType == 1) {
                $("#" + id).val(consMin);
            } else if (id.indexOf('_tMax') > -1 && cType == 1) {
                $("#" + id).val(consMax);
            } else if (id.indexOf('_dMin') > -1 && cType == 2) {
                $("#" + id).val(consMin);
            } else if (id.indexOf('_dMax') > -1 && cType == 2) {
                $("#" + id).val(consMax);
            } else if (id.indexOf('_dtMin') > -1 && cType == 3) {
                $("#" + id).val(consMin);
            } else if (id.indexOf('_dtMax') > -1 && cType == 3) {
                $("#" + id).val(consMax);
            } else if (id.indexOf('_ipMin') > -1 && cType == 4) {
                $("#" + id).val(consMin);
            } else if (id.indexOf('_ipMax') > -1 && cType == 4) {
                $("#" + id).val(consMax);
            }
        },
        fillData: function (objType, objId, permId) {
            ajaxRequest({
                req: [
                    {
                        service: 'P0002223',
                        PERM_ID: permId,
                        OBJ_TYPE: objType,
                        OBJ_ID: objId,
                        ASS_TYPE: '1',
                        AUTH_TYPE: '1'
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
                                        $LookFunPerm.setVal(cType, id, cMin, cMax, cType);
                                    }

                                }
                            });
                        });
                    }
                }
                //}
            });
        },
        consCondiction: function () {
            $("#consPermDialog").dialog({
                modal: true,
                title: "约束条件",
                width: 730,
                height: 230,
                buttons: [
                    {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            $("#consPermDialog").dialog("close");
                        }
                    }
                ]
            });
            $.parser.director($("#consForm"));
        },
        queryPermFun: function (serv, objId, ObjType) {
            ajaxRequest({
                req: [
                    {
                        service: serv,
                        OBJ_ID: objId,
                        OBJ_TYPE: ObjType
                    }
                ],
                func: function (data) {
                    //succDataDeal(data);
                }
            });
        },
        userInfoQuery: function (v, id) {
            var req = "";
            if (v == 1) {
                req = [
                    {
                        service: "P0001008",
                        ROLE_ID: id
                    }
                ];
            } else if (v == 3) {
                req = [
                    {
                        service: "P0001008",
                        POST_ID: id
                    }
                ];
            } else if (v == 4) {
                req = [
                    {
                        service: "P0001008",
                        ORG_CODE: id
                    }
                ];
            }
            $LookFunPerm.initOperator(req);
        },
        initOperator: function (req) {
            var centerPanelW = $("#centerPanel").width();
            var centerPanelH = $("#centerPanel").height();
            $('#operTbl').datagrid({
                fit: true,
                fallParas: [
                    {enable: true}
                ],
                req: req,
                columns: [
                    [
                        {field: 'USER_CODE', title: 'ID号', sortType: 'number', width: (centerPanelW / 4) - 60},
                        {field: 'USER_NAME', title: '人员名称', width: centerPanelW / 4},
                        {field: 'ORG_NAME', title: '机构名称', width: centerPanelW / 4},
                        {field: 'USER_STA', title: '人员状态', width: centerPanelW / 4, formatter: function (value) {
                            return getSysDictOpt('USER_STA', value);
                        }}
                    ]
                ]
            });
        },
        initPost: function () {
            var centerPanelW = $("#centerPanel").width();
            var centerPanelH = $("#centerPanel").height();
            $('#FUN_POST_ID').combogrid({
                panelHeight: 280,
                panelWidth: 500,
                idField: 'POST_ID',
                textField: 'POST_NAME',
                req: [
                    {
                    	service: 'P0001045',
                        POST_STA: '1'
                    }
                ],
                queryCols: [
                    {
                        'text': '查询',
                        'icon': 'icon-search',
                        collapsed: true,
                        cols: [
                            {
                                title: '岗位名称',
                                field: 'POST_NAME',
                                editor: {
                                    type: 'text',
                                    options: {
                                        validType: 'val[0,64]'
                                    }
                                }
                            }
                        ]
                    }
                ],
                columns: [
                    [
                        {field: 'POST_ID', title: '岗位编号', sortType: 'number', width: 70},
                        {field: 'POST_NAME', title: '岗位名称', width: 160},
                        {field: 'POST_STA', title: '岗位状态', width: 160,
                            formatter: function (value, row, index) {
                                return getSysDictOpt('POST_STA', value);
                            }
                        }
                    ]
                ],
                onClickRow: function (rowIndex, rowData) {
                    var postId = rowData["POST_ID"];
                    $LookFunPerm.initTreegrid('P0002232', postId, '3');
                    $LookFunPerm.userInfoQuery(3, postId);
                },
                onClear: function () {
                    $('#FUN_POST_ID').combogrid("grid").datagrid("clearSelections");
                    $LookFunPerm.initTreegrid('P0002232', '-999999999', '3');
                    $LookFunPerm.userInfoQuery(3, '-999999999');
                }
            });
        },
        initOrg: function () {
            $('#FUN_ORG_CODE').combotree({
                panelHeight: 280,
                panelWidth: 280,
                multiple: false,
                req: [
                    {service: 'P0001031'}
                ],
                conf: {nodeId: 'ORG_CODE', nodeName: 'ORG_CODE_NAME', parNode: 'PAR_ORG', treeType: '1'},
                onClick: function (node) {
                    var orgCode = node.id;
                    $LookFunPerm.initTreegrid('P0002232', orgCode, '4');
                    $LookFunPerm.userInfoQuery(4, orgCode);
                },
                onClear: function () {
                    $LookFunPerm.initTreegrid('P0002232', '-999999999', '4');
                    $LookFunPerm.userInfoQuery(4, '-999999999');
                }
            });
        },
        createDom: function (tag) {
            var funPostId = $('#FUN_POST_ID'), funOrgCode = $('#FUN_ORG_CODE'), funOperId = $('#FUN_OPER_ID');
            if (funPostId.data("combogrid")) {
                funPostId.combogrid("destroy");
            }
            if (funOperId.data("combogrid")) {
                funOperId.combogrid("destroy");
            }
            if (funOrgCode.data("combotree")) {
                funOrgCode.combotree("destroy");
            }
            if (tag == 2) {
                $("#userId_1").hide();
                $("#userId_2").show();
                $(".datagrid-queryForm").children().remove();
                $("#objName").text("人员");
                $("#funOperId").append('<select id="FUN_OPER_ID" name="objSel" style="width:130px" class="kui-validatebox" kui-options=""></select>');
                $.parser.parse($("#funOperId"));
                $LookFunPerm.initOper();
                $("#userCode").text("");
                $("#userName").text("");
                $("#userState").text("");
                $("#org").text("");
                $("#post").text("");
                $("#mail").text("");
                $("#tel").text("");
            } else if (tag == 3) {
                $("#userId_1").show();
                $("#userId_2").hide();
                $("#pp").panel("resize");
                $(".datagrid-queryForm").children().remove();
                $("#objName").text("岗位");
                $("#selCombo").append('<select id="FUN_POST_ID" name="objSel" style="width:130px" class="kui-validatebox"></select>');
                $.parser.parse($("#selCombo"));
                $LookFunPerm.initPost();
            } else if (tag == 4) {
                $("#userId_1").show();
                $("#userId_2").hide();
                $("#pp").panel("resize");
                $("#objName").text("组织机构");
                $("#orgTree").append('<input id="FUN_ORG_CODE" style="width:120px"/>');
                $.parser.parse($("#orgTree"));
                $LookFunPerm.initOrg();
            }

        },
        chooseObj: function () {
            var v = $("#objId").combobox("getValue");
            $LookFunPerm.initTreegrid('P0002232', 'orgCode', '-999999999');
            $LookFunPerm.userInfoQuery(3, "-999");
            $LookFunPerm.createDom(v);
        }
    };
    window.$LookFunPerm = new LookFunPerm();
})();

window.$ready = function () {
    using(["combogrid", "treegrid", "dialog", "datagrid", "combotree"], function () {
        $LookFunPerm.init();
    });
};
$(window).resize(function () {
    $(".kui-layout").layout("resize");
    $("#permTreePanel").panel("resize");
    if ($("#pp")[0].style.display != "none") {
        $("#pp").panel("resize");
    } else if ($("#operPanel")[0].style.display != "none") {
        $("#operPanel").panel("resize");
    }
    $("#permTree").treegrid("resize");
});