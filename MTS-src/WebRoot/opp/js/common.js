function getSelectedFieldValue(target,field){
  var row = $(target).datagrid('getSelected');
  var rtn
  if(row == null)  return null;
  if(typeof(field) == 'undefined')  rtn = row;
  if(row != null && typeof(field) != 'undefined') rtn = row[field];
  return rtn;
}
function commonDialog(dialogTarget,dialogTitle,formTarget,data,isClear,isLoad,service,refreshGrid,dialogWidth,dialogHeight){
  if(isClear) $(formTarget).form('clear');
  if(isLoad && data != null) $(formTarget).form('load',data);
  if(isClear && isLoad) $(formTarget).form('clear').form('load',data);
    using('dialog',function(){
  $(dialogTarget).dialog({
    title:dialogTitle,
    modal:true,
    draggable:false,
    width:typeof(dialogWidth) == 'undefined'?600:dialogWidth,
    height:typeof(dialogHeight) == 'undefined'?400:dialogHeight,
    buttons:[
      {
        text:'确定',
        iconCls:'icon-save',
        handler:function(){
          if(!service || service == ''){
            alert("请为该功能定义service");
            return;
          }
          $(formTarget).form('submit',{
            req:[ { service:'P9999999',bex_codes:service } ],
            success:function(data){
              alert(dialogTitle + '成功');
              $(dialogTarget).dialog('close');
              $(refreshGrid).datagrid('reload');
            },
            fail:function(msg){
              alert("请求后台返回:" + msg);
            }
          });
        }
      },
      {
        text:'取消',
        iconCls:'icon-cancel',
        handler:function(){

                $(dialogTarget).dialog('close');


        }
      }
    ]
  });
    });
}
function commonDeleteRequest(params,successMsg,errorMsg,needReloadGridTarget){
  if(!params.service) params.service = 'P9999999';
  confirm('是否确认删除?','确认删除吗?',function(isOK){
    if(isOK){
      ajaxRequest({
        req:[params],
        func:function(data){
          alert(successMsg);
          $(needReloadGridTarget).datagrid('reload');
        },
        error:function(){
          alert(errorMsg);
        }
      });
    }
  });
}
function commonRequest(opts){
  //通用单ajax请求,如果需要异步请求,async传true,如果需要返回提示信息,传msg参数为1
  var data = [];
  opts = $.extend({},{service:'P9999999'},opts);
  ajaxRequest({
    async:(typeof(opts.async) == 'undefined') || String(opts.async) == 'false' ? false : true,
    req:[opts],
    func:function(res){
      data = typeof(opts.msg) == 'undefined' ? res[0]['data'][0] : res;
    }
  });
  return data;
}
function commonRequestView(opts){
  var data = [];
  ajaxRequest({
    async:false,
    req:[opts],
    func:function(res){
      data = res[0]['config'];
    }
  });
  return data;
}
function getDict(dict_code){
  var dicts = commonRequest({
    bex_codes:'UPM_dicItemsQuery',
    DICT_CODE:dict_code
  });
  return dicts;
}
function getDictOpt(val,dicts){
  var dict_name = '';
  for(var i=0;i<dicts.length;i++ ){
    if(val == dicts[i]['DICT_ITEM']) dict_name = dicts[i]['DICT_ITEM_NAME'];
  }
  return dict_name;
}
//替换指定传入参数的值,paramName为参数,replaceWith为新值
function replaceParamVal(params,paramName,replaceWith) {
  var oUrl = params;
  var re=eval('/('+ paramName+'=)([^&]*)/gi');
  var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
  return nUrl;
}
function saveProInfo(opts){


   
  function xkdStringSubmit(proId,xkds){
    var rs = commonRequest({
      msg:1,
      bex_codes:'PIF_SYS_CommSmallWidthExtModBatchSet',
      PRO_ID:proId,
      INFO_SQL:xkds
    });
    return rs.length> 0 && rs[0]['message'][0]['flag'] == 0;
  }
  //大宽度字符提交
  function dkdSubmit(proId,iptName,iptVal){
    var rs = commonRequest({
      msg:1,
      bex_codes:'PIF_SYS_CommBigWidthExtModValSet',
      PRO_ID:proId,
      BigFieldName:iptName,
      BigFieldValue:iptVal
    });
    return rs.length > 0 && rs[0]['message'][0]['flag'] == 0;
  }
  //大文本资料提交
  function dwbSubmit(proId,iptName,iptVal){
    var rs = commonRequest({
      msg:1,
      bex_codes:'PIF_SYS_CommTextExtModValSet',
      PRO_ID:proId,
      TextFieldName:iptName,
      TextValue:iptVal
    });
    return rs.length > 0 && rs[0]['message'][0]['flag'] == 0;
  }
  //窄表资料提交
  function zbSubmit(proId,infoId,infoVal){
    var rs = commonRequest({
      msg:1,
      bex_codes:'PIF_SYS_ZBInfoSet',
      PRO_ID:proId,
      NARR_INFO_ID:infoId,
      INFO_VAL:infoVal
    });
    return rs.length > 0 && rs[0]['message'][0]['flag'] == 0;
  }
  //获取产品编号
  function getProId(){
    var proId = commonRequest({ bex_codes:'PIF_SYS_GetProId',CLS_ID:opts.cls_id});
    if(proId.length == 0){ return -1; } else { return proId[0]['PRO_ID']; }
  }
  //是否可提交,表单验证标识
  var isCanSubmit = true;
  $(opts.target).find('form').each(function(){
    if(!$(this).form('validate')){
      isCanSubmit = false;
      return;
    }
  });

  if(isCanSubmit){
    var proId = typeof(opts.proId)=='undefined'&&(typeof(opts.isModify)=='undefined' || opts.isModify === false) && opts.proId!=0 && opts.proId!=''?getProId():opts.proId;
    if(proId  == -1 ){
      alert("产品录入出现异常");
      return;
    }
    var xkds = ''; //小宽度字符拼串
    if(opts.extendParams != '' && typeof(opts.extendParams) !='undefined' ) xkds = opts.extendParams;
    if(typeof(opts.isDraft) != 'undefined' && opts.isDraft === true && opts.func == 'save'){
      if(xkds != ''){
        xkds = replaceParamVal(xkds,'MGR_STAT',0);
      }else{
        xkds = 'MGR_STAT=0';
      }
    }
    var isSuccess = true;//录入是否成功标识
    $(opts.target).find('td:odd').each(function(){
      if(!isSuccess)   return false;
      var opt = $(this).data('saveOpt'),temp = '';
      var saveType = opt.saveType; //1整形或小宽度 2大字符 3大文本 4窄表
      var iptName = $(this).find('input[name],textarea[name]').attr('name');
      var iptVal = $(this).find('input[name='+iptName+'],textarea[name='+iptName+']').val();


      if(saveType == 1){  //1整形或小宽度
        temp = xkds ;
        xkds+='&'+iptName+'='+iptVal;
        if(xkds.length > 4000 ){ //如果拼串大于4000了,就用此次拼接之前已拼好的串来提交,否则只拼串,最后再提交
          isSuccess = xkdStringSubmit(proId, temp.substring(1,temp.length));
          xkds = '&'+iptName+'='+iptVal;
        }
      }else if(saveType == 2){// 2大宽度字符
        isSuccess = dkdSubmit(proId,iptName,iptVal);
      }else if(saveType == 3){// 3大文本
        isSuccess = dwbSubmit(proId,iptName,iptVal);
      }else if(saveType == 4){// 4窄表
        isSuccess = zbSubmit(proId,opt.infoId,iptVal);
      }
    });

    if(xkds != '' && isSuccess){
      if(xkds.charAt(0) == '&') xkds =  xkds.substring(1,xkds.length);
      isSuccess = xkdStringSubmit(proId, xkds);
    }
    if(isSuccess){
      alert('提示信息','产品录入成功','info',function(){
        if(opts.onSuccess){
          opts.onSuccess.call();
        }
      });
    }else{
      alert('产品录入出现异常');
    }
  }


}
//调用方法
//createDomByMod({
//  data:clsInfo,              //模型数据 数组
//  target:$('#proAddDiv'),   //目标节点,把模型创建在哪个节点下
//  onlyShow:false,          //仅仅展示资料吗? 例如360只查看资料,则传false,否则,传true 例如产品录入
//  colNumbers:3             //一行展示几个列
//  dispTypeDictCode:dict_code   //展示分类的数据字典
//});
function createDomByMod(opts){
  var rs = opts.data, target = opts.target, colNumbers = opts.colNumbers, onlyShow = opts.onlyShow,needReqDict=[],needReqDictFlds=[];
  //target.find('object.swfupload').remove();
  $("object[id*=SWFUpload_]",target).parent().remove(".swfupload");
  target.html('');
  if(rs.length == 0 ) return;
  var dispTypeDict = getDict(opts.dispTypeDictCode);
  for(var i = 0,len = rs.length; i < len; i++){
    if(rs[i]['DISP_TYPE'] != '' && rs[i].MAN_ROLE == '6' && rs[i].MAN_WAY == '1'){
      var currentDiv = target.find('fieldset[for][for=' + rs[i].DISP_TYPE + ']').find('legend').next('div');
      if(!currentDiv.length){
        var fieldset = $('<fieldset class="fieldset" for="' + rs[i].DISP_TYPE + '"> <legend>' + getDictOpt(rs[i].DISP_TYPE,dispTypeDict) + '</legend></fieldset>');
        currentDiv = $('<div><form></form></div>').appendTo(fieldset);
        fieldset.appendTo(target);
      }
      var columnTab = currentDiv.find('table').length ? currentDiv.find('table:first') : $('<table>').appendTo(currentDiv.find('form'));
      var columnTr = columnTab.find('tr:last').length ? columnTab.find('tr:last') : $('<tr/>').appendTo(columnTab);
      //如果是文本框,或者大于每列渲染数,则换行
      if(columnTr.find('td:last').attr("colspan") > 1  || columnTr.find('td').length >= (2 * colNumbers - 1) || rs[i].INP_TYPE == 4){
        columnTr = $('<tr/>').appendTo(columnTab);
      }
      var tdTitle = $('<td width="120px" align="right">' + rs[i].INF_NAME + '：</td>');
      //文本框,则合并
      var colspanNum = rs[i].INP_TYPE == 4?(2 * colNumbers - 1):1;
      var colsWidth = colspanNum > 1?columnTr.width()-135:160;
      var tdValue = $('<td width="'+colsWidth+'px" align="left" colspan="'+colspanNum+'"></td>');
      columnTr.append(tdTitle).append(tdValue);
      //onlyShow=false 则创建dom
      tdValue.data('opt',rs[i]);
      if(typeof(opts.onlyShow) != 'undefined' && !opts.onlyShow){
        createElements(tdValue);
        if(rs[i].DICT_CODE != '' && (rs[i].INP_TYPE == 2 || rs[i].INP_TYPE == 3)){
          needReqDict.push(rs[i].DICT_CODE);
          var needReqDictFld = {fldName:'',dict:''} ;
          needReqDictFld['fldName'] = rs[i].FLD_NAME;
          needReqDictFld['dict'] = rs[i].DICT_CODE;
          needReqDictFlds.push(needReqDictFld);
        }
      }else{
        tdValue.data('opt',rs[i]);
        var d = tdValue.data('opt');
        var inp_type = d.INP_TYPE, fld_name = d.FLD_NAME,fld_type = d.FLD_TYPE, fld_len = d.FLD_LEN, is_must = d.IS_MUST, def_val = d.DEF_VAL, dict_code = d.DICT_CODE, select_value = d.SELECT_VALUE;
        var func_id = d.FUNC_ID, func_params = d.FUNC_PARAMS, func_ret_id = d.FUNC_RET_ID, func_ret_name = d.FUNC_RET_NAME, magnifier_id = d.MAGNIFIER_ID;
        var narr_table_flag = d.NARR_TABLE_FLAG; //窄表标识 1是 0否
        //var validType = getDataType(fld_type,fld_len);
        //var saveType = getSaveType(fld_type); //如何保存? 1 批量小宽度宽表 2大字符型(单个) 3大文本(单个) 4窄表
        //if(narr_table_flag == 1) saveType = '4';
        if(inp_type == 1){ //输入框
          tdValue.html(opts.loadData[fld_name]);
        }else if(inp_type == 2 || inp_type == 3){//下拉框
          tdValue.html('<span id='+fld_name+' value='+opts.loadData[fld_name]+'></span>');
          if(rs[i].DICT_CODE != ''){
            needReqDict.push(rs[i].DICT_CODE);
            var needReqDictFld = {fldName:'',dict:''} ;
            needReqDictFld['fldName'] = rs[i].FLD_NAME;
            needReqDictFld['dict'] = rs[i].DICT_CODE;
            needReqDictFlds.push(needReqDictFld);
          }
        }else if(inp_type == '4'){ //文本框
          tdValue.html(opts.loadData[fld_name]);
        }else if(inp_type == '6'){ //图片 附件
          var attrData = commonRequest({bex_codes:'P0004012',att_id:opts.loadData[fld_name]});
          if(attrData.length > 0){
            var ipt = $('<input id="'+fld_name+'" name="'+fld_name+'" type="file"/>').appendTo(tdValue);
            ipt.uploadify({
              dir:'proAdd',
              onlyView:true,
              fileData:[{FILENAME:attrData[0].FILENAME,FILECON:attrData[0].FILECON,FILESIZE:attrData[0].FILESIZE}]
            });
          }
//          if(opts.loadData[fld_name] != '' && opts.loadData[fld_name] != 'undefined'){
//            ipt.uploadify('showFiles',[{FILENAME:attrData.FILENAME,FILECON:attrData.FILECON,FILESIZE:attrData.FILESIZE}]);
//          }
        }else if(inp_type == 'a'){ //日历
          tdValue.html(opts.loadData[fld_name]);
        }else if(inp_type == 'b'){ //时间
          tdValue.html(opts.loadData[fld_name]);
        }else if(inp_type == 'c'){ //放大镜
          tdValue.html(opts.loadData[fld_name]);
        }
      }
    }
  }
  if(typeof(opts.onlyShow) != 'undefined' && !opts.onlyShow){
    setTimeout(function(){
      using('combobox',function(){
        ajaxRequest({
          req:[
            {service:'P9999999',bex_codes:'UPM_dicItemsQuery',DICT_CODE:needReqDict.join(",")}
          ],
          func:function(data){
            var rs = data[0]['data'][0];
            function getDictByCode(dictRs,dictCode){
              var dicts = [];
              for(var i=0,len=dictRs.length;i<len;i++){
                if(dictRs[i]['DICT_CODE'] == dictCode){
                  dicts.push(dictRs[i]);
                }
              }
              return dicts;
            }
            for(var i=0,len=needReqDictFlds.length;i<len;i++){
              var dicts = getDictByCode(rs, needReqDictFlds[i]['dict']);
              $('#'+needReqDictFlds[i]['fldName']).combobox({
                width:150,
                valueField:'DICT_ITEM',
                textField:'DICT_ITEM_NAME',
                data:dicts
              });
            }
          }
        });
      });
    },600);
  } else if(typeof(opts.onlyShow) != 'undefined' && opts.onlyShow == true){
    setTimeout(function(){
     ajaxRequest({
          req:[
            {service:'P9999999',bex_codes:'UPM_dicItemsQuery',DICT_CODE:needReqDict.join(",")}
          ],
          func:function(data){
            var rs = data[0]['data'][0];
            function getDictByCode(dictRs,dictCode){
              var dicts = [];
              for(var i=0,len=dictRs.length;i<len;i++){
                if(dictRs[i]['DICT_CODE'] == dictCode){
                  dicts.push(dictRs[i]);
                }
              }
              return dicts;
            }
            for(var i=0,len=needReqDictFlds.length;i<len;i++){
              var dicts = getDictByCode(rs, needReqDictFlds[i]['dict']);
              for(var j=0; j<dicts.length; j++){
                var dictValue = $('#'+needReqDictFlds[i]['fldName']).attr('value');
                if(dicts[j].DICT_ITEM == dictValue){
                  $('#'+needReqDictFlds[i]['fldName']).parent().html(dicts[j].DICT_ITEM_NAME);
                }
              }
            }
          }
        });
    },400);
  }


  if(typeof(opts.isModify) !='undefined' && opts.isModify === true && opts.proId > 0 && target.is('form')){
    target.form('load',opts.loadData);
  }
  if(typeof(opts.onlyShow) != 'undefined' && !opts.onlyShow && rs.length > 0 && target.children().length > 0 && !target.children().eq(0).is('div') && opts.isModify!=true && typeof(opts.isDraft) != 'undefined' && opts.isDraft === true){
    //草稿按钮
    createSaveBtn2();
  }
  if(typeof(opts.onlyShow) != 'undefined' && !opts.onlyShow && rs.length > 0 && target.children().length > 0 && !target.children().eq(0).is('div') && opts.isModify!=true){
    createSaveBtn();
  }
  function createSaveBtn(){
    // target为调用createDomByMod传的target
    var btnDiv = $('<span></span>');
    var btn = $('<a href="javascript:void(0)" func="forSubmit">提交</a>').appendTo(btnDiv);
    opts.target.append(btnDiv);
    btn.linkbutton({
      plain:false,
      iconCls:'icon-save'
    });
    btn.click(function(){
      //小宽度字符提交
      opts.func = "submit";
      saveProInfo(opts);
    });
  }
  function createSaveBtn2(){
    // target为调用createDomByMod传的target
    var btnDiv = $('<span></span>');
    var btn = $('<a href="javascript:void(0)" func="forSave">保存</a>').appendTo(btnDiv);
    opts.target.append(btnDiv);
    btn.linkbutton({
      plain:false,
      iconCls:'icon-save'
    });
    btn.click(function(){
      //小宽度字符提交
      opts.func = "save";
      saveProInfo(opts);
    });
  }
  function createElements(target){
    var d = target.data('opt');
    using('form',function(){
      //inp_type 输入类型:1输入框 2下拉框 3多选框 4文本框 5HTML框 6图片 7其他控件 8评级控件 9分段输入框 a日历控件 b 时间控件 c放大镜
      //fld_type 字段类型:读数据字典col_type 1整形 2小字符 3大字符 4大文本 5日期时间 6八位日期
      //fld_len  字段长度
      //is_must  是否必输项
      //def_val  默认值
      //dict_code 下拉框读取的数据字典代码
      //select_value 下拉框候选数据 格式:value1:text1|value2:text2
      //func_id  下拉框请求号
      //func_params 下拉框请求参数  格式:参数名称1:参数值1|参数名称2:参数取值2
      //func_ret_id 下拉返回value字段
      //func_ret_name 下拉返回text字段
      //magnifier_id 下拉框读取的数据字典
      var inp_type = d.INP_TYPE, fld_name = d.FLD_NAME,fld_type = d.FLD_TYPE, fld_len = d.FLD_LEN, is_must = d.IS_MUST, def_val = d.DEF_VAL, dict_code = d.DICT_CODE, select_value = d.SELECT_VALUE;
      var func_id = d.FUNC_ID, func_params = d.FUNC_PARAMS, func_ret_id = d.FUNC_RET_ID, func_ret_name = d.FUNC_RET_NAME, magnifier_id = d.MAGNIFIER_ID;
      var narr_table_flag = d.NARR_TABLE_FLAG; //窄表标识 1是 0否
      var validType = getDataType(fld_type,fld_len);
      var saveType = getSaveType(fld_type); //如何保存? 1 批量小宽度宽表 2大字符型(单个) 3大文本(单个) 4窄表
      if(narr_table_flag == 1) saveType = '4';
      var ipt = $('<input id="'+fld_name+'" name="' + fld_name + '" saveType="'+saveType+'">');
      target.data('saveOpt',{saveType:saveType,infoId:d.INFO_ID});
      if(inp_type == 1){ //输入框
        ipt.appendTo(target);
        ipt.validatebox({
          required:is_must == 1,
          validType:validType
        });
      }else if(inp_type == 2 || inp_type == 3){//下拉框
        ipt.appendTo(target);
        var data = [];
        if($.trim(select_value) != ''){
          var comData = select_value.split('|')
          for(var i = 0; i < comData.length; i++){
            var aData = comData[i].split(':');
            data.push({func_ret_id:aData[0],func_ret_name:aData[1]});
          }
        }

        var reqParams;
        if($.trim(func_id) != ''){
		      reqParams = {};
          reqParams.service = 'P9999999';
          reqParams.bex_codes = func_id;
          if(func_params != ''){
            var pData = func_params.split('|');
            for(var j = 0; j < pData.length; j++){
              var bData = pData[j].split(':');
              reqParams[bData[0] = bData[1]];
            }
          }
        }
        if(data.length > 0 ){
          ipt.combobox({
            required:is_must == 1,
            width:150,
            valueField:func_ret_id,
            textField:func_ret_name,
            //dict:dict_code,
            data:data.length==0?null:data
          });
        }
        if(reqParams != null){
          ipt.combobox({
            required:is_must == 1,
            width:150,
            valueField:func_ret_id,
            textField:func_ret_name,
            //dict:dict_code,
//            data:data.length==0?null:data
            req:[reqParams]
          });
        }

      }else if(inp_type == '4'){ //文本框
        var w = $(target).attr('width');
        if(!isNaN(w)) w = w+'px';
        ipt = $('<textarea name="' + fld_name + '" saveType="'+saveType+'" style="width:'+w+';height:50px;"/>').appendTo(target);
        ipt.validatebox({
          required:is_must == 1,
          validType:validType
        });
      }else if(inp_type == '6'){ //图片 附件
        ipt = $('<input id="' + fld_name + '" name="' + fld_name + '" type="file" saveType="'+saveType+'">').appendTo(target);
        ipt.uploadify({
          dir:'proAdd',
          width:149,
          fileTypeDesc: '请选择jpg,png,gif文件',
          fileTypeExts: '*.jpg;*.png;*.gif文件'
        });
      }else if(inp_type == 'a'){ //日历
        ipt = $('<input name="' + fld_name + '" readonly saveType="'+saveType+'">').appendTo(target);
        ipt.datebox({
          width:150,
          required:is_must == 1
        });
      }else if(inp_type == 'b'){ //时间
        ipt = $('<input name="' + fld_name + '" readonly saveType="'+saveType+'">').appendTo(target);
        ipt.timespinner({
          required:is_must == 1,
          showSeconds:true
        });
      }else if(inp_type == 'c'){ //放大镜

      }
      
    });
    function getDataType(fld_type,fld_len){
      if(fld_type == 1){ //整形
        return 'zint[' + fld_len + ']';
      }else if(fld_type == 2){ //小字符型
        return 'val[0,' + fld_len + ']';
      }else if(fld_type == 3){ //大字符型
        return 'val[0,' + fld_len + ']';
      }else if(fld_type == 6){
        return 'val[0,8]';
      }
    }
    function getSaveType(fld_type){
      if(fld_type == 1|| fld_type == 2 || fld_type == 5 || fld_type == 6){ //整形或小字符的
        return '1';
      }else if(fld_type == 3){ //大字符型
        return '2';
      }else if(fld_type == 4){ // 大文本型
        return '3';
      }
    }
  }
}
/*
 * 功能：通过getUrlParameters()方法组得到单个url参数值
 * 如调用getUrlParameters()后返回{mgr_stat="0",man_way="1"}
 * 通过传入键名mgr_stat就可以得到值“0”
 */
