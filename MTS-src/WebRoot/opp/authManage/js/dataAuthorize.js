(function () {
    function DataAuth() {};
    DataAuth.prototype = {
        constructor: DataAuth,
        init: function () {
            $("#org").hide();
            $("#post").hide();
            this.initOperator();
            this.initPost();
            this.initOrg();
            this.operAuth();
            this.getDataAuthMrgObj();

        },
        initOperator: function () {
            var wpWidth=$("#westPanel").width() - 5;
            var wpHeight=$("#westPanel").height() - 2;
            $('#operTbl').datagrid({
                width: wpWidth,
                height: wpHeight,
                idField: 'USER_CODE',
                textField: 'USER_NAME',
                singleSelect: true,
                fallParas: [
                    {enable: true}
                ],
                req: [
                    {
                        service: 'P0001008',
                        USER_STA: '1'
                    }
                ],
                queryCols: [
                    {
                        'text': '查询',
                        'icon': 'icon-search',
                        collapsed: true,
                        cols: [
                            {
                                title: '人员姓名',
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
                        {field: 'USER_CODE', title: 'ID号', sortType: 'number', width: wpWidth/6},
                        {field: 'USER_NAME', title: '人员姓名', width: wpWidth/3},
                        {field: 'ORG_NAME', title: '机构名称', width: wpWidth/4}
                    ]
                ]
            });
        },
        initPost: function () {
            var wpWidth=$("#westPanel").width() - 5;
            var wpHeight=$("#westPanel").height() - 2;
            $('#postTbl').datagrid({
                width: wpWidth,
                height: wpHeight,
                idField: 'POST_ID',
                textField: 'POST_NAME',
                singleSelect: true,
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
                        {field: 'POST_ID', title: '岗位编号', sortType: 'number', width: wpWidth/6},
                        {field: 'POST_NAME', title: '岗位名称', width: wpWidth/3},
                        {field: 'POST_STA', title: '岗位状态', width: wpWidth/4,
                            formatter: function (value, row, index) {
                                return getSysDictOpt('POST_STA', value);
                            }
                        }
                    ]
                ]
            });
        },
        initOrg: function () {
            $('#orgTbl').tree({
                width: $("#westPanel").width() - 5,
                height: $("#westPanel").height() - 2,
                multiple: false,
                checkbox: false,
                req: [
                    {service: 'P0001031', ORG_STA: '1',AUTH_TYPE: '2'}
                ],
                conf: {nodeId: 'ORG_CODE', nodeName: 'ORG_CODE_NAME', parNode: 'PAR_ORG', treeType: '1'}
            });
        },
        operAuth: function () {
            var centerPanelW = $("#centerPanel").width();
            var centerPanelH = $("#centerPanel").height();
            $("#sysServiceTbl").datagrid({
                width: centerPanelW - 20,
                height: ((parseInt(centerPanelH)) / 2) - 45,
                idField: 'PERM_SET_ID',
                singleSelect: false,
                req: [
                    {
                        service: 'P0002241'
                    }
                ],
                columns: [
                    [
                        {checkbox: true},
                        {field: 'PERM_SET_ID', title: '权限集编号', sortType: "number", width: (centerPanelW - 20)/3},
                        {field: 'PERM_SET_NAME', title: '权限集名称', width: (centerPanelW - 20)/2}
                    ]
                ]
            });
            $("#premTypeDiv").show();
        },
        getDataAuthMrgObj: function () {
            ajaxRequest({
                async: true,
                req: [
                    {
                        service: 'P0002251'
                    }
                ],
                func: function (data) {
                    var _d = data[0];//这里获取到所有需要展示tab页
                    $("body").removeData("dataPermMrgObjData");
                    $("body").data("dataPermMrgObjData", _d);
                    var reqs=[];
                    $DataAuth.ddd={};
                    for(var ti in _d){
                        var _tid=_d[ti];
                        var ctrlObjId=_tid.CTRL_OBJ_ID,
                            ctrlObjType=_tid.CTRL_OBJ_TYPE,
                            dataLoadType=_tid.DATA_LOAD_TYPE,
                            dictName=_tid.DICT_NAME,
                            inputType=_tid.INPUT_TYPE ,
                            treeInputId=_tid.TREE_INPUT_ID,
                            funcId=_tid.FUNC_ID,
                            funcParam=_tid.FUNC_PARAM,
                            funcRetId=_tid.FUNC_RET_ID,
                            funcRetName=_tid.FUNC_RET_NAME;
                        if (dataLoadType == "1") {
                            $DataAuth.ddd[dictName]=_d[ti];
                            reqs.push({service: "P0000021",DICT_CODE: dictName});
                        } else if (dataLoadType == "2" && inputType == '2' && (typeof treeInputId == "undefined" ? 0 : treeInputId.trim()) == '1') {
                            $DataAuth.ddd["1"]=_d[ti];
                            reqs.push({service: 'P0001031', ORG_STA: '1'});
                        } else if (dataLoadType == "2" && inputType == '1') {
                            var objData = {};
                            if (funcParam == "-1") {
                                funcParam = [{}];
                            } else {
                                var params = funcParam.split(",");
                                for (var i = 0; i < params.length; i++) {
                                    var parm = params[i];
                                    var p = parm.split(":");
                                    objData[p[0]] = p[1];
                                }
                                funcParam = objData;
                            }
                            reqs.push($.extend({},{service:funcId},funcParam));
                        }
                    }
                    $DataAuth.tabIndexObj=_d;
                    //这里再去获取每个tab页对应的数据
                    ajaxRequest({
                        async: true,
                        req: reqs,
                        func: function () {
                            //这里的data包含tab的所有的数据
                            $DataAuth.tabObjData=this;
                            $DataAuth.initTab();
                        }
                    });
                }
            });
        },
        initTab: function () {
            var centerPanelW = $("#centerPanel").width();
            var centerPanelH = $("#centerPanel").height();
            $("#dTabs").tabs({
                onAdd: $DataAuth.select,
                onSelect:function(title,index){
                    var obj = $("#obj_" + index);
                    var dataLoadType = obj.attr("dataLoadType");
                    var inputType = obj.attr("inputType");
                    var treeInputId = obj.attr("treeInputId");
                    if (dataLoadType == "1") {
//                        obj.datagrid("reload");
                        obj.datagrid("resize");
                    } else if (dataLoadType == "2" && inputType == '2' && (typeof treeInputId == "undefined" ? 0 : treeInputId.trim()) == '1') {
//                        obj.tree("loadData", obj.data("treeData"));
                    } else if (dataLoadType == "2" && inputType == '1') {
//                        obj.datagrid("reload");
                        obj.datagrid("resize");
                    }
                }
            });
            if($DataAuth.tabIndexObj.length==$DataAuth.tabObjData.length){
                for(var t = 0;t<$DataAuth.tabIndexObj.length;t++){
                    var data=$DataAuth.tabIndexObj[t];
                    var options = $('#dTabs').tabs("options");
                    var title=data.CTRL_OBJ_NAME + "[" + getSysDictOpt('CTRL_OBJ_TYPE', data.CTRL_OBJ_TYPE) + "]";
                    if (options) {
                        $('#dTabs').tabs('add', {
                            title: title,
                            closable: false,
                            selected: false,
                            content: "<div id='obj_" + t + "' ctrlObjId='" + data.CTRL_OBJ_ID + "' ctrlObjType='" + data.CTRL_OBJ_TYPE + "'  dataLoadType='" + data.DATA_LOAD_TYPE + "' dictName='" + data.DICT_NAME + "' inputType='" + data.INPUT_TYPE + "' treeInputId='" + data.TREE_INPUT_ID + "' funcId='" + data.FUNC_ID + "' funcParam='" + data.FUNC_PARAM + "' funcRetId='" + data.FUNC_RET_ID + "' funcRetName='" + data.FUNC_RET_NAME + "'></div>"
                        });
                    }
                }
            }
            if($DataAuth.tabIndexObj.length!=0){
                $("#dTabs").tabs("select",$DataAuth.tabIndexObj.length-1);
            }
        },
        select: function (title, index) {
            var obj = $("#obj_" + index);
            var dd=index;
            var tid=$DataAuth.tabIndexObj[dd];
            var tdo=$DataAuth.tabObjData[dd].ANS_COMM_DATA[0];
            var dataLoadType=tid.DATA_LOAD_TYPE,ctrlObjType=tid.CTRL_OBJ_TYPE,
                inputType=tid.INPUT_TYPE,
                treeInputId = tid.TREE_INPUT_ID,
                funcId=tid.FUNC_ID,
                funcParam=tid.FUNC_PARAM,
                funcRetId=tid.FUNC_RET_ID,
                funcRetName=tid.FUNC_RET_NAME;
            if (dataLoadType == "1") {
                var title = getSysDictOpt('CTRL_OBJ_TYPE', ctrlObjType);
                var columns = [
                    [
                        {field: 'ITEM_ID', title: '全选', width: 120, checkbox: true},
                        {field: 'DICT_ITEM_NAME', title: title, width: 170}
                    ]
                ];
                $DataAuth.initGrid(tdo,obj, columns, []);
            } else if (dataLoadType == "2" && inputType == '2' && (typeof treeInputId == "undefined" ? 0 : treeInputId.trim()) == '1') {
                $DataAuth.initTree(tdo,obj);
            } else if (dataLoadType == "2" && inputType == '1') {
                var code = funcRetId.split(":");
                var name = funcRetName.split(":");
                var columns = [
                    [
                        {checkbox: true},
                        {field: code[0], title: code[1], width: 120},
                        {field: name[0], title: name[1], width: 170}
                    ]
                ];
                $DataAuth.initGrid(tdo,obj,columns);
            }
        },
        initGrid: function (data, target, cls) {
            if(data.length == undefined) {
                data = [];
            }
            target.datagrid({
                fit:true,
                singleSelect: false,
                columns: cls
            });
            var originalRows = data;
            var rows = originalRows;
            var total = originalRows.length;
            var datagridData = {"originalRows": originalRows, "rows": rows, "total": total};
            target.datagrid("loadData", datagridData);
         },
        initTree: function (data,target) {
            target.tree({
                width: $("#centerPanel").width() - 25,
                height: parseInt($("#centerPanel").height()) / 2 - 8,
                animate: true,
                checkbox: true,
                multiple: true,
                conf: {nodeId: 'ORG_CODE', nodeName: 'ORG_CODE_NAME', parNode: 'PAR_ORG', treeType: '1'},
                data: data
            }).data("treeData", data);
            //debugger;
        },

        reload: function () {
            /*$("input[name=premType][value=1]").attr("checked","checked");
             using("",function(){
             $("#sysServiceTbl").datagrid("clearSelections");
             });*/
        },
        choosePermObj: function () {
            var v = $("#premObj").combobox("getValue");
            $("#sysServiceTbl").datagrid("clearSelections");
            var tab = $('#dTabs').tabs('getSelected');
            var index = $('#dTabs').tabs('getTabIndex', tab);

            var dataPermMrgObjData = $("body").data("dataPermMrgObjData");
            if (typeof dataPermMrgObjData != "undefined") {
                for (var i = 0; i < dataPermMrgObjData.length; i++) { //获取管理对象选择数据
                    if (i != index) {
                        continue;
                    }
                    var _obj = dataPermMrgObjData[i];
                    var target = $("#obj_" + i);
                    var dataLoadType = _obj.DATA_LOAD_TYPE;
                    var inputType = _obj.INPUT_TYPE;
                    var treeInputId = _obj.TREE_INPUT_ID;
                    var ctrlObjId = _obj.CTRL_OBJ_ID;
                    if (dataLoadType == "2" && inputType == '2' && (typeof treeInputId == "undefined" ? 0 : treeInputId.trim()) == '1') {
                        //树
//                        target.tree('reload');
                    } else {
                        //grid 数据字典
                        target.datagrid('clearSelections');
                    }
                }
            }
            if (v == 0) {
                $("#oper").show();
                $("#org").hide();
                $('#operTbl').datagrid("clearSelections");
                $("#post").hide();
                $('body').find(".datagrid-queryForm form").find("input[name=USER_NAME]").val("");
                $('#operTbl').datagrid("reload");
            } else if (v == 1) {
                $("#oper").hide();
                $("#org").show();
//                $DataAuth.initOrg();
                $("#post").hide();
            } else if (v == 2) {
                $("#oper").hide();
                $("#org").hide();
                $("#post").show();
//                $DataAuth.initPost();
                $('body').find(".datagrid-queryForm form").find("input[name=POST_NAME]").val("");
                $('#postTbl').datagrid("clearSelections");
                $('#postTbl').datagrid("reload");
                $('#postTbl').datagrid("resize");
            }
//            $DataAuth.reload();
        },

        createTabs: function (id, title, v, data) {
            var options = $('#dTabs').tabs("options");
            if (options) {
                $('#dTabs').tabs('add', {
                    title: title,
                    closable: false,
                    content: "<div id='obj_" + v + "' ctrlObjId='" + data.CTRL_OBJ_ID + "' ctrlObjType='" + data.CTRL_OBJ_TYPE + "'  dataLoadType='" + data.DATA_LOAD_TYPE + "' dictName='" + data.DICT_NAME + "' inputType='" + data.INPUT_TYPE + "' treeInputId='" + data.TREE_INPUT_ID + "' funcId='" + data.FUNC_ID + "' funcParam='" + data.FUNC_PARAM + "' funcRetId='" + data.FUNC_RET_ID + "' funcRetName='" + data.FUNC_RET_NAME + "'></div>"
                });
            }
        },
        sendReq: function (rows, objType, data) {
            var rows_sysService = data.rows_sysService;
            var ctrlObjId = data.dataPermMrgObjData.ctrlObjId;
            if (typeof rows_sysService != "undefined") {
                try {
                    var params=[];
                    var objId='';
                    if(objType=="1"){
                        objId=rows[0]["USER_CODE"];
                    }else if(objType=="4"){
                        objId=rows[0]["POST_ID"];
                    }else if(objType=="3"){
                        objId=rows.id;
                    }
                    var req = {
                        service: 'P0002263',
                        EMPOWER_TYPE: data.premTypeVal,
                        EMPOWER_OBJ_TYPE: objType,
                        EMPOWER_OBJ_ID: objId,
                        CTRL_OBJ_ID: ctrlObjId,
                        CTRL_OBJ_VAL: data.dataPermMrgObjData[ctrlObjId].toString(),
                        REMARK: ""
                    };
                    params.push(req);
                    var reqs = [];
                    for(var p=0;p<params.length;p++){
                        for (var i = 0; i < rows_sysService.length; i++) {
                            var tempReq = {};
                            tempReq['PERM_SET_ID'] = rows_sysService[i]["PERM_SET_ID"];
                            tempReq = $.extend({}, params[p], tempReq);
                            reqs.push(tempReq);
                        }
                    }
                    ajaxRequest({
                        async: true,
                        req: reqs,
                        func: function (data) {
                            $("#save_button").linkbutton("enable");
                            $.message.alert("保存成功!");
                            $DataAuth.mask.remove();
                        },
                        error:function(emsg){
                            $("#save_button").linkbutton("enable");
                            $.message.alert("保存失败!");
                            $DataAuth.mask.remove();
                        }
                    });
                } catch (e) {
                    $("#save_button").linkbutton("enable");
                }
            }
        },
        saveOperDataPerm: function (data) {
            var rows = $('#operTbl').datagrid('getSelections');
            $DataAuth.sendReq(rows, '1', data);
        },
        savePostDataPerm: function (data) {
            var rows = $('#postTbl').datagrid('getSelections');
            $DataAuth.sendReq(rows, '4', data);
        },
        saveOrgDataPerm: function (data) {
            var checkNode = $('#orgTbl').tree('getSelected');
            $DataAuth.sendReq(checkNode, '3', data);
        },
        getDataPermMrgObjData: function () {
            var dataObj = {};
            var tab = $('#dTabs').tabs('getSelected');
            var index = $('#dTabs').tabs('getTabIndex', tab);

            var dataPermMrgObjData = $("body").data("dataPermMrgObjData");
            if (typeof dataPermMrgObjData != "undefined") {
                for (var i = 0; i < dataPermMrgObjData.length; i++) { //获取管理对象选择数据
                    if (i != index) {
                        continue;
                    }
                    var _obj = dataPermMrgObjData[i];
                    var target = $("#obj_" + i);
                    var dataLoadType = _obj.DATA_LOAD_TYPE;
                    var inputType = _obj.INPUT_TYPE;
                    var treeInputId = _obj.TREE_INPUT_ID;
                    var ctrlObjId = _obj.CTRL_OBJ_ID;
                    if (dataLoadType == "2" && inputType == '2' && (typeof treeInputId == "undefined" ? 0 : treeInputId.trim()) == '1') {
                        //树
                        var checkNode = target.tree('getChecked');
                        if (typeof checkNode != "undefined") {
                            var nodes = [];
                            for (var j = 0; j < checkNode.length; j++) {
                                nodes.push(checkNode[j].id);
                            }
                            dataObj.ctrlObjId = ctrlObjId;
                            dataObj[ctrlObjId] = nodes;
                        }
                    } else {
                        //grid 数据字典
                        var rows = target.datagrid('getSelections');
                        if (typeof rows != "undefined") {
                            var selects = [];
                            for (var j = 0; j < rows.length; j++) {
                                if (dataLoadType == "1") {
                                    selects.push(rows[j]["ITEM_ID"]);
                                } else if (dataLoadType == "2" && inputType == '1') {
                                    var funcRetId = _obj.FUNC_RET_ID;
                                    var code = funcRetId.split(":");
                                    selects.push(rows[j][code[0]]);
                                }
                            }
                            dataObj.ctrlObjId = ctrlObjId;
                            dataObj[ctrlObjId] = selects;
                        }
                    }
                }
            }
            return dataObj;
        },
        saveDataPerm: function () {
            var premTypeVal = $("input[name='premType']:checked").val();
            var rows_sysService = $("#sysServiceTbl").datagrid('getSelections');
            var index = $("#premObj").combobox("getValue");
            if (index == 0) {
                var rows = $('#operTbl').datagrid('getSelections');
                if (rows.length == 0) {
                    $.message.alert("请选择人员！");
                    return false;
                }
            } else if (index == 1) {
                var checkNode = $('#orgTbl').tree('getSelected');
                if (checkNode.length == 0) {
                    $.message.alert("请选择机构！");
                    return false;
                }
            } else if (index == 2) {
                var rows = $('#postTbl').datagrid('getSelections');
                if (rows.length == 0) {
                    $.message.alert("请选择岗位！");
                    return false;
                }
            }
            if (rows_sysService.length == 0) {
                $.message.alert("请选择权限集名称！");
                return false;
            }
            var dataPermMrgObjData = $DataAuth.getDataPermMrgObjData();
            var data = {
                premTypeVal: premTypeVal,
                rows_sysService: rows_sysService,
                dataPermMrgObjData: dataPermMrgObjData
            };
            $("#save_button").linkbutton("disable");
            $DataAuth.mask = $DataAuth.createSyncMask("正在保存中,请耐心等待...");
            
            if (index == 0) {
                $DataAuth.saveOperDataPerm(data);
            } else if (index == 1) {
                $DataAuth.saveOrgDataPerm(data);
            } else if (index == 2) {
                $DataAuth.savePostDataPerm(data);
            }
        },
        createSyncMask: function(msg, parent) {
            parent = parent || $(document).find("body");
            var pw = $(parent).outerWidth(), ph = $(parent).outerHeight(),
                mask = $("<div class='sync-mask'></div>").css({width:pw, height:ph}),
                content = $("<div class='content'><div style='float: left'><img src='../../kui-base/themes/default/images/loading.gif' style='margin-top: 4px;'/></div><span>" + msg + "</span></div>");
            mask.append(content).appendTo(parent);
            content.css("margin-left", (pw - content.outerWidth()) / 2 + "px");
            content.css("margin-top", (ph - content.outerHeight()) / 2 + "px");
            return mask;
        }
    };
    window.$DataAuth = new DataAuth();
})();

window.$ready = function () {
    using(["datagrid", "tree", "tabs","layout"], function () {
        $DataAuth.init();
    });
};
$(window).resize(function () {
    $(".kui-layout").layout("resize");
    if($("#oper")[0].style.display!="none"){
        $("#operTbl").datagrid("resize");
    }else if($("#org")[0].style.display!="none"){
        $("#orgTbl").datagrid("resize");
    }else if($("#post")[0].style.display!="none"){
        $("#postTbl").datagrid("resize");
    }else if($("#role")[0].style.display!="none"){
        $("#roleTbl").datagrid("resize");
    }else{
        $("#operTbl").datagrid("resize");
    }
    $("#sysServiceTbl").datagrid("resize");
    $("#dTabs").tabs("resize");
});