/**
 * Dependencies:
 *    datagrid
 *
 */
(function ($) {

	$.fn.treegrid = function (options, param, content) {
        if (typeof options == "string") {
            var method = $.fn.treegrid.methods[options];
            if (method) {
                return method(this, param, content);
            } else {
                return this.datagrid(options, param, content);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "treegrid");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "treegrid", {
                    options: $.extend({}, $.fn.treegrid.defaults, $.fn.treegrid.parseOptions(this), options),
                    data: []
                });
            }
            buildGrid(this);
            request(this);
            bindEvent(this);
        });
    };
    $.fn.treegrid.methods = {
        options: function (jq) {
            return $.data(jq[0], "treegrid").options;
        },
        resize: function (jq, _695) {
            return jq.each(function () {
                $(this).datagrid("resize", _695);
            });
        },
        fixRowHeight: function (jq, _696) {
            return jq.each(function () {
                setRowHeight(this, _696);
            });
        },
        loadData: function (jq, data) {
            return jq.each(function () {
                loadData(this, null, data);
            });
        },
        reload: function (jq, id, params) {
            return jq.each(function () {
                if (id) {
                    var node = $(this).treegrid("find", id);
                    if (node.children) {
                        node.children.splice(0, node.children.length);
                    }
                    var body = $(this).datagrid("getPanel").find("div.datagrid-body");
                    var tr = body.find("tr[node-id=" + id + "]");
                    tr.next("tr.treegrid-tr-tree").remove();
                    var hit = tr.find("span.tree-hit");
                    hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    expand(this, id);
                } else {
                    request(this, null, params || {});
                }
            });
        },
        reloadFooter: function (jq, _697) {
            return jq.each(function () {
//        var opts = $.data(this,"treegrid").options;
//        var dc = $.data(this,"datagrid").dc;
//        if(_697){
//          $.data(this,"treegrid").footer = _697
//        }
//        if(opts.showFooter){
//          opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
//          opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
//          if(opts.view.onAfterRender){
//            opts.view.onAfterRender.call(opts.view,this)
//          }
//          $(this).treegrid("fixRowHeight")
//        }
            })
        },
        loading: function (jq) {
            return jq.each(function () {
                $(this).datagrid("loading")
            })
        },
        loaded: function (jq) {
            return jq.each(function () {
                $(this).datagrid("loaded")
            })
        },
        getData: function (jq) {
            return $.data(jq[0], "treegrid").data
        },
//    getFooterRows:function(jq){
//      return $.data(jq[0],"treegrid").footer
//    },
        getRoot: function (jq) {
            return getRoot(jq[0])
        },
        getRoots: function (jq) {
            return getRoots(jq[0])
        },
        getParent: function (jq, id) {
            return getParent(jq[0], id)
        },
        getChildren: function (jq, id) {
            return getChildren(jq[0], id)
        },
        getSelected: function (jq) {
            return getSelected(jq[0])
        },
        getSelections: function (jq) {
            return getSelections(jq[0])
        },
        getLevel: function (jq, id) {
            return getLevel(jq[0], id)
        },
        find: function (jq, id) {
            return find(jq[0], id)
        },
        isLeaf: function (jq, id) {
            var opts = $.data(jq[0], "treegrid").options;
            var tr = opts.finder.getTr(jq[0], id);
            var hit = tr.find("span.tree-hit");
            return hit.length == 0
        },
        select: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("selectRow", id)
            })
        },
        unselect: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("unselectRow", id)
            })
        },
        collapse: function (jq, id) {
            return jq.each(function () {
                collapse(this, id)
            })
        },
        expand: function (jq, id) {
            return jq.each(function () {
                expand(this, id)
            })
        },
        toggle: function (jq, id) {
            return jq.each(function () {
                toggle(this, id)
            })
        },
        collapseAll: function (jq, id) {
            return jq.each(function () {
                collapseAll(this, id)
            })
        },
        expandAll: function (jq, id) {
            return jq.each(function () {
                expandAll(this, id)
            })
        },
        expandTo: function (jq, id) {
            return jq.each(function () {
                expandTo(this, id)
            })
        },
        append: function (jq, _698) {
            return jq.each(function () {
                append(this, _698)
            })
        },
        remove: function (jq, id) {
            return jq.each(function () {
                remove(this, id)
            })
        },
        refresh: function (jq, id) {
            return jq.each(function () {
                var opts = $.data(this, "treegrid").options;
                opts.view.refreshRow.call(opts.view, this, id)
            })
        },
        beginEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("beginEdit", id);
                $(this).treegrid("fixRowHeight", id)
            })
        },
        endEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("endEdit", id)
            })
        },
        cancelEdit: function (jq, id) {
            return jq.each(function () {
                $(this).datagrid("destroyEditor", id)
            })
        }
    };
    $.fn.treegrid.parseOptions = function (target) {
        return $.extend({}, $.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, ["treeField", {
            animate: "boolean"
        }]))
    };
    var view = $.extend({}, $.fn.datagrid.defaults.view, {
        render: function (target, _69c, _69d) {
            var opts = $.data(target, "treegrid").options;
            var _69e = $(target).datagrid("getColumnFields", _69d);
            var _69f = $.data(target, "datagrid").rowIdPrefix;
            if (_69d) {
                if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                    return
                }
            }
            var view = this;
            var _6a0 = _6a1(_69d, this.treeLevel, this.treeNodes);
            $(_69c).append(_6a0.join(""));
            function _6a1(_6a2, treeLevel, treeNodes) {
                var btable = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < treeNodes.length; i++) {
                    var row = treeNodes[i];
                    if(opts.collapseAll && row.children && row.children.length) {
                        row.state = "closed";
                    }
                    if (row.state != "open" && row.state != "closed") {
                        row.state = "open"
                    }
                    var rowStyler = opts.rowStyler ? opts.rowStyler.call(target, row) : "";
                    var _6a7 = rowStyler ? "style=\"" + rowStyler + "\"" : "";
                    var _6a8 = _69f + "-" + (_6a2 ? 1 : 2) + "-" + row[opts.idField];
                    btable.push("<tr id=\"" + _6a8 + "\" class=\"datagrid-row\" node-id=" + row[opts.idField] + " " + _6a7 + ">");
                    btable = btable.concat(view.renderRow.call(view, target, _69e, _6a2, treeLevel, row));
                    btable.push("</tr>");
                    if (row.children && row.children.length) {
                        var tt = _6a1(_6a2, treeLevel + 1, row.children);
                        var v = row.state == "closed" ? "none" : "block";
                        btable.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan=" + (_69e.length + (opts.rownumbers ? 1 : 0)) + "><div style=\"display:" + v + "\">");
                        btable = btable.concat(tt);
                        btable.push("</div></td></tr>")
                    }
                }
                btable.push("</tbody></table>");
                return btable
            }
        },
