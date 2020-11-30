(function () {
    var FuncAuth = function () {
    };
    FuncAuth.prototype = {
        init: function () {
            this.createDom(3);
            this.initTreegrid($('#permTree'), '1,2,3,5,6,8,9');
            this.initTreegrid($('#authTree'), '1,2,3,5,6,8,9');
        },
        initTreegrid: function (target, permType) {
            var wpWidth = $("#westPanel").width();
            var wpHeight = $("#westPanel").height();
            target.treegrid({
                fit: true,
                idField: 'PERM_ID',
                treeField: 'PERM_NAME',
                singleSelect: false,
                deepCascadeCheck: true,
                treeExpand: 0,
                req: [
                    {
                        service: 'P0002268',
                        PERM_TYPE: permType
                    }
                ],
                columns: [
                    [
                        {title: 'PERM_ID', field: 'PERM_ID', checkbox: true},
                        {field: 'PERM_NAME', title: '权限名称', sortable: false, width: wpWidth * 2 / 3},
                        {field: 'CONS_ID', title: '约束操作', sortable: false, width: (wpWidth / 3) - 100, align: 'center', formatter: function (value, row, index) {
                            if (value != "") {
                                value = "<div style='border:1px solid #A0A0A0;cursor:pointer;width: 60px;height:16px;background-color:#F0F0F0;' onclick='$FuncAuth.createConsForm(" + row.PERM_ID + "," + JSON.stringify(row.PERM_NAME) + ",event);return false;'>约束</div>";
                            }
                            return value;
                        }}
                    ]
                ],
                curRowCascadeCheck: function (curRow) {
                    if (curRow.PERM_TYPE < 5) {
                        return true;
                    }
                    return false;
                },
                loadFilter: $PermUtil.dataFilter,
                onLoadSuccess: function (row, data) {
                    var _data = data.rows;
                    $("body").removeData("funauthIds");
                    var ids = [];
                    if (_data) {
                        for (var i = 0; i < _data.length; i++) {
                            ids.push(_data[i].PERM_ID);
                        }
                        $("body").data("funauthIds", ids);
                    }
                }
            });
        },
        initPost: function () {
            $('#FUN_POST_ID').combogrid({
                panelHeight: 280,
                panelWidth: 500,
                required: true,
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
                        {
                            field: 'POST_ID',
                            title: '岗位编号',
                            sortType: "number",
                            width: 120
                        },
                        {
                            field: 'POST_NAME',
                            title: '岗位名称',
                            width: 150
                        },
                        {
                            field: 'POST_STA',
                            title: '岗位状态',
                            width: 120,
                            formatter: function (value, row, index) {
                                return getSysDictOpt('POST_STA', value);
                            }
                        }
                    ]
                ],
                onClickRow: function (rowIndex, rowData) {
                    var postId = rowData["POST_ID"];
                    $(".datagrid-header-check").find("input").removeAttr("checked");
                    $FuncAuth.queryPermFun('P0002232', postId, '3');
                    $FuncAuth.userInfoQuery(3, postId);
                },
                onClear: function () {
                    $FuncAuth.queryPermFun('P0002232', "-9999999", '3');
                    $FuncAuth.userInfoQuery(3, "-999999");
                    $('#FUN_POST_ID').combogrid("clear");
                }
            });
        },
        initOrg: function () {
            $('#FUN_ORG_CODE').combotree({
                panelHeight: 280,
                panelWidth: 280,
                multiple: false,
                required: true,
                req: [
                    {service: 'P0001031', ORG_STA: '1'}
                ],
                conf: {nodeId: 'ORG_CODE', nodeName: 'ORG_CODE_NAME', parNode: 'PAR_ORG', treeType: '1'},
                onClick: function (node) {
                    var orgCode = node.id;
                    $(".datagrid-header-check").find("input").removeAttr("checked");
                    $FuncAuth.queryPermFun('P0002232', orgCode, '4');
                    $FuncAuth.userInfoQuery(4, orgCode);
                },
                onClear: function () {
                    $FuncAuth.queryPermFun('P0002232', "-999999", '4');
                    $FuncAuth.userInfoQuery(4, "-999999");
                }
            });
        },
        queryPermFun: function (serv, objId, ObjType) {
            $PermUtil.unAllSelect($('#permTree'));
            $PermUtil.unAllSelect($('#authTree'));
            ajaxRequest({
                async: false,
                req: [
                    {
                        service: serv,
                        OBJ_ID: objId,
                        OBJ_TYPE: ObjType,
                        AUTH_TYPE: '1'
                    },
                    {
                        service: serv,
                        OBJ_ID: objId,
                        OBJ_TYPE: ObjType,
                        AUTH_TYPE: '2'
                    }
                ],
                func: function (data) {
                    $FuncAuth.succDataDeal(data);
                }
            });
        },
        succDataDeal: function (data) {
            var returnData = data[0]['ANS_COMM_DATA'][0];
            if (returnData.length > 0) {
                $("body").removeData("permIdData");
                $("body").data("permIdData", returnData);
                var val = "";
                for (var i = 0; i < returnData.length; i++) {
                    var permId = returnData[i].PERM_ID;
                    $("#permTree").treegrid("select", permId);
                }
            } else {
                $("#permTree").treegrid("unselectAll");
            }
            var returnData1 = data[1]['ANS_COMM_DATA'][0];
            if (returnData1.length > 0) {
                $("body").removeData("permIdData1");
                $("body").data("permIdData1", returnData1);
                var val = "";
                for (var i = 0; i < returnData1.length; i++) {
                    var permId = returnData1[i].PERM_ID;
                    $("#authTree").treegrid("select", permId);
                }
            } else {
                $("#authTree").treegrid("unselectAll");
            }
        },
        userInfoQuery: function (v, id) {
            var req = "";
            if (v == 1) {
                req = [
                    {
                        service: "P0001008",
                        USER_STA: '1',
                        ROLE_ID: id
                    }
                ];
            } else if (v == 3) {
                req = [
                    {
                        service: "P0001008",
                        USER_STA: '1',
                        POST_ID: id
                    }
                ];
            } else if (v == 4) {
                req = [
                    {
                        service: "P0001008",
                        USER_STA: '1',
                        ORG_CODE: id
                    }
                ];
            }
            $FuncAuth.initOperator(req);
        },
        initOperator: function (req) {
            var centerPanelW = $("#centerPanel").width();
            var centerPanelH = $("#centerPanel").height();
            $('#operTbl').datagrid({
                idField: 'USER_CODE',
                textField: 'USER_NAME',
                fallParas: [
                    {enable: true}
                ],
                req: req,
                /* queryCols:[{
                 'text':'查询',
                 'icon':'icon-search',
                 collapsed:true,
                 cols:[{
                 title:'人员名称',
                 field:'USER_NAME',
                 editor:{
                 type:'text',
                 options:{
                 validType:'val[0,64]'
                 }
                 }
                 }]
                 }], */
                columns: [
                    [
                        {
                            field: 'USER_CODE',
                            title: 'ID号',
                            sortType: 'number',
                            width: (centerPanelW / 3) - 50
                        },
                        {
                            field: 'USER_NAME',
                            title: '人员姓名',
                            width: centerPanelW / 3
                        },
                        {
                            field: 'ORG_NAME',
                            title: '机构名称',
                            width: centerPanelW / 3
                        }
                    ]
                ]
            });
        },
        consCondiction: function (target, name) {
            target.dialog({
                modal: true,
                title: name + "约束条件",
                width: 730,
                height: 230,
                buttons: [
                    {
                        text: '保存',
                        iconCls: 'icon-save',
                        handler: $FuncAuth.saveCons
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
        createConsForm: function (id, name, event) {
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

                    var v = $("#objId").combobox("getValue");
                    if (v == 3) {
                        var postId = $('#FUN_POST_ID').combogrid('getValue');
                        if (postId == '') {
                            alert('请选择岗位！');
                            return;
                        }
                        if (typeof(permId) != "undefined") {
                            $PermUtil.fillData('3', postId, permId);
                        }
                    } else if (v == 4) {
                        var node = $('#FUN_ORG_CODE').combotree("tree").tree('getSelected');
                        if (node == null) {
                            alert('请选择机构！');
                            return;
                        }
                        var orgCode = node.id;
                        if (typeof(permId) != "undefined") {
                            $PermUtil.fillData('4', orgCode, permId);
                        }
                    }
                    $FuncAuth.consCondiction($("#consPermDialog"), name);
                }
                //}
            });
        },
        saveCons: function () {

            if (!$("#consForm").form('validate')) return false;
            var permConsVals = $PermUtil.permConsValsFun("consForm");
            var permId = $("#perm_id").val();
            var v = $("#objId").combobox("getValue");
            if ($FuncAuth.compTime(permConsVals) === false) return false;
            if (v == 3) {
                var postId = $('#FUN_POST_ID').combogrid('getValue');
                $PermUtil.consReq('3', postId, permId, permConsVals);
                //$("#permTree").treegrid("select", permId);
                //$FuncAuth.queryPermFun('P0002232',postId,'3');
            } else if (v == 4) {
                var node = $('#FUN_ORG_CODE').combotree("tree").tree('getSelected');
                var orgCode = node.id;
                $PermUtil.consReq('4', orgCode, permId, permConsVals);
                //$("#permTree").treegrid("select", permId);
                //$FuncAuth.queryPermFun('P0002232',orgCode,'4');
            }
        },
        ajaxRequestFun: function (objType, objId, v) {
            var oldPermId = new Array();
            var tab = $('#p').tabs('getSelected');
            var index = $('#p').tabs('getTabIndex', tab);
            var returnData = '';
            if(index==0) { // 使用权限
                returnData = $("body").data("permIdData");
            } else if(index==1) {
                returnData = $("body").data("permIdData1");
            }// 授权权限

            if (typeof(returnData) != 'undefined') {
                for (var i = 0; i < returnData.length; i++) {
                    oldPermId.push(returnData[i].PERM_ID);
                }
                var $ids = $("body").data("funauthIds");
                if (typeof($ids) != 'undefined') {
                    oldPermId = $PermUtil.getSameVal(oldPermId, $ids);
                }
            }
            var newPermId = new Array();

            var rows = '';
            if(index==0) { // 使用权限
                rows = $('#permTree').treegrid('getSelections');
            } else if(index==1) {
                rows = $('#authTree').treegrid('getSelections');
            }// 授权权限
            for (var i = 0; i < rows.length; i++) {
                newPermId.push(rows[i].PERM_ID);
            }

            var sameVal = $PermUtil.getSameVal(oldPermId, newPermId);
            var delId = $PermUtil.getDiffVal(sameVal, oldPermId);
            var addId = $PermUtil.getDiffVal(sameVal, newPermId);

            var AUTH_TYPE = '';
            if(index==0) { // 使用权限
                AUTH_TYPE = '1';
            } else if(index==1) {
                AUTH_TYPE = '2';
            }// 授权权限
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
                        AUTH_TYPE: AUTH_TYPE
                    }
                ],
                func: function (data) {
                    if(index==0) { // 使用权限
                        $("body").removeData("permIdData");
                    } else if(index==1) {
                        $("body").removeData("permIdData1");
                    }// 授权权限

                    alert("授权成功！");
                    if (objType == 3) {
                        $FuncAuth.queryPermFun('P0002232', objId, '3');
                    } else if (objType == 4) {
                        $FuncAuth.queryPermFun('P0002232', objId, '4');
                    }
                }
            });
        },
        savePostPerm: function () {
            var postId = $('#FUN_POST_ID').combogrid('getValue');
            /*if(postId==''){
             alert('请选择岗位！');
             return;
             }*/
            if (!$('#funAuthForm').form('validate')) {
                return false;
            }
            $FuncAuth.ajaxRequestFun('3', postId, 3);
        },
        saveOrgPerm: function () {
            var node = $('#FUN_ORG_CODE').combotree("tree").tree('getSelected');
            /*if(node == null){
             alert('请选择机构！');
             return;
             }*/
            if (!$('#funAuthForm').form('validate')) {
                return false;
            }

            var orgCode = node.id;
            $FuncAuth.ajaxRequestFun('4', orgCode, 4);
        },
        savePerm: function () {
            var v = $("#objId").combobox("getValue");
            if (v == 3) {
                $FuncAuth.savePostPerm();
            } else if (v == 4) {
                $FuncAuth.saveOrgPerm();
            } else {
                alert("请选择对象！");
            }
        },
        createDom: function (tag) {
            var funPostId = $('#FUN_POST_ID'), funOrgCode = $('#FUN_ORG_CODE');
            if (funPostId.data("combogrid")) {
                funPostId.combogrid("destroy");
            }

            if (funOrgCode.data("combotree")) {
                funOrgCode.combotree("destroy");
            }
            if (tag == 3) {
                $("#objName").text("岗位");
                $("#selCombo").append('<select id="FUN_POST_ID" name="objSel" style="width:130px" class="kui-validatebox"></select>');
                $.parser.parse($("#selCombo"));
                $FuncAuth.initPost();
                $('#p').tabs('enableTab', 1);
            } else if (tag == 4) {
                $("#objName").text("组织机构");
                $("#orgTree").append('<input id="FUN_ORG_CODE" style="width:120px"/>');
                $.parser.parse($("#orgTree"));
                $FuncAuth.initOrg();
                $('#p').tabs('select', 0);
                $('#p').tabs('disableTab', 1);

            }

        },
        chooseObj: function () {
            $("body").removeData("permIdData");
            $PermUtil.unAllSelect($('#permTree'));
            var v = $("#objId").combobox("getValue");
            $FuncAuth.userInfoQuery(1, "9999999999");
            $(".datagrid-header-check").find("input").removeAttr("checked");
            $FuncAuth.createDom(v);
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
            		}  else if (consObjArr[2].length == 17 && consObjArr[3].length == 17){
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

    window.$FuncAuth = new FuncAuth();
})();