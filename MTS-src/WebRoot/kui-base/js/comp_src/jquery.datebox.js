/**
 * datebox - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 *     calendar
 *     combo
 *     
 */
(function($){
	$.fn.datebox = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.datebox.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'datebox');
			if (state){
                $.extend(state.options, options);
			} else {
				state=$.data(this, 'datebox', {
					options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options)
				});
			}

			if(!state.options.selectDay) {
				state.options.addDefaultRule = false;
				state.options.editable = false;
			}

			state.options.validType = state.options.validType || "";

			if(state.options.addDefaultRule) {
				var validArray = state.options.validType.split(";");
				if(-1 === $.inArray("date", validArray)) {
					validArray.unshift("date");
					state.options.validType = validArray.join(";");
				}
			}

			if(state.options.editable) state.options.acceptInput=true;
			createBox(this);
			setReadonly(this,state.options.editable);
		    comboOptions=$.data(this,'combo').options;
			comboOptions.text=$(this).combo("getText");
			state.options.text=$(this).combo("getText");
			bindEvents(this);
		});
	};
	
	$.fn.datebox.methods = {
		options: function(jq){
			var opts = $.data(jq[0], 'datebox').options;
			opts.originalValue = jq.combo('options').originalValue;
			return opts;
		},
		calendar: function(jq){	// get the calendar object
			return $.data(jq[0], 'datebox').calendar;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		reset: function(jq){
			return jq.each(function(){
				var opts = $(this).datebox('options');				
				$(this).datebox('setValue', opts.originalValue);
			});
		}
	};
	
	$.fn.datebox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.fn.combo.parseOptions(target), {
		});
	};
	
	$.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
		selectDay: true,
        addDefaultRule: true,
		panelWidth:180,
		panelHeight:'auto',
		value:'',
		keyHandler: {
			up:function(){changeDay(this, -7);},
			down:function(){changeDay(this, 7);},
			left:function(){changeDay(this, -1);},
			right:function(){changeDay(this, 1);},
			enter:function(){doEnter(this);},
			query:function(q){doQuery(this, q);}
		},
		editable:false,//可编辑设置统一改成editable
		currentText:'Today',
		closeText:'Close',
		okText:'Ok',
		min:"19000101",
		max: "30001231",
    disableDates:[],
		separator:"",
		saveformat:"",
		formatter:function(date,separator){
			var ret = [],
				y = date.getFullYear(),
				m = date.getMonth() + 1,
				d = date.getDate();

			ret.push(y + "");
			ret.push(m<10?('0'+m):m);
			if(this.selectDay) {
				ret.push(d<10?('0'+d):d);
			}

			return ret.join(separator);
		},
		parser:function(s){			
			var reg = /(\d{4})\W?(\d{2})\W?(\d{2})/;
			var s = s.replace(reg,"$1/$2/$3");			
			var t = Date.parse(s);
			if (!isNaN(t)){
				return new Date(t);
			} else {
				return new Date();
			}
		},		
		onSelect:function(date){}
	});
	
	function bindEvents(target){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		var combo = $.data(target, "combo").combo;
		var panel = $.data(target, "combo").panel;
        var input = combo.find(".combo-text");
        if(state.options.editable){
        	input.unbind("keyup").bind("keyup",function(e){
        		if(opts.editable && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40)) {
        			return;
        		}
        		var value = input.val();
        		if(value && $(target).combo("isValid")){
        			if(opts.max && value > opts.max){
	        			//input.val(opts.max);
                        setValue(target, opts.max);
	        			var t = $("table",panel).find(".calendar-no-max");
	        			$("table",panel).find(".calendar-day").removeClass("calendar-selected");
	        			t.first().prev().addClass("calendar-selected");
	        		}else if(opts.min && value < opts.min){
	        			//input.val(opts.min);
                        setValue(target, opts.min);
	        			var t = $("table",panel).find(".calendar-no-min");
	        			$("table",panel).find(".calendar-day").removeClass("calendar-selected");
	        			t.last().next().addClass("calendar-selected");
	        		}else{
	        			setValue(target, value);
	        		}
        		}
			});
        }
	}
	
	/**
	 * create date box
	 */
	function createBox(target){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		
		$(target).addClass('datebox-f');
		//绘制下拉框组件，把datebox的参数和一个onShowPanel函数定义当作参数生成combo
		$(target).combo($.extend({}, opts, {
			  onShowPanel:function(){
				state.calendar.calendar('resize');
				opts.onShowPanel.call(target);
			  },
			  keyHandler: opts.editable ? $.fn.combo.defaults.keyHandler : opts.keyHandler
		}));
		$(target).combo('textbox').parent().addClass('datebox');
		
		/**
		 * if the calendar isn't created, create it.
		 */
		if (!state.calendar){
			createCalendar();
		}
		//生成calendar组件
		function createCalendar(){
			var panel = $(target).combo('panel');
			state.calendar = $('<div></div>').appendTo(panel).wrap('<div class="datebox-calendar-inner"></div>');
			//调用calendar组件
			state.calendar.calendar({
				fit:true,
				border:false,
				min:opts.min,
				max:opts.max,
				selectDay: opts.selectDay,
				onSelect:function(date){
					var separator = typeof opts.separator != "undefiend" ? opts.separator:"";
					var value = opts.formatter(date,separator);
					setValue(target, value);
					$(target).combo('hidePanel');
					opts.onSelect.call(target, date);
				},
                onClick:function(){
                    $.data(target, "combo").comboText.focus();
                }
			});
			var button = $('<div class="datebox-button"></div>').appendTo(panel);			
			$('<a href="javascript:void(0)" class="datebox-close"></a>').html(opts.closeText).appendTo(button);
			$('<a href="javascript:void(0)" class="datebox-current"></a>').html(opts.currentText).appendTo(button);
			$('<a href="javascript:void(0)" class="datebox-ok"></a>').html(opts.okText).appendTo(button);
			button.find('.datebox-current,.datebox-close,.datebox-ok').hover(
					function(){$(this).addClass('datebox-button-hover');},
					function(){$(this).removeClass('datebox-button-hover');}
			);
			button.find('.datebox-current').click(function(){
				state.calendar.calendar({
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					current:new Date()
				});
				doEnter(target);
			});
			button.find('.datebox-close').click(function(){
				  setValue(target, "");
				  $(target).combo('validate');			  
				  $(target).combo('hidePanel');
			});
			button.find('.datebox-ok').click(function(){
				  doEnter(target);
			}).hide();
		}
		if(opts.value!=""){
			var value = opts.value;
			if(opts.value && String(opts.value).charAt(0) == ":"){
			  value = kui.getCurrDate(value);
			}
			setValue(target, value);
		}
	}
	
	/**
	 * called when user inputs some value in text box
	 */
	function doQuery(target, q){
		var value = q || "";
		var mvalue = value;
		if("" != value && value.length<4) return;
		var state = $.data(target, 'datebox');
		var opts = state.options;
		if("" == value){
			var current = state.calendar.calendar('options').current.getDate();
			state.calendar.calendar('moveTo', opts.parser(current));
		} else if(/\d{4}\W?/.test(value)) {
			mvalue += opts.separator + "01" + opts.separator + "01";
			state.calendar.calendar('moveTo', opts.parser(mvalue));
		} else if(/\d{4}\W?\d{2}/.test(value)) {
			mvalue += opts.separator + "01";
			state.calendar.calendar('moveTo', opts.parser(mvalue));
		}
		//var val = $(target).combo('getValue');
		//if(value!=val)$(target).combo('setValue', value);//输入后设置值
	}
	
	/**
	 * called when user press enter key
	 */
	function doEnter(target){
		var opts = $.data(target, 'datebox').options;
		var c = $.data(target, 'datebox').calendar;
		var separator = typeof opts.separator != "undefiend" ? opts.separator:"";
		var value = opts.formatter(c.calendar('options').current,separator);
		setValue(target, value);
		$(target).combo('hidePanel');
	}
	
	function changeDay(target, days){
		var opts = $.data(target, 'datebox').options;
		var c = $.data(target, 'datebox').calendar;
		var separator = typeof opts.separator != "undefiend" ? opts.separator:"";
		var current = c.calendar('options').current.getTime();
		var date = new Date(current + (days ? days : 0) * 24 * 60 * 60 * 1000); // 一天
		var value = opts.formatter(date,separator);
		if(opts.min && value < opts.min){
			return false ;
		} else if(opts.max && value > opts.max){
			return false ;
		}
		setValue(target, value);
	}
	function setValue(target, value){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		var textValue = "";
		
//    if(value && value!="" && value.split(" ").length == 2){
		if(value && value!=""){
			textValue = value;
		} else if(value != ""){
			var reg = /(\d{4})\W?(\d{2})\W?(\d{2})/;
			var ss = reg.exec(value);
			if(ss != null){	
				textValue = ss[1]+opts.separator+ss[2]+opts.separator+ss[3];
				value = ss[1]+opts.saveformat+ss[2]+opts.saveformat+ss[3];
			}
		}
		if(typeof(value) != 'undefined'){
      $(target).combo('setValue', value).combo('setText', textValue);
    }
		state.calendar.calendar('moveTo', opts.parser(value));
	}
	
	function setReadonly(target, editable){
		var opts = $.data(target, 'datebox').options;
		if (!editable){
			opts.editable = false;
			$(target).parent().find(".combo-text").attr('readonly', 'readonly');
		} else {
			opts.editable = true;
			$(target).parent().find(".combo-text").removeAttr('readonly');
		}
	}
})(jQuery);