function getSingleParm(bPar){
  var allParams = getUrlParameters();
  return allParams[bPar];
}
/*
 *  功能：获取URL地问号后面内容放到对象中
 *   如草稿箱地址为business/promanage/proQuery.html?mgr_stat=0&man_way=1
 *   调用此方法后。返回值为{mgr_stat="0",man_way="1"}
 */
function getUrlParameters() {
  var strURL = window.location.href;
  var p = {};
  var queryIndex = strURL.indexOf("?");
  if (queryIndex >= 0) {
    strURL = strURL.substring(queryIndex + 1);
    var tokens = strURL.split("&");
    for (var i = 0; i < tokens.length; i++) {
      var equalsIndex = tokens[i].indexOf("=");
      if (equalsIndex >= 0) {
        p[tokens[i].substring(0, equalsIndex)] = tokens[i].substring(equalsIndex + 1);
      } else {
        p[tokens[i]] = true;
      }
    }
  }

  return p;
}
//文件下载
function downloadFile(params){
  var rtn = '',file = params.val.split(',');
  var filecon = file[0],filename = file[1],filesize = file[2];
  if(params.val!='' && typeof(params.val)!='undefined'){
    rtn = '<a style="text-decoration: none;" dir="'+params.dir+'" onclick="downloadFileUseComp(this)" href="javascript:void(0)" FILENAME="'+filename+'" FILECON="'+filecon+'">'+filename+'</a>';
  }
  return rtn;
}
function downloadFileUseComp(obj){
//  window.open("/download?DIR="+$(obj).attr('dir')+"&filename="+$(obj).attr('filename')+"&filecon=" + $(obj).attr('fileCon'));
  window.open("/download?DIR=" + $(obj).attr('dir') + "&FILENAME=" + $(obj).attr('FILENAME') + "&FILECON=" + $(obj).attr('FILECON'));
}


