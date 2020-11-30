//验证开始日期与结束日期是否相差num天
differDate= function(startDate, endDate) {
    var iDays =0;
    if (!isNaN(startDate) && !isNaN(endDate)) {
        endDate = endDate.substring(0, 4) + "-" + endDate.substring(4, 6) + "-" + endDate.substring(6, 8);
        startDate = startDate.substring(0, 4) + "-" + startDate.substring(4, 6) + "-" + startDate.substring(6, 8);
        var differDate = Date.parse(endDate) - Date.parse(startDate);
        if ((differDate / 1000 / 60 / 60 / 24)) {
            flag = false;
        }

        iDays=Math.floor(differDate / 1000 / 60 / 60 / 24)
    }
    return iDays;
}

Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
Object.extend(Object, {
    inspect: function(object) {
        try {
            if (object === undefined) return 'undefined';
            if (object === null) return 'null';
            return object.inspect ? object.inspect() : object.toString();
        } catch (e) {
            if (e instanceof RangeError) return '...';
            throw e;
        }
    },

    toJSON: function(object) {
        var type = typeof object;
        switch(type) {
            case 'undefined':
            case 'function':
            case 'unknown': return;
            case 'boolean': return object.toString();
        }
        if (object === null) return 'null';
        if (object.toJSON) return object.toJSON();
        if (object.ownerDocument === document) return;
        var results = [];
        for (var property in object) {
            var value = Object.toJSON(object[property]);
            if (value !== undefined)
                results.push(property.toJSON() + ': ' + value);
        }
        return '{' + results.join(', ') + '}';
    },

    getKeys: function(object) {
        var keys = [];
        for (var property in object)
            keys.push(property);
        return keys;
    },
    values: function(object) {
        var values = [];
        for (var property in object)
            values.push(object[property]);
        return values;
    },
    numValues: function(object) {
        var values = [];
        for (var property in object)
            values.push(Number(object[property]));
        return values;
    },

    clone: function(object) {
        return Object.extend({}, object);
    }
});
//格式化【交易综合查询】超链接
function formatTradeAllQueryLink(value, row, index) {
    var opId =row['OP_ID']; // 二取其一
    if (opId && opId != '0') {
        return '<a href="javascript:fwdTradeAllQueryPage(\'交易员综合查询\', \'../../business/accinInfo/TraderOverAllQuery.html?OP_ID='
            + opId + '\')" style="font-weight: bold;text-decoration: underline;">' + value + '</a>';
    } else {
        return value;
    }
}
//新开窗口跳转到交易综合查询下面
function fwdTradeAllQueryPage(tit,href) {
    var menuId=getSysParamValuebyCode('TRADER_ALL_QUERY_MENUID');

    if(g_user.USER_POST!='1' || g_user.USER_CODE !=8888){
        //查询功能权限
        var funPerRs=commonRequest({
            service: 'P0002232',
            OBJ_ID: g_user.USER_POST,
            OBJ_TYPE: 3,
            AUTH_TYPE: '1',
            PERM_VAL:menuId
        });

        var operPerRs=commonRequest({
            service: 'P0002232',
            OBJ_ID: g_user.USER_CODE,
            OBJ_TYPE: 2,
            AUTH_TYPE: '1',
            PERM_VAL: menuId
        });

        if(funPerRs.length==0 && operPerRs.length==0){
            alert('你或你的岗位没有【交易员综合查询】菜单访问权限！');
            return;
        }
    }

    top.mainFrame.addWindowTab(tit,href);

}

//数字千分位分隔
function toThousands(num) {
    var retNum=0;
    var strNum=num.toString();
    //小数点的位置
    var pointIDX=strNum.indexOf('.');
    var interParty=strNum.substring(0,pointIDX==-1?strNum.length:pointIDX).replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,')
    if(pointIDX != -1){
        retNum=interParty+'.'+strNum.substring(pointIDX+1,strNum.length);
    }else{
        retNum=interParty;
    }
    return retNum;
}

function dataGrdidCol_fontRedColor(value) {
    return '<span style="font-weight:bold;color:red">'+value+'</span>';
}
//红粗绿细色
function fontRedBoldGreenThinColor(value,row) {
    if(row['HOLD_PROFIT']<0)
        return '<span style="font-weight:900;color:red">'+value+'</span>';
    else
        return '<span style="color: green;">'+value+'</span>';
}

//千分位数变成普通字符口串
function thousandsToString(str) {
    return str.replace(new RegExp(/(,)/g),'');
}
/***
 * 指定日期X天之前/之后的日期
 * num表示天数，接受正负数,正数表示之后多少天的日期,负数表示之前多少天的日期
 * */
