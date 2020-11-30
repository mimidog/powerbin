/**
 * @author goasin
 */
(function () {
    function DataPermMrgObj() {
    };
    DataPermMrgObj.prototype = {
        constructor: DataPermMrgObj,
        init: function () {
            this.resize();
            this.createGrid();
            this.bindEvent();
        },
        resize: function () {
            var ch = $(window).height();
            $("#dataPermMrgObjTbl").css("height", ch);
        },
        bindEvent: function () {
            $dataPermMrgObj.bindTar($("#FUNC_PARAM"), "格式:USER_CODE:1,USER_NAME:超级用户");
            $dataPermMrgObj.bindTar($("#FUNC_RET_ID"), "格式:USER_CODE:ID号");
            $dataPermMrgObj.bindTar($("#FUNC_RET_NAME"), "格式:USER_NAME:人员名称");
        },
        bindTar: function (target, txt) {
            target.live({
                focus: function (e) {
                    if (this.value == txt)
                        this.value = '';
                    this.style.color = '#000000';
                },
                blur: function (e) {
                    if (this.value == '' || this.value == txt) {
                        $(this).validatebox("validate");
                    } else {
                        this.style.color = '#000000';
                    }
                }
            });
        },
        createGrid: function () {
            $("#dataPermMrgObjTbl").datagrid({
                /*idField : 'CTRL_OBJ_ID',*/
                textField: 'CTRL_OBJ_NAME',
                req: [
                    {
                        service: "P0002251"
                    }
                ],
                queryCols: [
                    {
                        'text': '查询',
                        'icon': 'icon-search',
                        collapsed: true,
                        cols: [
                            {
                                title: '可管理对象名称',
                                field: 'CTRL_OBJ_NAME',
                                width: 300,
                                editor: {
                                    type: 'text',
                                    options: {
                                        validType: 'val[0,64]'
                                    }
                                }
                            },
                            {
                                title: '可管理对象类型',
                                field: 'CTRL_OBJ_TYPE',
                                editor: {
                                    type: 'combobox',
                                    options: {
                                        dict: 'CTRL_OBJ_TYPE',
                                        extItems: [
                                            {'dict_des': '全部', 'dict_val': ''}
                                        ]
                                    }
                                }
                            },
                            {
                                title: '候选数据加载方式',
                                field: 'DATA_LOAD_TYPE',
                                editor: {
                                    type: 'combobox',
                                    options: {
                                        dict: 'DATA_LOAD_TYPE',
                                        extItems: [
                                            {'dict_des': '全部', 'dict_val': ''}
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                ],
                toolbar: [
                    {
                        text: "新增",
                        iconCls: 'icon-add',
                        handler: function () {
                            $dataPermMrgObj.createDialog("新增", 1);
                        }
                    },
                    {
                        text: "修改",
                        iconCls: 'icon-edit',
                        handler: function () {
                            $dataPermMrgObj.createDialog("修改", 2);
                        }
                    },
                    {
                        text: "删除",
                        iconCls: 'icon-remove',
                        handler: $dataPermMrgObj.delData
                    }
                ],
                columns: [
                    [
                        {
                            field: 'CTRL_OBJ_ID',
                            title: '可管理对象代码',
                            sortType: "number",
                            width: 80
                        },
                        {
                            field: 'CTRL_OBJ_NAME',
                            title: '可管理对象名称',
                            width: 200
                        },
                        {
                            field: 'CTRL_OBJ_TYPE',
                            title: '可管理对象类型',
                            width: 150,
                            formatter: function (value, row, index) {
                                return getSysDictOpt('CTRL_OBJ_TYPE', value);
                            }
                        },
                        {
                            field: 'DATA_LOAD_TYPE',
                            title: '候选数据加载方式',
                            width: 150,
                            formatter: function (value, row, index) {
                                return getSysDictOpt('DATA_LOAD_TYPE', value);
                            }
                        },
                        {
                            field: 'INPUT_TYPE',
                            title: '输入类型',
                            width: 150,
                            formatter: function (value, row, index) {
                                var v = getSysDictOpt('DD_INPUT_TYPE', value);
                                return v == "-1" ? "" : v;
                            }
                        },
                        {
                            field: 'DICT_NAME',
                            title: '数据字典',
                            width: 150,
                            formatter: function (value, row, index) {
                                return value == "-1" ? "" : value;
                            }
                        },
                        {
                            field: 'REMARK',
                            title: '备注信息',
                            width: 200,
                            formatter: function (value, row, index) {
                                return value == "-1" ? "" : value;
                            }
                        }
                    ]
                ]
            });
        },
        createDialog: function (t, v) {
            $dataPermMrgObj.dataLoadClear();
            $("#dataPermMrgObjForm").form("reset");
            if (v == 2) {
                var row = $('#dataPermMrgObjTbl').datagrid('getSelections');
                if (row.length == 0) {
                    alert('请选择一条数据！');
                    return false;
                }

                $dataPermMrgObj.updateForm(row);
            }
            var dialog=$("#dataPermMrgObjDialog");
            dialog.dialog({
                width: 700,
                height: 360,
                modal: true,
                title: t,
                buttons: [
                    {
                        text: '保存',
                        iconCls: 'icon-save',
                        handler: function () {
                            if (v == 1) {
                                $dataPermMrgObj.saveData();
                            } else if (v == 2) {
                                $dataPermMrgObj.updateData();
                            }
                        }
                    },
                    {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            dialog.dialog("close");
                        }
                    }
                ]
            });

            dialog.dialog({top: 120, left: 220});
        },
        createCombo: function () {
            $('#DICT_NAME').combogrid({
                panelHeight: 280,
                panelWidth: 370,
                required: true,
                idField: 'DICT_CODE',
                textField: 'DICT_NAME',
                req: [
                    {
                        service: 'P0000011'
                    }
                ],
                queryCols: [
                    {
                        'text': '查询',
                        'icon': 'icon-search',
                        collapsed: true,
                        cols: [
                            {
                                title: '字典名称',
                                field: 'DICT_NAME',
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
                            field: 'DICT_CODE',
                            title: '字典编号',
                            width: 120
                        },
                        {
                            field: 'DICT_NAME',
                            title: '字典名称',
                            width: 150
                        }
                    ]
                ],
                onShowPanel: function () {
                    var $DICT_NAME=$('#DICT_NAME').combogrid("grid");
                    if ($DICT_NAME.length > 0) {
                        if (typeof $('body').find(".datagrid-queryForm form")[1] != "undefined") {
                            $('body').find(".datagrid-queryForm form")[1].reset();
                        }
                        $DICT_NAME.datagrid("unselectAll");
                        $DICT_NAME.datagrid("reload");
                    }
                }
            });
        },
        requestFun: function (req) {
            var dialog = $("#dataPermMrgObjDialog");
            ajaxRequest({
                req: req,
                func: function (data) {
                    $.message.alert("保存成功！");
                    dialog.find(".l-btn").linkbutton("enable");
                    dialog.dialog("close");
                    $("#dataPermMrgObjTbl").datagrid("reload");
                },
                error: function () {
                    $.message.alert("保存失败！");
                    dialog.find(".l-btn").linkbutton("enable");
                }
            });
        },
        saveData: function () {
            $dataPermMrgObj.submitRequestData("save");
        },
        submitRequestData: function (type) {
            var ctrlobjname = $("#CTRL_OBJ_NAME").val();
            var ctrlobjtype = $("#CTRL_OBJ_TYPE").combobox("getValue");
            var dataloadtype = $("#DATA_LOAD_TYPE").combobox("getValue");
            var inputtype = "", treeinputid = "", dictname = "", funcid = "",
                funcparam = "", funcretid = "", funcretname = "";
            var remark = $("#REMARK").val();

            if (dataloadtype == 2) {
                inputtype = $("#INPUT_TYPE").combobox("getValue");
                if (inputtype == "1") {
                    funcid = $("#FUNC_ID").val();
                    funcparam = $("#FUNC_PARAM").val();
                    funcretid = $("#FUNC_RET_ID").val();
                    funcretname = $("#FUNC_RET_NAME").val();

                } else if (inputtype == "2") {
                    treeinputid = $("#TREE_INPUT_ID").combobox("getValue");
                }
                if (!$("#INPUT_TYPE").combobox("isValid")) {
                    return false;
                }
            } else if (dataloadtype == 1) {
                dictname = $("#DICT_NAME").combogrid('getValue');
                if (!$("#DICT_NAME").combogrid("isValid")) {
                    return false;
                }
            }
            if (funcparam == "格式:USER_CODE:1,USER_NAME:超级用户") {
                funcparam = "";
                $("#FUNC_PARAM").val("");
            }
            if (funcretid == "格式:USER_CODE:ID号") {
                funcretid = "";
                $("#FUNC_RET_ID").val("");
            }
            if (funcretname == "格式:USER_NAME:人员名称") {
                funcretname = "";
                $("#FUNC_RET_NAME").val("");
            }
            if (!$('#dataPermMrgObjForm').form('validate')) {
                return false;
            }
            $("#dataPermMrgObjDialog").find(".l-btn").linkbutton("disable");
            if (type == "save") {
                var req = [
                    {
                        service: 'P0002252',
                        CTRL_OBJ_NAME: ctrlobjname,
                        CTRL_OBJ_TYPE: ctrlobjtype,
                        DATA_LOAD_TYPE: dataloadtype,
                        INPUT_TYPE: inputtype,
                        TREE_INPUT_ID: treeinputid,
                        DICT_NAME: dictname,
                        FUNC_ID: funcid,
                        FUNC_PARAM: funcparam,
                        FUNC_RET_ID: funcretid,
                        FUNC_RET_NAME: funcretname,
                        REMARK: remark
                    }
                ];
                $dataPermMrgObj.requestFun(req);
            } else {
                var ctrlobjid = $("#CTRL_OBJ_ID").val();
                var req = [
                    {
                        service: 'P0002253',
                        CTRL_OBJ_NAME: ctrlobjname,
                        CTRL_OBJ_TYPE: ctrlobjtype,
                        DATA_LOAD_TYPE: dataloadtype,
                        INPUT_TYPE: inputtype,
                        TREE_INPUT_ID: treeinputid,
                        DICT_NAME: dictname,
                        FUNC_ID: funcid,
                        FUNC_PARAM: funcparam,
                        FUNC_RET_ID: funcretid,
                        FUNC_RET_NAME: funcretname,
                        REMARK: remark,
                        CTRL_OBJ_ID: ctrlobjid
                    }
                ];
                $dataPermMrgObj.requestFun(req);
            }
        },
        updateData: function () {
            $dataPermMrgObj.submitRequestData("update");
        },
        delData: function () {
            var row = $('#dataPermMrgObjTbl').datagrid('getSelections');
            if (row.length == 0) {
                alert('请选择要删除的数据！');
                return false;
            }
            confirm("提示", "确定删除该数据？", function (isOk) {
                if (isOk) {
                    $(".l-btn").linkbutton("disable");
                    ajaxRequest({
                        req: [
                            {
                                service: 'P0002254',
                                CTRL_OBJ_ID: row[0].CTRL_OBJ_ID
                            }
                        ],
                        func: function (data) {
                            alert("删除成功！");
                            $("#dataPermMrgObjTbl").datagrid("reload");
                            $(".l-btn").linkbutton("enable");
                        },
                        error:function(){
                            alert("删除失败！");
                            $(".l-btn").linkbutton("enable");
                        }
                    });
                }
            });
        },
        updateForm: function (row) {
            var data = row[0];
            var dataLoadType = data.DATA_LOAD_TYPE;
            var inputType = data.INPUT_TYPE;
            $dataPermMrgObj.createDom_1(dataLoadType);
            $dataPermMrgObj.createDom_2(inputType);

            $("#CTRL_OBJ_ID").val(data.CTRL_OBJ_ID);
            $("#CTRL_OBJ_NAME").val(data.CTRL_OBJ_NAME);
            $("#CTRL_OBJ_TYPE").combobox("setValue", data.CTRL_OBJ_TYPE == "-1" ? "" : data.CTRL_OBJ_TYPE);
            $("#DATA_LOAD_TYPE").combobox("setValue", dataLoadType == "-1" ? "" : dataLoadType);
            $("#REMARK").val(data.REMARK);

            if (dataLoadType == "1") {
                $("#DICT_NAME").combogrid('setValue', (data.DICT_NAME == "-1" ? "" : data.DICT_NAME));
            } else {
                $("#INPUT_TYPE").combobox("setValue", data.INPUT_TYPE == "-1" ? "" : data.INPUT_TYPE);
            }

            if (inputType == "1") {
                $("#FUNC_ID").val(data.FUNC_ID == "-1" ? "" : data.FUNC_ID);
                if (data.FUNC_PARAM == -1 || typeof data.FUNC_PARAM == "undefined" || data.FUNC_PARAM == "") {
                    $dataPermMrgObj.bindTar($("#FUNC_PARAM"), "格式:USER_CODE:1,USER_NAME:超级用户");
                } else {
                    $("#FUNC_PARAM").val(data.FUNC_PARAM);
                    $("#FUNC_PARAM")[0].style.color = "#000000";
                }

                if (data.FUNC_RET_ID == -1 || typeof data.FUNC_RET_ID == "undefined" || data.FUNC_RET_ID == "") {
                    $dataPermMrgObj.bindTar($("#FUNC_RET_ID"), "格式:USER_CODE:ID号");
                } else {
                    $("#FUNC_RET_ID").val(data.FUNC_RET_ID);
                    $("#FUNC_RET_ID")[0].style.color = "#000000";
                }

                if (data.FUNC_RET_NAME == -1 || typeof data.FUNC_RET_NAME == "undefined" || data.FUNC_RET_NAME == "") {
                    $dataPermMrgObj.bindTar($("#FUNC_RET_NAME"), "格式:USER_NAME:人员名称");
                } else {
                    $("#FUNC_RET_NAME").val(data.FUNC_RET_NAME);
                    $("#FUNC_RET_NAME")[0].style.color = "#000000";
                }
            } else {
                $("#TREE_INPUT_ID").combobox("setValue", data.TREE_INPUT_ID == "-1" ? "" : data.TREE_INPUT_ID.trim());
            }

        },
        dataLoadClear: function () {
            var inputType = $("#INPUT_TYPE"),
                dictName = $("#DICT_NAME");
            if (dictName.data("combogrid")) {
                dictName.combogrid("destroy");
            }
            if (inputType.data("combobox")) {
                inputType.combobox("destroy");
            }
            var treeInputId = $("#TREE_INPUT_ID");
            if (treeInputId.data("combobox")) {
                treeInputId.combobox("destroy");
            }
            $("#t1").children().remove();
            $("#t2").children().remove();
            $("#t3").children().remove();
            $("#t4").children().remove();
            $("#t5").children().remove();
            $("#t6").children().remove();
        },
        inputTypeClear: function () {
            var treeInputId = $("#TREE_INPUT_ID");
            if (treeInputId.data("combobox")) {
                treeInputId.combobox("destroy");
            }
            $("#t3").children().remove();
            $("#t4").children().remove();
            $("#t5").children().remove();
            $("#t6").children().remove();
        },
        createDom_1: function (type) {
            if (type == "1") {
                $("#t1").append("<span>数据字典名称：</span>");
                $("#t2").append('<input id="DICT_NAME"  style="width: 153px;">');
                $.parser.parse($("#t2"));
                $dataPermMrgObj.createCombo();

            } else if (type == "2") {
                $("#t1").append("<span>输入类型：</span>");
                $("#t2").append('<input id="INPUT_TYPE" class="kui-combobox" kui-options="dict:\'DD_INPUT_TYPE\',onSelect:$dataPermMrgObj.isInputType,onClear:$dataPermMrgObj.inputTypeClear,required:true" style="width: 153px;">');
                $.parser.parse($("#t2"));
            }
        },
        createDom_2: function (type) {
            if (type == 1) {
                $("#t3").append('<td style="padding-top: 10px;width: 190px;" align="right">请求号：</td>');
                $("#t3").append('<td style="padding-top: 10px;" colspan="3"><input id="FUNC_ID" class="kui-validatebox" kui-options="validType:\'len[1,32]\',required:true" style="width: 455px;"></td>');
                $.parser.parse($("#t3"));
                $("#t4").append('<td style="padding-top: 10px;width: 190px;" align="right">请求参数：</td>');
                $("#t4").append('<td style="padding-top: 10px;" colspan="3"><input id="FUNC_PARAM" value="格式:USER_CODE:1,USER_NAME:超级用户"  kui-options="validType:\'len[1,32]\',required:true" class="kui-validatebox" style="width: 455px;color:#A9A9A9;"></td>');
                $.parser.parse($("#t4"));
                $("#t5").append('<td style="padding-top: 10px;width: 190px;" align="right">请求返回编号字段名：</td>');
                $("#t5").append('<td style="padding-top: 10px;" colspan="3"><input id="FUNC_RET_ID" value="格式:USER_CODE:ID号" class="kui-validatebox" kui-options="validType:\'len[1,32]\',required:true" style="width: 455px;color:#A9A9A9;"></td>');
                $.parser.parse($("#t5"));
                $("#t6").append('<td style="padding-top: 10px;width: 190px;" align="right">请求返回名称字段名：</td>');
                $("#t6").append('<td style="padding-top: 10px;" colspan="3"><input id="FUNC_RET_NAME" value="格式:USER_NAME:人员名称" kui-options="validType:\'len[1,32]\',required:true" class="kui-validatebox" style="width: 455px;color:#A9A9A9;"></td>');
                $.parser.parse($("#t6"));

            } else if (type == 2) {
                $("#t3").append('<td style="padding-top: 10px; width: 190px;" align="right">树输入扩展标识：</td>');
                $("#t3").append('<td style="padding-top: 10px;" colspan="3"><input id="TREE_INPUT_ID" class="kui-combobox" kui-options="dict:\'TREE_INPUT_ID\',required:true" style="width: 455px;"></td>');
                $.parser.parse($("#t3"));
            }
        },
        isDataLoad: function () {
            var inputType = $("#INPUT_TYPE"),
                dictName = $("#DICT_NAME"),
                type = $("#DATA_LOAD_TYPE").combobox("getValue");
            if (dictName.data("combogrid")) {
                dictName.combogrid("destroy");
            }
            if (inputType.data("combobox")) {
                inputType.combobox("destroy");
            }
            $("#t1").children().remove();
            $("#t2").children().remove();
            $("#t3").children().remove();
            $("#t4").children().remove();
            $("#t5").children().remove();
            $("#t6").children().remove();
            $dataPermMrgObj.createDom_1(type);
        },
        isInputType: function () {
            var type = $("#INPUT_TYPE").combobox("getValue");

            var treeInputId = $("#TREE_INPUT_ID");

            if (treeInputId.data("combobox")) {
                treeInputId.combobox("destroy");
            }
            $("#t3").children().remove();
            $("#t4").children().remove();
            $("#t5").children().remove();
            $("#t6").children().remove();
            $dataPermMrgObj.createDom_2(type);
        }
    };
    window.$dataPermMrgObj = new DataPermMrgObj();
})();

window.$ready = function () {
    using(["datagrid", "combogrid", "dialog"], function () {
        $dataPermMrgObj.init();
    });
};