//    renderFooter:function(target,_6aa,_6ab){
//      var opts = $.data(target,"treegrid").options;
//      var rows = $.data(target,"treegrid").footer || [];
//      var fields = $(target).datagrid("getColumnFields",_6ab);
//      var ftable = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
//      for(var i = 0; i < rows.length; i++){
//        var row = rows[i];
//        row[opts.idField] = row[opts.idField] || ("foot-row-id" + i);
//        ftable.push("<tr class=\"datagrid-row\" node-id=" + row[opts.idField] + ">");
//        ftable.push(this.renderRow.call(this,target,fields,_6ab,0,row));
//        ftable.push("</tr>")
//      }
//      ftable.push("</tbody></table>");
//      $(_6aa).html(ftable.join(""))
//    },
        renderRow: function (target, fields, _6b0, _6b1, row) {
            var opts = $.data(target, "treegrid").options;
            var cc = [];
            if (_6b0 && opts.rownumbers) {
                cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>")
            }
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var col = $(target).datagrid("getColumnOption", field);
                if (col) {
                    var styler = col.styler ? (col.styler(row[field], row) || "") : "";
                    var hidden = col.hidden ? "style=\"display:none;" + styler + "\"" : (styler ? "style=\"" + styler + "\"" : "");
                    cc.push("<td field=\"" + field + "\" " + hidden + ">");
                    if (col.checkbox) {
                        var hidden = ""
                    } else {
                        var hidden = "";
                        hidden += "text-align:" + (col.align || "left") + ";";
                        if (!opts.nowrap) {
                            hidden += "white-space:normal;height:auto;"
                        } else {
                            if (opts.autoRowHeight) {
                                hidden += "height:auto;"
                            }
                        }
                    }
                    cc.push("<div style=\"" + hidden + "\" ");
                    if (col.checkbox) {
                        cc.push("class=\"datagrid-cell-check ")
                    } else {
                        cc.push("class=\"datagrid-cell " + col.cellClass)
                    }
                    if (col.checkbox) {
                        cc.push("\">");
                        if (row.checked) {
                            cc.push("<input type=\"checkbox\" checked=\"checked\"")
                        } else {
                            cc.push("<input type=\"checkbox\"")
                        }
                        cc.push(" name=\"" + field + "\" value=\"" + (row[field] != undefined ? row[field] : "") + "\"/>")
                    } else {
                        var val = null;
                        if (typeof col.formatter == "string")
                            eval("formatter=" + col.formatter);
                        else if (col.formatter) {
                            val = col.formatter(row[field], row, null, col);
                        } else if (col.editor && col.editor.options && col.editor.options.data) {
                            col.editor.options.valueField = col.editor.options.valueField || "dict_val";
                            col.editor.options.textField = col.editor.options.textField || "dict_des";
                            val = getEdtDictText(col, row[field]);
                        } else if (col.editor && col.editor.options && col.editor.options.dict) {
                            col.editor.options.valueField = "dict_val";
                            col.editor.options.textField = "dict_des";
                            val = getEdtDictText(col, row[field]);
                        } else if(col.type == "numberbox") {
							val = kui.formatNumber(row[field]);
                        } else {
                            val = row[field];
                        }

                        if (field == opts.treeField) {
                            cc.push("\">");
                            for (var j = 0; j < _6b1; j++) {
                                cc.push("<span class=\"tree-indent\"></span>")
                            }
                            if (row.state == "closed") {
                                cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
                                cc.push("<span class=\"tree-icon tree-folder " + (row.iconCls ? row.iconCls : "") + "\"></span>")
                            } else {
                                if (row.children && row.children.length) {
                                    cc.push("<span class=\"tree-hit tree-expanded\"></span>");
                                    cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (row.iconCls ? row.iconCls : "") + "\"></span>")
                                } else {
                                    cc.push("<span class=\"tree-indent\"></span>");
                                    cc.push("<span class=\"tree-icon tree-file " + (row.iconCls ? row.iconCls : "") + "\"></span>")
                                }
                            }
                            cc.push("<span class=\"tree-title\" title=\"" + val + "\">" + val + "</span>")
                        } else {
                            try {
                                if($(val).length) {
                                    cc.push("\">");
                                } else {
                                    cc.push("\" title=\"" + val + "\">");
                                }
                            } catch(ex) {
                                cc.push("\">");
                            }
                            cc.push(val);
                        }
                    }
                    cc.push("</div>");
                    cc.push("</td>")
                }
            }
            return cc.join("");
        },
        refreshRow: function (target, id) {
            var row = $(target).treegrid("find", id);
            var opts = $.data(target, "treegrid").options;
            var rowStyler = opts.rowStyler ? opts.rowStyler.call(target, row) : "";
            var styler = rowStyler ? rowStyler : "";
            var tr = opts.finder.getTr(target, id);
            tr.attr("style", styler);
            tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-cell");
                var field = $(this).attr("field");
                var col = $(target).datagrid("getColumnOption", field);
                if (col) {
                    var styler = col.styler ? (col.styler(row[field], row) || "") : "";
                    var hidden = col.hidden ? "display:none;" + styler : (styler ? styler : "");
                    $(this).attr("style", hidden);
                    var val = null;
                    if (col.formatter) {
                        val = col.formatter(row[field], row)
                    } else {
                        val = row[field]
                    }
                    if (field == opts.treeField) {
                        cell.children("span.tree-title").html(val);
                        var cls = "tree-icon";
                        var icon = cell.children("span.tree-icon");
                        if (icon.hasClass("tree-folder")) {
                            cls += " tree-folder"
                        }
                        if (icon.hasClass("tree-folder-open")) {
                            cls += " tree-folder-open"
                        }
                        if (icon.hasClass("tree-file")) {
                            cls += " tree-file"
                        }
                        if (row.iconCls) {
                            cls += " " + row.iconCls
                        }
                        icon.attr("class", cls)
                    } else {
                        cell.html(val)
                    }
                }
            });
            $(target).treegrid("fixRowHeight", id)
        },
        onBeforeRender: function (target, idValue, data) {
            if (!data) {
                return false
            }
            var opts = $.data(target, "treegrid").options;
            if (data.length == undefined) {
//        if(data.footer){
//          $.data(target,"treegrid").footer = data.footer
//        }
                if (data.total) {
                    $.data(target, "treegrid").total = data.total
                }
                data = this.transfer(target, idValue, data.rows)
            } else {
                function _6bd(_6be, _6bf) {
                    for (var i = 0; i < _6be.length; i++) {
                        var row = _6be[i];
                        row.pid = _6bf;
                        if (row.children && row.children.length) {
                            _6bd(row.children, row[opts.idField])
                        }
                    }
                }

                _6bd(data, idValue)
            }
            var node = find(target, idValue);
            if (node) {
                if (node.children) {
                    node.children = node.children.concat(data)
                } else {
                    node.children = data
                }
            } else {
                $.data(target, "treegrid").data = $.data(target, "treegrid").data.concat(data)
            }
            if (!opts.remoteSort) {
                this.sort(target, data)
            }
            this.treeNodes = data;
            this.treeLevel = $(target).treegrid("getLevel", idValue)
        },
        sort: function (target, data) {
            var opts = $.data(target, "treegrid").options;
            var opt = $(target).treegrid("getColumnOption", opts.sortName);
            if (opt) {
                var _6c1 = opt.sorter || function (a, b) {
                    return (a > b ? 1 : -1)
                };
                _6c2(data)
            }
            function _6c2(rows) {
                rows.sort(function (r1, r2) {
                    return _6c1(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1)
                });
                for (var i = 0; i < rows.length; i++) {
                    var _6c3 = rows[i].children;
                    if (_6c3 && _6c3.length) {
                        _6c2(_6c3)
                    }
                }
            }
        },
        transfer: function (target, idValue, data) {
            var opts = $.data(target, "treegrid").options;
            var rows = [];
            for (var i = 0; i < data.length; i++) {
                rows.push(data[i])
            }
            var _6c6 = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (!idValue) {
                    if (!row.pid) {
                        _6c6.push(row);
                        removeObj(rows, row);
                        i--
                    }
                } else {
                    if (row.pid == idValue) {
                        _6c6.push(row);
                        removeObj(rows, row);
                        i--
                    }
                }
            }
            var toDo = [];
            for (var i = 0; i < _6c6.length; i++) {
                toDo.push(_6c6[i])
            }
            while (toDo.length) {
                var node = toDo.shift();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.pid == node[opts.idField]) {
                        if (node.children) {
                            node.children.push(row)
                        } else {
                            node.children = [row]
                        }
                        toDo.push(row);
                        removeObj(rows, row);
                        i--
                    }
                }
            }
            return _6c6
        }
    });
    $.fn.treegrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        collapseAll: true,
        treeField: null,
        animate: false,
        singleSelect: true,
        view: view,
        isTreeGrid: true,
        pagination: false,
        deepCascadeCheck: false,
        cascadeCheck: false,
        loader: function (req, onLoadSuccess, onLoadError) {
            var opts = $(this).treegrid("options");
            if (!opts.req && !opts.url) {
                alert('请为datagrid指定一个请求方式,定义req或url');
                return false;
            }
            ajaxRequest({
                type: opts.method,
                url: opts.url,
                req: req,
                func: function (data) {
                    onLoadSuccess(data);
                },
                error: function () {
                    onLoadError.apply(this, arguments);
                }
            });
        },
        loadFilter: function (data) {
            if (typeof data.length == "number" && typeof data.splice == "function") {
                return  {
                    total: data[0].length,
                    rows: data[0]
                }
            } else if (typeof data.total == "number" && typeof data.rows.splice == "function") {
                return data;
            }
        },
        finder: {
            getTr: function (target, id, type, frozen) {
                type = type || "body";
                frozen = frozen || 0;
                var dc = $.data(target, "datagrid").dc;
                if (frozen == 0) {
                    var opts = $.data(target, "treegrid").options;
                    var tr1 = opts.finder.getTr(target, id, type, 1);
                    var tr2 = opts.finder.getTr(target, id, type, 2);
                    return tr1.add(tr2)
                } else {
                    if (type == "body") {
                        var tr = $("#" + $.data(target, "datagrid").rowIdPrefix + "-" + frozen + "-" + id);
                        if (!tr.length) {
                            tr = (frozen == 1 ? dc.body1 : dc.body2).find("tr[node-id=" + id + "]")
                        }
                        return tr
                    } else {
                        if (type == "footer") {
                            return (frozen == 1 ? dc.footer1 : dc.footer2).find("tr[node-id=" + id + "]")
                        } else {
                            if (type == "selected") {
                                return (frozen == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-selected")
                            } else {
                                if (type == "last") {
                                    return (frozen == 1 ? dc.body1 : dc.body2).find("tr:last[node-id]")
                                } else {
                                    if (type == "allbody") {
                                        return (frozen == 1 ? dc.body1 : dc.body2).find("tr[node-id]")
                                    } else {
                                        if (type == "allfooter") {
                                            return (frozen == 1 ? dc.footer1 : dc.footer2).find("tr[node-id]")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            getRow: function (target, id) {
                return $(target).treegrid("find", id)
            }
        },
        onBeforeLoad: function (row, param) {
        },
        onLoadSuccess: function (data) {
            //原先的事件放置onLoadClickEvent事件中了。
        },

        onLoadClickEvent:function(data){
            var target = $(this);
            var panel = $(this).datagrid("getPanel");
            var opts = $.data(this, "treegrid").options;
            var idField = opts.idField;//这里的idField其实就是API里方法的id参数
            var gridBody = panel.find("div.datagrid-body");

            gridBody.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").click(function (e) {
                if (opts.singleSelect) return;//单选不管
                if (opts.cascadeCheck || opts.deepCascadeCheck) {
                    var id = $(this).parent().parent().parent().attr("node-id");
                    var status = false;
                    if ($(this).attr("checked")) status = true;

                    /**
                     * 级联选择父节点
                     * @param {Object} target
                     * @param {Object} id 节点ID
                     * @param {Object} status 节点状态，true:勾选，false:未勾选
                     * @return {TypeName}
                     */
                    function selectParent(target, id, idField, status) {
                        var parent = target.treegrid('getParent', id);
                        if (parent) {
                            var parentId = parent[idField];
                            var hasChecked = hasChildrenChecked(target,parentId);

                            if (status || hasChecked){
                                target.treegrid('select', parentId);
                            }else{
								var curRow = target.treegrid("find",id);  //当前行对象

								var callback = true;
								if(opts.curRowCascadeCheck){  //将组件传来的函数表达式返回结果
									callback = opts.curRowCascadeCheck(curRow);
								}
								if(callback){
									target.treegrid('unselect', parentId);
								}
                            }
							selectParent(target, parentId, idField, status);
                        }
                    }

                    /**
                     * 检查某节点下是否还有选中的子节点 ray add
                     * @param target
                     * @param id  节点ID
                     * @returns {boolean}
                     */
                    function hasChildrenChecked(target,id){
                        var children = target.treegrid('getChildren', id),
                            currentChk, currentTr, childrenTr, childrenChks;

                        if(!children.length) {
                            return false;
                        }

                        currentChk = gridBody.find("div.datagrid-cell-check input[type=checkbox][value='" + id + "']");
                        currentTr = currentChk.closest("tr.datagrid-row");
                        childrenTr = currentTr.next();
                        childrenChks = childrenTr.find("div.datagrid-cell-check input[type=checkbox]").filter(function() {
                            return $(this).prop("checked");
                        });

                        return !!childrenChks.length
                    }

                    /**
                     * 级联选择子节点
                     * @param {Object} target
                     * @param {Object} id 节点ID
                     * @param {Object} deepCascade 是否深度级联
                     * @param {Object} status 节点状态，true:勾选，false:未勾选
                     * @return {TypeName}
                     */
                    function selectChildren(target, id, idField, deepCascade, status) {
                        //深度级联时先展开节点
                        //if (status && deepCascade) {
                            //target.treegrid('expand', id);
                        //}
                        //根据ID获取下层孩子节点
                        var children = target.treegrid('getChildren', id);
                        for (var i = 0; i < children.length; i++) {
                            var childId = children[i][idField];
                            if (status){
                                target.treegrid('select', childId);
                            }else{
                                target.treegrid('unselect', childId);
                            }
                            //selectChildren(target, childId, idField, deepCascade, status);//递归选择子节点

                        }
                    }
                    //ray 判断当前行是否选中与未选中
                    status ? target.treegrid('select',id):target.treegrid('unselect',id);
                    selectChildren(target, id, idField, opts.deepCascadeCheck, status);
                    //级联选择父节点需放在判断子节点的后面
                    selectParent(target, id, idField, status);
                }
                e.stopPropagation();//停止事件传播
            });

            //target.treegrid('collapseAll');
        },
        onLoadError: function () {
        },
        onBeforeCollapse: function (row) {
        },
        onCollapse: function (row) {
        },
        onBeforeExpand: function (row) {
        },
        onExpand: function (row) {
        },
        onClickRow: function (row) {

        },
        onDblClickRow: function (row) {
        },
        onClickCell: function (_6cf, row) {
        },
        onDblClickCell: function (_6d0, row) {
        },
        onContextMenu: function (e, row) {
        },
        onBeforeEdit: function (row) {
        },
        onAfterEdit: function (row, _6d1) {
        },
        onCancelEdit: function (row) {
        }
    });

    function contain(anArray, option) {
        for (var i = 0, len = anArray.length; i < len; i++) {
            if (anArray[i] == option) {
                return i
            }
        }
        return -1
    }

    function removeObj(anArray, option) {
        var index = contain(anArray, option);
        if (index != -1) {
            anArray.splice(index, 1)
        }
    }

    function buildGrid(target) {
        var opts = $.data(target, "treegrid").options;
        $(target).datagrid($.extend({}, opts, {
            url: null,
            loader: function () {
                return false
            },
            onLoadSuccess: function () {
            },
            onResizeColumn: function (field, width) {
                setRowHeight(target);
                opts.onResizeColumn.call(target, field, width)
            },
            onSortColumn: function (sort, order) {
                opts.sortName = sort;
                opts.sortOrder = order;
                if (opts.remoteSort) {
                    request(target)
                } else {
                    var data = $(target).treegrid("getData");
                    loadData(target, 0, data)
                }
                opts.onSortColumn.call(target, sort, order)
            },
            onBeforeEdit: function (rowIndex, row) {
                if (opts.onBeforeEdit.call(target, row) == false) {
                    return false
                }
            },
            onAfterEdit: function (_623, row, _624) {
                opts.onAfterEdit.call(target, row, _624)
            },
            onCancelEdit: function (_625, row) {
                opts.onCancelEdit.call(target, row)
            },
            onSelect: function (_626) {
                opts.onSelect.call(target, find(target, _626))
            },
            onUnselect: function (_627) {
                opts.onUnselect.call(target, find(target, _627))
            },
            onSelectAll: function () {
                opts.onSelectAll.call(target, $.data(target, "treegrid").data)
            },
            onUnselectAll: function () {
                opts.onUnselectAll.call(target, $.data(target, "treegrid").data)
            },
            onCheck: function (_628) {
                opts.onCheck.call(target, find(target, _628))
            },
            onUncheck: function (_629) {
                opts.onUncheck.call(target, find(target, _629))
            },
            onCheckAll: function () {
                opts.onCheckAll.call(target, $.data(target, "treegrid").data)
            },
            onUncheckAll: function () {
                opts.onUncheckAll.call(target, $.data(target, "treegrid").data)
            },
            onClickRow: function (_62a) {
                //ray 选择行时需触发选择框一样的效果
                var panel = $(this).datagrid("getPanel");
                var opts = $.data(this, "treegrid").options;
                var idField = opts.idField;//这里的idField其实就是API里方法的id参数
                var gridBody = panel.find("div.datagrid-body");
                var row = find(target, _62a);
                var chk = gridBody.find("div.datagrid-cell-check input[type=checkbox]").filter("[value="+row[idField]+"]");
                chk.triggerHandler("click");

                opts.onClickRow.call(target, row);
            },
            onDblClickRow: function (_62b) {
                opts.onDblClickRow.call(target, find(target, _62b))
            },
            onClickCell: function (_62c, _62d) {
                opts.onClickCell.call(target, _62d, find(target, _62c))
            },
            onDblClickCell: function (_62e, _62f) {
                opts.onDblClickCell.call(target, _62f, find(target, _62e))
            },
            onRowContextMenu: function (e, _630) {
                opts.onContextMenu.call(target, e, find(target, _630))
            }
        }));
        if (opts.pagination) {
            var pager = $(target).datagrid("getPager");
            pager.pagination({
                pageNumber: opts.pageNumber,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                onSelectPage: function (number, size) {
                    opts.pageNumber = number;
                    opts.pageSize = size;
                    request(target);
                }
            });
            opts.pageSize = pager.pagination("options").pageSize;
        }
    }

    function setRowHeight(target, idValue) {
        var opts = $.data(target, "datagrid").options;
        var dc = $.data(target, "datagrid").dc;
        if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight)) {
            if (idValue != undefined) {
                var children = getChildren(target, idValue);
                for (var i = 0; i < children.length; i++) {
                    setHeight(children[i][opts.idField])
                }
            }
        }
        $(target).datagrid("fixRowHeight", idValue);
        function setHeight(idValue) {
            var tr1 = opts.finder.getTr(target, idValue, "body", 1);
            var tr2 = opts.finder.getTr(target, idValue, "body", 2);
            tr1.css("height", "");
            tr2.css("height", "");
            var height = Math.max(tr1.height(), tr2.height());
            tr1.css("height", height);
            tr2.css("height", height);
        }
    }

    function createRowNumber(target) {
        var dc = $.data(target, "datagrid").dc;
        var opts = $.data(target, "treegrid").options;
        if (!opts.rownumbers) {
            return
        }
        dc.body1.find("div.datagrid-cell-rownumber").each(function (i) {
            $(this).html(i + 1)
        })
    }

    function bindEvent(target) {
        var dc = $.data(target, "datagrid").dc;
        //        var girdClickEvent = dc.body1.add(dc.body2).data("events").click[0].handler;
        var gridBodys = dc.body1.add(dc.body2);
        var girdClickEvent = ($.data(gridBodys[0], "events") || $._data(gridBodys[0], "events")).click[0].handler;
        gridBodys.bind("mouseover",
            function (e) {
                var tt = $(e.target);
                var tr = tt.closest("tr.datagrid-row");
                if (!tr.length) {
                    return
                }
                if (tt.hasClass("tree-hit")) {
                    tt.hasClass("tree-expanded") ? tt.addClass("tree-expanded-hover") : tt.addClass("tree-collapsed-hover")
                }
                e.stopPropagation()
            }).bind("mouseout",
            function (e) {
                var tt = $(e.target);
                var tr = tt.closest("tr.datagrid-row");
                if (!tr.length) {
                    return
                }
                if (tt.hasClass("tree-hit")) {
                    tt.hasClass("tree-expanded") ? tt.removeClass("tree-expanded-hover") : tt.removeClass("tree-collapsed-hover")
                }
                e.stopPropagation()
            }).unbind("click").bind("click", function (e) {
                var tt = $(e.target);
                var tr = tt.closest("tr.datagrid-row");
                if (!tr.length) {
                    return
                }
                if (tt.hasClass("tree-hit")) {
                    toggle(target, tr.attr("node-id"))
                } else {
                    girdClickEvent(e)
                }
                e.stopPropagation()
            })
    }

    function _643(target, _645) {
        var opts = $.data(target, "treegrid").options;
        var tr1 = opts.finder.getTr(target, _645, "body", 1);
        var tr2 = opts.finder.getTr(target, _645, "body", 2);
        var _646 = $(target).datagrid("getColumnFields", true).length + (opts.rownumbers ? 1 : 0);
        var _647 = $(target).datagrid("getColumnFields", false).length;
        _648(tr1, _646);
        _648(tr2, _647);
        function _648(tr, _649) {
            $("<tr class=\"treegrid-tr-tree\">" + "<td style=\"border:0px\" colspan=\"" + _649 + "\">" + "<div></div>" + "</td>" + "</tr>").insertAfter(tr)
        }
    }

    function loadData(target, idValue, data, _64d) {
        var opts = $.data(target, "treegrid").options;        
		var state = $.data(target, "datagrid");
		var dc = state.dc;
        data = opts.loadFilter.call(target, data, idValue);
		state.data = data;
        var node = find(target, idValue);
        if (node) {
            var _64e = opts.finder.getTr(target, idValue, "body", 1);
            var _64f = opts.finder.getTr(target, idValue, "body", 2);
            var cc1 = _64e.next("tr.treegrid-tr-tree").children("td").children("div");
            var cc2 = _64f.next("tr.treegrid-tr-tree").children("td").children("div")
        } else {
            var cc1 = dc.body1;
            var cc2 = dc.body2
        }
        if (!_64d) {
            $.data(target, "treegrid").data = [];
            cc1.empty();
            cc2.empty()
        }
        if (opts.view.onBeforeRender) {
            opts.view.onBeforeRender.call(opts.view, target, idValue, data)
        }
        opts.view.render.call(opts.view, target, cc1, true);
        opts.view.render.call(opts.view, target, cc2, false);
//    if(opts.showFooter){
//      opts.view.renderFooter.call(opts.view,target,dc.footer1,true);
//      opts.view.renderFooter.call(opts.view,target,dc.footer2,false)
//    }
        if (opts.view.onAfterRender) {
            opts.view.onAfterRender.call(opts.view, target)
        }
        opts.onLoadSuccess.call(target, node, data);
        opts.onLoadClickEvent.call(target, node, data);  //ray
        if (!idValue && opts.pagination) {
            var total = $.data(target, "treegrid").total;
            var pager = $(target).datagrid("getPager");
            if (pager.pagination("options").total != total) {
                pager.pagination({
                    total: total
                })
            }
        }
        setRowHeight(target);
        createRowNumber(target);
        $(target).treegrid("autoSizeColumn")
    }

    function request(target, idValue, queryParams, _655, _656) {
        var opts = $.data(target, "treegrid").options;
        var body = $(target).datagrid("getPanel").find("div.datagrid-body");
        if (queryParams) {
            opts.queryParams = queryParams
        }
        var params = $.extend({}, opts.queryParams);
        if (opts.pagination) {
            $.extend(params, {
                page: opts.pageNumber,
                rows: opts.pageSize
            })
        }
        if (opts.sortName) {
            $.extend(params, {
                sort: opts.sortName,
                order: opts.sortOrder
            })
        }
        var row = find(target, idValue);
        if (opts.onBeforeLoad.call(target, row, params) == false) {
            return
        }
        //解析req参数
        if (opts.req && opts.req.length > 0) {
            for (var i = 0; i < opts.req.length; i++) {
                var servicesObj = opts.req[i];
                for (var j in params) {
                    servicesObj[j] = params[j];
                }
            }
        }
        var folder = body.find("tr[node-id=" + idValue + "] span.tree-folder");
        folder.addClass("tree-loading");
        $(target).treegrid("loading");
        var _659 = opts.loader.call(target, opts.req, function (data) {
            folder.removeClass("tree-loading");
            $(target).treegrid("loaded");
            loadData(target, idValue, data, _655);
            if (_656) {
                _656()
            }
        }, function () {
            folder.removeClass("tree-loading");
            $(target).treegrid("loaded");
            opts.onLoadError.apply(target, arguments);
            if (_656) {
                _656()
            }
        });
        if (_659 == false) {
            folder.removeClass("tree-loading");
            $(target).treegrid("loaded")
        }
    }

    function getRoot(target) {
        var rows = getRoots(target);
        if (rows.length) {
            return rows[0]
        } else {
            return null
        }
    }

    function getRoots(target) {
        return $.data(target, "treegrid").data
    }

    function getParent(target, idValue) {
        var row = find(target, idValue);
        if (row.pid) {
            return find(target, row.pid)
        } else {
            return null
        }
    }

    function getChildren(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var body = $(target).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
        var _663 = [];
        if (idValue) {
            _664(idValue)
        } else {
            var roots = getRoots(target);
            for (var i = 0; i < roots.length; i++) {
                _663.push(roots[i]);
                _664(roots[i][opts.idField])
            }
        }
        function _664(param) {
            var _667 = find(target, param);
            if (_667 && _667.children) {
                for (var i = 0, len = _667.children.length; i < len; i++) {
                    var _668 = _667.children[i];
                    _663.push(_668);
                    _664(_668[opts.idField])
                }
            }
        }

        return _663
    }

    function getSelected(target) {
        var rows = getSelections(target);
        if (rows.length) {
            return rows[0]
        } else {
            return null
        }
    }

    function getSelections(target) {
        var rows = [];
        var panel = $(target).datagrid("getPanel");
        panel.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function () {
            var id = $(this).attr("node-id");
            rows.push(find(target, id))
        });
        return rows
    }

    function getLevel(target, param) {
        if (!param) {
            return 0
        }
        var opts = $.data(target, "treegrid").options;
        var view = $(target).datagrid("getPanel").children("div.datagrid-view");
        var node = view.find("div.datagrid-body tr[node-id=" + param + "]").children("td[field=" + opts.treeField + "]");
        return node.find("span.tree-indent,span.tree-hit").length
    }

    function find(target, param) {
        var opts = $.data(target, "treegrid").options;
        var data = $.data(target, "treegrid").data;
        var cc = [data];
        while (cc.length) {
            var c = cc.shift();
            for (var i = 0; i < c.length; i++) {
                var node = c[i];
                if (node[opts.idField] == param) {
                    return node
                } else {
                    if (node["children"]) {
                        cc.push(node["children"])
                    }
                }
            }
        }
        return null
    }

    function collapse(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var row = find(target, idValue);
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find("span.tree-hit");
        if (hit.length == 0) return;	// is leaf
        if (hit.hasClass("tree-collapsed")) return;	// has collapsed
        if (opts.onBeforeCollapse.call(target, row) == false) return;
        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        hit.next().removeClass("tree-folder-open");
        row.state = "closed";
        tr = tr.next("tr.treegrid-tr-tree");
        var cc = tr.children("td").children("div");
        if (opts.animate) {
            cc.slideUp("normal", function () {
                $(target).treegrid("autoSizeColumn");
                setRowHeight(target, idValue);
                opts.onCollapse.call(target, row)
            })
        } else {
            cc.hide();
            $(target).treegrid("autoSizeColumn");
            setRowHeight(target, idValue);
            opts.onCollapse.call(target, row)
        }
    }

    function expand(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find("span.tree-hit");
        var row = find(target, idValue);
        if (hit.length == 0) return;	// is leaf
        if (hit.hasClass("tree-expanded")) return;	// has expanded
        if (opts.onBeforeExpand.call(target, row) == false) return;
        hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        hit.next().addClass("tree-folder-open");
        var subtree = tr.next("tr.treegrid-tr-tree");
        if (subtree.length) {
            var cc = subtree.children("td").children("div");
            _67a(cc)
        } else {
            _643(target, row[opts.idField]);
            var subtree = tr.next("tr.treegrid-tr-tree");
            var cc = subtree.children("td").children("div");
            cc.hide();
            request(target, row[opts.idField], {
                id: row[opts.idField]
            }, true, function () {
                if (cc.is(":empty")) {
                    subtree.remove()
                } else {
                    _67a(cc)
                }
            })
        }
        function _67a(cc) {
            row.state = "open";
            if (opts.animate) {
                cc.slideDown("normal", function () {
                    $(target).treegrid("autoSizeColumn");
                    setRowHeight(target, idValue);
                    opts.onExpand.call(target, row);
                })
            } else {
                cc.show();
                $(target).treegrid("autoSizeColumn");
                setRowHeight(target, idValue);
                opts.onExpand.call(target, row);
            }
        }
    }

    function toggle(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var tr = opts.finder.getTr(target, idValue);
        var hit = tr.find("span.tree-hit");
        if (hit.hasClass("tree-expanded")) {
            collapse(target, idValue);
        } else {
            expand(target, idValue);
        }
    }

    function collapseAll(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var children = getChildren(target, idValue);
        if (idValue) {
            children.unshift(find(target, idValue))
        }
        for (var i = 0; i < children.length; i++) {
            collapse(target, children[i][opts.idField])
        }
    }

    function expandAll(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var children = getChildren(target, idValue);
        if (idValue) {
            children.unshift(find(target, idValue))
        }
        for (var i = 0; i < children.length; i++) {
            expand(target, children[i][opts.idField])
        }
    }

    function expandTo(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var ids = [];
        var p = getParent(target, idValue);
        while (p) {
            var id = p[opts.idField];
            ids.unshift(id);
            p = getParent(target, id)
        }
        for (var i = 0; i < ids.length; i++) {
            expand(target, ids[i])
        }
    }

    function append(target, _68a) {
        var opts = $.data(target, "treegrid").options;
        if (_68a.parent) {
            var body = $(target).datagrid("getPanel").find("div.datagrid-body");
            var tr = body.find("tr[node-id=" + _68a.parent + "]");
            if (tr.next("tr.treegrid-tr-tree").length == 0) {
                _643(target, _68a.parent)
            }
            var cell = tr.children("td[field=" + opts.treeField + "]").children("div.datagrid-cell");
            var _68b = cell.children("span.tree-icon");
            if (_68b.hasClass("tree-file")) {
                _68b.removeClass("tree-file").addClass("tree-folder");
                var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_68b);
                if (hit.prev().length) {
                    hit.prev().remove()
                }
            }
        }
        loadData(target, _68a.parent, _68a.data, true);
    }

    function remove(target, idValue) {
        var opts = $.data(target, "treegrid").options;
        var tr = opts.finder.getTr(target, idValue);
        tr.next("tr.treegrid-tr-tree").remove();
        tr.remove();
        var result = del(idValue);
        if (result) {
            if (result.children.length == 0) {
                tr = opts.finder.getTr(target, result[opts.idField]);
                tr.next("tr.treegrid-tr-tree").remove();
                var cell = tr.children("td[field=" + opts.treeField + "]").children("div.datagrid-cell");
                cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                cell.find(".tree-hit").remove();
                $("<span class=\"tree-indent\"></span>").prependTo(cell)
            }
        }
        createRowNumber(target);
        function del(id) {
            var cc;
            var parent = getParent(target, idValue);
            if (parent) {
                cc = parent.children
            } else {
                cc = $(target).treegrid("getData")
            }
            for (var i = 0; i < cc.length; i++) {
                if (cc[i][opts.idField] == id) {
                    cc.splice(i, 1);
                    break
                }
            }
            return parent
        }
    }

    function getEdtDictText(col, fieldValue) {
        var dictData = col.editor.options.data;
        var dictValue = fieldValue;
        if (!dictData) return dictValue;
        var dictText = fieldValue;
        for (var n = 0; n < dictData.length; n++) {
            if (dictData[n][col.editor.options.valueField] == dictValue) {
                dictText = dictData[n][col.editor.options.textField];
            }
        }
        return dictText;
    }



    
})(jQuery);