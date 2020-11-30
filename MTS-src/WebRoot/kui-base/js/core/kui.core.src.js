/**
 * kui-core - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * 
 */
//定义kui名空间

    
(function() {
    
	var KUICONSTANTS={
		//SERVICE:"COM_SERVICE",
		//PROGRAM:"COM_PROGRAM"
		"SERVICE":"service",
		"PROGRAM":"menuId"
	};
	var kui = {sessionTimeoutFlag:false};
    //判断kui库是否已经装载
    if (kui && ! (kui.status === "loaded")) {
        /*
		* 日期判断时间相关
		*
		*/
        //验证开始日期是否大于结束日期
        kui.dateValidate = function(startDate, endDate) {
            return ! startDate || !endDate || endDate >= startDate;
        }
        //验证开始日期与结束日期是否相差num天
        kui.differDateValidate = function(startDate, endDate, num) {
            var flag = true;
            if (!isNaN(startDate) && !isNaN(endDate)) {
                endDate = endDate.substring(0, 4) + "-" + endDate.substring(4, 6) + "-" + endDate.substring(6, 8);
                startDate = startDate.substring(0, 4) + "-" + startDate.substring(4, 6) + "-" + startDate.substring(6, 8);
                var differDate = Date.parse(endDate) - Date.parse(startDate);
                if ((differDate / 1000 / 60 / 60 / 24) > num) {
                    flag = false;
                }
            }
            return flag;
        }
        //日期格式替换"-"处理
        kui.dateParser = function(dataStr) {
            var result = "";
            if (dataStr && dataStr.indexOf("-") > -1) {
                var sps = beforeValue.split("-");
                for (var i = 0; i < sps.length; i++) {
                    result += sps[i];
                }
            }
            return result;
        }
        //时间字符串转换为时间格式
        kui.timeParserData = function(dataStr) {
            var str = "";
            if (dataStr && dataStr.indexOf(":") == -1) {
                str = dataStr.substring(0, 2) + ":" + dataStr.substring(2, 4) + ":" + dataStr.substring(4, 6);
            } else {
                str = dataStr;
            }
            return str;
        }
        //日期字符串转换为日期格式
        kui.dateParserData = function(dataStr) {
            var str = "";
            if (dataStr && dataStr.indexOf("-") == -1) {
                str = dataStr.substring(0, 4) + "-" + dataStr.substring(4, 6) + "-" + dataStr.substring(6, dataStr.length);
            } else {
                str = dataStr;
            }
            return str;
        }

        /*
		* 表单相关
		*
		*/
        //序列化表单输入项
        kui.serialize = function(objs) {
            var parmString = $(objs).serialize();
            var parmArray = parmString.split("&");
            var parmStringNew = "";
            $.each(parmArray,
            function(index, data) {
                var li_pos = data.indexOf("=");
                if (li_pos > 0) {
                    var name = data.substring(0, li_pos);
                    data = data.substr(li_pos + 1).replace(/\+/g," ");   
                    var value = decodeURIComponent(data);
                    var parm = name + "=" + value;
                    parmStringNew = parmStringNew == "" ? parm: parmStringNew + '&' + parm;
                }
            });
            return parmStringNew;
        }

        /**
         * @author liuqing 2014-10-14修改，修复多个相同属性结果覆盖的问题
         * 
         * 将url请求参数序列化成json对象，如果有相同名称的参数将使用seperator分隔存放于一个属性中
         * @param param 需要处理的url请求字符串，形如：a=1&b=2&c=3
         * @param seperator 多个属性的分隔符，默认','
         * @param vFilter 每一组键值对的过滤器，用于值的预处理
         * @return 序列化后的对象
         */
        kui.serialize2Json = function(param, seperator, vFilter) {
        	seperator = seperator || ",";
        	param = (function() {
                try {
                    return decodeURIComponent(param);
                } catch(ex) {
                    return param;
                }
            })();
        	vFilter = vFilter || $.noop;
        	
        	var ret = {},
        		pairsArr = param.split('&'), pair, idx, key, value;
        	$.each(pairsArr, function() {
        		idx = this.indexOf("=");
        		if(-1 === idx) {
        			return true;
        		}
        		key = this.substring(0, idx);
        		value = this.substring(idx + 1, this.length);
        		
        		value = vFilter.call(param, key, value) || value;
        		
        		if(ret[key]) {
	        		if(-1 === ret[key].indexOf(value)) {
	        			ret[key] = ret[key] + seperator + value;
	        		}
        		} else {
        			ret[key] = value;
        		}
        	});
        	
        	return ret;
        }
        /**
		 * 将json转换成string，即将json转换成str
		 * @param json
		 * @returns {String}
		 */
        kui.jsonToString = function(json) {
            var a = '',
            tpl = '{0}:"{1}"';
            for (var i = 0; i < json.length; i++) {
                for (var name in json[i]) {
                    var b = tpl.replace('{0}', name).replace('{1}', json[i][name]);
                    a += a.length == 0 ? b: ',' + b;
                }
            }

            return '[{' + a + '}]';
        };
		/**
		 * 将json转换成string，即将json转换成str
		 * @param json
		 * @returns {String}
		 */
        kui.jsonToOP = function(json) {
            var a = '',
            tpl = '{0}:{1}';            
			for (var name in json) {
				var b = tpl.replace('{0}', name).replace('{1}', json[name]);
				a += a.length == 0 ? b: ',' + b;
			}
            return   a  ;
        };
        /**
		 * 将json转换成string,构造输入请求格式json字符串，给makeXmlRequestStr函数用
		 * @param json
		 * @returns {String}
		 */
        kui.jsonArryToString = function(json) {
            var a = '',
            tpl = '{0}:"{1}"';
            for (var i = 0; i < json.length; i++) {
                var temp = '{';
                for (var name in json[i]) {
                    var b = tpl.replace('{0}', name).replace('{1}', json[i][name]);
                    temp += temp == '{' ? b: ',' + b;
                }
                temp += "}";
                //遍历完一条请求
                a += a == '' ? temp: ',' + temp;
            }
            return '{req:[' + a + ']}';
        };
        /**
		 * 拼请求后台字符串
		 * @param json json对象
		 * @returns {String} xml格式请求字符串
		 */
        kui.makeXmlRequestStr = function(json) {
            var xmlRequestStr = '<?xml version="1.0" encoding="UTF-8"?><requests><![CDATA[';
            //json对象转json字符串
            var paramJson = kui.jsonArryToString(json);
            xmlRequestStr += paramJson;
            xmlRequestStr += "]]></requests>";
            return xmlRequestStr;
        };
        //json格式回调函数
		kui.jsonResultCallback = function(data, params) {
			//if(top && top.kui_debugger)
			//	top.kui_debugger.debug("应答返回",JSON.stringify(data));
			if (params.noProcess) {
				if ($.isFunction(params.func)) {				    
					params.func.call(params,data);
				}
				return ;
			}
			var answers = {
				"ANSWERS": [{
					"ANS_MSG_HDR": {
						"MSG_CODE": "100",
						"MSG_TEXT": "没有返回结果",
						"RESULT_NUM": "0"
					},
					"ANS_COMM_DATA": []
				}]
			};
			if (data) {
				answers = data["ANSWERS"];
			}
			if (!answers) {
				top.alert(' ','返回数据格式解析失败！','info', params.errorCallBack);
			}
			var serNum = answers.length;			
			var retData = answers;
			if (serNum == 1) {
				var retCode = answers[0]["ANS_MSG_HDR"]["MSG_CODE"];
				var retMsg = answers[0]["ANS_MSG_HDR"]["MSG_TEXT"];
				var retHead = answers[0]["ANS_MSG_HDR"];
				//100,-130011表示执行成功，没有返回结果				

				if (retCode == "0" || retCode == "100" || retCode == "-130011" || retCode == "-404") {
					retData = answers[0]["ANS_COMM_DATA"];
				} else if (retCode == "8888888888") {
					if(!kui.sessionTimeoutFlag){
						kui.sessionTimeout();
						kui.sessionTimeoutFlag = true ;
					}
                    if (params.error) params.error(answers);
					return;
				} else {
					if(retCode == "2011"){
						top.alert(' ',"业务运行超时!", 'info', params.errorCallBack);
					}else if(!params.noPrompt){
						top.alert("业务运行失败!", retMsg, 'info', params.errorCallBack);
					}
					if (params.error) params.error(answers);
					return;
				}
			}
			//try{
			if ($.isFunction(params.func)) {
				params.func.call(answers, retData, retHead);
			}
			//}catch(e){
			//	 alert("请求回调函数执行失败!<br><strong>服务号：</strong>["+params.req[0]["service"]+"]<br><strong>回调函数：</strong>"+params.func+"<br><strong>异常信息：</strong>"+e);
			// }

		};
		kui.xmlResultCallback = function(data,ajaxParam){
			var responseJson;
			if(!data){
				responseJson = [{'message':[{'flag':'-6666','prompt':'没有返回结果!'}]}];
			}else if (ajaxParam.dataType && ajaxParam.dataType.toLowerCase() == 'json') {
				responseJson = data;
			} else {
				try {
					var str = $.xml2json(data);
					responseJson = eval('('+str+')');						
				} catch(e) {
					alert('后台返回格式转换异常请联系管理员！');
					return;
				}
				if((responseJson[0]['service']['flag']!='0'&&responseJson[0]['service']['flag']!= '-130011'&&responseJson[0]['service']['flag']!= '100') && !ajaxParam.noProcess){
					if(responseJson[0]['service']['flag']=='8888888888'){
						alert('您的服务器会话已过期，请重新登录后再使用！');
					}else{
						alert(responseJson[0]['message'][0]['prompt']);
					}
				}
			}					
			if (ajaxParam.func&&responseJson[0]['service']&&(responseJson[0]['service']['flag']=='0'||responseJson[0]['service']['flag']== '-130011'||responseJson[0]['service']['flag']== '100')) {
				ajaxParam.func(responseJson);
			} else if(ajaxParam.noProcess){
				ajaxParam.func(responseJson);
			} else {
				if(ajaxParam.error)
					ajaxParam.error();
			}
		};
		kui.getKSDXReqMsgHead = function (request){			
			var reqMsgHeader = {
				"OP_CODE":g_user.userId||'',
				"OP_ROLE":g_user.userRole||'',
				"OP_BRANCH":g_user.orgCode||'',
				"OP_SITE":g_user.loginIp||'',
				"USER_TICKET_INFO":g_user.userTicket||'',
				"OP_WAY":'1',
				"OP_LANGUAGE":'1',
				"OP_PROGRAM":request[KUICONSTANTS.PROGRAM]||'',
				"SERVER_ID":request[KUICONSTANTS.SERVICE]||'',
				"MSG_ID":request[KUICONSTANTS.SERVICE]
			};
			return reqMsgHeader;
		};

		kui.makeJsonRequest = function(requests){
			var jsonPack = [];
			for(var i = 0 ;i < requests.length;i++){
				jsonPack[i] = {};
				jsonPack[i].REQ_MSG_HDR = kui.getKSDXReqMsgHead(requests[i]);
				jsonPack[i].REQ_COMM_DATA = requests[i];
				/*for(var key in requests[i]){
					
				}*/
			}
			return jsonPack;
		};
		kui.addProgramParam = function(req){
			var menuId, fsubsys;
			$.each(req, function() {
				menuId = kui.getUrlParam(KUICONSTANTS.PROGRAM);
				fsubsys = kui.getUrlParam("F_SUBSYS");
                compId =  kui.getUrlParam("OPP_COMP_ID");
				if(menuId) {
					this[KUICONSTANTS.PROGRAM] = menuId;
				}
				if(fsubsys) {
					this["F_SUBSYS"] = fsubsys;
				}
				if(compId) {
                    this["OPP_COMP_ID"] = compId;
                }
			});
		};
		kui.getUrlParam = function(param){
			var uri = window.location.search;
			var reg = new RegExp(param+"=([^&]*)","ig");
			var paramStr = uri.match(reg);
			if(paramStr&&paramStr.length>0){
				return paramStr[0].substr(param.length+1);
			}else{
				return "";
			}
		}
		kui.addRouteInfo= function(ajaxParam){
			var service = request[KUICONSTANTS.SERVICE]
			ajaxParam.url = ajaxParam.url || '../../kjdp_ajax?returnType='+ajaxParam.reqType;

		};
        kui.ajaxRequest = function(ajaxParam) {
			if(top.$k && top.$k.config.checkingFlag){//复核统一入口
				var flag = Checking.check(ajaxParam);
				if(flag) return true;//如果已经做了复核申请则不需再继续提交数据
			}
        	var requests = ajaxParam.req || [{}];
        	for(var i = 0 ;i < requests.length ; i++){
        		if(typeof(requests[i].service) != "undefined" && requests[i].service == 'P9999999' 
        			&& (typeof(requests[i].bex_codes) == "undefined" || requests[i].bex_codes == '')){
        			top.alert("请求配置错误:未配置bexcode！");
        			return;
        		}
				if(typeof(requests[i].bex_codes) == "string" && typeof(requests[i].service) == "undefined"){
					requests[i].service = 'P9999999' ;	
				}
        	}
			kui.addProgramParam(requests);
			var reqType = 'json';
			var requestStr = "";
			
			if(reqType == 'json'){
				requests = kui.makeJsonRequest(requests);
				requestStr = "{\"REQUESTS\":"+$.jsonToString(requests)+"}";
			}else if(reqType == 'xml'){
				requestStr = kui.makeXmlRequestStr(ajaxParam.req);
			}	
			
			if(top && top.kui_debugger)
				top.kui_debugger.debug("请求参数",requestStr);
            //加密入参
            requestStr = encrypt(requestStr,top.window.$kencKey?top.window.$kencKey:null);
			
            var params = {
                url: ajaxParam.url || '../../kjdp_ajax?returnType='+reqType,
                async: String(ajaxParam.async)=='false'?false:true,
                type: ajaxParam.type || 'POST',
                contentType: 'text/plain; charset=utf-8',
                dataType: reqType,
                processData: false,
                data: requestStr,
				timeout : ajaxParam.timeout || null,
				errorCallBack : ajaxParam.errorCallBack || $.noop,
                success: function(data, textStatus, jqXHR) {
					//debugger;
					if(reqType == 'json'){
						kui.jsonResultCallback(data,ajaxParam);
					}else if(reqType == 'xml'){
						kui.xmlResultCallback(data,ajaxParam);
					}                    
                },                
                error: function(pa, p, w) {
					//debugger;	
                	if(ajaxParam.noProcess){
						ajaxParam.error(pa,p,w);
					}else{
	                	if(p=="parsererror"){
							try{
								var data = eval("("+pa.responseText+")");
								if(reqType == 'json'){
									kui.jsonResultCallback(data,ajaxParam);
								}else if(reqType == 'xml'){
									kui.xmlResultCallback(data,ajaxParam);
								}
							}catch(e){
								if(ajaxParam.error) {
									ajaxParam.error(pa,p,w);
								}
							}
							
						} else if(p=="error") {
	                        if(pa.status==500) {
	                            top.alert("服务器异常，请与管理员联系");
	                        }
	                    }
					}
                }
            }
            $.ajax(params);

        };

		kui.sessionTimeout=function(){
		   top.confirm('提示','您的服务器会话已过期，是否重新登录?',function(flag){   
				if(flag) {
					try{						
						if(top.$k){							
							top.$k.lock(function(){window.location.reload();});
						}
					}catch(e){}
				}else{
					top.location.replace("about:blank");
				}
			});
		}
        /*
			dictCode 数据字典code
			val 数据字典具体项值
			作用：请求dictCode数据字典值为val的text,如果val为空，则返回值串数组.
		*/
        kui.getSysDictOpt = function(dictCode, val) {			
            if (!dictCode) return "";
            if (!val) return "";			
            return getSysDict(dictCode, val);
        }
        /*
			dictCode 数据字典code
			val 数据字典具体项值
			作用：请求dictCode数据字典值为val的text,如果val为空，则返回值串数组.
		*/
		kui.requestDict = function(dictCode){
			if(!dictCode) return null;
			var dicts = [];
			  ajaxRequest({
				async:false,
				url:"../../kjdp_cache?cacheType=dictCache&keyCode="+dictCode,
				noProcess:true,
				func:function(data){
				  var ret = data[dictCode];
				  for (var i = 0;ret && i < ret.length; i++) {
					dicts.push({"dict_val":ret[i]["DICT_ITEM"],"dict_des":ret[i]["DICT_ITEM_NAME"],"dict_org":ret[i]["INT_ORG"]});
				  }
				}
			  });			  
			  return dicts;
		}
		kui.getSysDict = function(dictCode, val) {
        	var dictCodeName = dictCode;
        	var rexp = "";
        	var comString = "";
        	if(dictCode.indexOf('[')>-1){
        		dictCodeName = dictCode.substring(0, dictCode.indexOf("["))
        		rexp = dictCode.substring(dictCode.indexOf("[")+1,dictCode.indexOf("]"));
    			if(rexp.substr(0,1) == "!"){
    				comString = rexp.substr(1);
    			}else{
    				comString = rexp;
    			}
        	}
        	try{
				window.g_dicts = top.window.g_dicts||{};
			}catch(e){}
			var dicts;
			if(window.g_dicts[dictCodeName]){
				dicts = window.g_dicts[dictCodeName];
			}else{
				dicts = kui.requestDict(dictCodeName);				
				window.g_dicts[dictCodeName] = dicts;
				try{
					top.window.g_dicts = top.window.g_dicts || {};
					$.extend(top.window.g_dicts,window.g_dicts);
				}catch(e){}
			}			
            if(!val){
            	if(rexp != ""){
            		var finaldicts = new Array();
            		for (var i = 0; i < dicts.length; i++) {
            			if(rexp.substr(0,1) == "!"){
            				if(dicts[i]['dict_val'].substr(0,comString.length)!=comString){
            					finaldicts.push(dicts[i]);
            				}
            			}else{
            				if(dicts[i]['dict_val'].substr(0,comString.length)==comString){
            					finaldicts.push(dicts[i]);
            				}
            			}
                    }
            		dicts = finaldicts;
            	}
            	
				return dicts;
			}
            if (dicts) {
                for (var i = 0; i < dicts.length; i++) {
                     if (dicts[i]['dict_val'] == val) {
                            return dicts[i]['dict_des'];
                     }
                }
            }
			return val;
        }
        /*
			dictCode 数据字典code
			作用：从缓存中请求dictCode数据字典值为val的text。
		*/
        kui.getDict = function(dictCode) {		
            var dicts = window.g_dicts ;
			try{
				if(!dicts) dicts = top.window.g_dicts;
			}catch(e){}
            if (!dictCode) return dicts;
            if (dictCode) dictCode = dictCode.toUpperCase();
            if (dicts) {
                for (var i = 0; i < dicts.length; i++) {
                    var _dictCode = dicts[i];
                    if (_dictCode['dict_code'].toUpperCase() == dictCode) {
                        return _dictCode['dictVals'];
                    }

                }
            }
        }

        kui.clearDicts = function() {
            top.window.g_dicts = {};
        }

        //金额大写转换函数
        kui.toChinese = function(n, obj) {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
            var unit = "千百拾亿千百拾万千百拾元角分",
            str = "";
            n += "00";
            var p = n.indexOf('.');
            if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            if(str=='零元零角零分') {
              ret = '零元'
            }
            else{
//            var ret = str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
              var ret = str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
            }
            if (obj) {
                $(obj).next("span").remove();
                $(obj).after("<span style='color:red'><b>" + ret + "</b></span>");
            }
            return ret;
        }
		
		kui.formatNumber = function(num){
			if(!/^(\+|-)?(\d+)(,\d{3})*(\.|\.\d+)?$/.test(num)){
				return num;
			}
			var a = RegExp.$1,b = RegExp.$2,c = RegExp.$4;
			var re = /(\d)(\d{3})(,|$)/;
			while(re.test(b)){
				b = b.replace(re,"$1,$2$3");
			}
			return  a +""+ b +""+ c;
        }
        //获取系统日期
        kui.getCurrDate = function(format) {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            if (format) {
                switch (format) {
                case ':month_first':
                    d = 1;
                    break;
                case ':month_last':
                    var a = y,
                    b = m;
                    if (m == 12) {
                        a += 1;
                        b = 1;
                    }
                    d = 32 - new Date(a, b - 1, 32).getDate();
                    break;
                case ':week_last':
                    if (d <= 7) {
                        d = 1;
                    } else {
                        d = d - 7;
                    }
                    break;
                case ':curr_date':
                    break;
                }
            }
            return y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
        }
        //获取系统时间
        kui.getCurrTime = function(){
            var date = new Date();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            return (hour<10 ? ('0'+hour): hour) + '' + (min < 10 ? ('0' + min) : min) + '' + (sec < 10 ? ('0' + sec) : sec);

		}


		kui.formatMacro = function(format) {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();			
            if (format) {
				var f = format.substr(0,2);
				var v = format.substr(2,format.length);
				if(isNaN(v)) return;
                switch (f) {
                case ':Y':
					y +=new Number(v);
                    break;
                case ':M':
                    m +=new Number(v);
					if(m<1)m=1;
					if(m>12)m=12
                    break;
                case ':D':
                    d +=new Number(v);
					if(d<1)d=1;
					if(d>31)d=31;
					break;
                default :
                    break;
                }
            }
            return y + '' + (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
        }
        //转义特殊字符
        kui.valueReplace = function(v) {
            //v = v.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
            v = v.replace(/\"/g, "&quot;");
            v = v.replace(/</g, "&lt;");
            v = v.replace(/>/g, "&gt;");
            return $.trim(v);
        }
        //动态执行回调
        kui.execHandle = function(h) {
            var reg = /^( )*(function)/;
            if (reg.test(h)) eval("(" + h + ")()");
            else eval("{" + h + "}");
            return;
        }
		//对对象数组的字符串字段进行快速排序，非稳定排序
		kui.quickSort = function(arr,field,useLocaleCompare) {
            if (arr.length <= 1) { return arr; }
            var pivotIndex = Math.floor(arr.length / 2);
            var pivot = arr[pivotIndex];
            var left = [];
            var right = [];
            for (var i = 0; i < arr.length; i++){
				if(i==pivotIndex) continue;
				var flag;
				if(useLocaleCompare) {
					flag = (new String(arr[i][field]).localeCompare(pivot[field])==-1); // 不同版本不同地区实现不一致，不建议使用
				} else {
					flag = (new String(arr[i][field]) < pivot[field]); // 按unicode进行比较
				}
                if (flag) {
					left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            return kui.quickSort(left,field).concat([pivot], kui.quickSort(right,field));
		};
		//对象数组字符串二分查找排序
		kui.quickSortNum = function(arr,field) {
            if (arr.length <= 1) { return arr; }
            var pivotIndex = Math.floor(arr.length / 2);
            var pivot = arr[pivotIndex];
            var left = [];
            var right = [];
            for (var i = 0; i < arr.length; i++){
                if(i==pivotIndex) continue;
                if (new Number(arr[i][field])< new Number(pivot[field])) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            return kui.quickSortNum(left,field).concat([pivot], kui.quickSortNum(right,field));
		};
		//屏蔽输入框只读模式浏览器回格键
		kui.shieldBackspace = function (e) {
			var blnEevntCancel = false, e = e||window.event, t = e.target || e.srcElement;
			if (e && e.altKey && (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39)) {
				blnEevntCancel = true;
			}
			if (e.keyCode == 8) {
				if (t.tagName.toUpperCase() == "TEXTAREA") {
					if (t.readOnly == true) {
						blnEevntCancel = true;
					}
				} else if (t.tagName.toUpperCase() == "INPUT" &&( t.type.toUpperCase() == 'TEXT'|| t.type.toUpperCase() == 'PASSWORD')) {
					if (t.readOnly == true) {
						blnEevntCancel = true;
					}
				} else {
					blnEevntCancel = true;
				}
			}
			if (blnEevntCancel == true) {
				e.cancelBubble = true;
				e.returnValue = false;
				return false;
			}
		};
		kui.commonRequest =function(params){
		  //通用单ajax请求,如果需要异步请求,async传true,如果需要返回提示信息,传msg参数为1
		  var data = [];
		  params = $.extend({},{service:'P9999999'},params);
		  ajaxRequest({
			async:false ,
			req:[params],
			func:function(res){
			  data = typeof(params.msg) == 'undefined' ? res[0] : res;
			}
		  });
		  return data;
		};
        //记录装载状态
        kui.status = "loaded";

    }
    window.kui = kui;
    window.ajaxRequest = kui.ajaxRequest;
    window.getSysDictOpt = kui.getSysDictOpt;
	window.getSysDict = kui.getSysDict;
	window.document.onkeydown =kui.shieldBackspace;
	try{
		window.g_user = top.window.g_user||{};
	}catch(e){}
})();