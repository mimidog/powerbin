/**
 * 用于创建包含图标选择的combo组件
 * 
 * 包含一些图标（管理平台菜单图标，门户菜单图标，门户组件图标，门户布局图标）的定义和一个创建图标选择的方法createIconPanel（挂在window下） 
 *
 * @author liuqing 很久以前写的了，2014-9-15修改并补上一些必要的注释
 * 
 */
(function($) {
	
		/**
		 * 管理平台菜单图标
		 */
	var manageIcons = ["icon-red-flag", "icon-smile-face", "icon-sys-stat", "icon-user-set",
			           "icon-post-set", "icon-client-info", "icon-honor-badge", "icon-money-manage",
			           "icon-money-box", "icon-table-cell", "icon-light-up", "icon-buy-bag",
			           "icon-message-page", "icon-target-set", "icon-gift-list", "icon-user-info",
			           "icon-user-detail", "icon-menu-select", "icon-protal-set", "icon-data-stat",
			           "icon-gold-count", "icon-notic", "icon-metal-star", "icon-gift",
			           "icon-money", "icon-rmb", "icon-user-stat", "icon-metal-gold",
			           "icon-us-dollar", "icon-gold-crown", "icon-red-heart", "icon-page-set",
			           "icon-flow-set", "icon-earth", "icon-buiness-bag", "icon-title-pen",
			           "icon-page-detail", "icon-yellow-flag", "icon-gold-key", "icon-tel-phone",
			           "icon-work-flow", "icon-notic-bell", "icon-hand-point", "icon-link-url",
			           "icon-warning", "icon-notic-small", "icon-blue-pen", "icon-yellow-pen",
			           "icon-yellow-add", "icon-red-add", "icon-copy", "icon-green-block",
			           "icon-red-pen", "icon-black-up", "icon-black-down", "icon-white-up",
			           "icon-white-down", "icon-blue-right", "icon-red-left", "icon-red-right",
			           "icon-bluepoint-right", "icon-bluepoint-down", "icon-secmenu-normal", "icon-secmenu-sel",
			           "icon-thirdmenu-normal", "icon-red-point", "icon-turn-left", "icon-turn-right", "icon-red-close"],
			           
	    /**
	     * 门户布局图标
	     */
	    layoutIcons = ["layout-icon-1-3", "layout-icon-1-3-1", "layout-icon-1-2-2", "layout-icon-1-2-1",
			           "layout-icon-1-4", "layout-icon-2-2", "layout-icon-3-2", "layout-icon-1-1-2",
			           "layout-icon-1-1-3", "layout-icon-free"],
		/**
		 * 门户组件图标
		 */
	    shotcustIcons = ["tools-icon-39",
                         "tools-icon-41",
                         "tools-icon-59",
                         "tools-icon-62", "tools-icon-69",
                         "tools-icon-73", "tools-icon-74", "tools-icon-75",
                         "tools-icon-76", "tools-icon-77", "tools-icon-78", "tools-icon-79", "tools-icon-80",
                         "tools-icon-82", "tools-icon-83", "tools-icon-84",
                         "tools-icon-87", "tools-icon-88", "tools-icon-89", "tools-icon-90",
                         "tools-icon-91", "tools-icon-92", "tools-icon-93", "tools-icon-94",
                         "tools-icon-96", "tools-icon-98", "tools-icon-99", "tools-icon-100",
                         "tools-icon-101", "tools-icon-102", "tools-icon-103", "tools-icon-104", "tools-icon-105",
                         "tools-icon-106", "tools-icon-107", "tools-icon-108", "tools-icon-109",
                         "tools-icon-111", "tools-icon-112", "tools-icon-113", "tools-icon-114", "tools-icon-115",
                         "tools-icon-116", "tools-icon-117", "tools-icon-118", "tools-icon-119", "tools-icon-120",
                         "tools-icon-121", "tools-icon-122", "tools-icon-123", "tools-icon-124", "tools-icon-125",
                         "tools-icon-126", "tools-icon-127", "tools-icon-128", "tools-icon-129", "tools-icon-130",
                         "tools-icon-132", "tools-icon-133", "tools-icon-134", "tools-icon-135",
                         "tools-icon-136", "tools-icon-137", "tools-icon-138", "tools-icon-139", "tools-icon-140",
                         "tools-icon-141", "tools-icon-142", "tools-icon-143", "tools-icon-145",
                         "tools-icon-148",
                         "tools-icon-154", "tools-icon-155",
                         "tools-icon-157", "tools-icon-159", "tools-icon-160",
                         "tools-icon-161", "tools-icon-162", "tools-icon-164",
                         "tools-icon-171", "tools-icon-174", "tools-icon-175",
                         "tools-icon-176", "tools-icon-177", "tools-icon-178", "tools-icon-179", "tools-icon-180",
                         "tools-icon-181", "tools-icon-182", "tools-icon-183",
                         "tools-icon-186", "tools-icon-187", "tools-icon-188", "tools-icon-190",
                         "tools-icon-192", "tools-icon-193", "tools-icon-194", "tools-icon-195",
                         "tools-icon-196", "tools-icon-197", "tools-icon-198", "tools-icon-199", "tools-icon-200",
                         "tools-icon-201", "tools-icon-202", "tools-icon-203", "tools-icon-204", "tools-icon-205",
                         "tools-icon-206", "tools-icon-208", "tools-icon-209", "tools-icon-210",
	                       "tools-icon-211", "tools-icon-212", "tools-icon-213", "tools-icon-214", "tools-icon-215",
                         "tools-icon-216", "tools-icon-217", "tools-icon-218", "tools-icon-220", "tools-icon-221",
						             "tools-icon-222", "tools-icon-223", "tools-icon-225", "tools-icon-236",
                         // begin add by pengqc 20150714：增加股转组件图标样式定义
	                       "comid-neeq-01", "comid-neeq-02", "comid-neeq-03", "comid-neeq-04", "comid-neeq-05",
                         "comid-neeq-06", "comid-neeq-07", "comid-neeq-08", "comid-neeq-09", "comid-neeq-10",
	                       "comid-neeq-11", "comid-neeq-12", "comid-neeq-13", "comid-neeq-14", "comid-neeq-15",
                         // end add by pengqc 20150714：增加股转组件图标样式定义
                         // begin add by pengqc 20150728：增加股转组件图标样式定义
	                       "comid-hks-01", "comid-hks-02", "comid-hks-03", "comid-hks-04", "comid-hks-05",
                         "comid-hks-06", "comid-hks-07", "comid-hks-08", "comid-hks-09", "comid-hks-10",
	                       "comid-hks-11", "comid-hks-12", "comid-hks-13", "comid-hks-14",
                         // end add by pengqc 20150728：增加股转组件图标样式定义
                         // begin add by pengqc 20150728：增加股转组件图标样式定义
	                       "comid-sh-01", "comid-sh-02", "comid-sh-03", "comid-sh-04",
                         "comid-sz-01", "comid-sz-02", "comid-sz-03", "comid-sz-04", "comid-sz-05",
	                       "comid-sz-06", "comid-sz-07", "comid-sz-08",
                         // end add by pengqc 20150728：增加股转组件图标样式定义
                         "shortcut-icon-ruler", "shortcut-icon-book", "shortcut-icon-phone", "shortcut-icon-desktop",
			             "shortcut-icon-call", "shortcut-icon-filebox", "shortcut-icon-userlist", "shortcut-icon-giftbox",
			 	         "shortcut-icon-abc", "shortcut-icon-count", "shortcut-icon-goldcup", "shortcut-icon-paper",
			 	         "shortcut-icon-folder1", "shortcut-icon-folder2", "shortcut-icon-count2", "shortcut-icon-money",
				         "shortcut-icon-coins", "shortcut-icon-date", "shortcut-icon-count3", "shortcut-icon-light",
	     		         "shortcut-icon-post", "shortcut-icon-tips", "shortcut-icon-scan", "shortcut-icon-moneytime",
				         "shortcut-icon-userinfo", "shortcut-icon-earth", "shortcut-icon-mappoint", "shortcut-icon-edit",
				         "shortcut-icon-zoom", "shortcut-icon-persent", "shortcut-icon-card", "shortcut-icon-count4",
				         "shortcut-icon-stock", "shortcut-icon-book2", "shortcut-icon-star", "shortcut-icon-toolset",
				         "shortcut-icon-data", "shortcut-icon-conputer", "shortcut-icon-vipuser", "shortcut-icon-video",
				         "shortcut-icon-date2", "shortcut-icon-folderset"],

	   /**
		* 门户菜单图标
		*/
        portalMenuIcons = ["menu-button-computer", "menu-button-flag", "menu-button-paper", "menu-button-zoom",
            		       "menu-button-disk", "menu-button-head", "menu-button-merge", "menu-button-card",
            		       "menu-button-tools", "menu-button-up", "menu-button-people", "menu-button-time", "menu-button-bag", 
            		       "menu-button-card2", "menu-button-computer2", "menu-button-percent", "menu-button-userdetail", 
            		       "menu-button-paperstar", "menu-button-edit", "menu-button-counter", "menu-button-useredit", "menu-button-paperadd"];
	
	
	kuiloader.loadCss("../../opp/css/portal-icon.css");	//加载门户图标样式表
	
	if($.parser) {
		var f = $.parser.onComplete;
		$.parser.onComplete = function(context) {
			f.call(this, context);
            context = $(context);
			var icons = [{
				viewId:"UPT_layoutMrg",
				field:"ICON",
				panelWidth:250,
				panelHeight:170,
				itemWidth:55,
				itemHeight:40,
				borderHover:"1px solid red",
				backgroundStyle:"front-layout-icon",
				items: layoutIcons
			},{
				viewId:"UPT_compMrg",
				field:"ICON",
				panelWidth:400,
				panelHeight:170,
				itemWidth:60,
				itemHeight:60,
				borderHover:"1px solid red",
				backgroundStyle:"drag-body",
				items: shotcustIcons		
			}];
			
			if(!context || !$(context).length) {
				return false;
			}
			
			var pId = context.attr("id");
			if(!pId || pId.indexOf("PrivateCommonDialogId") !== 0) {
				return false;
			}
			for(var i = 0, l = icons.length; i < l; i++) {
				var icon = icons[i], field = context.find("input[name='" + icon["field"] + "']");
				if(pId.indexOf(icon.viewId) === -1) {
					continue;
				}
				field.combo({editable:true, acceptInput:true, width:133}).attr("name", icon["field"]);
				createIconPanel.call(field, icon);
			}
		}
	}
	
	function createIconPanel(iconCfg) {
		var combo = $(this), opts, panel;

		if(!combo.data("combo")) {
			return;
		}
		
		opts = combo.combo("options");
		panel = combo.combo("panel");

		opts.panelWidth = iconCfg.panelWidth;
		opts.panelHeight = iconCfg.panelHeight;
		
		panel.panel("resize", {
			width: iconCfg.panelWidth,
			height: iconCfg.panelHeight
		});	

		for(var i = 0, l = iconCfg.items.length; i < l; i++) {
			var item = iconCfg.items[i], itemDiv = $("<div></div>");
			itemDiv.addClass(iconCfg.backgroundStyle).addClass(item).attr("icon-value", item).attr("title", item);
			itemDiv.css({"width":iconCfg.itemWidth, "height":iconCfg.itemHeight,
				"float":"left", "border":iconCfg.borderStyle || "1px solid white", "margin":"5px"});
			itemDiv.mouseenter(function() {
				$(this).css("border", iconCfg.borderHover || "1px solid red");
			}).mouseleave(function() {
				$(this).css("border", iconCfg.borderStyle || "1px solid white");
			}).click(function() {
				combo.combo("setValue", $(this).attr("icon-value")).combo("hidePanel");
			});
			panel.append(itemDiv);
		}
	}
	
	window.menuIcons = [{
        panelWidth:400,
        panelHeight:200,
        itemWidth:60,
        itemHeight:58,
        borderHover:"1px solid red",
        backgroundStyle:"drag-body",
        items:shotcustIcons
	},{
		panelWidth:400,
		panelHeight:200,
		itemWidth:60,
		itemHeight:58,
		borderHover:"1px solid red",
        backgroundStyle:"drag-body",
        items:shotcustIcons
	}];
	window.createIconPanel = createIconPanel;
})(jQuery);

function validateMenuIcon() {
	var val = $(this).combo("getValue");
	if($.trim(val).length==0 || !/^[_a-zA-Z0-9-]+$/.test(val) || $(this).combo("panel").find("div[icon-value="+val+"]").length==0) {
		$(this).combo("setValue",'').combo("setText",'');
	}
}