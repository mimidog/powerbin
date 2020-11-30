/**
 * autocomplete - KINGDOM-UI
 *
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 *
 * Dependencies:
 *
 */
(function (jQuery) {
    $.fn.autocomplete = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.autocomplete.methods[options];
            if (method) {
                return method(this, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'autocomplete');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'autocomplete', {
                    options: $.extend({},
                        $.fn.autocomplete.defaults, $.fn.autocomplete.parseOptions(this), options)

                });

                if(state.options.searchType && state.options.resetSearchType) {
                    state.options.searchTypeKeyField = state.options.searchTypeKeyField || state.options.keyField;
                }

                init(this);
                setValue(this, state.options.value);
                setDisabled(this, state.options.disabled);

            }
        });
    };

    $.fn.autocomplete.methods = {
        options: function (jq) {
            return $.data(jq[0], 'autocomplete').options;
        },
        destroy: function (jq) {
            return jq.each(function () {
                destroyBox(this);
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                setDisabled(jq[0], true)
            });
        },
        enable: function (jq) {
            return jq.each(function () {
                setDisabled(jq[0], false)
            });
        },
        validate: function (jq) {
            return jq.each(function () {
                validate(this);
            });
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                setValue(this, value);
            });
        },
        getValue: function (jq) {
            return jq.val();
        },
        clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        }
    };

    $.fn.autocomplete.parseOptions = function (target) {
        return $.extend({},
            $.parser.parseOptions(target, ['autoFocus', 'delay', 'minLength', 'position', 'params', 'source', 'readonly', 'disabled', 'req', 'sourceField', 'dataType']));
    };

    $.fn.autocomplete.defaults = $.extend({}, $.fn.validatebox.defaults, {
        hiddenField: "",
        resetSearchType: true,
        searchTypeKeyField: "",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        previousValue: "",
        hasFocus: 0,
        autoSearch: true,
        enterSearch: true,
        focusAfterSelect: true,
        minLength: 1,
        req: [],
        dataType: 'xml',
        delay: 100,
        disabled: false,
        readonly: false,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        useCache: false,
        cacheLength: 10,
        params: "",
        tampData: [],
        max: 100,
        value: "",
        sourceField: "",
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        formatItem: function (row) {
            return row[0];
        },
        formatMatch: null,
        autoFill: false,
        width: 0,
		panelWidth:0,
        source: "../../kjdp_ajax?returnType=json",
        multiple: false,
        multipleSeparator: ", ",
        highlight: function (value, term, key) {
            var tempKey = key;
            var v = value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + tempKey + ")(?![^<>]*>)(?![^&;]+;)", "i"), key.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"));
            return v;
        },
        scroll: true,
        scrollHeight: 180,
        isResultValid: false,   //查询结果匹配是否需要验证
        onChange: function (newValue, oldValue) {
        },
        onBlur: function (value) {
        },
        onClose: function () {
        },
        onCreate: function () {
        },
        onResponse: function (data) {
        },
        onNoRecords: function () {
        },
        onSelect: function (item) {
        },
        onInitSuccess: function () {
        },
        onSearchTypeChange: function () {
        }

    });
    function init(target) {
        var state = $.data(target, 'autocomplete');
        var opts = state.options;
        var isUrl = typeof opts.source == "string";
		if (opts.width > 0) $(target).css("width", opts.width);
        var options = $.extend({},
            opts, {
                url: isUrl ? opts.source : null,
                data: isUrl ? null : opts.source,
                max: opts && !opts.scroll ? 10 : 150
            });
        if (isUrl) {
            options.formatItem = function (row) {
                return row;
            }
        }

        if (options.searchType) {
            var types = options.searchType;
            if (typeof types == "string")
                types = eval('(' + options.searchType + ')');
            var searchOptions = [];
            var box = [];
            if (types.data && types.data.length > 1) {
                var field = types.field;
                for (var i = 0; i < types.data.length; i++) {
                    var typeValue = types.data[i].value;
                    var typeText = types.data[i].text;
                    var typeField = types.data[i].field;
                    if (i == 0) {
                        box.push("<div class='auto-search-box'>");
                        box.push("<a class='auto-search-type' name='" + field + "' value='" + typeValue + "' href='#'><b></b>" + typeText + "</a>");
                        box.push("</div>");
                        searchOptions.push("<div class='auto-search-options' style='display:none;'>");
                        searchOptions.push("<ul>");
                    }
                    searchOptions.push("<li class='auto-search-item' name='" + field + "' field='" + typeField + "' value='" + typeValue + "'>" + typeText + "</li>");
                }
                searchOptions.push("</ul></div>");
            }else if(types.data && types.data.length == 1){
                var field = types.field;
                var typeValue = types.data[0].value;
                var typeText = types.data[0].text;
                box.push("<span class='auto-search-type' style='padding: 3px 0px 3px 2px;' name='" + field + "' value='" + typeValue + "' href='#'>" + typeText + "：</span>");
            }
            var $dom = $(box.join(""));
            var $col = $(target).closest("div");
            if ($col.length > 0 && $col.find("span.form-label").length > 0) {
                $dom.appendTo($col.find("span.form-label").empty());
            } else {
                $(target).before($dom);
            }
            var $searchOptions = $(searchOptions.join("")).appendTo($("body"));
            //$dom.css({"position":"relative"});
            state.searchTypeDom = $dom;
            state.searchOptions = $searchOptions;
        }
        // if highlight is set to false, replace it with a do-nothing function
        options.highlight = options.highlight ||
            function (value) {
                return value;
            };

        // if the formatMatch option is not specified, then use formatItem for backwards compatibility
        options.formatMatch = options.formatMatch || options.formatItem;

        var KEY = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        };

        // Create $ object for target element
        var jQuerytarget = $(target).attr("autocomplete", "off").addClass("ac_input");
        if (options.readonly) {
            jQuerytarget.attr("readonly", true);
        }
        if (!options.disabled) {
            jQuerytarget.attr("disabled", true);
        }
        var timeout;
        var previousValue = "";
        var cache = autoCache(options);
        var hasFocus = 0;
        var lastKeyPressCode;
        var config = {
            mouseDownOnSelect: false
        };
        var select = creatSelect(options, target, selectCurrent, config);

        var blockSubmit;

        // prevent form submit in opera when selecting with return key
        jQuery.browser.opera && jQuery(target.form).bind("submit.autocomplete",
            function () {
                if (blockSubmit) {
                    blockSubmit = false;
                    return false;
                }
            });
        if (options.searchType) {
            var $searchTypeDom = state.searchTypeDom;
            var $searchOptions = state.searchOptions;
            $searchTypeDom.bind("click", function (e) {
                var $typedom = $(this).find(".auto-search-type");
                var backgroundPosition =$typedom.find("b")[0].style.backgroundPosition;
                if (backgroundPosition==""||backgroundPosition.indexOf("-15px")!=-1) {
                    var offset = $typedom.offset();
                    var top = $searchTypeDom.closest("td").length > 0 ? (offset.top + $typedom.outerHeight()) : ($typedom.outerHeight() + offset.top);
                    var left = $searchTypeDom.closest("td").length > 0 ? (offset.left) : offset.left;
                    $typedom.addClass("auto-search-type-hover");
                    $typedom.find("b").css("backgroundPosition", "1px center");
                    $searchOptions.css({"position": "absolute", "z-index": "1000", "top": (top - 3) + "px", "left": left + "px"});
                    $searchOptions.show();
                } else{
                    hideSearchOptions();
                }
            });
            $searchOptions.find("li").click(function () {
                var value = $(this).attr("value");
                var text = $(this).html();
                var field = $(this).attr("name");
                options.req[0][field] = value + "";
                $(".auto-search-type", $searchTypeDom).attr("value", value).removeClass().addClass("auto-search-type");
                $(".auto-search-type", $searchTypeDom).html("<b></b>" + text);
                $(target).autocomplete("clear");
                $searchOptions.hide();
                options.onSearchTypeChange.call(this, options, target);
            });

            function hideSearchOptions() {
                if (state.searchTypeDom && state.searchOptions) {
                    $(".auto-search-type", state.searchTypeDom).removeClass().addClass("auto-search-type");
                    state.searchTypeDom.find("b").css("backgroundPosition", "-15px center");
                    state.searchOptions.hide();
                }
            }
        }
        // only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
        jQuerytarget.bind((jQuery.browser.opera ? "keypress" : "keydown") + ".autocomplete",
            function (event) {
                // track last key pressed
                lastKeyPressCode = event.keyCode;
                switch (event.keyCode) {
                    case KEY.UP:
                        event.preventDefault();
                        if (select.visible()) {
                            select.prev();
                        } else {
                            onChange(0, true);
                        }
                        break;
                    case KEY.DOWN:
                        event.preventDefault();
                        if (select.visible()) {
                            select.next();
                        } else {
                            onChange(0, true);
                        }
                        break;
                    case KEY.PAGEUP:
                        event.preventDefault();
                        if (select.visible()) {
                            select.pageUp();
                        } else {
                            onChange(0, true);
                        }
                        break;
                    case KEY.PAGEDOWN:
                        event.preventDefault();
                        if (select.visible()) {
                            select.pageDown();
                        } else {
                            onChange(0, true);
                        }
                        break;
                    // matches also semicolon
                    case options.multiple && jQuery.trim(options.multipleSeparator) == ","/* && KEY.COMMA: case KEY.TAB*/
                    :
                    case KEY.RETURN:
                        event.preventDefault();
                        jQuerytarget.removeAttr("dontFocus2Next");
                        if (!jQuerytarget.val()) {
                            return;
                        }

                        if (jQuerytarget.attr("prevSelected") === jQuerytarget.val()) {
                            return;
                        }

                        if (selectCurrent()) {
                            // stop default to prevent a form submit, Opera needs special handling
                            blockSubmit = true;
                            jQuerytarget.attr("dontFocus2Next", true);
                            return false;
                        }

                        if (opts.enterSearch) { // 回车查询
                            jQuerytarget.attr("dontFocus2Next", true);
                            onChange(0, true);
                        }
                        break;
                    case KEY.ESC:
                        select.hide();
                        break;
                    default:
						if(event.ctrlKey && event.keyCode==17)return;
                    	jQuerytarget.removeAttr("prevSelected")
                        clearTimeout(timeout);
                    	if(!options.autoSearch) {
                            select.hide();
                    		return;
                    	}
                        //timeout = setTimeout(onChange, options.delay);
						timeout = setTimeout(function(){
							onChange(0, true); 	//输入了就重新查询，不判断是否和原先一样的值，需求UAS-37
						}, options.delay);
                        break;
                }
            }).focus(function () {
                // track whether the field has focus, we shouldn't process any
                // results if the field no longer has focus
                hasFocus++;
                if (typeof(hideSearchOptions) == "function") {
                    hideSearchOptions();
                }
            }).blur(function () {
                hasFocus = 0;
                if (!config.mouseDownOnSelect) {
                    hideResults();
                    if ($(this).val() !== options.value) {
                        options.onChange.call(this, $(this).val(), options.value);
                    }
                    options.value = $(this).val();
                }

                //mustMatch逻辑报错，我在这里重写了 @author liuqing 2015-3-24
                if(options.mustMatch) {
                    var isMatch = false,
                        jqVal = jQuerytarget.val();
                    $.each(cache.data, function(key, cacheArr) {
                        $.each(cacheArr, function(i, tObj) {
                            if(tObj.key === jqVal) {
                                isMatch = true;
                                return false;
                            }
                        });

                        if(isMatch) {
                            return false;
                        }
                    });

                    if(!isMatch) {
                        jQuerytarget.val("");
                    }
                }

                options.onBlur.call(this, $(this).val());

            }).click(function () {
                // show select when clicking in a focused field
                if (hasFocus++ > 1 && !select.visible()) {
                    onChange(0, true);
                }
            }).bind("search", function () {
                var fn = (arguments.length > 1) ? arguments[1] : null;
                function findValueCallback(q, data) {
                    var result;
                    if (data && data.length) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].result.toLowerCase() == q.toLowerCase()) {
                                result = data[i];
                                break;
                            }
                        }
                    }
                    if (typeof fn == "function") fn(result);
                    else jQuerytarget.trigger("result", result && [result.data, result.value]);
                }

                jQuery.each(trimWords(jQuerytarget.val()), function (i, value) {
                    request(value, findValueCallback, findValueCallback);
                });
            }).bind("flushCache",
            function () {
                cache.flush();
            }).bind("setOptions", function () {
                jQuery.extend(options, arguments[1]);
                // if we've updated the data, repopulate
                if ("data" in arguments[1]) cache.populate();
            }).bind("unautocomplete", function () {
                select.unbind();
                jQuerytarget.unbind();
                jQuery(target.form).unbind(".autocomplete");
            });
        $(document).bind("mousedown.autocomplete", function (e) {
            if (!$(e.target).closest("div.ac_results").length) {	//隐藏下拉panel
                select.hide();
            }
            var $searchOptions = state.searchOptions;
            if ($searchOptions) {
                if (!$searchOptions.is(":hidden")) {
                    var autocompletePanel = $("body>div.panel>div.auto-search-options");
                    var p = $(e.target).closest("div.auto-search-options", autocompletePanel);
                    if (p.length) {
                        return;
                    }
                    hideSearchOptions();
                }
            }
        });

        $(target).validatebox(options);

        if(options.hiddenField) {
            options.$hiddenField = $("<input type='hidden' name='" + options.hiddenField + "' />").insertAfter(target);
        }

        function selectCurrent() {
            var selected = select.selected();
            if (!selected) return false;
            var v = selected.searchTypeResult || selected.result;
            previousValue = v;
            if (options.multiple) {
                var words = trimWords(jQuerytarget.val());
                if (words.length > 1) {
                    v = words.slice(0, words.length - 1).join(options.multipleSeparator) + options.multipleSeparator + v;
                }
                v += options.multipleSeparator;
            }

            jQuerytarget.val(v).attr("prevSelected", v);
            if(options.$hiddenField && options.$hiddenField.length) {
                options.$hiddenField.val(selected.original[options.hiddenField] || "");
            }

            hideResultsNow();
            jQuerytarget.trigger("result", [selected.data, selected.value]);
            return true;
        }

        function onChange(crap, skipPrevCheck) {
            if (lastKeyPressCode == KEY.DEL) {
                select.hide();
                return;
            }
            var currentValue = jQuerytarget.val().replace(/\'*/g, "");
            if (!skipPrevCheck && currentValue == previousValue) return;
            previousValue = currentValue;
            currentValue = lastWord(currentValue);
            checkResultValidate(target, true);  //值有变动时去掉查询匹配结果的验证

            var minLenght = options.minLength;
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(currentValue)){
                minLenght = minLenght/2;  //输入汉字的长度判断直接对半
            }
            if (validate(jQuerytarget[0]) && currentValue.length >= minLenght) {
                jQuerytarget.addClass(options.loadingClass);
                if (!options.matchCase) currentValue = currentValue.toLowerCase();
				request(currentValue, receiveData, hideResultsNow);
            } else {
                stopLoading();
                select.hide();
            }
        }

        function trimWords(value) {
            if (!value) {
                return [""];
            }
            var words = value.split(options.multipleSeparator);
            var result = [];
            jQuery.each(words,
                function (i, value) {
                    if (jQuery.trim(value)) result[i] = jQuery.trim(value);
                });
            return result;
        }

        function lastWord(value) {
            if (!options.multiple) return value;
            var words = trimWords(value);
            return words[words.length - 1];
        }

        // fills in the target box w/the first match (assumed to be the best match)
        // q: the term entered
        // sValue: the first matching result
        function autoFill(q, sValue) {
            // autofill in the complete box w/the first match as long as the user hasn't entered in more data
            // if the last user key pressed was backspace, don't autofill
            if (options.autoFill && (lastWord(jQuerytarget.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
                // fill in the value (keep the case the user has typed)
                jQuerytarget.val(jQuerytarget.val() + sValue.substring(lastWord(previousValue).length));
                // select the portion of the value not typed by the user (so the next character will erase)
                selection(target, previousValue.length, previousValue.length + sValue.length);
            }
        };

        function hideResults() {
            clearTimeout(timeout);
            timeout = setTimeout(hideResultsNow, 200);
        };

        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide();
            clearTimeout(timeout);
            stopLoading();
//            if (options.mustMatch) {
                // call search and run callback
//                jQuerytarget.search(function (result) {
//                    // if no value found, clear the target box
//                    if (!result) {
//                        if (options.multiple) {
//                            var words = trimWords(jQuerytarget.val()).slice(0, -1);
//                            jQuerytarget.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""));
//                        } else jQuerytarget.val("");
//                    }
//                });
//            }
            if (wasVisible) {
                if (options.focusAfterSelect) {
                    // position cursor at end of target field
                    selection(target, target.value.length, target.value.length);
                }
                options.onClose.call(this, target);
            }
        };

        function receiveData(q, data) {
            if (data && data.length && hasFocus) {
                stopLoading();
                select.display(data, q);
                autoFill(q, data[0].value);
                select.show();
            } else {
                hideResultsNow();
            }
        };

        function request(term, success, failure) {
            if (!options.matchCase) term = term.toLowerCase();
            var data = cache.load(term);
            // recieve the cached data
            if (options.useCache && data && data.length) {
                success(term, data);
                // if an AJAX url has been supplied, try loading the data now
            } else if ((typeof options.url == "string") && (options.url.length > 0)) {
                var extraParams = {
                    timestamp: +new Date()
                };
                jQuery.each(options.extraParams,
                    function (key, param) {
                        extraParams[key] = typeof param == "function" ? param() : param;
                    });
                var req = options.req;
                $.extend(req[0], options.extraParams);
                req[0].pagecount = options.max;
                req[0].sourceField = options.sourceField;
                if(field!=undefined){
                    if (req[0][field] == undefined) {
                        req[0][field] = options.searchType.data[0].value;
                    }
                }
                var a = options.params;
                if (a) {
                    req[0][a] = term;
                }
                ajaxRequest({
                    dataType: options.dataType,
                    url: options.url,
                    req: req,
                    func: function (data) {
						if(term != jQuerytarget.val()){
							return;
						}
                        opts.tampData = data.length > 0 ? data[0] : [];
                        var parsed = options.parse && options.parse(data) || parse(data);
                        cache.add(term, parsed);
                        success(term, parsed);
                        options.onResponse.call(target, data);
                        if (opts.tampData.length == 0) {
                            var msg = "无检索记录,请输入正确的检索值！";                            
                            $(target).validatebox("showTip",msg);   
                                                                                                          
                            checkResultValidate(target, false, msg);
                            options.onNoRecords.call(this);
                        }
                    }
                });

            } else {
                // if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
                select.emptyList();
                failure(term);
            }
        };
        //检测查询结果匹配是否正确且把结果给输入框的验证 
        //isRemove ? 删除验证：添加验证
        function checkResultValidate(target, isRemove, msg) {
            if (options.isResultValid) {
                var noAccord = "noAccord",
                    validType = $.data(target, "validatebox").options.validType || "";
                if (isRemove) {
                    validType = validType.replace(/(;?)noAccord/g, "");
                    $(target).validatebox({
                        validType: validType
                    });
                } else {
                    $.fn.validatebox.defaults.rules[noAccord] = {
                        validator: function () {
                            return false;
                        },
                        message: msg
                    }
                    $(target).validatebox({
                        validType: validType ? validType + ";" + noAccord : noAccord
                    });
                }
            }
        };

        function parse(data) {
            var parsed = [];
            var rows = data[0];
            var valueFiled = options.sourceField;

            var keyField = options.keyField;
            for (var i = 0; i < rows.length; i++) {
                var dispField = "";
                valueFileds = valueFiled.split(",");
                for (var j = 0; j < valueFileds.length; j++) {
                    dispField += (typeof(rows[i][valueFileds[j]]) == "undefined" ? "" : rows[i][valueFileds[j]]) + "   ";
                }
                parsed[parsed.length] = {
                    data: dispField,
                    key: rows[i][keyField],
                    value: rows[i][keyField],
                    result: rows[i][keyField],
                    original: rows[i]
                };
            }
            return parsed;
        };

        function stopLoading() {
            jQuerytarget.removeClass(options.loadingClass);
        };

        options.onInitSuccess.call(null, options, target);
    };

    function autoCache(options) {

        var data = {};
        var length = 0;

        function matchSubset(s, sub) {
            if (!options.matchCase) s = s.toLowerCase();
            var i = s.indexOf(sub);
            if (i == -1) return false;
            return i == 0 || options.matchContains;
        };

        function add(q, value) {
            if (length > options.cacheLength) {
                flush();
            }
            if (!data[q]) {
                length++;
            }
            data[q] = value;
        }

        function populate() {
            if (!options.data) return false;
            // track the matches
            var stMatchSets = {},
                nullData = 0;

            // no url was specified, we need to adjust the cache length to make sure it fits the local data store
            if (!options.url) options.cacheLength = 1;

            // track all options for minLength = 0
            stMatchSets[""] = [];

            // loop through the array and create a lookup structure
            for (var i = 0,
                     ol = options.data.length; i < ol; i++) {
                var rawValue = options.data[i];
                // if rawValue is a string, make an array otherwise just reference the array
                rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;

                var value = options.formatMatch(rawValue, i + 1, options.data.length);
                if (value === false) continue;

                var firstChar = value.substr(0, options.minLength).toLowerCase();
                // if no lookup array for this character exists, look it up now
                if (!stMatchSets[firstChar]) stMatchSets[firstChar] = [];

                // if the match is a string
                var row = {
                    value: value,
                    data: rawValue,
                    result: options.formatResult && options.formatResult(rawValue) ||rawValue[options.keyField]|| value
                };

                // push the current match into the set list
                stMatchSets[firstChar].push(row);

                // keep track of minLength zero items
                if (nullData++ < options.max) {
                    stMatchSets[""].push(row);
                }
            };

            // add the data items to the cache
            jQuery.each(stMatchSets,
                function (i, value) {
                    // increase the cache size
                    options.cacheLength++;
                    // add to the cache
                    add(i, value);
                });
        }

        // populate any existing data
        setTimeout(populate, 25);
        function flush() {
            data = {};
            length = 0;
        }

        return {
            data: data,
            flush: flush,
            add: add,
            populate: populate,
            load: function (q) {
                if (!options.cacheLength || !length) return null;
                /* 
                 * if dealing w/local data and matchContains than we must make sure
                 * to loop through all the data collections looking for matches
                 */
                if (!options.url && options.matchContains) {
                    // track all matches
                    var csub = [];
                    // loop through all the data grids for matches
                    for (var k in data) {
                        // don't search through the stMatchSets[""] (minLength: 0) cache
                        // this prevents duplicates
                        if (k.length > 0) {
                            var c = data[k];
                            jQuery.each(c,
                                function (i, x) {
                                    // if we've got a match, add it to the array
                                    if (matchSubset(x.value, q)) {
                                        csub.push(x);
                                    }
                                });
                        }
                    }
                    return csub;
                } else
                // if the exact item exists, use it
                if (data[q]) {
                    return data[q];
                } else if (options.matchSubset) {
                    for (var i = q.length - 1; i >= options.minLength; i--) {
                        var c = data[q.substr(0, i)];
                        if (c) {
                            var csub = [];
                            jQuery.each(c,
                                function (i, x) {
                                    if (matchSubset(x.value || x.data, q)) {
                                        csub[csub.length] = x;
                                    }
                                });
                            return csub;
                        }
                    }
                }
                return null;
            }
        };
    };

    function creatSelect(options, input, select, config) {
        var CLASSES = {
            ACTIVE: "ac_over"
        };

        var listItems, active = -1,
            data, term = "",
            needsInit = true,
            element, 
	    list, 
	    searchType = options.searchType;

        // Create results
        function init() {
            if (!needsInit) return;
            element = jQuery("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);

            list = jQuery("<ul/>").appendTo(element).mouseover(function (event) {
                if (target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
                    active = jQuery("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
                    jQuery(target(event)).addClass(CLASSES.ACTIVE);
                }
            }).click(function (event) {
                jQuery(target(event)).addClass(CLASSES.ACTIVE);
                select();
                if (options.focusAfterSelect)
                    input.focus();
                return false;
            }).mousedown(function () {
                config.mouseDownOnSelect = true;
            }).mouseup(function () {
                config.mouseDownOnSelect = false;
            });
			
            if (options.panelWidth > 0) element.css("width", options.panelWidth);

            needsInit = false;
        }

        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI") element = element.parentNode;
            // more fun with IE, sometimes event.target is empty, just ignore it then
            if (!element) return [];
            return element;
        }

        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
            movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if (options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function () {
                    offset += this.offsetHeight;
                });
                if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
                } else if (offset < list.scrollTop()) {
                    list.scrollTop(offset);
                }
            }
        };

        function movePosition(step) {
            active += step;
            if (active < 0) {
                active = listItems.size() - 1;
            } else if (active >= listItems.size()) {
                active = 0;
            }
        }

        function limitNumberOfItems(available) {
            return options.max && options.max < available ? options.max : available;
        }

        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            var field = options.searchType ? options.searchType.field:options.keyField;
            var typeValue;
            if(searchType!=undefined){
				 var MSG_FLAG = options.req[0][field];
                for (var aa = 0; aa < searchType.data.length; aa++) {
                    if (searchType.data[aa].value == MSG_FLAG) {
                        typeValue = searchType.data[aa].field;
                    }
                }
            }
            for (var i = 0; i < max; i++) {
                if (!data[i]) continue;
                var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
                var key;
                if (typeValue) {
                    key = data[i].original[typeValue];
                } else {
                    key = data[i].key;
                }
				if(!key)key = term;
                if (formatted === false) continue;
                var li = jQuery("<li/>").html(options.highlight(formatted, term, key)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                jQuery.data(li, "ac_data", data[i]);
            }
            listItems = list.find("li");
            if (options.selectFirst) {
                listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
                active = 0;
            }
            // apply bgiframe if available
            if (jQuery.fn.bgiframe) list.bgiframe();
        }

        return {
            display: function (d, q) {
                init();
                data = d;
                term = q;
                fillList();
            },
            next: function () {
                moveSelect(1);
            },
            prev: function () {
                moveSelect(-1);
            },
            pageUp: function () {
                if (active != 0 && active - 8 < 0) {
                    moveSelect(-active);
                } else {
                    moveSelect(-8);
                }
            },
            pageDown: function () {
                if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
                    moveSelect(listItems.size() - 1 - active);
                } else {
                    moveSelect(8);
                }
            },
            hide: function () {
                element && element.hide();

                listItems && listItems.removeClass(CLASSES.ACTIVE);
                active = -1;
            },
            visible: function () {
                return element && element.is(":visible");
            },
            current: function () {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
            },
            show: function () {
                var offset = jQuery(input).offset();
                var tempwidth = parseInt(options.panelWidth);
                tempwidth = tempwidth > jQuery(input).width() ? tempwidth : (jQuery(input).width() + 4);
                var left = (tempwidth + offset.left) > ($(window).width() + $(document).scrollLeft()) ? (offset.left + jQuery(input).width() - tempwidth) : offset.left;
                element.css({
                    width: tempwidth,
                    top: offset.top + input.offsetHeight,
                    left: left
                }).show();
                if (options.scroll) {
                    list.scrollTop(0);
                    list.css({
                        maxHeight: options.scrollHeight,
                        overflow: 'auto'
                    });

                    if (jQuery.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var listHeight = 0;
                        listItems.each(function () {
                            listHeight += this.offsetHeight;
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight);
                        if (!scrollbarsVisible) {
                            // IE doesn't recalculate width when scrollbar disappears
                            listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")));
                        }
                    }

                }
                //by 赵帅军 2018/10/29
                $(input).removeAttr('dontFocus2Next');
                options.onCreate.call(this, element);
            },
            selected: function () {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE),
                    result;
                if (selected && selected[0]) {
                    var $data = $.data(selected[0], "ac_data");
                    if (options.searchType) {
                        if(options.resetSearchType) {
                            result = $data.original[options.searchTypeKeyField];
                            $.data(input, "autocomplete").searchOptions.find("li[field='" + options.searchTypeKeyField + "']").click();
                        } else {
                            result = (function() {
                                var searchTypeVal = $(input).parent().find("div.auto-search-box").find("a:first").attr("value"),
                                    searchTypeObj = $.grep(options.searchType.data || [], function(data) {
                                        return searchTypeVal == data.value;
                                    })[0];

                                return searchTypeObj ? $data.original[searchTypeObj.field] : $data['key'];
                            })();
                        }

                    }
                    //by 赵帅军 2018/10/29
                    $(input).attr("dontFocus2Next", true);
                    $(input).autocomplete("options").onSelect.call(this, $data['key'], $data.original);
                }

                return $.extend({}, $data, {searchTypeResult: result});
            },
            emptyList: function () {
                list && list.empty();
            },
            unbind: function () {
                element && element.remove();
            }
        };
    };
    function selection(field, start, end) {
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart("character", start);
            selRange.moveEnd("character", end);
            selRange.select();
        } else if (field.setSelectionRange) {
            field.setSelectionRange(start, end);
        } else {
            if (field.selectionStart) {
                field.selectionStart = start;
                field.selectionEnd = end;
            }
        }
        field.focus();
    };

    function destroyBox(target) {
        var state = $.data(target, "autocomplete");
        var select = state.select;
        if (select) {
            select.remove();
        }
        $(target).unbind();
        $(target).remove();
    };

    function close(target) {
        var state = $.data(target, "autocomplete");
        var select = state.select;
        if (select) {
            select.remove();
        }
        $(target).unbind();
    };

    function setDisabled(target, disabled) {
        var opts = $.data(target, "autocomplete").options;
        var disabled = String(disabled);
        if (disabled == "true") {
            opts.disabled = true;
            $(target).attr("disabled", true);

        } else {
            opts.disabled = false;
            $(target).removeAttr("disabled");

        }
    };
    function validate(target) {
        var opts = $.data(target, "autocomplete").options;
        var textbox = $(target);
        var isValid = textbox.validatebox('isValid');
        return isValid;
    }

    function showTip(target, msg) {
        var box = $(target);
        var pos = box.offset();
        $("body").find(".validatebox-tip").css('display', 'none');
        var tip = $.data(target, "autocomplete").tip;
        if (!tip) {
            tip = $("<div class=\"validatebox-tip\">" + "<div class=\"validatebox-tip-content\"></div>" + "<div class=\"validatebox-tip-pointer\"></div>" + "</div>").appendTo("body");
            $.data(target, "autocomplete").tip = tip;
        }
        tip.find(".validatebox-tip-content").html(msg);
        tip.css({
            left: pos.left + 20,
            top: pos.top - tip.outerHeight() + 7
        }).show();
    };

    function hideTip(target) {
        var obj = $.data(target, "autocomplete");
        if (!obj) return;
        var tip = obj.tip;
        if (tip) {
            tip.remove();
            obj.tip = null;
        }
    };

    function setValue(target, value) {
        $(target).val(value);
    }

    function clear(target) {
        $(target).val("");
    }
})(jQuery);