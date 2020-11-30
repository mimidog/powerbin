/**
 * reportgrid - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *     panel,resizable,linkbutton,pagination,form,draggable
 *
 */

;
(function ($) {
    var reportgridId = 0;

    $.fn.reportgrid = function (options, context) {
        if (typeof options == "string") {
            var args = [this];
            return $.fn.reportgrid.methods[options].apply(this, args.concat(Array.prototype.slice.call(arguments, 1)));
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "reportgrid");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                opts = $.extend({},
                    $.extend({},
                        $.fn.reportgrid.defaults, {
                            queryParams: {}
                        }), $.fn.reportgrid.parseOptions(this), options);
                $(this).css("width", "").css("height", "").attr('reportgrid', 'reportgrid');
                //create grid container
                var wrapResult = wrapGrid(this, opts.rownumbers);
                if (!opts.columns) {
                    opts.columns = wrapResult.columns;
                }
                if (!opts.frozenColumns) {
                    opts.frozenColumns = wrapResult.frozenColumns;
                }
                $.data(this, "reportgrid", {
                    options: opts,
                    panel: wrapResult.panel,
                    dc: wrapResult.dc,
                    selectedRows: [],
                    data: {
                        total: 0,
                        rows: []
                    },
                    originalRows: [],
                    updatedRows: [],
                    insertedRows: [],
                    deletedRows: []
                });
            }
            state = state || $.data(this, 'reportgrid');
            opts = opts || state.options;
            var hideArray = parseColumns(this); //解析列的参数，用于列拖拽，列隐藏和列锁定
            //create grid content
            hasTotalFlag = false;
            create(this);
            if (!opts.queryCols || opts.queryCols.length == 0) { //有查询框时已在form的初始化完成回调中调用
                if (!opts.required) request(this);
            }
            if (!state) {
                var data = getData(this);
                if (data.total > 0) {
                    loadData(this, data);
                    saveOriginalRows(this);
                }
            }
            setSize(this);
            bindEvents(this);
            if (opts.isMoveColumns) {
                addMoveColumn(this);
            }
            if (opts.isHideColumns && hideArray.length > 0) {
                hideColumns(this, hideArray);
            }
            opts.onInitSuccess.call(this);
        });
    };

    $.fn.reportgrid.methods = {
        options: function (jq) {
            var options = $.data(jq[0], "reportgrid").options;
            var panelOptions = $.data(jq[0], "reportgrid").panel.panel("options");
            var opts = $.extend(options, {
                width: panelOptions.width,
                height: panelOptions.height,
                closed: panelOptions.closed,
                collapsed: panelOptions.collapsed,
                minimized: panelOptions.minimized,
                maximized: panelOptions.maximized
            });
            var pager = jq.reportgrid("getPager");
            if (pager.length) {
                var pagerOptions = pager.pagination("options");
                $.extend(opts, {
                    pageNumber: pagerOptions.pageNumber,
                    pageSize: pagerOptions.pageSize
                });
            }
            return opts;
        },
        getPanel: function (jq) {
            return $.data(jq[0], "reportgrid").panel;
        },
        getPager: function (jq) {
            return $.data(jq[0], "reportgrid").panel.children("div.reportgrid-pager");
        },
        getColumnFields: function (jq, frozen) {
            return getColumnFields(jq[0], frozen);
        },
        getColumnOption: function (jq, field) {
            return getColumnOption(jq[0], field);
        },
        getData: function (jq, row, cell) {
            return getData(jq[0], row, cell);
        },
        resize: function (jq, size) {
            return jq.each(function () {
                setSize(this, size);
            });
        },
        loading: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "reportgrid").options;
                if (opts.pagination) {
                    $(this).reportgrid("getPager").pagination("loading");
                }
                if (opts.loadMsg) {
                    var panel = $(this).reportgrid("getPanel");
                    $("<div class=\"reportgrid-mask\" style=\"display:block\"></div>").appendTo(panel);
                    var msg = $("<div class=\"reportgrid-mask-msg\" style=\"display:block\"></div>").html(opts.loadMsg).appendTo(panel);
                    msg.css("left", (panel.width() - msg.outerWidth()) / 2);
                }
            });
        },
        loaded: function (jq) {
            return jq.each(function () {

                var opts = $.data(this, "reportgrid").options;

                if (opts.pagination) {
                    $(this).reportgrid("getPager").pagination("loaded");
                }
                var panel = $(this).reportgrid("getPanel");
                panel.children("div.reportgrid-mask-msg").remove();
                panel.children("div.reportgrid-mask").remove();
                opts.editing = undefined;
            });
        },
        loadData: function (jq, data, addition) {
            return jq.each(function () {
                loadData(this, data, addition);
            });
        },
        fitColumns: function (jq) {
            return jq.each(function () {
                fitColumns(this);
            });
        },
        fixColumnSize: function (jq, field) {
            return jq.each(function () {
                fixColumnSize(this, field);
            });
        },
        fixRowHeight: function (jq, index) {
            return jq.each(function () {
                fixRowHeight(this, index);
            });
        },
        autoSizeColumn: function (jq, field) {
            return jq.each(function () {
                autoSizeColumn(this, field);
            });
        },
        getRows: function (jq) {
            return $.data(jq[0], "reportgrid").data.rows;
        },
        getRowIndex: function (jq, row) {
            return getRowIndex(jq[0], row);
        },
        getSelected: function (jq) {
            var rows = getSelections(jq[0]);
            return rows.length > 0 ? rows[0] : null;
        },
        getSelections: function (jq) {
            return getSelections(jq[0]);
        },
        clearSelections: function (jq) {
            return jq.each(function () {
                var selectedRows = $.data(this, "reportgrid").selectedRows;
                selectedRows.splice(0, selectedRows.length);
                var state = $.data(this, "reportgrid");
                var dc = state.dc;
                var header = dc.header1.add(dc.header2);
                var $headCheckbox = $("input[type=checkbox]", header);
                unselectAll(this);
                $headCheckbox.attr("checked", false);
            });
        },
        selectAll: function (jq) {
            return jq.each(function () {
                selectAll(this);
            });
        },
        unselectAll: function (jq) {
            return jq.each(function () {
                unselectAll(this);
            });
        },
        reload: function (jq, queryParams) {
            return jq.each(function () {
                request(this, queryParams);
            });
        },
        selectRow: function (jq, index) {
            return jq.each(function () {
                selectRow(this, index);
            });
        },
        selectRecord: function (jq, field) {
            return jq.each(function () {
                selectRecord(this, field);
            });
        },
        unselectRow: function (jq, index) {
            return jq.each(function () {
                unselectRow(this, index);
            });
        },
        checkRow: function (jq, index) {
            return jq.each(function () {
                checkRow(this, index);
            });
        },
        uncheckRow: function (jq, index) {
            return jq.each(function () {
                uncheckRow(this, index);
            });
        },
        refreshRow: function (jq, index) {
            return jq.each(function () {
                var opts = $.data(this, "reportgrid").options;
                opts.view.refreshRow.call(opts.view, this, index);
            });
        },
        updateRow: function (jq, index, row) {
            return jq.each(function () {
                var opts = $.data(this, "reportgrid").options;
                opts.view.refreshRow.call(opts.view, this, index, row);
            });
        },
        appendRow: function (jq, row) {
            return jq.each(function () {
                appendRow(this, row);
            });
        },
        insertRow: function (jq, row) {
            return jq.each(function () {
                insertRow(this, row);
            });
        },
        mergeCells: function (jq, span) {
            return jq.each(function () {
                mergeCells(this, span);
            });
        },
        showColumn: function (jq, field) {
            return jq.each(function () {
                var panel = $(this).reportgrid("getPanel");
                panel.find("td[field=\"" + field + "\"]").show();
                $(this).reportgrid("getColumnOption", field).hidden = false;
                $(this).reportgrid("fitColumns");
            });
        },
        hideColumn: function (jq, field) {
            return jq.each(function () {
                var panel = $(this).reportgrid("getPanel");
                panel.find("td[field=\"" + field + "\"]").hide();
                $(this).reportgrid("getColumnOption", field).hidden = true;
                $(this).reportgrid("fitColumns");
            });
        },
        fileReport: function (jq, param) {
            onFileExport(jq[0], 'pdf', param);
        },
        onFileImport: function (jq, param) {
            onFileImport(jq[0], param);
        },
        clean: function (jq) {
            return jq.each(function () {
                clean(this);
            });
        },
        getOriginalColumns: function (jq, ignoreHidden) {
            return getOriginalColumns(jq[0], ignoreHidden);
        }
    };
    $.fn.reportgrid.parseOptions = function (target) {
        var jq = $(target);
        return $.extend({},
            $.fn.panel.parseOptions(target), $.parser.parseOptions(target, ["url", "toolbar", "idField", "sortName", "sortOrder", "pagePosition", {
                fitColumns: "boolean",
                autoRowHeight: "boolean",
                striped: "boolean",
                nowrap: "boolean"
            },
                {
                    rownumbers: "boolean",
                    subrow: "boolean",
                    singleSelect: "boolean",
                    checkOnSelect: "boolean",
                    selectOnCheck: "boolean"
                },
                {
                    pagination: "boolean",
                    remotePagination: "boolean",
                    pageSize: "number",
                    pageNumber: "number"
                },
                {
                    remoteSort: "boolean",
                    showHeader: "boolean"
                    //showFooter:"boolean"
                },
                {
                    allowMove: "boolean"
                },
                {
                    scrollbarSize: "number"
                }]), {
                pageList: (jq.attr("pageList") ? eval(jq.attr("pageList")) : undefined),
                loadMsg: (jq.attr("loadMsg") != undefined ? jq.attr("loadMsg") : undefined),
                rowStyler: (jq.attr("rowStyler") ? eval(jq.attr("rowStyler")) : undefined)
            });
    };

    var view = {
        render: function (target, body, isFrozen, appendRows) {
            var state = $.data(target, "reportgrid");
            var opts = state.options;
            var rows = appendRows || state.data.rows;
            var groupField = opts.groupField;//分组的字段
            groupRowObj = null;
            groupTotalObj = null;
            totalItems = {};
            var gfield = null;
            if (groupField) {
                groupRowObj = {};
                groupTotalObj = {};
                for (var g = 0; g < rows.length; g++) {
                    var row = rows[g];
                    gfield = rows[g][groupField];
                    if (groupRowObj[gfield] == undefined) {
                        var grow = [];
                        subtotalItems = {};
                        if (opts["subtotalField"]) {
                            var subtotalField = opts["subtotalField"].split(',');
                            for (var t = 0; t < subtotalField.length; t++) {
                                var stf = subtotalField[t];
                                if (subtotalItems[stf] == undefined) {
                                    subtotalItems[stf] = 0;
                                    hasTotalFlag = true;
                                }
                                var newTotalItems = {};
                                if (row[stf] != '') {
                                    newTotalItems[stf] = Number(subtotalItems[stf]) + Number(row[stf]);
                                }
                                subtotalItems = $.extend({}, subtotalItems, newTotalItems);
                            }
                            groupTotalObj[gfield] = subtotalItems;
                        }
                        grow.push(rows[g]);
                        groupRowObj[gfield] = grow;
                    } else {
                        groupRowObj[gfield].push(rows[g]);
                        if (opts["subtotalField"]) {
                            var subtotalField = opts["subtotalField"].split(',');
                            for (var t = 0; t < subtotalField.length; t++) {
                                var stf = subtotalField[t];
                                var newTotalItems = {};
                                if (row[stf] != '') {
                                    newTotalItems[stf] = Number(subtotalItems[stf]) + Number(row[stf]);
                                }
                                subtotalItems = $.extend({}, subtotalItems, newTotalItems);
                            }
                            groupTotalObj[gfield] = subtotalItems;
                        }

                    }
                }
            }
            if (opts["subtotalColspan"]) {
                var subtotalColspan = opts["subtotalColspan"].split(',')[0];
                for (var aa in groupRowObj) {
                    for (var bb in groupTotalObj) {
                        if (bb == aa) {
                            var row = groupRowObj[bb][0];
                            var newRow = $.extend(true, {}, row);
                            for (var cc in row) {
                                if (cc == subtotalColspan) {
                                    newRow[cc] = '小计';
                                } else {
                                    newRow[cc] = '';
                                }
                            }
                            $.extend(newRow, groupTotalObj[bb]);
                            groupRowObj[aa].push(newRow);
                        }
                    }
                }
            }
            var fields = $(target).reportgrid("getColumnFields", isFrozen);

            if (isFrozen) {
                if (!(opts.rownumbers || opts.subrow || (opts.frozenColumns && opts.frozenColumns.length))) {
                    return;
                }
            }
            var table = [];
            if (appendRows) {
                if (groupRowObj != null) {
                    for (var gr in groupRowObj) {
                        rows = groupRowObj[gr];
                        hasRowspanFieldTd = "";
                        hasRowspanFieldVal = "";
                        hasGropRow = false;
                        var total = parseInt(state.data.total);
                        var baseNum = total - rows.length;
                        for (var i = 0; i < rows.length; i++) {
                            var cls = (i % 2 && opts.striped) ? "class=\"reportgrid-row reportgrid-row-alt\"" : "class=\"reportgrid-row\"";
                            var rowStyle = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
                            var style = rowStyle ? "style=\"" + rowStyle + "\"" : "";
                            var rowId = state.rowIdPrefix + "-" + (isFrozen ? 1 : 2) + "-" + i;
                           if (opts.groupField) {
                                for (var sub in rows[i]) {
                                    if (rows[i][sub] == "小计") {
                                        style = "style=\"background-color:#fcf8e3\""
                                    }
                                }
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"undefined\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, undefined, rows[i]));
                                table.push("</tr>");
                            }
                        }
                    }

                }else{
                    var total = parseInt(state.data.total);
                    var baseNum = total - rows.length;
                    for (var i = 0; i < rows.length; i++) {
                        var cls = (i % 2 && opts.striped) ? "class=\"reportgrid-row reportgrid-row-alt\"" : "class=\"reportgrid-row\"";
                        var rowStyle = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
                        var style = rowStyle ? "style=\"" + rowStyle + "\"" : "";
                        var rowId = state.rowIdPrefix + "-" + (isFrozen ? 1 : 2) + "-" + i;
                        rowspanNums = rows[i].length;
                        if (rowspanNums != undefined) {
                            if (i % rowspanNums == 0) {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                                table.push("</tr>");
                            } else {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, i, {}));
                                table.push("</tr>");
                            }
                        } else if (opts.rowColNums) {
                            var groups = parseInt(Number(fields.length) / Number(opts.rowColNums));
                            if (Number(fields.length) % Number(opts.rowColNums) != 0) {
                                groups++;
                            }
                            if (fields.length != 0) {
                                var gg = [];
                                for (var g = 0; g < groups; g++) {
                                    var field = [];
                                    for (var r = 0; r < opts.rowColNums; r++) {
                                        if (fields[opts.rowColNums * g + r] != undefined) {
                                            field.push(fields[opts.rowColNums * g + r]);
                                        } else {
                                            field.push(" ");
                                        }
                                    }
                                    gg.push(field);
                                }
                            }
                            for (var j = 0; j < groups; j++) {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + 2 * j + "\" style=\"background-color: rgba(151, 160, 233, 0.43)\"  class=\"reportgrid-header reportgrid-header-row\"" + style + ">");
                                table.push(this.renderRow.call(this, target, gg[j], isFrozen, 2 * j, rows[i]));
                                table.push("</tr>");
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + (2 * j + 1) + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, gg[j], isFrozen, (2 * j + 1), rows[i]));
                                table.push("</tr>");
                            }
                        } else {
                            table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                            table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                            table.push("</tr>");
                        }
                    }
                }
                $(body).find('tbody').append(table.join(""));
            } else {
                table.push("<table class=\"reportgrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
                if (groupRowObj != null) {
                    for (var gr in groupRowObj) {
                        rows = groupRowObj[gr];
                        hasRowspanFieldTd = "";
                        hasRowspanFieldVal = "";
                        hasGropRow = false;
                        for (var i = 0; i < rows.length; i++) {
                            var cls = (i % 2 && opts.striped) ? "class=\"reportgrid-row reportgrid-row-alt\"" : "class=\"reportgrid-row\"";
                            var rowStyle = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
                            var style = rowStyle ? "style=\"" + rowStyle + "\"" : "";
                            var rowId = state.rowIdPrefix + "-" + (isFrozen ? 1 : 2) + "-" + i;
                            rowspanNums = rows[i].length;//决定要跨多少行
                            if (rowspanNums != undefined) {
                                if (i % rowspanNums == 0) {
                                    table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                    table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                                    table.push("</tr>");
                                } else {
                                    table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                    table.push(this.renderRow.call(this, target, fields, isFrozen, i, {}));
                                    table.push("</tr>");
                                }
                            } else if (opts.rowColNums) {
                                var groups = parseInt(Number(fields.length) / Number(opts.rowColNums));
                                if (Number(fields.length) % Number(opts.rowColNums) != 0) {
                                    groups++;
                                }
                                if (fields.length != 0) {
                                    var gg = [];
                                    for (var g = 0; g < groups; g++) {
                                        var field = [];
                                        for (var r = 0; r < opts.rowColNums; r++) {
                                            if (fields[opts.rowColNums * g + r] != undefined) {
                                                field.push(fields[opts.rowColNums * g + r]);
                                            } else {
                                                field.push(" ");
                                            }
                                        }
                                        gg.push(field);
                                    }
                                }
                                for (var j = 0; j < groups; j++) {
                                    table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + 2 * j + "\" style=\"background-color: rgba(151, 160, 233, 0.43)\"  class=\"reportgrid-header reportgrid-header-row\"" + style + ">");
                                    table.push(this.renderRow.call(this, target, gg[j], isFrozen, 2 * j, rows[i]));
                                    table.push("</tr>");
                                    table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + (2 * j + 1) + "\" " + cls + " " + style + ">");
                                    table.push(this.renderRow.call(this, target, gg[j], isFrozen, (2 * j + 1), rows[i]));
                                    table.push("</tr>");
                                }
                            } else if (opts.groupField) {
                                for (var sub in rows[i]) {
                                    if (rows[i][sub] == "小计") {
                                        style = "style=\"background-color:#fcf8e3\""
                                    }
                                }
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"undefined\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, undefined, rows[i]));
                                table.push("</tr>");
                            } else {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                                table.push("</tr>");
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < rows.length; i++) {
                        var cls = (i % 2 && opts.striped) ? "class=\"reportgrid-row reportgrid-row-alt\"" : "class=\"reportgrid-row\"";
                        var rowStyle = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
                        var style = rowStyle ? "style=\"" + rowStyle + "\"" : "";
                        var rowId = state.rowIdPrefix + "-" + (isFrozen ? 1 : 2) + "-" + i;
                        rowspanNums = rows[i].length;//决定要跨多少行
                        if (rowspanNums != undefined) {
                            if (i % rowspanNums == 0) {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                                table.push("</tr>");
                            } else {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, fields, isFrozen, i, {}));
                                table.push("</tr>");
                            }
                        } else if (opts.rowColNums) {
                            var groups = parseInt(Number(fields.length) / Number(opts.rowColNums));
                            if (Number(fields.length) % Number(opts.rowColNums) != 0) {
                                groups++;
                            }
                            if (fields.length != 0) {
                                var gg = [];
                                for (var g = 0; g < groups; g++) {
                                    var field = [];
                                    for (var r = 0; r < opts.rowColNums; r++) {
                                        if (fields[opts.rowColNums * g + r] != undefined) {
                                            field.push(fields[opts.rowColNums * g + r]);
                                        } else {
                                            field.push(" ");
                                        }
                                    }
                                    gg.push(field);
                                }
                            }
                            for (var j = 0; j < groups; j++) {
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + 2 * j + "\" style=\"background-color: rgba(151, 160, 233, 0.43)\"  class=\"reportgrid-header reportgrid-header-row\"" + style + ">");
                                table.push(this.renderRow.call(this, target, gg[j], isFrozen, 2 * j, rows[i]));
                                table.push("</tr>");
                                table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + (2 * j + 1) + "\" " + cls + " " + style + ">");
                                table.push(this.renderRow.call(this, target, gg[j], isFrozen, (2 * j + 1), rows[i]));
                                table.push("</tr>");
                            }
                        } else {
                            table.push("<tr id=\"" + rowId + "\" reportgrid-row-index=\"" + i + "\" " + cls + " " + style + ">");
                            table.push(this.renderRow.call(this, target, fields, isFrozen, i, rows[i]));
                            table.push("</tr>");
                        }
                    }
                }
                table.push("</tbody></table>");
                $(body)[0].innerHTML = table.join("");
            }
        },
        renderFooter: function (target, footer, frozen) {
            var opts = $.data(target, "reportgrid").options;
            var rows = $.data(target, "reportgrid").footer || [];
            var fields = $(target).reportgrid("getColumnFields", frozen);
            var footerHtml = ["<table class=\"reportgrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];

            for (var i = 0; i < rows.length; i++) {
                footerHtml.push("<tr class=\"reportgrid-row\" reportgrid-row-index=\"" + i + "\">");
                footerHtml.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
                footerHtml.push("</tr>");
            }
            footerHtml.push("</tbody></table>");
            $(footer).html(footerHtml.join(""));
        },
        renderRow: function (target, fields, frozen, index, row) {
            var opts = $.data(target, "reportgrid").options;
            var groupField = opts.groupField;//分组的字段
            var rowspanFields = opts.rowspanFields;
            var total=$.data(target, "reportgrid").data.total;
            var rowHtml = [];
            if (frozen && (opts.rownumbers || opts.subrow)) {
                var rowNumber = index + 1;
                if (opts.pagination) {
                    rowNumber += (opts.pageNumber - 1) * opts.pageSize;
                }
                opts.rownumbers ? rowHtml.push("<td class=\"reportgrid-td-rownumber\"><div class=\"reportgrid-cell-rownumber\">" + rowNumber + "</div></td>") : rowHtml.push("<td class=\"reportgrid-td-subrow\"><div class=\"reportgrid-cell-subrow\"><span class=\"reportgrid-row-expander reportgrid-row-expand\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer;\"></span></div></td>");
            }
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                row[field] = gridDataValueReplace(row[field]) || '';
                var col = $(target).reportgrid("getColumnOption", field);
                if ((col && col.type != "notice") || col == null) {
                    if (col == null) {
                        rowHtml.push("<td title='" + row[field] + "' field=\"" + field + "\">");
                    } else {
                        var styler = col.styler ? (col.styler(row[field], row, index) || "") : "";
                        var colStyle = col.hidden ? "style=\"display:none;" + styler + "\"" : ((col.listHidden || col.dataHidden) ? "style=\"display:none;" + styler + "\"" : (styler ? "style=\"" + styler + "\"" : ""));
                        if (col.formatter) {
                            var formatter = null;
                            if (typeof col.formatter == "string") eval("formatter=" + col.formatter);
                            else formatter = col.formatter;
                            var val = formatter(row[field], row, index, col);
                            if (val && val.indexOf("<") > -1) {
                                rowHtml.push("<td title='" + (val.indexOf("<") > -1 ? $(val).text() : val) + "' field=\"" + field + "\" " + colStyle + ">");
                            } else {
                                rowHtml.push("<td title='' field=\"" + field + "\" " + colStyle + ">");
                            }
                        } else if (col.editor && col.editor.options && col.editor.options.data) {
                            col.editor.options.valueField = col.editor.options.valueField || "dict_val";
                            col.editor.options.textField = col.editor.options.textField || "dict_des";
                            rowHtml.push("<td title='" + getEdtDictText(col, row[field]) + "' field=\"" + field + "\" " + colStyle + ">");
                        } else if (col.editor && col.editor.options && col.editor.options.dict) {
                            col.editor.options.valueField = "dict_val";
                            col.editor.options.textField = "dict_des";
                            rowHtml.push("<td title='" + getEdtDictText(col, row[field]) + "' field=\"" + field + "\" " + colStyle + ">");
                        } else if (col.isTotal&&total!="0") {//如果是合计列，就把该字段的数据缓存起来，等添加合计行的时候作为数据写入
                            if (!hasTotalFlag) {
                                totalItems = {};
                            }
                            if (totalItems[field] == undefined) {
                                totalItems[field] = 0;
                                hasTotalFlag = true;
                            }
                            var newTotalItems = {};
                            if (row[field] != '') {
                                newTotalItems[field] = Number(totalItems[field]) + Number(row[field]);
                            }
                            totalItems = $.extend({}, totalItems, newTotalItems);
                            rowHtml.push("<td title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                        } else if (col.rowItems) {
                            rowHtml.push("<td   title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                        } else if (col.rowItems != undefined && row[field] == "") {
                            rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" style=\"display:none\">");
                        } else if (opts.rowGroup && (index % 2 == 0)) {
                            rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" class='reportgrid-cell'>");
                        } else if (row[field] == "合计") {
                            if (opts.totalColspan != undefined) {
                                var totalColspan = opts.totalColspan.split(',').length;
                                rowHtml.push("<td  colspan=\"" + totalColspan + "\" title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                                i = i + totalColspan - 1;
                            } else {
                                if (col.rowItems != undefined) {
                                    rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                                    i = i + 1
                                } else {
                                    rowHtml.push("<td   title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                                }
                            }
                        } else if (row[field] == "小计") {
                            var subtotalColspan = opts.subtotalColspan.split(',').length;
                            rowHtml.push("<td  colspan=\"" + subtotalColspan + "\" title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                            i = i + subtotalColspan - 1;
                        } else if (groupField == field) {
                            if (!hasGropRow) {
                                var f = row[groupField];
                                if (groupRowObj[f] != undefined) {
                                    rowHtml.push("<td  rowspan=\"" + groupRowObj[f].length + "\" title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                                }
                            } else {
                                if (row[groupField] == '') {
                                    rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" style=\"display:none\">");
                                } else if (row[groupField] != '') {
                                    rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" style=\"display:none\">");
                                }
                            }
                        } else if (rowspanFields&&rowspanFields.indexOf(field) != -1) {
                            var f = row[groupField];
                            if (hasRowspanFieldTd.indexOf(field) == -1) {
                                rowHtml.push("<td  rowspan=\"" + groupRowObj[f].length + "\" title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                                hasRowspanFieldTd = hasRowspanFieldTd + field + ",";
                            } else {
                                rowHtml.push("<td  title='" + row[field] + "' field=\"" + field + "\" style=\"display:none\">");
                            }
                        } else {
                            rowHtml.push("<td title='" + row[field] + "' field=\"" + field + "\" " + colStyle + ">");
                        }

                        var style = "";
                        if (col.checkbox) {
                            style = "";
                        } else {
                            if (opts.rowGroup) {
                                style += "text-align:" + (col.align || "left") + ";width:" + col.width + "px;";
                            } else {
                                style += "text-align:" + (col.align || "left") + ";width:" + col.width + ";";
                            }
                            if (!opts.nowrap) {
                                style += "white-space:normal;height:auto;";
                            } else {
                                if (opts.autoRowHeight) {
                                    style += "height:auto;";
                                }
                            }
                        }
                        if (row[field] == "小计") {
                            rowHtml.push("<div style=\"" + style + " color:blue\" ");
                        } else if (row[field] == "合计") {
                            rowHtml.push("<div style=\"" + style + " color:green\" ");
                        } else {
                            rowHtml.push("<div style=\"" + style + "\" ");
                        }
                        if (col.checkbox) {
                            rowHtml.push("class=\"reportgrid-cell-check ");
                        } else if (row[field] == "小计") {
                            rowHtml.push("class=\"reportgrid-cell ");
                        } else if (row[field] == "合计") {
                            rowHtml.push("class=\"reportgrid-cell ");
                        } else {
                            rowHtml.push("class=\"reportgrid-cell " + col.cellClass);
                        }
                        rowHtml.push("\">");
                        if (col.checkbox) {
                            rowHtml.push("<input type=\"checkbox\" name=\"" + field + "\" value=\"" + (row[field] != undefined ? row[field] : "") + "\"/>");
                        } else {
                            if (opts.rowGroup && (index % 2 == 0)) {
                                rowHtml.push(col.title);
                            } else if (col.formatter) {
                                var formatter = null;
                                if (typeof col.formatter == "string") eval("formatter=" + col.formatter);
                                else formatter = col.formatter;
                                rowHtml.push(formatter(row[field], row, index, col));
                            } else if (col.editor && col.editor.options && col.editor.options.data) {
                                col.editor.options.valueField = col.editor.options.valueField || "dict_val";
                                col.editor.options.textField = col.editor.options.textField || "dict_des";
                                rowHtml.push(getEdtDictText(col, row[field]));
                            } else if (col.editor && col.editor.options && col.editor.options.dict) {
                                col.editor.options.valueField = "dict_val";
                                col.editor.options.textField = "dict_des";
                                rowHtml.push(getEdtDictText(col, row[field]));
                            } else if (col.type == "numberbox") {
                                rowHtml.push(kui.formatNumber(row[field]));
                            } else if (col.rowItems) {
                                var rowItemObj = eval("(" + col.rowItems + ")");
                                rowHtml.push(rowItemObj[index]);
                            } else if (groupField == field) {
                                if (!hasGropRow) {
                                    if (row[field] == "合计") {
                                        rowHtml.push("<b>" + row[field] + "</b>");
                                    } else {
                                        rowHtml.push(row[field]);
                                        hasGropRow = true;
                                    }
                                } else {
                                    if (row[field] == '') {
                                        rowHtml.push(row[field]);
                                    } else if (row[field] == "合计") {
                                        rowHtml.push("<b>" + row[field] + "</b>");
                                    }
                                }
                            } else if (row[field] == "小计") {
                                rowHtml.push("<b>" + row[field] + "</b>");
                            } else if (rowspanFields&&rowspanFields.indexOf(field) != -1) {
                                if (hasRowspanFieldVal.indexOf(field) == -1) {
                                    rowHtml.push(row[field]);
                                    hasRowspanFieldVal = hasRowspanFieldVal + field + ",";
                                }
                            } else {
                                rowHtml.push(row[field]);
                            }
                        }
                        rowHtml.push("</div>");
                        rowHtml.push("</td>");
                    }
                }
            }
            return rowHtml.join("");
        },
        refreshRow: function (target, index) {
            var row = {};
            var fields = $(target).reportgrid("getColumnFields", true).concat($(target).reportgrid("getColumnFields", false));
            for (var i = 0; i < fields.length; i++) {
                row[fields[i]] = undefined;
            }
            var rows = $(target).reportgrid("getRows");
            $.extend(row, rows[index]);
            this.updateRow.call(this, target, index, row);
        },
        updateRow: function (target, index, row) {
            var opts = $.data(target, "reportgrid").options;
            var rows = $(target).reportgrid("getRows");
            var tr = opts.finder.getTr(target, index);
            for (var field in row) {
                rows[index][field] = row[field];
                var td = tr.children("td[field=\"" + field + "\"]");
                var cell = td.find("div.reportgrid-cell");
                var col = $(target).reportgrid("getColumnOption", field);
                if (col) {
                    var style = col.styler ? col.styler(rows[index][field], rows[index], index) : "";
                    td.attr("style", style || "");
                    if (col.hidden) {
                        td.hide();
                    }

                    if (col.formatter) {
                        var formatter = null;
                        if (typeof col.formatter == "string") formatter = eval("(" + col.formatter + ")");
                        else formatter = col.formatter;
                        cell.html(formatter(rows[index][field], rows[index], index, col));
                    } else if (col.editor && col.editor.options && col.editor.options.data) {
                        cell.html(getEdtDictText(col, row[field]));
                    } else {
                        typeof rows[index][field] == 'object' && rows[index][field].length > 0 ? cell.html(rows[index][field].val()) : cell.html(rows[index][field]);
                    }
                    var str = cell.html() || "";
                    str = (str == "") ? "" : str.replace(/<[^>]+>/g, "");
                    td.attr("title", str);   	//ray 更新title
                }
            }
            var style = opts.rowStyler ? opts.rowStyler.call(target, index, rows[index]) : "";
            tr.attr("style", style || "");
            $(target).reportgrid("fixRowHeight", index);
        },
        insertRow: function (target, index, row) {
            var obj = $.data(target, "reportgrid");
            var opts = obj.options;
            var dc = obj.dc;
            var data = obj.data;
            if (data.rows == 0) {
                data.rows = [];
            }
            if (index == undefined || index == null) {
                index = data.rows.length;
            }
            if (index > data.rows.length) {
                index = data.rows.length;
            }
            function modifyRowNumber(flag) {
                var num = flag ? 1 : 2;
                for (var i = data.rows.length - 1; i >= index; i--) {
                    var tr = opts.finder.getTr(target, i, "body", num);
                    tr.attr("reportgrid-row-index", i + 1);
                    tr.attr("id", obj.rowIdPrefix + "-" + num + "-" + (i + 1));
                    if (flag && opts.rownumbers) {
                        var num1 = i + 2;
                        if (opts.pagination) {
                            num1 += (opts.pageNumber - 1) * opts.pageSize;
                        }
                        tr.find("div.reportgrid-cell-rownumber").html(num1);
                    }
                }
            };
            modifyRowNumber.call(this, true);
            modifyRowNumber.call(this, false);
            var frozenFields = $(target).reportgrid("getColumnFields", true);
            var fields = $(target).reportgrid("getColumnFields", false);

            var idStr = obj.rowIdPrefix + "-" + 1 + "-" + index;
            hasTotalTr = false;
            for (var rr in row) {
                if (row[rr] == "合计") {
                    var tr1 = "<tr id=\"" + idStr + "\" class=\"reportgrid-row\" style=\"background-color:#FAEBCC\" reportgrid-row-index=\"undefined\">" + this.renderRow.call(this, target, frozenFields, true, index, row) + "</tr>";
                    var tr2 = "<tr id=\"" + idStr + "\" class=\"reportgrid-row\" style=\"background-color:#FAEBCC\" reportgrid-row-index=\"undefined\">" + this.renderRow.call(this, target, fields, false, index, row) + "</tr>";
                    hasTotalTr = true;
                }
            }
            if (!hasTotalTr) {
                var tr1 = "<tr id=\"" + idStr + "\" class=\"reportgrid-row\" reportgrid-row-index=\"" + index + "\">" + this.renderRow.call(this, target, frozenFields, true, index, row) + "</tr>";
                var tr2 = "<tr id=\"" + idStr + "\" class=\"reportgrid-row\" reportgrid-row-index=\"" + index + "\">" + this.renderRow.call(this, target, fields, false, index, row) + "</tr>";
            }
            if (index >= data.rows.length) {
                if (data.rows.length) {
                    opts.finder.getTr(target, "", "last", 1).after(tr1);
                    opts.finder.getTr(target, "", "last", 2).after(tr2);
                } else {
                    dc.body1.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr1 + "</tbody></table>");
                    dc.body2.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr2 + "</tbody></table>");
                }
            } else {
                opts.finder.getTr(target, index + 1, "body", 1).before(tr1);
                opts.finder.getTr(target, index + 1, "body", 2).before(tr2);
            }
            if (!hasTotalTr) {
                data.total += 1;
            }
            data.rows.splice(index, 0, row);
            this.refreshRow.call(this, target, index);
        },
        onBeforeRender: function (target, rows) {
        },
        onAfterRender: function (target) {
        }
    };
    $.fn.reportgrid.defaults = $.extend({},
        $.fn.panel.defaults, {
            frozenColumns: undefined,
            columns: undefined,
            fitColumns: false,
            toolbar: null,
            method: 'post',
            req: [],
            nowrap: true,
            striped: true,
            rownumbers: false,
            subrow: false,
            //子行扩展，通过onExpandRow可以把子行展示成datagrid、form等
            singleSelect: true,
            selectOnCheck: true,
            checkOnSelect: true,
            loadMsg: "Processing, please wait ...",
            pagination: true,
            pagePosition: "bottom",
            pageSize: 10,
            pageNumber: 1,
            sort: true,
            sortName: null,
            sortOrder: "asc",
            remoteSort: false,
            remotePagination: false,
            showHeader: true,
            showRowDetail: false,
            isShowDetail: false,
            showDetailCols: '',
            isMoveColumns: true,
            // 是否添加功能“列拖拽”
            gridMenu: false,
            queryBtnIco: 'icon-search',
            queryBtnTxt: '查询',
            //'restoreDefault,freezeColumns,hideColumns,hideCols,fileExport,printReport', //表格的菜单需要添加的内容
            exportTypes: ['xls', 'dbf', 'pdf', 'csv'],
            // 表格的菜单中如果有导出菜单，需要显示的导出类型有哪些
            importTypes: ['导入'],
            reportTitle: undefined,
            // 导出标题，如果没有设置该项，则会在name、title以及tabs的标题中去依次寻找导出标题，一般情况下不需要设置
            fallParas: [
                { // 采用瀑布式展示数据的参数，以默认参数为例，发送到后台参数添加的两个值为 {PAGE_RECNUM:1,PAGE_RECCNT:100}
                    enable: false,
                    // 是否开户瀑布模式，默认不开启，在view中配置时，将该项设置为true即可开启瀑布模式，其它值为默认
                    recName: 'PAGE_RECNUM',
                    // 从某一条开始读取的参数的名字
                    cntName: 'PAGE_RECCNT',
                    // 每次读取多少条数据的参数的名字
                    recNum: 1,
                    // 从某一条开始读取
                    cntNum: 100,
                    // 每次读取多少条数据
                    backAllBtn: false // 是否有“全部返回”按钮
                }
            ],
            autoColNumber: true,
            // 是否让form自动控制每行的条件个数
            //showFooter:false,
            scrollbarSize: 18,
            allowMove: false,
            editing: undefined,
            view: view,
            rowStyler: function (index, row) {
            },
            loader: function (params, onLoadSuccess, onLoadError) {
                var opts = $(this).reportgrid("options");

                opts.pageNumber = params.page || 1; //ray add
                var that = $(this);
                if (opts.req.length == 0 && !opts.url) {
                    return false;
                }
                ajaxRequest({
                    type: opts.method,
                    url: opts.url,
                    dataType: opts.dataType,
                    req: [params],
                    func: function (data, head) {
                        var retData = {
                            "HEAD": head,
                            "DATA": data
                        };
                        onLoadSuccess(retData);
                    },
                    error: function () {
                        onLoadError.apply(this, arguments);
                        setTimeout(function () {
                                clean(that[0]);
                                that.reportgrid("loaded");
                            },
                            0);
                    }
                });
            },
            beforeFilter: function (data) {
                return data;
            },
            loadFilter: function (data, pageNumber) {
                var dg = $(this);
                var opts = $(this).reportgrid("options");
                var pager = $(this).reportgrid("getPager");
                opts.pageNumber = pageNumber || 1; //ray add

                if (typeof data == "object" && data["HEAD"] && data["DATA"]) {
                    var tdata = [];
                    var trow = "";
                    if (opts.comp_code && opts.comp_code.length > 0) {
                        trow = data["DATA"][0][opts.comp_code].rows;
                        tdata = data["DATA"][0][opts.comp_code].data;
                    } else if ($.isArray(data["DATA"][0])) {
                        trow = data["HEAD"]["DATA_ROWS"];
                        tdata = data["DATA"][0];
                    } else {
                        trow = data["HEAD"]["BPM_ROWS"];
                        tdata = data["DATA"][0]['BPM_DATA'];
                    }
                    data = {
                        total: trow,
                        rows: tdata
                    };

                } else if (typeof data.total == "number" && typeof data.rows.splice == "function") {
                    return data;
                }

                if (opts.remotePagination) {
                    pager.pagination({
                        onSelectPage: function (pageNum, pageSize) {
                            opts.pageNumber = pageNum;
                            opts.pageSize = pageSize;
                            pager.pagination('refresh', {
                                pageNumber: pageNum,
                                pageSize: pageSize
                            });
                            dg.reportgrid('reload', null, true);
                        }
                    });
                }
                if (!opts.remotePagination && !opts.fallParas[0].enable) {
                    pager.pagination({
                        onSelectPage: function (pageNum, pageSize) {
                            opts.pageNumber = pageNum;
                            opts.pageSize = pageSize;
                            pager.pagination('refresh', {
                                pageNumber: pageNum,
                                pageSize: pageSize
                            });
                            dg.reportgrid('reload', null, true);
                            if (!data.originalRows) {
                                data.originalRows = (data.rows);
                            }
                            var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
                            var end = start + parseInt(opts.pageSize);
                            data.rows = (data.originalRows.slice(start, end));
                            dg.reportgrid('loadData', data);
                        },
                        //---------------------------------------------------------------------
                        //传给工具栏的回调函数和构造menu所需要的参数 @author 朱庭乐
                        gridMenu: opts.gridMenu,
                        //将菜单项传递给工具条用于生成相应的菜单 @author 朱庭乐
                        exportTypes: opts.exportTypes,
                        //工具条可以导出的文件类型 @author 朱庭乐
                        importTypes: opts.importTypes,
                        onHideColumns: function () {
                            onHideColumns(dg[0]);
                        },
                        onHideCols: function () {
                            onHideCols(dg[0]);
                        },
                        onFreezeColumns: function () {
                            onFreezeColumns(dg[0]);
                        },
                        onRestoreDefault: function () {
                            onRestoreDefault(dg[0]);
                        },
                        onFileExport: function (type) {
                            onFileExport(dg[0], type);
                        },
                        onFileImport: function () {
                            onFileImport(dg[0]);
                        },
                        fallParas: opts.fallParas,
                        showPageList: opts.pagerShowPageList,
                        showRefresh: opts.pagerShowRefresh,
                        pageNavigate: opts.pagerPageNavigate,
                        isShowDetail: opts.isShowDetail
                        //----------------------------------------------------------------------
                    });
                    if (!data.originalRows) {
                        data.originalRows = (data.rows);
                    }
                    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
                    var end = start + parseInt(opts.pageSize);
                    if (data.originalRows != undefined) {
                        data.rows = (data.originalRows.slice(start, end));
                    } else {
                        data.rows = 0;
                    }

                }
                return data;
            },
            finder: {
                getTr: function (target, index, type, frozen) {
                    type = type || "body";
                    frozen = frozen || 0;
                    var data = $.data(target, "reportgrid");
                    var dc = data.dc;
                    var opts = data.options;
                    if (frozen == 0) {
                        var tr1 = opts.finder.getTr(target, index, type, 1);
                        var tr2 = opts.finder.getTr(target, index, type, 2);
                        return tr1.add(tr2);
                    } else {
                        if (type == "body") {
                            var tr = $("#" + data.rowIdPrefix + "-" + frozen + "-" + index);
                            if (!tr.length) {
                                tr = (frozen == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[reportgrid-row-index=" + index + "]");
                            }
                            return tr;
                        } else {
                            if (type == "footer") {
                                return (frozen == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[reportgrid-row-index=" + index + "]");
                            } else {
                                if (type == "selected") {
                                    return (frozen == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.reportgrid-row-selected");
                                } else {
                                    if (type == "last") {
                                        return (frozen == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr:last[reportgrid-row-index]");
                                    } else {
                                        if (type == "allbody") {
                                            return (frozen == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[reportgrid-row-index]");
                                        } else {
                                            if (type == "allfooter") {
                                                return (frozen == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[reportgrid-row-index]");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                getRow: function (target, index) {
                    return $.data(target, "reportgrid").data.rows[index];
                }
            },
            toolbarHandler: {
            },
            editors: {},
            view: view,
            onBeforeLoad: function () {
            },
            onLoadSuccess: function () {
            },
            onLoadError: function () {
            },
            onClickRow: function (rowIndex, rowData) {
            },
            onDblClickRow: function (rowIndex, rowData) {
            },
            onClickCell: function (rowIndex, colIndex, rowData) {
            },
            onDblClickCell: function (rowIndex, colIndex, rowData) {
            },
            onSortColumn: function (sortName, sortOrder) {
            },
            onResizeColumn: function (field, width) {
            },
            onSelect: function (rowIndex, rowData) {
            },
            onUnselect: function (rowIndex, rowData) {
            },
            onSelectAll: function (rows) {
            },
            onUnselectAll: function (rows) {
            },
            onCheck: function (rowIndex, rowData) {
            },
            onUncheck: function (rowIndex, rowData) {
            },
            onCheckAll: function (rows) {
            },
            onUncheckAll: function (rows) {
            },
            onBeforeEdit: function (rowIndex, row) {
            },
            onBeforeEditCell: function (rowIndex, field, rowData, colData) {
                return true;
            },
            onAfterEdit: function (rowIndex, colIndex, rowData) {
            },
            onDeleteRow: function (rowIndex, rowData) {
            },
            onHeaderContextMenu: function (e, field) {
            },
            onRowContextMenu: function (e, rowIndex, rowData) {
            },
            onInitSuccess: function () {
            },
            onExpandRow: function (rowIndex, rowData) {
            },
            onCollapseRow: function (rowIndex, rowData) {
            }
        });

    function contain(a, o) {
        for (var i = 0,
                 len = a.length; i < len; i++) {
            if (a[i] == o) {
                return i;
            }
        }
        return -1;
    }

    function remove(a, o, id) {
        if (typeof o == "string") {
            for (var i = 0,
                     len = a.length; i < len; i++) {
                if (a[i] && a[i][o] == id) { //ray 添加了a[i]判断
                    a.splice(i, 1);
                    return;
                }
            }
        } else {
            var index = contain(a, o);
            if (index != -1) {
                a.splice(index, 1);
            }
        }
    }

    function setSize(target, size) {
        var opts = $.data(target, "reportgrid").options;
        var panel = $.data(target, "reportgrid").panel;
        if (size) {
            if (size.width) {
                opts.width = size.width;
            }
            if (size.height) {
                opts.height = size.height;
            }
        }
        if (opts.fit == true) {
            var p = panel.panel("panel").parent();
            opts.width = p.width();
            opts.height = p.height();
        }
        panel.panel("resize", {
            width: opts.width,
            height: opts.height
        });
    }

    function resize(target) {
        var opts = $.data(target, "reportgrid").options;
        var dc = $.data(target, "reportgrid").dc;
        var wrap = $.data(target, "reportgrid").panel;
        var wrapWidth = wrap.width();
        var height = wrap.height();
        var view = dc.view;
        var view1 = dc.view1;
        var view2 = dc.view2;
        var header1 = view1.children("div.reportgrid-header");
        var header2 = view2.children("div.reportgrid-header");
        var table1 = header1.find("table");
        var table2 = header2.find("table");
        view.width(wrapWidth - 2);
        var inner = header1.children("div.reportgrid-header-inner").show();
        view1.width(inner.find("table").width());
        if (!opts.showHeader) {
            inner.hide();
        }
        view2.width(wrapWidth - view1.outerWidth());
        view1.children("div.reportgrid-header,div.reportgrid-body,div.reportgrid-footer,div.reportgrid-toolbar").width(view1.width());
        view2.children("div.reportgrid-header,div.reportgrid-body,div.reportgrid-footer,div.reportgrid-toolbar").width(view2.width());
        header1.css("height", "");
        header2.css("height", "");
        table1.css("height", "");
        table2.css("height", "");
        var tableHeight = Math.max(table1.height(), table2.height());
        table1.height(tableHeight);
        table2.height(tableHeight);
        header1.add(header2)._outerHeight(tableHeight);
        var toolbar1 = view1.children("div.reportgrid-toolbar");
        var toolbar2 = view2.children("div.reportgrid-toolbar");
        if (toolbar2.children().length > 0) toolbar1.add(toolbar2)._outerHeight(tableHeight);
        var $footer = view2.children("div.reportgrid-footer");
        if ($footer.find("div.reportgrid-footer-inner").children().length == 0) //IE7兼容
            $footer.height(0);

        if (opts.height != "auto") {
            var bodyHeight = height,
                headerHeight = view2.children("div.reportgrid-header").outerHeight(true),
                footerHeight = view2.children("div.reportgrid-footer").outerHeight(true),
                detailHeight = wrap.children("div.reportgrid-row-detail:visible").outerHeight(true),
            //queryFormHeight = wrap.children("div.reportgrid-queryForm").outerHeight(true); // 去掉该行代码改为下面那行代码，用于解决IE7下queryForm高度计算不正确的BUG。 @author 朱庭乐
                queryFormHeight = wrap.find(">div.reportgrid-queryForm>form>div").outerHeight(true),
                subtitleFormHeight = wrap.find(">div.reportgrid-subtitleForm>form>div").outerHeight(true);

            if (queryFormHeight > 125) {
                wrap.find(">div.reportgrid-queryForm>form>div").outerHeight(125);
                wrap.find(">div.reportgrid-queryForm>form>div").css({"overflow-y": "auto"});
                queryFormHeight = 125;
            }
            if (subtitleFormHeight > 125) {
                wrap.find(">div.reportgrid-subtitleForm>form>div").outerHeight(125);
                wrap.find(">div.reportgrid-subtitleForm>form>div").css({"overflow-y": "auto"});
                subtitleFormHeight = 125;
            }


            var $toolbar = wrap.children("div.reportgrid-toolbar");
            toolbarHeight = $toolbar.outerHeight(true);
            if ($.isNumeric(headerHeight)) bodyHeight -= headerHeight;
            if ($.isNumeric(footerHeight)) bodyHeight -= footerHeight;
            if ($.isNumeric(toolbarHeight) && $toolbar.children().length > 0) bodyHeight -= toolbarHeight;
            if ($.isNumeric(queryFormHeight)) bodyHeight -= queryFormHeight;
            if ($.isNumeric(subtitleFormHeight)) bodyHeight -= subtitleFormHeight;
            if ($.isNumeric(detailHeight)) bodyHeight -= detailHeight;
            wrap.children("div.reportgrid-pager").each(function () {
                if ($.isNumeric($(this).outerHeight(true))) bodyHeight -= $(this).outerHeight(true);
            });

            view1.children("div.reportgrid-body").height(bodyHeight);
            view2.children("div.reportgrid-body").height(bodyHeight);
        }

        view.height(view2.height());
        view2.css("left", view1.outerWidth());

    }

    function fixRowHeight(target, row, autoRowHeight) {
        var rows = $.data(target, "reportgrid").data.rows;
        var opts = $.data(target, "reportgrid").options;
        var dc = $.data(target, "reportgrid").dc;
        if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || autoRowHeight)) {
            if (row != undefined) {
                var tr1 = opts.finder.getTr(target, row, "body", 1);
                var tr2 = opts.finder.getTr(target, row, "body", 2);
                setRowHeight(tr1, tr2);
            } else {
                var tr1 = opts.finder.getTr(target, 0, "allbody", 1);
                var tr2 = opts.finder.getTr(target, 0, "allbody", 2);
                setRowHeight(tr1, tr2);
            }
        }
        resize(target);
        if (opts.height == "auto") {
            var body1Parent = dc.body1.parent();
            var body2 = dc.body2;
            var height = 0;
            var width = 0;
            body2.children().each(function () {
                var c = $(this);
                if (c.is(":visible")) {
                    height += c.outerHeight();
                    if (width < c.outerWidth()) {
                        width = c.outerWidth();
                    }
                }
            });
            if (width > body2.width()) {
                height += 18;
            }
            body1Parent.height(height);
            body2.height(height);
            dc.view.height(dc.view2.height());
        }
        dc.body2.triggerHandler("scroll");
        function setRowHeight(trs1, trs2) {
            for (var i = 0; i < trs2.length; i++) {
                var tr1 = $(trs1[i]);
                var tr2 = $(trs2[i]);
                tr1.css("height", "");
                tr2.css("height", "");
                var height = Math.max(tr1.height(), tr2.height());
                tr1.css("height", height);
                tr2.css("height", height);
            }
        }
    }

    function autoSizeColumn(target, field) {
        var opts = $.data(target, "reportgrid").options;
        var dc = $.data(target, "reportgrid").dc;
        if (field) {
            setSize(field);
            if (opts.fitColumns) {
                resize(target);
                fitColumns(target);
            }
        } else {
            var auto = false;
            var fields = getColumnFields(target, true).concat(getColumnFields(target, false));
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var col = getColumnOption(target, field);
                if (col && col.auto && !col.hidden) {
                    setSize(field);
                    auto = true;
                }
            }
            if (auto && opts.fitColumns) {
                resize(target);
                fitColumns(target);
            }
        }
        function setSize(field) {
            var cell = dc.view.find("div.reportgrid-header td[field=\"" + field + "\"] div.reportgrid-cell");
            cell.css("width", "");
            var col = $(target).reportgrid("getColumnOption", field);
            col.width = undefined;
            col.boxWidth = undefined;
            col.auto = true;
            $(target).reportgrid("fixColumnSize", field);
            var width = Math.max(cell.outerWidth(), getMaxColumnWidth("allbody"), getMaxColumnWidth("allfooter"));
            cell._outerWidth(width);
            col.width = width;
            col.boxWidth = parseInt(cell[0].style.width);
            $(target).reportgrid("fixColumnSize", field);
            opts.onResizeColumn.call(target, field, col.width);
            function getMaxColumnWidth(type) {
                var maxWidth = 0;
                opts.finder.getTr(target, 0, type).find("td[field=\"" + field + "\"] div.reportgrid-cell").each(function () {
                    var outerWidth = $(this).outerWidth();
                    if (maxWidth < outerWidth) {
                        maxWidth = outerWidth;
                    }
                });
                return maxWidth;
            }
        }
    }

    function fixColumnSize(target, field) {
        var opts = $.data(target, "reportgrid").options;
        var dc = $.data(target, "reportgrid").dc;
        var table = dc.view.find("table.reportgrid-btable,table.reportgrid-ftable");
        table.css("table-layout", "fixed");
        if (field) {
            fix(field);
        } else {
            var fields = getColumnFields(target, true).concat(getColumnFields(target, false));
            for (var i = 0; i < fields.length; i++) {
                fix(fields[i]);
            }
        }
        table.css("table-layout", "auto");
        merge(target);
        setTimeout(function () {
                fixRowHeight(target);
                resizeEditor(target);
            },
            0);
        function fix(field) {
            var col = getColumnOption(target, field);
            if (!col || col.checkbox) {
                return;
            }
            var style = dc.view.children("style")[0];
            var sheet = style.styleSheet ? style.styleSheet : (style.sheet || document.styleSheets[document.styleSheets.length - 1]);
            var cssRules = sheet.cssRules || sheet.rules; //IE mozilla
            for (var i = 0,
                     len = cssRules.length; i < len; i++) {
                var rule = cssRules[i];
                if (col.cellSelector && rule.selectorText && rule.selectorText.toLowerCase() == col.cellSelector.toLowerCase()) {
                    //                    rule.style["width"] = col.boxWidth ? (opts.rowEdit ?( col.boxWidth-8) : col.boxWidth) + "px": "auto";
                    rule.style["width"] = col.boxWidth ? col.boxWidth + "px" : "auto";
                    break;
                }
            }
        }
    }

    function merge(target) {
        var dc = $.data(target, "reportgrid").dc;
        dc.body1.add(dc.body2).find("td.reportgrid-td-merged").each(function () {
            var td = $(this);
            var colspan = td.attr("colspan") || 1;
            var width = getColumnOption(target, td.attr("field")).width;
            for (var i = 1; i < colspan; i++) {
                td = td.next();
                width += getColumnOption(target, td.attr("field")).width + 1;
            }
            $(this).children("div.reportgrid-cell")._outerWidth(width);
        });
    }

    function fitColumns(target) {
        var opts = $.data(target, "reportgrid").options;
        var dc = $.data(target, "reportgrid").dc;
        if (!opts.fitColumns) {
            return;
        }
        var header = dc.view2.children("div.reportgrid-header");
        var width = 0;
        var column;
        var fields = getColumnFields(target, false);
        for (var i = 0; i < fields.length; i++) {
            var col = getColumnOption(target, fields[i]);
            if (fixWidth(col)) {
                width += col.width;
                column = col;
            }
        }
        var headerInner = header.children("div.reportgrid-header-inner").show();
        var headerWidth = header.width() - header.find("table").width() - opts.scrollbarSize;
        var rate = headerWidth / width;
        if (!opts.showHeader) {
            headerInner.hide();
        }
        for (var i = 0; i < fields.length; i++) {
            var col = getColumnOption(target, fields[i]);
            if (fixWidth(col)) {
                var colWidth = Math.floor(col.width * rate);
                setWidth(col, colWidth);
                headerWidth -= colWidth;
            }
        }
        if (headerWidth && column) {
            setWidth(column, headerWidth);
        }
        fixColumnSize(target);
        function setWidth(col, width) {
            col.width += width;
            col.boxWidth += width;
            header.find("td[field=\"" + col.field + "\"] div.reportgrid-cell").width(col.boxWidth);
        }

        function fixWidth(col) {
            if (!col.hidden && !col.checkbox && !col.auto) {
                return true;
            }
        }
    }

    function clean(target) {
        $(target).reportgrid("loadData", {});
        var $data = $.data(target, "reportgrid");
        $data.options.editing = undefined;
        $data.updatedRows = [];
        $data.insertedRows = [];
        $data.deletedRows = [];
    }

    function wrapGrid(target, rownumbers) {
        function getColumnOptions() {
            var frozenColumns = [];
            var columns = [];
            $(target).children("thead").each(function () {
                var opt = $.parser.parseOptions(this, [
                    {
                        frozen: "boolean"
                    }
                ]);
                $(this).find("tr").each(function () {
                    var cols = [];
                    $(this).find("th").each(function () {
                        var th = $(this);
                        var col = $.extend({},
                            $.parser.parseOptions(this, ["field", "align", {
                                sortable: "boolean",
                                checkbox: "boolean",
                                resizable: "boolean"
                            },
                                {
                                    rowspan: "number",
                                    colspan: "number",
                                    width: "number"
                                }]), {
                                title: (th.html() || th.attr('title') || undefined),
                                hidden: (th.attr("hidden") ? true : undefined),
                                formatter: (th.attr("formatter") ? eval(th.attr("formatter")) : undefined),
                                styler: (th.attr("styler") ? eval(th.attr("styler")) : undefined)
                            });
                        if (!col.align) {
                            col.align = "left";
                        }
                        if (th.attr("editor")) {
                            var editor = $.trim(th.attr("editor"));
                            if (editor.substr(0, 1) == "{") {
                                col.editor = eval("(" + editor + ")");
                            } else {
                                col.editor = editor;
                            }
                        }
                        cols.push(col);
                    });
                    opt.frozen ? frozenColumns.push(cols) : columns.push(cols);
                });
            });
            return [frozenColumns, columns];
        };
        //create reportgrid container
        var container = ["<div class=\"reportgrid-wrap\">", "<div class=\"reportgrid-queryForm\"></div>", "<div class=\"reportgrid-subtitleForm\"></div>", "<div class=\"reportgrid-view\">", "<div class=\"reportgrid-view1\">", "<div class=\"reportgrid-header\">", "<div class=\"reportgrid-header-inner\"></div>", "</div>", "<div class=\"reportgrid-body\">", "<div class=\"reportgrid-body-inner\"></div>", "</div>", "<div class=\"reportgrid-footer\">", "<div class=\"reportgrid-footer-inner\"></div>", "</div>", "</div>", "<div class=\"reportgrid-view2\">", "<div class=\"reportgrid-header\">", "<div class=\"reportgrid-header-inner\"></div>", "</div>", "<div class=\"reportgrid-body\"></div>", "<div class=\"reportgrid-footer\">", "<div class=\"reportgrid-footer-inner\"></div>", "</div>", "</div>", "</div>", "</div>"];
        var grid = $(container.join("")).insertAfter(target);
        grid.panel({
            doSize: false
        });
        grid.panel("panel").addClass("reportgrid").bind("_resize",
            function (e, _447) {
                var opts = $.data(target, "reportgrid").options;
                if (opts.fit == true || _447) {
                    setSize(target);
                    setTimeout(function () {
                            if ($.data(target, "reportgrid")) {
                                fixColumnSize(target);
                            }
                        },
                        0);
                }
                return false;
            });
        $(target).hide().appendTo(grid.children("div.reportgrid-view"));
        var columns = getColumnOptions(); // get kui-options config from dom
        var view = grid.children("div.reportgrid-view");
        var queryForm = grid.children("div.reportgrid-queryForm");
        var subtitleForm = grid.children("div.reportgrid-subtitleForm");
        var view1 = view.children("div.reportgrid-view1"); //装载固定列
        var view2 = view.children("div.reportgrid-view2"); //装载普通列
        return {
            panel: grid,
            frozenColumns: columns[0],
            columns: columns[1],
            dc: {
                view: view,
                view1: view1,
                view2: view2,
                queryForm: queryForm,
                subtitleForm: subtitleForm,
                header1: view1.children("div.reportgrid-header").children("div.reportgrid-header-inner"),
                header2: view2.children("div.reportgrid-header").children("div.reportgrid-header-inner"),
                body1: view1.children("div.reportgrid-body").children("div.reportgrid-body-inner"),
                body2: view2.children("div.reportgrid-body"),
                footer1: view1.children("div.reportgrid-footer").children("div.reportgrid-footer-inner"),
                footer2: view2.children("div.reportgrid-footer").children("div.reportgrid-footer-inner")
            }
        };
    }

    function resizeEditor(target) {
        var dc = $.data(target, "reportgrid").dc;
        var opts = $.data(target, "reportgrid").options;
        dc.view.find("div.reportgrid-editable").each(function () {
            var cell = $(this);
            var field = cell.parent().attr("field");
            var col = $(target).reportgrid("getColumnOption", field);
            cell._outerWidth(col.boxWidth + 8);
            var ed = $.data(this, "reportgrid.editor");
            if (ed.actions) {
                if (ed.actions.resize) ed.actions.resize(ed.target, cell.width());
            } else if (ed.type && ed.filter) {
                $(ed.filter, ed.target)[ed.type]("resize", cell.width());
            }
        });
    }

    function getColumnOption(target, field) {
        function find(columns) {
            if (columns) {
                for (var i = 0; i < columns.length; i++) {
                    var cols = columns[i];
                    for (var j = 0; j < cols.length; j++) {
                        var col = cols[j];
                        if (col.field == field) {
                            return col;
                        }
                    }
                }
            }
            return null;
        };
        var opts = $.data(target, "reportgrid").options;
        var col = find(opts.columns);
        if (!col) {
            col = find(opts.frozenColumns);
        }
        return col;
    }

    function getData(target, row, cell) {
        var data = {
            total: 0,
            rows: []
        };
        var fields = getColumnFields(target, true).concat(getColumnFields(target, false));
        if (row) {
            var tr = $(target).find("tbody tr:eq(" + row + ")");
            if (cell) {
                $("td:eq(" + cell + ")", tr).html();
            } else {
                data = [];
                var col = {};
                for (var i = 0; i < fields.length; i++) {
                    col[fields[i]] = $("td:eq(" + i + ")", tr).html();
                }
                data.push(col);
            }
        } else {
            $(target).find("tbody tr").each(function () {
                data.total++;
                var col = {};
                for (var i = 0; i < fields.length; i++) {
                    col[fields[i]] = $("td:eq(" + i + ")", this).html();
                }
                data.rows.push(col);
            });
        }
        return data;
    }

    function create(target) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var dc = state.dc;
        var panel = state.panel;
        panel.panel($.extend({},
            opts, {
                id: null,
                doSize: true,
                onResize: function (_453, _454) {
                    setTimeout(function () {
                            if ($.data(target, "reportgrid")) {
                                resize(target);
                                fitColumns(target);
                                opts.onResize.call(panel, _453, _454);
                            }
                        },
                        0);
                },
                onExpand: function () {
                    fixRowHeight(target);
                    opts.onExpand.call(panel);
                }
            }));
        if (opts.allowMove == true) {
            panel.panel("panel").draggable({
                handle: '.panel-header'
            });
        }
        state.rowIdPrefix = "reportgrid-row-r" + (++reportgridId);
        createColumnHeader(dc.header1, opts, true);
        createColumnHeader(dc.header2, opts, false);
        CreateCellClass();
        dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
        //dc.footer1.add(dc.footer2).css("display",opts.showFooter?"block":"none");
        if (opts.toolbar) {
            if (typeof opts.toolbar == "string") {
                $(opts.toolbar).addClass("reportgrid-toolbar").insertAfter(dc.queryForm);
                $(opts.toolbar).show();
            } else {
                $("div.reportgrid-toolbar", panel).remove();
                var tb = $("<div class=\"reportgrid-toolbar\"></div>").insertAfter(dc.queryForm);
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (String(btn.hidden) != "true") {
                        if (btn == "-") {
                            $("<div class=\"reportgrid-btn-separator\"></div>").appendTo(tb);
                        } else {
                            var a = $("<a href=\"javascript:void(0)\"></a>");
                            var b = a.appendTo(tb).linkbutton($.extend({},
                                btn, {
                                    plain: true
                                }));
                            var iconCls = btn.iconCls;
                            var cls = undefined;
                            var event = undefined;
                            var handler = undefined;
                            if (iconCls) cls = opts.toolbarHandler[iconCls.split("-").length > 1 ? iconCls.split("-")[1] : "dft"];
                            if (opts.rowEdit && !btn.handler) {
                                event = cls ? cls.editHandler : opts.toolbarHandler["dft"].editHandler;
                            } else {
                                handler = eval(btn.handler);
                                event = cls ? cls.clbHandler : opts.toolbarHandler["dft"].clbHandler;
                            }
                            var hideDetail = function () {
                                var detail = dc.view.next(".reportgrid-row-detail");
                                dc.view.height(dc.view[0].clientHeight + (detail.length ? detail[0].scrollHeight : 0));
                                detail.hide();
                                resize(target);
                            }
                            if (btn.float1) {
                                a.css('float', btn.float1);
                            }
                            b.bind('click', {
                                    target: $(target),
                                    req: btn.req,
                                    title: btn.title,
                                    handler: handler,
                                    w: btn.width,
                                    h: btn.height,
                                    view: btn.view,
                                    options: btn,
                                    callback: function (e) {
                                        if ($(e.target).closest("a.l-btn").hasClass("l-btn-disabled")) //avoid to handle event when disabled
                                            return false;
                                        else e.data.handler(e);
                                    }
                                },
                                event);
                        }
                    }
                }
            }
        }
        if (opts.queryCols && opts.queryCols.length > 0) {
            if (dc.queryForm.find("form").length >= 1) {
                return false;
            }
            var form = $('<form/>');
            panel.panel("panel").children().eq(0).before(form);
            dc.queryForm.append(form);
            var colNumbers = 2;
            if (opts.colNumbers) colNumbers = opts.colNumbers;
            form.form({
                onInitSuccess: function () {
                    if (!opts.required) request(target);
                },
                queryCols: opts.queryCols,
                colNumbers: colNumbers,
                autoColNumber: opts.autoColNumber,
                // 是否让form自动控制每行的条件个数
                isHideCols: opts.isHideCols,
                // 创建form的时候增加该参数，表示是否有增加“隐藏搜索条件”的功能。@author 朱庭乐
                lsKey: opts.lsKey + 'form' // 将datagrid的lsKey加上form传给form做为form的lsKey
            });
            var $form = form.find('div.form-box');
            var $qButton = $('<div class="form-group-inline" style="padding:0 0 0 28px;vertical-align:middle;"><a href=\"javascript:void(0)\" ></a></div>').appendTo($form);
            var $button = $qButton.find("a");
            $button.linkbutton($.extend({},
                btn, {
                    plain: true,
                    iconCls: opts.queryBtnIco,
                    text: opts.queryBtnTxt
                }));

            $button.click(function () {
                if (!form.form('validate')) return false;
                var params = form.serializeArray();
                var p = {};
                for (var j = 0; j < params.length; j++) {
                    var name = params[j].name;
                    var value = kui.valueReplace(params[j].value);
                    if (opts.subTitles) {
                        var subTitleObj = opts.subTitles;
                        for (var t = 0; t < subTitleObj.length; t++) {
                            if (name == subTitleObj[t].field) {
                                $("#" + subTitleObj[t].field).val(value);
                            } else if (subTitleObj[t].field == "currentDate") {
                                var date = new Date();
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                var d = date.getDate();
                                $("#" + subTitleObj[t].field).val(y + "-" + m + "-" + d);
                            }
                        }
                    }
                    if (p[name]) {
                        p[name] = p[name] + ',' + value;
                    } else {
                        p[name] = value;
                    }
                }
                if (dc.subtitleForm) {
                    dc.subtitleForm.form("load", params);
                }
                if (opts.onQueryButtonClick) {
                    opts.onQueryButtonClick.call(target, p);
                } else if (opts.onClickQueryButtonBefore) {
                    var rtnParam = opts.onClickQueryButtonBefore.call(target, p);
                    $(target).reportgrid('reload', $.extend({},
                        p, rtnParam));
                } else {
                    $(target).reportgrid('reload', p);
                    $(target).reportgrid('unselectAll');
                    if (opts.isTreeGrid) {
                        $(target).treegrid('reload', 0, p);
                    }
                }
            });
        } else {
            dc.queryForm.hide();
            dc.queryForm.height(0);
        }
        var subTitleFormHtml = new Array();
        if (opts.subTitles) {
            if (opts.title && opts.title != "") {
                subTitleFormHtml.push("<div></div><div  style=\"float:left;text-align:center;width:100%;\"><div style=\"margin-top:10px;margin-bottom:10px;color:#217BC8;\"><b>" + opts.title + "</b></div></div>");
            }
            dc.subtitleForm.empty();
            subTitleFormHtml.push("<div style=\"float: left;text-align:center;width:100%;\">");
            var subTitleObj = opts.subTitles;
            for (var t = 0; t < subTitleObj.length; t++) {
                subTitleFormHtml.push(subTitleObj[t].name + "：<input class=\"kui-textinput\" disabled id=\"" + subTitleObj[t].field + "\"/>");
            }
            subTitleFormHtml.push("</div>");
        }
        if (subTitleFormHtml.length != 0) {
            var $subTitleForm = $(subTitleFormHtml.join(""));
            dc.subtitleForm.append($subTitleForm);
            $.parser.parse(dc.subtitleForm);
        }
        $("div.reportgrid-pager", panel).remove();
        if (opts.pagination) {
            var pager = $("<div class=\"reportgrid-pager\"></div>");
            if (opts.pagePosition == "bottom") {
                pager.appendTo(panel);
            } else {
                if (opts.pagePosition == "top") {
                    pager.addClass("reportgrid-pager-top").prependTo(panel);
                } else {
                    var ptop = $("<div class=\"reportgrid-pager reportgrid-pager-top\"></div>").prependTo(panel);
                    pager.appendTo(panel);
                    pager = pager.add(ptop);
                }
            }
            var dButtons;
            if (opts.showRowDetail) {

                dButtons = [
                    {
                        text: '<input id="' + opts.id + '_show_detail" name="datagrid_detail_button" type="checkbox" ' + (opts.isShowDetail ? 'checked="true"' : '') + ' style="vertical-align:middle;cursor:pointer;"/><label for="' + opts.id + '_show_detail" style="vertical-align:middle;cursor:pointer;padding: 1px 0 1px 1px;">显示详细</label>',
                        handler: function (e) {
                            var isCheck = $(this).find("input").attr("checked");
                            var detail = dc.view.next(".reportgrid-row-detail");
                            if (isCheck) {
                                opts.isShowDetail = true;
                                showDblClickRowDetail(target, dc.view2.find('tr.reportgrid-row-selected'));
                            } else if (detail.length > 0) {
                                dc.view.height(dc.view[0].clientHeight + detail[0].scrollHeight);
                                detail.hide();
                                resize(target);
                                opts.isShowDetail = false;
                            }
                            e.stopPropagation();
                        }
                    }
                ];
            }
            if (opts.fallParas[0].enable && opts.fallParas[0].backAllBtn) {
                var backAllButton = {
                    text: '<span style="cursor:pointer;margin: 2px 0 0 0;display: inline-block;">全部返回</span>',
                    handler: function (e) {
                        if (!opts.fallParas[0].last) {
                            opts.backAllMode = true; // 全部返回模式已开启。
                            request(target, null, true);
                        }
                    }
                };
                if (dButtons) {
                    dButtons.push(backAllButton);
                } else {
                    dButtons = [backAllButton];
                }
            }
            pager.pagination({
                pageNumber: opts.pageNumber,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                buttons: dButtons,
                onSelectPage: function (pageNum, pageSize) {
                    opts.pageNumber = pageNum;
                    opts.pageSize = pageSize;
                    pager.pagination("refresh", {
                        pageNumber: pageNum,
                        pageSize: pageSize
                    });
                    request(target);
                },
                gridMenu: opts.gridMenu,
                exportTypes: opts.exportTypes,
                importTypes: opts.importTypes,
                onHideColumns: function () {
                    onHideColumns(target);
                },
                onHideCols: function () {
                    onHideCols(target);
                },
                onFreezeColumns: function () {
                    onFreezeColumns(target);
                },
                onRestoreDefault: function () {
                    onRestoreDefault(target);
                },
                onFileExport: function (type) {
                    onFileExport(target, type);
                },
                onFileImport: function () {
                    onFileImport(target);
                },
                fallParas: opts.fallParas,
                showPageList: opts.pagerShowPageList,
                showRefresh: opts.pagerShowRefresh,
                pageNavigate: opts.pagerPageNavigate,
                isShowDetail: opts.isShowDetail
            });
        }

        //创建固定列与非固定列都用此方法
        function createColumnHeader(header, opts, isFrozen) {
            var columns = "undefined";
            if (isFrozen) {
                columns = opts.frozenColumns;
            } else {
                columns = opts.columns;
            }
            if (!columns) {
                return;
            }
            $(header).show();
            $(header).empty();
            var hTable = new Array();
            hTable.push("<table class=\"reportgrid-htable\"  border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
            hTable.push("<tbody>");
            for (var i = 0; i < columns.length; i++) {
                if (opts.rowGroup != true) {
                    hTable.push("<tr class=\"reportgrid-header-row \" >");
                    var cols = columns[i];
                    for (var j = 0; j < cols.length; j++) {
                        var col = cols[j];
                        if (col.titleLvl == '1' || col.titleLvl == undefined) {
                            if (col && col.type != "notice") {
                                hTable.push("<td ");
                                if (col.rowspan) {
                                    hTable.push(" rowspan=\"" + col.rowspan + "\"");
                                }
                                if (col.colspan) {
                                    hTable.push(" colspan=\"" + col.colspan + "\"");
                                }
                                if (col.hidden || col.listHidden) {
                                    hTable.push(" style=\"display:none\"");
                                }
                                if (col.checkbox) {
                                    hTable.push(" field=\"" + col.field + "\">");
                                    hTable.push("<div class=\"reportgrid-header-check\"><input type=\"checkbox\"/></div>");
                                } else {
                                    if (col.field) {
                                        if (col.colspan) {
                                            var colspanNums = col.colspan;
                                            var autoWidth = 0;
                                            for (var c = 1; c <= colspanNums; c++) {
                                                autoWidth = autoWidth + Number(cols[(j + c)].width);
                                            }
                                            if (col.width != undefined) {
                                                col.width = Math.max(parseInt(col.width), autoWidth);
                                            } else {
                                                col.width = autoWidth;
                                            }
                                        } else {
                                            col.width = Math.max(parseInt(col.width), titleLen(col.title));
                                        }
                                        hTable.push(" field=\"" + col.field + "\">");
                                        hTable.push("<div class=\"reportgrid-cell\" style=\"float:left;text-align:" + (col.align || "center") + ";width:" + col.width + "px;\"");
                                        if (col.resizable == false) {
                                            hTable.push(" resizable=\"false\">");
                                        } else {
                                            hTable.push(">");
                                        }

                                        if (col.width) {
                                            //col.boxWidth = parseInt(col.width);
                                            col.boxWidth = col.width;

                                        } else {
                                            col.auto = true;
                                        }
                                        col.cellClass = "reportgrid-cell-c" + reportgridId + "-" + col.field.replace(".", "-");
                                        col.cellSelector = "div." + col.cellClass;
                                        hTable.push("<div class=\"reportgrid-title\">" + (col.title ? col.title : "") + "</div>");
                                        if (opts.rowEdit) {
                                            hTable.push("<div class=\"edit-nullalbe-div\">");
                                            if (col.edt_required) {
                                                hTable.push("<div class=\"nullable-div\">*</div>");
                                            } else {
                                                hTable.push("<div class=\"nullable-div\"></div>");
                                            }
                                            if (col.edit_flag != "" && typeof col.edit_flag != "undefined" && col.edit_flag == "0") {
                                                hTable.push("<div class=\"edit-div edit-icon\"></div>");
                                            }
                                            hTable.push("</div>");
                                        }
                                        if (col.sortable) {
                                            hTable.push("<span class=\"reportgrid-sort-icon\"></span>");
                                        }
                                        if ((col.type == 'combobox' || col.type == 'combotree') && col.editor && col.editor.options.data) {
                                            hTable.push("<span class=\"reportgrid-match-icon\"></span>");
                                        } else {
//                                                hTable.push("<span class=\"reportgrid-filter-icon\"></span>");
                                        }
                                        hTable.push("</div>");
                                    } else {
                                        hTable.push(">");
                                        hTable.push("<div class=\"reportgrid-cell-group\">" + col.title + "</div>");
                                    }
                                }
                                hTable.push("</td>");
                            }
                        }
                    }
                    hTable.push("</tr>");
                }

            }
            if (opts.multipleTitle == true) {
                if (opts.rowGroup != true) {
                    for (var i = 0; i < columns.length; i++) {
                        hTable.push("<tr class=\"reportgrid-header-row\">");
                        var cols = columns[i];
                        for (var j = 0; j < cols.length; j++) {
                            var col = cols[j];
                            if (col.titleLvl == '2') {
                                if (col && col.type != "notice") {
                                    hTable.push("<td ");
                                    if (col.rowspan) {
                                        hTable.push(" rowspan=\"" + col.rowspan + "\"");
                                    }
                                    if (col.colspan) {
                                        hTable.push(" colspan=\"" + col.colspan + "\"");
                                    }
                                    if (col.hidden || col.listHidden) {
                                        hTable.push(" style=\"display:none\"");
                                    }
                                    if (col.checkbox) {
                                        hTable.push(" field=\"" + col.field + "\">");
                                        hTable.push("<div class=\"reportgrid-header-check\"><input type=\"checkbox\"/></div>");
                                    } else {
                                        if (col.field) {
                                            col.width = Math.max(parseInt(col.width), titleLen(col.title));
                                            hTable.push(" field=\"" + col.field + "\">");
                                            hTable.push("<div class=\"reportgrid-cell\" style=\"float:left;text-align:" + (col.align || "center") + ";width:" + col.width + "px;\"");
                                            if (col.resizable == false) {
                                                hTable.push(" resizable=\"false\">");
                                            } else {
                                                hTable.push(">");
                                            }

                                            if (col.width) {
                                                //col.boxWidth = parseInt(col.width);
                                                col.boxWidth = col.width;
                                            } else {
                                                col.auto = true;
                                            }
                                            col.cellClass = "reportgrid-cell-c" + reportgridId + "-" + col.field.replace(".", "-");
                                            col.cellSelector = "div." + col.cellClass;
                                            hTable.push("<div class=\"reportgrid-title\">" + (col.title ? col.title : "") + "</div>");
                                            if (opts.rowEdit) {
                                                hTable.push("<div class=\"edit-nullalbe-div\">");
                                                if (col.edt_required) {
                                                    hTable.push("<div class=\"nullable-div\">*</div>");
                                                } else {
                                                    hTable.push("<div class=\"nullable-div\"></div>");
                                                }
                                                if (col.edit_flag != "" && typeof col.edit_flag != "undefined" && col.edit_flag == "0") {
                                                    hTable.push("<div class=\"edit-div edit-icon\"></div>");
                                                }
                                                hTable.push("</div>");
                                            }
                                            if (col.sortable) {
                                                hTable.push("<span class=\"reportgrid-sort-icon\"></span>");
                                            }
                                            if ((col.type == 'combobox' || col.type == 'combotree') && col.editor && col.editor.options.data) {
                                                hTable.push("<span class=\"reportgrid-match-icon\"></span>");
                                            } else {
//                                                hTable.push("<span class=\"reportgrid-filter-icon\"></span>");
                                            }
                                            hTable.push("</div>");
                                        } else {
                                            hTable.push(">");
                                            hTable.push("<div class=\"reportgrid-cell-group\">" + col.title + "</div>");
                                        }
                                    }
                                    hTable.push("</td>");
                                }
                            }
                        }
                        hTable.push("</tr>");
                    }
                }
            }
            hTable.push("</tbody></table>");
            var $header = $(hTable.join(""));
            header.append($header);
            $.parser.parse(header);
            if (isFrozen && (opts.rownumbers || opts.subrow)) {
                var td = opts.rownumbers ? $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"reportgrid-header-rownumber\"></div></td>") : $("<td rowspan=\"1\"><div class=\"reportgrid-header-subrow\"></div></td>");
                if ($("tr", $header).length == 0) {
                    td.wrap("<tr class=\"reportgrid-header-row\"></tr>").parent().appendTo($("tbody", $header));
                } else {
                    td.prependTo($("tr:first", $header));
                }
            }
        }

        function titleLen(str) {
            str = str || '';
            var strs = str.match(/[\x00-\xFF]/g);
            return (str.length * 13 - (strs ? strs.length * 7 : 0)) + 30;
        }

        function CreateCellClass() {
            dc.view.children("style").remove();
            var style = ["<style type=\"text/css\" rel=\"stylesheet\">"];
            var fields = getColumnFields(target, true).concat(getColumnFields(target));
            for (var i = 0; i < fields.length; i++) {
                var col = getColumnOption(target, fields[i]);
                if (col && !col.checkbox) {
                    col.boxWidth = $("td[field='" + col.field + "']", dc.header2).children().outerWidth() - 8;
                    if (col.boxWidth < 0) {
                        col.boxWidth = $("td[field='" + col.field + "']", dc.header1).children().outerWidth() - 8;
                    }
                    style.push(col.cellSelector + "{ width:" + col.boxWidth + "px;}");
                }
            }
            style.push("</style>");
            $(style.join("\n")).prependTo(dc.view);
        }
    }

    function getColumnFields(target, frozen) {
        var opts = $.data(target, "reportgrid").options;
        var columns = (frozen == true) ? (opts.frozenColumns || [
            []
        ]) : opts.columns;
        if (columns.length == 0) {
            return [];
        }
        var fields = [];

        function getFields(rowIndex) {
            var columnFields = [];
            var colspan = 0;
            for (var i = 0; i < columns[rowIndex].length; i++) {
                var col = columns[rowIndex][i];
                if (col.field) {
                    columnFields.push([colspan, col.field]);
                }
                colspan++;
            }
            for (var i = 0; i < columnFields.length; i++) {
                var columnField = columnFields[i];
                fields[columnField[0]] = columnField[1];
            }
        }

        for (var i = 0; i < columns.length; i++) {
            getFields(i);
        }
        return fields;
    }

    function saveOriginalRows(target) {
        var data = $.data(target, "reportgrid").data;
        var rows = data.rows;
        var originalRows = [];
        for (var i = 0; i < rows.length; i++) {
            originalRows.push($.extend({},
                rows[i]));
        }
        $.data(target, "reportgrid").originalRows = originalRows;
        $.data(target, "reportgrid").updatedRows = [];
        $.data(target, "reportgrid").insertedRows = [];
        $.data(target, "reportgrid").deletedRows = [];
    }

    //common method to add event
    function addEvent(target, event, callback) {
        if (!callback || !target || !event) return false;
        var jqEvent = event + ".reportgrid";
        target.unbind(jqEvent).bind(jqEvent, callback);
        return target;
    }

    function getEventTargets(target, e) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var tt = $(e.target);
        var tr = tt.closest("tr.reportgrid-row");
        var value = tt.text();
        var index;
        if (tr.attr("reportgrid-row-index")) {
            index = parseInt(tr.attr("reportgrid-row-index"));
        } else {
            index = tr.attr("node-id");
        }
        var vRow = opts.finder.getRow(target, index);
        var td = tt.closest("td[field]", tr);
        var field = td.attr("field");
        return {
            cell: tt,
            tr: tr,
            row: $.extend({},
                vRow),
            index: index,
            field: field,
            value: value
        };
    }

    function _bodyEventHandler(e, event, target) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var dc = state.dc;
        var obj = getEventTargets(target, e);
        switch (event) {
            case 'contextmenu':
                opts.onRowContextMenu.call(target, e, obj.index, obj.row);
                e.stopPropagation();
                break;
            case 'click':
                if (!obj.index && obj.index != 0) {
                    return;
                }
                if (opts.showRowDetail) {
                    var wrap = state.panel;
                    var isChecked = $("input[name='datagrid_detail_button']", wrap).attr("checked");
                    if (opts.isShowDetail && isChecked) {
                        showDblClickRowDetail(target, obj.tr);
                        //$("input[name='datagrid_detail_button']",wrap).attr("checked","checked");
                    }

                }
                if (obj.cell.parent().hasClass("reportgrid-cell-check")) {
                    if (opts.singleSelect && opts.selectOnCheck) {
                        if (!opts.checkOnSelect) {
                            uncheckAll(target, true);
                        }
                        checkRow(target, obj.index);
                    } else {
                        if (obj.cell.is(":checked")) {
                            checkRow(target, obj.index);
                        } else {
                            uncheckRow(target, obj.index);
                        }
                    }
                } else if (obj.cell.parent().hasClass("reportgrid-cell-subrow")) {
                    if (obj.cell.hasClass("reportgrid-row-expand")) {
                        obj.cell.removeClass("reportgrid-row-expand").addClass("reportgrid-row-collapse");
                        var $tr1 = getSubRow(target, obj.index, 1);
                        var $tr2 = getSubRow(target, obj.index, 2);
                        if ($tr2 && $tr2.length > 0) {
                            $tr1.add($tr2).show();
                        } else {
                            var view = $.data(target, "reportgrid").options.view;
                            view.insertSubRow.call(view, target, obj.index, obj.row);
                            opts.onExpandRow.call(target, obj.index, obj.row);
                        }
                    } else {
                        obj.cell.removeClass("reportgrid-row-collapse").addClass("reportgrid-row-expand");
                        var $tr1 = getSubRow(target, obj.index, 1);
                        var $tr2 = getSubRow(target, obj.index, 2);
                        if ($tr2 && $tr2.length > 0) {
                            $tr1.add($tr2).hide();
                        }
                        opts.onCollapseRow.call(target, obj.index, obj.row);
                    }
                    selectRow(target, obj.index);
                } else {
                    if (obj.field) {
                        opts.onClickCell.call(target, obj.index, obj.field, obj.row[obj.field]);
                    }
                    if (opts.singleSelect == true) {
                        selectRow(target, obj.index);
                    } else {
                        if (obj.tr.hasClass("reportgrid-row-selected")) {
                            unselectRow(target, obj.index);
                        } else {
                            selectRow(target, obj.index);
                        }
                    }
                    if (opts.rowEdit) { //add row edit event
                        if (typeof opts.editing == 'undefined') {
                            beginEdit(target, obj.index);
                            opts.editing = obj.index;
                        } else if (opts.editing != obj.index) {
                            if (validateRow(target, opts.editing)) {
                                endEdit(target, opts.editing);
                                beginEdit(target, obj.index);
                                opts.editing = obj.index;
                            }
                        }
                    }
                    opts.onClickRow.call(target, obj.index, obj.row);
                }
                e.stopPropagation();
                break;
            case 'dblclick':
                if (obj.field) {
                    opts.onDblClickCell.call(target, obj.index, obj.field, obj.row[obj.field]);
                }
                opts.onDblClickRow.call(target, obj.index, obj.row);
                e.stopPropagation();
                break;
            case 'scroll':
                //    		dc.view1.children("div.reportgrid-body").scrollTop($(dc.body1).scrollTop());
                dc.view1.children("div.reportgrid-body").scrollTop(dc.body2.scrollTop());
                dc.view2.children("div.reportgrid-header,div.reportgrid-footer").scrollLeft($(dc.body2).scrollLeft());
                // datagrid中每行的高度是保存在opts.trHeight中，用opts.fallParas[0].cntNum乘以高度除以5，相当于在末尾五分之一处就开始加载新的数据并添加到末尾
                if (!opts.requesting && opts.fallParas[0].enable && !opts.fallParas[0].last && opts.reportParams) { // 增加opts.reportParams判断，必须进行过一次查询才会触发该事件
                    if (!opts.trHeight) {
                        opts.trHeight = dc.body2.find('tr:first').height();
                    }
                    if (state.data.total * opts.trHeight - dc.body2.height() - dc.body2.scrollTop() < opts.fallParas[0].cntNum * opts.trHeight / 5) {
                        request(target, null, true);
                    }
                }
                break;
            case 'mouseover':
                if (!obj.tr) {
                    return;
                }
                obj.tr.children("td").each(function () {
                    if ($(this).attr("rowspan") == undefined) $(this).addClass("reportgrid-row-over");
                });
                e.stopPropagation();
                break;
            case 'mouseout':
                obj.tr.children("td").each(function () {
                    if ($(this).attr("rowspan") == undefined) $(this).removeClass("reportgrid-row-over");
                });
                e.stopPropagation();
                break;
            default:
                break;
        }
    }

    function _bindBodyEvent(target, bodys, event) {
        addEvent(bodys, event,
            function (e) {
                _bodyEventHandler(e, event, target);
            });
    }

    function bindEvents(target) {
        var state = $.data(target, "reportgrid");
        var panel = state.panel;
        var opts = state.options;
        var dc = state.dc;

        var header = dc.header1.add(dc.header2);
        var $headCell = $("td:has(div.reportgrid-cell)", header);
        addEvent($headCell, "mouseenter",
            function (e) {
                if (state.resizing) return;
                $(this).addClass("reportgrid-header-over");
            });
        addEvent($headCell, "mouseleave",
            function (e) {
                $(this).removeClass("reportgrid-header-over");
            });
        addEvent($headCell, "contextmenu",
            function (e) {
                var field = $(this).attr("field");
                opts.onHeaderContextMenu.call(target, e, field);
            });

        var $headCheckbox = $("input[type=checkbox]", header);
        addEvent($headCheckbox, "click",
            function (e) {
                if (opts.singleSelect && opts.selectOnCheck) {
                    return false;
                }
                if ($(this).is(":checked")) {
                    checkAll(target);
                } else {
                    uncheckAll(target);
                }
                e.stopPropagation();
            });

        var $headerCell = $("div.reportgrid-cell", header);
        addEvent($headerCell, "click",
            function (e) {
                if ($(e.target).hasClass('reportgrid-match-icon')) { // 点中漏斗，用于过滤数据    @author 朱庭乐
                    // -----点中漏斗之后自动生成下拉框并增加选中事件 @author 朱庭乐
                    var field = $(this).parent().attr("field");
                    var col = getColumnOption(target, field);
                    var showField = (col.type == "combotree") ? {
                        textField: col.nodeName || col.editor.options.nodeName,
                        valueField: col.nodeId || col.editor.options.nodeId
                    } : {
                        textField: "dict_des",
                        valueField: "dict_val"
                    };
                    var tempData = [];
                    if (col.editor.options["orgFilter"] && typeof col.editor.options["orgFilter"] == "string") {
                        var f = eval(col.editor.options["orgFilter"]);
                        col.editor.options.data = f(col.editor.options.data);
                    } else {
                        col.editor.options.data = $.grep(col.editor.options.data, function (item, i) {
                            var tempItem = {
                                textField: item[showField.textField],
                                valueField: item[showField.valueField]
                            };
                            var tempDataLength = tempData.length;
                            var i = 0;
                            for (; i < tempDataLength; i++) {
                                if (tempItem.textField == tempData[i].textField && tempItem.valueField == tempData[i].valueField) {
                                    break;
                                }
                            }
                            if (i == tempDataLength) {
                                tempData.push(tempItem);
                                return true;
                            }
                        });
                    }
                    var selectedText = $(this).closest('td').attr('filter');
                    var selectedValue = $.grep(col.editor.options.data, function (item, index) {
                        return item[showField.textField] == selectedText;
                    });
                    if (selectedValue.length > 0) {
                        selectedValue = selectedValue[0][showField.valueField];
                    } else {
                        selectedValue = '';
                    }
                    var options = $.extend({},
                        col.editor.options, {
                            editable: false,
                            required: false,
                            multiple: false,
                            isClear: false,
                            width: col.width,
                            panelHeight: col.editor.options.data.length > 9 ? 220 : undefined,
                            value: selectedValue,
                            onSelect: function (d) {
                                var filter = $(this).next().find('>input:first').val();
                                if (filter && filter != '请选择') {
                                    $(this).closest('td').addClass('filtered').attr('filter', filter);
                                } else {
                                    $(this).closest('td').removeClass('filtered').attr('filter', '');
                                }
                                headFilter(target);
                            }
                        }, showField);
                    var needExtItem = !options.extItems && options.data[0][options.textField] != '请选择';
                    if (needExtItem) {
                        var oItem = {};
                        oItem[options.valueField] = '';
                        oItem[options.textField] = '请选择';
                        options.data.unshift(oItem);
                    }
                    $('<div><input></div>').prependTo(this).click(function () {
                        return false;
                    }).find('input').combobox($.extend({}, options, {onHidePanel: function () {
                        var filter = $(this).next().find('>input:first').val();
                        if (filter && filter != '请选择') {
                            $(this).closest('td').addClass('filtered').attr('filter', filter);
                        } else {
                            $(this).closest('td').removeClass('filtered');
                        }
                        $(this).closest('td').find('span.combo').hide();
                        //headFilter(target);
                    }})).next().children(':first').focus();
                    if (needExtItem) {
                        options.data.splice(0, 1);
                    }
                    // -------------------------------------------------------------------------------
                } else if ($(e.target).hasClass('reportgrid-filter-icon')) {
                    // -----点中表头匹配自动生成一个输入框，输入正则表达式用于过滤 @author 朱庭乐
                    var field = $(this).parent().attr("field");
                    var col = getColumnOption(target, field);
                    var options = {
                        onBlur: function () {
                            var $this = $(this);
                            var text = $.trim($this.val());
                            if (text != '') {
                                $(this).closest('td').addClass('filtered').attr('filter', text);
                            } else {
                                $(this).closest('td').removeClass('filtered').attr('filter', '');
                            }
                            $this.parent().remove();
                            headFilter(target);
                        }
                    };
                    $('<div><input style="width:' + col.width + 'px;"></div>').prependTo(this).click(function () {
                        return false;
                    }).find('input').focus().textinput(options).val($(e.target).closest('td').attr('filter')).keydown(function (e) {
                        if (e.which == 13) {
                            $(this).blur();
                            return false;
                        }
                    });
                    // -------------------------------------------------------------------------------
                } else if (e.pageX < $(this).offset().left + $(this).outerWidth() - 5) {
                    var field = $(this).parent().attr("field");
                    var col = getColumnOption(target, field);
                    if (!col.sortable || state.resizing) {
                        return;
                    }
                    opts.sortName = field;
                    opts.sortOrder = "asc";
                    var className = "reportgrid-sort-asc";
                    if ($(this).hasClass(className)) {
                        className = "reportgrid-sort-desc";
                        opts.sortOrder = "desc";
                    }
                    $headerCell.removeClass("reportgrid-sort-asc reportgrid-sort-desc");
                    $(this).addClass(className);
                    if (opts.remoteSort) {
                        request(target);
                    } else {
                        var data = $.data(target, "reportgrid").data;
                        loadData(target, data, 0);
                    }
                    opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
                }
            });
        addEvent($headerCell, "dblclick",
            function (e) {
                if (e.pageX > $(this).offset().left + $(this).outerWidth() - 5) {
                    var field = $(this).parent().attr("field");
                    var col = getColumnOption(target, field);
                    if (col.resizable == false) {
                        return;
                    }
                    $(target).reportgrid("autoSizeColumn", field);
                    col.auto = false;
                }
            });

        $headerCell.each(function () {
            $(this).resizable({
                handles: "e",
                disabled: ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false),
                minWidth: 25,
                onStartResize: function (e) {
                    state.resizing = true;
                    header.css("cursor", "e-resize");
                    if (!state.proxy) {
                        state.proxy = $("<div class=\"reportgrid-resize-proxy\"></div>").appendTo(dc.view);
                    }
                    state.proxy.css({
                        left: e.pageX - $(panel).offset().left - 1,
                        display: "none"
                    });
                    setTimeout(function () {
                            if (state.proxy) {
                                state.proxy.show();
                            }
                        },
                        500);
                },
                onResize: function (e) {
                    state.proxy.css({
                        left: e.pageX - $(panel).offset().left - 1,
                        display: "block"
                    });
                    return false;
                },
                onStopResize: function (e) {
                    header.css("cursor", "");
                    var field = $(this).parent().attr("field");
                    var col = getColumnOption(target, field);
                    col.width = $(this).outerWidth();
                    col.boxWidth = parseInt(this.style.width);
                    col.auto = undefined;
                    fixColumnSize(target, field);
                    dc.view2.children("div.reportgrid-header").scrollLeft(dc.body2.scrollLeft());
                    state.proxy.remove();
                    state.proxy = null;
                    if ($(this).parents("div:first.reportgrid-header").parent().hasClass("reportgrid-view1")) {
                        resize(target);
                    }
                    fitColumns(target);
                    var widthLs = [];
                    var columns = getOriginalColumns(target);
                    for (var i = 0,
                             len = columns.length; i < len; i++) {
                        widthLs.push(parseInt(columns[i].boxWidth));
                    }
                    $.ls(opts.lsKey + '_width', widthLs);
                    opts.onResizeColumn.call(target, field, col.width);
                    setTimeout(function () {
                            state.resizing = false;
                        },
                        0);
                }
            });
        });

        var bodys = dc.body1.add(dc.body2);
        _bindBodyEvent(target, bodys, "mouseover");
        _bindBodyEvent(target, bodys, "mouseout");
        _bindBodyEvent(target, bodys, "click");
        _bindBodyEvent(target, bodys, "dblclick");
        _bindBodyEvent(target, bodys, "contextmenu");
        _bindBodyEvent(target, bodys, "scroll");
    }

    function showDblClickRowDetail(target, tr) {
        var obj = $.data(target, "reportgrid");
        var opts = obj.options,
            dc = obj.dc;
        if (!opts.isShowDetail) return;
        // 有固定列时单击某行时，固定列中的值也需要显示在详细信息中
        if (tr[0]) {
            var trId = tr[0].id;
            trId = trId.replace(/\d-\d*$/,
                function (str) {
                    return str.replace(/^\d/,
                        function (str1) {
                            return str1 == '1' ? '2' : '1';
                        });
                });
            var trs = tr.add('#' + trId);
            tr = trs;

        }
        var $detail = dc.view.next(".reportgrid-row-detail");
        if ($detail.length > 0) {
            if ($detail.is(':hidden')) {
                opts.detailTrsLen = 0;
            }
            $detail.remove();
        } else {
            opts.detailTrsLen = 0;
        }
        var cols = $(target).reportgrid('getOriginalColumns', true); // @author 朱庭乐
        if (opts.showDetailCols && opts.showDetailCols.length > 0) {
            for (var i = 0; i < cols.length; i++) {
                if (opts.showDetailCols.indexOf(cols[i]['field']) == -1) {
                    cols.splice(i, 1);
                    i--;
                }
            }
        }
        var labelWidth = 120,
            colsLength = cols.length,
            preWidth = 0,
            dWidth = parseInt(dc.view[0].style.width) - 16; // 显示详细信息长度过长的BUG。 @author 朱庭乐  经过检查，函数dc.view.width()在数据量大的时候速度太慢，换成了较快速的实现方式。
        var detail = ["<div class=\"reportgrid-row-detail\"><table><tbody>"];
        var trsLen = 0;
        for (var i = 0; i < colsLength; i++) {
            if (String(cols[i].hidden) == "true" || String(cols[i].listHidden) == "true" || String(cols[i].title) == "操作" || cols[i].type == "notice") {
                continue;
            }
            if (preWidth == 0) {
                detail.push("<tr>");
                trsLen++;
            }
            var content = tr && tr.length > 0 ? tr.find("td[field=" + cols[i].field + "]").children().text() : "";
            content = content.replace(/(^\s*)|(\s*$)/g, "");
            var fLength = caculateCharLength(content);
            content = content.replace(/\"/g, "&quot");
            content = content.replace(/</g, "&lt");
            content = content.replace(/</g, "&gt");
            var colspan = 1;
            if (fLength > 120) {
                var floor = Math.round(fLength / 120);
                colspan = floor % 2 == 0 ? (floor + 1) : floor;
            } else {
                fLength = 100;
                colspan = 1
            }
            var cLength = labelWidth + fLength;
            preWidth += cLength;
            if (dWidth - preWidth < cLength) {
                detail.push("</tr>");
                detail.push("<tr>");
                trsLen++;
                preWidth = cLength;
            }
            var _title = cols[i].title;
            if (_title.length > 8) {
                _title = _title.substring(0, 8) + "...";
            } else {
                _title = cols[i].title;
            }
            detail.push("<td class='reportgrid-detail-label'><div style=\"width:" + labelWidth + "px;overflow:hidden;white-space:nowrap;word-wrap:normal;\" title=\"" + cols[i].title + "\">" + _title + "</div></td>");
            detail.push("<td nowrap colspan=\"" + colspan + "\"><div id=\"detail_" + cols[i].field + "\" class='reportgrid-detail-value' style=\"width:" + (fLength > 100 ? fLength : 100) + "px;overflow:hidden;white-space:nowrap;word-wrap:normal;\" title=\"" + content + "\">" + content + "</div></td>");
        }
        detail.push("</tbody></table></div>");
        $detail = $(detail.join("")).insertAfter(dc.view);
        if (trsLen != opts.detailTrsLen) {
            opts.detailTrsLen = trsLen;
            resize(target);
        }
    }

    function caculateCharLength(cString) {
        var len = 0;
        if (!cString || cString == "") return len;
        for (i = 0; i < cString.length; i++) {
            if (cString.charCodeAt(i) > 256) {
                len += 2 + 12;
            } else if (cString.charCodeAt(i) < 65) {
                len += 8; // 7
            } else {
                len += 9; // 将英文字母所占像素从7改为9，系统管理-》公共参数设置 里参数项标识显示不全  @author 朱庭乐   
            }
        }
        return len;
    }

    //点击数据行时触发
    function selectRow(target, index, check) {
        var state = $.data(target, "reportgrid");
        var dc = state.dc;
        var opts = state.options;
        var data = state.data;
        var grid = $.data(target, "reportgrid"); //用于在singleSelect模式下保存被选中的那一列的序号  @author 朱庭乐
        var selectedRows = grid.selectedRows;

        if (opts.singleSelect) {
            //            unselectAll(target); // 在singleSelect模式下不需要unselectAll，只需要将以前选中的那行取消选中即可，行数过多导致unselectAll效率低下。 @author 朱庭乐
            uncheckRow(target, grid.singleSelectIndex, false); // 将以前选中的那行取消选中 @author 朱庭乐
            selectedRows.splice(0, selectedRows.length);
        }

        if (!check && opts.checkOnSelect) {
            checkRow(target, index, true);
        }
        grid.singleSelectIndex = index;

        if (opts.idField) {
            var row = opts.finder.getRow(target, index);
            (function () {
                for (var i = 0; i < selectedRows.length; i++) {
                    //ray 添加了row 与 selectedRows[i]判断
                    if (row && selectedRows[i] && selectedRows[i][opts.idField] == row[opts.idField]) {
                        return;
                    }
                }
                selectedRows.push(row);
            })();
        }

        var tr = opts.finder.getTr(target, index).addClass("reportgrid-row-selected");

        //ray 在treegrid深度级联选择时慢,
        //特加上$.data(target,****)缓存数据。
        if (tr.length) {
            var height = 0,
                tr_top = 0,
                body2 = dc.body2;
            if (!$.data(target, "reportgrid-header-outerHeight")) {
                $.data(target, "reportgrid-header-outerHeight", dc.view2.children("div.reportgrid-header").outerHeight());
            }
            if (!$.data(target, "row-selected_top")) {
                $.data(target, "row-selected_top", tr.position().top);
            }
            height = $.data(target, "reportgrid-header-outerHeight");
            tr_top = $.data(target, "row-selected_top");

//            if (tr_top <= height) {
//                body2.scrollTop(body2.scrollTop() + top);
//            } else {
            /*if (top + tr.outerHeight() > body2.height() - 18) {
             //body2.scrollTop(body2.scrollTop() + top + tr.outerHeight() - body2.height() + 18);
             }*/
//            }
        }
        if (typeof opts.onSelect == 'string') opts.onSelect = eval(opts.onSelect);
        opts.onSelect.call(target, index, data.rows[index]);
    }

    //行数据可以进行多选的情况下,再取消选中一行时触发
    function unselectRow(target, index, check) {
        var state = $.data(target, "reportgrid");
        var dc = state.dc;
        var opts = state.options;
        var data = state.data;
        var selectedRows = $.data(target, "reportgrid").selectedRows;
        if (!check && opts.checkOnSelect) {
            uncheckRow(target, index, true);
        }
        opts.finder.getTr(target, index).removeClass("reportgrid-row-selected");
        var row = opts.finder.getRow(target, index);
        if (opts.idField && row) {
            remove(selectedRows, opts.idField, row[opts.idField]);
        }
        opts.onUnselect.call(target, index, row);
    }

    //选中整页数据时触发
    function selectAll(target, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var rows = state.data.rows;
        var selectRows = $.data(target, "reportgrid").selectedRows;
        if (!check && opts.checkOnSelect) {
            checkAll(target, true);
        }
        opts.finder.getTr(target, "", "allbody").addClass("reportgrid-row-selected");
        if (opts.idField) {
            for (var index = 0; index < rows.length; index++) {
                (function () {
                    var row = rows[index];
                    for (var i = 0; i < selectRows.length; i++) {
                        if (selectRows[i][opts.idField] == row[opts.idField]) {
                            return;
                        }
                    }
                    selectRows.push(row);
                })();
            }
        }
        opts.onSelectAll.call(target, rows);
    }

    //反选整页数据时触发
    function unselectAll(target, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var rows = state.data.rows;
        var selectedRows = $.data(target, "reportgrid").selectedRows;
        if (!check && opts.checkOnSelect) {
            uncheckAll(target, true);
        }
        opts.finder.getTr(target, "", "selected").removeClass("reportgrid-row-selected");
        if (opts.idField) {
            for (var i = 0; i < rows.length; i++) {
                remove(selectedRows, opts.idField, rows[i][opts.idField]);
            }
        }
        opts.onUnselectAll.call(target, rows);
    }

    function checkRow(target, index, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var data = state.data;
        if (!check && opts.selectOnCheck) {
            selectRow(target, index, true);
        }
        var ck = opts.finder.getTr(target, index).find("div.reportgrid-cell-check input[type=checkbox]");
        $.fn.prop ? ck.prop("checked", true) : ck.attr("checked", true);
        opts.onCheck.call(target, index, data.rows[index]);
    }

    function uncheckRow(target, index, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var data = state.data;
        if (!check && opts.selectOnCheck) {
            unselectRow(target, index, true);
        }
        var ck = opts.finder.getTr(target, index).find("div.reportgrid-cell-check input[type=checkbox]");
        $.fn.prop ? ck.prop("checked", false) : ck.attr("checked", false);
        opts.onUncheck.call(target, index, data.rows[index]);
    }

    function checkAll(target, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var data = state.data;
        if (!check && opts.selectOnCheck) {
            selectAll(target, true);
        }
        var checkInput = opts.finder.getTr(target, "", "allbody").find("div.reportgrid-cell-check input[type=checkbox]");
        $.fn.prop ? checkInput.prop("checked", true) : checkInput.attr("checked", true);
        opts.onCheckAll.call(target, data.rows);
    }

    function uncheckAll(target, check) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var data = state.data;
        if (!check && opts.selectOnCheck) {
            unselectAll(target, true);
        }
        var checkInput = opts.finder.getTr(target, "", "allbody").find("div.reportgrid-cell-check input[type=checkbox]");
        $.fn.prop ? checkInput.prop("checked", false) : checkInput.attr("checked", false);
        opts.onUncheckAll.call(target, data.rows);
    }

    //返回固定行固定列的editor
    function getEditor(target, options) {
        var ed = null;
        var opts = $.data(target, "reportgrid").options;
        var tr = opts.finder.getTr(target, options.index);
        tr.find("div.reportgrid-editable").each(function () {
            var field = $(this).parent().attr("field");
            if (field == options.field) {
                ed = $.data(this, "reportgrid.editor");
            }
        });
        return ed;
    }

    function loadData(target, data, addition) {
        var state = $.data(target, "reportgrid");
        var opts = state.options;
        var dc = state.dc;
        var selectedRows = state.selectedRows;
        //data = opts.loadFilter.call(target, data);
        data = opts.loadFilter.call(target, data, opts.pageNumber); //ray 增加了参数opts.pageNumber页面数
        var appendRows;
        if (addition === true) {
            appendRows = data.rows;
            if (appendRows) {
                state.data.rows = state.data.rows.concat(appendRows);
                state.data.total = parseInt(state.data.total) + parseInt(data.total);
                if (appendRows.length && appendRows.length != opts.fallParas[0].cntNum) {
                    opts.fallParas[0].last = true;
                }
            } else {
                opts.fallParas[0].last = true;
            }
        } else if (addition === false || addition === undefined) {
            state.data = data;
            opts.fallParas[0].last = false;
            if (!data.rows) {
                data.rows = [];
                data.total = 0;
            }
            if (opts.fallParas[0].enable && data.total != opts.fallParas[0].cntNum) {
                opts.fallParas[0].last = true;
            }
        } else if (addition === 0) { // addition 传0专门用于排序时的刷新，排序时的刷新绝不能改变opts.fallParas[0].last的状态。
            state.data = data;
            if (!data.rows) {
                data.rows = [];
                data.total = 0;
            }
        }
        //    if(data.footer){
        //      state.footer = data.footer;
        //    }
        if (!opts.remoteSort) {
            var col = getColumnOption(target, opts.sortName);
            if (col) {
                var sorter = col.sorter;
                if (!sorter) {
                    if (col.sortType == 'number' || col.sortType == 'date') {
                        sorter = function (a, b) {
                            return (parseInt(a) > parseInt(b) ? 1 : -1);
                        };
                    } else {
                        sorter = function (a, b) {
                            return (a > b ? 1 : -1);
                        };
                    }
                }
                if (data.originalRows) {
                    data.originalRows.sort(function (row1, row2) {
                        return sorter(row1[opts.sortName], row2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
                    });
                } else {
                    data.rows.sort(function (row1, row2) {
                        return sorter(row1[opts.sortName], row2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
                    });
                }
            }
        }
        var checkInput = dc.view2.find("div.reportgrid-header-check input[type=checkbox]");
        checkInput && $.fn.prop ? checkInput.prop("checked", false) : checkInput.attr("checked", false);
        if (opts.view.onBeforeRender) {
            opts.view.onBeforeRender.call(opts.view, target, data.rows);
        }
        opts.view.render.call(opts.view, target, dc.body1, true, appendRows);

        opts.view.render.call(opts.view, target, dc.body2, false, appendRows);

        //    if(opts.showFooter){
        //      opts.view.renderFooter.call(opts.view,target,dc.footer1,true);
        //      opts.view.renderFooter.call(opts.view,target,dc.footer2,false);
        //    }

        if (opts.view.onAfterRender) {
            opts.view.onAfterRender.call(opts.view, target);
        }

        clearHeadFilter(target); // 将表头过滤清理掉 @author 朱庭乐
        opts.onLoadSuccess.call(target, data);
        var total=$.data(target, "reportgrid").data.total;
        //添加合计行  @author 林宝科
        if (hasTotalFlag&&total!="0") {
            var view = $.data(target, "reportgrid").options.view;
            var insertedRows = $.data(target, "reportgrid").insertedRows;
            var opts = $.data(target, "reportgrid").options;
            var dftValues = {};
            if (opts.columns.length > 0) {
                var cls = opts.columns[0].length;
                var subtotalField = opts.subtotalField;
                var totalColspan = opts.totalColspan;
                if (totalColspan != undefined && subtotalField != undefined) {
                    var totalField = totalColspan.split(",")[0];
                    dftValues[totalField] = "合计";
                } else if (totalColspan != undefined) {
                    var totalField = totalColspan.split(",")[0];
                    dftValues[totalField] = "合计";
                } else {
                    dftValues[opts.columns[0][0].field] = "合计";
                }
                for (var i = 1; i < cls; i++) {
                    var col = opts.columns[0][i];
                    if (typeof col.isTotal != "undefined" && subtotalField == undefined) {
                        if (totalItems[col.field] != undefined) {
                            dftValues[col.field] = totalItems[col.field];
                        } else {
                            dftValues[col.field] = "";
                        }
                    } else if (typeof col.isTotal == "undefined" && subtotalField) {
                        if (subtotalField.indexOf(col.field) != -1) {
                            var totalNums = 0;
                            for (var tt in groupTotalObj) {
                                totalNums = totalNums + Number(groupTotalObj[tt][col.field]);
                            }
                            dftValues[col.field] = totalNums;
                        } else {
                            dftValues[col.field] = "";
                        }
                    } else if (typeof col.isTotal != "undefined" && totalColspan != undefined) {
                        if (totalItems[col.field] != undefined) {
                            dftValues[col.field] = totalItems[col.field];
                        } else {
                            dftValues[col.field] = "";
                        }
                    }
                }
            }
            view.insertRow.call(view, target, null, dftValues);
            insertedRows.push(dftValues);

        }
        var pager = $(target).reportgrid("getPager");

        if (pager.length) {
            //if (pager.pagination("options").total != state.data.total) {
            pager.pagination("refresh", {
                total: state.data.total,
                pageNumber: opts.pageNumber //ray add 分页控件重新定义到第一页
            });
            //}
            pager.prev('div.reportgrid-row-detail').hide();
        }
        fixRowHeight(target);
        dc.body2.triggerHandler("scroll");
        selectRow();
        $(target).reportgrid("autoSizeColumn");
        function selectRow() {
            if (opts.idField) {
                for (var i = 0; i < data.rows.length; i++) {
                    var row = data.rows[i];
                    if (isSelected(row)) {
                        selectRecord(target, row[opts.idField]);
                    }
                }
            }
            function isSelected(row) {
                for (var i = 0; i < selectedRows.length; i++) {
                    if (selectedRows[i][opts.idField] == row[opts.idField]) {
                        selectedRows[i] = row;
                        return true;
                    }
                }
                return false;
            }
        }

        return data;
    }

    function getRowIndex(target, row) {
        var opts = $.data(target, "reportgrid").options;
        var rows = $.data(target, "reportgrid").data.rows;
        if (typeof row == "object") {
            return contain(rows, row);
        } else {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i][opts.idField] == row) {
                    return i;
                }
            }
            return -1;
        }
    }

    function gridDataValueReplace(v) {
        if (typeof(v) != "string") return v;
        v = v.replace(/</g, "&lt;");
        v = v.replace(/>/g, "&gt;");
        return v;
    }

    function gridDataValueReplaceReverse(v) {
        if (typeof(v) != "string") return v;
        v = v.replace(/&lt;/g, "<");
        v = v.replace(/&gt;/g, ">");
        return v;
    }

    function getSelections(target) {
        var opts = $.data(target, "reportgrid").options;
        var data = $.data(target, "reportgrid").data;
        if (opts.idField) {
            return $.data(target, "reportgrid").selectedRows;
        } else {
            var rows = [];
            opts.finder.getTr(target, "", "selected", 2).each(function () {
                var index = parseInt($(this).attr("reportgrid-row-index"));
                var rowData = data.rows[index];
                for (var i in rowData) {
                    rowData[i] = gridDataValueReplaceReverse(rowData[i]);
                }
                rows.push(rowData);
            });
            return rows;
        }
    }

    function selectRecord(target, field) {
        var opts = $.data(target, "reportgrid").options;
        if (opts.idField) {
            var index = getRowIndex(target, field);
            if (index >= 0) {
                selectRow(target, index);
            }
        }
    }

    function getEdtDictText(col, fieldValue) {
        var dictData = col.editor.options.data;
        fieldValue = $.trim(fieldValue);
        fieldValue = gridDataValueReplaceReverse(fieldValue);
        if (!dictData) return fieldValue;
        var dictValue = [];
        var valueField = col.editor.type == "combotree" ? col.editor.options.nodeId : col.editor.options.valueField;
        var textField = col.editor.type == "combotree" ? col.editor.options.nodeName : col.editor.options.textField;
        if (fieldValue != null && fieldValue != undefined && fieldValue != '') {
            var dictText = fieldValue.split(",");
            var breakFlag = false;
            for (var n = 0; n < dictData.length; n++) {
                for (var m = 0; m < dictText.length; m++) {
                    if (dictData[n][valueField] == dictText[m]) {
                        var text = fieldValue;
                        if (textField.indexOf(",") != -1) {
                            var textSplit = textField.split(",");
                            text = dictData[n][textSplit[0]] + "-" + dictData[n][textSplit[1]];
                            breakFlag = true;
                        } else {
                            text = dictData[n][textField];
                            breakFlag = true;
                        }
                        //if($.inArray(text,dictValue)==-1)
                        dictValue.push(text);
                        if (breakFlag) break;
                    }
                }
            }
        }
        return dictValue.length == 1 ? dictValue[0] : dictValue;
    }

    function validateDictText(col, arr) {
        var dictData = col.editor.options.data;
        var flag = false;
        if (!dictData) return flag;
        for (var n = 0; n < dictData.length; n++) {
            for (var m = 0; m < arr.length; m++) {
                if (dictData[n][col.editor.options.valueField] == arr[m]) {
                    flag = true;
                }
            }
        }
        return flag;
    }

    function getEdtDictValue(col, oldHtml) {
        var dictData = col.editor.options.data;
        var dictValue = [];
        var dictText = oldHtml.split(",");
        for (var n = 0; n < dictData.length; n++) {
            for (var m = 0; m < dictText.length; m++) {
                if (dictData[n][col.editor.options.textField] == dictText[m]) {
                    dictValue.push(dictData[n][col.editor.options.valueField]);
                }
            }
        }
        return dictValue.length == 1 ? dictValue[0] : dictValue;
    }

    function createEditor(target, index) {
        var opts = $.data(target, "reportgrid").options;
        var tr = opts.finder.getTr(target, index);
        var selectRow = opts.finder.getRow(target, index);
        var insertFlag = false;
        //var selectRow = $(target).reportgrid("getSelected");
        var insertedRows = $.data(target, "reportgrid").insertedRows;
        for (var i = 0; i < insertedRows.length; i++) {
            if (insertedRows[i] == selectRow) {
                insertFlag = true;
            }
        }
        var uioptions = {};
        tr.children("td").each(function () {
            var cell = $(this).find("div.reportgrid-cell");
            var field = $(this).attr("field");
            var col = getColumnOption(target, field);
            var editFlag = col.edit_flag;
            if (insertFlag) {
                if (editFlag == "2") {
                    return;
                }
            } else {
                if (editFlag == "1" || editFlag == "2") {
                    return;
                }
            }
            if (col && col.editor && opts.onBeforeEditCell.call(target, index, field, selectRow, col)) {
                var type;
                var options = {
                    field: field
                };
                if (typeof col.editor == "string") {
                    type = col.editor;
                } else {
                    if (col.editor && col.editor.options) {
                        options = $.extend(options, col.editor.options);
                        if (options.req) {
                            options.req = eval(options.req);
                        }
                    }
                    if (col.editor && col.editor.type) {
                        type = col.editor.type === "text" ? "textinput" : col.editor.type;
                    }
                }
                if (selectRow && selectRow[field]) {
                    options.value = $.trim(selectRow[field]) || options.defaultValue;
                } else {
                    options.value = options.defaultValue;
                }
                var editor = opts.editors[type];
                if ("checkbox" != type) {
                    var oldHtml = cell.html();
                    if (col.edt_dict) {
                        oldHtml = getEdtDictValue(col, oldHtml);
                    }
                    var input = "";
                    if (!editor) {
                        uioptions[field] = options;
                        if (type == "textarea") {
                            input = "<textarea name='" + field + "' class='kui-" + type + " form-input'></textarea>";
                        } else {
                            input = "<input name='" + field + "' class='kui-" + type + "'></input>"
                        }
                    }

                    var width = cell.outerWidth();
                    cell.addClass("reportgrid-editable");
                    cell._outerWidth(width);
                    cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td>" + input + "</td></tr></table>");
                    cell.children("table").attr("align", col.align);
                    cell.children("table").bind("click dblclick contextmenu",
                        function (e) {
                            e.stopPropagation();
                        });
                    var editOptions = {
                        field: field,
                        type: type,
                        oldHtml: oldHtml,
                        filter: "combobox" === type || "combogrid" === type || "combotree" === type || "datebox" === type || "datetimebox" === type ? "input[comboname='" + field + "']" : "input[name='" + field + "']"
                    };
                    if (editor) {
                        editOptions.actions = editor;
                        editOptions.target = editor.init(cell.find("td"), options);
                    } else {
                        editOptions.target = cell.find("td");
                    }
                    $.data(cell[0], "reportgrid.editor", editOptions);
                    //$.data(cell[0], "reportgrid.editor").actions.setValue($.data(cell[0], "reportgrid.editor").target, oldHtml);
                }
            }
        });
        $.data(tr[0], "uioptions", uioptions);
        setTimeout(function () {
                $.parser.director(tr, undefined,
                    function () {
                        fixRowHeight(target, index, true);
                        resizeEditor(target);
                    });
            },
            0);
    }

    function insertRow(target, rows) {
        var index = rows.index;
        var row = rows.row;
        var view = $.data(target, "reportgrid").options.view;
        var insertedRows = $.data(target, "reportgrid").insertedRows;
        view.insertRow.call(view, target, index, row);
        insertedRows.push(row);
    }

    function appendRow(target, row) {
        var view = $.data(target, "reportgrid").options.view;
        var insertedRows = $.data(target, "reportgrid").insertedRows;
        var opts = $.data(target, "reportgrid").options;
        var dftValues = {};
        if (opts.columns.length > 0) {
            var cls = opts.columns[0].length;
            for (var i = 0; i < cls; i++) {
                var col = opts.columns[0][i];
                if (typeof col.dft_value != "undefined") {
                    if (col.dft_value.indexOf(",") != -1) {
                        col.dft_value = col.dft_value.split(",");
                    }
                    dftValues[col.field] = col.dft_value;
                } else {
                    dftValues[col.field] = "";
                }
            }
        }
        if (!$.isEmptyObject(row)) {
            for (var key in row) {
                for (var ky in dftValues) {
                    if (key == ky) {
                        dftValues[ky] = row[key];
                    }
                }
            }
        }
        row = $.extend({},
            dftValues);
        view.insertRow.call(view, target, null, row);
        insertedRows.push(row);
    }

    //请求数据
    function request(target, queryParams, addition) {

        var grid = $.data(target, 'reportgrid');
        var opts = grid.options;
        // 每次请求前将页面设置为第一页，防止当前为第二页时再查询时还是显示第二页的BUG。 @author 朱庭乐
        var pager = $(target).reportgrid("getPager");
        if (pager.length) {
            var pagerOptions = pager.pagination("options");
            pagerOptions.pageNumber = 1;
        }
        // 防止重复不断提交请求 @author 朱庭乐
        if (opts.fallParas[0].enable && opts.requesting) {
            return;
        }
        opts.requesting = true;
        var dc = $.data(target, "reportgrid").dc;
        if (queryParams) {
            opts.queryParams = $.extend(opts.queryParams, queryParams);
        }
        var params = $.extend({},
            opts.queryParams);

        if (opts.pagination) {
            $.extend(params, {
                page: opts.pageNumber,
                rows: opts.pageSize,
                pageoffset: (opts.pageNumber - 1) * opts.pageSize + 1,
                pagecount: opts.pageSize
            });
        }
        if (opts.sortName) {
            $.extend(params, {
                sort: opts.sortName,
                order: opts.sortOrder
            });
        }
        var queryForm = dc.queryForm;
        var form = queryForm.find('form');
        if (!form.form('validate')) {
            opts.requesting = false;
            return false;
        }

        var ps = form.serializeArray();
        var p = {};

        var getSubmitSeparator = function (field) {
            for (var s = 0; s < opts.queryCols[0].cols.length; s++) {
                if (opts.queryCols[0].cols[s].field == name) {
                    var sep = opts.queryCols[0].cols[s].editor.options.submitSeparator;
                    return typeof sep == "string" ? sep : ',';
                }
            }
            return ","
        }
        for (var j = 0; j < ps.length; j++) {
            var name = ps[j].name;
            var value = kui.valueReplace(ps[j].value);
            if (p[name]) {
                var separator = getSubmitSeparator(name);
                p[name] = p[name] + separator + value;
            } else p[name] = value;
        }

        params = $.extend(params, p);
        if (opts.onBeforeLoad.call(target, params) == false) {
            return;
        }
        if (opts.req) {
            var req;
            if (typeof opts.req == "string") req = eval("(" + opts.req + ")");
            else req = opts.req || {};
            for (var i = 0; i < req.length; i++) {
                var servicesObj = req[i];
                if (!req[i].service && req[i].bex_codes) {
                    servicesObj["service"] = "P9999999";
                }
                params = $.extend(params, servicesObj);
            }
        }
        var data = grid.data;
        var fallParas = opts.fallParas[0];
        if (fallParas.enable) {
            params[fallParas.recName] = fallParas.recNum + (addition ? data.rows.length : 0);
            params[fallParas.cntName] = fallParas.cntNum;
        }

        if(opts.pageParamete){
            params[opts.pageParamete.recName] = params["pagecount"];
            params[opts.pageParamete.cntName] = params["pageoffset"];
        }

        //----------------------------------------------------
        //        setTimeout(function() { // 将setTimeout去掉，实现异步请求返回数据
        load();
        //        },0);
        function load() {
            if (!addition) {
                $(target).reportgrid("loading");
            }
            var result = false;
            if (opts.req.length > 0 || opts.url) {
                result = opts.loader.call(target, params,
                    function (data) {
                        opts.reportParams = params; // 用于报表导出 @author 朱庭乐
                        opts.searchParam = getSearchParam(target); // 用于报表导出的查询条件 @author 朱庭乐
                        setTimeout(function () {
                                $(target).reportgrid("loaded");
                            },
                            0);

                        var d = loadData(target, data, addition); // 增加addition参数 @author 朱庭乐
                        //当分页后当前页只有一条数据将其删除时需后退一页。
                        if (d.rows.length == 0 && opts.pageNumber > 1) {
                            opts.pageNumber--;
                            opts.requesting = false;
                            $(target).reportgrid("reload");
                            return false;
                        }
                        setTimeout(function () {
                                saveOriginalRows(target);
                                opts.requesting = false; // ajax请求完成之后设置为可以进行新的请求 @author 朱庭乐
                            },
                            0);
                        if (opts.backAllMode && !fallParas.last) {
                            request(target, null, true);
                            opts.requesting = false;
                            setTimeout(function () {
                                $(target).reportgrid("loaded");
                            }, 0);
                        } else {
                            opts.backAllMode = false; // 最后关闭全部返回模式
                        }
                    },
                    function () {
                        setTimeout(function () {
                                $(target).reportgrid("loaded");
                            },
                            0);
                        opts.onLoadError.apply(target, arguments);
                        opts.requesting = false; // ajax请求完成之后设置为可以进行新的请求 @author 朱庭乐
                        opts.backAllMode = false; // 如果在全部返回模式下返回失败被中断了，把全部返回模式关闭。@author 朱庭乐
                    });
            }
            if (result == false) {
                $(target).reportgrid("loaded");
            }
        }
    }

    function mergeCells(target, param) {
        var opts = $.data(target, "reportgrid").options;
        var rows = $.data(target, "reportgrid").data.rows;
        param.rowspan = param.rowspan || 1;
        param.colspan = param.colspan || 1;
        if (param.index < 0 || param.index >= rows.length) {
            return;
        }
        if (param.rowspan == 1 && param.colspan == 1) {
            return;
        }
        var colData = rows[param.index][param.field];

        var tr = opts.finder.getTr(target, param.index);
        var td = tr.find("td[field=\"" + param.field + "\"]");
        td.attr("rowspan", param.rowspan).attr("colspan", param.colspan);
        td.addClass("reportgrid-td-merged");
        for (var i = 1; i < param.colspan; i++) {
            td = td.next();
            td.hide();
            rows[param.index][td.attr("field")] = colData;
        }
        for (var i = 1; i < param.rowspan; i++) {
            tr = tr.next();
            var td = tr.find("td[field=\"" + param.field + "\"]").hide();
            rows[param.index + i][td.attr("field")] = colData;
            for (var j = 1; j < param.colspan; j++) {
                td = td.next();
                td.hide();
                rows[param.index + i][td.attr("field")] = colData;
            }
        }
        merge(target);
    }

    /**
     * 解析参数中的列的参数，用于列拖拽，列隐藏和列锁定。 @author 朱庭乐
     */
    function parseColumns(target) {
        var opts = $.data(target, 'reportgrid').options;
        if (opts.fallParas && opts.fallParas[0].enable) {
            opts.pageSize = 999999999;
            opts.fallParas[0] = $.extend({},
                $.fn.reportgrid.defaults.fallParas[0], opts.fallParas[0]);
        }

        //解析opts.gridMenu参数，交将解析出来的结果保存到opts中 @author 朱庭乐
        if (opts.gridMenu) {
            strs = ['fileExport', 'freezeColumns', 'hideColumns', 'hideCols'];
            for (var i = 0,
                     len = strs.length; i < len; i++) {
                var reg = new RegExp(strs[i]);
                if (reg.test(opts.gridMenu)) {
                    opts['is' + strs[i].replace(/^[a-z]/,
                        function (tempStr) {
                            return tempStr.toUpperCase();
                        })] = true;
                }
            }
        }
        opts.frozenColumns = opts.frozenColumns || [
            []
        ];
        opts.frozenColumns[0] = opts.frozenColumns[0] || [];

        //保证lsKey的独一无二性非常重要，利用当前URL、操作员和datagrid的打印标题MD5之后做为KEY。
        opts.lsKey = getReportTitle(target);
        // 每次初始化时从localStorage中获取保存的列宽，然后再重新赋值。
        var columns = opts.columns[0];
        if (!columns) return [];
        // --------------------------------------------
//        var widthLs = $.ls(opts.lsKey + '_width');
//        if (widthLs) {
//            if (!$.isArray(widthLs) || widthLs.length != columns.length) {
//                $.ls(opts.lsKey, null);
//            } else {
//                for (var i = 0,
//                         len = widthLs.length; i < len; i++) {
//                    columns[i].width = widthLs[i];
//                }
//            }
//        }
        //-----------------------------------------------------------------------
        for (var i = 0, len = columns.length; i < len; i++) {
            columns[i].sortable = false;//默认为不可排序
        }
        // 是否有“列拖拽”、“隐藏列”或“冻结列”功能，并查看本地是否存储着列的顺序的信息，有则将保存着的列的顺序的信息还原
        // @author朱庭乐
        var gridLs = $.ls(opts.lsKey);
        var hideArray = new Array();
        if ((opts.isMoveColumns || opts.isHideColumns || opts.isFreezeColumns) && opts.columns && opts.columns[0]) {
            var columns = opts.columns[0];
            if (gridLs && gridLs.length == columns.length) {
                var newColumns = new Array();
                var frozenColumns = new Array();
                for (var i = 0,
                         len = gridLs.length; i < len; i++) {
                    if (gridLs[i] < 0) {
                        newColumns.push(columns[gridLs[i] + len]);
                        hideArray.push(i);
                    } else if (gridLs[i] >= len) {
                        frozenColumns.push(columns[gridLs[i] - len]);
                    } else {
                        newColumns.push(columns[gridLs[i]]);
                    }
                }
                opts.columns[0] = newColumns;
                opts.frozenColumns[0] = frozenColumns;
            } else {
                $.ls(opts.lsKey, null);
            }
        }
        //检查列中有哪是需要固定的列
        if (!gridLs && opts.columns && opts.columns[0]) {
            gridLs = [];
            var columns = opts.columns[0];
            var frozenColumns = new Array();
            var k = 0;
            // 如果在LocalStorage中保存着有固定列的信息，则忽略掉列的配置项
            for (var len = columns.length,
                     i = len - 1; i >= 0; i--) {
                if (columns[i] && columns[i].frozen == 'true') {
                    frozenColumns.unshift(columns.splice(i, 1)[0]);
                    gridLs.splice(gridLs.length - k++, 0, i + len);
                } else {
                    gridLs.unshift(i);
                }
            }
            opts.frozenColumns[0] = frozenColumns;
            if (k > 0) {
                $.ls(opts.lsKey, gridLs);
            }
        }
        return hideArray;
        // ------------------------------------------------------------------------
    }

    /**
     * 给datagrid组件添加功能“列拖拽”
     * dom：datagrid组件的DOM元素
     * @author 朱庭乐
     */
    function addMoveColumn(dom) {
        if (!dom) {
            return;
        }
        var dc = $.data(dom, "reportgrid").dc;
        var $head1Tr = dc.header1.find('tr');
        var $head2Tr = dc.header2.find('tr');
        var $body2 = dc.body2;
        var $body = $('body');
        var onselectstart = $body[0].onselectstart;
        var $curDiv = null;

        var isDown = false;
        var from = 0;
        var oldX = 0;
        var left = 0;

        var tdLefts = [];

        $body.mousemove(function (e) {
            if (isDown) {
                $head2Tr.find('.floatTd').css('left', left + (e.pageX - oldX) + 'px');

                var nowLeft = Math.max(e.pageX, tdLefts[0]);
                for (var i = 1,
                         len = tdLefts.length; i < len; i++) {
                    if (nowLeft < tdLefts[i]) {
                        var $tempDiv;
                        if (nowLeft >= tdLefts[i] - (tdLefts[i] - tdLefts[i - 1]) / 2) {
                            $tempDiv = $head2Tr.find('td:eq(' + (i - 1) + ') div.reportgrid-cell').removeClass('leftInsert').addClass('rightInsert');
                        } else {
                            $tempDiv = $head2Tr.find('td:eq(' + (i - 1) + ') div.reportgrid-cell').removeClass('rightInsert').addClass('leftInsert');
                        }
                        if ($tempDiv[0] != $curDiv[0]) {
                            $curDiv.removeClass('leftInsert').removeClass('rightInsert');
                            $curDiv = $tempDiv;
                        }
                        break;
                    }
                }
            }
        }).bind('mouseup mouseleave',
            function (e) {
                if (isDown) {
                    isDown = false;
                    $body[0].onselectstart = onselectstart;
                    $body.removeClass('noneSelect');
                    $head2Tr.find('.floatTd').remove();
                    $curDiv.removeClass('leftInsert').removeClass('rightInsert');

                    var nowLeft = Math.max(e.pageX, tdLefts[0]);
                    for (var i = 1,
                             len = tdLefts.length; i < len; i++) {
                        if (nowLeft < tdLefts[i]) {
                            if (nowLeft >= tdLefts[i] - (tdLefts[i] - tdLefts[i - 1]) / 2) {
                                moveColumn(dom, from, i);
                            } else {
                                moveColumn(dom, from, i - 1);
                            }
                            return;
                        }
                    }
                    moveColumn(dom, from, len - 1);
                }
            });

        $head1Tr.find('td').add($head2Tr.find('td')).mousedown(function (e) {
            if ($(this).parents('div.reportgrid-view2:first').length < 1) {
                return true;
            }
            if ($(this).find('.reportgrid-cell:first').css('cursor') != 'e-resize' && e.ctrlKey) {
                isDown = true;
                from = $(this).index();
                // 清除拖动时会默认选择
                $body[0].onselectstart = getFalse; // 适用于IE浏览器
                $body.addClass('noneSelect');
                oldX = e.pageX;
                left = $(this).offset().left;
                var baseLeft = $head2Tr.parent().offset().left;
                var scrollLeft = $body2.scrollLeft();
                left = left - baseLeft - scrollLeft;
                tdLefts = [];
                $(this).parent().find('td').each(function () {
                    tdLefts.push($(this).offset().left);
                }).filter(':last').each(function () {
                    tdLefts.push($(this).offset().left + $(this).width());
                });
                $curDiv = $(this).parent().append($(this).clone().attr('class', 'floatTd').css('left', left + 'px')).find('div.reportgrid-cell');
            }
        });

        function getFalse() {
            return false;
        }
    }

    /**
     * 将reportgrid控件中的某一列（从0开始计算）移动到某一位置（从0开始计算）同，如果有隐藏列，不会对该函数造成影响
     * dom:reportgrid控件的DOM元素
     * from:reportgrid中的某一列，从0开始计算，取值范围为[0,列数-1]
     * to:reportgrid中可以插入的列的位置，一共有列数+1个值，从0开始计算，取值范围为[0,列数]
     * @author 朱庭乐
     */
    function moveColumn(dom, from, to) {
        if (!dom) {
            return;
        }
        var dc = $.data(dom, "reportgrid").dc;
        var $view2 = dc.view2;
        var len = $view2.find('tr:first td').length;
        if ((from < 0) || (from > len - 1) || (to < 0) || (to > len) || (from == to) || (from == to - 1)) {
            return;
        }
        var $tr = $view2.find('tr');
        var func;
        var dest = to;
        if (to == len) {
            func = 'insertAfter';
            dest = len - 1;
        } else {
            func = 'insertBefore';
        }
        $tr.each(function (i, d) {
            var $from = $(this).find('td:eq(' + from + ')');
            var $to = $(this).find('td:eq(' + dest + ')');
            $from[func]($to);
        });

        // 以下代码改变列的顺序，即改变参数columns的顺序
        var opts = $.data(dom, 'reportgrid').options;
        var columns = opts.columns[0];
        var frozenColumns = opts.frozenColumns[0];
        columns.splice(to, 0, columns[from]);
        columns.splice(from > to ? from + 1 : from, 1);

        // 以下代码将列的顺序保存起来
        var gridLs = $.ls(opts.lsKey);
        if (!gridLs || !$.isArray(gridLs) || gridLs.length != columns.length + frozenColumns.length) {
            gridLs = [];
            for (var i = 0,
                     len = columns.length + frozenColumns.length; i < len; i++) {
                gridLs[i] = i;
            }
        }
        gridLs.splice(to, 0, gridLs[from]);
        gridLs.splice(from > to ? from + 1 : from, 1);
        $.ls(opts.lsKey, gridLs);

    }

    /**
     * 给reportgrid对象添加功能“隐藏列”
     * dom：需要添加隐藏列按钮和事件的reportgrid控件的dom元素
     * @author 朱庭乐
     */
    function addHideColumns(dom) {
        if (!dom || !$.data(dom, "reportgrid")) {
            return;
        }
        var columns = $.data(dom, "reportgrid").options.columns[0];
        var html = [];
        html.push('<div class="hide_columns"><div style="line-height:20px;height:20px;"><a name="selectAll" style="margin:0 5px;" href="javascript:void(0)">全选</a><a href="javascript:void(0)" style="margin:0 5px;">全不选</a><a href="javascript:void(0)" style="margin:0 5px;">反选</a></div><div style="height:160px;overflow:auto;margin-bottom:10px;"><ul style="list-style:none;margin:0;padding:0;">');
        for (var i = 0,
                 len = columns.length; i < len; i++) {
            html.push('<li ');
            if (columns[i].hidden) { // 对于在view中就配置了隐藏属性的列来说，不允许对其操作
                html.push(' style="display:none"');
            }
            html.push('><input type="checkbox"');
            if (/ hide/.test(columns[i].cellClass)) {
                html.push(' checked="checked"');
            }
            html.push('><span>' + columns[i].title + '</span></li>');
        }
        html.push('</ul></div><a name="confirm" style="margin:0 10px 0 10px;" href="javascript:void(0)">确定</a>');
        html.push('<a href="javascript:void(0)">取消</a>');
        html.push('</div>');
        var $window = $(html.join('')).window({
            title: '请选择要隐藏的列',
            width: 200,
            height: 250,
            modal: true,
            minimizable: false,
            maximizable: false,
            collapsible: false
        });
        $window.find('a[name=selectAll]').click(function () {
            $window.find('ul input').each(function () {
                this.checked = true;
            });
        }).next().click(function () {
            $window.find('ul input').each(function () {
                this.checked = false;
            });
        }).next().click(function () {
            $window.find('ul input').each(function () {
                this.checked = !this.checked;
            });
        });
        $window.find('a[name=confirm]').linkbutton({
            iconCls: 'icon-add'
        }).click(function () {
            var hideArray = [];
            $window.find('input:checked').each(function (i, d) {
                hideArray.push($(d).parent().index());
            });
            hideColumns(dom, hideArray);
            $window.window('close');
        }).next().linkbutton({
            iconCls: 'icon-cancel'
        }).click(function () {
            $window.window('close');
        });
        $window.window('open');
    }

    /**
     * 隐藏reportgrid中的某几列，将这几列隐藏之后，还会将其它列都设为显示
     * dom：reportgrid控件的dom元素
     * hideArray：一个数组，如[0,1,5]，该数组中的每一个元素都是数字，每个元素均表示需要隐藏的reportgrid中的哪一列
     * @author 朱庭乐
     */
    function hideColumns(dom, hideArray) {
        if (!dom || !$.isArray(hideArray)) {
            return;
        }
        var dc = $.data(dom, "reportgrid").dc;
        var $h2 = dc.header2;
        var $body2 = dc.body2;

        var $htr = $h2.find('tr');
        var $btr = $body2.find('tr');
        var opts = $.data(dom, "reportgrid").options;
        var columns = opts.columns[0];
        var frozenColumns = opts.frozenColumns[0];

        $htr.find('td>div').show();
        $btr.find('td>div[class*=hide]').removeClass('hide');
        for (var i = 0,
                 len = columns.length; i < len; i++) {
            columns[i].cellClass = columns[i].cellClass.replace(/ hide/g, '');
        }
        for (var i = 0,
                 len = hideArray.length; i < len; i++) {
            var index = hideArray[i];
            columns[index].cellClass += ' hide';

            $htr.find('td:eq(' + index + ')>div').hide();
            $btr.find('td:eq(' + index + ')>div').addClass('hide');
        }

        // 将隐藏的列的数据保存在本地存储中，需要隐藏的列，用列序号减去列的总长度用来表示该列是隐藏的
        var gridLs = $.ls(opts.lsKey);
        if (!gridLs || !$.isArray(gridLs) || gridLs.length != columns.length + frozenColumns.length) {
            gridLs = [];
            for (var i = 0,
                     len = columns.length + frozenColumns.length; i < len; i++) {
                gridLs[i] = i;
            }
        }
        var columnsLen = gridLs.length;
        for (var i = 0,
                 len = gridLs.length; i < len; i++) {
            if (gridLs[i] < 0) {
                gridLs[i] += columnsLen;
            }
        }
        for (var i = 0,
                 len = hideArray.length; i < len; i++) {
            if (gridLs[hideArray[i]] >= 0) {
                gridLs[hideArray[i]] -= columnsLen;
            }
        }
        $.ls(opts.lsKey, gridLs);
    }

    /**
     * 打开固定列的Window窗口
     * @author 朱庭乐
     */
    function freezeColumnsWindow(dom) {
        if (!dom || !$.data(dom, "reportgrid")) {
            return;
        }
        var opts = $.data(dom, 'reportgrid').options;
        var columns = opts.columns[0];
        var frozenColumns = opts.frozenColumns[0];
        var html = [];
        html.push('<div class="hide_columns"><div style="line-height:20px;height:20px;"><a name="selectAll" style="margin:0 5px;" href="javascript:void(0)">全选</a><a href="javascript:void(0)" style="margin:0 5px;">全不选</a><a href="javascript:void(0)" style="margin:0 5px;">反选</a></div><div style="height:160px;overflow:auto;margin-bottom:10px;"><ul style="list-style:none;margin:0;padding:0;">');
        for (var i = 0,
                 len = frozenColumns.length; i < len; i++) {
            html.push('<li');
            if (frozenColumns[i].hidden) { // 对于在view中就配置了隐藏属性的列来说，不允许对其操作
                html.push(' style="display:none"');
            }
            html.push('><input type="checkbox" field="' + frozenColumns[i].field + '"');
            html.push(' checked="checked"');
            html.push('><span>' + frozenColumns[i].title + '</span></li>');
        }
        for (var i = 0,
                 len = columns.length; i < len; i++) {
            if (!/ hide/.test(columns[i].cellClass)) {
                html.push('<li');
                if (columns[i].hidden) { // 对于在view中就配置了隐藏属性的列来说，不允许对其操作
                    html.push(' style="display:none"');
                }
                html.push('><input type="checkbox" field="' + columns[i].field + '"');
                html.push('><span>' + columns[i].title + '</span></li>');
            }
        }
        html.push('</ul></div><a name="confirm" style="margin:0 10px 0 10px;" href="javascript:void(0)">确定</a>');
        html.push('<a href="javascript:void(0)">取消</a>');
        html.push('</div>');
        var $window = $(html.join('')).window({
            title: '请选择要锁定的列',
            width: 200,
            height: 250,
            modal: true,
            minimizable: false,
            maximizable: false,
            collapsible: false
        });
        $window.find('a[name=selectAll]').click(function () {
            $window.find('ul input').each(function () {
                this.checked = true;
            });
        }).next().click(function () {
            $window.find('ul input').each(function () {
                this.checked = false;
            });
        }).next().click(function () {
            $window.find('ul input').each(function () {
                this.checked = !this.checked;
            });
        });
        $window.find('a[name=confirm]').linkbutton({
            iconCls: 'icon-add'
        }).click(function () {
            var freezeArray = [];
            $window.find('input:checked').each(function (i, d) {
                freezeArray.push($(d).attr('field'));
            });
            if (freezeColumns(dom, freezeArray)) {
                $window.window('close');
            }
        }).next().linkbutton({
            iconCls: 'icon-cancel'
        }).click(function () {
            $window.window('close');
        });
        $window.window('open');
    }

    /**
     * 冻结列
     * @author 朱庭乐
     */
    function freezeColumns(dom, freezeArray) {
        if (!dom || !$.isArray(freezeArray)) {
            return;
        }
        var pager = $(dom).reportgrid('getPager');
        var data = $.data(dom, 'reportgrid');
        var dc = data.dc;
        var opts = data.options;
        var originalRows = data.originalRows;
        var $h1 = dc.header1;
        var $h2 = dc.header2;
        var columns = opts.columns[0];
        var frozenColumns = opts.frozenColumns[0];
        var totalLen = columns.length + frozenColumns.length;

        var gridLs = $.ls(opts.lsKey);
        if (!gridLs || !$.isArray(gridLs) || gridLs.length != totalLen) {
            gridLs = [];
            for (var i = 0,
                     len = columns.length; i < len; i++) {
                gridLs[i] = i;
            }
            for (var j = 0,
                     len = frozenColumns.length; j < len; j++) {
                gridLs[i + j] = i + j + totalLen;
            }
        }

        var totalWidth = dc.view.width() * 0.6; // 所有固定列的宽度之和不能超过表格宽度的60%
        var originalColumns = frozenColumns.concat(columns);
        var totalWidthTemp = 0;
        for (var i = 0,
                 len = freezeArray.length; i < len; i++) {
            for (var j = 0,
                     lenJ = originalColumns.length; j < lenJ; j++) {
                if (freezeArray[i] == originalColumns[j].field) {
                    totalWidthTemp += parseInt(originalColumns[j].width);
                }
            }
        }
        if (totalWidthTemp > totalWidth) {
            alert('所有固定列宽度之和不能超过表格宽度的60%。');
            return false;
        }
        for (var len = frozenColumns.length,
                 i = len - 1,
                 k = 0; i >= 0; i--) {
            var field = frozenColumns[i].field;
            if (notInArray(field, freezeArray)) {
                columns.unshift(frozenColumns.splice(i, 1)[0]);
                gridLs.unshift(gridLs.splice(totalLen - (len - i - (k++)), 1)[0] - totalLen);
                $h1.find('tr td[field=' + field + ']').prependTo($h2.find('tr'));
            }
        }
        for (var i = 0,
                 len = freezeArray.length; i < len; i++) {
            if (notInArrayObject(freezeArray[i], frozenColumns)) {
                for (var j = 0,
                         lenJ = columns.length; j < lenJ; j++) {
                    if (columns[j].field == freezeArray[i]) {
                        frozenColumns.push(columns.splice(j, 1)[0]);
                        var value = gridLs.splice(j, 1)[0];
                        if (value < 0) {
                            value += 2 * totalLen;
                        } else if (value < totalLen) {
                            value += totalLen;
                        }
                        gridLs.push(value);
                        $h2.find('tr td[field=' + freezeArray[i] + ']').appendTo($h1.find('tr'));
                        break;
                    }
                }
            }
        }
        $.ls(opts.lsKey, gridLs);

        function notInArray(element, array) {
            for (var i = 0,
                     len = array.length; i < len; i++) {
                if (element == array[i]) {
                    return false;
                }
            }
            return true;
        }

        function notInArrayObject(element, array) {
            for (var i = 0,
                     len = array.length; i < len; i++) {
                if (element == array[i].field) {
                    return false;
                }
            }
            return true;
        }

        if (originalRows && originalRows.length > 0) {
            $(dom).reportgrid('loadData', data.data);
        }
        resize(dom);
        return true;
    }

    /**
     * 列的顺序或者隐藏属性或者固定属性改变之后，再获取到原始的列的顺序 @author 朱庭乐
     */
    function getOriginalColumns(target, ignoreHidden) {
        var opts = $.data(target, 'reportgrid').options;
        var gridLs = $.ls(opts.lsKey);
        var columns = opts.columns[0];
        var frozenColumns = opts.frozenColumns[0];
        var originalColumns;
        if (gridLs && $.isArray(gridLs) && columns && frozenColumns && gridLs.length == columns.length + frozenColumns.length) {
            originalColumns = [];
            var totalLen = gridLs.length;
            var columnsLen = columns.length;
            for (var i = 0; i < totalLen; i++) {
                if (gridLs[i] < 0) {
                    gridLs[i] += totalLen;
                }
            }
            for (var i = 0; i < totalLen; i++) {
                for (var j = 0; j < totalLen; j++) {
                    if (i == gridLs[j]) {
                        originalColumns.push(columns[j]);
                        break;
                    } else if (i == gridLs[j] - totalLen) {
                        originalColumns.push(frozenColumns[j - columnsLen]);
                        break;
                    }
                }
            }
        } else {
            originalColumns = columns;
        }
        if (ignoreHidden) {
            for (var i = 0,
                     len = originalColumns.length; i < len; i++) {
                if (/ hide/.test(originalColumns[i].cellClass) || originalColumns[i].hidden) {
                    originalColumns.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        return originalColumns;
    }

    /**
     * 用于打开“隐藏列”功能的对话框，传给工具栏的回调函数 @author 朱庭乐
     */
    function onHideColumns(target) {
        addHideColumns(target);
    }

    /**
     * 用于打开“隐藏搜索条件”功能的对话框，传给工具栏的回调函数 @author 朱庭乐
     */
    function onHideCols(target) {
        var dc = $.data(target, 'reportgrid').dc;
        var $queryForm = dc.queryForm.find('form');
        $queryForm.form('hideColsWindow',
            function () {
                resize(target);
            });
    }

    /**
     * 用于打开“固定列”功能的对话框，传给工具栏的回调函数 @author 朱庭乐
     */
    function onFreezeColumns(target) {
        freezeColumnsWindow(target);
    }

    /**
     * 用于工具栏菜单按钮点击“恢复默认”时的回调函数 @author 朱庭乐
     */
    function onRestoreDefault(target) {
        var grid = $.data(target, 'reportgrid');
        $.ls(grid.options.lsKey, null);
        $.ls(grid.options.lsKey + '_width', null);

        var $queryForm = grid.dc.queryForm;
        var $form = $queryForm && /form/i.test($queryForm[0].tagName) ? $queryForm : $queryForm.find('form');
        var data = $form.data();
        if (data && data.form) {
            $form.form('restoreDefault');
        }

        window.location.reload(false);
    }

    /**
     * 从参数中获取searchParam传给后台生成pdf文件的操作 @author 朱庭乐
     */
    function getSearchParam(target) {
        var grid = $.data(target, 'reportgrid');
        var $queryForm = grid.dc.queryForm || $();
        var searchParam = {};
        $queryForm.find('input:visible').each(function (i, d) {
            var $this = $(this);
            var name, value = $.trim($this.val());
            if (value && value != '-请选择-' && $.data(this,'validatebox').options.showWhenExport) {
                name = $this.closest('div').children(":first").text();
                if (name) {
                    name = name.replace(/[:：]$/, '');
                    searchParam[name] = value;
                }
            }
        });
        return searchParam;
    }

    /**
     * 向服务器提交生成下载文件或导出的函数 @author 朱庭乐
     */
    function submitReport(target, param) {
        var grid = $.data(target, 'reportgrid');
        if (grid.dc.reportDialog) {
            grid.dc.reportDialog.report(param);
        } else {
            grid.dc.reportDialog = $('<div></div>').report(param);
        }
    }

    function getReportTitle(target) {
        var data = $.data(target, 'reportgrid');
        var opts = data.options;
        var title = opts.reportTitle || opts.name || opts.title;
        var $tabs = data.dc.view.parents('div.kui-tabs:first');
        if ($tabs.length > 0) {
            if ($tabs.data('tabs')) {
                title = title || $tabs.tabs('getSelected').panel('options').title;
            } else {
                title = title || data.dc.view.parents("div.panel:first").parent().attr('title');
            }
        }
        return title;
    }

    /**
     * 用于工具栏点击导出按钮时的回调函数 @author 朱庭乐
     */
    function onFileExport(target, type, exportParam) {
        var isPrint = type == 'print';
        var data = $.data(target, 'reportgrid');
        var opts = data.options;

        var reportParams = opts.reportParams;
        if (!reportParams) {
            alert('必须先进行一次查询！');
            return;
        }
        if (!data.data.rows) {
            alert('没有数据不必要进行该操作！');
            return;
        }
        var searchParam = opts.searchParam;

        var title = getReportTitle(target);

        var fallParas = opts.fallParas[0];
        var pageInfo;
        if (fallParas.enable) {
            pageInfo = {
                pageNum: 1,
                totalRowNum: 100000,
                totalPageNum: 1000,
                pageSize: fallParas.cntNum,
                startRowNum: fallParas.recNum,
                endRowNum: fallParas.recNum + data.data.rows.length - 1
            };
        } else if(opts.remotePagination){
        	var pager = $(target).reportgrid('getPager');
            var pagerOptions = pager.pagination('options');
            pageInfo = {
                pageNum: 1,
                totalRowNum: 100000,
                totalPageNum: 1000,
                noPagination: true,
                remotePagination : true,
                pageSize: pagerOptions.pageSize,
                pageParamete : opts.pageParamete,
                startRowNum: pagerOptions.pageSize * (pagerOptions.pageNumber - 1),
                endRowNum: pagerOptions.pageSize * pagerOptions.pageNumber
            };
        }else {
            var pager = $(target).reportgrid('getPager');
            var pagerOptions = pager.pagination('options');
            pageInfo = {
                pageNum: 1,
                totalRowNum: 100000,
                totalPageNum: 1000,
                noPagination: true,
                // 无分页的LBM
                pageSize: pagerOptions.pageSize,
                startRowNum: pagerOptions.pageSize * (pagerOptions.pageNumber - 1),
                endRowNum: pagerOptions.pageSize * pagerOptions.pageNumber
            };
        }

        var tableView = {};
        tableView[opts.id] = 'col';
        var param = {
            tableView: tableView,
            reqStr: {
                req: [opts.reportParams]
            },
            pageInfo: pageInfo,
            gridColumns: $(target).reportgrid('getOriginalColumns'),
            exportType: isPrint ? 'pdf' : type,
            isPrint: isPrint,
            title: title,
            fileName: title,
            userName: g_user && g_user.userName ? g_user.userName : '',
            orgName: g_user && g_user.orgName ? g_user.orgName : '',
            searchParam: searchParam,
            fallParas: fallParas
        };
        $.extend(param, exportParam);
        submitReport(target, param);
    }

    function onFileImport(target) {
        var toolbar = $.data(target, 'reportgrid').options.toolbar;
        var param = {
            toolbar: toolbar
        };
        submitImport(target, param);
    }

    function submitImport(target, param) {
        var grid = $.data(target, 'reportgrid');
        if (grid.dc.importDialog) {
            grid.dc.importDialog.imports(target, param);
        } else {
            grid.dc.importDialog = $('<div></div>').imports(target, param);
        }
    }

    function headFilter(target) {
        var grid = $.data(target, 'reportgrid');
        var options = grid.options;
        var dc = grid.dc;
        var $this;

        var reg = /\d-\d+$/;
        var reg1 = /^\d/;

        var filterParam = [];
        $.each([dc.header1, dc.header2],
            function (i, d) {
                var param = {};
                d.find('td.filtered').each(function () {
                    $this = $(this);
                    param[$this.index()] = $this.attr('filter');
                });
                filterParam.push(param);
                dc['body' + (i + 1)].find('>table>tbody>tr:hidden').show();
            });

        var param, $trs, value;
        $.each([dc.body1, dc.body2],
            function (i, d) {
                if ($.isEmptyObject(param = filterParam[i])) {
                    return;
                }
                $trs = d.find('>table>tbody>tr:visible');
                for (var key in param) {
                    value = param[key];
                    $trs = $trs.filter(function () {
                        return $(this).find('>td:eq(' + key + ')').text().indexOf(value) != -1 || hideTr(this);
                    });
                }
            });
        $(target).reportgrid('getPager').find('div.pagination-info').html('过滤之后共有 ' + ($trs ? $trs.length : dc.body1.find('>table>tbody>tr:visible').length) + ' 条记录');

        function hideTr(tr) {
            tr.style.display = 'none';
            document.getElementById(tr.id.replace(reg,
                function (s) {
                    return s.replace(reg1, s.charAt(0) == 1 ? 2 : 1);
                })).style.display = 'none';
        }

        function showTr(tr) {
            tr.style.display = 'table-row';
            document.getElementById(tr.id.replace(reg,
                function (s) {
                    return s.replace(reg1, s.charAt(0) == 1 ? 2 : 1);
                })).style.display = 'table-row';
        }
    }

    // 将表头过滤全部去掉 @author 朱庭乐
    function clearHeadFilter(target) {
        var grid = $.data(target, 'reportgrid');
        var dc = grid.dc;
        $.each([dc.header1, dc.header2],
            function (i, d) {
                d.find('td.filtered').removeClass('filtered');
            });
    }
})(jQuery);