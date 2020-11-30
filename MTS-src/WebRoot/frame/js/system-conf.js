(function(window) {
	var sysName = "kjdp",
	
	/**
	 * 系统配置
	 *	name: {
	 * 		confName: {
	 *			service: "接口名称",	
	 *			data: "配置数据",
	 *			defaultParam: "默认参数",
	 *			filter: function(data) {
	 * 				//数据过滤器，没有return则使用未处理的data
	 *			}
	 *		}
	 *	}
	 */
	sysConf = {
		kbss: {
			platName: "个股期权",
			
			showPlat: false,

			handleMenu: false,
			
			welcome: function() {
				return {
					title: "首页",
					url: "../../kui-base/doc/index.html"
				}
			},
			
			helpUrl: "../../kui-base/doc/index.html",
			
			menuConf: {
				service: "G0060503",
				defaultParam: {
					"USER_ROLE" : "2",
					"RIGHT_TYPE" : "0"
				},
				filter: function(data) {
					$k.portal.data("kbssMenuData", data[0]);
					var arr = [];
					for(var i = 0 ; i < data[0].length;i++){
						if(data[0][i]["MENU_POS"].indexOf("@")<0){
							data[0][i]["MENU_ID"]=data[0][i]["MENU_CODE"];
							data[0][i]["MENU_LVL"]=data[0][i]["MENU_POS"];
							data[0][i]["MENU_LINK"]="../../"+data[0][i]["MENU_URL"];
							data[0][i]["MENU_PLAT"]="kbss";
							arr[arr.length]=data[0][i];
						}
					}
					data[0]=arr;
					return data;
				}				
			},
			
			treeConf:{
				animate: true,
				animateSpeed: 50,
				conf: {
					nodeId:'MENU_ID',
					nodeName:'MENU_NAME',
					treeType:'3',
					lvlLength:'1',
					lvlNode:'MENU_LVL'
				}
			}
		},

        kjdp: {
			showCustomPlat: false/*,   //by   2016/04/22
            //工具箱内组件待办提示配置
            toolboxQueryConf: {
                service: "U*******",  //改成你的接口，数据格式参考data配置

                //这里的data是测试数据，配置了service属性后请务必删除data配置
                //COMP_ID是快捷方式对应组件的编号
                //COUNT是需要显示的数量
                data: [[{
                    COMP_ID: "12",
                    COUNT: "12"
                }, {
                    COMP_ID: "87",
                    COUNT: "999"
                }]],

                filter: function(data) {
                    //如果接口不符合规范，在这里整理成符合规范的格式再返回
                    //return data;
                }
            }
            */
        }
	};	
	
	window.sysName = sysName;
	window.sysConf = sysConf[sysName];
})(window);