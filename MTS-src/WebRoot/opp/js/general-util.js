//可维护标识处理函数
function maintainControl(index, data) {
	var toolBtns = $(this).datagrid('getToolbarButton');
	$(toolBtns).linkbutton('enable');
	switch (data['MAINTAIN_FLAG']) {
		case '1':
			$(toolBtns[2]).linkbutton('disable');
			break;
		case '2':
			$(toolBtns[1]).linkbutton('disable');
			break;
		case '3':
			$(toolBtns[1]).linkbutton('disable');
			$(toolBtns[2]).linkbutton('disable');
			break;
		default:
			break;
	}
}

//可维护标识处理函数
function childrenControl(index, data) {
	var toolBtns = $(this).datagrid('getToolbarButton');
	$(toolBtns).linkbutton('enable');
	switch (data['MAINTAIN_FLAG']) {
		case '1':
			$(toolBtns[2]).linkbutton('disable');
			break;
		case '2':
			$(toolBtns[1]).linkbutton('disable');
			break;
		case '3':
			$(toolBtns[1]).linkbutton('disable');
			$(toolBtns[2]).linkbutton('disable');
			break;
		default:
			break;
	}
}


//任务状态处理函数
function taskStateControl(index, data) {
	var $panel = $(this).datagrid('getPanel');
	ajaxRequest({
		req: [{
			service: 'P0005001',
			BPM_OP: 'getTaskStatus',
			userId: g_user.userId,
			taskId: data.taskId
		}],
		func: function(d) {
			var obj = d[0].BPM_DATA[0];
			var taskState = obj.taskState;
			var isUnclaim = obj.isUnclaim;
			var isDelegate = obj.isDelegate;
			var isRollback = obj.isRollback;
			var multiTaskType = obj.multiTaskType;
			var addTaskState = obj.addTaskState;
			var subTaskState = obj.subTaskState;
			$("#multiTaskTypeVal").val(multiTaskType);
			if (taskState == 2 && g_user.userId != obj.assignee) {
				$('a.l-btn:gt(0):lt(7)', $panel).linkbutton('disable');
				return false;
			}
			$('a.l-btn:gt(0):lt(7)', $panel).linkbutton('enable');
			if (taskState == 1) {
				$('a.l-btn:eq(2)', $panel).linkbutton('disable');
				$('a.l-btn:eq(3)', $panel).linkbutton('disable');
				$('a.l-btn:eq(4)', $panel).linkbutton('disable');
				$('a.l-btn:eq(5)', $panel).linkbutton('disable');
				$('a.l-btn:eq(6)', $panel).linkbutton('disable');
				$('a.l-btn:eq(7)', $panel).linkbutton('disable');
				return false;
			} else if (taskState == 2) {
				$('a.l-btn:eq(1)', $panel).linkbutton('disable');
				$('a.l-btn:eq(3)', $panel).linkbutton('enable');
				//				$('a.l-btn:eq(4)', $panel).linkbutton('enable');
			}

			if (isUnclaim == 1) {
				$('a.l-btn:eq(2)', $panel).linkbutton('enable');
			} else {
				$('a.l-btn:eq(2)', $panel).linkbutton('disable');
			}

			/*if(isDelegate == 1){
				$('a.l-btn:eq(4)', $panel).linkbutton('enable');
			}else{
				$('a.l-btn:eq(4)', $panel).linkbutton('disable');
			}*/

			if (isRollback == 1) {
				$('a.l-btn:eq(5)', $panel).linkbutton('enable');
			} else {
				$('a.l-btn:eq(5)', $panel).linkbutton('disable');
			}

			if (multiTaskType == 0) {
				$('a.l-btn:eq(6)', $panel).linkbutton('disable');
				$('a.l-btn:eq(7)', $panel).linkbutton('disable');
			} else {
				if (addTaskState == 1) {
					$('a.l-btn:eq(6)', $panel).linkbutton('enable');
				} else {
					$('a.l-btn:eq(6)', $panel).linkbutton('disable');
				}
				if (subTaskState == 1) {
					$('a.l-btn:eq(7)', $panel).linkbutton('enable');
				} else {
					$('a.l-btn:eq(7)', $panel).linkbutton('disable');
				}
			}
		}
	});
}


