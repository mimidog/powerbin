/**
 * export - KINGDOM-UI
 * 
 * Copyright (c) 2009-2013 www.szkingdom.com. All rights reserved.
 * 
 * Dependencies:
 * 
 */

(function($) {

	$.fn.report = function(options, param) {
		if (typeof options == 'string') {
			return $.fn.report.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
			if (!$.data(this, 'report')) {
				$.data(this, 'report', {
					options : $.extend({}, $.fn.report.defaults)
				});
			}

			var opts = $.data(this, 'report').options;
			$.extend(opts, options);
			if (opts.noSet) {
				submit(this);
			} else {
				init(this);
			}
		});
	};

	$.fn.report.parseOptions = function(target) {
		return $.extend({}, $.parser.parseOptions(target, [ {
			colNumbers : 'number'
		} ]));
	};

	$.fn.report.methods = {
		options : function(jq) {
			return $.data(jq[0], 'report').options;
		},
		submit : function(jq) {
			submit(jq[0]);
		}
	};

	$.fn.report.defaults = {
		action : '../../kjdp_export' || '../../kjdp_ajax?returnType=json',
		tableView : {
			'otctsTrade_ListIntentInfo' : 'col'
		},
		reqStr : {
			req : [ {
				service : 'exportTest',
				F_FUNCTION : '0'
			} ]
		},
		gridColumns : [], // 从grid传过来的columns
		columns : [], // 传输到服务端的columns
		pageInfo : {
			pageSize : 20,
			pageNum : 1,
			totalRowNum : 791,
			totalPageNum : 40,
			startRowNum : 1,
			endRowNum : 20
		},
		general : {
			range : 'current'
		},
		page : {
			PageSize : 'A4',
			direction : 'vertical',
			width : 0,
			height : 0,
			align : 'left',
			leftMargin : 1.27,
			rightMargin : 1.27,
			topMargin : 0.5,
			bottomMargin : 1.27
		},
		fonts : {
			header : {
				printable : true,
				font : '宋体',
				size : 8,
				bold : true,
				italic : false
			},
			footer : {
				printable : true,
				font : '宋体 ',
				size : 8,
				bold : true,
				italic : false
			},
			title : {
				printable : true,
				font : '宋体',
				size : 12,
				bold : true,
				italic : false
			},
			subtitle : {
				printable : true,
				font : '宋体',
				size : 8,
				bold : false,
				italic : false
			},
			datatitle : {
				printable : true,
				font : '宋体',
				size : 8,
				bold : false,
				italic : false
			},
			data : {
				printable : true,
				font : '宋体',
				size : 8,
				bold : false,
				italic : false
			}
		},
		searchParam : {
			'交易市场' : 'OTC'
		},
		userName : '',
		orgName : '',
		Datas : '',
		exportType : 'pdf',
		isPrint : false,
		implType : '',
		title : '导出',
		fileName : '导出',
		langCode : 'zh_CN',
		titles : {
			xls : 'Excel导出配置',
			pdf : 'PDF导出配置',
			dbf : 'DBF导出配置',
			csv : 'CSV导出配置',
			txt : 'TXT导出配置',
			xml : 'XML导出配置',
			print : '打印设置'
		},
		stardardPapers : [ 'A1', 'A2', 'A3', 'A4', 'A5' ]
	};

	function init(target) {
		exportGrid(target);
	}

	function submit(target) {
		var opts = $.data(target, 'report').options,
			stsFields=[],stsKeys=["max","min","avg","sum"],formatCol=[];
			
		$.each(opts.gridColumns,function(index,item){
			//带统计的字段是否选中导出了
			if($.inArray(opts.columns,item.field)){
				var col = {},tmp;
				for(var i=0,len=stsKeys.length;i<len;i++){
					var key = item[stsKeys[i]];
					if(key){
						tmp = true;
						col[stsKeys[i]]=true;
					}
				}
				if(tmp){
					col.name=item.field;
					stsFields.push(col);
				}
				
				//服务端需要格式化的字段
				if(item.remoteFormat){
					var fieldObj = {};
					fieldObj[item.field] = item.remoteFormat;
					formatCol.push(fieldObj);
				}
			}
		});
		opts.stsColumns = stsFields;   //需统计的字段
		
		var data = {
			tableView : opts.tableView,
			reqStr : opts.reqStr,
			columns : opts.columns,
			configInfo : {
				pageInfo : opts.pageInfo,
				reportConfig : {
					range : opts.range,
					page : opts.page,
					fonts : opts.fonts
				},
				searchParam : opts.searchParam,
				userName : opts.userName,
				orgName : opts.orgName
			},
			Datas : opts.Datas,
			exportType : opts.exportType,
			isPrint : opts.isPrint,
			implType : opts.implType,
			title : opts.title,
			fileName : opts.fileName,
			langCode : opts.langCode,
			formatCol:formatCol
		};
		//选中导出统计时带统计的行参数
		if(opts.isExportSts){
			data.stsColumns = opts.stsColumns;
		}
		if (opts.isPrint) {
			data.footerInfo = opts.footerInfo;
			data.companyName = opts.companyName;
			data.confirmInfo = opts.confirmInfo;
		}
		
		var dataStr = "<?xml version='1.0' encoding='UTF-8'?><requests>" + JSON.stringify(data) + "</requests>";
		var encryptStr = encrypt(dataStr);

		var JSESSIONID;
		if (window && window.g_user && window.g_user.JSESSIONID) {
			JSESSIONID = window.g_user.JSESSIONID;
		}
		if (!JSESSIONID && !opts.isPrint) {
			var $iframe = $('<iframe id="hideExportFrame" name="hideExportFrame" src="" style="display: none;"></iframe>');
			var $form = $('<form>');
			$form.attr('style', 'display:none');
			$form.attr('method', 'POST');
			$form.attr('target', 'hideExportFrame');
			$form.attr('action', opts.action);
			$form.append('<input name="export" value="' + encryptStr + '">');
			$iframe.appendTo('body');
			$form.appendTo('body').submit();
			var intval = window.setInterval(function(){				
				var data = document.getElementById("hideExportFrame").contentWindow.window.document.body.innerHTML;
				if(data){
					data = data.substring(data.indexOf("{"),data.lastIndexOf("}")+1);
					data = JSON.parse(data);
					var msgCode=data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE;
                    var msgTxt=data.ANSWERS[0].ANS_MSG_HDR.MSG_TEXT;
                    if(msgCode == "8888888888"){
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
                    }
					window.clearInterval(intval);
				}	
			},100);
			
		} else {
			var requestParams = '';
			var printWindow = window.open('../../frame/page/Print.html' + requestParams, '打印');

			var times = 40;
			var exportArea;
			var printForm;
			var interval = setInterval(function exportSubmit() {
				if (printWindow && printWindow.document && !printWindow.closed && (exportArea = printWindow.document.getElementById("export")) && (printForm = printWindow.document.getElementById("printForm"))) {
					clearInterval(interval);
					if (JSESSIONID) {
						var path = printWindow.location.pathname.replace(/\/frame.*$/, "");
						printWindow.document.cookie = "JSESSIONID=" + JSESSIONID + "" + "; path=" + path + ";";
					}
					exportArea.innerHTML = encryptStr;
					printForm.action = opts.action;
					printForm.submit();
				} else if (--times < 0) {
					clearInterval(interval);
				}
			}, 200);

		}
	}

	/**
	 * exportGrid 说明： 本方法用于生成显示打印设置和导出设置对话框 html codes
	 * 
	 * @exportType: 导出类型： print or not
	 * @grid: 装载数据
	 */
	function exportGrid(target) {
		var opts = $.data(target, 'report').options;
		var exportType = opts.exportType;
		var isPrint = opts.isPrint;
		/**
		 * reportConfig include: 1. general general include: [range, title and
		 * filename] 2. columns 3. page direction === "horizontal" topMargin
		 * bottomMargin leftMargin rightMargin
		 * 
		 */
		var exportTitle = opts.title;
		var title = isPrint ? '打印列' : '导出列';
		var moreSetItem = exportType == 'pdf';
		/*
		 * columns include: 1. export: columns[i].id, columns[i].exportable ===
		 * true || columns[i].exportable === "true", columns[i].header, 2.
		 * print: columns[i].id, columns[i].printable === true ||
		 * columns[i].printable === "true", columns[i].header, columns[i].width
		 */
		var gridColumns = opts.gridColumns;
		var configHtml = [];
		
		//dbf 或 csv导出时没有统计区域。
		if (exportType === 'dbf' || exportType === 'csv'){
			opts.showStatistics = false;
		}
		
		// 打印弹出窗口设置
		configHtml.push("<div class=\"export-div-reportDialog\"><div style=\"width:");
		configHtml.push((isIE() ? "550px" : "570px"));
		configHtml.push(";float:left\"><div class=\"export-div-print-columns\"><fieldset style=\"padding:0;width:270px;height:");
		opts.showStatistics ? configHtml.push((!isIE() ? "238px" : isIE8() ? "212px" : "213px")) : configHtml.push((!isIE() ? "225px" : isIE8() ? "199px" : "200px"));
		configHtml.push("\"><legend>");
		configHtml.push(title);
		configHtml.push("</legend><div class=\"export-div-print-columns-div\"><input id=\"export_checkAll\" type=\"checkbox\" name=\"checkAll\" checked=\"checked\" onChange= \"this.checked === true ? $(this).parent().next().find('input').attr('checked','checked'):$(this).parent().next().find('input').attr('checked',false)\"><label for=\"export_checkAll\">选中全部</label></div><div class=\"export_columns\" style='border:1px solid gray;width:260px;height:");
		configHtml.push((!isIE() ? "165px" : "140px"));
		configHtml.push(";overflow:auto;margin:5px'>");
		var noChecked = $.ls(opts.lsKey+"-report") || [];
		for ( var i = 0; i < gridColumns.length; i++) {
			if (gridColumns[i].field != "chk" && gridColumns[i].field != "" && !gridColumns[i].hidden && gridColumns[i].type != 'notice') {
				configHtml.push("<div class=\"export-div-chk\"><li class=\"export-div-chk-li\"><span class=\"export-div-chk-li-span1\"><input type=\"checkbox\" id=\"export_");
				configHtml.push(gridColumns[i].field);
				configHtml.push("_chk\" value=\"");
				configHtml.push(gridColumns[i].field);
				configHtml.push("\"");
				if(!~$.inArray(gridColumns[i].field,noChecked) &&  !(/ hide/.test(gridColumns[i].cellClass))){
					configHtml.push("checked=\"checked\"");
				}
				configHtml.push("><label for=\"export_");
				configHtml.push(gridColumns[i].field);
				configHtml.push("_chk\">");
				configHtml.push(gridColumns[i].title);
				configHtml.push("</label></span><span class=\"export-div-chk-li-span2\">宽(毫米):<input type=\"text\" disabled=\"disabled\" size=\"2\" ");
				configHtml.push("onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\" value=\"");
				configHtml.push(gridColumns[i].width);
				configHtml.push("\"/></span></li></div>");
			}
		}
		configHtml.push("</div></fieldset></div><div class=\"export-div-float-left\"><fieldset style=\"width:251px;margin-bottom:5px;height:");
		configHtml.push((isIE() ? isIE8() ? "43px" : "40px" : "43px"));
		configHtml.push("\"><legend>基本</legend><div class=\"export-div-title-range\">标题:&nbsp;&nbsp;<input type=\"text\" id=\"export_title\" style=\"border: red 1px solid;\" value=\"");  //导出标题输出框添加边框改为红色，by  2016/01/06
		configHtml.push(exportTitle);
		configHtml.push("\"/></div></fieldset><fieldset class=\"export_direction\" style=\"width:251;margin-bottom:5px;height:");
		configHtml.push((isIE() ? isIE8() ? "39px" : "33px" : "35px"));
		configHtml.push("\"><legend>方向</legend><div><input type=\"radio\" name=\"printDirection\" value=\"horizontal\"");
		configHtml.push((opts.page.direction === "horizontal" ? "checked=\"checked\"" : ""));
		configHtml.push("/>横向&nbsp;&nbsp;<input type=\"radio\" name=\"printDirection\" value=\"vertical\"");
		configHtml.push((opts.page.direction === "vertical" ? "checked=\"checked\"" : ""));
		configHtml.push("/>纵向</div></fieldset><fieldset class=\"export_range\" style=\"width:253px;height:");
		opts.showStatistics ? configHtml.push((isIE() ? isIE8() ? "109px" : "112px" : "107px")) : configHtml.push((isIE() ? isIE8() ? "90px" : "93px" : "88px"));
		configHtml.push("\"><legend>范围</legend><div class=\"export-div-title-range\"><input id=\"allPage\" type=\"radio\" ");
		configHtml.push((opts.general.range === "all" ? "checked=\"checked\"" : ""));
		configHtml.push(" value=\"all\" name=\"range\">全部</div><div class=\"export-div-title-range\"><input id=\"currentPage\" type=\"radio\" value=\"current\" ");
		configHtml.push((opts.general.range === "current" ? "checked=\"checked\"" : ""));
		configHtml.push(" name=\"range\">当前页</div><div><input id=\"defineRange\" type=\"radio\" value=\"define\" ");
		configHtml.push((opts.general.range === "define" ? "checked=\"checked\"" : ""));
		configHtml.push(" name=\"range\">起始页:&nbsp;&nbsp;<input name=\"start\" value=\"1\" type=\"text\" size=\"2\" onkeyup=\"value=value.replace(/[^\\d]/g,'')\" onkeydown=\"$(this).parent().find('input[name=range]')[0].checked=true\">&nbsp;&nbsp;结束页:&nbsp;&nbsp;<input name=\"end\" value=\"1\" type=\"text\" size=\"2\" onkeyup=\"value=value.replace(/[^\\d]/g,'')\" onkeydown=\"$(this).parent().find('input[name=range]')[0].checked=true\"></div>");
		
		
		opts.showStatistics && configHtml.push("<div style=\"padding:3px 0 0 2px\"><input id=\"exportSts\" type=\"checkbox\" checked>统计区域</div>");
		configHtml.push("</fieldset></div></div>");
		if (moreSetItem) {
			configHtml.push("<fieldset class=\"export_spacing\" style=\"width:534px;float:left;margin-bottom:5px;margin-top:5px\"><legend>间距(厘米)</legend><div>上:&nbsp;&nbsp;<input name=\"topMargin\" type=\"text\" size=\"3\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\" value=\"");
			configHtml.push((opts.page.topMargin));
			configHtml.push("\"/>&nbsp&nbsp下:&nbsp;&nbsp;<input name=\"bottomMargin\" type=\"text\" size=\"3\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\" value=\"");
			configHtml.push((opts.page.bottomMargin));
			configHtml.push("\"/>&nbsp;&nbsp;左:&nbsp;&nbsp;<input name=\"leftMargin\" type=\"text\" size=\"3\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\" value=\"");
			configHtml.push((opts.page.leftMargin));
			configHtml.push("\"/>&nbsp;&nbsp;右:&nbsp;&nbsp;<input name=\"rightMargin\" type=\"text\" size=\"3\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\" value=\"");
			configHtml.push((opts.page.rightMargin));
			configHtml.push("\"/></div></fieldset><fieldset class=\"export_paper\" style=\"width:534px;float:left;margin-bottom:5px;\"><legend>纸张</legend><div><input id=\"export_standardsize\" type=\"radio\" name=\"pageSize\" value=\"standard\" ");
			configHtml.push(opts.page.PageSize == "define" ? "" : "checked=\"checked\"");
			configHtml.push("/>标准&nbsp;&nbsp;<select id=\"sizeSelect\" onchange=\"$(this).prev()[0].checked=true\">");
			for ( var i = 0, len = opts.stardardPapers.length; i < len; i++) {
				if (opts.page.PageSize == opts.stardardPapers[i]) {
					configHtml.push('<option value="' + opts.stardardPapers[i] + '" selected="selected">' + opts.stardardPapers[i] + '</option>');
				} else {
					configHtml.push('<option value="' + opts.stardardPapers[i] + '">' + opts.stardardPapers[i] + '</option>');
				}
			}
			configHtml.push("</select>&nbsp;&nbsp;<input id=\"export_definesize\" type=\"radio\" name=\"pageSize\" value=\"define\"");
			configHtml.push(opts.page.PageSize == "define" ? "checked=\"checked\"" : "");
			configHtml.push("/><label>自定义&nbsp;&nbsp;</label>宽(厘米):&nbsp;&nbsp;<input");
			configHtml.push(" value = \"" + String(opts.page.width).replace(/[^\d.]/g, '') + "\"");
			configHtml.push(" type=\"text\" id=\"pageWidth\" size=\"5\" onkeydown=\"$(this).parent().find('#export_definesize')[0].checked=true\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\"/>&nbsp;&nbsp;高(厘米):&nbsp;&nbsp;<input");
			configHtml.push(" value = \"" + String(opts.page.height).replace(/[^\d.]/g, '') + "\"");
			configHtml.push(" type=\"text\" id=\"pageHeight\" size=\"5\" onkeydown=\"$(this).parent().find('#export_definesize')[0].check 	ed=true\" onkeyup=\"value=value.replace(/[^\\d+(\\.\\d+)?$]/g,'')\"/></div><div></div></fieldset>");
			if (isPrint && (opts.companyName || opts.companyName || opts.footerInfo)) {
				configHtml.push('<fieldset class="export_paper" style="width:534px;float:left;margin-bottom:5px;">');
				configHtml.push('<legend>表尾区域</legend><div>');
				configHtml.push('<div>');
				configHtml.push('<span style="line-height: 20px;">确认信息：</span><input name="confirmInfo" style="width: 150px" value="' + (opts.confirmInfo || "") + '"/>');
				configHtml.push('<span style="line-height: 20px;margin-left: 93px;">公司名称：</span><input name="companyName" style="width: 150px" value="' + (opts.companyName || "") + '"/>');
				configHtml.push('</div>');
				configHtml.push('<div><span style="float: left;line-height: 40px;">表尾描述：</span><textarea name="footerInfo" style="width: 455px;resize: none;">' + (opts.footerInfo || "")+ '</textarea></div>');
				configHtml.push('</div></fieldset>');
			}
		}
		configHtml.push('</div>');
		
		if(!opts.notShowDialog) {
			if ($.data(target, 'window')) {
				var dialogH = moreSetItem ? (isIE() ? 378 : 440) : (isIE() ? 280 : 320);
				
				dialogH = opts.showStatistics ? dialogH+19:dialogH;
				if (isPrint && (opts.companyName || opts.companyName || opts.footerInfo)) {
					dialogH = opts.footerInfo ? dialogH+80:dialogH;
				}
				$(target).find('div.dialog-content').html(configHtml.join('')).end().window('open').window('resize', {
					height : dialogH
				}).window('center').window('setTitle', opts.titles[isPrint ? 'print' : exportType]);
			} else {
				var dialogH = moreSetItem ? (isIE() ? 378 : 440) : (isIE() ? 282 : 320);
				
				dialogH = opts.showStatistics ? dialogH+19:dialogH;
				if (isPrint && (opts.companyName || opts.companyName || opts.footerInfo)) {
					dialogH = opts.footerInfo ? dialogH+80:dialogH;
				}
				$(target).html(configHtml.join('')).dialog({
					width : 590,
					height : dialogH,
					modal : true,
					title : opts.titles[isPrint ? 'print' : exportType],
					iconCls : 'icon-save',
					shadow : false,
					collapsible : false,
					buttons : [ {
						text : '确定',
						iconCls : 'icon-save',
						handler : function() {
							if (saveConfig(target)) {
								submit(target);
								$(target).dialog('close');
							}
						}
					}, {
						text : '关闭',
						iconCls : 'icon-cancel',
						handler : function() {
							$(target).dialog('close');
						}
					} ]
				});
			}
		} else { // 不显示设置框时，默认导出全部数据
			var opts = $.data(target, "report").options;

			// 获取行的数据
			var header = [];
			$.each(gridColumns,function(index,item){
				header.push(item.field);
			});
			opts.columns = header;
			
			// 获取范围
			var range='all';
			if(opts.pageInfo.startRowNum == 0){
				opts.pageInfo.startRowNum = 0;
			}else{
				opts.pageInfo.startRowNum = 1;
			}
			opts.pageInfo.endRowNum = -1;
			if (opts.pageInfo.noPagination) {
				opts.pageInfo.pageSize = -1;
				delete opts.pageInfo.noPagination;
			}
			if (opts.fallParas.enable && opts.reqStr.req[0]) {
				opts.reqStr.req[0][opts.fallParas.recName] = opts.pageInfo.startRowNum;
				opts.reqStr.req[0][opts.fallParas.cntName] = opts.pageInfo.endRowNum;
				if (range == 'all') {
					opts.reqStr.req[0][opts.fallParas.cntName] = 99999999;
				}
			}
			
			if(opts.pageInfo.remotePagination){
				if (range == 'all') {
					if(opts.pageInfo.pageParamete){
						opts.reqStr.req[0][opts.pageInfo.pageParamete.recName] = 99999999;
						opts.reqStr.req[0][opts.pageInfo.pageParamete.cntName] = 0;
					}
				}
			}

			submit(target);
			return;
		}
	}

	function saveConfig(target) {

		var opts = $.data(target, "report").options;

		// 获取行的数据
		var headers = [];
		var headerWidths = [];
		/*$(target).find('div.export_columns:first input[type="checkbox"]:checked').each(function() {
			headers.push($(this).val());
			headerWidths.push($(this).parent().next().find('input').val());
		});*/
		var noChecked = [];
		$(target).find('div.export_columns:first input[type="checkbox"]').each(function() {
			if(this.checked){
				headers.push($(this).val());
				headerWidths.push($(this).parent().next().find('input').val());
			}else{
				noChecked.push($(this).val());
			}
		});
		opts.columns = headers;
		
		//是否导出统计
		opts.isExportSts = $(target).find("#exportSts").attr("checked");

		// 获取基本
		opts.title = $(target).find("#export_title").val();
		opts.fileName = opts.title;
		if($.trim(opts.title) ==""){
			alert('导出标题不能为空！');
			return false;
		}
		
		$.ls(opts.lsKey+"-report",noChecked);
		
		// 获取横向还是纵向
		opts.page.direction = $(target).find('fieldset.export_direction:first').find('input:checked').val();

		// 获取范围
		var $export_range = $(target).find('fieldset.export_range:first');
		var range = $export_range.find('input[type=radio]:checked').val();
		var start = parseInt($export_range.find('input[name=start]').val()) || 1;
		var end = parseInt($export_range.find('input[name=end]').val()) || 1;
		if (start > end) {
			alert('结束页应该大于等于起始页。');
			return false;
		}
		if (range == 'all') {
			if(opts.pageInfo.startRowNum == 0){
				opts.pageInfo.startRowNum = 0;
			}else{
				opts.pageInfo.startRowNum = 1;
			}
			opts.pageInfo.endRowNum = -1;
		} else if (range == 'define') {
			if (opts.fallParas.enable && opts.reqStr.req[0]){
				if(opts.pageInfo.startRowNum == 0){
					opts.reqStr.req[0][opts.fallParas.recName] = opts.pageInfo.pageSize * (start - 1);
				}else{
					opts.reqStr.req[0][opts.fallParas.recName] = opts.pageInfo.pageSize * (start - 1)+1;
				}
			}else{
				opts.pageInfo.startRowNum = opts.pageInfo.pageSize * (start - 1) + 1;
			}
			opts.pageInfo.endRowNum = opts.pageInfo.pageSize * end;
		}
		if (opts.pageInfo.noPagination) {
			opts.pageInfo.pageSize = -1;
			delete opts.pageInfo.noPagination;
		}
		if ((opts.fallParas.enable && opts.reqStr.req[0])) {
			opts.reqStr.req[0][opts.fallParas.recName] = opts.pageInfo.startRowNum;
			opts.reqStr.req[0][opts.fallParas.cntName] = opts.pageInfo.endRowNum;
			if (range == 'all') {
				opts.reqStr.req[0][opts.fallParas.cntName] = 99999999;
			}
		}
		
		if(opts.pageInfo.remotePagination){
			if (range == 'all') {
				if(opts.pageInfo.pageParamete){
					opts.reqStr.req[0][opts.pageInfo.pageParamete.recName] = 99999999;
					opts.reqStr.req[0][opts.pageInfo.pageParamete.cntName] = 0;
				}
			}
		}

		if (opts.exportType == 'pdf') {
			// 获取间距
			var $export_spacing = $(target).find('fieldset.export_spacing:first');
			var pageParams = [ 'leftMargin', 'rightMargin', 'topMargin', 'bottomMargin' ];
			for ( var i = 0; i < pageParams.length; i++) {
				var margin = parseFloat($export_spacing.find('input[name=' + pageParams[i] + ']').val());
				opts.page[pageParams[i]] = typeof margin == 'number' ? margin : $.fn.report.defaults.page[pageParams[i]];
			}

			// 获取纸张
			var $export_paper = $(target).find('fieldset.export_paper:first');
			var pageSize = $export_paper.find('input[name="pageSize"]:checked').val();
			if (pageSize == "standard") {
				opts.page.PageSize = $export_paper.find("#sizeSelect").val();
				opts.page.width = 0;
				opts.page.height = 0;
			} else {
				opts.page.PageSize = 'define';
				opts.page.width = parseInt($export_paper.find("#pageWidth").val()) || 0;
				opts.page.height = parseInt($export_paper.find("#pageHeight").val()) || 0;
			}
		}
		if(opts.isPrint){
			var inputs = $(target).find(':input');
			opts.footerInfo = inputs.filter("[name='footerInfo']").val();
			opts.companyName =  inputs.filter("[name='companyName']").val();
			opts.confirmInfo = inputs.filter("[name='confirmInfo']").val();
		}
		
		return true;
	}

	/* 报表导入zhangchao----------------------------------------------------------------------------------------------------------- */
	$.fn.imports = function(target, options, param) {
		if (typeof options == 'string') {
			return $.fn.imports.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
			if (!$.data(this, 'import')) {
				$.data(this, 'import', {
					options : $.extend({}, $.fn.imports.defaults)
				});
			}

			var opts = $.data(this, 'import').options;
			$.extend(opts, options);
			importGrid(this, target);
		});
	};

	function importGrid(target, tg_parent) {
		var title = '导入报表';
		var moreSetItem = true;
		var href = '../../frame/page/import.html';
		var width = document.body.clientWidth * 0.8;
		var height = document.body.clientHeight - 40;
		$(target).dialog({
			width : width,
			height : height,
			modal : true,
			title : title,
			iconCls : 'icon-save',
			shadow : false,
			collapsible : false,
			href : href,
			buttons : [ {
				text : '导入',
				iconCls : 'icon-save',
				handler : function() {
					var bool = submitImport(target);
					if (bool) {
						// $(target).dialog('close');
						$(tg_parent).datagrid('reload');// 刷新查询数据
					}
				}
			}, {
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function() {
					$(target).dialog('close');
				}
			} ]
		});
		// 初始化table
		var frame = $(target).find('iframe')[0];
		var firefox = $.browser.mozilla;
		if (firefox) {
			frame.addEventListener("load", function() {
				// 代码能执行到这里说明已经载入成功完毕了
				frame.removeEventListener("load", arguments.call, false);
				// 这里是回调函数
				var clomns = $(tg_parent).datagrid('getOriginalColumns');// 父查询页面列信息
				var importColmns = frame.contentWindow;
				importColmns.initTable(clomns);
			}, false);
		} else if (isIE()) {
			frame.attachEvent("onreadystatechange", function() {
				if (frame.readyState === "complete" || frame.readyState == "loaded") {
					// 要清除掉事件
					frame.detachEvent("onreadystatechange", arguments.callee);
					// 这里是回调函数
					var clomns = $(tg_parent).datagrid('getOriginalColumns');// 父查询页面列信息
					var importColmns = frame.contentWindow;
					importColmns.initTable(clomns);
				}
			});

		} else// 其他浏览器处理方式
		{
			setTimeout(function() {
				var clomns = $(tg_parent).datagrid('getOriginalColumns');// 父查询页面列信息
				var importColmns = frame.contentWindow;
				importColmns.initTable(clomns);
			}, 1000);
		}
	}

	$.fn.imports.methods = {
		options : function(jq) {
			return $.data(jq[0], 'import').options;
		}
	};

	$.fn.imports.defaults = {};

	function submitImport(target) {
		var submitstate = true;
		var importWindow = $(target).find('iframe')[0].contentWindow;
		var rows = importWindow.getImportData();
		var importRows = rows.datas;

		var grid = $.data(target, 'import');
		var toolbar = grid.options.toolbar;
		if (toolbar && toolbar.length) {
			var req;
			for ( var i = 0; i < toolbar.length; i++) {
				if (toolbar[i].iconCls == 'icon-add') {
					req = eval('(' + toolbar[i].req + ')');
					req[0]['service'] = 'GeneralPojoService';
					break;
				}
			}
			if (req) {
				var reqArr = [];
				for ( var r = 0; r < importRows.length; r++) {
					reqArr[r] = $.extend({}, req[0], importRows[r]);
				}
				if (reqArr.length < 1) {
					alert('导入数据为空！');
					return false;
				}
				var ajaxParam = {
					async : false,
					dataType : 'xml',
					responseType : 'xml',
					req : reqArr,
					func : function(data) {
						importWindow.showColumnInfo(data);
					},
					error : function() {
						importWindow.showColumnInfo(arguments);
					}
				};
				ajaxRequest(ajaxParam);
			} else {
				alert('该表格没有批量导入功能！');
				submitstate = false;
			}
		} else {
			alert('该表格没有批量导入功能！');
			submitstate = false;
		}

		return submitstate;

	}

	function isIE() {
		var is = false;
		if ($.browser.msie) {
			is = true;
		}
		return is;
	}
	function isIE8() {
		var is8 = false;
		if ($.browser.msie && ($.browser.version == "8.0")) {
			is8 = true;
		}
		return is8;
	}
})(jQuery);