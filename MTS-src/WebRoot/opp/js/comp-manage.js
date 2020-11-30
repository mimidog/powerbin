(function($, window, undefined) {
var getDynInputs = function() {
    var srcTarget = $(this),
        form = srcTarget.closest(".kui-form");

    return {
        VAL_TYPE: $("input[comboname='VAL_TYPE']", form),
        VAL_PARAM: $("input[name='VAL_PARAM']", form),
        VAL_FIELD: $("input[name='VAL_FIELD']", form),
        TEXT_FIELD: $("input[name='TEXT_FIELD']", form)

    }
},

showFormGrp = function() {
    $(this).closest(".form-group-inline").show();
},

hideFormGrp = function() {
    $(this).closest(".form-group-inline").hide();
},

clearVal = function() {
    var input = $(this);
    if(input.data("combobox")) {
        input.combobox("setValues", []);
    } else if(input.data("textinput")) {
        input.val("");
    }
};

window.g_comp = {
    inputTypeSelect: function(obj, isClearVal) {
        var iptType = obj.dict_val,
            inputs = getDynInputs.call(this);

        $.each(inputs, function() {
            ("1" === iptType ? hideFormGrp : showFormGrp).call(this);
            if(false !== isClearVal) {
                clearVal.call(this);
            }
        });
    },

    inputTypeClear: function() {
        var inputs = getDynInputs.call(this);
        $.each(inputs, function() {
            showFormGrp.call(this);
            clearVal.call(this);
        });
    },

    compParamFormInitSuccess: function() {
        var form = $(this),
            inputType = $("input[comboname='INPUT_TYPE']", form),
            valType = $("input[comboname='VAL_TYPE']", form);
        g_comp.inputTypeSelect.call(inputType, {dict_val: inputType.combobox("getValue")}, false);
        g_comp.valTypeSelect.call(valType, {dict_val: valType.combobox("getValue")}, false);
    },

    valTypeSelect: function(obj, isClearVal) {
        var valType = obj.dict_val,
            inputs = getDynInputs.call(this);

        if(!valType) {
            return;
        }
        $.each(inputs, function(name) {
            if("VAL_TYPE" === name || "VAL_PARAM" === name) {
                return true;
            }
            ("1" === valType ? hideFormGrp : showFormGrp).call(this);
            if(false !== isClearVal) {
                clearVal.call(this);
            }
        });
    },

    valTypeClear: function(obj) {
        var inputs = getDynInputs.call(this);
        $.each(inputs, function(name) {
            if("VAL_TYPE" === name || "VAL_PARAM" === name) {
                return true;
            }
            showFormGrp.call(this);
            clearVal.call(this);
        });
    },

    compModifyClick: function() {
        var compMrgTable = $("#UPT_compMrg"),
            records = compMrgTable.datagrid("getSelections"),
            dialog;
        if(!records.length) {
            alert('提示', "请选择一条数据！");
            return;
        }

        dialog = $.builder.buildCommonDialog.createCommonDialog(compMrgTable, null, function() {
            var req = [],
                mdfBtn = $(this),
                panel = mdfBtn.closest(".panel-body"),
                form = panel.find(".kui-form"),
                formData;

            if(!form.form("validate")) {
                return;
            }
            formData = form.form("getData");
            if(!$.submitAction.isDataChange(form.data("form").options.originalData, formData)) {
                alert("提示", "数据未发生改变，不需提交！");
                return;
            }

            confirm("提示", "是否需要级联修改配置在菜单中的组件名称？", function(flag) {
                mdfBtn.linkbutton("disable");
                req.push($.extend({
                    service: "P0004133"
                }, formData));

                if(flag) {
                    req.push({
                        service: "P0004136",
                        COMP_ID: formData.COMP_ID,
                        COMP_NAME: formData.COMP_NAME
                    });
                }

                ajaxRequest({
                    req: req,
                    func: function() {
                        alert("修改成功！");
                        dialog.dialog("close");
                        compMrgTable.datagrid("reload");
                    },
                    error: function() {
                        mdfBtn.linkbutton("enable");
                    }
                });
            });
        }, "修改", "icon-edit");

        $.parser.director(dialog, {
            config: {
                common: true,
                render: "form",
                colNumbers: 2,
                col: compMrgTable.datagrid("getOriginalColumns"),
                record: records[0]
            }
        });
    }
};
})(jQuery, window);