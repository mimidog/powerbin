/**
 * password - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 * 	 validatebox
 * 
 */
(function($) {
	var confirmAttr = "kui-eqValue",
		eqRule = "eqValue";
	
    $.fn.password = function(options, param) {
        if (typeof options == "string") {
            var method = $.fn.password.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.validatebox(options, param);
            }
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'password');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, "password", {
                    options: $.extend({}, $.fn.password.defaults, $.fn.password.parseOptions(this), options)
                });
                render(this);
            }
        });
    };
    
    function render(target) {
    	var target = $(target),
    		opts = target.data("password").options,
    		isValid = 1 === Number(opts.isValid) || "true" === String(opts.isValid),
    		vtArr;
    	
    	opts.isValid = isValid;
    	
    	if(isValid){	//如果password组件需要确认输入，加上eqValue规则
    		if(opts.validType) {
	    		vtArr = opts.validType.split(";");
	    		vtArr.push(eqRule);
	    		opts.validType = vtArr.join(";");
    		} else {
    			opts.validType = eqRule;
    		}
    	}
    	
    	target.css("width", opts.width).validatebox($.extend(opts, {
    		validOnBlur: isValid ? false : true	//如果password组件需要确认输入，取消继承的validatebox自动校验功能
    	})).addClass("password-f");
    	
//    	if(!target.attr("type")) {
//    		target.attr("type", "text");
//    	}
    	
    	if(target.val()) {
    		target.attr(confirmAttr, target.val());
    	}
    	
    	if(isValid) {
    		bindEvents(target);
    	}
    }
    
    function bindEvents(target) {
    	var target = $(target),
    		type = target.attr("type") || "text",
    		isPassword = "password" === type,
    		opts = target.data("validatebox").options;
    	
    	target.unbind(".password").bind("blur.password", function() {
    		var value = $.trim(target.validatebox("getValue")),
    			confirmValue = target.attr(confirmAttr),
    			
    			vtArr = opts.validType.split(";"),
    			idx = $.inArray(eqRule, vtArr);
    		
    		if(-1 != idx) {	//先移除eqValue校验规则
    			vtArr.splice(idx, 1);
    		}
    		target.validatebox("changeValid", vtArr.join(";"));
    		if(target.validatebox("isValid") && value && (!confirmValue || confirmValue != value)) {
    			target.removeAttr(confirmAttr);
    			var msgBody = top.prompt(isPassword ? "确认密码" : "确认输入", "请重新输入", function(inputValue) {
    				if(inputValue) {
    					target.attr(confirmAttr, inputValue).focus();
    				} else {
    					if(opts.focusOnCancel) {
    						target.focus();
    					}
    					if(opts.clearOnCancel) {
    						target.password("clear");
    					}
    				}
    			}, function(inputValue) {
    				if(inputValue != value) {
                        setTimeout(function() {
                            msgInput.focus();
                            msgInput.validatebox("showTip", "两次输入不一致，请重新输入！", top);
                        }, 0);
                        msgInput.on("blur",function(){
                            $(target).validatebox("hideTip");     
                        });
                        // setTimeout(function () {
                        //     msgInput.validatebox("hideTip", top);
                        // }, 5000);
    					return false
    				}
                    opts.onConfirmSuccess.call(target,inputValue);
    				return true;
    			}),
    			
    			prevMsgInput = msgBody.find(".messager-input"),
    			msgInput = top.$("<input class='messager-input' type='" + type + "'/>").insertAfter(prevMsgInput),
    			msgOkBtn = msgBody.find(".messager-button a:first");
    			
    			prevMsgInput.remove();

                if(opts.isManualConfirm) {
                    msgInput.attr({
                        oncontextmenu: "return false",
                        oncopy: "return false",
                        oncut: "return false",
                        onpaste: "return false"
                    });
                }

    			msgInput.keydown(function(e) {
                    if(13 === e.keyCode) {
                        msgOkBtn.click();
                    } else if(27 === e.keyCode) {
                        msgBody.window("destroy");
                        target.focus();
                    }
                }).validatebox({
                    isFocusRemoveTip:false
                });
    			msgOkBtn.click(function() {
    				if(!msgInput.val()) {
    					msgInput.focus();
    				}
    			});
    			setTimeout(function() {
    				msgInput.focus();
    				$(document).trigger("mousedown");
    			}, 50);
    		}
    		
			vtArr.push(eqRule);
			target.validatebox("changeValid", vtArr.join(";"));	//恢复eqValue校验规则
    	});
    }
    
    $.fn.password.methods = {
        options: function(jq) {
            return $.data(jq[0], "password").options;
        },
        
        clear:function(jq){
        	return jq.each(function() {
        		clear(this);
            });
        },
        
        setValue:function(jq, value) {
            return jq.each(function() {
            	setValue(this, value);
            });
        },

        changeValid: function(jq, value) {
            return jq.each(function() {
                changeValid(this, value);
            });
        }
    };

    $.fn.password.parseOptions = function(target) {
        return $.extend({},
        $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target, ["maxLength"]), {});
    };

    $.fn.password.defaults = $.extend({
    	isValid: 1, //1-需要确认输入 0-不需要
    	width: 120,
        isManualConfirm: true,  //确认框是否只能手工输入
        onConfirmSuccess: function(){  //确认成功后的回调

        }
    },
    
    $.fn.validatebox.defaults, {
        value: null,
        name: null,
        hidden: false,
        readonly: false,
        disabled: false,
        maxLength: null,
        focusOnCancel: false,
        clearOnCancel: false,
        onChange: function(options, param) {}
    });

    function setValue(target, value) {
    	var target = $(target),
			opts = target.data("password").options;
    	target.val(value);
    	if(opts.isValid) {
    		target.attr(confirmAttr, value);
    	}
		var type = target.attr("type") || "text",
    		isPassword = "password" === type;
		if(!isPassword) {
			target.attr("title",value);
		}
    }
    
    function clear(target) {
    	$(target).val("").removeAttr(confirmAttr).removeAttr("title");
    }

    function changeValid(target, validType) {
        var opts = $.data(target, "validatebox").options;
        opts.validType =  validType.indexOf("eqValue")>-1 ? validType : (validType+";eqValue");
    }

})(jQuery);