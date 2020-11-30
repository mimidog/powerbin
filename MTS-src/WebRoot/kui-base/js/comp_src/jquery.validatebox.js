/**
 * validatebox - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *
 */

;(function($) {
    //入口函数
    $.fn.validatebox = function(options, context) {
        if (typeof options == "string") {
            var method = $.fn.validatebox.methods[options],
            	args = [this];
            
            if(method) {
            	return method.apply(this, args.concat(Array.prototype.slice.call(arguments, 1)));
            }
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, "validatebox");
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, "validatebox", {
                    options: $.extend({},
                    $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), options)
                });
                //调用初始化方法，为其加上validatebox-text class 名称
                init(this);
                $(this).removeAttr("disabled");
                if ($(this).attr("maxLength")) $(this).removeAttr("maxLength");
            }
            //执行绑定事件方法
            bindEvents(this);
            setDisabled(this, state.options.disabled);
            setMaxLength(this, state.options.maxLength);

        })
    }
    $.fn.validatebox.methods = {
        destroy: function(jq) {
            return jq.each(function() {
                destroyBox(this);
            });
        },
        validate: function(jq) {
            return jq.each(function() {
                validate(this);
            });
        },
        isValid: function(jq) {
            return validate(jq[0]);
        },
        disabled: function(jq) {
            return jq.each(function() {
                setDisabled(jq[0], "true");
            });

        },
        enabled: function(jq) {
            return jq.each(function() {
                setDisabled(jq[0], "false");
            });
        },
        getValue: function(jq) {
            return jq.val();
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                $(this).val(value);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                clear(jq);
            });
        },
        changeValid: function(jq, value) {
            return jq.each(function() {
                changeValid(this, value);
            });
        },
        changeRequired: function(jq, value) {
            return jq.each(function() {
                changeRequired(this, value);
            });
        },
        resize: function(jq, width) {
            return jq.each(function() {
                setSize(this, width);
            });
        },
        showTip:function(jq, msg, global){
            return jq.each(function() {
                showTip(this, msg, global);
            });
        },
        hideTip:function(jq, global){
            return jq.each(function() {
                hideTip(this, global);
            });
        }
    };
    $.fn.validatebox.parseOptions = function(target) {
        var jq = $(target);
        return $.extend({},
        $.parser.parseOptions(target, ["validType", "missingMessage", "invalidMessage", {
            showMessage: "boolean"
        },
        "maxLength"]), {
            required: ("true" == String(jq.attr("required")) ? true: undefined),
            disabled: (jq.attr("disabled") == true ? jq.attr("disabled") : undefined)
        });
    };
    $.fn.validatebox.defaults = {
        removeSingleQuote: true,
    	validOnBlur: true,
        required: false,
        validType: null,
        speTxt: null,
        disabled: false,
        showMessage: true,
        missingMessage: "该项为必输项",
        invalidMessage: null,
        isFocusRemoveTip: true,
        setTimeLong: 5000,
        rules: {
            email: {
                validator: function(value, param) {
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    var len = change2star(value).length;
                    if (param && param.length > 0) {
                        return len <= param[0] && /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
                    } else {
                        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
                    }
                },
                message: "请输入正确的邮箱地址",
                tipMessage: "emailTipMessage"
            },
            url: {
                validator: function(value) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
                },
                message: "请输入正确的路径"
            },
            ip: {
                validator: function(value) {
                	return /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|\*)\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|\*)\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|\*)\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|\*)$/.exec(value);
                },
                message: "请输入正确的IP"
            },
            mac:{
                validator:function(value){
                    return /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/.exec(value);
                },
                message: "请输入正确的MAC"
            },
            eqValue : {
				validator : function(value, param) {
					return value == param;
				},
				message : '两次输入不一致'
			},
            length: {
                validator: function(value, param) {
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    var len = change2star(value).length;
                    return len >= param[0] && len <= param[1];
                },
                message: "请输入 {0} 到 {1}个字符，1个中文算2个字符",
                tipMessage: "输入 {0} 到 {1}个字符，1个中文算2个字符"
            },
            //手机号码
            mobile: {
                validator: function(value) {
                    //return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.exec(value);
                    return /^([+]?[\d]{1,3}-|[ ])?((13[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(15[0-9]{9}))$/.exec(value);
                },
                message: "请输入正确的手机号码"
            },
            //校验普通电话、传真号码:可以“+”开头,除数字外,可含有“-” 
            tel: {
                validator: function(value) {
                    return /^(([0\+]\d{2,3}-?)?(0\d{2,3})-?)?(\d{7,8})(-(\d{3,}))?$/.exec(value);
                },
                message: "请输入正确的电话号码"
            },
            //校验手机号码或者普通电话，将mobile的校验的和tel的校验取交集
            mobileortel: {
                validator: function(value) {
                	return /^((([0\+]\d{2,3}-?)?(0\d{2,3})-?)?(\d{7,8})(-(\d{3,}))?|([+]?[\d]{1,3}-|[ ])?((13[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(15[0-9]{9})))$/.exec(value);
                    //return /^[+]{0,1}(\d){1,3}?([-]?((\d)){1,12})+$/.exec(value);
                },
                message: "请输入正确的普通电话或手机号码"
            },
            //只含有数字或者英文字母
            numchar: {
                validator: function(value, param) {
                    //校验数字或字符
                    function isnumchar(s) {
                        var regularExpression = /^[0-9a-zA-Z]*$/g;
                        return regularExpression.test(s);
                    }

                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    if (isnumchar(value)) {
                        var len = change2star(value).length;
                        return len >= param[0] && len <= param[1];
                    } else {
                        return false;
                    }
                },
                message: "请输入 {0} 到 {1}个字符,只能输入数字或英文字符"
            },
            //  fengwh add in 20170222 只含有数字或者大写英文字母
            numBigeEnChar: {
                validator: function(value, param) {
                    //校验数字或大写英文字符
                    function isnumchar(s) {
                        var regularExpression = /^[0-9A-Z]$/g;
                        return regularExpression.test(s);
                    }
                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    if (isnumchar(value)) {
                        var len = change2star(value).length;
                        return len >= param[0] && len <= param[1];
                    } else {
                        return false;
                    }
                },
                message: "请输入 {0} 到 {1}个字符,只能输入数字或大写英文字符"
            },
            //只含有英文字母
            enChar: {
                validator: function(value, param) {
                    //校验数字或字符
                    function isEnglishChar(s) {
                        //var regularExpression = /[a-zA-Z]/;
                        var regularExpression = /^[a-zA-Z]+$/;
                        return regularExpression.test(s);
                    }

                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    if (isEnglishChar(value)) {
                        var len = change2star(value).length;
                        return len >= param[0] && len <= param[1];
                    } else {
                        return false;
                    }
                },
                message: "请输入 {0} 到 {1}个字符,只能英文字符"
            },
            //校验开始日期不能大于截止日期,param(起始日期的输入框name)
            endDate: {
                validator: function(value, param , target) {
                    //校验确切位数数字。
					var parForm = $($(target)[0].form);
                    var beginDataVal = $('input[name="' + param + '"]',parForm).val();
                    var bgCombo = $('input[comboname="' + param + '"]',parForm);
                    if (!value) {
                        if (bgCombo.length > 0) {
                            var c = bgCombo.datebox('calendar');
                            c.calendar('setMaxDate', 'max');
                        }
                        return true;
                    } else if (beginDataVal != '' && value < beginDataVal) {
                        return false;
                    } else {
                        if (bgCombo.length > 0) {
                            var c = bgCombo.datebox('calendar');
                            c.calendar('setMaxDate', value);
                        }
                        return true;
                    }
                },
                message: "截止日期不能小于起始日期"
            },
            begDate: {
                validator: function(value, param , target) {
                    //校验确切位数数字。
					var parForm = $($(target)[0].form);
                    var endDateVal = $('input[name="' + param + '"]',parForm).val();
                    var bgCombo = $('input[comboname="' + param + '"]',parForm);
                    if (!value) {
                        if (bgCombo.length > 0) {
                            var c = bgCombo.datebox('calendar');
                            c.calendar('setMinDate', 'min');
                        }
                        return true;
                    } else if (endDateVal != '' && value > endDateVal) {
                        return false;
                    } else {
                        if (bgCombo.length > 0) {
                            var c = bgCombo.datebox('calendar');
                            c.calendar('setMinDate', value);
                        }
                        return true;
                    }
                },
                message: "起始日期不能大于截止日期"
            },
            //验证必须字符开头
            valFirst: {
              validator: function (value, param) {
                function checkfirstval(t) {
                  return /(^[\u4e00-\u9fa5a-zA-Z]+)([^\n]*)$/.test(value);
                }
                function change2star(s) {
                  return s.replace(/[^\x00-\xff]/g, "**");
                }

                if (checkfirstval(value)) {
                  var itemValue = change2star(value);
                  var len = change2star(value).length;
                  return len >= param[0] && len <= param[1];
                } else {
                  return false;
                }

              },
              message: "请输入 {0} 到 {1}个字符,且必须输入以字符开头"
            },
            //验证只含有数字或者英文字母或者汉字  不能输入特殊字符
            val: {
                validator: function(value, param) {
                    //将允许出现的字符转换成1个“*”
                    function keepchar(v,k)  {
                        $.each(k, function(index, val) {
                            v = v.replace(k[index]," ");
                        });
                        return v;
                    }   

                    //验证是否有特殊字符  但是能输入.和-_
                    function checkunval(t) {
                        //var regularExpression = /[^\u4e00-\u9fa5\da-zA-Z\-\_\.]+[ '"]/;
						//return ! regularExpression.test(t);
						var regularExpression = /^[^@\/\'\\\"#$%&\^\*]+$/;
                        return regularExpression.test(t);
                    }

                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }
                    var opts = $.data(arguments[2],"validatebox").options;
                    var itemValue = opts.speTxt!==null? keepchar(value,opts.speTxt): value;
                        
                    if (checkunval(itemValue)) {                            
                        var len = change2star(itemValue).length;
                        return len >= param[0] && len <= param[1];
                    } else {
                        return false;
                    }
                },
                message: "请输入 {0} 到 {1}个字符,且不能输入特殊字符"
                //message: "不能输入特殊字符"
            },
            //验证英文字母或者汉字  不能输入特殊字符
            en_ch: {
                validator: function(value, param) {
                    //验证是否有特殊字符  但是能输入.和-_
                    function checkunval(t) {
                        var regularExpression = /[^\u4e00-\u9fa5a-zA-Z\-\_\.]+/;
                        return ! regularExpression.test(t);
                    }

                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }

                    if (checkunval(value)) {
                        var itemValue = change2star(value);
                        var len = change2star(value).length;
                        return len >= param[0] && len <= param[1];
                    } else {
                        return false;
                    }
                },
                message: "请输入 {0} 到 {1}个中文或者英文字符,且不能输入特殊字符"
                //message: "不能输入特殊字符"
            },
            //任意数字
            number: {
                validator: function(value, param) {
                    var value = $.trim(value);
                    //校验数字（带小数点）,可带正负号；s为字符串,p1为小数点前位数,p2为小数点后位数
                    function isnumber(s, p1, p2) {
                        var regularExpression = '/^(-)?(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                        return eval(regularExpression).test(s);
                    }

                    //校验数字（不带小数点）,可带正负号；s为字符串,p1为小数点前位数
                    function isnumber2(s, p1) {
                        var regularExpression = '/^(-)?(\\d){1,' + parseInt(p1) + '}$/';
                        return eval(regularExpression).test(s);
                    }

                    var flag = value.indexOf('.') != -1 ? isnumber(value, param[0], param[1]) : isnumber2(value, param[0]);
                    if (!flag) {
                        return false;
                    } else if (value.indexOf('.') == value.length - 1) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: "请输入正确的数字"
            },
            //任意数字
            numberex: {
                validator: function(value, param) {
                    var value = $.trim(value);
                    //校验数字（带小数点）,可带正负号；s为字符串,p0为标志,p1为小数点前位数,p2为小数点后位数
                    function isnumber(s, p0, p1, p2) {
                        if (p0 == "0" || !p0) {
                            //正,负,0
                            var regularExpression = '/^(-)?(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "10") {
                            //大于等于0
                            var regularExpression = '/^(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "-10") {
                            //小于等于0
                            var regularExpression = '/^(-)(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "1") {
                            //大于0
                            var regularExpression = '/^(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s) && Number(s) > 0;
                        } else if (p0 == "-1") {
                            //小于0
                            var regularExpression = '/^(-)(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){1,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if(p0 == "2"){
                        	//小于1大于0
                        	if(value < 1 && value >= 0){
                        		return true ;
                        	}else{
                        		return false ;
                        	}
                        } else {
                            return false;
                        }
                    }

                    //校验数字（不带小数点）,可带正负号；s为字符串,p0为标志,p1为小数点前位数
                    function isnumber2(s, p0, p1) {
                        if (p0 == "0" || !p0) {
                            //可能正负
                            var regularExpression = '/^(-)?(\\d){1,' + parseInt(p1) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "10") {
                            //大于等于0
                            var regularExpression = '/^(\\d){1,' + parseInt(p1) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "-10") {
                            //小于等于0
                            var regularExpression = '/^(-)(\\d){1,' + parseInt(p1) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "1") {
                            //大于0
                            var regularExpression = '/^(\\d){1,' + parseInt(p1) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if (p0 == "-1") {
                            //小于0
                            var regularExpression = '/^(-)[1-9](\\d){1,' + (parseInt(p1) - 1) + '}$/';
                            return eval(regularExpression).test(s);
                        } else if(p0 == "2"){
                        	//小于1大于0
                        	if(value < 1 && value >= 0){
                        		return true ;
                        	}else{
                        		return false ;
                        	}
                        } else {
                            return false;
                        }

                    }

                    if (! (/^(\+|-)?(\d+)(,\d{3})*(\.\d+)?$/).test(value)) {
                        return false;
                    } else {
                        if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                    }
                    var flag = value.indexOf('.') != -1 ? 
                    		isnumber(value, param[0], param[1], param[2] || 0) : //小数
                    			isnumber2(value, param[0], param[1]);	//非小数
                    if (!flag) {
                        return false;
                    } else if (value.indexOf('.') == value.length - 1) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: "请输入正确的数字"
            },
            //金额
            money: {
                validator: function(value, param) {
                    var value = $.trim(value);
                    //校验数字（带小数点）,可带正负号；s为字符串,p1为小数点前位数,p2为小数点后位数
                    function isnumber(s, p1, p2) {
                        var regularExpression = '/^(-)?(\\d){1,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                        return eval(regularExpression).test(s);
                    }

                    //校验数字（不带小数点）,可带正负号；s为字符串,p1为小数点前位数
                    function isnumber2(s, p1) {
                        var regularExpression = '/^(-)?[1-9](\\d){0,' + (parseInt(p1) - 1) + '}$/';
                        return eval(regularExpression).test(s);
                    }

                    var flag = value.indexOf('.') != -1 ? isnumber(value, param[0], param[1]) : isnumber2(value, param[0]);
                    if (!flag) {
                        return false;
                    } else if (value.indexOf('.') == value.length - 1) {
                        return false;
                    } else {
                        return true;
                    }
                },
                message: "请输入正确的金额，最大长度{0}位，精度{1}位"
            },
            //整数（含0）
            'int': {
                validator: function(value, param) {
                    if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                    //校验整数（含0）
                    function isint(s) {
                        var regularExpression = /^(-)?\d*$/;
                        /////^[1-9]\d*$/;
                        return regularExpression.test(s);
                    }

                    if (isint(value)) {
                        var len = value.length;
                        if (len > param[0]) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的整数,最大{0}位"
            },
            //正整数（不含0）
            zint: {
                validator: function(value, param) {
                    //校验正整数（不含0）
                    if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                    function iszint(s) {
                        var regularExpression = /^[1-9]\d*$/;
                        return regularExpression.test(s);
                    }

                    if (iszint(value)) {
                        var len = value.length;
                        if (len > param[0]) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的正整数,最大{0}位"
            },
            //正负整数（含0和不含0）
            intex: {
                validator: function(value, param) {
                    //校验非负整数:10,非正整数:-10,正整数::1,负整数:-1
                    function iszint(s, p1) {
                        //非负整数:10
                        if (p1 == "10") {
                            var regularExpression = /^[0-9]\d*$/;
                            return regularExpression.test(s);
                        } else if (p1 == "-10") {
                            //非正整数
                            var regularExpression = /^(-)[0-9]\d*$/;
                            return regularExpression.test(s);
                        } else if (p1 == "1") {
                            //正整数
                            var regularExpression = /^[1-9]\d*$/;
                            return regularExpression.test(s);
                        } else if (p1 == "-1") {
                            //负整数
                            var regularExpression = /^(-)[1-9]\d*$/;
                            return regularExpression.test(s);
                        } else {
                            return false;
                        }
                    }
                    if (! (/^(\+|-)?(\d+)(,\d{3})*(\.\d+)?$/).test(value)) {
                        return false;
                    } else {
                        if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                    }

                    if (iszint(value, param[1])) {
                        var len = value.length;
                        if (len > param[0]) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的整数"
            },

            //确切位数字
            num: {
                validator: function(value, param) {
                    var value = $.trim(value);
                    //校验确切位数数字。
                    function isnum(s, data) {
                        var regularExpression = '/^(\\d){' + parseFloat(data) + '}$/';
                        return eval(regularExpression).test(s);
                    }
					function isnum1(s, data) {
                        var regularExpression = '/^(\\d){' + parseFloat(param[0]) + ',' + parseFloat(param[1]) + '}$/';
                        return eval(regularExpression).test(s);
                    }
                    //将字符串中的汉字转化为2个“*”
                    function change2star(s) {
                        return s.replace(/[^\x00-\xff]/g, "**");
                    }
					if(param.length == 1){
						if (isnum(value, param[0])) {
	                        var itemValue = change2star(value);
	                        if (itemValue.length >= param[0]) {
	                            return true;
	                        } else {
	                        	this.message = "请输入{0}位数字" ;
	                            return false;
	                        }
	                    } else {
	                    	this.message = "请输入{0}位数字" ;
	                        return false;
	                    }
					}else{
						var itemValue = change2star(value);
						if (isnum1(value, param[0])) {
							if (itemValue.length >= param[0] && itemValue.length <= param[1]) {
	                            return true;
	                        } else {
	                        	this.message = "请输入{0} 到 {1}位数字" ;
	                            return false;
	                        }
						}else {
	                    	this.message = "请输入{0} 到 {1}位数字" ;
	                        return false;
	                    }
					}
                    
                },
                message: "请输入{0} 到 {1}位数字"
            },
            //非汉字
            unhan: {
                validator: function(value, param) {
                    var value = $.trim(value);
                    //校验非汉字
                    function isunhan(s) {
                      var regularExpression = /[\u4e00-\u9fa5]+/;
                        return regularExpression.test(s);
                    }

                    if (!isunhan(value) && value.length <= parseFloat(param[0])) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: "请输入非汉字，最大长度为{0}"
            },
            //日期格式
            date: {
                validator: function(value) {
                    var value = $.trim(value);
                    //功能; 判断得到的日期字符串的日期格式是否合法,仅yyyyMMdd格式；
                    //参数: String dayString 如:(19980508 yyyyMMdd格式)
                    //1到4位是年份,5到6位是月份,只能是1到12月,7到8位是日,只能是1到31
                    function isdate(dayString) {
                        var digit = "0123456789";
                        var datelist = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                        if (dayString.length != 8) {
                            return false;
                        }
                        for (var i = 0; i < 8; i++) {
                            if (digit.indexOf(dayString.charAt(i), 0) == -1) {
                                return false;
                            }
                        }
                        var year = dayString.substr(0, 4); //截取年部分
                        var month = dayString.substr(4, 2); //截取月部分
                        var date = dayString.substr(6, 2); //截取日部分
                        if (year > 3000 || year < 1900 || month > 12 || month < 1 || date > 31 || date < 1) {
                            return false;
                        }
                        if (date > datelist[month - 1]) {
                            return false;
                        }

                        var yyyy = eval(year);
                        if (month == "02") {
                            if ((yyyy % 400) == 0) {
                                if (date > 29) {
                                    return false;
                                }
                            } else if ((yyyy % 4) == 0 && (yyyy % 100) != 0) {
                                if (date > 29) {
                                    return false;
                                }
                            } else {
                                if (date > 28) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }

                    if (isdate(value)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的日期",
                tipMessage: "20100101"
            },
            //时间格式 HH:MM:SS
            time: {
                validator: function(value) {
                    var value = $.trim(value);
                    //校验时间格式 HH:MM:SS
                    function istime(timeString) {
                        var regularExpression = /^(((([0-1][0-9])|(2[0-3])):(([0-5][0-9])):(([0-5][0-9])))|((([0-1][0-2])|[0-9]):(([0-5][0-9])):(([0-5][0-9]))\s[ap]m))$/;
                        return regularExpression.test(timeString);
                    }

                    if (istime(value)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的时间"
            },
            //邮政编码
            postcode: {
                validator: function(value) {
                    var value = $.trim(value);
                    //校验邮政编码 
                    function ispostcode(s) {
                        var patrn = /^[0-9]\d{5}$/;
                        if (!patrn.exec(s)) {
                            return false;
                        }
                        return true
                    }

                    if (ispostcode(value)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的邮政编码"
            },
            //身份证号码
            cardno: {
                validator: function(value, isLen18) {
                    var value = $.trim(value);
                    //校验身份证号码
                    function iscardno(s) {
                        var area = {
                            11 : "北京",
                            12 : "天津",
                            13 : "河北",
                            14 : "山西",
                            15 : "内蒙古",
                            21 : "辽宁",
                            22 : "吉林",
                            23 : "黑龙江",
                            31 : "上海",
                            32 : "江苏",
                            33 : "浙江",
                            34 : "安徽",
                            35 : "福建",
                            36 : "江西",
                            37 : "山东",
                            41 : "河南",
                            42 : "湖北",
                            43 : "湖南",
                            44 : "广东",
                            45 : "广西",
                            46 : "海南",
                            50 : "重庆",
                            51 : "四川",
                            52 : "贵州",
                            53 : "云南",
                            54 : "西藏",
                            61 : "陕西",
                            62 : "甘肃",
                            63 : "青海",
                            64 : "宁夏",
                            65 : "新疆",
                            71 : "台湾",
                            81 : "香港",
                            82 : "澳门",
                            91 : "国外"
                        }
                        var idcard = s,
                        Y, JYM;
                        var SS, M;
                        var idcard_array = new Array();
                        idcard_array = idcard.split("");
                        //地区检验 
                        if (area[parseInt(idcard.substr(0, 2))] == null) {
                            return false;
                        }
                        //身份号码位数及格式检验 	
                        switch (idcard.length) {
                        case 15:
                        	if(!isLen18||isLen18[0]) {
                        		return false;
                        	}
                            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
                            } else {
                                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
                            }
                            if (ereg.test(idcard)) {
                                return true;
                            } else {
                                return false;
                            }
                            break;
                        case 18:
                            //18位身份号码检测
                            //出生日期的合法性检查
                            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                            } else {
                                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                            }
                            //测试出生日期的合法性
                            if (ereg.test(idcard)) {
                                //计算校验位
                                SS = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                                Y = SS % 11;
                                M = "F";
                                JYM = "10X98765432";
                                M = JYM.substr(Y, 1); //判断校验位
                                if (M == idcard_array[17]) { //检测ID的校验位
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                            break;
                        default:
                            return false;
                            break;
                        }
                    }

                    if (iscardno(value)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: "请输入正确的身份证号"
            },
            //机构编码
            orgcode: {
                validator: function(value) {
                    var regularExpression = /^[1-9]\d*$/;
                    if(regularExpression.test(value) && value < 32767) {
                        return true;
                    }
                    return false;
                },
                message: ""
            },
            /*
            orgcode: {
                validator: function(value) {
                    var value = $.trim(value);

                    function isorgcode(s) {
                        var orgcode = s,
                            Y, JYM;
                        var SS, M;
                        var orgcode_array = new Array();
                        var CHGorgcode_array = new Array();
                        orgcode_array = orgcode.split("");
                        //机构编码位数及格式检验
                        switch (orgcode.length) {
                            case 9:
                                //9位号码检测
                                ereg = /^[0-9A-Z]{8}[0-9Xx]$/;
                                var Chage = {
                                    "0":0,
                                    "1":1,
                                    "2":2,
                                    "3":3,
                                    "4":4,
                                    "5":5,
                                    "6":6,
                                    "7":7,
                                    "8":8,
                                    "9":9,
                                    "A":10,
                                    "B":11,
                                    "C":12,
                                    "D":13,
                                    "E":14,
                                    "F":15,
                                    "G":16,
                                    "H":17,
                                    "I":18,
                                    "J":19,
                                    "K":20,
                                    "L":21,
                                    "M":22,
                                    "N":23,
                                    "O":24,
                                    "P":25,
                                    "Q":26,
                                    "R":27,
                                    "S":28,
                                    "T":29,
                                    "U":30,
                                    "V":31,
                                    "W":32,
                                    "X":33,
                                    "Y":34,
                                    "Z":35
                                };
                                if (ereg.test(orgcode)) {
                                    for (var i = 0; i < 8; i++) {
                                        CHGorgcode_array[i] = Chage[orgcode_array[i]];
                                    }
                                    CHGorgcode_array[8] = orgcode_array[8];
                                    //计算校验位
                                    SS = (parseInt(CHGorgcode_array[0])) * 3 + (parseInt(CHGorgcode_array[1])) * 7 + (parseInt(CHGorgcode_array[2])) * 9 + (parseInt(CHGorgcode_array[3])) * 10 + (parseInt(CHGorgcode_array[4])) * 5 + (parseInt(CHGorgcode_array[5])) * 8 + (parseInt(CHGorgcode_array[6])) * 4 + parseInt(CHGorgcode_array[7]) * 2;
                                    Y = SS % 11;
                                    ///Y 为所有加和的与11的模值为，10,9,8,7,6,5,4,3,2,1,0
                                    /// CHGorgcode_array[8] = 11-Y;
                                    ///Y =1 时，    CHGorgcode_array[8]=10 即 HGorgcode_array[8]='X'
                                    if (CHGorgcode_array[8] == 'X' || CHGorgcode_array[8] == 'x') {
                                        M = (10 + parseInt(Y)) % 11;
                                    } else {
                                        M = (parseInt(CHGorgcode_array[8]) + parseInt(Y)) % 11;
                                    }
                                //判断校验位
                                    if (M == 0) { //检测ID的校验位
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                                break;
                            default:
                                return false;
                                break;
                        }
                    }

                    if (isorgcode(value)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message:""
            },
            */
            remote: {
                validator: function(params, opts) {
                    var data = {};
                    data[opts[1]] = params;
                    var response = $.ajax({
                        url: opts[0],
                        dataType: "json",
                        data: data,
                        async: false,
                        cache: false,
                        type: "post"
                    }).responseText;
                    return response == "true";
                },
                message: "Please fix this field."
            },
            equalTo: {
                validator: function(value, param) {
                    return $(param[0]).val() == value;
                },
                message: '字段不匹配'
            },
            normalchar: {
            	validator: function(value, param) {
            		return !/[\'\"]/.test(value);
            		
            	},
            	message: '输入字符中包含非法字符'
            }
        }
    }

    //len和length为同一引用，这样外部参数就不用修改了
    $.fn.validatebox.defaults.rules.len = $.fn.validatebox.defaults.rules.length;
    
    //初始话，为对象加上一个class
    function init(target) {
        var jq = $(target);
        var opts = $.data(target, "validatebox").options;
        $(target).addClass("validatebox-text");
        if (opts.required && !opts.noWarn) jq.closest("span.combo").length ? jq.closest("span.combo").addClass("combo-validatebox-must") : jq.addClass("validatebox-must");
        //if(opts.required&&!opts.noWarn) jq.closest("td").length?jq.closest("td").append("<span class='validatebox-must'>*</span>"):jq.closest("span").after("<span class='validatebox-must'>*</span>");
    };

    //删除验证
    function destroyBox(target) {
        var state = $.data(target, "validatebox");
        if (state) {
            state.validating = false;
            var tip = state.tip;
            if (tip) {
                tip.remove();
            }
            $(target).unbind();
            $(target).remove();
        }
    }
    //绑定事件
    function bindEvents(target) {
        //dom对象转化为jquery对象
        var box = $(target);
        //拿到缓存里的数据
        //if(box.hasClass("combo-text")) return;
        var boxTagName = box[0].tagName;
        var boxTagType = box[0].type;
        var state = $.data(target, "validatebox");
        var opts = $.data(target, "validatebox").options;

        //绑定键盘按下事件，如果是回车事件，让焦点移动到下一个元素，由于该实现有问题，所以重新实现了一次。 @author 朱庭乐
        state.validating = false;
        //绑定获得焦点和移除焦点事件
        box.unbind(".validatebox").bind("keydown.validatebox", function(e) {
        	if(box.attr("dontFocus2Next")) {
        		return;
        	}
        	var $inp, $nextInput, nxtIdx, $nextBtn;
            if (e.keyCode == 13) {
                e.preventDefault();
                $inp = $('input.validatebox-text,textarea,a.l-btn');
                for(nxtIdx = $inp.index(this) + 1, len = $inp.length; nxtIdx < len; nxtIdx++) {
                    if (($nextInput = $($inp[nxtIdx])).is(':visible') && 
                        "a" != $nextInput[0].tagName.toLowerCase() && $nextInput.attr('disabled') != 'disabled') {
                        var scrollTop = $nextInput.focus().offset().top;
                        $(window).scrollTop(scrollTop - 100);
                        return;
                    }
                }
                
                $nextBtn = $(this).closest('form').find('a.l-btn:first');
                if (!$nextBtn.length) {
                    $nextBtn = $(this).closest('div.window').find('a.l-btn:first');
                }
                if (!$nextBtn.length) {
                    $nextBtn = $(this).closest('div.panel').next().find('a.l-btn:first');
                }
                
                if($nextBtn.length) {
                	if (!$nextBtn.attr('href')) {
                        $nextBtn.attr('href', 'javascript:void(0)');
                    }
                	$nextBtn.focus();
                } else {
                	$("<input type=hidden'>").insertAfter(e.target).focus().remove();
                }
            }
        }).bind("focus.validatebox", function() {
            state.validating = false;
            if (boxTagName.toUpperCase() == "TEXTAREA") {
                box.removeClass("varlidataTextarea-invalid ");
            } else {
                box.removeClass("validatebox-invalid validatebox-grp-invalid");
            }
            if(opts.isFocusRemoveTip){
                hideTip(target);
            }
        }).bind("blur.validatebox", function() {
            if(opts.removeSingleQuote) {
                box.val(box.val().replace(/\'*/g,""));
            }

			if(boxTagType != "password"){
        		box.attr("title",box.val());
        	}
			
            state.validating = true;
            state.value = undefined; 
            
            (function() {
                if (state.validating) {
                    if (state.value != box.val()) {
                        state.value = box.val();
                        if(opts.validOnBlur) {
                        	 validate(target);
                        }
                    }
                    setTimeout(function() {
                        state.validating = false;
                        //hideTip(target);
                    },
                    (opts.setTimeLong));
                }
            })();
        })

        // 给validatebox控制增加chars参数，用于控制输入框可输入的内容的范围，chars是一个字符串，表示允许被输入的字符的范围。
        if (opts.chars && opts.chars.length > 0) {
            try {
                var reg = new RegExp('[^' + opts.chars + ']', 'g');
                box.bind('keyup.validate-permit',
                function(e) {
                    this.value = this.value.replace(reg, '');
                });
            } catch(e) {
                alert('输入项' + opts.field + '的chars参数配置错误，正确样例如：<br\>\\\\d<br\>\\\\w<br\>\\\\d.<br\>等');
            }
        };
    }

    function showTip(target, msg, global) {
    	$ = global && global.$ ? global.$ : $;
        var box = $(target), 
        	pos = box.offset(), 
        	obj = $.data(target, "validatebox") || {}, 
        	docBody = global && global.document && global.document.body ? global.document.body : document.body,
        	tip, tipTop, tipContent, tipPointer,
            timeoutKey;
        	
        if(0 === pos.left && 0 === pos.top) {
        	return;
        }
        
        msg = (msg || obj.message) || "";
        tip = obj.tip || $("<div class=\"validatebox-tip\"><div class=\"validatebox-tip-content\"></div><div class=\"validatebox-tip-pointer\"></div></div>").appendTo(docBody)
        obj.tip = obj.tip || tip;
        tipContent = $(".validatebox-tip-content", tip);
    	
    	tipContent.html(msg);
        tipTop = pos.top - tip.outerHeight();
        if(tipTop < 0){
        	tipPointer = $(".validatebox-tip-pointer", tip);
        	tipContent.insertAfter(tipPointer);
        	tipPointer.removeClass().addClass("validatebox-tip-pointer-down");
            tipTop = tipTop + tip.outerHeight() + pos.top + 7;
        }
        /** 1.从组件的data里获取settimeout的key，并且取消前一个settimeout
         *  2.tip显示
         *  3.延迟settimeout 隐藏，并将settimeout的key缓存到 data里面        
         */ 
        obj.timeoutKey && clearTimeout(obj.timeoutKey);

        tip.css({
            left: pos.left + 20,
            top: tipTop
        }).show();

        timeoutKey = setTimeout(function() {
            tip.fadeOut();
        }, (obj.options.setTimeLong));

        obj = $.extend(obj,{timeoutKey: timeoutKey});
        $.data(target, "validatebox",obj);
    };
    
    function hideTip(target, global) {
    	$ = global && global.$ ? global.$ : $;
    	var obj = $.data(target, "validatebox");
        if (!obj) return;
        var tip = obj.tip;
        if (tip) {
            tip.remove();
            obj.tip = null;
        }
    };

    //验证函数
    function validate(target, keyflag) {
        var opts = $.data(target, "validatebox").options;
        var tip = $.data(target, "validatebox").tip;
        var box = $(target);
        var value = box.val() || ""; //得到用户输入的值
        value = value.replace(/(^\s*)|(\s*$)/g, ""); //去掉首尾空格
        var boxTagName = box[0].tagName;

        function setTipMessage(msg) {
            $.data(target, "validatebox").message = msg;
        };

        //验证类型
        if (opts.validType) {
            var validCfgs = opts.validType.split(";");
            while (validCfgs[0]) {
                var result = /([a-zA-Z_]+)(.*)/.exec(validCfgs.shift());
                var rule = opts.rules[result[1]];

                if ((value || result[1] == 'begDate' || result[1] == 'endDate') && rule) {
                    if (result[1] == 'money') {
                        value = value.replace(new RegExp("\\" + opts.groupSeparator, "g"), "");
                    }
                    var param = "eqValue" === result[1] ? $(target).attr("kui-eqValue") : eval(result[2]);
                    if (!rule["validator"](value, param , target)) {
                        if (opts.validType == "date") {
                          $(target).parent("span.datebox").addClass("dateboxerror");
                          box.addClass("validatebox-invalid");
                        } else {
                            if (boxTagName.toUpperCase() == "TEXTAREA") {
                                box.addClass("varlidataTextarea-invalid");
                            } else {
                                box.addClass("validatebox-invalid");
                            }
                        }
                        var message = rule["message"];
                        if (param) {
                            for (var i = 0; i < param.length; i++) {
                                message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
                            }
                        }
                        if (opts.showMessage) {
                            setTipMessage(opts.invalidMessage || message);
                            showTip(target);
                        }
                        return false;
                    }
                }

            }
        }
        
        //是否必须输入
        if ("true" === String(opts.required) && !keyflag) {
            //注释下面语句 否则不显示校验信息
            //if (value == "" && !$(target).hasClass("combo-text")) {
            if (opts.showMessage && value == "") {
                if (boxTagName.toUpperCase() == "TEXTAREA") {
                    box.addClass("varlidataTextarea-invalid");
                } else {
                    box.addClass("validatebox-invalid");
                    setTimeout(function() {
                        box.removeClass("validatebox-invalid");
                    },
                    (opts.setTimeLong));
                }
                setTipMessage(opts.missingMessage);
                showTip(target);
                return false;
            }

            if (!opts.showMessage && value == "") {
                if (boxTagName.toUpperCase() == "TEXTAREA") {
                    box.addClass("varlidataTextarea-invalid");
                } else {
                    box.addClass("validatebox-invalid");
                    setTimeout(function() {
                        box.removeClass("validatebox-invalid");
                    },
                    (opts.setTimeLong));
                }
                return false;
            }
        }

        
        if (boxTagName.toUpperCase() == "TEXTAREA") {
            box.removeClass("varlidataTextarea-invalid");
        } else {
            box.removeClass("validatebox-invalid");
        }
        hideTip(target);
        return true;
    };

    //设置disabled
    function setDisabled(target, disabled) {
        var opts = $.data(target, "validatebox").options;

        if (String(disabled) == "true" || disabled == "disabled") {
            opts.disabled = true;
            $(target).attr("disabled", true);
            $(target).addClass('form-input-disabled');
            var box = $(target);
            var boxTagName = box[0].tagName;
            if (boxTagName.toUpperCase() == "TEXTAREA") {
                box.removeClass("varlidataTextarea-invalid");
            } else {
                box.removeClass("validatebox-invalid");
            }
            hideTip(target);
        } else {
            opts.disabled = false;
            $(target).removeAttr("disabled");
            $(target).removeClass('form-input-disabled');
        }
    };
    //设置最大可输入的长度
    function setMaxLength(target, maxLength) {
        if (typeof(maxLength) !== 'number') return;
        maxLength = parseInt(maxLength);
        $(target).attr("maxLength", maxLength);

    };
    //清楚数据
    function clear(target) {
        target.val("")
    };

    function setValue(target, param) {
        if (param != null) {
            $(target).val(param);
        }
    }
    function changeValid(target, validType) {
        var opts = $.data(target, "validatebox").options;
        opts.validType = validType;
    }
    function changeRequired(target, required) {
        var opts = $.data(target, "validatebox").options;
        var jq = $(target);
        opts.required = Boolean(required);
        if (required && !opts.noWarn) {
            //opts.$mustSpan.replaceWith(opts.$mustSpan = $("<span class='validatebox-must'>*</span>"));
            jq.closest("span.combo").length ? jq.closest("span.combo").addClass("combo-validatebox-must") : jq.addClass("validatebox-must");
        } else {
            //opts.$mustSpan.replaceWith(opts.$mustSpan = $("<span style=\"font-family: '宋体', Simsun;\">&nbsp;</span>"));
        	jq.closest("span.combo").length ? jq.closest("span.combo").removeClass("combo-validatebox-must") : jq.removeClass("validatebox-must");
        }
    }

    function setSize(target, width) {
        $(target)._outerWidth(width);
    }

})(jQuery);