function date_getPointDate(currDate, num) {
    if(!num){//做num简单验证
        return currDate;
    }

    num = Math.floor(num);
    var myDate = new Date(fmtNormalDate(currDate)),
        lw = new Date(Number(myDate) + 1000 * 60 * 60 * 24 * num), //num天数
        lastY = lw.getFullYear().toString(),
        lastM = lw.getMonth()+1,
        lastD = lw.getDate(),
        startdate=lastY +(lastM<10 ? "0" + lastM : lastM).toString() +(lastD<10 ? "0"+ lastD : lastD).toString();
    return startdate;

    function fmtNormalDate(currDate) {
        //currDate.replace(new RegExp(".","g"),"").replace(new RegExp("/","g"),"").replace(new RegExp("-","g"),"");

        currDate=currDate.indexOf('.')>0 ?currDate.replace(new RegExp('.','g'),''):currDate;
        currDate=currDate.indexOf('/')>0?currDate.replace(new RegExp('/','g'),''):currDate;
        currDate=currDate.indexOf('-')>0?currDate.replace(new RegExp('-','g'),''):currDate;
        return currDate.substring(0,4) +'-'+ currDate.substring(4,6) + '-'+ currDate.substring(6,8)
    }
}


/** 数字金额大写转换(可以处理整数,小数,负数) */
function smalltoBIG(n) {

    var fraction = ['角', '分','厘','毫'];
    var fraction = ['角', '分','厘','毫'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
    var head = n < 0? '负': '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++)
    {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++)
    {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++)
        {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 
 * 功能: 对字符串进行base64编码加密
 * 入参：要加密的字符串
 * */
function base64encode(str){
    var out,i,len,base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var c1,c2,c3;
    len=str.length;
    i=0;
    out="";

    while(i<len){
        c1=str.charCodeAt(i++)&0xff;
        if(i==len){
            out+=base64EncodeChars.charAt(c1>>2);
            out+=base64EncodeChars.charAt((c1&0x3)<<4);
            out+="==";
            break;
        }
        c2=str.charCodeAt(i++);
        if(i==len){
            out+=base64EncodeChars.charAt(c1>>2);
            out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
            out+=base64EncodeChars.charAt((c2&0xF)<<2);
            out+="=";
            break;
        }
        c3=str.charCodeAt(i++);
        out+=base64EncodeChars.charAt(c1>>2);
        out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
        out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));
        out+=base64EncodeChars.charAt(c3&0x3F);

    }
    return out;
}
/**
 * 
 * 功能: 对字符串进行base64密文进行解密
 * 入参：要解密的字符串
 * */
function base64decode(str){
    var c1,c2,c3,c4,base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
    var i,len,out;
    len=str.length;
    i=0;
    out="";
    while(i<len){
        /* c1 */
        do{
            c1=base64DecodeChars[str.charCodeAt(i++)&0xff];
        }while(i<len&&c1==-1);
        if(c1==-1) break;
        /* c2 */
        do{
            c2=base64DecodeChars[str.charCodeAt(i++)&0xff];
        }while(i<len&&c2==-1);
        if(c2==-1) break;
        out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));
        /* c3 */
        do{
            c3=str.charCodeAt(i++)&0xff;
            if(c3==61) return out;
            c3=base64DecodeChars[c3];
        }while(i<len&&c3==-1);

        if(c3==-1) break;
        out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));
        /* c4 */
        do{
            c4=str.charCodeAt(i++)&0xff;
            if(c4==61) return out;
            c4=base64DecodeChars[c4];
        }while(i<len&&c4==-1);
        if(c4==-1) break;
        out+=String.fromCharCode(((c3&0x03)<<6)|c4);
    }
    return out;
}
/**
 * 
 * 功能：根据数组索引删除数组成员，JS数组原型扩展方法
 * 入参：数据索引
 * */
Array.prototype.removeByIdx=function(idx){
    if(typeof idx  == "number"  && idx<this.length)
        this.splice(idx,1);
    return this;
};
/**
 * 
 * 功能：根据数组元素删除数组成员，JS数组原型扩展方法
 * 入参：数组元素
 * */
Array.prototype.removeByItem=function(item){
    if (this.indexOf(item) != -1){
        this.splice(this.indexOf(item),1);
    }
    return this;
};
/**
 * 
 * 功能：数组清空方法，JS数组原型扩展方法
 * 入参：数组元素
 * */
Array.prototype.removeAll=function(){
    if(this.length >0)
        this.splice(0,this.length);
    return this
}
/**
 * 
 * 功能：数组添加全部，JS数组原型扩展方法
 * 入参：数组元素
 * */
Array.prototype.pushAll=function(arr) {
    if(typeof arr == "object" && arr.length>0){
        for(var key in arr ){
            if(typeof arr[key] != "function") {
                this.push(arr[key]);
            }
        }
    }else{
        this.push(arr);
    }
    return this;
};

//添加屏蔽罩
function MaskIt(obj){
    $(document).find('.divMask').remove();
    var hoverdiv = '<div class="divMask" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px;background-color:rgba(255,255,255,.5);z-index:10000;vertical-align: middle" align="center">' +
        '<img id ="loadingWait" src="../../frame/images/loading.gif"/></div>';
    $(obj).before(hoverdiv);
    $(obj).data("mask",true);
    $('#loadingWait').css('margin-top',$(document).outerHeight()/2-10);

}
//解除屏蔽罩
function UnMaskIt(obj){
    if($(obj).data("mask")==true){
        $(obj).parent().find(".divMask").remove();
        $(obj).data("mask",false);
    }
    $(obj).data("mask",false);
}

/**
 * 功能：翻译字典项
 * 入参：dictCode(字典代码)，value(字典值：可以一个或逗号分隔的多个值)
 * 注意：翻译失败则返回字典项
 * */
