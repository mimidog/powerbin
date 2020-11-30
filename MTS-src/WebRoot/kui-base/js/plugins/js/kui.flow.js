/**
 * 流程进度条
 * @author zhaozz
 * @date 2014-3-18
 * @return {[type]} [description]
 */
requireJS(["/frame/js/front-base.js","/accountSystem/js/frameUrl.js"],function(){
	var fms = getOpenCustFms();//获取开户流程的有限状态机
	var arrBpmData,processInstanceId;
	if(window.WF_SNO && "" != $.trim(window.WF_SNO)){
		processInstanceId = window.WF_SNO;
	}else if(URLtool().getValueByUrlKey("WF_SNO") && "" != $.trim(URLtool().getValueByUrlKey("WF_SNO"))){
		processInstanceId = URLtool().getValueByUrlKey("WF_SNO");
	}else{
		//top.alert("工单流水号为空！");
	}
	/**
	 * [Flow description]
	 * @author zhaozz
	 * @param  config [description]
	 *  {
	 * 		imgPath:图片路径,
	 * 		$target:渲染目标,
	 * 		arrText:[]节点文字,
	 * 		stepNum:总共节点数,
	 * 		currIndex:当前位置
	 *  }
	 */
	var Flow = function(config){	
		var _config = config;
		this.getConfig = function(){
			return _config;
		}
		this.render();		
	};
	Flow.prototype = {
		//建立模板
		buildTmpl:function(callback){
			var imgpath = this.getConfig().imgPath,
				fontColor,fIcon,title,_this = this;
			var arrTpl = ['<div class="kui-flow">'];	
			for(var i = 0,len=arrBpmData.length;i < len; i++){ 
				//调整字体颜色
				if(getCurSeq() < arrBpmData[i].priority){
					fontColor = "f-color";
					fIcon = "f-icon-todo";
				}else if(getCurSeq() == arrBpmData[i].priority){
					fontColor = "f-color-b";
					fIcon = "f-icon-ing";
				}else{
					fontColor = "f-color-b";
					fIcon = "f-icon-done";
				}
				title = arrBpmData[i].activityName;
				var nextP = (i+1)<len ? arrBpmData[i+1].priority : "";
				//拼装模板
				arrTpl.push('<div class="f-paster">');					
					arrTpl.push('<div class="'+fIcon+'" data-priority="'+arrBpmData[i].priority+'" data-next="'+nextP+'" data-formkey="'+arrBpmData[i].formKey+'">');
						arrTpl.push('<img class="step-img" src="'+imgpath+'step-icon-pic'+(i+1)+'.png"></img>');	
					arrTpl.push('</div>');				
					arrTpl.push('<div class="f-text '+fontColor+'" title="'+title+'">'+title+'</div>');
				arrTpl.push('</div>');
				if(i < len-1){
					arrTpl.push('<div class="f-arrow"></div>');
				}
			}
			arrTpl.push('</div>');
			callback?callback(arrTpl.join("")):undefined;			
		},
		render:function(){
			var _this = this;
			initBpmData(function(){
				_this.buildTmpl(function(tpl){				
					_this.getConfig().$target.html(tpl);
	      			if(StateMachine.prototype.FSM_STATE.REVIEW === fms.getCurrentState()){
	      				_this.getConfig().$target.find(".f-icon-done").bind("click",_this,_this.turnToPage);
	      				_this.getConfig().$target.find(".f-icon-ing").bind("click",_this,_this.turnToPage);
	      			}else{
	      				_this.getConfig().$target.find(".f-icon-done").css("cursor","auto");
	      				_this.getConfig().$target.find(".f-icon-ing").css("cursor","auto");
	      			}				
				});
			});
			
		},
		doNext:function(arg){			
			
		},
		doPrev:function(){

		},
		turnToPage:function(arg){
			var $target = "step-img" === arg.target.className ? $(arg.target).parent():$(arg.target);
			var flowParam = {
				"instanceId":processInstanceId,
				"curSeq":$target.attr("data-priority"),
				"nextSeq":$target.attr("data-next"),
				"formkey":$target.attr("data-formkey")
			};
			var _pkg = kportal.registNamespace("business");
			 //构造url传递参数
			buildFlowUrlParam(flowParam,function(param){
			 	pFrame.buildTheme(param.NEXT_THEME_ID,g_user["USER_CODE"],param);//打开业务办理界面
			});
		}
	};
	/**
	 * 特殊情况 无法复用
	 * @param  {[type]}   flowParam [description]
	 * @param  {Function} callback  [description]
	 * @return {[type]}             [description]
	 */
	function buildFlowUrlParam(flowParam,callback){
		//从客户识别页面传递过来的参数列表    
		var jsons = URLtool().getUrlParam();
		$.each(jsons, function(idx, val) {
			jsons[idx] = decodeURI(val);
		});
		
	    jsons["CUST_NAME"] = flowParam["CUST_NAME"] || jsons["CUST_NAME"]; 
	    jsons["RECORD_NODE"] = flowParam["RECORD_NODE"] || jsons["RECORD_NODE"]; 
	    
    	jsons["RECORD_NODE"] = (Number(flowParam.curSeq)) > Number(jsons["RECORD_NODE"])?
					(Number(flowParam.nextSeq)):Number(jsons["RECORD_NODE"]||"1");

		delete jsons["NEXT_NODE"];
		delete jsons["NEXT_THEME_ID"];
		delete jsons["DISABLED"];
		delete jsons["instanceId"];
		delete jsons["processInstanceId"];
		delete jsons["nextSeq"];
		delete jsons["service"];
		delete jsons["curSeq"];

		var strNode = "",bpmData,nodeCache,curIndex
	                				len = arrBpmData.length;
        for(var i = 0;i < len; i++){
            bpmData = arrBpmData[i];
            nodeCache = "activityName:"+bpmData.activityName+",formKey:"+bpmData.formKey;
            strNode += (strNode.length > 0 ? ";"+nodeCache : nodeCache );
            if(flowParam.curSeq == bpmData.priority){
            	curIndex = i;
            }
        }  
        flowParam["BPM_NODES"] = strNode;
        flowParam["NEXT_NODE"] = flowParam.nextSeq;
        flowParam["WF_SNO"] = flowParam.instanceId;
        flowParam["NEXT_THEME_ID"] = arrBpmData[curIndex].formKey;
        flowParam["DISABLED"] ="false";
        flowParam["TOTAL_NODE"] = len;
        delete flowParam.instanceId;
	    delete flowParam.service;
		
		$.extend(flowParam,jsons);
		
        callback?callback(flowParam):undefined;
		
	}

	function initBpmData(callback){
		var pkg = kportal.registNamespace("business");
		pkg.frameUrl.getArrBpmData(function(_arrBpmdata){
			arrBpmData = _arrBpmdata;
			callback();
		});
		
	}
	/**
	 * 获得下一个流程节点的优先级
	 * @return {[type]} [description]
	 */
	function getNextSeq(){
		var nextSeq;
		 for(var i = 0,len=arrBpmData.length;i < len; i++){            
            if("true"===arrBpmData[i].isCurrent){
            	nextSeq = (i+1<len)?arrBpmData[i+1].priority:arrBpmData[i].priority;
            	break;
            }
        }  
        return nextSeq;
	}
	/**
	 * 获取当前的流程节点优先级
	 * @return {[type]} [description]
	 */
	function getCurSeq(){
		var curSeq;
		 for(var i = 0,len=arrBpmData.length;i < len; i++){            
            if("true"===arrBpmData[i].isCurrent){
            	curSeq = arrBpmData[i].priority;
            	break;
            }
        }  
        return curSeq;
	}
	var pkg = kportal.registNamespace("kui.plugin");
	pkg.Flow = Flow;
});