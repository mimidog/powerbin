/**
 * 门户设计
 * @author liuqing
 */
; (function($, window, undefined) {

var portal,

	leftTreeOpts = {
		nodeId: "id",
		nodeName: "text",
		parNode: "par_node",
		treeType: "1",
		proxy: function (target) {
		 	var p = $("<div class='front-drag-proxy'><div class='proxy-title'></div></div>").appendTo("body").hide();
		    p.find(".proxy-title").text($(target).find(".tree-title").html());
		    return p;
		}, 
		dragLeafOnly: true, 
		dnd: true, 
		animate: true,
		onClick: function(node) {
			$(this).tree('toggle', node.target);
		}
	},
	
	ui = {};

kPortal.fn.extend({
	
	init: function() {
		
		$.extend(ui, {
			rUserCode: $("#radio_user_code"),
			rUserRole: $("#radio_user_role"),
			userCode: $("#user_code"),
			userRole: $("#user_role"),
			menuDiv: $("#menu_div"),
			layoutWrap: $("#id_layout_wrap")
		});
		
		portal.render();
		
		portal.requestService([
			{service: "P0004101"}, {service: "P0004121"}, {service: "P0004131"},
			{service: "P0000181", STATUS: "1"}
		], function() {
			$("#accordion_layout").addClass("panel-body").removeClass("panel-loading").html("");
			
			var layoutData = portal.formatRecord("LAYOUT_ID", "_board", this[0]),
				contData = portal.formatRecord("CONT_ID", null, this[1]),
				compData = portal.formatRecord("COMP_ID", "_param", this[2]),
				platData = portal.formatRecord("ID", null, this[3]);
			
			delete platData["0"];
			portal.data("plat_data", platData);

			portal.initLayout(portal.data("layout_data", layoutData));
			portal.initContainer(portal.data("cont_data", contData));
			portal.initComponent(portal.data("comp_data", compData));
		}, function() {
			$("#accordion_layout").addClass("panel-body").removeClass("panel-loading").html("数据加载失败");
		});
		
		portal.regPageEvents([
   			 {selector:"#panel_menu input[name='search_radio']", types:["click"], handler:this.userRadioClick},
   			 {selector:"#accordion_layout", types:["click"], handler:this.layoutClick},
   			 {selector:"#btn_pre", types:["click"], handler:this.btnPreviewClick},
   			 {selector:"#btn_save", types:["click"], handler:this.btnSaveClick},
   			 {selector:"#btn_float", types:["click"], handler:this.btnFloatClick},
   			 {selector:"#btn_clear", types:["click"], handler:this.btnClearClick},
   			 {selector:"#btn_copy", types:["click"], handler:this.btnCopyClick},
   			 {selector:"#btn_paste", types:["click"], handler:this.btnPasteClick}
   		]);
		
		portal.resize();
		
		$("#radio_user_role").click();
	},
	
	render: function() {
		var plugins = [
				{selector: "#layout_main", type: "layout"},
				{selector: "#panel_design", type: "panel"},
				{selector: "#accordion_west", type: "accordion"},
				{selector: "#accordion_west_param", type: "accordion"},
				{selector: ui.userRole, type: "combogrid", "options": {
					queryCols: [{
						text: "查询",
						icon: "icon-search",
						collapsed: true,
						cols: [{
							title: "岗位名称",
			                field: "POST_NAME",
			                editor: {
			                	type: "text",
			                	options: {
			                	  validType:"val[0,64]"
			                	}
			                }
						}]
					}],
					columns: [[
						{field: "POST_ID", title: "岗位编号", width: 50, sortType: "number"},
				    	{field: "POST_NAME", title: "岗位名称", width: 60},
				    	{field: "POST_STA", title: "岗位状态", width: 50, formatter: function(value, row, index) {
			                return getSysDictOpt("POST_STA", value);
			        	}}
					]],
					onSelect: function(rowIdx, rowData) {
						if(ui.menuDiv.attr("user_role") === rowData.POST_ID) {
							return;
						}
						if(isMenuChanged()) {
							portal.showConfirm("当前设置的菜单未保存，确定要重新设置吗？", function() {
								initMenu({USER_ROLE: rowData.POST_ID});
							}, function() {
								ui.userRole.combogrid("setValue", ui.menuDiv.attr("user_role"));
							});
						} else {
							initMenu({USER_ROLE: rowData.POST_ID});
						}
					}
				}},
				{selector: ui.userCode, type: "combogrid", "options": {
					queryCols: [{
						text: "查询",
						icon: "icon-search",
						collapsed: true,
						cols: [{
							title: "员工编号/名称",
			                field: "QUERY_PARAM",
			                editor: {
			                	type: "text",
			                	options: {
			                	  validType:"val[0,64]"
			                	}
			                }
						}]
					}],
					columns: [[
						{field: "USER_CODE", title: "员工编号", width: 50, sortType: "number"},
				    	{field: "USER_NAME", title: "员工名称", width: 60},
				    	{field: "ORG_NAME", title: "机构名称", width: 60},
				    	{field: "MAIN_POST_NAME", title: "员工主岗位", width: 60},
				    	{field: "USER_STA", title: "员工状态", width: 50, formatter: function(value, row, index) {
			                return getSysDictOpt("USER_STA", value);
			        	}}
					]],
					onSelect: function(rowIdx, rowData) {
						if(ui.menuDiv.attr("user_code") === rowData.USER_CODE) {
							return;
						}
						if(isMenuChanged()) {
							portal.showConfirm("当前设置的菜单未保存，确定要重新设置吗？", function() {
								initMenu({USER_CODE: rowData.USER_CODE});
							}, function() {
								ui.userCode.combogrid("setValue", ui.menuDiv.attr("user_code"));
							});
						} else {
							initMenu({USER_CODE: rowData.USER_CODE});
						}
					}
				}}
			],
			i = 0,
			l = plugins.length;
		
		for(; i < l; i++) {
			$(plugins[i]["selector"])[plugins[i]["type"]](plugins[i]["options"] || {});
		}		
		
		$("#accordion_comp_param").parent().hide();
		$("#panel_menu").show();
		$("#accordion_layout").removeClass("panel-body").addClass("panel-loading").html("loading...");
		this.createContextMenu();
	},
	
	userRadioClick: function(e) {
		var isRUserCode = "0" === e.target.value,
			currentUserCode = ui.menuDiv.attr("user_code"),
			currentUserRole = ui.menuDiv.attr("user_role"),
			isChanged = isMenuChanged();
		
		if(isRUserCode && !!currentUserCode) {
			return;
		}
		if(!isRUserCode && !!currentUserRole) {
			return;
		}
		
		if(isChanged) {
			portal.showConfirm("当前操作的数据未保存，是否继续？", function() {
				portal.resetUI();
				changeSelectUI(isRUserCode);
			}, function() {
				ui.rUserCode.attr("checked", !!currentUserCode);
				ui.rUserRole.attr("checked", !!currentUserRole);
			});
		} else {
			portal.resetUI();
			changeSelectUI(isRUserCode);
		}
		
		function changeSelectUI(isRUserCode) {
			var userCode = ui.userCode,
				userRole = ui.userRole;
			if(isRUserCode) {
				userRole.next(".combo").hide();
				userCode.next(".combo").show();
				userRole.combogrid("setValue", "").combogrid("clear");
			} else {
				userRole.next(".combo").show();
				userCode.next(".combo").hide();
				userCode.combogrid("setValue", "").combogrid("clear");
			}
		}
	},
	
	btnClearClick: function(e) {
		var dnrs = ui.layoutWrap.find(".drag-wrap");

		if(dnrs.length) {
			portal.showConfirm("门户菜单下的所有组件和容器将被清空，是否继续？", function() {
				dnrs.remove();
				alert("菜单已清空！");
			});
		} else {
			alert("无内容，不需要清空！");
		}
	},
	
	btnCopyClick: function(e) {
		var lWrap = ui.layoutWrap;
		if(!valid()) {
			return false;
		}
		
		if(lWrap.find(".drag-wrap").length === 0) {
			alert("菜单无数据，请至少拖放一个组件或容器！");
			return false;
		}
		
		$(this).data("menuCompConfig", {"layoutId": lWrap.attr("layout_id"), "menuConfig": getMenuCompCfg(lWrap.find(".layout-board"))});
		alert("复制成功！");
	},
	
	btnPasteClick: function(e) {
		var cfg = $("#btn_copy").data("menuCompConfig");
		
		if(!cfg) {
			alert("请先复制菜单数据！");
			return false;
		}
		
		if(ui.layoutWrap.find(".drag-wrap").length !== 0) {
			portal.showConfirm("现有菜单的布局，组件和容器配置会被覆盖，是否继续？", function() {
				buildCopy(cfg);
				alert("粘贴成功！");
			});
		} else {
			buildCopy(cfg);
			alert("粘贴成功！");
		}
		
		function buildCopy(cfg) {
			setMenuChange();
			buildLayout(cfg.layoutId);
			buildAllDnR(cfg.menuConfig);
		}
	},
	
	layoutClick: function(e) {
		var target = $(e.target),
			menuId = $("#menu_wrap").find(".menu-button-selected").attr("menu_id"), 
			layoutId = target.parent().attr("layout_id"),
			lWrap = ui.layoutWrap;
		
		if(!target.hasClass("front-layout-icon") && !target.hasClass("front-layout-text")) {
			return false;
		}
		
		if(!menuId) {
			alert("请选择菜单！");
			return false;
		}
		
		if(lWrap.attr("layout_id") === layoutId) {
			return false;
		}
		
		if(lWrap.find(".layout-board").length > 0 && lWrap.find(".drag-wrap").length > 0) {
			portal.showConfirm("更换布局后需要重新设置组件，确定要更换布局吗？", function() {
				resetMenuChange();
				removeParamForm();
				buildLayout(layoutId);
			});
		} else {
			buildLayout(layoutId);
		}
	},
	
	menuClick: function(e) {
		var target = this, 
			mWrap = $("#menu_wrap"), 
			menuId = target.attr("menu_id"), 
			preMenuId = ui.layoutWrap.attr("menu_id"),
			platId = target.parents("#menu_accordion_header").attr("plat_id");
		
		if(preMenuId && menuId != preMenuId && isMenuChanged()) {
			portal.showConfirm("更换菜单将丢失未保存的数据，确定要更换菜单吗？", function() {
				resetMenuChange();
				removeParamForm();
				loadMenuCfg();
			}, function() {
				e.data.cancelClick();
			});
		} else {
			removeParamForm();
			loadMenuCfg();
		}
		
		function loadMenuCfg() {
			var lWrap = ui.layoutWrap,
				mDiv = ui.menuDiv;
			lWrap.addClass("panel-loading").text("loading...");
			portal.loadMenuCompCfg({
				MENU_ID: menuId, 
				USER_CODE: mDiv.attr("user_code") || "", 
				USER_ROLE: mDiv.attr("user_role") || ""
			}, 
			function(data) {
				lWrap.removeClass("panel-loading").text("");
				
				if(data.length === 0) {
					lWrap.removeData("hasCompData");
					buildLayout($("#accordion_layout").find(".front-layout-wrap:first").attr("layout_id"));
				} else {
					buildLayout(data[0]["LAYOUT_ID"]);
					buildAllDnR(data);
					lWrap.data("hasCompData", true);
				}
				
				lWrap.attr("menu_id", menuId).attr("plat_id", platId);
			}, function() {
				lWrap.removeClass("panel-loading").text("");
				alert("未能获取到菜单组件配置！");
			});
		}
	},

	btnFloatClick: function(e) {
		var target = $(this);
		if(target.hasClass("btn-icon-max")) {
			top.$k.maxWorkspace();
			target.removeClass("btn-icon-max").addClass("btn-icon-min").attr("title", "最小化");
		} else {
			top.$k.minWorkspace();
			target.removeClass("btn-icon-min").addClass("btn-icon-max").attr("title", "最大化");
		}
		portal.resize();
	},
	
	btnPreviewClick: function(e) {
		saveParam2Comp(function() {
			if(!valid()) {
				return false;
			}
			
			var lWrap = ui.layoutWrap;
			if(lWrap.find(".drag-wrap").length === 0) {
				alert("请至少拖放一个组件或容器！");
				return false;
			}
			
			var preWin = $("#preview_window").show(),
				winSize = {
					width: $(window).width() - 50, 
					height: $(window).height() - 50
				};
			if(!preWin.data("window")) {
				preWin.window($.extend({
					draggable:false,
					resizable:false,
					onOpen:function() {
						if(!preWin.find(".ui-mask").length) {
							portal.createMask($(this).css("position", "relative"));
						}
						portal.buildAllComp($("#id_layout_wrap_preview").empty(), getMenuCompCfg(lWrap.find(".layout-board")), lWrap.attr("layout_id"));
					}
				}, winSize));			
			} else {
				preWin.window("resize", winSize);
				preWin.window("open");
			}			
		});
	},
	
	btnSaveClick: function(e) {
		var lWrap = ui.layoutWrap, 
			mDiv = ui.menuDiv;
		
		saveParam2Comp(function() {
			if(!valid()) {
				return false;
			}
			
			if(lWrap.find(".drag-wrap").length === 0) {
				if(lWrap.data("hasCompData")) {			
					portal.showConfirm("没有设置任何组件，将清除原有的菜单配置，是否继续？", function() {
						doSave();
					});
				} else {
					alert("请先给菜单设置组件或容器再保存！");
				}
			} else {
				doSave();
			}		
		});	
		
		function doSave() {
			var mask = portal.createSyncMask("保存中,请稍后");
			portal.requestService({
				"service": "P0004153", 
				"P_USER_CODE": mDiv.attr("user_code") || "", 
				"P_USER_ROLE": mDiv.attr("user_role") || "", 
				"P_MENU_ID": lWrap.attr("menu_id"), 
				"P_LAYOUT_ID": lWrap.attr("layout_id"),
				"P_COMP_CFG": convert(getMenuCompCfg(lWrap.find(".layout-board")))
			}, function(){
				alert("操作成功！");
				resetMenuChange();
				mask.remove();
				lWrap.data("hasCompData", true);
			}, function() {
				mask.remove();
			});
		}
		/**
		 * first:菜单组件//BOARD_INDEX,COMP_CONT_INDEX,COMP_ID,CONT_ID,TAB_DIRECTION,DISP_TITLE,
		 * 					TITLE,COMP_WIDTH,COMP_HEIGHT,COMP_LEFT,COMP_TOP,FIXED_DIRECTION,FIXED_WIDTH,FIXED_HEIGHT;
		 * second:菜单容器组件//BOARD_INDEX,COMP_CONT_INDEX,TAB_INDEX,COMP_INDEX,COMP_ID,DIR_NAME,DISP_TITLE,TITLE,
		 * 					COMP_WIDTH,COMP_HEIGHT,COMP_LEFT,COMP_TOP,FIXED_DIRECTION,FIXED_WIDTH,FIXED_HEIGHT;
		 * third:组件参数//BORD_INDEX,COMP_CONT_INDEX,TAB_INDEX,COMP_INDEX,PARAM_CODE,PARAM_VAL
		 * fourth:容器页签//BOARD_INDEX,COMP_CONT_INDEX,TAB_INDEX,TAB_TITLE,DISP_TYPE
		 */
		function convert(menuCompCfgArr) {
			var all = [],
				first = [], second = [], third = [], fourth = [];
			for(var i = 0, l = menuCompCfgArr.length; i < l; i++) {
				var sCfg = menuCompCfgArr[i];
				var sFirst = [];
				sFirst.push(sCfg["BOARD_INDEX"]);sFirst.push(sCfg["COMP_CONT_INDEX"]);sFirst.push(sCfg["COMP_ID"]);
				sFirst.push(sCfg["CONT_ID"]);sFirst.push(sCfg["TAB_DIRECTION"]);sFirst.push(sCfg["DISP_TITLE"]);
				sFirst.push(sCfg["TITLE"]);sFirst.push(sCfg["COMP_WIDTH"]);sFirst.push(sCfg["COMP_HEIGHT"]);
				sFirst.push(sCfg["COMP_LEFT"]);sFirst.push(sCfg["COMP_TOP"]);
				sFirst.push(sCfg["FIXED_DIRECTION"]);sFirst.push(sCfg["FIXED_WIDTH"]);sFirst.push(sCfg["FIXED_HEIGHT"]);
				first.push(sFirst);
				
				var param = sCfg["_param"] || {};
				for(var key in param) {
					var sThird = [];
					sThird.push(sCfg["BOARD_INDEX"]);sThird.push(sCfg["COMP_CONT_INDEX"]);
					sThird.push("");sThird.push("");sThird.push(key);sThird.push(param[key]);
					third.push(sThird);
				}
				
				var comps = sCfg["_components"] || [];
				for(var j = 0, lj = comps.length; j < lj; j++) {
					var comp = comps[j], sSecond = [];
					sSecond.push(sCfg["BOARD_INDEX"]);sSecond.push(sCfg["COMP_CONT_INDEX"]);sSecond.push(comp["TAB_INDEX"]);
					sSecond.push(comp["COMP_INDEX"]);sSecond.push(comp["COMP_ID"]);sSecond.push(comp["DIR_NAME"]);
					sSecond.push(comp["DISP_TITLE"]);sSecond.push(comp["TITLE"]);
					sSecond.push(comp["COMP_WIDTH"]);sSecond.push(comp["COMP_HEIGHT"]);
					sSecond.push(comp["COMP_LEFT"]);sSecond.push(comp["COMP_TOP"]);
					sSecond.push(comp["FIXED_DIRECTION"]);sSecond.push(comp["FIXED_WIDTH"]);sSecond.push(comp["FIXED_HEIGHT"]);
					second.push(sSecond);
					
					var param = comp["_param"] || {};
					for(var key in param) {
						var sThird = [];
						sThird.push(sCfg["BOARD_INDEX"]);sThird.push(sCfg["COMP_CONT_INDEX"]);
						sThird.push(comp["TAB_INDEX"]);sThird.push(comp["COMP_INDEX"]);
						sThird.push(key);sThird.push(param[key]);
						third.push(sThird);
					}					
				}
				
				var tabs = sCfg["_tab"] || [];
				for(var k = 0, lk = tabs.length; k < lk; k++) {
					var tab = tabs[k], sFourth = [];
					sFourth.push(sCfg["BOARD_INDEX"]);sFourth.push(sCfg["COMP_CONT_INDEX"]);
					sFourth.push(tab["TAB_INDEX"]);sFourth.push(tab["TAB_TITLE"]);sFourth.push(tab["DISP_TYPE"]);
					fourth.push(sFourth);
				}
			}
			all.push(first.join("|"));
			all.push(second.join("|"));
			all.push(third.join("|"));
			all.push(fourth.join("|"));
			return all.join(";");
		}
	},
	
	createContextMenu: function() {
		var nameTitleLen = 64;
		$("#menu_design").menu({
			onClick:function(item) {
				var cPar = $(this).data("menu")._contextParent,
					spt = cPar.attr("dnr_id").split("-"), t = spt[0] || "", id = spt[1] || "",
					cData = portal.getTData(t, id),
					id = item.id;
				switch(id) {
				case "remove":
					cPar.hide(200, function() {
						if(sameComp(cPar)) {
							removeParamForm();
						}			
						cPar.remove();
						setMenuChange();
					});					
					break;
				case "params":
					initParamForm(cData._param, cPar);
					break;
				case "rename_title":
					var win = prompt("修改", "请输入组件标题", function(v) {
							if(v) {
								cPar.find(">.drag-title").attr("drag_title", v).text(v);
								setMenuChange();
							}
						}, function(v) {
							return validStrLen(v, nameTitleLen);
						});
					win.find("input.messager-input").val(cPar.find(">.drag-title").text());
					break;
				case "disp_title":
					var t = cPar.find(">.drag-title");
					if(t.attr("disp_title") === "1") {
						t.attr("disp_title", "0").attr("drag_title", t.text()).html("&nbsp;");
					} else {
						t.attr("disp_title", "1").text(t.attr("drag_title"));
					}
					setMenuChange();
					break;
				case "fixed_top":
					cPar.css({left:0, top:0, height:100, width:cPar.parent().width() - 2});
					cPar.attr("fixed_direction", "0");
					cPar.resizable({handles:"s"});
					portal.alignAllDnR(cPar.parent());
					cPar.parent().prepend(cPar);
					setMenuChange();
					break;
				case "fixed_bottom":
					cPar.css({left:0, top:cPar.parent().height() - 100 - 2, height:100, width:cPar.parent().width() - 2});
					cPar.attr("fixed_direction", "2");
					cPar.resizable({handles:"n"});
					portal.alignAllDnR(cPar.parent());
					cPar.parent().prepend(cPar);
					setMenuChange();
					break;
				case "fixed_left":
					cPar.css({left:0, top:0, height:cPar.parent().height() - 2, width:100});
					cPar.attr("fixed_direction", "3");
					cPar.resizable({handles:"e"});
					portal.alignAllDnR(cPar.parent());
					cPar.parent().prepend(cPar);
					setMenuChange();
					break;
				case "fixed_right":
					cPar.css({left:cPar.parent().width() - 100 - 2, top:0, height:cPar.parent().height() - 2, width:100});
					cPar.attr("fixed_direction", "1");
					cPar.resizable({handles:"w"});
					portal.alignAllDnR(cPar.parent());
					cPar.parent().prepend(cPar);
					setMenuChange();
					break;
				case "cancel_fixed":
					cPar.removeAttr("fixed_direction");
					cPar.resizable({handles:"n,e,s,w,ne,se,sw,nw,all"});
					cPar.parent().append(cPar);
					setMenuChange();
					break;
				case "top":
					cPar.attr("tab_direction", "0");
					portal.resizeTab(cPar);
					setMenuChange();
					break;
				case "right":
					cPar.attr("tab_direction", "1");
					portal.resizeTab(cPar);
					setMenuChange();
					break;
				case "bottom":
					cPar.attr("tab_direction", "2");
					portal.resizeTab(cPar);
					setMenuChange();
					break;
				case "left":
					cPar.attr("tab_direction", "3");
					portal.resizeTab(cPar);
					setMenuChange();
					break;
				}				
			}
		});
		$("#menu_directory").menu({
			onClick:function(item) {
				var cPar = $(this).data("menu")._contextParent,
					cData = portal.getTData("comp", cPar.attr("comp_id")),
					id = item.id;
				switch(id) {
				case "add_dir":
					if("" !== cPar.html() && "0" === cPar.attr("disp_type")) {
						confirm("提示", "新建文件夹需要将容器切换到快捷方式视图，当前视图下的组件将全部清空，是否继续？", function(v) {
							if(v) {
								cPar.empty();
								createNewDir();
							}
						});
					} else {
						createNewDir();
					}
					break;
				case "remove_out":
					var parDir = cPar.parent().data("parent_dir");
					cPar.data("real_ele").removeAttr("dir_name").appendTo(parDir.parent()).show(200);;
					cPar.hide(200, function(){
						cPar.remove();
					});
					setMenuChange();
					break;
				case "remove":
					if(cPar.hasClass("drag-dir")) {	//移除文件夹
						var compInDir = cPar.parent().find(".drag-comp[dir_name='" + cPar.find(".drag-name").text() + "']");
						if(compInDir.length > 0) {
							confirm("提示", "移除文件夹将删除文件夹中的所有快捷方式，是否继续？", function(flag) {
								if(flag) {
									compInDir.remove();
									cPar.hide(200, function(){
										cPar.remove();
									});
									setMenuChange();
								}
							});
							return false;
						}
						cPar.hide(200, function(){
							cPar.remove();
							setMenuChange();
						});
					} else if(cPar.hasClass("drag-comp")) {
						cPar.hide(200, function(){
							if(sameComp(cPar)) {
								removeParamForm();
							}
							setMenuChange();
							cPar.remove();
						});
					} else if(cPar.hasClass("item-in-dir")) {
						var rEle = cPar.data("real_ele");
						rEle.hide(200, function(){
							rEle.remove();
						});
						cPar.hide(200, function(){
							cPar.remove();
						});
						setMenuChange();
					}
					break;
				case "rename_dir":
					var win = prompt("重命名", "请输入文件夹名称", function(v) {
						if(v) {
							cPar.parent().find(".drag-comp[dir_name='" + cPar.find(".drag-name").text() + "']").attr("dir_name", v);
							cPar.find(".drag-name").attr("title", v).text(v);
							setMenuChange();
						}
					}, function(v) {
						var dirs = cPar.parent().find(".drag-dir").filter(function(i, ele) {
							return ele !== cPar[0];
						});
						return !existDirName(dirs, v) && validStrLen(v, nameTitleLen);
					});
					win.find("input.messager-input").val(cPar.find(".drag-name").text());
					break;
				case "rename_title":
					var win = prompt("修改", "请输入组件标题", function(v) {
						if(v) {
							var realEle = cPar.data("real_ele");
							cPar.find(".drag-name").attr("title", v).text(v);
							if(realEle) {
								realEle.find(".drag-name").attr("title", v).text(v);
							}
							setMenuChange();
						}
					}, function(v) {
						return validStrLen(v, nameTitleLen);
					});
					win.find("input.messager-input").val(cPar.find(".drag-name").text());
					break;
				case "params":
					initParamForm(cData._param, cPar);
					break;
				case "change_view":
					if(cPar.html() !== "") {
						confirm("提示", "修改容器视图将清空容器内组件，是否继续？", function(flag) {
							if(flag) {
								changeDispType(cPar);
							}
						});
						return false;
					}
					changeDispType(cPar);
					
					function changeDispType(cPar) {
						cPar.empty();
						cPar.attr("disp_type", cPar.attr("disp_type") === "0" ? "1" : "0");
						setMenuChange();
					}
					break;
				}
				
				function createNewDir() {
					prompt("新建", "请输入文件夹名称", function(v) {
						if(v) {
							cPar.attr("disp_type", "1");
							createContDir(cPar, v);
							setMenuChange();
						}
					}, function(v) {
						return !existDirName(cPar.find(".drag-dir"), v) && validStrLen(v, nameTitleLen);
					});
				}
			}
		});
		$("#menu_tab").menu({
			onClick:function(item) {
				var cPar = $(this).data("menu")._contextParent, id = item.id;
				switch(id) {
				case "add_tab":
					prompt("添加", "请输入容器页签名称", function(v) {
						if(v) {
							var dWrap = cPar.parent().parent();
							createContTab.call(dWrap, "0", v);
							portal.resizeTab(dWrap);
							setMenuChange();
						}
					}, function(v) {
						return validStrLen(v, nameTitleLen);
					});					
					break;
				case "rename_title":
					var win = prompt("重命名", "请输入标题名称", function(v) {
						if(v) {
							cPar.text(v).attr("title", v);
							cPar.parent().parent().find(".cont-tab-body[tab_id='" + cPar.attr("tab_id") + "']").attr("tab_title", v);
							setMenuChange();
						}
					}, function(v) {
						return validStrLen(v, nameTitleLen);
					});
					win.find("input.messager-input").val(cPar.text());
					break;
				case "remove":
					cPar.parent().parent().find(".cont-tab-body[tab_id='" + cPar.attr("tab_id") + "']").remove();
					var next = cPar.next();
					if(next.length !== 0) {
						next.click();
					} else {
						cPar.prev().click();
					}
					cPar.remove();
					setMenuChange();
					break;
				}				
			}
		});		
		
		function existDirName(dirs, dirName) {
			var flag = false;
			dirs.each(function(i, ele) {
				if(dirName === $(ele).find(".drag-name").text()) {
					flag = true;
					return false;	//break
				}
			});
			
			if(flag) {
				alert("已经存在同名的文件夹！");
			}
			return flag;
		}
		
		function validStrLen(str, maxLen) {
			if(/[^\u4e00-\u9fa5\da-zA-Z\-\_\.]+/.test(str)) {
				alert("输入的字符包含非法字符！");
				return false;
			}
			if(str.replace(/[^\x00-\xff]/g, "**").length > maxLen) {
				alert("输入的字符必须小于等于32个中文字符或64个英文字符！");
				return false;
			}
			return true;
		}
	},
		
	initLayout: function(data) {
		var accLayout = $("<div style='max-height:200px;'></div>").appendTo($("#accordion_layout")),
			key, wrap;
		
		for(key in data) {
			wrap = $("<div class='front-layout-wrap'></div>").attr("layout_id", key).appendTo(accLayout);
			$("<div class='front-layout-icon'></div>").addClass(data[key]["ICON"]).appendTo(wrap);
			$("<div class='front-layout-text'></div>").text(data[key]["LAYOUT_NAME"]).attr("title", data[key]["LAYOUT_NAME"]).appendTo(wrap);
		}
	},
		
	initContainer: function(data) {
		var tree = $("<ul id='tree_container'></ul>").appendTo($("#accordion_container")),
			treeData = [{par_node: "0", id: "cont_root", text: "全部容器"}],
			k;
		
		for(k in data) {
			treeData.push({par_node: "cont_root", id: "cont-" + k, text: data[k]["CONT_NAME"]});
		}
		tree.tree($.extend(true, {}, leftTreeOpts, {data: treeData, treeExpand: "all"}));
	},
		
	initComponent: function(data) {
		var tree = $("<ul id='tree_component'></ul>").appendTo($("#accordion_component")),
			compType = getSysDict("COMP_TYPE"),
			compRoot = [], treeData = [],
			k, i = 0, l = compType.length, compRootId;
		
		for(k in data) {
			treeData.push({par_node: "comp_root_" + data[k]["COMP_TYPE"], id: "comp-" + k, text: data[k]["COMP_NAME"]});
		}
		
		for(; i < l; i++) {
			compRootId = "comp_root_" + compType[i]["dict_val"];
			if($.grep(treeData, function(sData) {
				return sData["par_node"] === compRootId;
			}).length) {
				compRoot.push({par_node: "0", id: compRootId, text: compType[i]["dict_des"]});
			}
		}
		tree.tree($.extend(true, {}, leftTreeOpts, {data: compRoot.concat(treeData), treeExpand: "all"}));
	},
	
	resize: function() {
		$("#layout_main").layout("resize");
		var lWrap = $("#id_layout_wrap"), lwPre = lWrap.width(), lhPre = lWrap.height(),
			par = lWrap.parent(), data = getMenuCompCfg(lWrap.find(".layout-board"));
		lWrap.width(par.width() - 2).height(par.height() - par.find("#panel_menu").height() - 3);
		
		var difObj = {
			width:lWrap.width() - lwPre,
			height:lWrap.height() - lhPre
		};
		portal.resizeBoards(lWrap, difObj);
		lWrap.find(".layout-board").empty();
		buildAllDnR(data);
		
		var panel = $("#panel_menu"),
			sWrap = panel.find(".search-wrap"),
			mDiv = panel.find(".menu-div"),
			bWrap = panel.find(".btn-wrap"),
			mDivW = panel.width() - sWrap.width() - bWrap.width() - 20;
			
		mDiv.width(mDivW < 115 ? 115 : mDivW);
		
		var menuData = portal.data("allMenuData");
		if(menuData) {
			createManageMenu(menuData, true);
		}
	},
	
	alignAllDnR: function(parent) {
		parent.find(">.drag-wrap").each(function() {
			var dnr = $(this), left = parseInt(dnr.css("left")) || 0, top = parseInt(dnr.css("top")) || 0,
				e = {data:{left:left, top:top, parent:parent, target:dnr}};
			onDrag.call(dnr, e);
			onStopResize.call(dnr, e);
			if(dnr.attr("dnr_id").indexOf("cont") != -1) {
				portal.resizeTab(dnr);
			}
		});
	},
	
	resetUI: function() {
		ui.layoutWrap.empty().removeAttr("layout_id").removeAttr("menu_id").removeAttr("plat_id");
		resetMenuChange();
		ui.menuDiv.removeAttr("user_code").removeAttr("user_role");
		hideRightMenu();
	}
});


function initMenu(param) {
	param = param || {};
	
	var mask = portal.createSyncMask("正在获取菜单"),
		menuData, 
		mDiv = ui.menuDiv;
	
	portal.requestService($.extend({
		service: "P0004151"
	}, param), function(data) {
		portal.removeData("allMenuData");
		resetLayout();
		mDiv.removeAttr("user_role").removeAttr("user_code");
		
		if(param["USER_ROLE"]) {
			mDiv.attr("user_role", param["USER_ROLE"]);
		}
		if(param["USER_CODE"]) {
			mDiv.attr("user_code", param["USER_CODE"]);
		}
		
		if(data[0].length === 0) {
			hideRightMenu();
			mask.remove();
			return false;
		}
		
		showRightMenu();
		ui.layoutWrap.removeAttr("menu_id").removeAttr("plat_id");
		menuData = portal.handleMenuData(data[0], true);
		
		portal.data("allMenuData", menuData);

		createManageMenu(menuData);
		mask.remove();
		removeParamForm();
	}, function() {
		mask.remove();
		alert("未能获取到门户菜单配置！");
		removeParamForm();
	});			
}

function createManageMenu(menuData, isAfterResize) {
	var lWrap = ui.layoutWrap,
		platData = portal.data("plat_data"),
	
		mTabItems = $("#menu_tab_items"),
		mAccorHeader = $("#menu_accordion_header");
		mWrap = $("#menu_wrap");
	
	if(isAfterResize) {
		resizeMenuWrap();
		regPlatScrollEvent();
		createMenu.call(mAccorHeader.find(".menu-accordion-header-selected"), mWrap.empty(), lWrap.attr("menu_id"));
		return false;
	}
	
	mWrap.appendTo(mAccorHeader.parent());
	mTabItems.empty();
	mAccorHeader.empty();
		
	for(var key in menuData) {
		var tItem = $("<div class='menu-tab-item'></div>").text(platData[key].PLAT_NAME);
		tItem.attr("title", platData[key].PLAT_NAME);
		tItem.attr("plat_id", platData[key].ID);
		mTabItems.append(tItem);
	}
	
	regPlatScrollEvent();
	portal.regHoverEvent.call(mTabItems.find(">div"), "menu-tab-item-selected", "menu-tab-item-hover", null, 
	function(e) {
		var target = $(this), 
			platId = target.attr("plat_id"), 
			platMenuData = menuData[platId];
			preMenuId = ui.layoutWrap.attr("menu_id");
			
		if(preMenuId && isMenuChanged()) {
			portal.showConfirm("更换平台将丢失未保存的数据，确定要更换平台吗？", function() {
				resetMenuChange();
				removeParamForm();
				resetLayout();
				ui.layoutWrap.removeAttr("menu_id").removeAttr("plat_id");
				createPlatMenu();
			}, function() {
				e.data.cancelClick();
			});
		} else {
			removeParamForm();
			resetLayout();
			ui.layoutWrap.removeAttr("menu_id").removeAttr("plat_id");
			createPlatMenu();
		}
		
		function createPlatMenu() {
			mWrap.appendTo(mAccorHeader.parent()).empty().hide();
			mAccorHeader.empty();
			
			mAccorHeader.attr("plat_id", platId);
			for(var key in platMenuData) {
				var hItem = $("<div class='menu-accordion-header'></div>").text(platMenuData[key].menuName);
				hItem.attr("title", platMenuData[key].menuName);
				hItem.attr("menu_pur", key);
				hItem.data("menu_data", platMenuData[key].menuData);
				mAccorHeader.append(hItem);
			}
			portal.regHoverEvent.call(mAccorHeader.find(">div"), "menu-accordion-header-selected", "menu-accordion-header-hover", null, 
			function(e) {
				mWrap.insertAfter($(this)).show();
				createMenu.call(this, mWrap, lWrap.attr("menu_id"));
			});
			resizeMenuWrap();
			mAccorHeader.find(">div:first").click();
		}
	});	
	mTabItems.find(">div:first").click();
	resizeMenuWrap();	
	
	mAccorHeader.find(">div:first").click();
	
	
	function resizeMenuWrap() {
		mWrap.width(mWrap.parents("#menu_div").width() - 28 * mAccorHeader.find(".menu-accordion-header").length - 3 - 15);
	}
	
	function regPlatScrollEvent() {
		portal.regScrollEvent.call(mTabItems, parseInt((ui.menuDiv.width() - 54 - 15) / 70));
	}
	
	function createMenu(mWrap, sMenuId) {
		var target = $(this);
		mWrap.empty().append(portal.createFrontMenu(target.data("menu_data"), parseInt((mWrap.width() - 40 ) / 83)));
		if(sMenuId) {
			mWrap.find(".menu-button[menu_id='" + sMenuId + "']").addClass("menu-button-selected");
		}
		portal.regHoverEvent.call(mWrap.find(".menu-button"), "menu-button-selected", "menu-button-hover", null, 
		function(e) {
			portal.menuClick.call(this, e);
		});
	}
}

function createDnR(isComp, dPar, dimention, title, cData, savedParam, callback) {
	var dnr = $("<div class='drag-wrap'></div>"),
		dnrTitle = $("<div id='title' class='drag-title'></div>");
	
	if(isComp) {	//组件
		dnr.attr("dnr_id", "comp-" + cData["COMP_ID"]);
		dnr.data("_param", getSavedParam(cData._param, savedParam));
	} else {	//容器
		dnr.attr("dnr_id", "cont-" + cData["CONT_ID"]);
		dnr.attr("cont_type", cData["CONT_TYPE"]);
		
		if(cData["CONT_TYPE"] === "2") {
			dnr.attr("tab_direction", cData["TAB_DIRECTION"] || "0");
		}
	}
	
	if(cData["FIXED_DIRECTION"]) {
		dnr.attr("fixed_direction", cData["FIXED_DIRECTION"]);
		dnr.attr("fixed_width", dimention["width"]);
		dnr.attr("fixed_height", dimention["height"]);
	}
	
	dnrTitle.attr("disp_title", cData["DISP_TITLE"] || "1");
	dnrTitle.attr("drag_title", cData["TITLE"] || title);
	dnrTitle.text(cData["DISP_TITLE"] && cData["DISP_TITLE"] === "0" ? "" : cData["TITLE"] || title);
	
	dnr.append(dnrTitle).draggable({
		handle:"#title",
		onDrag:function(e) {
			if(dnr.attr("fixed_direction")) {
				//dnr.removeAttr("fixed_direction");
				//dnr.resizable({handles:getResizeDirection()});
				return false;
			}
			setMenuChange();
			onDrag.call(dnr, e);
		}
	}).resizable({
		handles:getResizeDirection(cData["FIXED_DIRECTION"]),
		onStopResize:function(e) {
			setMenuChange();
			onStopResize.call(dnr, e);
			if(!isComp) {
				portal.resizeTab(dnr);
			}
			if(dnr.attr("fixed_direction")) {
				portal.alignAllDnR(dnr.parent());
			}
		}
	}).appendTo(dPar);
	
	var zidx = dPar.find(">.drag-wrap").length;
	if(!isComp) {
		dnr.css({"z-index":zidx});
	}
	
	bindContextMenu.call(dnr.find("#title"), dnr, "menu_design");
	
	dnr.css({position:"absolute", left:dimention["left"], top:dimention["top"]});
	dnr.animate({width:dimention["width"] + "px", height:dimention["height"] + "px"}, 300, function() {
		if($.isFunction(callback)) {
			callback(dnr);
		}		
		
		var e = {data:{left:dimention["left"], top:dimention["top"], parent:dPar, target:dnr}};
		onDrag.call(dnr, e);
		onStopResize.call(dnr, e);
		if(!isComp) {
			dnr.find(".cont-tab-body").css({"z-index":zidx});
			portal.resizeTab(dnr);
		}
	});		
	dnr.find("#title").click(function(e) {
		if(!isComp || !sameComp(dnr)) {
			saveParam2Comp(function() {
				if(isComp) {
					initParamForm(cData._param, dnr);
				}
			});
		}
	});
}

function createContTab(cType, title, dispType) {
	var cPar = $(this),
		w = cPar.find(".cont-tab-wrap");
	if(w.length === 0) {
		w = $("<div class='cont-tab-wrap'></div>");
	}
	
	if(cType === "1") {
		cPar.find(".cont-tab-wrap").remove();
		cPar.append(w.append(createContTabBody(1, title, dispType, false).show()));
		return;
	}
	
	var h = cPar.find(".cont-tab-head");
	if(h.length === 0) {
		h = $("<div class='cont-tab-head'></div>");
		w.append(h);
	}
	
	title = title ? title : "页签1";
	var t = $("<div class='cont-tab-item'>" + title + "</div>");
	t.attr("title", title).attr("tab_id", (function(items){
		var id = 0;
		items.each(function(i, ele) {
			var tId = parseInt($(ele).attr("tab_id"));
			if(tId > id) {
				id = tId;
			}
		});
		return id + 1;	//自动生成tab_id
	})(h.find(".cont-tab-item")));
	h.append(t);
	
	bindContextMenu.call(t, t, "menu_tab");
	bindContextMenu.call(h, h, "menu_tab");
	
	w.append(createContTabBody(t.attr("tab_id"), title, dispType, true).show());	

	var ti = h.find(".cont-tab-item");
	ti.click(function() {
		var _this = $(this);
		w.find(".cont-tab-body").hide();
		_this.addClass("cont-tab-item-selected").siblings().removeClass("cont-tab-item-selected");
		w.find(".cont-tab-body[tab_id='" + _this.attr("tab_id") + "']").droppable({disabled:false}).show();
	}).click();				
	cPar.append(w);
	
	function createContTabBody(tabId, title, dispType, disabled) {
		var b = $("<div class='cont-tab-body'></div>");
		b.attr("disp_type", dispType || "0");	//默认组件方式显示
		b.attr("tab_id", tabId);
		b.attr("tab_title", title);
		b.droppable({
			disabled:disabled,
			accept:".tree-node",
			onDragEnter:function(e, s) {	//mouseenter容器,保存一份droppables实例,去掉board的droppable功能
				$(this).data("droppables", $(s).data("draggable").droppables);
				$(s).data("draggable").droppables = $(s).data("draggable").droppables.filter(function(idx, ele) {
					return !$(ele).hasClass("layout-board");	
				});
			},
			onDragLeave:function(e, s) {	//mouseleave容器,恢复board的droppable功能
				$(s).data("draggable").droppables = $(this).data("droppables");
				$(this).removeData("droppables");
			},
			onDrop:function(e, s) {
				$(s).data("draggable").droppables = $(this).data("droppables");
				var _this = $(this);
				var sproxy = $(s);
				var spt = sproxy.attr("node-id").split("-"), t = spt[0] || "", id = spt[1] || "";
				if("cont" === t) {
					return false;
				}
				var cData = portal.getTData(t, id);
				if("0" === _this.attr("disp_type")) {	//组件视图							
					var dimention = {};
					var poffset = _this.offset();
					var soffset = sproxy.draggable('proxy').offset();
					dimention["left"] = soffset["left"] - poffset["left"];
					dimention["top"] = soffset["top"] - poffset["top"];
					dimention["width"] = cData["DEF_WIDTH"];
					dimention["height"] = cData["DEF_HEIGHT"];	
					createDnR(true, _this, dimention, cData["COMP_NAME"], cData);
				} else {	//快捷方式视图
					createContItem(_this, cData["COMP_NAME"], cData);
				}
				setMenuChange();
			}
		});		
		bindContextMenu.call(b, b, "menu_directory");
		return b;
	}			
}

function createContDir(cPar, dirName) {
	var dWrap = $("<div class='drag-wrap shortcut-drag-wrap'></div>"),
		dBody = $("<div class='drag-body'></div>"),
		dName = $("<div class='drag-name'></div>");		
	if(dirName) {
		dBody.addClass("shortcut-icon-dir");
		dName.text(dirName).attr("title", dirName);
		dWrap.addClass("drag-dir").append(dBody).append(dName).hide();
		var fComp = cPar.find(".drag-comp:first");
		if(fComp.length !== 0) {
			fComp.before(dWrap);
		} else {
			cPar.append(dWrap);
		}
		dWrap.show(200).droppable({
			accept:".drag-comp",
			onDragEnter:function(e, s) {
				$(s).draggable('proxy').removeClass("proxy-alpha");
			},
			onDragLeave:function(e, s) {
				$(s).draggable('proxy').addClass("proxy-alpha");
			},
			onDrop:function(e, s) {
				var s = $(s),
					dirName = $(this).find(".drag-name").text();
				if(sameComp(s.data("ref"))) {
					saveParam2Comp(function() {
						s.attr("dir_name", dirName).hide(200);	
					});
				} else {
					s.attr("dir_name", dirName).hide(200);	
				}
			}
		}).click(function(e) {
			var wHtml = $("<div closable='true' collapsible='false' minimizable='false' maximizable='false' modal='true'></div>"),
				w = $(window).width(), h =  $(window).height();
			wHtml.appendTo("body").window({
				title:dName.text(),
				resizable:false,
				width:w < 600 ? w - 50 : 600,
				height:h < 400 ? h - 50 : 400,
				onBeforeOpen:function() {
					var shotcuts = cPar.find(".drag-comp[dir_name='" + dName.text() + "']");
					shotcuts.each(function() {
						var shotcut = $(this),
							cloneEle = shotcut.clone().removeClass("droppable").removeClass("drag-comp").addClass("item-in-dir").show();
						cloneEle.appendTo(wHtml).draggable({
							proxy:function(target) {
								return $(target).clone().removeClass("droppable").addClass("proxy-alpha").appendTo(wHtml);
							}
						}).droppable({
							accept:".item-in-dir",
							onDrop:function(e, s) {
								var target = $(this),
									proxy = $(s).draggable("proxy"),
									pPos = proxy.position(),
									tPos = target.position();
								if((pPos.left + proxy.width() / 2) < (tPos.left + target.width() / 2)) {
									$(s).insertBefore(this);	//change UI
									$(s).data("real_ele").insertBefore($(this).data("real_ele"));	//replace real element
								} else {
									$(s).insertAfter(this);	//change UI
									$(s).data("real_ele").insertAfter($(this).data("real_ele"));	//replace real element
								}
							}
						}).data("real_ele", shotcut);
						bindContextMenu.call(cloneEle, cloneEle, "menu_directory");
					});
				},
				onClose:function() {
					wHtml.window("destroy");
				}
			}).css("position", "relative").data("parent_dir", dWrap);
		});
		bindContextMenu.call(dWrap, dWrap, "menu_directory");
	}		
}

function createContItem(cPar, title, cData, dirName, savedParam) {
	var dWrap = $("<div class='drag-wrap shortcut-drag-wrap'></div>"),
		dBody = $("<div class='drag-body'></div>"),
		dName = $("<div class='drag-name'></div>");		
	dBody.addClass(cData["ICON"]);
	dName.text(title).attr("title", title);
	dWrap.attr("comp_id", cData["COMP_ID"]);
	dWrap.addClass("drag-comp").append(dBody).append(dName).hide().appendTo(cPar).show(200);
	dWrap.data("ref", dWrap);
	bindContextMenu.call(dWrap, dWrap, "menu_directory");
	dWrap.draggable({
		proxy:function(target) {
			return $(target).clone().removeClass("droppable").addClass("proxy-alpha").appendTo(cPar);
		}
	}).droppable({
		accept:".drag-comp",
		onDrop:function(e, s) {
			var target = $(this),
				proxy = $(s).draggable("proxy"),
				pPos = proxy.position(),
				tPos = target.position();
			if((pPos.left + proxy.width() / 2) < (tPos.left + target.width() / 2)) {
				$(s).insertBefore(target);
			} else {
				$(s).insertAfter(target);
			}
		}
	}).click(function(e) {
		if(!sameComp(dWrap)) {
			saveParam2Comp(function() {
				initParamForm(cData._param, dWrap);
			});
		}
	});
	if(dirName) {
		dWrap.attr("dir_name", dirName).hide();
	}
	dWrap.data("_param", getSavedParam(cData._param, savedParam));
}


function getSavedParam(paramArr, savedParam) {
	var retParam = {},
		i = 0,
		l = paramArr.length,
		sParam;
	
	paramArr = $.isArray(paramArr) ? paramArr : [];
	savedParam = savedParam || {};
	
	if($.isEmptyObject(savedParam) || 0 === l) {
		return {};
	}
	
	for(; i < l; i++) {
		sParam = paramArr[i];
		if("" !== savedParam[sParam["PARAM_CODE"]]) {
			retParam[sParam["PARAM_CODE"]] = savedParam[sParam["PARAM_CODE"]];
		}
	}
	return retParam;
}

function sameComp(comp) {
	return comp === $("#accordion_comp_param").data("comp");
}

function removeParamForm() {
	var compDiv = $("#accordion_comp_param"), 
		compVals = compDiv.find(".comp-param-value"),
		compVal, pId, jq, type;
	compVals.each(function() {
		compVal = $(this);
		pid = compVal.attr("param_id");
		jq = $("#" + pid, compVal);
		type = jq.attr("input_type");
		if(type !== "1") {
			jq.combobox("destroy");
		} else {
			jq.validatebox("destroy");
		}
	});
	compDiv.data("comp", null).empty().parent().hide();
}

function saveParam2Comp(callback) {
	var compDiv = $("#accordion_comp_param"), 
		refComp = compDiv.data("comp") || $(),
		compVals = compDiv.find(".comp-param-value");
	
	callback = $.isFunction(callback) ? callback : $.noop;
	if(compVals.length === 0) {
		removeParamForm();
		callback();
		return;
	}
	
	var o = {},
		hasInvalid = false;
	compVals.each(function(i, ele) {
		var pid = $(this).attr("param_id"), jq = $("#" + pid), t = jq.attr("input_type");
		
		var v = "";
		if(t === "1") {	//校验不通过的字段不保存
			if(!jq.validatebox("isValid")) {
				hasInvalid = true;
				return true;
			}
			v = jq.val();
		} else {
			if(!jq.combobox("isValid")) {
				hasInvalid = true;
				return true;
			}
			
			if(t === "2") {
				v = jq.combobox("getValue");
			} else if(t === "3") {
				v = jq.combobox("getValues").join("-");
			}
		}
		
		o[pid] = v || "";
	}); 
	
	if(hasInvalid) {
		confirm("提示", "非法的组件参数值将直接忽略不保存，是否继续？", function(f) {
			if(f) {
				_f();
			}
		});
		return false;
	}
	_f();
	
	function _f() {
		refComp.data("_param", $.extend(refComp.data("_param") || {}, o));
		removeParamForm();
		callback();
	}
}

function initParamForm(paramArr, comp) {
	var compDiv = $("#accordion_comp_param"), pCord = compDiv.parent();
	if(paramArr.length == 0) {
		pCord.hide();
		return;
	} else {
		pCord.show();
	}		
	
	if(compDiv.data("comp") === comp) {
		$("#accordion_west_param").accordion("select", "组件参数");
		return;
	}
	compDiv.empty().data("comp", comp);
	
	var preData = comp.data("_param");
	for(var i = 0, l = paramArr.length; i < l; i++) {
		var divLable = $("<div class='comp-param-label'></div>").text(paramArr[i]["PARAM_NAME"]).attr("title", paramArr[i]["PARAM_NAME"]);
		var divValue = $("<div class='comp-param-value'></div>").attr("param_id", paramArr[i]["PARAM_CODE"]);
		var ipt = $("<input style='width:130px;' kui-options='width:135' />");
		ipt.attr("id", paramArr[i]["PARAM_CODE"]);
		ipt.attr("name", paramArr[i]["PARAM_CODE"]);
		divValue.append(ipt);
		
		var itemWrap = $("<div class='comp-param-item-wrap'></div>");
		itemWrap.append(divLable).append(divValue);
		compDiv.append(itemWrap);
		
		var iType = paramArr[i]["INPUT_TYPE"];
		if("1" !== iType) {
			ipt.attr("input_type", iType);
			var copts = {};
			copts["panelHeight"] = 150;
			if("1" === paramArr[i]["VAL_TYPE"]) {	//数据字典
				copts["dict"] = paramArr[i]["VAL_PARAM"];
			} else if("2" == paramArr[i]["VAL_TYPE"]) {	//bex请求
				try {
					copts["textField"] = paramArr[i]["TEXT_FIELD"];
					copts["valueField"] = paramArr[i]["VAL_FIELD"];			
					var oreq = {};
					var pArr = paramArr[i]["VAL_PARAM"].split(",");
					for(var j = 0, lj = pArr.length; j < lj; j++) {
						var pSplit = pArr[j].split("=");
						oreq[pSplit[0]] = pSplit[1];
					}
					copts["req"] = [oreq];
				}catch(e) {
					copts["req"] = [{}];
				}
				if(!copts["req"][0]["service"]) {
					alert(paramArr[i]["PARAM_NAME"] + "参数的bex请求配置错误，请重新配置！");
					delete copts["req"];
				}
				copts["separator"] = "-";
				copts["validType"] = "length[0,64]";
			}
			copts["multiple"] = "3" === iType;	//多选标志
			
			(function(ipt, iType, item) {
				copts.onLoadSuccess = function() {
					if(iType === "2") {
						ipt.combobox("setValue", preData[item] || "");
					}
					else if(iType === "3") {
						ipt.combobox("setValues", (preData[item] || "").split("-"));
					}
				}
				ipt.combobox(copts);
			})(ipt, iType, paramArr[i]["PARAM_CODE"]);
		} else {
			ipt.validatebox({validType:'length[0,64]'});
			ipt.attr("input_type", "1").val(preData[paramArr[i]["PARAM_CODE"]] || "");
		}
	}
	$("#accordion_west_param").accordion("select", "组件参数");
}

function getMenuCompCfg(boards) {
	var menuCompCfg = []
	boards.each(function(i, bEle) {
		var board = $(bEle),
			drags = board.find(">.drag-wrap"),
			fixedSize = portal.getFixedDnR(board).size;
		
		drags.each(function(j, dEle) {
			var drag = $(dEle), title = drag.find(".drag-title"),
				spt = drag.attr("dnr_id").split("-"), t = spt[0] || "", id = spt[1] || "",
				isFixed = drag.attr("fixed_direction") !== undefined;
			
			var compObj = {};
			compObj["BOARD_INDEX"] = i;
			compObj["COMP_CONT_INDEX"] = j;
			compObj["DISP_TITLE"] = title.attr("disp_title");
			compObj["TITLE"] = title.attr("drag_title");
			
			var boardWidth = board.width() - fixedSize.left - fixedSize.right,
				boardHeight = board.height() - fixedSize.top - fixedSize.bottom;
			compObj["COMP_WIDTH"] = isFixed ? "" : formatNumber(drag.width() / boardWidth);
			compObj["COMP_HEIGHT"] = isFixed ? "" : formatNumber(drag.height() / boardHeight);
			
			var offset = drag.position();
			compObj["COMP_LEFT"] = isFixed ? "" : formatNumber((offset["left"] - fixedSize.left) / boardWidth);
			compObj["COMP_TOP"] = isFixed ? "" : formatNumber((offset["top"] - fixedSize.top) / boardHeight);
				
			if("comp" === t) {
				compObj["_compInfo"] = portal.getTData("comp", id);
				compObj["COMP_ID"] = id;
				compObj["CONT_ID"] = "";
				compObj._param = drag.data("_param") || {};
			} else if("cont" === t) {
				compObj["_contInfo"] = portal.getTData("cont", id);
				compObj["CONT_ID"] = id;
				compObj["COMP_ID"] = "";
				var cfg = getContCompCfg(drag.find(".cont-tab-body"));
				compObj._tab = cfg._tab;
				compObj._components = cfg._components;
			}
			compObj["TAB_DIRECTION"] = drag.attr("tab_direction") || "";
			compObj["FIXED_DIRECTION"] = drag.attr("fixed_direction") || "";
			compObj["FIXED_WIDTH"] = (compObj["FIXED_DIRECTION"] === "1" || compObj["FIXED_DIRECTION"] === "3") ? drag.width() : "";
			compObj["FIXED_HEIGHT"] = (compObj["FIXED_DIRECTION"] === "0" || compObj["FIXED_DIRECTION"] === "2") ? drag.height() : "";
			menuCompCfg.push(compObj);
		});
	});		
	
	function getContCompCfg(contTabBody) {
		var cArr = [], tArr = [];
		contTabBody.each(function(i, cBody) {
			var b = $(cBody), tabTitle = b.attr("tab_title"), dispType = b.attr("disp_type");
			
			var tObj = {};
			tObj["TAB_INDEX"] = i; tObj["TAB_TITLE"] = tabTitle || ""; tObj["DISP_TYPE"] = dispType;
			tArr.push(tObj)
			
			if("1" === dispType) {	//快捷方式处理
				b.find(".drag-dir").each(function(j, cDir) {
					var c = $(cDir), dName = c.find(".drag-name").text();
					if(b.find(".drag-comp[dir_name='" + dName + "']").length === 0) {	//保存空文件夹
						var o = {};
						o["TAB_INDEX"] = i; o["COMP_INDEX"] = ""; o["COMP_ID"] = "";
						o["DIR_NAME"] = dName; o["DISP_TITLE"] = ""; o["TITLE"] = "";
						o["COMP_WIDTH"] = ""; o["COMP_HEIGHT"] = ""; o["COMP_TOP"] = ""; o["COMP_LEFT"] = "";
						cArr.push(o);
					}
				});		
				b.find(".drag-comp").each(function(j, cEle) {
					var c = $(cEle);
					var o = {};
					o["TAB_INDEX"] = i; o["COMP_INDEX"] = j; o["COMP_ID"] = c.attr("comp_id");
					o["DIR_NAME"] = c.attr("dir_name") || ""; o["DISP_TITLE"] = "1"; o["TITLE"] = c.find(".drag-name").text();
					o["COMP_WIDTH"] = ""; o["COMP_HEIGHT"] = ""; o["COMP_TOP"] = ""; o["COMP_LEFT"] = ""; 
					o["_compInfo"] = portal.getTData("comp", o["COMP_ID"]);
					o._param = c.data("_param") || {};
					cArr.push(o);	
				});		
			} else {	//普通组件处理
				var fixedSize = portal.getFixedDnR(b).size;
				b.find(".drag-wrap").each(function(j, cEle) {
					var c = $(cEle), dt = c.find(".drag-title"),
						o = {},
						isFixed = c.attr("fixed_direction") !== undefined;
					o["TAB_INDEX"] = i; o["COMP_INDEX"] = j; o["COMP_ID"] = c.attr("dnr_id").split("-")[1];
					o["DIR_NAME"] = ""; o["DISP_TITLE"] = dt.attr("disp_title"); o["TITLE"] = dt.attr("drag_title");
					
					var tbWidth = b.width() - fixedSize.left - fixedSize.right,
						tbHeight = b.height() - fixedSize.top - fixedSize.bottom;
					o["COMP_WIDTH"] = isFixed ? "" : formatNumber(c.width() / tbWidth);
					o["COMP_HEIGHT"] = isFixed ? "" : formatNumber(c.height() / tbHeight);
					o["COMP_LEFT"] = isFixed ? "" : formatNumber((parseInt(c.css("left")) - fixedSize.left) / tbWidth);
					o["COMP_TOP"] = isFixed ? "" : formatNumber((parseInt(c.css("top")) - fixedSize.top) / tbHeight);
					
					o["FIXED_DIRECTION"] = c.attr("fixed_direction") || "";
					o["FIXED_WIDTH"] = (o["FIXED_DIRECTION"] === "1" || o["FIXED_DIRECTION"] === "3") ? c.width() : "";
					o["FIXED_HEIGHT"] = (o["FIXED_DIRECTION"] === "0" || o["FIXED_DIRECTION"] === "2") ? c.height() : "";
					
					o["_compInfo"] = portal.getTData("comp", o["COMP_ID"]);
					o._param = c.data("_param") || {};
					cArr.push(o);						
				});
			}
		});
		
		return {_tab:tArr, _components:cArr};
	}
	
	function formatNumber(number) {
		if(isNaN(number)) {
			return "";
		}
		return Number(number).toFixed(7).substr(0, 9);
	}
	
	return menuCompCfg;
}

function resetMenuChange() {
	ui.layoutWrap.removeData("change_flag");
}

function setMenuChange() {
	ui.layoutWrap.data("change_flag", true);
}

function isMenuChanged() {
	return !!ui.layoutWrap.data("change_flag");
}

function bindContextMenu(cPar, menuId) {	
	var handler = {
		"menu_design":function(e) {
			var menu = $("#menu_design");
			menu.find(".menu-item").hide();
			var id = cPar.attr("dnr_id"), spt = cPar.attr("dnr_id").split("-"), t = spt[0] || "", id = spt[1] || "";
			var cData = portal.getTData(t, id);
			
			if(cData._param && !$.isEmptyObject(cData._param)) {
				menu.find("#params").show();
			}
			
			if(cPar.attr("cont_type") === "2") {
				menu.find("div[align][align!='" + (cPar.attr("tab_direction") || "0") + "']").show();
			}
			
			if(cPar.find(".drag-title").attr("disp_title") === "1") {
				menu.find("#disp_title").show().find(".menu-text").text("禁用标题");
				menu.find("#rename_title").show();
			} else {
				menu.find("#disp_title").show().find(".menu-text").text("启用标题");
			}
			menu.find("#remove").show();
			if(cPar.attr("fixed_direction")) {
				menu.find("#cancel_fixed").show();
			} else {
				var dnr = portal.getFixedDnR(cPar.parent()).dnr;
				
				if(!dnr.top.length && !dnr.bottom.length && !dnr.left.length && !dnr.right.length) {
					menu.find("#fixed_top").show();
					menu.find("#fixed_bottom").show();
					menu.find("#fixed_left").show();
					menu.find("#fixed_right").show();
				} else {
					if(dnr.top.length || dnr.bottom.length) {
						if(!(dnr.top.length && dnr.bottom.length)) {
							if(dnr.top.length) {
								menu.find("#fixed_bottom").show();
							}
							if(dnr.bottom.length) {
								menu.find("#fixed_top").show();
							}
						}
					} else if(dnr.left.length || dnr.right.length) {
						if(!(dnr.left.length && dnr.right.length)) {
							if(dnr.left.length) {
								menu.find("#fixed_right").show();
							}
							if(dnr.right.length) {
								menu.find("#fixed_left").show();
							}
						}							
					}
				}
			}
			
			showMenu.call(menu, e);
		},
		"menu_directory":function(e) {
			var menu = $("#menu_directory");
			menu.find(".menu-item").hide();
			if(cPar.hasClass("cont-tab-body")) {
				menu.find("#add_dir").show();
				if(cPar.attr("disp_type") === "1") {
					menu.find("#change_view").show().find(".menu-text").text("组件视图");
				} else {
					menu.find("#change_view").show().find(".menu-text").text("快捷方式视图");
				}					
			} else if(cPar.hasClass("drag-dir")) {
				menu.find("#remove").show();
				menu.find("#rename_dir").show();
			} else if(cPar.hasClass("drag-comp")) {
				menu.find("#rename_title").show();
				var cData = portal.getTData("comp", cPar.attr("comp_id"));
				if(!$.isEmptyObject(cData._param || {})) {
					menu.find("#params").show();
				}
				menu.find("#remove").show();
			} else if(cPar.hasClass("item-in-dir")) {
				menu.find("#rename_title").show();
				menu.find("#remove_out").show();
				menu.find("#remove").show();
			}
			showMenu.call(menu, e);
		},
		"menu_tab":function(e) {
			var menu = $("#menu_tab").show();
			menu.find(".menu-item").hide();
			if(cPar.hasClass("cont-tab-item")) {
				menu.find("#rename_title").show();
				if(cPar.parent().find(".cont-tab-item").length > 1) {
					menu.find("#remove").show();
				}
			} else if(cPar.hasClass("cont-tab-head")) {
				menu.find("#add_tab").show();
			}
			showMenu.call(menu, e);
		}
	};
	this.unbind("contextmenu").bind("contextmenu", function(e) {
		handler[menuId](e);
		return false;
	});
	
	function showMenu(e) {
		this.data("menu")._contextParent = cPar;
		this.menu("show", {
			left: e.pageX,
			top: e.pageY
		});				
	}	
}

function buildAllDnR(data) {
	var lWrap = $("#id_layout_wrap");
	
	for(var i = 0, l = data.length; i < l; i++) {
		var sData = data[i];
		if(sData["COMP_ID"] && "" !== sData["COMP_ID"]) {
			buildComp(sData);
		} else if(sData["CONT_ID"] && "" !== sData["CONT_ID"]) {
			buildCont(sData);
		}
	}
	
	function buildComp(sData) {
		var dropBoard = lWrap.find(".layout-board:eq('" + sData["BOARD_INDEX"] + "')"),
			cData = portal.getTData("comp", sData["COMP_ID"]);
		
		if(cData) {
			createDnR(true, dropBoard, portal.calSize(dropBoard, sData), 
					sData["TITLE"] || cData["COMP_NAME"], $.extend({}, sData, cData), sData["_param"] || {});
		}
	}
	
	function buildCont(sData) {
		var dropBoard = lWrap.find(".layout-board:eq('" + sData["BOARD_INDEX"] + "')"),
			cData = portal.getTData("cont", sData["CONT_ID"]);
		
		createDnR(false, dropBoard, portal.calSize(dropBoard, sData), 
				sData["TITLE"] || cData["CONT_NAME"], $.extend({}, sData, cData), null, 
		function(cWrap) {
			for(var i = 0, l = sData._tab.length; i < l; i++) {
				createContTab.call(cWrap, cData["CONT_TYPE"], sData._tab[i]["TAB_TITLE"] || "", sData._tab[i]["DISP_TYPE"]);
			}
			cWrap.find(".cont-tab-item:first").click();
			portal.resizeTab(cWrap);
			for(var i = 0, l = sData._tab.length; i < l; i++) {
				var sTab = sData._tab[i]
				var b = cWrap.find(".cont-tab-body:eq(" + sTab["TAB_INDEX"] + ")"), dispType = b.attr("disp_type");
				
				for(var j = 0, lj = sData._components.length; j < lj; j++) {
					var sComp = sData._components[j],
						cDataComp = portal.getTData("comp", sComp["COMP_ID"]);
					if(cDataComp && sComp["TAB_INDEX"] === sTab["TAB_INDEX"]) {
						if("1" === dispType) {
							if(sComp["DIR_NAME"] && !portal.existDir(b, sComp["DIR_NAME"])) {
								createContDir(b, sComp["DIR_NAME"]);
							}
							createContItem(b, sComp["TITLE"] || cDataComp["COMP_NAME"], cDataComp, sComp["DIR_NAME"], sComp._param || {});
						} else {		
							createDnR(true, b, portal.calSize(b, sComp), 
									sComp["TITLE"] || cDataComp["COMP_NAME"], $.extend({}, sComp, cDataComp), sComp["_param"] || {});
						}
					}
				}
			}					
		});
	}		
}

function valid() {
	var lWrap = $("#id_layout_wrap"),
		menuId = lWrap.attr("menu_id"),
		layoutId = lWrap.attr("layout_id");
	
	if(!menuId) {
		alert("请选择菜单！");
		return false;
	}
	
	if(!layoutId) {
		alert("请选择布局！");
		return false;
	}
	return true;
}

function buildLayout(layoutId) {
	var lWrap = $("#id_layout_wrap"),
		lData = portal.getTData("layout", layoutId);
	
	resetLayout();
	lWrap.attr("layout_id", lData["LAYOUT_ID"]);
	$("#accordion_layout").find(".front-layout-wrap[layout_id='" + lData["LAYOUT_ID"] + "']").addClass("front-layout-wrap-selected");
	if(0 === lData["_board"].length) {
		alert("请先在布局管理中设置布局的板块信息！");
		return false;
	}
	
	for(var i = 0, l = lData["_board"].length; i < l; i++) {
		var lBoard = $("<div class='layout-board'></div>");
		lBoard.attr("board_id", lData["_board"][i]["BOARD_ID"]);
		lBoard.addClass(lData["_board"][i]["BOARD_CLASS"]);
		lWrap.append(lBoard);
	}
	portal.resizeBoards(lWrap);
	lWrap.find(".layout-board").droppable({
		disabled:false,
		accept:".tree-node",
		onDrop:function(e, s) {
			var board = $(this),
				sproxy = $(s),
				spt = sproxy.attr("node-id").split("-"), t = spt[0] || "", id = spt[1] || "",
				cData = portal.getTData(t, id),
			
				dimention = {},
				poffset = board.offset(),
				soffset = sproxy.draggable('proxy').offset();
			
			dimention["left"] = soffset["left"] - poffset["left"];
			dimention["top"] = soffset["top"] - poffset["top"];
			//dimention["width"] = cData["DEF_WIDTH"];
			//dimention["height"] = cData["DEF_HEIGHT"];
			
			if("comp" === t) {	//初始化组件
				dimention["width"] = 100;
				dimention["height"] = 100;
				createDnR(true, board, dimention, cData["COMP_NAME"], cData);
			} else if("cont" === t) {	//初始化容器
				dimention["width"] = 300;
				dimention["height"] = 200;
				createDnR(false, board, dimention, cData["CONT_NAME"], cData, null, 
				function(comp) {
					createContTab.call(comp, cData["CONT_TYPE"]);
				});
			}
			setMenuChange();
		}
	});			
}

function hideRightMenu() {
	$("#menu_div").hide();
	$(".btn-wrap").hide();
}

function showRightMenu() {
	$("#menu_div").show();
	$(".btn-wrap").show();
}

function resetLayout() {
	$("#id_layout_wrap").removeAttr("layout_id").removeData().empty();
	$("#accordion_layout").find(".front-layout-wrap").removeClass("front-layout-wrap-selected");
}

function getResizeDirection(fixedDirection) {
	var s = "n,e,s,w,ne,se,sw,nw,all";
	switch(fixedDirection) {
	case "0":
		s = "s";
		break;
	case "1":
		s = "w";
		break;
	case "2":
		s = "n";
		break;
	case "3":
		s = "e";
		break;
	}
	return s;
}

function onDrag(e) {
	var d = e.data, t = $(d.target), p = $(d.parent),
		size = portal.getFixedDnR(p).size;
	if(t.attr("fixed_direction")) {
		size = {top:0, right:0, bottom:0, left:0};
	}
	
	if (d.left < size.left) {
		d.left = size.left;
		t.css("left", size.left);
	}
	if (d.top < size.top) {
		d.top = size.top;
		t.css("top", size.top);
	}
	if (d.left + t.outerWidth() > p.width() - size.right) {
		var left = p.width() - size.right - t.outerWidth();
		d.left = left;
		t.css("left", left);
	}
	if (d.top + t.outerHeight() > p.height() - size.bottom) {
		var top = p.height() - size.bottom - t.outerHeight();
		d.top = top;
		t.css("top", top);
	}	
}

function onStopResize(e) {
	var d = e.data, t = $(d.target), p = t.parent(),
		dnrInfo = portal.getFixedDnR(p),
		size = dnrInfo.size,
		dnr = dnrInfo.dnr;
	
	if(t.attr("fixed_direction")) {
		size = {top:0, right:0, bottom:0, left:0};
		dnr.top.width(p.width() - 2);
		dnr.bottom.width(p.width() - 2).css("top", p.height() - dnrInfo.size.bottom);
		dnr.left.height(p.height() - 2);
		dnr.right.height(p.height() - 2).css("left", p.width() - dnrInfo.size.right);;
	}
	
	if (d.left < size.left) {
		d.left = size.left;
		t.css("left", size.left);
	}
	if (d.top < size.top) {
		d.top = size.top;
		t.css("top", size.top);
	}
	if (d.left + t.outerWidth() >= p.width() - size.right) {
		t.width(p.width() - size.right - d.left -2);
	}
	if (d.top + t.outerHeight() >= p.height() - size.bottom) {
		t.height(p.height() - size.bottom - d.top -2);
	}				
}

portal = window.frontManager = kPortal();
})(jQuery, window);