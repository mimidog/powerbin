//扩展kui-validatebox组件输入值验证方法char_underline（验证输入参数只能为英文字符、数字、下划线）
(function ($) {
    $(function () {
        using(["validatebox"], function () {
            $.fn.validatebox.defaults.rules = $.extend({}, $.fn.validatebox.defaults.rules, {
                //验证输入参数只能为英文字符、数字、'+'字符、下划线
                char_underline: {
                    validator: function (value, param) {
                        //校验数字或字符或下划线
                        function isEnglishCharAndUnderline(s) {
                            var regularExpression = /^[A-Za-z0-9-\_+]+$/;
                            return regularExpression.test(s);
                        }

                        if (isEnglishCharAndUnderline(value)) {
                            var len = value.length;
                            return len >= param[0] && len <= param[1];
                        } else {
                            return false;
                        }
                    },
                    message: "请输入 {0} 到 {1}个字符,只能英文字符、数字、'+'字符、下划线"
                },
                //正整数（含0）
                zint: {
                    validator: function (value, param) {
                        //校验正整数（含0）
                        if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                        function iszint(s) {
                            var regularExpression = /^[1-9]+\d*|0$/;
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
                //正整数（确切位数, 不包含0）
                zint_eq: {
                    validator: function (value, param) {
                        //校验正整数
                        function iszint(s) {
                            var regularExpression = /^[1-9]\d*$/;
                            return regularExpression.test(s);
                        }

                        if (iszint(value)) {
                            var len = value.length;
                            if (len != param[0]) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    },
                    message: "请输入正确的{0}位正整数"
                },
                //验证输入参数只能为正整数，包含0，但不能以0开头
                check_int: {
                    validator: function (value, param) {
                        //校验正整数（含0）
                        if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                        function iszint(s) {
                            var regularExpression = /^(0|[1-9][0-9]*)$/;
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
                    message: "请输入正确的不以0开头的正整数,最大{0}位"
                },
                //验证输入参数只能为数字或多个数字(中间用逗号','给开)
                numbers_check: {
                    validator: function (value, param) {
                        var value = $.trim(value);
                        var flag = false;
                        //校验数字（带小数点）,大于等于0；s为字符串,p0为小数点前位数,p1为小数点后位数
                        function isnumber(s, p0, p1) {
                            //验证大于等于1的小数
                            var regularExpression1 = '/^[1-9](\\d){0,' + (parseFloat(p0) - 1) + '}\\.(\\d){1,' + parseFloat(p1) + '}$/';
                            //验证大于等于0小于1的小数
                            var regularExpression2 = '/^[0]\\.(\\d){1,' + parseFloat(p1) + '}$/';
                            return eval(regularExpression2).test(s) ? true : eval(regularExpression1).test(s);
                        }

                        //校验数字（不带小数点）,大于等于0；s为字符串,p0为整数位数
                        function isnumber2(s, p0) {
                            var regularExpression = '/^[1-9](\\d){0,' + (parseFloat(p0) - 1) + '}$/';
                            return s == "0" ? true : eval(regularExpression).test(s);
                        }

                        //p2 为输入框的最大输入字符数
                        if (value.length > param[2]) {
                            return false;
                        }
                        if (!(/^(\d+|\d+\.\d+)\s*(,\s*\d+|,\s*\d+\.\d+)*$/).test(value)) {
                            return false;
                        }
                        var valueList = value.split(/\s*,\s*/g);
                        for (var i = 0; i < valueList.length; i++) {
                            flag = valueList[i].indexOf('.') != -1 ?
                                isnumber(valueList[i], param[0], param[1] || 0) : //小数
                                isnumber2(valueList[i], param[0]);	//非小数
                            if (!flag) {
                                return false;
                            } else if (valueList[i].indexOf('.') == valueList[i].length - 1) {
                                return false;
                            }
                        }
                        return true;
                    },
                    message: "请输入正确的数字，最多保留{1}位小数，多个数值请用','隔开"
                },
                //验证只含有数字或者英文字母或者汉字  不能输入特殊字符
                val: {
                    validator: function (value, param) {
                        //验证是否有特殊字符
                        function checkunval(t) {
                            var regularExpression = /[^\u4e00-\u9fa5\da-zA-Z\-\_\.\%]+[ '"]/;
                            return !regularExpression.test(t);
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
                    message: "请输入 {0} 到 {1}个字符,且不能输入特殊字符"
                    //message: "不能输入特殊字符"
                },
                //只含有数字或者英文字母,还有.
                num_char: {
                    validator: function (value, param) {
                        //校验数字或字符
                        //    /^([\w-])+$/
                        function isnumchar(s) {
                            var regularExpression = /^[A-Za-z0-9\.]+$/;
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
                //验证浮点数 by chenyan 2015/09/02
                num_float: {
                    validator: function (value, param) {
                        var value = $.trim(value);
                        //校验数字（带小数点）；s为字符串,p1为小数点前位数,p2为小数点后位数
                        function isnumber(s, p1, p2) {
                            var regularExpression = '/^(\\d){0,' + parseFloat(p1) + '}(\\.)?(\\d){0,' + parseFloat(p2) + '}$/';
                            return eval(regularExpression).test(s);
                        }

                        //校验数字（不带小数点）；s为字符串,p1为小数点前位数
                        function isnumber2(s, p1) {
                            var regularExpression = '/^(\\d){0,' + parseInt(p1) + '}$/';
                            return eval(regularExpression).test(s);
                        }

                        var flag = value.indexOf('.') != -1 ? isnumber(value, param[0], param[1]) : isnumber2(value, param[0] - param[1]);
                        if (!flag) {
                            return false;
                        } else if (value.indexOf('.') == value.length - 1) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    message: "请输入合理的正数，最多输入{2}位整数，{1}位小数"
                },
                //验证0到1之间的小数,最多小数位二位 by fengweihua 2018/03/22
                ZeroToOne_Decimal: {
                    validator: function (value, param) {
                        //验证是否有特殊字符
                        function check(t) {
                            var regularExpression = /^(0(\.[0-9]{1,2})|1(\.0{1,2})){0,1}$/;
                            return regularExpression.test(t);
                        }
                        if (check(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    message: "请输入正确的格式，小数位最多2位"
                },
                //验证大写字母及下划线，用于添加字典时字典代码的输入校验 by zhanglei 2017/3/8
                upper_underline: {
                    validator: function (value, param) {
                        //校验大写字母或下划线
                        function isUpperEnglishCharAndUnderline(s) {
                            var regularExpression = /^[\_A-Z]+$/;
                            return regularExpression.test(s);
                        }

                        if (isUpperEnglishCharAndUnderline(value)) {
                            var len = value.length;
                            return len >= param[0] && len <= param[1];
                        } else {
                            return false;
                        }
                    },
                    message: "请输入 {0} 到 {1}个字符,只能大写英文字符和下划线"
                },
                checkPath: {
                    validator: function (value, param) {
                        function isFilePath(s) {
                            // var regularExpression = /^[a-zA-Z]:(\\([a-zA-Z0-9_]+.[a-zA-Z0-9_]{1,16}))+$/;
                            var regularExpression = /^[a-zA-Z]:((\\[^\\/:*?"<>|]{1,32})*\\?)$/;
                            return regularExpression.test(s);
                        }

                        if (isFilePath(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    message: "请输入合法文件夹路径,不能包含\\ / : * ? \" < > |等字符！例：D:\\test (\\为分隔符)"
                },

                //多个数字（允许以0开头如“02”）以逗号分隔校验 add by 李文杰 2017/8/1
                numbers_comma: {
                    validator: function (value, param) {
                        var value = $.trim(value);
                        var flag = false;
                        //p2 为输入框的最大输入字符数
                        if (value.length > param[2]) {
                            return false;
                        }
                        if (!(/^\d+(,\d+)*$/).test(value)) {
                            return false;
                        }
                        return true;
                    },
                    message: "请输入正确的数字编号(允许以“0”开头)，多个数值请用','隔开"
                },
                //验证只含有数字或者英文字母或者汉字  不能输入特殊字符
                checkCode: {
                    validator: function (value, param) {
                        //验证是否有特殊字符
                        function checkunval(t) {
                            var regularExpression = /^[a-zA-Z0-9]+$/;
                            var len = value.length;
                            return regularExpression.test(t) && len >= param[0] && len <= param[1];
                        }

                        if (checkunval(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    message: "请输入{0}到{1}位数字或字母，且不能输入特殊字符和汉字"
                },
                //验证日期小于今天
                less_today: {
                    validator: function (value, param) {
                        var curDate = kui.getCurrDate('curr_date');
                        if(value>=curDate){
                            return false;
                        }else{
                            return true;
                        }
                    },

                    message: "请输入小于今天的日期！"
                },
                //验证日期大于今天
                than_today: {
                    validator: function (value, param) {
                        var curDate = kui.getCurrDate('curr_date');
                        if(value<=curDate){
                            return false;
                        }else{
                            return true;
                        }
                    },

                    message: "请输入大于今天的日期！"
                },
                // N ＜ X：小于X的正整数
                less_int: {
                    validator: function (value, param) {
                        //校验正整数(不含0)
                        function iszint(s) {
                            var regularExpression = /^[1-9]\d*$/;
                            return regularExpression.test(s);
                        }

                        if (iszint(value)) {
                            if (value >= param[0]) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    },
                    message: "请输入小于{0}的正整数"
                },
                //统一社会信用代码
                socialCredit_code: {
                    validator: function (value, param) {
                        //统一社会信用代码
                        function isValid(s) {
                            var regularExpression = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
                            return regularExpression.test(s);
                        }
                        if (isValid(value)) {
                           return true;
                        } else {
                            return false;
                        }
                    },
                    message: "请输入正确的统一社会信用代码!"
                },
                //月数,天数校验（含0,不超过多少位正整数,且不大于某值）
                zintLessThen: {
                    validator: function (value, param) {
                        //校验正整数（含0）
                        if (value.indexOf(',') > 0) value = value.replace(/,/g, '');
                        function iszint(s) {
                            var regularExpression = /^[0-9]\d*$/;
                            return regularExpression.test(s);
                        }

                        if (iszint(value)) {
                            var len = value.length;
                            if (len > param[0] ||　value >= param[1]) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    },
                    message: "请输入正确的正整数,最大{0}位,且小于{1}"
                }

            });
        });
    });
})(jQuery);