function getDictDes(dictCode, value) {
  return getTargetFieldVal(getSysDict(dictCode), "dict_val", "dict_des", value);
}


/**
 * 功能：获取指定字段对应值
 * 注意：获取失败则返回键值
 * */
function getTargetFieldVal(dataArr, keyField, targetField, keyVal) {
    var tarVal = keyVal,
        isTrans = false;
    if(dataArr && keyField && targetField && keyVal) {
        var keyVals = keyVal.split(",");
        for(var i = 0, len = keyVals.length; i < len; i++) {
            for(var j = 0, jLen = dataArr.length; j < jLen; j++) {
                if(dataArr[j][keyField] == keyVals[i]) {
                    if(isTrans) {
                        tarVal += "," + dataArr[j][targetField];
                    } else {
                        tarVal = dataArr[j][targetField];
                    }
                    isTrans = true;
                    break;
                }
            }
        }
    }
    return tarVal;
}

/**
 * 功能：名称缩写
 * 入参：缩写名称值[words], 自定义限制字符串长度[lmtNum]
 * 注意：不自定义长度则默认限制字符串长度限制为20
 **/
function getAbbreviationSpan(words, lmtNum) {
    var str = '';
    if(words) {
        var len = words.length;
        if (lmtNum && /[1-9][0-9]*/.test(lmtNum)) {
            if (len > lmtNum) {
                str = '<span title="' + words + '">' + words.substr(0, lmtNum) + '...</span>';
            } else {
                str = '<span title="' + words + '">' + words + '</span>';
            }
        } else {
            if (len > 20) {
                str = '<span title="' + words + '">' + words.substr(0, 20) + '...</span>';
            } else {
                str = '<span title="' + words + '">' + words + '</span>';
            }
        }
    } else {
        str = '<span>' + words + '</span>';
    }
    return str;
}

function commonRequest(opts, callback,errCallBack) {
  //通用单ajax请求,如果需要异步请求,async传true,如果需要返回提示信息,传msg参数为1
  var data = [];
  ajaxRequest({
    async: (typeof (opts.async) == 'undefined') || String(opts.async) == 'false' ? false : true,
    req: [opts],
    func: function (res) {
      //平台升级后，数据包结构发生变化   
      data = res[res.length - 3];
      callback ? callback(data) : undefined;
    },
    error: function (msg) {
        errCallBack ? errCallBack(msg) : undefined;
    }
  });
  return data;
}

/**
 * [URLtool description]
 * @date 2013.3.5
 */
function URLtool() {
  return {
    "parsUrl": function (url) {
      var a = document.createElement('a');
      //创建一个链接
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
          var ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length, i = 0, s;
          for (; i < len; i++) {
            if (!seg[i]) { continue; }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
          }
          return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
      };
    },
    /**
     * 获取url后面的参数
     * @param  {[type]} url [可以为空]
     */
    "getUrlParam": function (url) {
      var objUrl = url ? this.parsUrl(url) : this.parsUrl(window.location.href);
      return objUrl.params || "";
    },
    /**
     * 根据key获取url后面参数的value
     * @param  {[type]} key [description]
     * @param  {[type]} url [可以为空]
     */
    "getValueByUrlKey": function (key, url) {
      var objUrlParam = this.getUrlParam(url);
      return objUrlParam[key] || "";
    },

      /**
       * 胡锐峰 2015/11/17：根据JSON获取Url入参
       */
      "json2Par":function(json, url){
          var undef, buf = [], key, e = encodeURIComponent;
          for(key in json){
              undef = json[key]== 'undefined';
              $.each(undef ? key : json[key], function(val, i){
                  buf.push("&", e(key), "=", (val != key || !undef) ? e(val) : "");
              });
          }
          if(!url){
              buf.shift();
              url = "";
          }
          return url + buf.join('');
      }
  };
}
/**
 *@see 将javascript数据类型转换为json字符串 
 *@param 待转换对象,支持object,array,string,function,number,boolean,regexp 
 *@return 返回json字符串 
 */
