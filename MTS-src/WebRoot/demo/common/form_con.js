config:[
    {
     id:"formId",
     title:"表单名",//新加的属性
     //组件类型必须
     render:'form',
     toolbar:[
          {
			     text:'确定',
			     iconCls:'icon-ok',
			     //表单提交service配置
           req:{
              service:'modifyCustomerInfo',
              param1:'aaa',
              param2:'bbb'
           },
           //请求前触发事件
           handler:function(){},
           //按钮回调函数
			     callback:function(data){}
			    },
			    {
			     text:'重置',
			     iconCls:'icon-reset',
            req:{
              service:'modifyCustomerInfo',
              param1:'aaa',
              param2:'bbb'
            },
           //请求前触发事件
           handler:function(){},
           //按钮回调函数
			     callback:function(data){}
			    }
        ],
        //用几列渲染
        colNumbers:2,
        columns:[
          {
          	text:'分组1',
          	//分组是否展开
          	expand:true,
	          cols:[
	            {
	              field:'khxb',
	              title:'客户性别:',
	              width:'120',
	              rowspan:1,
	              colspan:1,
	              editor:{
	                type:'combobox',
	                options:{
	                  valueField:'sex',
	                  textField:'sex_text',
	                  req:[],
	                  required:true
	                }
	              }
	            },
	            {
	              field:'email',
	              title:' 电子邮箱',
	              width:'120',
	              rowspan:1,
	              colspan:1,
	              editor:{
	                type:'validatebox',
	                options:{
	                  required: true,
	                  validType: 'email',
	                  disabled:false,
	                  showMessage: true,
	                  missingMessage: "必须输入！",
	                  invalidMessage: "格式必须email格式!"
	                }
	              }
	            }
	          	]
          },
          {
          	text:'分组2',
          	//分组是否展开
          	expand:true,
	          cols:[
				            {
				              field:'khxb',
				              title:'客户性别:',
				              width:'120',
				              rowspan:1,
				              colspan:1,
				              editor:{
				                type:'combobox',
				                options:{
				                  valueField:'sex',
				                  textField:'sex_text',
				                  req:[],
				                  required:true
				                }
				              }
				            },
				            {
				              field:'email',
				              title:' 电子邮箱',
				              width:'120',
				              rowspan:1,
				              colspan:1,
				              editor:{
				                type:'validatebox',
				                options:{
				                  required: true,
				                  validType: 'email',
				                  disabled:false,
				                  showMessage: true,
				                  missingMessage: "必须输入！",
				                  invalidMessage: "格式必须email格式!"
				                }
				              }
				            }
	          			]
          }
        ]
    }
  ]