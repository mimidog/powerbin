
if (!ORYX) var ORYX = {};

if (!ORYX.CONFIG) ORYX.CONFIG = {};

/**
 * This file contains URI constants that may be used for XMLHTTPRequests.
 */

NAMESPACE_ORYX = "http://www.b3mn.org/oryx";
NAMESPACE_SVG = "http://www.w3.org/2000/svg/";

ORYX.CONFIG.ROOT_PATH = "../editor/"; //TODO: Remove last slash!!
ORYX.CONFIG.EXPLORER_PATH = "../explorer";
ORYX.CONFIG.LIBS_PATH = "../libs";

/**
 * Regular Config
 */
ORYX.CONFIG.SERVER_HANDLER_ROOT = "../editor";
ORYX.CONFIG.SERVER_EDITOR_HANDLER = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/editor";
ORYX.CONFIG.SERVER_MODEL_HANDLER = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/model";
ORYX.CONFIG.STENCILSET_HANDLER = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/editor_stencilset?embedsvg=true&url=true&namespace=";
ORYX.CONFIG.STENCIL_SETS_URL = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/editor_stencilset";

ORYX.CONFIG.PLUGINS_CONFIG = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/plugins.xml";
ORYX.CONFIG.SYNTAXCHECKER_URL = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/syntaxchecker";
ORYX.CONFIG.DEPLOY_URL = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/model/deploy";
ORYX.CONFIG.MODEL_LIST_URL = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/models";

ORYX.CONFIG.SS_EXTENSIONS_FOLDER = ORYX.CONFIG.ROOT_PATH + "stencilsets/extensions/";
ORYX.CONFIG.SS_EXTENSIONS_CONFIG = ORYX.CONFIG.SERVER_HANDLER_ROOT + "/editor_ssextensions";
ORYX.CONFIG.ORYX_NEW_URL = "/new";
ORYX.CONFIG.BPMN_LAYOUTER = ORYX.CONFIG.ROOT_PATH + "bpmnlayouter";


ORYX.CONFIG.BACKEND_SWITCH = true;
ORYX.CONFIG.PANEL_LEFT_WIDTH = 150;
ORYX.CONFIG.PANEL_RIGHT_COLLAPSED = false;
ORYX.CONFIG.PANEL_RIGHT_WIDTH = 200;
ORYX.CONFIG.APPNAME = 'KJDP3.5 BPM suite';
ORYX.CONFIG.WEB_URL = "../";

ORYX.CONFIG.BLANK_IMAGE = ORYX.CONFIG.LIBS_PATH + '/ext-2.0.2/resources/images/default/s.gif';


/* Show grid line while dragging */
ORYX.CONFIG.SHOW_GRIDLINE = true;

/* Editor-Mode */
ORYX.CONFIG.MODE_READONLY = "readonly";
ORYX.CONFIG.MODE_FULLSCREEN = "fullscreen";
ORYX.CONFIG.WINDOW_HEIGHT = 400;
ORYX.CONFIG.PREVENT_LOADINGMASK_AT_READY = false;

/* Plugins */
ORYX.CONFIG.PLUGINS_ENABLED = true;
ORYX.CONFIG.PLUGINS_FOLDER = "Plugins/";

ORYX.CONFIG.BPMN20_SCHEMA_VALIDATION_ON = true;

/* Namespaces */
ORYX.CONFIG.NAMESPACE_ORYX = "http://www.b3mn.org/oryx";
ORYX.CONFIG.NAMESPACE_SVG = "http://www.w3.org/2000/svg";

/* UI */
ORYX.CONFIG.CANVAS_WIDTH = 2485;
ORYX.CONFIG.CANVAS_HEIGHT = 2050;
ORYX.CONFIG.CANVAS_RESIZE_INTERVAL = 300;
ORYX.CONFIG.SELECTED_AREA_PADDING = 4;
ORYX.CONFIG.CANVAS_BACKGROUND_COLOR = "none";
ORYX.CONFIG.GRID_DISTANCE = 30;
ORYX.CONFIG.GRID_ENABLED = true;
ORYX.CONFIG.ZOOM_OFFSET = 0.1;
ORYX.CONFIG.DEFAULT_SHAPE_MARGIN = 60;
ORYX.CONFIG.SCALERS_SIZE = 7;
ORYX.CONFIG.MINIMUM_SIZE = 20;
ORYX.CONFIG.MAXIMUM_SIZE = 10000;
ORYX.CONFIG.OFFSET_MAGNET = 15;
ORYX.CONFIG.OFFSET_EDGE_LABEL_TOP = 8;
ORYX.CONFIG.OFFSET_EDGE_LABEL_BOTTOM = 8;
ORYX.CONFIG.OFFSET_EDGE_BOUNDS = 5;
ORYX.CONFIG.COPY_MOVE_OFFSET = 30;

ORYX.CONFIG.BORDER_OFFSET = 14;

ORYX.CONFIG.MAX_NUM_SHAPES_NO_GROUP = 12;

ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER = 30;
ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET = 45;

/* Shape-Menu Align */
ORYX.CONFIG.SHAPEMENU_RIGHT = "Oryx_Right";
ORYX.CONFIG.SHAPEMENU_BOTTOM = "Oryx_Bottom";
ORYX.CONFIG.SHAPEMENU_LEFT = "Oryx_Left";
ORYX.CONFIG.SHAPEMENU_TOP = "Oryx_Top";


/* Morph-Menu Item */
ORYX.CONFIG.MORPHITEM_DISABLED = "Oryx_MorphItem_disabled";

/* Property type names */
ORYX.CONFIG.TYPE_STRING = "string";
ORYX.CONFIG.TYPE_BOOLEAN = "boolean";
ORYX.CONFIG.TYPE_INTEGER = "integer";
ORYX.CONFIG.TYPE_FLOAT = "float";
ORYX.CONFIG.TYPE_COLOR = "color";
ORYX.CONFIG.TYPE_DATE = "date";
ORYX.CONFIG.TYPE_CHOICE = "choice";
ORYX.CONFIG.TYPE_URL = "url";
ORYX.CONFIG.TYPE_DIAGRAM_LINK = "diagramlink";
ORYX.CONFIG.TYPE_COMPLEX = "complex";
ORYX.CONFIG.TYPE_MULTIPLECOMPLEX = "multiplecomplex";
ORYX.CONFIG.TYPE_TEXT = "text";
ORYX.CONFIG.TYPE_TEXT_AREA = "textarea";
ORYX.CONFIG.TYPE_MODEL_LINK = "modellink";
ORYX.CONFIG.TYPE_LISTENER = "listener";
ORYX.CONFIG.TYPE_EPC_FREQ = "epcfrequency";
ORYX.CONFIG.TYPE_GLOSSARY_LINK = "glossarylink";


/* Vertical line distance of multiline labels */
ORYX.CONFIG.LABEL_LINE_DISTANCE = 2;
ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT = 12;

/* Open Morph Menu with Hover */
ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER = false;


/* Editor constants come here */
ORYX.CONFIG.EDITOR_ALIGN_BOTTOM = 0x01;
ORYX.CONFIG.EDITOR_ALIGN_MIDDLE = 0x02;
ORYX.CONFIG.EDITOR_ALIGN_TOP = 0x04;
ORYX.CONFIG.EDITOR_ALIGN_LEFT = 0x08;
ORYX.CONFIG.EDITOR_ALIGN_CENTER = 0x10;
ORYX.CONFIG.EDITOR_ALIGN_RIGHT = 0x20;
ORYX.CONFIG.EDITOR_ALIGN_SIZE = 0x30;

/* Event types */
ORYX.CONFIG.EVENT_MOUSEDOWN = "mousedown";
ORYX.CONFIG.EVENT_MOUSEUP = "mouseup";
ORYX.CONFIG.EVENT_MOUSEOVER = "mouseover";
ORYX.CONFIG.EVENT_MOUSEOUT = "mouseout";
ORYX.CONFIG.EVENT_MOUSEMOVE = "mousemove";
ORYX.CONFIG.EVENT_DBLCLICK = "dblclick";
ORYX.CONFIG.EVENT_KEYDOWN = "keydown";
ORYX.CONFIG.EVENT_KEYUP = "keyup";

ORYX.CONFIG.EVENT_LOADED = "editorloaded";

ORYX.CONFIG.EVENT_EXECUTE_COMMANDS = "executeCommands";
ORYX.CONFIG.EVENT_STENCIL_SET_LOADED = "stencilSetLoaded";
ORYX.CONFIG.EVENT_SELECTION_CHANGED = "selectionchanged";
ORYX.CONFIG.EVENT_SHAPEADDED = "shapeadded";
ORYX.CONFIG.EVENT_SHAPEREMOVED = "shaperemoved";
ORYX.CONFIG.EVENT_PROPERTY_CHANGED = "propertyChanged";
ORYX.CONFIG.EVENT_DRAGDROP_START = "dragdrop.start";
ORYX.CONFIG.EVENT_SHAPE_MENU_CLOSE = "shape.menu.close";
ORYX.CONFIG.EVENT_DRAGDROP_END = "dragdrop.end";
ORYX.CONFIG.EVENT_RESIZE_START = "resize.start";
ORYX.CONFIG.EVENT_RESIZE_END = "resize.end";
ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED = "dragDocker.docked";
ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW = "highlight.showHighlight";
ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE = "highlight.hideHighlight";
ORYX.CONFIG.EVENT_LOADING_ENABLE = "loading.enable";
ORYX.CONFIG.EVENT_LOADING_DISABLE = "loading.disable";
ORYX.CONFIG.EVENT_LOADING_STATUS = "loading.status";
ORYX.CONFIG.EVENT_OVERLAY_SHOW = "overlay.show";
ORYX.CONFIG.EVENT_OVERLAY_HIDE = "overlay.hide";
ORYX.CONFIG.EVENT_ARRANGEMENT_TOP = "arrangement.setToTop";
ORYX.CONFIG.EVENT_ARRANGEMENT_BACK = "arrangement.setToBack";
ORYX.CONFIG.EVENT_ARRANGEMENT_FORWARD = "arrangement.setForward";
ORYX.CONFIG.EVENT_ARRANGEMENT_BACKWARD = "arrangement.setBackward";
ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED = "propertyWindow.propertyChanged";
ORYX.CONFIG.EVENT_LAYOUT_ROWS = "layout.rows";
ORYX.CONFIG.EVENT_LAYOUT_BPEL = "layout.BPEL";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_VERTICAL = "layout.BPEL.vertical";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_HORIZONTAL = "layout.BPEL.horizontal";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_SINGLECHILD = "layout.BPEL.singlechild";
ORYX.CONFIG.EVENT_LAYOUT_BPEL_AUTORESIZE = "layout.BPEL.autoresize";
ORYX.CONFIG.EVENT_AUTOLAYOUT_LAYOUT = "autolayout.layout";
ORYX.CONFIG.EVENT_UNDO_EXECUTE = "undo.execute";
ORYX.CONFIG.EVENT_UNDO_ROLLBACK = "undo.rollback";
ORYX.CONFIG.EVENT_BUTTON_UPDATE = "toolbar.button.update";
ORYX.CONFIG.EVENT_LAYOUT = "layout.dolayout";
ORYX.CONFIG.EVENT_GLOSSARY_LINK_EDIT = "glossary.link.edit";
ORYX.CONFIG.EVENT_GLOSSARY_SHOW = "glossary.show.info";
ORYX.CONFIG.EVENT_GLOSSARY_NEW = "glossary.show.new";
ORYX.CONFIG.EVENT_DOCKERDRAG = "dragTheDocker";

ORYX.CONFIG.EVENT_SHOW_PROPERTYWINDOW = "propertywindow.show";
ORYX.CONFIG.EVENT_ABOUT_TO_SAVE = "file.aboutToSave";

/* Selection Shapes Highlights */
ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE = 5;
ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR = "#4444FF";
ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR2 = "#9999FF";

ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_CORNER = "corner";
ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE = "rectangle";

ORYX.CONFIG.SELECTION_VALID_COLOR = "#00FF00";
ORYX.CONFIG.SELECTION_INVALID_COLOR = "#FF0000";


ORYX.CONFIG.DOCKER_DOCKED_COLOR = "#00FF00";
ORYX.CONFIG.DOCKER_UNDOCKED_COLOR = "#FF0000";
ORYX.CONFIG.DOCKER_SNAP_OFFSET = 10;

/* Copy & Paste */
ORYX.CONFIG.EDIT_OFFSET_PASTE = 10;

/* Key-Codes */
ORYX.CONFIG.KEY_CODE_X = 88;
ORYX.CONFIG.KEY_CODE_C = 67;
ORYX.CONFIG.KEY_CODE_V = 86;
ORYX.CONFIG.KEY_CODE_DELETE = 46;
ORYX.CONFIG.KEY_CODE_META = 224;
ORYX.CONFIG.KEY_CODE_BACKSPACE = 8;
ORYX.CONFIG.KEY_CODE_LEFT = 37;
ORYX.CONFIG.KEY_CODE_RIGHT = 39;
ORYX.CONFIG.KEY_CODE_UP = 38;
ORYX.CONFIG.KEY_CODE_DOWN = 40;

// TODO Determine where the lowercase constants are still used and remove them from here.
ORYX.CONFIG.KEY_Code_enter = 12;
ORYX.CONFIG.KEY_Code_left = 37;
ORYX.CONFIG.KEY_Code_right = 39;
ORYX.CONFIG.KEY_Code_top = 38;
ORYX.CONFIG.KEY_Code_bottom = 40;

/* Supported Meta Keys */

ORYX.CONFIG.META_KEY_META_CTRL = "metactrl";
ORYX.CONFIG.META_KEY_ALT = "alt";
ORYX.CONFIG.META_KEY_SHIFT = "shift";

/* Key Actions */

ORYX.CONFIG.KEY_ACTION_DOWN = "down";
ORYX.CONFIG.KEY_ACTION_UP = "up";


var Class = (function() {
  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();


function escapeHTML(html) {
	return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function unescapeHTML(html) {
	return html.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

function onloading(){  
     $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");   
     $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍等。。。").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
}  
function removeload(){  
    $(".datagrid-mask").remove();  
    $(".datagrid-mask-msg").remove();  
}
var isIE = !!window.ActiveXObject;   

if(!isIE){
	//兼容老版本的谷歌浏览器
	if (!Document.prototype.createAttributeNS) {
	  Document.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
		var dummy = this.createElement('dummy');
		dummy.setAttributeNS(namespaceURI, qualifiedName, '');
		var attr = dummy.attributes[0];
		dummy.removeAttributeNode(attr);
		return attr;
	  };
	}
	if (!Element.prototype.setAttributeNodeNS) {
	  Element.prototype.setAttributeNodeNS = Element.prototype.setAttributeNode;
	}
}

//////////////

function isSafari(){
	var userAgent = navigator.userAgent;
	return userAgent.indexOf("Safari") > -1
}

function isFirefox(){
	var userAgent = navigator.userAgent;
	return userAgent.indexOf("Firefox") > -1
}

//重新Event
var Event = {
	stop:function(event){
		event.preventDefault();
		event.stopPropagation();
	},
	
	pointer:function(event) {
		return { x: pointerX(event), y: pointerY(event) };
	},

	pointerX:function (event) {
		var docElement = document.documentElement,
		body = document.body || { scrollLeft: 0 };

		return event.pageX || (event.clientX +
			(docElement.scrollLeft || body.scrollLeft) -
			(docElement.clientLeft || 0));
	},

	pointerY:function (event) {
		var docElement = document.documentElement,
		body = document.body || { scrollTop: 0 };

		return  event.pageY || (event.clientY +
			(docElement.scrollTop || body.scrollTop) -
			(docElement.clientTop || 0));
	}
};
var slice = Array.prototype.slice;
	
//扩展Array功能
Array.prototype.first = function(){
	return this[0];
}
Array.prototype.last = function(){
    return this[this.length - 1];
}

Array.prototype.each = function(fun){
	$.map(this,function(item,i){
		fun.call(null,item,i);
	});
}

//根据数组定义的规则来累计值
Array.prototype.inject = function(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
}
//返回一个不具有嵌套层次结构的数组，内嵌的数组递归加入到最外层数组中。
Array.prototype.flatten = function(){
	return this.inject([], function(array, value) {
      if ($.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
}
//去掉数组中为null的项
Array.prototype.compact = function(){
	return $.map(this,function(value){
		if(value != null)return value;
	});
}
//返回数组中是否存在指定的对象
Array.prototype.member = function(value){
	return $.inArray(value,this)>=0
}
//排除指定的项
Array.prototype.without = function(value) {
	var values = slice.call(arguments, 0);
    return $.map(this,function(value) {
      if($.inArray(value,values)<0){
		return value;
	  }
    });
}
//去掉重复的项
Array.prototype.uniq = function(){
	return $.unique(this);
}
Array.prototype.clone = function() {
    return slice.call(this, 0);
}
			
//是否包含
Array.prototype.include = function(value){
	return $.inArray(value,this) > -1;
}
Array.prototype.size = function(){
	return this.length;
}

Array.prototype.remove = function(value){
	var index = $.inArray(value,this);
	this.splice(index,1);
}
Array.prototype.clear = function(){
	this.length = 0;
    return this;
}
Array.prototype.pluck = function(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
}

//排序当自然顺序关系不存在或不满足需求时才需要使用 sortBy
Array.prototype.sortBy = function(iterator) {
    return $.map(this,function(value, index) {
		return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
		var a = left.criteria, b = right.criteria;
		return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
}

//查找所有符合条件的
Array.prototype.findAll = function(fun){
	var tmp = [];
	$.map(this,function(item,i){
		if(fun.call(null,item,i)){
			tmp.push(item);
		}
	});
	return tmp;
}
//有个符合条件的就返回true
Array.prototype.any = function(fun){
	var tmp = false;
	$.each(this,function(i){
		var item = this;
		if(fun.call(null,item,i)){
			tmp = true;
			return false;
		}
	});
	return tmp;
}

//所有符合条件的才返回true
Array.prototype.all = function(fun){
	var tmp = true;
	$.map(this,function(item,i){
		if(fun.call(null,item,i)){
			tmp = false;
			return false;
		}
	});
	return !tmp;
}
//类似$.map
Array.prototype.collect = function(fun){
	return $.map(this,function(item,i){
		return fun.call(null,item,i);
	});
}

Array.prototype.find = function(fun){
	var first=null;
	$.each(this,function(i){
		var item = this;
		if(fun.call(null,item,i)){
			first=item;
			return false;
		}
	});
	return first;
}

String.prototype.reverse=function(){
	var tmp = this.split("").reverse();
	return tmp.join("");
}

String.prototype.startsWith = function(pattern){
    return this.indexOf(pattern) === 0;
}

String.prototype.endsWith = function(pattern) {
    var d = this.length - pattern.length; 
    return d >= 0 && this.lastIndexOf(pattern) === d;
}
String.prototype.strip = function(){
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

function update(array, args) {
	var arrayLength = array.length, length = args.length;
	while (length--) array[arrayLength + length] = args[length];
	return array;
}

function merge(array, args) {
	array = slice.call(array, 0);
	return update(array, args);
}

Function.prototype.bind = function(context) {
    if (arguments.length < 2 && typeof arguments[0] === "undefined") return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
}




var Clazz = function () {
};

Clazz.prototype.construct = function () {
};

Clazz.extend = function (def) {
    var classDef = function () {
        if (arguments[0] !== Clazz) {
            this.construct.apply(this, arguments);
        }
    };

    var proto = new this(Clazz);
    var superClass = this.prototype;

    for (var n in def) {
        var item = def[n];
        if (item instanceof Function) item.$ = superClass;
        proto[n] = item;
    }

    classDef.prototype = proto;

    //Give this new class the same static extend method
    classDef.extend = this.extend;
    return classDef;
};


if (!Signavio) {
    var Signavio = new Object();
}

if (!Signavio.Plugins) {
    Signavio.Plugins = new Object();
}

if (!Signavio.Plugins.Utils) {
    Signavio.Plugins.Utils = new Object();
}

if (!Signavio.Helper) {
    Signavio.Helper = new Object();
}

if (!ORYX) var ORYX = {};
//ORYX = Object.extend(ORYX,
ORYX = jQuery.extend(ORYX,
{

	//set the path in the config.js file!!!!
	PATH:ORYX.CONFIG.ROOT_PATH,
	//CONFIGURATION: "config.js",

	URLS:[],

	alreadyLoaded:[],

	configrationRetries:0,

	Version:'0.1.1',

	availablePlugins:[],

	/**
	 * The ORYX.Log logger.
	 */
	Log:{

            __appenders:[
                { append:function (message) {
                    //console.log(message);
                }}
            ],

            trace:function () {
                //ORYX.Log.__log('TRACE', arguments);
            },
            debug:function () {
                //ORYX.Log.__log('DEBUG', arguments);
            },
            info:function () {
                //ORYX.Log.__log('INFO', arguments);
            },
            warn:function () {
                //ORYX.Log.__log('WARN', arguments);
            },
            error:function () {
                //ORYX.Log.__log('ERROR', arguments);
            },
            fatal:function () {
                //ORYX.Log.__log('FATAL', arguments);
            },

            __log:function (prefix, messageParts) {

                messageParts[0] = (new Date()).getTime() + " "
                    + prefix + " " + messageParts[0];
                var message = printf.apply(null, messageParts);

                ORYX.Log.__appenders.each(function (appender) {
                    appender.append(message);
                });
            },

            addAppender:function (appender) {
                //ORYX.Log.__appenders.push(appender);
            }
        },

	/**
	 * First bootstrapping layer. The Oryx loading procedure begins. In this
	 * step, all preliminaries that are not in the responsibility of Oryx to be
	 * met have to be checked here, such as the existance of the prototpe
	 * library in the current execution environment. After that, the second
	 * bootstrapping layer is being invoked. Failing to ensure that any
	 * preliminary condition is not met has to fail with an error.
	 */
	load:function () {
		onloading();
		ORYX._load();
	},

	/**
	 * Second bootstrapping layer. The oryx configuration is checked. When not
	 * yet loaded, config.js is being requested from the server. A repeated
	 * error in retrieving the configuration will result in an error to be
	 * thrown after a certain time of retries. Once the configuration is there,
	 * all urls that are registered with oryx loading are being requested from
	 * the server. Once everything is loaded, the third layer is being invoked.
	 */
	_load:function () {
		
		ORYX.loadPlugins();
	},

	/**
	 * Third bootstrapping layer. This is where first the plugin coniguration
	 * file is loaded into oryx, analyzed, and where all plugins are being
	 * requested by the server. Afterwards, all editor instances will be
	 * initialized.
	 */
	loadPlugins:function () {
		// load plugins if enabled.
		if (ORYX.CONFIG.PLUGINS_ENABLED)
			ORYX._loadPlugins();
		else
			ORYX.Log.warn("Ignoring plugins, loading Core only.");
		// init the editor instances.
		var modelUrl = window.location.href.replace(/#.*/g, "");
        if (modelUrl.endsWith("/self")) {
            modelUrl = modelUrl.replace("/self", "/json");
        } else {
            var modelId = window.location.search.substring(4);  
            modelUrl = "../../kjdp_modeler?id=" + modelId + "&method=getModelData";
        }

        ORYX.Editor.createByUrl(modelUrl, {
            id:modelUrl
        });
	},

	_loadPlugins:function () {
		// load plugin configuration file.
		var source = ORYX.CONFIG.PLUGINS_CONFIG;
		var self = this;
		$.ajax({
			type:"GET"
			,url:source
			,dataType:'xml'
			//,url:source
			,async: false 
			,success:function(result){
				
				var resultXml = result;

				// TODO: Describe how properties are handled.
				// Get the globale Properties
				var globalProperties = [];
				//var preferences = $A(resultXml.getElementsByTagName("properties"));
				var preferences = $(resultXml).find("properties");
				
				preferences.each(function () {
					var p = this;
					//var props = $A(p.childNodes);
					var props = $(p).children();
					props.each(function () {
						var prop = this;
						var property = new Hash();
						// get all attributes from the node and set to global properties
						/*var attributes = $A(prop.attributes);
						attributes.each(function (attr) {
							property[attr.nodeName] = attr.nodeValue
						});*/
						
						var arr = prop.attributes, att = [];
						for(var i = 0; i < arr.length; i++) {
							att.push(arr[i].name);
							property[arr[i].name] = arr[i].value;
						} 
						
						if (arr.length > 0) {
							globalProperties.push(property)
						}
						
					});
				});


				// TODO Why are we using XML if we don't respect structure anyway?
				// for each plugin element in the configuration..
				var plugin = resultXml.getElementsByTagName("plugin");
				//$A(plugin).each(function (node) {
				$.each(plugin,function(){
					var node = this;
					// get all element's attributes.
					// TODO: What about: var pluginData = $H(node.attributes) !?
					//var pluginData = new Hash();
					var pluginData ={};
					
					var arr = node.attributes, att = [];
					for(var i = 0; i < arr.length; i++) {
						pluginData[arr[i].nodeName] = arr[i].nodeValue
					} 
					
					// ensure there's a name attribute.
					if (!pluginData['name']) {
						//console.log("A plugin is not providing a name. Ingnoring this plugin.");
						return;
					}

					// ensure there's a source attribute.
					if (!pluginData['source']) {
						//console.log("Plugin with name '%0' doesn't provide a source attribute.", pluginData['name']);
						return;
					}

					// Get all private Properties
					var propertyNodes = node.getElementsByTagName("property");
					var properties = [];
					//$A(propertyNodes).each(function (prop) {
					$.each(propertyNodes,function(){
						var prop = this;
						var property = new Hash();

						// Get all Attributes from the Node
						/*var attributes = $A(prop.attributes)
						attributes.each(function (attr) {
							property[attr.nodeName] = attr.nodeValue
						});*/
						
						var arr = prop.attributes, att = [];
						for(var i = 0; i < arr.length; i++) {
							//property.add(arr[i].name,arr[i].value);
							property[arr[i].name] = arr[i].value;
						} //ray 
						
						if (arr.length > 0) {
							properties.push(property)
						}
						;

					});

					// Set all Global-Properties to the Properties
					properties = properties.concat(globalProperties);

					// Set Properties to Plugin-Data
					pluginData['properties'] = properties;

					// Get the RequieredNodes
					var requireNodes = node.getElementsByTagName("requires");
					var requires;
					//$A(requireNodes).each(function (req) {
					$.each(requireNodes,function(){
						var req = this;
						
						/*var namespace = $A(req.attributes).find(function (attr) {
							return attr.name == "namespace"
						})*/
						var namespace = $(this).attr("namespace");
						
						if (namespace) {
							if (!requires) {
								requires = {namespaces:[]}
							}
							//requires.namespaces.push(namespace.nodeValue)
							requires.namespaces.push(namespace);
						}
					});

					// Set Requires to the Plugin-Data, if there is one
					if (requires) {
						pluginData['requires'] = requires;
					}


					// Get the RequieredNodes
					var notUsesInNodes = node.getElementsByTagName("notUsesIn");
					var notUsesIn;
					//$A(notUsesInNodes).each(function (not) {
					$.each(notUsesInNodes,function(){
						var not = this;
						var namespace = $(this).attr("namespace");
						if (namespace) {
							if (!notUsesIn) {
								notUsesIn = {namespaces:[]}
							}
							notUsesIn.namespaces.push(namespace);
						}
					});

					// Set Requires to the Plugin-Data, if there is one
					if (notUsesIn) {
						pluginData['notUsesIn'] = notUsesIn;
					}


					var url = ORYX.PATH + ORYX.CONFIG.PLUGINS_FOLDER + pluginData['source'];

					// Add the Plugin-Data to all available Plugins
					ORYX.availablePlugins.push(pluginData);
				});
			}
			,error:function(e){
				self._loadPluginsOnFails(e);
			}
		});
	},

	_loadPluginsOnFails:function (result) {
		//console.log(result.readyState,"==",result.responseText,"==",result.status,"==",result.statusText);
	},
	webIsModify:false,  //页面是否修改过
	autoSaveEdit:function(){
		//找到save图标按钮，模拟点击事件
		if(this.webIsModify){
			$("#toolbar").find("img").each(function(){
				if(this.src.indexOf("disk.png")>0){
					this.click();
				}
			});
		}
		
	}
});



// register kickstart as the new onload event listener on current window.
// previous listener(s) are triggered to launch with kickstart.

 //Event.observe(window, 'load', Kickstart.load);  //jquery-replace
jQuery(window).bind("load",ORYX.load);   
  



if(!ORYX.Editor)ORYX.Editor={};
ORYX.Editor.SVGClassElementsAreAvailable = true;


ORYX.Editor = Clazz.extend({

	/** @lends ORYX.Editor.prototype */
    // Defines the global dom event listener
    DOMEventListeners:new Hash(),

    // Defines the selection
    selection:[],

    // Defines the current zoom level
    zoomLevel:1.0,

    construct:function (config,stencilset) {
        // initialization.
        this._eventsQueue = [];
        this.loadedPlugins = [];
        this.pluginsData = [];



        this.modelMetaData = config;
        var model = config;
        if (config.model) {
            model = config.model;
        }
		
		//ray update 
		this.id = model.resourceId || model.id || ORYX.Editor.provideId();

        // Defines if the editor should be fullscreen or not
        this.fullscreen = config.fullscreen !== false;

        if (Signavio && Signavio.Helper && Signavio.Helper.ShowMask instanceof Function) {
            //Signavio.Helper.ShowMask(true, !this.fullscreen ? this.id : Ext.getBody());
        }
        // Initialize the eventlistener
        this._initEventListener();  

		this.myStencilSet = '';
        if (ORYX.CONFIG.BACKEND_SWITCH) {  //true
			if(!model.stencilset){
				removeload(); 
				confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
					if (flag) {
						try {
							top.window.location.reload();
						} catch (e) {
						}
					} else {
						window.location.replace("about:blank");
					}
				});
				return;
			}
			
            var ssUrl = (model.stencilset.namespace || model.stencilset.url).replace("#", "%23");
			this.myStencilSet = ORYX.Core.StencilSet.loadStencilSet(ORYX.CONFIG.STENCILSET_HANDLER + ssUrl, this.id);  //左边菜单的一些读取赋值功能
			
        } else {
            var ssUrl = model.stencilset.url;
            this.myStencilSet = ORYX.Core.StencilSet.loadStencilSet(ssUrl, this.id);
        }
		
		var self = this;
		var loadPluginFinished = false;
        var loadContentFinished = false;
		
		var createrSVG = function(){
			// CREATES the canvas
			self._createCanvas(model.stencil ? model.stencil.id : null, model.properties,stencilset);
			// GENERATES the whole EXT.VIEWPORT
			self._generateGUI();  //改用kui的布局
		}
		
        // Initializing of a callback to check loading ends
        var initFinished = function () {
            if (!loadPluginFinished || !loadContentFinished) {
                return
            }
            self._finishedLoading();
        }
		
        // LOAD the plugins
        window.setTimeout(function () {
			createrSVG();
            self.loadPlugins(); 
            loadPluginFinished = true;
			initFinished();
        }, 300);
		
        // LOAD the content of the current editor instance
        window.setTimeout(function () {
            self.loadSerialized(model, true); // Request the meta data as well
            self.getCanvas().update();
            loadContentFinished = true;
            initFinished();
			removeload();
			
			window.focus();  
			document.body.focus();  
		
        }, 500);
    },
	
	_initEventListener:function () { 
        // Register on Events
        /*if (document.documentElement.addEventListener) {
			console.log("addEventListener ===");
            document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYDOWN, this.catchKeyDownEvents.bind(this), false);
            document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYUP, this.catchKeyUpEvents.bind(this), false);
        } else if (document.documentElement.attachEvent) {
            document.documentElement.attachEvent('on' + ORYX.CONFIG.EVENT_KEYDOWN, [
                [document.documentElement, ORYX.CONFIG.EVENT_KEYDOWN, this.catchKeyDownEvents.bind(this), false]
            ]);
            document.documentElement.attachEvent('on' + ORYX.CONFIG.EVENT_KEYUP, [
                [document.documentElement, ORYX.CONFIG.EVENT_KEYDOWN, this.catchKeyUpEvents.bind(this), false]
            ]);
        }*/
		var self = this;
		$(document).bind(ORYX.CONFIG.EVENT_KEYDOWN,function(e){self.catchKeyDownEvents(e)});
		$(document).bind(ORYX.CONFIG.EVENT_KEYUP,function(e){self.catchKeyUpEvents(e)});

        // Enable Key up and down Event
        this._keydownEnabled = true;
        this._keyupEnabled = true;

        this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEDOWN] = [];
        this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEUP] = [];
        this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOVER] = [];
        this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOUT] = [];
        this.DOMEventListeners[ORYX.CONFIG.EVENT_SELECTION_CHANGED] = [];
        this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEMOVE] = [];
    },
	
	catchKeyUpEvents:function (event) {
        if (!this._keyupEnabled) {
            return;
        }
        /* assure we have the current event. */
        if (!event)
            event = window.event;

        // Checks if the event comes from some input field
        if (!this.isValidEvent(event)) {
            return;
        }

        /* Create key up event type */
        var keyUpEvent = this.createKeyCombEvent(event, ORYX.CONFIG.KEY_ACTION_UP);

        /* forward to dispatching. */
        this.handleEvents({type:keyUpEvent, event:event});
    },
	
	catchKeyDownEvents:function (event) {
        if (!this._keydownEnabled) {
            return;
        }
        /* Assure we have the current event. */
        if (!event)
            event = window.event;

        
        if (!this.isValidEvent(event)) {
            return;
        }

        /* Create key up event type */
        var keyDownEvent = this.createKeyCombEvent(event, ORYX.CONFIG.KEY_ACTION_DOWN);

        /* Forward to dispatching. */
        this.handleEvents({type:keyDownEvent, event:event});
    },
	
	isValidEvent:function (e) {
		var result=false;
        try {
            var isInput = ["INPUT", "TEXTAREA"].include(e.target.tagName.toUpperCase());
			var gridHasFocus = $(e.target).hasClass("x-grid3-focus") && !$(e.target).hasClass("x-grid3-focus-canvas");
            result= !isInput && !gridHasFocus;
        } catch (e) {
            result = false;
        }
		return result;
    },
	createKeyCombEvent:function (keyEvent, keyAction) {

        /* Get the currently pressed key code. */
        var pressedKey = keyEvent.which || keyEvent.keyCode;
        //this.__currentKey = pressedKey;

        /* Event name */
        var eventName = "key.event";

        /* Key action */
        if (keyAction) {
            eventName += "." + keyAction;
        }

        /* Ctrl or apple meta key is pressed */
        if (keyEvent.ctrlKey || keyEvent.metaKey) {
            eventName += "." + ORYX.CONFIG.META_KEY_META_CTRL;
        }

        /* Alt key is pressed */
        if (keyEvent.altKey) {
            eventName += "." + ORYX.CONFIG.META_KEY_ALT;
        }

        /* Alt key is pressed */
        if (keyEvent.shiftKey) {
            eventName += "." + ORYX.CONFIG.META_KEY_SHIFT;
        }

        /* Return the composed event name */
        return  eventName + "." + pressedKey;
    },
	
	_finishedLoading:function () {
		$("#oryx-loading-panel").hide()
        // Raise Loaded Event
        this.handleEvents({type:ORYX.CONFIG.EVENT_LOADED})

    },
	
	getCanvas:function () {
        return this._canvas;
    },
	
	getStencilSets:function () {
        return ORYX.Core.StencilSet.stencilSets(this.id);
    },
	
	getExtensionForMetaData:function () {
        if (!this.ss_extensions_def || !(this.ss_extensions_def.extensions instanceof Array)) {
            return null;
        }

        var stencilsets = this.getStencilSets();
        var extension = this.ss_extensions_def.extensions.find(function (ex) {
            return !!stencilsets[ex["extends"]] && ex.namespace.endsWith("/meta#");
        });

        return extension ? extension.namespace || null : null;
    },

	loadSerialized:function (model, requestMeta) {
        var canvas = this.getCanvas();
	
        this.loadSSExtensions(model.ssextensions);

        // Load Meta Data Extension if available
        // #Signavio
        if (requestMeta === true) { //ray true
            var metaDataExtension = this.getExtensionForMetaData();
            if (metaDataExtension) {  //null
                this.loadSSExtension(metaDataExtension);
            }
        }
		
        var shapes = this.getCanvas().addShapeObjects(model.childShapes, this.handleEvents.bind(this));
		
		
        if (model.properties) {  //流程的一些名称等属性
            for (key in model.properties) {
                var value = model.properties[key];
                var prop = this.getCanvas().getStencil().property("oryx-" + key);
				
                if (!(typeof value === "string") && (!prop || !prop.isList())) {
                    //value = Ext.encode(value);
					value = JSON.stringify(value);
                }
				//ray 
                this.getCanvas().setProperty("oryx-" + key, value);
            }
        }


        this.getCanvas().updateSize();

        // Force to update the selection
        this.selection = [null];
        this.setSelection([]);
        return shapes;
    },
	
	
	

	
	_executeEventImmediately:function (eventObj) {
		var eventsKey =[];
		for(var k in this.DOMEventListeners){
			eventsKey[eventsKey.length] = k;
		}
		if (eventsKey.length>0 && $.inArray(eventObj.event.type,eventsKey)) {
			var tmp = this.DOMEventListeners[eventObj.event.type];
			
			if(this.DOMEventListeners[eventObj.event.type] instanceof Array){
				var self = this;
				$.map(this.DOMEventListeners[eventObj.event.type],function(value){
					value(eventObj.event, eventObj.arg);
				})
			}
			
        }
    },
	
	loadSSExtensions:function (ss_extension_namespaces) {
        if (!ss_extension_namespaces) return;
		
		var self = this;
		$.map(ss_extension_namespaces,function(ss_extension_namespace){
			self.loadSSExtension(ss_extension_namespace);
		});
    },
	
	/**
     *  Laden der Plugins
     */
    loadPlugins:function () {

        
        var me = this;
        var newPlugins = [];
		//var loadedStencilSetsNamespaces = this.getStencilSets().getKeys(); 
       var loadedStencilSetsNamespaces = this.getStencilSets().keys(); 
		
        var facade = this._getPluginFacade();

        // If there is an Array where all plugins are described, than only take those
        // (that comes from the usage of oryx with a mashup api)
        if (ORYX.MashupAPI && ORYX.MashupAPI.loadablePlugins && ORYX.MashupAPI.loadablePlugins instanceof Array) {
            // Get the plugins from the available plugins (those who are in the plugins.xml)
            ORYX.availablePlugins = $A(ORYX.availablePlugins).findAll(function (value) {
                return ORYX.MashupAPI.loadablePlugins.include(value.name)
            })

            // Add those plugins to the list, which are only in the loadablePlugins list
            ORYX.MashupAPI.loadablePlugins.each(function (className) {
                if (!(ORYX.availablePlugins.find(function (val) {
                    return val.name == className
                }))) {
                    ORYX.availablePlugins.push({name:className });
                }
            })
        }

		//循环加载指定\editor\scripts\Plugins插件源文件。
        //ORYX.availablePlugins.each(function (value) {
		$.map(ORYX.availablePlugins,function(value){
			var checkAny = function(obj){
				var tmp = false;
				if(obj && obj.namespaces){
					$.each(obj.namespaces,function () {
						var req = this;
						if(loadedStencilSetsNamespaces.indexOf(req) >= 0){
							tmp = true;
							return false;
						}
					});
				}
				return tmp;
			}
			
            if ((!value.requires || !value.requires.namespaces || checkAny(value.requires) ) &&
                (!value.notUsesIn || !value.notUsesIn.namespaces || !checkAny(value.notUsesIn)) &&
                /*only load activated plugins or undefined */
                (value.engaged || (value.engaged === undefined))) {

                try {
                    var className = eval(value.name);
                    if (className) {
                        var plugin = new className(facade, value);
                        plugin.type = value.name;
                        newPlugins.push(plugin);
                        plugin.engaged = true;
                    }
                } catch (e) {
                    //console.log("Plugin %0 is not available %1", value.name, e);
                }

            } else {
                //console.log("Plugin need a stencilset which is not loaded'", value.name);
            }

        });
		$.map(newPlugins,function(value){
            // If there is an GUI-Plugin, they get all Plugins-Offer-Meta-Data
            if (value.registryChanged){  //加载顶部菜单数据
                value.registryChanged(me.pluginsData);  
				
			}
            // If there have an onSelection-Method it will pushed to the Editor Event-Handler
            if (value.onSelectionChanged){ 
                me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, value.onSelectionChanged.bind(value));
			}
        });

        this.loadedPlugins = newPlugins;

        // Hack for the Scrollbars
        this.registerPluginsOnKeyEvents();

        this.setSelection();
    },
	
	getTreeData:function(){
		return this.myStencilSet._jsonObject;
	},
	
	_getPluginFacade:function () {
        // if there is no pluginfacade already created:
        if (! this._pluginFacade)  //undefined;

            this._pluginFacade = {

				activatePluginByName:this.activatePluginByName.bind(this),
                //deactivatePluginByName:		this.deactivatePluginByName.bind(this),
                getAvailablePlugins:this.getAvailablePlugins.bind(this),
				
				getAvailablePlugins:this.getAvailablePlugins.bind(this),
                offer:this.offer.bind(this),
                getStencilSets:this.getStencilSets.bind(this),
                getStencilSetExtensionDefinition:function () {
                    //return ObjectClone(this.ss_extensions_def || {});
					return $.extend(true,{},this.ss_extensions_def || {});
                }.bind(this),
                getRules:this.getRules.bind(this),
                loadStencilSet:this.loadStencilSet.bind(this),
                createShape:this.createShape.bind(this),
                deleteShape:this.deleteShape.bind(this),
                getSelection:this.getSelection.bind(this),
                setSelection:this.setSelection.bind(this),
                updateSelection:this.updateSelection.bind(this),
                getCanvas:this.getCanvas.bind(this),

                importJSON:this.importJSON.bind(this),
                importERDF:this.importERDF.bind(this),
                getERDF:this.getERDF.bind(this),
                getJSON:this.getJSON.bind(this),
                getSerializedJSON:this.getSerializedJSON.bind(this),

                executeCommands:this.executeCommands.bind(this),
                isExecutingCommands:this.isExecutingCommands.bind(this),

                registerOnEvent:this.registerOnEvent.bind(this),
                unregisterOnEvent:this.unregisterOnEvent.bind(this),
                raiseEvent:this.handleEvents.bind(this),
                enableEvent:this.enableEvent.bind(this),
                disableEvent:this.disableEvent.bind(this),

                eventCoordinates:this.eventCoordinates.bind(this),
				eventCoordinatesByOffset:this.eventCoordinatesByOffset.bind(this), //ray add
				
                addToRegion:this.addToRegion.bind(this),

                getModelMetaData:this.getModelMetaData.bind(this)
				
				,getTreeData:this.getTreeData.bind(this)
				,checkPropertyGridIsValid:this.checkPropertyGridIsValid.bind(this)
            };
		
        // return it.
        return this._pluginFacade;
    }
	
	//检查对象属性是否还有未通过的验证
	,checkPropertyGridIsValid:function(){
		var self = this,
			tmp = false;
		using("propertygrid",function(){
			var rows = $('#propertyPanel').propertygrid('getRows');
			$.each(rows,function(i){
				isValid = $("#propertyPanel").propertygrid("validateRow",i);
				if(!isValid){
					tmp = true;
					return false;
				}
			});
			self._getPluginFacade().isValid = tmp;
		});
		return tmp;
	}
	
	
	//ray 改写布局加载数据
	,_generateGUI:function () {
	 
		var layoutHeight = ORYX.CONFIG.WINDOW_HEIGHT;  //400
		
        var canvasParent = this.getCanvas().rootNode.parentNode;  //  容器<div class="ORYX_Editor"> 
		// Set the editor to the center, and refresh the size
		
		$(canvasParent).appendTo("#divSvg");
		
        canvasParent.parentNode.setAttributeNS(null, 'align', 'center');
        canvasParent.setAttributeNS(null, 'align', 'left');
        this.getCanvas().setSize({
            width:ORYX.CONFIG.CANVAS_WIDTH,
            height:ORYX.CONFIG.CANVAS_HEIGHT
        });
	},
	
	getModelMetaData:function () {
        return this.modelMetaData;
    },
	
	registerPluginsOnKeyEvents:function () {
		var self = this;
        //this.pluginsData.each(function (pluginData) {
		$.map(this.pluginsData,function (pluginData) {
            if (pluginData.keyCodes) {

                //pluginData.keyCodes.each(function (keyComb) {
				$.map(pluginData.keyCodes,function (keyComb) {
                    var eventName = "key.event";

                    /* Include key action */
                    eventName += '.' + keyComb.keyAction;

                    if (keyComb.metaKeys) {
                        /* Register on ctrl or apple meta key as meta key */
                        if (keyComb.metaKeys.
                            indexOf(ORYX.CONFIG.META_KEY_META_CTRL) > -1) {
                            eventName += "." + ORYX.CONFIG.META_KEY_META_CTRL;
                        }

                        /* Register on alt key as meta key */
                        if (keyComb.metaKeys.
                            indexOf(ORYX.CONFIG.META_KEY_ALT) > -1) {
                            eventName += '.' + ORYX.CONFIG.META_KEY_ALT;
                        }

                        /* Register on shift key as meta key */
                        if (keyComb.metaKeys.
                            indexOf(ORYX.CONFIG.META_KEY_SHIFT) > -1) {
                            eventName += '.' + ORYX.CONFIG.META_KEY_SHIFT;
                        }
                    }

                    /* Register on the actual key */
                    if (keyComb.keyCode) {
                        eventName += '.' + keyComb.keyCode;
                    }

                    /* Register the event */
					
					//ray pluginData.toggle=undefined && pluginData.buttonInstance 为8个顶部菜单数据如：保存……
                    if (pluginData.toggle === true && pluginData.buttonInstance) {
                        self.registerOnEvent(eventName, function () {
                            pluginData.buttonInstance.toggle(!pluginData.buttonInstance.pressed); // Toggle
                            pluginData.functionality.call(pluginData, pluginData.buttonInstance, pluginData.buttonInstance.pressed); // Call function
                        });
                    } else {
						//ray eventName 为上下左右键盘的keycode 和名称  pluginData.functionality =function
                        self.registerOnEvent(eventName, pluginData.functionality)
                    }
				});	
                //}.bind(this));
            }
		});
        //}.bind(this));
		
		
    },
	
	addToRegion:function (region, component, title) {

        if (region.toLowerCase && this.layout_regions[region.toLowerCase()]) {
            var current_region = this.layout_regions[region.toLowerCase()];

            current_region.add(component);

            // update dimensions of region if required.
            if (!current_region.width && component.initialConfig && component.initialConfig.width) {
                ORYX.Log.debug("resizing width of region %0: %1", current_region.region, component.initialConfig.width)
                current_region.setWidth(component.initialConfig.width)
            }
            if (component.initialConfig && component.initialConfig.height) {
                ORYX.Log.debug("resizing height of region %0: %1", current_region.region, component.initialConfig.height)
                var current_height = current_region.height || 0;
                current_region.height = component.initialConfig.height + current_height;
                current_region.setHeight(component.initialConfig.height + current_height)
            }

            // set title if provided as parameter.
            if (typeof title == "string") {
                current_region.setTitle(title);
            }

            // trigger doLayout() and show the pane
            current_region.ownerCt.doLayout();
            current_region.show();

            if (isSafari())
                ORYX.Editor.resizeFix();

            return current_region;
        }

        return null;
    },
	
	eventCoordinates:function (event) {
        var canvas = this.getCanvas();
        var svgPoint = canvas.node.ownerSVGElement.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        var matrix = canvas.node.getScreenCTM();
        return svgPoint.matrixTransform(matrix.inverse());
    },
	//根据坐标添加对象
	eventCoordinatesByOffset:function(offset) {
        var canvas = this.getCanvas();
        var svgPoint = canvas.node.ownerSVGElement.createSVGPoint();
        svgPoint.x = offset.left;
        svgPoint.y = offset.top;
        var matrix = canvas.node.getScreenCTM();
        return svgPoint.matrixTransform(matrix.inverse());
    },
	
	
	loadSSExtension:function (ss_extension_namespace) {
        if (this.ss_extensions_def) {
            var extension = this.ss_extensions_def.extensions.find(function (ex) {
                return (ex.namespace == ss_extension_namespace);
            });

            if (!extension) {
                return;
            }

            var stencilset = this.getStencilSets()[extension["extends"]];

            if (!stencilset) {
                return;
            }

            // Check if absolute or relative url
            if ((extension["definition"] || "").startsWith("/")) {
                stencilset.addExtension(extension["definition"])
            } else {
                stencilset.addExtension(ORYX.CONFIG.SS_EXTENSIONS_FOLDER + extension["definition"])
            }

            //stencilset.addExtension("/oryx/build/stencilsets/extensions/" + extension["definition"])
            this.getRules().initializeRules(stencilset);
            this._getPluginFacade().raiseEvent({
                type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED
            });
        }

    },
	
	disableEvent:function (eventType) {
        if (eventType == ORYX.CONFIG.EVENT_KEYDOWN) {
            this._keydownEnabled = false;
        }
        if (eventType == ORYX.CONFIG.EVENT_KEYUP) {
            this._keyupEnabled = false;
        }
        if (this.DOMEventListeners.keys().member(eventType)) {
            var value = this.DOMEventListeners.remove(eventType);
            this.DOMEventListeners['disable_' + eventType] = value;
        }
    },
	
	enableEvent:function (eventType) {
        if (eventType == ORYX.CONFIG.EVENT_KEYDOWN) {
            this._keydownEnabled = true;
        }

        if (eventType == ORYX.CONFIG.EVENT_KEYUP) {
            this._keyupEnabled = true;
        }

        if (this.DOMEventListeners.keys().member("disable_" + eventType)) {
            var value = this.DOMEventListeners.remove("disable_" + eventType);
            this.DOMEventListeners[eventType] = value;
        }
    },
	
	_executeEvents:function () {
        this._queueRunning = true;
        while (this._eventsQueue.length > 0) {
            var val = this._eventsQueue.shift();
            this._executeEventImmediately(val);
        }
        this._queueRunning = false;
    },
	
	handleEvents:function (event, uiObj) {
		var self = this;
		if(event.type=='mousedown'){
			//先验证propertygrid是否校验成功不成功则返回
			if(this.checkPropertyGridIsValid()){
				return;
			}
		}
        switch (event.type) {
            case ORYX.CONFIG.EVENT_MOUSEDOWN:
                this._handleMouseDown(event, uiObj);
                break;
            case ORYX.CONFIG.EVENT_MOUSEMOVE:
                this._handleMouseMove(event, uiObj);
                break;
            case ORYX.CONFIG.EVENT_MOUSEUP:
                this._handleMouseUp(event, uiObj);
                break;
            case ORYX.CONFIG.EVENT_MOUSEOVER:
                this._handleMouseHover(event, uiObj);
                break;
            case ORYX.CONFIG.EVENT_MOUSEOUT:
                this._handleMouseOut(event, uiObj);
                break;
        }
		
         /* Force execution if necessary. Used while handle Layout-Callbacks. */
        if (event.forceExecution) {   
            this._executeEventImmediately({event:event, arg:uiObj});
        } else {
            this._eventsQueue.push({event:event, arg:uiObj});    
        }

        if (!this._queueRunning) {  
            this._executeEvents();
        }


        // TODO: Make this return whether no listener returned false.
        // So that, when one considers bubbling undesireable, it won't happen.
        return false;
    },
	
	_handleMouseDown:function (event, uiObj) {

        // get canvas.
        var canvas = this.getCanvas();
        // Try to get the focus
        canvas.focus()  
		
        // find the shape that is responsible for this element's id.
        var element = event.currentTarget;
        var elementController = uiObj;

        // gather information on selection.
        var currentIsSelectable = (elementController !== null) &&
            (elementController !== undefined) && (elementController.isSelectable);
        var currentIsMovable = (elementController !== null) &&
            (elementController !== undefined) && (elementController.isMovable);
        var modifierKeyPressed = event.shiftKey || event.ctrlKey;
        var noObjectsSelected = this.selection.length === 0;
        //var currentIsSelected = this.selection.member(elementController);
		
		var currentIsSelected = $.inArray(elementController,this.selection)>=0 ? true:false;

        // Rule #1: When there is nothing selected, select the clicked object.
        if (currentIsSelectable && noObjectsSelected) {  //true&&true
            this.setSelection([elementController]);  

            // Rule #3: When at least one element is selected, and there is no
            // control key pressed, and the clicked object is not selected, select
            // the clicked object.
        } else if (currentIsSelectable && !noObjectsSelected &&
            !modifierKeyPressed && !currentIsSelected) {
            this.setSelection([elementController]);

            //var objectType = elementController.readAttributes();
            //alert(objectType[0] + ": " + objectType[1]);

            // Rule #4: When the control key is pressed, and the current object is
            // not selected, add it to the selection.
        } else if (currentIsSelectable && modifierKeyPressed
            && !currentIsSelected) {
            var newSelection = this.selection.clone();
            newSelection.push(elementController)
            this.setSelection(newSelection)

            // Rule #6
        } else if (currentIsSelectable && currentIsSelected &&
            modifierKeyPressed) {
            var newSelection = this.selection.clone();
            this.setSelection(newSelection.without(elementController))

            // Rule #5: When there is at least one object selected and no control
            // key pressed, we're dragging.
            /*} else if(currentIsSelectable && !noObjectsSelected
             && !modifierKeyPressed) {

             if(this.log.isTraceEnabled())
             this.log.trace("Rule #5 applied for mouse down on "+element.id);
             */
            // Rule #2: When clicked on something that is neither
            // selectable nor movable, clear the selection, and return.
        } else if (!currentIsSelectable && !currentIsMovable) {
            this.setSelection([]);

            return;

            // Rule #7: When the current object is not selectable but movable,
            // it is probably a control. Leave the selection unchanged but set
            // the movedObject to the current one and enable Drag. Dockers will
            // be processed in the dragDocker plugin.
        } else if (!currentIsSelectable && currentIsMovable && !(elementController instanceof ORYX.Core.Controls.Docker)) {
            // TODO: If there is any moveable elements, do this in a plugin
            //ORYX.Core.UIEnableDrag(event, elementController);

            // Rule #8: When the element is selectable and is currently selected and no
            // modifier key is pressed
        } else if (currentIsSelectable && currentIsSelected &&
            !modifierKeyPressed) {
            this._subSelection = this._subSelection != elementController ? elementController : undefined;

            this.setSelection(this.selection, this._subSelection);

        }


        // prevent event from bubbling, return.
        //Event.stop(event);
        return;
    },
	
	_handleMouseMove:function (event, uiObj) {
        return;
    },
	
	_handleMouseUp:function (event, uiObj) {
        // get canvas.
        var canvas = this.getCanvas();

        // find the shape that is responsible for this elemement's id.
        var elementController = uiObj;

        //get event position
        var evPos = this.eventCoordinates(event);

        //Event.stop(event);
    },

    _handleMouseHover:function (event, uiObj) {
        return;
    },

    _handleMouseOut:function (event, uiObj) {
        return;
    },
	
	unregisterOnEvent:function (eventType, callback) {
        if (this.DOMEventListeners.keys().member(eventType)) {
            this.DOMEventListeners[eventType] = this.DOMEventListeners[eventType].without(callback);
        } else {
            // Event is not supported
            // TODO: Error Handling
        }
    },
	
	registerOnEvent:function (eventType, callback) {
		
        //if (!(this.DOMEventListeners.keys().member(eventType))) {
		if (!this.DOMEventListeners[eventType]) {
            this.DOMEventListeners[eventType] = [];
        }
		this.DOMEventListeners[eventType].push(callback);
    },
	
	isExecutingCommands:function () {
        return !!this.commandExecuting;
    },
	
	executeCommands:function (commands) {
        if (!this.commandStack) {
            this.commandStack = [];
        }
        if (!this.commandStackExecuted) {
            this.commandStackExecuted = [];
        }


        this.commandStack = [].concat(this.commandStack)
            .concat(commands);

        // Check if already executes
        if (this.commandExecuting) {
            return;
        }

        // Start execution
        this.commandExecuting = true;

        // Iterate over all commands
        while (this.commandStack.length > 0) {
            var command = this.commandStack.shift();
            // and execute it
            command.execute();
            this.commandStackExecuted.push(command);
        }

        // Raise event for executing commands
        this.handleEvents({
            type:ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,
            commands:this.commandStackExecuted
        });

        // Remove temporary vars
        delete this.commandStack;
        delete this.commandStackExecuted;
        delete this.commandExecuting;


        this.updateSelection();

    },
    getSerializedJSON:function () {
        return JSON.stringify(this.getJSON());
    },
	
	getJSON:function () {
        var canvas = this.getCanvas().toJSON();
        canvas.ssextensions = this.getStencilSets().values()[0].extensions().keys().findAll(function (sse) {
            return !sse.endsWith('/meta#')
        });
        return canvas;
    },
	
	getERDF:function () {

        // Get the serialized dom
        var serializedDOM = DataManager.serializeDOM(this._getPluginFacade());

        // Add xml definition if there is no
        serializedDOM = '<?xml version="1.0" encoding="utf-8"?>' +
            '<html xmlns="http://www.w3.org/1999/xhtml" ' +
            'xmlns:b3mn="http://b3mn.org/2007/b3mn" ' +
            'xmlns:ext="http://b3mn.org/2007/ext" ' +
            'xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ' +
            'xmlns:atom="http://b3mn.org/2007/atom+xhtml">' +
            '<head profile="http://purl.org/NET/erdf/profile">' +
            '<link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" />' +
            '<link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " />' +
            '<link rel="schema.b3mn" href="http://b3mn.org" />' +
            '<link rel="schema.oryx" href="http://oryx-editor.org/" />' +
            '<link rel="schema.raziel" href="http://raziel.org/" />' +
            '<base href="' +
            location.href.split("?")[0] +
            '" />' +
            '</head><body>' +
            serializedDOM +
            '</body></html>';

        return serializedDOM;
    },

	importERDF:function (erdfDOM) {

        var serialized = this.parseToSerializeObjects(erdfDOM);

        if (serialized)
            return this.importJSON(serialized, true);
    },
	 
	
	renewResourceIds:function (jsonObject) {
        // For renewing resource ids, a serialized and object version is needed
        //if (Ext.type(jsonObject) === "string") {
		if (typeof(jsonObject) === "string") {  //
            try {
                var serJsonObject = jsonObject;
                //jsonObject = Ext.decode(jsonObject);
				jsonObject =  JSON.parse(jsonObject);  //
            } catch (error) {
                throw new SyntaxError(error.message);
            }
        } else {
            //var serJsonObject = Ext.encode(jsonObject);
			var serJsonObject = JSON.stringify(jsonObject);
        }

        // collect all resourceIds recursively
        var collectResourceIds = function (shapes) {
            if (!shapes) return [];
			return $.map(shapes,function(shape){
				return collectResourceIds(shape.childShapes).concat(shape.resourceId);
			}).flatten();

            /*return shapes.map(function (shape) {
                return collectResourceIds(shape.childShapes).concat(shape.resourceId);
            }).flatten();*/
        }
		if(jsonObject){
			var resourceIds = collectResourceIds(jsonObject.childShapes);

			// Replace each resource id by a new one
			resourceIds.each(function (oldResourceId) {
				var newResourceId = ORYX.Editor.provideId();
				//serJsonObject = serJsonObject.gsub('"' + oldResourceId + '"', '"' + newResourceId + '"');
				serJsonObject = serJsonObject.replace(new RegExp(oldResourceId,"g") ,newResourceId);
				
			});
		}

        //return Ext.decode(serJsonObject);
		return serJsonObject?JSON.parse(serJsonObject):{};
    },
	
	importJSON:function (jsonObject, noSelectionAfterImport) {
        //try {
            jsonObject = this.renewResourceIds(jsonObject);
			
        /*} catch (error) {
            throw error;
        }*/
		
        if (jsonObject&& jsonObject.stencilset && jsonObject.stencilset.namespace && jsonObject.stencilset.namespace !== this.getCanvas().getStencil().stencilSet().namespace()) {
            alert(ORYX.I18N.JSONImport.title, String.format(ORYX.I18N.JSONImport.wrongSS, jsonObject.stencilset.namespace, this.getCanvas().getStencil().stencilSet().namespace()));
            return null;
        } else {
			
            var commandClass = ORYX.Core.Command.extend({
                construct:function (jsonObject, loadSerializedCB, noSelectionAfterImport, facade) {
                    this.jsonObject = jsonObject;
                    this.noSelection = noSelectionAfterImport;
                    this.facade = facade;
                    this.shapes;
                    this.connections = [];
                    this.parents = new Hash();
                    this.selection = this.facade.getSelection();
                    this.loadSerialized = loadSerializedCB;
                },
                execute:function () {
					var self = this;
                    if (!this.shapes) {
                        // Import the shapes out of the serialization
                        this.shapes = this.loadSerialized(this.jsonObject);

                        //store all connections
                        //this.shapes.each(function (shape) {
						$.map(this.shapes,function (shape) {

                            if (shape.getDockers) {
                                var dockers = shape.getDockers();
                                if (dockers) {
                                    if (dockers.length > 0) {
                                        self.connections.push([dockers.first(), dockers.first().getDockedShape(), dockers.first().referencePoint]);
                                    }
                                    if (dockers.length > 1) {
                                        self.connections.push([dockers.last(), dockers.last().getDockedShape(), dockers.last().referencePoint]);
                                    }
                                }
                            }

                            //store parents
                            self.parents[shape.id] = shape.parent;
							//this.parents.add(shape.id,shape.parent);
						});
                        //}.bind(this));
                    } else {
                        //this.shapes.each(function (shape) {
						$.map(this.shapes,function (shape) {
                            self.parents[shape.id].add(shape);
							//self.parents.getValue(shape.id).add(shape);
						});
                        //}.bind(this));

                        //this.connections.each(function (con) {
						$.map(this.connections,function (con) {
                            con[0].setDockedShape(con[1]);
                            con[0].setReferencePoint(con[2]);
                            con[0].update();
                        });
                    }

                    //this.parents.values().uniq().invoke("update");
                    this.facade.getCanvas().update();

                    if (!this.noSelection)
                        this.facade.setSelection(this.shapes);
                    else
                        this.facade.updateSelection();

                    // call updateSize again, because during loadSerialized the edges' bounds
                    // are not yet initialized properly
                    this.facade.getCanvas().updateSize();

                },
                rollback:function () {
                    var selection = this.facade.getSelection();

                    //this.shapes.each(function (shape) {
					var self = this;
					$.map(this.shapes,function (shape) {
                        selection = selection.without(shape);
                        self.facade.deleteShape(shape);
					});
                    //}.bind(this));

                    /*this.parents.values().uniq().each(function(parent) {
                     if(!this.shapes.member(parent))
                     parent.update();
                     }.bind(this));*/

                    this.facade.getCanvas().update();

                    this.facade.setSelection(selection);
                }
            })

            var command = new commandClass(jsonObject,
                this.loadSerialized.bind(this),
				//this.loadSerialized.call(this),
                noSelectionAfterImport,
                this._getPluginFacade());

            this.executeCommands([command]);

            return command.shapes.clone();
			//return ObjectClone(command.shapes);
        }
    },
    getSelection:function () {
        return this.selection || [];
    },
	
	isEqual:function (a, b) {
		var tmp = false;
		$.each(a,function(){
			var r = this;
			if($.inArray(r,b)<0){
				tmp = true;
				return false;
			}
		});
		tmp = !tmp;
		return a === b || (a.length === b.length && tmp)
    },
	isDirty:function (a) {
       
		return $.map(a,function(shape){
			if(shape.isPropertyChanged()){
				return true;
			}
		});
		
		
    },
	setSelection:function (elements, subSelectionElement, force) {
        if (!elements) {
            elements = [];
        }
        if (!(elements instanceof Array)) {
            elements = [elements];
        }

		
		var tmp=[];
		$.map(elements,function(n){
			if(n && n instanceof ORYX.Core.Shape){
				tmp[tmp.length] = n;
			}
		});
		elements = tmp; 

        if (elements[0] instanceof ORYX.Core.Canvas) {
            elements = [];
        }

        if (!force && this.isEqual(this.selection, elements) && !this.isDirty(elements)) {
            return;
        }
        this.selection = elements;  //[]
        this._subSelection = subSelectionElement;  //undefined
        this.handleEvents({type:ORYX.CONFIG.EVENT_SELECTION_CHANGED, elements:elements, subSelection:subSelectionElement, force:!!force});
		
        window.focus();  
        document.body.focus();  
		
    },

    updateSelection:function () {
        this.setSelection(this.selection, this._subSelection, true);
    },
	
	activatePluginByName:function (name, callback, loadTry) {
        var match = this.getAvailablePlugins().find(function (value) {
            return value.name == name
        });
        if (match && (!match.engaged || (match.engaged === 'false'))) {
            var loadedStencilSetsNamespaces = this.getStencilSets().keys();
            var facade = this._getPluginFacade();
            var newPlugin;
            var me = this;
            ORYX.Log.debug("Initializing plugin '%0'", match.name);

            if (!match.requires || !match.requires.namespaces || match.requires.namespaces.any(function (req) {
                return loadedStencilSetsNamespaces.indexOf(req) >= 0
            })) {
                if (!match.notUsesIn || !match.notUsesIn.namespaces || !match.notUsesIn.namespaces.any(function (req) {
                    return loadedStencilSetsNamespaces.indexOf(req) >= 0
                })) {

                    try {

                        var className = eval(match.name);
                        var newPlugin = new className(facade, match);
                        newPlugin.type = match.name;

                        // If there is an GUI-Plugin, they get all Plugins-Offer-Meta-Data
                        if (newPlugin.registryChanged)
                            newPlugin.registryChanged(me.pluginsData);

                        // If there have an onSelection-Method it will pushed to the Editor Event-Handler
                        if (newPlugin.onSelectionChanged){
                            me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, newPlugin.onSelectionChanged.bind(newPlugin));
						}
                        this.loadedPlugins.push(newPlugin);
                        this.loadedPlugins.each(function (loaded) {
                            if (loaded.registryChanged)
                                loaded.registryChanged(this.pluginsData);
                        }.bind(me));
                        callback(true);

                    } catch (e) {
                        ORYX.Log.warn("Plugin %0 is not available", match.name);
                        if (!!loadTry) {
                            callback(false, "INITFAILED");
                            return;
                        }
                        this.loadScript("plugins/scripts/" + match.source, this.activatePluginByName.bind(this, match.name, callback, true));
                    }
                } else {
                    callback(false, "NOTUSEINSTENCILSET");
                    ORYX.Log.info("Plugin need a stencilset which is not loaded'", match.name);
                }

            } else {
                callback(false, "REQUIRESTENCILSET");
                ORYX.Log.info("Plugin need a stencilset which is not loaded'", match.name);
            }


        } else {
            callback(false, match ? "NOTFOUND" : "YETACTIVATED");
            //TODO error handling
        }
    },
	
	getAvailablePlugins:function () {
        var curAvailablePlugins = ORYX.availablePlugins.clone();
        curAvailablePlugins.each(function (plugin) {
            if (this.loadedPlugins.find(function (loadedPlugin) {
                return loadedPlugin.type == this.name;
            }.bind(plugin))) {
                plugin.engaged = true;
            } else {
                plugin.engaged = false;
            }
        }.bind(this));
        return curAvailablePlugins;  
    },
	
	offer:function (pluginData) {
		if($.inArray(pluginData, this.pluginsData)<0){
			this.pluginsData.push(pluginData);
		}
    },
	
	 getRules:function () {
        return ORYX.Core.StencilSet.rules(this.id);
    },
	
	getStencilSets:function () {
        return ORYX.Core.StencilSet.stencilSets(this.id);
    },
	
	loadStencilSet:function (source) {
        try {
            ORYX.Core.StencilSet.loadStencilSet(source, this.id);
            this.handleEvents({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
        } catch (e) {
            //console.log("Requesting stencil set file failed. (" + e + ")");
        }
    },
	createShape:function (option) {
		
        if (option && option.serialize && option.serialize instanceof Array) {

            var type = option.serialize.find(function (obj) {
                return (obj.prefix + "-" + obj.name) == "oryx-type"
            });
            var stencil = ORYX.Core.StencilSet.stencil(type.value);

            if (stencil.type() == 'node') {
                var newShapeObject = new ORYX.Core.Node({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil);
            } else {
                var newShapeObject = new ORYX.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil);
            }

            this.getCanvas().add(newShapeObject);
            newShapeObject.deserialize(option.serialize);

            return newShapeObject;
        }

        if (!option || !option.type || !option.namespace) {
            throw "To create a new shape you have to give an argument with type and namespace";
        }

        var canvas = this.getCanvas();
        var newShapeObject;

        // Get the shape type
        var shapetype = option.type;

        // Get the stencil set
        var sset = ORYX.Core.StencilSet.stencilSet(option.namespace);

        // Create an New Shape, dependents on an Edge or a Node
        if (sset.stencil(shapetype).type() == "node") {
            newShapeObject = new ORYX.Core.Node({'eventHandlerCallback':this.handleEvents.bind(this)}, sset.stencil(shapetype))
        } else {
            newShapeObject = new ORYX.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, sset.stencil(shapetype))
        }

        // when there is a template, inherit the properties.
        if (option.template) {

            newShapeObject._jsonStencil.properties = option.template._jsonStencil.properties;
            newShapeObject.postProcessProperties();
        }

        // Add to the canvas
        if (option.parent && newShapeObject instanceof ORYX.Core.Node) {
            option.parent.add(newShapeObject);
        } else {
            canvas.add(newShapeObject);
        }


        // Set the position
        var point = option.position ? option.position : {x:100, y:200};


        var con;
        // If there is create a shape and in the argument there is given an ConnectingType and is instance of an edge
        if (option.connectingType && option.connectedShape && !(newShapeObject instanceof ORYX.Core.Edge)) {

            // there will be create a new Edge
            con = new ORYX.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, sset.stencil(option.connectingType));

            // And both endings dockers will be referenced to the both shapes
            con.dockers.first().setDockedShape(option.connectedShape);

            var magnet = option.connectedShape.getDefaultMagnet()
            var cPoint = magnet ? magnet.bounds.center() : option.connectedShape.bounds.midPoint();
            con.dockers.first().setReferencePoint(cPoint);
            con.dockers.last().setDockedShape(newShapeObject);
            con.dockers.last().setReferencePoint(newShapeObject.getDefaultMagnet().bounds.center());

            // The Edge will be added to the canvas and be updated
            canvas.add(con);
            //con.update();

        }

        // Move the new Shape to the position
        if (newShapeObject instanceof ORYX.Core.Edge && option.connectedShape) {

            newShapeObject.dockers.first().setDockedShape(option.connectedShape);

            if (option.connectedShape instanceof ORYX.Core.Node) {
                newShapeObject.dockers.first().setReferencePoint(option.connectedShape.getDefaultMagnet().bounds.center());
                newShapeObject.dockers.last().bounds.centerMoveTo(point);
            } else {
                newShapeObject.dockers.first().setReferencePoint(option.connectedShape.bounds.midPoint());
            }

        } else {

            var b = newShapeObject.bounds
            if (newShapeObject instanceof ORYX.Core.Node && newShapeObject.dockers.length == 1) {
                b = newShapeObject.dockers.first().bounds
            }

            b.centerMoveTo(point);

            var upL = b.upperLeft();
            b.moveBy(-Math.min(upL.x, 0), -Math.min(upL.y, 0))

            var lwR = b.lowerRight();
            b.moveBy(-Math.max(lwR.x - canvas.bounds.width(), 0), -Math.max(lwR.y - canvas.bounds.height(), 0))

        }

        // Update the shape
        if (newShapeObject instanceof ORYX.Core.Edge) {
            newShapeObject._update(false);
        }

        // And refresh the selection
        if (!(newShapeObject instanceof ORYX.Core.Edge) && !(option.dontUpdateSelection)) {
            this.setSelection([newShapeObject]);
        }

        if (con && con.alignDockers) {
            con.alignDockers();
        }
        if (newShapeObject.alignDockers) {
            newShapeObject.alignDockers();
        }

        return newShapeObject;
    },
	
	deleteShape:function (shape) {

        if (!shape || !shape.parent) {
            return
        }

        //remove shape from parent
        // this also removes it from DOM
        shape.parent.remove(shape);

        //delete references to outgoing edges
        shape.getOutgoingShapes().each(function (os) {
            var docker = os.getDockers().first();
            if (docker && docker.getDockedShape() == shape) {
                docker.setDockedShape(undefined);
            }
        });

        //delete references to incoming edges
        shape.getIncomingShapes().each(function (is) {
            var docker = is.getDockers().last();
            if (docker && docker.getDockedShape() == shape) {
                docker.setDockedShape(undefined);
            }
        });

        //delete references of the shape's dockers
        shape.getDockers().each(function (docker) {
            docker.setDockedShape(undefined);
        });
    },
	setMissingClasses:function(){
		try {
			SVGElement;
		} catch (e) {
			ORYX.Editor.SVGClassElementsAreAvailable = false;
			SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg').toString();
			SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g').toString();
			SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path').toString();
			SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text').toString();
			//SVGMarkerElement 	= document.createElementNS('http://www.w3.org/2000/svg', 'marker').toString();
			SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect').toString();
			SVGImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image').toString();
			SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle').toString();
			SVGEllipseElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse').toString();
			SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line').toString();
			SVGPolylineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline').toString();
			SVGPolygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon').toString();

		}
	},

	_createCanvas:function (stencilType, canvasConfig) { 
		//this.id = "canvas";
		
		stencilType = 'BPMNDiagram'; 
		
		var stencilset = this.getTreeData();
		
        if (stencilType) {  
            // Add namespace to stencilType
            if (stencilType.search(/^http/) === -1) {
                stencilType = stencilset['namespace'] + stencilType;
            }
        }
        else {
            // Get any root stencil type
            stencilType = this.getStencilSets().values()[0].findRootStencilName();
        }
        // get the stencil associated with the type
		
        var canvasStencil = ORYX.Core.StencilSet.stencil(stencilType);  //左边菜单数据。
		
        // create all dom
        // TODO fix border, so the visible canvas has a double border and some spacing to the scrollbars
        var div = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", null, ['div']);

		
        // set class for custom styling
        $(div).addClass("ORYX_Editor");
		
        this._canvas = new ORYX.Core.Canvas({
            width:ORYX.CONFIG.CANVAS_WIDTH,
            height:ORYX.CONFIG.CANVAS_HEIGHT,
            'eventHandlerCallback':this.handleEvents.bind(this),  
            id:this.id,
            parentNode:div
        }, canvasStencil);
        if (canvasConfig) {
            // Migrate canvasConfig to an RDF-like structure
            //FIXME this isn't nice at all because we don't want rdf any longer
            var properties = [];
            for (field in canvasConfig) {
                properties.push({
                    prefix:'oryx',
                    name:field,
                    value:canvasConfig[field]
                });
            }
			
            this._canvas.deserialize(properties);  
        }
    }
});
ORYX.Editor.SVGClassElementsAreAvailable = true;
ORYX.Editor.setMissingClasses = function () {

    try {
        SVGElement;
    } catch (e) {
        ORYX.Editor.SVGClassElementsAreAvailable = false;
        SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg').toString();
        SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g').toString();
        SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path').toString();
        SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text').toString();
        //SVGMarkerElement 	= document.createElementNS('http://www.w3.org/2000/svg', 'marker').toString();
        SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect').toString();
        SVGImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image').toString();
        SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle').toString();
        SVGEllipseElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse').toString();
        SVGLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line').toString();
        SVGPolylineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline').toString();
        SVGPolygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon').toString();

    }

}




if (!ORYX.Core) {
    ORYX.Core = {};
}


//ray对象 ORYX.Core.UIObject
ORYX.Core.UIObject = {
    /**
     * Constructor of the UIObject class.
     */
    construct:function (options) {

        this.isChanged = true;			//Flag, if UIObject has been changed since last update.
        this.isResized = true;
        this.isVisible = true;			//Flag, if UIObject's display attribute is set to 'inherit' or 'none'
        this.isSelectable = false;		//Flag, if UIObject is selectable.
        this.isResizable = false;		//Flag, if UIObject is resizable.
        this.isMovable = false;			//Flag, if UIObject is movable.

        this.id = ORYX.Editor.provideId();	//get unique id
        this.parent = undefined;		//parent is defined, if this object is added to another uiObject.
        this.node = undefined;			//this is a reference to the SVG representation, either locally or in DOM.
        this.children = [];				//array for all add uiObjects

        this.bounds = new ORYX.Core.Bounds();		//bounds with undefined values

        this._changedCallback = this._changed.bind(this);	//callback reference for calling _changed
        this.bounds.registerCallback(this._changedCallback);	//set callback in bounds

        if (options && options.eventHandlerCallback) {
            this.eventHandlerCallback = options.eventHandlerCallback;
        }
    },

    /**
     * Sets isChanged flag to true. Callback for the bounds object.
     */
    _changed:function (bounds, isResized) {
        this.isChanged = true;
        if (this.bounds == bounds)
            this.isResized = isResized || this.isResized;
    },

    /**
     * If something changed, this method calls the refresh method that must be implemented by subclasses.
     */
    update:function () {
        if (this.isChanged) {
            this.refresh();
            this.isChanged = false;

            //call update of all children
            //this.children.each(function (value) {
			$.map(this.children,function (value) { //ray jquery
                value.update();
            });
        }
    },

    /**
     * Is called in update method, if isChanged is set to true. Sub classes should call the super class method.
     */
    refresh:function () {

    },

    /**
     * @return {Array} Array of all child UIObjects.
     */
    getChildren:function () {
        return this.children.clone();
    },

    /**
     * @return {Array} Array of all parent UIObjects.
     */
    getParents:function () {
        var parents = [];
        var parent = this.parent;
        while (parent) {
            parents.push(parent);
            parent = parent.parent;
        }
        return parents;
    },

    /**
     * Returns TRUE if the given parent is one of the UIObjects parents or the UIObject themselves, otherwise FALSE.
     * @param {UIObject} parent
     * @return {Boolean}
     */
    isParent:function (parent) {
        var cparent = this;
        while (cparent) {
            if (cparent === parent) {
                return true;
            }
            cparent = cparent.parent;
        }
        return false;
    },

    /**
     * @return {String} Id of this UIObject
     */
    getId:function () {
        return this.id;
    },

    /**
     * Method for accessing child uiObjects by id.
     * @param {String} id
     * @param {Boolean} deep
     *
     * @return {UIObject} If found, it returns the UIObject with id.
     */
    getChildById:function (id, deep) {
        return this.children.find(function (uiObj) {
            if (uiObj.getId() === id) {
                return uiObj;
            } else {
                if (deep) {
                    var obj = uiObj.getChildById(id, deep);
                    if (obj) {
                        return obj;
                    }
                }
            }
        });
    },

    /**
     * Adds an UIObject to this UIObject and sets the parent of the
     * added UIObject. It is also added to the SVG representation of this
     * UIObject.
     * @param {UIObject} uiObject
     */
    add:function (uiObject) {
        //add uiObject, if it is not already a child of this object
		
        if (!(this.children.member(uiObject))) {
            //if uiObject is child of another parent, remove it from that parent.
            if (uiObject.parent) {
                uiObject.remove(uiObject);
            }

            //add uiObject to children
            this.children.push(uiObject);

            //set parent reference
            uiObject.parent = this;

            //add uiObject.node to this.node
            uiObject.node = this.node.appendChild(uiObject.node);

            //register callback to get informed, if child is changed
            uiObject.bounds.registerCallback(this._changedCallback);

            //uiObject.update();
        } else {
            ORYX.Log.info("add: ORYX.Core.UIObject is already a child of this object.");
        }
    },

    /**
     * Removes UIObject from this UIObject. The SVG representation will also
     * be removed from this UIObject's SVG representation.
     * @param {UIObject} uiObject
     */
    remove:function (uiObject) {
        //if uiObject is a child of this object, remove it.
        if (this.children.member(uiObject)) {
            //remove uiObject from children
            this.children = this._uiObjects.without(uiObject);

            //delete parent reference of uiObject
            uiObject.parent = undefined;

            //delete uiObject.node from this.node
            uiObject.node = this.node.removeChild(uiObject.node);

            //unregister callback to get informed, if child is changed
            uiObject.bounds.unregisterCallback(this._changedCallback);
        } else {
            ORYX.Log.info("remove: ORYX.Core.UIObject is not a child of this object.");
        }

    },

    /**
     * Calculates absolute bounds of this UIObject.
     */
    absoluteBounds:function () {
        if (this.parent) {
            var absUL = this.absoluteXY();
            return new ORYX.Core.Bounds(absUL.x, absUL.y,
                absUL.x + this.bounds.width(),
                absUL.y + this.bounds.height());
        } else {
            return this.bounds.clone();
        }
    },

    /**
     * @return {Point} The absolute position of this UIObject.
     */
    absoluteXY:function () {
        if (this.parent) {
            var pXY = this.parent.absoluteXY();
            return {x:pXY.x + this.bounds.upperLeft().x, y:pXY.y + this.bounds.upperLeft().y};

        } else {
            return {x:this.bounds.upperLeft().x, y:this.bounds.upperLeft().y};
        }
    },

    /**
     * @return {Point} The absolute position from the Center of this UIObject.
     */
    absoluteCenterXY:function () {
        if (this.parent) {
            var pXY = this.parent.absoluteXY();
            return {x:pXY.x + this.bounds.center().x, y:pXY.y + this.bounds.center().y};

        } else {
            return {x:this.bounds.center().x, y:this.bounds.center().y};
        }
    },

    /**
     * Hides this UIObject and all its children.
     */
    hide:function () {
        this.node.setAttributeNS(null, 'display', 'none');
        this.isVisible = false;
        //this.children.each(function (uiObj) {
		$.map(this.children,function(uiObj){  //ray jquery
            uiObj.hide();
        });
    },

    /**
     * Enables visibility of this UIObject and all its children.
     */
    show:function () {
        this.node.setAttributeNS(null, 'display', 'inherit');
        this.isVisible = true;
        //this.children.each(function (uiObj) {
		$.map(this.children,function(uiObj){  //ray jquery
            uiObj.show();
        });
    },

    addEventHandlers:function (node) {

        node.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN, this._delegateEvent.bind(this), false);
        node.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this._delegateEvent.bind(this), false);
        node.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this._delegateEvent.bind(this), false);
        node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER, this._delegateEvent.bind(this), false);
        node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT, this._delegateEvent.bind(this), false);
        node.addEventListener('click', this._delegateEvent.bind(this), false);
        node.addEventListener(ORYX.CONFIG.EVENT_DBLCLICK, this._delegateEvent.bind(this), false);

    },

    _delegateEvent:function (event) {
        if (this.eventHandlerCallback) {
            this.eventHandlerCallback(event, this);
        }
    },

    toString:function () {
        return "UIObject " + this.id
    }
};
ORYX.Core.UIObject = Clazz.extend(ORYX.Core.UIObject);

/**
 * Top Level uiobject.
 * @class ORYX.Core.AbstractShape
 * @extends ORYX.Core.UIObject
 */
 //ray对象 ORYX.Core.AbstractShape
ORYX.Core.AbstractShape = ORYX.Core.UIObject.extend(
    /** @lends ORYX.Core.AbstractShape.prototype */
{

	/**
	 * Constructor
	 */
	construct:function (options, stencil) {
		arguments.callee.$.construct.apply(this, arguments);

		this.resourceId = ORYX.Editor.provideId(); //Id of resource in DOM

		this._stencil = stencil;
		
		if (this._stencil._jsonStencil.superId) {
			stencilId = this._stencil.id()
			superStencilId = stencilId.substring(0, stencilId.indexOf("#") + 1) + stencil._jsonStencil.superId;
			stencilSet = this._stencil.stencilSet();
			this._stencil = stencilSet.stencil(superStencilId);
		}
		
		//Hash map for all properties. Only stores the values of the properties.
		this.properties = new Hash();
		this.propertiesChanged = new Hash();

		// List of properties which are not included in the stencilset,
		// but which gets (de)serialized
		this.hiddenProperties = new Hash();


		//Initialization of property map and initial value.
		/*this._stencil.properties().each((function (property) {
			var key = property.prefix() + "-" + property.id();
			this.properties[key] = property.value();
			this.propertiesChanged[key] = true;
		}).bind(this));*/
		
		var self = this;
		$.map(this._stencil.properties(),function(property){
			var key = property.prefix() + "-" + property.id();
			self.properties[key] = property.value();
			//self.properties.add(key,property.value());
			self.propertiesChanged[key] = true;
		});

		// if super stencil was defined, also regard stencil's properties:
		if (stencil._jsonStencil.superId) {
			stencil.properties().each((function (property) {
				var key = property.prefix() + "-" + property.id();
				var value = property.value();
				var oldValue = this.properties[key];
				this.properties[key] = value;
				this.propertiesChanged[key] = true;

				// Raise an event, to show that the property has changed
				// required for plugins like processLink.js
				//window.setTimeout( function(){

				this._delegateEvent({
					type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,
					name:key,
					value:value,
					oldValue:oldValue
				});

				//}.bind(this), 10)

			}).bind(this));
		}
	},

	layout:function () {

	},

	/**
	 * Returns the stencil object specifiing the type of the shape.
	 */
	getStencil:function () {
		return this._stencil;
	},

	/**
	 *
	 * @param {Object} resourceId
	 */
	getChildShapeByResourceId:function (resourceId) {

		resourceId = ERDF.__stripHashes(resourceId);

		var obj =null;  
		$.map(this.getChildShapes(true),function(shape){
			if(shape.resourceId == resourceId){
				obj = shape;
				return false;
			}
		});
		return obj;
	},
	/**
	 *
	 * @param {Object} deep
	 * @param {Object} iterator
	 */
	getChildShapes:function (deep, iterator) {
		var result = [];
		//this.children.each(function (uiObject) {
		$.map(this.children,function(uiObject){ 
			if (uiObject instanceof ORYX.Core.Shape && uiObject.isVisible) {
				if (iterator) {
					iterator(uiObject);
				}
				result.push(uiObject);
				if (deep) {
					result = result.concat(uiObject.getChildShapes(deep, iterator));
				}
			}
		});
		
		
		return result;
	},

	/**
	 * @param {Object} shape
	 * @return {boolean} true if any of shape's childs is given shape
	 */
	hasChildShape:function (shape) {
		/*return this.getChildShapes().any(function (child) {
			return (child === shape) || child.hasChildShape(shape);
		});*/
		var tmp = false;
		$.map(this.getChildShapes(),function(child){
			if((child === shape) || child.hasChildShape(shape)){
				tmp = true;
				return false;
			}
		});
		return tmp;
	},

	/**
	 *
	 * @param {Object} deep
	 * @param {Object} iterator
	 */
	getChildNodes:function (deep, iterator) {
		var result = [];
		this.children.each(function (uiObject) {
			if (uiObject instanceof ORYX.Core.Node && uiObject.isVisible) {
				if (iterator) {
					iterator(uiObject);
				}
				result.push(uiObject);
			}
			if (uiObject instanceof ORYX.Core.Shape) {
				if (deep) {
					result = result.concat(uiObject.getChildNodes(deep, iterator));
				}
			}
		});

		return result;
	},

	/**
	 *
	 * @param {Object} deep
	 * @param {Object} iterator
	 */
	getChildEdges:function (deep, iterator) {
		var result = [];

		//this.children.each(function (uiObject) {
		$.map(this.children,function (uiObject) {
			if (uiObject instanceof ORYX.Core.Edge && uiObject.isVisible) {
				if (iterator) {
					iterator(uiObject);
				}
				result.push(uiObject);
			}
			if (uiObject instanceof ORYX.Core.Shape) {
				if (deep) {
					result = result.concat(uiObject.getChildEdges(deep, iterator));
				}
			}
		});

		return result;
	},

	/**
	 * Returns a sorted array of ORYX.Core.Node objects.
	 * Ordered in z Order, the last object has the highest z Order.
	 */
	//TODO deep iterator
	getAbstractShapesAtPosition:function () {
		var x, y;
		switch (arguments.length) {
			case 1:
				x = arguments[0].x;
				y = arguments[0].y;
				break;
			case 2:    //two or more arguments
				x = arguments[0];
				y = arguments[1];
				break;
			default:
				throw "getAbstractShapesAtPosition needs 1 or 2 arguments!"
		}
		if (this.isPointIncluded(x, y)) {

			var result = [];
			result.push(this);

			//check, if one child is at that position


			var childNodes = this.getChildNodes();
			var childEdges = this.getChildEdges();

			//[childNodes, childEdges].each(function (ne) {
			$.map([childNodes, childEdges],function (ne) {
				var nodesAtPosition = new Hash();

				//ne.each(function (node) {
				$.map(ne,function (node) {
					if (!node.isVisible) {
						return
					}
					var candidates = node.getAbstractShapesAtPosition(x, y);
					if (candidates.length > 0) {
						//var nodesInZOrder = $A(node.node.parentNode.childNodes);
						var nodesInZOrder = $(node.node.parentNode.childNodes).toArray();
						var zOrderIndex = nodesInZOrder.indexOf(node.node);
						nodesAtPosition[zOrderIndex] = candidates;
					}
				});

				//nodesAtPosition.keys().sort().each(function (key) {
				$.map(nodesAtPosition.keys().sort(),function (key) {
					result = result.concat(nodesAtPosition[key]);
				});
			});

			return result;

		} else {
			return [];
		}
	},

	/**
	 *
	 * @param key {String} Must be 'prefix-id' of property
	 * @param value {Object} Can be of type String or Number according to property type.
	 */
	setProperty:function (key, value, force) {
		
		var oldValue = this.properties[key];
		if (oldValue !== value || force === true) {
			this.properties[key] = value;
			this.propertiesChanged[key] = true;
			//this.properties.add(key,value);
			//this.propertiesChanged.add(key,true);
			this._changed();

			// Raise an event, to show that the property has changed
			//window.setTimeout( function(){

			if (!this._isInSetProperty) {
				this._isInSetProperty = true;

				this._delegateEvent({
					type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,
					elements:[this],
					name:key,
					value:value,
					oldValue:oldValue
				});

				delete this._isInSetProperty;
			}
			//}.bind(this), 10)
		}
	},

	/**
	 * Returns TRUE if one of the properties is flagged as dirty
	 * @return {boolean}
	 */
	isPropertyChanged:function () {
		var r = '';
		$.map(this.propertiesChanged,function(property){
			r = property && property.value;
		})
		return r==='';
		
	},

	/**
	 *
	 * @param {String} Must be 'prefix-id' of property
	 * @param {Object} Can be of type String or Number according to property type.
	 */
	setHiddenProperty:function (key, value) {
		// IF undefined, Delete
		if (value === undefined) {
			delete this.hiddenProperties[key];
			return;
		}
		var oldValue = this.hiddenProperties[key];
		if (oldValue !== value) {
			this.hiddenProperties[key] = value;
		}
	},
	/**
	 * Calculate if the point is inside the Shape
	 * @param {Point}
		*/
	isPointIncluded:function (pointX, pointY, absoluteBounds) {
		var absBounds = absoluteBounds ? absoluteBounds : this.absoluteBounds();
		return absBounds.isIncluded(pointX, pointY);

	},

	/**
	 * Get the serialized object
	 * return Array with hash-entrees (prefix, name, value)
	 * Following values will given:
	 *         Type
	 *         Properties
	 */
	serialize:function () {
		var serializedObject = [];

		// Add the type
		serializedObject.push({name:'type', prefix:'oryx', value:this.getStencil().id(), type:'literal'});

		// Add hidden properties
		/*this.hiddenProperties.each(function (prop) {
			serializedObject.push({name:prop.key.replace("oryx-", ""), prefix:"oryx", value:prop.value, type:'literal'});
		}.bind(this));*/
		
		$.map(this.hiddenProperties.keys,function(key){
			serializedObject.push({name:key.replace("oryx-", ""), prefix:"oryx", value:this.hiddenProperties[key], type:'literal'});
		})

		// Add all properties
		this.getStencil().properties().each((function (property) {

			var prefix = property.prefix();	// Get prefix
			var name = property.id();		// Get name

			//if(typeof this.properties[prefix+'-'+name] == 'boolean' || this.properties[prefix+'-'+name] != "")
			serializedObject.push({name:name, prefix:prefix, value:this.properties[prefix + '-' + name], type:'literal'});

		}).bind(this));

		return serializedObject;
	},


	deserialize:function (serialize) {
		// Search in Serialize
		var initializedDocker = 0;
		// Sort properties so that the hidden properties are first in the list
		var self = this;
		
		serialize = serialize.sort(function (a, b) {
			a = Number(self.properties.keys().member(a.prefix + "-" + a.name));
			b = Number(self.properties.keys().member(b.prefix + "-" + b.name));
			return a > b ? 1 : (a < b ? -1 : 0)
		}); 
		//serialize.each((function (obj) { 
		$.map(serialize,function(obj){ 
			var name = obj.name;
			var prefix = obj.prefix;
			var value = obj.value;

			switch (prefix + "-" + name) {
				case 'raziel-parent':
					// Set parent
					if (!self.parent) {
						break;
					}
					// Set outgoing Shape
					var parent = self.getCanvas().getChildShapeByResourceId(value);
					if (parent) {
						parent.add(self);
					}
					break;
				default:
					// If list, eval as an array
					var prop = self.getStencil().property(prefix + "-" + name);
					if (prop && prop.isList() && typeof value === "string") {
						if ((value || "").strip() && !value.startsWith("[") && !value.startsWith("]"))
							value = "[\"" + value.strip() + "\"]";
						value = ((value || "").strip() || "[]").evalJSON();
					}

					// Set property
					
					//if (self.properties.keys().member(prefix + "-" + name)) {
					var pk = self.properties.keys();
					if ($.inArray(prefix + "-" + name,pk) >= 0) {
						self.setProperty(prefix + "-" + name, value);
					} else if (!(name === "bounds" || name === "parent" || name === "target" || name === "dockers" || name === "docker" || name === "outgoing" || name === "incoming")) {
						self.setHiddenProperty(prefix + "-" + name, value);
					}  

			}
		});
		//}).bind(this));
	},

	toString:function () {
		return "ORYX.Core.AbstractShape " + this.id
	},

	/**
	 * Converts the shape to a JSON representation.
	 * @return {Object} A JSON object with included ORYX.Core.AbstractShape.JSONHelper and getShape() method.
	 */
	toJSON:function () {
		var tmp = $.extend(true,{},this.hiddenProperties,this.properties);
		var props={},self=this;
		for(var item in tmp){
			if(item.indexOf("oryx-")>=0){
				var key = item;
				var value = tmp[item];
				
				if (self.getStencil().property(key)
					&& self.getStencil().property(key).type() === ORYX.CONFIG.TYPE_COMPLEX
					&& typeof value === "string") {

					try {
						//value = Ext.decode(value);
						value = JSON.stringify(value);
					} catch (error) {
					}

					// Parse date
				} else if (value instanceof Date && self.getStencil().property(key)) {
					try {
						value = value.format(self.getStencil().property(key).dateFormat());
					} catch (e) {
					}
				}
				
				key = key.replace(/^[\w_]+-/, "");
				props[key] = value;
			}
		}
		
		
		
		var json = {
			resourceId:this.resourceId,
			properties:props,
			stencil:{
				id:this.getStencil().idWithoutNs()
			},
			childShapes:this.getChildShapes().map(function (shape) {
				return shape.toJSON()
			})
		};
		
		if (this.getOutgoingShapes) {
			json.outgoing = this.getOutgoingShapes().map(function (shape) {
				return {
					resourceId:shape.resourceId
				};
			});
		}

		if (this.bounds) {
			json.bounds = {
				lowerRight:this.bounds.lowerRight(),
				upperLeft:this.bounds.upperLeft()
			};
		}

		if (this.dockers) {
			json.dockers = this.dockers.map(function (docker) {
				var d = docker.getDockedShape() && docker.referencePoint ? docker.referencePoint : docker.bounds.center();
				d.getDocker = function () {
					return docker;
				};
				return d;
			})
		}

		//Ext.apply(json, ORYX.Core.AbstractShape.JSONHelper);
		$.extend(json, ORYX.Core.AbstractShape.JSONHelper);

		// do not pollute the json attributes (for serialization), so put the corresponding
		// shape is encapsulated in a method
		json.getShape = function () {
			return this;
		}.bind(this);
		
		return json;
	}
});
	
//对象 画布
ORYX.Core.Canvas = ORYX.Core.AbstractShape.extend({
    /** @lends ORYX.Core.Canvas.prototype */

    /**
     * Defines the current zoom level
     */
    zoomLevel:1,

    /**
     * Constructor
     */
    construct:function (options) {
        arguments.callee.$.construct.apply(this, arguments);
        if (!(options && options.width && options.height)) {

            ORYX.Log.fatal("Canvas is missing mandatory parameters options.width and options.height.");
            return;
        }

        //TODO: set document resource id
        this.resourceId = options.id;

        this.nodes = [];

        this.edges = [];
        //init svg document
        this.rootNode = ORYX.Editor.graft("http://www.w3.org/2000/svg", options.parentNode,
            ['svg', {id:this.id, width:options.width, height:options.height},
                ['defs', {}]
            ]);
        this.rootNode.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.rootNode.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
		
		
        this._htmlContainer = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", options.parentNode,
            ['div', {id:"oryx_canvas_htmlContainer", style:"position:absolute; top:5px"}]);
        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.rootNode,
            ['g', {},
                ['g', {"class":"stencils"},
                    ['g', {"class":"me"}],
                    ['g', {"class":"children"}],
                    ['g', {"class":"edge"}]
                ],
                ['g', {"class":"svgcontainer"}]
            ]);

        this.node.setAttributeNS(null, 'stroke', 'black');
        this.node.setAttributeNS(null, 'font-family', 'Verdana, sans-serif');
        this.node.setAttributeNS(null, 'font-size-adjust', 'none');
        this.node.setAttributeNS(null, 'font-style', 'normal');
        this.node.setAttributeNS(null, 'font-variant', 'normal');
        this.node.setAttributeNS(null, 'font-weight', 'normal');
        this.node.setAttributeNS(null, 'line-heigth', 'normal');

        this.node.setAttributeNS(null, 'font-size', ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT);
        this.bounds.set(0, 0, options.width, options.height);
        this.addEventHandlers(this.rootNode.parentNode);
        this.rootNode.oncontextmenu = function () {
            return false;
        };
		
    },

    getScrollNode:function () {
		return $(this.rootNode).parent("div[overflow='auto']");
        //return Ext.get(this.rootNode).parent("div{overflow=auto}", true);
    },

    focus:function () {

        try {
            // Get a href
			var self = this;
            if (!this.focusEl) {
               
				this.focusEl = $("<a></a>");
				this.focusEl.attr("href","#");
				this.focusEl.addClass("x-grid3-focus x-grid3-focus-canvas");
				this.focusEl.attr("tabIndex","-1");
            }
			//this.focusEl.focus.defer(1, this.focusEl);
			setTimeout(function(){
				self.focusEl.focus();
			},1)
            
            //this.focusEl.blur.defer(3, this.focusEl);
			setTimeout(function(){
				self.focusEl.focus();
			},3)

        } catch (e) {
        }
    },

    update:function () {
		var self = this;
		$.map(this.nodes,function(node){
			self._traverseForUpdate(node);
		});
		
        // call stencil's layout callback
        // (needed for row layouting of xforms)
        //this.getStencil().layout(this);
        var layoutEvents = this.getStencil().layout();
        if (layoutEvents) {  //ray []
			$.map(layoutEvents,function(event){
				event.shape = this;
                event.forceExecution = true;
                event.target = this.rootNode;
                self._delegateEvent(event);
			});
        }
		
		$.map(this.nodes,function(node){
			node._update();
		});
		$.map(this.edges,function(edge){
			edge._update(true);
		});
		

    },

    _traverseForUpdate:function (shape) {
        var childRet = shape.isChanged;
		var self = this;  
		shape.getChildNodes(false, function (child) {
            if (self._traverseForUpdate(child)) {
                childRet = true;
            }
		});
       
        if (childRet) {  //true
            shape.layout();
            return true;
        } else {
            return false;
        }
    },

    layout:function () {


    },

    /**
     *
     * @param {Object} deep
     * @param {Object} iterator
     */
    getChildNodes:function (deep, iterator) {
        if (!deep && !iterator) {
            return this.nodes.clone();
        } else {
            var result = [];
            this.nodes.each(function (uiObject) {
                if (iterator) {
                    iterator(uiObject);
                }
                result.push(uiObject);

                if (deep && uiObject instanceof ORYX.Core.Shape) {
                    result = result.concat(uiObject.getChildNodes(deep, iterator));
                }
            });

            return result;
        }
    },

    /**
     * buggy crap! use base class impl instead!
     * @param {Object} iterator
     */
    /*	getChildEdges: function(iterator) {
     if(iterator) {
     this.edges.each(function(edge) {
     iterator(edge);
     });
     }

     return this.edges.clone();
     },
     */
    /**
     * Overrides the UIObject.add method. Adds uiObject to the correct sub node.
     * @param {UIObject} uiObject
     */
    add:function (uiObject, index, silent) {
        //if uiObject is child of another UIObject, remove it.
        if (uiObject instanceof ORYX.Core.UIObject) {
            //if (!(this.children.member(uiObject))) {
			if ($.inArray(uiObject,this.children)<0) {  
                //if uiObject is child of another parent, remove it from that parent.
                if (uiObject.parent) {
                    uiObject.parent.remove(uiObject, true);
                }

                //add uiObject to the Canvas
                //add uiObject to this Shape
                if (index != undefined)
                    this.children.splice(index, 0, uiObject);
                else
                    this.children.push(uiObject);

                //set parent reference
                uiObject.parent = this;

                //add uiObject.node to this.node depending on the type of uiObject
                if (uiObject instanceof ORYX.Core.Shape) {
                    if (uiObject instanceof ORYX.Core.Edge) {
                        //uiObject.addMarkers(this.rootNode.getElementsByTagNameNS(NAMESPACE_SVG, "defs")[0]);
						uiObject.addMarkers($(this.rootNode).find("defs")[0]); 
                        uiObject.node = this.node.childNodes[0].childNodes[2].appendChild(uiObject.node);
                        this.edges.push(uiObject);
                    } else {
                        uiObject.node = this.node.childNodes[0].childNodes[1].appendChild(uiObject.node);
                        this.nodes.push(uiObject);
                    }
                } else {    //UIObject
                    uiObject.node = this.node.appendChild(uiObject.node);
                }

                uiObject.bounds.registerCallback(this._changedCallback);

                if (this.eventHandlerCallback && silent !== true)
                    this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED, shape:uiObject})
            } else {

                //console.log("add: ORYX.Core.UIObject is already a child of this object.");
            }
        } else {

            //console.log("add: Parameter is not of type ORYX.Core.UIObject.");
        }
		
    },

    /**
     * Overrides the UIObject.remove method. Removes uiObject.
     * @param {UIObject} uiObject
     */
    remove:function (uiObject, silent) {
        //if uiObject is a child of this object, remove it.
        if (this.children.member(uiObject)) {
            //remove uiObject from children
            var parent = uiObject.parent;

            this.children = this.children.without(uiObject);

            //delete parent reference of uiObject
            uiObject.parent = undefined;

            //delete uiObject.node from this.node
            if (uiObject instanceof ORYX.Core.Shape) {
                if (uiObject instanceof ORYX.Core.Edge) {
                    uiObject.removeMarkers();
                    uiObject.node = this.node.childNodes[0].childNodes[2].removeChild(uiObject.node);
                    this.edges = this.edges.without(uiObject);
                } else {
                    uiObject.node = this.node.childNodes[0].childNodes[1].removeChild(uiObject.node);
                    this.nodes = this.nodes.without(uiObject);
                }
            } else {    //UIObject
                uiObject.node = this.node.removeChild(uiObject.node);
            }

            if (this.eventHandlerCallback && silent !== true)
                this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEREMOVED, shape:uiObject, parent:parent});

            uiObject.bounds.unregisterCallback(this._changedCallback);
        } else {

            //console.log("remove: ORYX.Core.UIObject is not a child of this object.");
        }
    },

    /**
     * Creates shapes out of the given collection of shape objects and adds them to the canvas.
     * @example
     * canvas.addShapeObjects({
     bounds:{ lowerRight:{ y:510, x:633 }, upperLeft:{ y:146, x:210 } },
     resourceId:"oryx_F0715955-50F2-403D-9851-C08CFE70F8BD",
     childShapes:[],
     properties:{},
     stencil:{
     id:"Subprocess"
     },
     outgoing:[{resourceId: 'aShape'}],
     target: {resourceId: 'aShape'}
     });
     * @param {Object} shapeObjects
     * @param {Function} [eventHandler] An event handler passed to each newly created shape (as eventHandlerCallback)
     * @return {Array} A collection of ORYX.Core.Shape
     * @methodOf ORYX.Core.Canvas.prototype
     */
    addShapeObjects:function (shapeObjects, eventHandler) {
        if (!shapeObjects) return false;

		
		
        this.initializingShapes = true;
        /*FIXME This implementation is very evil! At first, all shapes are created on
         canvas. In a second step, the attributes are applied. There must be a distinction
         between the configuration phase (where the outgoings, for example, are just named),
         and the creation phase (where the outgoings are evaluated). This must be reflected
         in code to provide a nicer API/ implementation!!! */
		var self = this;
        var addShape = function (shape, parent) {
            // Create a new Stencil
			
			
            var stencil = ORYX.Core.StencilSet.stencil(self.getStencil().namespace() + shape.stencil.id);

			//ray 根据类型节点还是线生成相应的图形
            var ShapeClass = (stencil.type() == "node") ? ORYX.Core.Node : ORYX.Core.Edge;
			
            var newShape = new ShapeClass(
                {'eventHandlerCallback':eventHandler},
                stencil);

            // Set the resource id
            newShape.resourceId = shape.resourceId;
            newShape.node.id = "svg-" + shape.resourceId;

            // Set parent to json object to be used later
            // Due to the nested json structure, normally shape.parent is not set/ must not be set.
            // In special cases, it can be easier to set this directly instead of a nested structure.
            shape.parent = "#" + ((shape.parent && shape.parent.resourceId) || parent.resourceId);

			
            self.add(newShape);

            return {
                json:shape,
                object:newShape
            };
		}
        //}.bind(this);

        /** Builds up recursively a flatted array of shapes, including a javascript object and json representation
         * @param {Object} shape Any object that has Object#childShapes
         */
        var addChildShapesRecursively = function (shape) {
            var addedShapes = [];

			$.each(shape.childShapes,function(){
				var childShape= this;
				addedShapes.push(addShape(childShape, shape));
				addedShapes = addedShapes.concat(addChildShapesRecursively(childShape));
			});
			
            return addedShapes;
		}
		
        var shapes = addChildShapesRecursively({
            childShapes:shapeObjects,
            resourceId:this.resourceId
        });
		
        // prepare deserialisation parameter
        //shapes.each(
		var self = this;
		$.map(shapes,       
            function (shape) {
                var properties = [];
                for (field in shape.json.properties) {
                    properties.push({
                        prefix:'oryx',
                        name:field,
                        value:shape.json.properties[field]
                    });
                }

                // Outgoings
                //shape.json.outgoing.each(function (out) {
				$.map(shape.json.outgoing,function (out) {  //ray jquery 
                    properties.push({
                        prefix:'raziel',
                        name:'outgoing',
                        value:"#" + out.resourceId
                    });
                });

                // Target
                // (because of a bug, the first outgoing is taken when there is no target,
                // can be removed after some time)
                if (shape.object instanceof ORYX.Core.Edge) {
                    var target = shape.json.target || shape.json.outgoing[0];
                    if (target) {
                        properties.push({
                            prefix:'raziel',
                            name:'target',
                            value:"#" + target.resourceId
                        });
                    }
                }

                // Bounds
                if (shape.json.bounds) {
                    properties.push({
                        prefix:'oryx',
                        name:'bounds',
                        value:shape.json.bounds.upperLeft.x + "," + shape.json.bounds.upperLeft.y + "," + shape.json.bounds.lowerRight.x + "," + shape.json.bounds.lowerRight.y
                    });
                }

                //Dockers [{x:40, y:50}, {x:30, y:60}] => "40 50 30 60  #"
                if (shape.json.dockers) {
					var v = function(){  //改造 inject
						var s = "";
						$.map(shape.json.dockers,function(docker){
							s += docker.x + " " + docker.y + " ";
						});
						return s;
					}
                    properties.push({
                        prefix:'oryx',
                        name:'dockers',
                        /*value:shape.json.dockers.inject("", function (dockersStr, docker) {
                            return dockersStr + docker.x + " " + docker.y + " ";
                        }) + " #"*/
						value:v()+" #"
                    });
                }

                //Parent
                properties.push({
                    prefix:'raziel',
                    name:'parent',
                    value:shape.json.parent
                });

                shape.__properties = properties;
			}
            //}.bind(this) 
        );
		
		
        // first, deserialize all nodes
        //shapes.each(function (shape) {
		$.map(shapes,function(shape){  //
			
            if (shape.object instanceof ORYX.Core.Node) {
                shape.object.deserialize(shape.__properties, shape.json);
            }
			
			if (shape.object instanceof ORYX.Core.Edge) {
                shape.object.deserialize(shape.__properties, shape.json);
				shape.object._oldBounds = shape.object.bounds.clone();
                shape.object._update();
            }
        });
		

        delete this.initializingShapes;
		var sa = [];
		$.map(shapes,function(s){
			sa[sa.length] = s['object'];
		});
		return sa;
        //return shapes.pluck("object");  //返回的节点对象的属性基本一致，oldBounds定位的一些属性不同
    },

    /**
     * Updates the size of the canvas, regarding to the containg shapes.
     */
    updateSize:function () {
        // Check the size for the canvas
        var maxWidth = 0;
        var maxHeight = 0;
        var offset = 100;
        this.getChildShapes(true, function (shape) {
            var b = shape.bounds;
            maxWidth = Math.max(maxWidth, b.lowerRight().x + offset)
            maxHeight = Math.max(maxHeight, b.lowerRight().y + offset)
        });
		
        if (this.bounds.width() < maxWidth || this.bounds.height() < maxHeight) { //未执行
            this.setSize({width:Math.max(this.bounds.width(), maxWidth), height:Math.max(this.bounds.height(), maxHeight)})
        }
    },

    getRootNode:function () {
        return this.rootNode;
    },

    getSvgContainer:function () {
        return this.node.childNodes[1];
    },

    getHTMLContainer:function () {
        return this._htmlContainer;
    },

    /**
     * Return all elements of the same highest level
     * @param {Object} elements
     */
    getShapesWithSharedParent:function (elements) {

        // If there is no elements, return []
        if (!elements || elements.length < 1) {
            return []
        }
        // If there is one element, return this element
        if (elements.length == 1) {
            return elements
        }

        return elements.findAll(function (value) {
            var parentShape = value.parent;
            while (parentShape) {
                if (elements.member(parentShape)) return false;
                parentShape = parentShape.parent
            }
            return true;
        });
    },

    setSize:function (size, dontSetBounds) {
        if (!size || !size.width || !size.height) {
            return
        }

        if (this.rootNode.parentNode) {
            this.rootNode.parentNode.style.width = size.width + 'px';
            this.rootNode.parentNode.style.height = size.height + 'px';
        }

        this.rootNode.setAttributeNS(null, 'width', size.width);
        this.rootNode.setAttributeNS(null, 'height', size.height);

        //this._htmlContainer.style.top = "-" + (size.height + 4) + 'px';
        if (!dontSetBounds) {
            this.bounds.set({a:{x:0, y:0}, b:{x:size.width / this.zoomLevel, y:size.height / this.zoomLevel}})
        }
    },

    /**
     * Returns an SVG document of the current process.
     * @param {Boolean} escapeText Use true, if you want to parse it with an XmlParser,
     *                     false, if you want to use the SVG document in browser on client side.
     */
    getSVGRepresentation:function (escapeText) {
        // Get the serialized svg image source
        var svgClone = this.getRootNode().cloneNode(true);

        this._removeInvisibleElements(svgClone);

        var x1, y1, x2, y2;
        try {
            var bb = this.getRootNode().childNodes[1].getBBox();
            x1 = bb.x;
            y1 = bb.y;
            x2 = bb.x + bb.width;
            y2 = bb.y + bb.height;
        } catch (e) {
            this.getChildShapes(true).each(function (shape) {
                var absBounds = shape.absoluteBounds();
                var ul = absBounds.upperLeft();
                var lr = absBounds.lowerRight();
                if (x1 == undefined) {
                    x1 = ul.x;
                    y1 = ul.y;
                    x2 = lr.x;
                    y2 = lr.y;
                } else {
                    x1 = Math.min(x1, ul.x);
                    y1 = Math.min(y1, ul.y);
                    x2 = Math.max(x2, lr.x);
                    y2 = Math.max(y2, lr.y);
                }
            });
        }

        var margin = 50;

        var width, height, tx, ty;
        if (x1 == undefined) {
            width = 0;
            height = 0;
            tx = 0;
            ty = 0;
        } else {
            width = x2 - x1;
            height = y2 - y1;
            tx = -x1 + margin / 2;
            ty = -y1 + margin / 2;
        }


        // Set the width and height
        svgClone.setAttributeNS(null, 'width', width + margin);
        svgClone.setAttributeNS(null, 'height', height + margin);

        svgClone.childNodes[1].firstChild.setAttributeNS(null, 'transform', 'translate(' + tx + ", " + ty + ')');

        //remove scale factor
        svgClone.childNodes[1].removeAttributeNS(null, 'transform');

        try {
            var svgCont = svgClone.childNodes[1].childNodes[1];
            svgCont.parentNode.removeChild(svgCont);
        } catch (e) {
        }

        if (escapeText) {
            $(svgClone.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan')).each(function () {
				var elem = this;
                elem.textContent = escapeHTML(elem.textContent);
            });

            $(svgClone.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'text')).each(function () {
				var elem = this;
                if (elem.childNodes.length == 0)
                    elem.textContent = escapeHTML(elem.textContent);
            });
        }

        // generating absolute urls for the pdf-exporter
        $(svgClone.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'image')).each(function () {
			var elem = this;
            var href = elem.getAttributeNS("http://www.w3.org/1999/xlink", "href");

            if (!href.match("^(http|https)://")) {
                href = window.location.protocol + "//" + window.location.host + href;
                elem.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
            }
        });


        // escape all links
        $(svgClone.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'a')).each(function () {
			var elem = this;
            elem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", escapeHTML((elem.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "")));
        });

        return svgClone;
    },

    /**
     * Removes all nodes (and its children) that has the
     * attribute visibility set to "hidden"
     */
    _removeInvisibleElements:function (element) {
        var index = 0;
        while (index < element.childNodes.length) {
            var child = element.childNodes[index];
            if (child.getAttributeNS &&
                child.getAttributeNS(null, "visibility") === "hidden") {
                element.removeChild(child);
            } else {
                this._removeInvisibleElements(child);
                index++;
            }
        }

    },

    /**
     * This method checks all shapes on the canvas and removes all shapes that
     * contain invalid bounds values or dockers values(NaN)
     */
    /*cleanUp: function(parent) {
     if (!parent) {
     parent = this;
     }
     parent.getChildShapes().each(function(shape){
     var a = shape.bounds.a;
     var b = shape.bounds.b;
     if (isNaN(a.x) || isNaN(a.y) || isNaN(b.x) || isNaN(b.y)) {
     parent.remove(shape);
     }
     else {
     shape.getDockers().any(function(docker) {
     a = docker.bounds.a;
     b = docker.bounds.b;
     if (isNaN(a.x) || isNaN(a.y) || isNaN(b.x) || isNaN(b.y)) {
     parent.remove(shape);
     return true;
     }
     return false;
     });
     shape.getMagnets().any(function(magnet) {
     a = magnet.bounds.a;
     b = magnet.bounds.b;
     if (isNaN(a.x) || isNaN(a.y) || isNaN(b.x) || isNaN(b.y)) {
     parent.remove(shape);
     return true;
     }
     return false;
     });
     this.cleanUp(shape);
     }
     }.bind(this));
     },*/

    _delegateEvent:function (event) {
        if (this.eventHandlerCallback && ( event.target == this.rootNode || event.target == this.rootNode.parentNode )) {
            this.eventHandlerCallback(event, this);
        }
    },

    toString:function () {
        return "Canvas " + this.id
    },

    /**
     * Calls {@link ORYX.Core.AbstractShape#toJSON} and adds some stencil set information.
     */
    toJSON:function () {
        var json = arguments.callee.$.toJSON.apply(this, arguments);

//		if(ORYX.CONFIG.STENCILSET_HANDLER.length > 0) {
//			json.stencilset = {
//				url: this.getStencil().stencilSet().namespace()
//	        };
//		} else {
        json.stencilset = {
            url:this.getStencil().stencilSet().source(),
            namespace:this.getStencil().stencilSet().namespace()
        };
//		}


        return json;
    }
});


if(!ORYX.Core.StencilSet){
	ORYX.Core.StencilSet={};
}

ORYX.Core.StencilSet._stencilSetsByNamespace = new Hash();

ORYX.Core.StencilSet._stencilSetsByUrl = new Hash();

ORYX.Core.StencilSet._StencilSetNSByEditorInstance = new Hash();

ORYX.Core.StencilSet._rulesByEditorInstance = new Hash();

// object函数
ORYX.Core.StencilSet.stencilSet = function (namespace) {
    var splitted = namespace.split("#", 1);
    if (splitted.length === 1) {
        return ORYX.Core.StencilSet._stencilSetsByNamespace[splitted[0] + "#"];
    } else {
        return undefined;
    }
};
// object函数
ORYX.Core.StencilSet.stencil = function (id) {
    var ss = ORYX.Core.StencilSet.stencilSet(id);
    if (ss) {
        return ss.stencil(id);
    } else {
        return undefined;
    }
};

// object函数
ORYX.Core.StencilSet.rules = function (editorId) {
    if (!ORYX.Core.StencilSet._rulesByEditorInstance[editorId]) {
        ORYX.Core.StencilSet._rulesByEditorInstance[editorId] = new ORYX.Core.StencilSet.Rules();
        ;
    }
    return ORYX.Core.StencilSet._rulesByEditorInstance[editorId];
};

// object
ORYX.Core.StencilSet.StencilSet = Clazz.extend({
    /**
     * Constructor
     * @param source {URL} A reference to the stencil set specification.
     *
     */
    construct:function (source) {
        arguments.callee.$.construct.apply(this, arguments);

        if (!source) {
            throw "ORYX.Core.StencilSet.StencilSet(construct): Parameter 'source' is not defined.";
        }

        if (source.endsWith("/")) {
            source = source.substr(0, source.length - 1);
        }

        this._extensions = new Hash();

        this._jsonObject = {};

        this._stencils = new Hash();
        this._availableStencils = new Hash();
		var self = this;
		
        
		this._baseUrl = "../editor/stencilsets/bpmn2.0/";
		this._source = "../stencilsets/bpmn2.0/bpmn2.0.json";
		
		$.ajax({
			type:"GET"
			,url:"../editor/stencilset.json"
			,dataType:'json'
			//,url:source
			,async: false 
			,success:function(data){
				self._init(data);
			}
			,error:function(){
				this._cancelInit();
			}
		});

        if (this.errornous)
            throw "Loading stencil set " + source + " failed.";
    },

    /**
     * Finds a root stencil in this stencil set. There may be many of these. If
     * there are, the first one found will be used. In Firefox, this is the
     * topmost definition in the stencil set description file.
     */
    findRootStencilName:function () {

        // find any stencil that may be root.
        var rootStencil = this._stencils.values().find(function (stencil) {
            return stencil._jsonStencil.mayBeRoot
        });

        // if there is none, just guess the first.
        if (!rootStencil) {
            ORYX.Log.warn("Did not find any stencil that may be root. Taking a guess.");
            rootStencil = this._stencils.values()[0];
        }

        // return its id.
        return rootStencil.id();
    },

    /**
     * @param {ORYX.Core.StencilSet.StencilSet} stencilSet
     * @return {Boolean} True, if stencil set has the same namespace.
     */
    equals:function (stencilSet) {
        return (this.namespace() === stencilSet.namespace());
    },

    /**
     *
     * @param {Oryx.Core.StencilSet.Stencil} rootStencil If rootStencil is defined, it only returns stencils
     *             that could be (in)direct child of that stencil.
     */
    stencils:function (rootStencil, rules, sortByGroup) {
        if (rootStencil && rules) {
            var stencils = this._availableStencils.values();
            var containers = [rootStencil];
            var checkedContainers = [];

            var result = [];

            while (containers.size() > 0) {
                var container = containers.pop();
                checkedContainers.push(container);
                var children = stencils.findAll(function (stencil) {
                    var args = {
                        containingStencil:container,
                        containedStencil:stencil
                    };
                    return rules.canContain(args);
                });
                for (var i = 0; i < children.size(); i++) {
                    if (!checkedContainers.member(children[i])) {
                        containers.push(children[i]);
                    }
                }
                result = result.concat(children).uniq();
            }

            // Sort the result to the origin order
            result = result.sortBy(function (stencil) {
                return stencils.indexOf(stencil);
            });


            if (sortByGroup) {
                result = result.sortBy(function (stencil) {
                    return stencil.groups().first();
                });
            }

            var edges = stencils.findAll(function (stencil) {
                return stencil.type() == "edge";
            });
            result = result.concat(edges);

            return result;

        } else {
            if (sortByGroup) {
                return this._availableStencils.values().sortBy(function (stencil) {
                    return stencil.groups().first();
                });
            } else {
				return $.map(this._availableStencils,function(value){
						if (typeof value==='object' && value instanceof ORYX.Core.StencilSet.Stencil){
							return value;
						}
				});
			}
            
        }
    },

    nodes:function () {
        /*return this._availableStencils.values().findAll(function (stencil) {
            return (stencil.type() === 'node')
        });*/
		var tmp=[];
		$.map(this._availableStencils.values(),function(stencil){
			if((stencil.type() === 'node')){
				tmp[tmp.length] = stencil;
			}
		});
		return tmp;
    },

    edges:function () {
        /*return this._availableStencils.values().findAll(function (stencil) {
            return (stencil.type() === 'edge')
        });*/
		var tmp=[];
		$.map(this._availableStencils.values(),function(stencil){
			if((stencil.type() === 'edge')){
				tmp[tmp.length] = stencil;
			}
		});
		return tmp;
		
    },

    stencil:function (id) {
        return this._stencils[id];
    },

    title:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonObject, "title");
    },

    description:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonObject, "description");
    },

    namespace:function () {
        return this._jsonObject ? this._jsonObject.namespace : null;
    },

    jsonRules:function () {
        return this._jsonObject ? this._jsonObject.rules : null;
    },

    source:function () {
        return this._source;
    },

    extensions:function () {
        return this._extensions;
    },

    addExtension:function (url) {

        new Ajax.Request(url, {
            method:'GET',
            asynchronous:false,
            onSuccess:(function (transport) {
                this.addExtensionDirectly(transport.responseText);
            }).bind(this),
            onFailure:(function (transport) {
                ORYX.Log.debug("Loading stencil set extension file failed. The request returned an error." + transport);
            }).bind(this),
            onException:(function (transport) {
                ORYX.Log.debug("Loading stencil set extension file failed. The request returned an error." + transport);
            }).bind(this)

        });
    },

    addExtensionDirectly:function (str) {

        try {
            eval("var jsonExtension = " + str);

            if (!(jsonExtension["extends"].endsWith("#")))
                jsonExtension["extends"] += "#";

            if (jsonExtension["extends"] == this.namespace()) {
                this._extensions[jsonExtension.namespace] = jsonExtension;

                var defaultPosition = this._stencils.keys().size();
                //load new stencils
                if (jsonExtension.stencils) {
                    $A(jsonExtension.stencils).each(function (stencil) {
                        defaultPosition++;
                        var oStencil = new ORYX.Core.StencilSet.Stencil(stencil, this.namespace(), this._baseUrl, this, undefined, defaultPosition);
                        this._stencils[oStencil.id()] = oStencil;
                        this._availableStencils[oStencil.id()] = oStencil;
                    }.bind(this));
                }

                //load additional properties
                if (jsonExtension.properties) {
                    var stencils = this._stencils.values();

                    stencils.each(function (stencil) {
                        var roles = stencil.roles();

                        jsonExtension.properties.each(function (prop) {
                            prop.roles.any(function (role) {
                                role = jsonExtension["extends"] + role;
                                if (roles.member(role)) {
                                    prop.properties.each(function (property) {
                                        stencil.addProperty(property, jsonExtension.namespace);
                                    });

                                    return true;
                                }
                                else
                                    return false;
                            })
                        })
                    }.bind(this));
                }

                //remove stencil properties
                if (jsonExtension.removeproperties) {
                    jsonExtension.removeproperties.each(function (remprop) {
                        var stencil = this.stencil(jsonExtension["extends"] + remprop.stencil);
                        if (stencil) {
                            remprop.properties.each(function (propId) {
                                stencil.removeProperty(propId);
                            });
                        }
                    }.bind(this));
                }

                //remove stencils
                if (jsonExtension.removestencils) {
                    $A(jsonExtension.removestencils).each(function (remstencil) {
                        delete this._availableStencils[jsonExtension["extends"] + remstencil];
                    }.bind(this));
                }
            }
        } catch (e) {
            ORYX.Log.debug("StencilSet.addExtension: Something went wrong when initialising the stencil set extension. " + e);
        }
    },

    removeExtension:function (namespace) {
        var jsonExtension = this._extensions[namespace];
        if (jsonExtension) {

            //unload extension's stencils
            if (jsonExtension.stencils) {
                $A(jsonExtension.stencils).each(function (stencil) {
                    var oStencil = new ORYX.Core.StencilSet.Stencil(stencil, this.namespace(), this._baseUrl, this);
                    delete this._stencils[oStencil.id()]; // maybe not ??
                    delete this._availableStencils[oStencil.id()];
                }.bind(this));
            }

            //unload extension's properties
            if (jsonExtension.properties) {
                var stencils = this._stencils.values();

                stencils.each(function (stencil) {
                    var roles = stencil.roles();

                    jsonExtension.properties.each(function (prop) {
                        prop.roles.any(function (role) {
                            role = jsonExtension["extends"] + role;
                            if (roles.member(role)) {
                                prop.properties.each(function (property) {
                                    stencil.removeProperty(property.id);
                                });

                                return true;
                            }
                            else
                                return false;
                        })
                    })
                }.bind(this));
            }

            //restore removed stencil properties
            if (jsonExtension.removeproperties) {
                jsonExtension.removeproperties.each(function (remprop) {
                    var stencil = this.stencil(jsonExtension["extends"] + remprop.stencil);
                    if (stencil) {
                        var stencilJson = $A(this._jsonObject.stencils).find(function (s) {
                            return s.id == stencil.id()
                        });
                        remprop.properties.each(function (propId) {
                            var propertyJson = $A(stencilJson.properties).find(function (p) {
                                return p.id == propId
                            });
                            stencil.addProperty(propertyJson, this.namespace());
                        }.bind(this));
                    }
                }.bind(this));
            }

            //restore removed stencils
            if (jsonExtension.removestencils) {
                $A(jsonExtension.removestencils).each(function (remstencil) {
                    var sId = jsonExtension["extends"] + remstencil;
                    this._availableStencils[sId] = this._stencils[sId];
                }.bind(this));
            }
        }
        delete this._extensions[namespace];
    },

    __handleStencilset:function (response) {

        try {
            // using eval instead of prototype's parsing,
            // since there are functions in this JSON.
            //eval("this._jsonObject =" + response.responseText);
			this._jsonObject = response;  
        }
        catch (e) {
            throw "Stenciset corrupt: " + e;
        }
		
		
        // assert it was parsed.
        if (!this._jsonObject) {
            throw "Error evaluating stencilset. It may be corrupt.";
        }
		
        with (this._jsonObject) {
            // assert there is a namespace.
            if (!namespace || namespace === "")
                throw "Namespace definition missing in stencilset.";

            if (!(stencils instanceof Array))
                throw "Stencilset corrupt.";

            // assert namespace ends with '#'.
            if (!namespace.endsWith("#")){
                namespace = namespace + "#";
			}
            // assert title and description are strings.
            if (!title)
                title = "";
            if (!description)
                description = "";
        }
    },

    /**
     * This method is called when the HTTP request to get the requested stencil
     * set succeeds. The response is supposed to be a JSON representation
     * according to the stencil set specification.
     * @param {Object} response The JSON representation according to the
     *             stencil set specification.
     */
    _init:function (response) {

        // init and check consistency.
        this.__handleStencilset(response); //获取数据保存在this._josnObject.propertyPackages

        var pps = new Hash();
		
        // init property packages
        if (this._jsonObject.propertyPackages) {
			$.map(this._jsonObject.propertyPackages,function(pp){
				pps[pp.name] = pp.properties;
			});
        }

        var defaultPosition = 0;

        
		var self = this;
		$.map(this._jsonObject.stencils,function(stencil){
			defaultPosition++;
			 var oStencil = new ORYX.Core.StencilSet.Stencil(stencil, self.namespace(), self._baseUrl, self, pps, defaultPosition);
			//名称对应到对象分别存放在_stencils与_availableStencils
            self._stencils[oStencil.id()] = oStencil;
            self._availableStencils[oStencil.id()] = oStencil;
		});
    },

    _cancelInit:function (response) {
        this.errornous = true;
    },

    toString:function () {
        return "StencilSet " + this.title() + " (" + this.namespace() + ")";
    }
});

//ray  对象
ORYX.Core.StencilSet.loadStencilSet = function (url, editorId) {
	
    var stencilSet = ORYX.Core.StencilSet._stencilSetsByUrl[url];
    if (!stencilSet) {
        //load stencil set
		
        stencilSet = new ORYX.Core.StencilSet.StencilSet(url); 

        //store stencil set
        ORYX.Core.StencilSet._stencilSetsByNamespace[stencilSet.namespace()] = stencilSet;

        //store stencil set by url
        ORYX.Core.StencilSet._stencilSetsByUrl[url] = stencilSet;
    }
	
    var namespace = stencilSet.namespace();
	
    //store which editorInstance loads the stencil set
    if (ORYX.Core.StencilSet._StencilSetNSByEditorInstance[editorId]) { 
        ORYX.Core.StencilSet._StencilSetNSByEditorInstance[editorId].push(namespace);
    } else {
        ORYX.Core.StencilSet._StencilSetNSByEditorInstance[editorId] = [namespace];
    }

    //store the rules for the editor instance
    if (ORYX.Core.StencilSet._rulesByEditorInstance[editorId]) {   
        ORYX.Core.StencilSet._rulesByEditorInstance[editorId].initializeRules(stencilSet);
    } else {
	
        var rules = new ORYX.Core.StencilSet.Rules();
        rules.initializeRules(stencilSet); 
        ORYX.Core.StencilSet._rulesByEditorInstance[editorId] = rules;
		
    }
	return stencilSet;
};


//
ORYX.Core.StencilSet.Rules = {

    /**
     * Constructor
     */
    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);
        this._stencilSets = [];
        this._stencils = [];
        this._containerStencils = [];

        this._cachedConnectSET = new Hash();
        this._cachedConnectSE = new Hash();
        this._cachedConnectTE = new Hash();
        this._cachedCardSE = new Hash();
        this._cachedCardTE = new Hash();
        this._cachedContainPC = new Hash();
        this._cachedMorphRS = new Hash();

        this._connectionRules = new Hash();
        this._cardinalityRules = new Hash();
        this._containmentRules = new Hash();
        this._morphingRules = new Hash();
        this._layoutRules = new Hash();
    },

    /**
     * Call this method to initialize the rules for a stencil set and all of its
     * active extensions.
     *
     * @param {Object}
        *            stencilSet
     */
    initializeRules:function (stencilSet) {
        var existingSS = this._stencilSets.find(function (ss) {
            return (ss.namespace() == stencilSet.namespace());
        });
		
        if (existingSS) {  //undefined
            // reinitialize all rules
            //var stencilsets = this._stencilSets.clone();
			var stencilsets=[];
			var stencilsets = this._stencilSets.clone();
            stencilsets = stencilsets.without(existingSS);  
            stencilsets.push(stencilSet);

            this._stencilSets = [];
            this._stencils = [];
            this._containerStencils = [];

            this._cachedConnectSET = new Hash();
            this._cachedConnectSE = new Hash();
            this._cachedConnectTE = new Hash();
            this._cachedCardSE = new Hash();
            this._cachedCardTE = new Hash();
            this._cachedContainPC = new Hash();
            this._cachedMorphRS = new Hash();

            this._connectionRules = new Hash();
            this._cardinalityRules = new Hash();
            this._containmentRules = new Hash();
            this._morphingRules = new Hash();
            this._layoutRules = new Hash();
			var self = this;
			$.each(stencilsets,function(){   //ray
				var ss = this;
				self.initializeRules(ss);
			})

            /*stencilsets.each(function (ss) {
                this.initializeRules(ss);
            }.bind(this));*/
            return;
        }
        else {
			if(typeof stencilSet==='object'){
				this._stencilSets.push(stencilSet);

				//var jsonRules = new Hash(stencilSet.jsonRules());
				var jsonRules = stencilSet.jsonRules();
				var namespace = stencilSet.namespace();//http://b3mn.org/stencilset/bpmn2.0#
				var stencils = stencilSet.stencils();
				
				stencilSet.extensions().values().each(function (extension) {
					if (extension.rules) {
						if (extension.rules.connectionRules)
							jsonRules.connectionRules = jsonRules.connectionRules.concat(extension.rules.connectionRules);
						if (extension.rules.cardinalityRules)
							jsonRules.cardinalityRules = jsonRules.cardinalityRules.concat(extension.rules.cardinalityRules);
						if (extension.rules.containmentRules)
							jsonRules.containmentRules = jsonRules.containmentRules.concat(extension.rules.containmentRules);
						if (extension.rules.morphingRules)
							jsonRules.morphingRules = jsonRules.morphingRules.concat(extension.rules.morphingRules);
					}
					if (extension.stencils)
						stencils = stencils.concat(extension.stencils);
				});
				
				

				this._stencils = this._stencils.concat(stencilSet.stencils());
			
				// init connection rules
				var cr = this._connectionRules;
				var self = this;
				if (jsonRules.connectionRules) {
					//jsonRules.connectionRules.each((function (rules) {
					$.map(jsonRules.connectionRules,function (rules) {
						if (self._isRoleOfOtherNamespace(rules.role)) {
							if (!cr[rules.role]) {
								cr[rules.role] = new Hash();
							}
						}
						else {
							if (!cr[namespace + rules.role])
								cr[namespace + rules.role] = new Hash();
						}
						//rules.connects.each((function (connect) {
						$.map(rules.connects,function (connect) {
							var toRoles = [];
							if (connect.to) {
								if (!(connect.to instanceof Array)) {
									connect.to = [connect.to];
								}
								//connect.to.each((function (to) {
								$.map(connect.to,function (to) {
									if (self._isRoleOfOtherNamespace(to)) {
										toRoles.push(to);
									}
									else {
										toRoles.push(namespace + to);
									}
								});//}).bind(this));
							}

							var role, from;
							if (self._isRoleOfOtherNamespace(rules.role))
								role = rules.role;
							else
								role = namespace + rules.role;

							if (self._isRoleOfOtherNamespace(connect.from))
								from = connect.from;
							else
								from = namespace + connect.from;

							if (!cr[role][from])
								cr[role][from] = toRoles;
							else
								cr[role][from] = cr[role][from].concat(toRoles);

						}); //}).bind(this));
					}); //}).bind(this));
				}
				// init cardinality rules
				var cardr = this._cardinalityRules;
				if (jsonRules.cardinalityRules) {
					//jsonRules.cardinalityRules.each((function (rules) {
					$.map(jsonRules.cardinalityRules,function (rules) {
						var cardrKey;
						if (self._isRoleOfOtherNamespace(rules.role)) {
							cardrKey = rules.role;
						}
						else {
							cardrKey = namespace + rules.role;
						}

						if (!cardr[cardrKey]) {
							cardr[cardrKey] = {};
							for (i in rules) {
								cardr[cardrKey][i] = rules[i];
							}
						}

						var oe = new Hash();
						if (rules.outgoingEdges) {
							//rules.outgoingEdges.each((function (rule) {
							$.map(rules.outgoingEdges,function (rule) {
								if (self._isRoleOfOtherNamespace(rule.role)) {
									oe[rule.role] = rule;
								}
								else {
									oe[namespace + rule.role] = rule;
								}
							});//}).bind(this));
						}
						cardr[cardrKey].outgoingEdges = oe;
						var ie = new Hash();
						if (rules.incomingEdges) {
							//rules.incomingEdges.each((function (rule) {
							$.map(rules.incomingEdges,function (rule) {
								if (self._isRoleOfOtherNamespace(rule.role)) {
									ie[rule.role] = rule;
								}
								else {
									ie[namespace + rule.role] = rule;
								}
							});//}).bind(this));
						}
						cardr[cardrKey].incomingEdges = ie;
					});//}).bind(this));
				}
				// init containment rules
				var conr = this._containmentRules;
				if (jsonRules.containmentRules) {
					//jsonRules.containmentRules.each((function (rules) {
					$.map(jsonRules.containmentRules,function (rules) {
						var conrKey;
						if (self._isRoleOfOtherNamespace(rules.role)) {
							conrKey = rules.role;
						}
						else {
							self._containerStencils.push(namespace + rules.role);
							conrKey = namespace + rules.role;
						}
						if (!conr[conrKey]) {
							conr[conrKey] = [];
						}
						//(rules.contains || []).each((function (containRole) {
						$.map((rules.contains || []),function (containRole) {
							if (self._isRoleOfOtherNamespace(containRole)) {
								conr[conrKey].push(containRole);
							}
							else {
								conr[conrKey].push(namespace + containRole);
							}
						});//}).bind(this));
					});//}).bind(this));
				}
				// init morphing rules
				var morphr = this._morphingRules;
				
				if (jsonRules.morphingRules) { //7个obj
					//jsonRules.morphingRules.each((function (rules) {
					$.map(jsonRules.morphingRules,function (rules) {
						var morphrKey;
						if (self._isRoleOfOtherNamespace(rules.role)) {
							morphrKey = rules.role;
						}
						else {
							morphrKey = namespace + rules.role;
						}
						if (!morphr[morphrKey]) {
							morphr[morphrKey] = [];
						}
						if (!rules.preserveBounds) {
							rules.preserveBounds = false;
						}
						
						//rules.baseMorphs.each((function (baseMorphStencilId) { // morphrKey最后面的关键字
						$.map(rules.baseMorphs,function (baseMorphStencilId) { 
							var morphStencil = self._getStencilById(namespace + baseMorphStencilId);
							if (morphStencil) {
								morphr[morphrKey].push(morphStencil);
							}
						});//}).bind(this));
					});//}).bind(this));
				}
				
				

				// init layouting rules
				var layoutRules = this._layoutRules;
				
				if (jsonRules.layoutRules) { //ray undefined

					var getDirections = function (o) {
						return {
							"edgeRole":o.edgeRole || undefined,
							"t":o["t"] || 1,
							"r":o["r"] || 1,
							"b":o["b"] || 1,
							"l":o["l"] || 1
						}
					}
					
					//jsonRules.layoutRules.each(function (rules) {
					$.map(jsonRules.layoutRules,function (rules) {
						var layoutKey;
						if (self._isRoleOfOtherNamespace(rules.role)) {
							layoutKey = rules.role;
						}
						else {
							layoutKey = namespace + rules.role;
						}
						if (!layoutRules[layoutKey]) {
							layoutRules[layoutKey] = {};
						}
						if (rules["in"]) {
							layoutRules[layoutKey]["in"] = getDirections(rules["in"]);
						}
						if (rules["ins"]) {
							layoutRules[layoutKey]["ins"] = (rules["ins"] || []).map(function (e) {
								return getDirections(e)
							})
						}
						if (rules["out"]) {
							layoutRules[layoutKey]["out"] = getDirections(rules["out"]);
						}
						if (rules["outs"]) {
							layoutRules[layoutKey]["outs"] = (rules["outs"] || []).map(function (e) {
								return getDirections(e)
							})
						}
					});//}.bind(this));
				}
			}
        }
    },

    _getStencilById:function (id) {
        return this._stencils.find(function (stencil) {
            return stencil.id() == id;
        });
    },

    _cacheConnect:function (args) {
        result = this._canConnect(args);

        if (args.sourceStencil && args.targetStencil) {
            var source = this._cachedConnectSET[args.sourceStencil.id()];

            if (!source) {
                source = new Hash();
                this._cachedConnectSET[args.sourceStencil.id()] = source;
            }

            var edge = source[args.edgeStencil.id()];

            if (!edge) {
                edge = new Hash();
                source[args.edgeStencil.id()] = edge;
            }

            edge[args.targetStencil.id()] = result;

        } else if (args.sourceStencil) { 
            var source = this._cachedConnectSE[args.sourceStencil.id()];

            if (!source) {
                source = new Hash();
                this._cachedConnectSE[args.sourceStencil.id()] = source;
            }
			
			

            source[args.edgeStencil.id()] = result;

        } else {
            var target = this._cachedConnectTE[args.targetStencil.id()];

            if (!target) {
                target = new Hash();
                this._cachedConnectTE[args.targetStencil.id()] = target;
            }

            target[args.edgeStencil.id()] = result;
        }

        return result;
    },

    _cacheCard:function (args) {

        if (args.sourceStencil) {
            var source = this._cachedCardSE[args.sourceStencil.id()]

            if (!source) {
                source = new Hash();
                this._cachedCardSE[args.sourceStencil.id()] = source;
            }

            var max = this._getMaximumNumberOfOutgoingEdge(args);
            if (max == undefined)
                max = -1;

            source[args.edgeStencil.id()] = max;
        }

        if (args.targetStencil) {
            var target = this._cachedCardTE[args.targetStencil.id()]

            if (!target) {
                target = new Hash();
                this._cachedCardTE[args.targetStencil.id()] = target;
            }

            var max = this._getMaximumNumberOfIncomingEdge(args);
            if (max == undefined)
                max = -1;

            target[args.edgeStencil.id()] = max;
        }
    },

    _cacheContain:function (args) {

        var result = [this._canContain(args),
            this._getMaximumOccurrence(args.containingStencil, args.containedStencil)]

        if (result[1] == undefined)
            result[1] = -1;

        var children = this._cachedContainPC[args.containingStencil.id()];

        if (!children) {
            children = new Hash();
            this._cachedContainPC[args.containingStencil.id()] = children;
        }

        children[args.containedStencil.id()] = result;

        return result;
    },

    /**
     * Returns all stencils belonging to a morph group. (calculation result is
     * cached)
     */
    _cacheMorph:function (role) {  //从内存里面取
        var morphs = this._cachedMorphRS[role];

        if (!morphs) {
            morphs = [];
			
            if (this._morphingRules.keys().include(role)) {
                /*morphs = this._stencils.select(function (stencil) {
                    return stencil.roles().include(role);
                });*/
				var tmp=[];
				$.map(this._stencils,function(stencil){
					if(stencil.roles().include(role)){
						tmp[tmp.length] = stencil;
					}
				});
				morphs = tmp;  // ray jquery 改造上面的
            }
            this._cachedMorphRS[role] = morphs;
        }
		
        return morphs;
    },

    /** Begin connection rules' methods */

    /**
     *
     * @param {Object}
        *            args sourceStencil: ORYX.Core.StencilSet.Stencil | undefined
     *            sourceShape: ORYX.Core.Shape | undefined
     *
     * At least sourceStencil or sourceShape has to be specified
     *
     * @return {Array} Array of stencils of edges that can be outgoing edges of
     *         the source.
     */
    outgoingEdgeStencils:function (args) {
        // check arguments
        if (!args.sourceShape && !args.sourceStencil) {
            return [];
        }

        // init arguments
        if (args.sourceShape) {
            args.sourceStencil = args.sourceShape.getStencil();
        }

        var _edges = [];

        // test each edge, if it can connect to source
        //this._stencils.each((function (stencil) {
		var self = this;
		$.map(this._stencils,function (stencil,i) {
            if (stencil.type() === "edge") {
                var newArgs = $.extend(true,{},args);
                newArgs.edgeStencil = stencil;
                if (self.canConnect(newArgs)) { //
                    _edges.push(stencil);
                }
            }
        });//}).bind(this));

        return _edges;
    },

    /**
     *
     * @param {Object}
        *            args targetStencil: ORYX.Core.StencilSet.Stencil | undefined
     *            targetShape: ORYX.Core.Shape | undefined
     *
     * At least targetStencil or targetShape has to be specified
     *
     * @return {Array} Array of stencils of edges that can be incoming edges of
     *         the target.
     */
    incomingEdgeStencils:function (args) {
		
		
	
        // check arguments
        if (!args.targetShape && !args.targetStencil) {
            return [];
        }

        // init arguments
        if (args.targetShape) {
            args.targetStencil = args.targetShape.getStencil();
        }

        var _edges = [];

        // test each edge, if it can connect to source
        //this._stencils.each((function (stencil) {
		var self = this;
		$.map(this._stencils,function (stencil) {
            if (stencil.type() === "edge") {
                //var newArgs = Object.clone(args);
				var newArgs = $.extend(true,{},args);
                newArgs.edgeStencil = stencil;
                if (self.canConnect(newArgs)) {
                    _edges.push(stencil);
                }
            }
        });//}).bind(this));
	
        return _edges;
    },

    /**
     *
     * @param {Object}
        *            args edgeStencil: ORYX.Core.StencilSet.Stencil | undefined
     *            edgeShape: ORYX.Core.Edge | undefined targetStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined targetShape:
     *            ORYX.Core.Node | undefined
     *
     * At least edgeStencil or edgeShape has to be specified!!!
     *
     * @return {Array} Returns an array of stencils that can be source of the
     *         specified edge.
     */
    sourceStencils:function (args) {
        // check arguments
        if (!args ||
            !args.edgeShape && !args.edgeStencil) {
            return [];
        }

        // init arguments
        if (args.targetShape) {
            args.targetStencil = args.targetShape.getStencil();
        }

        if (args.edgeShape) {
            args.edgeStencil = args.edgeShape.getStencil();
        }

        var _sources = [];

        // check each stencil, if it can be a source
        //this._stencils.each((function (stencil) {
		var self = this;
		$.map(this._stencils,function (stencil) {
            //var newArgs = Object.clone(args);
				var newArgs = $.extend(true,{},args);
            newArgs.sourceStencil = stencil;
            if (this.canConnect(newArgs)) {
                _sources.push(stencil);
            }
        });//}).bind(this));

        return _sources;
    },

    /**
     *
     * @param {Object}
        *            args edgeStencil: ORYX.Core.StencilSet.Stencil | undefined
     *            edgeShape: ORYX.Core.Edge | undefined sourceStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined sourceShape:
     *            ORYX.Core.Node | undefined
     *
     * At least edgeStencil or edgeShape has to be specified!!!
     *
     * @return {Array} Returns an array of stencils that can be target of the
     *         specified edge.
     */
    targetStencils:function (args) {
        // check arguments
        if (!args ||
            !args.edgeShape && !args.edgeStencil) {
            return [];
        }

        // init arguments
        if (args.sourceShape) {
            args.sourceStencil = args.sourceShape.getStencil();
        }

        if (args.edgeShape) {
            args.edgeStencil = args.edgeShape.getStencil();
        }

        var _targets = [];

        // check stencil, if it can be a target
        //this._stencils.each((function (stencil) {
		var self = this;
		$.map(this._stencils,function (stencil) {
            //var newArgs = Object.clone(args);
			var newArgs = $.extend(true,{},args);
            newArgs.targetStencil = stencil;
            if (self.canConnect(newArgs)) {
                _targets.push(stencil);
            }
        });//}).bind(this));

        return _targets;
    },

    /**
     *
     * @param {Object}
        *            args edgeStencil: ORYX.Core.StencilSet.Stencil edgeShape:
     *            ORYX.Core.Edge |undefined sourceStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined sourceShape:
     *            ORYX.Core.Node |undefined targetStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined targetShape:
     *            ORYX.Core.Node |undefined
     *
     * At least source or target has to be specified!!!
     *
     * @return {Boolean} Returns, if the edge can connect source and target.
     */
    canConnect:function (args) {
        // check arguments
		
        if (!args ||
            (!args.sourceShape && !args.sourceStencil &&
                !args.targetShape && !args.targetStencil) ||
            !args.edgeShape && !args.edgeStencil) {
            return false;
        }

        // init arguments
        if (args.sourceShape) {
            args.sourceStencil = args.sourceShape.getStencil();
        }
        if (args.targetShape) {
            args.targetStencil = args.targetShape.getStencil();
        }
        if (args.edgeShape) {
            args.edgeStencil = args.edgeShape.getStencil();
        }

        var result;

        if (args.sourceStencil && args.targetStencil) {
		
            var source = this._cachedConnectSET[args.sourceStencil.id()];

            if (!source)
                result = this._cacheConnect(args);
            else {
                var edge = source[args.edgeStencil.id()];

                if (!edge)
                    result = this._cacheConnect(args);
                else {
                    var target = edge[args.targetStencil.id()];

                    if (target == undefined)
                        result = this._cacheConnect(args);
                    else
                        result = target;
                }
            }
        } else if (args.sourceStencil) {  //点击节点执行处
            var source = this._cachedConnectSE[args.sourceStencil.id()];

            if (!source)
			
                result = this._cacheConnect(args);
            else {
                var edge = source[args.edgeStencil.id()];

                if (edge == undefined)
                    result = this._cacheConnect(args);
                else
                    result = edge;
            }
			
        } else { // args.targetStencil
            var target = this._cachedConnectTE[args.targetStencil.id()];

            if (!target)
                result = this._cacheConnect(args);
            else {
                var edge = target[args.edgeStencil.id()];

                if (edge == undefined)
                    result = this._cacheConnect(args);
                else
                    result = edge;
            }
        }

		
        // check cardinality
        if (result) {
            if (args.sourceShape) {
                var source = this._cachedCardSE[args.sourceStencil.id()];

                if (!source) {
                    this._cacheCard(args);
                    source = this._cachedCardSE[args.sourceStencil.id()];
                }

                var max = source[args.edgeStencil.id()];

                if (max == undefined) {
                    this._cacheCard(args);
                }

                max = source[args.edgeStencil.id()];

                if (max != -1) {
                    /*result = args.sourceShape.getOutgoingShapes().all(function (cs) {
                        if ((cs.getStencil().id() === args.edgeStencil.id()) &&
                            ((args.edgeShape) ? cs !== args.edgeShape : true)) {
                            max--;
                            return (max > 0) ? true : false;
                        } else {
                            return true;
                        }
                    });*/
					
					var tmp = true;
					$.map(args.sourceShape.getOutgoingShapes(),function(cs){
						if ((cs.getStencil().id() === args.edgeStencil.id()) &&
                            ((args.edgeShape) ? cs !== args.edgeShape : true)) {
							max--;
							if(max <= 0){
								tmp=false;
								return false;
							}
						}
						else {
							return true;
						}
					});
					result = tmp;
					
                }
            }

            if (args.targetShape) {
                var target = this._cachedCardTE[args.targetStencil.id()];

                if (!target) {
                    this._cacheCard(args);
                    target = this._cachedCardTE[args.targetStencil.id()];
                }

                var max = target[args.edgeStencil.id()];

                if (max == undefined) {
                    this._cacheCard(args);
                }

                max = target[args.edgeStencil.id()];

                if (max != -1) {
                    /*result = args.targetShape.getIncomingShapes().all(function (cs) {
                        if ((cs.getStencil().id() === args.edgeStencil.id()) &&
                            ((args.edgeShape) ? cs !== args.edgeShape : true)) {
                            max--;
                            return (max > 0) ? true : false;
                        }
                        else {
                            return true;
                        }
                    });*/
					var tmp = true;
					$.map(args.targetShape.getIncomingShapes(),function(cs){
						if ((cs.getStencil().id() === args.edgeStencil.id()) &&
							((args.edgeShape) ? cs !== args.edgeShape : true)) {
							max--;
							if(max <= 0){
								tmp=false;
								return false;
							}
						}
						else {
							return true;
						}
					});
					
					result = tmp;
					
                }
            }
        }

        return result;
    },

    /**
     *
     * @param {Object}
        *            args edgeStencil: ORYX.Core.StencilSet.Stencil edgeShape:
     *            ORYX.Core.Edge |undefined sourceStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined sourceShape:
     *            ORYX.Core.Node |undefined targetStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined targetShape:
     *            ORYX.Core.Node |undefined
     *
     * At least source or target has to be specified!!!
     *
     * @return {Boolean} Returns, if the edge can connect source and target.
     */
    _canConnect:function (args) {
        // check arguments
        if (!args ||
            (!args.sourceShape && !args.sourceStencil &&
                !args.targetShape && !args.targetStencil) ||
            !args.edgeShape && !args.edgeStencil) {
            return false;
        }

        // init arguments
        if (args.sourceShape) {
            args.sourceStencil = args.sourceShape.getStencil();
        }
        if (args.targetShape) {
            args.targetStencil = args.targetShape.getStencil();
        }
        if (args.edgeShape) {
            args.edgeStencil = args.edgeShape.getStencil();
        }
		
        var resultCR;

        // get all connection rules for this edge
        var edgeRules = this._getConnectionRulesOfEdgeStencil(args.edgeStencil);

        // check connection rules, if the source can be connected to the target
        // with the specified edge.
		
        if (edgeRules.keys().length === 0) {
            resultCR = false;
        } else {
            if (args.sourceStencil) {
               
				var tmp = false;
				
				$.map(args.sourceStencil.roles(),function (sourceRole) {
					var targetRoles = edgeRules[sourceRole];
					if (!targetRoles) {
                        return true;
                    }
					if (args.targetStencil) {
                        $.map(targetRoles,function(targetRole){   //http://b3mn.org/stencilset/bpmn2.0#sequence_end
							if(args.targetStencil.roles().member(targetRole)){
								tmp = true;
								return false;
							}
						});
                    }else{
						tmp = true;
						return false;
					}
					
				});
				resultCR = tmp;
				
            } else { // !args.sourceStencil -> there is args.targetStencil
                resultCR = edgeRules.values().any(function (targetRoles) {
                    return args.targetStencil.roles().any(function (targetRole) {
                        return targetRoles.member(targetRole);
                    });
                });
				/*var tmp = false;
				$.map(edgeRules.values(),function(targetRoles){
					$.map(args.targetStencil.roles(),function(targetRole){
						if(targetRoles.member(targetRole)){
							tmp = true;
							return false;
						}
					});
				});
				resultCR = tmp;*/
            }
        }
        return resultCR;
    },

    /** End connection rules' methods */


    /** Begin containment rules' methods */

    isContainer:function (shape) {
        return this._containerStencils.member(shape.getStencil().id());
    },

    /**
     *
     * @param {Object}
        *            args containingStencil: ORYX.Core.StencilSet.Stencil
     *            containingShape: ORYX.Core.AbstractShape containedStencil:
     *            ORYX.Core.StencilSet.Stencil containedShape: ORYX.Core.Shape
     */
    canContain:function (args) {
        if (!args ||
            !args.containingStencil && !args.containingShape ||
            !args.containedStencil && !args.containedShape) {
            return false;
        }

        // init arguments
        if (args.containedShape) {
            args.containedStencil = args.containedShape.getStencil();
        }

        if (args.containingShape) {
            args.containingStencil = args.containingShape.getStencil();
        }

        //if(args.containingStencil.type() == 'edge' || args.containedStencil.type() == 'edge')
        //	return false;
        if (args.containedStencil.type() == 'edge')
            return false;
		if (args.containedStencil.type() == 'node'){
			if(args.containedStencil.id().endWith("BoundaryTimerEvent")){  //定时器边界事件
				return false;
			}
			//定时器启动事件不能放入子流程中
			if(args.containedStencil.id().endWith("StartTimerEvent") && args.containingShape._stencil.id().endWith("SubProcess")){
				return false;
			}
		}

        var childValues;

        var parent = this._cachedContainPC[args.containingStencil.id()];

        if (!parent)
            childValues = this._cacheContain(args);
        else {
            childValues = parent[args.containedStencil.id()];

            if (!childValues)
                childValues = this._cacheContain(args);
        }

        if (!childValues[0])
            return false;
        else if (childValues[1] == -1)
            return true;
        else {
            if (args.containingShape) {
                var max = childValues[1];
                return args.containingShape.getChildShapes(false).all(function (as) {
                    if (as.getStencil().id() === args.containedStencil.id()) {
                        max--;
                        return (max > 0) ? true : false;
                    } else {
                        return true;
                    }
                });
            } else {
                return true;
            }
        }
    },

    /**
     *
     * @param {Object}
        *            args containingStencil: ORYX.Core.StencilSet.Stencil
     *            containingShape: ORYX.Core.AbstractShape containedStencil:
     *            ORYX.Core.StencilSet.Stencil containedShape: ORYX.Core.Shape
     */
    _canContain:function (args) {  //初始页面时右边的属性grid会自动加载
		
        if (!args ||
            !args.containingStencil && !args.containingShape ||
            !args.containedStencil && !args.containedShape) {
            return false;
        }

        // init arguments
        if (args.containedShape) {
            args.containedStencil = args.containedShape.getStencil();
        }

        if (args.containingShape) {
            args.containingStencil = args.containingShape.getStencil();
        }

//		if(args.containingShape) {
//			if(args.containingShape instanceof ORYX.Core.Edge) {
//				// edges cannot contain other shapes
//				return false;
//			}
//		}


        var result;

        // check containment rules
        /*result = args.containingStencil.roles().any((function (role) {
            var roles = this._containmentRules[role];
            if (roles) {
                return roles.any(function (role) {
                    return args.containedStencil.roles().member(role);
                });
            } else {
                return false;
            }
        }).bind(this));*/
		
		
		var tmp = false,self =this;
		$.map(args.containingStencil.roles(),function (role) {
			var roles = self._containmentRules[role];
			if (roles) {
				$.map(roles,function(role){
					if(args.containedStencil.roles().member(role)){
						tmp=true;
						return false;
					}
				});
				if(tmp)	return false;
            } 
		});
		result = tmp;

        return result;
    },

    /** End containment rules' methods */


    /** Begin morphing rules' methods */

    /**
     *
     * @param {Object}
        *           args
     *            stencil: ORYX.Core.StencilSet.Stencil | undefined
     *            shape: ORYX.Core.Shape | undefined
     *
     * At least stencil or shape has to be specified
     *
     * @return {Array} Array of stencils that the passed stencil/shape can be
     *         transformed to (including the current stencil itself)
     */
    morphStencils:function (args) {
        // check arguments
        if (!args.stencil && !args.shape) {
            return [];
        }

        // init arguments
        if (args.shape) {
            args.stencil = args.shape.getStencil();
        }

        var _morphStencils = [];
		var self = this;
		$.map(args.stencil.roles(),function (role) {
			$.map(self._cacheMorph(role),function (stencil) {
                _morphStencils.push(stencil);
            })
        });//}.bind(this));


        var baseMorphs = this.baseMorphs();
        // BaseMorphs should be in the front of the array
        //_morphStencils = _morphStencils.uniq().sort(function (a, b) {
		_morphStencils = $.unique(_morphStencils).sort(function (a, b) {
            return baseMorphs.include(a) && !baseMorphs.include(b) ? -1 : (baseMorphs.include(b) && !baseMorphs.include(a) ? 1 : 0)
        })
        return _morphStencils;
    },

    /**
     * @return {Array} An array of all base morph stencils
     */
    baseMorphs:function () {
        var _baseMorphs = [];
		for(var pair in this._morphingRules){
			if(pair!=='_data' && typeof this._morphingRules[pair] ==='object' && this._morphingRules[pair][0]){
				_baseMorphs.push(this._morphingRules[pair][0]);
			}
		}
		
        return _baseMorphs;
    },

    /**
     * Returns true if there are morphing rules defines
     * @return {boolean}
     */
    containsMorphingRules:function () {
        /*return this._stencilSets.any(function (ss) {
            return !!ss.jsonRules().morphingRules
        });*/
		
		
		var tmp = false;
		$.each(this._stencilSets,function () {
			var ss = this;
			if(!!ss.jsonRules().morphingRules){
				tmp = true;
				return false;
			}
		});
		return tmp;
    },

    /**
     *
     * @param {Object}
        *            args
     *            sourceStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined
     *            sourceShape:
     *            ORYX.Core.Node |undefined
     *            targetStencil:
     *            ORYX.Core.StencilSet.Stencil | undefined
     *            targetShape:
     *            ORYX.Core.Node |undefined
     *
     *
     * @return {Stencil} Returns, the stencil for the connecting edge
     * or null if connection is not possible
     */
    connectMorph:function (args) {
        // check arguments
        if (!args ||
            (!args.sourceShape && !args.sourceStencil &&
                !args.targetShape && !args.targetStencil)) {
            return false;
        }

        // init arguments
        if (args.sourceShape) {
            args.sourceStencil = args.sourceShape.getStencil();
        }
        if (args.targetShape) {
            args.targetStencil = args.targetShape.getStencil();
        }

        var incoming = this.incomingEdgeStencils(args);
        var outgoing = this.outgoingEdgeStencils(args);

        /*var edgeStencils = incoming.select(function (e) {
            return outgoing.member(e);
        }); // intersection of sets*/
		var edgeStencils=[];
		$.map(incoming,function(e){
			if(outgoing.member(e)){
				edgeStencils[edgeStencils.length] = e;
			}
		});
		
		
        /*var baseEdgeStencils = this.baseMorphs().select(function (e) {
            return edgeStencils.member(e);
        }); // again: intersection of sets*/
		var baseEdgeStencils=[];
		$.map(this.baseMorphs(),function(e){
			if(edgeStencils.member(e)){
				baseEdgeStencils[baseEdgeStencils.length] = e;
			}
		});

        if (baseEdgeStencils.size() > 0)
            return baseEdgeStencils[0]; // return any of the possible base morphs
        else if (edgeStencils.size() > 0)
            return edgeStencils[0];	// return any of the possible stencils

        return null; //connection not possible
    },

    /**
     * Return true if the stencil should be located in the shape menu
     * @param {ORYX.Core.StencilSet.Stencil} morph
     * @return {Boolean} Returns true if the morphs in the morph group of the
     * specified morph shall be displayed in the shape menu
     */
    showInShapeMenu:function (stencil) {
        /*return     this._stencilSets.any(function (ss) {
            return ss.jsonRules().morphingRules
                .any(function (r) {
                    return     stencil.roles().include(ss.namespace() + r.role)
                        && r.showInShapeMenu !== false;
                })
        });*/
		
		var tmp = false;
		$.map(this._stencilSets,function(ss){
			$.map(ss.jsonRules().morphingRules,function(r){
				if(stencil.roles().include(ss.namespace() + r.role)
                        && r.showInShapeMenu !== false){
					tmp = true;
					return false;
				}
			});
			return false;
		});
		return tmp;
    },

    preserveBounds:function (stencil) {
        return this._stencilSets.any(function (ss) {
            return ss.jsonRules().morphingRules.any(function (r) {


                return stencil.roles().include(ss.namespace() + r.role)
                    && r.preserveBounds;
            })
        })
    },

    /** End morphing rules' methods */


    /** Begin layouting rules' methods */

    /**
     * Returns a set on "in" and "out" layouting rules for a given shape
     * @param {Object} shape
     * @param {Object} edgeShape (Optional)
     * @return {Object} "in" and "out" with a default value of {"t":1, "r":1, "b":1, "r":1} if not specified in the json
     */
    getLayoutingRules:function (shape, edgeShape) {

        if (!shape || !(shape instanceof ORYX.Core.Shape)) {
            return false;
        }

        var layout = {"in":{}, "out":{}};

        var parseValues = function (o, v) {
            if (o && o[v]) {
                ["t", "r", "b", "l"].each(function (d) {
                    layout[v][d] = Math.max(o[v][d], layout[v][d] || 0);
                });
            }
            if (o && o[v + "s"] instanceof Array) {
                ["t", "r", "b", "l"].each(function (d) {
                    var defaultRule = o[v + "s"].find(function (e) {
                        return !e.edgeRole
                    });
                    var edgeRule;
                    if (edgeShape instanceof ORYX.Core.Edge) {
                        edgeRule = o[v + "s"].find(function (e) {
                            return this._hasRole(edgeShape, e.edgeRole)
                        }.bind(this));
                    }
                    layout[v][d] = Math.max(edgeRule ? edgeRule[d] : defaultRule[d], layout[v][d] || 0);
                }.bind(this));
            }
        }.bind(this)

        // For each role
        shape.getStencil().roles().each(function (role) {
            // check if there are layout information
            if (this._layoutRules[role]) {
                // if so, parse those information to the 'layout' variable
                parseValues(this._layoutRules[role], "in");
                parseValues(this._layoutRules[role], "out");
            }
        }.bind(this));

        // Make sure, that every attribute has an value,
        // otherwise set 1
        ["in", "out"].each(function (v) {
            ["t", "r", "b", "l"].each(function (d) {
                layout[v][d] = layout[v][d] !== undefined ? layout[v][d] : 1;
            });
        })

        return layout;
    },

    /** End layouting rules' methods */

    /** Helper methods */

    /**
     * Checks wether a shape contains the given role or the role is equal the stencil id
     * @param {ORYX.Core.Shape} shape
     * @param {String} role
     */
    _hasRole:function (shape, role) {
        if (!(shape instanceof ORYX.Core.Shape) || !role) {
            return
        }
        var isRole = shape.getStencil().roles().any(function (r) {
            return r == role
        });

        return isRole || shape.getStencil().id() == (shape.getStencil().namespace() + role);
    },

    /**
     *
     * @param {String}
        *            role
     *
     * @return {Array} Returns an array of stencils that can act as role.
     */
    _stencilsWithRole:function (role) {
        return this._stencils.findAll(function (stencil) {
            return (stencil.roles().member(role)) ? true : false;
        });
    },

    /**
     *
     * @param {String}
        *            role
     *
     * @return {Array} Returns an array of stencils that can act as role and
     *         have the type 'edge'.
     */
    _edgesWithRole:function (role) {
        return this._stencils.findAll(function (stencil) {
            return (stencil.roles().member(role) && stencil.type() === "edge") ? true : false;
        });
    },

    /**
     *
     * @param {String}
        *            role
     *
     * @return {Array} Returns an array of stencils that can act as role and
     *         have the type 'node'.
     */
    _nodesWithRole:function (role) {
        return this._stencils.findAll(function (stencil) {
            return (stencil.roles().member(role) && stencil.type() === "node") ? true : false;
        });
    },

    /**
     *
     * @param {ORYX.Core.StencilSet.Stencil}
        *            parent
     * @param {ORYX.Core.StencilSet.Stencil}
        *            child
     *
     * @returns {Boolean} Returns the maximum occurrence of shapes of the
     *          stencil's type inside the parent.
     */
    _getMaximumOccurrence:function (parent, child) {
        var max;
        child.roles().each((function (role) {
            var cardRule = this._cardinalityRules[role];
            if (cardRule && cardRule.maximumOccurrence) {
                if (max) {
                    max = Math.min(max, cardRule.maximumOccurrence);
                } else {
                    max = cardRule.maximumOccurrence;
                }
            }
        }).bind(this));

        return max;
    },


    /**
     *
     * @param {Object}
        *            args sourceStencil: ORYX.Core.Node edgeStencil:
     *            ORYX.Core.StencilSet.Stencil
     *
     * @return {Boolean} Returns, the maximum number of outgoing edges of the
     *         type specified by edgeStencil of the sourceShape.
     */
    _getMaximumNumberOfOutgoingEdge:function (args) {
        if (!args ||
            !args.sourceStencil ||
            !args.edgeStencil) {
            return false;
        }

        var max;
        args.sourceStencil.roles().each((function (role) {
            var cardRule = this._cardinalityRules[role];

            if (cardRule && cardRule.outgoingEdges) {
                args.edgeStencil.roles().each(function (edgeRole) {
                    var oe = cardRule.outgoingEdges[edgeRole];

                    if (oe && oe.maximum) {
                        if (max) {
                            max = Math.min(max, oe.maximum);
                        } else {
                            max = oe.maximum;
                        }
                    }
                });
            }
        }).bind(this));

        return max;
    },

    /**
     *
     * @param {Object}
        *            args targetStencil: ORYX.Core.StencilSet.Stencil edgeStencil:
     *            ORYX.Core.StencilSet.Stencil
     *
     * @return {Boolean} Returns the maximum number of incoming edges of the
     *         type specified by edgeStencil of the targetShape.
     */
    _getMaximumNumberOfIncomingEdge:function (args) {
        if (!args ||
            !args.targetStencil ||
            !args.edgeStencil) {
            return false;
        }

        var max;
        args.targetStencil.roles().each((function (role) {
            var cardRule = this._cardinalityRules[role];
            if (cardRule && cardRule.incomingEdges) {
                args.edgeStencil.roles().each(function (edgeRole) {
                    var ie = cardRule.incomingEdges[edgeRole];
                    if (ie && ie.maximum) {
                        if (max) {
                            max = Math.min(max, ie.maximum);
                        } else {
                            max = ie.maximum;
                        }
                    }
                });
            }
        }).bind(this));

        return max;
    },

    /**
     *
     * @param {ORYX.Core.StencilSet.Stencil}
        *            edgeStencil
     *
     * @return {Hash} Returns a hash map of all connection rules for
     *         edgeStencil.
     */
    _getConnectionRulesOfEdgeStencil:function (edgeStencil) {
        var edgeRules = new Hash();
		
		var self = this;
		$.map(edgeStencil.roles(),function (role) {
			var ru = self._connectionRules[role];  //hash
            if (ru) {
				for(var cr in ru){
					if(ru.hasOwnProperty(cr) && $.isArray(ru[cr])){
						if(edgeRules[cr]){
							edgeRules[cr] = edgeRules[cr].concat(ru[cr]);
						}else{
							edgeRules[cr] = ru[cr];
						}
					}
                };
            }
        });
        return edgeRules;
    },

    _isRoleOfOtherNamespace:function (role) {
        return (role.indexOf("#") > 0);
    },

    toString:function () {
        return "Rules";
    }
}
ORYX.Core.StencilSet.Rules = Clazz.extend(ORYX.Core.StencilSet.Rules);


// object
ORYX.Editor.createByUrl = function (modelUrl, config) { 
    if (!config) config = {}; 
	
	if(isIE){
		//var ua = navigator.userAgent.toLowerCase();
		//var s  = ua.match(/msie ([\d.]+)/)[1];
		//if(Math.floor(s) < 9 ){
		if(Math.floor($.browser.version)<9){
			removeload(); 
			alert("您的IE浏览器版本不支持流程设计器,请升级！"); 
			window.location.replace("about:blank");	
			return;
		}
	}
	$.ajax({
		type:'GET'
		,url:modelUrl
		,dataType:'json'
		,success:function(transport){
			var editorConfig = transport;
            if(editorConfig['IRETCODE']=='-6'&&editorConfig['IRETCODE']!=undefined){
				confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
					if (flag) {
						try {
							top.window.location.reload();
						} catch (e) {
						}
					} else {
						window.location.replace("about:blank");
					}
				});
				return;
            }
			
			editorConfig = $.extend(true,{}, editorConfig, config); 
            new ORYX.Editor(editorConfig);
		 },
		 error:function(e){
			confirm('提示', '您的编辑的流程数据可能被删除请检查,是否关闭当前页面？', function (flag) {
				if (flag) {
					try {
						//top.window.location.reload();
						var tab = top.$('#frameTab').tabs('getSelected');
						var index = top.$('#frameTab').tabs('getTabIndex',tab);
						top.$('#frameTab').tabs("close",index);
					} catch (e) {
					}
				} else {
					window.location.replace("about:blank");
				}
			});
			//console.log(e);
		 }
	});
	
}


// object 创建html标签
ORYX.Editor.graft = function (namespace, parent, t, doc) {
    doc = (doc || (parent && parent.ownerDocument) || document);
    var e;
    if (t === undefined) {
        throw "Can't graft an undefined value";
    } else if (t.constructor == String) {
        e = doc.createTextNode(t);
    } else {
        for (var i = 0; i < t.length; i++) {
            if (i === 0 && t[i].constructor == String) {
                var snared;
                snared = t[i].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
                if (snared) {
                    e = doc.createElementNS(namespace, snared[1]);
                    e.setAttributeNS(null, 'class', snared[2]);
                    continue;
                }
                snared = t[i].match(/^([a-z][a-z0-9]*)$/i);
                if (snared) {
                    e = doc.createElementNS(namespace, snared[1]);  // but no class
                    continue;
                }

                // Otherwise:
                e = doc.createElementNS(namespace, "span");
                e.setAttribute(null, "class", "namelessFromLOL");
            }

            if (t[i] === undefined) {
                throw "Can't graft an undefined value in a list!";
            } else if (t[i].constructor == String || t[i].constructor == Array) {
                this.graft(namespace, e, t[i], doc);
            } else if (t[i].constructor == Number) {
                this.graft(namespace, e, t[i].toString(), doc);
            } else if (t[i].constructor == Object) {
                // hash's properties => element's attributes

                for (var k in t[i]) {
                    e.setAttributeNS(null, k, t[i][k]);
                }
            } else {

            }
        }
    }
    if (parent) {
        //parent.appendChild(e);
		$(parent).append($(e));
    } else {

    }
    return e; // return the topmost created node
};

ORYX.Editor.provideId = function () {
	var res = [], hex = '0123456789ABCDEF';

	for (var i = 0; i < 36; i++) res[i] = Math.floor(Math.random() * 0x10);

	res[14] = 4;
	res[19] = (res[19] & 0x3) | 0x8;

	for (var i = 0; i < 36; i++) res[i] = hex[res[i]];

	res[8] = res[13] = res[18] = res[23] = '-';

	return "sid-" + res.join('');
};

// object
ORYX.Core.Bounds = Clazz.extend({
    /**
     * Constructor
     */
    construct:function () {
        this._changedCallbacks = []; //register a callback with changedCallacks.push(this.method.bind(this));
        this.a = {};
        this.b = {};
        this.set.apply(this, arguments);
        this.suspendChange = false;
        this.changedWhileSuspend = false;
    },

    /**
     * Calls all registered callbacks.
     */
    _changed:function (sizeChanged) {
        if (!this.suspendChange) {
            
			var self = this;
			$.map(this._changedCallbacks,function(callback){
				if(callback)
					callback(self, sizeChanged);
			});
			
            this.changedWhileSuspend = false;
        } else
            this.changedWhileSuspend = true;
    },

    /**
     * Registers a callback that is called, if the bounds changes.
     * @param callback {Function} The callback function.
     */
    registerCallback:function (callback) {
		if($.inArray(callback,this._changedCallbacks)<0){
			this._changedCallbacks.push(callback);
		}
    },

    /**
     * Unregisters a callback.
     * @param callback {Function} The callback function.
     */
    unregisterCallback:function (callback) {
		this._changedCallbacks =  $.grep(this._changedCallbacks,function(n){return n!=callback});
    },

    /**
     * Sets position and size of the shape dependent of four coordinates
     * (set(ax, ay, bx, by);), two points (set({x: ax, y: ay}, {x: bx, y: by});)
     * or one bound (set({a: {x: ax, y: ay}, b: {x: bx, y: by}});).
     */
    set:function () {

        var changed = false;

        switch (arguments.length) {

            case 1:
                if (this.a.x !== arguments[0].a.x) {
                    changed = true;
                    this.a.x = arguments[0].a.x;
                }
                if (this.a.y !== arguments[0].a.y) {
                    changed = true;
                    this.a.y = arguments[0].a.y;
                }
                if (this.b.x !== arguments[0].b.x) {
                    changed = true;
                    this.b.x = arguments[0].b.x;
                }
                if (this.b.y !== arguments[0].b.y) {
                    changed = true;
                    this.b.y = arguments[0].b.y;
                }
                break;

            case 2:
                var ax = Math.min(arguments[0].x, arguments[1].x);
                var ay = Math.min(arguments[0].y, arguments[1].y);
                var bx = Math.max(arguments[0].x, arguments[1].x);
                var by = Math.max(arguments[0].y, arguments[1].y);
                if (this.a.x !== ax) {
                    changed = true;
                    this.a.x = ax;
                }
                if (this.a.y !== ay) {
                    changed = true;
                    this.a.y = ay;
                }
                if (this.b.x !== bx) {
                    changed = true;
                    this.b.x = bx;
                }
                if (this.b.y !== by) {
                    changed = true;
                    this.b.y = by;
                }
                break;

            case 4:
                var ax = Math.min(arguments[0], arguments[2]);
                var ay = Math.min(arguments[1], arguments[3]);
                var bx = Math.max(arguments[0], arguments[2]);
                var by = Math.max(arguments[1], arguments[3]);
                if (this.a.x !== ax) {
                    changed = true;
                    this.a.x = ax;
                }
                if (this.a.y !== ay) {
                    changed = true;
                    this.a.y = ay;
                }
                if (this.b.x !== bx) {
                    changed = true;
                    this.b.x = bx;
                }
                if (this.b.y !== by) {
                    changed = true;
                    this.b.y = by;
                }
                break;
        }

        if (changed) {
            this._changed(true);
        }
    },

    /**
     * Moves the bounds so that the point p will be the new upper left corner.
     * @param {Point} p
     * or
     * @param {Number} x
     * @param {Number} y
     */
    moveTo:function () {

        var currentPosition = this.upperLeft();
        switch (arguments.length) {
            case 1:
                this.moveBy({
                    x:arguments[0].x - currentPosition.x,
                    y:arguments[0].y - currentPosition.y
                });
                break;
            case 2:
                this.moveBy({
                    x:arguments[0] - currentPosition.x,
                    y:arguments[1] - currentPosition.y
                });
                break;
            default:
            //TODO error
        }

    },

    /**
     * Moves the bounds relatively by p.
     * @param {Point} p
     * or
     * @param {Number} x
     * @param {Number} y
     *
     */
    moveBy:function () {
        var changed = false;

        switch (arguments.length) {
            case 1:
                var p = arguments[0];
                if (p.x !== 0 || p.y !== 0) {
                    changed = true;
                    this.a.x += p.x;
                    this.b.x += p.x;
                    this.a.y += p.y;
                    this.b.y += p.y;
                }
                break;
            case 2:
                var x = arguments[0];
                var y = arguments[1];
                if (x !== 0 || y !== 0) {
                    changed = true;
                    this.a.x += x;
                    this.b.x += x;
                    this.a.y += y;
                    this.b.y += y;
                }
                break;
            default:
            //TODO error
        }

        if (changed) {
            this._changed();
        }
    },

    /***
     * Includes the bounds b into the current bounds.
     * @param {Bounds} b
     */
    include:function (b) {

        if ((this.a.x === undefined) && (this.a.y === undefined) &&
            (this.b.x === undefined) && (this.b.y === undefined)) {
            return b;
        }
        ;

        var cx = Math.min(this.a.x, b.a.x);
        var cy = Math.min(this.a.y, b.a.y);

        var dx = Math.max(this.b.x, b.b.x);
        var dy = Math.max(this.b.y, b.b.y);


        this.set(cx, cy, dx, dy);
    },

    /**
     * Relatively extends the bounds by p.
     * @param {Point} p
     */
    extend:function (p) {

        if (p.x !== 0 || p.y !== 0) {
            // this is over cross for the case that a and b have same coordinates.
            //((this.a.x > this.b.x) ? this.a : this.b).x += p.x;
            //((this.b.y > this.a.y) ? this.b : this.a).y += p.y;
            this.b.x += p.x;
            this.b.y += p.y;

            this._changed(true);
        }
    },

    /**
     * Widens the scope of the bounds by x.
     * @param {Number} x
     */
    widen:function (x) {
        if (x !== 0) {
            this.suspendChange = true;
            this.moveBy({x:-x, y:-x});
            this.extend({x:2 * x, y:2 * x});
            this.suspendChange = false;
            if (this.changedWhileSuspend) {
                this._changed(true);
            }
        }
    },

    /**
     * Returns the upper left corner's point regardless of the
     * bound delimiter points.
     */
    upperLeft:function () {

        return {x:this.a.x, y:this.a.y};
    },

    /**
     * Returns the lower Right left corner's point regardless of the
     * bound delimiter points.
     */
    lowerRight:function () {

        return {x:this.b.x, y:this.b.y};
    },

    /**
     * @return {Number} Width of bounds.
     */
    width:function () {
        return this.b.x - this.a.x;
    },

    /**
     * @return {Number} Height of bounds.
     */
    height:function () {
        return this.b.y - this.a.y;
    },

    /**
     * @return {Point} The center point of this bounds.
     */
    center:function () {
        return {
            x:(this.a.x + this.b.x) / 2.0,
            y:(this.a.y + this.b.y) / 2.0
        };
    },


    /**
     * @return {Point} The center point of this bounds relative to upperLeft.
     */
    midPoint:function () {
        return {
            x:(this.b.x - this.a.x) / 2.0,
            y:(this.b.y - this.a.y) / 2.0
        };
    },

    /**
     * Moves the center point of this bounds to the new position.
     * @param p {Point}
     * or
     * @param x {Number}
     * @param y {Number}
     */
    centerMoveTo:function () {
        var currentPosition = this.center();

        switch (arguments.length) {

            case 1:
                this.moveBy(arguments[0].x - currentPosition.x,
                    arguments[0].y - currentPosition.y);
                break;

            case 2:
                this.moveBy(arguments[0] - currentPosition.x,
                    arguments[1] - currentPosition.y);
                break;
        }
    },

    isIncluded:function (point, offset) {

        var pointX, pointY, offset;

        // Get the the two Points
        switch (arguments.length) {
            case 1:
                pointX = arguments[0].x;
                pointY = arguments[0].y;
                offset = 0;

                break;
            case 2:
                if (arguments[0].x && arguments[0].y) {
                    pointX = arguments[0].x;
                    pointY = arguments[0].y;
                    offset = Math.abs(arguments[1]);
                } else {
                    pointX = arguments[0];
                    pointY = arguments[1];
                    offset = 0;
                }
                break;
            case 3:
                pointX = arguments[0];
                pointY = arguments[1];
                offset = Math.abs(arguments[2]);
                break;
            default:
                throw "isIncluded needs one, two or three arguments";
        }

        var ul = this.upperLeft();
        var lr = this.lowerRight();

        if (pointX >= ul.x - offset
            && pointX <= lr.x + offset && pointY >= ul.y - offset
            && pointY <= lr.y + offset)
            return true;
        else
            return false;
    },

    /**
     * @return {Bounds} A copy of this bounds.
     */
    clone:function () {

        //Returns a new bounds object without the callback
        // references of the original bounds
        return new ORYX.Core.Bounds(this);
    },

    toString:function () {

        return "( " + this.a.x + " | " + this.a.y + " )/( " + this.b.x + " | " + this.b.y + " )";
    },

    serializeForERDF:function () {

        return this.a.x + "," + this.a.y + "," + this.b.x + "," + this.b.y;
    }
});
//ORYX.Core.Bounds = Clazz.extend(ORYX.Core.Bounds);

// object

ORYX.Core.StencilSet.Stencil = Clazz.extend({

    /**
     * Constructor
     */
    construct:function (jsonStencil, namespace, source, stencilSet, propertyPackages, defaultPosition) {
        arguments.callee.$.construct.apply(this, arguments); // super();

		//console.log("ORYX.Core.StencilSet.Stencil construct");
        // check arguments and set defaults.
        if (!jsonStencil) throw "Stencilset seems corrupt.";
        if (!namespace) throw "Stencil does not provide namespace.";
        if (!source) throw "Stencil does not provide SVG source.";
        if (!stencilSet) throw "Fatal internal error loading stencilset.";
        //if(!propertyPackages) throw "Fatal internal error loading stencilset.";

        this._source = source;
        this._jsonStencil = jsonStencil;
        this._stencilSet = stencilSet;
        this._namespace = namespace;
        this._propertyPackages = propertyPackages;

		
        if (defaultPosition && !this._jsonStencil.position)  //num && undefined
            this._jsonStencil.position = defaultPosition;

        this._view;
        this._properties = new Hash();

        //init all JSON values
        if (!this._jsonStencil.type || !(this._jsonStencil.type === "edge" || this._jsonStencil.type === "node")) {
            throw "ORYX.Core.StencilSet.Stencil(construct): Type is not defined.";
        }
        if (!this._jsonStencil.id || this._jsonStencil.id === "") {
            throw "ORYX.Core.StencilSet.Stencil(construct): Id is not defined.";
        }
        if (!this._jsonStencil.title || this._jsonStencil.title === "") {
            throw "ORYX.Core.StencilSet.Stencil(construct): Title is not defined.";
        }

        if (!this._jsonStencil.description) {
            this._jsonStencil.description = "";
        }
        ;
        if (!this._jsonStencil.groups) {
            this._jsonStencil.groups = [];
        }
        if (!this._jsonStencil.roles) {
            this._jsonStencil.roles = [];
        }

        //add id of stencil to its roles
        this._jsonStencil.roles.push(this._jsonStencil.id);

        //prepend namespace to each role
		var self = this;
       
		$.map(this._jsonStencil.roles,function(role,index){
			self._jsonStencil.roles[index] = namespace + role;
		});

		this._jsonStencil.roles = $.unique(this._jsonStencil.roles);
		

        //make id unique by prepending namespace of stencil set
        this._jsonStencil.id = namespace + this._jsonStencil.id;

        this.postProcessProperties();

        // init serialize callback
        if (!this._jsonStencil.serialize) {
            this._jsonStencil.serialize = {};
            //this._jsonStencil.serialize = function(shape, data) { return data;};
        }

        // init deserialize callback
        if (!this._jsonStencil.deserialize) {
            this._jsonStencil.deserialize = {};
            //this._jsonStencil.deserialize = function(shape, data) { return data;};
        }

        // init layout callback
        if (!this._jsonStencil.layout) {
            this._jsonStencil.layout = []
            //this._jsonStencil.layout = function() {return true;}
        }

        //TODO does not work correctly, if the url does not exist
        //How to guarantee that the view is loaded correctly before leaving the constructor???
        var url = source + "view/" + jsonStencil.view;
        // override content type when this is webkit.

        if ($.trim(this._jsonStencil.view).match(/</)) {  //null
			
            var parser = new DOMParser();  //ray new DOMParser()IE不支持 只支持 Document.loadXML() 
            var xml = parser.parseFromString(this._jsonStencil.view, "text/xml");
            //alert(xml);
            //check if result is a SVG document
            if (ORYX.Editor.checkClassType(xml.documentElement, SVGSVGElement) || Prototype.Browser.IE) {
				
                this._view = xml.documentElement;

                //updating link to images
                var imageElems = this._view.getElementsByTagNameNS ? this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg", "image") : this._view.getElementsByTagName("image");
				var self = this;
				$(imageElems).each(function(){
					var link = this.getAttributeNodeNS ? this.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href") : this.getAttributeNode("href");
                    if (link && link.value.indexOf("://") == -1) {
                        link.textContent = self._source + "view/" + link.value;
                    }
				});
				
				
            } else {
				//console.log("The response is not a SVG document");
                throw "ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
            }
        } else {
			//以下加载svgDocument 不执行弹出 svgDocument is null
            /*new Ajax.Request(
                url, {
                    asynchronous:false, method:'get',
                    onSuccess:this._loadSVGOnSuccess.bind(this),
                    onFailure:this._loadSVGOnFailure.bind(this)
                });*/
			// 
			var self = this;
			
			$.ajax({
				url:url
				,asyn:false
				,method:'get'
				,dataType:'html'
				,success:function(xmlDoc){
					if (!xmlDoc || !xmlDoc.documentElement) {
						if (window.DOMParser) {
							var parser = new DOMParser();
							try {
								xmlDoc = parser.parseFromString (xmlDoc, "text/xml");
							} catch (e) {
								alert ("XML parsing error");
								return null;
							};
						}
					}
					
					self._loadSVGOnSuccess(xmlDoc);
				}
				,error:function(e){
					self._loadSVGOnFailure(e);
				}
			})
        }
    },
	
	_loadSVGOnFailure:function (result) {
        throw "ORYX.Core.StencilSet.Stencil(_loadSVGOnFailure): Loading SVG document failed."
    },

    postProcessProperties:function () {

        // add image path to icon
        if (this._jsonStencil.icon && this._jsonStencil.icon.indexOf("://") === -1) {
            this._jsonStencil.icon = this._source + "icons/" + this._jsonStencil.icon;
        } else {
            this._jsonStencil.icon = "";
        }
		
        // init property packages
        if (this._jsonStencil.propertyPackages && this._jsonStencil.propertyPackages instanceof Array) {
			var self = this;
			
			$.map(this._jsonStencil.propertyPackages,function(ppId){
				var pp = self._propertyPackages[ppId];
				if(pp){
					$.map(pp,function(prop){
						var oProp = new ORYX.Core.StencilSet.Property(prop, self._namespace, self);
                        self._properties[oProp.prefix() + "-" + oProp.id()] = oProp;
					})
				}
                
			});
        }
        if (this._jsonStencil.properties && this._jsonStencil.properties instanceof Array) {
            //this._jsonStencil.properties.each((function (prop) {
			var self = this;
			$.map(this._jsonStencil.properties,function (prop) {
                var oProp = new ORYX.Core.StencilSet.Property(prop, self._namespace, this);
                self._properties[oProp.prefix() + "-" + oProp.id()] = oProp;
            //}).bind(this));
			});
        }


    },

    /**
     * @param {ORYX.Core.StencilSet.Stencil} stencil
     * @return {Boolean} True, if stencil has the same namespace and type.
     */
    equals:function (stencil) {
        return (this.id() === stencil.id());
    },

    stencilSet:function () {
        return this._stencilSet;
    },

    type:function () {
        return this._jsonStencil.type;
    },

    namespace:function () {
        return this._namespace;
    },

    id:function () {
        return this._jsonStencil.id;
    },

    idWithoutNs:function () {
        return this.id().replace(this.namespace(), "");
    },

    title:function () {
		
        return ORYX.Core.StencilSet.getTranslation(this._jsonStencil, "title");
    },

    description:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonStencil, "description");
    },

    groups:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonStencil, "groups");
    },

    position:function () {
        return (isNaN(this._jsonStencil.position) ? 0 : this._jsonStencil.position);
    },

    view:function () {
        var v= this._view ? this._view.cloneNode(true) || this._view : null;
		return v;
    },

    icon:function () {
        return this._jsonStencil.icon;
    },

    fixedAspectRatio:function () {
        return this._jsonStencil.fixedAspectRatio === true;
    },

    hasMultipleRepositoryEntries:function () {
        return (this.getRepositoryEntries().length > 0);
    },

    getRepositoryEntries:function () {
        return (this._jsonStencil.repositoryEntries) ?
            $.makeArray(this._jsonStencil.repositoryEntries) : [];
    },

    properties:function () {
       return this._properties.values();
		//return this._properties.getValues();
    },

    property:function (id) {
        return this._properties[id];
		//return this._properties.getValue(id);
    },

    roles:function () {
        return this._jsonStencil.roles;
    },

    defaultAlign:function () {
        if (!this._jsonStencil.defaultAlign)
            return "east";
        return this._jsonStencil.defaultAlign;
    },

    serialize:function (shape, data) {
        return this._jsonStencil.serialize;
        //return this._jsonStencil.serialize(shape, data);
    },

    deserialize:function (shape, data) {
        return this._jsonStencil.deserialize;
        //return this._jsonStencil.deserialize(shape, data);
    },

    // in which case is targetShape used?
//	layout: function(shape, targetShape) {
//		return this._jsonStencil.layout(shape, targetShape);
//	},
    // layout property to store events for layouting in plugins
    layout:function (shape) {
        return this._jsonStencil.layout
    },

    addProperty:function (property, namespace) {
        if (property && namespace) {
            var oProp = new ORYX.Core.StencilSet.Property(property, namespace, this);
            this._properties[oProp.prefix() + "-" + oProp.id()] = oProp;
        }
    },

    removeProperty:function (propertyId) {
        if (propertyId) {
            var oProp = this._properties.values().find(function (prop) {
                return (propertyId == prop.id());
            });
            if (oProp)
                delete this._properties[oProp.prefix() + "-" + oProp.id()];
        }
    },

    _loadSVGOnSuccess:function (result) {

        var xml = null;
        /*
         * We want to get a dom object for the requested file. Unfortunately,
         * safari has some issues here. this is meant as a fallback for all
         * browsers that don't recognize the svg mimetype as XML but support
         * data: urls on Ajax calls.
         */

        // responseXML != undefined.
        // if(!(result.responseXML))

        // get the dom by data: url.
        // xml = _evenMoreEvilHack(result.responseText, 'text/xml');

        // else
		
        // get it the usual way.
        xml = result;
        //check if result is a SVG document
		
		//ray xml.documentElement 各种图形的svg
		//SVGSVGElement:[object XrayWrapper function SVGSVGElement() { [native code] }]
        if (ORYX.Editor.checkClassType(xml.documentElement, SVGSVGElement)) {
		
            this._view = xml.documentElement;
			  
            //updating link to images
            var imageElems = this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg", "image");
			var self = this;
			$(imageElems).each(function(){
				 var link = this.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href");
                if (link && link.value.indexOf("://") == -1) {
                    link.textContent = self._source + "view/" + link.value;
                }
			});
			
        } else {
            throw "ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
        }
    },



    toString:function () {
        return "Stencil " + this.title() + " (" + this.id() + ")";
    }
});
//ORYX.Core.StencilSet.Stencil = Clazz.extend(ORYX.Core.StencilSet.Stencil);

// object
ORYX.Core.StencilSet.Property = Clazz.extend({

    /**
     * Constructor
     */
    construct:function (jsonProp, namespace, stencil) {
		
        arguments.callee.$.construct.apply(this, arguments);

        this._jsonProp = jsonProp || ORYX.Log.error("Parameter jsonProp is not defined.");
        this._namespace = namespace || ORYX.Log.error("Parameter namespace is not defined.");
        this._stencil = stencil || ORYX.Log.error("Parameter stencil is not defined.");

        this._items = {};
        this._complexItems = {};

        jsonProp.id = jsonProp.id || ORYX.Log.error("ORYX.Core.StencilSet.Property(construct): Id is not defined.");
        jsonProp.id = jsonProp.id.toLowerCase();

        if (!jsonProp.type) {
            ORYX.Log.info("Type is not defined for stencil '%0', id '%1'. Falling back to 'String'.", stencil, jsonProp.id);
            jsonProp.type = "string";
        }
        else {
            jsonProp.type = jsonProp.type.toLowerCase();
        }

        jsonProp.prefix = jsonProp.prefix || "oryx";
        jsonProp.title = jsonProp.title || "";
        jsonProp.value = jsonProp.value || "";
        jsonProp.description = jsonProp.description || "";
        jsonProp.readonly = jsonProp.readonly || false;
        jsonProp.optional = jsonProp.optional !== false;

        //init refToView
        if (this._jsonProp.refToView) {
            if (!(this._jsonProp.refToView instanceof Array)) {
                this._jsonProp.refToView = [this._jsonProp.refToView];
            }
        }
        else {
            this._jsonProp.refToView = [];
        }

        var globalMin = this.getMinForType(jsonProp.type);
        if (jsonProp.min === undefined || jsonProp.min === null) {
            jsonProp.min = globalMin;
        } else if (jsonProp.min < globalMin) {
            jsonProp.min = globalMin;
        }

        var globalMax = this.getMaxForType(jsonProp.type);
        if (jsonProp.max === undefined || jsonProp.max === null) {
            jsonProp.max = globalMax;
        } else if (jsonProp.max > globalMax) {
            jsonProp.min = globalMax;
        }

        if (!jsonProp.fillOpacity) {
            jsonProp.fillOpacity = false;
        }

        if ("number" != typeof jsonProp.lightness) {
            jsonProp.lightness = 1
        } else {
            jsonProp.lightness = Math.max(0, Math.min(1, jsonProp.lightness))
        }

        if (!jsonProp.strokeOpacity) {
            jsonProp.strokeOpacity = false;
        }

        if (jsonProp.length === undefined || jsonProp.length === null) {
            jsonProp.length = Number.MAX_VALUE;
        }

        if (!jsonProp.wrapLines) {
            jsonProp.wrapLines = false;
        }

        if (!jsonProp.dateFormat) {
			if(!ORYX.I18N)ORYX.I18N={};
			if(!ORYX.I18N.PropertyWindow)ORYX.I18N.PropertyWindow={};
			ORYX.I18N.PropertyWindow.dateFormat = 'd/m/y';  //ray 直接添加的
            jsonProp.dateFormat = ORYX.I18N.PropertyWindow.dateFormat || "m/d/y";
        }

        if (!jsonProp.fill) {
            jsonProp.fill = false;
        }

        if (!jsonProp.stroke) {
            jsonProp.stroke = false;
        }

        if (!jsonProp.inverseBoolean) {
            jsonProp.inverseBoolean = false;
        }

        if (!jsonProp.directlyEditable && jsonProp.directlyEditable != false) {
            jsonProp.directlyEditable = true;
        }

        if (jsonProp.visible !== false) {
            jsonProp.visible = true;
        }

        if (jsonProp.isList !== true) {
            jsonProp.isList = false;

            if (!jsonProp.list || !(jsonProp.list instanceof Array)) {
                jsonProp.list = [];
            }
        }

        if (!jsonProp.category) {
            if (jsonProp.popular) {
                jsonProp.category = "popular";
            } else {
                jsonProp.category = "others";
            }
        }

        if (!jsonProp.alwaysAppearInMultiselect) {
            jsonProp.alwaysAppearInMultiselect = false;
        }
		var self = this;
        if (jsonProp.type === ORYX.CONFIG.TYPE_CHOICE) {
            if (jsonProp.items && jsonProp.items instanceof Array) {
				$.map(jsonProp.items,function(jsonItem){
					self._items[jsonItem.value.toLowerCase()] = new ORYX.Core.StencilSet.PropertyItem(jsonItem, namespace, self);
				});
            }
            else {
                throw "ORYX.Core.StencilSet.Property(construct): No property items defined."
            }
            
        }
        else if (jsonProp.type === ORYX.CONFIG.TYPE_COMPLEX || jsonProp.type == ORYX.CONFIG.TYPE_MULTIPLECOMPLEX) {
            if (jsonProp.complexItems && jsonProp.complexItems instanceof Array) {
				$.map(jsonProp.complexItems,function(jsonComplexItem){
					self._complexItems[jsonComplexItem.id.toLowerCase()] = new ORYX.Core.StencilSet.ComplexPropertyItem(jsonComplexItem, namespace, self);
				});
            }
            else {
                throw "ORYX.Core.StencilSet.Property(construct): No complex property items defined."
            }
        }
        // extended by Kerstin (end)
    },

    getMinForType:function (type) {
        if (type.toLowerCase() == ORYX.CONFIG.TYPE_INTEGER) {
            return -Math.pow(2, 31)
        } else {
            return -Number.MAX_VALUE + 1;
        }
    },
    getMaxForType:function (type) {
        if (type.toLowerCase() == ORYX.CONFIG.TYPE_INTEGER) {
            return Math.pow(2, 31) - 1
        } else {
            return Number.MAX_VALUE;
        }
    },

    /**
     * @param {ORYX.Core.StencilSet.Property} property
     * @return {Boolean} True, if property has the same namespace and id.
     */
    equals:function (property) {
        return (this._namespace === property.namespace() &&
            this.id() === property.id()) ? true : false;
    },

    namespace:function () {
        return this._namespace;
    },

    stencil:function () {
        return this._stencil;
    },

    id:function () {
        return this._jsonProp.id;
    },

    prefix:function () {
        return this._jsonProp.prefix;
    },

    type:function () {
        return this._jsonProp.type;
    },

    inverseBoolean:function () {
        return this._jsonProp.inverseBoolean;
    },

    category:function () {
        return this._jsonProp.category;
    },

    setCategory:function (value) {
        this._jsonProp.category = value;
    },

    directlyEditable:function () {
        return this._jsonProp.directlyEditable;
    },

    visible:function () {
        return this._jsonProp.visible;
    },

    title:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonProp, "title");
    },

    value:function () {
        return this._jsonProp.value;
    },

    readonly:function () {
        return this._jsonProp.readonly;
    },

    optional:function () {
        return this._jsonProp.optional;
    },

    description:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonProp, "description");
    },

    /**
     * An optional link to a SVG element so that the property affects the
     * graphical representation of the stencil.
     */
    refToView:function () {
        return this._jsonProp.refToView;
    },

    /**
     * If type is integer or float, min is the lower bounds of value.
     */
    min:function () {
        return this._jsonProp.min;
    },

    /**
     * If type ist integer or float, max is the upper bounds of value.
     */
    max:function () {
        return this._jsonProp.max;
    },

    /**
     * If type is float, this method returns if the fill-opacity property should
     *  be set.
     *  @return {Boolean}
     */
    fillOpacity:function () {
        return this._jsonProp.fillOpacity;
    },

    /**
     * If type is float, this method returns if the stroke-opacity property should
     *  be set.
     *  @return {Boolean}
     */
    strokeOpacity:function () {
        return this._jsonProp.strokeOpacity;
    },

    /**
     * If type is string or richtext, length is the maximum length of the text.
     * TODO how long can a string be.
     */
    length:function () {
        return this._jsonProp.length ? this._jsonProp.length : Number.MAX_VALUE;
    },

    wrapLines:function () {
        return this._jsonProp.wrapLines;
    },

    /**
     * If type is date, dateFormat specifies the format of the date. The format
     * specification of the ext library is used:
     *
     * Format  Output      Description
     *    ------  ----------  --------------------------------------------------------------
     *      d      10         Day of the month, 2 digits with leading zeros
     *      D      Wed        A textual representation of a day, three letters
     *      j      10         Day of the month without leading zeros
     *      l      Wednesday  A full textual representation of the day of the week
     *      S      th         English ordinal day of month suffix, 2 chars (use with j)
     *      w      3          Numeric representation of the day of the week
     *      z      9          The julian date, or day of the year (0-365)
     *      W      01         ISO-8601 2-digit week number of year, weeks starting on Monday (00-52)
     *      F      January    A full textual representation of the month
     *      m      01         Numeric representation of a month, with leading zeros
     *      M      Jan        Month name abbreviation, three letters
     *      n      1          Numeric representation of a month, without leading zeros
     *      t      31         Number of days in the given month
     *      L      0          Whether its a leap year (1 if it is a leap year, else 0)
     *      Y      2007       A full numeric representation of a year, 4 digits
     *      y      07         A two digit representation of a year
     *      a      pm         Lowercase Ante meridiem and Post meridiem
     *      A      PM         Uppercase Ante meridiem and Post meridiem
     *      g      3          12-hour format of an hour without leading zeros
     *      G      15         24-hour format of an hour without leading zeros
     *      h      03         12-hour format of an hour with leading zeros
     *      H      15         24-hour format of an hour with leading zeros
     *      i      05         Minutes with leading zeros
     *      s      01         Seconds, with leading zeros
     *      O      -0600      Difference to Greenwich time (GMT) in hours
     *      T      CST        Timezone setting of the machine running the code
     *      Z      -21600     Timezone offset in seconds (negative if west of UTC, positive if east)
     *
     * Example:
     *  F j, Y, g:i a  ->  January 10, 2007, 3:05 pm
     */
    dateFormat:function () {
        return this._jsonProp.dateFormat;
    },

    /**
     * If type is color, this method returns if the fill property should
     *  be set.
     *  @return {Boolean}
     */
    fill:function () {
        return this._jsonProp.fill;
    },

    /**
     * Lightness defines the satiation of the color
     * 0 is the pure color
     * 1 is white
     * @return {Integer} lightness
     */
    lightness:function () {
        return this._jsonProp.lightness;
    },

    /**
     * If type is color, this method returns if the stroke property should
     *  be set.
     *  @return {Boolean}
     */
    stroke:function () {
        return this._jsonProp.stroke;
    },

    /**
     * If type is choice, items is a hash map with all alternative values
     * (PropertyItem objects) with id as keys.
     */
    items:function () {
		var result = [];
		for(var it in this._items){
			result[result.length] = this._items[it];
		}
		return result;
    },

    item:function (value) {
        if (value) {
            return this._items[value.toLowerCase()];
        } else {
            return null;
        }
    },

    toString:function () {
        return "Property " + this.title() + " (" + this.id() + ")";
    },

    complexItems:function () {
        //return $H(this._complexItems).values();  
		var tmp=[];  //改写了
		for(var key in this._complexItems){
			tmp.push(this._complexItems[key]);
		}
		return tmp;
    },

    complexItem:function (id) {
        if (id) {
            return this._complexItems[id.toLowerCase()];
        } else {
            return null;
        }

    },

    complexAttributeToView:function () {
        return this._jsonProp.complexAttributeToView || "";
    },

    isList:function () {
        return !!this._jsonProp.isList;
    },

    getListItems:function () {
        return this._jsonProp.list;
    },

    /**
     * If type is glossary link, the
     * type of category can be defined where
     * the link only can go to.
     * @return {String} The glossary category id
     */
    linkableType:function () {
        return this._jsonProp.linkableType || "";
    },

    alwaysAppearInMultiselect:function () {
        return this._jsonProp.alwaysAppearInMultiselect;
    },

    popular:function () {
        return this._jsonProp.popular || false;
    },

    setPopular:function () {
        this._jsonProp.popular = true;
    }

});

ORYX.Core.StencilSet.ComplexPropertyItem = Clazz.extend({

    /**
     * Constructor
     */
    construct:function (jsonItem, namespace, property) {
        arguments.callee.$.construct.apply(this, arguments);

        if (!jsonItem) {
            throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter jsonItem is not defined.";
        }
        if (!namespace) {
            throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter namespace is not defined.";
        }
        if (!property) {
            throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter property is not defined.";
        }

        this._jsonItem = jsonItem;
        this._namespace = namespace;
        this._property = property;
        this._items = new Hash();
        this._complexItems = new Hash();

        //init all values
        if (!jsonItem.name) {
            throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Name is not defined.";
        }

        if (!jsonItem.type) {
            throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Type is not defined.";
        } else {
            jsonItem.type = jsonItem.type.toLowerCase();
        }

        if (jsonItem.type === ORYX.CONFIG.TYPE_CHOICE) {
            if (jsonItem.items && jsonItem.items instanceof Array) {
				var self = this;
				$.map(jsonItem.items,function(item){
					self._items[item.value] = new ORYX.Core.StencilSet.PropertyItem(item, namespace, self);
				});
            } else {
                throw "ORYX.Core.StencilSet.Property(construct): No property items defined."
            }
        } else if (jsonItem.type === ORYX.CONFIG.TYPE_COMPLEX) {
            if (jsonItem.complexItems && jsonItem.complexItems instanceof Array) {
				var self = this;
				$.map(jsonItem.complexItems,function(complexItem){
					self._complexItems[complexItem.id] = new ORYX.Core.StencilSet.ComplexPropertyItem(complexItem, namespace, self);
				});
            } else {
                throw "ORYX.Core.StencilSet.Property(construct): No property items defined."
            }
        }
    },

    /**
     * @param {ORYX.Core.StencilSet.PropertyItem} item
     * @return {Boolean} True, if item has the same namespace and id.
     */
    equals:function (item) {
        return (this.property().equals(item.property()) &&
            this.name() === item.name());
    },

    namespace:function () {
        return this._namespace;
    },

    property:function () {
        return this._property;
    },

    name:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonItem, "name");
    },

    id:function () {
        return this._jsonItem.id;
    },

    type:function () {
        return this._jsonItem.type;
    },

    optional:function () {
        return this._jsonItem.optional;
    },

    width:function () {
        return this._jsonItem.width;
    },

    value:function () {
        return this._jsonItem.value;
    },

    items:function () {
        return this._items.values();
    },

    complexItems:function () {
        return this._complexItems.values();
    },

    disable:function () {
        return this._jsonItem.disable;
    }
});

// object
ORYX.Core.StencilSet.PropertyItem = Clazz.extend({

    /**
     * Constructor
     */
    construct:function (jsonItem, namespace, property) {
        arguments.callee.$.construct.apply(this, arguments);

        if (!jsonItem) {
            throw "ORYX.Core.StencilSet.PropertyItem(construct): Parameter jsonItem is not defined.";
        }
        if (!namespace) {
            throw "ORYX.Core.StencilSet.PropertyItem(construct): Parameter namespace is not defined.";
        }
        if (!property) {
            throw "ORYX.Core.StencilSet.PropertyItem(construct): Parameter property is not defined.";
        }

        this._jsonItem = jsonItem;
        this._namespace = namespace;
        this._property = property;

        //init all values
        if (!jsonItem.value) {
            throw "ORYX.Core.StencilSet.PropertyItem(construct): Value is not defined.";
        }

        if (this._jsonItem.refToView) {
            if (!(this._jsonItem.refToView instanceof Array)) {
                this._jsonItem.refToView = [this._jsonItem.refToView];
            }
        } else {
            this._jsonItem.refToView = [];
        }
    },

    /**
     * @param {ORYX.Core.StencilSet.PropertyItem} item
     * @return {Boolean} True, if item has the same namespace and id.
     */
    equals:function (item) {
        return (this.property().equals(item.property()) &&
            this.value() === item.value());
    },

    namespace:function () {
        return this._namespace;
    },

    property:function () {
        return this._property;
    },

    value:function () {
        return this._jsonItem.value;
    },

    title:function () {
        return ORYX.Core.StencilSet.getTranslation(this._jsonItem, "title");
    },

    refToView:function () {
        return this._jsonItem.refToView;
    },

    icon:function () {
        return (this._jsonItem.icon) ? this.property().stencil()._source + "icons/" + this._jsonItem.icon : "";
    },

    toString:function () {
        return "PropertyItem " + this.property() + " (" + this.value() + ")";
    }
});


// object 描述对象
ORYX.Core.StencilSet.getTranslation = function (jsonObject, name) {
    var lang = ORYX.I18N.Language.toLowerCase();

    var result = jsonObject[name + "_" + lang];

    if (result)
        return result;

    result = jsonObject[name + "_" + lang.substr(0, 2)];

    if (result)
        return result;

    return jsonObject[name];
};

// object
ORYX.Core.StencilSet.stencilSets = function (editorId) {

    var stencilSetNSs = ORYX.Core.StencilSet._StencilSetNSByEditorInstance[editorId];
    var stencilSets = new Hash();
	
    if (stencilSetNSs) {
		$.map(stencilSetNSs,function(stencilSetNS){
			var stencilSet = ORYX.Core.StencilSet.stencilSet(stencilSetNS)
            stencilSets[stencilSet.namespace()] = stencilSet;
		})
    }
	
	
    return stencilSets;
};

// object
ORYX.Editor.checkClassType = function (classInst, classType) {
    if (ORYX.Editor.SVGClassElementsAreAvailable) {  //true
        return classInst instanceof classType
    } else {
        return classInst == classType
    }
};

// object
ORYX.Core.Shape = {
    construct:function (options, stencil) {
        // call base class constructor
        arguments.callee.$.construct.apply(this, arguments);

        this.dockers = [];
        this.magnets = [];

        this._defaultMagnet;

        this.incoming = [];
        this.outgoing = [];

        this.nodes = [];

        this._dockerChangedCallback = this._dockerChanged.bind(this);
		

        //Hash map for all labels. Labels are not treated as children of shapes.
        this._labels = new Hash();

        // create SVG node
        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg",
            null,
            ['g', {id:"svg-" + this.resourceId},
                ['g', {"class":"stencils"},
                    ['g', {"class":"me"}],
                    ['g', {"class":"children", style:"overflow:hidden"}],
                    ['g', {"class":"edge"}]
                ],
                ['g', {"class":"controls"},
                    ['g', {"class":"dockers"}],
                    ['g', {"class":"magnets"}]
                ]
            ]);
		
    },

    /**
     * If changed flag is set, refresh method is called.
     */
    update:function () {
        //if(this.isChanged) {
        //this.layout();
        //}
    },

    /**
     * !!!Not called from any sub class!!!
     */
    _update:function () {

    },

    /**
     * Calls the super class refresh method
     *  and updates the svg elements that are referenced by a property.
     */
    refresh:function () {
        //call base class refresh method
        arguments.callee.$.refresh.apply(this, arguments);

        if (this.node.ownerDocument) {
            //adjust SVG to properties' values
            var me = this,self = this;
            //this.propertiesChanged.each((function (propChanged) {
			var keys = this.propertiesChanged.keys();
			$.map(keys,function(key){
				//me.propertiesChanged[key];
				
				var prop = me.properties[key];
						
				var property = me.getStencil().property(key);
				
				if (property != undefined) {
					me.propertiesChanged[key] = false;
					//me.propertiesChanged[key] = false;

					//handle choice properties
					
					
					
					if (property.type() == ORYX.CONFIG.TYPE_CHOICE) {
						//property.refToView().each((function (ref) {
						$.map(property.refToView(),function(ref){   //全部为[]
							//if property is referencing a label, update the label
							if (ref !== "") {
								var label = me._labels[me.id + ref];
								if (label && property.item(prop)) {
									label.text(property.item(prop).title());
								}
							}
						});
						//}).bind(this));

						//if the choice's items are referencing SVG elements
						// show the selected and hide all other referenced SVG
						// elements
						var refreshedSvgElements = new Hash();
						//property.items().each((function (item) {
						$.map(property.items(),function(item){
							//item.refToView().each((function (itemRef) {
							
							
							$.map(item.refToView(),function(itemRef){
								if (itemRef == "") {
									return;
								}
								//var svgElem = me.node.ownerDocument.getElementById(me.id + itemRef);
								var svgElem = $(me.node.ownerDocument).find("#"+me.id + itemRef)[0];
								if (!svgElem) {
									return;
								}

								if (!refreshedSvgElements[svgElem.id] || prop == item.value()) {
									svgElem.setAttributeNS(null, 'display', ((prop == item.value()) ? 'inherit' : 'none'));
									refreshedSvgElements[svgElem.id] = svgElem;
								}

								// Reload the href if there is an image-tag
								if (ORYX.Editor.checkClassType(svgElem, SVGImageElement)) {
									svgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', svgElem.getAttributeNS('http://www.w3.org/1999/xlink', 'href'));
								}
							});
							//}).bind(this));
						});
						
					} else { //handle properties that are not of type choice
						//iterate all references to SVG elements
						//property.refToView().each((function (ref) {
						
						$.map(property.refToView(),function (ref) {
							//if the property does not reference an SVG element,
							// do nothing
							if (ref === "") {
								return;
							}

							var refId = self.id + ref;

							//get the SVG element
							var svgElem = self.node.ownerDocument.getElementById(refId);

							//if the SVG element can not be found
							if (!svgElem || !(svgElem.ownerSVGElement)) {
								//if the referenced SVG element is a SVGAElement, it cannot
								// be found with getElementById (Firefox bug).
								// this is a work around
								if (property.type() === ORYX.CONFIG.TYPE_URL || property.type() === ORYX.CONFIG.TYPE_DIAGRAM_LINK) {
									var svgElems = self.node.ownerDocument.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'a');

									//svgElem = $A(svgElems).find(function (elem) {
									//	return elem.getAttributeNS(null, 'id') === refId;
									//});
									svgElem = $(svgElems).find("#"+refId);  //改写上面
									
									
									if (!svgElem) {
										return;
									}
								} else {
									//this.propertiesChanged[propChanged.key] = true;
									return;
								}
							}

							if (property.complexAttributeToView()) {
								var label = self._labels[refId];
								if (label) {
									try {
										propJson = prop.evalJSON();
										var value = propJson[property.complexAttributeToView()]
										label.text(value ? value : prop);
									} catch (e) {
										label.text(prop);
									}
								}

							} else {
								
								switch (property.type()) {
									case ORYX.CONFIG.TYPE_BOOLEAN:

										if (typeof prop == "string")
											prop = prop === "true"

										svgElem.setAttributeNS(null, 'display', (!(prop === property.inverseBoolean())) ? 'inherit' : 'none');

										break;
									case ORYX.CONFIG.TYPE_COLOR:
										if (property.fill()) {
											if (svgElem.tagName.toLowerCase() === "stop") {
												if (prop) {

													if (property.lightness() && property.lightness() !== 1) {
														prop = ORYX.Utils.adjustLightness(prop, property.lightness());
													}

													svgElem.setAttributeNS(null, "stop-color", prop);

													// Adjust stop color of the others
													if (svgElem.parentNode.tagName.toLowerCase() === "radialgradient") {
														ORYX.Utils.adjustGradient(svgElem.parentNode, svgElem);
													}
												}

												// If there is no value, set opaque
												if (svgElem.parentNode.tagName.toLowerCase() === "radialgradient") {
													//$A(svgElem.parentNode.getElementsByTagName('stop')).each(function (stop) {
													$(svgElem.parentNode.getElementsByTagName('stop'),function(){
														var stop = this;
														stop.setAttributeNS(null, "stop-opacity", prop ? stop.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'default-stop-opacity') || 1 : 0);
													});
													//}.bind(this))
												}
											} else {
												svgElem.setAttributeNS(null, 'fill', prop);
											}
										}
										if (property.stroke()) {
											svgElem.setAttributeNS(null, 'stroke', prop);
										}
										break;
									case ORYX.CONFIG.TYPE_STRING:
										var label = self._labels[refId];
										if (label) {
											label.text(prop);
										}
										break;
									case ORYX.CONFIG.TYPE_INTEGER:
										var label = self._labels[refId];
										if (label) {
											label.text(prop);
										}
										break;
									case ORYX.CONFIG.TYPE_FLOAT:
										if (property.fillOpacity()) {
											svgElem.setAttributeNS(null, 'fill-opacity', prop);
										}
										if (property.strokeOpacity()) {
											svgElem.setAttributeNS(null, 'stroke-opacity', prop);
										}
										if (!property.fillOpacity() && !property.strokeOpacity()) {
											var label = self._labels[refId];
											if (label) {
												label.text(prop);
											}
										}
										break;
									case ORYX.CONFIG.TYPE_URL:
									case ORYX.CONFIG.TYPE_DIAGRAM_LINK:
										//TODO what is the dafault path?
										var hrefAttr = svgElem.getAttributeNodeNS('http://www.w3.org/1999/xlink', 'xlink:href');
										if (hrefAttr) {
											hrefAttr.textContent = prop;
										} else {
											svgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', prop);
										}
										break;
								}
							}
						});
						//}).bind(this));
					}
				}
			});
			
			

            //update labels
			$.map(this._labels,function(label){
				 if (typeof label ==='object' && label instanceof ORYX.Core.SVG.Label) {
					label.update();
				}
			});
        }
    },

    layout:function () {
        //this.getStencil().layout(this)
        var layoutEvents = this.getStencil().layout();
        if (layoutEvents) {
			var self = this;
            //layoutEvents.each(function (event) {
			$.map(layoutEvents,function(event){  
                // setup additional attributes
                event.shape = self;
                event.forceExecution = true;

                // do layouting
                self._delegateEvent(event);
			});
            //}.bind(this))

        }
    },

    /**
     * Returns an array of Label objects.
     */
    getLabels:function () {
		
        //return this._labels.values();  
		var tmp=[];
		
		$.map(this._labels,function(label){
			 if (typeof label ==='object' && label instanceof ORYX.Core.SVG.Label) {
				tmp[tmp.length] =label;
			}
		});
		return tmp;
    },

    /**
     * Returns the label for a given ref
     * @return {ORYX.Core.Label} Returns null if there is no label
     */
    getLabel:function (ref) {
        if (!ref) {
            return null;
        }
		var tmp = null;
		for(var k in this._labels){
			if(k.indexOf(ref)>0){
				tmp = this._labels[k];
				break;
			}
		}
		return tmp;  
		
        
    },

    /**
     * Hides all related labels
     *
     */
    hideLabels:function () {
        this.getLabels().invoke("hide");
    },

    /**
     * Shows all related labels
     *
     */
    showLabels:function () {
        var labels = this.getLabels();
        labels.invoke("show");
        labels.each(function (label) {
            label.update();
        });
    },

    setOpacity:function (value, animate) {

        // 0.0 <= value <= 1.0
        value = Math.max(Math.min((typeof value == "number" ? value : 1.0), 1.0), 0.0);

        //if (animate !== true){
        if (value !== 1.0) {
            value = String(value);
            this.node.setAttributeNS(null, "fill-opacity", value)
            this.node.setAttributeNS(null, "stroke-opacity", value)
        } else {
            this.node.removeAttributeNS(null, "fill-opacity");
            this.node.removeAttributeNS(null, "stroke-opacity");
        }
        /*} else {
         var args = {opacity:{to:value}};
         if (!this.isVisible){
         this.show();
         }
         if (this.currentAnim){
         this.currentAnim.stop();
         }

         this.currentAnim = Ext.lib.Anim.run(this.node, args, 0.4, "easeOut", function(){
         if (args.opacity.to === 0.0){
         this.hide();
         } else if (args.opacity.to === 1.0){
         this.node.removeAttributeNS(null, "style");
         }
         delete this.currentAnim;
         }, this)
         }*/


    },

    /**
     * Returns an array of dockers of this object.
     */
    getDockers:function () {
        return this.dockers;
    },

    getMagnets:function () {
        return this.magnets;
    },

    getDefaultMagnet:function () {
        if (this._defaultMagnet) {
            return this._defaultMagnet;
        } else if (this.magnets.length > 0) {
            return this.magnets[0];
        } else {
            return undefined;
        }
    },

    getParentShape:function () {
        return this.parent;
    },

    getIncomingShapes:function (iterator) {
        if (iterator) {
            this.incoming.each(iterator);
        }
        return this.incoming;
    },

    getIncomingNodes:function (iterator) {
        return this.incoming.findAll(function (incoming) {
            var isNode = (incoming instanceof ORYX.Core.Node);
            if (isNode && iterator) iterator(incoming);
            return isNode;
        });
    },


    getOutgoingShapes:function (iterator) {
        if (iterator) {
            this.outgoing.each(iterator);
        }
        return this.outgoing;
    },

    getOutgoingNodes:function (iterator) {
        /*return this.outgoing.select(function (out) {
            var isNode = (out instanceof ORYX.Core.Node);
            if (isNode && iterator) iterator(out);
            return isNode;
        });*/
		var tmp = [];
		$.map(this.outgoing,function(out){
			var isNode = (out instanceof ORYX.Core.Node);
			if (isNode && iterator) iterator(out);
			if(isNode){
				tmp.push(out);
			}
		});
		return tmp;
    },

    getAllDockedShapes:function (iterator) {
        var result = this.incoming.concat(this.outgoing);
        if (iterator) {
            result.each(iterator);
        }
        return result
    },

    getCanvas:function () {
        if (this.parent instanceof ORYX.Core.Canvas) {
            return this.parent;
        } else if (this.parent instanceof ORYX.Core.Shape) {
            return this.parent.getCanvas();
        } else {
            return undefined;
        }
    },

    /**
     *
     * @param {Object} deep
     * @param {Object} iterator
     */
    getChildNodes:function (deep, iterator) {
		
        if (!deep && !iterator) {
            return this.nodes.clone();
        } else {
            var result = [];
            //this.nodes.each(function (uiObject) {
			$.map(this.nodes,function(uiObject){  
                if (!uiObject.isVisible) {
                    return
                }
                if (iterator) {
                    iterator(uiObject);
                }
                result.push(uiObject);

                if (deep && uiObject instanceof ORYX.Core.Shape) {
                    result = result.concat(uiObject.getChildNodes(deep, iterator));
                }
            });
            return result;
        }
    },

    /**
     * Overrides the UIObject.add method. Adds uiObject to the correct sub node.
     * @param {UIObject} uiObject
     * @param {Number} index
     */
    add:function (uiObject, index, silent) {
        //parameter has to be an UIObject, but
        // must not be an Edge.
		
        if (uiObject instanceof ORYX.Core.UIObject
            && !(uiObject instanceof ORYX.Core.Edge)) {

            //if (!(this.children.member(uiObject))) {
			if ($.inArray(uiObject,this.children)<0) {  //
                //if uiObject is child of another parent, remove it from that parent.
                if (uiObject.parent) {
                    uiObject.parent.remove(uiObject, true);
                }

                //add uiObject to this Shape
                if (index != undefined)
                    this.children.splice(index, 0, uiObject);
                else
                    this.children.push(uiObject);

                //set parent reference
                uiObject.parent = this;

                //add uiObject.node to this.node depending on the type of uiObject
                var parent;
                if (uiObject instanceof ORYX.Core.Node) {
                    parent = this.node.childNodes[0].childNodes[1];
                    this.nodes.push(uiObject);
                } else if (uiObject instanceof ORYX.Core.Controls.Control) {
                    var ctrls = this.node.childNodes[1];
                    if (uiObject instanceof ORYX.Core.Controls.Docker) {
                        parent = ctrls.childNodes[0];
                        if (this.dockers.length >= 2) {
                            this.dockers.splice(index !== undefined ? Math.min(index, this.dockers.length - 1) : this.dockers.length - 1, 0, uiObject);
                        } else {
                            this.dockers.push(uiObject);
                        }
                    } else if (uiObject instanceof ORYX.Core.Controls.Magnet) {
                        parent = ctrls.childNodes[1];
                        this.magnets.push(uiObject);
                    } else {
                        parent = ctrls;
                    }
                } else {    //UIObject
                    parent = this.node;
                }

                if (index != undefined && index < parent.childNodes.length)
                    uiObject.node = parent.insertBefore(uiObject.node, parent.childNodes[index]);
                else
                    uiObject.node = parent.appendChild(uiObject.node);

                this._changed();
                //uiObject.bounds.registerCallback(this._changedCallback);


                if (this.eventHandlerCallback && silent !== true)
                    this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED, shape:uiObject})

            } else {
                //console.log("add: ORYX.Core.UIObject is already a child of this object.");
            }
        } else {
            //console.log("add: Parameter is not of type ORYX.Core.UIObject.");
        }
    },

    /**
     * Overrides the UIObject.remove method. Removes uiObject.
     * @param {UIObject} uiObject
     */
    remove:function (uiObject, silent) {
        //if uiObject is a child of this object, remove it.
        if (this.children.member(uiObject)) {
            //remove uiObject from children
            var parent = uiObject.parent;

            this.children = this.children.without(uiObject);

            //delete parent reference of uiObject
            uiObject.parent = undefined;

            //delete uiObject.node from this.node
            if (uiObject instanceof ORYX.Core.Shape) {
                if (uiObject instanceof ORYX.Core.Edge) {
                    uiObject.removeMarkers();
                    uiObject.node = this.node.childNodes[0].childNodes[2].removeChild(uiObject.node);
                } else {
                    uiObject.node = this.node.childNodes[0].childNodes[1].removeChild(uiObject.node);
                    this.nodes = this.nodes.without(uiObject);
                }
            } else if (uiObject instanceof ORYX.Core.Controls.Control) {
                if (uiObject instanceof ORYX.Core.Controls.Docker) {
                    uiObject.node = this.node.childNodes[1].childNodes[0].removeChild(uiObject.node);
                    this.dockers = this.dockers.without(uiObject);
                } else if (uiObject instanceof ORYX.Core.Controls.Magnet) {
                    uiObject.node = this.node.childNodes[1].childNodes[1].removeChild(uiObject.node);
                    this.magnets = this.magnets.without(uiObject);
                } else {
                    uiObject.node = this.node.childNodes[1].removeChild(uiObject.node);
                }
            }

            if (this.eventHandlerCallback && silent !== true)
                this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEREMOVED, shape:uiObject, parent:parent});

            this._changed();
            //uiObject.bounds.unregisterCallback(this._changedCallback);
        } else {

            ORYX.Log.warn("remove: ORYX.Core.UIObject is not a child of this object.");
        }
    },

    /**
     * Calculate the Border Intersection Point between two points
     * @param {PointA}
        * @param {PointB}
        */
    getIntersectionPoint:function () {

        var pointAX, pointAY, pointBX, pointBY;

        // Get the the two Points
        switch (arguments.length) {
            case 2:
                pointAX = arguments[0].x;
                pointAY = arguments[0].y;
                pointBX = arguments[1].x;
                pointBY = arguments[1].y;
                break;
            case 4:
                pointAX = arguments[0];
                pointAY = arguments[1];
                pointBX = arguments[2];
                pointBY = arguments[3];
                break;
            default:
                throw "getIntersectionPoints needs two or four arguments";
        }


        // Defined an include and exclude point
        var includePointX, includePointY, excludePointX, excludePointY;

        var bounds = this.absoluteBounds();

        if (this.isPointIncluded(pointAX, pointAY, bounds)) {
            includePointX = pointAX;
            includePointY = pointAY;
        } else {
            excludePointX = pointAX;
            excludePointY = pointAY;
        }

        if (this.isPointIncluded(pointBX, pointBY, bounds)) {
            includePointX = pointBX;
            includePointY = pointBY;
        } else {
            excludePointX = pointBX;
            excludePointY = pointBY;
        }

        // If there is no inclue or exclude Shape, than return
        if (!includePointX || !includePointY || !excludePointX || !excludePointY) {
            return undefined;
        }

        var midPointX = 0;
        var midPointY = 0;

        var refPointX, refPointY;

        var minDifferent = 1;
        // Get the UpperLeft and LowerRight
        //var ul = bounds.upperLeft();
        //var lr = bounds.lowerRight();

        var i = 0;

        while (true) {
            // Calculate the midpoint of the current to points
            var midPointX = Math.min(includePointX, excludePointX) + ((Math.max(includePointX, excludePointX) - Math.min(includePointX, excludePointX)) / 2.0);
            var midPointY = Math.min(includePointY, excludePointY) + ((Math.max(includePointY, excludePointY) - Math.min(includePointY, excludePointY)) / 2.0);


            // Set the new midpoint by the means of the include of the bounds
            if (this.isPointIncluded(midPointX, midPointY, bounds)) {
                includePointX = midPointX;
                includePointY = midPointY;
            } else {
                excludePointX = midPointX;
                excludePointY = midPointY;
            }

            // Calc the length of the line
            var length = Math.sqrt(Math.pow(includePointX - excludePointX, 2) + Math.pow(includePointY - excludePointY, 2))
            // Calc a point one step from the include point
            refPointX = includePointX + ((excludePointX - includePointX) / length),
                refPointY = includePointY + ((excludePointY - includePointY) / length)


            // If the reference point not in the bounds, break
            if (!this.isPointIncluded(refPointX, refPointY, bounds)) {
                break
            }


        }

        // Return the last includepoint
        return {x:refPointX, y:refPointY};
    },


    /**
     * Calculate if the point is inside the Shape
     * @param {PointX}
        * @param {PointY}
        */
    isPointIncluded:function () {
        return  false
    },

    /**
     * Returns TRUE if the given node
     * is a child node of the shapes node
     * @param {Element} node
     * @return {Boolean}
     *
     */
    containsNode:function (node) {
        var me = this.node.firstChild.firstChild;
        while (node) {
            if (node == me) {
                return true;
            }
            node = node.parentNode;
        }
        return false
    },

    /**
     * Calculate if the point is over an special offset area
     * @param {Point}
        */
    isPointOverOffset:function () {
        return  this.isPointIncluded.apply(this, arguments)
    },

    _dockerChanged:function () {

    },

    /**
     * Create a Docker for this Edge
     *
     */
    createDocker:function (index, position) {
        var docker = new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
        docker.bounds.registerCallback(this._dockerChangedCallback);
        if (position) {
            docker.bounds.centerMoveTo(position);
        }
        this.add(docker, index);

        return docker
    },

    /**
     * Get the serialized object
     * return Array with hash-entrees (prefix, name, value)
     * Following values will given:
     *         Bounds
     *         Outgoing Shapes
     *         Parent
     */
    serialize:function () {
        var serializedObject = arguments.callee.$.serialize.apply(this);

        // Add the bounds
        serializedObject.push({name:'bounds', prefix:'oryx', value:this.bounds.serializeForERDF(), type:'literal'});

        // Add the outgoing shapes
        this.getOutgoingShapes().each((function (followingShape) {
            serializedObject.push({name:'outgoing', prefix:'raziel', value:'#' + ERDF.__stripHashes(followingShape.resourceId), type:'resource'});
        }).bind(this));

        // Add the parent shape, if the parent not the canvas
        //if(this.parent instanceof ORYX.Core.Shape){
        serializedObject.push({name:'parent', prefix:'raziel', value:'#' + ERDF.__stripHashes(this.parent.resourceId), type:'resource'});
        //}

        return serializedObject;
    },


    deserialize:function (serialize, json) {
		
        arguments.callee.$.deserialize.apply(this, arguments);
		
        // Set the Bounds
        var bounds = serialize.find(function (ser) {
            return 'oryx-bounds' === (ser.prefix + "-" + ser.name)
        });
		
        if (bounds) {
            var b = bounds.value.replace(/,/g, " ").split(" ")
			//b = b.without("");
			b = $.grep(b,function(n){return n!=''});   
			 
            if (this instanceof ORYX.Core.Edge && this.dockers[0]) {  //this.dockers[0] IE总是得不到值
			
                /*if (!this.dockers.first().isChanged)
                    this.dockers.first().bounds.centerMoveTo(parseFloat(b[0]), parseFloat(b[1]));
                if (!this.dockers.last().isChanged)
                    this.dockers.last().bounds.centerMoveTo(parseFloat(b[2]), parseFloat(b[3]));*/
				if (!this.dockers[0].isChanged)
                    this.dockers[0].bounds.centerMoveTo(parseFloat(b[0]), parseFloat(b[1]));
                if (!this.dockers[this.dockers.length-1].isChanged)
                    this.dockers[this.dockers.length-1].bounds.centerMoveTo(parseFloat(b[2]), parseFloat(b[3]));
					
            } else {
                this.bounds.set(parseFloat(b[0]), parseFloat(b[1]), parseFloat(b[2]), parseFloat(b[3]));
            }
        }
		
        if (json && json.labels instanceof Array) {
            json.labels.each(function (slabel) {
                var label = this.getLabel(slabel.ref);
                if (label) {
                    label.deserialize(slabel, this);
                }
            }.bind(this))
        }
    },

    toJSON:function () {
        var json = arguments.callee.$.toJSON.apply(this, arguments);

        var labels = [], id = this.id;
		for(var lab in this._labels){
			if(this._labels[lab] instanceof ORYX.Core.SVG.Label){
				var slabel = this._labels[lab].serialize();
				if (slabel) {
					slabel.ref = lab.replace(id, '');
					labels.push(slabel);
				}
			}
		}

        if (labels.length > 0) {
            json.labels = labels;
        }
        return json;
    },


    /**
     * Private methods.
     */

    /**
     * Child classes have to overwrite this method for initializing a loaded
     * SVG representation.
     * @param {SVGDocument} svgDocument
     */
    _init:function (svgDocument) {
        //adjust ids
        this._adjustIds(svgDocument, 0);
    },

    _adjustIds:function (element, idIndex) {
        if (element instanceof Element) {
            var eid = element.getAttributeNS(null, 'id');
            if (eid && eid !== "") {
                element.setAttributeNS(null, 'id', this.id + eid);
            } else {
                element.setAttributeNS(null, 'id', this.id + "_" + this.id + "_" + idIndex);
                idIndex++;
            }

            // Replace URL in fill attribute
            var fill = element.getAttributeNS(null, 'fill');
            //if (fill && fill.include("url(#")) {
			if (fill && $.inArray("url(#",fill)>=0) {
                fill = fill.replace(/url\(#/g, 'url(#' + this.id);
                element.setAttributeNS(null, 'fill', fill);
            }

            if (element.hasChildNodes()) {
                for (var i = 0; i < element.childNodes.length; i++) {
                    idIndex = this._adjustIds(element.childNodes[i], idIndex);
                }
            }
        }
        return idIndex;
    },

    toString:function () {
        return "ORYX.Core.Shape " + this.getId()
    }
};
ORYX.Core.Shape = ORYX.Core.AbstractShape.extend(ORYX.Core.Shape);


// object
ORYX.Core.Command = Clazz.extend({

    /**
     * Constructor
     */
    construct:function () {

    },

    execute:function () {
        throw "Command.execute() has to be implemented!"
    },

    rollback:function () {
        throw "Command.rollback() has to be implemented!"
    }


});


// object  画节点对象
ORYX.Core.Node = {

    /**
     * Constructor
     * @param options {Object} A container for arguments.
     * @param stencil {Stencil}
     */
    construct:function (options, stencil) {
        arguments.callee.$.construct.apply(this, arguments);

        this.isSelectable = true;
        this.isMovable = true;
        this._dockerUpdated = false;

        this._oldBounds = new ORYX.Core.Bounds(); //init bounds with undefined values
        this._svgShapes = []; //array of all SVGShape objects of
        // SVG representation

        //TODO vielleicht in shape verschieben?
        this.minimumSize = undefined; // {width:..., height:...}
        this.maximumSize = undefined;

        //TODO vielleicht in shape oder uiobject verschieben?
        // vielleicht sogar isResizable ersetzen?
        this.isHorizontallyResizable = false;
        this.isVerticallyResizable = false;

        this.dataId = undefined;

		if(this._stencil.view()){
			this._init(this._stencil.view());  
		}
    },

    /**
     * This method checks whether the shape is resized correctly and calls the
     * super class update method.
     */
    _update:function () {
		
        //this.dockers.invoke("update");
		$.map(this.dockers,function(doc){  
			doc.update();
		});
        if (this.isChanged) {

            var bounds = this.bounds;
            var oldBounds = this._oldBounds;

            if (this.isResized) {

                var widthDelta = bounds.width() / oldBounds.width();
                var heightDelta = bounds.height() / oldBounds.height();

                //iterate over all relevant svg elements and resize them
                //this._svgShapes.each(function (svgShape) {
				$.map(this._svgShapes,function (svgShape) {
                    //adjust width
                    if (svgShape.isHorizontallyResizable) {
                        svgShape.width = svgShape.oldWidth * widthDelta;
                    }
                    //adjust height
                    if (svgShape.isVerticallyResizable) {
                        svgShape.height = svgShape.oldHeight * heightDelta;
                    }

                    //check, if anchors are set
                    var anchorOffset;
                    var leftIncluded = svgShape.anchorLeft;
                    var rightIncluded = svgShape.anchorRight;

                    if (rightIncluded) {
                        anchorOffset = oldBounds.width() - (svgShape.oldX + svgShape.oldWidth);
                        if (leftIncluded) {
                            svgShape.width = bounds.width() - svgShape.x - anchorOffset;
                        }
                        else {
                            svgShape.x = bounds.width() - (anchorOffset + svgShape.width);
                        }
                    }
                    else if (!leftIncluded) {
                        svgShape.x = widthDelta * svgShape.oldX;
                        if (!svgShape.isHorizontallyResizable) {
                            svgShape.x = svgShape.x + svgShape.width * widthDelta / 2 - svgShape.width / 2;
                        }
                    }

                    var topIncluded = svgShape.anchorTop;
                    var bottomIncluded = svgShape.anchorBottom;

                    if (bottomIncluded) {
                        anchorOffset = oldBounds.height() - (svgShape.oldY + svgShape.oldHeight);
                        if (topIncluded) {
                            svgShape.height = bounds.height() - svgShape.y - anchorOffset;
                        }
                        else {
                            // Hack for choreography task layouting
                            if (!svgShape._isYLocked) {
                                svgShape.y = bounds.height() - (anchorOffset + svgShape.height);
                            }
                        }
                    }
                    else if (!topIncluded) {
                        svgShape.y = heightDelta * svgShape.oldY;
                        if (!svgShape.isVerticallyResizable) {
                            svgShape.y = svgShape.y + svgShape.height * heightDelta / 2 - svgShape.height / 2;
                        }
                    }
                });

                //check, if the current bounds is unallowed horizontally or vertically resized
                var p = {
                    x:0,
                    y:0
                };
                if (!this.isHorizontallyResizable && bounds.width() !== oldBounds.width()) {
                    p.x = oldBounds.width() - bounds.width();
                }
                if (!this.isVerticallyResizable && bounds.height() !== oldBounds.height()) {
                    p.y = oldBounds.height() - bounds.height();
                }
                if (p.x !== 0 || p.y !== 0) {
                    bounds.extend(p);
                }

                //check, if the current bounds are between maximum and minimum bounds
                p = {
                    x:0,
                    y:0
                };
                var widthDifference, heightDifference;
                if (this.minimumSize) {

                    widthDifference = this.minimumSize.width - bounds.width();
                    if (widthDifference > 0) {
                        p.x += widthDifference;
                    }
                    heightDifference = this.minimumSize.height - bounds.height();
                    if (heightDifference > 0) {
                        p.y += heightDifference;
                    }
                }
                if (this.maximumSize) {

                    widthDifference = bounds.width() - this.maximumSize.width;
                    if (widthDifference > 0) {
                        p.x -= widthDifference;
                    }
                    heightDifference = bounds.height() - this.maximumSize.height;
                    if (heightDifference > 0) {
                        p.y -= heightDifference;
                    }
                }
                if (p.x !== 0 || p.y !== 0) {
                    bounds.extend(p);
                }

                //update magnets

                var widthDelta = bounds.width() / oldBounds.width();
                var heightDelta = bounds.height() / oldBounds.height();

                var leftIncluded, rightIncluded, topIncluded, bottomIncluded, center, newX, newY;

                //this.magnets.each(function (magnet) {
				$.map(this.magnets,function(magnet){
                    leftIncluded = magnet.anchorLeft;
                    rightIncluded = magnet.anchorRight;
                    topIncluded = magnet.anchorTop;
                    bottomIncluded = magnet.anchorBottom;

                    center = magnet.bounds.center();

                    if (leftIncluded) {
                        newX = center.x;
                    }
                    else if (rightIncluded) {
                        newX = bounds.width() - (oldBounds.width() - center.x)
                    }
                    else {
                        newX = center.x * widthDelta;
                    }

                    if (topIncluded) {
                        newY = center.y;
                    }
                    else if (bottomIncluded) {
                        newY = bounds.height() - (oldBounds.height() - center.y);
                    }
                    else {
                        newY = center.y * heightDelta;
                    }

                    if (center.x !== newX || center.y !== newY) {
                        magnet.bounds.centerMoveTo(newX, newY);
                    }
                });

                //set new position of labels
                //this.getLabels().each(function (label) {
				$.map(this.getLabels(),function (label) {
                    // Set the position dependings on it anchor
                    if (!label.isAnchorLeft()) {
                        if (label.isAnchorRight()) {
                            label.setX(bounds.width() - (oldBounds.width() - label.oldX))
                        } else {
                            label.setX((label.position ? label.position.x : label.x) * widthDelta);
                        }
                    }
                    if (!label.isAnchorTop()) {
                        if (label.isAnchorBottom()) {
                            label.setY(bounds.height() - (oldBounds.height() - label.oldY));
                        } else {
                            label.setY((label.position ? label.position.y : label.y) * heightDelta);
                        }
                    }

                    // If there is an position,
                    // set the origin position as well
                    if (label.position) {
                        if (!label.isOriginAnchorLeft()) {
                            if (label.isOriginAnchorRight()) {
                                label.setOriginX(bounds.width() - (oldBounds.width() - label.oldX))
                            } else {
                                label.setOriginX(label.x * widthDelta);
                            }
                        }
                        if (!label.isOriginAnchorTop()) {
                            if (label.isOriginAnchorBottom()) {
                                label.setOriginY(bounds.height() - (oldBounds.height() - label.oldY));
                            } else {
                                label.setOriginY(label.y * heightDelta);
                            }
                        }
                    }
                });

                //update docker
                var docker = this.dockers[0];
                if (docker) {
                    docker.bounds.unregisterCallback(this._dockerChangedCallback);
                    if (!this._dockerUpdated) {
                        docker.bounds.centerMoveTo(this.bounds.center());
                        this._dockerUpdated = false;
                    }

                    docker.update();
                    docker.bounds.registerCallback(this._dockerChangedCallback);
                }
                this.isResized = false;
            }

            this.refresh();

            this.isChanged = false;

            this._oldBounds = this.bounds.clone();
        }

        //this.children.each(function (value) {
		$.map(this.children,function (value) {
            if (!(value instanceof ORYX.Core.Controls.Docker)) {
                value._update();
            }
        });

        if (this.dockers.length > 0 && !this.dockers[0].getDockedShape()) {
            this.dockers.each(function (docker) {
                docker.bounds.centerMoveTo(this.bounds.center())
            }.bind(this))
        }

    },

    /**
     * This method repositions and resizes the SVG representation
     * of the shape.
     */
    refresh:function () {
        arguments.callee.$.refresh.apply(this, arguments);

        /** Movement */
        var x = this.bounds.upperLeft().x;
        var y = this.bounds.upperLeft().y;

        //set translation in transform attribute
        /*var attributeTransform = document.createAttributeNS(ORYX.CONFIG.NAMESPACE_SVG, "transform");
         attributeTransform.nodeValue = "translate(" + x + ", " + y + ")";
         this.node.firstChild.setAttributeNode(attributeTransform);*/
        // Move owner element
        this.node.firstChild.setAttributeNS(null, "transform", "translate(" + x + ", " + y + ")");
        // Move magnets
        this.node.childNodes[1].childNodes[1].setAttributeNS(null, "transform", "translate(" + x + ", " + y + ")");

        /** Resize */

            //iterate over all relevant svg elements and update them
        //this._svgShapes.each(function (svgShape) {
		$.map(this._svgShapes,function (svgShape) {
            svgShape.update();
        });
    },

    _dockerChanged:function () {
        var docker = this.dockers[0];

        //set the bounds of the the association
        this.bounds.centerMoveTo(docker.bounds.center());

        this._dockerUpdated = true;
        //this._update(true);
    },

    /**
     * This method traverses a tree of SVGElements and returns
     * all SVGShape objects. For each basic shape or path element
     * a SVGShape object is initialized.
     *
     * @param svgNode {SVGElement}
     * @return {Array} Array of SVGShape objects
     */
    _initSVGShapes:function (svgNode) {
        var svgShapes = [];
        try {
            var svgShape = new ORYX.Core.SVG.SVGShape(svgNode);
            svgShapes.push(svgShape);
        }
        catch (e) {
            //do nothing
        }

        if (svgNode.hasChildNodes()) {
            for (var i = 0; i < svgNode.childNodes.length; i++) {
                svgShapes = svgShapes.concat(this._initSVGShapes(svgNode.childNodes[i]));
            }
        }

        return svgShapes;
    },

    /**
     * Calculate if the point is inside the Shape
     * @param {PointX}
        * @param {PointY}
        * @param {absoluteBounds} optional: for performance
     */
    isPointIncluded:function (pointX, pointY, absoluteBounds) {
        // If there is an arguments with the absoluteBounds
        var absBounds = absoluteBounds && absoluteBounds instanceof ORYX.Core.Bounds ? absoluteBounds : this.absoluteBounds();

        if (!absBounds.isIncluded(pointX, pointY)) {
            return false;
        } else {

        }


        //point = Object.clone(point);
        var ul = absBounds.upperLeft();
        var x = pointX - ul.x;
        var y = pointY - ul.y;

        var i = 0;
        do {
            var isPointIncluded = this._svgShapes[i++].isPointIncluded(x, y);
        } while (!isPointIncluded && i < this._svgShapes.length)

        return isPointIncluded;

        /*return this._svgShapes.any(function(svgShape){
         return svgShape.isPointIncluded(point);
         });*/
    },


    /**
     * Calculate if the point is over an special offset area
     * @param {Point}
        */
    isPointOverOffset:function (pointX, pointY) {
        var isOverEl = arguments.callee.$.isPointOverOffset.apply(this, arguments);

        if (isOverEl) {

            // If there is an arguments with the absoluteBounds
            var absBounds = this.absoluteBounds();
            absBounds.widen(-ORYX.CONFIG.BORDER_OFFSET);

            if (!absBounds.isIncluded(pointX, pointY)) {
                return true;
            }
        }

        return false;

    },

    serialize:function () {
        var result = arguments.callee.$.serialize.apply(this);

        // Add the docker's bounds
        // nodes only have at most one docker!
        this.dockers.each((function (docker) {
            if (docker.getDockedShape()) {
                var center = docker.referencePoint;
                center = center ? center : docker.bounds.center();
                result.push({
                    name:'docker',
                    prefix:'oryx',
                    value:$H(center).values().join(','),
                    type:'literal'
                });
            }
        }).bind(this));

        // Get the spezific serialized object from the stencil
        try {
            //result = this.getStencil().serialize(this, result);

            var serializeEvent = this.getStencil().serialize();

            /*
             * call serialize callback by reference, result should be found
             * in serializeEvent.result
             */
            if (serializeEvent.type) {
                serializeEvent.shape = this;
                serializeEvent.data = result;
                serializeEvent.result = undefined;
                serializeEvent.forceExecution = true;

                this._delegateEvent(serializeEvent);

                if (serializeEvent.result) {
                    result = serializeEvent.result;
                }
            }
        }
        catch (e) {
        }
        return result;
    },

    deserialize:function (data) {
        arguments.callee.$.deserialize.apply(this, arguments);
        try {
            //data = this.getStencil().deserialize(this, data);

            var deserializeEvent = this.getStencil().deserialize();  
			
            /*
             * call serialize callback by reference, result should be found
             * in serializeEventInfo.result
             */
            if (deserializeEvent.type) {
                deserializeEvent.shape = this;
                deserializeEvent.data = data;
                deserializeEvent.result = undefined;
                deserializeEvent.forceExecution = true;

                this._delegateEvent(deserializeEvent);
                if (deserializeEvent.result) {
                    data = deserializeEvent.result;
                }
            }
        }
        catch (e) {
        }
		
        // Set the outgoing shapes
        /*var outgoing = data.findAll(function (ser) {
            return (ser.prefix + "-" + ser.name) == 'raziel-outgoing'
        });*/
		var tmp=[];
		$.map(data,function(ser){
			if((ser.prefix + "-" + ser.name) == 'raziel-outgoing'){
				tmp[tmp.length] = ser;
			}
		});
		outgoing= tmp;  
		
		var self = this;
		$.map(outgoing,function(obj){  //
            // TODO: Look at Canvas
            if (!self.parent) {
                return;
            }
            

            // Set outgoing Shape
			
            var next = self.getCanvas().getChildShapeByResourceId(obj.value);
            if (next) {  //把线条指针向着节点
                if (next instanceof ORYX.Core.Edge) {
                    //Set the first docker of the next shape
					//console.log("next.dockers==",next.dockers);
                    //next.dockers && next.dockers.length>0 && next.dockers.first().setDockedShape(self);
					//next.dockers && next.dockers.length>0 && next.dockers.first().setReferencePoint(next.dockers.first().bounds.center());
					next.dockers && next.dockers.length>0 && next.dockers[0].setDockedShape(self);
                    next.dockers && next.dockers.length>0 && next.dockers[0].setReferencePoint(next.dockers[0].bounds.center());
                } else if (next.dockers.length > 0) { //next is a node and next has a docker
                    next.dockers.first().setDockedShape(self);
                    //next.dockers.first().setReferencePoint({x: this.bounds.width() / 2.0, y: this.bounds.height() / 2.0});
                }
            }
		});
        //}).bind(this));
		
        if (this.dockers.length === 1) {  
            var dockerPos;
            dockerPos = data.find(function (entry) {
                return (entry.prefix + "-" + entry.name === "oryx-dockers");
            });

            if (dockerPos) {
                var points = dockerPos.value.replace(/,/g, " ").split(" ").without("").without("#");
                if (points.length === 2 && this.dockers[0].getDockedShape()) {
                    this.dockers[0].setReferencePoint({
                        x:parseFloat(points[0]),
                        y:parseFloat(points[1])
                    });
                }
                else {
                    this.dockers[0].bounds.centerMoveTo(parseFloat(points[0]), parseFloat(points[1]));
                }
            }
        }
    },

    /**
     * This method excepts the SVGDoucment that is the SVG representation
     * of this shape.
     * The bounds of the shape are calculated, the SVG representation's upper left point
     * is moved to 0,0 and it the method sets if this shape is resizable.
     *
     * @param {SVGDocument} svgDocument
     */
    _init:function (svgDocument) {
        arguments.callee.$._init.apply(this, arguments);
		
		/*var getsvgDocument = setInterval(function(){
			if(svgDocument){
				clearInterval(getsvgDocument);		
			}
		},100)*/
		
		//try{ 
			var svgNode = svgDocument.getElementsByTagName("g")[0]; //outer most g node
			// set all required attributes
			var attributeTitle = svgDocument.ownerDocument.createAttributeNS(null, "title");
			
			attributeTitle.nodeValue = this.getStencil().title();
			svgNode.setAttributeNode(attributeTitle);

			var attributeId = svgDocument.ownerDocument.createAttributeNS(null, "id");
			attributeId.nodeValue = this.id;
			svgNode.setAttributeNode(attributeId);

			//
			var stencilTargetNode = this.node.childNodes[0].childNodes[0]; //<g class=me>"
			svgNode = stencilTargetNode.appendChild(svgNode);

			// Add to the EventHandler
			this.addEventHandlers(svgNode.parentNode);

			/**set minimum and maximum size*/
			var minSizeAttr = svgNode.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "minimumSize");
			
			if (minSizeAttr) {
				minSizeAttr = minSizeAttr.replace("/,/g", " ");
				var minSizeValues = minSizeAttr.split(" ");
				//minSizeValues = minSizeValues.without("");
				minSizeValues = $.grep(minSizeValues,function(n){return n!=''});

				if (minSizeValues.length > 1) {
					this.minimumSize = {
						width:parseFloat(minSizeValues[0]),
						height:parseFloat(minSizeValues[1])
					};
				}
				else {
					//set minimumSize to (1,1), so that width and height of the stencil can never be (0,0)
					this.minimumSize = {
						width:1,
						height:1
					};
				}
			}

			var maxSizeAttr = svgNode.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "maximumSize");
			if (maxSizeAttr) {
				maxSizeAttr = maxSizeAttr.replace("/,/g", " ");
				var maxSizeValues = maxSizeAttr.split(" ");
				maxSizeValues = maxSizeValues.without("");

				if (maxSizeValues.length > 1) {
					this.maximumSize = {
						width:parseFloat(maxSizeValues[0]),
						height:parseFloat(maxSizeValues[1])
					};
				}
			}

			if (this.minimumSize && this.maximumSize &&
				(this.minimumSize.width > this.maximumSize.width ||
					this.minimumSize.height > this.maximumSize.height)) {

				//TODO wird verschluckt!!!
				throw this + ": Minimum Size must be greater than maxiumSize.";
			}

			/**get current bounds and adjust it to upperLeft == (0,0)*/
				//initialize all SVGShape objects
			this._svgShapes = this._initSVGShapes(svgNode);

			//get upperLeft and lowerRight of stencil
			var upperLeft = {
				x:undefined,
				y:undefined
			};
			var lowerRight = {
				x:undefined,
				y:undefined
			};
			var me = this;
			//this._svgShapes.each(function (svgShape) {
			$.map(this._svgShapes,function(svgShape){  //ray jquery
				upperLeft.x = (upperLeft.x !== undefined) ? Math.min(upperLeft.x, svgShape.x) : svgShape.x;
				upperLeft.y = (upperLeft.y !== undefined) ? Math.min(upperLeft.y, svgShape.y) : svgShape.y;
				lowerRight.x = (lowerRight.x !== undefined) ? Math.max(lowerRight.x, svgShape.x + svgShape.width) : svgShape.x + svgShape.width;
				lowerRight.y = (lowerRight.y !== undefined) ? Math.max(lowerRight.y, svgShape.y + svgShape.height) : svgShape.y + svgShape.height;

				/** set if resizing is enabled */
				//TODO isResizable durch die beiden anderen booleans ersetzen?
				if (svgShape.isHorizontallyResizable) {
					me.isHorizontallyResizable = true;
					me.isResizable = true;
				}
				if (svgShape.isVerticallyResizable) {
					me.isVerticallyResizable = true;
					me.isResizable = true;
				}
				if (svgShape.anchorTop && svgShape.anchorBottom) {
					me.isVerticallyResizable = true;
					me.isResizable = true;
				}
				if (svgShape.anchorLeft && svgShape.anchorRight) {
					me.isHorizontallyResizable = true;
					me.isResizable = true;
				}
			});

			//move all SVGShapes by -upperLeft
			//this._svgShapes.each(function (svgShape) {
			$.map(this._svgShapes,function (svgShape) { //
				svgShape.x -= upperLeft.x;
				svgShape.y -= upperLeft.y;
				svgShape.update();
			});

			//set bounds of shape
			//the offsets are also needed for positioning the magnets and the docker
			var offsetX = upperLeft.x;
			var offsetY = upperLeft.y;

			lowerRight.x -= offsetX;
			lowerRight.y -= offsetY;
			upperLeft.x = 0;
			upperLeft.y = 0;

			//prevent that width or height of initial bounds is 0
			if (lowerRight.x === 0) {
				lowerRight.x = 1;
			}
			if (lowerRight.y === 0) {
				lowerRight.y = 1;
			}

			this._oldBounds.set(upperLeft, lowerRight);
			this.bounds.set(upperLeft, lowerRight);
			
			/**initialize magnets */

			var magnets = svgDocument.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX, "magnets");

			if (magnets && magnets.length > 0) {

				//magnets = $A(magnets[0].getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX, "magnet"));
				magnets = $(magnets[0].getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX, "magnet")).toArray();//jquery
				var me = this;
				//magnets.each(function (magnetElem) {
				$.map(magnets,function(magnetElem){
					var magnet = new ORYX.Core.Controls.Magnet({
						eventHandlerCallback:me.eventHandlerCallback
					});
					var cx = parseFloat(magnetElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "cx"));
					var cy = parseFloat(magnetElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "cy"));
					magnet.bounds.centerMoveTo({
						x:cx - offsetX,
						y:cy - offsetY
					});

					//get anchors
					var anchors = magnetElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "anchors");
					if (anchors) {
						anchors = anchors.replace("/,/g", " ");
						anchors = anchors.split(" ");
						//anchors = anchors.without("");
						anchors = $.grep(anchors,function(n){return n!=''});  //jquery
						
						for (var i = 0; i < anchors.length; i++) {
							switch (anchors[i].toLowerCase()) {
								case "left":
									magnet.anchorLeft = true;
									break;
								case "right":
									magnet.anchorRight = true;
									break;
								case "top":
									magnet.anchorTop = true;
									break;
								case "bottom":
									magnet.anchorBottom = true;
									break;
							}
						}
					}

					me.add(magnet);

					//check, if magnet is default magnet
					if (!this._defaultMagnet) {
						var defaultAttr = magnetElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "default");
						if (defaultAttr && defaultAttr.toLowerCase() === "yes") {
							me._defaultMagnet = magnet;
						}
					}
				});
			}
			else {
				// Add a Magnet in the Center of Shape
				var magnet = new ORYX.Core.Controls.Magnet();
				magnet.bounds.centerMoveTo(this.bounds.width() / 2, this.bounds.height() / 2);
				this.add(magnet);
			}

			/**initialize docker */
			var dockerElem = svgDocument.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX, "docker");

			if (dockerElem && dockerElem.length > 0) {
				dockerElem = dockerElem[0];
				var docker = this.createDocker();
				var cx = parseFloat(dockerElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "cx"));
				var cy = parseFloat(dockerElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "cy"));
				docker.bounds.centerMoveTo({
					x:cx - offsetX,
					y:cy - offsetY
				});

				//get anchors
				var anchors = dockerElem.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "anchors");
				if (anchors) {
					anchors = anchors.replace("/,/g", " ");
					anchors = anchors.split(" ").without("");

					for (var i = 0; i < anchors.length; i++) {
						switch (anchors[i].toLowerCase()) {
							case "left":
								docker.anchorLeft = true;
								break;
							case "right":
								docker.anchorRight = true;
								break;
							case "top":
								docker.anchorTop = true;
								break;
							case "bottom":
								docker.anchorBottom = true;
								break;
						}
					}
				}
			}

			/**initialize labels*/
			var textElems = svgNode.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'text');
			
			var self  = this;
			$(textElems).each(function(){
				var textElem = this;
				var label = new ORYX.Core.SVG.Label({
					textElement:textElem,
					shapeId:self.id
				});
				
				
				label.x -= offsetX;
				label.y -= offsetY;
				self._labels[label.id] = label;
				label.registerOnChange(self.layout.apply(self));
			});
		//}catch(e){
		//	console.log(e);
		//}
		
    },

    /**
     * Override the Method, that a docker is not shown
     *
     */
    createDocker:function () {
        var docker = new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
        docker.bounds.registerCallback(this._dockerChangedCallback);

        this.dockers.push(docker);
        docker.parent = this;
        docker.bounds.registerCallback(this._changedCallback);

        return docker
    },

    toString:function () {
        return this._stencil.title() + " " + this.id
    }
};
ORYX.Core.Node = ORYX.Core.Shape.extend(ORYX.Core.Node);


// object 画线条之类的
ORYX.Core.Edge = ORYX.Core.Shape.extend({
    construct:function (options, stencil) {
	
        arguments.callee.$.construct.apply(this, arguments);

        this.isMovable = true;
        this.isSelectable = true;

        this._dockerUpdated = false;

        this._markers = new Hash(); //a hash map of SVGMarker objects where keys are the marker ids
        this._paths = [];
        this._interactionPaths = [];
        this._dockersByPath = new Hash();
        this._markersByPath = new Hash();

        /* Data structures to store positioning information of attached child nodes */
        this.attachedNodePositionData = new Hash();

        //TODO was muss hier initial erzeugt werden?
        var stencilNode = this.node.childNodes[0].childNodes[0];
        stencilNode = ORYX.Editor.graft("http://www.w3.org/2000/svg", stencilNode, ['g', {
            "pointer-events":"painted"
        }]);
		
        //Add to the EventHandler
        this.addEventHandlers(stencilNode.parentNode);



        this._oldBounds = this.bounds.clone();
		
		if(this._stencil.view()){
			this._init(this._stencil.view());  
			if (stencil instanceof Array) {
				this.deserialize(stencil);
			}
		}
		
    },

    _update:function (force) {
	
        if (this._dockerUpdated || this.isChanged || force) {
			//this.dockers.invoke("update");
			
			$.map(this.dockers,function(doc){  //
				doc.update();
			})
			
            if (false && (this.bounds.width() === 0 || this.bounds.height() === 0)) {
                var width = this.bounds.width();
                var height = this.bounds.height();
                this.bounds.extend({
                    x:width === 0 ? 2 : 0,
                    y:height === 0 ? 2 : 0
                });
                this.bounds.moveBy({
                    x:width === 0 ? -1 : 0,
                    y:height === 0 ? -1 : 0
                });

            }
            // TODO: Bounds muss abhaengig des Eltern-Shapes gesetzt werden
            var upL = this.bounds.upperLeft();
            var oldUpL = this._oldBounds.upperLeft();
            var oldWidth = this._oldBounds.width() === 0 ? this.bounds.width() : this._oldBounds.width();
            var oldHeight = this._oldBounds.height() === 0 ? this.bounds.height() : this._oldBounds.height();
            var diffX = upL.x - oldUpL.x;
            var diffY = upL.y - oldUpL.y;
            var diffWidth = (this.bounds.width() / oldWidth) || 1;
            var diffHeight = (this.bounds.height() / oldHeight) || 1;

            //this.dockers.each((function (docker) {
			var self = this;
			
			$.map(this.dockers,function(docker){
                // Unregister on BoundsChangedCallback
                docker.bounds.unregisterCallback(self._dockerChangedCallback);

                // If there is any changes at the edge and is there is not an DockersUpdate
                // set the new bounds to the docker
                if (!self._dockerUpdated) {
                    docker.bounds.moveBy(diffX, diffY);

                    if (diffWidth !== 1 || diffHeight !== 1) {
                        var relX = docker.bounds.upperLeft().x - upL.x;
                        var relY = docker.bounds.upperLeft().y - upL.y;
                        docker.bounds.moveTo(upL.x + relX * diffWidth, upL.y + relY * diffHeight);
                    }
                }
                // Do Docker update and register on DockersBoundChange
                docker.update();
                docker.bounds.registerCallback(self._dockerChangedCallback);
			});
            //}).bind(this));

			
            if (this._dockerUpdated) {
                // var a = this.dockers.first().bounds.center();
                // var b = this.dockers.first().bounds.center();
				
				var a = this.dockers[0].bounds.center();
                var b = this.dockers[0].bounds.center();

                //this.dockers.each((function (docker) {
				$.map(this.dockers,function (docker) {
                    var center = docker.bounds.center();
                    a.x = Math.min(a.x, center.x);
                    a.y = Math.min(a.y, center.y);
                    b.x = Math.max(b.x, center.x);
                    b.y = Math.max(b.y, center.y);
				});
                //}).bind(this));

                //set the bounds of the the association
				
                //this.bounds.set(Object.clone(a), Object.clone(b));  
				this.bounds.set($.extend(true,{},a), $.extend(true,{},b)); 
            }

            upL = this.bounds.upperLeft();
            oldUpL = this._oldBounds.upperLeft();
            diffWidth = (this.bounds.width() / (oldWidth || this.bounds.width()));
            diffHeight = (this.bounds.height() / (oldHeight || this.bounds.height()));
            diffX = upL.x - oldUpL.x;
            diffY = upL.y - oldUpL.y;

            //reposition labels
			
			var lab = this.getLabels();
            //this.getLabels().each(function (label) {
			$.map(lab,function(label){
                if (label.getReferencePoint()) {
                    var ref = label.getReferencePoint();
                    var from = ref.segment.from, to = ref.segment.to;
                    if (!from || !from.parent || !to || !to.parent) {
                        return;
                    }

                    var fromPosition = from.bounds.center(), toPosition = to.bounds.center();

                    if (fromPosition.x === ref.segment.fromPosition.x && fromPosition.y === ref.segment.fromPosition.y &&
                        toPosition.x === ref.segment.toPosition.x && toPosition.y === ref.segment.toPosition.y && !ref.dirty) {
                        return;
                    }

                    if (!self.parent.initializingShapes) {
                        var oldDistance = ORYX.Core.Math.getDistanceBetweenTwoPoints(ref.segment.fromPosition, ref.segment.toPosition, ref.intersection);
                        var newIntersection = ORYX.Core.Math.getPointBetweenTwoPoints(fromPosition, toPosition, isNaN(oldDistance) ? 0.5 : oldDistance);

                        /**
                         * Set position
                         */
                        // Get the orthogonal identity vector of the current segment
                        var oiv = ORYX.Core.Math.getOrthogonalIdentityVector(fromPosition, toPosition);
                        var isHor = Math.abs(oiv.y) === 1, isVer = Math.abs(oiv.x) === 1;
                        oiv.x *= ref.distance;
                        oiv.y *= ref.distance; 				// vector * distance
                        oiv.x += newIntersection.x;
                        oiv.y += newIntersection.y; 	// vector + the intersection point
                        var mx = isHor && ref.orientation && (ref.iorientation || ref.orientation).endsWith("r") ? -label.getWidth() : 0;
                        var my = isVer && ref.orientation && (ref.iorientation || ref.orientation).startsWith("l") ? -label.getHeight() + 2 : 0;
                        label.setX(oiv.x + mx);
                        label.setY(oiv.y + my);

                        // Update the reference point
                        self.updateReferencePointOfLabel(label, newIntersection, from, to);
                    } else {
                        var oiv = ORYX.Core.Math.getOrthogonalIdentityVector(fromPosition, toPosition);
                        oiv.x *= ref.distance;
                        oiv.y *= ref.distance; // vector * distance
                        oiv.x += ref.intersection.x;
                        oiv.y += ref.intersection.y; // vector + the intersection point
                        label.setX(oiv.x);
                        label.setY(oiv.y);
                        ref.segment.fromPosition = fromPosition;
                        ref.segment.toPosition = toPosition;
                    }

                    return;
                }

                // Update label position if no reference point is set
                if (label.position && !self.parent.initializingShapes) {
                    var x = label.position.x + (diffX * (diffWidth || 1));
                    if (x > self.bounds.lowerRight().x) {
                        x += self.bounds.width() - (self.bounds.width() / (diffWidth || 1));
                    }

                    var y = label.position.y + (diffY * (diffHeight || 1));
                    if (y > self.bounds.lowerRight().y) {
                        y += self.bounds.height() - (self.bounds.height() / (diffHeight || 1));
                    }
                    label.setX(x);
                    label.setY(y);
                    return;
                }

                switch (label.getEdgePosition()) {
                    case "starttop":
                        var angle = self._getAngle(self.dockers[0], self.dockers[1]);
                        //var pos = self.dockers.first().bounds.center();
						 var pos = self.dockers[0].bounds.center();

                        if (angle <= 90 || angle > 270) {
                            label.horizontalAlign("left");
                            label.verticalAlign("bottom");
                            label.x = pos.x + label.getOffsetTop();
                            label.y = pos.y - label.getOffsetTop();
                            label.rotate(360 - angle, pos);
                        } else {
                            label.horizontalAlign("right");
                            label.verticalAlign("bottom");
                            label.x = pos.x - label.getOffsetTop();
                            label.y = pos.y - label.getOffsetTop();
                            label.rotate(180 - angle, pos);
                        }

                        break;

                    case "startmiddle":
                        var angle = self._getAngle(self.dockers[0], self.dockers[1]);
                        var pos = self.dockers.first().bounds.center();

                        if (angle <= 90 || angle > 270) {
                            label.horizontalAlign("left");
                            label.verticalAlign("bottom");
                            label.x = pos.x + 2;
                            label.y = pos.y + 4;
                            label.rotate(360 - angle, pos);
                        } else {
                            label.horizontalAlign("right");
                            label.verticalAlign("bottom");
                            label.x = pos.x + 1;
                            label.y = pos.y + 4;
                            label.rotate(180 - angle, pos);
                        }

                        break;

                    case "startbottom":
                        var angle = self._getAngle(self.dockers[0], self.dockers[1]);
                        var pos = self.dockers.first().bounds.center();

                        if (angle <= 90 || angle > 270) {
                            label.horizontalAlign("left");
                            label.verticalAlign("top");
                            label.x = pos.x + label.getOffsetBottom();
                            label.y = pos.y + label.getOffsetBottom();
                            label.rotate(360 - angle, pos);
                        } else {
                            label.horizontalAlign("right");
                            label.verticalAlign("top");
                            label.x = pos.x - label.getOffsetBottom();
                            label.y = pos.y + label.getOffsetBottom();
                            label.rotate(180 - angle, pos);
                        }

                        break;
                    case "midtop":
                        var numOfDockers = self.dockers.length;
                        if (numOfDockers % 2 == 0) {
                            var angle = self._getAngle(self.dockers[numOfDockers / 2 - 1], self.dockers[numOfDockers / 2])
                            var pos1 = self.dockers[numOfDockers / 2 - 1].bounds.center();
                            var pos2 = self.dockers[numOfDockers / 2].bounds.center();
                            var pos = {x:(pos1.x + pos2.x) / 2.0, y:(pos1.y + pos2.y) / 2.0};

                            label.horizontalAlign("center");
                            label.verticalAlign("bottom");
                            label.x = pos.x;
                            label.y = pos.y - label.getOffsetTop();

                            if (angle <= 90 || angle > 270) {
                                label.rotate(360 - angle, pos);
                            } else {
                                label.rotate(180 - angle, pos);
                            }
                        } else {
                            var index = parseInt(numOfDockers / 2);
                            var angle = self._getAngle(self.dockers[index], self.dockers[index + 1])
                            var pos = self.dockers[index].bounds.center();

                            if (angle <= 90 || angle > 270) {
                                label.horizontalAlign("left");
                                label.verticalAlign("bottom");
                                label.x = pos.x + label.getOffsetTop();
                                label.y = pos.y - label.getOffsetTop();
                                label.rotate(360 - angle, pos);
                            } else {
                                label.horizontalAlign("right");
                                label.verticalAlign("bottom");
                                label.x = pos.x - label.getOffsetTop();
                                label.y = pos.y - label.getOffsetTop();
                                label.rotate(180 - angle, pos);
                            }
                        }

                        break;
                    case "midbottom":
                        var numOfDockers = self.dockers.length;
                        if (numOfDockers % 2 == 0) {
                            var angle = self._getAngle(self.dockers[numOfDockers / 2 - 1], self.dockers[numOfDockers / 2])
                            var pos1 = self.dockers[numOfDockers / 2 - 1].bounds.center();
                            var pos2 = self.dockers[numOfDockers / 2].bounds.center();
                            var pos = {x:(pos1.x + pos2.x) / 2.0, y:(pos1.y + pos2.y) / 2.0};

                            label.horizontalAlign("center");
                            label.verticalAlign("top");
                            label.x = pos.x;
                            label.y = pos.y + label.getOffsetTop();

                            if (angle <= 90 || angle > 270) {
                                label.rotate(360 - angle, pos);
                            } else {
                                label.rotate(180 - angle, pos);
                            }
                        } else {
                            var index = parseInt(numOfDockers / 2);
                            var angle = self._getAngle(self.dockers[index], self.dockers[index + 1])
                            var pos = self.dockers[index].bounds.center();

                            if (angle <= 90 || angle > 270) {
                                label.horizontalAlign("left");
                                label.verticalAlign("top");
                                label.x = pos.x + label.getOffsetBottom();
                                label.y = pos.y + label.getOffsetBottom();
                                label.rotate(360 - angle, pos);
                            } else {
                                label.horizontalAlign("right");
                                label.verticalAlign("top");
                                label.x = pos.x - label.getOffsetBottom();
                                label.y = pos.y + label.getOffsetBottom();
                                label.rotate(180 - angle, pos);
                            }
                        }

                        break;
                    case "endtop":
                        var length = self.dockers.length;
                        var angle = self._getAngle(self.dockers[length - 2], self.dockers[length - 1]);
                        var pos = self.dockers[this.dockers.length-1].bounds.center();

                        if (angle <= 90 || angle > 270) {
                            label.horizontalAlign("right");
                            label.verticalAlign("bottom");
                            label.x = pos.x - label.getOffsetTop();
                            label.y = pos.y - label.getOffsetTop();
                            label.rotate(360 - angle, pos);
                        } else {
                            label.horizontalAlign("left");
                            label.verticalAlign("bottom");
                            label.x = pos.x + label.getOffsetTop();
                            label.y = pos.y - label.getOffsetTop();
                            label.rotate(180 - angle, pos);
                        }

                        break;
                    case "endbottom":
                        var length = self.dockers.length;
                        var angle = self._getAngle(self.dockers[length - 2], self.dockers[length - 1]);
                        var pos = self.dockers[this.dockers.length-1].bounds.center();

                        if (angle <= 90 || angle > 270) {
                            label.horizontalAlign("right");
                            label.verticalAlign("top");
                            label.x = pos.x - label.getOffsetBottom();
                            label.y = pos.y + label.getOffsetBottom();
                            label.rotate(360 - angle, pos);
                        } else {
                            label.horizontalAlign("left");
                            label.verticalAlign("top");
                            label.x = pos.x + label.getOffsetBottom();
                            label.y = pos.y + label.getOffsetBottom();
                            label.rotate(180 - angle, pos);
                        }

                        break;
                }
            });
			//}.bind(this));

            //this.children.each(function (value) {
			$.map(this.children,function(value){  
                if (value instanceof ORYX.Core.Node) {
                    this.calculatePositionOfAttachedChildNode.call(this, value);
                }
			});
            //}.bind(this));

            this.refreshAttachedNodes();
            this.refresh(); //定位执行的

            this.isChanged = false;
            this._dockerUpdated = false;

            this._oldBounds = this.bounds.clone();
        }

    },

    /**
     *  Moves a point to the upperLeft of a node's bounds.
     *
     *  @param {point} point
     *      The point to move
     *  @param {ORYX.Core.Bounds} bounds
     *      The Bounds of the related noe
     */
    movePointToUpperLeftOfNode:function (point, bounds) {
        point.x -= bounds.width() / 2;
        point.y -= bounds.height() / 2;
    },

    /**
     * Refreshes the visual representation of edge's attached nodes.
     */
    refreshAttachedNodes:function () {
        //this.attachedNodePositionData.values().each(function (nodeData) {
		var self = this;
		$.map(this.attachedNodePositionData.values(),function(nodeData){
            var startPoint = nodeData.segment.docker1.bounds.center();
            var endPoint = nodeData.segment.docker2.bounds.center();
            self.relativizePoint(startPoint);
            self.relativizePoint(endPoint);

            var newNodePosition = new Object();

            /* Calculate new x-coordinate */
            newNodePosition.x = startPoint.x
                + nodeData.relativDistanceFromDocker1
                * (endPoint.x - startPoint.x);

            /* Calculate new y-coordinate */
            newNodePosition.y = startPoint.y
                + nodeData.relativDistanceFromDocker1
                * (endPoint.y - startPoint.y);

            /* Convert new position to the upper left of the node */
            self.movePointToUpperLeftOfNode(newNodePosition, nodeData.node.bounds);

            /* Move node to its new position */
            nodeData.node.bounds.moveTo(newNodePosition);
            nodeData.node._update();
		});
        //}.bind(this));
    },

    /**
     * Calculates the position of an edge's child node. The node is placed on
     * the path of the edge.
     *
     * @param {node}
        *         The node to calculate the new position
     * @return {Point}
     *         The calculated upper left point of the node's shape.
     */
    calculatePositionOfAttachedChildNode:function (node) {
        /* Initialize position */
        var position = new Object();
        position.x = 0;
        position.y = 0;

        /* Case: Node was just added */
        if (!this.attachedNodePositionData[node.getId()]) {
            this.attachedNodePositionData[node.getId()] = new Object();
            this.attachedNodePositionData[node.getId()]
                .relativDistanceFromDocker1 = 0;
            this.attachedNodePositionData[node.getId()].node = node;
            this.attachedNodePositionData[node.getId()].segment = new Object();
            this.findEdgeSegmentForNode(node);
        } else if (node.isChanged) {
            this.findEdgeSegmentForNode(node);
        }


    },

    /**
     * Finds the appropriate edge segement for a node.
     * The segment is choosen, which has the smallest distance to the node.
     *
     * @param {ORYX.Core.Node} node
     *         The concerning node
     */
    findEdgeSegmentForNode:function (node) {
        var length = this.dockers.length;
        var smallestDistance = undefined;

        for (i = 1; i < length; i++) {
            var lineP1 = this.dockers[i - 1].bounds.center();
            var lineP2 = this.dockers[i].bounds.center();
            this.relativizePoint(lineP1);
            this.relativizePoint(lineP2);

            var nodeCenterPoint = node.bounds.center();
            var distance = ORYX.Core.Math.distancePointLinie(
                lineP1,
                lineP2,
                nodeCenterPoint,
                true);

            if ((distance || distance == 0) && ((!smallestDistance && smallestDistance != 0)
                || distance < smallestDistance)) {

                smallestDistance = distance;

                this.attachedNodePositionData[node.getId()].segment.docker1 =
                    this.dockers[i - 1];
                this.attachedNodePositionData[node.getId()].segment.docker2 =
                    this.dockers[i];

            }

            /* Either the distance does not match the segment or the distance
             * between docker1 and docker2 is 0
             *
             * In this case choose the nearest docker as attaching point.
             *
             */
            if (!distance && !smallestDistance && smallestDistance != 0) {
                (ORYX.Core.Math.getDistancePointToPoint(nodeCenterPoint, lineP1)
                    < ORYX.Core.Math.getDistancePointToPoint(nodeCenterPoint, lineP2)) ?
                    this.attachedNodePositionData[node.getId()].relativDistanceFromDocker1 = 0 :
                    this.attachedNodePositionData[node.getId()].relativDistanceFromDocker1 = 1;
                this.attachedNodePositionData[node.getId()].segment.docker1 =
                    this.dockers[i - 1];
                this.attachedNodePositionData[node.getId()].segment.docker2 =
                    this.dockers[i];
            }
        }

        /* Calculate position on edge segment for the node */
        if (smallestDistance || smallestDistance == 0) {
            this.attachedNodePositionData[node.getId()].relativDistanceFromDocker1 =
                this.getLineParameterForPosition(
                    this.attachedNodePositionData[node.getId()].segment.docker1,
                    this.attachedNodePositionData[node.getId()].segment.docker2,
                    node);
        }
    },


    /**
     *
     * @param {ORYX.Core.Node|Object} node or position
     * @return {Object} An object with the following attribute: {ORYX.Core.Docker} fromDocker, {ORYX.Core.Docker} toDocker, {X/Y} position, {int} distance
     */
    findSegment:function (node) {

        var length = this.dockers.length;
        var result;

        var nodeCenterPoint = node instanceof ORYX.Core.UIObject ? node.bounds.center() : node;

        for (i = 1; i < length; i++) {
            var lineP1 = this.dockers[i - 1].bounds.center();
            var lineP2 = this.dockers[i].bounds.center();

            var distance = ORYX.Core.Math.distancePointLinie(lineP1, lineP2, nodeCenterPoint, true);

            if (typeof distance == "number" && (result === undefined || distance < result.distance)) {
                result = {
                    distance:distance,
                    fromDocker:this.dockers[i - 1],
                    toDocker:this.dockers[i]
                }

            }
        }
        return result;
    },

    /**
     * Returns the value of the scalar to determine the position of the node on
     * line defined by docker1 and docker2.
     *
     * @param {point} docker1
     *         The docker that defines the start of the line segment
     * @param {point} docker2
     *         The docker that defines the end of the line segment
     * @param {ORYX.Core.Node} node
     *         The concerning node
     *
     * @return {float} positionParameter
     *         The scalar value to determine the position on the line
     */
    getLineParameterForPosition:function (docker1, docker2, node) {
        var dockerPoint1 = docker1.bounds.center();
        var dockerPoint2 = docker2.bounds.center();
        this.relativizePoint(dockerPoint1);
        this.relativizePoint(dockerPoint2);

        var intersectionPoint = ORYX.Core.Math.getPointOfIntersectionPointLine(
            dockerPoint1,
            dockerPoint2,
            node.bounds.center(), true);
        if (!intersectionPoint) {
            return 0;
        }

        var relativeDistance =
            ORYX.Core.Math.getDistancePointToPoint(intersectionPoint, dockerPoint1) /
                ORYX.Core.Math.getDistancePointToPoint(dockerPoint1, dockerPoint2);

        return relativeDistance;
    },
    /**
     * Makes point relative to the upper left of the edge's bound.
     *
     * @param {point} point
     *         The point to relativize
     */
    relativizePoint:function (point) {
        point.x -= this.bounds.upperLeft().x;
        point.y -= this.bounds.upperLeft().y;
    },

    /**
     * Move the first and last docker and calls the refresh method.
     * Attention: This does not calculates intersection point between the
     * edge and the bounded nodes. This only works if only the nodes are
     * moves.
     *
     */
    optimizedUpdate:function () {

        var updateDocker = function (docker) {
            if (!docker._dockedShape || !docker._dockedShapeBounds)
                return;
            var off = {
                x:docker._dockedShape.bounds.a.x - docker._dockedShapeBounds.a.x,
                y:docker._dockedShape.bounds.a.y - docker._dockedShapeBounds.a.y
            };
            docker.bounds.moveBy(off);
            docker._dockedShapeBounds.moveBy(off);
        }

        updateDocker(this.dockers.first());
        updateDocker(this.dockers[this.dockers.length-1]);

        this.refresh();
    },

    refresh:function () {
	
        //call base class refresh method
        arguments.callee.$.refresh.apply(this, arguments);
		var self = this;
		
		
        //TODO consider points for marker mids
        var lastPoint;
        //this._paths.each((function (path, index) {
		
		$.map(self._paths,function(path,index){
            var dockers = self._dockersByPath[path.id];  
            var c = undefined;
            var d = undefined;
            if (lastPoint) {
                d = "M" + lastPoint.x + " " + lastPoint.y;
            }
            else {
                c = dockers[0].bounds.center();
                lastPoint = c;

                d = "M" + c.x + " " + c.y;
            }

            for (var i = 1; i < dockers.length; i++) {
                // for each docker, draw a line to the center
                c = dockers[i].bounds.center();
                d = d + "L" + c.x + " " + c.y + " ";
                lastPoint = c;
            } 
            path.setAttributeNS(null, "d", d);
            self._interactionPaths[index].setAttributeNS(null, "d", d);
			
			var parent = path.parentNode;
			var id = $(path).attr("id");
			var parent = document.getElementById(id).parentNode;
			
			var tmp = $(path).clone();
			$(path).remove();
			$("#"+id).remove();
			parent.appendChild(tmp.get(0));
			
		});
        //}).bind(this));

        /* move child shapes of an edge */
        if (this.getChildNodes() && this.getChildNodes().length > 0) {
            var x = this.bounds.upperLeft().x;
            var y = this.bounds.upperLeft().y;

            this.node.firstChild.childNodes[1].setAttributeNS(null, "transform", "translate(" + x + ", " + y + ")");
        }
		
		

    },

    /**
     * Calculate the Border Intersection Point between two points
     * @param {PointA}
        * @param {PointB}
        */
    getIntersectionPoint:function () {

        var length = Math.floor(this.dockers.length / 2)

        return ORYX.Core.Math.midPoint(this.dockers[length - 1].bounds.center(), this.dockers[length].bounds.center())
    },

    /**
     * Returns TRUE if the bounds is over the edge
     * @param {Bounds}
        *
     */
    isBoundsIncluded:function (bounds) {
	
        var dockers = this.dockers, size = dockers.length;
        return dockers.any(function (docker, i) {
            if (i == size - 1) {
                return false;
            }
            var a = docker.bounds.center();
            var b = dockers[i + 1].bounds.center();

            return ORYX.Core.Math.isRectOverLine(a.x, a.y, b.x, b.y, bounds.a.x, bounds.a.y, bounds.b.x, bounds.b.y);
        });
    },

    /**
     * Calculate if the point is inside the Shape
     * @param {PointX}
        * @param {PointY}
        */
    isPointIncluded:function (pointX, pointY) {

        var isbetweenAB = this.absoluteBounds().isIncluded(pointX, pointY,
            ORYX.CONFIG.OFFSET_EDGE_BOUNDS);

        var isPointIncluded = undefined;

        if (isbetweenAB && this.dockers.length > 0) {

            var i = 0;
            var point1, point2;


            do {

                point1 = this.dockers[i].bounds.center();
                point2 = this.dockers[++i].bounds.center();

                isPointIncluded = ORYX.Core.Math.isPointInLine(pointX, pointY,
                    point1.x, point1.y,
                    point2.x, point2.y,
                    ORYX.CONFIG.OFFSET_EDGE_BOUNDS);

            } while (!isPointIncluded && i < this.dockers.length - 1)

        }

        return isPointIncluded;

    },


    /**
     * Calculate if the point is over an special offset area
     * @param {Point}
        */
    isPointOverOffset:function () {
        return  false
    },

    /**
     * Returns TRUE if the given node
     * is a child node of the shapes node
     * @param {Element} node
     * @return {Boolean}
     *
     */
    containsNode:function (node) {
        if (this._paths.include(node) ||
            this._interactionPaths.include(node)) {
            return true;
        }
        return false;
    },

    /**
     * Returns the angle of the line between two dockers
     * (0 - 359.99999999)
     */
    _getAngle:function (docker1, docker2) {
        var p1 = docker1 instanceof ORYX.Core.Controls.Docker ? docker1.absoluteCenterXY() : docker1;
        var p2 = docker2 instanceof ORYX.Core.Controls.Docker ? docker2.absoluteCenterXY() : docker2;

        return ORYX.Core.Math.getAngle(p1, p2);
    },

    alignDockers:function () {
        this._update(true);

        var firstPoint = this.dockers[0].bounds.center();
        var lastPoint = this.dockers[this.dockers.length-1].bounds.center();

        var deltaX = lastPoint.x - firstPoint.x;
        var deltaY = lastPoint.y - firstPoint.y;

        var numOfDockers = this.dockers.length - 1;

        this.dockers.each((function (docker, index) {
            var part = index / numOfDockers;
            docker.bounds.unregisterCallback(this._dockerChangedCallback);
            docker.bounds.moveTo(firstPoint.x + part * deltaX, firstPoint.y + part * deltaY);
            docker.bounds.registerCallback(this._dockerChangedCallback);
        }).bind(this));

        this._dockerChanged();
    },

    add:function (shape) {
        arguments.callee.$.add.apply(this, arguments);

        // If the new shape is a Docker which is not contained
        //if (shape instanceof ORYX.Core.Controls.Docker && this.dockers.include(shape)) {
		if (shape instanceof ORYX.Core.Controls.Docker && $.inArray(shape,this.dockers>=0)) {
            // Add it to the dockers list ordered by paths
            //var pathArray = this._dockersByPath[0];
			var pathArray = this._dockersByPath.values()[0];
			
            if (pathArray) {
                pathArray.splice(this.dockers.indexOf(shape), 0, shape);
            }

            /* Perform nessary adjustments on the edge's child shapes */
            this.handleChildShapesAfterAddDocker(shape);
        }
    },

    /**
     * Performs nessary adjustments on the edge's child shapes.
     *
     * @param {ORYX.Core.Controls.Docker} docker
     *         The added docker
     */
    handleChildShapesAfterAddDocker:function (docker) {
        /* Ensure type of Docker */
        if (!docker instanceof ORYX.Core.Controls.Docker) {
            return undefined;
        }

        var index = this.dockers.indexOf(docker);
        if (!(0 < index && index < this.dockers.length - 1)) {
            /* Exception: Expect added docker between first and last node of the edge */
            return undefined;
        }

        /* Get child nodes concerning the segment of the new docker */
        var startDocker = this.dockers[index - 1];
        var endDocker = this.dockers[index + 1];

        /* Adjust the position of edge's child nodes */
        var segmentElements =
            this.getAttachedNodePositionDataForSegment(startDocker, endDocker);

        var lengthSegmentPart1 = ORYX.Core.Math.getDistancePointToPoint(
            startDocker.bounds.center(),
            docker.bounds.center());
        var lengthSegmentPart2 = ORYX.Core.Math.getDistancePointToPoint(
            endDocker.bounds.center(),
            docker.bounds.center());

        if (!(lengthSegmentPart1 + lengthSegmentPart2)) {
            return;
        }

        var relativDockerPosition = lengthSegmentPart1 / (lengthSegmentPart1 + lengthSegmentPart2);

        segmentElements.each(function (nodePositionData) {
            /* Assign child node to the new segment */
            if (nodePositionData.value.relativDistanceFromDocker1 < relativDockerPosition) {
                /* Case: before added Docker */
                nodePositionData.value.segment.docker2 = docker;
                nodePositionData.value.relativDistanceFromDocker1 =
                    nodePositionData.value.relativDistanceFromDocker1 / relativDockerPosition;
            } else {
                /* Case: after added Docker */
                nodePositionData.value.segment.docker1 = docker;
                var newFullDistance = 1 - relativDockerPosition;
                var relativPartOfSegment =
                    nodePositionData.value.relativDistanceFromDocker1
                        - relativDockerPosition;

                nodePositionData.value.relativDistanceFromDocker1 =
                    relativPartOfSegment / newFullDistance;

            }
        })


        // Update all labels reference points
        this.getLabels().each(function (label) {

            var ref = label.getReferencePoint();
            if (!ref) {
                return;
            }
            var index = this.dockers.indexOf(docker);
            if (index >= ref.segment.fromIndex && index <= ref.segment.toIndex) {

                var segment = this.findSegment(ref.intersection);
                if (!segment) {
                    // Choose whether the first of the last segment
                    segment.fromDocker = ref.segment.fromIndex >= (this.dockers.length / 2) ? this.dockers[0] : this.dockers[this.dockers.length - 2];
                    segment.toDocker = this.dockers[this.dockers.indexOf(from) + 1]; // The next one if the to docker
                }

                var fromPosition = segment.fromDocker.bounds.center(), toPosition = segment.toDocker.bounds.center();

                var intersection = ORYX.Core.Math.getPointOfIntersectionPointLine(
                    fromPosition, // P1 - Center of the first docker
                    toPosition, // P2 - Center of the second docker
                    ref.intersection, // P3 - Center of the label
                    true);
                //var oldDistance = ORYX.Core.Math.getDistanceBetweenTwoPoints(ref.segment.fromPosition, ref.segment.toPosition, ref.intersection);
                //intersection = ORYX.Core.Math.getPointBetweenTwoPoints(fromPosition, toPosition, isNaN(oldDistance) ? 0.5 : (lengthOld*oldDistance)/lengthNew);

                // Update the reference point
                this.updateReferencePointOfLabel(label, intersection, segment.fromDocker, segment.toDocker, true);
            }
        }.bind(this));

        /* Update attached nodes visual representation */
        this.refreshAttachedNodes();
    },

    /**
     *    Returns elements from {@link attachedNodePositiondata} that match the
     *  segement defined by startDocker and endDocker.
     *
     *  @param {ORYX.Core.Controls.Docker} startDocker
     *      The docker defining the begin of the segment.
     *  @param {ORYX.Core.Controls.Docker} endDocker
     *      The docker defining the begin of the segment.
     *
     *  @return {Hash} attachedNodePositionData
     *      Child elements matching the segment
     */
    getAttachedNodePositionDataForSegment:function (startDocker, endDocker) {
        /* Ensure that the segment is defined correctly */
        if (!((startDocker instanceof ORYX.Core.Controls.Docker)
            && (endDocker instanceof ORYX.Core.Controls.Docker))) {
            return [];
        }

       
		var tmp=[];
		$.map(this.attachedNodePositionData,function(nodePositionData){
			if(typeof nodePositionData ==='object' && nodePositionData.value)
			if(nodePositionData.value.segment.docker1 === startDocker &&
                    nodePositionData.value.segment.docker2 === endDocker){
				tmp[tmp.length] = nodePositionData;
			}
		});
		var elementsOfSegment = tmp;  // 
        /* Return a Hash in each case */
        if (!elementsOfSegment) {
            return [];
        }

        return elementsOfSegment;
    },

    /**
     * Removes an edge's child shape
     */
    remove:function (shape) {
        arguments.callee.$.remove.apply(this, arguments);

        if (this.attachedNodePositionData[shape.getId()]) {
            delete this.attachedNodePositionData[shape.getId()];
        }

        /* Adjust child shapes if neccessary */
        if (shape instanceof ORYX.Core.Controls.Docker) {
            this.handleChildShapesAfterRemoveDocker(shape);
        }
    },

    updateReferencePointOfLabel:function (label, intersection, from, to, dirty) {
        if (!label.getReferencePoint() || !label.isVisible) {
            return;
        }

        var ref = label.getReferencePoint();

        //
        if (ref.orientation && ref.orientation !== "ce") {
            var angle = this._getAngle(from, to);
            if (ref.distance >= 0) {
                if (angle == 0) {
                    label.horizontalAlign("left");//ref.orientation == "lr" ? "right" : "left");
                    label.verticalAlign("bottom");
                } else if (angle > 0 && angle < 90) {
                    label.horizontalAlign("right");
                    label.verticalAlign("bottom");
                } else if (angle == 90) {
                    label.horizontalAlign("right");
                    label.verticalAlign("top");//ref.orientation == "lr" ? "bottom" : "top");
                } else if (angle > 90 && angle < 180) {
                    label.horizontalAlign("right");
                    label.verticalAlign("top");
                } else if (angle == 180) {
                    label.horizontalAlign("left");//ref.orientation == "ur" ? "right" : "left");
                    label.verticalAlign("top");
                } else if (angle > 180 && angle < 270) {
                    label.horizontalAlign("left");
                    label.verticalAlign("top");
                } else if (angle == 270) {
                    label.horizontalAlign("left");
                    label.verticalAlign("top");//ref.orientation == "ll" ? "bottom" : "top");
                } else if (angle > 270 && angle <= 360) {
                    label.horizontalAlign("left");
                    label.verticalAlign("bottom");
                }
            } else {
                if (angle == 0) {
                    label.horizontalAlign("left");//ref.orientation == "ur" ? "right" : "left");
                    label.verticalAlign("top");
                } else if (angle > 0 && angle < 90) {
                    label.horizontalAlign("left");
                    label.verticalAlign("top");
                } else if (angle == 90) {
                    label.horizontalAlign("left");
                    label.verticalAlign("top");//ref.orientation == "ll" ? "bottom" : "top");
                } else if (angle > 90 && angle < 180) {
                    label.horizontalAlign("left");
                    label.verticalAlign("bottom");
                } else if (angle == 180) {
                    label.horizontalAlign("left");//ref.orientation == "lr" ? "right" : "left");
                    label.verticalAlign("bottom");
                } else if (angle > 180 && angle < 270) {
                    label.horizontalAlign("right");
                    label.verticalAlign("bottom");
                } else if (angle == 270) {
                    label.horizontalAlign("right");
                    label.verticalAlign("top");//ref.orientation == "lr" ? "bottom" : "top");
                } else if (angle > 270 && angle <= 360) {
                    label.horizontalAlign("right");
                    label.verticalAlign("top");
                }
            }
            ref.iorientation = ref.iorientation || ref.orientation;
            ref.orientation = (label.verticalAlign() == "top" ? "u" : "l") + (label.horizontalAlign() == "left" ? "l" : "r");
        }

        label.setReferencePoint($.extend({}, {
            intersection:intersection,
            segment:{
                from:from,
                fromIndex:this.dockers.indexOf(from),
                fromPosition:from.bounds.center(),
                to:to,
                toIndex:this.dockers.indexOf(to),
                toPosition:to.bounds.center()
            },
            dirty:dirty || false
        }, ref))
    },
    /**
     *     Adjusts the child shapes of an edges after a docker was removed.
     *
     *  @param{ORYX.Core.Controls.Docker} docker
     *      The removed docker.
     */
    handleChildShapesAfterRemoveDocker:function (docker) {
        /* Ensure docker type */
        if (!(docker instanceof ORYX.Core.Controls.Docker)) {
            return;
        }
		
        //this.attachedNodePositionData.each(function (nodePositionData) {
		var keys = this.attachedNodePositionData.keys(),self = this;
		if(keys.length>0){
			this.attachedNodePositionData.keys().each(function (key) {
				var nodePositionData = self.attachedNodePositionData[key];
				if (nodePositionData.value.segment.docker1 === docker) {
					/* The new start of the segment is the predecessor of docker2. */
					var index = self.dockers.indexOf(nodePositionData.value.segment.docker2);
					if (index == -1) {
						return;
					}
					nodePositionData.value.segment.docker1 = self.dockers[index - 1];
				}
				else if (nodePositionData.value.segment.docker2 === docker) {
					/* The new end of the segment is the successor of docker1. */
					var index = self.dockers.indexOf(nodePositionData.value.segment.docker1);
					if (index == -1) {
						return;
					}
					nodePositionData.value.segment.docker2 = self.dockers[index + 1];
				}
			});
		}
        // Update all labels reference points
        this.getLabels().each(function (label) {

            var ref = label.getReferencePoint();
            if (!ref) {
                return;
            }
            var from = ref.segment.from;
            var to = ref.segment.to;

            if (from !== docker && to !== docker) {
                return;
            }

            var segment = this.findSegment(ref.intersection);
            if (!segment) {
                from = segment.fromDocker;
                to = segment.toDocker;
            } else {
                from = from === docker ? this.dockers[this.dockers.indexOf(to) - 1] : from;
                to = this.dockers[this.dockers.indexOf(from) + 1];
            }

            var intersection = ORYX.Core.Math.getPointOfIntersectionPointLine(from.bounds.center(), to.bounds.center(), ref.intersection, true);
            // Update the reference point
            this.updateReferencePointOfLabel(label, intersection, from, to, true);
        }.bind(this));

        /* Update attached nodes visual representation */
        this.refreshAttachedNodes();
    },

    /**
     *@deprecated Use the .createDocker() Method and set the point via the bounds
     */
    addDocker:function (position, exDocker) {
        var lastDocker;
        var result,self=this;
		var keys = this._dockersByPath.keys;
		for(var key in this._dockersByPath){
			var dockers = this._dockersByPath[key];
		}
		
		var dockers = this._dockersByPath.values()[0];
		var keys = this._dockersByPath.keys()[0];
		
        if(dockers.length>0){
            //return pair.value.any((function (docker, index) {
			var p=false;
			$.each(dockers,function(index){
				var docker =this;
                if (!lastDocker) {
                    lastDocker = docker;
                    return true;
                }else {
                    var point1 = lastDocker.bounds.center();
                    var point2 = docker.bounds.center();

                    if (ORYX.Core.Math.isPointInLine(position.x, position.y, point1.x, point1.y, point2.x, point2.y, 10)) {
                        var path = self._paths.find(function (path) {
                            //return path.id === pair.key;
							return path.id === keys[index]
                        });
                        if (path) {
                            var allowAttr = path.getAttributeNS(NAMESPACE_ORYX, 'allowDockers');
                            if (allowAttr && allowAttr.toLowerCase() === "no") {
                                return false;
                            }
                        }
                        var newDocker = (exDocker) ? exDocker : self.createDocker(self.dockers.indexOf(lastDocker) + 1, position);
                        newDocker.bounds.centerMoveTo(position);
                        if (exDocker)
                            self.add(newDocker, self.dockers.indexOf(lastDocker) + 1);
                        // Remove new Docker from 'to add' dockers
                        //pair.value = pair.value.without(newDocker);
                        //pair.value.splice(this.dockers.indexOf(lastDocker) + 1, 0, newDocker);
                        // Remove the Docker from the Docker list and add the Docker to the new position
                        //this.dockers = this.dockers.without(newDocker);
                        //this.dockers.splice(this.dockers.indexOf(lastDocker) + 1, 0, newDocker);
                        //this._update(true);
						
                        result = newDocker;
						p=true;
                        return false;
                    }else {
                        lastDocker = docker;
                        return true;
                    }
                }
            
			});
		}
        return result;
    },

    removeDocker:function (docker) {   
		
        if (this.dockers.length > 2 && !(this.dockers.first() === docker)) {
            //this._dockersByPath.any((function (pair) {
			var any = false,self = this;
			for(var dp in this._dockersByPath){
				if(dp.indexOf("sid")>=0){
					var value = this._dockersByPath[dp];
					if (value.member(docker)) {
						if (docker === value.last()) {
							//return true;
							any = true;
							return false;
						}
						else {
							self.remove(docker);
							this._dockersByPath[dp] = value.without(docker);
							self.isChanged = true;
							self._dockerChanged();
							//return true;
							any = true;
							return false;
						}
					}
					//return false;
					any = false;
				}
            };
			return any;
			//}).bind(this));
        }
    },

    /**
     * Removes all dockers from the edge which are on
     * the line between two dockers
     * @return {Object} Removed dockers in an indicied array
     * (key is the removed position of the docker, value is docker themselve)
     */
    removeUnusedDockers:function () {
        var marked = new Hash(),self =this;

        //this.dockers.each(function (docker, i) {
		$.map(this.dockers,function (docker, i) {
            if (i == 0 || i == self.dockers.length - 1) {
                return
            }
            var previous = self.dockers[i - 1];

            /* Do not consider already removed dockers */
            if (marked.values().indexOf(previous) != -1 && self.dockers[i - 2]) {
                previous = self.dockers[i - 2];
            }
            var next = self.dockers[i + 1];

            var cp = previous.getDockedShape() && previous.referencePoint ? previous.getAbsoluteReferencePoint() : previous.bounds.center();
            var cn = next.getDockedShape() && next.referencePoint ? next.getAbsoluteReferencePoint() : next.bounds.center();
            var cd = docker.bounds.center();

            if (ORYX.Core.Math.isPointInLine(cd.x, cd.y, cp.x, cp.y, cn.x, cn.y, 1)) {
                marked[i] = docker;
            }
        
		});
		//}.bind(this))

        //marked.each(function (docker) {
		$.map(marked,function (docker) {
            self.removeDocker(docker.value);
        
		});
		//}.bind(this))

        if (marked.values().length > 0) {
            this._update(true);
        }

        return marked;
    },

    /**
     * Initializes the Edge after loading the SVG representation of the edge.
     * @param {SVGDocument} svgDocument
     */
    _init:function (svgDocument) {
		
        arguments.callee.$._init.apply(this, arguments);

        var minPointX, minPointY, maxPointX, maxPointY;
		
        //init markers
        //var defs = svgDocument.getElementsByTagNameNS(NAMESPACE_SVG, "defs");
		var defs = $(svgDocument).find("defs");  //
		
        if (defs.length > 0) {
            defs = defs[0];
            //var markerElements = $A(defs.getElementsByTagNameNS(NAMESPACE_SVG, "marker"));
			var markerElements = $(defs).find("marker");   //
            var marker;
            var me = this;
            //markerElements.each(function (markerElement) {
			$.map(markerElements,function (markerElement) {
                try {
                    marker = new ORYX.Core.SVG.SVGMarker(markerElement.cloneNode(true));
                    me._markers[marker.id] = marker;  
					var textElements = $(marker.element.getElementsByTagNameNS(NAMESPACE_SVG, "text"));  
                    var label;
                    //textElements.each(function (textElement) {
					$.map(textElements,function (textElement) {
                        label = new ORYX.Core.SVG.Label({
                            textElement:textElement,
                            shapeId:this.id
                        });
                        me._labels[label.id] = label;  
						
                    });
                }
                catch (e) {
					console.log("markerElements map == ",e);
                }
            });
        }
		
		//NAMESPACE_SVG = "http://www.w3.org/2000/svg/";
		//getElementsByTagNameNS  IE 不支持 通过命名空间获取某个标签名称
        //var gs = svgDocument.getElementsByTagNameNS(NAMESPACE_SVG, "g");
		var gs = $(svgDocument).find("g"); 
		
        if (gs.length <= 0) {
            throw "Edge: No g element found.";
        }
		
        var g = gs[0];

        g.setAttributeNS(null, "id", null);

        var isFirst = true;

        //$A(g.childNodes).each((function (path, index) {
		var self = this;
		$(g.childNodes).each(function(index){
			var path = this;
            if (ORYX.Editor.checkClassType(path, SVGPathElement)) {
                path = path.cloneNode(false);

                var pathId = self.id + "_" + index;
                path.setAttributeNS(null, "id", pathId);
                self._paths.push(path);

                //check, if markers are set and update the id
                var markersByThisPath = [];
                var markerUrl = path.getAttributeNS(null, "marker-start");
				
                if (markerUrl && markerUrl !== "") {
                    //markerUrl = markerUrl.strip();
					markerUrl = $.trim(markerUrl);
                    //markerUrl = markerUrl.replace(/^url\(#/, '');  //IE 不兼容
					markerUrl = markerUrl.replace(/^url|\(|"|#/g, '');
					markerUrl = markerUrl.replace(/\"/g, '');
                    var markerStartId = self.id.concat(markerUrl.replace(/\)$/, ''));
					markerStartId = markerStartId.replace(/"/g, '');
                    path.setAttributeNS(null, "marker-start", "url(#" + markerStartId + ")");
					
                    markersByThisPath.push(self._markers[markerStartId]);
                }

                markerUrl = path.getAttributeNS(null, "marker-mid");

                if (markerUrl && markerUrl !== "") {
                    //markerUrl = markerUrl.strip();
					markerUrl = $.trim(markerUrl);
                    //markerUrl = markerUrl.replace(/^url\(#/, '');//IE 不兼容
					markerUrl = markerUrl.replace(/^url|\(|"|#/g, '');
					markerUrl = markerUrl.replace(/\"/g, '');
                    var markerMidId = self.id.concat(markerUrl.replace(/\)$/, ''));
					markerMidId = markerMidId.replace(/"/g, '');
                    path.setAttributeNS(null, "marker-mid", "url(#" + markerMidId + ")");
                                                       
                    markersByThisPath.push(self._markers[markerMidId]);
                }

                markerUrl = path.getAttributeNS(null, "marker-end");

                if (markerUrl && markerUrl !== "") {
                    //markerUrl = markerUrl.strip();
					markerUrl = $.trim(markerUrl);
                    //markerUrl = markerUrl.replace(/^url\(#/, '');//IE 不兼容
					markerUrl = markerUrl.replace(/^url|\(|"|#/g, '');
					
                    var markerEndId = self.id.concat(markerUrl.replace(/\)$/, ''));
					markerEndId = markerEndId.replace(/"/g, '');
					
					
					var mid = 'url(#' + markerEndId + '';
                    //path.setAttributeNS(null, "marker-end", 'url(#' + markerEndId + ')');
					$(path).attr("marker-end",mid);
					$(path).attr("marker-end",$(path).attr("marker-end")+")");
                    markersByThisPath.push(self._markers[markerEndId]);
                }

                self._markersByPath[pathId] = markersByThisPath;
				
                //init dockers
                var parser = new PathParser();
                var handler = new ORYX.Core.SVG.PointsPathHandler();
                parser.setHandler(handler);
                parser.parsePath(path);
				
				
                if (handler.points.length < 4) {
                    throw "Edge: Path has to have two or more points specified.";
                }

                self._dockersByPath[pathId] = [];
				
                for (var i = 0; i < handler.points.length; i += 2) {
                    //handler.points.each((function(point, pIndex){
                    var x = handler.points[i];
                    var y = handler.points[i + 1];
                    if (isFirst || i > 0) {
                        var docker = new ORYX.Core.Controls.Docker({
                            eventHandlerCallback:self.eventHandlerCallback
                        });
                        docker.bounds.centerMoveTo(x, y);
						docker.bounds.registerCallback(self._dockerChangedCallback);  //定位框框
                        self.add(docker, self.dockers.length);

                        //calculate minPoint and maxPoint
                        if (minPointX) {
                            minPointX = Math.min(x, minPointX);
                            minPointY = Math.min(y, minPointY);
                        }
                        else {
                            minPointX = x;
                            minPointY = y;
                        }

                        if (maxPointX) {
                            maxPointX = Math.max(x, maxPointX);
                            maxPointY = Math.max(y, maxPointY);
                        }
                        else {
                            maxPointX = x;
                            maxPointY = y;
                        }
                    }
                    //}).bind(this));
                }
				
                isFirst = false;
            }
        });
		
        this.bounds.set(minPointX, minPointY, maxPointX, maxPointY);
        if (false && (this.bounds.width() === 0 || this.bounds.height() === 0)) {
            var width = this.bounds.width();
            var height = this.bounds.height();

            this.bounds.extend({
                x:width === 0 ? 2 : 0,
                y:height === 0 ? 2 : 0
            });

            this.bounds.moveBy({
                x:width === 0 ? -1 : 0,
                y:height === 0 ? -1 : 0
            });

        }
        this._oldBounds = this.bounds.clone();

        //add paths to this.node
        this._paths.reverse();
        var paths = [];
       
		
		$.map(this._paths,function (path) {
            paths.push(self.node.childNodes[0].childNodes[0].childNodes[0].appendChild(path));
        });
		

        this._paths = paths;

        //init interaction path
        //this._paths.each((function (path) {
		$.map(this._paths,function(path){
            var iPath = path.cloneNode(false);
            iPath.setAttributeNS(null, "id", undefined);
            iPath.setAttributeNS(null, "stroke-width", 10);
            iPath.setAttributeNS(null, "visibility", "hidden");
            iPath.setAttributeNS(null, "stroke-dasharray", null);
            iPath.setAttributeNS(null, "stroke", "black");
            iPath.setAttributeNS(null, "fill", "none");
            iPath.setAttributeNS(null, "title", self.getStencil().title());
            self._interactionPaths.push(self.node.childNodes[0].childNodes[0].childNodes[0].appendChild(iPath));
        });

        this._paths.reverse();
        this._interactionPaths.reverse();

        /**initialize labels*/
        var textElems = svgDocument.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'text');

        //$A(textElems).each((function (textElem) {
		$(textElems).each(function () {
			var textElem = this;
            var label = new ORYX.Core.SVG.Label({
                textElement:textElem,
                shapeId:self.id
            });
            self.node.childNodes[0].childNodes[0].appendChild(label.node);
            self._labels[label.id] = label; 
			
			//self._labels.add(label.id,label);

            label.registerOnChange(self.layout.apply(self));
        });


        //this.propertiesChanged.each(function (pair) {
		$.each(this.propertiesChanged,function (pair) { 
            pair.value = true;
        });

        //this._update(true);
    },

    /**
     * Adds all necessary markers of this Edge to the SVG document.
     * Has to be called, while this.node is part of DOM.
     */
    addMarkers:function (defs) {
        //this._markers.each(function (marker) {
		$.map(this._markers,function(marker){
			if (typeof marker ==='object' && marker instanceof ORYX.Core.SVG.SVGMarker) {
				if (marker.id && !defs.ownerDocument.getElementById(marker.id)) {
					marker.element = defs.appendChild(marker.element);
				}
			}
        });
    },

    /**
     * Removes all necessary markers of this Edge from the SVG document.
     * Has to be called, while this.node is part of DOM.
     */
    removeMarkers:function () {
        var svgElement = this.node.ownerSVGElement;
        if (svgElement) {
            var defs = svgElement.getElementsByTagNameNS(NAMESPACE_SVG, "defs");
            if (defs.length > 0) {
                defs = defs[0];
                //this._markers.each(function (marker) {
				$.map(this._markers,function (marker) {
                    var foundMarker = defs.ownerDocument.getElementById(marker.value.id);
                    if (foundMarker) {
                        marker.value.element = defs.removeChild(marker.value.element);
                    }
                });
            }
        }
    },

    /**
     * Calls when a docker has changed
     */
    _dockerChanged:function () {
        //this._update(true);
        this._dockerUpdated = true;
    },

    serialize:function () {
        var result = arguments.callee.$.serialize.apply(this);

        //add dockers triple
        var value = "";
        //this._dockersByPath.each((function (pair) {
		$.map(this._dockersByPath,function (pair) {
            pair.value.each(function (docker) {
                var position = docker.getDockedShape() && docker.referencePoint ? docker.referencePoint : docker.bounds.center();
                value = value.concat(position.x + " " + position.y + " ");
            });

            value += " # ";
		});
        //}).bind(this));
        result.push({
            name:'dockers',
            prefix:'oryx',
            value:value,
            type:'literal'
        });

        //serialize target and source
        var lastDocker = this.dockers.last();

        var target = lastDocker.getDockedShape();

        if (target) {
            result.push({
                name:'target',
                prefix:'raziel',
                value:'#' + ERDF.__stripHashes(target.resourceId),
                type:'resource'
            });
        }

        try {
            //result = this.getStencil().serialize(this, result);
            var serializeEvent = this.getStencil().serialize();

            /*
             * call serialize callback by reference, result should be found
             * in serializeEvent.result
             */
            if (serializeEvent.type) {
                serializeEvent.shape = this;
                serializeEvent.data = result;
                serializeEvent.result = undefined;
                serializeEvent.forceExecution = true;

                this._delegateEvent(serializeEvent);

                if (serializeEvent.result) {
                    result = serializeEvent.result;
                }
            }
        }
        catch (e) {
        }
        return result;
    },

    deserialize:function (data) {  //控制顺序流起始位置
        try {
            //data = this.getStencil().deserialize(this, data);

            var deserializeEvent = this.getStencil().deserialize();

            /*
             * call serialize callback by reference, result should be found
             * in serializeEventInfo.result
             */
            if (deserializeEvent.type) {
                deserializeEvent.shape = this;
                deserializeEvent.data = data;
                deserializeEvent.result = undefined;
                deserializeEvent.forceExecution = true;

                this._delegateEvent(deserializeEvent);
                if (deserializeEvent.result) {
                    data = deserializeEvent.result;
                }
            }
        }
        catch (e) {
        }

        // Set the outgoing shapes
        var target = data.find(function (ser) {
            return (ser.prefix + "-" + ser.name) == 'raziel-target'
        });
        var targetShape;
        if (target) {
            targetShape = this.getCanvas().getChildShapeByResourceId(target.value);
        }

        /*var outgoing = data.findAll(function (ser) {
            return (ser.prefix + "-" + ser.name) == 'raziel-outgoing'
        });*/
		
		var tmp=[];
		$.map(data,function(ser){
			if((ser.prefix + "-" + ser.name) == 'raziel-outgoing'){
				tmp[tmp.length] = ser;
			}
		});
		outgoing= tmp;  //
        //outgoing.each((function (obj) {
		var self = this;
		$.map(outgoing,function(obj){
            // TODO: Look at Canvas
            if (!self.parent) {
                return
            }
            ;

            // Set outgoing Shape
            var next = self.getCanvas().getChildShapeByResourceId(obj.value);

            if (next) {
                if (next == targetShape) {
                    // If this is an edge, set the last docker to the next shape
                    //self.dockers && self.dockers.length>0 && self.dockers.last().setDockedShape(next);
                    //self.dockers && self.dockers.length>0 && self.dockers.last().setReferencePoint({x:next.bounds.width() / 2.0, y:next.bounds.height() / 2.0});
					self.dockers && self.dockers.length>0 && self.dockers[self.dockers.length-1].setDockedShape(next);
                    self.dockers && self.dockers.length>0 && self.dockers[self.dockers.length-1].setReferencePoint({x:next.bounds.width() / 2.0, y:next.bounds.height() / 2.0});
                } else if (next instanceof ORYX.Core.Edge) {
                    //Set the first docker of the next shape
                    self.dockers && self.dockers.length>0 && next.dockers[0].setDockedShape(self);
                    //next.dockers.first().setReferencePoint({x: this.bounds.width() / 2.0, y: this.bounds.height() / 2.0});
                }
                /*else if(next.dockers.length > 0) { //next is a node and next has a docker
                 next.dockers.first().setDockedShape(this);
                 next.dockers.first().setReferencePoint({x: this.bounds.width() / 2.0, y: this.bounds.height() / 2.0});
                 }*/
            }
		});
        //}).bind(this));

		var tmp = "";
		$.map(data,function(obj) {
            if(obj.prefix === "oryx" &&
                obj.name === "dockers"){
					tmp =obj;
			}
        });
		
		var oryxDockers = tmp;

        if (oryxDockers) {
            var dataByPath = oryxDockers.value.split("#");
			//dataByPath = dataByPath.without(" ");
			dataByPath  = $.grep(dataByPath,function(n){return n!=''});  

            //dataByPath.each((function (data, index) {
			$.each(dataByPath,function(index){  //ray jquery 
				var data = this;
                var values = data.replace(/,/g, " ").split(" ");
				values = $.grep(values,function(n){return n!=''});  
				
                //for each docker two values must be defined
                if (values.length % 2 === 0) {
                    var path = self._paths[index];
                    if (path) {
                        if (index === 0) {
							while(self._dockersByPath[path.id].length > 2){ 
								self.removeDocker(self._dockersByPath[path.id][1]);
							}
                        }
                        else {
							while(self._dockersByPath[path.id].length > 1){
								self.removeDocker(self._dockersByPath[path.id][0]);
							}
                        }

                        var dockersByPath = self._dockersByPath[path.id];
                        if (index === 0) {
                            //set position of first docker
                            var x = parseFloat(values.shift());
                            var y = parseFloat(values.shift());

                            //if (dockersByPath.first().getDockedShape()) {
                            //    dockersByPath.first().setReferencePoint({
							if (dockersByPath&& dockersByPath.length>0 && dockersByPath[0].getDockedShape()) {
                                dockersByPath[0].setReferencePoint({
                                    x:x,
                                    y:y
                                });
                            }
                            else {
                                dockersByPath&& dockersByPath.length>0 && dockersByPath[0].bounds.centerMoveTo(x, y);
                            }
                        }

                        //set position of last docker
                        y = parseFloat(values.pop());
                        x = parseFloat(values.pop());

                        //if (dockersByPath.last().getDockedShape()) {
                        //    dockersByPath.last().setReferencePoint({
						if (dockersByPath&& dockersByPath.length>0 && dockersByPath[dockersByPath.length-1].getDockedShape()) {
                            dockersByPath[dockersByPath.length-1].setReferencePoint({
                                x:x,
                                y:y
                            });
                        } else {
                            dockersByPath&& dockersByPath.length>0 && dockersByPath[dockersByPath.length-1].bounds.centerMoveTo(x, y);
                        }

                        //add additional dockers
                        for (var i = 0; i < values.length; i++) {
                            x = parseFloat(values[i]);
                            y = parseFloat(values[++i]);

                            var newDocker = self.createDocker();
                            newDocker.bounds.centerMoveTo(x, y);

                            //this.dockers = this.dockers.without(newDocker);
                            //this.dockers.splice(this.dockers.indexOf(dockersByPath.last()), 0, newDocker);
                            //dockersByPath.splice(this.dockers.indexOf(dockersByPath.last()), 0, newDocker);
                        }
                    }
                }
			});
            //}).bind(this));
        } else {
            this.alignDockers();
        }

        arguments.callee.$.deserialize.apply(this, arguments);

        this._changed();
    },

    toString:function () {
        return this.getStencil().title() + " " + this.id;
    },

    /**
     * @return {ORYX.Core.Shape} Returns last docked shape or null.
     */
    getTarget:function () {
        return this.dockers.last() ? this.dockers.last().getDockedShape() : null;
    },

    /**
     * @return {ORYX.Core.Shape} Returns the first docked shape or null
     */
    getSource:function () {
        return this.dockers.first() ? this.dockers.first().getDockedShape() : null;
    },

    /**
     * Checks whether the edge is at least docked to one shape.
     *
     * @return {boolean} True if edge is docked
     */
    isDocked:function () {
        var isDocked = false;
        this.dockers.each(function (docker) {
            if (docker.isDocked()) {
                isDocked = true;
                throw 'error';
            }
        });
        return isDocked;
    },

    /**
     * Calls {@link ORYX.Core.AbstractShape#toJSON} and add a some stencil set information.
     */
    toJSON:function () {
        var json = arguments.callee.$.toJSON.apply(this, arguments);

        if (this.getTarget()) {
            json.target = {
                resourceId:this.getTarget().resourceId
            };
        }

        return json;
    }
});
//ORYX.Core.Edge = ORYX.Core.Shape.extend(ORYX.Core.Edge);


if (!ORYX.Core.Controls) {
    ORYX.Core.Controls = {};
}
ORYX.Core.Controls.Control = ORYX.Core.UIObject.extend({

    toString:function () {
        return "Control " + this.id;
    }
});


ORYX.Core.Controls.Magnet = ORYX.Core.Controls.Control.extend({

    /**
     * Constructor
     */
    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);

        //this.anchors = [];
        this.anchorLeft;
        this.anchorRight;
        this.anchorTop;
        this.anchorBottom;

        this.bounds.set(0, 0, 16, 16);

        //graft magnet's root node into owner's control group.
        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg",
            null,
            ['g', {"pointer-events":"all"},
                ['circle', {cx:"8", cy:"8", r:"4", stroke:"none", fill:"red", "fill-opacity":"0.3"}]
            ]);

        this.hide();
    },

    update:function () {
        arguments.callee.$.update.apply(this, arguments);

        //this.isChanged = true;
    },

    _update:function () {
        arguments.callee.$.update.apply(this, arguments);

        //this.isChanged = true;
    },

    refresh:function () {
        arguments.callee.$.refresh.apply(this, arguments);

        var p = this.bounds.upperLeft();
        /*if(this.parent) {
         var parentPos = this.parent.bounds.upperLeft();
         p.x += parentPos.x;
         p.y += parentPos.y;
         }*/

        this.node.setAttributeNS(null, 'transform', 'translate(' + p.x + ', ' + p.y + ')');
    },

    show:function () {
        //this.refresh();
        arguments.callee.$.show.apply(this, arguments);
    },

    toString:function () {
        return "Magnet " + this.id;
    }
});

// object
ORYX.Core.Controls.Docker = ORYX.Core.Controls.Control.extend({
    /**
     * Constructor
     */
    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);

        this.isMovable = true;				// Enables movability
        this.bounds.set(0, 0, 16, 16);		// Set the bounds
        this.referencePoint = undefined;		// Refrenzpoint
        this._dockedShapeBounds = undefined;
        this._dockedShape = undefined;
        this._oldRefPoint1 = undefined;
        this._oldRefPoint2 = undefined;

        //this.anchors = [];
        this.anchorLeft;
        this.anchorRight;
        this.anchorTop;
        this.anchorBottom;

        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg",
            null,
            ['g']);

        // The DockerNode reprasentation
        this._dockerNode = ORYX.Editor.graft("http://www.w3.org/2000/svg",
            this.node,
            ['g', {"pointer-events":"all"},
                ['circle', {cx:"8", cy:"8", r:"8", stroke:"none", fill:"none"}],
                ['circle', {cx:"8", cy:"8", r:"3", stroke:"black", fill:"red", "stroke-width":"1"}]
            ]);

        // The ReferenzNode reprasentation
        this._referencePointNode = ORYX.Editor.graft("http://www.w3.org/2000/svg",
            this.node,
            ['g', {"pointer-events":"none"},
                ['circle', {cx:this.bounds.upperLeft().x, cy:this.bounds.upperLeft().y, r:3, fill:"red", "fill-opacity":0.4}]]);

        // Hide the Docker
        this.hide();

        //Add to the EventHandler
        this.addEventHandlers(this._dockerNode);

        // Buffer the Update Callback for un-/register on Event-Handler
        this._updateCallback = this._changed.bind(this);
    },

    update:function () {
        // If there have an DockedShape
		if(arguments && arguments[0]=='test'){
			
			return false;
		}
		
		
        if (this._dockedShape) {
            if (this._dockedShapeBounds && this._dockedShape instanceof ORYX.Core.Node) {
                // Calc the delta of width and height of the lastBounds and the current Bounds
                var dswidth = this._dockedShapeBounds.width();
                var dsheight = this._dockedShapeBounds.height();
                if (!dswidth)
                    dswidth = 1;
                if (!dsheight)
                    dsheight = 1;
                var widthDelta = this._dockedShape.bounds.width() / dswidth;
                var heightDelta = this._dockedShape.bounds.height() / dsheight;

                // If there is an different
                if (widthDelta !== 1.0 || heightDelta !== 1.0) {
                    // Set the delta
                    this.referencePoint.x *= widthDelta;
                    this.referencePoint.y *= heightDelta;
                }

                // Clone these bounds
                this._dockedShapeBounds = this._dockedShape.bounds.clone();
            }

            // Get the first and the last Docker of the parent Shape
            var dockerIndex = this.parent.dockers.indexOf(this)
            var dock1 = this;
            var dock2 = this.parent.dockers.length > 1 ?
                (dockerIndex === 0 ? // If there is the first element
                    this.parent.dockers[dockerIndex + 1] : // then take the next docker
                    this.parent.dockers[dockerIndex - 1]) : // if not, then take the docker before
                undefined;

            // Calculate the first absolute Refenzpoint
            var absoluteReferenzPoint1 = dock1.getDockedShape() ?
                dock1.getAbsoluteReferencePoint() :
                dock1.bounds.center();

            // Calculate the last absolute Refenzpoint
            var absoluteReferenzPoint2 = dock2 && dock2.getDockedShape() ?
                dock2.getAbsoluteReferencePoint() :
                dock2 ?
                    dock2.bounds.center() :
                    undefined;

            // If there is no last absolute Referenzpoint
            if (!absoluteReferenzPoint2) {
                // Calculate from the middle of the DockedShape
                var center = this._dockedShape.absoluteCenterXY();
                var minDimension = this._dockedShape.bounds.width() * this._dockedShape.bounds.height();
                absoluteReferenzPoint2 = {
                    x:absoluteReferenzPoint1.x + (center.x - absoluteReferenzPoint1.x) * -minDimension,
                    y:absoluteReferenzPoint1.y + (center.y - absoluteReferenzPoint1.y) * -minDimension
                }
            }

            var newPoint = undefined;

            /*if (!this._oldRefPoint1 || !this._oldRefPoint2 ||
             absoluteReferenzPoint1.x !== this._oldRefPoint1.x ||
             absoluteReferenzPoint1.y !== this._oldRefPoint1.y ||
             absoluteReferenzPoint2.x !== this._oldRefPoint2.x ||
             absoluteReferenzPoint2.y !== this._oldRefPoint2.y) {*/

            // Get the new point for the Docker, calucalted by the intersection point of the Shape and the two points
            newPoint = this._dockedShape.getIntersectionPoint(absoluteReferenzPoint1, absoluteReferenzPoint2);

            // If there is new point, take the referencepoint as the new point
            if (!newPoint) {
                newPoint = this.getAbsoluteReferencePoint();
            }

            if (this.parent && this.parent.parent) {
                var grandParentPos = this.parent.parent.absoluteXY();
                newPoint.x -= grandParentPos.x;
                newPoint.y -= grandParentPos.y;
            }

            // Set the bounds to the new point
            this.bounds.centerMoveTo(newPoint)

            this._oldRefPoint1 = absoluteReferenzPoint1;
            this._oldRefPoint2 = absoluteReferenzPoint2;
			
			
        }
        /*else {
         newPoint = this.bounds.center();
         }*/


        //	}

        // Call the super class
		
        arguments.callee.$.update.apply(this, arguments);
    },

    /**
     * Calls the super class refresh method and updates the view of the docker.
     */
    refresh:function () {
        arguments.callee.$.refresh.apply(this, arguments);

        // Refresh the dockers node
        var p = this.bounds.upperLeft();
        this._dockerNode.setAttributeNS(null, 'transform', 'translate(' + p.x + ', ' + p.y + ')');

        // Refresh the referencepoints node
       // p = Object.clone(this.referencePoint);
		p = $.extend(true,{},this.referencePoint);  //ray jquery
        if (p && this._dockedShape) {
            var upL
            if (this.parent instanceof ORYX.Core.Edge) {
                upL = this._dockedShape.absoluteXY();
            } else {
                upL = this._dockedShape.bounds.upperLeft();
            }
            p.x += upL.x;
            p.y += upL.y;
        } else {
            p = this.bounds.center();
        }

        this._referencePointNode.setAttributeNS(null, 'transform', 'translate(' + p.x + ', ' + p.y + ')');
    },

    /**
     * Set the reference point
     * @param {Object} point
     */
    setReferencePoint:function (point) {
        // Set the referencepoint
        if (this.referencePoint !== point &&
            (!this.referencePoint ||
                !point ||
                this.referencePoint.x !== point.x ||
                this.referencePoint.y !== point.y)) {

            this.referencePoint = point;
            this._changed();
        }


        // Update directly, because the referencepoint has no influence of the bounds
        //this.refresh();
    },

    /**
     * Get the absolute referencepoint
     */
    getAbsoluteReferencePoint:function () {
        if (!this.referencePoint || !this._dockedShape) {
            return undefined;
        } else {
            var absUL = this._dockedShape.absoluteXY();
            return {
                x:this.referencePoint.x + absUL.x,
                y:this.referencePoint.y + absUL.y
            }
        }
    },

    /**
     * Set the docked Shape from the docker
	 * 节点显示颜色,和线条延长
     * @param {Object} shape
     */
    setDockedShape:function (shape) {

        // If there is an old docked Shape
		
        if (this._dockedShape) {
            this._dockedShape.bounds.unregisterCallback(this._updateCallback)

            // Delete the Shapes from the incoming and outgoing array
            // If this Docker the incoming of the Shape
            if (this === this.parent.dockers.first()) {

                this.parent.incoming = this.parent.incoming.without(this._dockedShape);
                this._dockedShape.outgoing = this._dockedShape.outgoing.without(this.parent);

                // If this Docker the outgoing of the Shape
            } else if (this === this.parent.dockers.last()) {

                this.parent.outgoing = this.parent.outgoing.without(this._dockedShape);
                this._dockedShape.incoming = this._dockedShape.incoming.without(this.parent);

            }

        }


        // Set the new Shape
        this._dockedShape = shape;
        this._dockedShapeBounds = undefined;
        var referencePoint = undefined;

        // If there is an Shape, register the updateCallback if there are changes in the shape bounds
        if (this._dockedShape) {

            // Add the Shapes to the incoming and outgoing array
            // If this Docker the incoming of the Shape
            //if (this === this.parent.dockers.first()) {
			 if (this === this.parent.dockers[0]) {    //

                this.parent.incoming.push(shape);
                shape.outgoing.push(this.parent);

                // If this Docker the outgoing of the Shape
            //} else if (this === this.parent.dockers.last()) {
			} else if (this === this.parent.dockers[this.parent.dockers.length-1]) { //ray 去prototype

                this.parent.outgoing.push(shape);
                shape.incoming.push(this.parent);

            }

            // Get the bounds and set the new referencepoint
            var bounds = this.bounds;
            var absUL = shape.absoluteXY();

            /*if(shape.parent){
             var b = shape.parent.bounds.upperLeft();
             absUL.x -= b.x;
             absUL.y -= b.y;
             }*/

            referencePoint = {
                x:bounds.center().x - absUL.x,
                y:bounds.center().y - absUL.y
            }

            this._dockedShapeBounds = this._dockedShape.bounds.clone();

            this._dockedShape.bounds.registerCallback(this._updateCallback);

            // Set the color of the docker as docked
            this.setDockerColor(ORYX.CONFIG.DOCKER_DOCKED_COLOR);
        } else {
            this.setDockerColor(ORYX.CONFIG.DOCKER_UNDOCKED_COLOR);  //移动端的末尾点变成红色
        }

        // Set the referencepoint
        this.setReferencePoint(referencePoint);
        this._changed();
        //this.update();
    },

    /**
     * Get the docked Shape
     */
    getDockedShape:function () {
        return this._dockedShape;
    },

    /**
     * Returns TRUE if the docker has a docked shape
     */
    isDocked:function () {
        return !!this._dockedShape;
    },

    /**
     * Set the Color of the Docker
     * @param {Object} color
     */
    setDockerColor:function (color) {
        this._dockerNode.lastChild.setAttributeNS(null, "fill", color);
    },

    preventHiding:function (prevent) {
        this._preventHiding = Math.max(0, (this._preventHiding || 0) + (prevent ? 1 : -1));
    },

    /**
     * Hides this UIObject and all its children.
     */
    hide:function () {
        if (this._preventHiding) {
            return false;
        }

        // Hide docker and reference point
        this.node.setAttributeNS(null, 'visibility', 'hidden');
        this._referencePointNode.setAttributeNS(null, 'visibility', 'hidden');

        //this.children.each(function (uiObj) {
		$.map(this.children,function(uiObj){
            //uiObj.hide();
			$(uiObj).hide();
        });
    },

    /**
     * Enables visibility of this UIObject and all its children.
     */
    show:function () {
        // Show docker
        this.node.setAttributeNS(null, 'visibility', 'visible');

        // Hide reference point if the connected shape is an edge
        if (this.getDockedShape() instanceof ORYX.Core.Edge) {
            this._referencePointNode.setAttributeNS(null, 'visibility', 'hidden');
        } else {
            this._referencePointNode.setAttributeNS(null, 'visibility', 'visible');
        }

        //this.children.each(function (uiObj) {
		$.map(this.children,function(uiObj){
			
            uiObj.show();
        });
    },

    toString:function () {
        return "Docker " + this.id
    }
});
if(!ORYX.Core.SVG) ORYX.Core.SVG={};
// objectsvg label
ORYX.Core.SVG.Label = Clazz.extend({

    _characterSets:[
        "%W",
        "@",
        "m",
        "wDGMOQ?#+=<>~^",
        "ABCHKNRSUVXZü?&",
        "bdghnopqux?üETY1234567890?_§${}*′`μ€",
        "aeksvyz?FLP?°23",
        "c-",
        "rtJ\"/()[]:;!|\\",
        "fjI., ",
        "'",
        "il"
    ],
    _characterSetValues:[15, 14, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3],

    /**
     * Constructor
     * @param options {Object} :
     *     textElement
     *
     */
    construct:function (options) {
        arguments.callee.$.construct.apply(this, arguments);

        if (!options.textElement) {
            throw "Label: No parameter textElement."
        } else if (!ORYX.Editor.checkClassType(options.textElement, SVGTextElement)) {
            throw "Label: Parameter textElement is not an SVGTextElement."
        }

        this.invisibleRenderPoint = -5000;

        this.node = options.textElement;


        this.node.setAttributeNS(null, 'stroke-width', '0pt');
        this.node.setAttributeNS(null, 'letter-spacing', '-0.01px');

        this.shapeId = options.shapeId;

        this.id;

        this.fitToElemId;

        this.edgePosition;

        this.x;
        this.y;
        this.oldX;
        this.oldY;

        this.isVisible = true;

        this._text;
        this._verticalAlign;
        this._horizontalAlign;
        this._rotate;
        this._rotationPoint;

        //this.anchors = [];
        this.anchorLeft;
        this.anchorRight;
        this.anchorTop;
        this.anchorBottom;

        this._isChanged = true;

        //if the text element already has an id, don't change it.
        var _id = this.node.getAttributeNS(null, 'id');
        if (_id) {
            this.id = _id;
        }

        //initialization

        //set referenced element the text is fit to
        this.fitToElemId = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'fittoelem');
        if (this.fitToElemId)
            this.fitToElemId = this.shapeId + this.fitToElemId;

        //set alignment
        var alignValues = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'align');
        if (alignValues) {
            alignValues = alignValues.replace(/,/g, " ");
            alignValues = alignValues.split(" ");
            //alignValues = alignValues.without("");
			alignValues = $.grep(alignValues,function(n){return n!=''});  //
            //alignValues.each((function (alignValue) {
			var self = this;
			$.map(alignValues,function(alignValue){  //
                switch (alignValue) {
                    case 'top':
                    case 'middle':
                    case 'bottom':
                        if (!self._verticalAlign) {
                            self._originVerticalAlign = self._verticalAlign = alignValue;
                        }
                        break;
                    case 'left':
                    case 'center':
                    case 'right':
                        if (!self._horizontalAlign) {
                            self._originHorizontalAlign = self._horizontalAlign = alignValue;
                        }
                        break;
                }
			});
            //}).bind(this));
        }

        //set edge position (only in case the label belongs to an edge)
        this.edgePosition = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'edgePosition');
        if (this.edgePosition) {
            this.originEdgePosition = this.edgePosition = this.edgePosition.toLowerCase();
        }


        //get offset top
        this.offsetTop = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'offsetTop') || ORYX.CONFIG.OFFSET_EDGE_LABEL_TOP;
        if (this.offsetTop) {
            this.offsetTop = parseInt(this.offsetTop);
        }

        //get offset top
        this.offsetBottom = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'offsetBottom') || ORYX.CONFIG.OFFSET_EDGE_LABEL_BOTTOM;
        if (this.offsetBottom) {
            this.offsetBottom = parseInt(this.offsetBottom);
        }


        //set rotation
        var rotateValue = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'rotate');
        if (rotateValue) {
            try {
                this._rotate = parseFloat(rotateValue);
            } catch (e) {
                this._rotate = 0;
            }
        } else {
            this._rotate = 0;
        }

        //anchors
        var anchorAttr = this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, "anchors");
        if (anchorAttr) {
            anchorAttr = anchorAttr.replace("/,/g", " ");
            var anchors = anchorAttr.split(" ")
			//anchors = anchors.without("");
			anchors = $.grep(anchors,function(n){return n!=''});
            for (var i = 0; i < anchors.length; i++) {
                switch (anchors[i].toLowerCase()) {
                    case "left":
                        this.originAnchorLeft = this.anchorLeft = true;
                        break;
                    case "right":
                        this.originAnchorRight = this.anchorRight = true;
                        break;
                    case "top":
                        this.originAnchorTop = this.anchorTop = true;
                        break;
                    case "bottom":
                        this.originAnchorBottom = this.anchorBottom = true;
                        break;
                }
            }
        }

        //if no alignment defined, set default alignment
        if (!this._verticalAlign) {
            this._verticalAlign = 'bottom';
        }
        if (!this._horizontalAlign) {
            this._horizontalAlign = 'left';
        }

        var xValue = this.node.getAttributeNS(null, 'x');
        if (xValue) {
            this.oldX = this.x = parseFloat(xValue);
        } else {
            //TODO error
        }

        var yValue = this.node.getAttributeNS(null, 'y');
        if (yValue) {
            this.oldY = this.y = parseFloat(yValue);
        } else {
            //TODO error
        }

        //set initial text

        this.text(this.node.textContent);
    },

    /**
     * Reset the anchor position to the original value
     * which was specified in the stencil set
     *
     */
    resetAnchorPosition:function () {
        this.anchorLeft = this.originAnchorLeft || false;
        this.anchorRight = this.originAnchorRight || false;
        this.anchorTop = this.originAnchorTop || false;
        this.anchorBottom = this.originAnchorBottom || false;
    },

    isOriginAnchorLeft:function () {
        return this.originAnchorLeft || false;
    },
    isOriginAnchorRight:function () {
        return this.originAnchorRight || false;
    },
    isOriginAnchorTop:function () {
        return this.originAnchorTop || false;
    },
    isOriginAnchorBottom:function () {
        return this.originAnchorBottom || false;
    },


    isAnchorLeft:function () {
        return this.anchorLeft || false;
    },
    isAnchorRight:function () {
        return this.anchorRight || false;
    },
    isAnchorTop:function () {
        return this.anchorTop || false;
    },
    isAnchorBottom:function () {
        return this.anchorBottom || false;
    },

    /**
     * Returns the x coordinate
     * @return {number}
     */
    getX:function () {
        try {
            var x = this.node.x.baseVal.getItem(0).value;
            switch (this.horizontalAlign()) {
                case "left":
                    return x;
                case "center":
                    return x - (this.getWidth() / 2);
                case "right":
                    return x - this.getWidth();
            }
            return this.node.getBBox().x;
        } catch (e) {
            return this.x;
        }
    },

    setX:function (x) {
        if (this.position)
            this.position.x = x;
        else
            this.setOriginX(x);
    },


    /**
     * Returns the y coordinate
     * @return {number}
     */
    getY:function () {
        try {
            return this.node.getBBox().y;
        } catch (e) {
            return this.y;
        }
    },

    setY:function (y) {
        if (this.position)
            this.position.y = y;
        else
            this.setOriginY(y);
    },

    setOriginX:function (x) {
        this.x = x;
    },

    setOriginY:function (y) {
        this.y = y;
    },


    /**
     * Returns the width of the label
     * @return {number}
     */
    getWidth:function () {
        try {
            try {
                var width, cn = this.node.childNodes;
                if (cn.length == 0 || !isFirefox()) {
                    width = this.node.getBBox().width;
                } else {
                    for (var i = 0, size = cn.length; i < size; ++i) {
                        var w = cn[i].getComputedTextLength();
                        if ("undefined" == typeof width || width < w) {
                            width = w;
                        }
                    }
                }
                return width + (width % 2 == 0 ? 0 : 1);
            } catch (ee) {
                return this.node.getBBox().width;
            }
        } catch (e) {
            return 0;
        }
    },

    getOriginUpperLeft:function () {
        var x = this.x, y = this.y;
        switch (this._horizontalAlign) {
            case 'center' :
                x -= this.getWidth() / 2;
                break;
            case 'right' :
                x -= this.getWidth();
                break;
        }
        switch (this._verticalAlign) {
            case 'middle' :
                y -= this.getHeight() / 2;
                break;
            case 'bottom' :
                y -= this.getHeight();
                break;
        }
        return {x:x, y:y};
    },

    /**
     * Returns the height of the label
     * @return {number}
     */
    getHeight:function () {
        try {
            return this.node.getBBox().height;
        } catch (e) {
            return 0;
        }
    },

    /**
     * Returns the relative center position of the label
     * to its parent shape.
     * @return {Object}
     */
    getCenter:function () {
        var up = {x:this.getX(), y:this.getY()};
        up.x += this.getWidth() / 2;
        up.y += this.getHeight() / 2;
        return up;
    },

    /**
     * Sets the position of a label relative to the parent.
     * @param {Object} position
     */
    setPosition:function (position) {
        if (!position || position.x === undefined || position.y === undefined) {
            delete this.position;
        } else {
            this.position = position;
        }

        if (this.position) {
            delete this._referencePoint;
            delete this.edgePosition;
        }

        this._isChanged = true;
        this.update();
    },

    /**
     * Return the position
     */
    getPosition:function () {
        return this.position;
    },

    setReferencePoint:function (ref) {
        if (ref) {
            this._referencePoint = ref;
        } else {
            delete this._referencePoint;
        }
        if (this._referencePoint) {
            delete this.position;
        }
    },

    getReferencePoint:function () {
        return this._referencePoint || undefined;
    },

    changed:function () {
        this._isChanged = true;
    },

    /**
     * Register a callback which will be called if the label
     * was rendered.
     * @param {Object} fn
     */
    registerOnChange:function (fn) {
        if (!this.changeCallbacks) {
            this.changeCallbacks = [];
        }
        if (fn instanceof Function && !this.changeCallbacks.include(fn)) {
            this.changeCallbacks.push(fn);
        }
    },

    /**
     * Unregister the callback for changes.
     * @param {Object} fn
     */
    unregisterOnChange:function (fn) {
        if (this.changeCallbacks && fn instanceof Function && this.changeCallbacks.include(fn)) {
            this.changeCallbacks = this.changeCallbacks.without(fn);
        }
    },

    /**
     * Returns TRUE if the labe is currently in
     * the update mechanism.
     * @return {Boolean}
     */
    isUpdating:function () {
        return !!this._isUpdating;
    },


    getOriginEdgePosition:function () {
        return this.originEdgePosition;
    },

    /**
     * Returns the edgeposition.
     *
     * @return {String} "starttop", "startmiddle", "startbottom",
     * "midtop", "midbottom", "endtop", "endbottom" or null
     */
    getEdgePosition:function () {
        return this.edgePosition || null;
    },

    /**
     * Set the edge position, must be one of the valid
     * edge positions (see getEdgePosition).
     * Removes the reference point and the absolute position as well.
     *
     * @param {Object} position
     */
    setEdgePosition:function (position) {
        if (["starttop", "startmiddle", "startbottom",
            "midtop", "midbottom", "endtop", "endbottom"].include(position)) {
            this.edgePosition = position;
            delete this.position;
            delete this._referencePoint;
        } else {
            delete this.edgePosition;
        }
    },

    /**
     * Update the SVG text element.
     */
    update:function (force) {
        var x = this.x, y = this.y;
        if (this.position) {
            x = this.position.x;
            y = this.position.y;
        }
        x = Math.floor(x);
        y = Math.floor(y);

        if (this._isChanged || x !== this.oldX || y !== this.oldY || force === true) {
            //if (this.isVisible) {
            this._isChanged = false;
            this._isUpdating = true;

            this.node.setAttributeNS(null, 'x', x);
            this.node.setAttributeNS(null, 'y', y);
            this.node.removeAttributeNS(null, "fill-opacity");

            //this.node.setAttributeNS(null, 'font-size', this._fontSize);
            //this.node.setAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX, 'align', this._horizontalAlign + " " + this._verticalAlign);

            this.oldX = x;
            this.oldY = y;

            //set rotation
            if (!this.position && !this.getReferencePoint()) {
                if (this._rotate !== undefined) {
                    if (this._rotationPoint)
                        this.node.setAttributeNS(null, 'transform', 'rotate(' + this._rotate + ' ' + Math.floor(this._rotationPoint.x) + ' ' + Math.floor(this._rotationPoint.y) + ')');
                    else
                        this.node.setAttributeNS(null, 'transform', 'rotate(' + this._rotate + ' ' + Math.floor(x) + ' ' + Math.floor(y) + ')');
                }
            } else {
                this.node.removeAttributeNS(null, 'transform');
            }

            var textLines = this._text.split("\n");
			
            //while (textLines.last() == "")
			while (textLines[textLines.length] == "")
                textLines.pop();


            if (this.node.ownerDocument) {
                // Only reset the tspans if the text
                // has changed or has to be wrapped
                if (this.fitToElemId || this._textHasChanged) {

                    this.node.textContent = ""; // Remove content
                    //textLines.each((function (textLine, index) {
					var self = this;
					$.map(textLines,function (textLine, index) {
                        var tspan = self.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan');
                        tspan.textContent = textLine.trim();
                        if (self.fitToElemId) {
                            tspan.setAttributeNS(null, 'x', self.invisibleRenderPoint);
                            tspan.setAttributeNS(null, 'y', self.invisibleRenderPoint);
                        }

                        /*
                         * Chrome's getBBox() method fails, if a text node contains an empty tspan element.
                         * So, we add a whitespace to such a tspan element.
                         */
                        if (tspan.textContent === "") {
                            tspan.textContent = " ";
                        }

                        //append tspan to text node
                        self.node.appendChild(tspan);
                    });
					//}).bind(this));
                    delete this._textHasChanged;
                    delete this.indices;
                }

                //Work around for Mozilla bug 293581
                if (this.isVisible && this.fitToElemId) {
                    this.node.setAttributeNS(null, 'visibility', 'hidden');
                }

                if (this.fitToElemId) {
                    window.setTimeout(this._checkFittingToReferencedElem.bind(this), 0);
                } else {
                    window.setTimeout(this._positionText.bind(this), 0);
                    //this._positionText();
                }
            }
            //} else {
            //	this.node.textContent = "";
            //this.node.setAttributeNS(null, "fill-opacity", "0.2");
            //}
        }
    },

    _checkFittingToReferencedElem:function () {
        try {
            var tspans = $.makeArray(this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan'));

			//var tspans = $(this.node).find('tspan');
			
            //only do this in firefox 3. all other browsers do not support word wrapping!!!!!
            //if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && new Number(RegExp.$1)>=3) {
            var newtspans = [];

            var refNode = this.node.ownerDocument.getElementById(this.fitToElemId);

            if (refNode) {

                var refbb = refNode.getBBox();

                var fontSize = this.getFontSize();

                for (var j = 0; j < tspans.length; j++) {
                    var tspan = tspans[j];

                    var textLength = this._getRenderedTextLength(tspan, undefined, undefined, fontSize);

                    var refBoxLength = (this._rotate != 0
                        && this._rotate % 180 != 0
                        && this._rotate % 90 == 0 ?
                        refbb.height : refbb.width);

                    if (textLength > refBoxLength) {

                        var startIndex = 0;
                        var lastSeperatorIndex = 0;

                        var numOfChars = this.getTrimmedTextLength(tspan.textContent);
                        for (var i = 0; i < numOfChars; i++) {
                            var sslength = this._getRenderedTextLength(tspan, startIndex, i - startIndex, fontSize);

                            if (sslength > refBoxLength - 2) {
                                var newtspan = this.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan');
                                if (lastSeperatorIndex <= startIndex) {
                                    lastSeperatorIndex = (i == 0) ? i : i - 1;
                                    newtspan.textContent = tspan.textContent.slice(startIndex, lastSeperatorIndex).trim();
                                    //lastSeperatorIndex = i;
                                }
                                else {
                                    newtspan.textContent = tspan.textContent.slice(startIndex, ++lastSeperatorIndex).trim();
                                }

                                newtspan.setAttributeNS(null, 'x', this.invisibleRenderPoint);
                                newtspan.setAttributeNS(null, 'y', this.invisibleRenderPoint);

                                //insert tspan to text node
                                //this.node.insertBefore(newtspan, tspan);
                                newtspans.push(newtspan);

                                startIndex = lastSeperatorIndex;

                            }
                            else {

                                var curChar = tspan.textContent.charAt(i);
                                if (curChar == ' ' ||
                                    curChar == '-' ||
                                    curChar == "." ||
                                    curChar == "," ||
                                    curChar == ";" ||
                                    curChar == ":") {
                                    lastSeperatorIndex = i;
                                }
                            }
                        }

                        tspan.textContent = tspan.textContent.slice(startIndex).trim();
                    }

                    newtspans.push(tspan);
                }

                while (this.node.hasChildNodes())
                    this.node.removeChild(this.node.childNodes[0]);

                while (newtspans.length > 0) {
                    this.node.appendChild(newtspans.shift());
                }
            }
            //}
        } catch (e) {
			console.log("Error " + e);
            //ORYX.Log.fatal("Error " + e);
        }

        window.setTimeout(this._positionText.bind(this), 0);
    },

    /**
     * This is a work around method for Mozilla bug 293581.
     * Before the method getComputedTextLength works, the text has to be rendered.
     */
    _positionText:function () {
        try {
            //var tspans = this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan');
            var tspans = this.node.childNodes;

            var fontSize = this.getFontSize(this.node);

            var invalidTSpans = [];

            var x = this.x, y = this.y;
            if (this.position) {
                x = this.position.x;
                y = this.position.y;
            }
            x = Math.floor(x);
            y = Math.floor(y);

            var i = 0, indic = []; // Cache indices if the _positionText is called again, before update is called
            //var is = (this.indices || $R(0, tspans.length - 1).toArray());
			var tmp=[];
			for(var r=0;r<=tspans.length - 1;r++){
				tmp[tmp.length] = r;
			}
			var is = this.indices || tmp;
			
            var length = is.length;
			
            //is.each((function (index) {
			var self = this;
			$.map(is,function (index) {
                if ("undefined" == typeof index) {
                    return;
                }

                var tspan = tspans[i++];

                if (tspan.textContent.trim() === "") {
                    invalidTSpans.push(tspan);
                } else {
                    //set vertical position
                    var dy = 0;
                    switch (self._verticalAlign) {
                        case 'bottom':
                            dy = -(length - index - 1) * (fontSize);
                            break;
                        case 'middle':
                            dy = -(length / 2.0 - index - 1) * (fontSize);
                            dy -= ORYX.CONFIG.LABEL_LINE_DISTANCE / 2;
                            break;
                        case 'top':
                            dy = index * (fontSize);
                            dy += fontSize;
                            break;
                    }

                    tspan.setAttributeNS(null, 'dy', Math.floor(dy));

                    tspan.setAttributeNS(null, 'x', x);
                    tspan.setAttributeNS(null, 'y', y);
                    indic.push(index);
                }
			});	
            //}).bind(this));

            indic.length = tspans.length;
            this.indices = this.indices || indic;

            //invalidTSpans.each(function (tspan) {
			$.map(invalidTSpans,function (tspan) {
                self.node.removeChild(tspan)
            });
			//}.bind(this));

            //set horizontal alignment
            switch (this._horizontalAlign) {
                case 'left':
                    this.node.setAttributeNS(null, 'text-anchor', 'start');
                    break;
                case 'center':
                    this.node.setAttributeNS(null, 'text-anchor', 'middle');
                    break;
                case 'right':
                    this.node.setAttributeNS(null, 'text-anchor', 'end');
                    break;
            }

        } catch (e) {
          
            this._isChanged = true;
        }


        if (this.isVisible) {
            this.node.removeAttributeNS(null, 'visibility');
        }


        // Finished
        delete this._isUpdating;

        // Raise change event
        /*(this.changeCallbacks || []).each(function (fn) {
            fn.apply(fn);
        })*/
		
		$.map((this.changeCallbacks || []),function(fn){
			fn.apply(fn);
		})

    },

    /**
     * Returns the text length of the text content of an SVG tspan element.
     * For all browsers but Firefox 3 the values are estimated.
     * @param {TSpanSVGElement} tspan
     * @param {int} startIndex Optional, for sub strings
     * @param {int} endIndex Optional, for sub strings
     */
    _getRenderedTextLength:function (tspan, startIndex, endIndex, fontSize) {
        //if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 3) {
        if (startIndex === undefined) {

            return tspan.getComputedTextLength();
        } else {
            return tspan.getSubStringLength(startIndex, endIndex);
        }
        /*} else {
         if(startIndex === undefined) {
         return this._estimateTextWidth(tspan.textContent, fontSize);
         } else {
         return this._estimateTextWidth(tspan.textContent.substr(startIndex, endIndex).trim(), fontSize);
         }
         }*/
    },

    /**
     * Estimates the text width for a string.
     * Used for word wrapping in all browser but FF3.
     * @param {Object} text
     */
    _estimateTextWidth:function (text, fontSize) {
        var sum = 0.0;
        for (var i = 0; i < text.length; i++) {
            sum += this._estimateCharacterWidth(text.charAt(i));
        }

        return sum * (fontSize / 14.0);
    },

    /**
     * Estimates the width of a single character for font size 14.
     * Used for word wrapping in all browser but FF3.
     * @param {Object} character
     */
    _estimateCharacterWidth:function (character) {
        for (var i = 0; i < this._characterSets.length; i++) {
            if (this._characterSets[i].indexOf(character) >= 0) {
                return this._characterSetValues[i];
            }
        }
        return 9;
    },

    getReferencedElementWidth:function () {
        var refNode = this.node.ownerDocument.getElementById(this.fitToElemId);

        if (refNode) {
            var refbb = refNode.getBBox();

            if (refbb) {
                return (this._rotate != 0
                    && this._rotate % 180 != 0
                    && this._rotate % 90 == 0 ?
                    refbb.height : refbb.width);
            }
        }

        return undefined;
    },

    /**
     * If no parameter is provided, this method returns the current text.
     * @param text {String} Optional. Replaces the old text with this one.
     */
    text:function () {
        switch (arguments.length) {
            case 0:
                return this._text
                break;

            case 1:
                var oldText = this._text;
                if (arguments[0]) {
                    this._text = arguments[0].toString();
                } else {
                    this._text = "";
                }
                if (oldText !== this._text) {
                    this._isChanged = true;
                    this._textHasChanged = true;
                }
                break;

            default:
                //TODO error
                break;
        }
    },

    getOriginVerticalAlign:function () {
        return this._originVerticalAlign;
    },

    verticalAlign:function () {
        switch (arguments.length) {
            case 0:
                return this._verticalAlign;
            case 1:
                //if (['top', 'middle', 'bottom'].member(arguments[0])) {
				if ($.inArray(arguments[0],['top', 'middle', 'bottom'])>-1){
                    var oldValue = this._verticalAlign;
                    this._verticalAlign = arguments[0];
                    if (this._verticalAlign !== oldValue) {
                        this._isChanged = true;
                    }
                }
                break;

            default:
                //TODO error
                break;
        }
    },

    getOriginHorizontalAlign:function () {
        return this._originHorizontalAlign;
    },

    horizontalAlign:function () {
        switch (arguments.length) {
            case 0:
                return this._horizontalAlign;
            case 1:
                //if (['left', 'center', 'right'].member(arguments[0])) {
				if ($.inArray(arguments[0],['left', 'center', 'right'])>-1){
                    var oldValue = this._horizontalAlign;
                    this._horizontalAlign = arguments[0];
                    if (this._horizontalAlign !== oldValue) {
                        this._isChanged = true;
                    }
					
                }
               break;

            default:
                //TODO error
                break;
        }
    },

    rotate:function () {
        switch (arguments.length) {
            case 0:
                return this._rotate;
            case 1:
                if (this._rotate != arguments[0]) {
                    this._rotate = arguments[0];
                    this._rotationPoint = undefined;
                    this._isChanged = true;
                }
            case 2:
                if (this._rotate != arguments[0] ||
                    !this._rotationPoint ||
                    this._rotationPoint.x != arguments[1].x ||
                    this._rotationPoint.y != arguments[1].y) {
                    this._rotate = arguments[0];
                    this._rotationPoint = arguments[1];
                    this._isChanged = true;
                }

        }
    },

    hide:function () {
        if (this.isVisible) {
            this.isVisible = false;
            this._isChanged = true;
        }
    },

    show:function () {
        if (!this.isVisible) {
            this.isVisible = true;
            this._isChanged = true;
        }
    },

    /**
     * iterates parent nodes till it finds a SVG font-size
     * attribute.
     * @param {SVGElement} node
     */
    getInheritedFontSize:function (node) {
        if (!node || !node.getAttributeNS)
            return;

        var attr = node.getAttributeNS(null, "font-size");
        if (attr) {
            return parseFloat(attr);
        } else if (!ORYX.Editor.checkClassType(node, SVGSVGElement)) {
            return this.getInheritedFontSize(node.parentNode);
        }
    },

    getFontSize:function (node) {
        var tspans = this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG, 'tspan');

        //trying to get an inherited font-size attribute
        //NO CSS CONSIDERED!
        var fontSize = this.getInheritedFontSize(this.node);

        if (!fontSize) {
            //because this only works in firefox 3, all other browser use the default line height
            if (tspans[0] && /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 3) {
                fontSize = tspans[0].getExtentOfChar(0).height;
            }
            else {
                fontSize = ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT;
            }

            //handling of unsupported method in webkit
            if (fontSize <= 0) {
                fontSize = ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT;
            }
        }

        if (fontSize)
            this.node.setAttribute("oryx:fontSize", fontSize);

        return fontSize;
    },

    /**
     * Get trimmed text length for use with
     * getExtentOfChar and getSubStringLength.
     * @param {String} text
     */
    getTrimmedTextLength:function (text) {
        //text = text.strip().gsub('  ', ' ');
		text = text.strip().replace(/\s+/g, ' ');
        var oldLength;
        do {
            oldLength = text.length;
            //text = text.gsub('  ', ' ');
			text = text.replace(/\s+/g, ' ');
        } while (oldLength > text.length);

        return text.length;
    },

    /**
     * Returns the offset from
     * edge to the label which is
     * positioned under the edge
     * @return {int}
     */
    getOffsetBottom:function () {
        return this.offsetBottom;
    },


    /**
     * Returns the offset from
     * edge to the label which is
     * positioned over the edge
     * @return {int}
     */
    getOffsetTop:function () {
        return this.offsetTop;
    },

    /**
     *
     * @param {Object} obj
     */
    deserialize:function (obj, shape) {
        if (obj && "undefined" != typeof obj.x && "undefined" != typeof obj.y) {
            this.setPosition({x:obj.x, y:obj.y});

            if ("undefined" != typeof obj.distance) {
                var from = shape.dockers[obj.from];
                var to = shape.dockers[obj.to];
                if (from && to) {
                    this.setReferencePoint({
                        dirty:true,
                        distance:obj.distance,
                        intersection:{x:obj.x, y:obj.y},
                        orientation:obj.orientation,
                        segment:{
                            from:from,
                            fromIndex:obj.from,
                            fromPosition:from.bounds.center(),
                            to:to,
                            toIndex:obj.to,
                            toPosition:to.bounds.center()
                        }
                    })
                }
            }

            if (obj.left) this.anchorLeft = true;
            if (obj.right) this.anchorRight = true;
            if (obj.top) this.anchorTop = true;
            if (obj.bottom) this.anchorBottom = true;
            if (obj.valign) this.verticalAlign(obj.valign);
            if (obj.align) this.horizontalAlign(obj.align);

        } else if (obj && "undefined" != typeof obj.edge) {
            this.setEdgePosition(obj.edge);
        }
    },

    /**
     *
     * @return {Object}
     */
    serialize:function () {

        // On edge position
        if (this.getEdgePosition()) {
            if (this.getOriginEdgePosition() !== this.getEdgePosition()) {
                return {edge:this.getEdgePosition()};
            } else {
                return null;
            }
        }

        // On self defined position
        if (this.position) {
            var pos = {x:this.position.x, y:this.position.y};
            if (this.isAnchorLeft() && this.isAnchorLeft() !== this.isOriginAnchorLeft()) {
                pos.left = true;
            }
            if (this.isAnchorRight() && this.isAnchorRight() !== this.isOriginAnchorRight()) {
                pos.right = true;
            }
            if (this.isAnchorTop() && this.isAnchorTop() !== this.isOriginAnchorTop()) {
                pos.top = true;
            }
            if (this.isAnchorBottom() && this.isAnchorBottom() !== this.isOriginAnchorBottom()) {
                pos.bottom = true;
            }

            if (this.getOriginVerticalAlign() !== this.verticalAlign()) {
                pos.valign = this.verticalAlign();
            }
            if (this.getOriginHorizontalAlign() !== this.horizontalAlign()) {
                pos.align = this.horizontalAlign();
            }

            return pos;
        }

        // On reference point which is interesting for edges
        if (this.getReferencePoint()) {
            var ref = this.getReferencePoint();
            return {
                distance:ref.distance,
                x:ref.intersection.x,
                y:ref.intersection.y,
                from:ref.segment.fromIndex,
                to:ref.segment.toIndex,
                orientation:ref.orientation,
                valign:this.verticalAlign(),
                align:this.horizontalAlign()
            }
        }
        return null;
    },

    toString:function () {
        return "Label " + this.id
    }
});


// object
ORYX.Core.SVG.SVGShape = Clazz.extend({

    /**
     * Constructor
     * @param svgElem {SVGElement} An SVGElement that is a basic shape or a path.
     */
    construct:function (svgElem) {
        arguments.callee.$.construct.apply(this, arguments);

        this.type;
        this.element = svgElem;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.oldX = undefined;
        this.oldY = undefined;
        this.oldWidth = undefined;
        this.oldHeight = undefined;
        this.radiusX = undefined;
        this.radiusY = undefined;
        this.isHorizontallyResizable = false;
        this.isVerticallyResizable = false;
        //this.anchors = [];
        this.anchorLeft = false;
        this.anchorRight = false;
        this.anchorTop = false;
        this.anchorBottom = false;

        //attributes of path elements of edge objects
        this.allowDockers = true;
        this.resizeMarkerMid = false;

        this.editPathParser;
        this.editPathHandler;

        this.init(); //initialisation of all the properties declared above.
    },

    /**
     * Initializes the values that are defined in the constructor.
     */
    init:function () {
        /**initialize position and size*/
        if (ORYX.Editor.checkClassType(this.element, SVGRectElement) || ORYX.Editor.checkClassType(this.element, SVGImageElement)) {
            this.type = "Rect";

            var xAttr = this.element.getAttributeNS(null, "x");
            if (xAttr) {
                this.oldX = parseFloat(xAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var yAttr = this.element.getAttributeNS(null, "y");
            if (yAttr) {
                this.oldY = parseFloat(yAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var widthAttr = this.element.getAttributeNS(null, "width");
            if (widthAttr) {
                this.oldWidth = parseFloat(widthAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var heightAttr = this.element.getAttributeNS(null, "height");
            if (heightAttr) {
                this.oldHeight = parseFloat(heightAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }

        } else if (ORYX.Editor.checkClassType(this.element, SVGCircleElement)) {
            this.type = "Circle";

            var cx = undefined;
            var cy = undefined;
            //var r = undefined;

            var cxAttr = this.element.getAttributeNS(null, "cx");
            if (cxAttr) {
                cx = parseFloat(cxAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var cyAttr = this.element.getAttributeNS(null, "cy");
            if (cyAttr) {
                cy = parseFloat(cyAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var rAttr = this.element.getAttributeNS(null, "r");
            if (rAttr) {
                //r = parseFloat(rAttr);
                this.radiusX = parseFloat(rAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            this.oldX = cx - this.radiusX;
            this.oldY = cy - this.radiusX;
            this.oldWidth = 2 * this.radiusX;
            this.oldHeight = 2 * this.radiusX;

        } else if (ORYX.Editor.checkClassType(this.element, SVGEllipseElement)) {
            this.type = "Ellipse";

            var cx = undefined;
            var cy = undefined;
            //var rx = undefined;
            //var ry = undefined;
            var cxAttr = this.element.getAttributeNS(null, "cx");
            if (cxAttr) {
                cx = parseFloat(cxAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var cyAttr = this.element.getAttributeNS(null, "cy");
            if (cyAttr) {
                cy = parseFloat(cyAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var rxAttr = this.element.getAttributeNS(null, "rx");
            if (rxAttr) {
                this.radiusX = parseFloat(rxAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var ryAttr = this.element.getAttributeNS(null, "ry");
            if (ryAttr) {
                this.radiusY = parseFloat(ryAttr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            this.oldX = cx - this.radiusX;
            this.oldY = cy - this.radiusY;
            this.oldWidth = 2 * this.radiusX;
            this.oldHeight = 2 * this.radiusY;

        } else if (ORYX.Editor.checkClassType(this.element, SVGLineElement)) {
            this.type = "Line";

            var x1 = undefined;
            var y1 = undefined;
            var x2 = undefined;
            var y2 = undefined;
            var x1Attr = this.element.getAttributeNS(null, "x1");
            if (x1Attr) {
                x1 = parseFloat(x1Attr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var y1Attr = this.element.getAttributeNS(null, "y1");
            if (y1Attr) {
                y1 = parseFloat(y1Attr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var x2Attr = this.element.getAttributeNS(null, "x2");
            if (x2Attr) {
                x2 = parseFloat(x2Attr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            var y2Attr = this.element.getAttributeNS(null, "y2");
            if (y2Attr) {
                y2 = parseFloat(y2Attr);
            } else {
                throw "Missing attribute in element " + this.element;
            }
            this.oldX = Math.min(x1, x2);
            this.oldY = Math.min(y1, y2);
            this.oldWidth = Math.abs(x1 - x2);
            this.oldHeight = Math.abs(y1 - y2);

        } else if (ORYX.Editor.checkClassType(this.element, SVGPolylineElement) || ORYX.Editor.checkClassType(this.element, SVGPolygonElement)) {
            this.type = "Polyline";
            var pointsArray = [];
            if (this.element.points && this.element.points.numberOfItems) {
                for (var i = 0, size = this.element.points.numberOfItems; i < size; i++) {
                    pointsArray.push(this.element.points.getItem(i).x)
                    pointsArray.push(this.element.points.getItem(i).y)
                }
            } else {
                var points = this.element.getAttributeNS(null, "points");
                if (points) {
                    points = points.replace(/,/g, " ");
                    pointsArray = points.split(" ");
                    pointsArray = pointsArray.without("");
                } else {
                    throw "Missing attribute in element " + this.element;
                }
            }


            if (pointsArray && pointsArray.length && pointsArray.length > 1) {
                var minX = parseFloat(pointsArray[0]);
                var minY = parseFloat(pointsArray[1]);
                var maxX = parseFloat(pointsArray[0]);
                var maxY = parseFloat(pointsArray[1]);

                for (var i = 0; i < pointsArray.length; i++) {
                    minX = Math.min(minX, parseFloat(pointsArray[i]));
                    maxX = Math.max(maxX, parseFloat(pointsArray[i]));
                    i++;
                    minY = Math.min(minY, parseFloat(pointsArray[i]));
                    maxY = Math.max(maxY, parseFloat(pointsArray[i]));
                }

                this.oldX = minX;
                this.oldY = minY;
                this.oldWidth = maxX - minX;
                this.oldHeight = maxY - minY;6
            } else {
                throw "Missing attribute in element " + this.element;
            }

        } else if (ORYX.Editor.checkClassType(this.element, SVGPathElement)) {
            this.type = "Path";

            this.editPathParser = new PathParser();
            this.editPathHandler = new ORYX.Core.SVG.EditPathHandler();
            this.editPathParser.setHandler(this.editPathHandler);

            var parser = new PathParser();
            var handler = new ORYX.Core.SVG.MinMaxPathHandler();
            parser.setHandler(handler);
            parser.parsePath(this.element);

            this.oldX = handler.minX;
            this.oldY = handler.minY;
            this.oldWidth = handler.maxX - handler.minX;
            this.oldHeight = handler.maxY - handler.minY;

            delete parser;
            delete handler;
        } else {
            throw "Element is not a shape.";
        }

        /** initialize attributes of oryx namespace */
        //resize
        var resizeAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "resize");
        if (resizeAttr) {
            resizeAttr = resizeAttr.toLowerCase();
            if (resizeAttr.match(/horizontal/)) {
                this.isHorizontallyResizable = true;
            } else {
                this.isHorizontallyResizable = false;
            }
            if (resizeAttr.match(/vertical/)) {
                this.isVerticallyResizable = true;
            } else {
                this.isVerticallyResizable = false;
            }
        } else {
            this.isHorizontallyResizable = false;
            this.isVerticallyResizable = false;
        }

        //anchors
        var anchorAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "anchors");
        if (anchorAttr) {
            anchorAttr = anchorAttr.replace("/,/g", " ");
            var anchors = anchorAttr.split(" ");
			//anchors = anchors.without("");
			anchors = $.grep(anchors,function(n){return n!=''});
			
            for (var i = 0; i < anchors.length; i++) {
                switch (anchors[i].toLowerCase()) {
                    case "left":
                        this.anchorLeft = true;
                        break;
                    case "right":
                        this.anchorRight = true;
                        break;
                    case "top":
                        this.anchorTop = true;
                        break;
                    case "bottom":
                        this.anchorBottom = true;
                        break;
                }
            }
        }

        //allowDockers and resizeMarkerMid
        if (ORYX.Editor.checkClassType(this.element, SVGPathElement)) {
            var allowDockersAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "allowDockers");
            if (allowDockersAttr) {
                if (allowDockersAttr.toLowerCase() === "no") {
                    this.allowDockers = false;
                } else {
                    this.allowDockers = true;
                }
            }

            var resizeMarkerMidAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "resizeMarker-mid");
            if (resizeMarkerMidAttr) {
                if (resizeMarkerMidAttr.toLowerCase() === "yes") {
                    this.resizeMarkerMid = true;
                } else {
                    this.resizeMarkerMid = false;
                }
            }
        }

        this.x = this.oldX;
        this.y = this.oldY;
        this.width = this.oldWidth;
        this.height = this.oldHeight;
    },

    /**
     * Writes the changed values into the SVG element.
     */
    update:function () {

        if (this.x !== this.oldX || this.y !== this.oldY || this.width !== this.oldWidth || this.height !== this.oldHeight) {
            switch (this.type) {
                case "Rect":
                    if (this.x !== this.oldX) this.element.setAttributeNS(null, "x", this.x);
                    if (this.y !== this.oldY) this.element.setAttributeNS(null, "y", this.y);
                    if (this.width !== this.oldWidth) this.element.setAttributeNS(null, "width", this.width);
                    if (this.height !== this.oldHeight) this.element.setAttributeNS(null, "height", this.height);
                    break;
                case "Circle":
                    //calculate the radius
                    //var r;
//					if(this.width/this.oldWidth <= this.height/this.oldHeight) {
//						this.radiusX = ((this.width > this.height) ? this.width : this.height)/2.0;
//					} else {
                    this.radiusX = ((this.width < this.height) ? this.width : this.height) / 2.0;
                    //}

                    this.element.setAttributeNS(null, "cx", this.x + this.width / 2.0);
                    this.element.setAttributeNS(null, "cy", this.y + this.height / 2.0);
                    this.element.setAttributeNS(null, "r", this.radiusX);
                    break;
                case "Ellipse":
                    this.radiusX = this.width / 2;
                    this.radiusY = this.height / 2;

                    this.element.setAttributeNS(null, "cx", this.x + this.radiusX);
                    this.element.setAttributeNS(null, "cy", this.y + this.radiusY);
                    this.element.setAttributeNS(null, "rx", this.radiusX);
                    this.element.setAttributeNS(null, "ry", this.radiusY);
                    break;
                case "Line":
                    if (this.x !== this.oldX)
                        this.element.setAttributeNS(null, "x1", this.x);

                    if (this.y !== this.oldY)
                        this.element.setAttributeNS(null, "y1", this.y);

                    if (this.x !== this.oldX || this.width !== this.oldWidth)
                        this.element.setAttributeNS(null, "x2", this.x + this.width);

                    if (this.y !== this.oldY || this.height !== this.oldHeight)
                        this.element.setAttributeNS(null, "y2", this.y + this.height);
                    break;
                case "Polyline":
                    var points = this.element.getAttributeNS(null, "points");
                    if (points) {
                        points = points.replace(/,/g, " ").split(" ").without("");

                        if (points && points.length && points.length > 1) {

                            //TODO what if oldWidth == 0?
                            var widthDelta = (this.oldWidth === 0) ? 0 : this.width / this.oldWidth;
                            var heightDelta = (this.oldHeight === 0) ? 0 : this.height / this.oldHeight;

                            var updatedPoints = "";
                            for (var i = 0; i < points.length; i++) {
                                var x = (parseFloat(points[i]) - this.oldX) * widthDelta + this.x;
                                i++;
                                var y = (parseFloat(points[i]) - this.oldY) * heightDelta + this.y;
                                updatedPoints += x + " " + y + " ";
                            }
                            this.element.setAttributeNS(null, "points", updatedPoints);
                        } else {
                            //TODO error
                        }
                    } else {
                        //TODO error
                    }
                    break;
                case "Path":
                    //calculate scaling delta
                    //TODO what if oldWidth == 0?
                    var widthDelta = (this.oldWidth === 0) ? 0 : this.width / this.oldWidth;
                    var heightDelta = (this.oldHeight === 0) ? 0 : this.height / this.oldHeight;

                    //use path parser to edit each point of the path
                    this.editPathHandler.init(this.x, this.y, this.oldX, this.oldY, widthDelta, heightDelta);
                    this.editPathParser.parsePath(this.element);

                    //change d attribute of path
                    this.element.setAttributeNS(null, "d", this.editPathHandler.d);
                    break;
            }

            this.oldX = this.x;
            this.oldY = this.y;
            this.oldWidth = this.width;
            this.oldHeight = this.height;
        }

        // Remove cached variables
        delete this.visible;
        delete this.handler;
    },

    isPointIncluded:function (pointX, pointY) {

        // Check if there are the right arguments and if the node is visible
        if (!pointX || !pointY || !this.isVisible()) {
            return false;
        }

        switch (this.type) {
            case "Rect":
                return (pointX >= this.x && pointX <= this.x + this.width &&
                    pointY >= this.y && pointY <= this.y + this.height);
                break;
            case "Circle":
                //calculate the radius
//				var r;
//				if(this.width/this.oldWidth <= this.height/this.oldHeight) {
//					r = ((this.width > this.height) ? this.width : this.height)/2.0;
//				} else {
//				 	r = ((this.width < this.height) ? this.width : this.height)/2.0;
//				}
                return ORYX.Core.Math.isPointInEllipse(pointX, pointY, this.x + this.width / 2.0, this.y + this.height / 2.0, this.radiusX, this.radiusX);
                break;
            case "Ellipse":
                return ORYX.Core.Math.isPointInEllipse(pointX, pointY, this.x + this.radiusX, this.y + this.radiusY, this.radiusX, this.radiusY);
                break;
            case "Line":
                return ORYX.Core.Math.isPointInLine(pointX, pointY, this.x, this.y, this.x + this.width, this.y + this.height);
                break;
            case "Polyline":
                var points = this.element.getAttributeNS(null, "points");

                if (points) {
                    points = points.replace(/,/g, " ").split(" ").without("");

                    points = points.collect(function (n) {
                        return parseFloat(n);
                    });

                    return ORYX.Core.Math.isPointInPolygone(pointX, pointY, points);
                } else {
                    return false;
                }
                break;
            case "Path":

                // Cache Path handler
                if (!this.handler) {
                    var parser = new PathParser();
                    this.handler = new ORYX.Core.SVG.PointsPathHandler();
                    parser.setHandler(this.handler);
                    parser.parsePath(this.element);
                }

                return ORYX.Core.Math.isPointInPolygone(pointX, pointY, this.handler.points);

                break;
            default:
                return false;
        }
    },

    /**
     * Returns true if the element is visible
     * @param {SVGElement} elem
     * @return boolean
     */
    isVisible:function (elem) {

        if (this.visible !== undefined) {
            return this.visible;
        }

        if (!elem) {
            elem = this.element;
        }

        var hasOwnerSVG = false;
        try {
            hasOwnerSVG = !!elem.ownerSVGElement;
        } catch (e) {
        }

        // Is SVG context
        if (hasOwnerSVG) {
            // IF G-Element
            if (ORYX.Editor.checkClassType(elem, SVGGElement)) {
                if (elem.className && elem.className.baseVal == "me") {
                    this.visible = true;
                    return this.visible;
                }
            }

            // Check if fill or stroke is set
            var fill = elem.getAttributeNS(null, "fill");
            var stroke = elem.getAttributeNS(null, "stroke");
            if (fill && fill == "none" && stroke && stroke == "none") {
                this.visible = false;
            } else {
                // Check if displayed
                var attr = elem.getAttributeNS(null, "display");
                if (!attr)
                    this.visible = this.isVisible(elem.parentNode);
                else if (attr == "none")
                    this.visible = false;
                else
                    this.visible = true;
            }
        } else {
            this.visible = true;
        }

        return this.visible;
    },

    toString:function () {
        return (this.element) ? "SVGShape " + this.element.id : "SVGShape " + this.element;
    }
});


// object
ORYX.Core.SVG.EditPathHandler = Clazz.extend({

    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);

        this.x = 0;
        this.y = 0;
        this.oldX = 0;
        this.oldY = 0;
        this.deltaWidth = 1;
        this.deltaHeight = 1;

        this.d = "";
    },

    /**
     * init
     *
     * @param {float} x Target point's x-coordinate
     * @param {float} y Target point's y-coordinate
     * @param {float} oldX Reference point's x-coordinate
     * @param {float} oldY Reference point's y-coordinate
     * @param {float} deltaWidth Horizontal scaling factor
     * @param {float} deltaHeight Vertical scaling factor
     */
    init:function (x, y, oldX, oldY, deltaWidth, deltaHeight) {
        this.x = x;
        this.y = y;
        this.oldX = oldX;
        this.oldY = oldY;
        this.deltaWidth = deltaWidth;
        this.deltaHeight = deltaHeight;

        this.d = "";
    },

    /**
     * editPointsAbs
     *
     * @param {Array} points Array of absolutePoints
     */
    editPointsAbs:function (points) {
        if (points instanceof Array) {
            var newPoints = [];
            var x, y;
            for (var i = 0; i < points.length; i++) {
                x = (parseFloat(points[i]) - this.oldX) * this.deltaWidth + this.x;
                i++;
                y = (parseFloat(points[i]) - this.oldY) * this.deltaHeight + this.y;
                newPoints.push(x);
                newPoints.push(y);
            }

            return newPoints;
        } else {
            //TODO error
        }
    },

    /**
     * editPointsRel
     *
     * @param {Array} points Array of absolutePoints
     */
    editPointsRel:function (points) {
        if (points instanceof Array) {
            var newPoints = [];
            var x, y;
            for (var i = 0; i < points.length; i++) {
                x = parseFloat(points[i]) * this.deltaWidth;
                i++;
                y = parseFloat(points[i]) * this.deltaHeight;
                newPoints.push(x);
                newPoints.push(y);
            }

            return newPoints;
        } else {
            //TODO error
        }
    },

    /**
     * arcAbs - A
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcAbs:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        var pointsAbs = this.editPointsAbs([x, y]);
        var pointsRel = this.editPointsRel([rx, ry]);

        this.d = this.d.concat(" A" + pointsRel[0] + " " + pointsRel[1] +
            " " + xAxisRotation + " " + largeArcFlag +
            " " + sweepFlag + " " + pointsAbs[0] + " " +
            pointsAbs[1] + " ");
    },

    /**
     * arcRel - a
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcRel:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        var pointsRel = this.editPointsRel([rx, ry, x, y]);

        this.d = this.d.concat(" a" + pointsRel[0] + " " + pointsRel[1] +
            " " + xAxisRotation + " " + largeArcFlag +
            " " + sweepFlag + " " + pointsRel[2] + " " +
            pointsRel[3] + " ");
    },

    /**
     * curvetoCubicAbs - C
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicAbs:function (x1, y1, x2, y2, x, y) {
        var pointsAbs = this.editPointsAbs([x1, y1, x2, y2, x, y]);

        this.d = this.d.concat(" C" + pointsAbs[0] + " " + pointsAbs[1] +
            " " + pointsAbs[2] + " " + pointsAbs[3] +
            " " + pointsAbs[4] + " " + pointsAbs[5] + " ");
    },

    /**
     * curvetoCubicRel - c
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicRel:function (x1, y1, x2, y2, x, y) {
        var pointsRel = this.editPointsRel([x1, y1, x2, y2, x, y]);

        this.d = this.d.concat(" c" + pointsRel[0] + " " + pointsRel[1] +
            " " + pointsRel[2] + " " + pointsRel[3] +
            " " + pointsRel[4] + " " + pointsRel[5] + " ");
    },

    /**
     * linetoHorizontalAbs - H
     *
     * @param {Number} x
     */
    linetoHorizontalAbs:function (x) {
        var pointsAbs = this.editPointsAbs([x, 0]);

        this.d = this.d.concat(" H" + pointsAbs[0] + " ");
    },

    /**
     * linetoHorizontalRel - h
     *
     * @param {Number} x
     */
    linetoHorizontalRel:function (x) {
        var pointsRel = this.editPointsRel([x, 0]);

        this.d = this.d.concat(" h" + pointsRel[0] + " ");
    },

    /**
     * linetoAbs - L
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoAbs:function (x, y) {
        var pointsAbs = this.editPointsAbs([x, y]);

        this.d = this.d.concat(" L" + pointsAbs[0] + " " + pointsAbs[1] + " ");
    },

    /**
     * linetoRel - l
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoRel:function (x, y) {
        var pointsRel = this.editPointsRel([x, y]);

        this.d = this.d.concat(" l" + pointsRel[0] + " " + pointsRel[1] + " ");
    },

    /**
     * movetoAbs - M
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoAbs:function (x, y) {
        var pointsAbs = this.editPointsAbs([x, y]);

        this.d = this.d.concat(" M" + pointsAbs[0] + " " + pointsAbs[1] + " ");
    },

    /**
     * movetoRel - m
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoRel:function (x, y) {
        var pointsRel;
        if (this.d === "") {
            pointsRel = this.editPointsAbs([x, y]);
        } else {
            pointsRel = this.editPointsRel([x, y]);
        }

        this.d = this.d.concat(" m" + pointsRel[0] + " " + pointsRel[1] + " ");
    },

    /**
     * curvetoQuadraticAbs - Q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticAbs:function (x1, y1, x, y) {
        var pointsAbs = this.editPointsAbs([x1, y1, x, y]);

        this.d = this.d.concat(" Q" + pointsAbs[0] + " " + pointsAbs[1] + " " +
            pointsAbs[2] + " " + pointsAbs[3] + " ");
    },

    /**
     * curvetoQuadraticRel - q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticRel:function (x1, y1, x, y) {
        var pointsRel = this.editPointsRel([x1, y1, x, y]);

        this.d = this.d.concat(" q" + pointsRel[0] + " " + pointsRel[1] + " " +
            pointsRel[2] + " " + pointsRel[3] + " ");
    },

    /**
     * curvetoCubicSmoothAbs - S
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothAbs:function (x2, y2, x, y) {
        var pointsAbs = this.editPointsAbs([x2, y2, x, y]);

        this.d = this.d.concat(" S" + pointsAbs[0] + " " + pointsAbs[1] + " " +
            pointsAbs[2] + " " + pointsAbs[3] + " ");
    },

    /**
     * curvetoCubicSmoothRel - s
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothRel:function (x2, y2, x, y) {
        var pointsRel = this.editPointsRel([x2, y2, x, y]);

        this.d = this.d.concat(" s" + pointsRel[0] + " " + pointsRel[1] + " " +
            pointsRel[2] + " " + pointsRel[3] + " ");
    },

    /**
     * curvetoQuadraticSmoothAbs - T
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothAbs:function (x, y) {
        var pointsAbs = this.editPointsAbs([x, y]);

        this.d = this.d.concat(" T" + pointsAbs[0] + " " + pointsAbs[1] + " ");
    },

    /**
     * curvetoQuadraticSmoothRel - t
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothRel:function (x, y) {
        var pointsRel = this.editPointsRel([x, y]);

        this.d = this.d.concat(" t" + pointsRel[0] + " " + pointsRel[1] + " ");
    },

    /**
     * linetoVerticalAbs - V
     *
     * @param {Number} y
     */
    linetoVerticalAbs:function (y) {
        var pointsAbs = this.editPointsAbs([0, y]);

        this.d = this.d.concat(" V" + pointsAbs[1] + " ");
    },

    /**
     * linetoVerticalRel - v
     *
     * @param {Number} y
     */
    linetoVerticalRel:function (y) {
        var pointsRel = this.editPointsRel([0, y]);

        this.d = this.d.concat(" v" + pointsRel[1] + " ");
    },

    /**
     * closePath - z or Z
     */
    closePath:function () {
        this.d = this.d.concat(" z");
    }

});


// object
ORYX.Core.SVG.MinMaxPathHandler = Clazz.extend({

    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);

        this.minX = undefined;
        this.minY = undefined;
        this.maxX = undefined;
        this.maxY = undefined;

        this._lastAbsX = undefined;
        this._lastAbsY = undefined;
    },

    /**
     * Store minimal and maximal coordinates of passed points to attributes minX, maxX, minY, maxY
     *
     * @param {Array} points Array of absolutePoints
     */
    calculateMinMax:function (points) {
        if (points instanceof Array) {
            var x, y;
            for (var i = 0; i < points.length; i++) {
                x = parseFloat(points[i]);
                i++;
                y = parseFloat(points[i]);

                this.minX = (this.minX !== undefined) ? Math.min(this.minX, x) : x;
                this.maxX = (this.maxX !== undefined) ? Math.max(this.maxX, x) : x;
                this.minY = (this.minY !== undefined) ? Math.min(this.minY, y) : y;
                this.maxY = (this.maxY !== undefined) ? Math.max(this.maxY, y) : y;

                this._lastAbsX = x;
                this._lastAbsY = y;
            }
        } else {
            //TODO error
        }
    },

    /**
     * arcAbs - A
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcAbs:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this.calculateMinMax([x, y]);
    },

    /**
     * arcRel - a
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcRel:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this.calculateMinMax([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoCubicAbs - C
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicAbs:function (x1, y1, x2, y2, x, y) {
        this.calculateMinMax([x1, y1, x2, y2, x, y]);
    },

    /**
     * curvetoCubicRel - c
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicRel:function (x1, y1, x2, y2, x, y) {
        this.calculateMinMax([this._lastAbsX + x1, this._lastAbsY + y1,
            this._lastAbsX + x2, this._lastAbsY + y2,
            this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * linetoHorizontalAbs - H
     *
     * @param {Number} x
     */
    linetoHorizontalAbs:function (x) {
        this.calculateMinMax([x, this._lastAbsY]);
    },

    /**
     * linetoHorizontalRel - h
     *
     * @param {Number} x
     */
    linetoHorizontalRel:function (x) {
        this.calculateMinMax([this._lastAbsX + x, this._lastAbsY]);
    },

    /**
     * linetoAbs - L
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoAbs:function (x, y) {
        this.calculateMinMax([x, y]);
    },

    /**
     * linetoRel - l
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoRel:function (x, y) {
        this.calculateMinMax([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * movetoAbs - M
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoAbs:function (x, y) {
        this.calculateMinMax([x, y]);
    },

    /**
     * movetoRel - m
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoRel:function (x, y) {
        if (this._lastAbsX && this._lastAbsY) {
            this.calculateMinMax([this._lastAbsX + x, this._lastAbsY + y]);
        } else {
            this.calculateMinMax([x, y]);
        }
    },

    /**
     * curvetoQuadraticAbs - Q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticAbs:function (x1, y1, x, y) {
        this.calculateMinMax([x1, y1, x, y]);
    },

    /**
     * curvetoQuadraticRel - q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticRel:function (x1, y1, x, y) {
        this.calculateMinMax([this._lastAbsX + x1, this._lastAbsY + y1, this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoCubicSmoothAbs - S
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothAbs:function (x2, y2, x, y) {
        this.calculateMinMax([x2, y2, x, y]);
    },

    /**
     * curvetoCubicSmoothRel - s
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothRel:function (x2, y2, x, y) {
        this.calculateMinMax([this._lastAbsX + x2, this._lastAbsY + y2, this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoQuadraticSmoothAbs - T
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothAbs:function (x, y) {
        this.calculateMinMax([x, y]);
    },

    /**
     * curvetoQuadraticSmoothRel - t
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothRel:function (x, y) {
        this.calculateMinMax([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * linetoVerticalAbs - V
     *
     * @param {Number} y
     */
    linetoVerticalAbs:function (y) {
        this.calculateMinMax([this._lastAbsX, y]);
    },

    /**
     * linetoVerticalRel - v
     *
     * @param {Number} y
     */
    linetoVerticalRel:function (y) {
        this.calculateMinMax([this._lastAbsX, this._lastAbsY + y]);
    },

    /**
     * closePath - z or Z
     */
    closePath:function () {
        return;// do nothing
    }

});

// object 箭头
ORYX.Core.SVG.SVGMarker = Clazz.extend({

    /**
     * Constructor
     * @param markerElement {SVGMarkerElement}
     */
    construct:function (markerElement) {
        arguments.callee.$.construct.apply(this, arguments);

        this.id = undefined;
        this.element = markerElement;
        this.refX = undefined;
        this.refY = undefined;
        this.markerWidth = undefined;
        this.markerHeight = undefined;
        this.oldRefX = undefined;
        this.oldRefY = undefined;
        this.oldMarkerWidth = undefined;
        this.oldMarkerHeight = undefined;
        this.optional = false;
        this.enabled = true;
        this.minimumLength = undefined;
        this.resize = false;

        this.svgShapes = [];

        this._init(); //initialisation of all the properties declared above.
    },

    /**
     * Initializes the values that are defined in the constructor.
     */
    _init:function () {
        //check if this.element is a SVGMarkerElement
        if (!( this.element == "[object SVGMarkerElement]")) {
            throw "SVGMarker: Argument is not an instance of SVGMarkerElement.";
        }

        this.id = this.element.getAttributeNS(null, "id");

        //init svg marker attributes
        var refXValue = this.element.getAttributeNS(null, "refX");
        if (refXValue) {
            this.refX = parseFloat(refXValue);
        } else {
            this.refX = 0;
        }
        var refYValue = this.element.getAttributeNS(null, "refY");
        if (refYValue) {
            this.refY = parseFloat(refYValue);
        } else {
            this.refY = 0;
        }
        var markerWidthValue = this.element.getAttributeNS(null, "markerWidth");
        if (markerWidthValue) {
            this.markerWidth = parseFloat(markerWidthValue);
        } else {
            this.markerWidth = 3;
        }
        var markerHeightValue = this.element.getAttributeNS(null, "markerHeight");
        if (markerHeightValue) {
            this.markerHeight = parseFloat(markerHeightValue);
        } else {
            this.markerHeight = 3;
        }

        this.oldRefX = this.refX;
        this.oldRefY = this.refY;
        this.oldMarkerWidth = this.markerWidth;
        this.oldMarkerHeight = this.markerHeight;
		

        //init oryx attributes
        var optionalAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "optional");
        if (optionalAttr) {
            optionalAttr = optionalAttr.strip();
            this.optional = (optionalAttr.toLowerCase() === "yes");
        } else {
            this.optional = false;
        }

        var enabledAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "enabled");
        if (enabledAttr) {
            enabledAttr = enabledAttr.strip();
            this.enabled = !(enabledAttr.toLowerCase() === "no");
        } else {
            this.enabled = true;
        }

        var minLengthAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "minimumLength");
        if (minLengthAttr) {
            this.minimumLength = parseFloat(minLengthAttr);
        }

        var resizeAttr = this.element.getAttributeNS(NAMESPACE_ORYX, "resize");
        if (resizeAttr) {
            resizeAttr = resizeAttr.strip();
            this.resize = (resizeAttr.toLowerCase() === "yes");
        } else {
            this.resize = false;
        }

        //init SVGShape objects
        //this.svgShapes = this._getSVGShapes(this.element);
    },

    /**
     *
     */
    _getSVGShapes:function (svgElement) {
        if (svgElement.hasChildNodes) {
            var svgShapes = [];
            var me = this;
            $A(svgElement.childNodes).each(function (svgChild) {
                try {
                    var svgShape = new ORYX.Core.SVG.SVGShape(svgChild);
                    svgShapes.push(svgShape);
                } catch (e) {
                    svgShapes = svgShapes.concat(me._getSVGShapes(svgChild));
                }
            });
            return svgShapes;
        }
    },

    /**
     * Writes the changed values into the SVG marker.
     */
    update:function () {
        //update old values to prepare the next update
        this.oldRefX = this.refX;
        this.oldRefY = this.refY;
        this.oldMarkerWidth = this.markerWidth;
        this.oldMarkerHeight = this.markerHeight;
    },

    toString:function () {
        return (this.element) ? "SVGMarker " + this.element.id : "SVGMarker " + this.element;
    }
});


// object
var ERDF = {

    LITERAL:0x01,
    RESOURCE:0x02,
    DELIMITERS:['.', '-'],
    HASH:'#',
    HYPHEN:"-",

    schemas:[],
    callback:undefined,
    log:undefined,

    init:function (callback) {
//		alert(123);
        // init logging.
        //ERDF.log = Log4js.getLogger("oryx");
        //ERDF.log.setLevel(Log4js.Level.ALL);
        //ERDF.log.addAppender(new ConsoleAppender(ERDF.log, false));

        //if(ERDF.log.isTraceEnabled())
        //	ERDF.log.trace("ERDF Parser is initialized.");

        // register callbacks and default schemas.
        ERDF.callback = callback;
        ERDF.registerSchema('schema', XMLNS.SCHEMA);
        ERDF.registerSchema('rdfs', XMLNS.RDFS);
    },

    run:function () {

        //if(ERDF.log.isTraceEnabled())
        //	ERDF.log.trace("ERDF Parser is running.");

        // do the work.
        return ERDF._checkProfile() && ERDF.parse();
    },

    parse:function () {

        //(ERDF.log.isDebugEnabled())
        //	ERDF.log.debug("Begin parsing document metadata.");

        // time measuring
        ERDF.__startTime = new Date();

        var bodies = document.getElementsByTagNameNS(XMLNS.XHTML, 'body');
        var subject = {type:ERDF.RESOURCE, value:''};

        var result = ERDF._parseDocumentMetadata() &&
            ERDF._parseFromTag(bodies[0], subject);

        // time measuring
        ERDF.__stopTime = new Date();

        var duration = (ERDF.__stopTime - ERDF.__startTime) / 1000.;
        //alert('ERDF parsing took ' + duration + ' s.');

        return result;
    },

    _parseDocumentMetadata:function () {

        // get links from head element.
        var heads = document.getElementsByTagNameNS(XMLNS.XHTML, 'head');
        var links = heads[0].getElementsByTagNameNS(XMLNS.XHTML, 'link');
        var metas = heads[0].getElementsByTagNameNS(XMLNS.XHTML, 'meta');

        // process links first, since they could contain schema definitions.
        $A(links).each(function (link) {
            var properties = link.getAttribute('rel');
            var reversedProperties = link.getAttribute('rev');
            var value = link.getAttribute('href');

            ERDF._parseTriplesFrom(
                ERDF.RESOURCE, '',
                properties,
                ERDF.RESOURCE, value);

            ERDF._parseTriplesFrom(
                ERDF.RESOURCE, value,
                reversedProperties,
                ERDF.RESOURCE, '');
        });

        // continue with metas.
        $A(metas).each(function (meta) {
            var property = meta.getAttribute('name');
            var value = meta.getAttribute('content');

            ERDF._parseTriplesFrom(
                ERDF.RESOURCE, '',
                property,
                ERDF.LITERAL, value);
        });

        return true;
    },

    _parseFromTag:function (node, subject, depth) {

        // avoid parsing non-xhtml content.
        if (node.namespaceURI != XMLNS.XHTML) {
            return;
        }

        // housekeeping.
        if (!depth) depth = 0;
        var id = node.getAttribute('id');

        // some logging.
        //if(ERDF.log.isTraceEnabled())
        //	ERDF.log.trace(">".times(depth) + " Parsing " + node.nodeName + " ("+node.nodeType+") for data on " +
        //		((subject.type == ERDF.RESOURCE) ? ('&lt;' + subject.value + '&gt;') : '') +
        //		((subject.type == ERDF.LITERAL) ? '"' + subject.value + '"' : ''));

        /* triple finding! */

        // in a-tags...
        if (node.nodeName.endsWith(':a') || node.nodeName == 'a') {
            var properties = node.getAttribute('rel');
            var reversedProperties = node.getAttribute('rev');
            var value = node.getAttribute('href');
            var title = node.getAttribute('title');

            var content = node.textContent;

            // rel triples
            ERDF._parseTriplesFrom(
                subject.type, subject.value,
                properties,
                ERDF.RESOURCE, value,
                function (triple) {
                    var label = title ? title : content;

                    // label triples
                    ERDF._parseTriplesFrom(
                        triple.object.type, triple.object.value,
                        'rdfs.label',
                        ERDF.LITERAL, label);
                });

            // rev triples
            ERDF._parseTriplesFrom(
                subject.type, subject.value,
                reversedProperties,
                ERDF.RESOURCE, '');

            // type triples
            ERDF._parseTypeTriplesFrom(
                subject.type, subject.value,
                properties);

            // in img-tags...
        } else if (node.nodeName.endsWith(':img') || node.nodeName == 'img') {
            var properties = node.getAttribute('class');
            var value = node.getAttribute('src');
            var alt = node.getAttribute('alt');

            ERDF._parseTriplesFrom(
                subject.type, subject.value,
                properties,
                ERDF.RESOURCE, value,
                function (triple) {
                    var label = alt;

                    // label triples
                    ERDF._parseTriplesFrom(
                        triple.object.type, triple.object.value,
                        'rdfs.label',
                        ERDF.LITERAL, label);
                });

        }

        // in every tag
        var properties = node.getAttribute('class');
        var title = node.getAttribute('title');

        var content = node.textContent;
        var label = title ? title : content;

        // regular triples
        ERDF._parseTriplesFrom(
            subject.type, subject.value,
            properties,
            ERDF.LITERAL, label);

        if (id) subject = {type:ERDF.RESOURCE, value:ERDF.HASH + id};

        // type triples
        ERDF._parseTypeTriplesFrom(
            subject.type, subject.value,
            properties);

        // parse all children that are element nodes.
        var children = node.childNodes;
        if (children) $A(children).each(function (_node) {
            if (_node.nodeType == _node.ELEMENT_NODE)
                ERDF._parseFromTag(_node, subject, depth + 1);
        });
    },

    _parseTriplesFrom:function (subjectType, subject, properties, objectType, object, callback) {

        if (!properties) return;
        properties.toLowerCase().split(' ').each(function (property) {

            //if(ERDF.log.isTraceEnabled())
            //	ERDF.log.trace("Going for property " + property);

            var schema = ERDF.schemas.find(function (schema) {
                return false || ERDF.DELIMITERS.find(function (delimiter) {
                    return property.startsWith(schema.prefix + delimiter);
                });
            });

            if (schema && object) {
                property = property.substring(
                    schema.prefix.length + 1, property.length);
                var triple = ERDF.registerTriple(
                    new ERDF.Resource(subject),
                    {prefix:schema.prefix, name:property},
                    (objectType == ERDF.RESOURCE) ?
                        new ERDF.Resource(object) :
                        new ERDF.Literal(object));

                if (callback) callback(triple);
            }
        });
    },

    _parseTypeTriplesFrom:function (subjectType, subject, properties, callback) {

        if (!properties) return;
        properties.toLowerCase().split(' ').each(function (property) {

            //if(ERDF.log.isTraceEnabled())
            //	ERDF.log.trace("Going for property " + property);

            var schema = ERDF.schemas.find(function (schema) {
                return false || ERDF.DELIMITERS.find(function (delimiter) {
                    return property.startsWith(ERDF.HYPHEN + schema.prefix + delimiter);
                });
            });

            if (schema && subject) {
                property = property.substring(schema.prefix.length + 2, property.length);
                var triple = ERDF.registerTriple(
                    (subjectType == ERDF.RESOURCE) ?
                        new ERDF.Resource(subject) :
                        new ERDF.Literal(subject),
                    {prefix:'rdf', name:'type'},
                    new ERDF.Resource(schema.namespace + property));
                if (callback) callback(triple);
            }
        });
    },

    /**
     * Checks for ERDF profile declaration in head of document.
     */
    _checkProfile:function () {

        // get profiles from head element.
        var heads = document.getElementsByTagNameNS(XMLNS.XHTML, 'head');
        var profiles = heads[0].getAttribute("profile");
        var found = false;

        // if erdf profile is contained.
        if (profiles && profiles.split(" ").member(XMLNS.ERDF)) {

            // pass check.
            //if(ERDF.log.isTraceEnabled())
            //	ERDF.log.trace("Found ERDF profile " + XMLNS.ERDF);
            return true;

        } else {

            // otherwise fail check.
            //if(ERDF.log.isFatalEnabled())
            //	ERDF.log.fatal("No ERDF profile found.");
            return false;
        }
    },

    __stripHashes:function (s) {
        return (s && s.substring(0, 1) == '#') ? s.substring(1, s.length) : s;
    },

    registerSchema:function (prefix, namespace) {

        // TODO check whether already registered, if so, complain.
        ERDF.schemas.push({
            prefix:prefix,
            namespace:namespace
        });

        //if(ERDF.log.isDebugEnabled())
        //	ERDF.log.debug("Prefix '"+prefix+"' for '"+namespace+"' registered.");
    },

    registerTriple:function (subject, predicate, object) {

        // if prefix is schema, this is a schema definition.
        if (predicate.prefix.toLowerCase() == 'schema')
            this.registerSchema(predicate.name, object.value);

        var triple = new ERDF.Triple(subject, predicate, object);
        ERDF.callback(triple);

        //if(ERDF.log.isInfoEnabled())
        //	ERDF.log.info(triple)

        // return the registered triple.
        return triple;
    },

    __enhanceObject:function () {

        /* Resource state querying methods */
        this.isResource = function () {
            return this.type == ERDF.RESOURCE
        };
        this.isLocal = function () {
            return this.isResource() && this.value.startsWith('#')
        };
        this.isCurrentDocument = function () {
            return this.isResource() && (this.value == '')
        };

        /* Resource getter methods.*/
        this.getId = function () {
            return this.isLocal() ? ERDF.__stripHashes(this.value) : false;
        };

        /* Liiteral state querying methods  */
        this.isLiteral = function () {
            return this.type == ERDF.LIITERAL
        };
    },

    serialize:function (literal) {

        if (!literal) {
            return "";
        } else if (literal.constructor == String) {
            return literal;
        } else if (literal.constructor == Boolean) {
            return literal ? 'true' : 'false';
        } else {
            return literal.toString();
        }
    }
};


ERDF.Triple = function (subject, predicate, object) {

    this.subject = subject;
    this.predicate = predicate;
    this.object = object;

    this.toString = function () {

        return "[ERDF.Triple] " +
            this.subject.toString() + ' ' +
            this.predicate.prefix + ':' + this.predicate.name + ' ' +
            this.object.toString();
    };
};

ERDF.Resource = function (uri) {

    this.type = ERDF.RESOURCE;
    this.value = uri;
    ERDF.__enhanceObject.apply(this);

    this.toString = function () {
        return '&lt;' + this.value + '&gt;';
    }

};

ERDF.Literal = function (literal) {

    this.type = ERDF.LITERAL;
    this.value = ERDF.serialize(literal);
    ERDF.__enhanceObject.apply(this);

    this.toString = function () {
        return '"' + this.value + '"';
    }
};


// object
ORYX.Core.SVG.PointsPathHandler = Clazz.extend({

    construct:function () {
        arguments.callee.$.construct.apply(this, arguments);

        this.points = [];

        this._lastAbsX = undefined;
        this._lastAbsY = undefined;
    },

    /**
     * addPoints
     *
     * @param {Array} points Array of absolutePoints
     */
    addPoints:function (points) {
        if (points instanceof Array) {
            var x, y;
            for (var i = 0; i < points.length; i++) {
                x = parseFloat(points[i]);
                i++;
                y = parseFloat(points[i]);

                this.points.push(x);
                this.points.push(y);
                //this.points.push({x:x, y:y});

                this._lastAbsX = x;
                this._lastAbsY = y;
            }
        } else {
            //TODO error
        }
    },

    /**
     * arcAbs - A
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcAbs:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this.addPoints([x, y]);
    },

    /**
     * arcRel - a
     *
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} xAxisRotation
     * @param {Boolean} largeArcFlag
     * @param {Boolean} sweepFlag
     * @param {Number} x
     * @param {Number} y
     */
    arcRel:function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoCubicAbs - C
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicAbs:function (x1, y1, x2, y2, x, y) {
        this.addPoints([x, y]);
    },

    /**
     * curvetoCubicRel - c
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicRel:function (x1, y1, x2, y2, x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * linetoHorizontalAbs - H
     *
     * @param {Number} x
     */
    linetoHorizontalAbs:function (x) {
        this.addPoints([x, this._lastAbsY]);
    },

    /**
     * linetoHorizontalRel - h
     *
     * @param {Number} x
     */
    linetoHorizontalRel:function (x) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY]);
    },

    /**
     * linetoAbs - L
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoAbs:function (x, y) {
        this.addPoints([x, y]);
    },

    /**
     * linetoRel - l
     *
     * @param {Number} x
     * @param {Number} y
     */
    linetoRel:function (x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * movetoAbs - M
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoAbs:function (x, y) {
        this.addPoints([x, y]);
    },

    /**
     * movetoRel - m
     *
     * @param {Number} x
     * @param {Number} y
     */
    movetoRel:function (x, y) {
        if (this._lastAbsX && this._lastAbsY) {
            this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
        } else {
            this.addPoints([x, y]);
        }
    },

    /**
     * curvetoQuadraticAbs - Q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticAbs:function (x1, y1, x, y) {
        this.addPoints([x, y]);
    },

    /**
     * curvetoQuadraticRel - q
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticRel:function (x1, y1, x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoCubicSmoothAbs - S
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothAbs:function (x2, y2, x, y) {
        this.addPoints([x, y]);
    },

    /**
     * curvetoCubicSmoothRel - s
     *
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x
     * @param {Number} y
     */
    curvetoCubicSmoothRel:function (x2, y2, x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * curvetoQuadraticSmoothAbs - T
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothAbs:function (x, y) {
        this.addPoints([x, y]);
    },

    /**
     * curvetoQuadraticSmoothRel - t
     *
     * @param {Number} x
     * @param {Number} y
     */
    curvetoQuadraticSmoothRel:function (x, y) {
        this.addPoints([this._lastAbsX + x, this._lastAbsY + y]);
    },

    /**
     * linetoVerticalAbs - V
     *
     * @param {Number} y
     */
    linetoVerticalAbs:function (y) {
        this.addPoints([this._lastAbsX, y]);
    },

    /**
     * linetoVerticalRel - v
     *
     * @param {Number} y
     */
    linetoVerticalRel:function (y) {
        this.addPoints([this._lastAbsX, this._lastAbsY + y]);
    },

    /**
     * closePath - z or Z
     */
    closePath:function () {
        return;// do nothing
    }

});

if(!ORYX.Core.Math)ORYX.Core.Math = {};
// object
ORYX.Core.Math.midPoint = function (point1, point2) {
    return     {
        x:(point1.x + point2.x) / 2.0,
        y:(point1.y + point2.y) / 2.0
    }
}

/**
 * Returns a TRUE if the point is over a line (defined by
 * point1 and point 2). In Addition a threshold can be set,
 * which defines the weight of those line.
 *
 * @param {int} pointX - Point X
 * @param {int} pointY - Point Y
 * @param {int} lPoint1X - Line first Point X
 * @param {int} lPoint1Y - Line first Point Y
 * @param {int} lPoint2X - Line second Point X
 * @param {int} lPoint2Y - Line second Point y
 * @param {int} offset {optional} - maximal distance to line
 * @class ORYX.Core.Math.prototype
 */
 // object
ORYX.Core.Math.isPointInLine = function (pointX, pointY, lPoint1X, lPoint1Y, lPoint2X, lPoint2Y, offset) {

    offset = offset ? Math.abs(offset) : 1;

    // Check if the edge is vertical
    if (Math.abs(lPoint1X - lPoint2X) <= offset && Math.abs(pointX - lPoint1X) <= offset && pointY - Math.max(lPoint1Y, lPoint2Y) <= offset && Math.min(lPoint1Y, lPoint2Y) - pointY <= offset) {
        return true
    }

    // Check if the edge is horizontal
    if (Math.abs(lPoint1Y - lPoint2Y) <= offset && Math.abs(pointY - lPoint1Y) <= offset && pointX - Math.max(lPoint1X, lPoint2X) <= offset && Math.min(lPoint1X, lPoint2X) - pointX <= offset) {
        return true
    }

    if (pointX > Math.max(lPoint1X, lPoint2X) || pointX < Math.min(lPoint1X, lPoint2X)) {
        return false
    }

    if (pointY > Math.max(lPoint1Y, lPoint2Y) || pointY < Math.min(lPoint1Y, lPoint2Y)) {
        return false
    }

    var s = (lPoint1Y - lPoint2Y) / (lPoint1X - lPoint2X);

    return     Math.abs(pointY - ((s * pointX) + lPoint1Y - s * lPoint1X)) < offset
}


// object

ORYX.Core.Math.getAngle = function (p1, p2) {
    if (p1.x == p2.x && p1.y == p2.y)
        return 0;

    var angle = Math.asin(Math.sqrt(Math.pow(p1.y - p2.y, 2))
        / (Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p1.y - p2.y, 2))))
        * 180 / Math.PI;

    if (p2.x >= p1.x && p2.y <= p1.y)
        return angle;
    else if (p2.x < p1.x && p2.y <= p1.y)
        return 180 - angle;
    else if (p2.x < p1.x && p2.y > p1.y)
        return 180 + angle;
    else
        return 360 - angle;
};
// object
ORYX.Core.Math.isPointInEllipse = function (pointX, pointY, cx, cy, rx, ry) {

    if (cx === undefined || cy === undefined || rx === undefined || ry === undefined) {
        throw "ORYX.Core.Math.isPointInEllipse needs a ellipse with these properties: x, y, radiusX, radiusY"
    }

    var tx = (pointX - cx) / rx;
    var ty = (pointY - cy) / ry;

    return tx * tx + ty * ty < 1.0;
}

// object
ORYX.Core.Math.isPointInPolygone = function (pointX, pointY, polygone) {

    if (arguments.length < 3) {
        throw "ORYX.Core.Math.isPointInPolygone needs two arguments"
    }

    var lastIndex = polygone.length - 1;

    if (polygone[0] !== polygone[lastIndex - 1] || polygone[1] !== polygone[lastIndex]) {
        polygone.push(polygone[0]);
        polygone.push(polygone[1]);
    }

    var crossings = 0;

    var x1, y1, x2, y2, d;

    for (var i = 0; i < polygone.length - 3;) {
        x1 = polygone[i];
        y1 = polygone[++i];
        x2 = polygone[++i];
        y2 = polygone[i + 1];
        d = (pointY - y1) * (x2 - x1) - (pointX - x1) * (y2 - y1);

        if ((y1 >= pointY) != (y2 >= pointY)) {
            crossings += y2 - y1 >= 0 ? d >= 0 : d <= 0;
        }
        if (!d && Math.min(x1, x2) <= pointX && pointX <= Math.max(x1, x2)
            && Math.min(y1, y2) <= pointY && pointY <= Math.max(y1, y2)) {
            return true;
        }
    }
    return (crossings % 2) ? true : false;
}

// object
ORYX.Core.Math.distancePointLinie = function (lineP1, lineP2, point, toSegmentOnly) {

    var intersectionPoint =
        ORYX.Core.Math.getPointOfIntersectionPointLine(lineP1,
            lineP2,
            point,
            toSegmentOnly);

    if (!intersectionPoint) {
        return null;
    }

    return ORYX.Core.Math.getDistancePointToPoint(point, intersectionPoint);
};

// object
ORYX.Core.Math.getDistancePointToPoint = function (point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
};

// object
ORYX.Core.Math.getDistanceBetweenTwoPoints = function (between1, between2, point) {
    return     ORYX.Core.Math.getDistancePointToPoint(point, between1) /
        ORYX.Core.Math.getDistancePointToPoint(between1, between2);
};


// object
ORYX.Core.Math.pointIsLeftOfLine = function (lineP1, lineP2, point) {

    var vec1 = ORYX.Core.Math.getVector(lineP1, lineP2);
    var vec2 = ORYX.Core.Math.getVector(lineP1, point);
    // if the cross produkt is more than 0
    return ((vec1.x * vec2.y) - (vec2.x * vec1.y)) > 0
};

// object
ORYX.Core.Math.getPointBetweenTwoPoints = function (point1, point2, relative) {
    relative = Math.max(Math.min(relative || 0, 1), 0);

    if (relative === 0) {
        return point1;
    } else if (relative === 1) {
        return point2;
    }

    return {
        x:point1.x + ((point2.x - point1.x) * relative),
        y:point1.y + ((point2.y - point1.y) * relative)
    }
};

// object
ORYX.Core.Math.getVector = function (point1, point2) {
    return {
        x:point2.x - point1.x,
        y:point2.y - point1.y
    }
}

// object
ORYX.Core.Math.getIdentityVector = function (vector) {

    if (arguments.length == 2) {
        vector = ORYX.Core.Math.getVector(arguments[0], arguments[1]);
    }

    var length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
    return {
        x:vector.x / (length || 1),
        y:vector.y / (length || 1)
    }
}

// object
ORYX.Core.Math.getOrthogonalIdentityVector = function (point1, point2) {
    var vec = arguments.length == 1 ? point1 : ORYX.Core.Math.getIdentityVector(point1, point2);
    return {
        x:vec.y,
        y:-vec.x
    }
}

// object
ORYX.Core.Math.getPointOfIntersectionPointLine = function (lineP1, lineP2, point, onSegmentOnly) {

    /*
     * [P3 - P1 - u(P2 - P1)] dot (P2 - P1) = 0
     * u =((x3-x1)(x2-x1)+(y3-y1)(y2-y1))/(p2-p1)2
     */
    var denominator = Math.pow(lineP2.x - lineP1.x, 2)
        + Math.pow(lineP2.y - lineP1.y, 2);
    if (denominator == 0) {
        return undefined;
    }

    var u = ((point.x - lineP1.x) * (lineP2.x - lineP1.x)
        + (point.y - lineP1.y) * (lineP2.y - lineP1.y))
        / denominator;

    if (onSegmentOnly) {
        if (!(0 <= u && u <= 1)) {
            return undefined;
        }
    }

    pointOfIntersection = new Object();
    pointOfIntersection.x = lineP1.x + u * (lineP2.x - lineP1.x);
    pointOfIntersection.y = lineP1.y + u * (lineP2.y - lineP1.y);

    return pointOfIntersection;
};

// object
ORYX.Core.Math.getTranslatedPoint = function (point, matrix) {
    var x = matrix.a * point.x + matrix.c * point.y + matrix.e * 1;
    var y = matrix.b * point.x + matrix.d * point.y + matrix.f * 1;
    return {x:x, y:y}
}

// object
ORYX.Core.Math.getInverseMatrix = function (matrix) {

    var det = ORYX.Core.Math.getDeterminant(matrix), m = matrix;
    // +-     -+
    // | a c e |
    // | b d f |
    // | 0 0 1 |
    // +-     -+
    return {
        a:det * ((m.d * 1) - (m.f * 0)),
        b:det * ((m.f * 0) - (m.b * 1)),
        c:det * ((m.e * 0) - (m.c * 1)),
        d:det * ((m.a * 1) - (m.e * 0)),
        e:det * ((m.c * m.f) - (m.e * m.d)),
        f:det * ((m.e * m.b) - (m.a * m.f))
    }
}
// object
ORYX.Core.Math.getDeterminant = function (m) {
    // a11a22a33+a12a23a31+a13a21a32-a13a22a31-a12a21a33-a11a23a32
    return (m.a * m.d * 1) + (m.c * m.f * 0) + (m.e * m.b * 0) - (m.e * m.d * 0) - (m.c * m.b * 1) - (m.a * m.f * 0);
}

// object
ORYX.Core.Math.getTranslatedBoundingBox = function (node) {
    var matrix = node.getCTM();
    var bb = node.getBBox();
    var ul = ORYX.Core.Math.getTranslatedPoint({x:bb.x, y:bb.y}, matrix);
    var ll = ORYX.Core.Math.getTranslatedPoint({x:bb.x, y:bb.y + bb.height}, matrix);
    var ur = ORYX.Core.Math.getTranslatedPoint({x:bb.x + bb.width, y:bb.y}, matrix);
    var lr = ORYX.Core.Math.getTranslatedPoint({x:bb.x + bb.width, y:bb.y + bb.height}, matrix);

    var minPoint = {
        x:Math.min(ul.x, ll.x, ur.x, lr.x),
        y:Math.min(ul.y, ll.y, ur.y, lr.y)
    }
    var maxPoint = {
        x:Math.max(ul.x, ll.x, ur.x, lr.x),
        y:Math.max(ul.y, ll.y, ur.y, lr.y)
    }
    return {
        x:minPoint.x,
        y:minPoint.y,
        width:maxPoint.x - minPoint.x,
        height:maxPoint.y - minPoint.y
    }
};

new function () {

    var RIGHT = 2, TOP = 8, BOTTOM = 4, LEFT = 1;

    function computeOutCode(x, y, xmin, ymin, xmax, ymax) {
        var code = 0;
        if (y > ymax)
            code |= TOP;
        else if (y < ymin)
            code |= BOTTOM;
        if (x > xmax)
            code |= RIGHT;
        else if (x < xmin)
            code |= LEFT;
        return code;
    }

    /**
     * Returns TRUE if the rectangle is over the edge and has intersection points or includes it
     * @param {Object} x1 Point A of the line
     * @param {Object} y1
     * @param {Object} x2 Point B of the line
     * @param {Object} y2
     * @param {Object} xmin Point A of the rectangle
     * @param {Object} ymin
     * @param {Object} xmax Point B of the rectangle
     * @param {Object} ymax
     */
    ORYX.Core.Math.isRectOverLine = function (x1, y1, x2, y2, xmin, ymin, xmax, ymax) {
        return !!ORYX.Core.Math.clipLineOnRect.apply(ORYX.Core.Math, arguments);
    }

    /**
     * Returns the clipped line on the given rectangle. If there is
     * no intersection, it will return NULL.
     *
     * @param {Object} x1 Point A of the line
     * @param {Object} y1
     * @param {Object} x2 Point B of the line
     * @param {Object} y2
     * @param {Object} xmin Point A of the rectangle
     * @param {Object} ymin
     * @param {Object} xmax Point B of the rectangle
     * @param {Object} ymax
     */
    ORYX.Core.Math.clipLineOnRect = function (x1, y1, x2, y2, xmin, ymin, xmax, ymax) {
        //Outcodes for P0, P1, and whatever point lies outside the clip rectangle
        var outcode0, outcode1, outcodeOut, hhh = 0;
        var accept = false, done = false;

        //compute outcodes
        outcode0 = computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
        outcode1 = computeOutCode(x2, y2, xmin, ymin, xmax, ymax);

        do {
            if ((outcode0 | outcode1) == 0) {
                accept = true;
                done = true;
            } else if ((outcode0 & outcode1) > 0) {
                done = true;
            } else {
                //failed both tests, so calculate the line segment to clip
                //from an outside point to an intersection with clip edge
                var x = 0, y = 0;
                //At least one endpoint is outside the clip rectangle; pick it.
                outcodeOut = outcode0 != 0 ? outcode0 : outcode1;
                //Now find the intersection point;
                //use formulas y = y0 + slope * (x - x0), x = x0 + (1/slope)* (y - y0)
                if ((outcodeOut & TOP) > 0) {
                    x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                    y = ymax;
                } else if ((outcodeOut & BOTTOM) > 0) {
                    x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                    y = ymin;
                } else if ((outcodeOut & RIGHT) > 0) {
                    y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                    x = xmax;
                } else if ((outcodeOut & LEFT) > 0) {
                    y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                    x = xmin;
                }

                //Now we move outside point to intersection point to clip
                //and get ready for next pass.
                if (outcodeOut == outcode0) {
                    x1 = x;
                    y1 = y;
                    outcode0 = computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
                } else {
                    x2 = x;
                    y2 = y;
                    outcode1 = computeOutCode(x2, y2, xmin, ymin, xmax, ymax);
                }
            }
            hhh++;
        } while (done != true && hhh < 5000);

        if (accept) {
            return {a:{x:x1, y:y1}, b:{x:x2, y:y2}};
        }
        return null;
    }
}();


if (!ORYX.Plugins) {
    ORYX.Plugins = new Object();
}

// object 顶部操作菜单
ORYX.Plugins.Toolbar = Clazz.extend({

    facade:undefined,
    plugs:[],

    construct:function (facade, ownPluginData) {
        this.facade = facade;

        //this.groupIndex = new Hash();
		this.groupIndex = {};
        //ownPluginData.properties.each((function (value) {
		var self = this;
		$.map(ownPluginData.properties,function (value) {
            if (value.group && value.index != undefined) {
                self.groupIndex[value.group] = value.index
				
            }
		});
        //}).bind(this));

        //Ext.QuickTips.init();

        this.buttons = [];
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_BUTTON_UPDATE, this.onButtonUpdate.bind(this));
    },

    /**
     * Can be used to manipulate the state of a button.
     * @example
     * this.facade.raiseEvent({
     *   type: ORYX.CONFIG.EVENT_BUTTON_UPDATE,
     *   id: this.buttonId, // have to be generated before and set in the offer method
     *   pressed: true
     * });
     * @param {Object} event
     */
    onButtonUpdate:function (event) {
        var button = this.buttons.find(function (button) {
            return button.id === event.id;
        });

        if (event.pressed !== undefined) {
            button.buttonInstance.toggle(event.pressed);
        }
    },

    registryChanged:function (pluginsData) {
        // Sort plugins by group and index
		var self = this;
		
        var newPlugs = pluginsData.sortBy((function (value) {
			return ((self.groupIndex[value.group] != undefined ? self.groupIndex[value.group] : "" ) + value.group + "" + value.index).toLowerCase();
        }));
		
		var tmp=[];
		$.map(newPlugs,function(value){
			
			var isInClude = function(value){
				if($.inArray(value,self.plugs)>=0){
					return true;
				}
				return false;
			}
			//if(!self.plugs.include(value) && (!value.target || value.target === ORYX.Plugins.Toolbar)){
			if(!isInClude(value) && (!value.target || value.target === ORYX.Plugins.Toolbar)){
				tmp[tmp.length] = value;
			}
		});
		var plugs = tmp;
		
        if (plugs.length < 1)
            return;

        this.buttons = [];

      
        var currentGroupsName = this.plugs.last() ? this.plugs.last().group : plugs[0].group;

        // Map used to store all drop down buttons of current group
        var currentGroupsDropDownButton = {};

		var toolbars = [],self = this;
		
        //plugs.each((function (value) {
		var self = this,
		    table=$("<table></table>"),
			tr = $("<tr></tr>");
		
		$.map(plugs,function(value){
            if (!value.name) {
                return
            }
            self.plugs.push(value);
			
			if (currentGroupsName != value.group) {
                currentGroupsName = value.group;
				var splitImg = $("<img>"),
					td=$("<td></td>");
				splitImg.attr("src","./images/signavio/smoky/vLine-alpha.png");
				splitImg.appendTo(td);
				td.appendTo(tr);
				splitImg.html("&nbsp;");
            }
			
			var buttonImg = $("<img>"),
				td = $("<td></td>");
			buttonImg.attr("id",value.id);
			buttonImg.attr("src",value.icon);
			buttonImg.attr("title",value.description || value.name);
			buttonImg.attr("style","margin-left:3px;");
			
			td.attr("style","width:21px;height:20px");
			//td.addClass("x-btn-disable-bg"); //禁用的效果
			buttonImg.mouseover(function(){
				$(this).parent().addClass("x-btn-bg");
			}).mouseout(function(){
				$(this).parent().removeClass("x-btn-bg");
			});
			
			//self.toolbar.add(button);
			var fun = value.toggle ? null : value.functionality;
			buttonImg.click(function () {
				fun && fun.call(null);
			});
			//buttonImg.appendTo($("#toolbar"));
			buttonImg.appendTo(td);
			td.appendTo(tr);
			
            value['buttonInstance'] = buttonImg;
			
            self.buttons.push(value);
		});
        //}).bind(this));
		tr.appendTo(table);
		table.attr("style","margin-top:2px");
		table.appendTo($("#toolbar"));

        this.enableButtons([]);

        //TODO this should be done when resizing and adding elements!!!!
        //this.toolbar.calcSlices();
        /*window.addEventListener("resize", function (event) {
            this.toolbar.calcSlices()
        }.bind(this), false);
        window.addEventListener("onresize", function (event) {
            this.toolbar.calcSlices()
        }.bind(this), false);*/

    },

    onSelectionChanged:function (event) {
		if(this.facade.isValid)return;
		this.enableButtons(event.elements);
    },

    enableButtons:function (elements) {
		$.map(this.buttons,function (value) {
			var buttonImg = value.buttonInstance;
			var fun = value.functionality;
			buttonImg.unbind("click").click(function (e) {
				fun && fun.call(this,e);
			});
			buttonImg.unbind("mouseout mouseover").mouseover(function(){
				$(this).parent().addClass("x-btn-bg");
			}).mouseout(function(){
				if(!$(this).attr("toggle") || $(this).attr("toggle")=='false')
					$(this).parent().removeClass("x-btn-bg");
			});
			buttonImg.parent().removeClass("x-btn-disable-bg");
			buttonImg.parent().addClass("x-btn-enable");
			
			var disable = function(buttonImg){
				buttonImg.unbind("click mouseover");
				buttonImg.parent().addClass("x-btn-disable-bg");
				buttonImg.parent().removeClass("x-btn-enable");
			}
            // If there is less elements than minShapes
            if (value.minShape && value.minShape > elements.length)
				disable(buttonImg);
            // If there is more elements than minShapes
            if (value.maxShape && value.maxShape < elements.length)
				disable(buttonImg);
            // If the plugin is not enabled
            if (value.isEnabled && !value.isEnabled(value.buttonInstance))
                disable(buttonImg);
		});	
    }
});


// object
ORYX.Plugins.ProcessLink = Clazz.extend({

    facade:undefined,

    /**
     * Offers the plugin functionality:
     *
     */
    construct:function (facade) {

        this.facade = facade;

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPERTY_CHANGED, this.propertyChanged.bind(this));

    },


    /**
     *
     * @param {Object} option
     */
    propertyChanged:function (option, node) {

        if (option.name !== "oryx-refuri" || !node instanceof ORYX.Core.Node) {
            return
        }


        if (option.value && option.value.length > 0 && option.value != "undefined") {

            this.show(node, option.value);

        } else {

            this.hide(node);

        }

    },

    /**
     * Shows the Link for a particular shape with a specific url
     *
     * @param {Object} shape
     * @param {Object} url
     */
    show:function (shape, url) {


        // Generate the svg-representation of a link
        var link = ORYX.Editor.graft("http://www.w3.org/2000/svg", null,
            [ 'a',
                {'target':'_blank'},
                ['path',
                    { "stroke-width":1.0, "stroke":"#00DD00", "fill":"#00AA00", "d":"M3,3 l0,-2.5 l7.5,0 l0,-2.5 l7.5,4.5 l-7.5,3.5 l0,-2.5 l-8,0", "line-captions":"round"}
                ]
            ]);

        var link = ORYX.Editor.graft("http://www.w3.org/2000/svg", null,
            [ 'a',
                {'target':'_blank'},
                ['path', { "style":"fill:#92BFFC;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72", "d":"M0 1.44 L0 15.05 L11.91 15.05 L11.91 5.98 L7.37 1.44 L0 1.44 Z"}],
                ['path', { "style":"stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72;fill:none;", "transform":"translate(7.5, -8.5)", "d":"M0 10.51 L0 15.05 L4.54 15.05"}],
                ['path', { "style":"fill:#f28226;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72", "transform":"translate(-3, -1)", "d":"M0 8.81 L0 13.06 L5.95 13.06 L5.95 15.05 A50.2313 50.2313 -175.57 0 0 10.77 11.08 A49.9128 49.9128 -1.28 0 0 5.95 6.54 L5.95 8.81 L0 8.81 Z"}]
            ]);

        /*
         *
         * 					[ 'a',
         {'target': '_blank'},
         ['path', { "style": "fill:none;stroke-width:0.5px; stroke:#000000", "d": "M7,4 l0,2"}],
         ['path', { "style": "fill:none;stroke-width:0.5px; stroke:#000000", "d": "M4,8 l-2,0 l0,6"}],
         ['path', { "style": "fill:none;stroke-width:0.5px; stroke:#000000", "d": "M10,8 l2,0 l0,6"}],
         ['rect', { "style": "fill:#96ff96;stroke:#000000;stroke-width:1", "width": 6, "height": 4, "x": 4, "y": 0}],
         ['rect', { "style": "fill:#ffafff;stroke:#000000;stroke-width:1", "width": 6, "height": 4, "x": 4, "y": 6}],
         ['rect', { "style": "fill:#96ff96;stroke:#000000;stroke-width:1", "width": 6, "height": 4, "x": 0, "y": 12}],
         ['rect', { "style": "fill:#96ff96;stroke:#000000;stroke-width:1", "width": 6, "height": 4, "x": 8, "y": 12}],
         ['rect', { "style": "fill:none;stroke:none;pointer-events:all", "width": 14, "height": 16, "x": 0, "y": 0}]
         ]);
         */

        // Set the link with the special namespace
        link.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url);


        // Shows the link in the overlay
        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,
            id:"arissupport.urlref_" + shape.id,
            shapes:[shape],
            node:link,
            nodePosition:"SE"
        });

    },

    /**
     * Hides the Link for a particular shape
     *
     * @param {Object} shape
     */
    hide:function (shape) {

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,
            id:"arissupport.urlref_" + shape.id
        });

    }
});

// object
ORYX.Plugins.AbstractPlugin = Clazz.extend({
    /**
     * The facade which offer editor-specific functionality
     * @type Facade
     * @memberOf ORYX.Plugins.AbstractPlugin.prototype
     */
    facade:null,

    construct:function (facade) {
        this.facade = facade;

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, this.onLoaded.bind(this));
    },

    /**
     Overwrite to handle load event. TODO: Document params!!!
     @methodOf ORYX.Plugins.AbstractPlugin.prototype
     */
    onLoaded:function () {
    },

    /**
     Overwrite to handle selection changed event. TODO: Document params!!!
     @methodOf ORYX.Plugins.AbstractPlugin.prototype
     */
    onSelectionChanged:function () {
    },

    /**
     Show overlay on given shape.
     @methodOf ORYX.Plugins.AbstractPlugin.prototype
     @example
     showOverlay(
     myShape,
     { stroke: "green" },
     ORYX.Editor.graft("http://www.w3.org/2000/svg", null, ['path', {
     "title": "Click the element to execute it!",
     "stroke-width": 2.0,
     "stroke": "black",
     "d": "M0,-5 L5,0 L0,5 Z",
     "line-captions": "round"
     }])
     )
     @param {Oryx.XXX.Shape[]} shapes One shape or array of shapes the overlay should be put on
     @param {Oryx.XXX.Attributes} attributes some attributes...
     @param {Oryx.svg.node} svgNode The svg node which should be used as overlay
     @param {String} [svgNode="NW"] The svg node position where the overlay should be placed
     */
    showOverlay:function (shapes, attributes, svgNode, svgNodePosition) {

        if (!(shapes instanceof Array)) {
            shapes = [shapes]
        }

        // Define Shapes
        shapes = shapes.map(function (shape) {
            var el = shape;
            if (typeof shape == "string") {
                el = this.facade.getCanvas().getChildShapeByResourceId(shape);
                el = el || this.facade.getCanvas().getChildById(shape, true);
            }
            return el;
        }.bind(this)).compact();

        // Define unified id
        if (!this.overlayID) {
            this.overlayID = this.type + ORYX.Editor.provideId();
        }

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,
            id:this.overlayID,
            shapes:shapes,
            attributes:attributes,
            node:svgNode,
            nodePosition:svgNodePosition || "NW"
        });

    },

    /**
     Hide current overlay.
     @methodOf ORYX.Plugins.AbstractPlugin.prototype
     */
    hideOverlay:function () {
        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,
            id:this.overlayID
        });
    },

    /**
     Does a transformation with the given xslt stylesheet.
     @methodOf ORYX.Plugins.AbstractPlugin.prototype
     @param {String} data The data (e.g. eRDF) which should be transformed
     @param {String} stylesheet URL of a stylesheet which should be used for transforming data.
     */
    doTransform:function (data, stylesheet) {

        if (!stylesheet || !data) {
            return ""
        }

        var parser = new DOMParser();
        var parsedData = parser.parseFromString(data, "text/xml");
        source = stylesheet;
        new Ajax.Request(source, {
            asynchronous:false,
            method:'get',
            onSuccess:function (transport) {
                xsl = transport.responseText
            }.bind(this),
            onFailure:(function (transport) {
                ORYX.Log.error("XSL load failed" + transport);
            }).bind(this)
        });
        var xsltProcessor = new XSLTProcessor();
        var domParser = new DOMParser();
        var xslObject = domParser.parseFromString(xsl, "text/xml");
        xsltProcessor.importStylesheet(xslObject);

        try {

            var newData = xsltProcessor.transformToFragment(parsedData, document);
            var serializedData = (new XMLSerializer()).serializeToString(newData);

            /* Firefox 2 to 3 problem?! */
            serializedData = !serializedData.startsWith("<?xml") ? "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serializedData : serializedData;

            return serializedData;

        } catch (error) {
            return -1;
        }

    },

    /**
     * Opens a new window that shows the given XML content.
     * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     * @param {Object} content The XML content to be shown.
     * @example
     * openDownloadWindow( "my.xml", "<exampleXML />" );
     */
    openXMLWindow:function (content) {
        var win = window.open(
            'data:application/xml,' + encodeURIComponent(
                content
            ),
            '_blank', "resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes"
        );
    },

    /**
     * Opens a download window for downloading the given content.
     * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     * @param {String} filename The content's file name
     * @param {String} content The content to download
     */
    openDownloadWindow:function (filename, content) {
        var win = window.open("");
        if (win != null) {
            win.document.open();
            win.document.write("<html><body>");
            var submitForm = win.document.createElement("form");
            win.document.body.appendChild(submitForm);

            var createHiddenElement = function (name, value) {
                var newElement = document.createElement("input");
                newElement.name = name;
                newElement.type = "hidden";
                newElement.value = value;
                return newElement
            }

            submitForm.appendChild(createHiddenElement("download", content));
            submitForm.appendChild(createHiddenElement("file", filename));


            submitForm.method = "POST";
            win.document.write("</body></html>");
            win.document.close();
            submitForm.action = ORYX.PATH + "/download";
            submitForm.submit();
        }
    },

    /**
     * Serializes DOM.
     * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     * @type {String} Serialized DOM
     */
    getSerializedDOM:function () {
        // Force to set all resource IDs
        var serializedDOM = DataManager.serializeDOM(this.facade);

        //add namespaces
        serializedDOM = '<?xml version="1.0" encoding="utf-8"?>' +
            '<html xmlns="http://www.w3.org/1999/xhtml" ' +
            'xmlns:b3mn="http://b3mn.org/2007/b3mn" ' +
            'xmlns:ext="http://b3mn.org/2007/ext" ' +
            'xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ' +
            'xmlns:atom="http://b3mn.org/2007/atom+xhtml">' +
            '<head profile="http://purl.org/NET/erdf/profile">' +
            '<link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" />' +
            '<link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " />' +
            '<link rel="schema.b3mn" href="http://b3mn.org" />' +
            '<link rel="schema.oryx" href="http://oryx-editor.org/" />' +
            '<link rel="schema.raziel" href="http://raziel.org/" />' +
            '<base href="' +
            location.href.split("?")[0] +
            '" />' +
            '</head><body>' +
            serializedDOM +
            '</body></html>';

        return serializedDOM;
    },

    /**
     * Sets the editor in read only mode: Edges/ dockers cannot be moved anymore,
     * shapes cannot be selected anymore.
     * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     */
    enableReadOnlyMode:function () {
        //Edges cannot be moved anymore
        this.facade.disableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);

        // Stop the user from editing the diagram while the plugin is active
        this._stopSelectionChange = function () {
            if (this.facade.getSelection().length > 0) {
                this.facade.setSelection([]);
            }
        };
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, this._stopSelectionChange.bind(this));
    },
    /**
     * Disables read only mode, see
     * * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     * @see ORYX.Plugins.AbstractPlugin.prototype.enableReadOnlyMode
     */
    disableReadOnlyMode:function () {
        // Edges can be moved now again
        this.facade.enableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);

        if (this._stopSelectionChange) {
            this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, this._stopSelectionChange.bind(this));
            this._stopSelectionChange = undefined;
        }
    },

    /**
     * Extracts RDF from DOM.
     * @methodOf ORYX.Plugins.AbstractPlugin.prototype
     * @type {String} Extracted RFD. Null if there are transformation errors.
     */
    getRDFFromDOM:function () {
        //convert to RDF
        try {
            var xsl = "";
            source = ORYX.PATH + "lib/extract-rdf.xsl";
            new Ajax.Request(source, {
                asynchronous:false,
                method:'get',
                onSuccess:function (transport) {
                    xsl = transport.responseText
                }.bind(this),
                onFailure:(function (transport) {
                    ORYX.Log.error("XSL load failed" + transport);
                }).bind(this)
            });
            /*
             var parser = new DOMParser();
             var parsedDOM = parser.parseFromString(this.getSerializedDOM(), "text/xml");
             var xsltPath = ORYX.PATH + "lib/extract-rdf.xsl";
             var xsltProcessor = new XSLTProcessor();
             var xslRef = document.implementation.createDocument("", "", null);
             xslRef.async = false;
             xslRef.load(xsltPath);
             xsltProcessor.importStylesheet(xslRef);
             try {
             var rdf = xsltProcessor.transformToDocument(parsedDOM);
             return (new XMLSerializer()).serializeToString(rdf);
             } catch (error) {
             alert("Oryx", error);
             return null;
             }*/
            var domParser = new DOMParser();
            var xmlObject = domParser.parseFromString(this.getSerializedDOM(), "text/xml");
            var xslObject = domParser.parseFromString(xsl, "text/xml");
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslObject);
            var result = xsltProcessor.transformToFragment(xmlObject, document);

            var serializer = new XMLSerializer();

            return serializer.serializeToString(result);
        } catch (e) {
            alert("Oryx", error);
            return "";
        }


    },

    /**
     * Checks if a certain stencil set is loaded right now.
     *
     */
    isStencilSetExtensionLoaded:function (stencilSetExtensionNamespace) {
        return this.facade.getStencilSets().values().any(
            function (ss) {
                return ss.extensions().keys().any(
                    function (extensionKey) {
                        return extensionKey == stencilSetExtensionNamespace;
                    }.bind(this)
                );
            }.bind(this)
        );
    },

    /**
     * Raises an event so that registered layouters does
     * have the posiblility to layout the given shapes
     * For further reading, have a look into the AbstractLayouter
     * class
     * @param {Object} shapes
     */
    doLayout:function (shapes) {
		
        // Raises a do layout event
        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_LAYOUT,
            shapes:shapes
        });
    },


    /**
     * Does a primitive layouting with the incoming/outgoing
     * edges (set the dockers to the right position) and if
     * necessary, it will be called the real layouting
     * @param {ORYX.Core.Node} node
     * @param {Array} edges
     */
    layoutEdges:function (node, allEdges, offset) {

        if (!this.facade.isExecutingCommands()) {
            return
        }

        var Command = ORYX.Core.Command.extend({
            construct:function (edges, node, offset, plugin) {
                this.edges = edges;
                this.node = node;
                this.plugin = plugin;
                this.offset = offset;

                // Get the new absolute center
                var center = node.absoluteXY();
                this.ulo = {x:center.x - offset.x, y:center.y - offset.y};


            },
            execute:function () {

                if (this.changes) {
                    this.executeAgain();
                    return;
                } else {
                    this.changes = [];
					var self = this;
                    //this.edges.each(function (edge) {
					$.map(this.edges,function (edge) {
                        self.changes.push({
                            edge:edge,
                            /*oldDockerPositions:edge.dockers.map(function (r) {
                                return r.bounds.center()
                            })*/
							oldDockerPositions:$.map(edge.dockers,function (r) {  //ray
                                return r.bounds.center()
                            })
                        })
					});	
                    //}.bind(this));
                }

				var self = this;
				$.map(this.edges,function(edge,i){
					if(edge.dockers.length > 2){
						if (edge.dockers.first().getDockedShape() === self.node) {
							var second = edge.dockers[1];
							if (self.align(second.bounds, edge.dockers.first())) {
								second.update();
							}
						} else if (edge.dockers.last().getDockedShape() === self.node) {
							var beforeLast = edge.dockers[edge.dockers.length - 2];
							if (self.align(beforeLast.bounds, edge.dockers.last())) {
								beforeLast.update();
							}
						}
						edge._update(true);
						edge.removeUnusedDockers();
						if (self.isBendPointIncluded(edge)) {
							self.plugin.doLayout(edge);
							return;
						}
					}
					
					if (edge.dockers.length == 2) {
                        var p1 = edge.dockers.first().getAbsoluteReferencePoint() || edge.dockers.first().bounds.center();
                        var p2 = edge.dockers.last().getAbsoluteReferencePoint() || edge.dockers.first().bounds.center();
                        // Find all horizontal/vertical edges
                        if (Math.abs(-Math.abs(p1.x - p2.x) + Math.abs(self.offset.x)) < 2 || Math.abs(-Math.abs(p1.y - p2.y) + Math.abs(self.offset.y)) < 2) {
                            self.plugin.doLayout(edge);
                        }
                    }
					
					 //self.changes[i].dockerPositions = edge.dockers.map(function (r) {
					 self.changes[i].dockerPositions = $.map(edge.dockers,function (r) {
                        return r.bounds.center()
                    });
				});

            },
            /**
             * Align the bounds if the center is
             * the same than the old center
             * @params {Object} bounds
             * @params {Object} bounds2
             */
            align:function (bounds, refDocker) {

                var abRef = refDocker.getAbsoluteReferencePoint() || refDocker.bounds.center();

                var xdif = bounds.center().x - abRef.x;
                var ydif = bounds.center().y - abRef.y;
                if (Math.abs(-Math.abs(xdif) + Math.abs(this.offset.x)) < 3 && this.offset.xs === undefined) {
                    bounds.moveBy({x:-xdif, y:0})
                }
                if (Math.abs(-Math.abs(ydif) + Math.abs(this.offset.y)) < 3 && this.offset.ys === undefined) {
                    bounds.moveBy({y:-ydif, x:0})
                }

                if (this.offset.xs !== undefined || this.offset.ys !== undefined) {
                    var absPXY = refDocker.getDockedShape().absoluteXY();
                    xdif = bounds.center().x - (absPXY.x + ((abRef.x - absPXY.x) / this.offset.xs));
                    ydif = bounds.center().y - (absPXY.y + ((abRef.y - absPXY.y) / this.offset.ys));

                    if (Math.abs(-Math.abs(xdif) + Math.abs(this.offset.x)) < 3) {
                        bounds.moveBy({x:-(bounds.center().x - abRef.x), y:0})
                    }

                    if (Math.abs(-Math.abs(ydif) + Math.abs(this.offset.y)) < 3) {
                        bounds.moveBy({y:-(bounds.center().y - abRef.y), x:0})
                    }
                }
            },

            /**
             * Returns a TRUE if there are bend point which overlay the shape
             */
            isBendPointIncluded:function (edge) {
                // Get absolute bounds
                var ab = edge.dockers.first().getDockedShape();
                var bb = edge.dockers.last().getDockedShape();

                if (ab) {
                    ab = ab.absoluteBounds();
                    ab.widen(5);
                }

                if (bb) {
                    bb = bb.absoluteBounds();
                    bb.widen(20); // Wide with 20 because of the arrow from the edge
                }

				var tmp = false;
				$.map(edge.dockers,function(docker, i) {
					var c = docker.bounds.center();
					if(i != 0 && i != edge.dockers.length - 1 && ((ab && ab.isIncluded(c)) || (bb && bb.isIncluded(c)))){
						tmp = true;
						return false;
					}
				});
				return tmp;
            },

            removeAllDocker:function (edge) {
                edge.dockers.slice(1, edge.dockers.length - 1).each(function (docker) {
                    edge.removeDocker(docker);
                })
            },
            executeAgain:function () {
                this.changes.each(function (change) {
                    // Reset the dockers
                    this.removeAllDocker(change.edge);
                    change.dockerPositions.each(function (pos, i) {
                        if (i == 0 || i == change.dockerPositions.length - 1) {
                            return
                        }
                        var docker = change.edge.createDocker(undefined, pos);
                        docker.bounds.centerMoveTo(pos);
                        docker.update();
                    }.bind(this));
                    change.edge._update(true);
                }.bind(this));
            },
            rollback:function () {
                this.changes.each(function (change) {
                    // Reset the dockers
                    this.removeAllDocker(change.edge);
                    change.oldDockerPositions.each(function (pos, i) {
                        if (i == 0 || i == change.oldDockerPositions.length - 1) {
                            return
                        }
                        var docker = change.edge.createDocker(undefined, pos);
                        docker.bounds.centerMoveTo(pos);
                        docker.update();
                    }.bind(this));
                    change.edge._update(true);
                }.bind(this));
            }
        });

        this.facade.executeCommands([new Command(allEdges, node, offset, this)]);

    }
});


// object
ORYX.Plugins.AbstractLayouter = ORYX.Plugins.AbstractPlugin.extend({

    /**
     * 'layouted' defined all types of shapes which will be layouted.
     * It can be one value or an array of values. The value
     * can be a Stencil ID (as String) or an class type of either
     * a ORYX.Core.Node or ORYX.Core.Edge
     * @type Array|String|Object
     * @memberOf ORYX.Plugins.AbstractLayouter.prototype
     */
    layouted:[],

    /**
     * Constructor
     * @param {Object} facade
     * @memberOf ORYX.Plugins.AbstractLayouter.prototype
     */
    construct:function (facade) {
        arguments.callee.$.construct.apply(this, arguments);

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT, this._initLayout.bind(this));
    },

    /**
     * Proofs if this shape should be layouted or not
     * @param {Object} shape
     * @memberOf ORYX.Plugins.AbstractLayouter.prototype
     */
    isIncludedInLayout:function (shape) {
        if (!(this.layouted instanceof Array)) {
            this.layouted = [this.layouted].compact();
        }

        // If there are no elements
        if (this.layouted.length <= 0) {
            // Return TRUE
            return true;
        }

        // Return TRUE if there is any correlation between
        // the 'layouted' attribute and the shape themselve.
        /*return this.layouted.any(function (s) {
            if (typeof s == "string") {
                return shape.getStencil().id().include(s);
            } else {
                return shape instanceof s;
            }
        })*/
		var result = false;
		$.map(this.layouted,function(s){
			 if (typeof s == "string") {
				var tmp = $.makeArray(shape.getStencil().id());
                if(tmp.include(s)){
					result = true;
					return false;
				}
            } else {
                if(shape instanceof s){
					result = true;
					return false;
				}
            }
		});
		return  result;
    },

    /**
     * Callback to start the layouting
     * @param {Object} event Layout event
     * @param {Object} shapes Given shapes
     * @memberOf ORYX.Plugins.AbstractLayouter.prototype
     */
    _initLayout:function (event) {

        // Get the shapes
        var shapes = [event.shapes].flatten().compact();

        // Find all shapes which should be layouted
		var self = this;
		var toLayout = shapes.findAll(function (shape) {
            return self.isIncludedInLayout(shape)
		});
        //}.bind(this))

        // If there are shapes left
        if (toLayout.length > 0) {
            // Do layout
            this.layout(toLayout);
        }
    },

    /**
     * Implementation of layouting a set on shapes
     * @param {Object} shapes Given shapes
     * @memberOf ORYX.Plugins.AbstractLayouter.prototype
     */
    layout:function (shapes) {
        throw new Error("Layouter has to implement the layout function.")
    }
});

if(!ORYX.Plugins.Layouter)ORYX.Plugins.Layouter ={};
// object
new function () {
	ORYX.Plugins.Layouter.EdgeLayouter = ORYX.Plugins.AbstractLayouter.extend({

        /**
         * Layout only Edges
         */
        layouted:[    "http://b3mn.org/stencilset/bpmn1.1#SequenceFlow",
            "http://b3mn.org/stencilset/bpmn1.1#MessageFlow",
            "http://b3mn.org/stencilset/timjpdl3#SequenceFlow",
            "http://b3mn.org/stencilset/jbpm4#SequenceFlow",
            "http://b3mn.org/stencilset/bpmn2.0#MessageFlow",
            "http://b3mn.org/stencilset/bpmn2.0#SequenceFlow",
            "http://b3mn.org/stencilset/bpmn2.0choreography#MessageFlow",
            "http://b3mn.org/stencilset/bpmn2.0choreography#SequenceFlow",
            "http://b3mn.org/stencilset/bpmn2.0conversation#ConversationLink",
            "http://b3mn.org/stencilset/epc#ControlFlow",
            "http://www.signavio.com/stencilsets/processmap#ProcessLink",
            "http://www.signavio.com/stencilsets/organigram#connection"],

        /**
         * Layout a set on edges
         * @param {Object} edges
         */
        layout:function (edges) {
            edges.each(function (edge) {
                this.doLayout(edge)
            }.bind(this))
        },

        /**
         * Layout one edge
         * @param {Object} edge
         */
        doLayout:function (edge) {
		
            // Get from and to node
            var from = edge.getIncomingNodes()[0];
            var to = edge.getOutgoingNodes()[0];

            // Return if one is null
            if (!from || !to) {
                return
            }

            var positions = this.getPositions(from, to, edge);

            if (positions.length > 0) {
                this.setDockers(edge, positions[0].a, positions[0].b);
            }

        },

        /**
         * Returns a set on positions which are not containt either
         * in the bounds in from or to.
         * @param {Object} from Shape where the edge is come from
         * @param {Object} to Shape where the edge is leading to
         * @param {Object} edge Edge between from and to
         */
        getPositions:function (from, to, edge) {

            // Get absolute bounds
            var ab = from.absoluteBounds();
            var bb = to.absoluteBounds();

            // Get center from and to
            var a = ab.center();
            var b = bb.center();

            var am = ab.midPoint();
            var bm = bb.midPoint();

            // Get first and last reference point
            //var first = Object.clone(edge.dockers.first().referencePoint);
            //var last = Object.clone(edge.dockers.last().referencePoint);
			var first = $.extend(true,{},edge.dockers.first().referencePoint);
            var last = $.extend(true,{},edge.dockers.last().referencePoint);
			
            // Get the absolute one
            var aFirst = edge.dockers.first().getAbsoluteReferencePoint();
            var aLast = edge.dockers.last().getAbsoluteReferencePoint();

            // IF ------>
            // or  |
            //     V
            // Do nothing
            if (Math.abs(aFirst.x - aLast.x) < 1 || Math.abs(aFirst.y - aLast.y) < 1) {
                return []
            }

            // Calc center position, between a and b
            // depending on there weight
            var m = {}
            m.x = a.x < b.x ?
                (((b.x - bb.width() / 2) - (a.x + ab.width() / 2)) / 2) + (a.x + ab.width() / 2) :
                (((a.x - ab.width() / 2) - (b.x + bb.width() / 2)) / 2) + (b.x + bb.width() / 2);

            m.y = a.y < b.y ?
                (((b.y - bb.height() / 2) - (a.y + ab.height() / 2)) / 2) + (a.y + ab.height() / 2) :
                (((a.y - ab.height() / 2) - (b.y + bb.height() / 2)) / 2) + (b.y + bb.height() / 2);


            // Enlarge both bounds with 10
            ab.widen(5); // Wide the from less than
            bb.widen(20);// the to because of the arrow from the edge

            var positions = [];
            var off = this.getOffset.bind(this);

            // Checks ----+
            //            |
            //            V
            if (!ab.isIncluded(b.x, a.y) && !bb.isIncluded(b.x, a.y)) {
                positions.push({
                    a:{x:b.x + off(last, bm, "x"), y:a.y + off(first, am, "y")},
                    z:this.getWeight(from, a.x < b.x ? "r" : "l", to, a.y < b.y ? "t" : "b", edge)
                });
            }

            // Checks |
            //        +--->
            if (!ab.isIncluded(a.x, b.y) && !bb.isIncluded(a.x, b.y)) {
                positions.push({
                    a:{x:a.x + off(first, am, "x"), y:b.y + off(last, bm, "y")},
                    z:this.getWeight(from, a.y < b.y ? "b" : "t", to, a.x < b.x ? "l" : "r", edge)
                });
            }

            // Checks  --+
            //           |
            //           +--->
            if (!ab.isIncluded(m.x, a.y) && !bb.isIncluded(m.x, b.y)) {
                positions.push({
                    a:{x:m.x, y:a.y + off(first, am, "y")},
                    b:{x:m.x, y:b.y + off(last, bm, "y")},
                    z:this.getWeight(from, "r", to, "l", edge, a.x > b.x)
                });
            }

            // Checks |
            //        +---+
            //            |
            //            V
            if (!ab.isIncluded(a.x, m.y) && !bb.isIncluded(b.x, m.y)) {
                positions.push({
                    a:{x:a.x + off(first, am, "x"), y:m.y},
                    b:{x:b.x + off(last, bm, "x"), y:m.y},
                    z:this.getWeight(from, "b", to, "t", edge, a.y > b.y)
                });
            }

            // Sort DESC of weights
            return positions.sort(function (a, b) {
                return a.z < b.z ? 1 : (a.z == b.z ? -1 : -1)
            });
        },

        /**
         * Returns a offset for the pos to the center of the bounds
         *
         * @param {Object} val
         * @param {Object} pos2
         * @param {String} dir Direction x|y
         */
        getOffset:function (pos, pos2, dir) {
            return pos[dir] - pos2[dir];
        },

        /**
         * Returns a value which shows the weight for this configuration
         *
         * @param {Object} from Shape which is coming from
         * @param {String} d1 Direction where is goes
         * @param {Object} to Shape which goes to
         * @param {String} d2 Direction where it comes to
         * @param {Object} edge Edge between from and to
         * @param {Boolean} reverse Reverse the direction (e.g. "r" -> "l")
         */
        getWeight:function (from, d1, to, d2, edge, reverse) {

            d1 = (d1 || "").toLowerCase();
            d2 = (d2 || "").toLowerCase();

            if (!["t", "r", "b", "l"].include(d1)) {
                d1 = "r"
            }
            if (!["t", "r", "b", "l"].include(d2)) {
                d1 = "l"
            }

            // If reverse is set
            if (reverse) {
                // Reverse d1 and d2
                d1 = d1 == "t" ? "b" : (d1 == "r" ? "l" : (d1 == "b" ? "t" : (d1 == "l" ? "r" : "r")))
                d2 = d2 == "t" ? "b" : (d2 == "r" ? "l" : (d2 == "b" ? "t" : (d2 == "l" ? "r" : "r")))
            }


            var weight = 0;
            // Get rules for from "out" and to "in"
            var dr1 = this.facade.getRules().getLayoutingRules(from, edge)["out"];
            var dr2 = this.facade.getRules().getLayoutingRules(to, edge)["in"];

            var fromWeight = dr1[d1];
            var toWeight = dr2[d2];


            /**
             * Return a true if the center 1 is in the same direction than center 2
             * @param {Object} direction
             * @param {Object} center1
             * @param {Object} center2
             */
            var sameDirection = function (direction, center1, center2) {
                switch (direction) {
                    case "t":
                        return Math.abs(center1.x - center2.x) < 2 && center1.y < center2.y
                    case "r":
                        return center1.x > center2.x && Math.abs(center1.y - center2.y) < 2
                    case "b":
                        return Math.abs(center1.x - center2.x) < 2 && center1.y > center2.y
                    case "l":
                        return center1.x < center2.x && Math.abs(center1.y - center2.y) < 2
                    default:
                        return false;
                }
            }

            // Check if there are same incoming edges from 'from'
            var sameIncomingFrom = from
                .getIncomingShapes()
                .findAll(function (a) {
                    return a instanceof ORYX.Core.Edge
                })
                .any(function (e) {
                    return sameDirection(d1, e.dockers[e.dockers.length - 2].bounds.center(), e.dockers.last().bounds.center());
                });

            // Check if there are same outgoing edges from 'to'
            var sameOutgoingTo = to
                .getOutgoingShapes()
                .findAll(function (a) {
                    return a instanceof ORYX.Core.Edge
                })
                .any(function (e) {
                    return sameDirection(d2, e.dockers[1].bounds.center(), e.dockers.first().bounds.center());
                });

            // If there are equivalent edges, set 0
            //fromWeight = sameIncomingFrom ? 0 : fromWeight;
            //toWeight = sameOutgoingTo ? 0 : toWeight;

            // Get the sum of "out" and the direction plus "in" and the direction
            return (sameIncomingFrom || sameOutgoingTo ? 0 : fromWeight + toWeight);
        },

        /**
         * Removes all current dockers from the node
         * (except the start and end) and adds two new
         * dockers, on the position a and b.
         * @param {Object} edge
         * @param {Object} a
         * @param {Object} b
         */
        setDockers:function (edge, a, b) {
            if (!edge) {
                return
            }

            // Remove all dockers (implicit,
            // start and end dockers will not removed)
            edge.dockers.each(function (r) {
                edge.removeDocker(r);
            });

            // For a and b (if exists), create
            // a new docker and set position
            [a, b].compact().each(function (pos) {
                var docker = edge.createDocker(undefined, pos);
                docker.bounds.centerMoveTo(pos);
            });

            // Update all dockers from the edge
            edge.dockers.each(function (docker) {
                docker.update()
            })

            // Update edge
            //edge.refresh();

            edge._update(true);

        }
    });
}()



// object 编辑时前进撤销功能

ORYX.Plugins.Undo = Clazz.extend({

    // Defines the facade
    facade:undefined,

    // Defines the undo/redo Stack
    undoStack:[],
    redoStack:[],

    // Constructor
    construct:function (facade) {

        this.facade = facade;

        // Offers the functionality of undo
        this.facade.offer({
            name:ORYX.I18N.Undo.undo,
            description:ORYX.I18N.Undo.undoDesc,
            icon:ORYX.PATH + "images/arrow_undo.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:90,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.doUndo.bind(this),
            group:ORYX.I18N.Undo.group,
            isEnabled:function () {
                return this.undoStack.length > 0
            }.bind(this),
            index:0
        });

        // Offers the functionality of redo
        this.facade.offer({
            name:ORYX.I18N.Undo.redo,
            description:ORYX.I18N.Undo.redoDesc,
            icon:ORYX.PATH + "images/arrow_redo.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:89,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.doRedo.bind(this),
            group:ORYX.I18N.Undo.group,
            isEnabled:function () {
                return this.redoStack.length > 0
            }.bind(this),
            index:1
        });

        // Register on event for executing commands --> store all commands in a stack
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, this.handleExecuteCommands.bind(this));

    },

    /**
     * Stores all executed commands in a stack
     *
     * @param {Object} evt
     */
    handleExecuteCommands:function (evt) {

        // If the event has commands
        if (!evt.commands) {
            return
        }

        // Add the commands to a undo stack ...
        this.undoStack.push(evt.commands);
        // ...and delete the redo stack
        this.redoStack = [];

        // Update
        this.facade.getCanvas().update();
        this.facade.updateSelection();

    },

    /**
     * Does the undo
     *
     */
    doUndo:function () {

        // Get the last commands
        var lastCommands = this.undoStack.pop();

        if (lastCommands) {
            // Add the commands to the redo stack
            this.redoStack.push(lastCommands);

            // Rollback every command
            for (var i = lastCommands.length - 1; i >= 0; --i) {
                lastCommands[i].rollback();
            }

            // Update and refresh the canvas
            //this.facade.getCanvas().update();
            //this.facade.updateSelection();
            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_UNDO_ROLLBACK,
                commands:lastCommands
            });

            // Update
            this.facade.getCanvas().update();
            this.facade.updateSelection();
        }
    },

    /**
     * Does the redo
     *
     */
    doRedo:function () {

        // Get the last commands from the redo stack
        var lastCommands = this.redoStack.pop();

        if (lastCommands) {
            // Add this commands to the undo stack
            this.undoStack.push(lastCommands);

            // Execute those commands
            lastCommands.each(function (command) {
                command.execute();
            });

            // Update and refresh the canvas
            //this.facade.getCanvas().update();
            //this.facade.updateSelection();
            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_UNDO_EXECUTE,
                commands:lastCommands
            });

            // Update
            this.facade.getCanvas().update();
            this.facade.updateSelection();
        }
    }

});

// object
ORYX.Plugins.Arrangement = ORYX.Plugins.AbstractPlugin.extend({

    facade:undefined,

    construct:function (facade) {
        this.facade = facade;

        this.facade.offer({
            'name':ORYX.I18N.Arrangement.am,
            'functionality':this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_MIDDLE]),
            'group':ORYX.I18N.Arrangement.groupA,
            'icon':ORYX.PATH + "images/shape_align_middle.png",
            'description':ORYX.I18N.Arrangement.amDesc,
            'index':1,
            'minShape':2});

        this.facade.offer({
            'name':ORYX.I18N.Arrangement.ac,
            'functionality':this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_CENTER]),
            'group':ORYX.I18N.Arrangement.groupA,
            'icon':ORYX.PATH + "images/shape_align_center.png",
            'description':ORYX.I18N.Arrangement.acDesc,
            'index':2,
            'minShape':2});


        this.facade.offer({
            'name':ORYX.I18N.Arrangement.as,
            'functionality':this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_SIZE]),
            'group':ORYX.I18N.Arrangement.groupA,
            'icon':ORYX.PATH + "images/shape_align_size.png",
            'description':ORYX.I18N.Arrangement.asDesc,
            'index':3,
            'minShape':2});


        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_TOP, this.setZLevel.bind(this, this.setToTop));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACK, this.setZLevel.bind(this, this.setToBack));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_FORWARD, this.setZLevel.bind(this, this.setForward));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACKWARD, this.setZLevel.bind(this, this.setBackward));


    },

    onSelectionChanged:function (elemnt) {
		if(this.facade.isValid)return;
        var selection = this.facade.getSelection();
        if (selection.length === 1 && selection[0] instanceof ORYX.Core.Edge) {
            this.setToTop(selection);
        }
    },

    setZLevel:function (callback, event) {

        //Command-Pattern for dragging one docker
        var zLevelCommand = ORYX.Core.Command.extend({
            construct:function (callback, elements, facade) {
                this.callback = callback;
                this.elements = elements;
                // For redo, the previous elements get stored
                this.elAndIndex = elements.map(function (el) {
                    return {el:el, previous:el.parent.children[el.parent.children.indexOf(el) - 1]}
                })
                this.facade = facade;
            },
            execute:function () {

                // Call the defined z-order callback with the elements
                this.callback(this.elements)
                this.facade.setSelection(this.elements)
            },
            rollback:function () {

                // Sort all elements on the index of there containment
                var sortedEl = this.elAndIndex.sortBy(function (el) {
                    var value = el.el;
                    var t = $A(value.node.parentNode.childNodes);
                    return t.indexOf(value.node);
                });

                // Every element get setted back bevor the old previous element
                for (var i = 0; i < sortedEl.length; i++) {
                    var el = sortedEl[i].el;
                    var p = el.parent;
                    var oldIndex = p.children.indexOf(el);
                    var newIndex = p.children.indexOf(sortedEl[i].previous);
                    newIndex = newIndex || 0
                    p.children = p.children.insertFrom(oldIndex, newIndex)
                    el.node.parentNode.insertBefore(el.node, el.node.parentNode.childNodes[newIndex + 1]);
                }

                // Reset the selection
                this.facade.setSelection(this.elements);
            }
        });

        // Instanziate the dockCommand
        var command = new zLevelCommand(callback, this.facade.getSelection(), this.facade);
        if (event.excludeCommand) {
            command.execute();
        } else {
            this.facade.executeCommands([command]);
        }

    },

    setToTop:function (elements) {

        // Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
        /*var tmpElem = elements.sortBy(function (value, index) {
            var t = $A(value.node.parentNode.childNodes);
            return t.indexOf(value.node);
        });*/
		
		var tmpElem = elements.sort(function(a,b){
			var t = $(a.node.parentNode.childNodes);
			var tt = $(b.node.parentNode.childNodes);
			return $.inArray(a.node,t)>$.inArray(b.node,tt);
		});
		
        // Sortiertes Array wird nach oben verschoben.
        //tmpElem.each(function (value) {
		$.map(tmpElem,function (value) {
            var p = value.parent;
            if (p.children.last() === value) {
                return;
            }
            p.children = p.children.without(value)
            p.children.push(value);
            value.node.parentNode.appendChild(value.node);
        });
    },

    setToBack:function (elements) {
        // Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
        var tmpElem = elements.sortBy(function (value, index) {
            var t = $A(value.node.parentNode.childNodes);
            return t.indexOf(value.node);
        });

        tmpElem = tmpElem.reverse();

        // Sortiertes Array wird nach unten verschoben.
        tmpElem.each(function (value) {
            var p = value.parent
            p.children = p.children.without(value)
            p.children.unshift(value);
            value.node.parentNode.insertBefore(value.node, value.node.parentNode.firstChild);
        });


    },

    setBackward:function (elements) {
        // Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
        var tmpElem = elements.sortBy(function (value, index) {
            var t = $A(value.node.parentNode.childNodes);
            return t.indexOf(value.node);
        });

        // Reverse the elements
        tmpElem = tmpElem.reverse();

        // Delete all Nodes who are the next Node in the nodes-Array
        var compactElem = tmpElem.findAll(function (el) {
            return !tmpElem.some(function (checkedEl) {
                return checkedEl.node == el.node.previousSibling
            })
        });

        // Sortiertes Array wird nach eine Ebene nach oben verschoben.
        compactElem.each(function (el) {
            if (el.node.previousSibling === null) {
                return;
            }
            var p = el.parent;
            var index = p.children.indexOf(el);
            p.children = p.children.insertFrom(index, index - 1)
            el.node.parentNode.insertBefore(el.node, el.node.previousSibling);
        });


    },

    setForward:function (elements) {
        // Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
        var tmpElem = elements.sortBy(function (value, index) {
            var t = $A(value.node.parentNode.childNodes);
            return t.indexOf(value.node);
        });


        // Delete all Nodes who are the next Node in the nodes-Array
        var compactElem = tmpElem.findAll(function (el) {
            return !tmpElem.some(function (checkedEl) {
                return checkedEl.node == el.node.nextSibling
            })
        });


        // Sortiertes Array wird eine Ebene nach unten verschoben.
        compactElem.each(function (el) {
            var nextNode = el.node.nextSibling
            if (nextNode === null) {
                return;
            }
            var index = el.parent.children.indexOf(el);
            var p = el.parent;
            p.children = p.children.insertFrom(index, index + 1)
            el.node.parentNode.insertBefore(nextNode, el.node);
        });
    },


    alignShapes:function (way) {
        var elements = this.facade.getSelection();
        // Set the elements to all Top-Level elements
        elements = this.facade.getCanvas().getShapesWithSharedParent(elements);
        // Get only nodes
        elements = elements.findAll(function (value) {
            return (value instanceof ORYX.Core.Node)
        });
        // Delete all attached intermediate events from the array
        elements = elements.findAll(function (value) {
            var d = value.getIncomingShapes()
            return d.length == 0 || !elements.include(d[0])
        });
		
		
		
        if (elements.length < 2) {
            return;
        }

		
		
        // get bounds of all shapes.
        var bounds = elements[0].absoluteBounds().clone();
        elements.each(function (shape) {
            bounds.include(shape.absoluteBounds().clone());
        });

        // get biggest width and heigth
        var maxWidth = 0;
        var maxHeight = 0;
        elements.each(function (shape) {
            maxWidth = Math.max(shape.bounds.width(), maxWidth);
            maxHeight = Math.max(shape.bounds.height(), maxHeight);
        });

        var commandClass = ORYX.Core.Command.extend({
            construct:function (elements, bounds, maxHeight, maxWidth, way, plugin) {
                this.elements = elements;
                this.bounds = bounds;
                this.maxHeight = maxHeight;
                this.maxWidth = maxWidth;
                this.way = way;
                this.facade = plugin.facade;
                this.plugin = plugin;
                this.orgPos = [];
            },
            setBounds:function (shape, maxSize) {
                if (!maxSize)
                    maxSize = {width:ORYX.CONFIG.MAXIMUM_SIZE, height:ORYX.CONFIG.MAXIMUM_SIZE};

                if (!shape.bounds) {
                    throw "Bounds not definined."
                }

                var newBounds = {
                    a:{x:shape.bounds.upperLeft().x - (this.maxWidth - shape.bounds.width()) / 2,
                        y:shape.bounds.upperLeft().y - (this.maxHeight - shape.bounds.height()) / 2},
                    b:{x:shape.bounds.lowerRight().x + (this.maxWidth - shape.bounds.width()) / 2,
                        y:shape.bounds.lowerRight().y + (this.maxHeight - shape.bounds.height()) / 2}
                }

                /* If the new width of shape exceeds the maximum width, set width value to maximum. */
                if (this.maxWidth > maxSize.width) {
                    newBounds.a.x = shape.bounds.upperLeft().x -
                        (maxSize.width - shape.bounds.width()) / 2;

                    newBounds.b.x = shape.bounds.lowerRight().x + (maxSize.width - shape.bounds.width()) / 2
                }

                /* If the new height of shape exceeds the maximum height, set height value to maximum. */
                if (this.maxHeight > maxSize.height) {
                    newBounds.a.y = shape.bounds.upperLeft().y -
                        (maxSize.height - shape.bounds.height()) / 2;

                    newBounds.b.y = shape.bounds.lowerRight().y + (maxSize.height - shape.bounds.height()) / 2
                }

                /* set bounds of shape */
                shape.bounds.set(newBounds);

            },
            execute:function () {
                // align each shape according to the way that was specified.
                this.elements.each(function (shape, index) {
                    this.orgPos[index] = shape.bounds.upperLeft();

                    var relBounds = this.bounds.clone();
                    var newCoordinates;
                    if (shape.parent && !(shape.parent instanceof ORYX.Core.Canvas)) {
                        var upL = shape.parent.absoluteBounds().upperLeft();
                        relBounds.moveBy(-upL.x, -upL.y);
                    }

                    switch (this.way) {
                        // align the shapes in the requested way.
                        case ORYX.CONFIG.EDITOR_ALIGN_BOTTOM:
                            newCoordinates = {
                                x:shape.bounds.upperLeft().x,
                                y:relBounds.b.y - shape.bounds.height()
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_MIDDLE:
                            newCoordinates = {
                                x:shape.bounds.upperLeft().x,
                                y:(relBounds.a.y + relBounds.b.y - shape.bounds.height()) / 2
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_TOP:
                            newCoordinates = {
                                x:shape.bounds.upperLeft().x,
                                y:relBounds.a.y
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_LEFT:
                            newCoordinates = {
                                x:relBounds.a.x,
                                y:shape.bounds.upperLeft().y
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_CENTER:
                            newCoordinates = {
                                x:(relBounds.a.x + relBounds.b.x - shape.bounds.width()) / 2,
                                y:shape.bounds.upperLeft().y
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_RIGHT:
                            newCoordinates = {
                                x:relBounds.b.x - shape.bounds.width(),
                                y:shape.bounds.upperLeft().y
                            };
                            break;

                        case ORYX.CONFIG.EDITOR_ALIGN_SIZE:
                            if (shape.isResizable) {
                                this.orgPos[index] = {a:shape.bounds.upperLeft(), b:shape.bounds.lowerRight()};
                                this.setBounds(shape, shape.maximumSize);
                            }
                            break;
                    }

                    if (newCoordinates) {
                        var offset = {
                            x:shape.bounds.upperLeft().x - newCoordinates.x,
                            y:shape.bounds.upperLeft().y - newCoordinates.y
                        }
                        // Set the new position
                        shape.bounds.moveTo(newCoordinates);
                        this.plugin.layoutEdges(shape, shape.getAllDockedShapes(), offset);
                        //shape.update()
                    }
                }.bind(this));

                //this.facade.getCanvas().update();
                //this.facade.updateSelection();
            },
            rollback:function () {
                this.elements.each(function (shape, index) {
                    if (this.way == ORYX.CONFIG.EDITOR_ALIGN_SIZE) {
                        if (shape.isResizable) {
                            shape.bounds.set(this.orgPos[index]);
                        }
                    } else {
                        shape.bounds.moveTo(this.orgPos[index]);
                    }
                }.bind(this));

                //this.facade.getCanvas().update();
                //this.facade.updateSelection();
            }
        })

        var command = new commandClass(elements, bounds, maxHeight, maxWidth, parseInt(way), this);

        this.facade.executeCommands([command]);
    }
});



// object 编辑后保存功能

ORYX.Plugins.Save = Clazz.extend({

    facade:undefined,

    processURI:undefined,

    changeSymbol:"*",

    construct:function (facade) {
        this.facade = facade;
        this.facade.offer({
            'name':ORYX.I18N.Save.save,
            'functionality':this.save.bind(this, false),
            'group':ORYX.I18N.Save.group,
            'icon':ORYX.PATH + "images/disk.png",
            'description':ORYX.I18N.Save.saveDesc,
            'index':1,
            'minShape':0,
            'maxShape':0,
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:83, // s-Keycode
                    keyAction:ORYX.CONFIG.KEY_ACTION_UP
                }
            ]
        });

        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.keyCode === 83) {
                Event.stop(e);
            }
        }, false);


//        window.onbeforeunload = this.onUnLoad.bind(this);
        this.changeDifference = 0;

        // Register on event for executing commands --> store all commands in a stack
        // --> Execute
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE, function () {
            this.changeDifference++;
            this.updateTitle();
        }.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function () {
            this.changeDifference++;
            this.updateTitle();
        }.bind(this));
        // --> Rollback
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK, function () {
            this.changeDifference--;
            this.updateTitle();
        }.bind(this));

        //TODO very critical for load time performance!!!
        //this.serializedDOM = DataManager.__persistDOM(this.facade);
		
		 
    },

    updateTitle:function () {
        var value = window.document.title || document.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        if (this.changeDifference === 0 && value.startsWith(this.changeSymbol)) { //还原或保存过
            window.document.title = value.slice(1);
			//$(window).unbind('beforeunload');
			ORYX.webIsModify = false;
        } else if (this.changeDifference !== 0 && !value.startsWith(this.changeSymbol)) { //修改过的
            window.document.title = this.changeSymbol + "" + value;
			//$(window).unbind('beforeunload').bind('beforeunload', function() {return '修改的数据未保存，确定是否离开！';} );
			ORYX.webIsModify = true;
        }
    },

    onUnLoad:function () {
        if (this.changeDifference !== 0 || (this.facade.getModelMetaData()['new'] && this.facade.getCanvas().getChildShapes().size() > 0)) {
            if (confirm('有未保存的数据,请在你关闭之前保存,否则您所做的更改会丢失')) {
//                ORYX.Plugins.Save.prototype.save(false,this);
                alert("保存成功！");
            }
            else {
               alert('没有保存！');
            }
        }
    },
	//检查对象属性的值
	checkPropertyByType:function(elements){
		var	msg={},self = this;
		msg.result = true,result=null;
		
		var check = function(obj,res){
			if(typeof res === 'object'){
				obj.result = res.result;
				obj.info = res.msg;
			}else{
				obj.result = res;
			}
			return obj;
		}
		$.each(elements,function(){
			var nodeObj = this;
			var stencilId = nodeObj.stencil.id,tag=false;
			switch (stencilId){
				case "SequenceFlow":
					//self.checkSequenceFlow(nodeObj);
					result = self.checkSequenceFlow(nodeObj);
					msg = check(msg,result);
					if(!msg.result)tag=true;
					break;
				case "ExclusiveGateway":  //排他分支后的顺序流判断
					result = self.checkExclusiveGateway(nodeObj,elements);
					msg = check(msg,result);
					if(!msg.result)tag=true;
					break;
				case "ScriptTask":
					result = self.checkScriptTask(nodeObj);
					msg = check(msg,result);
					msg.info = "请检查脚本任务的对象属性," + msg.info+"";
					if(!msg.result)tag=true;
					break;
				case "ServiceTask":
					result = self.checkServiceTask(nodeObj);
					msg = check(msg,result);
					msg.info = "请检查服务任务的对象属性," + msg.info+"";
					if(!msg.result)tag=true;
					break;
				case "UserTask":
					result = self.checkUserTask(nodeObj,msg);
					msg = check(msg,result);
					msg.info = "请检查用户任务的对象属性," + msg.info+"";
					if(!msg.result)tag=true;
					break;
				case "StartTimerEvent":
					result = self.checkTimerEvent(nodeObj);
					msg = check(msg,result);
					msg.info = "请检查定时器启动事件的对象属性," + msg.info+"";
					if(!msg.result)tag=true;
					break;	
				case "BoundaryTimerEvent":
					result = self.checkTimerEvent(nodeObj);
					msg = check(msg,result);
					msg.info = "请检查定时器边界事件的对象属性," + msg.info+"";
					if(!msg.result){
						tag=true;
					}else{ //属性中的事件周期和取消当前任务属性不能同时设置
						var propertyData = nodeObj.properties;
						if(propertyData && propertyData["cancelactivity"]=="Yes" && propertyData["timercycledefinition"]!=""){
							msg.result=false;
							msg.info = "请检查定时器边界事件的对象属性,时间周期有设值则取消当前任务的值不可选是！";
							tag=true;
						}
					}
					break;
				case "CatchTimerEvent":
					result = self.checkTimerEvent(nodeObj,"CatchTimerEvent");
					msg = check(msg,result);
					msg.info = "请检查定时器中间事件的对象属性," + msg.info+"";
					if(!msg.result)tag=true;
					break;
				case "SubProcess": 	//递归检查子流程里面的对象
					if(nodeObj.childShapes && nodeObj.childShapes.length>0){
						self.topShapes = elements;
						msg = self.checkPropertyByType(nodeObj.childShapes);
						if(!msg.result){
							return false;
						}
						return msg;
					}
					break;
				
			}
			self.filterDoubleMake(nodeObj);
			
			if(tag)return false;
		});
		return msg;
	},
	
	//分析顺序流中的属性
	checkSequenceFlow:function(nodeObj){
		var propertyData = nodeObj.properties,
			defaultFlow = propertyData['defaultflow'],
			result=true,msg={};
		if(defaultFlow=="Default"){
			//设置为默认时需将流条件清空
			//propertyData['conditionsequenceflow'] = '';
			//设置为默认时需将流条件清空
			if(propertyData['conditionsequenceflow'] && propertyData['conditionsequenceflow'] != ''){
				msg = {
					result:false,
					msg: '请检查顺序流的属性，设置为默认流时流条件须为空!'
				};
				return msg;
			}
		}
		return true;
	}
	
	//检查定时器对象属性
	,checkTimerEvent:function(nodeObj,CatchTimerEvent){
		var propertyData = nodeObj.properties,result = false,info={};
		
		//把值中的英文转换成大写
		var changeUpperCase = function(propertyData,arr){
			$.each(arr,function(){
				if(propertyData[this]!=''){
					var tagReg = /^\$\{(.+\})?$/;    //是否 ${}变量
					if(!tagReg.test(propertyData[this])){  //不是变量才进行转换
						propertyData[this] = propertyData[this].toUpperCase();
					}
				}
			});
		}
		
		
		var arr=["timerdurationdefinition","timerdatedefinition","timercycledefinition"];
		changeUpperCase(propertyData,arr);
		
		var verifyTimerInput = function(val,reg,msg){
			var tagReg = /^\$\{(.+\})?$/;    //是否 ${}变量
			if(!tagReg.test(val)){  //不是变量才进行时间格式校验,
				if(!reg.test(val)){
					return {
						result:false,
						msg: msg
					};
				}
			}
			return false;
		}
		
		//PT5M或 ${time}
		if(propertyData['timerdurationdefinition'] && propertyData['timerdurationdefinition']!=""){
			var pv = propertyData['timerdurationdefinition'],
				reg = /^PT[\d]+[M|S|H]$/,
				result = verifyTimerInput(pv,reg,'持续时间填写格式有误!');
			if(result){
				return result
			}
		}
		//2001-12-23T23:23:12 或 ${time}
		if(propertyData['timerdatedefinition'] && propertyData['timerdatedefinition']!=""){
			var pv = propertyData['timerdatedefinition'],
				reg = /^2[\d]{3,3}-[\d]{2,2}-[\d]{2,2}T[\d]{2,2}:[\d]{2,2}:[\d]{2,2}$/,
				result = verifyTimerInput(pv,reg,'触发事件时间填写格式有误!');
			if(result){
				return result
			}
		}
		//R3/PT10H或 ${time}
		if(propertyData['timercycledefinition'] && propertyData['timercycledefinition']!=""){
			var pv = propertyData['timercycledefinition'],
				reg = /^R[\d]+\/PT[\d]+[M|S|H]$/,
				result = verifyTimerInput(pv,reg,'时间周期填写格式有误!');
			if(result){
				return result
			}
		}			
		var obj={
			'name':'名称'
		};
		result = this.checkAndKeyValueByObject(propertyData,obj);
		if(typeof result === 'object'){
			return result;
		}
		var msg= "持续时间、触发事件时间两项不能全部为空!";
		if(!CatchTimerEvent){
			msg = "持续时间、触发事件时间、时间周期 三项不能全部为空!";
		}
		result = this.checkOrKeyValueByObject(propertyData,arr,msg);	//不能全为空
		
		if(typeof result === 'object'){
			return result;
		}
		
		msg = "持续时间、触发事件时间两项只能填其中一项!";
		if(!CatchTimerEvent){
			msg = "持续时间、触发事件时间、时间周期 三项只能填其中一项!";
		}
		return this.checkOnlyOneKeyValueByObject(propertyData,arr,msg);			
	}
	
	//检查值是否是时间类型
	,checkValueIsDate:function(dateValue){
		var tmp = new Date(dateValue);
		if(isNaN(tmp.getDate())){
			return false;
		}
		return true;
	}
	
	//检查用户任务节点对象属性
	,checkUserTask:function(nodeObj,msg){
		var propertyData = nodeObj.properties,result = false;
		
		var obj={
			'name':'名称',
			'formkeydefinition':'表单模板',
			'usertaskassignment':'完成人'
		};
		var usertaskassignmentVal = propertyData['usertaskassignment'];  //完成人
		if(typeof usertaskassignmentVal == "object"){
			usertaskassignmentVal = JSON.stringify(propertyData['usertaskassignment']);
		}
		var patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
		
		if(usertaskassignmentVal!="\"\"" && patrn.test(usertaskassignmentVal)){
			return {
				result:false,
				msg: '完成人设置的值不能包含中文字符！'
			};
		}else{
			
			var tag = /assignee/g;
			if(tag.test(usertaskassignmentVal)){ //指定人
				var tmpObj = JSON.parse(usertaskassignmentVal);
				if(typeof tmpObj === "string"){
					tmpObj = JSON.parse(tmpObj);
				}
				var v = tmpObj["items"][0]["resourceassignmentexpr"];
				if(v.indexOf(",")> -1){
					return {
						result:false,
						msg: '完成人设置的指定人值不能包含,字符！'
					};
				}
			}
		
		
			result = true;
		}
		
		
		result = this.checkAndKeyValueByObject(propertyData,obj);
		if(typeof result !=='object'){
			if(propertyData['looptype']){
				if(propertyData['looptype']!=="None"){
					if(msg.isOnlyOne){
						return {
							result:false,
							msg: '目前一个流程中只能支持一个多实例类型！'
						};
					}
					msg.isOnlyOne = propertyData['looptype'];//给有设置过用个属性标识下
				}
				if(propertyData['looptype'] == 'Sequential'|| propertyData['looptype'] == 'Parallel'){ //MI顺序 or MI并行
					var sub_obj={
						'multiinstance_collection':'完成人集合'
						,'multiinstance_variable':'完成人变量'
						//,'multiinstance_condition':'完成条件'
					};
					result = this.checkAndKeyValueByObject(propertyData,sub_obj);
					if(typeof result === 'object'){
						return result;
					}
					
					//完成人变量 和 完成人设置须一致
					if(propertyData['multiinstance_variable']!=""){ 
						var objtmp = propertyData['usertaskassignment'];
						if(usertaskassignmentVal.indexOf("${"+propertyData['multiinstance_variable']+"}")<0){
							return {
								result:false,
								msg: '完成人变量和完成人设置不一致！'
							};
						}else{
							result = true;
						}
						//完成人变量
						if(propertyData['multiinstance_variable']=="countersignUsers"){ 
							return {
								result:false,
								msg: '完成人变量不能设置为countersignUsers ！'
							};
						}else{
							result = true;
						}
						
						
						//完成人设置类型不能选择候选岗位
						if(usertaskassignmentVal.indexOf("candidateGroups")>=0){
							return {
								result:false,
								msg: '完成人的类型不能选择候选岗位！'
							};
						}else{
							result = true;
						}
					}
					//需清空循环次数
					propertyData["multiinstance_cardinality"]="";
				}
				
				if(propertyData['looptype'] == 'Standard'){ //循环
					var sub_obj={
						'multiinstance_cardinality':'循环次数'
					};
					result = this.checkAndKeyValueByObject(propertyData,sub_obj);
					result = this.checkAndKeyValueByObject(propertyData,sub_obj);
					if(typeof result === 'object'){
						return result;
					}
					var reg = /\D/;
					if(reg.test(propertyData["multiinstance_cardinality"]+"")){
						return {
							result:false,
							msg: '循环次数只能输入数字！'
						};
					}
					propertyData["multiinstance_variable"]="";   			//完成人变量
					propertyData["multiinstance_collection"]="";   			//完成人集合
					propertyData["multiinstance_sequential"]=false;   		//循环顺序
					//propertyData["multiinstance_sequential"]=undefined;   	//循环顺序
				}
				if(propertyData['looptype'] == 'None'){ //空 
					propertyData["multiinstance_sequential"]="";   	//循环顺序
					propertyData["multiinstance_collection"]="";   	//完成人集合
					propertyData["multiinstance_cardinality"]="";  	//循环次数
					propertyData["multiinstance_variable"]="";   	//完成人变量
					propertyData["multiinstance_condition"]="";   	//完成人条件
				}
			}
		}
		
		return result;
	},
	
	//过滤双引号的值问题
	filterDoubleMake:function(nodeObj){
		var propertyData = nodeObj.properties;  	//流程变量
		if(propertyData["formproperties"]=="\"\""){
			propertyData["formproperties"] = "";
		}
		if(propertyData["servicetaskfields"]=="\"\""){  //类字段
			propertyData["servicetaskfields"] = "";
		}
	},
	
	
	//检查脚本任务节点对象属性
	checkScriptTask:function(nodeObj){
		var propertyData = nodeObj.properties;
		var obj={
			'name':'名称',
			'scriptformat':'脚本格式',
			'scripttext':'脚本'
		};
		
		return this.checkAndKeyValueByObject(propertyData,obj);
	},
	
	//检查服务任务节点对象属性
	checkServiceTask:function(nodeObj){
		var propertyData = nodeObj.properties;
		var obj={
			'name':'名称',
			'documentation':'服务号',
			'servicetaskexpression':'表达式',
			'servicetaskresultvariable':'结果变量名称'
			//,'servicetaskfields':'类字段'
		};
		
		return this.checkAndKeyValueByObject(propertyData,obj);
	}
	
	//根据传来的key检查value不能为空
	,checkAndKeyValueByObject:function(propertyData,obj){
		var result = false,info={};
		for(var key in obj){
			if(propertyData[key] && propertyData[key]!="" && propertyData[key]!="\"\""){
				result = true;
			}else{
				info.result = false;
				info.msg = obj[key] +'不能为空！';
				result = info
				break;
			}
		}
		return result;
	}
	//判断只要有一项就通过
	,checkOrKeyValueByObject:function(propertyData,arr,msg){
		var result = false,info={};
		$.each(arr,function(){
			if(propertyData[this] && propertyData[this]!="" && propertyData[this]!="\"\""){
				result = true;
				return false;
			}
		})
		if(!result){
			info.result = false;
			info.msg = msg;
			result = info;
		}
		return result;
	}
	
	//判断只能有一项
	,checkOnlyOneKeyValueByObject:function(propertyData,arr,msg){
		var result = false,info={},index=0;
		$.each(arr,function(){
			if(propertyData[this] && propertyData[this]!="" && propertyData[this]!="\"\""){
				index++;
			}
		});
		if(index!=1){
			info.result = false;
			info.msg = msg;
			result = info;
		}else{
			result = true;
		}
		return result;
	}
	
	//检查排他分支后两条顺序流的流条件(默认的流可以为空)
	,checkExclusiveGateway:function(nodeObj,elements){
		var outgoing = nodeObj.outgoing,result=true,self=this,msg={};
		
		if(outgoing){
			if(outgoing.length>1){ //1条顺序流不需要判断
				var tmp = false,
					countDeafault=0;   //计数默认流个数
				$.each(outgoing,function(){
					var outer = this
						node = self.facade.getCanvas().getChildShapeByResourceId(outer.resourceId),
						propertyData = node.properties,
						defaultFlow = propertyData['oryx-defaultflow'];
					if(defaultFlow=="Default"){
						countDeafault++;
						if(countDeafault >1){
							tmp = true;
							msg = {
								result:false,
								msg: '请检查排他分支后顺序流，默认流只能设置一条！'
							};
							return false;
						}
						//设置为默认时需将流条件清空
						//propertyData['oryx-conditionsequenceflow'] = '';
					}
					if(propertyData['oryx-conditionsequenceflow'] =='' && defaultFlow!="Default"){
						tmp = true;
						msg = {
							result:false,
							msg: '请检查排他分支后顺序流的流条件属性不能空！'
						};
						
						return false;
					}
				});
				if(tmp)return msg;;
			}
		}
		return result;
	}
	
    ,saveSynchronously:function (forceNew, modelInfo) {
       if(!modelInfo || !modelInfo.model){
			confirm('提示', '您的服务器会话已过期，是否重新登录?', function (flag) {
					if (flag) {
						try {
							top.window.location.reload();
						} catch (e) {
						}
					} else {
						window.location.replace("about:blank");
					}
				});
			return
		}
        var modelMeta = this.facade.getModelMetaData();
        var reqURI = modelMeta.modelHandler;
        // Get the stencilset
        var ss = this.facade.getStencilSets().values()[0]
        var typeTitle = ss.title();
        // Define Default values
        var name = (modelMeta["new"] && modelMeta.name === "") ? ORYX.I18N.Save.newProcess : modelInfo.name;
		
		var defaultData = {title:Signavio.Utils.escapeHTML(name || "")
						, summary:Signavio.Utils.escapeHTML(modelInfo.description || "")
						, type:typeTitle, url:reqURI
						, namespace:modelInfo.model.stencilset.namespace, comment:'' }
        // Create the callback for the template
        callback = function () {
            // raise loading enable event
            var title = defaultData.title;
            var summary = defaultData.summary;
            var namespace = defaultData.namespace;
            modelMeta.name = title;
            modelMeta.description = summary;
            modelMeta.parent = modelInfo.parent;
            modelMeta.namespace = namespace;
            //added changing title of page after first save, but with the changed flag
            if (!forceNew) window.document.title = this.changeSymbol + title + " | " + ORYX.CONFIG.APPNAME;
            // Get json
			
            var json = this.facade.getJSON();
            var flowName = json['properties'].name;
            var process_id = json['properties'].process_id;
			if(this.facade.checkPropertyGridIsValid()){
				removeload(); 
				alert('提示', "请检查对象属性是否填写正确！");
                delete this.saving;
                return;
			}
			
            if (flowName.length == 0) {
				removeload(); 
                alert('提示', "名称不能为空！");
                delete this.saving;
                return;
            }
			if (flowName == '""') {
				removeload(); 
                alert('提示', "名称录入不规范！");
                delete this.saving;
                return;
            }
            if (process_id.length == 0) {
				removeload(); 
                alert('提示', "流程标识不能为空！");
                delete this.saving;
                return;
            }
			var msg = this.checkPropertyByType(json.childShapes);
			if(!msg.result){
				removeload(); 
				alert('提示', msg.info);
                delete this.saving;
                return;
			}
			
            var glossary = [];
            if (this.facade.hasGlossaryExtension) {
				$.extend(json, ORYX.Core.AbstractShape.JSONHelper);
                var allNodes = json.getChildShapes(true);
                var orders = {};
                this.facade.getGlossary().each(function (entry) {
                    if ("undefined" == typeof orders[entry.shape.resourceId + "-" + entry.property.prefix() + "-" + entry.property.id()]) {
                        orders[entry.shape.resourceId + "-" + entry.property.prefix() + "-" + entry.property.id()] = 0;
                    }
                    // Add entry
                    glossary.push({
                        itemId:entry.glossary,
                        elementId:entry.shape.resourceId,
                        propertyId:entry.property.prefix() + "-" + entry.property.id(),
                        order:orders[entry.shape.resourceId + "-" + entry.property.prefix() + "-" + entry.property.id()]++
                    });
                    // Replace SVG
                    if (entry.property.refToView() && entry.property.refToView().length > 0) {
                        entry.property.refToView().each(function (ref) {
                            var node = $(entry.shape.id + "" + ref);
                            if (node){
                                //node.setAttribute("oryx:glossaryIds", entry.glossary + ";")
								node.attr("oryx:glossaryIds", entry.glossary + ";");
							}
                        })
                    }
                });//}.bind(this))
                // Set the json as string
                json = json.serialize();
            } else {
                var childShapes = json.childShapes;
                for (var i = 0; i < childShapes.length; i++) {
                    if (childShapes[i].stencil.id.toLowerCase() == "sequenceflow") {
                        childShapes[i].label = {};
                        childShapes[i].label.x = 0;
                        childShapes[i].label.y = -10;
                        childShapes[i].label.height = 0;
                        childShapes[i].label.width = 0;
                    }
                }
				json = JSON.stringify(json);
            }
            // Set the glossaries as string
            //glossary = Ext.encode(glossary);
			glossary = JSON.stringify(glossary);
            var selection = this.facade.getSelection();
            this.facade.setSelection([]);
            // Get the serialized svg image source
            var svgClone = this.facade.getCanvas().getSVGRepresentation(true);
            this.facade.setSelection(selection);
            if (this.facade.getCanvas().properties["oryx-showstripableelements"] === false) {
                var stripOutArray = svgClone.getElementsByClassName("stripable-element");
                for (var i = stripOutArray.length - 1; i >= 0; i--) {
                    stripOutArray[i].parentNode.removeChild(stripOutArray[i]);
                }
            }
            // Remove all forced stripable elements
            //var stripOutArray = svgClone.getElementsByClassName("stripable-element-force");
            var stripOutArray = document.getElementsByClassName("stripable-element-force", svgClone);
            for (var i = stripOutArray.length - 1; i >= 0; i--) {
                stripOutArray[i].parentNode.removeChild(stripOutArray[i]);
            }
            // Parse dom to string
            var svgDOM = DataManager.serialize(svgClone);
            svgDOM = svgDOM.replace(/path2396/g, "").replace(/crosspath2/g, "").replace(/crosspath/g, "").replace(/\"\"/g, "").replace(/=\"url\(\"/g, "=\"url(").replace(/url\(\"#/g, "");
            var params = {
                json_xml:json,
                svg_xml:svgDOM,
                name:title,
                type:defaultData.type,
                parent:modelMeta.parent,
                description:summary,
                glossary_xml:glossary,
                namespace:modelMeta.namespace,
                //views:Ext.util.JSON.encode(modelMeta.views || [])
				views:JSON.stringify(modelMeta.views || [])
            };

            var successFn = function (transport) {   //保存成功后执行的函数
				removeload(); 
				var message = transport.substring(transport.indexOf('message') + 10, transport.length - 2)
				alert(message);
              
				// Reset changes
				this.changeDifference = 0;
				this.updateTitle();
				
				if (modelMeta["new"]) {
					modelMeta["new"] = false;
				}
                
                delete this.saving;
            }.bind(this);

            var failure = function (transport) {
                // raise loading disable event.
                this.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_LOADING_DISABLE
                });
				removeload(); 
				//var message = transport.substring(transport.indexOf('message') + 10, transport.length - 2)
				alert('错误', transport["statusText"]);
                delete this.saving;
            }.bind(this);
			
			 
            if (modelMeta["new"]) { 
                // Send the request out					
                params.id = modelMeta.modelId;
				
                this.sendSaveRequest('POST', reqURI, params, true, successFn, failure);
            } else if (forceNew) {   
                this.sendSaveRequest('POST', reqURI, params, true, successFn, failure);
            } else {
                params.id = modelMeta.modelId;
                // Send the request out
                this.sendSaveRequest('PUT', reqURI, params, false, successFn, failure);
				//测试的：
				//alert("ok");delete this.saving;
				
            }
        }.bind(this);
        callback();
    },

    /**
     * Get the model data and call the success callback
     *
     * @param {Function} success Success callback
     */
    retrieveModelData:function (success) {
		onloading();
        var onComplete = function () {
            removeload(); 
        }

        var modelMeta = this.facade.getModelMetaData();
		
		var self = this;
		var modelUrl = "../../kjdp_modeler?id=" + modelMeta.modelId + "&method=getModelData";
		
		$.ajax({
			type:"GET"
			,url:modelUrl
			,dataType:'json'
			//,url:source
			,async: true 
			,success:function(result){
				modelInfo = result;
                //onComplete();
                success(modelInfo);
			},
			error:function(e){
				alert('提示', "保存失败！请检查该流程是否已被删除！");
				self.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_LOADING_DISABLE
                });
                delete self.saving;
                onComplete();
			}
			
		});
		
    },

    sendSaveRequest:function (method, url, params, forceNew, success, failure) {
        //for(var i in arguments) console.log(arguments[i]);
        var saveUri;
        if (forceNew == false) {
            saveUri = "../../kjdp_modeler?id=" + params.id + "&method=saveModelData";
        } else {
            saveUri = "../../kjdp_modeler?method=newModel";
        }
		
		
		$.ajax({
			url:saveUri,
			type:method,
			timeout:1800000,
			headers:{'Accept':"application/json", 'Content-Type':'charset=UTF-8'},
			data:params,
			dataType:'text',
			success:success,
			error:failure
		});
       
    },

    /**
     * Saves the current process to the server.
     */
    save:function (forceNew, event) {
	
        // Check if currently is saving
        if (this.saving) {
            return;
        }
        this.saving = true;

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_ABOUT_TO_SAVE
        });

	
        // ... save synchronously
        window.setTimeout((function () {

            var meta = this.facade.getModelMetaData();
			
            // Check if new...
            if (meta["new"]) {  // undefined
                this.saveSynchronously(forceNew, meta);
            } else {
				//Ext.getBody().mask(ORYX.I18N.Save.retrieveData, "x-waiting-box");  //
                // ...otherwise, get the current model data first.
                this.retrieveModelData(this.saveSynchronously.bind(this, forceNew))
            }
        }).bind(this), 10);


        return true;
    }
});

// object

ORYX.Plugins.View = {
    /** @lends ORYX.Plugins.View.prototype */
    facade:undefined,

    construct:function (facade, ownPluginData) {
        this.facade = facade;
        //Standard Values
        this.zoomLevel = 1.0;
        this.maxFitToScreenLevel = 1.5;
        this.minZoomLevel = 0.1;
        this.maxZoomLevel = 2.5;
        this.diff = 5; //difference between canvas and view port, s.th. like toolbar??

        //Read properties
		//ownPluginData.properties.each(function (property) {
		var self = this;
        $.map(ownPluginData.properties,function (property) {
            if (property.zoomLevel) {
                this.zoomLevel = Number(1.0);
            }
            if (property.maxFitToScreenLevel) {
                this.maxFitToScreenLevel = Number(property.maxFitToScreenLevel);
            }
            if (property.minZoomLevel) {
                this.minZoomLevel = Number(property.minZoomLevel);
            }
            if (property.maxZoomLevel) {
                this.maxZoomLevel = Number(property.maxZoomLevel);
            }
		});
        //}.bind(this));


        /* Register zoom in */
        this.facade.offer({
            'name':ORYX.I18N.View.zoomIn,
            'functionality':this.zoom.bind(this, [1.0 + ORYX.CONFIG.ZOOM_OFFSET]),
            'group':ORYX.I18N.View.group,
            'icon':ORYX.PATH + "images/magnifier_zoom_in.png",
            'description':ORYX.I18N.View.zoomInDesc,
            'index':1,
            'minShape':0,
            'maxShape':0,
            'isEnabled':function () {
                return this.zoomLevel < this.maxZoomLevel
            }.bind(this)});

        /* Register zoom out */
        this.facade.offer({
            'name':ORYX.I18N.View.zoomOut,
            'functionality':this.zoom.bind(this, [1.0 - ORYX.CONFIG.ZOOM_OFFSET]),
            'group':ORYX.I18N.View.group,
            'icon':ORYX.PATH + "images/magnifier_zoom_out.png",
            'description':ORYX.I18N.View.zoomOutDesc,
            'index':2,
            'minShape':0,
            'maxShape':0,
            'isEnabled':function () {
                return this._checkSize()
            }.bind(this)});

        /* Register zoom standard */
        this.facade.offer({
            'name':ORYX.I18N.View.zoomStandard,
            'functionality':this.setAFixZoomLevel.bind(this, 1),
            'group':ORYX.I18N.View.group,
            'icon':ORYX.PATH + "images/zoom_standard.png",
            'cls':'icon-large',
            'description':ORYX.I18N.View.zoomStandardDesc,
            'index':3,
            'minShape':0,
            'maxShape':0,
            'isEnabled':function () {
                return this.zoomLevel != 1
            }.bind(this)
        });

        /* Register zoom fit to model */
        this.facade.offer({
            'name':ORYX.I18N.View.zoomFitToModel,
            'functionality':this.zoomFitToModel.bind(this),
            'group':ORYX.I18N.View.group,
            'icon':ORYX.PATH + "images/image.png",
            'description':ORYX.I18N.View.zoomFitToModelDesc,
            'index':4,
            'minShape':0,
            'maxShape':0
        });
    },

    /**
     * It sets the zoom level to a fix value and call the zooming function.
     *
     * @param {Number} zoomLevel
     *             the zoom level
     */
    setAFixZoomLevel:function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        this._checkZoomLevelRange();
        this.zoom(1);
    },

    /**
     * It does the actual zooming. It changes the viewable size of the canvas
     * and all to its child elements.
     *
     * @param {Number} factor
     *         the factor to adjust the zoom level
     */
    zoom:function (factor) {
        // TODO: Zoomen auf allen Objekten im SVG-DOM

        this.zoomLevel *= factor;
        var scrollNode = this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
        var canvas = this.facade.getCanvas();
        var newWidth = canvas.bounds.width() * this.zoomLevel;
        var newHeight = canvas.bounds.height() * this.zoomLevel;

        /* Set new top offset */
        var offsetTop = (canvas.node.parentNode.parentNode.parentNode.offsetHeight - newHeight) / 2.0;
        offsetTop = offsetTop > 20 ? offsetTop - 20 : 0;
        canvas.node.parentNode.parentNode.style.marginTop = offsetTop + "px";
        offsetTop += 5;
        canvas.getHTMLContainer().style.top = offsetTop + "px";

        /*readjust scrollbar*/
		
        var newScrollTop = scrollNode.scrollTop - Math.round(($(canvas.getHTMLContainer().parentNode).height() - newHeight) / 2) + this.diff;
        var newScrollLeft = scrollNode.scrollLeft - Math.round(($(canvas.getHTMLContainer().parentNode).width() - newWidth) / 2) + this.diff;

        /* Set new Zoom-Level */
        canvas.setSize({width:newWidth, height:newHeight}, true);

        /* Set Scale-Factor */
        canvas.node.setAttributeNS(null, "transform", "scale(" + this.zoomLevel + ")");

        /* Refresh the Selection */
        this.facade.updateSelection();
        scrollNode.scrollTop = newScrollTop;
        scrollNode.scrollLeft = newScrollLeft;

        /* Update the zoom-level*/
        canvas.zoomLevel = this.zoomLevel;
    },


    /**
     * It calculates the zoom level to fit whole model into the visible area
     * of the canvas. Than the model gets zoomed and the position of the
     * scroll bars are adjusted.
     *
     */
    zoomFitToModel:function () {

        /* Get the size of the visible area of the canvas */
        var scrollNode = this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
        var visibleHeight = $(scrollNode).height() - 30;
        var visibleWidth = $(scrollNode).width() - 30;

        var nodes = this.facade.getCanvas().getChildShapes();

        if (!nodes || nodes.length < 1) {
            return false;
        }

        /* Calculate size of canvas to fit the model */
        var bounds = nodes[0].absoluteBounds().clone();
        nodes.each(function (node) {
            bounds.include(node.absoluteBounds().clone());
        });


        /* Set new Zoom Level */
        var scaleFactorWidth = visibleWidth / bounds.width();
        var scaleFactorHeight = visibleHeight / bounds.height();

        /* Choose the smaller zoom level to fit the whole model */
        var zoomFactor = scaleFactorHeight < scaleFactorWidth ? scaleFactorHeight : scaleFactorWidth;

        /*Test if maximum zoom is reached*/
        if (zoomFactor > this.maxFitToScreenLevel) {
            zoomFactor = this.maxFitToScreenLevel
        }
        /* Do zooming */
        this.setAFixZoomLevel(zoomFactor);

        /* Set scroll bar position */
        scrollNode.scrollTop = Math.round(bounds.upperLeft().y * this.zoomLevel) - 5;
        scrollNode.scrollLeft = Math.round(bounds.upperLeft().x * this.zoomLevel) - 5;

    },

    /**
     * It checks if the zoom level is less or equal to the level, which is required
     * to schow the whole canvas.
     *
     * @private
     */
    _checkSize:function () {
        var canvasParent = this.facade.getCanvas().getHTMLContainer().parentNode;
        //var minForCanvas = Math.min((canvasParent.parentNode.getWidth() / canvasParent.getWidth()), (canvasParent.parentNode.getHeight() / canvasParent.getHeight()));
		var minForCanvas = Math.min(($(canvasParent.parentNode).width() / $(canvasParent).width()), ($(canvasParent.parentNode).height() / $(canvasParent).height()));
        return 1.05 > minForCanvas;

    },
    /**
     * It checks if the zoom level is included in the definined zoom
     * level range.
     *
     * @private
     */
    _checkZoomLevelRange:function () {
        /*var canvasParent=this.facade.getCanvas().getHTMLContainer().parentNode;
         var maxForCanvas= Math.max((canvasParent.parentNode.getWidth()/canvasParent.getWidth()),(canvasParent.parentNode.getHeight()/canvasParent.getHeight()));
         if(this.zoomLevel > maxForCanvas) {
         this.zoomLevel = maxForCanvas;
         }*/
        if (this.zoomLevel < this.minZoomLevel) {
            this.zoomLevel = this.minZoomLevel;
        }

        if (this.zoomLevel > this.maxZoomLevel) {
            this.zoomLevel = this.maxZoomLevel;
        }
    }
};

ORYX.Plugins.View = Clazz.extend(ORYX.Plugins.View);

// object
ORYX.Plugins.AddDocker = Clazz.extend({

    /**
     *    Constructor
     *    @param {Object} Facade: The Facade of the Editor
     */
    construct:function (facade) {
        this.facade = facade;

        this.facade.offer({
            'name':ORYX.I18N.AddDocker.add,
            'functionality':this.enableAddDocker.bind(this),
            'group':ORYX.I18N.AddDocker.group,
            'icon':ORYX.PATH + "images/vector_add.png",
            'description':ORYX.I18N.AddDocker.addDesc,
            'index':1,
            'toggle':true,
            'minShape':0,
            'maxShape':0});


        this.facade.offer({
            'name':ORYX.I18N.AddDocker.del,
            'functionality':this.enableDeleteDocker.bind(this),
            'group':ORYX.I18N.AddDocker.group,
            'icon':ORYX.PATH + "images/vector_delete.png",
            'description':ORYX.I18N.AddDocker.delDesc,
            'index':2,
            'toggle':true,
            'minShape':0,
            'maxShape':0});

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
    },

    enableAddDocker:function (button, pressed) {
        //FIXME This should be done while construct, but this isn't possible right now!
		
        this.addDockerButton = $(button.target);
		if(this.addDockerButton.attr("toggle")=='true'){
			this.addDockerButton.parent().removeClass("x-btn-bg");
			this.addDockerButton.attr("toggle",false);
			//this.addDockerButton = null;
			return;
		}
		
		this.addDockerButton.attr("toggle",true);
		
		this.addDockerButton.parent().addClass("x-btn-bg");
        // Unpress deleteDockerButton
		
        if (this.deleteDockerButton){
			this.deleteDockerButton.attr("toggle",false);
			this.deleteDockerButton.parent().removeClass("x-btn-bg");
			this.deleteDockerButton = false;
		}
    },
    enableDeleteDocker:function (button, pressed) {
        //FIXME This should be done while construct, but this isn't possible right now!
        this.deleteDockerButton = $(button.target);
		
		if(this.deleteDockerButton.attr("toggle")=='true'){
			this.deleteDockerButton.parent().removeClass("x-btn-bg");
			this.deleteDockerButton.attr("toggle",false);
			//this.deleteDockerButton = null;
			return;
			
		}
		
		this.deleteDockerButton.attr("toggle",true);
		this.deleteDockerButton.parent().addClass("x-btn-bg");
		
        // Unpress addDockerButton
        if (this.addDockerButton){
			this.addDockerButton.attr("toggle",false);
			this.addDockerButton.parent().removeClass("x-btn-bg");
            this.addDockerButton = false;
		}
    },

    enabledAdd:function () {
		var result = false;
		if(this.addDockerButton){
			result = this.addDockerButton.attr("toggle")=='true' ? true : false;
		}
        return result;
		
    },
    enabledDelete:function () {
		var result = false;
		if(this.deleteDockerButton){
			result = this.deleteDockerButton.attr("toggle")=='true' ? true : false;
		}
        return result;
    },

    /**
     * MouseDown Handler
     *
     */
    handleMouseDown:function (event, uiObj) {
        if (this.enabledAdd() && uiObj instanceof ORYX.Core.Edge) {
            this.newDockerCommand({
                edge:uiObj,
                position:this.facade.eventCoordinates(event)
            });
        } else if (this.enabledDelete() &&
            uiObj instanceof ORYX.Core.Controls.Docker &&
            uiObj.parent instanceof ORYX.Core.Edge) {
			
            this.newDockerCommand({
                edge:uiObj.parent,
                docker:uiObj
            });
        } else if (this.enabledAdd()) {
            //this.addDockerButton.toggle(false);
			//this.addDockerButton.attr("toggle",false);
        } else if (this.enabledDelete()) {
            //this.deleteDockerButton.toggle(false);
			//this.deleteDockerButton.attr("toggle",false);
        }
    },

    // Options: edge (required), position (required if add), docker (required if delete)
    newDockerCommand:function (options) {
		
	
        if (!options.edge)
            return;
        var commandClass = ORYX.Core.Command.extend({
            construct:function (addEnabled, deleteEnabled, edge, docker, pos, facade) {
                this.addEnabled = addEnabled;
                this.deleteEnabled = deleteEnabled;
                this.edge = edge;
                this.docker = docker;
                this.pos = pos;
                this.facade = facade;
                //this.index = docker.parent.dockers.indexOf(docker);
            },
            execute:function () {
                if (this.addEnabled) {
                    if (!this.docker) {
                        this.docker = this.edge.addDocker(this.pos);
                        //this.index = this.edge.dockers.indexOf(this.docker);
						this.index = $.inArray(this.docker,this.edge.dockers);
                    } else {
                        this.edge.add(this.docker, this.index);
                    }
                }else if (this.deleteEnabled) {
				
                    this.index = this.edge.dockers.indexOf(this.docker);
                    this.pos = this.docker.bounds.center();
                    this.edge.removeDocker(this.docker);
                }
				
                //this.edge.getLabels().invoke("show");
				$.map(this.edge.getLabels(),function(lable){
					lable.show();
				});
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            },
            rollback:function () {
                if (this.addEnabled) {
                    if (this.docker instanceof ORYX.Core.Controls.Docker) {
                        this.edge.removeDocker(this.docker);
                    }
                }
                else if (this.deleteEnabled) {
                    this.edge.add(this.docker, this.index);
                }
                //this.edge.getLabels().invoke("show");
				$.map(this.edge.getLabels(),function(lable){
					lable.show();
				});
				
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            }
        })
        var command = new commandClass(this.enabledAdd(), this.enabledDelete(), options.edge, options.docker, options.position, this.facade);

        this.facade.executeCommands([command]);
    }
});


//ray  对象 编辑的复制粘贴
ORYX.Plugins.Edit = Clazz.extend({

    construct:function (facade) {

        this.facade = facade;
        this.clipboard = new ORYX.Plugins.Edit.ClipBoard();

        //this.facade.registerOnEvent(ORYX.CONFIG.EVENT_KEYDOWN, this.keyHandler.bind(this));

        this.facade.offer({
            name:ORYX.I18N.Edit.cut,
            description:ORYX.I18N.Edit.cutDesc,
            icon:ORYX.PATH + "images/cut.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:88,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.callEdit.bind(this, this.editCut),
            group:ORYX.I18N.Edit.group,
            index:1,
            minShape:1
        });

        this.facade.offer({
            name:ORYX.I18N.Edit.copy,
            description:ORYX.I18N.Edit.copyDesc,
            icon:ORYX.PATH + "images/page_copy.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:67,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.callEdit.bind(this, this.editCopy, [true, false]),
            group:ORYX.I18N.Edit.group,
            index:2,
            minShape:1
        });

        this.facade.offer({
            name:ORYX.I18N.Edit.paste,
            description:ORYX.I18N.Edit.pasteDesc,
            icon:ORYX.PATH + "images/page_paste.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:86,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.callEdit.bind(this, this.editPaste),
            isEnabled:this.clipboard.isOccupied.bind(this.clipboard),
            group:ORYX.I18N.Edit.group,
            index:3,
            minShape:0,
            maxShape:0
        });
        this.facade.offer({
            name:ORYX.I18N.Edit.del,
            description:ORYX.I18N.Edit.delDesc,
            icon:ORYX.PATH + "images/cross.png",
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:8,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                },
                {
                    keyCode:46,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.callEdit.bind(this, this.editDelete),
            group:ORYX.I18N.Edit.group,
            index:4,
            minShape:1
        });
    },

    callEdit:function (fn, args) {
        window.setTimeout(function () {
            fn.apply(this, (args instanceof Array ? args : []));
        }.bind(this), 1);
    },

    /**
     * Handles the mouse down event and starts the copy-move-paste action, if
     * control or meta key is pressed.
     */
    handleMouseDown:function (event) {
        if (this._controlPressed) {
            this._controlPressed = false;
            this.editCopy();
            this.editPaste();
            event.forceExecution = true;
            this.facade.raiseEvent(event, this.clipboard.shapesAsJson);

        }
    },

    /**
     * The key handler for this plugin. Every action from the set of cut, copy,
     * paste and delete should be accessible trough simple keyboard shortcuts.
     * This method checks whether any event triggers one of those actions.
     *
     * @param {Object} event The keyboard event that should be analysed for
     *     triggering of this plugin.
     */
//    keyHandler: function(event){
//        //TODO document what event.which is.
//
//        ORYX.Log.debug("edit.js handles a keyEvent.");
//
//        // assure we have the current event.
//        if (!event)
//            event = window.event;
//
//
//        // get the currently pressed key and state of control key.
//        var pressedKey = event.which || event.keyCode;
//        var ctrlPressed = event.ctrlKey;
//
//        // if the object is to be deleted, do so, and return immediately.
//        if ((pressedKey == ORYX.CONFIG.KEY_CODE_DELETE) ||
//        ((pressedKey == ORYX.CONFIG.KEY_CODE_BACKSPACE) &&
//        (event.metaKey || event.appleMetaKey))) {
//
//            ORYX.Log.debug("edit.js deletes the shape.");
//            this.editDelete();
//            return;
//        }
//
//         // if control key is not pressed, we're not interested anymore.
//         if (!ctrlPressed)
//         return;
//
//         // when ctrl is pressed, switch trough the possibilities.
//         switch (pressedKey) {
//
//	         // cut.
//	         case ORYX.CONFIG.KEY_CODE_X:
//	         this.editCut();
//	         break;
//
//	         // copy.
//	         case ORYX.CONFIG.KEY_CODE_C:
//	         this.editCopy();
//	         break;
//
//	         // paste.
//	         case ORYX.CONFIG.KEY_CODE_V:
//	         this.editPaste();
//	         break;
//         }
//    },

    /**
     * Returns a list of shapes which should be considered while copying.
     * Besides the shapes of given ones, edges and attached nodes are added to the result set.
     * If one of the given shape is a child of another given shape, it is not put into the result.
     */
    getAllShapesToConsider:function (shapes) {
        var shapesToConsider = []; // only top-level shapes
        var childShapesToConsider = []; // all child shapes of top-level shapes

        shapes.each(function (shape) {
            //Throw away these shapes which have a parent in given shapes
            /*isChildShapeOfAnother = shapes.any(function (s2) {
                return s2.hasChildShape(shape);
            });*/
			var tmp=false;
			$.map(shapes,function(s2){
				if(s2.hasChildShape(shape)){
					tmp = true;
					return false;
				}
			});
			isChildShapeOfAnother = tmp;
            if (isChildShapeOfAnother) return;

            // This shape should be considered
            shapesToConsider.push(shape);
            // Consider attached nodes (e.g. intermediate events)
            if (shape instanceof ORYX.Core.Node) {
                var attached = shape.getOutgoingNodes();
                /*attached = attached.findAll(function (a) {
                    return !shapes.include(a)
                });*/
				var arr = [];
				$.map(attached,function(a){
					if(!shapes.include(a)){
						arr.push(a);
					}
				})
				attached = arr;
				
                shapesToConsider = shapesToConsider.concat(attached);
            }

            childShapesToConsider = childShapesToConsider.concat(shape.getChildShapes(true));
        }.bind(this));

        // All edges between considered child shapes should be considered
        // Look for these edges having incoming and outgoing in childShapesToConsider
        /*var edgesToConsider = this.facade.getCanvas().getChildEdges().select(function (edge) {
            // Ignore if already added
            if (shapesToConsider.include(edge)) return false;
            // Ignore if there are no docked shapes
            if (edge.getAllDockedShapes().size() === 0) return false;
            // True if all docked shapes are in considered child shapes
            return edge.getAllDockedShapes().all(function (shape) {
                // Remember: Edges can have other edges on outgoing, that is why edges must not be included in childShapesToConsider
                return shape instanceof ORYX.Core.Edge || childShapesToConsider.include(shape);
            });
        });*/
		var arr = [];
		$.map(this.facade.getCanvas().getChildEdges(),function(edge){
			if (shapesToConsider.include(edge)) return false;
            // Ignore if there are no docked shapes
            if (edge.getAllDockedShapes().size() === 0) return false;
			
			var tmp = true;
			$.map(edge.getAllDockedShapes(),function (shape) {
                if(shape instanceof ORYX.Core.Edge || childShapesToConsider.include(shape)){
					tmp = false;
					return false;
				}
            });
			if(!tmp){
				arr.push(edge);
			}
		});
		var edgesToConsider = arr;
		
		
		
        shapesToConsider = shapesToConsider.concat(edgesToConsider);

        return shapesToConsider;
    },

    /**
     * Performs the cut operation by first copy-ing and then deleting the
     * current selection.
     */
    editCut:function () {
        //TODO document why this returns false.
        //TODO document what the magic boolean parameters are supposed to do.

        this.editCopy(false, true);
        this.editDelete(true);
        return false;
    },

    /**
     * Performs the copy operation.
     * @param {Object} will_not_update ??
     */
    editCopy:function (will_update, useNoOffset) {
        var selection = this.facade.getSelection();

        //if the selection is empty, do not remove the previously copied elements
        if (selection.length == 0) return;
		
        this.clipboard.refresh(selection, this.getAllShapesToConsider(selection), this.facade.getCanvas().getStencil().stencilSet().namespace(), useNoOffset);

        if (will_update) this.facade.updateSelection();
    },

    /**
     * Performs the paste operation.
     */
    editPaste:function () {
        // Create a new canvas with childShapes
        //and stencilset namespace to be JSON Import conform
        var canvas = {
            childShapes:this.clipboard.shapesAsJson,
            stencilset:{
                namespace:this.clipboard.SSnamespace
            }
        }
        // Apply json helper to iterate over json object
        //Ext.apply(canvas, ORYX.Core.AbstractShape.JSONHelper);
		
		//return false;
		
		canvas = $.extend(true,{},canvas, ORYX.Core.AbstractShape.JSONHelper);
		
        var childShapeResourceIds = canvas.getChildShapes(true).pluck("resourceId");
        var outgoings = {};
        // Iterate over all shapes
        canvas.eachChild(function (shape, parent) {
            // Throw away these references where referenced shape isn't copied
            //shape.outgoing = shape.outgoing.select(function (out) {
			var tmp =[];
			$.map(shape.outgoing,function (out) {
                if(childShapeResourceIds.include(out.resourceId)){
					tmp.push(out);
				}
            });
			
			shape.outgoing = tmp;
            shape.outgoing.each(function (out) {
			
                if (!outgoings[out.resourceId]) {
                    outgoings[out.resourceId] = []
                }
                outgoings[out.resourceId].push(shape)
            });

            return shape;
        }.bind(this), true, true);


        // Iterate over all shapes
        canvas.eachChild(function (shape, parent) {

            // Check if there has a valid target
            if (shape.target && !(childShapeResourceIds.include(shape.target.resourceId))) {
                shape.target = undefined;
                shape.targetRemoved = true;
            }

            // Check if the first docker is removed
            if (shape.dockers &&
                shape.dockers.length >= 1 &&
                shape.dockers[0].getDocker &&
                ((shape.dockers[0].getDocker().getDockedShape() &&
                    !childShapeResourceIds.include(shape.dockers[0].getDocker().getDockedShape().resourceId)) ||
                    !shape.getShape().dockers[0].getDockedShape() && !outgoings[shape.resourceId])) {

                shape.sourceRemoved = true;
            }

            return shape;
        }.bind(this), true, true);


        // Iterate over top-level shapes
        canvas.eachChild(function (shape, parent) {
            // All top-level shapes should get an offset in their bounds
            // Move the shape occording to COPY_MOVE_OFFSET
            if (this.clipboard.useOffset) {
                shape.bounds = {
                    lowerRight:{
                        x:shape.bounds.lowerRight.x + ORYX.CONFIG.COPY_MOVE_OFFSET,
                        y:shape.bounds.lowerRight.y + ORYX.CONFIG.COPY_MOVE_OFFSET
                    },
                    upperLeft:{
                        x:shape.bounds.upperLeft.x + ORYX.CONFIG.COPY_MOVE_OFFSET,
                        y:shape.bounds.upperLeft.y + ORYX.CONFIG.COPY_MOVE_OFFSET
                    }
                };
            }
            // Only apply offset to shapes with a target
			var self = this;
            if (shape.dockers) {
                //shape.dockers = shape.dockers.map(function (docker, i) {
				shape.dockers = $.map(shape.dockers,function (docker, i) {
                    // If shape had a target but the copied does not have anyone anymore,
                    // migrate the relative dockers to absolute ones.
                    if ((shape.targetRemoved === true && i == shape.dockers.length - 1 && docker.getDocker) ||
                        (shape.sourceRemoved === true && i == 0 && docker.getDocker)) {

                        docker = docker.getDocker().bounds.center();
                    }

                    // If it is the first docker and it has a docked shape,
                    // just return the coordinates
                    if ((i == 0 && docker.getDocker instanceof Function &&
                        shape.sourceRemoved !== true && (docker.getDocker().getDockedShape() || ((outgoings[shape.resourceId] || []).length > 0 && (!(shape.getShape() instanceof ORYX.Core.Node) || outgoings[shape.resourceId][0].getShape() instanceof ORYX.Core.Node)))) ||
                        (i == shape.dockers.length - 1 && docker.getDocker instanceof Function &&
                            shape.targetRemoved !== true && (docker.getDocker().getDockedShape() || shape.target))) {

                        return {
                            x:docker.x,
                            y:docker.y,
                            getDocker:docker.getDocker
                        }
                    } else if (self.clipboard.useOffset) {
                        return {
                            x:docker.x + ORYX.CONFIG.COPY_MOVE_OFFSET,
                            y:docker.y + ORYX.CONFIG.COPY_MOVE_OFFSET,
                            getDocker:docker.getDocker
                        };
                    } else {
                        return {
                            x:docker.x,
                            y:docker.y,
                            getDocker:docker.getDocker
                        };
                    }
                }.bind(this));

            } else if (shape.getShape() instanceof ORYX.Core.Node && shape.dockers && shape.dockers.length > 0 && (!shape.dockers.first().getDocker || shape.sourceRemoved === true || !(shape.dockers.first().getDocker().getDockedShape() || outgoings[shape.resourceId]))) {

                //shape.dockers = shape.dockers.map(function (docker, i) {
				shape.dockers = $.map(shape.dockers,function (docker, i) {
                    if ((shape.sourceRemoved === true && i == 0 && docker.getDocker)) {
                        docker = docker.getDocker().bounds.center();
                    }

                    if (self.clipboard.useOffset) {
                        return {
                            x:docker.x + ORYX.CONFIG.COPY_MOVE_OFFSET,
                            y:docker.y + ORYX.CONFIG.COPY_MOVE_OFFSET,
                            getDocker:docker.getDocker
                        };
                    } else {
                        return {
                            x:docker.x,
                            y:docker.y,
                            getDocker:docker.getDocker
                        };
                    }
                }.bind(this));
            }

            return shape;
        }.bind(this), false, true);

        this.clipboard.useOffset = true;
		
        this.facade.importJSON(canvas);
    },

    /**
     * Performs the delete operation. No more asking.
     */
    editDelete:function () {
        var selection = this.facade.getSelection();

        var clipboard = new ORYX.Plugins.Edit.ClipBoard();
        clipboard.refresh(selection, this.getAllShapesToConsider(selection));

        var command = new ORYX.Plugins.Edit.DeleteCommand(clipboard, this.facade);

        this.facade.executeCommands([command]);
    }
});

// object 粘贴板
ORYX.Plugins.Edit.ClipBoard = Clazz.extend({
    construct:function () {
        this.shapesAsJson = [];
        this.selection = [];
        this.SSnamespace = "";
        this.useOffset = true;
    },
    isOccupied:function () {
        return this.shapesAsJson.length > 0;
    },
    refresh:function (selection, shapes, namespace, useNoOffset) {
        this.selection = selection;
        this.SSnamespace = namespace;
        // Store outgoings, targets and parents to restore them later on
        this.outgoings = {};
        this.parents = {};
        this.targets = {};
        this.useOffset = useNoOffset !== true;
        this.shapesAsJson = shapes.map(function (shape) {
            var s = shape.toJSON();
            s.parent = {resourceId:shape.getParentShape().resourceId};
            s.parentIndex = shape.getParentShape().getChildShapes().indexOf(shape)
            return s;
        });
    }
});

// object 删除命令执行的
ORYX.Plugins.Edit.DeleteCommand = ORYX.Core.Command.extend({
    construct:function (clipboard, facade) {
        this.clipboard = clipboard;
        this.shapesAsJson = clipboard.shapesAsJson;
        this.facade = facade;

        // Store dockers of deleted shapes to restore connections
        //this.dockers = this.shapesAsJson.map(function (shapeAsJson) {
		this.dockers = $.map(this.shapesAsJson,function (shapeAsJson) {
            var shape = shapeAsJson.getShape();
            var incomingDockers = shape.getIncomingShapes().map(function (s) {
                return s.getDockers().last()
            })
            var outgoingDockers = shape.getOutgoingShapes().map(function (s) {
                return s.getDockers().first()
            })
            //var dockers = shape.getDockers().concat(incomingDockers, outgoingDockers).compact().map(function (docker) {
			var dockers = $.map(shape.getDockers().concat(incomingDockers, outgoingDockers).compact(),function (docker) {
                return {
                    object:docker,
                    referencePoint:docker.referencePoint,
                    dockedShape:docker.getDockedShape()
                };
            });
            return dockers;
        }).flatten();
    },
    execute:function () {
		var self = this;
        this.shapesAsJson.each(function (shapeAsJson) {
            // Delete shape
            self.facade.deleteShape(shapeAsJson.getShape());
        }.bind(this));

        this.facade.setSelection([]);
        this.facade.getCanvas().update();
        this.facade.updateSelection();

    },
    rollback:function () {
		var self = this;
        this.shapesAsJson.each(function (shapeAsJson) {
            var shape = shapeAsJson.getShape();
            var parent = self.facade.getCanvas().getChildShapeByResourceId(shapeAsJson.parent.resourceId) || self.facade.getCanvas();
            parent.add(shape, shape.parentIndex);
        }.bind(this));

        //reconnect shapes
        this.dockers.each(function (d) {
            d.object.setDockedShape(d.dockedShape);
            d.object.setReferencePoint(d.referencePoint);
        }.bind(this));

        this.facade.setSelection(this.selectedShapes);
        this.facade.getCanvas().update();
        this.facade.updateSelection();

    }
});

// object 键盘移动图形
ORYX.Plugins.KeysMove = ORYX.Plugins.AbstractPlugin.extend({

    facade:undefined,

    construct:function (facade) {

        this.facade = facade;
        this.copyElements = [];

        //this.facade.registerOnEvent(ORYX.CONFIG.EVENT_KEYDOWN, this.keyHandler.bind(this));

        // SELECT ALL
        this.facade.offer({
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:65,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.selectAll.bind(this)
        });

        // MOVE LEFT SMALL
        this.facade.offer({
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:ORYX.CONFIG.KEY_CODE_LEFT,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_LEFT, false)
        });

        // MOVE LEFT
        this.facade.offer({
            keyCodes:[
                {
                    keyCode:ORYX.CONFIG.KEY_CODE_LEFT,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_LEFT, true)
        });

        // MOVE RIGHT SMALL
        this.facade.offer({
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:ORYX.CONFIG.KEY_CODE_RIGHT,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_RIGHT, false)
        });

        // MOVE RIGHT
        this.facade.offer({
            keyCodes:[
                {
                    keyCode:ORYX.CONFIG.KEY_CODE_RIGHT,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_RIGHT, true)
        });

        // MOVE UP SMALL
        this.facade.offer({
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:ORYX.CONFIG.KEY_CODE_UP,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_UP, false)
        });

        // MOVE UP
        this.facade.offer({
            keyCodes:[
                {
                    keyCode:ORYX.CONFIG.KEY_CODE_UP,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_UP, true)
        });

        // MOVE DOWN SMALL
        this.facade.offer({
            keyCodes:[
                {
                    metaKeys:[ORYX.CONFIG.META_KEY_META_CTRL],
                    keyCode:ORYX.CONFIG.KEY_CODE_DOWN,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_DOWN, false)
        });

        // MOVE DOWN
        this.facade.offer({
            keyCodes:[
                {
                    keyCode:ORYX.CONFIG.KEY_CODE_DOWN,
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.move.bind(this, ORYX.CONFIG.KEY_CODE_DOWN, true)
        });


    },

    /**
     * Select all shapes in the editor
     *
     */
    selectAll:function (e) {
        Event.stop(e.event);
        this.facade.setSelection(this.facade.getCanvas().getChildShapes(true))
    },

    move:function (key, far, e) {
		
        Event.stop(e.event);

        // calculate the distance to move the objects and get the selection.
        var distance = far ? 20 : 5;
        var selection = this.facade.getSelection();
        var currentSelection = this.facade.getSelection();
        var p = {x:0, y:0};

        // switch on the key pressed and populate the point to move by.
        switch (key) {

            case ORYX.CONFIG.KEY_CODE_LEFT:
                p.x = -1 * distance;
                break;
            case ORYX.CONFIG.KEY_CODE_RIGHT:
                p.x = distance;
                break;
            case ORYX.CONFIG.KEY_CODE_UP:
                p.y = -1 * distance;
                break;
            case ORYX.CONFIG.KEY_CODE_DOWN:
                p.y = distance;
                break;
        }

        // move each shape in the selection by the point calculated and update it.
        selection = selection.findAll(function (shape) {
            // Check if this shape is docked to an shape in the selection
            if (shape instanceof ORYX.Core.Node && shape.dockers.length == 1 && selection.include(shape.dockers.first().getDockedShape())) {
                return false
            }

            // Check if any of the parent shape is included in the selection
            var s = shape.parent;
            do {
                if (selection.include(s)) {
                    return false
                }
            } while (s = s.parent);

            // Otherwise, return true
            return true;

        });

        /* Edges must not be movable, if only edges are selected and at least
         * one of them is docked.
         */
        var edgesMovable = true;
        var onlyEdgesSelected = selection.all(function (shape) {
            if (shape instanceof ORYX.Core.Edge) {
                if (shape.isDocked()) {
                    edgesMovable = false;
                }
                return true;
            }
            return false;
        });

        if (onlyEdgesSelected && !edgesMovable) {
            /* Abort moving shapes */
            return;
        }

        selection = selection.map(function (shape) {
            if (shape instanceof ORYX.Core.Node) {
                /*if( shape.dockers.length == 1 ){
                 return shape.dockers.first()
                 } else {*/
                return shape
                //}
            } else if (shape instanceof ORYX.Core.Edge) {

                var dockers = shape.dockers;

                if (selection.include(shape.dockers.first().getDockedShape())) {
                    dockers = dockers.without(shape.dockers.first())
                }

                if (selection.include(shape.dockers.last().getDockedShape())) {
                    dockers = dockers.without(shape.dockers.last())
                }

                return dockers

            } else {
                return null
            }

        }).flatten().compact();

        if (selection.size() > 0) {

            //Stop moving at canvas borders
            var selectionBounds = [ this.facade.getCanvas().bounds.lowerRight().x,
                this.facade.getCanvas().bounds.lowerRight().y,
                0,
                0 ];
            selection.each(function (s) {
                selectionBounds[0] = Math.min(selectionBounds[0], s.bounds.upperLeft().x);
                selectionBounds[1] = Math.min(selectionBounds[1], s.bounds.upperLeft().y);
                selectionBounds[2] = Math.max(selectionBounds[2], s.bounds.lowerRight().x);
                selectionBounds[3] = Math.max(selectionBounds[3], s.bounds.lowerRight().y);
            });
            if (selectionBounds[0] + p.x < 0)
                p.x = -selectionBounds[0];
            if (selectionBounds[1] + p.y < 0)
                p.y = -selectionBounds[1];
            if (selectionBounds[2] + p.x > this.facade.getCanvas().bounds.lowerRight().x)
                p.x = this.facade.getCanvas().bounds.lowerRight().x - selectionBounds[2];
            if (selectionBounds[3] + p.y > this.facade.getCanvas().bounds.lowerRight().y)
                p.y = this.facade.getCanvas().bounds.lowerRight().y - selectionBounds[3];

            if (p.x != 0 || p.y != 0) {
                // Instantiate the moveCommand
                var commands = [new ORYX.Core.Command.Move(selection, p, null, currentSelection, this)];
                // Execute the commands
                this.facade.executeCommands(commands);
            }

        }
    },

    getUndockedCommant:function (shapes) {

        var undockEdgeCommand = ORYX.Core.Command.extend({
            construct:function (moveShapes) {
                this.dockers = moveShapes.collect(function (shape) {
                    return shape instanceof ORYX.Core.Controls.Docker ? {docker:shape, dockedShape:shape.getDockedShape(), refPoint:shape.referencePoint} : undefined
                }).compact();
            },
            execute:function () {
                this.dockers.each(function (el) {
                    el.docker.setDockedShape(undefined);
                })
            },
            rollback:function () {
                this.dockers.each(function (el) {
                    el.docker.setDockedShape(el.dockedShape);
                    el.docker.setReferencePoint(el.refPoint);
                    //el.docker.update();
                })
            }
        });

        command = new undockEdgeCommand(shapes);
        command.execute();
        return command;
    }

});

// object 重新命名
ORYX.Plugins.RenameShapes = Clazz.extend({

    facade:undefined,

    construct:function (facade) {

        this.facade = facade;

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK, this.actOnDBLClick.bind(this));
        this.facade.offer({
            keyCodes:[
                {
                    keyCode:113, // F2-Key
                    keyAction:ORYX.CONFIG.KEY_ACTION_DOWN
                }
            ],
            functionality:this.renamePerF2.bind(this)
        });
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN, this.hide.bind(this), true)
    },

    /**
     * This method handles the "F2" key down event. The selected shape are looked
     * up and the editing of title/name of it gets started.
     */
    renamePerF2:function () {
        var selectedShapes = this.facade.getSelection();
        this.actOnDBLClick(undefined, selectedShapes.first());
    },

    actOnDBLClick:function (evt, shape) {
        if (!(shape instanceof ORYX.Core.Shape)) {
            return
        }

        // Destroys the old input, if there is one
        this.destroy();

        // Get all properties which where at least one ref to view is set
        var props = shape.getStencil().properties().findAll(function (item) {
            return (item.refToView()
                && item.refToView().length > 0
                && item.directlyEditable());
        });
        // from these, get all properties where write access are and the type is String
        props = props.findAll(function (item) {
            return !item.readonly() && item.type() == ORYX.CONFIG.TYPE_STRING
        });
        // Get all ref ids
        var allRefToViews = props.collect(function (prop) {
            return prop.refToView()
        }).flatten().compact();
        // Get all labels from the shape with the ref ids
        var labels = shape.getLabels().findAll(function (label) {
            return allRefToViews.any(function (toView) {
                return $.trim((label.id)).endsWith(toView)
            });
        })

        // If there are no referenced labels --> return
        if (labels.length == 0) {
            return
        }
        // Define the nearest label
        var nearestLabel = labels.length <= 1 ? labels[0] : null;
        if (!nearestLabel) {

            nearestLabel = labels.find(function (label) {
                return label.node == evt.target || label.node == evt.target.parentNode
            })
            if (!nearestLabel) {

                var evtCoord = this.facade.eventCoordinates(evt);

                var trans = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
                evtCoord.x *= trans.a;
                evtCoord.y *= trans.d;

                var diff = labels.collect(function (label) {
                    var center = this.getCenterPosition(label.node);
                    var len = Math.sqrt(Math.pow(center.x - evtCoord.x, 2) + Math.pow(center.y - evtCoord.y, 2));
                    return {diff:len, label:label}
                }.bind(this));

                diff.sort(function (a, b) {
                    return a.diff > b.diff
                })

                nearestLabel = diff[0].label;

            }
        }
        // Get the particular property for the label
        var prop = props.find(function (item) {
            return item.refToView().any(function (toView) {
                return nearestLabel.id == shape.id + toView
            })
        });

        // Set all particular config values
        var htmlCont = this.facade.getCanvas().getHTMLContainer().id;

        // Get the center position from the nearest label
        var width = Math.min(Math.max(100, shape.bounds.width()), 200);
        var center = this.getCenterPosition(nearestLabel.node);
        center.x -= (width / 2);
        var propId = prop.prefix() + "-" + prop.id();

        // Set the config values for the TextField/Area
        var config = {
            renderTo:htmlCont,
            value:shape.properties[propId],
            x:(center.x < 10) ? 10 : center.x,
            y:center.y,
            width:width,
            style:'position:absolute',
            allowBlank:prop.optional(),  //是否允许为空
            maxLength:prop.length(),
            emptyText:prop.title(),
            cls:'x_form_text_set_absolute'
        }
 
        // Depending on the property, generate
        // ether an TextArea or TextField
		
        if (prop.wrapLines()) {
            config.y -= (60 / 2);
            config['grow'] = true;  //是否自动伸缩
        } else {

            config.y -= (20 / 2);
        }
		
		var text = $("<input type='text'/>");
		text.val(config.value);
		text.addClass("x_form_text_set_absolute");
		text.attr("maxLength",32);//prop.length()数据不准确
		text.css({
			"position":config.style,
			"width":config.width,
			"top":config.y,
			"left":config.x
		});
		this.shownTextField = text;
		text.appendTo($("#"+htmlCont));
		text.focus();

        // Define event handler
        //	Blur 	-> Destroy
        //	Change 	-> Set new values
		var self  = this,isout=true;;
		$(this.shownTextField).mouseover(function(){
			isout=false;
		}).mouseout(function(){
			isout=true;
		});
        
		var changeValue = function(value,oldValue){
            var currentEl = shape;
            var newValue = value;
            var facade = self.facade;
			
            if (oldValue != newValue) {
                // Implement the specific command for property change
                var commandClass = ORYX.Core.Command.extend({
                    construct:function () {
                        this.el = currentEl;
                        this.propId = propId;
                        this.oldValue = oldValue;
                        this.newValue = newValue;
                        this.facade = facade;
                    },
                    execute:function () {
                        this.el.setProperty(this.propId, this.newValue);
                        //this.el.update();
                        this.facade.setSelection([this.el]);
                        this.facade.getCanvas().update();
                        this.facade.updateSelection();
                    },
                    rollback:function () {
                        this.el.setProperty(this.propId, this.oldValue);
                        //this.el.update();
                        this.facade.setSelection([this.el]);
                        this.facade.getCanvas().update();
                        this.facade.updateSelection();
                    }
                })
                var command = new commandClass();
                self.facade.executeCommands([command]);
            }
		}
		var oldValue = shape.properties[propId];
		$(this.shownTextField).keyup(function(){
			var value = this.value;
			if(value !== oldValue){  //判断数据不一致才去更新
				changeValue(value,oldValue);
				//强行修改propertygrid的显示值
				$('.datagrid-body').find("td[field='value']").each(function(){
					var $td = $(this);
					if($td.attr("title") == oldValue && $td.prev().attr("title") =="名称"){
						$td.find(">div").html(value);
						$td.attr("title",value);
						oldValue = value;
					}
				});
			}
		});
		
		$(this.shownTextField).blur(function(){
			var value = this.value;
			var oldValue = shape.properties[propId];
			if(value !== oldValue){  //判断数据不一致才去更新
				changeValue(value,oldValue);
			}
			if(isout)self.destroy();
		});
		//});

        // Diable the keydown in the editor (that when hitting the delete button, the shapes not get deleted)
        this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);

    },

    getCenterPosition:function (svgNode) {
        if (!svgNode) {
            return {x:0, y:0}
        }
        var center = {x:0, y:0 };
        var trans, scale, transLocal, bounds;
        var useParent = false;
        try {

            if (('hidden' === svgNode.getAttributeNS(null, 'visibility') && svgNode.childNodes.length > 0)
                || svgNode.childNodes.length === 0) {
                useParent = true;
            }

            var el = useParent ? svgNode.parentNode : svgNode;

            trans = el.getTransformToElement(this.facade.getCanvas().rootNode.lastChild);
            scale = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
            transLocal = el.getTransformToElement(el.parentNode);
        } catch (e) {
            return {x:0, y:0}
        }

        center.x = trans.e - transLocal.e;
        center.y = trans.f - transLocal.f;


        try {
            bounds = svgNode.getBBox();

            if (!useParent && !(bounds.x < -1000)) {
                bounds.y -= 1;
            } else {
                bounds = {x:Number(svgNode.getAttribute('x')), y:Number(svgNode.getAttribute('y')), width:0, height:0};
            }
        } catch (e) {
            bounds = {x:Number(svgNode.getAttribute('x')), y:Number(svgNode.getAttribute('y')), width:0, height:0};
        }

        center.x += bounds.x;
        center.y += bounds.y;

        center.x += bounds.width / 2;
        center.y += bounds.height / 2;

        center.x *= scale.a;
        center.y *= scale.d;

        return center;
    },

    hide:function (e) {
        if (this.shownTextField && (!e || !this.shownTextField.el || e.target !== this.shownTextField.el.dom)) {
            //this.shownTextField.onBlur();
			this.shownTextField.blur();
			//this.shownTextField.focusout();
        }
    },

    destroy:function (e) {
        if (this.shownTextField) {
            //this.shownTextField.destroy();
			this.shownTextField.remove();
            delete this.shownTextField;

            this.facade.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
        }
    }
});


// object
ORYX.Plugins.SelectionFrame = Clazz.extend({

    construct:function (facade) {
        this.facade = facade;

        // Register on MouseEvents
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.handleMouseUp.bind(this), true);

        // Some initiale variables
        this.position = {x:0, y:0};
        this.size = {width:0, height:0};
        this.offsetPosition = {x:0, y:0}

        // (Un)Register Mouse-Move Event
        this.moveCallback = undefined;
        this.offsetScroll = {x:0, y:0}
        // HTML-Node of Selection-Frame
        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", this.facade.getCanvas().getHTMLContainer(),
            ['div', {'class':'Oryx_SelectionFrame'}]);

        this.hide();
    },

    handleMouseDown:function (event, uiObj) {
        // If there is the Canvas
        if (uiObj instanceof ORYX.Core.Canvas) {
            // Calculate the Offset
            var scrollNode = uiObj.rootNode.parentNode.parentNode;

            var a = this.facade.getCanvas().node.getScreenCTM();
            this.offsetPosition = {
                x:a.e,
                y:a.f
            }

            // Set the new Position
            this.setPos({x:Event.pointerX(event) - this.offsetPosition.x, y:Event.pointerY(event) - this.offsetPosition.y});
            // Reset the size
            this.resize({width:0, height:0});
            this.moveCallback = this.handleMouseMove.bind(this);

            // Register Mouse-Move Event
            document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.moveCallback, false);

            this.offsetScroll = {x:scrollNode.scrollLeft, y:scrollNode.scrollTop};

            // Show the Frame
            this.show();


        }

        Event.stop(event);
    },

    handleMouseUp:function (event) {
        // If there was an MouseMoving
        if (this.moveCallback) {
            // Hide the Frame
            this.hide();

            // Unregister Mouse-Move
            document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.moveCallback, false);

            this.moveCallback = undefined;

            var corrSVG = this.facade.getCanvas().node.getScreenCTM();

            // Calculate the positions of the Frame
            var a = {
                x:this.size.width > 0 ? this.position.x : this.position.x + this.size.width,
                y:this.size.height > 0 ? this.position.y : this.position.y + this.size.height
            }

            var b = {
                x:a.x + Math.abs(this.size.width),
                y:a.y + Math.abs(this.size.height)
            }

            // Fit to SVG-Coordinates
            a.x /= corrSVG.a;
            a.y /= corrSVG.d;
            b.x /= corrSVG.a;
            b.y /= corrSVG.d;

			var elements = this.facade.getCanvas().getChildShapes(true).findAll(function (value) {
                var absBounds = value.absoluteBounds();
                var bA = absBounds.upperLeft();
                var bB = absBounds.lowerRight();
                if (bA.x > a.x && bA.y > a.y && bB.x < b.x && bB.y < b.y)
                    return true;
                return false
            });

            // Set the selection
            this.facade.setSelection(elements);
        }
    },

    handleMouseMove:function (event) {
        // Calculate the size
        var size = {
            width:Event.pointerX(event) - this.position.x - this.offsetPosition.x,
            height:Event.pointerY(event) - this.position.y - this.offsetPosition.y
        }

        var scrollNode = this.facade.getCanvas().rootNode.parentNode.parentNode;
        size.width -= this.offsetScroll.x - scrollNode.scrollLeft;
        size.height -= this.offsetScroll.y - scrollNode.scrollTop;

        // Set the size
        this.resize(size);

        Event.stop(event);
		//event.preventDefault();
		//event.stopPropagation();
    },

    hide:function () {
        this.node.style.display = "none";
    },

    show:function () {
        this.node.style.display = "";
    },

    setPos:function (pos) {
        // Set the Position
        this.node.style.top = pos.y + "px";
        this.node.style.left = pos.x + "px";
        this.position = pos;
    },

    resize:function (size) {

        // Calculate the negative offset
        this.setPos(this.position);
        //this.size = Object.clone(size);
		this.size = $.extend(true,{},size);
		
        if (size.width < 0) {
            this.node.style.left = (this.position.x + size.width) + "px";
            size.width = -size.width;
        }
        if (size.height < 0) {
            this.node.style.top = (this.position.y + size.height) + "px";
            size.height = -size.height;
        }

        // Set the size
        this.node.style.width = size.width + "px";
        this.node.style.height = size.height + "px";
    }

});


// object
ORYX.Core.Command.Move = ORYX.Core.Command.extend({
    construct:function (moveShapes, offset, parent, selectedShapes, plugin) {
        this.moveShapes = moveShapes;
        this.selectedShapes = selectedShapes;
        this.offset = offset;
        this.plugin = plugin;
        // Defines the old/new parents for the particular shape
        /*this.newParents = moveShapes.collect(function (t) {
            return parent || t.parent
        });*/
		this.newParents = $.map(moveShapes,function (t) {
            return parent || t.parent
        });
		
        //this.oldParents = moveShapes.collect(function (shape) {
		this.oldParents = $.map(moveShapes,function (shape) {
            return shape.parent
        });
        /*this.dockedNodes = moveShapes.findAll(function (shape) {
            return shape instanceof ORYX.Core.Node && shape.dockers.length == 1
        }).collect(function (shape) {
                return {docker:shape.dockers[0], dockedShape:shape.dockers[0].getDockedShape(), refPoint:shape.dockers[0].referencePoint}
            });*/
		var tmp=[];
		$.map(moveShapes,function(shape){
			if(shape instanceof ORYX.Core.Node && shape.dockers.length == 1){
				tmp[tmp.length] = shape;
			}
		});
		
		this.dockedNodes = $.map(tmp,function(shape){
			return {docker:shape.dockers[0], dockedShape:shape.dockers[0].getDockedShape(), refPoint:shape.dockers[0].referencePoint}
		});
    },
    execute:function () {
        this.dockAllShapes();
        // Moves by the offset
        this.move(this.offset);
        // Addes to the new parents
        this.addShapeToParent(this.newParents);
        // Set the selection to the current selection
        this.selectCurrentShapes();
        this.plugin.facade.getCanvas().update();
        this.plugin.facade.updateSelection();
    },
    rollback:function () {
        // Moves by the inverted offset
        var offset = { x:-this.offset.x, y:-this.offset.y };
        this.move(offset);
        // Addes to the old parents
        this.addShapeToParent(this.oldParents);
        this.dockAllShapes(true)

        // Set the selection to the current selection
        this.selectCurrentShapes();
        this.plugin.facade.getCanvas().update();
        this.plugin.facade.updateSelection();

    },
    move:function (offset, doLayout) {

        // Move all Shapes by these offset
        for (var i = 0; i < this.moveShapes.length; i++) {
            var value = this.moveShapes[i];
            value.bounds.moveBy(offset);

            if (value instanceof ORYX.Core.Node) {

                (value.dockers || []).each(function (d) {
                    d.bounds.moveBy(offset);
                })

                // Update all Dockers of Child shapes
                /*var childShapesNodes = value.getChildShapes(true).findAll(function(shape){ return shape instanceof ORYX.Core.Node });
                 var childDockedShapes = childShapesNodes.collect(function(shape){ return shape.getAllDockedShapes() }).flatten().uniq();
                 var childDockedEdge = childDockedShapes.findAll(function(shape){ return shape instanceof ORYX.Core.Edge });
                 childDockedEdge = childDockedEdge.findAll(function(shape){ return shape.getAllDockedShapes().all(function(dsh){ return childShapesNodes.include(dsh) }) });
                 var childDockedDockers = childDockedEdge.collect(function(shape){ return shape.dockers }).flatten();

                 for (var j = 0; j < childDockedDockers.length; j++) {
                 var docker = childDockedDockers[j];
                 if (!docker.getDockedShape() && !this.moveShapes.include(docker)) {
                 //docker.bounds.moveBy(offset);
                 //docker.update();
                 }
                 }*/


                /*var allEdges = [].concat(value.getIncomingShapes())
                    .concat(value.getOutgoingShapes())
                    // Remove all edges which are included in the selection from the list
                    .findAll(function (r) {
                    return    r instanceof ORYX.Core.Edge && !this.moveShapes.any(function (d) {
                        return d == r || (d instanceof ORYX.Core.Controls.Docker && d.parent == r)
                    })
                }.bind(this))
                    // Remove all edges which are between the node and a node contained in the selection from the list
                    .findAll(function (r) {
                    return     (r.dockers.first().getDockedShape() == value || !this.moveShapes.include(r.dockers.first().getDockedShape())) &&
                        (r.dockers.last().getDockedShape() == value || !this.moveShapes.include(r.dockers.last().getDockedShape()))
                }.bind(this))*/
				var self = this,tmp=[];
				var allEdges = [].concat(value.getIncomingShapes()).concat(value.getOutgoingShapes());
				var checkAny = function(r){
					var tmp = false;
					$.map(self.moveShapes,function (d) {
						if(d == r || (d instanceof ORYX.Core.Controls.Docker && d.parent == r)){
							tmp = true;
							return;
						}
					});
					return tmp;
				}
				$.map(allEdges,function(r){
					if(r instanceof ORYX.Core.Edge && !checkAny(r)){
						tmp[tmp.length] = r;
					}
				});
				allEdges = tmp;
				tmp=[];
				$.map(allEdges,function(r){
					if((r.dockers.first().getDockedShape() == value || !self.moveShapes.include(r.dockers.first().getDockedShape())) &&
                        (r.dockers.last().getDockedShape() == value || !self.moveShapes.include(r.dockers.last().getDockedShape()))){
							tmp[tmp.length] = r;
						}
				})
				allEdges = tmp;
				
                // Layout all outgoing/incoming edges
                this.plugin.layoutEdges(value, allEdges, offset);
                /*var allSameEdges = [].concat(value.getIncomingShapes())
                    .concat(value.getOutgoingShapes())
                    // Remove all edges which are included in the selection from the list
                    .findAll(function (r) {
                    return r instanceof ORYX.Core.Edge && r.dockers.first().isDocked() && r.dockers.last().isDocked() 
					&& !this.moveShapes.include(r) && !this.moveShapes.any(function (d) {
                        return d == r || (d instanceof ORYX.Core.Controls.Docker && d.parent == r)
                    })
                }.bind(this))
                    // Remove all edges which are included in the selection from the list
                    .findAll(function (r) {
                    return this.moveShapes.indexOf(r.dockers.first().getDockedShape()) > i || this.moveShapes.indexOf(r.dockers.last().getDockedShape()) > i
                }.bind(this))*/
				var allSameEdges = [].concat(value.getIncomingShapes()).concat(value.getOutgoingShapes());
				tmp=[];
				$.map(allSameEdges,function(r){
					if(r instanceof ORYX.Core.Edge && !checkAny(r)){
						tmp[tmp.length] = r;
					}
				});
				allSameEdges = tmp;
				tmp=[];
				
				$.map(allSameEdges,function(r){
					if(self.moveShapes.indexOf(r.dockers.first().getDockedShape()) > i || self.moveShapes.indexOf(r.dockers.last().getDockedShape()) > i){
						tmp[tmp.length] = r;
					}
				});
				allSameEdges = tmp;

                for (var j = 0; j < allSameEdges.length; j++) {
                    for (var k = 1; k < allSameEdges[j].dockers.length - 1; k++) {
                        var docker = allSameEdges[j].dockers[k];
                        if (!docker.getDockedShape() && !this.moveShapes.include(docker)) {
                            docker.bounds.moveBy(offset);
                        }
                    }
                }

                /*var i=-1;
                 var nodes = value.getChildShapes(true);
                 var allEdges = [];
                 while(++i<nodes.length){
                 var edges = [].concat(nodes[i].getIncomingShapes())
                 .concat(nodes[i].getOutgoingShapes())
                 // Remove all edges which are included in the selection from the list
                 .findAll(function(r){ return r instanceof ORYX.Core.Edge && !allEdges.include(r) && r.dockers.any(function(d){ return !value.bounds.isIncluded(d.bounds.center)})})
                 allEdges = allEdges.concat(edges);
                 if (edges.length <= 0){ continue }
                 //this.plugin.layoutEdges(nodes[i], edges, offset);
                 }*/
            }
        }

    },
    dockAllShapes:function (shouldDocked) {
        // Undock all Nodes
        for (var i = 0; i < this.dockedNodes.length; i++) {
            var docker = this.dockedNodes[i].docker;

            docker.setDockedShape(shouldDocked ? this.dockedNodes[i].dockedShape : undefined)
            if (docker.getDockedShape()) {
                docker.setReferencePoint(this.dockedNodes[i].refPoint);
                //docker.update();
            }
        }
    },

    addShapeToParent:function (parents) {

        // For every Shape, add this and reset the position
        for (var i = 0; i < this.moveShapes.length; i++) {
            var currentShape = this.moveShapes[i];
            if (currentShape instanceof ORYX.Core.Node &&
                currentShape.parent !== parents[i]) {

                // Calc the new position
                var unul = parents[i].absoluteXY();
                var csul = currentShape.absoluteXY();
                var x = csul.x - unul.x;
                var y = csul.y - unul.y;

                // Add the shape to the new contained shape
                parents[i].add(currentShape);
                // Add all attached shapes as well
                currentShape.getOutgoingShapes((function (shape) {
                    if (shape instanceof ORYX.Core.Node && !this.moveShapes.member(shape)) {
                        parents[i].add(shape);
                    }
                }).bind(this));

                // Set the new position
                if (currentShape instanceof ORYX.Core.Node && currentShape.dockers.length == 1) {
                    var b = currentShape.bounds;
                    x += b.width() / 2;
                    y += b.height() / 2
                    currentShape.dockers.first().bounds.centerMoveTo(x, y);
                } else {
                    currentShape.bounds.moveTo(x, y);
                }

            }

            // Update the shape
            //currentShape.update();

        }
    },
    selectCurrentShapes:function () {
        this.plugin.facade.setSelection(this.selectedShapes);
    }
});

// object
ORYX.Plugins.ShapeHighlighting = Clazz.extend({

    construct:function (facade) {

        this.parentNode = facade.getCanvas().getSvgContainer();

        // The parent Node
        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.parentNode,
            ['g']);

        this.highlightNodes = {};

        facade.registerOnEvent(ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW, this.setHighlight.bind(this));
        facade.registerOnEvent(ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, this.hideHighlight.bind(this));

    },

    setHighlight:function (options) {
        if (options && options.highlightId) {
            var node = this.highlightNodes[options.highlightId];

            if (!node) {
                node = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.node,
                    ['path', {
                        "stroke-width":2.0, "fill":"none"
                    }]);

                this.highlightNodes[options.highlightId] = node;
            }

            if (options.elements && options.elements.length > 0) {

                this.setAttributesByStyle(node, options);
                this.show(node);

            } else {

                this.hide(node);

            }

        }
    },

    hideHighlight:function (options) {
        if (options && options.highlightId && this.highlightNodes[options.highlightId]) {
            this.hide(this.highlightNodes[options.highlightId]);
        }
    },

    hide:function (node) {
        node.setAttributeNS(null, 'display', 'none');
    },

    show:function (node) {
        node.setAttributeNS(null, 'display', '');
    },

    setAttributesByStyle:function (node, options) {

        // If the style say, that it should look like a rectangle
        if (options.style && options.style == ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE) {

            // Set like this
            var bo = options.elements[0].absoluteBounds();

            var strWidth = options.strokewidth ? options.strokewidth : ORYX.CONFIG.BORDER_OFFSET

            node.setAttributeNS(null, "d", this.getPathRectangle(bo.a, bo.b, strWidth));
            node.setAttributeNS(null, "stroke", options.color ? options.color : ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
            node.setAttributeNS(null, "stroke-opacity", options.opacity ? options.opacity : 0.2);
            node.setAttributeNS(null, "stroke-width", strWidth);

        } else if (options.elements.length == 1
            && options.elements[0] instanceof ORYX.Core.Edge &&
            options.highlightId != "selection") {

            /* Highlight containment of edge's childs */
            node.setAttributeNS(null, "d", this.getPathEdge(options.elements[0].dockers));
            node.setAttributeNS(null, "stroke", options.color ? options.color : ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
            node.setAttributeNS(null, "stroke-opacity", options.opacity ? options.opacity : 0.2);
            node.setAttributeNS(null, "stroke-width", ORYX.CONFIG.OFFSET_EDGE_BOUNDS);

        } else {
            // If not, set just the corners
            node.setAttributeNS(null, "d", this.getPathByElements(options.elements));
            node.setAttributeNS(null, "stroke", options.color ? options.color : ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR);
            node.setAttributeNS(null, "stroke-opacity", options.opacity ? options.opacity : 1.0);
            node.setAttributeNS(null, "stroke-width", options.strokewidth ? options.strokewidth : 2.0);

        }
    },

    getPathByElements:function (elements) {
        if (!elements || elements.length <= 0) {
            return undefined
        }

        // Get the padding and the size
        var padding = ORYX.CONFIG.SELECTED_AREA_PADDING;

        var path = ""

        // Get thru all Elements
        //elements.each((function (element) {
		var self =this;
		
		$.map(elements,function (element) {
            if (!element) {
                return
            }
            // Get the absolute Bounds and the two Points
            var bounds = element.absoluteBounds();
            bounds.widen(padding)
            var a = bounds.upperLeft();
            var b = bounds.lowerRight();

            path = path + self.getPath(a, b);
		});
        //}).bind(this));

        return path;

    },

    getPath:function (a, b) {

        return this.getPathCorners(a, b);

    },

    getPathCorners:function (a, b) {

        var size = ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE;

        var path = ""

        // Set: Upper left
        path = path + "M" + a.x + " " + (a.y + size) + " l0 -" + size + " l" + size + " 0 ";
        // Set: Lower left
        path = path + "M" + a.x + " " + (b.y - size) + " l0 " + size + " l" + size + " 0 ";
        // Set: Lower right
        path = path + "M" + b.x + " " + (b.y - size) + " l0 " + size + " l-" + size + " 0 ";
        // Set: Upper right
        path = path + "M" + b.x + " " + (a.y + size) + " l0 -" + size + " l-" + size + " 0 ";

        return path;
    },

    getPathRectangle:function (a, b, strokeWidth) {

        var size = ORYX.CONFIG.SELECTION_HIGHLIGHT_SIZE;

        var path = ""
        var offset = strokeWidth / 2.0;

        // Set: Upper left
        path = path + "M" + (a.x + offset) + " " + (a.y);
        path = path + " L" + (a.x + offset) + " " + (b.y - offset);
        path = path + " L" + (b.x - offset) + " " + (b.y - offset);
        path = path + " L" + (b.x - offset) + " " + (a.y + offset);
        path = path + " L" + (a.x + offset) + " " + (a.y + offset);

        return path;
    },

    getPathEdge:function (edgeDockers) {
        var length = edgeDockers.length;
        var path = "M" + edgeDockers[0].bounds.center().x + " "
            + edgeDockers[0].bounds.center().y;

        for (i = 1; i < length; i++) {
            var dockerPoint = edgeDockers[i].bounds.center();
            path = path + " L" + dockerPoint.x + " " + dockerPoint.y;
        }

        return path;
    }

});

// object
ORYX.Plugins.ShapeMenu = {

    /***
     * Constructor.
     */
    construct:function (parentNode) {

        this.bounds = undefined;
        this.shapes = undefined;
        this.buttons = [];
        this.isVisible = false;

        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", $(parentNode),
            ['div', {id:ORYX.Editor.provideId(), 'class':'Oryx_ShapeMenu'}]);

        this.alignContainers = new Hash();
        this.numberOfButtonsPerLevel = new Hash();
    },

    addButton:function (button) {
        this.buttons.push(button);
        // lazy grafting of the align containers
        if (!this.alignContainers[button.align]) {
            this.alignContainers[button.align] = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", this.node,
                ['div', {'class':button.align}]);
            this.node.appendChild(this.alignContainers[button.align]);

            // add event listeners for hover effect
            var onBubble = false;
            this.alignContainers[button.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER, this.hoverAlignContainer.bind(this, button.align), onBubble);
            this.alignContainers[button.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT, this.resetAlignContainer.bind(this, button.align), onBubble);
            this.alignContainers[button.align].addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.hoverAlignContainer.bind(this, button.align), onBubble);
        }
        this.alignContainers[button.align].appendChild(button.node);
    },

    deleteButton:function (button) {
        this.buttons = this.buttons.without(button);
        this.node.removeChild(button.node);
    },

    removeAllButtons:function () {
        var me = this;
        /*this.buttons.each(function (value) {
            if (value.node && value.node.parentNode)
                value.node.parentNode.removeChild(value.node);
        });*/
		$.map(this.buttons,function(value){
			if (value.node && value.node.parentNode)
                value.node.parentNode.removeChild(value.node);
		});
		
        this.buttons = [];
    },

    closeAllButtons:function () {
        //this.buttons.each(function (value) {
		$.map(this.buttons,function (value) {
            value.prepareToHide();
        });
        this.isVisible = false;
    },


    /**
     * Show the shape menu
     */
    show:function (shapes) {

        //shapes = (shapes||[]).findAll(function(r){ return r && r.node && r.node.parent });

        if (shapes.length <= 0)
            return

        this.shapes = shapes;

        var newBounds = undefined;
        var tmpBounds = undefined;

        //this.shapes.each(function (value) {
		$.map(this.shapes,function (value) {
            var a = value.node.getScreenCTM();
            var upL = value.absoluteXY();
            a.e = a.a * upL.x;
            a.f = a.d * upL.y;
            tmpBounds = new ORYX.Core.Bounds(a.e, a.f, a.e + a.a * value.bounds.width(), a.f + a.d * value.bounds.height());

            /*if(value instanceof ORYX.Core.Edge) {
             tmpBounds.moveBy(value.bounds.upperLeft())
             }*/

            if (!newBounds)
                newBounds = tmpBounds
            else
                newBounds.include(tmpBounds);

        });
		

        this.bounds = newBounds;
        //this.bounds.moveBy({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});

        var bounds = this.bounds;

        var a = this.bounds.upperLeft();

        var left = 0,
            leftButtonGroup = 0;
        var top = 0,
            topButtonGroup = 0;
        var bottom = 0,
            bottomButtonGroup;
        var right = 0
        rightButtonGroup = 0;
        var size = 22;

        /*this.getWillShowButtons().sortBy(function (button) {
            return button.group;
        });*/
		this.getWillShowButtons().sort(function(a,b){
			var t = a.group;
			var tt = b.group;;
			return t>tt;
		});

        //this.getWillShowButtons().each(function (button) {
		var self = this;
		$.map(this.getWillShowButtons(),function (button) {

            var numOfButtonsPerLevel = self.getNumberOfButtonsPerLevel(button.align);

            if (button.align == ORYX.CONFIG.SHAPEMENU_LEFT) {
                // vertical levels
                if (button.group != leftButtonGroup) {
                    left = 0;
                    leftButtonGroup = button.group;
                }
                var x = Math.floor(left / numOfButtonsPerLevel)
                var y = left % numOfButtonsPerLevel;

                button.setLevel(x);

                button.setPosition(a.x - 5 - (x + 1) * size,
                    a.y + numOfButtonsPerLevel * button.group * size + button.group * 0.3 * size + y * size);

                //button.setPosition(a.x-22, a.y+left*size);
                left++;
            } else if (button.align == ORYX.CONFIG.SHAPEMENU_TOP) {
                // horizontal levels
                if (button.group != topButtonGroup) {
                    top = 0;
                    topButtonGroup = button.group;
                }
                var x = top % numOfButtonsPerLevel;
                var y = Math.floor(top / numOfButtonsPerLevel);

                button.setLevel(y);

                button.setPosition(a.x + numOfButtonsPerLevel * button.group * size + button.group * 0.3 * size + x * size,
                    a.y - 5 - (y + 1) * size);
                top++;
            } else if (button.align == ORYX.CONFIG.SHAPEMENU_BOTTOM) {
                // horizontal levels
                if (button.group != bottomButtonGroup) {
                    bottom = 0;
                    bottomButtonGroup = button.group;
                }
                var x = bottom % numOfButtonsPerLevel;
                var y = Math.floor(bottom / numOfButtonsPerLevel);

                button.setLevel(y);

                button.setPosition(a.x + numOfButtonsPerLevel * button.group * size + button.group * 0.3 * size + x * size,
                    a.y + bounds.height() + 5 + y * size);
                bottom++;
            } else {
                // vertical levels
                if (button.group != rightButtonGroup) {
                    right = 0;
                    rightButtonGroup = button.group;
                }
                var x = Math.floor(right / numOfButtonsPerLevel)
                var y = right % numOfButtonsPerLevel;

                button.setLevel(x);

                button.setPosition(a.x + bounds.width() + 5 + x * size,
                    a.y + numOfButtonsPerLevel * button.group * size + button.group * 0.3 * size + y * size - 5);
                right++;
            }

            button.show();
        });//}.bind(this));
        this.isVisible = true;

    },

    /**
     * Hide the shape menu
     */
    hide:function () {

        //this.buttons.each(function (button) {
		$.map(this.buttons,function(button){
            button.hide();
        });

        this.isVisible = false;
        //this.bounds = undefined;
        //this.shape = undefined;
    },

    hoverAlignContainer:function (align, evt) {
        //this.buttons.each(function (button) {
		$.map(this.buttons,function(button){
            if (button.align == align) button.showOpaque();
        });
    },

    resetAlignContainer:function (align, evt) {
        //this.buttons.each(function (button) {
		$.map(this.buttons,function(button){
            if (button.align == align) button.showTransparent();
        });
    },

    isHover:function () {
        return     this.buttons.any(function (value) {
            return value.isHover();
        });
    },

    getWillShowButtons:function () {
        /*return this.buttons.findAll(function (value) {
            return value.willShow
        });*/
		var tmp=[];
		$.map(this.buttons,function(value){
			if(value.willShow){
				tmp[tmp.length] = value;
			}
		});
		return tmp;  // ray jquery 改造上面的
    },

    /**
     * Returns a set on buttons for that align value
     * @params {String} align
     * @params {String} group
     */
    getButtons:function (align, group) {
        /*return this.getWillShowButtons().findAll(function (b) {
            return b.align == align && (group === undefined || b.group == group)
        })*/
		
		var tmp=[];
		$.map(this.getWillShowButtons(),function(b){
			if(b.align == align && (group === undefined || b.group == group)){
				tmp[tmp.length] = b;
			}
		});
		return tmp;  // ray jquery 改造上面的
    },

    /**
     * Set the number of buttons to display on each level of the shape menu in the specified align group.
     * Example: setNumberOfButtonsPerLevel(ORYX.CONFIG.SHAPEMENU_RIGHT, 2) causes that the buttons of the right align group
     * will be rendered in 2 rows.
     */
    setNumberOfButtonsPerLevel:function (align, number) {
        this.numberOfButtonsPerLevel[align] = number;
    },

    /**
     * Returns the number of buttons to display on each level of the shape menu in the specified align group.
     * Default value is 1
     */
    getNumberOfButtonsPerLevel:function (align) {
        if (this.numberOfButtonsPerLevel[align])
            return Math.min(this.getButtons(align, 0).length, this.numberOfButtonsPerLevel[align]);
        else
            return 1;
    }

}
ORYX.Plugins.ShapeMenu = Clazz.extend(ORYX.Plugins.ShapeMenu);


//拖动图的接收容器
ORYX.Droppable = {
	one:null,
	two:null,
	init:function(target){
		var self = null;
		using("droppable",function(){
			$(target).droppable({
				accept:'.tree-node,.Oryx_button',
				onDragEnter:function(e,source){
					if($(source).hasClass("tree-node")){
						self = ORYX.Droppable.two;
						self._lastOverElement = false;
						return true
					}
				},
				onDragOver:function(e,source){
					if($(source).hasClass("tree-node")){
						self = ORYX.Droppable.two; //new ORYX.Plugins.ShapeRepository();
						self.beforeDragOver.call(self,source,e);
					}else{
						self = ORYX.Droppable.one; //ORYX.Plugins.ShapeMenuPlugin;
						self.beforeDragOver.call(self,source,e);
					}
				},
				onDrop:function(e,source){
					if($(source).hasClass("tree-node")){
						self = ORYX.Droppable.two;
						self.drop.call(self,$(source).draggable('proxy'),source,e);
					}else{
						self = ORYX.Droppable.one;
						self.afterDragging.call(self,$(source).draggable('proxy'),source,e);
					}
				}
			});
		});
	}
}


//ray 节点对象显示图形菜单
ORYX.Plugins.ShapeMenuPlugin = {

    construct:function (facade) {
        this.facade = facade;

        this.alignGroups = new Hash();

        var containerNode = this.facade.getCanvas().getHTMLContainer();

        this.shapeMenu = new ORYX.Plugins.ShapeMenu(containerNode);
        this.currentShapes = [];

        // Register on dragging and resizing events for show/hide of ShapeMenu
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_START, this.hideShapeMenu.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END, this.showShapeMenu.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_START, (function () {
            this.hideShapeMenu();
            this.hideMorphMenu();
        }).bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END, this.showShapeMenu.bind(this));


		var target = containerNode.parentNode;
		
		ORYX.Droppable.one = this;
		ORYX.Droppable.init(target);
		

        // Memory of created Buttons
        this.createdButtons = {};

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED, (function () {
            this.registryChanged()
        }).bind(this));

        this.timer = null;

        this.resetElements = true;

    },

    hideShapeMenu:function (event) {
        window.clearTimeout(this.timer);
        this.timer = null;
		var self = this;
		 window.setTimeout(function(){
			self.shapeMenu.hide();
		 },300)
        
    },

	//显示些快捷菜单的
    showShapeMenu:function (dontGenerateNew) {
        if (!dontGenerateNew || this.resetElements) {  //点击时 dontGenerateNew 为 undefined

            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(function () {
				
                // Close all Buttons
                this.shapeMenu.closeAllButtons();

                // Show the Morph Button
                this.showMorphButton(this.currentShapes);  //ray   显示工具菜单。
                // Show the Stencil Buttons
                this.showStencilButtons(this.currentShapes);  //ray 显示流程菜单图标

                // Show the ShapeMenu
                this.shapeMenu.show(this.currentShapes);

                this.resetElements = false;
				
            }.bind(this), 300)

        } else {

            window.clearTimeout(this.timer);
            this.timer = null;

            // Show the ShapeMenu
            this.shapeMenu.show(this.currentShapes);

        }
    },

    registryChanged:function (pluginsData) {
        if (pluginsData) {
            /*pluginsData = pluginsData.each(function (value) {
                value.group = value.group ? value.group : 'unknown'
            });*/
			//var tmp=[];
			$.map(pluginsData,function(value){
				value.group = value.group ? value.group : 'unknown';
			});
			
            this.pluginsData = pluginsData.sortBy(function (value) {
                return (value.group + "" + value.index);
            });
        }
		
		

        this.shapeMenu.removeAllButtons();
        this.shapeMenu.setNumberOfButtonsPerLevel(ORYX.CONFIG.SHAPEMENU_RIGHT, 2);
        this.createdButtons = {};

        this.createMorphMenu();

        if (!this.pluginsData) {
            this.pluginsData = [];
        }

        this.baseMorphStencils = this.facade.getRules().baseMorphs();

        // Checks if the stencil set has morphing attributes
        var isMorphing = this.facade.getRules().containsMorphingRules();

        // Create Buttons for all Stencils of all loaded stencilsets
        var stencilsets = this.facade.getStencilSets();
		var self = this;
        //stencilsets.values().each((function (stencilSet) {
		
		$.map(stencilsets.values(),function (stencilSet) {
            var nodes = stencilSet.nodes();
            //nodes.each((function (stencil) {
			$.map(nodes,function (stencil) {
				
                // Create a button for each node
                var option = {type:stencil.id(), namespace:stencil.namespace(), connectingType:true};
                var button = new ORYX.Plugins.ShapeMenuButton({
                    callback:self.newShape.bind(self, option),
                    icon:stencil.icon(),
                    align:ORYX.CONFIG.SHAPEMENU_RIGHT,
                    group:0,
                    //dragcallback: this.hideShapeMenu.bind(this),
                    msg:stencil.title() + " - " + ORYX.I18N.ShapeMenuPlugin.clickDrag
                });

                // Add button to shape menu
                self.shapeMenu.addButton(button);

                // Add to the created Button Array
                self.createdButtons[stencil.namespace() + stencil.type() + stencil.id()] = button;

				
                // Drag'n'Drop will enable
				$.data(button.node.lastChild, option); 
                //Ext.dd.Registry.register(button.node.lastChild, option);
            //}).bind(this));
			});

            var edges = stencilSet.edges();
            //edges.each((function (stencil) {
			$.map(edges,function (stencil) {
                // Create a button for each edge
                var option = {type:stencil.id(), namespace:stencil.namespace()};
                var button = new ORYX.Plugins.ShapeMenuButton({
                    callback:self.newShape.bind(self, option),
                    // icon: 		isMorphing ? ORYX.PATH + "images/edges.png" : stencil.icon(),
                    icon:stencil.icon(),
                    align:ORYX.CONFIG.SHAPEMENU_RIGHT,
                    group:1,
                    //dragcallback: this.hideShapeMenu.bind(this),
                    //msg:(isMorphing ? ORYX.I18N.Edge : stencil.title()) + " - " + ORYX.I18N.ShapeMenuPlugin.drag
					msg: stencil.title() + " - " + ORYX.I18N.ShapeMenuPlugin.drag
                });

                // Add button to shape menu
                self.shapeMenu.addButton(button);

                // Add to the created Button Array
                self.createdButtons[stencil.namespace() + stencil.type() + stencil.id()] = button;
                // Drag'n'Drop will enable
				$.data(button.node.lastChild, option); 
                //Ext.dd.Registry.register(button.node.lastChild, option);
			});
            //}).bind(this));
		});
        //}).bind(this));

    },
	
	//创建图形的菜单用作变化图形类型的
    createMorphMenu:function () {
        var button = new ORYX.Plugins.ShapeMenuButton({
            hovercallback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER ? this.showMorphMenu.bind(this) : undefined),
            resetcallback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER ? this.hideMorphMenu.bind(this) : undefined),
            callback:(ORYX.CONFIG.ENABLE_MORPHMENU_BY_HOVER ? undefined : this.toggleMorphMenu.bind(this)),
            icon:ORYX.PATH + 'images/wrench_orange.png',
            align:ORYX.CONFIG.SHAPEMENU_BOTTOM,
            group:0,
            msg:ORYX.I18N.ShapeMenuPlugin.morphMsg
        });

        this.shapeMenu.setNumberOfButtonsPerLevel(ORYX.CONFIG.SHAPEMENU_BOTTOM, 1)
        this.shapeMenu.addButton(button);
		
		
		var menuItem = $("<div></div>");
		menuItem.attr("id","myMenu");
		menuItem.css({
			"width":"80px"
		});
		menuItem.appendTo($(button.node));
		this.morphMenu = menuItem;  //用作上下文菜单的
		
        this.morphButton = button;
    },

    showMorphMenu:function () {
		var pos = this.getNodePos(this.morphButton.node);
		var self = this;
		using("menu",function(){
			self.morphMenu.menu("show",pos);
		});
        
        this._morphMenuShown = true;
    },
	
	getNodePos:function(node){
		var os = $(node).offset();
		return {
			left:os.left,
			top:os.top+20
		};
	},

    hideMorphMenu:function () {
        this.morphMenu.hide();
        this._morphMenuShown = false;
    },

    toggleMorphMenu:function () {
        if (this._morphMenuShown)
            this.hideMorphMenu();
        else
            this.showMorphMenu();
    },

    onSelectionChanged:function (event) {
		if(this.facade.isValid)return;
        var elements = event.elements;

        this.hideShapeMenu();
        this.hideMorphMenu();
		
		if (this.currentShapes !== elements) {
            this.currentShapes = elements;
            this.resetElements = true;

            this.showShapeMenu();
        } else {
            this.showShapeMenu(true)
        }

    },

    /**
     * Show button for morphing the selected shape into another stencil
	 * 工具菜单转化节点图形的类型
     */
    showMorphButton:function (elements) {
        if (elements.length != 1) return;
        var possibleMorphs = this.facade.getRules().morphStencils({ stencil:elements[0].getStencil() });
		var tmp=[],self =this;
		
		possibleMorphs = $.map(possibleMorphs,function(morph){
			if (elements[0].getStencil().type() === "node") {
                //check containment rules
                if(self.facade.getRules().canContain({containingShape:elements[0].parent, containedStencil:morph})){
					tmp[tmp.length]=morph;
				}
            } else {
                //check connect rules
                if( self.facade.getRules().canConnect({
                    sourceShape:elements[0].dockers.first().getDockedShape(),
                    edgeStencil:morph,
                    targetShape:elements[0].dockers.last().getDockedShape()})){
						tmp[tmp.length]=morph;
					}
            }
		});  
		possibleMorphs = tmp;
        if (possibleMorphs.length <= 1) return; // if morphing to other stencils is not possible, don't show button
		using("menu",function(){  //上下文菜单
			self.morphMenu.menu("destroy");
			self.morphMenu.menu();
			$.map(possibleMorphs,function(morph){
				var item = {
					text: morph.title(),
					iconCls: 'icon-ok',
					id:morph.title(),
					disabled: morph.id() == elements[0].getStencil().id(),
					onclick: function(){
						self.morphShape(elements[0], morph);
					}
				};
				self.morphMenu.menu("appendItem", item);
				$("#"+morph.title()).find(".icon-ok").css({  //
					"background":"url("+morph.icon()+") no-repeat scroll center center transparent"
				});
			});
		});
        this.morphButton.prepareToShow();
    },

    /**
     * Show buttons for creating following shapes
     */
    showStencilButtons:function (elements) {

        if (elements.length != 1) return;

        //TODO temporaere nutzung des stencilsets
        var sset = this.facade.getStencilSets()[elements[0].getStencil().namespace()];

        // Get all available edges
        var edges = this.facade.getRules().outgoingEdgeStencils({canvas:this.facade.getCanvas(), sourceShape:elements[0]});

        // And find all targets for each Edge
        var targets = new Array();
        var addedEdges = new Array();

        var isMorphing = this.facade.getRules().containsMorphingRules();

        //edges.each((function (edge) {
		var self = this;
		$.map(edges,function (edge) {
            if (isMorphing) {
                if (self.baseMorphStencils.include(edge)) {
                    var shallAppear = true;
                } else {

                    // if edge is member of a morph groups where none of the base morphs is in the outgoing edges
                    // we want to display the button (but only for the first one)
                    var possibleMorphs = self.facade.getRules().morphStencils({ stencil:edge });

                    /*var shallAppear = !possibleMorphs.any((function (morphStencil) {
                        if (this.baseMorphStencils.include(morphStencil) && edges.include(morphStencil)) return true;
                        return addedEdges.include(morphStencil);
                    }).bind(this));*/
					
					var tmp = false;
					$.map(possibleMorphs,function (morphStencil) {
						if(self.baseMorphStencils.include(morphStencil) && edges.include(morphStencil)){
							tmp = true;
							return false;
						}
						if(addedEdges.include(morphStencil)){
							tmp = true;
							return false;
						}
						
					});
					shallAppear = !tmp;

                }
            }
            if (shallAppear || !isMorphing) {
                if (self.createdButtons[edge.namespace() + edge.type() + edge.id()]){
					var a = self.createdButtons[edge.namespace() + edge.type() + edge.id()];
					a.prepareToShow();
                    //self.createdButtons[edge.namespace() + edge.type() + edge.id()].prepareToShow();
					using("draggable",function(){
						$(a.node).draggable({
							revert:true,
							deltaX:10,
							deltaY:10,
							cursor:"pointer", //auto
							proxy:function(source){  //拖动时鼠标下显示的图形
								var n = $('<div class="proxy"></div>');
								n.html($(source).html()).appendTo('body');
								return n;
							},
							onStartDrag:function(){
								
							}
						});
					});
				}
                addedEdges.push(edge);
            }

            // get all targets for this edge
            targets = targets.concat(self.facade.getRules().targetStencils(
                {canvas:self.facade.getCanvas(), sourceShape:elements[0], edgeStencil:edge}));

        });//}).bind(this));
        targets.uniq();   
        var addedTargets = new Array();
		$.map(targets,function (target) {
            if (isMorphing) {
                // continue with next target stencil
                if (target.type() === "edge") return;

                // continue when stencil should not shown in the shape menu
                if (!self.facade.getRules().showInShapeMenu(target)) return

                // if target is not a base morph
				
                if (!self.baseMorphStencils.include(target)) {
                    // if target is member of a morph groups where none of the base morphs is in the targets
                    // we want to display the button (but only for the first one)

                    var possibleMorphs = self.facade.getRules().morphStencils({ stencil:target });
                    //if (possibleMorphs.size() == 0) return; // continue with next target
					if (possibleMorphs.length == 0) return;
					
					var tmp = false;
					$.map(possibleMorphs,function (morphStencil) {
						if(self.baseMorphStencils.include(morphStencil) && targets.include(morphStencil)){
							tmp = true;
							return false;
						}
						if(addedTargets.include(morphStencil)){
							tmp = true;
							return false;
						}
						
					});
					var baseMorphInTargets = tmp;
                    if (baseMorphInTargets) return; // continue with next target
                }
            }

            // if this is reached the button shall appear in the shape menu:
            if (self.createdButtons[target.namespace() + target.type() + target.id()]){
				var b = self.createdButtons[target.namespace() + target.type() + target.id()];
				b.prepareToShow();
			    //self.createdButtons[target.namespace() + target.type() + target.id()].prepareToShow();
				using("draggable",function(){
					$(b.node).draggable({
						revert:true,
						deltaX:10,
						deltaY:10,
						cursor:"pointer", //auto
						proxy:function(source){  //拖动时鼠标下显示的图形
							var n = $('<div class="proxy"></div>');
							n.html($(source).html()).appendTo('body');
							return n;
						},
						onStartDrag:function(){
							
						}
					});
				});
			}
            addedTargets.push(target);

        });//}).bind(this));

    },


    beforeDragOver:function (target, event) {

        if (this.shapeMenu.isVisible) {
            this.hideShapeMenu();
        }

        //var coord = this.facade.eventCoordinates(event.browserEvent);
		var coord = this.facade.eventCoordinatesByOffset($(target).draggable('proxy').offset());
        var aShapes = this.facade.getCanvas().getAbstractShapesAtPosition(coord);
		
        if (aShapes.length <= 0) {
            return false;
        }

        var el = aShapes.last();

        if (this._lastOverElement == el) {

            return false;

        } else {
            // check containment rules
            //var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);
			var img = $(target).find("img").get(0);
			var option = $.data(img);
            // revert to original options if these were modified
            if (option.backupOptions) {
                for (key in option.backupOptions) {
                    option[key] = option.backupOptions[key];
                }
                delete option.backupOptions;
            }

            var stencilSet = this.facade.getStencilSets()[option.namespace];

            var stencil = stencilSet.stencil(option.type);

            var candidate = aShapes.last();

            if (stencil.type() === "node") {
                //check containment rules
                var canContain = this.facade.getRules().canContain({containingShape:candidate, containedStencil:stencil});

                // if not canContain, try to find a morph which can be contained
                if (!canContain) {
                    var possibleMorphs = this.facade.getRules().morphStencils({stencil:stencil});
                    for (var i = 0; i < possibleMorphs.size(); i++) {
                        canContain = this.facade.getRules().canContain({
                            containingShape:candidate,
                            containedStencil:possibleMorphs[i]
                        });
                        if (canContain) {
                            option.backupOptions = Object.clone(option);
                            option.type = possibleMorphs[i].id();
                            option.namespace = possibleMorphs[i].namespace();
                            break;
                        }
                    }
                }

                this._currentReference = canContain ? candidate : undefined;


            } else { //Edge

                var curCan = candidate, orgCan = candidate;
                var canConnect = false;
                while (!canConnect && curCan && !(curCan instanceof ORYX.Core.Canvas)) {
                    candidate = curCan;
                    //check connection rules
                    canConnect = this.facade.getRules().canConnect({
                        sourceShape:this.currentShapes.first(),
                        edgeStencil:stencil,
                        targetShape:curCan
                    });
                    curCan = curCan.parent;
					
                }
                // if not canConnect, try to find a morph which can be connected
                if (!canConnect) {

                    candidate = orgCan;
                    var possibleMorphs = this.facade.getRules().morphStencils({stencil:stencil});
                    for (var i = 0; i < possibleMorphs.size(); i++) {
                        var curCan = candidate;
                        var canConnect = false;
                        while (!canConnect && curCan && !(curCan instanceof ORYX.Core.Canvas)) {
                            candidate = curCan;
                            //check connection rules
                            canConnect = this.facade.getRules().canConnect({
                                sourceShape:this.currentShapes.first(),
                                edgeStencil:possibleMorphs[i],
                                targetShape:curCan
                            });
                            curCan = curCan.parent;
                        }
                        if (canConnect) {
                            option.backupOptions = Object.clone(option);
                            option.type = possibleMorphs[i].id();
                            option.namespace = possibleMorphs[i].namespace();
                            break;
                        } else {
                            candidate = orgCan;
                        }
                    }
                }

                this._currentReference = canConnect ? candidate : undefined;

            }

            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId:'shapeMenu',
                elements:[candidate],
                color:this._currentReference ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
            });

            /*var pr = dragZone.getProxy();
            pr.setStatus(this._currentReference ? pr.dropAllowed : pr.dropNotAllowed);
            pr.sync();*/

        }

        this._lastOverElement = el;

        return false;
    },

    afterDragging:function (proxy, target, event) {

        if (!(this.currentShapes instanceof Array) || this.currentShapes.length <= 0) {
            return;
        }
        var sourceShape = this.currentShapes;

        this._lastOverElement = undefined;

        // Hide the highlighting
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeMenu'});

        // Check if drop is allowed
        /*var proxy = dragZone.getProxy()
        if (proxy.dropStatus == proxy.dropNotAllowed) {
            return this.facade.updateSelection();
        }*/

        // Check if there is a current Parent
        if (!this._currentReference) {
            return
        }

        /*var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);*/
		var img = $(target).find("img").get(0);
		var option = $.data(img);
		
		option['parent'] = this._currentReference;

        /*var xy = event.getXY();
        var pos = {x:xy[0], y:xy[1]};*/
		
		var xy = proxy.position();
        var pos = {x:xy.left, y:xy.top};

        var a = this.facade.getCanvas().node.getScreenCTM();
        // Correcting the UpperLeft-Offset
        pos.x -= a.e;
        pos.y -= a.f;
        // Correcting the Zoom-Faktor
        pos.x /= a.a;
        pos.y /= a.d;
        // Correcting the ScrollOffset
        pos.x -= document.documentElement.scrollLeft;
        pos.y -= document.documentElement.scrollTop;

        var parentAbs = this._currentReference.absoluteXY();
        pos.x -= parentAbs.x;
        pos.y -= parentAbs.y;

        // If the ctrl key is not pressed,
        // snapp the new shape to the center
        // if it is near to the center of the other shape
        if (!event.ctrlKey) {
            // Get the center of the shape
            var cShape = this.currentShapes[0].bounds.center();
            // Snapp +-20 Pixel horizontal to the center
            if (20 > Math.abs(cShape.x - pos.x)) {
                pos.x = cShape.x;
            }
            // Snapp +-20 Pixel vertical to the center
            if (20 > Math.abs(cShape.y - pos.y)) {
                pos.y = cShape.y;
            }
        }

        option['position'] = pos;
        option['connectedShape'] = this.currentShapes[0];
        if (option['connectingType']) {
            var stencilset = this.facade.getStencilSets()[option.namespace];
            var containedStencil = stencilset.stencil(option.type);
            var args = { sourceShape:this.currentShapes[0], targetStencil:containedStencil };
            option['connectingType'] = this.facade.getRules().connectMorph(args).id();
        }

        if (ORYX.CONFIG.SHAPEMENU_DISABLE_CONNECTED_EDGE === true) {
            delete option['connectingType'];
        }
		
        var command = new ORYX.Plugins.ShapeMenuPlugin.CreateCommand($.extend(true,{},option), this._currentReference, pos, this);

        this.facade.executeCommands([command]);

        // Inform about completed Drag
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_MENU_CLOSE, source:sourceShape, destination:this.currentShapes});

        // revert to original options if these were modified
        if (option.backupOptions) {
            for (key in option.backupOptions) {
                option[key] = option.backupOptions[key];
            }
            delete option.backupOptions;
        }

        this._currentReference = undefined;
    },

    newShape:function (option, event) {
        var stencilset = this.facade.getStencilSets()[option.namespace];
        var containedStencil = stencilset.stencil(option.type);

        if (this.facade.getRules().canContain({
            containingShape:this.currentShapes.first().parent,
            "containedStencil":containedStencil
        })) {

            option['connectedShape'] = this.currentShapes[0];
            option['parent'] = this.currentShapes.first().parent;
            option['containedStencil'] = containedStencil;

            var args = { sourceShape:this.currentShapes[0], targetStencil:containedStencil };
            var targetStencil = this.facade.getRules().connectMorph(args);
            if (!targetStencil) {
                return
            }// Check if there can be a target shape
            option['connectingType'] = targetStencil.id();

            if (ORYX.CONFIG.SHAPEMENU_DISABLE_CONNECTED_EDGE === true) {
                delete option['connectingType'];
            }

            var command = new ORYX.Plugins.ShapeMenuPlugin.CreateCommand(option, undefined, undefined, this);

            this.facade.executeCommands([command]);
        }
    },

    /**
     * Morph a shape to a new stencil
     * {Command implemented}
     * @param {Shape} shape
     * @param {Stencil} stencil
     */
    morphShape:function (shape, stencil) {

        var MorphTo = ORYX.Core.Command.extend({
            construct:function (shape, stencil, facade) {
                this.shape = shape;
                this.stencil = stencil;
                this.facade = facade;
            },
            execute:function () {

                var shape = this.shape;
                var stencil = this.stencil;
                var resourceId = shape.resourceId;

                // Serialize all attributes
                var serialized = shape.serialize();
                stencil.properties().each((function (prop) {
                    if (prop.readonly()) {
                        serialized = serialized.reject(function (serProp) {
                            return serProp.name == prop.id();
                        });
                    }
                }).bind(this));

                // Get shape if already created, otherwise create a new shape
                if (this.newShape) {
                    newShape = this.newShape;
                    this.facade.getCanvas().add(newShape);
                } else {
                    newShape = this.facade.createShape({
                        type:stencil.id(),
                        namespace:stencil.namespace(),
                        resourceId:resourceId
                    });
                }

                // calculate new bounds using old shape's upperLeft and new shape's width/height
                var boundsObj = serialized.find(function (serProp) {
                    return (serProp.prefix === "oryx" && serProp.name === "bounds");
                });

                var changedBounds = null;

                if (!this.facade.getRules().preserveBounds(shape.getStencil())) {

                    var bounds = boundsObj.value.split(",");
                    if (parseInt(bounds[0], 10) > parseInt(bounds[2], 10)) { // if lowerRight comes first, swap array items
                        var tmp = bounds[0];
                        bounds[0] = bounds[2];
                        bounds[2] = tmp;
                        tmp = bounds[1];
                        bounds[1] = bounds[3];
                        bounds[3] = tmp;
                    }
                    bounds[2] = parseInt(bounds[0], 10) + newShape.bounds.width();
                    bounds[3] = parseInt(bounds[1], 10) + newShape.bounds.height();
                    boundsObj.value = bounds.join(",");

                } else {

                    var height = shape.bounds.height();
                    var width = shape.bounds.width();

                    // consider the minimum and maximum size of
                    // the new shape

                    if (newShape.minimumSize) {
                        if (shape.bounds.height() < newShape.minimumSize.height) {
                            height = newShape.minimumSize.height;
                        }


                        if (shape.bounds.width() < newShape.minimumSize.width) {
                            width = newShape.minimumSize.width;
                        }
                    }

                    if (newShape.maximumSize) {
                        if (shape.bounds.height() > newShape.maximumSize.height) {
                            height = newShape.maximumSize.height;
                        }

                        if (shape.bounds.width() > newShape.maximumSize.width) {
                            width = newShape.maximumSize.width;
                        }
                    }

                    changedBounds = {
                        a:{
                            x:shape.bounds.a.x,
                            y:shape.bounds.a.y
                        },
                        b:{
                            x:shape.bounds.a.x + width,
                            y:shape.bounds.a.y + height
                        }
                    };

                }

                var oPos = shape.bounds.center();
                if (changedBounds !== null) {
                    newShape.bounds.set(changedBounds);
                }

                // Set all related dockers
                this.setRelatedDockers(shape, newShape);

                // store DOM position of old shape
                var parentNode = shape.node.parentNode;
                var nextSibling = shape.node.nextSibling;

                // Delete the old shape
                this.facade.deleteShape(shape);

                // Deserialize the new shape - Set all attributes
                newShape.deserialize(serialized);
                /*
                 * Change color to default if unchanged
                 * 23.04.2010
                 */
                if (shape.getStencil().property("oryx-bgcolor")
                    && shape.properties["oryx-bgcolor"]
                    && shape.getStencil().property("oryx-bgcolor").value().toUpperCase() == shape.properties["oryx-bgcolor"].toUpperCase()) {
                    if (newShape.getStencil().property("oryx-bgcolor")) {
                        newShape.setProperty("oryx-bgcolor", newShape.getStencil().property("oryx-bgcolor").value());
                    }
                }
                if (changedBounds !== null) {
                    newShape.bounds.set(changedBounds);
                }

                if (newShape.getStencil().type() === "edge" || (newShape.dockers.length == 0 || !newShape.dockers[0].getDockedShape())) {
                    newShape.bounds.centerMoveTo(oPos);
                }

                if (newShape.getStencil().type() === "node" && (newShape.dockers.length == 0 || !newShape.dockers[0].getDockedShape())) {
                    this.setRelatedDockers(newShape, newShape);

                }

                // place at the DOM position of the old shape
                if (nextSibling) parentNode.insertBefore(newShape.node, nextSibling);
                else parentNode.appendChild(newShape.node);

                // Set selection
                this.facade.setSelection([newShape]);
                this.facade.getCanvas().update();
                this.facade.updateSelection();
                this.newShape = newShape;

            },
            rollback:function () {

                if (!this.shape || !this.newShape || !this.newShape.parent) {
                    return
                }

                // Append shape to the parent
                this.newShape.parent.add(this.shape);
                // Set dockers
                this.setRelatedDockers(this.newShape, this.shape);
                // Delete new shape
                this.facade.deleteShape(this.newShape);
                // Set selection
                this.facade.setSelection([this.shape]);
                // Update
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            },

            /**
             * Set all incoming and outgoing edges from the shape to the new shape
             * @param {Shape} shape
             * @param {Shape} newShape
             */
            setRelatedDockers:function (shape, newShape) {

                if (shape.getStencil().type() === "node") {

                    (shape.incoming || []).concat(shape.outgoing || [])
                        .each(function (i) {
                            i.dockers.each(function (docker) {
                                if (docker.getDockedShape() == shape) {
                                    //var rPoint = Object.clone(docker.referencePoint);
									var rPoint = $.extend(true,{},docker.referencePoint);
                                    // Move reference point per percent

                                    var rPointNew = {
                                        x:rPoint.x * newShape.bounds.width() / shape.bounds.width(),
                                        y:rPoint.y * newShape.bounds.height() / shape.bounds.height()
                                    };

                                    docker.setDockedShape(newShape);
                                    // Set reference point and center to new position
                                    docker.setReferencePoint(rPointNew);
                                    if (i instanceof ORYX.Core.Edge) {
                                        docker.bounds.centerMoveTo(rPointNew);
                                    } else {
                                        var absXY = shape.absoluteXY();
                                        docker.bounds.centerMoveTo({x:rPointNew.x + absXY.x, y:rPointNew.y + absXY.y});
                                        //docker.bounds.moveBy({x:rPointNew.x-rPoint.x, y:rPointNew.y-rPoint.y});
                                    }
                                }
                            });
                        });

                    // for attached events
                    if (shape.dockers.length > 0 && shape.dockers.first().getDockedShape()) {
                        newShape.dockers.first().setDockedShape(shape.dockers.first().getDockedShape());
                        newShape.dockers.first().setReferencePoint(Object.clone(shape.dockers.first().referencePoint));
                    }

                } else { // is edge
                    newShape.dockers.first().setDockedShape(shape.dockers.first().getDockedShape());
                    newShape.dockers.first().setReferencePoint(shape.dockers.first().referencePoint);
                    newShape.dockers.last().setDockedShape(shape.dockers.last().getDockedShape());
                    newShape.dockers.last().setReferencePoint(shape.dockers.last().referencePoint);
                }
            }
        });

        // Create and execute command (for undo/redo)
        var command = new MorphTo(shape, stencil, this.facade);
        this.facade.executeCommands([command]);
    }
}
ORYX.Plugins.ShapeMenuPlugin = ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.ShapeMenuPlugin);


// object 模型菜单
ORYX.Plugins.ShapeMenuButton = {

    /**
     * Constructor
     * @param option A key map specifying the configuration options:
     *                     id:     (String) The id of the parent DOM element for the new button
     *                     icon:     (String) The url to the icon of the button
     *                     msg:    (String) A tooltip message
     *                     caption:(String) The caption of the button (attention: button width > 22, only set for single column button layouts)
     *                     align:    (String) The direction in which the button is aligned
     *                     group:     (Integer) The button group in the specified alignment
     *                             (buttons in the same group will be aligned side by side)
     *                     callback:        (Function) A callback that is executed when the button is clicked
     *                     dragcallback:    (Function) A callback that is executed when the button is dragged
     *                     hovercallback:    (Function) A callback that is executed when the button is hovered
     *                     resetcallback:    (Function) A callback that is executed when the button is reset
     *                     arguments:        (Array) An argument array to pass to the callback functions
     */
    construct:function (option) {

        if (option) {
            this.option = option;
            if (!this.option.arguments)
                this.option.arguments = [];
        } else {
            //TODO error
        }

        this.parentId = this.option.id ? this.option.id : null;

        // graft the button.
        var buttonClassName = this.option.caption ? "Oryx_button_with_caption" : "Oryx_button";
        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", $(this.parentId),
            ['div', {'class':buttonClassName}]);

        var imgOptions = {src:this.option.icon};
        if (this.option.msg) {
            imgOptions.title = this.option.msg;
        }

        // graft and update icon (not in grafting for ns reasons).
        //TODO Enrich graft()-function to do this in one of the above steps.
        if (this.option.icon)
            ORYX.Editor.graft("http://www.w3.org/1999/xhtml", this.node,
                ['img', imgOptions]);

        if (this.option.caption) {
            var captionNode = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", this.node, ['span']);
            ORYX.Editor.graft("http://www.w3.org/1999/xhtml", captionNode, this.option.caption);
        }

        var onBubble = false;

        //this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER, this.hover.bind(this), onBubble);
        //this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT, this.reset.bind(this), onBubble);
        //this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN, this.activate.bind(this), onBubble);
        //this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.hover.bind(this), onBubble);
        this.node.addEventListener('click', this.trigger.bind(this), onBubble);
        this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.move.bind(this), onBubble);

        this.align = this.option.align ? this.option.align : ORYX.CONFIG.SHAPEMENU_RIGHT;
        this.group = this.option.group ? this.option.group : 0;

        this.hide();

        this.dragStart = false;
        this.isVisible = false;
        this.willShow = false;
        this.resetTimer;
    },

    hide:function () {
        this.node.style.display = "none";
        this.isVisible = false;
    },

    show:function () {
        this.node.style.display = "";
        this.node.style.opacity = this.opacity;
        this.isVisible = true;
    },

    showOpaque:function () {
        this.node.style.opacity = 1.0;
    },

    showTransparent:function () {
        this.node.style.opacity = this.opacity;
    },

    prepareToShow:function () {
        this.willShow = true;
    },

    prepareToHide:function () {
        this.willShow = false;
        this.hide();
    },

    setPosition:function (x, y) {
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
    },

    setLevel:function (level) {
        if (level == 0) this.opacity = 0.5;
        else if (level == 1) this.opacity = 0.2;
        //else if(level==2) this.opacity = 0.1;
        else this.opacity = 0.0;
    },

    setChildWidth:function (width) {
        this.childNode.style.width = width + "px";
    },

    reset:function (evt) {
        // Delete the timeout for hiding
        window.clearTimeout(this.resetTimer)
        this.resetTimer = window.setTimeout(this.doReset.bind(this), 100)

        if (this.option.resetcallback) {
            this.option.arguments.push(evt);
            var state = this.option.resetcallback.apply(this, this.option.arguments);
            this.option.arguments.remove(evt);
        }
    },

    doReset:function () {
        if ($(this.node).hasClass('Oryx_down'))
            $(this.node).removeClass('Oryx_down');

        if ($(this.node).hasClass('Oryx_hover'))
            $(this.node).removeClass('Oryx_hover');

    },

    activate:function (evt) {
        //this.node.addClassName('Oryx_down');
		$(this.node).addClass('Oryx_down');
        //Event.stop(evt);  //注销了点击的时候又不会生成新图形了。但是拖动的会有效果
        this.dragStart = true;
    },

    isHover:function () {
        //return this.node.hasClassName('Oryx_hover') ? true : false;
		return $(this.node).hasClass('Oryx_hover');
    },

    hover:function (evt) {
        // Delete the timeout for hiding
        window.clearTimeout(this.resetTimer)
        this.resetTimer = null;

        //this.node.addClassName('Oryx_hover');
		$(this.node).addClass('Oryx_hover');
        this.dragStart = false;

        if (this.option.hovercallback) {
            this.option.arguments.push(evt);
            var state = this.option.hovercallback.apply(this, this.option.arguments);
            this.option.arguments.remove(evt);
        }
    },

    move:function (evt) {
        if (this.dragStart && this.option.dragcallback) {
            this.option.arguments.push(evt);
            var state = this.option.dragcallback.apply(this, this.option.arguments);
            this.option.arguments.remove(evt);
        }
    },

    trigger:function (evt) {
        if (this.option.callback) {
            Event.stop(evt);
            this.option.arguments.push(evt);
            var state = this.option.callback.apply(this, this.option.arguments);
            this.option.arguments.remove(evt);
        }
        this.dragStart = false;
    },

    toString:function () {
        return "HTML-Button " + this.id;
    }
}
ORYX.Plugins.ShapeMenuButton = Clazz.extend(ORYX.Plugins.ShapeMenuButton);

// object
//create command for undo/redo
ORYX.Plugins.ShapeMenuPlugin.CreateCommand = ORYX.Core.Command.extend({
    construct:function (option, currentReference, position, plugin) {
        this.option = option;
        this.currentReference = currentReference;
        this.position = position;
        this.plugin = plugin;
        this.shape;
        this.edge;
        this.targetRefPos;
        this.sourceRefPos;
        /*
         * clone options parameters
         */
        this.connectedShape = option.connectedShape;
        this.connectingType = option.connectingType;
        this.namespace = option.namespace;
        this.type = option.type;
        this.containedStencil = option.containedStencil;
        this.parent = option.parent;
        this.currentReference = currentReference;
        this.shapeOptions = option.shapeOptions;
    },
    execute:function () {

        var resume = false;

        if (this.shape) {
            if (this.shape instanceof ORYX.Core.Node) {
                this.parent.add(this.shape);
                if (this.edge) {
                    this.plugin.facade.getCanvas().add(this.edge);
                    this.edge.dockers.first().setDockedShape(this.connectedShape);
                    this.edge.dockers.first().setReferencePoint(this.sourceRefPos);
                    this.edge.dockers.last().setDockedShape(this.shape);
                    this.edge.dockers.last().setReferencePoint(this.targetRefPos);
                }

                this.plugin.facade.setSelection([this.shape]);

            } else if (this.shape instanceof ORYX.Core.Edge) {
                this.plugin.facade.getCanvas().add(this.shape);
                this.shape.dockers.first().setDockedShape(this.connectedShape);
                this.shape.dockers.first().setReferencePoint(this.sourceRefPos);
            }
            resume = true;
        }
        else {
            this.shape = this.plugin.facade.createShape(this.option);
            this.edge = (!(this.shape instanceof ORYX.Core.Edge)) ? this.shape.getIncomingShapes().first() : undefined;
        }

        if (this.currentReference && this.position) {

            if (this.shape instanceof ORYX.Core.Edge) {

                if (!(this.currentReference instanceof ORYX.Core.Canvas)) {
                    this.shape.dockers.last().setDockedShape(this.currentReference);

                    // @deprecated It now uses simply the midpoint
                    var upL = this.currentReference.absoluteXY();
                    var refPos = {
                        x:this.position.x - upL.x,
                        y:this.position.y - upL.y
                    };

                    this.shape.dockers.last().setReferencePoint(this.currentReference.bounds.midPoint());
                }
                else {
                    this.shape.dockers.last().bounds.centerMoveTo(this.position);
                    //this.shape.dockers.last().update();
                }
                this.sourceRefPos = this.shape.dockers.first().referencePoint;
                this.targetRefPos = this.shape.dockers.last().referencePoint;

            } else if (this.edge) {
                this.sourceRefPos = this.edge.dockers.first().referencePoint;
                this.targetRefPos = this.edge.dockers.last().referencePoint;
            }
        } else {
            var containedStencil = this.containedStencil;
            var connectedShape = this.connectedShape;
            var bc = connectedShape.bounds;
            var bs = this.shape.bounds;

            var pos = bc.center();
            if (containedStencil.defaultAlign() === "north") {
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "northeast") {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "southeast") {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "south") {
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "southwest") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "west") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.width() / 2);
            } else if (containedStencil.defaultAlign() === "northwest") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.width() / 2);
            }

            // Move shape to the new position
            this.shape.bounds.centerMoveTo(pos);

            // Move all dockers of a node to the position
            if (this.shape instanceof ORYX.Core.Node) {
                //(this.shape.dockers || []).each(function (docker) {
				$.map((this.shape.dockers || []),function (docker) {
                    docker.bounds.centerMoveTo(pos);
                })
            }

            //this.shape.update();
            this.position = pos;

            if (this.edge) {
                this.sourceRefPos = this.edge.dockers.first().referencePoint;
                this.targetRefPos = this.edge.dockers.last().referencePoint;
            }
        }

        this.plugin.facade.getCanvas().update();
        this.plugin.facade.updateSelection();

        if (!resume) {
            // If there is a connected shape
            if (this.edge) {
                // Try to layout it
                this.plugin.doLayout(this.edge);
            } else if (this.shape instanceof ORYX.Core.Edge) {
                // Try to layout it
                this.plugin.doLayout(this.shape);
            }
        }

    },
    rollback:function () {
        this.plugin.facade.deleteShape(this.shape);
        if (this.edge) {
            this.plugin.facade.deleteShape(this.edge);
        }
        //this.currentParent.update();
        this.plugin.facade.setSelection(this.plugin.facade.getSelection().without(this.shape, this.edge));
    }
});


// object
ORYX.Plugins.Loading = {

    construct:function (facade) {

        this.facade = facade;

        // The parent Node
        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", this.facade.getCanvas().getHTMLContainer().parentNode, ['div', {
            'class':'LoadingIndicator'
        }, '']);

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADING_ENABLE, this.enableLoading.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADING_DISABLE, this.disableLoading.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADING_STATUS, this.showStatus.bind(this));

        this.disableLoading();
    },

    enableLoading:function (options) {
        if (options.text)
            this.node.innerHTML = options.text + "...";
        else
            this.node.innerHTML = ORYX.I18N.Loading.waiting;
        this.node.removeClassName('StatusIndicator');
        this.node.addClassName('LoadingIndicator');
        this.node.style.display = "block";

        var pos = this.facade.getCanvas().rootNode.parentNode.parentNode.parentNode.parentNode;

        this.node.style.top = pos.offsetTop + 'px';
        this.node.style.left = pos.offsetLeft + 'px';

    },

    disableLoading:function () {
        this.node.style.display = "none";
    },

    showStatus:function (options) {
        if (options.text) {
            this.node.innerHTML = options.text;
            this.node.addClassName('StatusIndicator');
            this.node.removeClassName('LoadingIndicator');
            this.node.style.display = 'block';

            var pos = this.facade.getCanvas().rootNode.parentNode.parentNode.parentNode.parentNode;

            this.node.style.top = pos.offsetTop + 'px';
            this.node.style.left = pos.offsetLeft + 'px';

            var tout = options.timeout ? options.timeout : 2000;

            window.setTimeout((function () {

                this.disableLoading();

            }).bind(this), tout);
        }

    }
}

ORYX.Plugins.Loading = Clazz.extend(ORYX.Plugins.Loading);


// object

ORYX.Plugins.GridLine = Clazz.extend({

    construct:function (parentId, direction) {

        if (ORYX.Plugins.GridLine.DIR_HORIZONTAL !== direction && ORYX.Plugins.GridLine.DIR_VERTICAL !== direction) {
            direction = ORYX.Plugins.GridLine.DIR_HORIZONTAL
        }

		//this.parent = $(parentId);
        this.parent = $(parentId)[0];
        this.direction = direction;
        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.parent,
            ['g']);

        this.line = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.node,
            ['path', {
                'stroke-width':1, stroke:'silver', fill:'none',
                'stroke-dasharray':'5,5',
                'pointer-events':'none'}]);

        this.hide();

    },

    hide:function () {
        this.node.setAttributeNS(null, 'display', 'none');
    },

    show:function () {
        this.node.setAttributeNS(null, 'display', '');
    },

    getScale:function () {
        try {
            return this.parent.parentNode.transform.baseVal.getItem(0).matrix.a;
        } catch (e) {
            return 1;
        }
    },

    update:function (pos) {

        if (this.direction === ORYX.Plugins.GridLine.DIR_HORIZONTAL) {
            var y = pos instanceof Object ? pos.y : pos;
            var cWidth = this.parent.parentNode.parentNode.width.baseVal.value / this.getScale();
            this.line.setAttributeNS(null, 'd', 'M 0 ' + y + ' L ' + cWidth + ' ' + y);
        } else {
            var x = pos instanceof Object ? pos.x : pos;
			
            var cHeight = this.parent.parentNode.parentNode.height.baseVal.value / this.getScale();
            this.line.setAttributeNS(null, 'd', 'M' + x + ' 0 L ' + x + ' ' + cHeight);
        }

        this.show();
    }


});

ORYX.Plugins.GridLine.DIR_HORIZONTAL = "hor";
ORYX.Plugins.GridLine.DIR_VERTICAL = "ver";


// object
ORYX.Plugins.CanvasResize = Clazz.extend({

    construct:function (facade) {

        this.facade = facade;

        new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(), "N", this.resize.bind(this));
        new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(), "W", this.resize.bind(this));
        new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(), "E", this.resize.bind(this));
        new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(), "S", this.resize.bind(this));

    },

    resize:function (position, shrink) {

        resizeCanvas = function (position, extentionSize, facade) {
            var canvas = facade.getCanvas();
            var b = canvas.bounds;
            var scrollNode = facade.getCanvas().getHTMLContainer().parentNode.parentNode;

            if (position == "E" || position == "W") {
                canvas.setSize({width:(b.width() + extentionSize) * canvas.zoomLevel, height:(b.height()) * canvas.zoomLevel})

            } else if (position == "S" || position == "N") {
                canvas.setSize({width:(b.width()) * canvas.zoomLevel, height:(b.height() + extentionSize) * canvas.zoomLevel})
            }

            if (position == "N" || position == "W") {

                var move = position == "N" ? {x:0, y:extentionSize} : {x:extentionSize, y:0 };

                // Move all children
                canvas.getChildNodes(false, function (shape) {
                    shape.bounds.moveBy(move)
                })
                // Move all dockers, when the edge has at least one docked shape
                var edges = canvas.getChildEdges().findAll(function (edge) {
                    return edge.getAllDockedShapes().length > 0
                })
                var dockers = edges.collect(function (edge) {
                    return edge.dockers.findAll(function (docker) {
                        return !docker.getDockedShape()
                    })
                }).flatten();
                dockers.each(function (docker) {
                    docker.bounds.moveBy(move)
                })
            } else if (position == "S") {
                scrollNode.scrollTop += extentionSize;
            } else if (position == "E") {
                scrollNode.scrollLeft += extentionSize;
            }

            canvas.update();
            facade.updateSelection();
        }

        var commandClass = ORYX.Core.Command.extend({
            construct:function (position, extentionSize, facade) {
                this.position = position;
                this.extentionSize = extentionSize;
                this.facade = facade;
            },
            execute:function () {
                resizeCanvas(this.position, this.extentionSize, this.facade);
            },
            rollback:function () {
                resizeCanvas(this.position, -this.extentionSize, this.facade);
            },
            update:function () {
            }
        });

        var extentionSize = ORYX.CONFIG.CANVAS_RESIZE_INTERVAL;
        if (shrink) extentionSize = -extentionSize;
        var command = new commandClass(position, extentionSize, this.facade);

        this.facade.executeCommands([command]);

    }

});



// object 画布上下顶部增加
ORYX.Plugins.CanvasResizeButton = Clazz.extend({

    construct:function (canvas, position, callback) {
        this.canvas = canvas;
        var parentNode = canvas.getHTMLContainer().parentNode.parentNode.parentNode;

		
		
        window.myParent = parentNode
        //var scrollNode = parentNode.firstChild;
        //var svgRootNode = scrollNode.firstChild.firstChild;
		
		var scrollNode = $(parentNode).children().first().get(0);
		var svgRootNode = $(scrollNode).children().first().children().first().get(0);
        // The buttons
        var buttonGrow = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", parentNode, ['div', { 'class':'canvas_resize_indicator canvas_resize_indicator_grow' + ' ' + position, 'title':ORYX.I18N.RESIZE.tipGrow + ORYX.I18N.RESIZE[position]}]);
        var buttonShrink = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", parentNode, ['div', { 'class':'canvas_resize_indicator canvas_resize_indicator_shrink' + ' ' + position, 'title':ORYX.I18N.RESIZE.tipShrink + ORYX.I18N.RESIZE[position]}]);

        // Defines a callback which gives back
        // a boolean if the current mouse event
        // is over the particular button area
        var offSetWidth = 60;
        var isOverOffset = function (event) {
            if (event.target != parentNode && event.target != scrollNode && event.target != scrollNode.firstChild && event.target != svgRootNode && event.target != scrollNode) {
                return false
            }
            //if(inCanvas){offSetWidth=30}else{offSetWidth=30*2}
            //Safari work around
            var X = event.layerX !== undefined ? event.layerX : event.offsetX;
            var Y = event.layerY !== undefined ? event.layerY : event.offsetY;

            if ((X - scrollNode.scrollLeft) < 0 || isSafari()) {
                X += scrollNode.scrollLeft;
            }
            if ((Y - scrollNode.scrollTop ) < 0 || isSafari()) {
                Y += scrollNode.scrollTop;
            }

            //

            if (position == "N") {
                return  Y < offSetWidth + scrollNode.firstChild.offsetTop;
            } else if (position == "W") {
                return X < offSetWidth + scrollNode.firstChild.offsetLeft;
            } else if (position == "E") {
                //other offset
                var offsetRight = (scrollNode.offsetWidth - (scrollNode.firstChild.offsetLeft + scrollNode.firstChild.offsetWidth));
                if (offsetRight < 0)offsetRight = 0;
                return X > scrollNode.scrollWidth - offsetRight - offSetWidth;
            } else if (position == "S") {
                //other offset
                var offsetDown = (scrollNode.offsetHeight - (scrollNode.firstChild.offsetTop + scrollNode.firstChild.offsetHeight));
                if (offsetDown < 0)offsetDown = 0;

                return Y > scrollNode.scrollHeight - offsetDown - offSetWidth;
            }

            return false;
        }

        var showButtons = (function () {
            //buttonGrow.show();
			$(buttonGrow).show();

            var x1, y1, x2, y2;
            try {
                var bb = this.canvas.getRootNode().childNodes[1].getBBox();
                x1 = bb.x;
                y1 = bb.y;
                x2 = bb.x + bb.width;
                y2 = bb.y + bb.height;
            } catch (e) {
                this.canvas.getChildShapes(true).each(function (shape) {
                    var absBounds = shape.absoluteBounds();
                    var ul = absBounds.upperLeft();
                    var lr = absBounds.lowerRight();
                    if (x1 == undefined) {
                        x1 = ul.x;
                        y1 = ul.y;
                        x2 = lr.x;
                        y2 = lr.y;
                    } else {
                        x1 = Math.min(x1, ul.x);
                        y1 = Math.min(y1, ul.y);
                        x2 = Math.max(x2, lr.x);
                        y2 = Math.max(y2, lr.y);
                    }
                });
            }

            var w = canvas.bounds.width();
            var h = canvas.bounds.height();

            //var isEmpty = canvas.getChildNodes().size() == 0;
			
			var isEmpty = canvas.getChildNodes().length == 0;

            if (position == "N" && (y1 > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL || (isEmpty && h > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))) $(buttonShrink).show();
            else if (position == "E" && (w - x2) > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL) $(buttonShrink).show();
            else if (position == "S" && (h - y2) > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL) $(buttonShrink).show();
            else if (position == "W" && (x1 > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL || (isEmpty && w > ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))) $(buttonShrink).show();
            else $(buttonShrink).hide();
        }).bind(this);

        var hideButtons = function () {
            //buttonGrow.hide();
            //buttonShrink.hide();
			$(buttonGrow).hide();
			$(buttonShrink).hide();
        }

        // If the mouse move is over the button area, show the button
        scrollNode.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, function (event) {
            if (isOverOffset(event)) {
                showButtons();
            } else {
                hideButtons()
            }
        }, false);
        // If the mouse is over the button, show them
        buttonGrow.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER, function (event) {
            showButtons();
        }, true);
        buttonShrink.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER, function (event) {
            showButtons();
        }, true);
        // If the mouse is out, hide the button
        //scrollNode.addEventListener(		ORYX.CONFIG.EVENT_MOUSEOUT, 	function(event){button.hide()}, true )
        parentNode.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT, function (event) {
            hideButtons()
        }, true);
        //svgRootNode.addEventListener(	ORYX.CONFIG.EVENT_MOUSEOUT, 	function(event){ inCanvas = false } , true );

        // Hide the button initialy
        hideButtons();

        // Add the callbacks
        buttonGrow.addEventListener('click', function () {
            callback(position);
            showButtons();
        }, true);
        buttonShrink.addEventListener('click', function () {
            callback(position, true);
            showButtons();
        }, true);

    }
});

//ray对象 节点放大缩小指示
ORYX.Plugins.Resizer = Clazz.extend({

    construct:function (parentId, orientation, facade) {

        this.parentId = parentId;
        this.orientation = orientation;
        this.facade = facade;
        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml", $(this.parentId),
            ['div', {'class':'resizer_' + this.orientation, style:'left:0px; top:0px;'}]);

        this.node.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this), true);
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.handleMouseUp.bind(this), true);
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.handleMouseMove.bind(this), false);

        this.dragEnable = false;
        this.offSetPosition = {x:0, y:0};
        this.bounds = undefined;

        this.canvasNode = this.facade.getCanvas().node;

        this.minSize = undefined;
        this.maxSize = undefined;

        this.aspectRatio = undefined;

        this.resizeCallbacks = [];
        this.resizeStartCallbacks = [];
        this.resizeEndCallbacks = [];
        this.hide();

        // Calculate the Offset
        this.scrollNode = this.node.parentNode.parentNode.parentNode;


    },

	//拖动时会触发的事件
    handleMouseDown:function (event) {
        this.dragEnable = true;

        this.offsetScroll = {x:this.scrollNode.scrollLeft, y:this.scrollNode.scrollTop};

        this.offSetPosition = {
            x:Event.pointerX(event) - this.position.x,
            y:Event.pointerY(event) - this.position.y};

        //this.resizeStartCallbacks.each((function (value) {
		var self = this;
		$.map(this.resizeStartCallbacks,function (value) {
            value(self.bounds);
		});
        //}).bind(this));

    },

    handleMouseUp:function (event) {
        this.dragEnable = false;
        this.containmentParentNode = null;
        //this.resizeEndCallbacks.each((function (value) {
		var self = this;
		$.map(this.resizeEndCallbacks,function (value) {
            value(self.bounds);
		});
        //}).bind(this));

    },

    handleMouseMove:function (event) {
        if (!this.dragEnable) {
            return
        }

        if (event.shiftKey || event.ctrlKey) {
            this.aspectRatio = this.bounds.width() / this.bounds.height();
        } else {
            this.aspectRatio = undefined;
        }

        var position = {
            x:Event.pointerX(event) - this.offSetPosition.x,
            y:Event.pointerY(event) - this.offSetPosition.y}


        position.x -= this.offsetScroll.x - this.scrollNode.scrollLeft;
        position.y -= this.offsetScroll.y - this.scrollNode.scrollTop;

        position.x = Math.min(position.x, this.facade.getCanvas().bounds.width())
        position.y = Math.min(position.y, this.facade.getCanvas().bounds.height())

        var offset = {
            x:position.x - this.position.x,
            y:position.y - this.position.y
        }

        if (this.aspectRatio) {
            // fixed aspect ratio
            newAspectRatio = (this.bounds.width() + offset.x) / (this.bounds.height() + offset.y);
            if (newAspectRatio > this.aspectRatio) {
                offset.x = this.aspectRatio * (this.bounds.height() + offset.y) - this.bounds.width();
            } else if (newAspectRatio < this.aspectRatio) {
                offset.y = (this.bounds.width() + offset.x) / this.aspectRatio - this.bounds.height();
            }
        }

        // respect minimum and maximum sizes of stencil
        if (this.orientation === "northwest") {
            if (this.bounds.width() - offset.x > this.maxSize.width) {
                offset.x = -(this.maxSize.width - this.bounds.width());
                if (this.aspectRatio)
                    offset.y = this.aspectRatio * offset.x;
            }
            if (this.bounds.width() - offset.x < this.minSize.width) {
                offset.x = -(this.minSize.width - this.bounds.width());
                if (this.aspectRatio)
                    offset.y = this.aspectRatio * offset.x;
            }
            if (this.bounds.height() - offset.y > this.maxSize.height) {
                offset.y = -(this.maxSize.height - this.bounds.height());
                if (this.aspectRatio)
                    offset.x = offset.y / this.aspectRatio;
            }
            if (this.bounds.height() - offset.y < this.minSize.height) {
                offset.y = -(this.minSize.height - this.bounds.height());
                if (this.aspectRatio)
                    offset.x = offset.y / this.aspectRatio;
            }
        } else { // defaults to southeast
            if (this.bounds.width() + offset.x > this.maxSize.width) {
                offset.x = this.maxSize.width - this.bounds.width();
                if (this.aspectRatio)
                    offset.y = this.aspectRatio * offset.x;
            }
            if (this.bounds.width() + offset.x < this.minSize.width) {
                offset.x = this.minSize.width - this.bounds.width();
                if (this.aspectRatio)
                    offset.y = this.aspectRatio * offset.x;
            }
            if (this.bounds.height() + offset.y > this.maxSize.height) {
                offset.y = this.maxSize.height - this.bounds.height();
                if (this.aspectRatio)
                    offset.x = offset.y / this.aspectRatio;
            }
            if (this.bounds.height() + offset.y < this.minSize.height) {
                offset.y = this.minSize.height - this.bounds.height();
                if (this.aspectRatio)
                    offset.x = offset.y / this.aspectRatio;
            }
        }

        if (this.orientation === "northwest") {
            var oldLR = {x:this.bounds.lowerRight().x, y:this.bounds.lowerRight().y};
            this.bounds.extend({x:-offset.x, y:-offset.y});
            this.bounds.moveBy(offset);
        } else { // defaults to southeast
            this.bounds.extend(offset);
        }

        this.update();
		var self = this;
        //this.resizeCallbacks.each((function (value) {
		$.map(this.resizeCallbacks,function (value) {
            value(self.bounds);
        });
		//}).bind(this));

        Event.stop(event);

    },

    registerOnResizeStart:function (callback) {
        //if (!this.resizeStartCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeStartCallbacks)<0){
            this.resizeStartCallbacks.push(callback);
        }
    },

    unregisterOnResizeStart:function (callback) {
        //if (this.resizeStartCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeStartCallbacks)>=0){
            //this.resizeStartCallbacks = this.resizeStartCallbacks.without(callback);
			this.resizeStartCallbacks = $.grep(this.resizeStartCallbacks,function(n){return n!=callback});
        }
    },

    registerOnResizeEnd:function (callback) {
        //if (!this.resizeEndCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeEndCallbacks)<0){
            this.resizeEndCallbacks.push(callback);
        }
    },

    unregisterOnResizeEnd:function (callback) {
        //if (this.resizeEndCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeEndCallbacks)>=0){
            //this.resizeEndCallbacks = this.resizeEndCallbacks.without(callback);
			this.resizeEndCallbacks = $.grep(this.resizeEndCallbacks,function(n){return n!=callback});
        }
    },

    registerOnResize:function (callback) {
        //if (!this.resizeCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeCallbacks)<0){
            this.resizeCallbacks.push(callback);
        }
    },

    unregisterOnResize:function (callback) {
        //if (this.resizeCallbacks.member(callback)) {
		if($.inArray(callback,this.resizeCallbacks)>=0){
            //this.resizeCallbacks = this.resizeCallbacks.without(callback);
			this.resizeCallbacks = $.grep(this.resizeCallbacks,function(n){return n!=callback});
        }
    },

    hide:function () {
        this.node.style.display = "none";
    },

    show:function () {
        if (this.bounds)
            this.node.style.display = "";
    },

    setBounds:function (bounds, min, max, aspectRatio) {
        this.bounds = bounds;
		
        if (!min)
            min = {width:ORYX.CONFIG.MINIMUM_SIZE, height:ORYX.CONFIG.MINIMUM_SIZE};

        if (!max)
            max = {width:ORYX.CONFIG.MAXIMUM_SIZE, height:ORYX.CONFIG.MAXIMUM_SIZE};

        this.minSize = min;
        this.maxSize = max;

        this.aspectRatio = aspectRatio;

        this.update();
    },

    update:function () {
        if (!this.bounds) {
            return;
        }

        var upL = this.bounds.upperLeft();

        if (this.bounds.width() < this.minSize.width) {
            this.bounds.set(upL.x, upL.y, upL.x + this.minSize.width, upL.y + this.bounds.height())
        }
        ;
        if (this.bounds.height() < this.minSize.height) {
            this.bounds.set(upL.x, upL.y, upL.x + this.bounds.width(), upL.y + this.minSize.height)
        }
        ;
        if (this.bounds.width() > this.maxSize.width) {
            this.bounds.set(upL.x, upL.y, upL.x + this.maxSize.width, upL.y + this.bounds.height())
        }
        ;
        if (this.bounds.height() > this.maxSize.height) {
            this.bounds.set(upL.x, upL.y, upL.x + this.bounds.width(), upL.y + this.maxSize.height)
        }
        ;

        var a = this.canvasNode.getScreenCTM();

        upL.x *= a.a;
        upL.y *= a.d;

        if (this.orientation === "northwest") {
            upL.x -= 13;
            upL.y -= 26;
        } else { // defaults to southeast
            upL.x += (a.a * this.bounds.width()) + 3;
            upL.y += (a.d * this.bounds.height()) + 3;
        }

        this.position = upL;

        this.node.style.left = this.position.x + "px";
        this.node.style.top = this.position.y + "px";
    }
});


// object
ORYX.Plugins.DragDropResize = ORYX.Plugins.AbstractPlugin.extend({

    /**
     *    Constructor
     *    @param {Object} Facade: The Facade of the Editor
     */
    construct:function (facade) {
        this.facade = facade;

        // Initialize variables
        this.currentShapes = [];			// Current selected Shapes
        //this.pluginsData 		= [];			// Available Plugins
        this.toMoveShapes = [];			// Shapes there will be moved
        this.distPoints = [];			// Distance Points for Snap on Grid
        this.isResizing = false;		// Flag: If there was currently resized
        this.dragEnable = false;		// Flag: If Dragging is enabled
        this.dragIntialized = false;		// Flag: If the Dragging is initialized
        this.edgesMovable = true;			// Flag: If an edge is docked it is not movable
        this.offSetPosition = {x:0, y:0};	// Offset of the Dragging
        this.faktorXY = {x:1, y:1};	// The Current Zoom-Faktor
        this.containmentParentNode;				// the current future parent node for the dragged shapes
        this.isAddingAllowed = false;		// flag, if adding current selected shapes to containmentParentNode is allowed
        this.isAttachingAllowed = false;		// flag, if attaching to the current shape is allowed

        this.callbackMouseMove = this.handleMouseMove.bind(this);
        this.callbackMouseUp = this.handleMouseUp.bind(this);

        // Get the SVG-Containernode
        var containerNode = this.facade.getCanvas().getSvgContainer();

        // Create the Selected Rectangle in the SVG
        this.selectedRect = new ORYX.Plugins.SelectedRect(containerNode);

        // Show grid line if enabled
        if (ORYX.CONFIG.SHOW_GRIDLINE) {
            this.vLine = new ORYX.Plugins.GridLine(containerNode, ORYX.Plugins.GridLine.DIR_VERTICAL);
            this.hLine = new ORYX.Plugins.GridLine(containerNode, ORYX.Plugins.GridLine.DIR_HORIZONTAL);
        }

        // Get a HTML-ContainerNode
        containerNode = this.facade.getCanvas().getHTMLContainer();

        this.scrollNode = this.facade.getCanvas().rootNode.parentNode.parentNode;

        // Create the southeastern button for resizing
        this.resizerSE = new ORYX.Plugins.Resizer(containerNode, "southeast", this.facade);
        this.resizerSE.registerOnResize(this.onResize.bind(this)); // register the resize callback
        this.resizerSE.registerOnResizeEnd(this.onResizeEnd.bind(this)); // register the resize end callback
        this.resizerSE.registerOnResizeStart(this.onResizeStart.bind(this)); // register the resize start callback

        // Create the northwestern button for resizing
        this.resizerNW = new ORYX.Plugins.Resizer(containerNode, "northwest", this.facade);
        this.resizerNW.registerOnResize(this.onResize.bind(this)); // register the resize callback
        this.resizerNW.registerOnResizeEnd(this.onResizeEnd.bind(this)); // register the resize end callback
        this.resizerNW.registerOnResizeStart(this.onResizeStart.bind(this)); // register the resize start callback

        // For the Drag and Drop
        // Register on MouseDown-Event on a Shape
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
    },

    /**
     * On Mouse Down
     *
     */
    handleMouseDown:function (event, uiObj) {
        // If the selection Bounds not intialized and the uiObj is not member of current selectio
        // then return
		
        //if (!this.dragBounds || !this.currentShapes.member(uiObj) || !this.toMoveShapes.length) {
		if (!this.dragBounds || $.inArray(uiObj,this.currentShapes)<0 || !this.toMoveShapes.length) {
            return
        }
        ;

        // Start Dragging
        this.dragEnable = true;
        this.dragIntialized = true;
        this.edgesMovable = true;

        // Calculate the current zoom factor
        var a = this.facade.getCanvas().node.getScreenCTM();
        this.faktorXY.x = a.a;
        this.faktorXY.y = a.d;

        // Set the offset position of dragging
        var upL = this.dragBounds.upperLeft();
        this.offSetPosition = {
            x:Event.pointerX(event) - (upL.x * this.faktorXY.x),
            y:Event.pointerY(event) - (upL.y * this.faktorXY.y)};

        this.offsetScroll = {x:this.scrollNode.scrollLeft, y:this.scrollNode.scrollTop};

        // Register on Global Mouse-MOVE Event
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.callbackMouseMove, false);
        // Register on Global Mouse-UP Event
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.callbackMouseUp, true);

        return;
    },

    /**
     * On Key Mouse Up
     *
     */
    handleMouseUp:function (event) {

        //disable containment highlighting
        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
            highlightId:"dragdropresize.contain"
        });

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
            highlightId:"dragdropresize.attached"
        });

        // If Dragging is finished
        if (this.dragEnable) {

            // and update the current selection
            if (!this.dragIntialized) {

                // Do Method after Dragging
                this.afterDrag();

                // Check if the Shape is allowed to dock to the other Shape
                if (this.isAttachingAllowed &&
                    this.toMoveShapes.length == 1 && this.toMoveShapes[0] instanceof ORYX.Core.Node &&
                    this.toMoveShapes[0].dockers.length > 0) {

                    // Get the position and the docker
                    var position = this.facade.eventCoordinates(event);
                    var docker = this.toMoveShapes[0].dockers[0];


                    //Command-Pattern for dragging several Shapes
                    var dockCommand = ORYX.Core.Command.extend({
                        construct:function (docker, position, newDockedShape, facade) {
                            this.docker = docker;
                            this.newPosition = position;
                            this.newDockedShape = newDockedShape;
                            this.newParent = newDockedShape.parent || facade.getCanvas();
                            this.oldPosition = docker.parent.bounds.center();
                            this.oldDockedShape = docker.getDockedShape();
                            this.oldParent = docker.parent.parent || facade.getCanvas();
                            this.facade = facade;

                            if (this.oldDockedShape) {
                                this.oldPosition = docker.parent.absoluteBounds().center();
                            }

                        },
                        execute:function () {
                            this.dock(this.newDockedShape, this.newParent, this.newPosition);

                            // Raise Event for having the docked shape on top of the other shape
                            this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_ARRANGEMENT_TOP, excludeCommand:true})
                        },
                        rollback:function () {
                            this.dock(this.oldDockedShape, this.oldParent, this.oldPosition);
                        },
                        dock:function (toDockShape, parent, pos) {
                            // Add to the same parent Shape
                            parent.add(this.docker.parent)


                            // Set the Docker to the new Shape
                            this.docker.setDockedShape(undefined);
                            this.docker.bounds.centerMoveTo(pos)
                            this.docker.setDockedShape(toDockShape);
                            //this.docker.update();

                            this.facade.setSelection([this.docker.parent]);
                            this.facade.getCanvas().update();
                            this.facade.updateSelection();


                        }
                    });

                    // Instanziate the dockCommand
                    var commands = [new dockCommand(docker, position, this.containmentParentNode, this.facade)];
                    this.facade.executeCommands(commands);


                    // Check if adding is allowed to the other Shape
                } else if (this.isAddingAllowed) {


                    // Refresh all Shapes --> Set the new Bounds
                    this.refreshSelectedShapes();

                }

                this.facade.updateSelection();

                //this.currentShapes.each(function(shape) {shape.update()})
                // Raise Event: Dragging is finished
                this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDROP_END});
            }

            if (this.vLine)
                this.vLine.hide();
            if (this.hLine)
                this.hLine.hide();
        }

        // Disable
        this.dragEnable = false;


        // UnRegister on Global Mouse-UP/-Move Event
        document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.callbackMouseUp, true);
        document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.callbackMouseMove, false);

        return;
    },

    /**
     * On Key Mouse Move
     *
     */
    handleMouseMove:function (event) {
        // If dragging is not enabled, go return
        if (!this.dragEnable) {
            return
        }
        ;
        // If Dragging is initialized
        if (this.dragIntialized) {
            // Raise Event: Drag will be started
            this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDROP_START});
            this.dragIntialized = false;

            // And hide the resizers and the highlighting
            this.resizerSE.hide();
            this.resizerNW.hide();

            // if only edges are selected, containmentParentNode must be the canvas
            /*this._onlyEdges = this.currentShapes.all(function (currentShape) {
                return (currentShape instanceof ORYX.Core.Edge);
            });*/
			
			var tmp=true;
			$.each(this.currentShapes,function(){
				var currentShape= this;
				if(currentShape instanceof ORYX.Core.Edge){
					tmp = false;
					return false;
				}
			 });
			 this._onlyEdges = !tmp;  //ray 改造上面
			
			

//			/* If only edges are selected, check if they are movable. An Edge is
//			 * movable in case it is not docked
//			 */
//			if(this._onlyEdges) {
//				this.currentShapes.each(function(edge) {
//					if(edge.isDocked()) {
//						this.edgesMovable = false;
//						throw $break;
//					}
//				}.bind(this));
//			}

            // Do method before Drag
            this.beforeDrag();

            this._currentUnderlyingNodes = [];

        }


        // Calculate the new position
        var position = {
            x:Event.pointerX(event) - this.offSetPosition.x,
            y:Event.pointerY(event) - this.offSetPosition.y}

        position.x -= this.offsetScroll.x - this.scrollNode.scrollLeft;
        position.y -= this.offsetScroll.y - this.scrollNode.scrollTop;

        // If not the Control-Key are pressed
        var modifierKeyPressed = event.shiftKey || event.ctrlKey;
        if (ORYX.CONFIG.GRID_ENABLED && !modifierKeyPressed) {
            // Snap the current position to the nearest Snap-Point
            position = this.snapToGrid(position);
        } else {
            if (this.vLine)
                this.vLine.hide();
            if (this.hLine)
                this.hLine.hide();
        }

        // Adjust the point by the zoom faktor
        position.x /= this.faktorXY.x;
        position.y /= this.faktorXY.y;

        // Set that the position is not lower than zero
        position.x = Math.max(0, position.x)
        position.y = Math.max(0, position.y)

        // Set that the position is not bigger than the canvas
        var c = this.facade.getCanvas();
        position.x = Math.min(c.bounds.width() - this.dragBounds.width(), position.x)
        position.y = Math.min(c.bounds.height() - this.dragBounds.height(), position.y)


        // Drag this bounds
        this.dragBounds.moveTo(position);

        // Update all selected shapes and the selection rectangle
        //this.refreshSelectedShapes();
        this.resizeRectangle(this.dragBounds);

        this.isAttachingAllowed = false;

        //check, if a node can be added to the underlying node
        //var underlyingNodes = $A(this.facade.getCanvas().getAbstractShapesAtPosition(this.facade.eventCoordinates(event)));
		var underlyingNodes = $(this.facade.getCanvas().getAbstractShapesAtPosition(this.facade.eventCoordinates(event))).toArray();

        var checkIfAttachable = this.toMoveShapes.length == 1 && this.toMoveShapes[0] instanceof ORYX.Core.Node && this.toMoveShapes[0].dockers.length > 0
        checkIfAttachable = checkIfAttachable && underlyingNodes.length != 1


        /*if (!checkIfAttachable &&
            underlyingNodes.length === this._currentUnderlyingNodes.length &&
            underlyingNodes.all(function (node, index) {
                return this._currentUnderlyingNodes[index] === node
            }.bind(this))) {*/
		var checkall = true,self=this;
		$.map(underlyingNodes,function(node,index){
			if(self._currentUnderlyingNodes[index] !== node){
				checkall = false;
				return;
			}
		});
		
		if (!checkIfAttachable &&
            underlyingNodes.length === this._currentUnderlyingNodes.length && checkall) {
            return

        } else if (this._onlyEdges) {

            this.isAddingAllowed = true;
            this.containmentParentNode = this.facade.getCanvas();

        } else {

            /* Check the containment and connection rules */
            var options = {
                event:event,
                underlyingNodes:underlyingNodes,
                checkIfAttachable:checkIfAttachable
            };
            this.checkRules(options);

        }

        this._currentUnderlyingNodes = underlyingNodes.reverse();

        //visualize the containment result
        if (this.isAttachingAllowed) {

            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId:"dragdropresize.attached",
                elements:[this.containmentParentNode],
                style:ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                color:ORYX.CONFIG.SELECTION_VALID_COLOR
            });

        } else {

            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId:"dragdropresize.attached"
            });
        }

        if (!this.isAttachingAllowed) {
            if (this.isAddingAllowed) {

                this.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId:"dragdropresize.contain",
                    elements:[this.containmentParentNode],
                    color:ORYX.CONFIG.SELECTION_VALID_COLOR
                });

            } else {

                this.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId:"dragdropresize.contain",
                    elements:[this.containmentParentNode],
                    color:ORYX.CONFIG.SELECTION_INVALID_COLOR
                });

            }
        } else {
            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId:"dragdropresize.contain"
            });
        }

        // Stop the Event
        //Event.stop(event);
        return;
    },

//	/**
//	 * Rollbacks the docked shape of an edge, if the edge is not movable.
//	 */
//	redockEdges: function() {
//		this._undockedEdgesCommand.dockers.each(function(el){
//			el.docker.setDockedShape(el.dockedShape);
//			el.docker.setReferencePoint(el.refPoint);
//		})
//	},

    /**
     *  Checks the containment and connection rules for the selected shapes.
     */
    checkRules:function (options) {
        var event = options.event;
        var underlyingNodes = options.underlyingNodes;
        var checkIfAttachable = options.checkIfAttachable;
        var noEdges = options.noEdges;

        //get underlying node that is not the same than one of the currently selected shapes or
        // a child of one of the selected shapes with the highest z Order.
        // The result is a shape or the canvas
        this.containmentParentNode = underlyingNodes.reverse().find((function (node) {
            return (node instanceof ORYX.Core.Canvas) ||
                (((node instanceof ORYX.Core.Node) || ((node instanceof ORYX.Core.Edge) && !noEdges))
                    && (!(this.currentShapes.member(node) ||
                    this.currentShapes.any(function (shape) {
                        return (shape.children.length > 0 && shape.getChildNodes(true).member(node));
                    }))));
        }).bind(this));

        if (checkIfAttachable) {

            this.isAttachingAllowed = this.facade.getRules().canConnect({
                sourceShape:this.containmentParentNode,
                edgeShape:this.toMoveShapes[0],
                targetShape:this.toMoveShapes[0]
            });

            if (this.isAttachingAllowed) {
                var point = this.facade.eventCoordinates(event);
                this.isAttachingAllowed = this.containmentParentNode.isPointOverOffset(point.x, point.y);
            }
        }
		
        if (!this.isAttachingAllowed) {
            //check all selected shapes, if they can be added to containmentParentNode
            this.isAddingAllowed = this.toMoveShapes.all((function (currentShape) {
			
				//判断是否定时器边界事件
				if(currentShape instanceof ORYX.Core.Node){
					if(currentShape.getStencil().id().endWith("BoundaryTimerEvent")){ 
						return false;
					}
				}////////////// 
			
                if (currentShape instanceof ORYX.Core.Edge ||
                    currentShape instanceof ORYX.Core.Controls.Docker ||
                    this.containmentParentNode === currentShape.parent) {
                    return true;
                } else if (this.containmentParentNode !== currentShape) {

                    if (!(this.containmentParentNode instanceof ORYX.Core.Edge) || !noEdges) {

                        if (this.facade.getRules().canContain({containingShape:this.containmentParentNode,
                            containedShape:currentShape})) {
                            return true;
                        }
                    }
                }
                return false;
            }).bind(this));
        }

        if (!this.isAttachingAllowed && !this.isAddingAllowed &&
            (this.containmentParentNode instanceof ORYX.Core.Edge)) {
            options.noEdges = true;
            options.underlyingNodes.reverse();
            this.checkRules(options);
        }
    },

    /**
     * Redraw the selected Shapes.
     *
     */
    refreshSelectedShapes:function () {
        // If the selection bounds not initialized, return
        if (!this.dragBounds) {
            return
        }

        // Calculate the offset between the bounds and the old bounds
        var upL = this.dragBounds.upperLeft();
        var oldUpL = this.oldDragBounds.upperLeft();
        var offset = {
            x:upL.x - oldUpL.x,
            y:upL.y - oldUpL.y };

        // Instanciate the dragCommand
        var commands = [new ORYX.Core.Command.Move(this.toMoveShapes, offset, this.containmentParentNode, this.currentShapes, this)];
        // If the undocked edges command is setted, add this command
        if (this._undockedEdgesCommand instanceof ORYX.Core.Command) {
            commands.unshift(this._undockedEdgesCommand);
        }
        // Execute the commands
        this.facade.executeCommands(commands);

        // copy the bounds to the old bounds
        if (this.dragBounds)
            this.oldDragBounds = this.dragBounds.clone();

    },

    /**
     * Callback for Resize
     *
     */
    onResize:function (bounds) {
        // If the selection bounds not initialized, return
        if (!this.dragBounds) {
            return
        }

        this.dragBounds = bounds;
        this.isResizing = true;

        // Update the rectangle
        this.resizeRectangle(this.dragBounds);
    },

    onResizeStart:function () {
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_RESIZE_START});
    },

    onResizeEnd:function () {

        if (!(this.currentShapes instanceof Array) || this.currentShapes.length <= 0) {
            return;
        }

        // If Resizing finished, the Shapes will be resize
        if (this.isResizing) {

            var commandClass = ORYX.Core.Command.extend({
                construct:function (shape, newBounds, plugin) {
                    this.shape = shape;
                    this.oldBounds = shape.bounds.clone();
                    this.newBounds = newBounds;
                    this.plugin = plugin;
                },
                execute:function () {
                    this.shape.bounds.set(this.newBounds.a, this.newBounds.b);
                    this.update(this.getOffset(this.oldBounds, this.newBounds));

                },
                rollback:function () {
                    this.shape.bounds.set(this.oldBounds.a, this.oldBounds.b);
                    this.update(this.getOffset(this.newBounds, this.oldBounds))
                },

                getOffset:function (b1, b2) {
                    return {
                        x:b2.a.x - b1.a.x,
                        y:b2.a.y - b1.a.y,
                        xs:b2.width() / b1.width(),
                        ys:b2.height() / b1.height()
                    }
                },
                update:function (offset) {
                    //this.shape.getLabels().each(function (label) {
					$.map(this.shape.getLabels(),function(label){
                        label.changed();
                    });

                    /*var allEdges = [].concat(this.shape.getIncomingShapes())
                        .concat(this.shape.getOutgoingShapes())
                        // Remove all edges which are included in the selection from the list
                        .findAll(function (r) {
                        return r instanceof ORYX.Core.Edge
                    }.bind(this))*/
					
					var allEdges = [].concat(this.shape.getIncomingShapes())
                        .concat(this.shape.getOutgoingShapes());
					var tmp =[];
					$.map(allEdges,function(r){
						if(r instanceof ORYX.Core.Edge){
							tmp[tmp.length] = r;
						}
					});
					allEdges = tmp; //ray 改造上面

                    this.plugin.layoutEdges(this.shape, allEdges, offset);

                    this.plugin.facade.setSelection([this.shape]);
                    this.plugin.facade.getCanvas().update();
                    this.plugin.facade.updateSelection();
                }
            });

            var bounds = this.dragBounds.clone();
            var shape = this.currentShapes[0];

            if (shape.parent) {
                var parentPosition = shape.parent.absoluteXY();
                bounds.moveBy(-parentPosition.x, -parentPosition.y);
            }

            var command = new commandClass(shape, bounds, this);

            this.facade.executeCommands([command]);

            this.isResizing = false;

            this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_RESIZE_END});
        }
    },


    /**
     * Prepare the Dragging
     *
     */
    beforeDrag:function () {

        var undockEdgeCommand = ORYX.Core.Command.extend({
            construct:function (moveShapes) {
                /*this.dockers = moveShapes.collect(function (shape) {
                    return shape instanceof ORYX.Core.Controls.Docker ? {docker:shape, dockedShape:shape.getDockedShape(), refPoint:shape.referencePoint} : undefined
                }).compact();*/
				this.dockers = $.map(moveShapes,function(shape){
					return shape instanceof ORYX.Core.Controls.Docker ? {docker:shape, dockedShape:shape.getDockedShape(), refPoint:shape.referencePoint} : undefined
				});
				this.dockers = this.dockers.compact();
				
            },
            execute:function () {
                //this.dockers.each(function (el) {
				$.map(this.dockers,function (el) {
                    el.docker.setDockedShape(undefined);
                })
            },
            rollback:function () {
                //this.dockers.each(function (el) {
				 $.map(this.dockers,function (el) {
                    el.docker.setDockedShape(el.dockedShape);
                    el.docker.setReferencePoint(el.refPoint);
                    //el.docker.update();
                })
            }
        });

        this._undockedEdgesCommand = new undockEdgeCommand(this.toMoveShapes);
        this._undockedEdgesCommand.execute();

    },

    hideAllLabels:function (shape) {

        // Hide all labels from the shape
        shape.getLabels().each(function (label) {
            label.hide();
        });
        // Hide all labels from docked shapes
        shape.getAllDockedShapes().each(function (dockedShape) {
            var labels = dockedShape.getLabels();
            if (labels.length > 0) {
                labels.each(function (label) {
                    label.hide();
                });
            }
        });

        // Do this recursive for all child shapes
        // EXP-NICO use getShapes
        shape.getChildren().each((function (value) {
            if (value instanceof ORYX.Core.Shape)
                this.hideAllLabels(value);
        }).bind(this));
    },

    /**
     * Finished the Dragging
     *
     */
    afterDrag:function () {

    },

    /**
     * Show all Labels at these shape
     *
     */
    showAllLabels:function (shape) {

        // Show the label of these shape
        //shape.getLabels().each(function(label) {
        for (var i = 0; i < shape.length; i++) {
            var label = shape[i];
            label.show();
        }//);
        // Show all labels at docked shapes
        //shape.getAllDockedShapes().each(function(dockedShape) {
        var allDockedShapes = shape.getAllDockedShapes()
        for (var i = 0; i < allDockedShapes.length; i++) {
            var dockedShape = allDockedShapes[i];
            var labels = dockedShape.getLabels();
            if (labels.length > 0) {
                labels.each(function (label) {
                    label.show();
                });
            }
        }//);

        // Do this recursive
        //shape.children.each((function(value) {
        for (var i = 0; i < shape.children.length; i++) {
            var value = shape.children[i];
            if (value instanceof ORYX.Core.Shape)
                this.showAllLabels(value);
        }//).bind(this));
    },

    /**
     * Intialize Method, if there are new Plugins
     *
     */
    /*registryChanged: function(pluginsData) {
     // Save all new Plugin, sorted by group and index
     this.pluginsData = pluginsData.sortBy( function(value) {
     return (value.group + "" + value.index);
     });
     },*/

    /**
     * On the Selection-Changed
     *
     */
    onSelectionChanged:function (event) {
		if(this.facade.isValid)return;
        var elements = event.elements;

        // Reset the drag-variables
        this.dragEnable = false;
        this.dragIntialized = false;
        this.resizerSE.hide();
        this.resizerNW.hide();

        // If there is no elements
		
		
        if (!elements || elements.length == 0) {
            // Hide all things and reset all variables
            this.selectedRect.hide();
            this.currentShapes = [];
            this.toMoveShapes = [];
            this.dragBounds = undefined;
            this.oldDragBounds = undefined;
        } else {

            // Set the current Shapes
            this.currentShapes = elements;

            // Get all shapes with the highest parent in object hierarchy (canvas is the top most parent)
            var topLevelElements = this.facade.getCanvas().getShapesWithSharedParent(elements);
            this.toMoveShapes = topLevelElements;

            /*this.toMoveShapes = this.toMoveShapes.findAll(function (shape) {
                return shape instanceof ORYX.Core.Node &&
                    (shape.dockers.length === 0 || !elements.member(shape.dockers.first().getDockedShape()))
            });*/
			
			var tmp=[];
			$.map(this.toMoveShapes,function(shape){
				if(shape instanceof ORYX.Core.Node &&
                    (shape.dockers.length === 0 || !elements.member(shape.dockers.first().getDockedShape()))){
					tmp[tmp.length] = shape;
				}
			});
			this.toMoveShapes =  tmp;
			
            //elements.each((function (shape) {
			var self = this;
			$.map(elements,function (shape) {
                if (!(shape instanceof ORYX.Core.Edge)) {
                    return
                }

                var dks = shape.getDockers()

                var hasF = elements.member(dks.first().getDockedShape());
                var hasL = elements.member(dks.last().getDockedShape());

//				if(!hasL) {
//					this.toMoveShapes.push(dks.last());
//				}
//				if(!hasF){
//					this.toMoveShapes.push(dks.first())
//				}
                /* Enable movement of undocked edges */
                if (!hasF && !hasL) {
                    var isUndocked = !dks.first().getDockedShape() && !dks.last().getDockedShape()
                    if (isUndocked) {
                        self.toMoveShapes = self.toMoveShapes.concat(dks);
                    }
                }

                if (shape.dockers.length > 2 && hasF && hasL) {
                    self.toMoveShapes = self.toMoveShapes.concat(dks.findAll(function (el, index) {
                        return index > 0 && index < dks.length - 1
                    }))
                }
			});
            //}).bind(this));

            // Calculate the new area-bounds of the selection
            var newBounds = undefined;
            //this.toMoveShapes.each(function (value) {
			$.map(this.toMoveShapes,function (value) {
                var shape = value;
                if (value instanceof ORYX.Core.Controls.Docker) {
                    /* Get the Shape */
                    shape = value.parent;
                }

                if (!newBounds) {
                    newBounds = shape.absoluteBounds();
                }
                else {
                    newBounds.include(shape.absoluteBounds());
                }
			});
			
            //}.bind(this));
            if (!newBounds) {
                //elements.each(function (value) {
				$.map(elements,function (value) {
                    if (!newBounds) {
                        newBounds = value.absoluteBounds();
                    } else {
                        newBounds.include(value.absoluteBounds());
                    }
                });
            }

            // Set the new bounds
            this.dragBounds = newBounds;
            this.oldDragBounds = newBounds.clone();

            // Update and show the rectangle
            this.resizeRectangle(newBounds);
            this.selectedRect.show();

			//return false; 以上点击后会显示框框部分，以下的为改变节点大小的指示按钮的
            // Show the resize button, if there is only one element and this is resizeable
            if (elements.length == 1 && elements[0].isResizable) { //点击后 true
			
                var aspectRatio = elements[0].getStencil().fixedAspectRatio() ? elements[0].bounds.width() / elements[0].bounds.height() : undefined;
                this.resizerSE.setBounds(this.dragBounds, elements[0].minimumSize, elements[0].maximumSize, aspectRatio);
                this.resizerSE.show();  //左上角指示
                this.resizerNW.setBounds(this.dragBounds, elements[0].minimumSize, elements[0].maximumSize, aspectRatio);
                this.resizerNW.show();  //右下角指示
            } else {
                this.resizerSE.setBounds(undefined);
                this.resizerNW.setBounds(undefined);
            }
			
			//以下跟点击show框和放大缩小指标没关系
            // If Snap-To-Grid is enabled, the Snap-Point will be calculate
            if (ORYX.CONFIG.GRID_ENABLED) {

                // Reset all points
                this.distPoints = [];

                if (this.distPointTimeout)
                    window.clearTimeout(this.distPointTimeout)
				var self =this;
                this.distPointTimeout = window.setTimeout(function () {
                    // Get all the shapes, there will consider at snapping
                    // Consider only those elements who shares the same parent element
                    /*var distShapes = this.facade.getCanvas().getChildShapes(true).findAll(function (value) {
                        var parentShape = value.parent;
                        while (parentShape) {
                            if (elements.member(parentShape)) return false;
                            parentShape = parentShape.parent
                        }
                        return true;
                    })*/
					var tmp=[];
					$.map(this.facade.getCanvas().getChildShapes(true),function(value){
						var a = function(){
							var parentShape = value.parent;
							while (parentShape) {
								if (elements.member(parentShape)) return false;
								parentShape = parentShape.parent
							}
							return true;
						}
						if(a){
							tmp[tmp.length] = value;
						}
					});
					var distShapes = tmp;  // ray jquery 改造上面的

                    // The current selection will delete from this array
                    //elements.each(function(shape) {
                    //	distShapes = distShapes.without(shape);
                    //});

                    // For all these shapes
                    //distShapes.each((function (value) {
					$.map(distShapes,function (value) {
                        if (!(value instanceof ORYX.Core.Edge)) {
                            var ul = value.absoluteXY();
                            var width = value.bounds.width();
                            var height = value.bounds.height();

                            // Add the upperLeft, center and lowerRight - Point to the distancePoints
                            self.distPoints.push({
                                ul:{
                                    x:ul.x,
                                    y:ul.y
                                },
                                c:{
                                    x:ul.x + (width / 2),
                                    y:ul.y + (height / 2)
                                },
                                lr:{
                                    x:ul.x + width,
                                    y:ul.y + height
                                }
                            });
                        }
					});
                    //}).bind(this));

                }.bind(this), 10)


            }
        }
    },

    /**
     * Adjust an Point to the Snap Points
     *
     */
    snapToGrid:function (position) {

        // Get the current Bounds
        var bounds = this.dragBounds;

        var point = {};

        var ulThres = 6;
        var cThres = 10;
        var lrThres = 6;

        var scale = this.vLine ? this.vLine.getScale() : 1;

        var ul = { x:(position.x / scale), y:(position.y / scale)};
        var c = { x:(position.x / scale) + (bounds.width() / 2), y:(position.y / scale) + (bounds.height() / 2)};
        var lr = { x:(position.x / scale) + (bounds.width()), y:(position.y / scale) + (bounds.height())};

        var offsetX, offsetY;
        var gridX, gridY;

        // For each distant point
        //this.distPoints.each(function (value) {
		$.map(this.distPoints,function (value) {
            var x, y, gx, gy;
            if (Math.abs(value.c.x - c.x) < cThres) {
                x = value.c.x - c.x;
                gx = value.c.x;
            }
            /* else if (Math.abs(value.ul.x-ul.x) < ulThres){
             x = value.ul.x-ul.x;
             gx = value.ul.x;
             } else if (Math.abs(value.lr.x-lr.x) < lrThres){
             x = value.lr.x-lr.x;
             gx = value.lr.x;
             } */


            if (Math.abs(value.c.y - c.y) < cThres) {
                y = value.c.y - c.y;
                gy = value.c.y;
            }
            /* else if (Math.abs(value.ul.y-ul.y) < ulThres){
             y = value.ul.y-ul.y;
             gy = value.ul.y;
             } else if (Math.abs(value.lr.y-lr.y) < lrThres){
             y = value.lr.y-lr.y;
             gy = value.lr.y;
             } */

            if (x !== undefined) {
                offsetX = offsetX === undefined ? x : (Math.abs(x) < Math.abs(offsetX) ? x : offsetX);
                if (offsetX === x)
                    gridX = gx;
            }

            if (y !== undefined) {
                offsetY = offsetY === undefined ? y : (Math.abs(y) < Math.abs(offsetY) ? y : offsetY);
                if (offsetY === y)
                    gridY = gy;
            }
        });


        if (offsetX !== undefined) {
            ul.x += offsetX;
            ul.x *= scale;
            if (this.vLine && gridX)
                this.vLine.update(gridX);
        } else {
            ul.x = (position.x - (position.x % (ORYX.CONFIG.GRID_DISTANCE / 2)));
            if (this.vLine)
                this.vLine.hide()
        }

        if (offsetY !== undefined) {
            ul.y += offsetY;
            ul.y *= scale;
            if (this.hLine && gridY)
                this.hLine.update(gridY);
        } else {
            ul.y = (position.y - (position.y % (ORYX.CONFIG.GRID_DISTANCE / 2)));
            if (this.hLine)
                this.hLine.hide();
        }

        return ul;
    },

    showGridLine:function () {

    },


    /**
     * Redraw of the Rectangle of the SelectedArea
     * @param {Object} bounds
     */
    resizeRectangle:function (bounds) {
        // Resize the Rectangle
        this.selectedRect.resize(bounds);
    }

});


// object
ORYX.Plugins.SelectedRect = Clazz.extend({

    construct:function (parentId) {

        this.parentId = parentId;

        this.node = ORYX.Editor.graft("http://www.w3.org/2000/svg", $(parentId),
            ['g']);

        this.dashedArea = ORYX.Editor.graft("http://www.w3.org/2000/svg", this.node,
            ['rect', {x:0, y:0,
                'stroke-width':1, stroke:'#777777', fill:'none',
                'stroke-dasharray':'2,2',
                'pointer-events':'none'}]);

        this.hide();

    },

    hide:function () {
        this.node.setAttributeNS(null, 'display', 'none');
    },

    show:function () {
        this.node.setAttributeNS(null, 'display', '');
    },

    resize:function (bounds) {
        var upL = bounds.upperLeft();

        var padding = ORYX.CONFIG.SELECTED_AREA_PADDING;

        this.dashedArea.setAttributeNS(null, 'width', bounds.width() + 2 * padding);
        this.dashedArea.setAttributeNS(null, 'height', bounds.height() + 2 * padding);
        this.node.setAttributeNS(null, 'transform', "translate(" + (upL.x - padding) + ", " + (upL.y - padding) + ")");
    }


});


// object
ORYX.Plugins.HighlightingSelectedShapes = Clazz.extend({

    construct:function (facade) {
        this.facade = facade;
        this.opacityFull = 0.9;
        this.opacityLow = 0.4;

        // Register on Dragging-Events for show/hide of ShapeMenu
        //this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_START, this.hide.bind(this));
        //this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,  this.show.bind(this));
    },

    /**
     * On the Selection-Changed
     *
     */
    onSelectionChanged:function (event) {
	
		if(this.facade.isValid)return;
		
        if (event.elements && event.elements.length > 1) {
            this.facade.raiseEvent({
                type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId:'selection',
                elements:event.elements.without(event.subSelection),
                color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR,
                opacity:!event.subSelection ? this.opacityFull : this.opacityLow
            });

            if (event.subSelection) {
                this.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId:'subselection',
                    elements:[event.subSelection],
                    color:ORYX.CONFIG.SELECTION_HIGHLIGHT_COLOR,
                    opacity:this.opacityFull
                });
            } else {
                this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'subselection'});
            }

        } else {
            this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'selection'});
            this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'subselection'});
        }
    }
});


// object 移动顺序流的指标菜单
ORYX.Plugins.DragDocker = Clazz.extend({

    /**
     *    Constructor
     *    @param {Object} Facade: The Facade of the Editor
     */
    construct:function (facade) {
        this.facade = facade;

        // Set the valid and invalid color
        this.VALIDCOLOR = ORYX.CONFIG.SELECTION_VALID_COLOR;
        this.INVALIDCOLOR = ORYX.CONFIG.SELECTION_INVALID_COLOR;

        // Define Variables
        this.shapeSelection = undefined;
        this.docker = undefined;
        this.dockerParent = undefined;
        this.dockerSource = undefined;
        this.dockerTarget = undefined;
        this.lastUIObj = undefined;
        this.isStartDocker = undefined;
        this.isEndDocker = undefined;
        this.undockTreshold = 10;
        this.initialDockerPosition = undefined;
        this.outerDockerNotMoved = undefined;
        this.isValid = false;

        // For the Drag and Drop
        // Register on MouseDown-Event on a Docker
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKERDRAG, this.handleDockerDrag.bind(this));


        // Register on over/out to show / hide a docker
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER, this.handleMouseOver.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOUT, this.handleMouseOut.bind(this));


    },

    /**
     * MouseOut Handler
     *
     */
    handleMouseOut:function (event, uiObj) {
        // If there is a Docker, hide this
        if (!this.docker && uiObj instanceof ORYX.Core.Controls.Docker) {
            uiObj.hide()
        } else if (!this.docker && uiObj instanceof ORYX.Core.Edge) {
            //uiObj.dockers.each(function (docker) {
			$.map(uiObj.dockers,function (docker) {
                docker.hide();
            })
        }
    },

    /**
     * MouseOver Handler
     *
     */
    handleMouseOver:function (event, uiObj) {
        // If there is a Docker, show this
        if (!this.docker && uiObj instanceof ORYX.Core.Controls.Docker) {
            uiObj.show()
        } else if (!this.docker && uiObj instanceof ORYX.Core.Edge) {
            //uiObj.dockers.each(function (docker) {
			$.map(uiObj.dockers,function(docker){
                docker.show();
            })
        }
    },
    /**
     * DockerDrag Handler
     * delegates the uiEvent of the drag event to the mouseDown function
     */
    handleDockerDrag:function (event, uiObj) {
        this.handleMouseDown(event.uiEvent, uiObj);
    },

    /**
     * MouseDown Handler
     *
     */
    handleMouseDown:function (event, uiObj) {
        // If there is a Docker
		
        if (uiObj instanceof ORYX.Core.Controls.Docker && uiObj.isMovable) {

            /* Buffering shape selection and clear selection*/
            this.shapeSelection = this.facade.getSelection();
            this.facade.setSelection();

            this.docker = uiObj;
            this.initialDockerPosition = this.docker.bounds.center();
            this.outerDockerNotMoved = false;
            this.dockerParent = uiObj.parent;

            // Define command arguments
            this._commandArg = {docker:uiObj, dockedShape:uiObj.getDockedShape(), refPoint:uiObj.referencePoint || uiObj.bounds.center()};

            // Show the Docker
            this.docker.show();

            // If the Dockers Parent is an Edge,
            //  and the Docker is either the first or last Docker of the Edge
            if (uiObj.parent instanceof ORYX.Core.Edge &&
                (uiObj.parent.dockers.first() == uiObj || uiObj.parent.dockers.last() == uiObj)) {

                // Get the Edge Source or Target
                if (uiObj.parent.dockers.first() == uiObj && uiObj.parent.dockers.last().getDockedShape()) {
                    this.dockerTarget = uiObj.parent.dockers.last().getDockedShape()
                } else if (uiObj.parent.dockers.last() == uiObj && uiObj.parent.dockers.first().getDockedShape()) {
                    this.dockerSource = uiObj.parent.dockers.first().getDockedShape()
                }

            } else {
                // If there parent is not an Edge, undefined the Source and Target
                this.dockerSource = undefined;
                this.dockerTarget = undefined;
            }

            this.isStartDocker = this.docker.parent.dockers.first() === this.docker
            this.isEndDocker = this.docker.parent.dockers.last() === this.docker

            // add to canvas while dragging
            this.facade.getCanvas().add(this.docker.parent);

            // Hide all Labels from Docker
            //this.docker.parent.getLabels().each(function (label) {
			$.map(this.docker.parent.getLabels(),function (label) {
				if (typeof label ==='object' && label instanceof ORYX.Core.SVG.Label) {
					label.hide();
				}
            });

            // Undocked the Docker from current Shape
            if ((!this.isStartDocker && !this.isEndDocker) || !this.docker.isDocked()) {

                this.docker.setDockedShape(undefined)
                // Set the Docker to the center of the mouse pointer
                var evPos = this.facade.eventCoordinates(event);
                this.docker.bounds.centerMoveTo(evPos);
                //this.docker.update()
                //this.facade.getCanvas().update();
                this.dockerParent._update();
            } else {
                this.outerDockerNotMoved = true;
            }

            var option = {movedCallback:this.dockerMoved.bind(this), upCallback:this.dockerMovedFinished.bind(this)}

            // Enable the Docker for Drag'n'Drop, give the mouseMove and mouseUp-Callback with
            ORYX.Core.UIEnableDrag(event, uiObj, option);
        }
    },

    /**
     * Docker MouseMove Handler
     *
     */
    dockerMoved:function (event) {
        this.outerDockerNotMoved = false;
        var snapToMagnet = undefined;

		
        if (this.docker.parent) {
            if (this.isStartDocker || this.isEndDocker) {

                // Get the EventPosition and all Shapes on these point
                var evPos = this.facade.eventCoordinates(event);
                if (this.docker.isDocked()) {   
                    /* Only consider start/end dockers if they are moved over a treshold */
                    var distanceDockerPointer =
                        ORYX.Core.Math.getDistancePointToPoint(evPos, this.initialDockerPosition);
                    if (distanceDockerPointer < this.undockTreshold) {
                        this.outerDockerNotMoved = true;
                        return;
                    }

                    /* Undock the docker */
                    this.docker.setDockedShape(undefined); //节点显示红点,和线条延长
                    // Set the Docker to the center of the mouse pointer
                    //this.docker.bounds.centerMoveTo(evPos);
                    this.dockerParent._update();
                }

                var shapes = this.facade.getCanvas().getAbstractShapesAtPosition(evPos);

                // Get the top level Shape on these, but not the same as Dockers parent
                var uiObj = shapes.pop();
                if (this.docker.parent === uiObj) {
                    uiObj = shapes.pop();
                }
                // If the top level Shape the same as the last Shape, then return
                if (this.lastUIObj == uiObj) {
                    //return;

                    // If the top level uiObj instance of Shape and this isn't the parent of the docker
                }
                else if (uiObj instanceof ORYX.Core.Shape) {

                    // Get the StencilSet of the Edge
                    var sset = this.docker.parent.getStencil().stencilSet();
                    // Ask by the StencilSet if the source, the edge and the target valid connections.
                    if (this.docker.parent instanceof ORYX.Core.Edge) {
                        var highestParent = this.getHighestParentBeforeCanvas(uiObj);
                        /* Ensure that the shape to dock is not a child shape
                         * of the same edge.
                         */
                        if (highestParent instanceof ORYX.Core.Edge
                            && this.docker.parent === highestParent) {
                            this.isValid = false;
                            this.dockerParent._update();
                            return;
                        }
                        this.isValid = false;
                        var curObj = uiObj, orgObj = uiObj;
                        while (!this.isValid && curObj && !(curObj instanceof ORYX.Core.Canvas)) {
                            uiObj = curObj;
                            this.isValid = this.facade.getRules().canConnect({
                                sourceShape:this.dockerSource ? // Is there a docked source
                                    this.dockerSource : // than set this
                                    (this.isStartDocker ? // if not and if the Docker is the start docker
                                        uiObj : // take the last uiObj
                                        undefined), // if not set it to undefined;
                                edgeShape:this.docker.parent,
                                targetShape:this.dockerTarget ? // Is there a docked target
                                    this.dockerTarget : // than set this
                                    (this.isEndDocker ? // if not and if the Docker is not the start docker
                                        uiObj : // take the last uiObj
                                        undefined) // if not set it to undefined;
                            });
                            curObj = curObj.parent;
                        }
                        // Reset uiObj if no
                        // valid parent is found
                        if (!this.isValid) {
                            uiObj = orgObj;
                        }

                    }
                    else {
					
                        this.isValid = this.facade.getRules().canConnect({
                            sourceShape:uiObj,
                            edgeShape:this.docker.parent,
                            targetShape:this.docker.parent
                        });
                    }

                    // If there is a lastUIObj, hide the magnets
                    if (this.lastUIObj) {
                        this.hideMagnets(this.lastUIObj)
                    }

                    // If there is a valid connection, show the magnets
                    if (this.isValid) {
                        this.showMagnets(uiObj);
                    }

                    // Set the Highlight Rectangle by these value
                    this.showHighlight(uiObj, this.isValid ? this.VALIDCOLOR : this.INVALIDCOLOR);

                    // Buffer the current Shape
                    this.lastUIObj = uiObj;
                }
                else {
                    // If there is no top level Shape, then hide the highligting of the last Shape
                    this.hideHighlight();
                    this.lastUIObj ? this.hideMagnets(this.lastUIObj) : null;
                    this.lastUIObj = undefined;
                    this.isValid = false;
                }

                // Snap to the nearest Magnet
                if (this.lastUIObj && this.isValid && !(event.shiftKey || event.ctrlKey)) {
                    snapToMagnet = this.lastUIObj.magnets.find(function (magnet) {
                        return magnet.absoluteBounds().isIncluded(evPos)
                    });

                    if (snapToMagnet) {
                        this.docker.bounds.centerMoveTo(snapToMagnet.absoluteCenterXY());
                        //this.docker.update()
                    }
                }
            }
        }
        // Snap to on the nearest Docker of the same parent
        if (!(event.shiftKey || event.ctrlKey) && !snapToMagnet) {
            var minOffset = ORYX.CONFIG.DOCKER_SNAP_OFFSET;
            var nearestX = minOffset + 1
            var nearestY = minOffset + 1

            var dockerCenter = this.docker.bounds.center();

            if (this.docker.parent) {

                this.docker.parent.dockers.each((function (docker) {
                    if (this.docker == docker) {
                        return
                    }
                    ;

                    var center = docker.referencePoint ? docker.getAbsoluteReferencePoint() : docker.bounds.center();

                    nearestX = Math.abs(nearestX) > Math.abs(center.x - dockerCenter.x) ? center.x - dockerCenter.x : nearestX;
                    nearestY = Math.abs(nearestY) > Math.abs(center.y - dockerCenter.y) ? center.y - dockerCenter.y : nearestY;


                }).bind(this));

                if (Math.abs(nearestX) < minOffset || Math.abs(nearestY) < minOffset) {
                    nearestX = Math.abs(nearestX) < minOffset ? nearestX : 0;
                    nearestY = Math.abs(nearestY) < minOffset ? nearestY : 0;

                    this.docker.bounds.centerMoveTo(dockerCenter.x + nearestX, dockerCenter.y + nearestY);
                    //this.docker.update()
                } else {


                    var previous = this.docker.parent.dockers[Math.max(this.docker.parent.dockers.indexOf(this.docker) - 1, 0)]
                    var next = this.docker.parent.dockers[Math.min(this.docker.parent.dockers.indexOf(this.docker) + 1, this.docker.parent.dockers.length - 1)]

                    if (previous && next && previous !== this.docker && next !== this.docker) {
                        var cp = previous.bounds.center();
                        var cn = next.bounds.center();
                        var cd = this.docker.bounds.center();

                        // Checks if the point is on the line between previous and next
                        if (ORYX.Core.Math.isPointInLine(cd.x, cd.y, cp.x, cp.y, cn.x, cn.y, 10)) {
                            // Get the rise
                            var raise = (Number(cn.y) - Number(cp.y)) / (Number(cn.x) - Number(cp.x));
                            // Calculate the intersection point
                            var intersecX = ((cp.y - (cp.x * raise)) - (cd.y - (cd.x * (-Math.pow(raise, -1))))) / ((-Math.pow(raise, -1)) - raise);
                            var intersecY = (cp.y - (cp.x * raise)) + (raise * intersecX);

                            if (isNaN(intersecX) || isNaN(intersecY)) {
                                return;
                            }

                            this.docker.bounds.centerMoveTo(intersecX, intersecY);
                        }
                    }

                }
            }
        }
        //this.facade.getCanvas().update();
        this.dockerParent._update();
    },

    /**
     * Docker MouseUp Handler
     *
     */
    dockerMovedFinished:function (event) {

        /* Reset to buffered shape selection */
        this.facade.setSelection(this.shapeSelection);

        // Hide the border
        this.hideHighlight();

        // Show all Labels from Docker
        /*this.dockerParent.getLabels().each(function (label) {
            label.show();
            //label.update();
        });*/
		
		$.map(this.dockerParent.getLabels(),function (label) {
			if (typeof label ==='object' && label instanceof ORYX.Core.SVG.Label) {
				label.show();
			}
		});
        // If there is a last top level Shape
        if (this.lastUIObj && (this.isStartDocker || this.isEndDocker)) {
            // If there is a valid connection, the set as a docked Shape to them
            if (this.isValid) {

                this.docker.setDockedShape(this.lastUIObj);

                this.facade.raiseEvent({
                    type:ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,
                    docker:this.docker,
                    parent:this.docker.parent,
                    target:this.lastUIObj
                });
            }

            this.hideMagnets(this.lastUIObj)
        }

        // Hide the Docker
        this.docker.hide();

        if (this.outerDockerNotMoved) {
            // Get the EventPosition and all Shapes on these point
            var evPos = this.facade.eventCoordinates(event);
            var shapes = this.facade.getCanvas().getAbstractShapesAtPosition(evPos);

            /* Remove edges from selection */
            /*var shapeWithoutEdges = shapes.findAll(function (node) {
                return node instanceof ORYX.Core.Node;
            });*/
			var tmp=[];
			$.map(shapes,function(node){
				if(node instanceof ORYX.Core.Node){
					tmp[tmp.length] = node;
				}
			});
			shapeWithoutEdges = tmp;
			
            shapes = shapeWithoutEdges.length ? shapeWithoutEdges : shapes;
            this.facade.setSelection(shapes);
        } else {
            //Command-Pattern for dragging one docker
            var dragDockerCommand = ORYX.Core.Command.extend({
                construct:function (docker, newPos, oldPos, newDockedShape, oldDockedShape, facade) {
                    this.docker = docker;
                    this.index = docker.parent.dockers.indexOf(docker);
                    this.newPosition = newPos;
                    this.newDockedShape = newDockedShape;
                    this.oldPosition = oldPos;
                    this.oldDockedShape = oldDockedShape;
                    this.facade = facade;
                    this.index = docker.parent.dockers.indexOf(docker);
                    this.shape = docker.parent;

                },
                execute:function () {
                    if (!this.docker.parent) {
                        this.docker = this.shape.dockers[this.index];
                    }
                    this.dock(this.newDockedShape, this.newPosition);
                    this.removedDockers = this.shape.removeUnusedDockers();
                    this.facade.updateSelection();
                },
                rollback:function () {
                    this.dock(this.oldDockedShape, this.oldPosition);
                    /*(this.removedDockers || $H({})).each(function (d) {
                        this.shape.add(d.value, Number(d.key));
                        this.shape._update(true);
                    }.bind(this))*/
					var self = this;
					$.map(this.removedDockers.keys,function(key){
						self.shape.add(self.removedDockers[key], Number(key));
                        self.shape._update(true);
					})
                    this.facade.updateSelection();
                },
                dock:function (toDockShape, pos) {
                    // Set the Docker to the new Shape
                    this.docker.setDockedShape(undefined);
                    if (toDockShape) {
                        this.docker.setDockedShape(toDockShape);
                        this.docker.setReferencePoint(pos);
                        //this.docker.update();
                        //this.docker.parent._update();
                    } else {
                        this.docker.bounds.centerMoveTo(pos);
                    }

                    this.facade.getCanvas().update();


                }
            });


            if (this.docker.parent) {
                // Instanziate the dockCommand
                var command = new dragDockerCommand(this.docker, this.docker.getDockedShape() ? this.docker.referencePoint : this.docker.bounds.center(), this._commandArg.refPoint, this.docker.getDockedShape(), this._commandArg.dockedShape, this.facade);
                this.facade.executeCommands([command]);
            }
        }


        // Update all Shapes
        //this.facade.updateSelection();

        // Undefined all variables
        this.docker = undefined;
        this.dockerParent = undefined;
        this.dockerSource = undefined;
        this.dockerTarget = undefined;
        this.lastUIObj = undefined;
    },

    /**
     * Hide the highlighting
     */
    hideHighlight:function () {
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'validDockedShape'});
    },

    /**
     * Show the highlighting
     *
     */
    showHighlight:function (uiObj, color) {

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
            highlightId:'validDockedShape',
            elements:[uiObj],
            color:color
        });
    },

    showMagnets:function (uiObj) {
        //uiObj.magnets.each(function (magnet) {
		$.map(uiObj.magnets,function (magnet) {
            magnet.show();
        });
    },

    hideMagnets:function (uiObj) {
        //uiObj.magnets.each(function (magnet) {
		$.map(uiObj.magnets,function (magnet) {
            magnet.hide();
        });
    },

    getHighestParentBeforeCanvas:function (shape) {
        if (!(shape instanceof ORYX.Core.Shape)) {
            return undefined;
        }

        var parent = shape.parent;
        while (parent && !(parent.parent instanceof ORYX.Core.Canvas)) {
            parent = parent.parent;
        }

        return parent;
    }

});


// object 改写左边流程引擎对象生成和拖动事件

ORYX.Plugins.ShapeRepository = {

    facade:undefined,

    construct:function (facade) {
        this.facade = facade;
        this._currentParent;
        this._canContain = undefined;
        this._canAttach = undefined;

		var initTreeData = function(json){
			var rootNode={};
			var children = json.stencils;
			var result = [];
			
			rootNode.id = json.title;
			rootNode.title = json.title;
			result[0] = rootNode
			for(obj in children){
				if(typeof children[obj]==='object'){
					children[obj]['PAR_PERM'] = json.title;
					if (!children[obj]['hide']){
						result[result.length] =children[obj];
					}
				}
			}
			return result;
		};
		var data = initTreeData(this.facade.getTreeData());
		$.map(this.facade.getStencilSets().values(),function(value){
			 stencil = value._stencils;
		
		});
		
		var loadMoveEvent = function(){
			using("draggable",function(){
				$('.tree-node').draggable({
					revert:true,
					deltaX:1,
					deltaY:1,
					disabled:false,
					proxy:function(source){  //拖动时鼠标下显示的图形
						var n = $('<div class="proxy"></div>');
						var str = $(source).html().replace(/\<span class=\"tree-indent\"\>\<\/span\>/,"");
						n.html(str).appendTo('body');
						return n;
					}
				});
			});
		}
		
		//加载树控件显示的一些样式
		var loadSuccessTreeStyle = function(data){
			var img = $(".tree-file");
			var title = img.next();
			for(var i=0;i<data.length;i++){
				img.each(function(){
					var div =$(this).parent();
					var t = $(this).next().text();
					if($.trim(t) == $.trim(data[i]['title'])){
						$(this).css({
							background: 'url('+data[i]['icon']+') no-repeat scroll rgba(0, 0, 0, 0) '
						});
						div.attr("title",data[i]['description']);
					}
				});
			}
			$("#objNode").find("li").addClass("liNode");
			loadMoveEvent();
		};
		
		using("tree",function(){
			var tree = $("#objNode").tree({
				width:200,
				animate:true,
				async:false,
				data:data,
				panelWidth:200,
				treeExpand:'all',
				conf:{
					nodeId:'id',
					nodeName:'title',
					treeType:'1'
					,parNode:'PAR_PERM'
			    },
			    onBeforeLoad:function(){
					//icon;
					//$("#objNode").tree();
					
			    },
			    onLoadSuccess:function(node, tdata){
					loadSuccessTreeStyle(data);
				}
			});
			
			var root = $("#objNode").tree('getRoot');
			var children = $("#objNode").tree('getChildren',root.target);
			
			$.map(children,function(node){
				var op = {
						node:node,
						//handles:[ui.elNode, ui.textNode].concat($A(ui.elNode.childNodes)), // Set the Handles
						isHandle:false,
						type:node.id, // Set Type of stencil
						namespace:stencil[node.id]._namespace        // Set Namespace of stencil
					}
				var target =$(node.target).attr("style","").get(0);
				$.data(target, op);   
			});
		});
		
		var self = this;
		var loadTargetAccept = function(){
			var target = self.facade.getCanvas().rootNode.parentNode;
			ORYX.Droppable.two = self;
			ORYX.Droppable.init(target);
		}
		loadTargetAccept();
    },



    

    drop:function (proxy, target, event) {

        this._lastOverElement = undefined;
        // Hide the highlighting
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.added'});
        this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.attached'});

        // Check if drop is allowed
        /*var proxy = $(dragZone).getProxy()
        if (proxy.dropStatus == proxy.dropNotAllowed) {
            return
        }*/

        // Check if there is a current Parent
        if (!this._currentParent) {
            return
        }

        //var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);
		
		var option =$.data(target);

        //var xy = event.getXY();
		//var pos = {x:xy[0], y:xy[1]};
		var xy = proxy.position();
        var pos = {x:xy.left, y:xy.top};

        var a = this.facade.getCanvas().node.getScreenCTM();

        // Correcting the UpperLeft-Offset
        pos.x -= a.e;
        pos.y -= a.f;
        // Correcting the Zoom-Faktor
        pos.x /= a.a;
        pos.y /= a.d;
        // Correting the ScrollOffset
        pos.x -= document.documentElement.scrollLeft;
        pos.y -= document.documentElement.scrollTop;
        // Correct position of parent
        var parentAbs = this._currentParent.absoluteXY();
        pos.x -= parentAbs.x;
        pos.y -= parentAbs.y;
        // Set position
        option['position'] = pos

        // Set parent
        if (this._canAttach && this._currentParent instanceof ORYX.Core.Node) {
            option['parent'] = undefined;
        } else {
            option['parent'] = this._currentParent;
        }

        var commandClass = ORYX.Core.Command.extend({
            construct:function (option, currentParent, canAttach, position, facade) {
                this.option = option;
                this.currentParent = currentParent;
                this.canAttach = canAttach;
                this.position = position;
                this.facade = facade;
                this.selection = this.facade.getSelection();
                this.shape;
                this.parent;
            },
            execute:function () {
                if (!this.shape) {
                    this.shape = this.facade.createShape(option);
                    this.parent = this.shape.parent;
                } else {
                    this.parent.add(this.shape);
                }


                if (this.canAttach && this.currentParent instanceof ORYX.Core.Node && this.shape.dockers.length > 0) {

                    var docker = this.shape.dockers[0];

                    if (this.currentParent.parent instanceof ORYX.Core.Node) {
                        this.currentParent.parent.add(docker.parent);
                    }

                    docker.bounds.centerMoveTo(this.position);
                    docker.setDockedShape(this.currentParent);
                    //docker.update();
                }

                //this.currentParent.update();
                //this.shape.update();

                this.facade.setSelection([this.shape]);
                this.facade.getCanvas().update();
                this.facade.updateSelection();

            },
            rollback:function () {
                this.facade.deleteShape(this.shape);

                //this.currentParent.update();

                this.facade.setSelection(this.selection.without(this.shape));
                this.facade.getCanvas().update();
                this.facade.updateSelection();

            }
        });

        //var position = this.facade.eventCoordinates(event.browserEvent);
		var position = this.facade.eventCoordinatesByOffset(proxy.offset());

        var command = new commandClass(option, this._currentParent, this._canAttach, position, this.facade);

        this.facade.executeCommands([command]);

        this._currentParent = undefined;
    },

    beforeDragOver:function (target, event) {
        var coord = this.facade.eventCoordinatesByOffset($(target).draggable('proxy').offset());
        var aShapes = this.facade.getCanvas().getAbstractShapesAtPosition(coord);
		
        if (aShapes.length <= 0) {  
            return false;
        }

        var el = aShapes.last();


        if (aShapes.lenght == 1 && aShapes[0] instanceof ORYX.Core.Canvas) {
            return false;
        } else {
            // check containment rules
            //var option = Ext.dd.Registry.getHandle(target.DDM.currentTarget);
			var option = $.data(target);

            var stencilSet = this.facade.getStencilSets()[option.namespace];

            var stencil = stencilSet.stencil(option.type);

            if (stencil.type() === "node") {
                var parentCandidate = aShapes.reverse().find(function (candidate) {
                    var result= (candidate instanceof ORYX.Core.Canvas
                        || candidate instanceof ORYX.Core.Node
                        || candidate instanceof ORYX.Core.Edge);
						return result;
                });

                if (parentCandidate !== this._lastOverElement) {
                    this._canAttach = undefined;
                    this._canContain = undefined;

                }
				
                if (parentCandidate) {
                    //check containment rule

                    if (!(parentCandidate instanceof ORYX.Core.Canvas) && parentCandidate.isPointOverOffset(coord.x, coord.y) && this._canAttach == undefined) {

                        this._canAttach = this.facade.getRules().canConnect({
                            sourceShape:parentCandidate,
                            edgeStencil:stencil,
                            targetStencil:stencil
                        });

                        if (this._canAttach) {
                            // Show Highlight
                            this.facade.raiseEvent({
                                type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                                highlightId:"shapeRepo.attached",
                                elements:[parentCandidate],
                                style:ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                                color:ORYX.CONFIG.SELECTION_VALID_COLOR
                            });

                            this.facade.raiseEvent({
                                type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                                highlightId:"shapeRepo.added"
                            });

                            this._canContain = undefined;
                        }

                    }

                    if (!(parentCandidate instanceof ORYX.Core.Canvas) && !parentCandidate.isPointOverOffset(coord.x, coord.y)) {
                        this._canAttach = this._canAttach == false ? this._canAttach : undefined;
                    }
                    if (this._canContain == undefined && !this._canAttach) {

                        this._canContain = this.facade.getRules().canContain({
                            containingShape:parentCandidate,
                            containedStencil:stencil
                        });
						
                        // Show Highlight
                        this.facade.raiseEvent({
                            type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                            highlightId:'shapeRepo.added',
                            elements:[parentCandidate],
                            color:this._canContain ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
                        });
                        this.facade.raiseEvent({
                            type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId:"shapeRepo.attached"
                        });
                    }


                    this._currentParent = this._canContain || this._canAttach ? parentCandidate : undefined;
                    this._lastOverElement = parentCandidate;
                    /*var pr = dragZone.getProxy();
                    pr.setStatus(this._currentParent ? pr.dropAllowed : pr.dropNotAllowed);
                    pr.sync();*/

                }
            } else { //Edge
                this._currentParent = this.facade.getCanvas();
                /*var pr = dragZone.getProxy();
                pr.setStatus(pr.dropAllowed);
                pr.sync();*/
            }
        }
        return false
    }
}

ORYX.Plugins.ShapeRepository = Clazz.extend(ORYX.Plugins.ShapeRepository);



// objecteast布局中属性的显示
ORYX.Plugins.PropertyWindow = {

    facade:undefined,

    construct:function (facade) {
        // Reference to the Editor-Interface
        this.facade = facade;
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHOW_PROPERTYWINDOW, this.init.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, this.selectDiagram.bind(this));
        this.init();
    },

    init:function () {
		
        // The parent div-node of the grid
        this.node = ORYX.Editor.graft("http://www.w3.org/1999/xhtml",
            null,
            ['div']);

        // If the current property in focus is of type 'Date', the date format
        // is stored here.
        this.currentDateFormat;

        // the properties array
        this.popularProperties = [];
        this.properties = [];

        /* The currently selected shapes whos properties will shown */
        this.shapeSelection = new Hash();
        this.shapeSelection.shapes = new Array();
        this.shapeSelection.commonProperties = new Array();
        this.shapeSelection.commonPropertiesValues = new Hash();

        this.updaterFlag = false;
		
		this.addLinkShowDialog();  //为propertygrid的editer添加的类型

    },

    // Select the Canvas when the editor is ready
    selectDiagram:function () {
		
        this.shapeSelection.shapes = [this.facade.getCanvas()];

        //this.setPropertyWindowTitle();
        this.identifyCommonProperties();
        //this.createProperties();
    },

    specialKeyDown:function (field, event) {
        // If there is a TextArea and the Key is an Enter
        /*if (field instanceof Ext.form.TextArea && event.button == ORYX.CONFIG.KEY_Code_enter) {
            // Abort the Event
            return false
        }*/
    },
    tooltipRenderer:function (value, p, record) {
        /* Prepare tooltip */
        p.cellAttr = 'title="' + record.data.gridProperties.tooltip + '"';
        return value;
    },

    renderer:function (value, p, record) {

        this.tooltipRenderer(value, p, record);

        if (value instanceof Date) {
            // TODO: Date-Schema is not generic
            value = value.dateFormat(ORYX.I18N.PropertyWindow.dateFormat);
        } else if (String(value).search("<a href='") < 0) {
            // Shows the Value in the Grid in each Line
            value = String(value).gsub("<", "&lt;");
            value = String(value).gsub(">", "&gt;");
            value = String(value).gsub("%", "&#37;");
            value = String(value).gsub("&", "&amp;");

            if (record.data.gridProperties.type == ORYX.CONFIG.TYPE_COLOR) {
                value = "<div class='prop-background-color' style='background-color:" + value + "' />";
            }

            record.data.icons.each(function (each) {
                if (each.name == value) {
                    if (each.icon) {
                        value = "<img src='" + each.icon + "' /> " + value;
                    }
                }
            });
        }

        return value;
    },

    beforeEdit:function (option) {

        var editorGrid = this.dataSource.getAt(option.row).data.gridProperties.editor;
        var editorRenderer = this.dataSource.getAt(option.row).data.gridProperties.renderer;

        if (editorGrid) {
            // Disable KeyDown
            this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);

            option.grid.getColumnModel().setEditor(1, editorGrid);

            editorGrid.field.row = option.row;
            // Render the editor to the grid, therefore the editor is also available
            // for the first and last row
            //editorGrid.render(this.grid);

            //option.grid.getColumnModel().setRenderer(1, editorRenderer);
            editorGrid.setSize(option.grid.getColumnModel().getColumnWidth(1), editorGrid.height);
        } else {
            return false;
        }

        var key = this.dataSource.getAt(option.row).data.gridProperties.propId;

        this.oldValues = new Hash();
        this.shapeSelection.shapes.each(function (shape) {
            this.oldValues[shape.getId()] = shape.properties[key];
        }.bind(this));
    },

    afterEdit:function (option) {
        //Ext1.0: option.grid.getDataSource().commitChanges();
        option.grid.getStore().commitChanges();

        var key = option.record.data.gridProperties.propId;
        var selectedElements = this.shapeSelection.shapes;

        var oldValues = this.oldValues;

        var newValue = option.value;
        var facade = this.facade;


        // Implement the specific command for property change
        var commandClass = ORYX.Core.Command.extend({
            construct:function () {
                this.key = key;
                this.selectedElements = selectedElements;
                this.oldValues = oldValues;
                this.newValue = newValue;
                this.facade = facade;
            },
            execute:function () {
                this.selectedElements.each(function (shape) {
                    if (!shape.getStencil().property(this.key).readonly()) {
                        shape.setProperty(this.key, this.newValue);
                    }
                }.bind(this));
                this.facade.setSelection(this.selectedElements);
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            },
            rollback:function () {
                this.selectedElements.each(function (shape) {
                    shape.setProperty(this.key, this.oldValues[shape.getId()]);
                }.bind(this));
                this.facade.setSelection(this.selectedElements);
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            }
        })
        // Instanciated the class
        var command = new commandClass();

        // Execute the command
        this.facade.executeCommands([command]);


        // extended by Kerstin (start)
//
        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,
            elements:selectedElements,
            key:key,
            value:option.value
        });
        // extended by Kerstin (end)
    },

    // Changes made in the property window will be shown directly
    editDirectly:function (key, value) {
		if(!key) return false;
        this.shapeSelection.shapes.each(function (shape) {
            if (!shape.getStencil().property(key).readonly()) {
                shape.setProperty(key, value);
                //shape.update();
            }
        }.bind(this));

        /* Propagate changed properties */
        var selectedElements = this.shapeSelection.shapes;

        this.facade.raiseEvent({
            type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,
            elements:selectedElements,
            key:key,
            value:value
        });

        this.facade.getCanvas().update();

    },

    // if a field becomes invalid after editing the shape must be restored to the old value
    updateAfterInvalid:function (key) {
        this.shapeSelection.shapes.each(function (shape) {
            if (!shape.getStencil().property(key).readonly()) {
                shape.setProperty(key, this.oldValues[shape.getId()]);
                shape.update();
            }
        }.bind(this));

        this.facade.getCanvas().update();
    },



    /**
     * 属性模块标题
     */
    setPropertyWindowTitle:function () { 
		var self = this;
		if(this.facade.isValid)return;
	//	using("layout",function(){
	//		var region = $('#main').layout('panel','east'),
			var	title= "";
			if (self.shapeSelection.shapes.length == 1) {
				title = ORYX.I18N.PropertyWindow.title + ' (' + self.shapeSelection.shapes.first().getStencil().title() + ')';
				
			} else {
				title = ORYX.I18N.PropertyWindow.title + ' ('
					+ self.shapeSelection.shapes.length
					+ ' '
					+ ORYX.I18N.PropertyWindow.selected
					+ ')';
			}
			
			$(".layout-panel-east").find(".panel-title ").html(title);
	//		region.panel({title: title });
	//	})

    },
    /**
     * Sets this.shapeSelection.commonPropertiesValues.
     * If the value for a common property is not equal for each shape the value
     * is left empty in the property window.
     */
    setCommonPropertiesValues:function () {
        this.shapeSelection.commonPropertiesValues = new Hash();
		var self = this;
        this.shapeSelection.commonProperties.each(function (property) {
            var key = property.prefix() + "-" + property.id();
            var emptyValue = false;
            var firstShape = self.shapeSelection.shapes.first();
			
            self.shapeSelection.shapes.each(function (shape) {
                if (firstShape.properties[key] != shape.properties[key]) {
                    emptyValue = true;
                }
            }.bind(this));
            /* Set property value */
            if (!emptyValue) {
                self.shapeSelection.commonPropertiesValues[key] = firstShape.properties[key];
            }
        }.bind(this));
		
    },

    /**
     * Returns the set of stencils used by the passed shapes.
     */
    getStencilSetOfSelection:function () {
        var stencils = new Hash();

        //this.shapeSelection.shapes.each(function (shape) {
		$.map(this.shapeSelection.shapes,function (shape) {
            stencils[shape.getStencil().id()] = shape.getStencil();
        })
        return stencils;
    },

    /**
     * Identifies the common Properties of the selected shapes.
     */
    identifyCommonProperties:function () {
        this.shapeSelection.commonProperties.clear();

        /*
         * A common property is a property, that is part of
         * the stencil definition of the first and all other stencils.
         */
        var stencils = this.getStencilSetOfSelection();
        var firstStencil = stencils.values().first();
        var comparingStencils = stencils.values().without(firstStencil);

        if (comparingStencils.length == 0) {
            this.shapeSelection.commonProperties = firstStencil.properties();
        } else {
            var properties = new Hash();

            /* put all properties of on stencil in a Hash */
            //firstStencil.properties().each(function (property) {
			$.map(firstStencil.properties(),function (property) {
                properties[property.namespace() + '-' + property.id()
                    + '-' + property.type()] = property;
            });

            /* Calculate intersection of properties. */
            //comparingStencils.each(function (stencil) {
			$.map(comparingStencils,function (stencil) {
                var intersection = new Hash();
                //stencil.properties().each(function (property) {
				$.map(stencil.properties(),function (property) {
                    if (properties[property.namespace() + '-' + property.id()
                        + '-' + property.type()]) {
                        intersection[property.namespace() + '-' + property.id()
                            + '-' + property.type()] = property;
                    }
                });
                properties = intersection;
            });
			
            this.shapeSelection.commonProperties = properties.values();
        }
    },

    onSelectionChanged:function (event) {  //
        /* Event to call afterEdit method */
        //this.grid.stopEditing();
		if(this.facade.isValid)return;
        /* Selected shapes */
        this.shapeSelection.shapes = event.elements;

        /* Case: nothing selected */
        if (event.elements.length == 0) {  
            this.shapeSelection.shapes = [this.facade.getCanvas()];
        }

        /* subselection available */
        if (event.subSelection) {  
            this.shapeSelection.shapes = [event.subSelection];
        }
		
		//this.checkPropertyByType();

        
        this.identifyCommonProperties();
        this.setCommonPropertiesValues();

        this.createProperties();
		
		this.setPropertyWindowTitle();
    },
	
	/*checkPropertyByType:function(){
		var elements = this.shapeSelection.shapes;
		var result = true;
		if(elements.length>0 && elements[0].dockers && elements[0].dockers.length>0){
			var fnodeObj = undefined;
				//fnodeObj = elements[0].dockers.first().getDockedShape();
			fnodeObj = elements[0].incoming;
			
			if(fnodeObj[0] instanceof ORYX.Core.Node){
			
				var stencilId = fnodeObj[0]._stencil._jsonStencil.id;
				stencilId = stencilId.substring(stencilId.indexOf("#")+1,stencilId.length);
				if(stencilId === "ExclusiveGateway"){ //排他类型节点
					var outgoing = fnodeObj[0].outgoing;  //下一步的连接 有2条
					var tmp = false;
					$.map(outgoing,function(outer){
						var propertyData = outer.properties._data;
						if(propertyData['oryx-conditionsequenceflow'] !='' || propertyData['oryx-defaultflow']=='Default'){
							tmp = true;
							return false;
						}
					});
					result = tmp;
				}
			}
			
		}
		return result;
	},*/

    /**
     * Creates the properties for the ExtJS-Grid from the properties of the
     * selected shapes.
     */
    
	
	

    hideMoreAttrs:function (panel) {
        // TODO: Implement the case that the canvas has no attributes
        if (this.properties.length <= 0) {
            return
        }

        // prevent the more attributes pane from closing after a attribute has been edited
        //this.grid.view.un("refresh", this.hideMoreAttrs, this);
    },

    setProperties:function () {
        var props = this.popularProperties.concat(this.properties);
        //this.dataSource.loadData(props);
		this.setPropertiesToGrid(props);
		this.hideOrShowAttr();
    },
	
	//根据业务需求添加验证
	validatePropertyValue:function(key,editor){
		if(this.shapeSelection.shapes[0] instanceof ORYX.Core.Canvas){   //只验证流程属性
			switch(key){
				case "oryx-name":
					editor.options.required=true;
					editor.options.validType="val[1,255]";
					break;
				case "oryx-process_id":
					editor.options.required=true;
					editor.options.validType="val[1,64]";
					break;
			}
		}
		
	},
	
	createProperties:function(){
		var self = this,
			stencil = self.shapeSelection.shapes.first().getStencil(),
			stencilId = stencil.id(),
			isMustReName = false;
		if(stencilId.indexOf("#ServiceTask")>0 || stencilId.indexOf("#UserTask")>0){
			isMustReName = true;
		}
		if(this.shapeSelection.shapes.length==1){
			var sid = this.shapeSelection.shapes[0].id;
			if(this.currentShapeId && this.currentShapeId == sid){
				return false;
			}
			this.currentShapeId = sid;
		}
		//当对象属性弹出下拉框之后鼠标马上点击画板，下拉框来不及隐藏。。
		$(".combo-panel").hide();
		
		if (this.shapeSelection.commonProperties) {
			using("propertygrid",function(){
				var propertyData = {total:0,rows:[]};
				
				var editIndex=undefined;
				self.oldValue = {};
				
				//清空PropertyGrid编辑时的一些状态属性
				var clearPropertyGridOp = function(){
					var colunms = $("#propertyPanel").propertygrid("getColumnFields", false);
					if(colunms.length>0){
						var field = colunms[1];
						var col = $("#propertyPanel").propertygrid("getColumnOption", field);
						col.editor=undefined; 
						
						var options = $("#propertyPanel").propertygrid("options");
						options.editIndex = -1;
					}
				}
				clearPropertyGridOp();
				
				$.map(self.shapeSelection.commonProperties,function (pair, index) {
					var key = pair.prefix() + "-" + pair.id();
					// Get the property pair
					var name = pair.title();
					var icons = [];
					var attribute = self.shapeSelection.commonPropertiesValues[key]; 
					var attrValue="";
					var editorGrid = undefined;
					var editorRenderer = null;
					if (!pair.readonly()) {

					} else if (pair.type() === ORYX.CONFIG.TYPE_URL || pair.type() === ORYX.CONFIG.TYPE_DIAGRAM_LINK) {
						attribute = String(attribute).search("http") !== 0 ? ("http://" + attribute) : attribute;
						attribute = "<a href='" + attribute + "' target='_blank'>" + attribute.split("://")[1] + "</a>"
					}

					// Push to the properties-array
					if (pair.visible()) {
						// Popular Properties are those which are set to be popular
						if (pair.popular()) {
							pair.setPopular();
						}
					}
					var group = pair.popular() ? ORYX.I18N.PropertyWindow.oftenUsed : ORYX.I18N.PropertyWindow.moreProps;
					if(typeof attribute==='object'){
						if(attribute.totalCount==0){  
							attribute="";
						}else{
							attribute = JSON.stringify(attribute);
						}
						
					}
					var editor = 'text';
					
					//var it = prop[4],propitems = it.items;
					//var propId = pair.id();
					self.oldValue[key] = self.oldValue[key] || attribute;
					
					var  linkShowDialogtoInput = function(tag){
						var jsonObj = {
								"type":"linkShowDialog",
								options:{
									title:'组合编辑框',
									modal:true,
									width:480,
									height:350,
									data: null,
									propId:key, //id也需要传过去
									oldValue:self.oldValue[key],
									addContent:function(opt,editor){
										self.addTextarea(opt,editor);
									},
									callbackfun:function(opt,value){
										self.editDirectly(opt.propId, value);
										self.updateCell(opt,value);
									},
									buttons:[
										{
											text:'确定',
											iconCls:'icon-save',
											handler:function () {//需重写					
											}
										},
										{
											text:'取消',
											iconCls:'icon-cancel',
											handler:function () {
												$('#delegateTaskDialog').dialog('close');
											}
										}
									]
								}
							};
						if(tag){
							jsonObj.options.format = true;
						}
						return jsonObj;
					}
					
					
					switch (pair.type()){
						case ORYX.CONFIG.TYPE_STRING:   
							//editor='text';
							editor = {
								type:"textOnFocus",
								data: null,
								options:{
									/*maxLength:32,
									required:"true",*/
									validType:"val[1,32]",
									onKeyup:function(){
										self.editDirectly(key, this.value);
										$(this).parents("td[field='value']").attr('title',this.value);
									}
								}

							}
							break;
						case ORYX.CONFIG.TYPE_BOOLEAN:
							editor={
							"type":"checkbox",
							"options":{
								"on":true,
								"off":false
							}}
							break;
						case ORYX.CONFIG.TYPE_INTEGER:
							editor='integer';
							break;
						case ORYX.CONFIG.TYPE_FLOAT:
							editor='numberbox';
							break;
						case ORYX.CONFIG.TYPE_COLOR:  //color
							editor='textOnFocus';
							break;
						case ORYX.CONFIG.TYPE_CHOICE:   //**下拉框
							var data=[],propitems = pair.items();
							var selectData=undefined;
							if(propitems && propitems.length>0){
								propitems.each(function (value) {
									if (value.value() == attribute){
										attrValue = attribute;
										attribute = value.title();
										self.oldValue[key] = attribute;
									}
									var tmp={
										value:value.value()
										,text:value.title()
										,icon:value.icon()
									};
									data.push(tmp);
								});
							}
							
							editor={"type":"combobox",
								options:{
									valueField:'value',
									textField:'text',
									data: data,
									isClear:false,
									propId:key
									,formatter:function(row){
										var tmp = '<span class="item-text">&nbsp;'+row.text+'</span>';
										if(row.icon){
											tmp = '<img class="item-img" src="'+row.icon+'"/>'+tmp;
										}
										return tmp;
									}
									/*,onChange:function(value,tmp){
										self.editDirectly(key, value);
									}*/
									,onSelect:function(record){
										attrValue = record.value;  //更新下拉的值
										selectData = record;
										self.editDirectly(key, record.value);
									}
									,onHidePanel:function(){
										if(!selectData){
											return false;
										}
										var opt= {
											'propId':key,
											'oldValue':self.oldValue[key]
										}
										
										$('#propertyPanel').propertygrid("endEdit",editIndex);
										
										var value = selectData.value; //$(this).combo("getValue");
										var text = selectData.text;
										
										self.updateCell(opt,text);
										self.hideOrShowAttr();	
										clearPropertyGridOp();
									},
									onShowPanel:function(){
										$(this).combobox("setValue",attrValue);  //主要用于第一次打开默认赋值赋值
									}
								}
							}
							break;
						case ORYX.CONFIG.TYPE_COMPLEX:  //** 编辑组合框 
							var complexItems = pair.complexItems();
							var cols = [], tmp=[];
							$.map(complexItems,function(comp){
								var id = comp.id();
								var header = comp.name();
								var width = comp.width();
								var type = comp.type();
								var required = !comp._jsonItem.nullable;  //grid列的值是否可为空
								var edt=undefined;
								if (type == ORYX.CONFIG.TYPE_STRING) {
									edt = {
										"type":"textinput",
										"options":{
											required:required,
											data: null,
                                            removeSingleQuote:false
										}
									}
									
								} else if (type == ORYX.CONFIG.TYPE_CHOICE) {
									var items = comp.items();
									var data=[];
									if(items && items.length>0){
										items.each(function (value) {
											
											var tmp={
												value:value.value()
												,text:value.title()
												
											};
											
											data.push(tmp);
										});
									}
									edt={"type":"combobox",
										options:{
											valueField:'value',
											textField:'text',
											data: data,
											isClear:false,
											required:required
										}
									}
								} else if (type == ORYX.CONFIG.TYPE_BOOLEAN) {
									edt={
										"type":"checkbox",
										"options":{
											"on":true,
											"off":false
										}}
								} 
								tmp.push({
									field:id,
									title:header,
									editor:edt,
									width:100  //需自动宽度
								});
							});
							cols.push(tmp);
							var maxRowData=undefined;
							if(key =='oryx-usertaskassignment'){ //完成人只有一行数据
								maxRowData=1;
							}
							editor={
								"type":"linkShowDialog",
								options:{
									title:'组合编辑框',
									modal:true,
									draggable:true,
									data: null,
									width:480,
									height:350,
									columns:cols,
									maxRowData:maxRowData,
									propId:key, //id也需要传过去
									oldValue:self.oldValue[key],
									addContent:function(opt,editor){
										self.addDataGrid(opt,editor);
										
									},
									onBeforeClose:function(options,result){
										var tag = true;
										if(result){
											if(options.propId=='oryx-servicetaskfields'){//类字段
												for(var rowIndex = 0; rowIndex < result.length;rowIndex++){
													if(result[rowIndex]["servicetask_field_value"] ==""
													&& result[rowIndex]["servicetask_field_expression"] ==""){
														alert("请检查列表的数据：值(字符串类型)或表达式必须填写其中一项！");
														tag = false;
													}
												}
											}
										}
										return tag;
									},	
									callbackfun:function(opt,value){
										self.editDirectly(opt.propId, value);
										value = (value.totalCount ==0) ? "":JSON.stringify(value);
										self.updateCell(opt,value);
									},
									buttons:[
										{
											text:'确定',
											iconCls:'icon-save',
											handler:function () {//需重写					
											}
										},
										{
											text:'取消',
											iconCls:'icon-cancel',
											handler:function () {
												$('#delegateTaskDialog').dialog('close');
											}
										}
									]
								}
							};
							break;
						case ORYX.CONFIG.TYPE_TEXT_AREA:    //**大的文本框 保留换行格式
							editor = linkShowDialogtoInput("format");
							break;
						case ORYX.CONFIG.TYPE_TEXT:    //**大的文本框
							editor = linkShowDialogtoInput();
							break;
						default:
							editor = {
								"type":"textOnFocus",
								"options":{
									onKeyup:function(){
										self.editDirectly(key, this.value);
									}
								}
							}
							break;
					}
					self.validatePropertyValue(key,editor);
					
					//如果是定时器中间事件则时间周期属性隐藏
					if(self.shapeSelection.shapes && self.shapeSelection.shapes[0] && self.shapeSelection.shapes[0]._stencil){
						var stencilShapeId = self.shapeSelection.shapes[0]._stencil.id();
						if(stencilShapeId.endWith("CatchTimerEvent") && key.endWith("timercycledefinition")){
							return false;
						}
					}
					
					if(isMustReName && key=="oryx-documentation"){
						name = "服务号";
					}
					
					var row = {
						name:name,
						value:attribute,
						editor:editor,
						group:group 
					};
					propertyData.rows.push(row);
				});
				
				$('#propertyPanel').propertygrid("autoSizeColumn");
				$('#propertyPanel').propertygrid({
					onBeforeEdit:function(rowIndex, rowData){
						self.curRowObj=rowData.name;  //点击当前行的对象做个标示待更新时须用到
						editIndex = rowIndex;
					
					},
					onAfterEdit:function(rowIndex, rowData, changes){
						var td = $('.datagrid-body').find("td[field='value']").eq(rowIndex);
						var cell = td.find("div"),text = cell.html();
						if(text ==""){
							//datagrid控件中有问题，编辑过下拉框再点击其他的会导致其他的不显示，
							//因为编辑类型变成下拉框的bug，暂时直接在这里赋值下。
							td.find("div").html(rowData.value);
						}
						//下拉框中的text赋值给单元格
						if(rowData.editor.type =="combobox"){
							$.each(rowData.editor.options.data,function(){
								if(this.value == text){
									text = this.text;
									return false;
								}   
							});
							cell.html(text);
						}
					},
					onClickRow:function(rowIndex,row){
						$('#propertyPanel').propertygrid("beginEdit",rowIndex);
						//异步显示下拉框弹出panel
						setTimeout(function(){
							var $tr = $(".datagrid-row-selected").filter("tr[datagrid-row-index="+rowIndex+"]");
							var $combobox = $tr && $tr.find(".kui-combobox");
							if($combobox){
								var $input = $combobox.parent().find(".combo-text");
								$input.trigger("click"); //触发input的click事件
							}
						},0);
						
					}
					,onLoadSuccess:function(){
						self.autoColumnsWidthForIE("eastproperty");
					}
				});
				
				$('#propertyPanel').propertygrid("loadData",propertyData);  
			});
		}
		
		this.hideOrShowAttr();
	}
	
	//如果是定时器中间事件则时间周期属性隐藏
	,hideTimercycledefinition:function(shape,key){
		//CatchTimerEvent
		//shape.shapes[0]._stencil.id()
	}
	
	//根据业务须判断下拉框选中的值和其他值的关联
	,hideOrShowAttr:function(){
		var sequential = undefined,looptype=undefined,
			cardinality=undefined,collection=undefined,
			variable=undefined,condition=undefined,
			defaultflow=undefined,conditionsequenceflow=undefined,
			self=this;
		$("#eastproperty").find("td[field='name']").each(function(){
			if(this.title=='循环顺序'){
				sequential = this;
			}else if(this.title=='多实例类型'){
				looptype = this;
			}else if(this.title=='循环次数'){
				cardinality = this;
			}else if(this.title=='完成人集合'){
				collection = this;
			}else if(this.title=='完成人变量'){
				variable = this;
			}else if(this.title=='完成条件'){
				condition = this;
			}
			
		});
		$(sequential).parent().hide(); //无实际意义则隐藏
		$(collection).parent().hide(); //完成人集合的值固定了无需然给用户更改则隐藏
		
		
		//根据标签设置其下个td的文本显示
		var setValueToCell =function(tag,value){
			var index = $(tag).closest("tr").attr("datagrid-row-index");
			$('#propertyPanel').propertygrid("selectRow",index)
			var rowData= $('#propertyPanel').propertygrid("getSelected",index);
			rowData["value"] = value;
		}
		
		if(sequential && cardinality && looptype){ 
			
			var looptypeVal = $(looptype).next().attr("title");
			$(cardinality).parent().hide();
			//$(collection).parent().hide();
			$(variable).parent().hide();
			$(condition).parent().hide();
			
			if(looptypeVal=='Standard' || looptypeVal=='循环'){
				$(cardinality).parent().show();
				$(condition).parent().show();
				//$(sequential).parent().show();  //tangmi 需要显示有这种业务; //讨论后又说去掉 :(   
			}
			
			if(looptypeVal=='Parallel' || looptypeVal=='Sequential' ||  looptypeVal=='MI并行' || looptypeVal=='MI串行'){
				$(variable).parent().show();
				$(condition).parent().show();
				
				//固定完成人集合的值
				self.editDirectly("oryx-multiinstance_collection", "${countersignUsers}"); 
				setValueToCell(collection,"${countersignUsers}");
				self.oldValue["oryx-multiinstance_collection"] ="${countersignUsers}";
				if(looptypeVal=='Parallel' ||looptypeVal=='MI并行'){  //同步设置循环顺序
					self.editDirectly("oryx-multiinstance_sequential", "No"); 
				}else{
					self.editDirectly("oryx-multiinstance_sequential", "Yes");
				}
				
			}
			
			if(looptypeVal=='None' || looptypeVal=='空'){
				$(cardinality).parent().show();
				//$(collection).parent().show();
				$(variable).parent().show();
				$(condition).parent().show();
				
				/*var keys = ["oryx-multiinstance_collection","oryx-multiinstance_variable",
							"oryx-multiinstance_condition","oryx-multiinstance_cardinality"];
				var tag =[variable,collection,condition,cardinality];
				$.each(keys,function(i){
					//self.editDirectly(this, "");
					//setValueToCell(tag[i],"");
					//self.oldValue[tag[i]] ="";
					
				});*/
				
			}
		}
	}
	
	//编辑后更改cell的title和value
	,updateCell:function(opt,newValue){
		var self = this;
		var propId = opt.propId;
		
		//self.oldValue[propId] = self.oldValue[propId] || opt.oldValue || "";
		self.oldValue[propId] = (self.oldValue[propId]=='undefined') ? opt.oldValue : self.oldValue[propId];
		
		$('.datagrid-body').find("td[field='value']").each(function(){  //编辑的td
			var t = $(this).attr("title"),
				td = $(this).prev();
			
			//大小括号的替换
			if(t!=""){
				t = t.replace(/\&gt\;/g,'>').replace(/\&lt\;/g,'<');
			}
			if(t == self.oldValue[propId] && $(td).attr("title") == self.curRowObj){
				var td = $(this);
				td.attr("title",newValue);
				var div = td.children("div.datagrid-cell").eq(0);
				div.html(newValue);
				self.oldValue[propId] = newValue;
				return false;
			}
		});
	}
	
	//IE有时grid的列有时候不是自动宽度，这里纠正下。
	,autoColumnsWidthForIE:function(divId){
		if($.browser.msie){
			setTimeout(function(){
				var header = $("#"+divId).find(".datagrid-view2").find(".datagrid-header");
				var body = $("#"+divId).find(".datagrid-view2").find(".datagrid-body");
				var headerTr = header.find(".datagrid-header-row");
				var bodyTr = body.find(".datagrid-row");
				bodyTr.each(function(){
					var bt = $(this);
					headerTr.find(".datagrid-cell").each(function(i){
						bt.find("td").eq(i).find(".datagrid-cell").width($(this).width());
					});
				}); 
			},100);
		}
	}
	
	//datagrid数据组装添加和和对其的一些操作
	,addDataGrid:function(options,editor){
		var columns = options.columns,
			self = this,
			propId = options.propId,
			maxRowData = options.maxRowData;
		$("#delegateTaskDialog").empty();
		
		var gridrows = {total:0,rows:[]};	
		if(self.oldValue[propId]){
			var val = $.evalJSON(self.oldValue[propId]);
			if(val && val.items && val.items.length>0){
				var sub = val.items;
				$.map(sub,function(row){
					gridrows["rows"].push(row);
				});
			}
		}
		
		var allocation = $("<table></table>");
		allocation.appendTo("#delegateTaskDialog");
		allocation.attr("id","allocation");
			
		using("datagrid",function(){
			var editIndex = undefined;
			var currentCell = undefined;
			function endEditing(){
				if (editIndex == undefined) {
					return true
				}
				if ($('#allocation').datagrid('validateRow', editIndex)) {
					$('#allocation').datagrid('endEdit', editIndex);
					editIndex = undefined;
					return true;
				} else {
					return false;
				}
			}
			function onClickRow(index) {
				if (editIndex != index) {
					if (endEditing()) {
						$('#allocation').datagrid('selectRow', index).datagrid('beginEdit', index);
						editIndex = index;
						//给点中的input获得焦点。
						var panel = $(this).datagrid("getPanel");
						setTimeout(function(){
							panel.find(".datagrid-view2").find(".datagrid-row-selected").find("input[name='"+currentCell+"']").focus();
						},100);
					} else {
						$('#allocation').datagrid('selectRow', editIndex);
					}
					
					
				}
			}
			function onAfterEdit(index){
				$('#allocation').datagrid('endEdit', editIndex);
			}
			
			function onBeforeEdit(index){
				if(endEditing()){
					editIndex = index;
				}
			}
			
			function append(){
				if (endEditing()){
					if(maxRowData){
						var data = $('#allocation').datagrid('getRows');
						if(data.length==maxRowData){
							alert("该属性不可增加多余的数据项");
							return;
						}
					}
					$('#allocation').datagrid('appendRow');
					editIndex = $('#allocation').datagrid('getRows').length-1;
					$('#allocation').datagrid('selectRow', editIndex)
							.datagrid('beginEdit', editIndex);
							
				}
			}
			function removeRow(){
				var row = $('#allocation').datagrid('getSelected');
				if (row == null) {
					alert('请选择一条记录！');
					return;
				} else {
					if (editIndex == undefined){return}
					$('#allocation').datagrid('destroyEditor', editIndex).datagrid('deleteRow', editIndex);
					editIndex = undefined;
				}
			}
			function getRowIndex(){
				var tr = $('#allocation').closest('tr.datagrid-row');
				return parseInt(tr.attr('datagrid-row-index'));
			}
			
			function saverow(){
				$('#allocation').datagrid('endEdit', getRowIndex());
			}
			
			

			$("#allocation").datagrid({
				fitColumns:true,
				singleSelect:true,
				pagination:false,
				//rowEdit:true,
				columns:columns,
				height:270,
				toolbar:[{
					 text:'新增',
					 left:'left',
					 iconCls:'icon-add',
					 handler:function(e){
						append();
						}
					},
					{
					 text:'删除',
					 iconCls:'icon-remove',
					 handler:function(e){
						 removeRow();
						}
					}
				]
				,onClickRow:onClickRow
				,onBeforeEdit:onBeforeEdit
				,onAfterEdit:onAfterEdit
				,onLoadSuccess:function(){self.autoColumnsWidthForIE("delegateTaskDialog")}
				,onClickCell:function(rowIndex, field, value){
					currentCell = field;  //把字段名赋值
				}
				
			});
			
			$("#allocation").datagrid("loadData",gridrows);
			
			//重写下确认按钮事件
			options.buttons[0].handler =function(){
				if (endEditing()) {
					
					var data = $('#allocation').datagrid('getRows');
					var result = {
						"totalCount":0,
						"items":[]
					},count=0;
					$.map(data,function(row){
						result.items.push(row);
						count++;
					});
					if($.isFunction(options.onBeforeClose)){
						var tag = options.onBeforeClose.call(null,options,result.items);
						if(!tag){
							return false;
						}
					}
					
					result.totalCount=count;
					var tmp = result;
					result = (count==0) ? "" : JSON.stringify(result); //如果没有选择数据则为空的。
					//var result = JSON.stringify(result);
					editor.val(result);  //给编辑器赋值
					$('#delegateTaskDialog').dialog('close');
					options.callbackfun.call(options,options,tmp);
				}
			}
		});
	},
	//模式窗里面添加文本域
	addTextarea:function(options,editor){
		var self = this;
		$("#delegateTaskDialog").empty();
		var textarea = $("<textarea></textarea>"); 
		textarea.css({
			width:460,
			height:265,
			resize:"none"
		});
		textarea.attr("id","txtProperty");
		textarea.appendTo("#delegateTaskDialog");
		using("textarea",function(){
			$("#txtProperty").val(self.oldValue[options.propId]);
			$("#txtProperty").textarea({
                removeSingleQuote:false
            });
		
		});
		options.buttons[0].handler =function(){
			var data = $("#txtProperty").val();
			editor.val(data);  //给编辑器赋值
			$('#delegateTaskDialog').dialog('close');
			options.callbackfun.call(options,options,editor.val());
			
		}
		
	}
	
	//增加了linkShowDialog编辑模式，可弹出模式窗口
	,addLinkShowDialog:function(){
		var self = this;
		var opt = null
		using("datagrid",function(){		
			$.extend($.fn.datagrid.defaults.editors, {
				linkShowDialog: {
					init: function(cell, options) {
						opt = options;
						var editor = $("<input type=\"text\" class=\"datagrid-editable-input\">");
						if(options.format){  //需要保留换行格式的
							editor = $("<textarea class=\"datagrid-editable-input\" style=\"resize: none;overflow:hidden;height:20px;\"> </textarea>");
						}
						editor.appendTo(cell);
						editor.val(self.oldValue[options.propId]);
						self.showDialog(options,editor); //点击后需要弹出模式窗口
						return editor;
					},
					getValue: function(target) {
						return $(target).val();
					},
					setValue: function(target, value) {
						var propId = opt.propId;
						$(target).val(self.oldValue[propId]); 
					},
					resize: function(target, size) {
						$(target)._outerWidth(size);
					}
				},
				 textOnFocus: {
					init: function(cell, options) {
						var editor = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(cell);
						editor.val(self.oldValue[options.propId]);
						editor.textinput(options);
						//editor.textinput("setMaxLength",32)
						editor.get(0).focus();
						return editor;
					},
					getValue: function(target) {
						return $(target).val();
					},
					setValue: function(target, value) {
						$(target).val(value);
					},
					resize: function(target, size) {
						$(target)._outerWidth(size);
					}
				}
			});
		});
	}
	//弹出模式窗口，根据options放入相应的标签。
	,showDialog:function(options,editor){
		options.addContent.call(this,options,editor);
		using('dialog', function () {
			$('#delegateTaskDialog').show();
			$('#delegateTaskDialog').dialog(options);
			var $dialogButton = $("#delegateTaskDialog").find(".dialog-button");
			$dialogButton.css({
				"border":"none"
			});
		});
	}
	
}

ORYX.Plugins.PropertyWindow = Clazz.extend(ORYX.Plugins.PropertyWindow);


// object
ORYX.Plugins.Overlay = Clazz.extend({

    facade:undefined,

    styleNode:undefined,

    construct:function (facade) {

        this.facade = facade;

        this.changes = [];

        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_SHOW, this.show.bind(this));
        this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_HIDE, this.hide.bind(this));

        this.styleNode = document.createElement('style')
        this.styleNode.setAttributeNS(null, 'type', 'text/css')

        document.getElementsByTagName('head')[0].appendChild(this.styleNode)

    },

    /**
     * Show the overlay for specific nodes
     * @param {Object} options
     *
     *     String                options.id        - MUST - Define the id of the overlay (is needed for the hiding of this overlay)
     *    ORYX.Core.Shape[]     options.shapes     - MUST - Define the Shapes for the changes
     *     attr-name:value        options.changes    - Defines all the changes which should be shown
     *
     *
     */
    show:function (options) {

        // Checks if all arguments are available
        if (!options ||
            !options.shapes || !options.shapes instanceof Array ||
            !options.id || !options.id instanceof String || options.id.length == 0) {

            return

        }

        //if( this.changes[options.id]){
        //	this.hide( options )
        //}


        // Checked if attributes are setted
        if (options.attributes) {

            // FOR EACH - Shape
            options.shapes.each(function (el) {

                // Checks if the node is a Shape
                if (!el instanceof ORYX.Core.Shape) {
                    return
                }

                this.setAttributes(el.node, options.attributes)

            }.bind(this))

        }

        var isSVG = true
        try {
            isSVG = options.node && options.node instanceof SVGElement;
        } catch (e) {
        }

        // Checks if node is setted and if this is an SVGElement
        if (options.node && isSVG) {

            options["_temps"] = []

            // FOR EACH - Node
            options.shapes.each(function (el, index) {

                // Checks if the node is a Shape
                if (!el instanceof ORYX.Core.Shape) {
                    return
                }

                var _temp = {}
                _temp.svg = options.dontCloneNode ? options.node : options.node.cloneNode(true);

                // Add the svg node to the ORYX-Shape
                el.node.firstChild.appendChild(_temp.svg)

                // If
                if (el instanceof ORYX.Core.Edge && !options.nodePosition) {
                    options['nodePosition'] = "START"
                }

                // If the node position is setted, it has to be transformed
                if (options.nodePosition) {

                    var b = el.bounds;
                    var p = options.nodePosition.toUpperCase();

                    // Check the values of START and END
                    if (el instanceof ORYX.Core.Node && p == "START") {
                        p = "NW";
                    } else if (el instanceof ORYX.Core.Node && p == "END") {
                        p = "SE";
                    } else if (el instanceof ORYX.Core.Edge && p == "START") {
                        b = el.getDockers().first().bounds
                    } else if (el instanceof ORYX.Core.Edge && p == "END") {
                        b = el.getDockers().last().bounds
                    }

                    // Create a callback for the changing the position
                    // depending on the position string
                    _temp.callback = function () {

                        var x = 0;
                        var y = 0;

                        if (p == "NW") {
                            // Do Nothing
                        } else if (p == "N") {
                            x = b.width() / 2;
                        } else if (p == "NE") {
                            x = b.width();
                        } else if (p == "E") {
                            x = b.width();
                            y = b.height() / 2;
                        } else if (p == "SE") {
                            x = b.width();
                            y = b.height();
                        } else if (p == "S") {
                            x = b.width() / 2;
                            y = b.height();
                        } else if (p == "SW") {
                            y = b.height();
                        } else if (p == "W") {
                            y = b.height() / 2;
                        } else if (p == "START" || p == "END") {
                            x = b.width() / 2;
                            y = b.height() / 2;
                        } else {
                            return
                        }

                        if (el instanceof ORYX.Core.Edge) {
                            x += b.upperLeft().x;
                            y += b.upperLeft().y;
                        }

                        _temp.svg.setAttributeNS(null, "transform", "translate(" + x + ", " + y + ")")

                    }.bind(this)

                    _temp.element = el;
                    _temp.callback();

                    b.registerCallback(_temp.callback);

                }


                options._temps.push(_temp)

            }.bind(this))


        }


        // Store the changes
        if (!this.changes[options.id]) {
            this.changes[options.id] = [];
        }

        this.changes[options.id].push(options);

    },

    /**
     * Hide the overlay with the spefic id
     * @param {Object} options
     */
    hide:function (options) {

        // Checks if all arguments are available
        if (!options ||
            !options.id || !options.id instanceof String || options.id.length == 0 ||
            !this.changes[options.id]) {

            return

        }


        // Delete all added attributes
        // FOR EACH - Shape
        //this.changes[options.id].each(function (option) {
		var self = this;
		$.map(this.changes[options.id],function (option) {
            //option.shapes.each(function (el, index) {
			$.map(option.shapes,function (el, index) {

                // Checks if the node is a Shape
                if (!el instanceof ORYX.Core.Shape) {
                    return
                }

                self.deleteAttributes(el.node)

            });//}.bind(this));


            if (option._temps) {

                //option._temps.each(function (tmp) {
				$.map(option._temps,function (tmp) {
                    // Delete the added Node, if there is one
                    if (tmp.svg && tmp.svg.parentNode) {
                        tmp.svg.parentNode.removeChild(tmp.svg)
                    }

                    // If
                    if (tmp.callback && tmp.element) {
                        // It has to be unregistered from the edge
                        tmp.element.bounds.unregisterCallback(tmp.callback)
                    }

                });//}.bind(this))

            }


        });//}.bind(this));


        this.changes[options.id] = null;


    },


    /**
     * Set the given css attributes to that node
     * @param {HTMLElement} node
     * @param {Object} attributes
     */
    setAttributes:function (node, attributes) {


        // Get all the childs from ME
        var childs = this.getAllChilds(node.firstChild.firstChild)

        var ids = []

        // Add all Attributes which have relation to another node in this document and concate the pure id out of it
        // This is for example important for the markers of a edge
        //childs.each(function (e) {
		$.map(childs,function (e) {
            ids.push($A(e.attributes).findAll(function (attr) {
                return attr.nodeValue.startsWith('url(#')
            }))
        })
        ids = ids.flatten().compact();
        ids = ids.collect(function (s) {
            return s.nodeValue
        }).uniq();
        ids = ids.collect(function (s) {
            return s.slice(5, s.length - 1)
        })

        // Add the node ID to the id
        ids.unshift(node.id + ' .me')

        var attr = $H(attributes);
        var attrValue = attr.toJSON().gsub(',', ';').gsub('"', '');
        var attrMarkerValue = attributes.stroke ? attrValue.slice(0, attrValue.length - 1) + "; fill:" + attributes.stroke + ";}" : attrValue;
        var attrTextValue;
        if (attributes.fill) {
            var copyAttr = Object.clone(attributes);
            copyAttr.fill = "black";
            attrTextValue = $H(copyAttr).toJSON().gsub(',', ';').gsub('"', '');
        }

        // Create the CSS-Tags Style out of the ids and the attributes
        csstags = ids.collect(function (s, i) {
            return "#" + s + " * " + (!i ? attrValue : attrMarkerValue) + "" + (attrTextValue ? " #" + s + " text * " + attrTextValue : "")
        })

        // Join all the tags
        var s = csstags.join(" ") + "\n"

        // And add to the end of the style tag
        this.styleNode.appendChild(document.createTextNode(s));


    },

    /**
     * Deletes all attributes which are
     * added in a special style sheet for that node
     * @param {HTMLElement} node
     */
    deleteAttributes:function (node) {

        // Get all children which contains the node id
        var delEl = $A(this.styleNode.childNodes)
            .findAll(function (e) {

                return e.textContent.include('#' + node.id)
            });

        // Remove all of them
        delEl.each(function (el) {
            el.parentNode.removeChild(el);
        });
    },

    getAllChilds:function (node) {

        var childs = $A(node.childNodes)

        $A(node.childNodes).each(function (e) {
            childs.push(this.getAllChilds(e))
        }.bind(this))

        return childs.flatten();
    }


});







ORYX.Core.AbstractShape.JSONHelper = {
    /**
     * Iterates over each child shape.
     * @param {Object} iterator Iterator function getting a child shape and his parent as arguments.
     * @param {boolean} [deep=false] Iterate recursively (childShapes of childShapes)
     * @param {boolean} [modify=false] If true, the result of the iterator function is taken as new shape, return false to delete it. This enables modifying the object while iterating through the child shapes.
     * @example
     * // Increases the lowerRight x value of each direct child shape by one.
     * myShapeAsJson.eachChild(function(shape, parentShape){
     *     shape.bounds.lowerRight.x = shape.bounds.lowerRight.x + 1;
     *     return shape;
     * }, false, true);
     */
    eachChild:function (iterator, deep, modify) {
        if (!this.childShapes) return;

        var newChildShapes = []; //needed if modify = true
		var self =this;

        //this.childShapes.each(function (shape) {
		$.map(this.childShapes,function (shape) {
            if (!(shape.eachChild instanceof Function)) {
                //Ext.apply(shape, ORYX.Core.AbstractShape.JSONHelper);
				$.extend(shape, ORYX.Core.AbstractShape.JSONHelper);
            }
            var res = iterator(shape, self);
            if (res) newChildShapes.push(res); //if false is returned, and modify = true, current shape is deleted.

            if (deep) shape.eachChild(iterator, deep, modify);
        });

        if (modify) this.childShapes = newChildShapes;
    },

    getShape:function () {
        return null;
    },
    getChildShapes:function (deep) {
        var allShapes = this.childShapes;

        if (deep) {
            this.eachChild(function (shape) {
                if (!(shape.getChildShapes instanceof Function)) {
                    //Ext.apply(shape, ORYX.Core.AbstractShape.JSONHelper);
					$.extend(shape, ORYX.Core.AbstractShape.JSONHelper);
                }
                allShapes = allShapes.concat(shape.getChildShapes(deep));
            }, true);
        }

        return allShapes;
    },

    /**
     * @return {String} Serialized JSON object
     */ 
    serialize:function () {
        //return Ext.encode(this);
		return JSON.stringify(this);
    }
}

if (!ORYX.Plugins)
    ORYX.Plugins = new Object();
// object
(function () {

    ORYX.Plugins.BPMN2_0 = {

        /**
         *    Constructor
         *    @param {Object} Facade: The Facade of the Editor
         */
        construct:function (facade) {
            this.facade = facade;

            this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED, this.handleDockerDocked.bind(this));
            this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED, this.handlePropertyChanged.bind(this));
            this.facade.registerOnEvent('layout.bpmn2_0.subprocess', this.handleSubProcess.bind(this));
            this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPEREMOVED, this.handleShapeRemove.bind(this));

            this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, this.afterLoad.bind(this));


            this.namespace = undefined;
        },

        hashedSubProcesses:{},

        hashChildShapes:function (shape) {
            var children = shape.getChildNodes();
            children.each(function (child) {
                if (this.hashedSubProcesses[child.id]) {
                    this.hashedSubProcesses[child.id] = child.absoluteXY();
                    this.hashedSubProcesses[child.id].width = child.bounds.width();
                    this.hashedSubProcesses[child.id].height = child.bounds.height();
                    this.hashChildShapes(child);
                }
            }.bind(this));
        },

        /**
         * Handle the layouting of a sub process.
         * Mainly to adjust the child dockers of a sub process.
         *
         */
        handleSubProcess:function (option) {

            var sh = option.shape;

            if (!this.hashedSubProcesses[sh.id]) {
                this.hashedSubProcesses[sh.id] = sh.absoluteXY();
                this.hashedSubProcesses[sh.id].width = sh.bounds.width();
                this.hashedSubProcesses[sh.id].height = sh.bounds.height();
                return;
            }

            var offset = sh.absoluteXY();
            offset.x -= this.hashedSubProcesses[sh.id].x;
            offset.y -= this.hashedSubProcesses[sh.id].y;

            var resized = this.hashedSubProcesses[sh.id].width !== sh.bounds.width() || this.hashedSubProcesses[sh.id].height !== sh.bounds.height();

            this.hashedSubProcesses[sh.id] = sh.absoluteXY();
            this.hashedSubProcesses[sh.id].width = sh.bounds.width();
            this.hashedSubProcesses[sh.id].height = sh.bounds.height();
            this.hashChildShapes(sh);


            // Move dockers only if currently is not resizing
            if (this.facade.isExecutingCommands() && !resized) {
                this.moveChildDockers(sh, offset);
            }
        },

        moveChildDockers:function (shape, offset) {

            if (!offset.x && !offset.y) {
                return;
            }

            var children = shape.getChildNodes(true);

            // Get all nodes
            var dockers = children
                // Get all incoming and outgoing edges
                .map(function (node) {
                    return [].concat(node.getIncomingShapes())
                        .concat(node.getOutgoingShapes())
                })
                // Flatten all including arrays into one
                .flatten()
                // Get every edge only once
                .uniq()
                // Get all dockers
                .map(function (edge) {
                    return edge.dockers.length > 2 ?
                        edge.dockers.slice(1, edge.dockers.length - 1) :
                        [];
                })
                // Flatten the dockers lists
                .flatten();

            var abs = shape.absoluteBounds();
            abs.moveBy(-offset.x, -offset.y)
            var obj = {};
            dockers.each(function (docker) {

                if (docker.isChanged) {
                    return;
                }

                var off = Object.clone(offset);

                if (!abs.isIncluded(docker.bounds.center())) {
                    var index = docker.parent.dockers.indexOf(docker);
                    var size = docker.parent.dockers.length;
                    var from = docker.parent.getSource();
                    var to = docker.parent.getTarget();

                    var bothAreIncluded = children.include(from) && children.include(to);

                    if (!bothAreIncluded) {
                        var previousIsOver = index !== 0 ? abs.isIncluded(docker.parent.dockers[index - 1].bounds.center()) : false;
                        var nextIsOver = index !== size - 1 ? abs.isIncluded(docker.parent.dockers[index + 1].bounds.center()) : false;

                        if (!previousIsOver && !nextIsOver) {
                            return;
                        }

                        var ref = docker.parent.dockers[previousIsOver ? index - 1 : index + 1];
                        if (Math.abs(-Math.abs(ref.bounds.center().x - docker.bounds.center().x)) < 2) {
                            off.y = 0;
                        } else if (Math.abs(-Math.abs(ref.bounds.center().y - docker.bounds.center().y)) < 2) {
                            off.x = 0;
                        } else {
                            return;
                        }
                    }

                }

                obj[docker.getId()] = {
                    docker:docker,
                    offset:off
                }
            })

            // Set dockers
            this.facade.executeCommands([new ORYX.Core.MoveDockersCommand(obj)]);

        },

        /**
         * DragDocker.Docked Handler
         *
         */
        handleDockerDocked:function (options) {
            var namespace = this.getNamespace();

            var edge = options.parent;
            var edgeSource = options.target;

            if (edge.getStencil().id() === namespace + "SequenceFlow") {
                var isGateway = edgeSource.getStencil().groups().find(function (group) {
                    if (group == "Gateways")
                        return group;
                });
                if (!isGateway && (edge.properties["oryx-conditiontype"] == "Expression"))
                // show diamond on edge source
                    edge.setProperty("oryx-showdiamondmarker", true);
                else
                // do not show diamond on edge source
                    edge.setProperty("oryx-showdiamondmarker", false);

                // update edge rendering
                //edge.update();

                this.facade.getCanvas().update();
            }
        },

        /**
         * PropertyWindow.PropertyChanged Handler
         */
        handlePropertyChanged:function (option) {
            var namespace = this.getNamespace();

            var shapes = option.elements;
            var propertyKey = option.key;
            var propertyValue = option.value;

            var changed = false;
            shapes.each(function (shape) {
                if ((shape.getStencil().id() === namespace + "SequenceFlow") &&
                    (propertyKey === "oryx-conditiontype")) {

                    if (propertyValue != "Expression")
                    // Do not show the Diamond
                        shape.setProperty("oryx-showdiamondmarker", false);
                    else {
                        var incomingShapes = shape.getIncomingShapes();

                        if (!incomingShapes) {
                            shape.setProperty("oryx-showdiamondmarker", true);
                        }

                        var incomingGateway = incomingShapes.find(function (aShape) {
                            var foundGateway = aShape.getStencil().groups().find(function (group) {
                                if (group == "Gateways")
                                    return group;
                            });
                            if (foundGateway)
                                return foundGateway;
                        });

                        if (!incomingGateway)
                        // show diamond on edge source
                            shape.setProperty("oryx-showdiamondmarker", true);
                        else
                        // do not show diamond
                            shape.setProperty("oryx-showdiamondmarker", false);
                    }

                    changed = true;
                }
            }.bind(this));

            if (changed) {
                this.facade.getCanvas().update();
            }

        },

        hashedPoolPositions:{},
        hashedLaneDepth:{},
        hashedBounds:{},
        hashedPositions:{},

        isResized:function (shape, bounds) {

            if (!bounds || !shape) {
                return false;
            }

            var oldB = bounds;
            //var oldXY = oldB.upperLeft();
            //var xy = shape.absoluteXY();
            return Math.round(oldB.width() - shape.bounds.width()) !== 0 || Math.round(oldB.height() - shape.bounds.height()) !== 0
        },

        getDepth:function (child, parent) {

            var i = 0;
            while (child && child.parent && child !== parent) {
                child = child.parent;
                ++i
            }
            return i;
        },

        updateDepth:function (lane, fromDepth, toDepth) {

            var xOffset = (fromDepth - toDepth) * 30;

            lane.getChildNodes().each(function (shape) {
                shape.bounds.moveBy(xOffset, 0);

                [].concat(children[j].getIncomingShapes())
                    .concat(children[j].getOutgoingShapes())

            })

        },

        moveBy:function (pos, offset) {
            pos.x += offset.x;
            pos.y += offset.y;
            return pos;
        },

        getHashedBounds:function (shape) {
            return this.currentPool && this.hashedBounds[this.currentPool.id][shape.id] ? this.hashedBounds[this.currentPool.id][shape.id] : shape.absoluteBounds();
        },

        getNamespace:function () {
            if (!this.namespace) {
                var stencilsets = this.facade.getStencilSets();
                if (stencilsets.keys()) {
                    this.namespace = stencilsets.keys()[0];
                } else {
                    return undefined;
                }
            }
            return this.namespace;
        }
    };

    ORYX.Plugins.BPMN2_0 = ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.BPMN2_0);

})();


// object
new function () {

    ORYX.Core.UIEnableDrag = function (event, uiObj, option) {

        this.uiObj = uiObj;
        var upL = uiObj.bounds.upperLeft();

        var a = uiObj.node.getScreenCTM();
        this.faktorXY = {x:a.a, y:a.d};

        this.scrollNode = uiObj.node.ownerSVGElement.parentNode.parentNode;

        this.offSetPosition = {
            x:Event.pointerX(event) - (upL.x * this.faktorXY.x),
            y:Event.pointerY(event) - (upL.y * this.faktorXY.y)};

        this.offsetScroll = {x:this.scrollNode.scrollLeft, y:this.scrollNode.scrollTop};

        this.dragCallback = ORYX.Core.UIDragCallback.bind(this);
        this.disableCallback = ORYX.Core.UIDisableDrag.bind(this);

        this.movedCallback = option ? option.movedCallback : undefined;
        this.upCallback = option ? option.upCallback : undefined;

        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.disableCallback, true);
        document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.dragCallback, false);

    };

    ORYX.Core.UIDragCallback = function (event) {

        var position = {
            x:Event.pointerX(event) - this.offSetPosition.x,
            y:Event.pointerY(event) - this.offSetPosition.y}

        position.x -= this.offsetScroll.x - this.scrollNode.scrollLeft;
        position.y -= this.offsetScroll.y - this.scrollNode.scrollTop;

        position.x /= this.faktorXY.x;
        position.y /= this.faktorXY.y;

        this.uiObj.bounds.moveTo(position);
        //this.uiObj.update();

        if (this.movedCallback)
            this.movedCallback(event);

        Event.stop(event);

    };

    ORYX.Core.UIDisableDrag = function (event) {
        document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE, this.dragCallback, false);
        document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEUP, this.disableCallback, true);

        if (this.upCallback)
            this.upCallback(event);

        this.upCallback = undefined;
        this.movedCallback = undefined;

        Event.stop(event);
    };


    /**
     * Implements a command to move docker by an offset.
     *
     * @class ORYX.Core.MoveDockersCommand
     * @param {Object} object An object with the docker id as key and docker and offset as object value
     *
     */
    ORYX.Core.MoveDockersCommand = ORYX.Core.Command.extend({
        construct:function (dockers) {
            this.dockers = $H(dockers);
            this.edges = $H({});
        },
        execute:function () {
            if (this.changes) {
                this.executeAgain();
                return;
            } else {
                this.changes = $H({});
            }

            this.dockers.values().each(function (docker) {
                var edge = docker.docker.parent;
                if (!edge) {
                    return
                }

                if (!this.changes[edge.getId()]) {
                    this.changes[edge.getId()] = {
                        edge:edge,
                        oldDockerPositions:edge.dockers.map(function (r) {
                            return r.bounds.center()
                        })
                    }
                }
                docker.docker.bounds.moveBy(docker.offset);
                this.edges[edge.getId()] = edge;
                docker.docker.update();
            }.bind(this));
            this.edges.each(function (edge) {
                this.updateEdge(edge.value);
                if (this.changes[edge.value.getId()])
                    this.changes[edge.value.getId()].dockerPositions = edge.value.dockers.map(function (r) {
                        return r.bounds.center()
                    })
            }.bind(this));
        },
        updateEdge:function (edge) {
            edge._update(true);
            [edge.getOutgoingShapes(), edge.getIncomingShapes()].flatten().invoke("_update", [true])
        },
        executeAgain:function () {
            this.changes.values().each(function (change) {
                // Reset the dockers
                this.removeAllDocker(change.edge);
                change.dockerPositions.each(function (pos, i) {
                    if (i == 0 || i == change.dockerPositions.length - 1) {
                        return
                    }
                    var docker = change.edge.createDocker(undefined, pos);
                    docker.bounds.centerMoveTo(pos);
                    docker.update();
                }.bind(this));
                this.updateEdge(change.edge);
            }.bind(this));
        },
        rollback:function () {
            this.changes.values().each(function (change) {
                // Reset the dockers
                this.removeAllDocker(change.edge);
                change.oldDockerPositions.each(function (pos, i) {
                    if (i == 0 || i == change.oldDockerPositions.length - 1) {
                        return
                    }
                    var docker = change.edge.createDocker(undefined, pos);
                    docker.bounds.centerMoveTo(pos);
                    docker.update();
                }.bind(this));
                this.updateEdge(change.edge);
            }.bind(this));
        },
        removeAllDocker:function (edge) {
            edge.dockers.slice(1, edge.dockers.length - 1).each(function (docker) {
                edge.removeDocker(docker);
            })
        }
    });

}();



if (!Signavio) {
    var Signavio = new Object();
}

if (!Signavio.Plugins) {
    Signavio.Plugins = new Object();
}

if (!Signavio.Plugins.Utils) {
    Signavio.Plugins.Utils = new Object();
}

if (!Signavio.Helper) {
    Signavio.Helper = new Object();
}
if(!Signavio.Utils){
	Signavio.Utils = {};
}


var DataManager = {

    /**
     * The init method should be called once in the DataManagers lifetime.
     * It causes the DataManager to initialize itself, the erdf parser, do all
     * neccessary registrations and configurations, to run the parser and
     * from then on deliver all resulting triples.
     * No parameters needed are needed in a call to this method.
     */
    init:function () {
        ERDF.init(DataManager._registerTriple);
        DataManager.__synclocal();
    },

    /**
     * This triple array is meant to be the whole knowledge of the DataManager.
     */
    _triples:[],

    /**
     * This method is meant for callback from erdf parsing. It is not to be
     * used in another way than to add triples to the triple store.
     * @param {Object} triple the triple to add to the triple store.
     */
    _registerTriple:function (triple) {
        DataManager._triples.push(triple)
    },

    /**
     * The __synclocal method is for internal usage only.
     * It performs synchronization with the local document, that is, the triple
     * store is adjustet to the content of the document, which could have been
     * changed by any other applications running on the same page.
     */
    __synclocal:function () {
        DataManager._triples = [];
        ERDF.run();
    },

    /**
     * Makes the shape passed into this method synchronize itself with the DOM.
     * This method returns the shapes resource object for further manipulation.
     * @param {Object} shape
     */
    __synchronizeShape:function (shape) {

        var r = ResourceManager.getResource(shape.resourceId);
        var serialize = shape.serialize();

        // store all serialize values
        serialize.each(function (ser) {

            var resource = (ser.type == 'resource');
            var _triple = new ERDF.Triple(
                new ERDF.Resource(shape.resourceId),
                {prefix:ser.prefix, name:ser.name},
                resource ?
                    new ERDF.Resource(ser.value) :
                    new ERDF.Literal(ser.value)
            );
            DataManager.setObject(_triple);
        });

        return r;
    },

    __storeShape:function (shape) {

        // first synchronize the shape,
        var resource = DataManager.__synchronizeShape(shape);

        // then save the synchronized dom.
        resource.save();  
    },

    __forceExistance:function (shape) {

        if (!$(shape.resourceId)) {

            if (!$$('.' + PROCESSDATA_REF)[0])
                DataManager.graft(XMLNS.XHTML,
                    document.getElementsByTagNameNS(XMLNS.XHTML, 'body').item(0), ['div', {'class':PROCESSDATA_REF, 'style':'display:none;'}]);

            // object is literal
            DataManager.graft(XMLNS.XHTML,
                $$('.' + PROCESSDATA_REF)[0], [

                    'div', {
                        'id':shape.resourceId,
                        //This should be done in a more dynamic way!!!!!
                        'class':(shape instanceof ORYX.Core.Canvas) ? "-oryx-canvas" : undefined
                    }
                ]);

        } else {
            var resource = $(shape.resourceId)
            var children = $A(resource.childNodes)
            children.each(function (child) {
                resource.removeChild(child);
            });
        }
        ;
    },

    __persistShape:function (shape) {

        // a shape serialization.
        var shapeData = shape.serialize();

        // initialize a triple array and construct a shape resource
        // to be used in triple generation.
        var triplesArray = [];
        var shapeResource = new ERDF.Resource(shape.resourceId);

        // remove all triples for this particular shape's resource
        DataManager.removeTriples(DataManager.query(
            shapeResource, undefined, undefined));

        // for each data set in the shape's serialization
        shapeData.each(function (data) {

            // construct a triple's value
            var value = (data.type == 'resource') ?
                new ERDF.Resource(data.value) :
                new ERDF.Literal(data.value);

            // construct triple and add it to the DOM.
            DataManager.addTriple(new ERDF.Triple(
                shapeResource,
                {prefix:data.prefix, name:data.name},
                value
            ));
        });
    },

    __persistDOM:function (facade) {

        // getChildShapes gets all shapes (nodes AND edges), deep flag
        // makes it return a flattened child hierarchy.

        var canvas = facade.getCanvas();
        var shapes = canvas.getChildShapes(true);
        var result = '';

        // persist all shapes.
        shapes.each(function (shape) {
            DataManager.__forceExistance(shape);
        });
        //DataManager.__synclocal();

        DataManager.__renderCanvas(facade);
        result += DataManager.serialize(
            $(ERDF.__stripHashes(facade.getCanvas().resourceId)), true);

        shapes.each(function (shape) {

            DataManager.__persistShape(shape);
            result += DataManager.serialize(
                $(ERDF.__stripHashes(shape.resourceId)), true);
        });

        //result += DataManager.__renderCanvas(facade);

        return result;
    },

    __renderCanvas:function (facade) {

        var canvas = facade.getCanvas();
        var stencilSets = facade.getStencilSets();
        var shapes = canvas.getChildShapes(true);

        DataManager.__forceExistance(canvas);

        DataManager.__persistShape(canvas);

        var shapeResource = new ERDF.Resource(canvas.resourceId);

        // remove all triples for this particular shape's resource
        DataManager.removeTriples(DataManager.query(
            shapeResource, undefined, undefined));

        DataManager.addTriple(new ERDF.Triple(
            shapeResource,
            {prefix:"oryx", name:"mode"},
            new ERDF.Literal("writable")
        ));

        DataManager.addTriple(new ERDF.Triple(
            shapeResource,
            {prefix:"oryx", name:"mode"},
            new ERDF.Literal("fullscreen")
        ));

        stencilSets.values().each(function (stencilset) {
            DataManager.addTriple(new ERDF.Triple(
                shapeResource,
                {prefix:"oryx", name:"stencilset"},
                new ERDF.Resource(stencilset.source().replace(/&/g, "%26"))
            ));

            DataManager.addTriple(new ERDF.Triple(
                shapeResource,
                {prefix:"oryx", name:"ssnamespace"},
                new ERDF.Resource(stencilset.namespace())
            ));

            stencilset.extensions().keys().each(function (extension) {
                DataManager.addTriple(new ERDF.Triple(
                    shapeResource,
                    {prefix:"oryx", name:"ssextension"},
                    new ERDF.Literal(extension)
                ));
            });
        });

        shapes.each(function (shape) {
            DataManager.addTriple(new ERDF.Triple(
                shapeResource,
                {prefix:"oryx", name:"render"},
                new ERDF.Resource("#" + shape.resourceId)
            ));
        });
    },

    __counter:0,
    __provideId:function () {

        while ($(RESOURCE_ID_PREFIX + DataManager.__counter))
            DataManager.__counter++;

        return RESOURCE_ID_PREFIX + DataManager.__counter;
    },

    serializeDOM:function (facade) {

        return DataManager.__persistDOM(facade);
    },

    syncGlobal:function (facade) {

        return DataManager.__syncglobal(facade);
    },

    /**
     * This method is used to synchronize local DOM with remote resources.
     * Local changes are commited to the server, and remote changes are
     * performed to the local document.
     * @param {Object} facade The facade of the editor that holds certain
     * resource representations as shapes.
     */
    __syncglobal:function (facade) {

        // getChildShapes gets all shapes (nodes AND edges), deep flag
        // makes it return a flattened child hierarchy.

        var canvas = facade.getCanvas();
        var shapes = canvas.getChildShapes(true);

        // create dummy resource representations in the dom
        // for all shapes that were newly created.

        shapes.select(function (shape) {

            // select shapes without resource id.

            return !($(shape.resourceId));

        }).each(function (shape) {

                // create new resources for them.
                if (USE_ARESS_WORKAROUNDS) {

                    /*
                     * This is a workaround due to a bug in aress. Resources are
                     * ignoring changes to raziel:type property once they are
                     * created. As long as this is not fixed, the resource is now
                     * being created using a randomly guessed id, this temporary id
                     * is then used in references and the appropriate div is being
                     * populated with properties.
                     *
                     * AFTER THIS PHASE THE DATA IS INCONSISTENT AS REFERENCES POINT
                     * TO IDS THAT ARE UNKNOWN TO THE BACK END.
                     *
                     * After the resource is actually created in aress, it gets an id
                     * that is persistent. All shapes are then being populated with the
                     * correct id references and stored on the server.
                     *
                     * AFTER THE SAVE PROCESS HAS RETURNED, THE DATA IS CONSISTENT
                     * REGARDING THE ID REFERENCES AGAIN.
                     */

                    var razielType = shape.properties['raziel-type'];

                    var div = '<div xmlns="http://www.w3.org/1999/xhtml">' +
                        '<span class="raziel-type">' + razielType + '</span></div>';

                    var r = ResourceManager.__createResource(div);
                    shape.resourceId = r.id();

                } else {

                    var r = ResourceManager.__createResource();
                    shape.resourceId = r.id();
                }

            });

        shapes.each(function (shape) {

            // store all shapes.
            DataManager.__storeShape(shape);
        });
    },

    /**
     * This method serializes a single div into a string that satisfies the
     * client/server communication protocol. It ingnores all elements that have
     * an attribute named class that includes 'transient'.
     * @param {Object} node the element to serialize.
     * @param {Object} preserveNamespace whether to preserve the parent's
     *                 namespace. If you are not sure about namespaces, provide
     *                 just the element to be serialized.
     */
    serialize:function (node, preserveNamespace) {
        if (node.nodeType == node.ELEMENT_NODE) {
            // serialize an element node.
            var children = $.makeArray(node.childNodes);
            var attributes = $.makeArray(node.attributes);
			
            var clazz = new String(node.getAttribute('class'));
			//var clazz = new String($(node).attr("class"));
			
            var ignore = clazz.split(' ').member('transient');

            // ignore transients.
            if (ignore)
                return '';

            // start serialization.

            var result = '<' + node.nodeName;

            // preserve namespace?
            if (!preserveNamespace)
                result += ' xmlns="' + (node.namespaceURI ? node.namespaceURI : XMLNS.XHTML) + '" xmlns:oryx="http://oryx-editor.org"';

            // add all attributes.

            attributes.each(function (attribute) {
                result += ' ' + attribute.nodeName + '="' +
                    attribute.nodeValue + '"';
            });

            // close if no children.

            if (children.length == 0)
                result += '/>';

            else {

                // serialize all children.

                result += '>';
                children.each(function (_node) {
                    result += DataManager.serialize(_node, true)
                });
                result += '</' + node.nodeName + '>'
            }

            return result;

        } else if (node.nodeType == node.TEXT_NODE) {

            // serialize a text node.
            return  node.nodeValue;
        }

        //TODO serialize cdata areas also.
        //TODO work on namespace awareness.
    },

    addTriple:function (triple) {

        // assert the subject is a resource

        if (!triple.subject.type == ERDF.LITERAL)
            throw 'Cannot add the triple ' + triple.toString() +
                ' because the subject is not a resource.'

        // get the element which represents this triple's subject.
        var elementId = ERDF.__stripHashes(triple.subject.value);
        var element = $(elementId);

        // assert the subject is inside this document.
        if (!element)
            throw 'Cannot add the triple ' + triple.toString() +
                ' because the subject "' + elementId + '" is not in the document.';

        if (triple.object.type == ERDF.LITERAL)

        // object is literal
            DataManager.graft(XMLNS.XHTML, element, [
                'span', {'class':(triple.predicate.prefix + "-" +
                    triple.predicate.name)}, triple.object.value.escapeHTML()
            ]);

        else {

            // object is resource
            DataManager.graft(XMLNS.XHTML, element, [
                'a', {'rel':(triple.predicate.prefix + "-" +
                    triple.predicate.name), 'href':triple.object.value}
            ]);

        }

        return true;
    },

    removeTriples:function (triples) {

        // alert('Removing ' +triples.length+' triples.');

        // from all the triples select those ...
        var removed = triples.select(

            function (triple) {

                // TODO remove also from triple store.
                // ... that were actually removed.
                return DataManager.__removeTriple(triple);
            });

        // sync and return removed triples.
        // DataManager.__synclocal();
        return removed;
    },

    removeTriple:function (triple) {

        // remember whether the triple was actually removed.
        var result = DataManager.__removeTriple(triple);

        // sync and return removed triples.
        // DataManager.__synclocal();
        return result;
    },

    __removeTriple:function (triple) {

        // assert the subject is a resource
        if (!triple.subject.type == ERDF.LITERAL)

            throw 'Cannot remove the triple ' + triple.toString() +
                ' because the subject is not a resource.';

        // get the element which represents this triple's subject.
        var elementId = ERDF.__stripHashes(triple.subject.value);
        var element = $(elementId);

        // assert the subject is inside this document.
        if (!element)

            throw 'Cannot remove the triple ' + triple.toString() +
                ' because the subject is not in the document.';

        if (triple.object.type == ERDF.LITERAL) {

            // continue searching actively for the triple.
            var result = DataManager.__removeTripleRecursively(triple, element);
            return result;
        }
    },

    __removeTripleRecursively:function (triple, continueFrom) {

        // return when this node is not an element node.
        if (continueFrom.nodeType != continueFrom.ELEMENT_NODE)
            return false;

        var classes = new String(continueFrom.getAttribute('class'));
        var children = $A(continueFrom.childNodes);

        if (classes.include(triple.predicate.prefix + '-' + triple.predicate.name)) {


            var content = continueFrom.textContent;
            if ((triple.object.type == ERDF.LITERAL) &&
                (triple.object.value == content))

                continueFrom.parentNode.removeChild(continueFrom);

            return true;

        } else {

            children.each(function (_node) {
                DataManager.__removeTripleRecursively(triple, _node)
            });
            return false;
        }

    },

    /**
     * graft() function
     * Originally by Sean M. Burke from interglacial.com, altered for usage with
     * SVG and namespace (xmlns) support. Be sure you understand xmlns before
     * using this funtion, as it creates all grafted elements in the xmlns
     * provided by you and all element's attribures in default xmlns. If you
     * need to graft elements in a certain xmlns and wish to assign attributes
     * in both that and another xmlns, you will need to do stepwise grafting,
     * adding non-default attributes yourself or you'll have to enhance this
     * function. Latter, I would appreciate: martin?apfelfabrik.de
     * @param {Object} namespace The namespace in which
     *                     elements should be grafted.
     * @param {Object} parent The element that should contain the grafted
     *                     structure after the function returned.
     * @param {Object} t the crafting structure.
     * @param {Object} doc the document in which grafting is performed.
     */
    graft:function (namespace, parent, t, doc) {

        doc = (doc || (parent && parent.ownerDocument) || document);
        var e;
        if (t === undefined) {
            echo("Can't graft an undefined value");
        } else if (t.constructor == String) {
            e = doc.createTextNode(t);
        } else {
            for (var i = 0; i < t.length; i++) {
                if (i === 0 && t[i].constructor == String) {
                    var snared = t[i].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
                    if (snared) {
                        e = doc.createElementNS(namespace, snared[1]);
                        e.setAttributeNS(null, 'class', snared[2]);
                        continue;
                    }
                    snared = t[i].match(/^([a-z][a-z0-9]*)$/i);
                    if (snared) {
                        e = doc.createElementNS(namespace, snared[1]);  // but no class
                        continue;
                    }

                    // Otherwise:
                    e = doc.createElementNS(namespace, "span");
                    e.setAttribute(null, "class", "namelessFromLOL");
                }

                if (t[i] === undefined) {
                    echo("Can't graft an undefined value in a list!");
                } else if (t[i].constructor == String || t[i].constructor == Array) {
                    this.graft(namespace, e, t[i], doc);
                } else if (t[i].constructor == Number) {
                    this.graft(namespace, e, t[i].toString(), doc);
                } else if (t[i].constructor == Object) {
                    // hash's properties => element's attributes
                    for (var k in t[i]) {
                        e.setAttributeNS(null, k, t[i][k]);
                    }
                } else if (t[i].constructor == Boolean) {
                    this.graft(namespace, e, t[i] ? 'true' : 'false', doc);
                } else
                    throw "Object " + t[i] + " is inscrutable as an graft arglet.";
            }
        }

        if (parent) parent.appendChild(e);

        return Element.extend(e); // return the topmost created node
    },

    setObject:function (triple) {

        /**
         * Erwartungen von Arvid an diese Funktion:
         * - Es existiert genau ein triple mit dem Subjekt und Praedikat,
         *   das uebergeben wurde, und dieses haelt uebergebenes Objekt.
         */

        var triples = DataManager.query(
            triple.subject,
            triple.predicate,
            undefined
        );

        DataManager.removeTriples(triples);

        DataManager.addTriple(triple);

        return true;
    },

    query:function (subject, predicate, object) {

        /*
         * Typical triple.
         *	{value: subject, type: subjectType},
         *	{prefix: schema.prefix, name: property},
         *	{value: object, type: objectType});
         */

        return DataManager._triples.select(function (triple) {

            var select = ((subject) ?
                (triple.subject.type == subject.type) &&
                    (triple.subject.value == subject.value) : true);
            if (predicate) {
                select = select && ((predicate.prefix) ?
                    (triple.predicate.prefix == predicate.prefix) : true);
                select = select && ((predicate.name) ?
                    (triple.predicate.name == predicate.name) : true);
            }
            select = select && ((object) ?
                (triple.object.type == object.type) &&
                    (triple.object.value == object.value) : true);
            return select;
        });
    }
}

//Kickstart.register(DataManager.init);


new function () {
	Signavio.Utils.escapeHTML = function(str){
		str = str || "";
		var d = document.createElement("div");
		try {
			d.innerHTML = str;
		} catch (e){
			if (!!str.match(/&[aAoOuU]uml;/g)||!!str.match(/&szlig;/g)){
				/*$H({
					"?" : "&auml;",
					"?" : "&Auml;",
					"?" : "&ouml;",
					"?" : "&Ouml;",
					"ü" : "&uuml;",
					"ü" : "&Uuml;",
					"?" : "&szlig;"
				}).each(function(map){
					str = str.gsub(map.value, map.key)
				})*/
				
				var tmp={
					"&auml;" : "?",
					"&Auml;" : "?",
					"&ouml;" : "?",
					"&Ouml;" : "?",
					"&uuml;" : "ü",
					"&Uuml;" : "ü",
					"&szlig;": "?"
				}
				for(var k in tmp){
					str = str.repalce(new RegExp(k,"g"),tmp[k]);
				}
			}
			try {
				d.innerHTML = str;
			} catch (ee) {
			   d.textContent = str;
			}
		}
		return d.innerHTML;
	}


    var mask;
    Signavio.Plugins.Utils.getFFVersion = function () {
        try {
            return Number(window.navigator.userAgent.match("Firefox.([0-9]+[\.][0-9]+)")[1]) || 0;
        } catch (e) {
            return 0;
        }
    }


    /**
     * Shows an overlay of signavio
     */
    Signavio.Helper.ShowMask = function (force, parent) {

        if (!force && ORYX.CONFIG.PREVENT_LOADINGMASK_AT_READY === true) {
            return;
        }

        if (mask) {
            return;
        }

        var s = "background:white;bottom:0;height:100%;left:0;position:absolute;right:0;top:0;width:100%;z-index:100000;"
        var ss = "left:50%;margin-left:-200px;margin-top:-90px;position:absolute;top:50%;display:none;width:391px;"
        var sversion = "color:#ad0f5b;padding-right:10px;font-family:tahoma,arial,san-serif;font-size:12px;";
        var stext = "display:block;position:relative;text-align:right;top:0;width:100%;";
        var stitle = "color:#ad0f5b;font-weight:bold;padding-right:10px;font-family:tahoma,arial,san-serif;font-size:12px;"
        var sloading = "height:16px;width:16px;margin-bottom:-4px;background: transparent url(../libs/ext-2.0.2/resources/images/default/tree/loading.gif) no-repeat center;"
        var simg = "padding-bottom:10px;border-bottom:1px solid #ad0f5b;";
/*
        // Define the parent
        parent = (parent ? Ext.get(parent) : null) || Ext.getBody();

        if (parent !== Ext.getBody()) {
            parent.setStyle("position", "relative")
        }

        mask = Ext.get(document.createElement("div"));
        parent.appendChild(mask);
        mask.dom.setAttribute("style", s);
        mask.dom.innerHTML = "<div class='mask-logo' style='" + ss + "'>" +
            "<div>" +
            "<img style='" + simg + "' src='" + ORYX.CONFIG.EXPLORER_PATH + "/src/img/signavio/smoky/logo.png' />" +
            "</div>" +
            "<span class='mask-text' style='" + stext + "'>" +
            "<span class='mask-title' style='" + stitle + "'>Editor</span>" +
            "<span class='mask-version' style='" + sversion + "'>Version " + Signavio.Core.Version + "</span>" +
            "<img style='" + sloading + "' src='" + (ORYX.CONFIG.BLANK_IMAGE || Ext.BLANK_IMAGE_URL) + "'/>" +
            "</span>" +
            "</div>";
		
        mask.first().show({duration:0.3});*/
    }
    // When body is loaded, show overlay
    //Ext.onReady(Signavio.Helper.ShowMask);

    /**
     * Hides the overlay
     */
    Signavio.Helper.HideMask = function () {
        window.setTimeout(function () {
            if (mask) {
                mask.first().hide({duration:0.4, remove:true, block:true});
                mask.hide({duration:0.3, remove:true, block:true});
                delete mask;
            }
        }.bind(this), 2000)
    }

    Signavio.Plugins.Loading = {

        facade:undefined,
        construct:function (facade) {

            this.facade = facade;
            this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, Signavio.Helper.HideMask);
            /**
             * Overwrite the toJSON method in the Canvas
             * to set the correct stencilset namespace.
             *
             */
            /*(var me = this;
             new function(){
             // Copy prototype method
             var toJSON = ORYX.Core.Canvas.prototype.toJSON;
             ORYX.Core.Canvas.prototype.toJSON = function(){
             // Call super
             var json = toJSON.call(this);
             // Check for replace stencil set namespace
             json.stencilset.namespace = me.facade.getModelMetaData().model.stencilset.namespace;

             return json;
             }
             }()*/
        }
    }

    Signavio.Plugins.Loading = Clazz.extend(Signavio.Plugins.Loading);
    /**
     * Provides an uniq id
     * @overwrite
     * @return {String}
     *
     */
    ORYX.Editor.provideId = function () {
        var res = [], hex = '0123456789ABCDEF';

        for (var i = 0; i < 36; i++) res[i] = Math.floor(Math.random() * 0x10);

        res[14] = 4;
        res[19] = (res[19] & 0x3) | 0x8;

        for (var i = 0; i < 36; i++) res[i] = hex[res[i]];

        res[8] = res[13] = res[18] = res[23] = '-';

        return "sid-" + res.join('');
    };


}();