function toJSON(object) {
  var _this = this;
  var type = typeof object;
  if ('object' == type) {
    if (Array == object.constructor) type = 'array';
    else if (RegExp == object.constructor) type = 'regexp';
    else type = 'object';
  }
  switch (type) {
    case 'function':
    case 'boolean':
    case 'regexp':
      return object.toString();
    case 'number':
      return isFinite(object) ? object.toString() : 'null';
    case 'string':
      return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
        var a = arguments[0];
        return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "";
      }) + '"';
    case 'object':
      if (object === null) return 'null';
      var results = [];
      for (var property in object) {
        var value = _this.toJSON(object[property]);
        if (value !== undefined) results.push(_this.toJSON(property) + ':' + value);
      }
      return '{' + results.join(',') + '}';
    case 'array':
      var results = [];
      for (var i = 0; i < object.length; i++) {
        var value = _this.toJSON(object[i]);
        if (value !== undefined) results.push(value);
      }
      return '[' + results.join(',') + ']';
    default:  //'undefined'or'unknown'
      return;
  }
}
/**
 * json字符串转json对象
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function jsonEval(data) {
  try {
    if ($.type(data) == 'string')
      return eval('(' + data + ')');
    else return data;
  } catch (e) {
    common.log(e);
    return {};
  }
}
function getAppPath() {
  var pathName = document.location.pathname;
  var index = pathName.substr(1).indexOf("/");
  var result = pathName.substr(0, index + 1) + "/";
  return window.location.protocol + "//" + window.location.host + result;
}

function isArray(it) {
  var ostring = Object.prototype.toString;
  return ostring.call(it) === '[object Array]';
}
//数组去重
function uniqueArray(arr) {
  var res = [];
  var json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

/**
* load script
* @author zhaozz
*/
(function (global, undefined) {
  var prefix = "";
  var debugLvl = 0;// 0:正式版 1:抓取所有请求日志 2：日志生成json串 3：包含前两个级别
  var config = { debug: true, min: false, version: 2014041801 };
  var arrUrlCache = [];
  var head = document.getElementsByTagName('head')[0];
  global.requireJS = function (url, callback) {
    if (!arrUrlCache) {
      arrUrlCache = [];
    }
    url = ("array" === $.type(url) && url.length === 1) ? url[0] : url;

    if ("array" === $.type(url)) {
      var arrUrl = url;
      url = arrUrl[0];
      arrUrl.splice(0, 1);
      arrUrl = arrUrl.length === 1 ? arrUrl[0] : arrUrl;
      requireJS(url, function () {
        requireJS(arrUrl, callback);
      });
    } else if ("string" === $.type(url)) {
      var boolRepeat = false;
      for (var i = 0, len = arrUrlCache.length; i < len; i++) {
        if (url === arrUrlCache[i]) {
          boolRepeat = true;
          break;
        }
      }
      if (boolRepeat) {
        callback ? callback() : null;
        return;
      } else {
        arrUrlCache.push(url);
      }

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      addOnload(script, callback);
      script.src = prefix + url + "?t=" + config.version;
      head.appendChild(script);
    }


  };
  /**
   * [requireCSS description]
   * @return {[type]} [description]
   */
  global.requireCSS = function (stylePath) {
    var container = document.getElementsByTagName("head")[0];
    var addStyle = document.createElement("link");
    addStyle.rel = "stylesheet";
    addStyle.type = "text/css";
    addStyle.media = "screen";
    addStyle.href = prefix + stylePath;
    container.appendChild(addStyle);
  };

  function addOnload(node, callback) {
    node.onload = node.onreadystatechange = function () {
      if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
        _onload();
      }
    }
    function _onload() {
      node.onload = node.onerror = node.onreadystatechange = null;
      callback ? callback() : null;
      config.debug ? undefined : head.removeChild(node);
      node = null;
    }
  };
  /**
   * 函数调用队列管理器
   * @author zhaozz
   * @param {[type]} arrFunc [description]
   */
  global.FuncQue = function (arrFunc) {
    this.arrFunc = arrFunc || [];
    this.index = 0;
  };
  global.FuncQue.prototype = {
    "addFunc": function (factory) {
      this.arrFunc.push(factory);
    },
    "doNext": function (target) {
      if (this.arrFunc.length > 0) {
        var factory = $.isFunction(this.arrFunc[0]) ? this.arrFunc[0] : this.arrFunc[0].func;
        var data = $.isFunction(this.arrFunc[0]) ? {} : this.arrFunc[0].data;
        this.arrFunc.splice(0, 1);
        var objQue = { "target": this, "callback": arguments.callee, "data": data, "index": this.index };
        factory.call(target, objQue);
      }
    },
    "exec": function (target) {
      this.doNext(target);
    }
  };

  /**
   * 有限状态机
   * 生命周期：与依附对象的生命周期同步
   * @author zhaozz
   * @param config = {
   *        "currentState":当前状态,
   *        "actions":{"事件名称:[{"from":起始态,"to":目标态}]}
   *     }
   */
  global.StateMachine = function (config) {
    this.config = config;
  };
  global.common = {
    numReq: 0,//统计当前页面的请求数量
    log: function (name, param) {
      var console = window.console || { log: function () { } };
      switch (debugLvl) {
        case 1: console.log("service:" + name);
          name ? console.log(param) : undefined;
          break;
        case 2: console.log("service:" + name);
          name ? console.log(toJSON(param)) : undefined;
          break
        case 3: console.log("service:" + name);
          name ? console.log(param) : undefined;
          name ? console.log(toJSON(param)) : undefined;
          break;
        default: break;
      }
    },
    /**
     * 重新封装ajax
     * @param  {[type]} param = {
     *     "service":url,xxx:其它属性
     * }
     * @param factory 执行成功的回调
     * @return {[type]}       [description]
     */
    ajax: function (param, factory, errFunc) {
      var _this = this;
      // common.log(param.service,param);
      try {
        //_this.startShieldLayer();
        ajaxRequest({
          "req": [param],
          "func": function (result) {
            //_this.endShieldLayer();
            // common.log(param.service+" resp",result);
            var data = result[0];
            factory ? factory(data) : undefined;
          },
          "error": function (e) {
            common.log(param.service + " ajax error", e);
            errFunc ? errFunc() : undefined;
            //_this.endShieldLayer();
          }
        });
      } catch (e) {
        _this.endShieldLayer();
        common.log("logger", e);
      }
    },
    /**
     * 开始屏蔽层
     * @param  {[type]} $target [description]
     * @param  {[type]} config  [description]
     * @return {[type]}         [description]
     */
    startShieldLayer: function ($target, config) {
      var title = (config && config["title"]) ? config["title"] : "加载中";
      $target = ($target && $target.length > 0) ? $target : $(document.body);
      if ($target.find("#shieldLayer").length === 0) {
        $target.append('<div id="shieldLayer" class="shield-Layer"><div class="load-panel">' + title + '...</div></div>');
      }
      var $layer = $target.find("#shieldLayer");
      $layer.css({ "width": document.documentElement.clientWidth, "height": document.documentElement.clientHeight });
      !this.numReq ? $layer.show() : undefined;
      this.numReq++;
    },
    endShieldLayer: function ($target) {
      this.numReq--;
      $target = ($target && $target.length > 0) ? $target : $(document.body);
      !this.numReq ? $target.find("#shieldLayer").hide() : undefined;
    }
  };

  /**
   * 生成随机文件名
   * @return {[type]} [description]
   */
  global.createRadomName = function () {
    var curDate = kui.getCurrDate('curr_date');
    var myDate = new Date();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var sec = myDate.getSeconds();
    var miSec = myDate.getMilliseconds();
    //得到文件名
    var imgFile = curDate + hour + min + sec + miSec + "_" + g_user.userId;
    return imgFile;
  }
})(window);

