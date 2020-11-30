/*******************************************************************************
 * Signavio Core Components
 * Copyright (C) 2012  Signavio GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/

function printf(){
  var result = arguments[0];
  for(var i = 1; i < arguments.length; i++)
    result = result.replace('%' + (i - 1),arguments[i]);
  return result;
}
// oryx constants.
var ORYX_LOGLEVEL_TRACE = 5;
var ORYX_LOGLEVEL_DEBUG = 4;
var ORYX_LOGLEVEL_INFO = 3;
var ORYX_LOGLEVEL_WARN = 2;
var ORYX_LOGLEVEL_ERROR = 1;
var ORYX_LOGLEVEL_FATAL = 0;
var ORYX_LOGLEVEL = 0;
var ORYX_CONFIGURATION_DELAY = 100;
var ORYX_CONFIGURATION_WAIT_ATTEMPTS = 10;
if(!ORYX) var ORYX = {};
ORYX = $.extend({},ORYX,{

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
      { append:function(message){
        //				console.log(message);
      }}
    ],
    trace:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_TRACE)
        ORYX.Log.__log('TRACE',arguments);
    },
    debug:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_DEBUG)
        ORYX.Log.__log('DEBUG',arguments);
    },
    info:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_INFO)
        ORYX.Log.__log('INFO',arguments);
    },
    warn:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_WARN)
        ORYX.Log.__log('WARN',arguments);
    },
    error:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_ERROR)
        ORYX.Log.__log('ERROR',arguments);
    },
    fatal:function(){
      if(ORYX_LOGLEVEL >= ORYX_LOGLEVEL_FATAL)
        ORYX.Log.__log('FATAL',arguments);
    },
    __log:function(prefix,messageParts){
      messageParts[0] = (new Date()).getTime() + " " + prefix + " " + messageParts[0];
      var message = printf.apply(null,messageParts);
      $.each(ORYX.Log.__appenders,function(i,appender){
        appender.append(message);
      });
    },
    addAppender:function(appender){
      ORYX.Log.__appenders.push(appender);
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
  load:function(){
    //ORYX.CONFIG.PREVENT_LOADINGMASK_AT_READY=false
    //ORYX.I18N.Oryx.title = Oryx或Signavio 。在国际化文件中定义
    //ORYX.I18N.Oryx.pleaseWait = Please wait while loading...  。在国际化文件中定义
    if(ORYX.CONFIG.PREVENT_LOADINGMASK_AT_READY !== true){
      //var waitingpanel = new Ext.Window({renderTo:Ext.getBody(),id:'oryx-loading-panel',bodyStyle:'padding: 8px;background:white',title:ORYX.I18N.Oryx.title,width:'auto',height:'auto',modal:true,resizable:false,closable:false,html:'<span style="font-size:11px;">' + ORYX.I18N.Oryx.pleaseWait + '</span>'})
      //waitingpanel.show();
    }
    ORYX.Log.debug("Oryx begins loading procedure.");
    // check for prototype
    //    if( (typeof Prototype=='undefined') || (typeof Element == 'undefined') || (typeof Element.Methods=='undefined') || parseFloat(Prototype.Version.split(".")[0] + "." + Prototype.Version.split(".")[1]) < 1.5)
    //      throw("Application requires the Prototype JavaScript framework >= 1.5.3");
    ORYX.Log.debug("Prototype > 1.5 found.");
    // continue loading.
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
  _load:function(){
    ORYX.loadPlugins();
  },
  /**
   * Third bootstrapping layer. This is where first the plugin coniguration
   * file is loaded into oryx, analyzed, and where all plugins are being
   * requested by the server. Afterwards, all editor instances will be
   * initialized.
   */
  loadPlugins:function(){
    // load plugins if enabled.
    //ORYX.CONFIG.PLUGINS_ENABLED=true
    if(ORYX.CONFIG.PLUGINS_ENABLED)
      ORYX._loadPlugins();else
      ORYX.Log.warn("Ignoring plugins, loading Core only.");
    // init the editor instances.调用27main.js的init方法
    init();
  },
  _loadPlugins:function(){
    // load plugin configuration file
    // ORYX.CONFIG.PLUGINS_CONFIG ="../service/editor/plugins".
    var source = ORYX.CONFIG.PLUGINS_CONFIG;
    ORYX.Log.debug("Loading plugin configuration from '%0'.",source);
    $.ajax({
      async:false,
      url:source,
      success:function(result){
        var resultXml = result;
        var globalProperties = [];
        var preferences = resultXml.getElementsByTagName("properties");
        $.each($A(preferences),function(i,p){
          var props = $A(p.childNodes);
          $.each(props,function(j,prop){
            var property = {};
            var attributes = $A(prop.attributes);
            $.each(attributes,function(k,attr){
              property[attr.nodeName] = attr.nodeValue
            });
          });
        });
        var plugin = resultXml.getElementsByTagName("plugin");
        $.each($A(plugin),function(i,node){
          var pluginData = {};
          $.each($A(node.attributes),function(j,attr){
            pluginData[attr.nodeName] = attr.nodeValue
          });
          if(!pluginData['name']){
            ORYX.Log.error("A plugin is not providing a name. Ingnoring this plugin.");
            return;
          }
          // ensure there's a source attribute.
          if(!pluginData['source']){
            ORYX.Log.error("Plugin with name '%0' doesn't provide a source attribute.",pluginData['name']);
            return;
          }
          // Get all private Properties
          var propertyNodes = node.getElementsByTagName("property");
          var properties = [];
          $.each($A(propertyNodes),function(i,prop){
            var property = {};
            // Get all Attributes from the Node
            var attributes = $A(prop.attributes)
            $.each(attributes,function(j,attr){
              property[attr.nodeName] = attr.nodeValue
            });
            if(attributes.length > 0){
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
          $.each($A(requireNodes),function(k,req){
            var namespace = false;
            for(var m=0;m<$A(req.attributes).length;m++){
              if($A(req.attributes)[m] == req){
                namespace =  req.name == "namespace";
                break;
              }
            }
//            var namespace = $A(req.attributes).find(function(attr){
//              return attr.name == "namespace"
//            })
            if(namespace && namespace.nodeValue){
              if(!requires){
                requires = {namespaces:[]}
              }
              requires.namespaces.push(namespace.nodeValue)
            }
          });
          // Set Requires to the Plugin-Data, if there is one
          if(requires){
            pluginData['requires'] = requires;
          }
          // Get the RequieredNodes
          var notUsesInNodes = node.getElementsByTagName("notUsesIn");
          var notUsesIn;
          $.each($A(notUsesInNodes),function(l,not){
            var namespace = false;
            for(var m=0;m<$A(not.attributes).length;m++){
              if($A(not.attributes)[m] == not){
                namespace =  not.name == "namespace";
              }
            }
//            var namespace = $A(not.attributes).find(function(attr){
//              return attr.name == "namespace"
//            });
            if(namespace && namespace.nodeValue){
              if(!notUsesIn){
                notUsesIn = {namespaces:[]}
              }
              notUsesIn.namespaces.push(namespace.nodeValue)
            }
          });
          // Set Requires to the Plugin-Data, if there is one
          if(notUsesIn){
            pluginData['notUsesIn'] = notUsesIn;
          }
          //ORYX.PATH = ../editor/
          //ORYX.CONFIG.PLUGINS_FOLDER = Plugins/
          var url = ORYX.PATH + ORYX.CONFIG.PLUGINS_FOLDER + pluginData['source'];
          ORYX.Log.debug("Requireing '%0'",url);
          // Add the Script-Tag to the Site
          //Kickstart.require(url);
          ORYX.Log.info("Plugin '%0' successfully loaded.",pluginData['name']);
          // Add the Plugin-Data to all available Plugins
          //          console.log(pluginData);
          ORYX.availablePlugins.push(pluginData);
        });
      },
      error:this._loadPluginsOnFails
    });
  },
  _loadPluginsOnFails:function(result){
    ORYX.Log.error("Plugin configuration file not available.");
  }
});
//ORYX = Object.extend(ORYX, );
ORYX.Log.debug('Registering Oryx with Kickstart');
Kickstart.register(ORYX.load);