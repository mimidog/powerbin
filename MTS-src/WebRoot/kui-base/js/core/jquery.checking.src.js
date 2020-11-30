/**
 * Checking - KINGDOM-FRAME-CHECKING 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * 复核业务类，对配置复核的业务功能进行复核处理
 * 复核类别：0-普通复核，1-任务流复核
 * 复核类型：0-无需复核，1-柜员同机，2-柜员异机，3-岗位同机，4-岗位异机
 * 操作类型：0-增加，1-修改，2-删除
 */
;var Checking = (function($){

	var CheckingService = (function($){
		var checkCls = 0,//复核类别
			checkType = 0,//复核类型
			tempSubSys = "",//当前复核子系统
			tempMenuCode = "";//当前复核功能菜单
		
		function needToCheckForMenu(){
			var flag = false;
			
			tempMenuCode = kui.getUrlParam("menuId");
			var chkNum = Number(kui.getUrlParam("CHK_FLAG"))||0;
			if(0 != chkNum){
				flag = true;
				tempSubSys =  kui.getUrlParam("SUBSYS");
			}			
			return flag;
		}
		/**
		* 同机复核
		*/
		function checkingImmediately(appResult,ajaxParam,applyParams){
			var opCodes = appResult.OP_CODES,
				opNames = appResult.OP_CODENAMES;
			var opCodesArr = opCodes.split(","),
				opNamesArr = opNames.split(",");
			var chkOpDict = [];
			for(var i=0; i<opCodesArr.length; i++){
				var item = "{dict_val:'"+opCodesArr[i]+"',dict_des:'"+opNamesArr[i]+"'}";
				chkOpDict.push(item);
			}
			var chkOpDictStr = "["+chkOpDict.join(",")+"]";
			var confirmDom = ["<form name=\"CHK_CONFIRM_FORM\" action=\"\" class=\"kui-form\"><div style='line-height:18px'>",
			   "<span style=''>复核操作员：</span>",
			   "<input class=\"kui-combobox\" name=\"CHK_OP_CODE\" kui-options=\"required:true,panelWidth:160,valueField:'dict_val',textField:'dict_des',autoFill:"+(chkOpDict.length==1?true:false)+",data:"+chkOpDictStr+"\"/>",
			   "</div><div style='margin-top:3px;'>",
			   "<span style=''>操作员密码：</span>",
			   "<input class=\"kui-validatebox\" type=\"password\" name=\"CHK_OP_PWD\" size=\"16\" kui-options=\"required:true\"></input>",
			   "</div></form>"];
			$.message.confirm("复核操作确认",confirmDom.join(""),function(flag,win){
				if(flag){
					var $form = $("form[name='CHK_CONFIRM_FORM']");
					if($form.form("validate")){
						var opCode = $form.find("input[comboname='CHK_OP_CODE']").combobox("getValue");
						var opPwd  = $form.find("input[name='CHK_OP_PWD']").val();
						var chkPwdParams = {"USER_CODE":opCode,"AUTH_DATA":opPwd};
						var result = CheckingModule.checkUserAuthInfo(chkPwdParams);
						if(isRequestSuccess(result)){
							win.window("close");
							applyParams = $.extend(applyParams,{CHK_OPCODE:opCode,CHK_RESULT:"1"});
							var appResult = CheckingModule.checkApplyRequest(applyParams);//复核申请第二步
							if(isRequestSuccess(appResult)){
								var ajaxCallback = ajaxParam.func;
								ajaxParam.needToCheck = false;
								ajaxParam.noProcess = true;
								ajaxParam.func = function(data){
									if(isRequestSuccess(data["ANSWERS"])){
										var updParams = {CHK_APP_SN:appResult[0].ANS_COMM_DATA[0][0].CHK_APP_SN,PROC_RESULT:"1"};
										CheckingModule.updateChkApp(updParams);//复核办理
										if(ajaxCallback)
											ajaxCallback(data);
									}else{
										$.message.alert("复核申请失败",data["ANSWERS"][0].ANS_MSG_HDR.MSG_TEXT,"error",function(){
											var updParams = {CHK_APP_SN:appResult[0].ANS_COMM_DATA[0][0].CHK_APP_SN,PROC_RESULT:"2"};
											CheckingModule.updateChkApp(updParams);//复核办理
										});
									}
								};
								ajaxRequest(ajaxParam);
							}else{
								$.message.alert("错误提示",appResult[0].ANS_MSG_HDR.MSG_TEXT,"error");
							}
						}else{
							$.message.alert("错误提示","您输入的密码有误，请重新输入","error");
						}
					}
				}
			},true);
		}
		/**
		* 异机复核
		*/
		function checkingDelayed(appResult,onCloseCallback){
			var appSn = appResult.CHK_APP_SN,
				opNames = appResult.OP_CODENAMES;
			var	opNamesArr = opNames.split(",");
			var opDom = ["<div style='line-height:18px;'><span style='font-weight:bold;color:#1AB637;line-height:20px;'>当前请求已提交复核！</span><br/>",
						"复核申请编号：<span style='color:red;font-weight:bold;'>"+appSn+"</span><br/>",
						"请等待以下操作员审批：<br/>"];
			for(var i=0; i<opNamesArr.length; i++){
				opDom.push("<span style='margin-left:65px;line-height:20px;'>"+opNamesArr[i]+"</span><br/>");
			}
			opDom.push("</div>");
			$.message.alert("复核申请提示",opDom.join(""),"info",null,onCloseCallback);
		}
		/**
		* 异机复核通用关闭
		*/
		function checkingConfirmClose(){
			var dialogWindow = $("div.window:visible",$('body'));
			if(dialogWindow.length>0){
				var dialog = dialogWindow.find("div.panel-body:first");
				if(dialog.length>0)dialog.dialog("close");
			}
		}

		/**
		* 复核业务提供给外部调用的函数
		*/
		return {
			/**
			* 复核调用入口函数
			* @param 格式：
			*  json：{}
			* @return 
			*  true -> 表示已申请复核
			*  false-> 表示不需走复核
			*/
			check: function(ajaxParam){
				//过滤掉不需要复核的请求
				if(!ajaxParam.needToCheck) return false;
				var bChkFlag = needToCheckForMenu();
				//判断当前功能能不能配置复核
				if(!bChkFlag) return false;
				var reqs = ajaxParam.req;
				if(!reqs || reqs.length == 0) return false;
				var chkLbmIds = "";
				var params = {};
				for(var i=0; i<reqs.length; i++){
					if(0 != i)
						chkLbmIds += ",";
					chkLbmIds += reqs[i].funcid || reqs[i].bex_codes;
					params = $.extend({},params,reqs[i]);
					if(reqs[i].funcid)
						delete params.funcid;//如果不删掉，后台会用此LBM做请求
					delete params.bex_codes;
					delete params.service;
				}
				var applyParams = {CHK_INT_ORG:g_user.INT_ORG,CHK_SUBSYS:tempSubSys,CHK_FUNC_CODE:tempMenuCode,"CHK_LBM_IDS":chkLbmIds,CHK_OPCODE:"0"};
				applyParams = $.extend(applyParams,params);
				var appResult = CheckingModule.checkApplyRequest(applyParams);
				if(isRequestSuccess(appResult)){
					var data = appResult[0].ANS_COMM_DATA[0][0];
					if(data){
						if("0" == data.CHK_APP_SN) {//复核申请编号为0说明是同机复核
							checkingImmediately(data,ajaxParam,applyParams);
							return true;
						} else { //有复核编号说明是异机复核
							checkingDelayed(data, ajaxParam.onCloseCallback || checkingConfirmClose);
							return true;
						}
					} else {
						return false;
					}
				}else{
					//复核申请失败则表示不需要复核或复核异常
					return false;
				}
			}
		}
	})(jQuery);
	//---------------------------------------------------------------------------------------
	var CheckingModule = (function($){
	
		//通用请求方法
		function request(params,func,isProcess){
			var req = [{
				service:'P9999999'
			}];
			$.extend(req[0],params);
			ajaxRequest({
				async:false,
				req:req,
				noProcess: isProcess ? true : false,
				func:function(data){
					if(func)
						func(data["ANSWERS"]);
				}
			});
		}
		/**
		* 复核数据模型
		* 负责与后台的对接（数据请求及提交）
		*/
		return {
			getOrgChkLvlCfg: function(params){
				var result;
				request(params,function(data){
					result = data;
				},true);
				return result;
			},
			checkApplyRequest: function(params){
				var result;
				params = $.extend(params,{"bex_codes":"LBM_ChkApply",CHK_APP_TYPE:"0"});
				request(params,function(data){
					result = data;
				},true);
				return result;
			},
			checkUserAuthInfo: function(params){
				var result;
				params = $.extend(params,{service:"OperatorPwdSettingService",bex_codes:"LBM_CheckUserAuthInfo",AUTH_TYPE:"0",USE_SCOPE:"0",USER_ROLE:"2"});
				request(params,function(data){
					result = data;
				},true);
				return result;
			},
			updateChkApp: function(params){
				var result;
				params = $.extend(params,{bex_codes:"LBM_UpdChkAppProc"});
				request(params,function(data){
					result = data;
				},true);
				return result;
			}
		}
	})(jQuery);
	
	function isRequestSuccess(result){
		return result && result.length>0 && result[0].ANS_MSG_HDR && result[0].ANS_MSG_HDR.MSG_CODE == "0";
	}
	
	return CheckingService;
})(window,document,jQuery);