/**
 * 获取mac地址
 * @return {[type]} [description]
 */
function getMacAddr() {
  var macAddr = top.commonPrinter.getMacAddr();
  return macAddr;
}
/**
 * 获取当前日期 yyyyMMdd
 * @return {[type]} [description]
 */
function getCurrentDate() {
  var myDate = new Date();
  var year = myDate.getFullYear() + "";
  var month = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1).toString() : '0' + (myDate.getMonth() + 1);
  var date = myDate.getDate() > 9 ? myDate.getDate().toString() : '0' + myDate.getDate();
  return year + month + date;
}

//还原资金格式的值
function reductMoneyValue(value) {
  if (value && value.indexOf(',') && /^[+-]?[\d,\.]*$/.test(value)) {
    value = value.replace(/,/g, '');
  }
  return value;
}

/**
 * 格式化金额（每三位逗号分隔）
 * @param money 金额
 * @param decimalNumber 保留小数位(不传默认保留2位小数)
 */

function formatMoney(money,currency) {
    if(typeof money != 'string')
        money=money+'';

    if (/[^0-9\.]/.test(money)) return "invalid value";
    money = money.replace(/^(\d*)$/, "$1.");
    money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    money = money.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(money))
        money = money.replace(re, "$1,$2");
    money = money.replace(/,(\d\d)$/, ".$1");

    if(currency ==undefined){
        currency='￥';
    }
    return currency + money.replace(/^\./, "0.")
}

/**
 * 删除object里面的空值
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function delEmptyValByObj(obj) {
  if (obj) {
    for (var key in obj) {
      if (null === obj[key] || undefined === obj[key] || "" === obj[key] || "" === $.trim(obj[key])) {
        delete obj[key];
      }
    }
  }
  return obj;
}
/*
* 根据营业部代码,获取营业部名称
* @param 营业部代码
* @return 营业部代码 营业部名称 例如:1 金证证券
* */
function getIntOrgName(intOrgCode) {
  if (typeof (intOrgCode) == 'undefined' || intOrgCode == '') return '';
  var orgName = '';
  var orgCache = window.DataCache.getData('INT_ORG');
  for (var i = 0, cacheLen = orgCache.length; i < cacheLen; i++) {
    var cacheOrg = orgCache[i].ORG_CODE
    if (intOrgCode == cacheOrg) {
      orgName = orgCache[i].ORG_NAME;
      break;
    }
  }
  //如果无对应名称则返回营业部代码
  if(orgName === '') {
      orgName = intOrgCode;
  }
  return orgName;
}
/**
 * 生成文件名  操作员代码+日期+随机数
 * 90049 20141022 123456 (18位)
 * @author zhaozz
 * @return {[type]} [description]
 */
function createFileName() {
  var myDate = new Date(), numRandom = Math.round(Math.random() * 1000000),
    timeStamp = getCurrentDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds() + myDate.getMilliseconds();
  return g_user.userId + getCurrentDate() + numRandom;
}
/**
 * 获取扩展名
 * @return {[type]} [description]
 */
function extensionName(fileName) {
  var extension = "";
  if (fileName) {
    extension = (/\.[^\.]+$/.exec(fileName));//扩展名:.pdf
  }
  return extension;
}

/*
* 取系统参数
* @param sysCode 系统参数代码
* */
function getSysParam(callback) {
  if (top.sysParam) {
    callback ? callback() : undefined;
  } else {
    ajaxRequest({
      async: true,
      url: "../../kjdp_cache?cacheType=sysParamCache",
      noProcess: true,
      func: function (data) {
        top.sysParam = data;
        callback ? callback() : undefined;
      }
    });
  }
}

/**
 * 获取打印机插件对象
 * @return {[type]} [description]
 */
function getCommonPrinter() {
  return top.commonPrinter;
}

/* * 数据发送时的遮罩
 * */
