/**
 * query - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 	 menubutton
 * 
 */
(function($) {
    $.fn.query = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.query.methods[options](this, param);
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'query');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'query', {
                    options: $.extend({},
                    $.fn.query.defaults, $.fn.query.parseOptions(this), options),
                    query: init(this)
                });
            }
            initValue(this);
            bindEvents(this);
            setSize(this);
            setEditable(this, state.options.editable);
            setDisabled(this, state.options.disabled);
        });
    };

    $.fn.query.methods = {
        options: function(jq) {
            return $.data(jq[0], 'query').options;
        },
        textbox: function(jq) {
            return $.data(jq[0], 'query').query.find('input.searchbox-text');
        },
        getValues: function(jq) {
            return $.data(jq[0], 'query').options.value;
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                $(this).query('options').value = value;
                $(this).query('textbox').val(value);
                $(this).query('textbox').blur();
            });
        },
        clear: function(jq) {
            jq.query('options').value = "";
            jq.query('textbox').val("");
            jq.query('textbox').blur();
        },
        getName: function(jq) {
            return $.data(jq[0], 'query').query.find('input.searchbox-text').attr('name');
        },
        destroy: function(jq) {
            return jq.each(function() {
                $.data(this, 'query').query.remove();
                $(this).remove();
            });
        },
        setValues: function(jq, value) {
            var values = "";

            for (var i = 0; i < value.length; i++) {
                values += value[i] + jq.query('options').separator;
            }
            values = values.substr(0, values.length - 1);
            return jq.each(function() {
                setValues(jq, value);
            });
        },
        check: function(jq, value) {
            return jq.each(function() {
                check(jq, value);
            });
        },
        UnCheck: function(jq, value) {
            return jq.each(function() {
                UnCheck(jq, value);
            });
        },
        resize: function(jq, width) {
            return jq.each(function() {
                setSize(this, width);
            });
        }
    };

    $.fn.query.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        {
            width: (parseInt(target.style.width) || undefined),
            value: t.val()
        },
        $.parser.parseOptions(target, ['width', 'title', 'valueFiled', 'disabled', 'domId', 'multiple', 'separator', 'editable', 'dialogWidth', 'dialogHeight', 'modal', 'dialogTop', 'dialogLeft']));
    };

    $.fn.query.defaults = {
        width: 'auto',
        title: '请选择',
        value: '',
        domId: "",
        domType: "",
        dialogWidth: "auto",
        dialogHeight: "auto",
        multiple: true,
        separator: ",",
        editable: true,
        disabled: false,
        valueFiled: 'value',
        modal: true,
        url: '',
        openIframe: 0,
        onSelect: function(node) {},
        onCheck: function(node, state) {},
        searcher: function(value, name) {}
    };

    function init(target) {
        $(target).hide();
        var dialogId = "query-dialog" + new Date().getTime();
        var searchBar = ['<span class="searchbox">',
                         '<input type="text" dialogId="'+dialogId+'" class="searchbox-text">',
                         '<input type="hidden" name="dataId">',
                         '<span><span class="searchbox-button"></span></span>',
                         "<div id=\"" + dialogId + "\"class=\"query-dialog\" hidden=\"hidden\"></div>",
                         "</span>"
                         ];
        var $searchBar = $(searchBar.join(""));
        $searchBar.insertAfter(target);
        var name = $(target).attr('name');
        if (name) {
            $("input.searchbox-text",$searchBar).attr('name', name);
            $(target).removeAttr('name').attr('searchboxName', name);
        }
        return $searchBar;
    }

    function setSize(target, width) {
        var opts = $.data(target, 'query').options;
        var sb = $.data(target, 'query').query;
        if (width) opts.width = width;
        sb.appendTo('body');

        if (isNaN(opts.width)) {
            opts.width = sb._outerWidth();
        }
        sb._outerWidth(opts.width);
        sb.find('input.searchbox-text')._outerWidth(sb.width() - sb.find('a.searchbox-menu')._outerWidth() - sb.find('span.searchbox-button')._outerWidth());

        sb.insertAfter(target);
    }

    function bindEvents(target) {
        var state = $.data(target, 'query');
        var opts = state.options;
        var input = state.query.find('input.searchbox-text');
        var button = state.query.find('.searchbox-button');
        input.unbind('.searchbox').bind('blur.searchbox',
        function(e) {
            opts.value = $(this).val();
            if (opts.value == '') {
                $(this).val(opts.prompt);
                $(this).addClass('searchbox-prompt');
            } else {
                $(this).removeClass('searchbox-prompt');
            }
        }).bind('focus.searchbox',
        function(e) {
            if ($(this).val() != opts.value) {
                $(this).val(opts.value);
            }
            $(this).removeClass('searchbox-prompt');
        }).bind('keydown.searchbox',
        function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                var name = $.fn.prop ? input.prop('name') : input.attr('name');
                opts.value = $(this).val();
                opts.searcher.call(target, opts.value, name);
                return false;
            }
        });

        button.unbind('.searchbox').bind('click.searchbox',
        function() {
            var name = $.fn.prop ? input.prop('name') : input.attr('name');
            opts.searcher.call(target, opts.value, name);
            createDialog(target);
        }).bind('mouseenter.searchbox',
        function() {
            $(this).addClass('searchbox-button-hover');
        }).bind('mouseleave.searchbox',
        function() {
            $(this).removeClass('searchbox-button-hover');
        });
    }

    //将dom或者页面load进dialog
    function contentLoadDom(options, jq, idString, dialogId) {
        var domObj = $("#" + idString);
        if (domObj) {
            domObj.appendTo(jq);
            domObj.removeAttr("hidden");
        }
        
        $(jq).load(options.url + " #" + options.domId,
        function(response,status,xhr) {
        	if(status == "success"){
        		$.parser.parse($('#' + options.domId).parent());
                if (options.domType === "tree") {
                    $(" #" + options.domId).tree({
                        onSelect: options.onSelect,
                        onCheck: options.onCheck
                    });
                } else {
                    $(" #" + options.domId).datagrid({
                        onSelect: options.onSelect,
                        onCheck: options.onCheck
                    });
                }
        	}else{
        		//TODO error handler
        	}
        });
        /*
	  	if(options.url&&options.openIframe===0){
	  		var ifameObj=$("<iframe id=\"iframe_"+dialogId+"\" name=\"dialog_iframe\"  width=\"100%\" height=\"99%\" frameborder=\"0\" src=\""+options.url+"\"></iframe>").appendTo(jq);
	 		options.openIframe++;
	  		var domObj=$(ifameObj).find("#"+options.domId);
	  		if(options.domType==="tree"){
		  		domObj.tree({
		  			onSelect:options.onSelect,
				    onCheck:options.onCheck
		  		})
	  	   	}else{
		  	 	domObj.datagrid({
		  			onSelect:options.onSelect,
				    onCheck:options.onCheck
		  		})
	  	   	} 
	  	}*/
    }
    function setEvent(ifameObj, options) {
        var dom = $('#' + options.domId);
        if (options.domType === "tree") {
            dom.tree({
                onSelect: options.onSelect,
                onCheck: options.onCheck
            });
        } else {
            dom.datagrid({
                onSelect: options.onSelect,
                onCheck: options.onCheck
            });
        }
        clearTimeout(this);
    }
    //点击按钮，生成dialog
    function createDialog(target) {
        var state = $.data(target, 'query');
        var opts = state.options;
        var dialogId = state.query.find("input[type='text']").attr("dialogId");
        var dialgDiv = $(state.query).find(".query-dialog");
        if (dialgDiv.length !== 0) {
            kuiloader.load('dialog',
            function() {
                dialgDiv.removeAttr("hidden").dialog($.extend({},
                opts, {
                    buttons: [{
                        text: '确定',
                        handler: function() {
                            var values = getValues(target, dialgDiv, opts);
                            $(target).query("setValues", values);
                            dialgDiv.dialog("close");
                        }
                    },
                    {
                        text: '取消',
                        handler: function() {
                            dialgDiv.dialog("close");
                        }
                    }],
                    width: opts.dialogWidth,
                    height: opts.dialogHeight,
                    top: opts.dialogTop,
                    left: opts.dialogTop,
                    closed: false,
                    minimizable: true,
                    maximizable: true,
                    resizable: true,
                    cache: false
                }));
            });
            $("#show-dialog-btmbutton").removeAttr("hidden");
            var dialogContent = $("#" + dialogId).find(".dialog-content")[0];
            contentLoadDom(opts, dialogContent, opts.domId, dialogId);
        } else {
            $("#" + dialogId).dialog("open");
        }

    }
    //取得用户选择的数据
    function getValues(target, dialgDiv, opts) {
        var values = {};
        var value = "";
        var id = "";
        var domObj = $('#' + opts.domId);

        if (opts.domType === "tree") {
            if (!opts.multiple) {
                var selectValue = domObj.tree("getSelected");
                value = selectValue.text;
                id = selectValue.id;
            } else {
                var valueArray = domObj.tree("getChecked");
                for (var x in valueArray) {
                    value += valueArray[x].text + opts.separator;
                    id += valueArray[x].id + opts.separator;

                }
                value = value.substr(0, value.length - 1);
                id = id.substr(0, value.length - 1);
            }
        }
        if (opts.domType === "datagrid") {
            if (opts.multiple) {
                var valueArray = domObj.datagrid("getSelections");
                for (var i = 0; i < valueArray.length; i++) {
                    value += valueArray[i][opts.valueFiled] + opts.separator;
                    id += valueArray[i][opts.id] + opts.separator;
                }
                value = value.substr(0, value.length - 1);
                id = id.substr(0, value.length - 1);
            } else {
                values = domObj.datagrid("getSelected")[opts.valueFiled];
            }
        }
        values.value = value;
        values.id = id;
        return values;
    }
    function setValues(target, values) {
        var queryObj = $.data(target[0], 'query').query;
        $(queryObj).find('input[type="text"]').val(values.value);
        $(queryObj).find('input[type="hidden"]').val(values.id);
        $.data(target[0], 'query').options.value = values.value;
    }
    function initValue(target) {
        var state = $.data(target, 'query');
        var opts = state.options;
        var input = state.query.find('input.searchbox-text');
        if (opts.value == '') {
            input.val(opts.prompt);
            input.addClass('searchbox-prompt');
        } else {
            input.val(opts.value);
            input.removeClass('searchbox-prompt');
        }
    }

    function check(target, value) {
        var opts = $.data(target[0], 'query').options;
        var domObj = $('#' + opts.domId);
        if (opts.domType === "tree") {
            var idTarget = domObj.tree('find', value);
            if (idTarget) {
                domObj.tree('check', idTarget.target);
            }
        } else {
            domObj.datagrid('checkRow', value - 1);
        }

    }

    function UnCheck(target, value) {
        var opts = $.data(target[0], 'query').options;
        var domObj = $('#' + opts.domId);
        if (opts.domType === "tree") {
            var idTarget = domObj.tree('find', value);
            if (idTarget) {
                domObj.tree('check', idTarget.target);
            }
        } else {
            domObj.datagrid('uncheckRow', value - 1);
        }
    }

    //设置组件是否可用
    function setDisabled(target, disabled) {
        var disabled = String(disabled);
        if (disabled === "true") {
            var queryObj = $.data(target, 'query').query;
            $(queryObj).find('input[type="text"]').attr("disabled", "disabled");
            $(queryObj).find('.searchbox-button').unbind();
        }
    };

    //设置组件文本框是否可以编辑
    function setEditable(target, editable) {
        var editable = String(editable);
        if (editable === "false") {
            var queryObj = $.data(target, 'query').query;
            $(queryObj).find('input[type="text"]').attr("disabled", "disabled");

        }
    };
})(jQuery);