function sorter(a, b) {
	a = a.split('/');
	b = b.split('/');
	if (a[2] == b[2]) {
		if (a[0] == b[0]) {
			return (a[1] > b[1] ? 1 : -1);
		} else {
			return (a[0] > b[0] ? 1 : -1);
		}
	} else {
		return (a[2] > b[2] ? 1 : -1);
	}
}

function genFixNumPrecision(value, precision) {
	try {
		if (value != '' && precision != '') {
			value = value.replace(/(^\s*)|(\s*$)/g, "");
			return parseFloat(value).toFixed(precision);
		} else {
			return "";
		}
	} catch (e) {
		return "";
	}
}

//转义用户名
var hasCheckflag = false;
var rs;

function convertUserName() {
	if (!hasCheckflag) {
		ajaxRequest({
			async: false,
			req: [{
				service: 'P0001001',
				USER_STA: '1'
			}],
			func: function(data) {
				rs = data[0];
				hasCheckflag = true;
			}
		});
	}
	if (rs != undefined && rs.length > 0) {
		var value = arguments[0];
		if (value != '') {
			value = value.replace(/(^\s*)|(\s*$)/g, "");
			var userName = value;
			for (var i = 0; i < rs.length; i++) {
				if (value == rs[i].USER_CODE) {
					userName = rs[i].USER_NAME;
					break;
				}
			}
			return userName;
		} else {
			return value;
		}
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



/*
 * 机构字典项管理
 *
 * */
function addRowOrgDicItems(e) {

	var mainId = $.general().main;
	var selectRow = $("#" + mainId).datagrid("getSelected") || {};
	var mainTitle = $("#" + mainId + "_panel").parent().find(".panel-title").text();
	if (!$.isEmptyObject(selectRow)) {
		var org_code = $(".datagrid-queryForm").find("input[comboname=ORG_CODE]").combotree("getValue");
		selectRow = $.extend(selectRow, {
			ORG_CODE: org_code
		});
		var opts = $.data($("#" + mainId)[0], "datagrid").options;
		if (opts.rowedit) {
			var inserted = $.data(e.data.target[0], "datagrid").insertedRows;
			if (inserted.length == 0)
				$(e.data.target).datagrid('appendRow', selectRow);
		} else {
			addOrgDictItems(e, selectRow, "");
		}
	} else {
		alert("请选择" + mainTitle + "的一条记录！");
	}
}

function addOrgDictItems(e, record, onInitSuccess) {
	var size = null;
	if (e.data.w != null && e.data.h != null) {
		if (parseInt(e.data.w) == e.data.w && parseInt(e.data.h) == e.data.h) {
			size = {
				w: e.data.w + "px",
				h: e.data.h + "px"
			};
		}
	}
	var $dialog = $.builder.buildCommonDialog.createCommonDialog(e.data.target, size, $.submitAction.add, e.data.title || $.builder.buildCommonDialog.getDialogTitle(e.data.target, "add"), "icon-add");
	if (e.data.options && e.data.options.onDialogPopup) {
		eval(e.data.options.onDialogPopup)($dialog);
	}
	var req = e.data.req;
	if (e.data.req && typeof e.data.req == "string") req = eval("(" + e.data.req + ")");
	if (req && !req[0].service) {
		req[0]["service"] = "P9999999";
	}
	var columns = e.data.target.datagrid("getOriginalColumns");
	var config = {
		common: true,
		render: "form",
		colNumbers: 2,
		req: req,
		col: columns,
		onInitSuccess: onInitSuccess || $.noop
	};
	if (record) config["record"] = record;
 
	$.parser.director($dialog, {
		config: config
	}); 
}