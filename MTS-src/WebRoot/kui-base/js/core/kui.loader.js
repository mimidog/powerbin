/**
 * kui-loader - KINGDOM-UI 
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * 
 */

(function() {
	kuiloader = {
        modules: modules,
        locales: locales,
        base: '../../kui-base/',
		debug: true,
        theme: 'trans',
        css: true,
        locale: 'zh_CN',
        timeout: 2000,
		
        load: function(name, callback , flag, param) {
            if (/\.css$/i.test(name)) {
                if (/^http/i.test(name)) {
                    loadCss(name, callback);
                } else {								
                    loadCss(kuiloader.base + 'themes/' + kuiloader.theme + '/' + name, callback);
                }
            } else if (/\.js$/i.test(name)) {
                if (/^http/i.test(name)) {
                    loadJs(name, callback);
                } else {				
                    loadJs(name, callback);
                }
            } else {
                loadModule(name, callback , flag, param);
            }
        },

        onBeforeAutoDirect: $.noop,

        onProgress: function(name) {},

        onLoad: function(name) {},

		onReady:function(){}
    };
    var modules = {
    	//kui plugins
        draggable: {
            js: 'jquery.draggable.js'
        },
        portal: {
            js: 'jquery.portal.js',
            css: 'portal.css',
            dependencies: ['panel', 'draggable']
        },
        droppable: {
            js: 'jquery.droppable.js'
        },
        resizable: {
            js: 'jquery.resizable.js'
        },
        linkbutton: {
            js: 'jquery.linkbutton.js',
            css: 'linkbutton.css'
        },
        progressbar: {
            js: 'jquery.progressbar.js',
            css: 'progressbar.css'
        },
        pagination: {
            js: 'jquery.pagination.js',
            css: 'pagination.css',
            dependencies: ['linkbutton','menu']
        },
		statistics: {
            js: 'jquery.statistics.js'
        },
        datagrid: {
            js: 'jquery.datagrid.js',
            css: 'datagrid.css',
            dependencies: ['panel', 'resizable', 'linkbutton', 'pagination', 'form', 'draggable', 'localstorage', 'report','statistics']
        },
        reportgrid: {
            js: 'jquery.reportgrid.js',
            css: 'reportgrid.css',
            dependencies: ['panel', 'resizable', 'linkbutton', 'pagination', 'form', 'draggable', 'localstorage', 'report']
        },
        localstorage:{
        	js: 'jquery.localstorage.js'
        },
        report : {
			js : 'jquery.report.js',
			css : 'report.css',
			dependencies : [ 'dialog' ]
		},
        treegrid: {
            js: 'jquery.treegrid.js',
            css: 'tree.css',
            dependencies: ['datagrid']
        },
        propertygrid: {
            js: 'jquery.propertygrid.js',
            css: 'propertygrid.css',
            dependencies: ['datagrid']
        },
        panel: {
            js: 'jquery.panel.js',
            css: 'panel.css',
            dependencies: ['resizable']
        },
        window: {
            js: 'jquery.window.js',
            css: 'window.css',
            dependencies: ['resizable', 'draggable', 'panel']
        },
        dialog: {
            js: 'jquery.dialog.js',
            css: 'dialog.css',
            dependencies: ['linkbutton', 'window']
        },
        message: {
            js: 'jquery.message.js',
			css: 'message.css',
            dependencies: ['draggable', 'resizable', 'panel', 'linkbutton', 'window', 'progressbar']
        },
        prompt: {
            js: 'jquery.prompt.js',
            dependencies: ['linkbutton', 'window', 'progressbar']
        },
        layout: {
            js: 'jquery.layout.js',
            css: 'layout.css',
            dependencies: ['resizable', 'panel']
        },
        form: {
            js: 'jquery.form.js',
			css: 'form.css',
            dependencies: ['panel', 'fieldset', 'linkbutton', 'textinput', 'validatebox', 'textarea', 'numberbox', 'combobox', 'datebox', 'datetimebox', 'timespinner', 'uploadify', 'autocomplete', 'combotree','obviousbox']
        },
        sform: {
        	js: 'jquery.sform.js',
	      	css: 'sform.css',
        	dependencies: ['form']
        },
        menu: {
            js: 'jquery.menu.js',
            css: 'menu.css'
        },
        tabs: {
            js: 'jquery.tabs.js',
            css: 'tabs.css',
            dependencies: ['panel', 'linkbutton']
        },
        splitbutton: {
            js: 'jquery.splitbutton.js',
            css: 'splitbutton.css',
            dependencies: ['linkbutton', 'menu']
        },
        menubutton: {
            js: 'jquery.menubutton.js',
            css: 'menubutton.css',
            dependencies: ['linkbutton', 'menu']
        },
        accordion: {
            js: 'jquery.accordion.js',
            css: 'accordion.css',
            dependencies: ['panel']
        },
        calendar: {
            js: 'jquery.calendar.js',
            css: 'calendar.css',
			dependencies: ["textinput"]
        },
        combo: {
            js: 'jquery.combo.js',
            css: 'combo.css',
            dependencies: ['panel', 'validatebox']
        },
        combobox: {
            js: 'jquery.combobox.js',
            css: 'combobox.css',
            dependencies: ['combo']
        },
        softkeyboard: {
            js: 'jquery.softkeyboard.js',
            dependencies: ['combo']
        },
        colorpicker: {
            js: 'jquery.colorpicker.js',
            dependencies: ['combo']
        },
        autocomplete: {
            js: 'jquery.autocomplete.js',
            css: 'autocomplete.css',
            dependencies: ['combobox','validatebox']
        },
        combotree: {
            js: 'jquery.combotree.js',
            dependencies: ['combo', 'tree']
        },
        combogrid: {
            js: 'jquery.combogrid.js',
            dependencies: ['combo', 'datagrid']
        },
        validatebox: {
            js: 'jquery.validatebox.js',
            css: 'validatebox.css'
        },
        textinput: {
            js: 'jquery.textinput.js',
            dependencies: ['validatebox']
        },
        password: {
            js: 'jquery.password.js',
            dependencies: ['validatebox'],
            css: 'password.css'
        },
        textarea: {
            js: 'jquery.textarea.js',
            dependencies: ['validatebox']
        },
        numberbox: {
            js: 'jquery.numberbox.js',
            dependencies: ['validatebox']
        },
        searchbox: {
            js: 'jquery.searchbox.js',
            css: 'searchbox.css',
            dependencies: ['menubutton']
        },
        query: {
            js: 'jquery.query.js',
            css: 'query.css',
            dependencies: ['searchbox', 'dialog', 'datagrid', 'tree']
        },
        spinner: {
            js: 'jquery.spinner.js',
            css: 'spinner.css',
            dependencies: ['validatebox']
        },
        numberspinner: {
            js: 'jquery.numberspinner.js',
            dependencies: ['spinner', 'numberbox']
        },
        timespinner: {
            js: 'jquery.timespinner.js',
            dependencies: ['spinner']
        },
        tree: {
            js: 'jquery.tree.js',
            css: 'tree.css',
            dependencies: ['draggable', 'droppable']
        },
        datebox: {
            js: 'jquery.datebox.js',
            css: 'datebox.css',
            dependencies: ['calendar', 'combo', "textinput"]
        },
        datetimebox: {
            js: 'jquery.datetimebox.js',
            dependencies: ['datebox', 'timespinner']
        },
        slider: {
            js: 'jquery.slider.js',
			css:'slider.css',
            dependencies: ['draggable']
        },
        flow: {
        	js: 'jquery.flow.js',
			css:'flow.css'
        },
        flowlite: {
        	js: 'jquery.flowlite.js',
        	css:'flowlite.css'
        },
        mousewheel: {
        	js: 'jquery.mousewheel.js'
        },
        scrollbox: {
        	js: 'jquery.scrollbox.js',
        	css:'scrollbox.css',
        	dependencies: ['mousewheel', 'draggable']
        },
        sibar: {
        	js: 'jquery.sibar.js',
          	css: 'sibar.css'
        },
        uploadify: {
            js: 'jquery.uploadify.js',
            css: 'uploadify.css'
        },
        fieldset: {
            js: 'jquery.fieldset.js',
            css: 'fieldset.css'
        },
		obviousbox:{
			js:'jquery.obviousbox.js',
			css:'obviousbox.css'
		},
		
		//kui core
        parser: {
            js: 'jquery.parser.src.js',
			jsPath: 'js/core/'
        },
        kuiview: {
            js: 'kui.view.src.js',
            jsPath: 'js/core/',
            dependencies: ['parser']
        },
        kuiencrypt: {
            js: 'des.js',
            jsPath: 'js/core/'
        },
        kuiplugin:{
        	js: 'jquery.plugins.src.js',
            jsPath: 'js/core/'
        },
		checking:{
			js: 'jquery.checking.src.js',
			jsPath: 'js/core/'
		},
        kuicore: {
            js: 'kui.core.src.js',
            jsPath: 'js/core/',
            dependencies: ['checking','kuiplugin','kuiview','kuiencrypt','kuicache']
        },
		kuibiz:{
			js: 'kui.biz.src.js',
            jsPath: 'js/core/'
		},
			
        kuicache: {
            js: 'kui.datacache.src.js',
            jsPath: 'js/core/'
        }
    };
	
	//增加一个非debug模式的模块配置 @author liuqing 2013-11-27
    //非debug模块kui组件，核心组件都压缩合并 @author liuqing 2014-9-11
	var runModules = {
			
		kuiall: {
			js:'kui-all.js',
			css:'kui-all.css',
			dependencies : ["kuicore"]
		},
		
		kuicore: {
			js: 'kui-core.js',
			jsPath: 'js/core/'
		}
	}
	
	modules = kuiloader.debug ? modules : runModules;
	
    var locales = {
        'af': 'kui-lang-af.js',
        'bg': 'kui-lang-bg.js',
        'ca': 'kui-lang-ca.js',
        'cs': 'kui-lang-cs.js',
        'cz': 'kui-lang-cz.js',
        'da': 'kui-lang-da.js',
        'de': 'kui-lang-de.js',
        'en': 'kui-lang-en.js',
        'fr': 'kui-lang-fr.js',
        'nl': 'kui-lang-nl.js',
        'zh_CN': 'kui-lang-zh_CN.js',
        'zh_TW': 'kui-lang-zh_TW.js'
    };

    var queues = {};

    function loadJs(url, callback) {
        var callee = arguments.callee,
            done = false,
            script;

        callback = $.isFunction(callback) ? callback : $.noop;

        if($.isArray(url) && url.length) {
            callee(url.shift(), url.length ? function() {
                callee(url, callback);
            } : callback);
        } else if("string" === $.type(url)){
            done = false;
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.language = 'javascript';
            script.src = url;
            script.onload = script.onreadystatechange = function() {
                if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    callback.call(script);
                }
            };
            document.getElementsByTagName("head")[0].appendChild(script);
        } else {
            callback();
        }
    }

    function runJs(url, callback) {
        loadJs(url,
        function() {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (callback) {
                callback();
            }
        });
    }

    function loadCss(url, callback) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'screen';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
        if (callback) {
            callback.call(link);
        }
        return link;
    }

    function loadSingle(name, callback) {
        queues[name] = 'loading';

        var module = modules[name],
        	jsStatus = 'loading',
        	cssStatus = (kuiloader.css && module['css']) ? 'loading': 'loaded';

        if (kuiloader.css && module['css']) {
            loadCss(/^http/i.test(module['css']) ? 
            		module['css'] : 
            	kuiloader.base + "themes/" + kuiloader.theme + "/" + (modules['cssPath'] || "") + module['css'], 
            function() {
                cssStatus = 'loaded';
                if (jsStatus == 'loaded' && cssStatus == 'loaded') {
                    finish();
                }
            });
        }

        loadJs(/^http/i.test(module['js']) ?
        		module['js']:
        	kuiloader.base + (module['jsPath'] || "js/comp_src/") + module['js'],
        function() {
            jsStatus = 'loaded';
            if (jsStatus == 'loaded' && cssStatus == 'loaded') {
                finish();
            }
        });

        function finish() {
            queues[name] = 'loaded';
            kuiloader.onProgress(name);
            if (callback) {
                callback();
            }
        }
    }

    function loadModule(name, callback , flag, param) {
        var mm = [];
        var doLoad = false;
        var currMm = name;
        if (typeof name == 'string') {
            add(name);
        } else {
            for (var i = 0; i < name.length; i++) {
                add(name[i]);
            }
        }

        function add(name) {
            if (!modules[name]) return;
            var d = modules[name]['dependencies'];
            if (d) {
                for (var i = 0; i < d.length; i++) {
                    if (currMm != d[i]) add(d[i]);
                }
            }
            mm.push(name);
        }

        function finish() {
            if (callback) {
                callback(param);
            }
            kuiloader.onLoad(name);
        }

        var time = 0;
        function loadMm() {
            if (mm.length) {
                var m = mm[0];
                if($.fn[m] || queues[m] == 'loaded') { 
                	mm.shift();
                    loadMm();
                } else if (!queues[m]||flag) {
                    doLoad = true;
                    loadSingle(m,
                    function() {
                        mm.shift();
                        loadMm();
                    });
                } else {
                    if (time < kuiloader.timeout) {
                        time += 10;
                        setTimeout(arguments.callee, 10);
                    }
                }
            } else {
                if (kuiloader.locale && doLoad == true && locales[kuiloader.locale]) {
                    var url = kuiloader.base + 'js/locale/' + locales[kuiloader.locale];
                    runJs(url,
                    function() {
                        finish();
                    });
                } else {
                    finish();
                }
            }
        }
        loadMm();
    }
    
    kuiloader.loadJs = loadJs;
    kuiloader.loadCss = loadCss;
    window.using = kuiloader.load;
   
    if (window.jQuery) {
        jQuery(function() {
			if(typeof($k)!='undefined'&&$k.config){					
				kuiloader.base = $k.config.base||kuiloader.base;
			}
			if(top.$k){
				var config = top.$k.config;	
				kuiloader.theme = config ? config.theme : 'default';
			}
     		//$('.kui-form,.kui-validatebox,.kui-linkbutton').css({visibility:'hidden'});			
			$('body').css({visibility:'hidden'});			
			using(['kuiall', 'kuicore', 'kuibiz', 'message', 'localstorage'], function() {
                kuiloader.onBeforeAutoDirect.call(this);
            	jQuery.parser.director("body", undefined, function() {
					$('body').css({visibility:'visible'});
					kuiloader.onReady();
					if(window.$ready && typeof(window.$ready) == 'function') {
						window.$ready()
					};
					
					//上一个版本使用浏览器提供的onKeyDown事件有按下backspace键页面回退的问题
					//但似乎用jQuery的keydown事件不存在这个问题，不明白原因，这里就不另外加分支特殊处理backspace键了
					//由于前端框架是基于jQuery的，绑定事件时应尽量避免使用原生事件绑定而应优先采用jQuery提供的解决方案
					//@author liuqing 2014-12-2
					$(document).unbind(".kuiloader").bind("keydown.kuiloader", function(e) {
						if (e.keyCode === 68 && e.ctrlKey) {   //ctrl + d
							if(top.kui_debugger) {
								top.kui_debugger.setDebug(true);	//显示debug
								return false;
							}
						} else if(e.keyCode == 69 && e.ctrlKey) {	//ctrl + e
							if(top.kui_debugger) {
								top.kui_debugger.cleanAll();	//清空debug
								return false;
							}
						}
					});
				});
             });
        });
    }
})();

