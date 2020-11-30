function dataLoad() {
	var $first = $("#" + $.general().main);
	$first.datagrid("unselectAll");
	var $second = $("#" + $.general().second);
	$second.datagrid("loadData", {});
}

function onClickItemTableRow(index, row) {
	//var $first = $("#" + $.general().main);
	//$first.datagrid("selectRow", index);
}

function onClickMainTableRow(index, row) {
	var reqParam = {};
	var mainTableOpts = $(this).data().datagrid.options;
	var mainColumns = mainTableOpts.columns[0];
	for (var i = 0; i < mainColumns.length; i++) {
		if (mainColumns[i].primary_key == "1" && row[mainColumns[i].field] != "") {
			reqParam[mainColumns[i].field] = row[mainColumns[i].field];
		}
	}
	if (mainTableOpts["id"] == "GENP_100500020_SYS_DD") {
		reqParam["INT_ORG"] = mainTableOpts.queryParams.INT_ORG;
	}
	if (mainTableOpts["id"] == "UPM_orgDictionary") {
		reqParam["ORG_CODE"] = mainTableOpts.queryParams.ORG_CODE;
	}

	var $second = $("#" + $.general().second);
	$second.datagrid("loadData", {});
	if (!$.isEmptyObject(reqParam)) {
		var secondOpts = $second.data().datagrid.options;
		var bex = typeof secondOpts.req == "string" ? eval("(" + secondOpts.req + ")") : secondOpts.req;
		secondOpts.req = [$.extend(bex[0], reqParam)];
		$second.datagrid("reload");
	}
	//判断是否系统数据字典table
	if (mainTableOpts["id"] == "GENP_100500010_SYS_DD") {
		setButton(row);
	}
}

function setButton(row) {
	var flags = row["DD_MAINT_FLAGS"];
	var $toolbar = $("#GENP_100500010_SYS_DD_ITEM_panel").find(".datagrid-toolbar");
	if (flags.indexOf("1") < 0) {
		$(".icon-add", $toolbar).closest("a").hide();
	} else {
		$(".icon-add", $toolbar).closest("a").show();
	}
	if (flags.indexOf("2") < 0) {
		$(".icon-edit", $toolbar).closest("a").hide();
	} else {
		$(".icon-edit", $toolbar).closest("a").show();
	}
	if (flags.indexOf("3") < 0) {
		$(".icon-remove", $toolbar).closest("a").hide();
	} else {
		$(".icon-remove", $toolbar).closest("a").show();
	}
}

function addRow(e) {
	var mainId = $.general().main;
	var selectRow = $("#" + mainId).datagrid("getSelected") || {};
	var mainTitle = $("#" + mainId + "_panel").parent().find(".panel-title").text();
	if (!$.isEmptyObject(selectRow)) {
		var opts = $.data($("#" + mainId)[0], "datagrid").options;
		if (opts.rowedit) {
			var inserted = $.data(e.data.target[0], "datagrid").insertedRows;
			if (inserted.length == 0)
				$(e.data.target).datagrid('appendRow', selectRow);
		} else {
			$.builder.buildCommonDialog.add(e, selectRow);
		}
	} else {
		alert("请选择" + mainTitle + "的一条记录！");
	}
}



//有逗号
function returnDictMultTextComma(value, row, index, col) {
	var arr = new Array();
	if (col.editor.options.multiple) {
		if (typeof value == "string") {
			arr = value.split(',');
			return getEdtMutlDictText(arr, col);
		} else {
			return getEdtMutlDictText(arr, col);
		}
	} else {
		return value;
	}
}

//无逗号
function returnDictMultText(value, row, index, col) {
	var arr = new Array();
	if (col.editor.options.multiple) {
		if (typeof value == "string") {
			for (var i = 0; i < value.length; i++) {
				arr.push(value.substring(i, i + 1));
				if (i == value.length - 1) {
					break;
				}
			}
			return getEdtMutlDictText(arr, col);
		} else {
			return getEdtMutlDictText(arr, col);
		}
	} else {
		return value;
	}
}

//构建复选文本串
function getEdtMutlDictText(arr, col) {
	if (arr && arr.length == 0) {
		return ""
	}
	if (arr.length == 1 && arr[0] == "@") {
		return "全部";
	}
	if (!col.editor.options.data || (col.editor.options.data && col.editor.options.data.length == 0)) {
		return ""
	}
	var dictData = col.editor.options.data,
		valueField = col.editor.options.valueField || "dict_val",
		textField = col.editor.options.textField || "dict_des",
		dictText = "";

	for (var i = 0; i < dictData.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (dictData[i][valueField] == arr[j]) {
				dictText += dictData[i][textField] + ',';
			}
		}
	}
	return dictText.substring(0, dictText.length - 1);
}

function timeFormatter(value, row, index, col) {
	if (value && value.indexOf(":") == -1) {
		var sValue = "";
		if (value.length == 6) {
			sValue = value.substring(0, 2) + ":" + value.substring(2, 4) + ":" + value.substring(4, 6);
			row[col.field] = sValue;
			return sValue;
		} else if (value.length == 4) {
			sValue = value.substring(0, 2) + ":" + value.substring(2, 4);
			row[col.field] = sValue;
			return sValue;
		} else if (value.length == 5) { // 增加length=5的情况
			sValue = "0" + value.substring(0, 1) + ":" + value.substring(1, 3) + ":" + value.substring(3, 5);
			row[col.field] = sValue;
			return sValue;
		} else if ("0" == String(value)) {
			return "00:00:00";
		}
	} else {
		return value;
	}
}

function dataSort(data) {
	if (data.length > 0) {
		data.sort(function(a, b) {
			if (a.pid === b.pid) //兼容IE
				return false;
			else
				return (Number(a.pid) > Number(b.pid) ? 1 : -1);
		});
	}
	return data;
}

function onLoadSuccessFilter(data) {
	var opts = $(this).combobox("options");
	opts.onLoadSuccess = function() {};
	var dict = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].dict_val != 0 && data[i].dict_val != 9)
			dict.push(data[i]);
	}
	$(this).combobox("loadData", dict);
}

function centerTimeTradeTypeOnloadSuccess(data) {
	var opts = $(this).combobox("options");
	opts.onLoadSuccess = function() {};
	var dict = [];
	for (var i = 0; i < data.length; i++) {
		//  if(data[i].dict_val!=0&&data[i].dict_val!=9)
		dict.push(data[i]);
	}
	$(this).combobox("loadData", dict);
}

function taCodeFilter(data) {
	for (var i = 0, len = data.length; i < len; i++) {
		if (!data[i].EXT_TA_CODE || data[i].EXT_TA_CODE.indexOf(' ') != -1) {
			data.splice(i, 1);
			i--;
			len--;
		} else if (data[i].INST_ORG_SNAME.indexOf('-') == -1) {
			data[i].INST_ORG_SNAME = $.trim(data[i].EXT_TA_CODE + '-' + data[i].INST_ORG_SNAME);
		}
	}
	data.sort(function(a, b) {
		return a.EXT_TA_CODE < b.EXT_TA_CODE ? -1 : 1;
	});
	return data;
}