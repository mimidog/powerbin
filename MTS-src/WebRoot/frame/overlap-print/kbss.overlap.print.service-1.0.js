/**
 * 票据套打类
 * 
 * <p>
 *    版本信息
 *    20120629  created   by   zhangxs
 *    
 * </p>
 */

;(function(){
		/**
		 * initial document prototype
		 */
		if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement){
	    	HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
	    	{
	    		switch (where){
	    			case 'beforeBegin':
	    				this.parentNode.insertBefore(parsedNode,this);
	    				break;
	    			case 'afterBegin':
	    				this.insertBefore(parsedNode,this.firstChild);
	    				break;
	    			case 'beforeEnd':				
	    				this.appendChild(parsedNode);
	    				break;
	    			case 'afterEnd':
	    				if (this.nextSibling) 
	    					this.parentNode.insertBefore(parsedNode,this.nextSibling);
	    				else this.parentNode.appendChild(parsedNode);
	    				break;
	    		}
	    	};
	
	    	HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr)
	    	{
	    		var r = this.ownerDocument.createRange();
	    		r.setStartBefore(this);
	    		var parsedHTML = r.createContextualFragment(htmlStr);
	    		this.insertAdjacentElement(where,parsedHTML);
	    	};
	
	
	    	HTMLElement.prototype.insertAdjacentText = function(where,txtStr)
	    	{
	    		var parsedText = document.createTextNode(txtStr);
	    		this.insertAdjacentElement(where,parsedText);
	    	};
	    }
	var current_input;
	var g_cnt = 0;
	$.printInit = function(tile,data){
		
		var overlapPrint = {
			g_added_row:{},//存储当前行数据
			g_grid_id :"print_register",//套打工具栏
			g_print_data: data||[],
			g_print_config: tile || "OPEN_ACCOUNT",
			g_init_tool:false,
			ticketWidth:0,
			ticketHeight:0,
			setData:function(tile,data){
				var obj = this,
					config = "",
					tile = tile || g_print_config,
					data = data || g_print_data,
                    company = data.G_COMPANY.toLowerCase(),
                    filepath = "print-config/print-config-"+company+".xml";
				$.ajax({
					url:filepath,
					type:"GET",
					async:false,
					success: function(xml){
						var printInfo = $('config > print[id="'+tile+'"]',xml);
						var ticket = printInfo.attr("ticket");
						obj.ticketWidth = printInfo.attr("width");
						obj.ticketHeight = printInfo.attr("height");
						obj.setTicket("print-ticket/"+ticket);
						var prindData = {};
						var columns = new Array();
						$(printInfo).find("field").each(function(){
							var column = {};
							var id = $(this).attr("id");
							var value = data && data[id] ? data[id] : $(this).attr("value");
							var label = $(this).attr("label");
							var label_print = $(this).attr("label-print");
							if(label_print && label_print=="1"){
								value = label+"："+value;
							}
							var location = $(this).attr("location");
							var fontSize = $(this).attr("font-size");
							var fontColor = $(this).attr("font-color");
							column["PARAM_ID"] = id;
							column["PARAM_LABEL"] = label;
							column["PARAM_VALUE"] = value;
							column["LOCATION"] = location;
							column["FONT_SIZE"] = fontSize && fontSize != "" ? fontSize : "12px";
							column["FONT_COLOR"] = fontColor && fontColor !="" ? fontColor : "#000000";
							overlapPrint._addContentToTicket(column);
							overlapPrint.g_added_row[id] = column;
							columns.push(column);
						});
						//overlapPrint._createDataStyle(columns);
						if(overlapPrint.g_init_tool){
							var gridData = [
										 {"service":{"flag":"0","serialNo":""},
										  "message":[{"flag":"0","prompt":"dfa","rows":"10","times":"100ms"}],
										  "data":[columns]}
										]
							setTimeout(function(){
								$("#print_register").datagrid("loadData",gridData)
							},2000);
						}
					}
				});
			},
			
			_createDataStyle:function(columns){
				var style = ["<style media=\"print\">"];
				style.push(".noprint{ display: none;}");
				for(var i=0;i<columns.length;i++){
					var cls = "."+columns[i].PARAM_ID + "-STYLE";
					var location = eval("("+columns[i].LOCATION+")");
					var top = location.y+"";
					var left = location.x+"";
					top = top.indexOf("px")==-1 ? top+"px" : top;
					left = left.indexOf("px")==-1 ? left+"px" : left;
					var color = columns[i].FONT_COLOR;
					var fontSize =columns[i].FONT_SIZE;
					var width = this._getTextOffsetWidth(columns[i].PARAM_VALUE,columns[i].FONT_SIZE);
					style.push(cls + " { " + "position:absolute;top:"+top+";left:"+left+";font-size:"+fontSize+";color:"+color+";width:"+width+";}");
				}
				style.push("</style>");
				$("head").prepend(style.join("\n"))
				
			},
			
			setTicket:function(imgUrl){
				var img = new Image();
				img.src = imgUrl;
				img.id = "print_tile";
				img.border = 0;
				//设置图片长宽，默认A4大小 794*1123
//				img.width = this.ticketWidth;
//				img.height = this.ticketHeight;
                img.style.width = this.ticketWidth+"cm";
				img.style.height = this.ticketHeight+"cm";
				img.style.display = "block";
				var printContent;
				if($("#print_area").find("#print_content").length>0){
					$("#print_area").find("#print_content").remove();
				}
				printContent = document.createElement("div");
				printContent.id = "print_content";
				document.getElementById("print_area").insertAdjacentElement("beforeEnd", printContent);
				var imgWrap = document.createElement("div");
				imgWrap.className = "noprint";
				imgWrap.insertAdjacentElement("beforeEnd",img);
				printContent.insertAdjacentElement("beforeEnd",imgWrap);
				//var tile = document.getElementById("print_tile");
				printContent.style.width = this.ticketWidth+"cm";
				//printContent.style.width = "100%";
				printContent.style.height = this.ticketHeight+"cm";
				//this.bindTicketEditEvent();
				//$("#print_content").append($(img));
				//$("#print_tile").attr({src:imgUrl,width:img.width,height:img.height});
			},
			
			bindTicketEditEvent:function(){
				var overlap = this;
				$("#print_content").click(function(event) {
	    			var point = overlap.getContentPosition(event);
	    			var input = document.createElement("input");
	    			input.type="text";
	    			input.id="content-"+g_cnt;
	    			g_cnt++;
	    			input.size=1;
	    			input.onkeyup = overlap._onContentChange;
	        		$(input).css({"position":"absolute","top":point.y-8,"left":point.x,"font-size":"12px","min-length":"1"});
	        		makeDraggable(input);
	        		document.getElementById("print_content").insertAdjacentElement("beforeEnd",input);
	        		$(input).focus();
	        		current_input = $(input);
	        		
	        		var curRow = {"PARAM_ID":input.id,"PARAM_VALUE":"","LOCATION":"{x:"+(point.x)+",y:"+(point.y-8)+"}"};
	        		overlap.g_added_row[input.id] = curRow;
	        		overlap.grid.grid.addRow(curRow);
	        		
	        		$(input).click(function(event){
	            		$(this).focus();
	            		current_input = $(this);
	            		overlap._stopBubble(event);
	            	});
	    		});
			},
			
			getContentPosition:function(ev){
				ev = ev || window.event;
				var point = {
					x : 0,
					y : 0
				};
				if(ev.offsetX || ev.offsetY){
					point.x = ev.offsetX + document.body.scrollLeft- document.body.clientLeft;
					point.y = ev.offsetY + document.documentElement.scrollTop;
				}else{
					point.x = ev.layerX;
					point.y = ev.layerY;
				}
				return point;
			},
			
			updateGridData:function(id,content,location){
				if(!overlapPrint.g_init_tool) return;
				var gridRow = overlapPrint.g_added_row[id];
				var index = $("#print_register").datagrid("getRowIndex",gridRow);
				if(content)
					overlapPrint.g_added_row[id].PARAM_VALUE = content;
				if(location)
					overlapPrint.g_added_row[id].LOCATION = location;
				$("#print_register").datagrid("updateRow",index,gridRow);
			},
			
			updateTicketData:function(id,fields){
				var node = $("#"+id)[0].nodeName;
				for(key in fields){
					if(key == "PARAM_VALUE"){
						if(node=="SPAN"){
							$("#"+id).css("width",this._getTextOffsetWidth(fields[key]));
							$("#"+id).text(fields[key]);
						}else{
							$("#"+id).css("width",this._getTextOffsetWidth(fields[key]));
							$("#"+id).attr("value",fields[key]);
						}
					}
					else if(key == "LOCATION"){
						var location = eval("("+fields[key]+")");
						$("#"+id).css({"top":location.y+"px","left":location.x+"px"});
					}
				}
			},
			
			changeInputToSpan:function(){
				var column;
				$("#print_content input").each(function(){
					var id = $(this).attr("id");
					var value = $(this).val();
					var top = $(this).css("top");
					var left = $(this).css("left");
					column = {"PARAM_ID":id,"PARAM_VALUE":value,"LOCATION":"{'x':'"+left+"','y':'"+top+"'}"};
					$(this).remove();
					overlapPrint._addContentToTicket(column);
				});
			},
			
			_onContentChange:function(){
				var content = current_input.val();
				var tamp = document.getElementById("text_tamp");
				tamp.innerHTML = content;
				current_input.css("width",tamp.offsetWidth);
				overlapPrint.updateGridData(current_input.attr("id"),content);
			},
			
			_stopBubble:function(e){
				if (e && e.stopPropagation)
					e.stopPropagation();
				else
					window.event.cancelBubble = true;
			},
			
			_addContentToTicket:function(column){
				var location = eval("("+column.LOCATION+")");
				var dataSpan=document.createElement("span");
				
				dataSpan.id = column.PARAM_ID;
				dataSpan.name="printData";
				dataSpan.className="data";
				
				//默认位置
				var top = location.y+"";
				var left = location.x+"";
				dataSpan.style.position = "absolute";
				dataSpan.style.top=top.indexOf("px")==-1 ? top+"px" : top;
				dataSpan.style.left=left.indexOf("px")==-1 ? left+"px" : left;
				dataSpan.style.color = column.FONT_COLOR;
				dataSpan.style.fontSize = column.FONT_SIZE;
				//span长度计算,解决窗口缩放时文字换行的问题
				var pageWidth = $('#print_content').width();
				var tempWidth = this._getTextOffsetWidth(column.PARAM_VALUE,column.FONT_SIZE);
				tempWidth = parseInt(tempWidth, 10);
				left = parseInt(left);
				if(tempWidth+left + 100 >= pageWidth) {
					tempWidth = pageWidth-left-100; // TODO: 通过配置无法确定其右侧是否有元素，仅能保证这个字段不出纸，不能保证不覆盖右侧内容
					dataSpan.style["white-space"] = 'normal';
				}
				dataSpan.style.width = tempWidth+'px';
				
				//IE支持innerText，FireFox和NetScape支持textContent不支持innerText
				if(navigator.appName.indexOf("Explorer") > -1){
					dataSpan.innerText=column.PARAM_VALUE;
				} else{
					dataSpan.textContent=column.PARAM_VALUE;
				}
				//使文字能够拖动
				makeDraggable(dataSpan);
				//证件画板
				var certPanelDiv=document.getElementById("print_content");
				if(certPanelDiv)
					certPanelDiv.insertAdjacentElement("beforeEnd",dataSpan);
				
				$(".data").click(function(event){
            		overlapPrint._stopBubble(event);
            	});
			},
			
			_getTextOffsetWidth:function(text,size){
				var tamp = document.getElementById("text_tamp");
				tamp.style.fontSize = size;
				tamp.innerHTML = text;
				return (tamp.offsetWidth+14) <90 ?(90+"px"): ((tamp.offsetWidth+14)+"px");
			},
			
			_addPrintButton:function(){
				var print = "<span class=\"overlap_print_button\" style=\"float:right\"><a href=\"javascript:void(0);\" class=\"gt-image-button\" title=\"打印\"><div class=\"gt-overlap-print\"></div></a></span>";
				$("#print_button").append($(print));
				$(".overlap_print_button").click(function(){
					window.print();
				});
			},
			
			initContentGrid:function() {
				// initial grid
				if(!overlapPrint.g_grid_id) return;
				var $toolbar =$("#print_toolbar").append($("<table id=\""+overlapPrint.g_grid_id+"\" class=\"kui-datagrid\"></table>"));
				/*if(overlapPrint.g_print_data && !$.isEmptyObject(overlapPrint.g_print_data)){
					$.parser.onComplete = function(){
						overlapPrint.setData();
					}
				}*/
				$.parser.director($toolbar);
				this._addPrintButton();
			}
		};
		if(overlapPrint.g_init_tool)
			overlapPrint.initContentGrid();
		$("#print_param").css("float","");
		return overlapPrint;
	};
	
	/**
	 * 对用户自定义按钮绑定套打事件的外部方法
	 * @param: params --- 数据对象
	 * 		   type   --- 数据类型，0代表具体打印的列数据，1代表FormService的数组
	 */
	$.fn.bindOverlapPrintEvent = function(params,type){
		
	};
	
	/**
	 * 调用套打控件的外部方法，与 bindOverlapPrintEvent 并列
	 * @param: columns 数据类型0
	 */
	$.callOverlapPrint = function(tile,data){
		return $.printInit(tile,data);
	};
	
	$.setOverlapData = function(tile,data){
		var overlap;
		var printWindow = $("#overlap_print_frame")[0].contentWindow;
		var docloaded = printWindow.docloaded;
		if (!docloaded) {
			if($("#overlap_print_frame")[0].attachEvent){
				$("#overlap_print_frame")[0].attachEvent("onload", function(){
					overlap = printWindow.overlapPrint;
					overlap.setData(tile,data);
				});
			}else {
				$("#overlap_print_frame")[0].onload = function (){
					overlap = printWindow.overlapPrint;
					overlap.setData(tile,data);
				};
			}
		} else {
			overlap = printWindow.overlapPrint;
			overlap.setData(tile,data);
		}
		return overlap;
	};
	
	/**
	 * 创建套打控件的容器（iframe）
	 * @param: columns 数据类型0
	 */
	$.initOverlapPrintContainer = function(target){
		//var winLeft = ($(target).width()-$(target).width()*0.97) / 2;
		var height = $(target).height()-75;
		var container = "<iframe id=\"overlap_print_frame\" frameborder=\"0\" scrolling=\"no\" src=\"../../frame/overlap-print/OverlapPrint.html\" style=\"width:100%; height:1123px;border: 1px dotted #CCC; overflow:hidden;\"></iframe>";
		$(target).append($(container));
	};
})(jQuery);