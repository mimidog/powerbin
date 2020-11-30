//标准佣金设置 start
function staAdd(e){
  var formConf = $.builder.format.form($.parser.getConfigs(["UPM_staAddForm"]));
  var dialogConf = {
    title:'标准佣金新增',
    width:600,
    height:350,
    iconCls:'icon-add',
    buttons:[{
      text:'确定',
      iconCls:'icon-save',
      handler:function(){
        var d = $("#staAddDialog");
        $('form',d).form('submit',{
          success:function(){
            alert('标准佣金新增成功！');
            d.dialog("close");
            e.data.target.datagrid("reload");
          },
          onSubmit:function(req){
            if($(this).form('validate')){
              var UPPER = parseFloat(req[0]["COMMISSION_UPPER"]);
              var LOWER = parseFloat(req[0]["COMMISSION_LOWER"]);
              if(UPPER/1000 > 1){
              	alert('佣金上限不能超过1000‰！');
                return false;
              }
              if(LOWER/1000 > 1){
              	alert('佣金下限不能超过1000‰！');
                return false;
              }
              if(UPPER<=LOWER){
                alert('佣金上限不能小于或等于佣金下限！');
                return false;
              }
              return true;
            }
            return false;
          }
        });
      }
    },{
      text:'关闭',
      iconCls:'icon-cancel',
      handler:function(){
        $("#staAddDialog").dialog('close');
      }
    }]
  };
  busCommDialog("staAddDialog",dialogConf);
  formConf["common"]=true;
  $.parser.director($("#staAddDialog"),{config:formConf});
}
function busCommDialog(formId,config){
  var dialog = $("#"+formId);
  if(dialog.length>0){
    $("form", dialog).remove();
    $(".dialog-content",dialog).append($("<form class=\"kui-form\"></form>"));
    dialog.dialog('open');
  }else{
    dialog = $("<div id='"+formId+"'><form class='kui-form'></form></div>").appendTo($('body'));
    config.modal = config.modal||true;
    config.iconCls = config.iconCls||'icon-edit';
    config.title = config.title ||'弹出窗口';
    config.width = config.width||450;
    config.height = config.height||300;
    dialog.dialog(config);
  }
}
function staModify(e){
  var rows = $('#UPM_commissionStaQuery').datagrid('getSelections');
  if(rows['length']==0){
    alert('请选择一条数据！');
    return;
  }
  var formConf = $.builder.format.form($.parser.getConfigs(["UPM_staModForm"]));
  var dialogConf = {
    title:'标准佣金修改',
    width:600,
    height:350,
    iconCls:'icon-edit',
    buttons:[{
      text:'确定',
      iconCls:'icon-save',
      handler:function(){
        var d = $("#staModDialog");
        $('form',d).form('submit',{
          success:function(){
            alert('标准佣金修改成功！');
            d.dialog("close");
            e.data.target.datagrid("reload");
          },
          onSubmit:function(req){
            if($(this).form('validate')){
              var UPPER = parseFloat(req[0]["COMMISSION_UPPER"]);
              var LOWER = parseFloat(req[0]["COMMISSION_LOWER"]);
              if(UPPER/1000 > 1){
              	alert('佣金上限不能超过1000‰！');
                return false;
              }
              if(LOWER/1000 > 1){
              	alert('佣金下限不能超过1000‰！');
                return false;
              }
              if(UPPER<=LOWER){
                alert('佣金上限不能小于或等于佣金下限！');
                return false;
              }
              return true;
            }
            return false;
          }
        });
      }
    },{
      text:'关闭',
      iconCls:'icon-cancel',
      handler:function(){
        $("#staModDialog").dialog('close');
      }
    }]
  };
  busCommDialog("staModDialog",dialogConf);
  formConf["common"]=true;
  $.parser.director($("#staModDialog"),{config:formConf,record:rows[0]});
}
//标准佣金设置 end
//特殊佣金设置 start
function speAdd(e){
  var formConf = $.builder.format.form($.parser.getConfigs(["UPM_speAddForm"]));
  var dialogConf = {
    title:'特殊佣金新增',
    width:600,
    height:350,
    iconCls:'icon-add',
    buttons:[{
      text:'确定',
      iconCls:'icon-save',
      handler:function(){
        var d = $("#speAddDialog");
        $('form',d).form('submit',{
          success:function(){
            alert('特殊佣金新增成功！');
            d.dialog("close");
            e.data.target.datagrid("reload");
          },
          onSubmit:function(req){
            if($(this).form('validate')){
              var UPPER = parseFloat(req[0]["COMMISSION_UPPER"]);
              var LOWER = parseFloat(req[0]["COMMISSION_LOWER"]);
              if(UPPER/1000 > 1){
              	alert('佣金上限不能超过1000‰！');
                return false;
              }
              if(LOWER/1000 > 1){
              	alert('佣金下限不能超过1000‰！');
                return false;
              }
              if(UPPER<=LOWER){
                alert('佣金上限不能小于或等于佣金下限！');
                return false;
              }
              var periodRange = req[0]["PERIOD_RANGE"] ;
              switch(req[0]["PERIOD_TYPE"]){
                case '1':
                  if(periodRange>7 || periodRange< 1){
                    alert("周期类型为\"周\"的，周期范围应填1-7之间！");
                    return false;
                  }
                  break;
                case '2':
                  if(periodRange>31  || periodRange < 1){
                    alert("周期类型为\"月\"的，周期范围应填1-31之间！");
                    return false;
                  }
                  break;
                case '3':
                  if(periodRange<=0){
                    alert("周期类型为\"物理天数\"的，周期范围应填大于0的正整数");
                    return false;
                  }
                  break;
                case '4':
                  if(periodRange<=0){
                    alert("周期类型为\"交易天数\"的，周期范围应填大于0的正整数！");
                    return false;
                  }
                  break;
              }
              return true;
            }
            return false;
          }
        });
      }
    },{
      text:'关闭',
      iconCls:'icon-cancel',
      handler:function(){
        $("#speAddDialog").dialog('close');
      }
    }]
  };
  busCommDialog("speAddDialog",dialogConf);
  formConf["common"]=true;
  $.parser.director($("#speAddDialog"),{config:formConf});
}
function speModify(e){
  var rows = $('#UPM_commissionSpeQuery').datagrid('getSelections');
  if(rows['length']==0){
    alert('请选择一条数据！');
    return;
  }
  var formConf = $.builder.format.form($.parser.getConfigs(["UPM_speModForm"]));
  var dialogConf = {
    title:'特殊佣金修改',
    width:600,
    height:350,
    iconCls:'icon-edit',
    buttons:[{
      text:'确定',
      iconCls:'icon-save',
      handler:function(){
        var d = $("#speModDialog");
        $('form',d).form('submit',{
          success:function(){
            alert('特殊佣金修改成功！');
            d.dialog("close");
            e.data.target.datagrid("reload");
          },
          onSubmit:function(req){
            if($(this).form('validate')){
              var UPPER = parseFloat(req[0]["COMMISSION_UPPER"]);
              var LOWER = parseFloat(req[0]["COMMISSION_LOWER"]);
               if(UPPER/1000 > 1){
              	alert('佣金上限不能超过1000‰！');
                return false;
              }
              if(LOWER/1000 > 1){
              	alert('佣金下限不能超过1000‰！');
                return false;
              }
              if(UPPER<=LOWER){
                alert('佣金上限不能小于或等于佣金下限！');
                return false;
              }
              var periodRange = req[0]["PERIOD_RANGE"] ;
              switch(req[0]["PERIOD_TYPE"]){
                case '1':
                  if(periodRange>7 || periodRange < 1){
                    alert("周期类型为\"周\"的，周期范围应填1-7之间！");
                    return false;
                  }
                  break;
                case '2':
                  if(periodRange>31 || periodRange < 1){
                    alert("周期类型为\"月\"的，周期范围应填1-31之间！");
                    return false;
                  }
                  break;
                case '3':
                  if(periodRange<=0){
                    alert("周期类型为\"物理天数\"的，周期范围应填大于0的正整数");
                    return false;
                  }
                  break;
                case '4':
                  if(periodRange<=0){
                    alert("周期类型为\"交易天数\"的，周期范围应填大于0的正整数！");
                    return false;
                  }
                  break;
              }
              return true;
            }
            return false;
          }
        });
      }
    },{
      text:'关闭',
      iconCls:'icon-cancel',
      handler:function(){
        $("#speModDialog").dialog('close');
      }
    }]
  };
  busCommDialog("speModDialog",dialogConf);
  formConf["common"]=true;
  $.parser.director($("#speModDialog"),{config:formConf,record:rows[0]});
}
//特殊佣金设置 end
