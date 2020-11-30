/**
 * view builder - kui base js library
 * For initial view component with component configuration which request from back-end.
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * 获取和解析view配置后移，前端适应改造并优化 @author liuqing 2014-11-12
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
        
        director: function(context, config, callback) {		
            var views = [], 
            	viewIds = [], 
            	iconfig = $.extend(true, {}, config);
			
            for (var i = 0; i < $.parser.plugins.length; i++) {
                var name = $.parser.plugins[i];
                $('.kui-' + name, context).each(function() {
                    var $jq = $(this);
                    views.push({name: name, jq: $jq});
                    if (name == "datagrid" || name == "form" || name == "treegrid" || name == "sform") {
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
                $.builder.build(views, iconfig.config || $.parser.getConfigs(viewIds, iconfig.service || ""), 
                		context, iconfig.record, callback);				
            } else {
                $.parser.onComplete.call($.parser, context, callback);
            }
        },

        getUrlService: function() {
            var reg = new RegExp("(^|&)service=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

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
      
        build: function(views, configs, context, record, callback) {
            var name, names = [], uioptions = {};
            for (var i = 0; i < views.length; i++) {
             	name = views[i].name;
                if(-1 === $.inArray(name, names)) {
                	 names.push(name);
                }
            }
            if (context && typeof context == "object") {	//uioptions数据参考jquery.form.js中createForm方法
                uioptions = $.data(context[0], "uioptions") || {};
            }
            
            using(names, function(param) {
            	var name, jq, id, field, tmpConfig;
            	
                for(var i = 0; i < views.length; i++) {
                	name = views[i].name;
                	jq = views[i].jq;
                	id = jq.attr("id");
                	field = jq.attr("name");
                	tmpConfig = {};
                	
                	if(!$.isEmptyObject(configs)) {
                		if("string" === $.type(configs["id"]) && configs["render"] === name 
                				&& (id === configs["id"] || "" === id)) {	//单个配置
                			tmpConfig = configs;
                		} else if(configs[id] && configs[id].render === name) {	//多个配置，id为索引
                			tmpConfig = configs[id];
                		} else if(configs["common"] && configs["render"] === name) {	//自定义配置
                			tmpConfig = configs;
                		}
                	}
                	
	            	if (field) {	//设置form中的字段配置
	            		$.extend(tmpConfig, uioptions[field] || {});
	                }
	            	if (record) {	//设置form中的字段数据
	            		tmpConfig["record"] = record;
	                }
	            	
	            	if (tmpConfig["script"]) {	//加载配置的脚本
	            		(function(jq, name, tmpConfig) {
	            			kuiloader.loadJs(tmpConfig["script"], function() {
	            				jq[name]($.builder.format.handleConfig(tmpConfig));
	            			});
	            		})(jq, name, tmpConfig);
	            	} else {
	            		jq[name]($.builder.format.handleConfig(tmpConfig));
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
            }, null, {callback: callback});
        },

        buildCommonDialog: {
            add: function(e, record) {
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
                    col: columns
                };
                if (record) config["record"] = record;

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
            modify: function(e) {
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
                    }]
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
                                if (callback) callback($danymicDialog);
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
        	//服务端解析view配置前端适应改造 @author liuqing 2014-11-12
        	handleConfig: function(config) {
            	var conf = $.extend(true, {}, config);	//深度拷贝，防止config被修改
            	recurseEval(conf);
            	return conf;
            	
            	function recurseEval(obj) {
            		var v, key, type = $.type(obj);
    				if("object" === type || "array" === type) {
    					for(key in obj) {
    						obj[key] = arguments.callee(obj[key]);	//递归处理object和array
    					}
    					return obj;
    				}
    				
    				try {
    					v = eval("(" + obj + ")");
    					if("undefined" === $.type(v) || "number" === $.type(v) || (v && v.nodeType)) {	//取消undefined,number,dom元素的转换
    						v = obj;
    					}
    				} catch(e) {
    					v = obj;
    				}
    				
    				return v;
            	}
        	},
        	
        	//为了兼容遗留的代码datagrid,form,sform,treegrid,tree格式化方法保留
            datagrid: function(config) {
            	return $.builder.format.handleConfig(config);
            },
            form: function(config) {
            	return $.builder.format.handleConfig(config);
            },
            sform: function(config) {
            	return this.form(config);
            },
            treegrid: function(config) {
                return this.datagrid(config);
            },
            tree: function(config) {
            	return $.builder.format.handleConfig(config);
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
    
    //暴露到全局，eval才能将字符串转换成对应的方法
    window.commonAdd = $.builder.buildCommonDialog.add;
    window.commonModify = $.builder.buildCommonDialog.modify;
    window.commonDelete = $.builder.buildCommonDialog.del;
    window.commonView = $.builder.buildCommonDialog.view;
})(jQuery);