function createSyncMask(msg, parent) {
  parent = parent || $(document).find("body");
  var pw = $(parent).outerWidth(), ph = $(parent).outerHeight(),
      mask = $("<div class='sync-mask'></div>").css({ width: pw, height: ph }),
      content = $("<div class='content'>" + msg + "</div>");
  mask.append(content).appendTo(parent);
  content.css("margin-left", (pw - content.outerWidth()) / 2 + "px");
  content.css("margin-top", (ph - content.outerHeight()) / 2 + "px");
  return mask;
}

/**
 * 格式化文件路径
 * @param filePath
 */
function formatFilePath(filePath, separator) {
  if (filePath) {
    separator = separator ? separator : '/';
    filePath = filePath.replace(/(\\|\/|\\\/|\/\\)+/g, separator);
  }
  return filePath;
}

/**
 * 获取今天days天后的日期，并以yyyyMMdd格式化*/
function getPointDay(days) {
    var afDate = new Date();
    afDate.setTime(afDate.getTime() + days * 24 * 60 * 60 * 1000);
    var afMonth = afDate.getMonth() + 1;
    afMonth = afMonth < 10 ? "0" + afMonth : afMonth;
    var afDay = afDate.getDate();
    afDay = afDay < 10 ? "0" + afDay : afDay;
    return afDate.getFullYear() + "" + afMonth + "" + afDay;
}

/**
 * 获取指定日期days(days格式：yyyyMMdd)日期，并以yyyyMMdd格式化*/
function getDaysAfterDate(startDate,days) {
    if(days != null && days.length==8){
        var year = days.substring(0,4);
        var mon = days.substring(4,6);
        var day = days.substring(6,8);
        var oldDay = startDate.substring(0,4) +'-'+ startDate.substring(4,6) + '-'+ startDate.substring(6,8);
        var oldDate = new Date(Date.parse(oldDay));
        if(year.length>0){
            oldDate.setFullYear(oldDate.getFullYear() + parseInt(year));
        }
        if(mon.length>0){
            oldDate.setMonth(oldDate.getMonth() + parseInt(mon));
        }
        if(day.length>0){
            oldDate.setDate(oldDate.getDate() + parseInt(day));
        }
        var afMonth = oldDate.getMonth() + 1;
        afMonth = afMonth < 10 ? "0" + afMonth : afMonth;
        var afDay = oldDate.getDate();
        afDay = afDay < 10 ? "0" + afDay : afDay;
        return oldDate.getFullYear() + "" + afMonth + "" + afDay;
    }
}

/**
 * 获取指定日期days(days格式：y-M-d)日期，并以yyyyMMdd格式化*/
function getYmdAfterDate(startDate,days) {
    var reg = /^\d+-\d+-\d+$/;
    var year='0',mon='0',day = '0';
    var oldDay = startDate.substring(0,4) +'-'+ startDate.substring(4,6) + '-'+ startDate.substring(6,8);
    var oldDate = new Date(Date.parse(oldDay));
    if(days != null && reg.test(days)){
        var dayArr = days.split('-');
        year = dayArr[0].replace(/\b(0+)/gi,"");
        mon = dayArr[1].replace(/\b(0+)/gi,"");
        day = dayArr[2].replace(/\b(0+)/gi,"");
    }else{
        day = days.replace(/\b(0+)/gi,"");;
    }

    if(year.length>0){
        oldDate.setFullYear(oldDate.getFullYear() + parseInt(year));
    }
    if(mon.length>0){
        oldDate.setMonth(oldDate.getMonth() + parseInt(mon));
    }
    if(day.length>0){
        oldDate.setDate(oldDate.getDate() + parseInt(day));
    }
    var afMonth = oldDate.getMonth() + 1;
    afMonth = afMonth < 10 ? "0" + afMonth : afMonth;
    var afDay = oldDate.getDate();
    afDay = afDay < 10 ? "0" + afDay : afDay;
    return oldDate.getFullYear() + "" + afMonth + "" + afDay;
}

