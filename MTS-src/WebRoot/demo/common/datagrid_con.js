config:[
    {
    	render:' datagrid ',
    	id:'',
        queryParams:{
          khbh:' 1101',khxm:' 杜甫'
        },
        frozenColumns:undefined,
        toolbar:[
          {
			     text:'新增',
			     iconCls:'icon-add',
			     handler:function(e){alert(123);}
			    },
			    {
			     text:'修改',
			     iconCls:'icon-edit',
			     handler:function(e){alert(123);}
			    }
        ],
        columns:[
          [
            {
              field:'khbh',
              title:' khbh',
              width:'120',
              sortable:true,
              hidden:false,
              checkbox:false,
              formatter:function(){
                alert(123);
              },
              editor:{
                type:'combobox',
                options:{
                  valueField:'productid',
                  textField:'productname',
                  req:[],
                  required:true
                }
              }
            },
            {
              field:'khbh',
              title:' khbh',
              width:'120',
              sortable:true,
              hidden:false,
              checkbox:false,
              formatter:function(){
                alert(123);
              }
            }
          ]
        ],
        //查询定义
        queryCols:[
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