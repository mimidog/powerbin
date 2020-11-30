/**
 * @author noma
 * kjdp 3.5.0
 * Copyright (c) 2013 kingdom
 * Date: 2013/12/26
 */

var kjdp = function() {
    this.version = {
        version: '3.5.0'
    };
    this.config = {
        title: '管理平台',
        version: '1.0',
        minWidth: 900,
        minHeight: 300,
        language: 'zh',
        base: 'kui-base/',
        theme: 'default',
        style: 'blank.png'
    };
	this.logining=false;
	this.status="init";
	this.treeData = [];
    this.groups = {};
    this.kjdpmenus = [];
    this.childMenus = [];
	this.encKey = "";
	this.lockCallback = "";
};

kjdp.fn = kjdp.prototype = {
    constructor: kjdp,
    //初始化应用框架 
    init: function() {		
        if (!$k.login.checkSession()) {
            $k.login.init();
        } else {
			$k.getEncryptKey();
            $k.startup();
        }
        return this;
    },
	getEncryptKey:function(){
		$.ajax({
			url: "kjdp_encrypkey",
			contentType: 'text/plain; charset=utf-8',
			async:false,
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				window.$kencKey = data;
			}
		});
	},
    initMenusData:function(){
    	ajaxRequest({
    		url:'kjdp_ajax?returnType=json',
    		func: function(data) {
    			var tmp = data[0];
    			$("body").data("menuData",tmp);
    			$k.initTreeMenu("kingdomMenu",tmp).createSysFunMap();
    		},
    		req: [{
    			"service": "P0004001",
    			"USER_CODE":g_user.userId
    		}]
    	});
    },
    initTreeMenu:function(elementId,data){
    	$k.treeData = [];
    	$k.treeData = data;
    	$k.group();
    	$k.renderTo(elementId);
		$("#kingdomMenu ul").find("li.active").each(function() {
 			$(this).parents("ul").slideDown(500);
 			$(this).parents("ul").parent("li").find("span[name='sign']").removeClass().addClass("openedSign");
 		});
		
		//添加icon
		$("#kingdomMenu").find("ul:first").find("li").each(function() {
 			if($(this).find("ul").size() != 0){
 				$(this).find("a:first").append("<span class='closedSign' name='sign' style='margin-right:5px;'></span>");
 			}
 		});
		return this ;
    },
    resize:function(){
    	var ch = $(window).height();
    	var cw = $(window).width();
    	if(ch==746)ch=706;
		
    	$("#kingdomMenu").css("height",ch-97);
    	var target = $(".frame-map",$("#frameTab"));
    	
    	if(target){
    		if(cw<window.screen.width){
    			var intval = window.setInterval(function(){	
    				var h = target.find(".frame-child-map").height();
    				if(h){
    					target.find(".frame-map-left").css("height",h);
    	    			target.find(".frame-map-right").css("height",h);
    					window.clearInterval(intval);
    				}	
    			},100);
    			
    		}else if(cw==window.screen.width){
    			target.find(".frame-map-left").css("height",146);
    			target.find(".frame-map-right").css("height",146);
    		}
    	}
		$("#frameTab").height(ch-65);
    	if($k.status =="ready" ){
			var opts = $('#frameTab').tabs('options');
			opts.height=ch-65;
    		var index = $('#frameTab').tabs('getTabIndex',$('#frameTab').tabs("getSelected"));
    		$('#frameTab').tabs('select', index);			
    		$('#frameTab').tabs('resize');
    	}
		
	},
	addTabs: function(menuId, title, link, reloadIfExists) {
		//tabs控件有判断是否重复，则不需再判断
        /*if ($('#frameTab').tabs('exists', title)) {
            $('#frameTab').tabs('select', title);
        } else {*/
            var url = link, sux = "_=" + Math.random(99999999),
				frameTab, existTab;

            if (link) {
				url += (url.indexOf("?") > -1 ? "&" + sux : "?" + sux);
				frameTab = $('#frameTab');
				existTab = frameTab.tabs("getTabById", menuId);
				if(existTab && existTab.length) {
					frameTab.tabs("select", menuId, true);
					if(reloadIfExists) {
						existTab.find("iframe").attr("src", url);
					}
					return;
				}

				frameTab.tabs('addPageTab', {
                    id: menuId,
                    title: title,
                    url: url
                });
                $.parser.director(frameTab);
            }
        //}
    },
	bindEvent:function(){
		$(".frame-map-text",$("#frameTab")).live("click",function(e){
			$k.addTabs($(this).attr("id"), $(this).attr("name"), $(this).attr("link"));
		});
		$("#kingdomMenu ul").find("li a").die("click").live("click",function(e){
			var menuLink = $(this).parent().attr("menuLink") ;
			if(menuLink != "undefined"){
				$k.addTabs($(this).parent().attr("menuId"), $(this).parent().attr("title"), menuLink);
			}
			
			var height = $(this).parent().find("ul:first").height() ;
			if(height > 300){
				$(this).parent().find("ul:first").height(300);
			}
			if($(this).parent().find("ul").size() != 0){
					if(!$(this).parent().find("ul").is(':visible')){
						parents = $(this).parent().parents("ul");
						visible = $(this).find("ul:visible");
						visible.each(function(visibleIndex){
							var close = true;
							parents.each(function(parentIndex){
								if(parents[parentIndex] == visible[visibleIndex]){
									close = false;
									return false;
								}
							});
							if(close){
								if($(this).parent().find("ul") != visible[visibleIndex]){
									$(visible[visibleIndex]).slideUp('fast', function(){
										$(this).parent("li").find("span[name='sign']").removeClass().addClass("closedSign");
									});
									
								}
							}
						});
					}
					
					$(this).parent().siblings("li").find("ul:first").slideUp('fast', function(){
						$(this).parent("li").find("span[name='sign']").delay(0).removeClass().addClass("closedSign");
					});
					
  				if($(this).parent().find("ul:first").is(":visible")){
  					
  					$(this).parent().find("ul:first").slideUp('fast', function(){
  						$(this).parent("li").find("span[name='sign']").delay(0).removeClass().addClass("closedSign");
  					});
  				}else{
  					$(this).parent().find("ul:first").slideDown('fast', function(){
  						$(this).scrollTop(0,0);
  						$(this).parent("li").find("span[name='sign']").delay(0).removeClass().addClass("openedSign");
  					});
  				}
  				
  			}
		});
		
		$("#frame-search").bind({
			click:function(e){
				if(this.value=='请输入关键字...')
					this.value='';
			},
			blur:function(e){
				if(this.value=='')
					this.value='请输入关键字...';
			}
		});
		
		$("#frame-search-icon").bind({
			click:function(e){
				e.stopPropagation();
				$k.searchMenu();
			}
		});

		$("#frame-search").bind({
			keydown:function(e){
				if(e.keyCode==13) $k.searchMenu();
			}
		});
		
		$(".frame-lock-btn",$("#lock")).bind("click",function(e){
			$k.getEncryptKey();
			var password = encrypt($("#lock_password").val(), $("#lock_username").val());
			var params = {USER_CODE:$("#lock_username").val(),TRD_PWD: password};
		    var requestXmlStr = encrypt(kui.makeXmlRequestStr([params]),window.$kencKey);
		    $.ajax({
		        url: "kjdp_unlock",
		        type: "POST",
				data: requestXmlStr,
				//contentType: 'text/json; charset=utf-8',
		        dataType: 'text',
		        success: function(data) {
		        	var retStr = eval('(' + data + ')');
		        	if (retStr['IRETCODE'] == "0") {
		        		$k.unlock();
		        		$("#lock_password").val("");
					} else if (retStr['IRETCODE'] == "-3") {
                        alert("验证码错误，请重新输入!");
                    } else if(retStr['IRETCODE'] == "-1") {
                        alert("用户名或密码错误，用户解锁失败!");
                    } else if(retStr['IRETCODE'] == "-4") {
                        alert("用户状态不合法，解锁失败，请联系管理员!");
                    } else if(retStr['IRETCODE'] == "-5") {
                        alert("用户可操作站点不合法，解锁失败，请联系管理员!");
                    }else {
                        alert("用户解锁失败!");
                    }
		        }
		    });
		});

		$("#lock_password",$("#lock")).bind("keydown",function(event){
			if(event.keyCode==13){
				$(".frame-lock-btn",$("#lock")).trigger("click");
			}
		});
		
	},
	updateUseInfo:function(){
		if(!$("#userForm").form('validate')) return false;
			var offTel = $("#offTel").val();
			var mobile = $("#mobile").val();
			var email = $("#email").val();
			var asigntrue = $("#asigntrue").val();
			var imgName = $("body").data("imgName");
			var img = '';
			if(typeof(imgName) == 'undefined'){
				img = g_user.userIcon;
			}else{
				img = imgName ;
			}
			
			ajaxRequest({
				url:'kjdp_ajax?returnType=json',
				req:[{
	                 service:'P0004015',
	                 OFF_TEL:offTel,
	                 MOBILE:mobile,
	                 EMAIL:email,
	                 SIGNATRUE:asigntrue,
	                 USER_CODE: g_user.userId,
	                 USER_ICON:img
	             }],
	             func:function (data) {
	            	 var imgData =document.getElementById("hideFrame").contentWindow.window.document.body.innerHTML;
	            	 var imgName;
	            	 if(imgData){
	            			var retStr = eval('(' + imgData + ')');
	            			imgName = retStr[0].FILECON ;
	            	 }
	            	 
					 var params = {					 
						 OFF_TEL:offTel,
						 MOBILE:mobile,
						 EMAIL:email,
						 SIGNATRUE:asigntrue
					 };
					 if(imgName){
						 $("#frameUserImg").attr("src","upload/userIcon/"+imgName);
						 $("#lockIcon").attr("src","upload/userIcon/"+imgName);
						 params['USER_ICON'] = imgName;
						 g_user.userIcon = + imgName ;
					 }
					 var requestXmlStr = encrypt(kui.makeXmlRequestStr([params]),window.$kencKey);
					 $.ajax({
						url: "kjdp_userInfo",
						type: "POST",
						data: requestXmlStr,
						//contentType: 'text/json; charset=utf-8',
						dataType: 'text',
						success: function(data) {
							alert("资料保存成功!");
							$("#userInfoDialog").dialog("close");
							g_user.offTel = offTel ;
							g_user.mobile = mobile ;
							g_user.email = email ;
							g_user.asign = asigntrue ;
							$("#asign").text(asigntrue);
						}
					});
	             }
			}); 
			return false ;
	},
	passwordModify:function(){
		if($('#passwordModifyForm').form('validate')){
				var _oldPsd = $("#oldPsd").val() ;
				var _newPsd = $("#newPsd").val() ;
				var confirmPsd = $("#confirmPsd").val() ;
				var oldPsd = encrypt(_oldPsd, g_user.userId);
				var newPsd = encrypt(_newPsd, g_user.userId);
				if(_oldPsd == _newPsd){
					alert("新密码与旧密码相同,请重新输入!");
					return false;
				}
				if(confirmPsd != _newPsd){
					alert("新密码和确认密码不一致！");
					return false ;
				}
            ajaxRequest({
                url:'kjdp_ajax?returnType=json',
                req:[{
                    service: "P0003001",
                    USER_CODE: window.g_user.userId,
                    TRD_PWD: oldPsd
                }],
                func: function (data) {
                    if(data[0][0] && "0" === data[0][0]["IRETCODE"]) {

                        ajaxRequest({
                            url: 'kjdp_ajax?returnType=json',
                            req: [
                                {
                                    service: 'P0001007',
                                    USER_CODE: g_user.userId,
                                    USER_PASS: oldPsd,
                                    NEW_PASS: newPsd
                                }
                            ],
                            func: function (data) {
                                if (data[0][0]['UPDATE_FLAG'] == '0') {
                                    alert("修改密码失败！");
                                } else {
                                    alert("修改密码成功！");
                                    $("#passwordModifyForm").form("reset");
                                }
                                $("#frame-password-update-dialog").dialog("close");
                            }
                        });
                    }else {
                        alert("旧密码不正确，请再次输入！");
                    }
                }

        });
			}
	},
	group:function(){
		$k.groups = [] ;
        for(var i=0;i<$k.treeData.length;i++){
            if($k.groups[$k.treeData[i].PAR_MENU]){
            	$k.groups[$k.treeData[i].PAR_MENU].push($k.treeData[i]);
            }else{
            	$k.groups[$k.treeData[i].PAR_MENU]=[];
            	$k.groups[$k.treeData[i].PAR_MENU].push($k.treeData[i]);
            }
        }
	},
	getDom:function(pid){
        if(!pid){
        	return '' ;
        };
        var html='<ul >'; 
        for(var i = 0 ;i < pid.length ;i++){
        	var lvl = pid[i].MENU_LVL.length / 4 ;
        	
        	if(lvl == 1){
        		html = $k.createHtml(html, "first-menu",pid[i],lvl);
        	}else if(lvl == 2){
        		html = $k.createHtml(html, "sec-menu",pid[i],lvl);
        	}else  if(lvl == 3){
        		html = $k.createHtml(html, "thir-menu",pid[i],lvl);
        	}else{
        		html = $k.createHtml(html, "",pid[i],lvl);
        	}
        	
            html+=$k.getDom($k.groups[pid[i].MENU_ID]);
            html+='</li>';
        };
        html+='</ul>'; 
        return html;
    },
    createHtml:function(html,className,obj,lvl){
    	var cls = "frame-icon ";
    	var menuLink = "";
    	if(typeof obj.MENU_ICO == "undefined"||obj.MENU_ICO == ""){
    		//cls += "icon-secmenu-sel" ;
    		cls = "" ;
    	}else{
    		cls += obj.MENU_ICO ;
    	}
    	if(typeof obj.MENU_LINK == "undefined" || obj.MENU_LINK == ""){
    		menuLink="";
    	}else{
    		if(obj.MENU_LINK.indexOf("?")>-1){
    			menuLink = obj.MENU_LINK + "&menuId="+obj.MENU_ID;
    		}else{
    			menuLink = obj.MENU_LINK + "?menuId="+obj.MENU_ID;
    		}
    		
    	}
    	html+='<li class="'+className+'" menuId="'+obj.MENU_ID+'" title="'+obj.MENU_NAME+'" lvl="'+lvl+'" menuLink="'+menuLink+'"><a href="javascript:void(0);"><span class="'+cls+'" style="float:left;margin-left:10px;"></span>'+"&nbsp;&nbsp;"+(obj.MENU_NAME.length > 8 ? obj.MENU_NAME.substring(0,6)+' ...' : obj.MENU_NAME)+'</a>';
    	return html ;
    },
    renderTo:function(elementId){
    	$("#"+elementId).empty().append($k.getDom($k.groups[0]));
    	$("#"+elementId).find("ul:first").attr("class","nav");
    },
    createSysFunMap:function(){
    	var json = $k.changeJson($k.treeData,0);
    	$k.kjdpmenus = [];
    	for(var i=0;i<json.length;i++){
    		$k.childMenus = [];
    		var _childMenus = $k.getSecMenuData(json[i], json[i].MENU_ID);
    		var menus={menuName:json[i].MENU_NAME,childMenu:_childMenus};
    		$k.kjdpmenus.push(menus);
    	}
    	
    	var target = $(".frame-map",$("#frameTab")).empty();
		var dom = [];
		for(var i=0;i<$k.kjdpmenus.length;i++){
			var firstMenuName = $k.kjdpmenus[i].menuName ;
			var childMenus = $k.kjdpmenus[i].childMenu ;
			if(i%2 == 0){
				$k.creChildMenu("frame-map-left",firstMenuName,childMenus,dom);
			}else{
				$k.creChildMenu("frame-map-right",firstMenuName,childMenus,dom);
			}
		}
		$(target).append(dom.join(""));
		
    },
    creChildMenu:function(cls,menuName,secMenus,dom){
    	var count = 0 ;
    	dom.push("<div class='"+cls+"'><div class='frame-child-map'><div class='frame-map-title'><span class='frame-map-icon'></span><span class='map-title'>"+menuName+"</span></div><div>");
    	$.each(secMenus,function(j){
			if(count < 20){
				var menuLink = secMenus[j].MENU_LINK || '';
				if(menuLink != '' ){
					if(menuLink.indexOf('?')>0){
						menuLink = menuLink + '&menuId='+secMenus[j].MENU_ID;
					}else{
						menuLink = menuLink + '?menuId='+secMenus[j].MENU_ID;
					}
				}
				dom.push("<span class='frame-map-text' title='"+secMenus[j].MENU_NAME+"' id='"+secMenus[j].MENU_ID+"' name='"+secMenus[j].MENU_NAME+"' link='"+menuLink+"'>"+(secMenus[j].MENU_NAME.length > 8 ? secMenus[j].MENU_NAME.substring(0,6)+' ...' : secMenus[j].MENU_NAME)+"</span>");
			}
			count ++ ;
    	}); 
    	dom.push("</div></div></div>");
    },
    getSecMenuData:function(data,pid){
    	//var childMenus = [];
    	if(typeof data.children != "undefined"){
    		for(var i=0;i<data.children.length;i++){
    			var o = data.children[i] ;
    			if(o.PAR_MENU==pid){
    				if(typeof o.MENU_LINK != "undefined"){
    					var childMenu = {
		        				MENU_NAME:o.MENU_NAME,
		        				MENU_LINK:o.MENU_LINK,
		        				MENU_ID:o.MENU_ID
		        		};
    					$k.childMenus.push(childMenu);
    				}
    				$k.getSecMenuData(o, o.MENU_ID);
    			}
    		}
    	}else{
    		if(typeof data.MENU_LINK != "undefined"){
    			if(data.PAR_MENU==pid){
					var childMenu = {
	        				MENU_NAME:data.MENU_NAME,
	        				MENU_LINK:data.MENU_LINK,
	        				MENU_ID:data.MENU_ID
	        		};
					$k.childMenus.push(childMenu);
    			}
			}
    	}
    	
    	return $k.childMenus;
    },
    //递归menu为json格式
    changeJson:function(data,pid){
    	var result = [] , temp;
    	for(var i in data){
    		if(data[i].PAR_MENU==pid){
    			result.push(data[i]);
    			temp = $k.changeJson(data,data[i].MENU_ID);			
    			if(temp.length>0){
    				data[i].children=temp;
    			}			
    		}		
    	}
    	return result;
    },
    //应用框架装载
    startup: function() {
        $("body").removeClass("ui-body-background");
        $("#loginDiv").hide();
        if ($("div.ui-login-shadow").is(":visible")) {
            $("div.ui-login-shadow").remove();
        }
        var lsFrameConfig = $.ls('frameConfig');
        $k.config = lsFrameConfig || $.extend($k.config, pageConfig);
        window.document.title = $k.config.title;
        var container = $("#pageContainer");
        if (container.length == 0) {
            container = $("<div id='pageContainer' ></div>").appendTo("body");
        }
        $('#pageContainer').load('frame/page/main.html?t=' + $.now(), function() {
            $("#north").css("class", "ui-frame-top-1");
            $("div.ui-frame-logo-title").html($k.config.title);
            $.parser.director($('#pageContainer'), null, function() {
                $k.initMenusData();
                $k.bindEvent();
            });
        });
    },
    //返回首页
    goback: function(){
    	$('#frameTab').tabs('select',0);
    },
    //退出系统函数
    logout: function(par) {
        var tmp = new Date().valueOf();
		$.cookie('lockUser', "false");
		if(par){
			window.location.replace('kjdp_logout?'+tmp);
		}else{
			confirm('退出系统', '是否确认退出系统?',
			function(y) {
				if (y) {
					window.location.replace('kjdp_logout?'+tmp);
				}
			});
		}
    },
    //锁定屏幕函数
    lock: function(callback) {
    	var obj = $("#lock");
    	if(!obj.is(":visible")){
			$("#masklayer").show();
			obj.show();
			posit(obj);
			$.cookie('lockUser', "true");
			$k.lockCallback = callback;
		}
    },
    //解锁
    unlock: function(){
		$k.unlockComm('lockUser',"lock");
		if(typeof($k.lockCallback)=="function"){
			$k.lockCallback();
		}
    },
    unlockComm:function(cookieName,elementId){
    	var lock = $.cookie(cookieName);
    	if(lock == "true"){
    		$("#"+elementId).hide();
    		$("#masklayer").hide();
    		$.cookie(cookieName, "false");
    	}
    },
    //选择tab页签时左边菜单选中
    highlightTab: function(title,index){
    	var p = $("#kingdomMenu ul>li[title='"+title+"']");
    	$("#kingdomMenu ul>li").siblings(".sec-menu-selected").removeClass("sec-menu-selected");
    	if(p.length==0 || p.attr("lvl")=="1"){
    		return false ;
    	}
        p.addClass("sec-menu-selected");
    },
	//标签页点击右键菜单
	tabContextMenu:function(e){
		e.preventDefault();
		var idx = $("#frameTab li").index($(e.target).closest("li"));
		if(idx>0){
			$('#tabsMenu').data("tabIndex", idx).menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		}
	},
	//右键菜单处理事件
	tabMenuEvent:function(item){
        var tabIndex=$.data(this, "tabIndex");
        var $pageTab = $('#frameTab');
        var $targetTab=$pageTab.tabs("getTab", tabIndex);
		var itemName = item.name;
		switch(itemName){	
			case 'update':
                $pageTab.tabs("select", tabIndex);
				var cUrl = $('iframe',$targetTab).attr('src');
				$pageTab.tabs('update',{
					tab:$targetTab,
					options:{
						content:"<iframe frameborder=\"0\" scrolling=\"no\" src=\""+cUrl+"\" style=\"width:100%;height:99%;overflow:auto;\"></iframe>"
					}
				});
			break;
			case 'close':
				if ($targetTab){
					var index = $pageTab.tabs('getTabIndex', $targetTab);
					if(index!=0) $pageTab.tabs('close', index);
				}
			break;			
			case 'closeAll':
				$(".tabs-panels > .panel", $pageTab).each(function(){
					var index = $pageTab.tabs('getTabIndex', $(this).find(".panel-body"));
					if(index!=0) $pageTab.tabs('close', index);
				});			
			break;		
			case 'closeOther':
				$targetTab.parent().siblings().each(function(){
					var index = $pageTab.tabs('getTabIndex', $(this).find(".panel-body"));
					if(index!=0) $pageTab.tabs('close', index);
				});
			break;		
			case 'closeRight':
				$targetTab.parent().nextAll().each(function(){
					var index = $pageTab.tabs('getTabIndex', $(this).find(".panel-body"));
					$pageTab.tabs('close', index);
				});
			break;		
			case 'closeLeft':
				$targetTab.parent().prevAll().each(function(){
					var index = $pageTab.tabs('getTabIndex', $(this).find(".panel-body"));
					if(index!=0) $pageTab.tabs('close', index);
				});
			break;		
			default:
			break;
		}
	},
	maxWorkspace:function() {
		var win = $(window), h = win.height(), w = win.width(),
			fTab = $("#frameTab").find(".panel:visible"),
			iframe = fTab.find("iframe");
		
		fTab.data("css", {width:fTab.width(), height:fTab.height(), position:"static"});
		fTab.data("iframe", {width:iframe.width(), height:iframe.height()});
		var padding = {
				left:parseInt(fTab.css("padding-left")),
				right:parseInt(fTab.css("padding-right")),
				top:parseInt(fTab.css("padding-top")),
				bottom:parseInt(fTab.css("padding-bottom"))
		};
		var fixedDim = {width:w - padding.left - padding.right,
						height:h - padding.top - padding.bottom,
						overflow:"hidden"};
		fTab.css($.extend({}, fixedDim, {left:0, top:0, position:"absolute"})).find(".panel-body").css(fixedDim);
		iframe.css(fixedDim);
	},
	minWorkspace:function() {
		var fTab = $("#frameTab").find(".panel:visible"),
			iframe = fTab.find("iframe"),
			preData = fTab.data();
		fTab.css(preData.css).find(".panel-body").css(preData.css);
		fTab.find("iframe").css(preData.iframe);
	},
	searchMenu:function(){
		var data = $("body").data("menuData");
		var menuName = $("#frame-search").val();
		if(menuName=='请输入关键字...'){
			menuName=''; 
			$("#kingdomMenu").children().remove();
			var len = $("#kingdomMenu").children().length;
			if(len == 0){
				$k.initTreeMenu("kingdomMenu",data);
			}
			return false ;
		}
			
		
		
		var temp = [];
		if(typeof data != "undefined"){
			for(var i=0;i<data.length;i++){
				var name = data[i].MENU_NAME ;
				if(name.indexOf(menuName) > -1){
					temp.push(data[i]);
				} 
			}
		}
		temp = $k.findParentMenu(temp) ;
		$("#kingdomMenu").children().remove();
		var len = $("#kingdomMenu").children().length;
		if(len == 0){
			$k.initTreeMenu("kingdomMenu",temp);
		}
	},
	findParentMenu:function(data){
		var pids = [];
		for(var i=0;i<data.length;i++){
			var pid = data[i].PAR_MENU ;
			pids.push(pid);
			var arr = [] ;
			$k.recursionParentMenu(pid,arr);
			for(var j=0;j<arr.length;j++){
				pids.push(arr[j]);
			}
		}
		pids = pids.deleteEle();
		for(var i=0;i<pids.length;i++){
			for(var j=0;j<data.length;j++){
				if(pids[i] == data[j].MENU_ID){
					pids.splice($.inArray(pids[i],pids),1);
				}
			}
		}
		var menuData = $("body").data("menuData");
		for(var i=0;i<pids.length;i++){
			for(var j=0;j<menuData.length;j++){
				if(pids[i] == menuData[j].MENU_ID ){
					data.push(menuData[j]);
				}
			}
		}
		return data ;
	},
	recursionParentMenu:function(id,arr){
		var menuData = $("body").data("menuData");
		for(var j=0;j<menuData.length;j++){
			if(id == menuData[j].MENU_ID && typeof menuData[j].MENU_LINK == "undefined"){
				arr.push(menuData[j].MENU_ID);
				$k.recursionParentMenu(menuData[j].PAR_MENU,arr);
			}
		}
	},
	checkEditor:function(title,index){
		if(title.indexOf("设计器") > -1){
			if(title.endsWith("设计器")){  //如果是设计器的tab则需要判断是否修改过
				if($k.editorWeb && $k.editorWeb.webIsModify){
					 confirm('提示', '设计器数据已经修改，是否自动保存?', function (isOK) {
						if (isOK) {
							$k.editorWeb.autoSaveEdit();
							var closeEdit = setInterval(function(){
								if(!$k.editorWeb.webIsModify){
									$('#frameTab').tabs("close",index);
									clearInterval(closeEdit);
								}
							},300)
							
						}else{
							$k.editorWeb.webIsModify = false;
							$('#frameTab').tabs("close",index);
						}
					});
					return false;
				}else{
					return true;
				}
			}
		}
		return true;
	},
	initUserInfo:function(){
		if(g_user.userName.length > 5){
			var name  = g_user.userName.substring(0,5)+"...";
			$("#user").text(name);
			$("#user").attr("title",g_user.userName);
		}else{
			$("#user").text(g_user.userName);
			$("#user").attr("title",g_user.userName);
		}
		
	    $("#uName").text(g_user.userName);
	    $("#locTime").text(g_user.loginDate);
	    $("#locIp").text(g_user.loginIp);
	    $("#user_Name").val(g_user.userName);
	    $("#userId").val(g_user.userId);
	    $("#offTel").val(g_user.offTel);
	    $("#mobile").val(g_user.mobile);
	    $("#email").val(g_user.email);
	    $("#openDate").val(g_user.openDate);
	    $("#lock_username").val(g_user.userId);
	    $("#asign").text(g_user.asign);
	    $("#asigntrue").val(g_user.asign);
	    var $userIcon = g_user.userIcon;
	    $("#frameUserImg").attr("src","frame/images/frame/user-head-big.png");
		$("#userPhone").attr("src","frame/images/frame/user-head-big.png");
	    if($userIcon){
	    	$("#frameUserImg").attr("src", "upload/userIcon/" + $userIcon);
	    	$("#userPhone").attr("src", "upload/userIcon/" + $userIcon);
	    	$("#lockIcon").attr("src", "upload/userIcon/" + $userIcon);
	    	
	    }else{
	    	$("#frameUserImg").attr("src","frame/images/frame/user-head-big.png");
	    	$("#userPhone").attr("src","frame/images/frame/user-head-big.png");
	    	$("#lockIcon").attr("src","frame/images/frame/user-head-big.png");
	    } 
	},
	upload:function(value){
		$("#userForm").attr("action","kjdp_upload?DIR=userIcon&service=P0004017");
		$("#userForm").submit();
		$k.getPic();
	},
	getPic:function(){
		var intval = window.setInterval(function(){				
			var data = document.getElementById("hideFrame").contentWindow.window.document.body.innerHTML;
			if(data){
				var retStr = eval('(' + data + ')');
				var imgName = retStr[0].FILECON ;
				if(imgName){
					$("body").data("imgName", imgName); 
					$("#userPhone").attr("src","upload/userIcon/"+imgName);
				}
				window.clearInterval(intval);
			}	
		},100);
	}
};
String.prototype.endsWith = function(pattern) {
    var d = this.length - pattern.length; 
    return d >= 0 && this.lastIndexOf(pattern) === d;
};
Array.prototype.deleteEle=function(){
	var newArr = this;
	for (var i=newArr.length-1; i>=0; i--)
	{
		var targetNode = newArr[i];
		for (var j=0; j<i; j++)
		{
			if(targetNode == newArr[j]){
				newArr.splice(i,1);
				break;
			}
		}
	}
	return newArr;
};
//用户登录相关操作子类
kjdp.fn.login = (function() {
    return {		
        //初始化登录界面
        init: function() {
            this.wrapLogin();
            var $account = $.cookie('account');
            if ($account != null) {
                $("#username", "#loginDiv").attr("value", $account);
                $("input[name='saveIt']", "#loginDiv").attr("checked", "true");
            }
            $("#loginDiv").keydown(function(event) {
                if (event.keyCode == 13) {
                    if(event.target.id=="username"){
						$("#password","#loginDiv").focus();
					}else if(event.target.id=="password"){
                        if($("#validate","#loginDiv").is(":visible")) {
                            $("#validate","#loginDiv").focus();
                        } else {
                            $k.login.submit();
                        }
					}else if(event.target.id=="validate"){
						$k.login.submit();
					}
                }
            });
        },
        //检查是否存在用户会话
        checkSession: function() {
            var flag = false;
            $.ajax({
                url: "kjdp_session?"+new Date().valueOf(),
                type: "GET",
                async: false,
                dataType: 'text',
                success: function(data) {
                    var retStr = eval('(' + data + ')');
                    if (retStr['IRETCODE'] == "0") {
                        window.g_user = {
                        		'userId': retStr['USER_CODE'],
                                'userName': retStr['USER_NAME'],
                                'userPass': retStr['USER_PASS'],
                                'userRole': retStr['USER_ROLE'],
                                'userTicket': retStr['USER_TICKET_INFO'],
                                'userIcon':retStr['USER_ICON'],
                                'loginIp':retStr['LOG_IP'],
                                'orgCode':retStr['ORG_CODE'],
                                'loginDate':retStr['LOG_DATE'],
                                'openDate':retStr['OPEN_DATE'],
                                'userIcon':retStr['USER_ICON'],
                                'offTel':retStr['OFF_TEL'],
                                'mobile':retStr['MOBILE'],
                                'email':retStr['EMAIL'],
                                'asign':retStr['SIGNATRUE']
                        };
						flag = true;
                    }
                }
            });
            return flag;
        },
        //绘制用户登录界面表单
        wrapLogin: function() {
            $("body").addClass('ui-body-background');
            var dom = ["<div id='loginDiv' >", 
					   "<div class='ui-frame-login-bg' >", 
				       "<div class='ui-login-logo'></div>",
				       "<form id='loginForm' class='ui-frame-login-form' method='post'>",
				       "<table >", "<tr>", 
				       "<td style='width: 63px;'><font style='font-size: large;'>账&nbsp;&nbsp;&nbsp;号</font></td>", 
				       "<td><input class='kui-validatebox input-length' type='text' name='username' id='username' kui-options='required:true,noWarn:true' /></td>",
				       "</tr>",
				       "<tr>", 
				       "<td style='width: 63px;'><font style='font-size: large;'>密&nbsp;&nbsp;&nbsp;码</font></td>",
				       "<td><input class='kui-validatebox input-length' type='password' name='password' id='password' kui-options='required:true,noWarn:true' /></td>",
				       "</tr>",
				       "<tr style='display:none;'>",
				       "<td style='width: 63px;'><font style='font-size: large;'>验证码</font></td>",
				       "<td><input name='validate' class='kui-validatebox validate-length' type='text' kui-options='required:true,validType:length[1,4],noWarn:true' id='validate'/>",
				       "<img id='validateimg' class='validate-img' src=\"kjdp_validate?i=" + Math.random() + "\" onclick=\"$k.login.refresh()\"/></td>", "</tr>", "<tr>", "<td style='width: 43px;'></td>", "<td > <input name='saveIt' type='checkbox' />&nbsp;保存账号 </td>", "</tr>", "</table>", "</form>", "<div class='ui-frame-login-login'><a href='javascript:void(0);' onclick='$k.login.submit()' class='button-red-big'><span><span class='btn-left'>登&nbsp;&nbsp;录</span></span></a></div>", "<div class='copy-right'><div><span class='copy-right-icon'></span>深圳市金证科技股份有限公司&nbsp;&nbsp;版权所有</div><div style='padding-left: 40px;margin-top:5px;'>Copyright © 1998-2014</div></div>", "</div></div>"];
            $('body').prepend(dom.join(""));

            var dom2 = ['<div id="fp" style="display: none;"><form id="forgetPwdForm">',
       	            '<div id="t"><div style="width: 220px;margin-bottom:10px">请选择找回密码类型:</div>',
       	            '<span><input type="radio" name="o" value="1" checked="checked" onclick="$k.login.selectObjFun()">资料</span>',
       	            '<span style="margin-left: 10px;"><input type="radio" name="o" value="2" onclick="$k.login.selectObjFun()">手机</span>',
       	            '<span style="margin-left: 10px;"><input type="radio" name="o" value="3" onclick="$k.login.selectObjFun()">邮箱</span></div>',
       	            '<div id="info" style="display: block;"><table style="margin-top: 10px;">',
       	            '<tr><td>用户编号：</td><td><input type="text" id="userCode" class="kui-validatebox"></td></tr>',
       	            '<tr><td style="padding-top: 10px;">用户名称：</td><td style="padding-top: 10px;"><input type="text" id="userName" class="kui-validatebox"></td></tr>',
       	            '<tr align="right" ><td colspan="2" style="padding-top: 10px;"><a class="kui-linkbutton" kui-options=" plain:true, iconCls:\"icon-save\"" onclick="$k.login.saveInfo()">提交</a></td></tr></table></div>',
       	            '<div id="tel" style="display: none;margin-top: 10px;"><table style="margin-top: 10px;">',
       	            '<tr><td>手机号码：</td><td><input type="text" id="tel" class="kui-validatebox" kui-options="validType:\"mobile\""></td></tr>',
       	            '<tr align="right" ><td colspan="2" style="padding-top: 10px;"><a class="kui-linkbutton" kui-options=" plain:true, iconCls:\"icon-save\"" onclick="$k.login.saveTel()">提交</a></td></tr></table></div>',
       	            '<div id="mail" style="display: none;margin-top: 10px;"><table style="margin-top: 10px;">',
       	            '<tr><td>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</td><td><input type="text" id="mail" class="kui-validatebox" kui-options="validType:\"email\""></td></tr>',
       	            '<tr align="right" > <td colspan="2" style="padding-top: 10px;"><a class="kui-linkbutton" kui-options=" plain:true, iconCls:\"icon-save\"" onclick="$k.login.saveMail()">提交</a></td> </tr> </table> </div></form>',
       	            '<form id="valCodeForm" style="display: none;"><table style="margin-top: 10px;">',
       	            '<tr><td style="padding-top: 15px;">验&nbsp;证&nbsp;码：</td><td style="padding-top: 15px;"><input type="text" id="valCode" class="kui-validatebox" kui-options="validType:\"\""></td></tr>',
       	            '<tr align="right" > <td colspan="2" style="padding-top: 10px;"><a class="kui-linkbutton" kui-options=" plain:true, iconCls:\"icon-save\"" onclick="$k.login.saveValCode()">提交</a></td> </tr> </table> </form>',
       	            '<form id="updatePwdForm" style="display: none;"><table>',
       	            '<tr> <td style="padding-top: 25px;">新&nbsp;密&nbsp;码：</td> <td style="padding-top: 25px;"><input type="password" id="new_psd" class="kui-validatebox"></td> </tr>',
       	            '<tr> <td style="padding-top: 10px;">确认密码：</td> <td style="padding-top: 10px;"><input type="password" id="sure_psd" class="kui-validatebox"></td> </tr>',
       	            '<tr align="right"> <td colspan="2" style="padding-top: 10px;"><a class="kui-linkbutton" kui-options=" plain:true, iconCls:\"icon-save\"" onclick="$k.login.updatePwd()">提交</a></td> </tr> </table> </form> </div>'
       	            ];
            $('body').prepend(dom2.join(""));
        },
        forgetPwd: function() {
        	
        	$("#t").show();
     		$("#tel").hide();
     		$("#mail").hide();
     		$("#info").show();
     		$("#valCodeForm").hide();
     		$("#updatePwdForm").hide();
     		
            $("#fp").dialog({
                modal:true,
                title:"找回密码",
                width:280,
                height:210
            });
        },
        selectObjFun:function() {
        	var v = $('input[name="o"]:checked').val();
        	if(v == 1){
    			$("#info").show();
    			$("#tel").hide();
    			$("#mail").hide();
    			$.parser.director($("#info"));
    		}else if(v == 2){
    			$("#info").hide();
    			$("#tel").show();
    			$("#mail").hide();
    		}else if(v == 3){
    			$("#info").hide();
    			$("#tel").hide();
    			$("#mail").show();
    		} 
        },
        saveInfo:function() {
        	$("#t").hide();
    		$("#info").hide();
    		$("#valCodeForm").show();
    		var userCode = $("#userCode").val();
    		var userName = $("#userName").val();
        },
        saveTel:function() {
        	$("#t").hide();
    		$("#tel").hide();
    		$("#valCodeForm").show();
    		var tel = $("#tel").val();
        },
        saveMail:function() {
        	$("#t").hide();
    		$("#mail").hide();
    		$("#valCodeForm").show();
    		var mail = $("#mail").val();
        },
        saveValCode:function() {
        	$("#t").hide();
    		$("#tel").hide();
    		$("#mail").hide();
    		$("#info").hide();
    		$("#valCodeForm").hide();
    		$("#updatePwdForm").show();
    		var valCode = $("#valCode").val();
        },
        updatePwd:function() {
        	var new_pwd = $("#new_pwd").val();
    		var sure_pwd = $("#sure_pwd").val();
    		$("#fp").dialog("close");
        },
        //刷新系统验证码
        refresh: function() {
            $("#validateimg", "#loginDiv").attr("src", "kjdp_validate?k=" + Math.random());
        },
        //用户登录请求提交
        submit: function() {
			if($k.logining) return;
			$k.logining = true;
            if ($("input[name='saveIt']").attr("checked") == "checked") {
                $.cookie('account', $("#username").val(),{expires:30});
            } else {
                $.cookie('account', null);
            }
            if (/\s/.test($.trim($("#username").val()))) {
                alert("用户名不合法，请重新输入!");
				this.logining = false;
                return ;
            }
			$k.getEncryptKey();
            $("#validate", "#loginDiv").blur();
            $('a.submit-button', '#loginDiv').attr('disabled', true);
            var password = encrypt($("#password").val(), $("#username").val());
            var params = {
                USER_CODE: $("#username").val(),
                TRD_PWD: password,
                validateCode: $("#validate").val()
            };
            
            var requestXmlStr = encrypt(kui.makeXmlRequestStr([params]),window.$kencKey);
            var loginProccess = function(retStr) {
                if(retStr['FAILCODE'] && "-99" === retStr['FAILCODE']) {
                    $("#validate").closest("tr").show();
                }

                if (retStr['IRETCODE'] == "0") {
                    window.g_user = {
                        'userId': retStr['USER_CODE'],
                        'userName': retStr['USER_NAME'],
                        'userPass': retStr['USER_PASS'],
                        'userRole': retStr['USER_ROLE'],
                        'userTicket': retStr['USER_TICKET_INFO'],
                        'userIcon':retStr['USER_ICON'],
                        'loginIp':retStr['LOG_IP'],
                        'orgCode':retStr['ORG_CODE'],
                        'openDate':retStr['OPEN_DATE'],
                        'loginDate':retStr['LOG_DATE'],
                        'userIcon':retStr['USER_ICON'],
                        'offTel':retStr['OFF_TEL'],
                        'mobile':retStr['MOBILE'],
                        'email':retStr['EMAIL'],
                        'asign':retStr['SIGNATRUE']
                    };
                    $k.startup();
                } else if (retStr['IRETCODE'] == "-3") {
                    alert("验证码错误，请重新输入!");
                    $('#validateimg').click();
                } else if(retStr['IRETCODE'] == "-1") {
                    alert("用户名或密码错误，用户认证失败!");
                    $('#validateimg').click();
                } else if(retStr['IRETCODE'] == "-4") {
                    alert("用户状态不合法，登陆失败，请联系管理员!");
                    $('#validateimg').click();
                } else if(retStr['IRETCODE'] == "-5") {
                    alert("用户可操作站点不合法，登陆失败，请联系管理员!");
                    $('#validateimg').click();
                }else {
                    alert("用户登陆失败!");
                    $('#validateimg').click();
                }
                $('a.submit-button', '#loginDiv').attr('disabled', false);
				$k.logining=false;
            };
            $.ajax({
                url: "kjdp_login",
                type: "POST",
                data: requestXmlStr,
                contentType: 'text/xml; charset=utf-8',
                dataType: 'text',
                success: function(data) {
                    var retStr = eval('(' + data + ')');
                    loginProccess(retStr);					
                }
            });
        }
    };
})();

$.extend(kjdp.fn, {

	cache: {},

	data: function(key, value) {
		if("undefined" === $.type(value)) {
			return this.cache[key];
		}
		return this.cache[key] = value;
	},
	
	removeData: function(key) {
		delete this.cache[key];
	},

	pageData: function(menuId, key, value) {

		if("undefined" === $.type(value)) {
			return this.data(menuId) ? this.data(menuId)[key] : undefined;
		}

		if(this.data(menuId)) {
			this.data(menuId)[key] = value;
		} else {
			this.data(menuId, {});
			this.data(menuId)[key] = value;
		}
		return this.data(menuId);
	},

	removePageData: function(menuId, key) {
		if(this.data(menuId) && this.pageData(menuId, key)) {
			delete this.cache[menuId][key];
		}
	}
});

window.$k = kjdp = new kjdp();

kuiloader.onReady = function() {
    $.extend($k.config, pageConfig);
    using(["tabs", "dialog"], function() {
        $k.init();
    });
};