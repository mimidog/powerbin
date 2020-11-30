/**
 * pushmsg - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 
 * 
 */

(function($){
	$.pushmsg = {
		msg:null,
		msgCountId:"",
		msgContainer:{},
		msgCls:"",
		msgBoxId:"",
		$msgContentId : null,
		/*
		 //测试用的获取数据字段的数据getSysDict("category")得到的结果
	    dictVals: [{"dictVal": "0-generator","dictText": "一般性通 知"},
	                 {"dictVal": "1-special","dictText": "专项业务通知"},
	                 {"dictVal": "2-warning","dictText": "警告信息"},
	                 {"dictVal": "3-immediately","dictText": "必须立即处理事件"}],
        dictVals1: [{"dictVal": "001","dictText": "审核"},
                 {"dictVal": "002","dictText": "工作流"},
                 {"dictVal": "003","dictText": "开户统计"},
                 {"dictVal": "004","dictText": "其他"}],
                 */
		msgArr:{  //消息盒子变量
	        box:new Array(),
	        recent:new Array(),
	        noReaded:new Array()
	    },
		categoryDict : {}, //消息类别
		categoryName : {}, //消息类别名称
		noReadQuantity : {},//刷新各消息类别未读消息数
		businessType : {}, //业务类型
		initMsgDict : function () {
        	var msgClsDict = getSysDict("MSG_CLS"); //获取数据字典values
     		$(msgClsDict).each(function (i,data){
     			var key = data.dictVal;
     			var index = key.indexOf("-");
     			$.pushmsg.categoryDict[key.substring(0,index)] = key.substring(index+1,key.length);//消息类别的组装，格式{"0":"generator"}
     			$.pushmsg.categoryName[key.substring(index+1,key.length)] = data.dictText; //消息类别名称的组装 ,格式{"generator":"一般性通知"}
     			$.pushmsg.msgArr[key.substring(index+1,key.length)] = new Array(); //消息盒子变量的动态定义,格式{generator:new Array()}
     			$.pushmsg.noReadQuantity[key.substring(index+1,key.length)] = "0"; //默认消息类别未读消息数为0,格式{"generator":"0"}
     		});
     		var busTypeDict = getSysDict("BUS_TYPE"); //获取数据字典values
     		$(busTypeDict).each(function (i,data){
     			$.pushmsg.businessType[data.dictVal] = data.dictText;//消息类别的组装，格式{"001":"审核"}
     		});
		},
		refresh: function (){//刷新消息
			$.pushmsg.initUI();
			//$.pushmsg.bindListener();
			$.pushmsg.bindTitleListener();
		},
		getMessageCount: function (){ //获取消息总数
			return $.pushmsg.msgArr.noReaded.length;
		},
		init: function (msgBoxId,msgCountId,msgContentId,msgCls) {
			$.pushmsg.msgCountId = msgCountId; //消息总数显示的id
			$.pushmsg.initMsgDict();//初始化消息数据字典
			$.pushmsg.msgCls = msgCls;
			$.pushmsg.msgBoxId = msgBoxId;
			$.pushmsg.$msgContentId = $("#"+msgContentId);
			
			var headerHtmlContent = "<div id=\"msg-header\">";
			var bodyHtmlContent = "<div id=\"msg-body\">";
			bodyHtmlContent += "<div id=\"msg-recent\" class=\"msg_category\">";
			bodyHtmlContent += "<div class=\"msg_category_title\"><span class=\"msg_name\"></span><img src=\"../../kui-base/themes/default/images/drop_up_black.png\"/></div>";
			bodyHtmlContent += "<ul class=\"msg_category_list\"></ul></div>";
			for(var ky in $.pushmsg.categoryName){
				headerHtmlContent += "<img src=\"../../kui-base/themes/default/images/icon_"+ky+"_message.gif\"></img>";
				headerHtmlContent += "<span><a id=\"msg-header-"+ky+"-title\" link=\"msg-"+ky+"\" href=\"#\"></a></span>";
				bodyHtmlContent += "<div id=\"msg-"+ky+"\" class=\"msg_category\">";
				bodyHtmlContent += "<div class=\"msg_category_title\"><span class=\"msg_name\"></span><img src=\"../../kui-base/themes/default/images/drop_up_black.png\"/></div>";
				bodyHtmlContent += "<ul class=\"msg_category_list\"></ul></div>";
			}
			headerHtmlContent += "</div>";
			bodyHtmlContent += "</div>";
			$.parser.parse($(headerHtmlContent+bodyHtmlContent));
			
			$.pushmsg.$msgContentId.append($(headerHtmlContent+bodyHtmlContent));
			$.pushmsg.bindListener();
			//绑定点击消息事件
			$("#"+$.pushmsg.msgBoxId).click(function (){
				 $('#message-window').window('open');
				 $.pushmsg.$msgContentId.css("display","block");
				 $.pushmsg.initUI();
				 $.pushmsg.bindTitleListener();
			});
			//绑定刷新事件
			$("#msg-header-refresh").click(function (){
				$.pushmsg.refresh();
			});
		},
		initUI: function(){ //初始化消息弹出框
			var liStr = "";
			var aClass;
			//刷新消息盒子消息统计数
			$.pushmsg.refreshMessageQuantity();
			//初始化最近消息框
			var recentLength = $.pushmsg.msgArr.recent.length > 10 ? 10 : $.pushmsg.msgArr.recent.length;
			var imgSrcStr;
			for(var i=0;i<recentLength;i++){
				imgSrcStr = "../../kui-base/themes/default/images/icon_"+$.pushmsg.categoryDict[$.pushmsg.msgArr.recent[i][$.pushmsg.msgCls]]+"_message.gif";
				if($.pushmsg.msgArr.recent[i]['readed']){
					aClass = "msg_readed";
				} else {
					aClass = "msg_read";
				}
				liStr += "<li class='msg_title'><img src='"+imgSrcStr+"'></img><span class='msg_title_span'><a class='"
					+aClass+"' name='"
					+$.pushmsg.msgArr.recent[i]['msgId']+"' href='#'>"
					+$.pushmsg.msgArr.recent[i]['title']+"【"+$.pushmsg.businessType[$.pushmsg.msgArr.recent[i]['businessType']]+"】</a></span><span class='msg_time'>"
					+$.pushmsg.msgArr.recent[i]['sendTime']+"</span><span style=\"margin-left:10px\">"
					+$.pushmsg.msgArr.recent[i]['publishSytem']+"</span></li>";
				liStr += "<li class='msg_content'><p>"
					+$.pushmsg.msgArr.recent[i]['message']+"<a title=\"点击处理\" href=\"#\" onclick=\"$.pushmsg.msgDispose('"+$.pushmsg.msgArr.recent[i]['businessType']+"')\">处理</a></p></li>";
				$.pushmsg.$msgContentId.find("#msg-recent").find(".msg_category_list").html(liStr);
			}
			//初始化各类别消息框
			for(var ky in $.pushmsg.categoryName){
				liStr = "";
				for(var i=0;i<$.pushmsg.msgArr[ky].length;i++){
					if($.pushmsg.msgArr[ky][i]['readed']){
						aClass = "msg_readed";
					} else {
						aClass = "msg_read";
					}	
					liStr += "<li class='msg_title'><img src='../../kui-base/themes/default/images/icon_"
						+ky+"_message.gif'></img><span class='msg_title_span'><a class='"
						+aClass+"' name='"
						+$.pushmsg.msgArr[ky][i]['msgId']+"' href='#'>"
						+$.pushmsg.msgArr[ky][i]['title']+"【"+$.pushmsg.businessType[$.pushmsg.msgArr[ky][i]['businessType']]+"】</a></span><span class='msg_time'>"
						+$.pushmsg.msgArr[ky][i]['sendTime']+"</span><span style=\"margin-left:10px\">"
						+$.pushmsg.msgArr[ky][i]['publishSytem']+"</span></li>";
					liStr += "<li class='msg_content'><p>"
						+$.pushmsg.msgArr[ky][i]['message']+"<a href=\"#\" title=\"点击处理\" onclick=\"$.pushmsg.msgDispose('"+$.pushmsg.msgArr[ky][i]['businessType']+"')\">处理</a></p></li>";
					$.pushmsg.$msgContentId.find("#msg-"+ky).find(".msg_category_list").html(liStr);
						
				}
			}
		},
		msgDispose:function (businessType) { //参数业务类别
			//todo 根据businessClass判断链接到相关业务页面，如审核
			alert(businessType);
		},
		addMessage:function (msg) { //添加消息
			$.pushmsg.msgArr.recent.splice(0,0,msg);
			$.pushmsg.msgArr.box.push(msg);
			$.pushmsg.msgArr.noReaded.push(msg);
			$.pushmsg.msgArr[$.pushmsg.categoryDict[msg[$.pushmsg.msgCls]]].push(msg);
			$.pushmsg.refreshTopMessageState();
			$.pushmsg.initUI();
			$.pushmsg.bindTitleListener();
		},
		refreshTopMessageState: function (){ //刷新首页消息统计
			$("#"+$.pushmsg.msgCountId).text("("+$.pushmsg.msgArr.noReaded.length+")");
		},
		refreshMessageQuantity: function () {//刷新消息盒子消息统计数
			$.pushmsg.$msgContentId.find("#msg-recent").find(".msg_name").text("最近消息("+$.pushmsg.msgArr.recent.length+")");
			
			for(var ky in $.pushmsg.categoryName){
				$.pushmsg.$msgContentId.find("#msg-"+ky).find(".msg_name").text($.pushmsg.categoryName[ky]+"("+$.pushmsg.msgArr[ky].length+")");
			}
			for(var key in $.pushmsg.noReadQuantity) { //未读数据清零
				$.pushmsg.noReadQuantity[key] = 0;
			}
			for(var i=0;i<$.pushmsg.msgArr.noReaded.length;i++){ //未读数据的赋值
				$.pushmsg.noReadQuantity[$.pushmsg.categoryDict[$.pushmsg.msgArr.noReaded[i][$.pushmsg.msgCls]]] += 1;
			}
			for(var ky in $.pushmsg.noReadQuantity){ //设置头部的消息数
				if(ky)
					$.pushmsg.$msgContentId.find("#msg-header-"+ky+"-title").text($.pushmsg.categoryName[ky]+"("+$.pushmsg.noReadQuantity[ky]+")");
			}
		},
		removeFromNoReaded: function (msg) {
			for(var i=0;i<$.pushmsg.msgArr.noReaded.length;i++){
				if(msg == $.pushmsg.msgArr.noReaded[i]){
					$.pushmsg.msgArr.noReaded.splice(i,1);			
				}
			}
		},
		bindListener: function () {//添加监听事件
			//分类标题点击事件
			$.pushmsg.$msgContentId.find(".msg_category_title").click(function(){
				if($(this).find("img").attr("src")=="../../kui-base/themes/default/images/drop_down_black.png"){
					$(this).next().css("display","block");
					$(this).find("img").attr("src","../../kui-base/themes/default/images/drop_up_black.png");
				} else if ($(this).find("img").attr("src")=="../../kui-base/themes/default/images/drop_up_black.png"){
					$(this).next().css("display","none");	
					$(this).find("img").attr("src","../../kui-base/themes/default/images/drop_down_black.png");
				}
			});
			//头部标题点击事件
			for(var ky in $.pushmsg.categoryName){
				this.$msgContentId.find("#msg-header-"+ky+"-title").click(function (){
					var link = $(this).attr("link");
					$("#"+link).find(".msg_category_title").click();
				});
			}
			/*
			$("#msg-header-warning-title").click(function(){
				$("#warning").find(".category_title").click();
			});
			$("#header_generator_title").click(function(){
				$("#generator").find(".category_title").click();
					
			});
			$("#header_special_title").click(function(){
				$("#special").find(".category_title").click();
			});
			$("#header_immediately_title").click(function(){
				$("#immediately").find(".category_title").click();
			});
			*/
		},
		bindTitleListener:function () {//绑定标题点击事件，刷新文章时需要重新绑定
			//文章标题点击事件
			$.pushmsg.$msgContentId.find(".msg_title").click(function(){
				//如果是未读消息
				if($(this).find(".msg_title_span a").attr("class") == "msg_read"){
					var categoryId = $(this).parent().parent().attr("id");
					categoryId = categoryId.substring(categoryId.indexOf("msg-")+4,categoryId.length);
					var msgId = $(this).find(".msg_title_span a").attr("name");
					//切换为已读样式
					var msgTitle = $("[name='"+msgId+"']");
					msgTitle.each(function(){
						$(this).attr("class","msg_readed");
					});
					$(this).find(".msg_title_span a").attr("class","msg_readed");
					for(var i=0;i<$.pushmsg.msgArr[categoryId].length;i++){
						if($.pushmsg.msgArr[categoryId][i]['msgId'] == msgId){
							//前端消息状态改为已读
							$.pushmsg.msgArr[categoryId][i]['readed'] = true;	
							//从未读消息列表中删除
							$.pushmsg.removeFromNoReaded($.pushmsg.msgArr[categoryId][i]);
							//刷新未读消息数
							$.pushmsg.refreshTopMessageState();
							$.pushmsg.refreshMessageQuantity();
							//$("#header_"+ky+"_title").text(categoryName[ky]+"("+noReadQuantity[ky]+")");
							if($.pushmsg.msgArr[categoryId][i]['returnDelivery'] == '1'){
								//这里需要重写按照新的框架结构写
								//回报送达msgId
								//var responseText = new AjaxEngine().publicRequest({aysnc:false,data:[{bexId:'mdfmsgresult',isRecord:false,param:{WEB_MAC:top.objPub.hostName,MSG_ID:top.objPub.message[categoryId][i]['msgId'],MODULE_ID:0,MSG_TREAT_STATUS:2}}]});
							}
						}
					}
				}
				if($(this).next().css("display")=="none"){
					$(this).next().css("display","block");
				}else{
					$(this).next().css("display","none");
				}
			});
		}
	};
})(jQuery);