//json格式字符串拆分成map，例：[{1:1},{2:1},{3:1}]转换成
function jsonStr2Map(jsonStr) {
    var map = {};
    if($.trim(jsonStr)) {
        var strList = jsonStr.replace(new RegExp("\\[\{|\}\\]", "gm"), "").split("\}\,\{");
        for(var i = 0; i < strList.length; i++) {
            var keyValue = strList[i].split(":");
            map[$.trim(keyValue[0])] = $.trim(keyValue[1]);
        }
    }
    return map;
}
//判断value字符是否包含在valuesStr内
function containsValue(valuesStr, value) {
    var flag = false;
    if(typeof (valuesStr) != "undefined" && typeof (value) != "undefined") {
        value = $.trim(value);
        var valueList = $.trim(valuesStr).split(",");
        for(var i = 0; i < valueList.length; i++) {
            if(value == $.trim(valueList[i])) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}

//择取平台数据字典的其中几项组成一个新字典，用于控制下拉框的数据
//入参：oldDictList-旧数据字典的list集合， newDictVals-新字典的字典项值的字符串，逗号分隔
function setNewDictList(oldDictList, newDictVals, key) {
    var newDict = [];
    if (isArray(oldDictList) && typeof (newDictVals) != "undefined" && newDictVals != "") {
        for (var i = 0; i < oldDictList.length; i++) {
            if (containsValue(newDictVals, oldDictList[i][key])) {
                newDict.push(oldDictList[i])
            }
        }
    }
    return newDict;
}

//转换成下拉框data属性的JSON格式
function createDataJson(list) {
    var dataJson = "[{}]";
    if (isArray(list) && list.length > 0) {
        dataJson = "[";
        for (var i = 0; i < list.length; i++) {
            dataJson += "{";
            for (var j in list[i]) {
                dataJson += j + ":'" + list[i][j] + "',";
            }
            dataJson = dataJson.substring(0, dataJson.lastIndexOf(",")) + "},";
        }
        dataJson = dataJson.substring(0, dataJson.lastIndexOf(",")) + "]";
    }
    return dataJson;
}

//字典数据转换成下拉框data属性的JSON格式
function createDictDataJson(dictList, dictVals, dictKey) {
    var dataJson = "[{}]";
    if(dictVals == null || dictKey == null) {
        dataJson = createDataJson(dictList);
    } else {
        var newDictList = setNewDictList(dictList, dictVals, dictKey);
        dataJson = createDataJson(newDictList);
    }
    return dataJson;
}

/**
 * 自定义拼装JSON字符串
 * @param jsonObj
 * @param contactStr
 * @param splitStr
 * @returns {string}
 */
function contactJson4Str(jsonObj, contactStr, splitStr) {
    var jsonStr = '';
    if(!$.isEmptyObject(jsonObj) && typeof contactStr != 'undefined' && typeof splitStr != 'undefined') {
        for(var key in jsonObj) {
            var value = jsonObj[key];
            jsonStr += key + (value ? contactStr +("'"+jsonObj[key]+"'") : '') + splitStr;
        }
    }
    return jsonStr;
}

/**
 * 获取页面标签所有属性
 * @param $label
 * @returns {{}}
 */
function getAllAttrs($label) {
    var jsonObj = {};
    if($label) {
        var attrList = $label[0].attributes;
        for(var i = 0, len = attrList.length; i < len; i++) {
            jsonObj[attrList[i].name.toUpperCase()] = attrList[i].value;
        }
    }
    return jsonObj;
}

/**
 * 翻译内部机构名称并缓存
 * @param orgCode
 * @returns {string}
 * @author jinlw 2016-09-20
 */
function getOrgName(orgCode) {
    var orgName = orgCode;
    if(orgCode) {
        var topWindow = window.top;
        if(!topWindow.g_org) {
            topWindow.g_org = {};
        }
        var orgInfo = topWindow.g_org[orgCode];
        if(orgInfo && !$.isEmptyObject(orgInfo)) {
            orgName = orgInfo.ORG_NAME;
        } else {
            var qOrgInfo = commonRequest({
                service:'P0001031',
                ORG_CODE:orgCode
            });
            if(qOrgInfo && qOrgInfo.length > 0) {
                topWindow.g_org[orgCode] = qOrgInfo[0];
                orgName = qOrgInfo[0].ORG_NAME;
            }
        }
    }
    return orgName;
}

/**
 * @desc 设置列宽度自适应
 * @notice 此方法暂适用于铺满body的datagrid组件列宽度自适应
 * @param percent
 * @returns {number}
 */
function setColumnWidth(percent) {
    return document.body.clientWidth * percent ;
}

/**
 * @desc 解决dialog组件设置closed:true按钮显示不全
 * @notice 此为初步解决方法，后期改进
 * @param $dialog
 * @author jinle 2016-09-28
 */
function resizeDialog($dialog) {
    var options = $dialog.dialog("options");
    if(!options.isResizeForClosed) {
        $dialog.dialog("resize");
        options.isResizeForClosed = true;
    }


}

/**
 * @desc 解决flowlite组件初始化隐藏时flowNodes宽度解析不正确问题
 * @notice 此为初步解决方法，后期改进
 * @param $flowlite
 * @author jinle 2016-10-11
 */
function resizeFlowlite($flowlite) {
    var options = $flowlite.data("flowlite").options;
    if(!options.isResizeForDialog) {
        var width = 0;
        var ui = options.ui;
        ui.flowNodes.children().each(function() {
            width += $(this).outerWidth(true);
        })
        ui.flowNodes.width(width + 1);
        $flowlite.flowlite("resize");
        options.isResizeForDialog = true;
    }
}

/**
 * 获取新Json对象，根据keyArr过滤Json对象的键值对
 * @param oldJson 旧的Json
 * @param keyArr 保留的键值
 * @returns {{}}
 * @author jinle 2016-10-18
 */
function getNewJsonByKeys(oldJson, keyArr) {
    var newJson = {};
    if(oldJson && keyArr) {
        for(var i = 0, len = keyArr.length; i < len; i++) {
            newJson[keyArr[i]] = oldJson[keyArr[i]];
        }
    }
    return newJson;
}

function formatterUpTime(timeStr) {
    if(!!timeStr) {
        return timeStr.substr(0, 4) + "年" + timeStr.substr(4, 2) + "月" + timeStr.substr(6, 2) + "日"
            + " " + timeStr.substr(8, 2) + ":" + timeStr.substr(10, 2)
            + ":" + timeStr.substr(12, 2) + "." + timeStr.substr(14, 3);
    } else {
        return "";
    }
}

//获取当前及其的mac及ip
function getMac(){
    var macAddress = "E0|" + g_user.loginIp;
    $.ajax({
        url:"http://127.0.0.1:43543/mac?callback=?",
        type:'GET',
        dataType:'jsonp',
        jsonpCallback:'foobar',
        async:false,
        data:'',
        success:function(data) {
            macAddress = "E0|" + data.ip + "|" + data.mac;
        }
    });
    return macAddress;
}

/**
 * js深度赋值对象(初版)
 * @param tarObj
 * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
 */
function deepCopyObject(tarObj) {
    if($.isArray(tarObj)) {
        return tarObj.slice(0);
    } else {
        var newObj = {};
        for(var key in tarObj) {
            newObj[key] = typeof tarObj[key] === "object" ? deepCopyObject(tarObj[key]) : tarObj[key];
        }
        return newObj;
    }
}

/**
 *    2017/3/9
 * 功能：根据系统参数Code获取系统参数Value公共方法
 * 入参：系统参数代码
 * @param paramCode
 * @returns {*}
 */
function getSysParamValuebyCode(paramCode){
    if(!paramCode) {
        return null;
    }
    var paramVal ='';
    ajaxRequest({
        async:false,
        url:"../../kjdp_cache?cacheType=sysParamCache&keyCode="+paramCode,
        noProcess:true,
        func:function(data){
            var ret = data[paramCode];
            for (var i = 0;ret && i < ret.length; i++) {
                paramVal=ret[i]["PAR_VAL"];
            }
        }
    });
    return paramVal;
}

//文件下载
function downloadFile(params){
    var rtn = '',file = params.val.split(',');
    var filecon = file[0],filename = file[1],filesize = file[2],filePath = file[3],fileId = file[4];
    if(params.val!='' && typeof(params.val)!='undefined'){
        rtn = '<a style="text-decoration: none;" dir="'+params.dir+'" onclick="downloadFileUseComp(this)" href="javascript:void(0)" ' +
            'FILENAME="'+filename+'" FILECON="'+filecon+'" FILEPATH="'+filePath+'" FILEID="'+fileId+'">下载</a>';
    }
    return rtn;
}

function downloadFileUseComp(obj){
    //去无纸化系统下载
    var url = '';
    if($(obj).attr('FILEID') && !$(obj).attr('FILEPATH')){
        //获取无纸化协议路径
        url = commonRequest({service:'S0000137',FILE_ID : $(obj).attr('FILEID')});
        url = url[0]['FILE_URL'];
    }else{
        //文件上传控件dir目录和tomcat保存协议的虚拟目录要保持一致
        url = window.location.origin + '/' + $(obj).attr('FILEPATH');
    }
    //url = encodeURIComponent(url);
    if(url){
        window.open(url,null);
    }else{
        window.alert('未找到有效的下载路径');
    }

}

//Javascritp封装的Map对象，可通过KEY快速查找对象
function mapObject() {

    function struct(key, value) {
        this.key = key;
        this.value = value;
    }

    this.keyArr = new Array();
    this.map = new Array();

    this.lookUp = function (key) {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].key == key) {
                return this.map[i].value;
            }
        }
    }

    this.setAt = function (key, value) {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].key == key) {
                this.map[i].value = value;
                return;
            }
        }
        this.map[this.map.length] = new struct(key, value);
        this.keyArr.push(key);
    }

    this.getCount = function () {
        return this.map.length;
    }

    this.getAllValues = function () {
        var values = [];
        for (var i = 0; i < this.map.length; i++) {
            values.push(this.map[i].value);
        }

        return values.concat();
    }

    this.init = function (o) {
        for (var i = 0; i < o.map.length; i++) {
            this.setAt(o.map[i].key, o.map[i].value)
        }
    }

    this.remove = function (key) {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].key == key) {
                this.map.splice(i, 1);
                this.keyArr.splice(i, 1);
            }
        }
    }

    this.clear = function () {
        this.map = [];
        this.keyArr = [];
    }
    this.getAllKey = function () {
        return this.keyArr.concat();
    }
}

/**
 * 地址和入参组合成GET地址
 * @param url
 * @param param
 * @returns {string}
 * by hurf
 */
function buildURL(url, param) {
    var pArr = [];
    for(var key in param) {
        pArr.push(key + "=" + (param[key] || ""));
    }
    var eStr = encodeURI(pArr.join("&"));
    return url.lastIndexOf("?") > 0 ?
        (pArr.length > 0 ? url + "&" + eStr : url) :
        (pArr.length > 0 ? url + "?" + eStr : url);
}

//限制字数
function limitedWords(params, paramlen) {
    var str = '';
    if (params.val != '' && params.val != undefined) {
        if (paramlen == undefined || paramlen == null) {
            if (params.val.length > 20) {
                str = '<span title="' + params.val + '">' + params.val.substr(0, 15) + '...</span>';
            } else {
                str = '<span>' + params.val + '</span>';
            }
        } else {
            if (params.val.length > paramlen) {
                str = '<span title="' + params.val + '">' + params.val.substr(0, paramlen) + '...</span>';
            } else {
                str = '<span>' + params.val + '</span>';
            }
        }
    }
    return str;
}