//无逗号
function returnDictMultText (value,row,index,col){
  var arr = new Array();
  if(col.editor.options.multiple){
    if(typeof value == "string"){
      for(var i =0; i<value.length;i++){
        arr.push(value.substring(i,i+1));
        if(i == value.length-1){
          break;
        }
      }
      return getEdtMutlDictText(arr,col);
    } else {
      return getEdtMutlDictText(arr,col);
    }
  } else {
    return value;
  }
}

//有逗号
function returnDictMultTextComma(value,row,index,col){
  var arr = new Array();
  if(col.editor.options.multiple){
    if(typeof value == "string"){
      arr=value.split(',');
      return getEdtMutlDictText(arr,col);
    } else {
      return getEdtMutlDictText(arr,col);
    }
  } else {
    return value;
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

    this.lookUp = function(key) {
        for(var i = 0; i < this.map.length; i++) {
            if(this.map[i].key == key) {
                return this.map[i].value;
            }
        }
    }
    
    this.setAt = function(key, value) {
        for(var i = 0; i < this.map.length; i++) {
            if(this.map[i].key == key) {
                this.map[i].value = value;
                return;
            }
        }
        this.map[this.map.length] = new struct(key, value);
        this.keyArr.push(key);
    }

    this.getCount = function() {
        return this.map.length;
    }
	
	this.getAllValues = function() {
		var values = [];
		for(var i = 0; i < this.map.length; i++) {
            values.push(this.map[i].value);
        }
		
		return values.concat();
	}

    this.init = function(o) {
        for(var i = 0; i < o.map.length; i++) {
            this.setAt(o.map[i].key, o.map[i].value)
        }
    }

    this.remove = function(key) {
        for(var i = 0; i < this.map.length; i++) {
            if (this.map[i].key == key) {
                 this.map.splice(i, 1);
            }
        }
    }
	
	this.clear = function() {
		this.map = [];
	}
}

/**
 * [URLtool description]
 * @author zhaozz
 * @date 2013.3.5
 */
function URLtool(){
    return {
        "parsUrl": function(url){
            var a = document.createElement('a');
            //创建一个链接
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':',''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function(){
                    var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                    for (;i<len;i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                    })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                hash: a.hash.replace('#',''),
                path: a.pathname.replace(/^([^\/])/,'/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
                segments: a.pathname.replace(/^\//,'').split('/')
            };            
        },
        /**
         * 获取url后面的参数
         * @param  {[type]} url [可以为空]
         */
        "getUrlParam": function(url){
            var objUrl = url ? this.parsUrl(url) : this.parsUrl(window.location.href);
            return objUrl.params;
        },
        /**
         * 根据key获取url后面参数的value
         * @param  {[type]} key [description]
         * @param  {[type]} url [可以为空]
         */
        "getValueByUrlKey": function(key,url){
           var objUrlParam = this.getUrlParam(url);
           return objUrlParam[key];
        }
    };
}
/**
 *@see 将javascript数据类型转换为json字符串 
 *@param 待转换对象,支持object,array,string,function,number,boolean,regexp 
 *@return 返回json字符串 
 */ 
function toJSON(object){
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
        return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {  
          var a = arguments[0];  
          return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': "";
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
function jsonEval(data){
    try{
      if($.type(data) == 'string')
        return eval('(' + data + ')');
      else return data;
    } catch (e){
      return {};
    }
}
/**
 * load script
 * @author zhaozz
 */
(function(global,undefined){
  var config = {debug:true,min:false,version:20140310};
  var arrUrlCache;
  var head= document.getElementsByTagName('head')[0];
  global.requireJS = function(url,callback){
      if(!arrUrlCache){
          arrUrlCache = [];
      }
      url = ("array" === $.type(url) && url.length === 1) ? url[0] : url;

      if("array" === $.type(url)){
          var arrUrl = url;
          url = arrUrl[0];
          arrUrl.splice(0,1);
          arrUrl = arrUrl.length === 1 ? arrUrl[0] : arrUrl;
          requireJS(url,function(){
              requireJS(arrUrl,callback);
          });
      }else if("string" === $.type(url)){
          var boolRepeat = false;
          for(var i=0,len=arrUrlCache.length;i < len; i++){
              if(url === arrUrlCache[i]){
                  boolRepeat = true;
                  break;
              }
          }
          if(boolRepeat){
              callback?callback():null;
              return;
          }else{
              arrUrlCache.push(url);
          }

          var script = document.createElement('script');   
          script.type = 'text/javascript';   
          script.async = true;    
          addOnload(script,callback);   
          script.src = url +"?t="+ config.version;   
          head.appendChild(script);
      }

      
  };

  function addOnload(node,callback){
      node.onload = node.onreadystatechange = function(){  
         if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){            
           _onload();
        }
      }
      function _onload(){
          node.onload = node.onerror = node.onreadystatechange = null;
          callback?callback():null; 
          config.debug? undefined : head.removeChild(node);
          node = null;
      }
  };
  
})(window);