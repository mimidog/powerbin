/**
 * form - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *   'panel','fieldset','linkbutton','textinput','validatebox','numberbox','combobox','combotree','combogrid','datebox'
 */

(function($){

  $.fn.form = function(options,param){
    if(typeof options == 'string'){
      return $.fn.form.methods[options](this,param);
    }
    options = options || {};
    return this.each(function(){
      if(!$.data(this,'form')){
        $.data(this,'form',{
          options:$.extend({},$.extend({},$.fn.form.defaults),$.fn.form.parseOptions(this),options)
        });
      }
      createForm(this);
      setForm(this);
      if(options.req && options.request && String(options.request) == "true"){
        load(this,options);
      }

      // 延迟调用
      setTimeout(loadHideCols, 0);
      var target = this;
      /**
       * 从localStorage中获取保存的查询条件隐藏的数据并将这些查询条件隐藏
       */
      function loadHideCols() {
    	  	var state = $.data(target, 'form');
    	  	if(!state){
    	  		return;
    	  	}
    	  	var opts = state.options;
    		if (opts && opts.isHideCols && opts.queryCols && opts.queryCols[0]) {
    			var cols = opts.queryCols[0].cols;
    			var canHideColsLen = 0;
    			for (var i = 0, len = cols.length; i < len; i++) {
    				if (String(cols[i].hidden) != 'true') {
    					canHideColsLen++;
    				}
    			}
    			var hideArray = $.ls(opts.lsKey);
    			if (hideArray && (hideArray.length == canHideColsLen)) {
//    				var tempCol = hideArray.pop();
    				hideCols(target, hideArray);
//    				hideArray.push(tempCol);
//    				cols[tempCol].hidden = 1;
    				$.ls(opts.lsKey, hideArray);
    				$(target).hide();
    				opts.allColsHide = true; // allColsHide为true说明form被隐藏是由隐藏了所有查询条件引起的，而不是页面代码手动隐藏的
    			} else {
    				hideCols(target, hideArray);
    			}
    		}
    	}
    });
  };
  $.fn.form.parseOptions = function(target){
    var jq = $(target);
    return $.extend({},$.parser.parseOptions(target,[
      {
        colNumbers:"number"
      }
    ],{
      queryCols:(jq.attr("queryCols") ? eval(jq.attr("queryCols")) : undefined),
      toolbar:(jq.attr("toolbar") ? eval(jq.attr("toolbar")) : undefined),
      req:(jq.attr("req") ? eval(jq.attr("req")) : undefined)
    }));
  };
  $.fn.form.methods = {
    submit:function(jq,options){
      return jq.each(function(){
        ajaxSubmit(this,$.extend({},$.fn.form.defaults,options || {}));
      });
    },
    submitBex:function(jq,options){
      return jq.each(function(){
        ajaxSubmit(this,$.extend({},$.fn.form.defaults,options || {}));
      });
    },
    load:function(jq,data){
      return jq.each(function(){
        load(this,data);
      });
    },
    clear:function(jq){
      return jq.each(function(){
        clear(this);
      });
    },
    reset:function(jq){
      return jq.each(function(){
        reset(this);
      });
    },
    validate:function(jq){
      return validate(jq[0]);
    },
    getData:function(jq, escape){
    	return getData(jq[0], escape);
    },
    hideColsWindow:function(jq, callback){
    	hideColsWindow(jq[0], callback);
    },
    restoreDefault:function(jq){
    	restoreDefault(jq[0]);
    },
    disable:function(jq, param){
    	return jq.each(function(){
    		setDisabled(this, param, "disabled", "disable");
    	});
    },
    enable:function(jq, param){
    	return jq.each(function(){
    		setDisabled(this, param, "enabled", "enable");
    	});
    },
    clearFields:function (jq,fields){
    	return jq.each(function(){
    		setDisabled(this, fields, 'clear', "clear");
    	});
    },
    addRequired: function(jq, fields) {
    	return jq.each(function(){
    		setDisabled(this, fields, 'changeRequired', 'changeRequired', true);
    	});
    },
    delRequired: function(jq, fields) {
    	return jq.each(function(){
    		setDisabled(this, fields, 'changeRequired', 'changeRequired', false);
    	});
    }
  };
  $.fn.form.defaults = {
    url:null,
    req:[],
    queryCols:[],
    toolbar:[],
    colNumbers:3,
	originalData: undefined,
    onSubmit:function(param){
      return $(this).form('validate');
    },
    requiredGrp:[],
    tipMessage:['输入条件不能同时为空'],
	isHideCols : false,// 是否初始化隐藏条件按扭 @author朱庭乐
	autoColNumber: false,// 是否自动计算每行的控件个数
	validateOnLoad: false, //加载数据时是否验证
	loadingMask:false,  //加载时是否出现提示直到里面元素完全加载完显示form中的元素
    success:function(data){
    },
    onInitSuccess: $.noop,
    onBeforeLoad:function(param){
    },
    onLoadSuccess:function(data){
    },
    onLoadError:function(){
    }
  };
  
  function getData(target, escape) {
		return kui.serialize2Json($(target).serialize().replace(/\+/g, " "), null, function(key, value) {
			if(value.indexOf(',') && /^[+-]?[\d,\.]*$/.test(value)) {
				value = value.replace(/,/g, '');
			}
			
			if(escape) {
				value = kui.valueReplace(value);
			}
			return value;
		});
  }
  /**
   * submit the form
   */
  function ajaxSubmit(target,options){
    options = options || {};
    var param = {};
    var form = $(target);
    var opts = $.data(target,'form').options;	
    if(options.req && options.req.length > 0 && options.req[0].service)
      opts = $.extend(opts,options);
    var formData = $(form[0]).serializeArray();
    var req = opts.req && opts.req.length > 0 ? opts.req : options.req;
    var reqParam = [];
    for(var i = 0; i < req.length; i++){
      param = {};
      for(var j = 0; j < formData.length; j++){
        var name = formData[j].name;
        var value = kui.valueReplace(formData[j].value);
        var _target = form.find("input[name='"+name+"']")[0] ;
        if(typeof _target != "undefined" && _target.className.indexOf("numberbox")>0){
        	value = value.replace(/[,]/g,"");
        }
        if(param[name])
          param[name] = param[name] + ',' + value;
		else
          param[name] = value;
      }
      reqParam[i] = $.extend({},req[i],param);
    }
    if(options.onSubmit){	 
      if(options.onSubmit.call(target,reqParam) == false){
        return;
      }
    }
    var p = {
      url:opts.url ? opts.url : form.attr('action'),
      type:opts.method ? opts.method : form.attr('type'),
      dataType:'xml',
      async:false,
	  needToCheck:options.needToCheck || false,
      responseType:'xml',
      func:function(rtnData){
        try{		  
          var data = rtnData[0];
          if(options.success){
              options.success(data);
          }else if(opts.success){
              opts.success(rtnData);
          }
        }catch(e){
          alert(e);
        }
      },
	  error:function(rtnData){
		 if(options.fail){
				options.fail(rtnData[0]["ANS_MSG_HDR"]["MSG_TEXT"]);
            }else if(opts.fail){
				opts.fail(rtnData[0]["ANS_MSG_HDR"]["MSG_TEXT"]);
            }
	  },
      req:reqParam
    };
    if(req && req.length > 0 || opts.url){
      ajaxRequest(p);
    }
  }

  /**
   * load form data
   * if data is a URL string type load from remote site,
   * otherwise load from local data object.
   */
  function load(target,data){
    if(!data) return;
    if(!$.data(target,'form')){
      for(var i in data){
        data[i] = jQuery.trim(data[i]);
      }
      $.data(target,'form',{
        options:$.extend({},$.fn.form.defaults)
      });
    }
    var opts = $.data(target,'form').options;
    if(typeof data == 'string' || data.req){
      var param = {};
      if(!data.req[0].service && data.req[0].bex_codes){
        data.req[0]["service"] = "P9999999";
      }
      if(opts.onBeforeLoad.call(target,param) == false) return;
      var resFunc = function(rtnData){
        try{
          var data = rtnData[0][0];
          if(data)
          {
        	  _load(data);
          }
        }catch(e){
          alert(e);
        }
      };
      var p = {
        url:typeof data == 'string' ? data : opts.url,
        dataType:'xml',
        async:true,
        responseType:'xml',
        func:resFunc,
        error:function(){
          opts.onLoadError.apply(target,arguments);
        },
        req:data.req || []
      };
      if(opts.req && opts.req.length > 0 || opts.url || typeof data == 'string'){
        ajaxRequest(p);
      }
    }else{
      _load(data);
    }

    /**
     * 前_load方法执行效率较为低下,改为以下方法实现，并对_checkField和_loadCombo方法进行相应的修改
     */
    function _load(data){
    	var $form = $(target);
    	opts.originalData = data;
    	var type,name,val,$this,state;
    	$form.find('input,textarea,select').each(function(){
    		$this = $(this);
    		type = $this.attr('type');
    		name = $this.attr('name');
    		val = data[name];
    		if(name && String(val)!='undefined' && String(val)!='null'){
        		if(type == 'radio' || type == 'checkbox'){
        			_checkField(name, val);
        		} else if($this.hasClass('combo-value')){
        			_loadCombo(name, val, $form);
    			} else if($this.hasClass('validatebox-text')){
    				if($this.data("password")) {
    					$this.password("setValue", val);
    					return true;
    				}
    				$this.val(val);
    				$this.attr("title",val);
    				if($(this).data('numberbox')){
    					$this.triggerHandler('keyup');
    				}
    			}else if($this[0].type=="hidden"){
                    $this.val(val);
                    $this.attr("title",val);
                }
    		}
    	});
		if(opts.validateOnLoad)
			validate(target);
      opts.onLoadSuccess.call(target,data);
    }

    /**
     * check the checkbox and radio fields
     */
    function _checkField(name,val){
      var form = $(target);
      var rr = $('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]',form);
      $.fn.prop ? rr.prop('checked',false) : rr.attr('checked',false);
      rr.each(function(){
        var f = $(this);
        if(f.val() == String(val)){
          $.fn.prop ? f.prop('checked',true) : f.attr('checked',true);
        }
      });
      return rr;
    }

    function _loadCombo(name,val){
      var form = $(target);
      var cc = ['combobox','combotree','selecttree','combogrid','datetimebox','datebox','combo'];
      var c = form.find('[comboName="' + name + '"]');
      if(c.length){
        for(var i = 0; i < cc.length; i++){
          var type = cc[i];
          if(c.hasClass(type + '-f')){
			var opts = c[type]('options');
            if(opts.multiple){
              if(typeof(val) == 'string'){
				if(val.indexOf(",") != -1)
				  val = val.split(',');
				else if(opts.data && opts.data.length > 0 && opts.data[0][opts.valueField].length == 1)
				  val = val.split('');
				else
				  val = [val];
			  }
			  if(val == "@" && type == "combobox"){
			  	var opts = $.data(c[0], 'combobox').options;
		        var panel = $.data(c[0], "combo").panel;
		        var $select = panel.parent().find(".combo-selectAll");
			  	$select.find("span:eq(0)").trigger("click");
			  }else{
			  	c[type]('setValues',val);
			  }
              
            }else{
              c[type]('setValue',val);
            }
            return;
          }
        }
      }
    }
  }

  /**
   * clear the form fields
   */
  function clear(target){
    $('input,select,textarea',target).each(function(){
      var t = this.type, tag = this.tagName.toLowerCase();
      if(t == 'text' || t == 'hidden' || t == 'password' || tag == 'textarea'){
        this.value = '';
      }else if(t == 'file'){
        var file = $(this);
        file.after(file.clone().val(''));
        file.remove();
      }else if(t == 'checkbox' || t == 'radio'){
        this.checked = false;
      }else if(tag == 'select'){
        this.selectedIndex = -1;
      }
    });
    $('input,textarea',target).each(function(){
        		$(this).removeAttr("title");
    });
    if($.fn.uploadify){
      $('.uploadify-queue',target).html('');
      var uploadify = $('div.uploadify',target);
      $(target).find('input[name=' + uploadify.attr("name") + ']').val('');
    }
    if($.fn.password){
    	var $div = $('div.hideInput',target);
    	$div.removeAttr("kui-options");
    	$div.hide();
    }
    if($.fn.combo) $('.combo-f',target).combo('clear');
    if($.fn.combobox) $('.combobox-f',target).combobox('clear');
    if($.fn.combotree) $('.combotree-f',target).combotree('clear');
    if($.fn.selecttree) $('.selecttree-f',target).selecttree('clear');
    if($.fn.combogrid) $('.combogrid-f',target).combogrid('clear');
    if($.fn.obviousbox) $('.obviousbox-f',target).obviousbox('reset');
	if($.fn.numberbox) $('.kui-numberbox', target).numberbox('reset');
	if($.fn.password) $('.password-f', target).password('clear');
	$(target).find(".validatebox-invalid").each(function(){
    	$(this).removeClass("validatebox-invalid");
    });
  }

  function setDisabled(target, fields, validateboxFunc, comboFunc, value){
		var all = $.isArray(fields) ? false : true;
		var t = $(target);
		var name;
		t.find('input,textarea').each(function(){
			var $this = $(this);
			if(all || nameInArray($this.attr('name'), fields)){
				if($this.hasClass('combo-value') && comboFunc){
					$this.parent().prev().combo(comboFunc, value);
				} else if($this.hasClass('validatebox-text')){
					$this.validatebox(validateboxFunc, value);
				}
			}
		});
		function nameInArray(value,array){
			if(!value) {
				return false;
			}
			for(var i = 0,len = array.length;i<len;i++){
				if(array[i] == value){
					return true;
				}
			}
			return false;
		}
  }
  function reset(target){
    target.reset();
    var t = $(target);
    $('input,textarea',target).each(function(){
        		$(this).removeAttr("title");
    });
    if($.fn.combo){
      t.find('.combo-f').each(function(){
        $(this).combo('reset');
      });
    }
    if($.fn.combobox){
      t.find('.combobox-f').combobox('reset');
    }
    if($.fn.combotree){
      t.find('.combotree-f').combotree('reset');
    }
    if($.fn.selecttree){
      t.find('.selecttree-f').selecttree('reset');
    }
    if($.fn.combogrid){
      t.find('.combogrid-f').combogrid('reset');
    }
    if($.fn.spinner){
      t.find('.spinner-f').spinner('reset');
    }
    if($.fn.timespinner){
      t.find('.timespinner-f').timespinner('reset');
    }
    if($.fn.numberbox){
      t.find('.kui-numberbox').numberbox('reset');
    }
    if($.fn.numberspinner){
      t.find('.numberspinner-f').numberspinner('reset');
    }
    if($.fn.obviousbox){
      t.find('.obviousbox-f').obviousbox('reset');
    }
    if($.fn.password){
    	var $div = $('div.hideInput',target);
    	$div.removeAttr("kui-options");
    	$div.hide();
    }
    $(target).find(".validatebox-invalid").each(function(){
    	$(this).removeClass("validatebox-invalid");
    });
    //validate(target);
  }

  /**
   * set the form to make it can submit with ajax.
   */
  function setForm(target){
    var options = $.data(target,'form').options;
    var form = $(target);
    form.unbind('.form').bind('submit.form',function(){
              setTimeout(function(){
                        ajaxSubmit(target,options);
                      },0);
              return false;
            });
  }

  function validate(target){
    if($.fn.validatebox){
      var t = $(target);
      t.find('.validatebox-text:not(:disabled,[type=hidden])').validatebox('validate');
      var invalidbox = t.find('.validatebox-invalid:not(:disabled,[type=hidden]),.varlidataTextarea-invalid:not(:disabled,[type=hidden])');
      //invalidbox.filter(':not(:disabled):first').focus();
      return invalidbox.length == 0;
    }
    return true;
  }
  
  	//添加遮屏
    function addMask(target){
    	var opts = $.data(target,'form').options;
    	if(opts.loadingMask){
	    	$div = $(target).closest("div.panel");
	    	$(target).hide();
			var $mask = $("<div class=\"datagrid-mask\"></div>");
			$mask.css({
			    display:"block",
			    opacity:"1",
			    background:"#fff",
			    height:$div.height(),
			    width:$div.width(),
			    top:30 
			})	
			$mask.appendTo($div);
			var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block\"></div>").html('正在处理，请稍等。。。').appendTo($div);
			msg.css("left", ($div.width() - msg.outerWidth()) / 2);
    	}
    }
  	
  	//清除遮屏
    function removeMask(target){
    	var opts = $.data(target,'form').options;
    	if(opts.loadingMask){
    		$(target).show();
	    	$div = $(target).closest("div.panel");
	        $div.children("div.datagrid-mask-msg").remove();
			$div.children("div.datagrid-mask").remove();
    	}
    }

  function createForm(target){
    var opts = $.data(target,'form').options,
        isFormVisible;
    if(!opts.queryCols){
      return;
    }
    opts.queryCols = eval(opts.queryCols);
    opts.col = eval(opts.col);
    opts.toolbar = eval(opts.toolbar);
    var formWidth = $(target).width() || $(target).parent().width() || $(target).parents('.datagrid:first').width(); // 用于计算每行显示的条件个数  @authro 朱庭乐
    var record = opts.record;
	opts.originalData = record;
    var requiredGrp = opts.requiredGrp || "",
		targetDiv = target,
		uioptions = {},
		formId = mathRandom(5),
		formDom = [];
    if(opts.col && opts.col.length > 0){
      formDom = createCols(opts.col,target);
    }
    for(var i = 0; i < opts.queryCols.length; i++){
      var queryCols = opts.queryCols[i];
      formDom = createCols(queryCols.cols,$(target));
    }
    if(requiredGrp){
      for(var i = 0; i < requiredGrp.length; i++){
        var grpNames = requiredGrp[i];
        var arr = grpNames.split(",");
        for(var j = 0; j < arr.length; j++){
          var editor = $(target).find(":input[name='" + arr[j] + "']");
          editor.addClass("validatebox-grp-" + i);
          if(editor.next("span[class='validatebox-must']").length == 0)editor.after("<span class='validatebox-grp-must'>*</span>");
        }
      }
    }
    isFormVisible = "none" != $(target).css("display") || "hidden" != $(target).css("visibility");
    if(isFormVisible) {
      $(target).hide();
    }
	$(target).append(formDom.join(""));
	var $buttons;
	for(var i = 0; i < opts.toolbar.length; i++){
      var btn = opts.toolbar[i];
	  if(i===0)
		$buttons = $("<div class='form-buttons'></div>").appendTo($(target));
	  var btn = opts.toolbar[i];
	  var btnOpts = $.extend({},btn,{plain:true});
	  var $button = $("<a href='javascript:void(0)' class='kui-linkbutton' kui-options='"+JSON.stringify(btnOpts)+"'>"+btn.text+"</a>");
      $button = $button.appendTo($buttons);
      try{
        eval(btn.handler);
      }catch(e){
        alert('请定义' + btn.handler + '函数');
        return false;
      }
      $button.bind('click',{
		target:$(target),
		handler:eval(btn.handler),
		req:[opts.service]
	  },function(e){
		if ($(e.target).closest("a.l-btn").hasClass("l-btn-disabled")) //avoid to handle event when disabled
			return false;
		else 
			e.data.handler(e);
	  });
    }
    addMask(target);
    
	$.data(target,'uioptions',uioptions);
	setTimeout(function(){
		$.parser.director($(target),undefined,function(){
			if($.isFunction(opts.onInitSuccess)){
        if(isFormVisible) {
          $(target).show();
        }
				opts.onInitSuccess.call(target);
			}
	removeMask(target);
		});
	},0);
	if(record){
		opts.onLoadSuccess.call(target,record);
	}
	function createCols(cols){
		var hideCols = [],
			notHideCols = [],
			formStyle = ["<style type=\"text/css\" rel=\"stylesheet\">"],
			vColsDom = ["<div class='form-box form-"+formId+"'>"],
			hColsDom = [];
		for(var i = 0; i < cols.length; i++){
			var cc = cols[i];
			if(cc.hidden||cc.edit_flag == "3"){
				hideCols.push(cc);
			}else{
				notHideCols.push(cc);
			}
		}
		for(var g = 0; g < hideCols.length; g++){
			var hCol = hideCols[g];
			var hOPt = {
				field:hCol.field,
				value: hCol.dft_val,
				hidden:true,
				record:record
			};
			if(record && record[hCol.field]){
				hOPt.value = $.trim(record[hCol.field]);
			} else {
				hOPt.value = hCol.defaultValue||hCol.dft_val;
			}
			if(hCol.editor.options){
				hOPt = $.extend({},hOPt,hCol.editor.options);
			}
			uioptions[hOPt.field] = hOPt;
			hColsDom.push("<input type=\"hidden\" name=\"" + hOPt.field + "\" class=\"kui-textinput\"/>");
		}
		var autoCols = {},
			grpwidth={};
			fixedLabels = {},
			groups = [],
			cno = opts.colNumbers ? Number(opts.colNumbers):2,
			colIndex = 1;
		for(var k=0,len=notHideCols.length; k<len; k++){
			var col = notHideCols[k],
				options = {field:col.field},
				groupClass = "form-group-inline",
				group = "",
				label = "",
				type = 'textinput',
				input = "",
				colspan = 0;
				inputStyle="style='#width##height#'";
			if(col.editor && col.editor.options){
				options = $.extend(options,col.editor.options);
			}
			if(col.editor && col.editor.type){
				type = col.editor.type === "text" ? "textinput" : col.editor.type;
			}
			if(options.width && type!="autocomplete")
				inputStyle = inputStyle.replace(/#width#/g,"width:"+options.width + "px;");
			else
				inputStyle = inputStyle.replace(/#width#/g,"");
			if(options.height && type!="autocomplete")
				inputStyle = inputStyle.replace(/#height#/g,"height:"+options.height + "px;");
			else 
				inputStyle = inputStyle.replace(/#height#/g,"");
				
			if(options.data && options.data.length > 0){
				options.valueField = options.valueField || "dict_val";
				options.textField = options.textField || "dict_des";
			}
			/*
			edit_flag表示字段编辑状态
					为1时可新增不可修改
					为2时不可新增不可修改
					为3时不显示
					为4时不可新增可修改
			*/
			if(col.edit_flag && (col.edit_flag == "2" || (col.edit_flag == "1" && opts.modify) || (col.edit_flag == "4" && !opts.modify))){
				options.disabled = true;
			}
			
			options.record = record;
			
			if(record && record[options.field]){
				options.value = $.trim(record[options.field]).replace(/&quot;/g,"\"") || options.defaultValue;
			} else {
				options.value = options.defaultValue;
			}
			if(opts.autoColNumber){
				var length = getCharLength(col.title);
				label = "form-auto-label-"+formId;
				if(!autoCols[label]){
					autoCols[label] = [length];
				} else {
					autoCols[label].push(length);
				}
			} else {
				var ecol = colIndex%cno;
				ecol = ecol == 0 ? cno : ecol;
				var r = 1;
				if(col.colspan){
					colspan = Math.floor(Number(col.colspan)/2);
					r =  colspan > cno ? cno : colspan;
					colIndex += r; // 折行计算
					if(ecol+r-1 > cno) ecol = 1;//如果当前行放不下则折行
				} else {
					colIndex++; // 折行计算
				}
				group = "group-"+formId+"-"+ecol+"-"+r+"";
				groups.push(group);
				label = "form-fixed-label-"+formId+"-"+ecol;
				var clength = (col.labelWidth ? Number(col.labelWidth) : getCharLength(col.title))+20;
				clength = clength < 76 ? 76 : clength;
				if(!fixedLabels[label]) fixedLabels[label] = [clength];
				else fixedLabels[label].push(clength);
				var gw = options.width && r == 1 ? Number(options.width):134;
				if(!grpwidth[ecol]) grpwidth[ecol] = [clength+gw]
				else grpwidth[ecol].push(clength+gw);
			}
			uioptions[col.field] = options;
			
			if("textarea" === type){
				input = "<textarea name='"+col.field+"' class='kui-"+type+" form-input' "+inputStyle+"></textarea>";
			} else if("notice" === type){
				input = "<span name='"+col.field+"' class='form-notice' style='color:red;'>"+options.value+"</span>";
			}  else if("password" === type){
				input = "<input name='"+col.field+"' type='" + (col.editor.options.inputType || "password") + "' class='kui-"+type+" form-input' "+inputStyle+"></input>";
			} else if("twriceText" === type){
				input = "<input name='"+col.field+"' type='text' class='kui-password form-input' "+inputStyle+"></input>";
			}else {
				input = "<input name='"+col.field+"' class='kui-"+type+" form-input' "+inputStyle+"></input>";
			}
			vColsDom.push("<div class='"+groupClass+" "+group+"'>");
			vColsDom.push("<span class='form-label "+label+"'>"+col.title+"：</span>");
			vColsDom.push(input);
			vColsDom.push("</div>");
			//colIndex ++;
		}
		vColsDom.push("</div>");
		if(notHideCols.length == 0) vColsDom = [];
		if(!$.isEmptyObject(autoCols)){ //自动列布局时，取label最大长度设置label的统一宽度
			for(var key in autoCols){
				autoCols[key].sort(function(a,b){
					return a < b ? 1 : -1;
				});
				formStyle.push("."+key+"{width:"+(autoCols[key][0]+22)+"px;}");
			}
		}
		if(!$.isEmptyObject(fixedLabels)){//固定列布局时，以本列最大长度为label的统一宽度
			for(var key in fixedLabels){
				var data = fixedLabels[key] || [];
				data.sort(function(a,b){
					return a < b ? 1 : -1;
				});
				formStyle.push("."+key+"{width:"+data[0]+"px;}");
			}
			var offset = 12,
				fwidth = 0,
				wcols = {};
			for(var key in grpwidth){
				var grp = grpwidth[key] || [];
				grp.sort(function(a,b){
					return a < b ? 1 : -1;
				});
				wcols[key] = grp[0] + offset;
				fwidth += grp[0] + offset;
			}
			formStyle.push(".form-"+formId+"{width:"+fwidth+"px;}");
			if(groups.length > 0){ //
				var temp = "";
				groups = groups.sort();
				for(var g=0; g<groups.length; g++){
					if(temp != groups[g]){
						temp = groups[g];
						var exc = groups[g].split("-"),
							start = Number(exc[2]),
							end = Number(exc[3]),
							cwidth=0;
						for(var e=start; e<end+start; e++){
							cwidth += wcols[e]||0;
						}
						formStyle.push("."+groups[g]+"{width:"+cwidth+"px;}");
					}
				}
			}
		}
		formStyle.push("</style>");
		return (formStyle.concat(vColsDom)).concat(hColsDom);
    }
	
	function getCharLength(cString) {
		var len = 0;
		if(!cString || cString == "") return len;
		for(i=0; i<cString.length; i++) {   
			if(cString.charCodeAt(i) > 256) {   
				len += 2 + 12;
			} else if(cString.charCodeAt(i) < 65) {
				len += 7;
			} else {
				len += 9; // 将英文字母所占像素从7改为9，系统管理-》公共参数设置 里参数项标识显示不全  @author 朱庭乐   
			}
		}
		return len;
	}
	
	function mathRandom(digit){
		var val = "";
		for(var i=0;i<digit;i++){
			val += Math.floor(Math.random()*10);
		}
		return val;
	}
  }
	/**
	 * 打开“隐藏搜索条件”给form增加隐藏条件的按钮和事件
	 * dom：需要增加隐藏条件的按钮和事件的form控件的DOM元素
	 * @author 朱庭乐
	 */
	function hideColsWindow(dom, callback) {
		var $form = $(dom);
		var opts = $.data(dom, 'form').options;
		if (opts && opts.isHideCols && opts.queryCols && opts.queryCols[0] && (opts.allColsHide || (!opts.allColsHide && !$form.is(':hidden')))) {
			var cols = opts.queryCols[0].cols;
			var html = [];
			html.push('<div class="hide_columns"><div style="line-height:20px;height:20px;"><a name="selectAll" style="margin:0 5px;" href="javascript:void(0)">全选</a><a href="javascript:void(0)" style="margin:0 5px;">全不选</a><a href="javascript:void(0)" style="margin:0 5px;">反选</a></div><div style="height:160px;overflow:auto;margin-bottom:10px;"><ul style="list-style:none;margin:0;padding:0;">');
			for ( var i = 0, len = cols.length; i < len; i++) {
				if (String(cols[i].hidden) != 'true') {
					html.push('<li><input type="checkbox"');
					if (cols[i].hidden) {
						html.push(' checked="checked"');
					}
					if (cols[i].editor.options.required){
						html.push(' disabled="disabled"');
					}
					html.push('><span>' + cols[i].title + '</span></li>');
				}
			}
			html.push('</ul></div><a name="confirm" class="kui-linkbutton" style="margin:0 10px 0 10px;">确定</a>');
			html.push('<a name="cancel" class="kui-linkbutton">取消</a>');
			html.push('</div>');
			var $window = $(html.join('')).window({
				title : '请选择要隐藏的查询条件',
				width : 200,
				height : 250,
				modal : true,
				minimizable : false,
				maximizable : false,
				collapsible : false
			});
			$window.find('a[name=selectAll]').click(function() {
				$window.find('ul input').each(function() {
					this.checked = !this.disabled;
				});
			}).next().click(function() {
				$window.find('ul input').each(function() {
					this.checked = false;
				});
			}).next().click(function() {
				$window.find('ul input').each(function() {
					this.checked = !this.disabled && !this.checked;
				});
			});
			$window.find('a[name=confirm]').linkbutton({}).click(function() {
				var hideArray = [];
				$window.find('input:checked').each(function(i, d) {
					hideArray.push($(d).parent().index());
				});
				hideCols(dom, hideArray);
				$window.window('close');
				if(callback){
					callback();
				}
			});
            $window.find('a[name=cancel]').linkbutton({}).linkbutton({}).click(function() {
				$window.window('close');
			});
			$window.window('open');
		} else {
			alert('没有可供隐藏的搜索条件！');
		}
	}

	/**
	 * 查询按钮，缓存起来
	 * @author 朱庭乐
	 */
	var $queryBtn = null;
	/**
	 * 隐藏查询条件
	 * dom：需要隐藏查询条件的form控件的DOM元素
	 * hideArray：如[0,3]，一个数组，该数组中的每个元素表示需要隐藏的第几个条件（从0开始计算）。
	 * @author 朱庭乐
	 */
	function hideCols(dom, hideArray) {
		if (!dom || !$.isArray(hideArray)) {
			return;
		}
		$(dom).show();
		var opts = $.data(dom, 'form').options;
		if (!opts || !opts.queryCols || !opts.queryCols[0]) {
			return;
		}
		var cols = opts.queryCols[0].cols;
        var temp1=[];
        var temp2=[];
		for ( var i = 0, len = cols.length; i < len; i++) {
			if (String(cols[i].hidden) != 'true') {
				cols[i].hidden = 0;
                temp2.push(cols[i]);
			}else{
//                cols[i].hidden = 1;
                temp1.push(cols[i]);
            }
		}
		for ( var i = 0, len = hideArray.length; i < len; i++) {
			var index = hideArray[i];
			if (String(temp2[index].hidden) != 'true') {
                temp2[index].hidden = 1;
			}
		}
        for(var jj=0;jj<temp1.length;jj++){
            temp2.push(temp1[jj]);
        }
        cols=temp2;
		var $dom = $(dom);
		var array = $dom.serializeArray();
		var params = {};
		for ( var i = 0, len = array.length; i < len; i++) {
			params[array[i].name] = cols[i].hidden ? '' : array[i].value;
		}

		var $btn = $dom.find('div.form-group-inline:has(a.l-btn):contains(查询)');
		if ($btn[0]) {
			$queryBtn = $btn.clone(true);
		}
		$dom.empty();
		createForm(dom);

		$dom.find('div.form-group-inline:last').after($queryBtn);

		$.ls(opts.lsKey, hideArray);
	}
	
	/**
	 * 将保存在localStorage中的隐藏搜索条件的内容清除 @author 朱庭乐
	 */
	function restoreDefault(dom){
		var opts = $.data(dom, 'form').options;
		$.ls(opts.lsKey, null);
	}
})(jQuery);
