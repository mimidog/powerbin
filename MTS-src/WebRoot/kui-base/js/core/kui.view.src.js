/**
 * view builder - kui base js library
 * For initial view component with component configuration which request from back-end.
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 */

(function($) {
    /**
	 * 业务权限字典对应
	 */
    var rights = {
        "add": "3",
        "edit": "4",
        "remove": "5",
        "export": "6",
        "print": "7",
        "import": "8"
    };
    /**
	 * 表格菜单权限字典
	 */
    var gridMenuFrag = {
        "export": /(,fileExport)|(fileExport,)/,
        "print": /(,printReport)|(printReport,)/,
        "import": /(,fileImport)|(fileImport,)/
    };
    var defaultGridMenu = "restoreDefault,freezeColumns,hideColumns,hideCols,fileExport,printReport";
    /**
	 * extend $.parser
	 */
    $.extend($.parser, {
        //onComplete: function(context){$('.kui-form,.kui-validatebox,.kui-linkbutton').css({visibility:'visible'});},
        director: function(context, config, callback) {		
            var views = [],
            viewIds = [];
            var iconfig = $.extend({},config);
			
            for (var i = 0; i < $.parser.plugins.length; i++) {
                var name = $.parser.plugins[i];
                $('.kui-' + name, context).each(function() {
                    var $jq = $(this);
                    views.push({
                        name: name,
                        jq: $jq
                    });
                    if (name == "datagrid"||name=="reportgrid" || name == "form" || name == "treegrid" || name == "sform") {
                        var viewId = $jq.attr("id");
                        if (viewId && viewId.indexOf("_") != -1) {
                            viewIds.push(viewId);
                        }
                    }
                });
            }
			
            if (views.length && window.kuiloader) {
                if (!context && !config) {
                    var service = $.parser.getUrlService();
                    if (service) {
                        iconfig["service"] = service;
                    }
                }
                var configs = iconfig.config ? iconfig.config: $.parser.getConfigs(viewIds, iconfig && iconfig.service ? iconfig.service: "");

                kuiloader.loadJs($.parser.getScriptConfig(viewIds, configs), function() {
                    $.builder.build(views, configs, context, iconfig && iconfig.record ? iconfig.record: undefined, callback);
                });
            } else {
                $.parser.onComplete.call($.parser, context, callback);
            }
        },

        getScriptConfig: function(viewIds, viewConfig) {
            var scriptArr = [],
                script;
            if(!viewIds.length) {
                return [];
            }

            if(1 === viewIds.length) {
                script = viewConfig.script;
                if(script) {
                    return script.split(",");
                }
                return [];
            }

            $.each(viewIds, function() {
                script = viewConfig[this].script;
                if(script) {
                    $.merge(scriptArr, script.split(","));
                }
            });

            return scriptArr;
        },

        getUrlService: function() {
            var reg = new RegExp("(^|&)service=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

        //get configuration with common service and specify service
        getConfigs: function(ids, service) {
            var configs = {};
            if (ids.length == 0 && !service) return configs;
            ajaxRequest({
                async: false,
                func: function(response) {
                    configs = response[1]["CONFIG"];
                },
                req: [{
                    "service": (service ? service: "P9999998"),
                    "view_ids": (ids ? ids.join(",") : "")
                }],
                error: function() {
                	alert("获取view配置出错！");
                }
            });
            return configs;
        }
    });

    /**
	 * Concrete builder of view
	 */
    $.builder = {
        // building component
        build: function(views, configs, context, record, callback) {
            var names = [],
            uioptions = {};
            for (var i = 0; i < views.length; i++) {
                var name = views[i].name;
                if(-1 === $.inArray(name, names)) {
                    names.push(name);
                }
            }
            if (context && typeof context == "object") { //form,datagrid元素配置
                uioptions = $.data(context[0], "uioptions") || {};
            }			
            kuiloader.load(names, function(param) {
                for (var i = 0; i < views.length; i++) {
                    var name = views[i].name;
                    var $jq = views[i].jq;
                    var id = $jq.attr("id");
                    var field = $jq.attr("name");
                    var config = {};
                    var backConfigs = $.extend(true, {},configs);
                    if (!$.isEmptyObject(configs)) {
                        if (typeof configs["id"] == "string" && configs["render"] == name) {
                            if (id == configs["id"]||id =="") config = $.builder.format[name](configs);
                        } else if (configs[id] && configs[id].render == name) {
                            config = $.builder.format[name](configs[id]);
                        } else if (configs["common"] && configs["render"] == name) {
                            config = configs;
                        }
                    }
                    if (field) {
                        config = $.extend({},
                        config, uioptions[field] || {});
                    }
                    if (record) {
                        config["record"] = record;
                    }

                    if ($jq[name]) {
                        $.parser.onBeforeParsePlugin.call($jq, name, config);
                        if(name=="datagrid" && config['gridMenu']) { // 通过用户权限控制gridMenu权限
                            config['gridMenu'] = filterGridMenuWithUserSpecialRights(config['gridMenu']);
                        }
                        $jq[name](config);
                    }

					if($.general&&$.general().second){
						var $first = $("#" + $.general().main);
						$first.parent().parent().parent().parent().parent().find(".panel-tool").remove(); //去掉折叠button
						var panel = id + "_panel";	
						var $title =$("#" + panel).prev().find(".panel-title");
						if ($title.length > 0) $title.text(typeof configs[id] == "string" || !configs[id] ? configs["title"] : configs[id]["title"]);
					}
                }
                if (param.callback) {
                    param.callback();
                }
                $.parser.onComplete.call($.parser, context);
            },
            null, {
                callback: callback
            });
        },

        buildCommonDialog: {
            add: function(e, record, onInitSuccess) {
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

                //config["record"] = config["record"]?$.extend(config["record"],$._urlparam):$._urlparam;
                $.parser.director($dialog, {
                    config: config
                });
            },

            del: function(e) {
                var req = e.data.req;
                if (e.data.req && typeof e.data.req == "string") req = eval("(" + e.data.req + ")");
                if (!req[0].service) req[0]["service"] = "P9999999";
                var records = e.data.target.datagrid('getSelections');
                if (records.length != 1) {
                    alert("提示", "请选择一条数据！");
                    return false;
                } else {
                    var message = '确定要删除选择的记录吗?';
                    var second = false;
                    var $second = "";
                    if ($.general) {
                        $second = $("#" + $.general().second);
                        if (e.data.target.attr("id") != $second.attr("id")) {
                            second = true;
                        }
                    }
                    if ($("div.kui-layout").length > 0 && $second.length > 0 && $second.datagrid("getRows").length > 0 && second) {
                        message = '删除该数据项会级联删除子项<br>您确定要这样操作？';
                    }
                    confirm('提示', message,
                    function(flag) {
                        if (flag) {
                            var cols = e.data.target.datagrid('options').columns[0];
                            for (var i = 0; i < records.length; i++) {
                                req = $.extend(records[i], req[0]);
                                req = eval(submitDataFilter(cols, req));
                                ajaxRequest({
                                    needToCheck: true,
                                    req: [req],
                                    func: function(data) {
                                        e.data.target.datagrid('clearSelections');
                                        e.data.target.datagrid('reload');
                                        if (second) $second.datagrid('reload');
                                        alert("删除成功！");
                                    }
                                });
                            }
                        }
                    });
                }
            },
            modify: function(e, onInitSuccess) {
                var records = e.data.target.datagrid("getSelections");
                if (records.length != 1) {
                    alert('提示', "请选择一条数据！");
                    return false;
                }

                var size = null;
                if (e.data.w != null && e.data.h != null) {
                    if (parseInt(e.data.w) == e.data.w && parseInt(e.data.h) == e.data.h) {
                        size = {
                            w: e.data.w + "px",
                            h: e.data.h + "px"
                        };
                    }
                }

                var $dialog = $.builder.buildCommonDialog.createCommonDialog(e.data.target, size, $.submitAction.modify, e.data.title || $.builder.buildCommonDialog.getDialogTitle(e.data.target, "mdf"), "icon-edit");
                if (e.data.options && e.data.options.onDialogPopup) {
                    eval(e.data.options.onDialogPopup)($dialog);
                }
                var req = e.data.req;
                if (e.data.req && typeof e.data.req == "string") req = eval("(" + e.data.req + ")");

                var columns = e.data.target.datagrid("getOriginalColumns");
                if (req && !req[0].service) {
                    req[0]["service"] = "P9999999";
                }
                var aconfig = {
                    common: true,
                    render: "form",
                    colNumbers: 2,
                    modify: true,
                    req: req,
                    queryCols: [{
                        text: "",
                        collapsed: true,
                        cols: columns
                    }],
                    onInitSuccess: onInitSuccess || $.noop
                };
                //console.log($.extend(records[0],$._urlparam))
                //$.parser.director($dialog,{config:aconfig,record:$.extend(records[0],$._urlparam)});
                if (e.data.options.onFormDataLoadSuccess) {
                    aconfig["onLoadSuccess"] = eval(e.data.options.onFormDataLoadSuccess);
                }
                $.parser.director($dialog, {
                    config: aconfig,
                    record: records[0]
                });
            },
            view: function(e) {
                var records = e.data.target.datagrid("getSelections");
                if (records.length != 1) {
                    alert('提示', "请选择一条数据！");
                    return false;
                }

                var cfg = $.parser.getConfigs([e.data.view]);
                var qry = cfg.qry;
                for (var i = 0; qry && i < qry.length; i++) {
                    qry[i]["defaultValue"] = records[0][qry[i]["field"]] || "";
                }
                var col = cfg.col;
                for (var i = 0; col && i < col.length; i++) {
                    if (col[i]["edit_flag"] == "2") col[i]["edt_defaultValue"] = records[0][col[i]["field"]] || "";
                }
                e.data.target.attr("id", e.data.view);
                var $dialog = $.builder.buildCommonDialog.createCommonDialog(e.data.target, {
                    w: '680px',
                    h: '400px'
                },
                null, e.data.title || '视图界面', "icon-list", "datagrid", e.data.view);
                $.parser.director($dialog, {
                    config: cfg
                });

            },

            createCommonDialog: function(base, size, callback, dialogTitle, icon, type, viewid) {
                var gridId = base.attr("id") && base.attr("id") != "" ? "*" + base.attr("id") : "";
                var dialogId = "PrivateCommonDialogId" + gridId;
                if (type === "datagrid") dialogId = "CommonDialogDatagridId" + gridId;
                var $danymicDialog = $("div[id='" + dialogId +"']");
                var dialogSize = size || {
                    w: '570px',
                    h: '300px'
                };
                //创建好了系统配置窗口：danymicDialog
                if ($danymicDialog.length > 0) {
                    $("form", $danymicDialog).remove();
                    $(".panel-title", $danymicDialog.prev(".panel-header")).html(dialogTitle);
                    $danymicDialog.dialog('open');
                    if (type === "datagrid") {
                        $(".dialog-content", $danymicDialog).append($("<table id=\"" + viewid + "\" class=\"kui-datagrid\" style=\"\" title=\" \"></table>"));
                    } else {
                        $(".dialog-content", $danymicDialog).append($("<form class=\"kui-form\"></form>"));
                    }
                } else {
                    var btns = null
                    if (type === "datagrid") {
                        $danymicDialog = $('<div id="' + dialogId + '" style="width:' + dialogSize.w + ';height:' + dialogSize.h + ';"><table id=\""+viewid+"\" class=\"kui-datagrid\" kui-options="noheader:true" style=\"\" title=\" \"></table></div>').appendTo($('body'));
                    } else {
                        $danymicDialog = $('<div id="' + dialogId + '" style="width:' + dialogSize.w + ';height:' + dialogSize.h + ';padding:10px"><form class="kui-form"></form></div>').appendTo($('body'));
                        btns = [{
                            text: '保存',
                            iconCls: 'icon-save',
                            handler: function() {
                                if (callback) callback.call(this, $danymicDialog);
                            }
                        },
                        {
                            text: '关闭',
                            iconCls: 'icon-cancel',
                            handler: function() {
                                $danymicDialog.dialog('close');
                            }
                        }];
                    }
                    using('dialog',
                    function() {
                        $danymicDialog.dialog({
                            modal: true,
                            title: dialogTitle,
                            iconCls: icon || 'icon-edit',
                            buttons: btns,
                            onClose:function(){
                            	$danymicDialog.dialog("destroy");
                            }
                        });
                    });
                }
                return $danymicDialog;
            },
            getDialogTitle: function(target, op) {
                var title;
                var $tabs = $(target).parents('div.kui-tabs:first');
                if ($tabs.length > 0) {
                    title = $tabs.tabs('getSelected').panel('options').title;
                } else {
                    var opts = $(target).datagrid("options");
                    title = opts.name || opts.title;
                }
                if (title && title != "") {
                    title = title.replace("设置", "").replace("查询", "").replace("管理", "");
                    title = title.indexOf("-") != -1 ? title.substring(title.indexOf("-") + 1, title.length) : title;
                    title = (op == "add" ? "增加": "修改") + title;
                }
                return title || (op == "add" ? "增加": "修改");
            }
        },
        format: {
            datagrid: function(config) { //format datagrid config			
                var ret = {};
                var reqData = {};
                config["conf"] = config["conf"] || {};
                ret["render"] = config["render"];
                ret["script"] = config["script"] || undefined;
                ret["req"] = [{
                    "service": config["conf"]["service"]
                }];
                for (var i in config['conf']) {
                    var value = config['conf'][i];
                    if (i == "service") ret["req"] = [{
                        "service": value
                    }];
                    else {
                        try {
                            ret[i] = eval("ret[i]=" + value);
                        } catch(e) {
                            ret[i] = value;
                        }
                    }
                }
                ret["queryCols"] = [];
                grps = [];
                if (config["qry"]) {
                    for (var i = 0; i < config["qry"].length; i++) {
                        var grp = config["qry"][i]['grp'];
                        if (grps.length == 0) {
                            grps.push(grp);
                        } else {
                            for (var j = 0; j < grps.length; j++) {
                                if (grp == grps[j]) break;
                                if (j == grps.length - 1) grps.push(grp);
                            }
                        }
                    }
                    for (var i = 0; i < grps.length; i++) {
                        ret["queryCols"][i] = {};
                        ret["queryCols"][i]["text"] = grps[i];
                        ret["queryCols"][i]["collapsed"] = true;
                        ret["queryCols"][i]["cols"] = [];
                    }
                    for (var i = 0; i < config["qry"].length; i++) {
                        for (var j = 0; j < ret["queryCols"].length; j++) {
                            if (config["qry"][i]['grp'] == ret["queryCols"][j]["text"]) {

                                ret["queryCols"][j]["cols"].push(config["qry"][i]);
                            }
                        }
                    }
                    for (var i = 0; i < ret["queryCols"].length; i++) {
                        for (var j = 0; j < ret["queryCols"][i]["cols"].length; j++) {
                            ret["queryCols"][i]["cols"][j]["editor"] = {};
                            ret["queryCols"][i]["cols"][j]["editor"]['options'] = {};

                            for (var prop in ret["queryCols"][i]["cols"][j]) {
                                if (prop.indexOf("edt_") >= 0) {
                                    var value;
                                    try {
                                        value = eval("(" + ret["queryCols"][i]["cols"][j][prop] + ")");
	                                	if("undefined" === $.type(value) || "number" === $.type(value)) {
	                                		value = ret["queryCols"][i]["cols"][j][prop];
	                                	}
                                    } catch(e) {
                                        value = ret["queryCols"][i]["cols"][j][prop];
                                    }
                                    var attr = prop.substring(4, prop.length);
                                    if ("options" === attr) ret["queryCols"][i]["cols"][j]["editor"]['options'] = $.extend(ret["queryCols"][i]["cols"][j]["editor"]['options'], value);
                                    else if ("req" === attr) {
                                        var rData;
                                        if (value && value.length > 0) {
                                            rData = reqData[ret["queryCols"][i]["cols"][j]["field"]];
                                        }
                                        if (ret["queryCols"][i]["cols"][j]['type'] == 'autocomplete'||ret["queryCols"][i]["cols"][j]['type'] == 'combogrid') {
                                            ret["queryCols"][i]["cols"][j]["editor"]['options']['req'] = value;
                                        } else if (!rData) {
                                            $.builder.loader(value,
                                            function(data) {
                                                if (data.length > 0) ret["queryCols"][i]["cols"][j]["editor"]['options']['data'] = data;
                                                reqData[ret["queryCols"][i]["cols"][j]["field"]] = data;
                                            },
                                            function() {});
                                        } else {
                                            ret["queryCols"][i]["cols"][j]["editor"]['options']['data'] = rData;
                                        }
                                        delete ret["queryCols"][i]["cols"][j][prop];
                                    } else {
                                        delete ret["queryCols"][i]["cols"][j][prop];
                                        ret["queryCols"][i]["cols"][j]["editor"]['options'][attr] = value; //转化为对象
                                    }
                                }
                            }
                            if (ret["queryCols"][i]["cols"][j].ref) {
                                ret["queryCols"][i]["cols"][j] = $.extend(true, DataCache.viewCache(ret["queryCols"][i]["cols"][j].ref), ret["queryCols"][i]["cols"][j]);
                            }
                            var type = ret["queryCols"][i]["cols"][j]['type'];
                            ret["queryCols"][i]["cols"][j]["editor"]['type'] = type ? (type == "input" ? "text": type) : "text";
                        }
                    }
                }
                if (config["btn"]) {
                    for (var i = 0, len = config["btn"].length; i < len; i++) {
                        (function(btnConfig) {
                            var onFormInitSuccess;
                            try {
                                onFormInitSuccess = eval(btnConfig["onFormInitSuccess"]);
                            } catch(ex) {}
                            onFormInitSuccess = $.isFunction(onFormInitSuccess) ? onFormInitSuccess : $.noop;

                            if ("commonAdd" === btnConfig.handler) {
                                btnConfig.handler = function(e) {
                                    $.builder.buildCommonDialog.add(e, null, onFormInitSuccess)
                                }
                            } else if ("commonModify" === btnConfig.handler) {
                                btnConfig.handler = function(e) {
                                    $.builder.buildCommonDialog.modify(e, onFormInitSuccess)
                                }
                            } else if ("commonDelete" === btnConfig.handler) {
                                btnConfig.handler = $.builder.buildCommonDialog.del;
                            } else if ("commonView" === btnConfig.handler) {
                                btnConfig.handler = $.builder.buildCommonDialog.view;
                            }
                        })(config["btn"][i]);
                    }
                    ret["toolbar"] = config["btn"];
                }
                for (var i in config["col"]) {
                    if (config["col"][i]["type"] == "checkbox") {
                        config["col"][i]["checkbox"] = true;
                    }
                    config["col"][i]["editor"] = {};
                    config["col"][i]["editor"]['options'] = {};
                    for (var prop in config["col"][i]) {
                        if (prop.indexOf("edt_") != -1) {

                            var value;
                            var dataJson = [];
                            try {
                            	value = eval("(" + config["col"][i][prop] + ")");
                            	if("undefined" === $.type(value) || "number" === $.type(value)) {
                            		value = config["col"][i][prop];
                            	}
                                //value = isNaN(config["col"][i][prop])?eval("(" + config["col"][i][prop] + ")"):config["col"][i][prop];
                                //if (!value) value = config["col"][i][prop];
                            } catch(e) {
                                value = config["col"][i][prop];
                            }

                            var attr = prop.substring(4, prop.length);

                            if ("options" === attr) config["col"][i]["editor"]['options'] = $.extend(config["col"][i]["editor"]['options'], value);
                            else if ("req" === attr && config["col"][i]["type"] != "autocomplete" && config["col"][i]["type"] != "combogrid") {
                                var rData;
                                if (value && value.length > 0) {
                                    rData = reqData[config["col"][i]['field']];
                                }
                                if (!rData) {
                                    $.builder.loader(value,
                                    function(data) {
                                        if (data.length > 0) config["col"][i]["editor"]['options']['data'] = data;
                                        reqData[config["col"][i]['field']] = data;
                                    },
                                    function() {});
                                } else {
                                    config["col"][i]["editor"]['options']['data'] = rData;
                                }
                                delete config["col"][i][prop];
                            } else {
                                delete config["col"][i][prop];
                                config["col"][i]["editor"]['options'][attr] = value;
                            }
                        } else if (prop == "formatter" || prop == "styler") {
                            var func;
                            try {
                                func = eval(config["col"][i][prop]);
                                if (!func) func = eval('(function(){return ' + config["col"][i][prop] + '})()');
                            } catch(e) {
                                func = config["col"][i][prop];
                            }
                            config["col"][i][prop] = func;
                        }
                    }
                    if (config["col"][i].ref) {
                        config["col"][i] = $.extend(true, DataCache.viewCache(config["col"][i].ref), config["col"][i]);
                    }
                    config["col"][i]["editor"]['type'] = config["col"][i]['type'] == "input" ? "text": config["col"][i]['type'];
                }
                ret["columns"] = [config["col"]];

                for (var v = 0; typeof(ret["toolbar"]) != 'undefined' && v < ret["toolbar"].length; v++) {
                    if (ret["toolbar"][v]["service"]) {
                        ret["toolbar"][v]["req"] = [{
                            "service": ret["toolbar"][v]["service"]
                        }];
                        delete ret["toolbar"][v]["service"];
                    }
                }
				//$alert(config["title"] && !config["id"].startWith("GENP_") && !config["id"].startWith("GENQ_"));
                //if (config["title"] && !config["id"].startWith("GENP_") && !config["id"].startWith("GENQ_")) {
				
				if($.general&&!$.general().second){
                    ret["title"] = config["title"];
				}
                return ret;
            },
            form: function(config) { //format form config
                if (!config || $.isEmptyObject(config)) return;
                var ret = {},
                reqData = {},
                grps = [];
                ret["render"] = config["render"];
				ret["script"] = config["script"] || undefined;
                ret["columns"] = [];
                var conf = config["conf"];
                if (conf) {
                    for (var con in conf) {
                        if (con == "service") {
                            ret["req"] = [{
                                "service": conf[con]
                            }];
                        } else if (con == "req" && !ret.req) {
                            ret["req"] = eval("(" + conf[con] + ")");
                        } else if (con == "bex_code") {
                            ret["bexCode"] = conf[con];
                        } else if (con == "comp_code") {
                            ret["compCode"] = conf[con];
                        } else {
                            ret[con] = eval(conf[con]);
                        }
                    }
                }
                for (var i = 0; i < config["col"].length; i++) {
					if(config["col"][i].type == "autocomplete") {
                        if(config["col"][i].edt_extraParams && typeof config["col"][i].edt_extraParams=="string") {
                            config["col"][i].edt_extraParams = eval('(' + config["col"][i].edt_extraParams + ')');
                        }
                    }
                    var grp = config["col"][i]['grp'];
                    if (grps.length == 0) {
                        grps.push(grp);
                    } else {
                        for (var j = 0; j < grps.length; j++) {
                            if (grp == grps[j]) break;
                            if (j == grps.length - 1) grps.push(grp);
                        }
                    }
                }
                for (var i = 0; i < grps.length; i++) {
                    ret["columns"][i] = {};
                    ret["columns"][i]["text"] = grps[i];
                    ret["columns"][i]["collapsed"] = true;
                    ret["columns"][i]["cols"] = [];
                }
                for (var i = 0; i < config["col"].length; i++) {
                    for (var j = 0; j < ret["columns"].length; j++) {
                        if (config["col"][i]['grp'] == ret["columns"][j]["text"]) {
                            ret["columns"][j]["cols"].push(config["col"][i]);
                        }
                    }
                }

                if (config["btn"]) {
                    for (var i = 0,
                    len = config["btn"].length; i < len; i++) {
                        if ("commonAddAction" === config["btn"][i].handler) {
                            config["btn"][i].handler = $.submitAction.add;
                        } else if ("commonModifyAction" === config["btn"][i].handler) {
                            config["btn"][i].handler = $.submitAction.modify;
                        }

                    }
                    ret["toolbar"] = config["btn"];
                    for (var v = 0; v < ret["toolbar"].length; v++) {
                        if (ret["toolbar"][v]["service"]) {
                            ret["toolbar"][v]["req"] = [{
                                "service": ret["toolbar"][v]["service"]
                            }];
                            delete ret["toolbar"][v]["service"];
                        }
                    }
                }
                for (var v = 0; v < ret["columns"].length; v++) {
                    for (var i = 0; i < ret["columns"][v]["cols"].length; i++) {
                        ret["columns"][v]["cols"][i]["editor"] = {};
                        ret["columns"][v]["cols"][i]["editor"]['options'] = {};
                        for (var prop in ret["columns"][v]["cols"][i]) {
                            if (prop.indexOf("edt_") >= 0) {
                                var value;
								if(prop=="edt_dict"){
									value = ret["columns"][v]["cols"][i][prop];
								}else{
									try {
	                                	//value = isNaN(ret["columns"][v]["cols"][i][prop])?eval(ret["columns"][v]["cols"][i][prop]):ret["columns"][v]["cols"][i][prop];
	                                    value = eval("(" + ret["columns"][v]["cols"][i][prop] + ")");
	                                	if("undefined" === $.type(value) || "number" === $.type(value)) {
	                                		value = ret["columns"][v]["cols"][i][prop];
	                                	}
									} catch(e) {
										value = ret["columns"][v]["cols"][i][prop];
									}
                                }
                                var attr = prop.substring(4, prop.length);
                                if ("req" === attr) {
                                    var rData;
                                    if (value && value.length > 0) {
                                        if (value[0].bex_codes) {
                                            rData = reqData[value[0].bex_codes];
                                        }
                                    }
                                    if (ret["columns"][v]["cols"][i]['type'] == 'autocomplete' || ret["columns"][v]["cols"][i]['type'] == 'combogrid') {
                                        ret["columns"][v]["cols"][i]["editor"]['options']['req'] = value;
                                    } else if (!rData) {
                                        $.builder.loader(value,
                                        function(data) {
                                            if (data.length > 0) ret["columns"][v]["cols"][i]["editor"]['options']['data'] = data;
                                            reqData[value[0].bex_codes] = data;
                                        },
                                        function() {});
                                    } else {
                                        ret["columns"][v]["cols"][i]["editor"]['options']['data'] = rData;
                                    }
                                    delete ret["columns"][v]["cols"][i][prop];
                                } else {
                                    ret["columns"][v]["cols"][i]["editor"]['options'][prop.substring(4, prop.length)] = value; //转化为对象
                                }
                            }
                        }
                        if (ret["columns"][v]["cols"][i].ref) {
                            ret["columns"][v]["cols"][i] = $.extend(true, DataCache.viewCache(ret["columns"][v]["cols"][i].ref), ret["columns"][v]["cols"][i]);
                        }
                        ret["columns"][v]["cols"][i]["editor"]['type'] = ret["columns"][v]["cols"][i]['type'] == "input" ? "text": ret["columns"][v]["cols"][i]['type'];
                    }
                }
                if (config["title"]) {
                    ret["title"] = config["title"];
                }
                return $.extend(ret, {
                    queryCols: ret.columns
                });
            },
            treegrid: function(config) { //format tree grid config
                return $.builder.format.datagrid(config);
            },
            tree: function(config) { //format tree config
                var ret = {};
                ret["render"] = config["render"];
				ret["script"] = config["script"] || undefined;
                ret["req"] = [{
                    "service": config["conf"]["service"]
                }];
                ret["nodeId"] = config["conf"]["dept_no"];
                if (config["title"]) {
                    ret["title"] = config["title"];
                }
                return ret;
            },
            reportgrid:function(config){
                var ret = {};
                var reqData = {};
                config["conf"] = config["conf"] || {};
                ret["render"] = config["render"];
                ret["script"] = config["script"] || undefined;
                ret["req"] = [{
                    "service": config["conf"]["service"]
                }];
                for (var i in config['conf']) {
                    var value = config['conf'][i];
                    if (i == "service"){
                        ret["req"] = [{
                            "service": value
                        }];
                    }{
                        try {
                            ret[i] = eval("ret[i]=" + value);
                        } catch(e) {
                            ret[i] = value;
                        }
                    }
                }
                ret["queryCols"] = [];
                grps = [];
                if (config["qry"]) {
                    for (var i = 0; i < config["qry"].length; i++) {
                        var grp = config["qry"][i]['grp'];
                        if (grps.length == 0) {
                            grps.push(grp);
                        } else {
                            for (var j = 0; j < grps.length; j++) {
                                if (grp == grps[j]) break;
                                if (j == grps.length - 1) grps.push(grp);
                            }
                        }
                    }
                    for (var i = 0; i < grps.length; i++) {
                        ret["queryCols"][i] = {};
                        ret["queryCols"][i]["text"] = grps[i];
                        ret["queryCols"][i]["collapsed"] = true;
                        ret["queryCols"][i]["cols"] = [];
                    }
                    for (var i = 0; i < config["qry"].length; i++) {
                        for (var j = 0; j < ret["queryCols"].length; j++) {
                            if (config["qry"][i]['grp'] == ret["queryCols"][j]["text"]) {

                                ret["queryCols"][j]["cols"].push(config["qry"][i]);
                            }
                        }
                    }
                    for (var i = 0; i < ret["queryCols"].length; i++) {
                        for (var j = 0; j < ret["queryCols"][i]["cols"].length; j++) {
                            ret["queryCols"][i]["cols"][j]["editor"] = {};
                            ret["queryCols"][i]["cols"][j]["editor"]['options'] = {};

                            for (var prop in ret["queryCols"][i]["cols"][j]) {
                                if (prop.indexOf("edt_") >= 0) {
                                    var value;
                                    try {
                                        value = eval("(" + ret["queryCols"][i]["cols"][j][prop] + ")");
                                    } catch(e) {
                                        value = ret["queryCols"][i]["cols"][j][prop];
                                    }
                                    var attr = prop.substring(4, prop.length);
                                    if ("options" === attr) ret["queryCols"][i]["cols"][j]["editor"]['options'] = $.extend(ret["queryCols"][i]["cols"][j]["editor"]['options'], value);
                                    else if ("req" === attr) {
                                        var rData;
                                        if (value && value.length > 0) {
                                            rData = reqData[ret["queryCols"][i]["cols"][j]["field"]];
                                        }
                                        if (ret["queryCols"][i]["cols"][j]['type'] == 'autocomplete'||ret["queryCols"][i]["cols"][j]['type'] == 'combogrid') {
                                            ret["queryCols"][i]["cols"][j]["editor"]['options']['req'] = value;
                                        } else if (!rData) {
                                            $.builder.loader(value,
                                                function(data) {
                                                    if (data.length > 0) ret["queryCols"][i]["cols"][j]["editor"]['options']['data'] = data;
                                                    reqData[ret["queryCols"][i]["cols"][j]["field"]] = data;
                                                },
                                                function() {});
                                        } else {
                                            ret["queryCols"][i]["cols"][j]["editor"]['options']['data'] = rData;
                                        }
                                        delete ret["queryCols"][i]["cols"][j][prop];
                                    } else {
                                        delete ret["queryCols"][i]["cols"][j][prop];
                                        ret["queryCols"][i]["cols"][j]["editor"]['options'][attr] = value; //转化为对象
                                    }
                                }
                            }
                            if (ret["queryCols"][i]["cols"][j].ref) {
                                ret["queryCols"][i]["cols"][j] = $.extend(true, DataCache.viewCache(ret["queryCols"][i]["cols"][j].ref), ret["queryCols"][i]["cols"][j]);
                            }
                            var type = ret["queryCols"][i]["cols"][j]['type'];
                            ret["queryCols"][i]["cols"][j]["editor"]['type'] = type ? (type == "input" ? "text": type) : "text";
                        }
                    }
                }
                for (var i in config["col"]) {
                    if (config["col"][i]["type"] == "checkbox") {
                        config["col"][i]["checkbox"] = true;
                    }
                    config["col"][i]["editor"] = {};
                    config["col"][i]["editor"]['options'] = {};
                    for (var prop in config["col"][i]) {
                        if (prop.indexOf("edt_") != -1) {

                            var value;
                            var dataJson = [];
                            try {

                                value = isNaN(config["col"][i][prop])?eval("(" + config["col"][i][prop] + ")"):config["col"][i][prop];
                                if (!value) value = config["col"][i][prop];
                            } catch(e) {
                                value = config["col"][i][prop];
                            }

                            var attr = prop.substring(4, prop.length);

                            if ("options" === attr) config["col"][i]["editor"]['options'] = $.extend(config["col"][i]["editor"]['options'], value);
                            else if ("req" === attr && config["col"][i]["type"] != "autocomplete" && config["col"][i]["type"] != "combogrid") {
                                var rData;
                                if (value && value.length > 0) {
                                    rData = reqData[config["col"][i]['field']];
                                }
                                if (!rData) {
                                    $.builder.loader(value,
                                        function(data) {
                                            if (data.length > 0) config["col"][i]["editor"]['options']['data'] = data;
                                            reqData[config["col"][i]['field']] = data;
                                        },
                                        function() {});
                                } else {
                                    config["col"][i]["editor"]['options']['data'] = rData;
                                }
                                delete config["col"][i][prop];
                            } else {
                                delete config["col"][i][prop];
                                config["col"][i]["editor"]['options'][attr] = value;
                            }
                        } else if (prop == "formatter" || prop == "styler") {
                            var func;
                            try {
                                func = eval(config["col"][i][prop]);
                                if (!func) func = eval('(function(){return ' + config["col"][i][prop] + '})()');
                            } catch(e) {
                                func = config["col"][i][prop];
                            }
                            config["col"][i][prop] = func;
                        }
                    }
                    if (config["col"][i].ref) {
                        config["col"][i] = $.extend(true, DataCache.viewCache(config["col"][i].ref), config["col"][i]);
                    }
                    config["col"][i]["editor"]['type'] = config["col"][i]['type'] == "input" ? "text": config["col"][i]['type'];
                }
                ret["columns"] = [config["col"]];
                for (var v = 0; typeof(ret["toolbar"]) != 'undefined' && v < ret["toolbar"].length; v++) {
                    if (ret["toolbar"][v]["service"]) {
                        ret["toolbar"][v]["req"] = [{
                            "service": ret["toolbar"][v]["service"]
                        }];
                        delete ret["toolbar"][v]["service"];
                    }
                }
                if($.general&&!$.general().second){
                    ret["title"] = config["title"];
                }
                return ret;
            }
        },
        loader: function(req, success, error) {
            if (!req || req.length == 0) return false;
            if (!req[0].service) req[0]["service"] = "P9999999";
            var resFunc = function(rtnData) {

                var data = rtnData[0];
                if (!$.isArray(data)) {
                    data = rtnData[0]["BPM_DATA"];
                }
                success(data);
            };

            var p = {
                dataType: 'json',
                async: false,
                responseType: 'json',
                func: resFunc,
                error: function() {
                    error.apply(this, arguments)
                },
                req: req || []
            };
            ajaxRequest(p);
        }
    };

	$.builder.format.sform = $.builder.format.form; // 增加sform，与form是一样的。

    $.submitAction = {
        add: function(e) {
            var $grid = "";
            var d = $(document).find('div[id^="PrivateCommonDialogId"]:visible');
            var dialogId = d.attr("id").split("*");

            if (dialogId.length == 1) {
                $grid = $(document).find('table[datagrid]');
            } else {
                $grid = $(document).find('#' + dialogId[1]);
            }
            d.find("form").form('submit', {
                onSubmit: function(req) {
                    if ($(this).form('validate')) {

                        if (typeof commonAddSubmitData != "undefined") $.extend(req[0], commonAddSubmitData);

                        $.extend(req[0], $._urlparam);
                        var opts = $.data(this, "form").options;
                        var cols = opts.queryCols.length == 0 ? opts.col: opts.queryCols[0].cols;
                        for (var i = 0; req[0] && i < cols.length; i++) {
                            var value = req[0][cols[i].field];
                            if (cols[i].type == "timespinner") {
                                if (value && value.indexOf(":") != -1) req[0][cols[i].field] = value.replace(/:/g, "");
                            } else if (cols[i].type == "combobox" && cols[i].editor.options.multiple) {
                                if (Object.prototype.toString.apply(value) === '[object Array]') {
                                    if (value[0].length == 1) req[0][cols[i].field] = value.join("");
                                } else if (value && value.indexOf(",") != -1 && !cols[i].editor.options.submitSeparator) {
                                    if (value.split(",")[0].length == 1) req[0][cols[i].field] = value.replace(/,/g, "");
                                }
                            } else if(cols[i].type == "numberbox" && cols[i].editor.options.setThousandChar) {
                                if (value.indexOf(",") > 0) req[0][cols[i].field] = value.replace(/,/g, "");
                            }
                        }
                        return true;
                    }
                    return false;
                },
                success: function() {
                    alert("提示", '添加成功！');
                    d.dialog("close");
                    $grid.datagrid("reload");
                },
                needToCheck: true
            });
        },

        modify: function(e) {
            var $grid = "";
            var d = $(document).find('div[id^="PrivateCommonDialogId"]:visible');
            var dialogId = d.attr("id").split("*");
            if (dialogId.length == 1) {
                $grid = $(document).find('table[datagrid]');
            } else {
                $grid = $(document).find('#' + dialogId[1]);
            }
            d.find("form").form('submit', {
                onSubmit: function(req) {
                    if (typeof commonModifySubmitData != "undefined") $.extend(req[0], commonModifySubmitData);

                    $.extend(req[0], $._urlparam);

                    if ($(this).form('validate')) {
                        var opts = $.data(this, "form").options;
                        var cols = opts.queryCols.length == 0 ? opts.col: opts.queryCols[0].cols;
                        req[0] = submitDataFilter(cols, req[0]);
						if ($.submitAction.isDataChange(opts.originalData, req[0])) {
                            return true;
                        } else {
                            alert("提示", "数据未发生改变，不需提交！");
                            return false;
                        }
                    }
                    return false;
                },
                success: function() {
                    alert("提示", '修改成功！');
                    d.dialog("close");
                    $grid.datagrid("reload");
                },
                needToCheck: true
            });
        },
        isDataChange: function(original, current) {
            var flag = false;
            if (!original) return true;
            for (var name in original) {
                var originalV = original[name];
                if (originalV) {
                    originalV = originalV.trim();
                }
                if (name.endWith("_TIME") || name.endWith("SJ") || name.endWith("_STIME")) {
                    if (originalV.indexOf(":") != -1) originalV = originalV.replace(/:/g, "");
                    else if (originalV == "0") originalV = "000000";
                }
                if (current[name] != undefined && originalV != current[name].trim()) {
                    flag = true;
                    break;
                }
            }
            return flag
        }
    };

    $.extend(String.prototype, {
        /**
		 * 判断字符串是否以某个字符串结尾
		 */
        endWith: function(str) {
            if (str == null || str == "" || this.length == 0 || str.length > this.length) return false;
            if (this.substring(this.length - str.length) == str) return true;
            else return false;
            return true;
        },

        /**
		 * 判断字符串是否以某个字符串开始
		 */
        startWith: function(str) {
            if (str == null || str == "" || this.length == 0 || str.length > this.length) return false;
            if (this.substr(0, str.length) == str) return true;
            else return false;
            return true;
        },

        trim: function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    });

    function submitDataFilter(cols, data) {
        for (var i = 0; i < cols.length; i++) {
            var value = data[cols[i].field];
            if (cols[i].type == "timespinner") {
                if (value && value.indexOf(":") != -1) data[cols[i].field] = value.replace(/:/g, "");
            } else if (cols[i].type == "combobox" && cols[i].editor.options.multiple) {
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    if (value[0].length == 1) data[cols[i].field] = value.join("");
                } else if (value && value.indexOf(",") != -1 && !cols[i].editor.options.submitSeparator) {
                    if (value.split(",")[0].length == 1) data[cols[i].field] = value.replace(/,/g, "");
                }
            } else if (cols[i].type == "numberbox") {
                if (value && value.indexOf(",") != -1) data[cols[i].field] = value.replace(/,/g, "");
            }
        }
        return data;
    }
    $.fn.getFormValue = function() {
        var params = {};
        var adjustValue = $(this).serializeArray();
        for (var i = 0; i < adjustValue.length; i++) {
            var name = adjustValue[i].name,
            value = adjustValue[i].value;
            if (params[name]) params[name] = params[name] + ',' + value;
            else params[name] = value;
        }
        return params;
    }
    $.submitConfirmBill = function(bills, callback) {
        var $dialog = $("#comfirm_bill_dialog");
        if ($dialog.length == 0) {
            var $danymicDialog = $('<div id="comfirm_bill_dialog" style="width:400px;height:300px;padding:10px"></div>').appendTo($('body'));
            $danymicDialog.append(createConfirmBill(bills));
            using('dialog',
            function() {
                initialDialog($danymicDialog);
            });
        } else {
            initialDialog($dialog);
            $dialog.find(".bill-box").remove();
            $dialog.find(".dialog-content").append(createConfirmBill(bills));
            $dialog.dialog("open");
        }

        function initialDialog($target) {
            $target.dialog({
                title: "请确认交易清单",
                modal: true,
                buttons: [{
                    text: '确定',
                    iconCls: 'icon-save',
                    handler: function() {
                        if (callback) callback($target);
                    }
                },
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function() {
                        $target.dialog('close');
                    }
                }]
            });
        }

        function createConfirmBill(config) {
            if (!config || $.isEmptyObject(config)) return;
            var dom = [];
            dom.push("<table class='bill-box'>");
            for (var i = 0; i < config.length; i++) {
                var item = [];
                item.push("<tr class='bill-item'>");
                item.push("<td class=\"item-label\">" + config[i].name + "：</td>");
                var value = config[i].value;
                if (config[i].combo) {
                    value = $("input[comboname='" + config[i].field + "']").combo("getText");
                }
                item.push("<td class=\"item-value\">" + value + "</td>");
                item.push("</tr>");
                dom.push(item.join(""));
            }
            dom.push("</table>");
            return dom.join("");
        }
    }
})(jQuery);