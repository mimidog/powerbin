/**
 * form - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 * 'panel','fieldset','linkbutton','textinput','validatebox','numberbox','combobox','combotree','combogrid','datebox'
 */

(function ($) {

    $.fn.sform = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.sform.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            if (!$.data(this, 'sform')) {
                options = $.data(this, 'sform', {
                    options: $.extend({}, $.extend({}, $.fn.sform.defaults), $.fn.sform.parseOptions(this), options)
                });
            }
            create(this);
        });
    };

    $.fn.sform.parseOptions = function (target) {
        var jq = $(target);
        return $.extend({}, $.parser.parseOptions(target, [
            {
                colNumbers: "number"
            }
        ], {
            queryCols: (jq.attr("queryCols") ? eval(jq.attr("queryCols")) : undefined),
            toolbar: (jq.attr("toolbar") ? eval(jq.attr("toolbar")) : undefined),
            req: (jq.attr("req") ? eval(jq.attr("req")) : undefined)
        }));
    };

    $.fn.sform.methods = {
        load: function (jq, data) {
            return jq.each(function () {
                load(this, data);
            });
        },
        getData: function (jq) {
            return getData(jq[0]);
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        },
        reload: function (jq) {
            return jq.each(function () {
                reload(this);
            });
        },
        toForm: function (jq) {
            return jq.each(function () {
                toForm(this);
            });
        },
        resize: function (jq, param) {
            return jq.each(function () {
                setSize(jq[0], param);
            });
        }
    };

    $.fn.sform.defaults = {
        url: undefined,
        method: undefined,
        dataType: undefined,
        req: [],
        queryCols: [],
        colNumbers: 3,
        required: false, // 初始化sform时是否包含调用一次reload()。

        maxLabel: 0,
        cellWidth: 248,
        onInitSuccess: function () {
        },
        onLoadSuccess: function (data) {
        },
        onBeforeRequest: function (req) {
        },
        onBeforeLoadData: function (data) {
        },
        onRequestError: function () {
        }
    };

    function create(target) {
        var opts = $.data(target, 'sform').options;
        var columns = opts.columns;
        if (!columns) {
            return;
        }
        var cols = columns[0].cols;
        opts.$table = $('<div style="display: inline-block;width: "+(Number(opts.colNumbers))*(Number(opts.cellWidth))+20"px;></div>').appendTo(target);
        var $table = $('<table></table>');
        var $tr = $("<tr></tr>");
        var cno = opts.colNumbers ? Number(opts.colNumbers) : 2,colIndex = 1;
        for (var i = 0, len = cols.length; i < len; i++) {
            var col = cols[i];
            var colspanNum = col.colspan;
            var ecol = colIndex % cno;
            ecol = ecol == 0 ? cno : ecol;
            if (colspanNum != undefined && colspanNum != '0') {
                colspanNum=colspanNum > cno ? cno : colspanNum;
                var $td;
                if (ecol + (colspanNum - 1) > cno) {
                    colIndex = colIndex + (cno - ecol) + 1;
                    colIndex = colIndex + (colspanNum - 1);
                    $td = $('<td colspan="' + colspanNum + '" name="' + (col.field || '') + '"><div class="sform_td_div"><div class="sform_title_div">' + (col.title || '') + ':</div><div class="sform_content_div"></div></div></td>');
                    $table.append($tr);
                    $tr = $("<tr></tr>");
                    $tr.append($td);
                } else {
                    $td = $('<td colspan="' + colspanNum + '" name="' + (col.field || '') + '"><div class="sform_td_div"><div class="sform_title_div">' + (col.title || '') + ':</div><div class="sform_content_div"></div></div></td>');
                    colIndex = colIndex + (colspanNum - 1);
                    if (ecol == 1 && colIndex != 1) {
                        $table.append($tr);
                        $tr = $("<tr></tr>");
                    }
                    $tr.append($td);
                }
            } else {
                $td = $('<td name="' + (col.field || '') + '"><div class="sform_td_div"><div class="sform_title_div">' + (col.title || '') + ':</div><div class="sform_content_div"></div></div></td>');
                if (ecol == 1 && colIndex != 1) {
                    $table.append($tr);
                    $tr = $("<tr></tr>");
                }
                $tr.append($td);
            }
            colIndex++;
        }
        $table.append($tr);
        opts.$table.append($table);
        if (opts.required) {
            reload(target);
        } else if (opts.data) {
            load(target, opts.data);
        } else {
            setSize(target);
        }
        opts.onInitSuccess.call(target);
    }


    function setSize(target, param) {
        var opts = $.data(target, 'sform').options;
        $.extend(opts, param);
        var $table = opts.$table;
        var temp_width = [];
        $table.find("tr").each(function (i) {
            var $td = $("td", this);
            var temp = [];

            $td.each(function (i) {
                var colspan = $(this).attr("colspan");

                var _h = $(this).find(".sform_content_div")[0].scrollHeight;
                temp.push(_h);
                temp.sort(function (a, b) {
                    if (a > b) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                var _width = _getStrWidth($(this).find(".sform_title_div")[0].innerHTML);
                temp_width.push(_width);
                var _height = $(this).find(".sform_title_div")[0].scrollHeight;
                if (_h < _height) {
                    $(this).find(".sform_content_div").height(_height);
                } else {
                    $(this).find(".sform_content_div").height(temp[temp.length - 1]);
                }
            });

        });
        temp_width.sort(function (a, b) {
            if (a > b) {
                return 1;
            } else {
                return -1;
            }
        });

        var max_width = temp_width[temp_width.length - 1];
        opts.maxLabel = max_width;
        if (opts.maxLabel > opts.cellWidth) {
            $table.find("td").find(".sform_title_div").width(250);
        } else {
            $table.find("td").find(".sform_title_div").width(opts.maxLabel);
        }
        var _w = opts.cellWidth - $table.find("td").find(".sform_title_div").width() - 5;
        $table.find("td").find(".sform_content_div").width(_w);
        $table.find("td").find(".sform_td_div").width(opts.maxLabel + _w + 5);
        var titleWidth = $table.find("td").find(".sform_title_div").width();
        $table.find("tr").each(function (i) {
            var $td = $("td", this);
            $td.each(function (i) {
                var colspanNumber = $(this).attr("colspan");
                if (colspanNumber != undefined) {
                    var colspanWidth = Number(colspanNumber) * opts.cellWidth - titleWidth;
                    $(this).find(".sform_content_div").width(colspanWidth);
                    $(this).find(".sform_td_div").width(opts.maxLabel + colspanWidth + 5);
                }
            });
        });
    }

    function _getStrWidth(str) {
        str = str || '';
        var strs = str.match(/[\x00-\xFF]/g);
        return (str.length * 13 - (strs ? strs.length * 7 : 0)) + 5;
    }

    function reload(target) {
        var opts = $.data(target, 'sform').options;
        var req = opts.req;
        if ($.isArray(req) && req.length && opts.onBeforeRequest.call(target, req) !== false) {
            ajaxRequest({
                type: opts.method,
                url: opts.url,
                dataType: opts.dataType,
                req: req,
                func: function (data) {
                    if (data[0].data[0].length) {
                        load(target, data[0].data[0][0]);
                    }
                },
                error: function () {
                    setSize(target);
                    opts.onRequestError.call(target);
                }
            });
        } else if (opts.data && opts.onBeforeLoadData.call(target, opts.data) !== false) {
            load(target, data);
        } else {
            setSize(target);
        }
    }

    function load(target, data) {
        if (!data) {
            return;
        }
        var opts = $.data(target, 'sform').options;
        opts.data = data;
        var cols = opts.queryCols[0].cols;
        var col;
        var name, value, type, dicts;
        opts.$table.find("td").each(function (i) {
            name = $(this).attr('name');
            value = data[name];
            if (value != undefined) {
                col = cols[i];
                type = col.type;
                if (col.formatter) {
                    if (typeof col.formatter == "string") {
                        col.formatter = eval("(" + col.formatter + ")");
                    }
                    if ($.isFunction(col.formatter)) {
                        value = col.formatter.call(this, value, null, name, col);
                    }
                }
                if (_views[type]) {
                    value = _views[type](col.editor, value);
                }
                $(this).find('.sform_content_div').html(value);
            }
        });

        setSize(target);

        opts.onLoadSuccess.call(target, data);
    }

    var _views = {
        // combobox
        combobox: function (editor, value) {
            var valueField = editor.options.valueField || 'dict_val';
            var textField = editor.options.textField || 'dict_des';
            if (editor && editor.options && editor.options.data) {
                var dicts = editor.options.data;
                if (editor.options.multiple) {
                    var values;
                    if (value.indexOf(',') != -1) {
                        values = value.split(',');
                    } else {
                        values = value.split('');
                    }
                    var returnValue = [];
                    for (var i = 0, len = values.length; i < len; i++) {
                        for (var j = 0, lenJ = dicts.length; j < lenJ; j++) {
                            if (values[i] == dicts[j][valueField]) {
                                var text = dicts[j][textField] || "";
                                returnValue.push(text.trim());
                                break;
                            }
                        }
                    }
                    if (value == "@") {
                        $.each(dicts, function (index, item) {
                            returnValue.push(item[textField].trim());
                        });
                    }
                    if (returnValue.length > 0) {
                        return returnValue.join(',');
                    }
                } else {
                    for (var i = 0, len = dicts.length; i < len; i++) {
                        if (dicts[i][valueField] == value) {
                            var text = dicts[i][textField] || "";
                            return text.trim();
                        }
                    }
                }
            }
            return value;
        },
        //
        combotree: function (editor, value) {
            var nodeId = editor.options.nodeId || 'nodeId';
            var nodeName = editor.options.nodeName || 'nodeName';
            if (editor && editor.options && editor.options.data) {
                var dicts = editor.options.data;
                if (editor.options.multiple) {
                    var values;
                    if (value.indexOf(',') != -1) {
                        values = value.split(',');
                    } else {
                        values = value.split('');
                    }
                    var returnValue = [];
                    for (var i = 0, len = values.length; i < len; i++) {
                        for (var j = 0, lenJ = dicts.length; j < lenJ; j++) {
                            if (values[i] == dicts[j][nodeId]) {
                                var text = dicts[j][nodeName] || "";
                                returnValue.push(text.trim());
                                break;
                            }
                        }
                    }
                    if (returnValue.length > 0) {
                        return returnValue.join(',');
                    }
                } else {
                    for (var i = 0, len = dicts.length; i < len; i++) {
                        if (dicts[i][nodeId] == value) {
                            var text = dicts[i][nodeName] || "";
                            return text.trim();
                        }
                    }
                }
            }
            return value;
        },
        //
        timespinner: function (editor, value) {
            var returnValue = [];
            while (value = value.replace(/(.{2}$)|(^.$)/, function (val) {
                returnValue.unshift(val);
                return '';
            })) {
            }
            return returnValue.join(':');
        }
    };

    function getData(target) {
        var opts = $.data(target, 'sform').options;
        return opts.data;
    }

    function clear(target) {
        var opts = $.data(target, 'sform').options;
        opts.$table.find('td').find('.sform_content_div').text('');
    }

    function toForm(target) {
        var opts = $.data(target, 'sform').options;
        $(target).empty().form(opts);
    }

})(jQuery);
