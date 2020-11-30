var kui_debugger={
	debugOn:false,
	debugWindow:null,
	messages: new Array(),
	messagesIndex: 0,
	lineWidth:80,
	
	setDebug:function(bol){
		kui_debugger.debugOn=bol;
		if(kui_debugger.debugOn){
			if(kui_debugger.debugWindow==null||kui_debugger.debugWindow.closed){
				kui_debugger.debugWindow = window.open("", "kui调试器", "toolbar=no,scrollbars=yes,resizable=yes,location=no,width=700,height=400");
				// Write doc header
				kui_debugger.debugWindow.document.writeln('<html><head><title>kui-调试器</title></head><body bgcolor="#DDDDDD" style="font:12px 微软雅黑, arial, sans-serif;">');
				// Write doc footer and close
				kui_debugger.debugWindow.document.writeln('</body></html>');
			}
		}
	}
	,cleanAll:function(){
		if(!kui_debugger.debugOn){
				return;
			}
			kui_debugger.messages=new Array();
			kui_debugger.messagesIndex=0;
			kui_debugger.debugWindow.document.body.innerHTML="";
	}
	
	,init:function(){
			
		},
	debug:function (type,val){
			var msg={};
			if(!kui_debugger.debugOn){
				return;
			}
			// Create message
			if(type=="请求参数"){
				var data = eval('(' + val + ')');
				var requests = data["REQUESTS"];
				for(var i = 0;i<requests.length;i++){
					var request = requests[i];
					msg={};
					msg["val"]=kui.jsonToOP(request["REQ_MSG_HDR"])+","+kui.jsonToOP(request["REQ_COMM_DATA"]);			
					msg["type"]=type;
					// Add message to current list
					kui_debugger.messages[kui_debugger.messagesIndex++] = msg;
				}
			}else{
				msg["val"]=val;
				msg["type"]=type;
				// Add message to current list
				kui_debugger.messages[kui_debugger.messagesIndex++] = msg;
			}
			

			// Write doc header
			kui_debugger.debugWindow.document.writeln('<html><head><title>kui-调试器</title></head><body bgcolor="#DDDDDD" style="font:12px 微软雅黑, arial, sans-serif;">');
			
			// Write the messages
			for (var i = 0; i < kui_debugger.messagesIndex; i++) {
				kui_debugger.debugWindow.document.writeln('<div style="color:red;">' + i +" ("+formatDate(new Date())+ ') '+kui_debugger.messages[i]["type"]+':</div><div style="width:100%">' +  (kui_debugger.messages[i]["val"]) + '</div>');
			}

			// Write doc footer and close
			kui_debugger.debugWindow.document.writeln('</body></html>');
			kui_debugger.debugWindow.document.close();
			kui_debugger.debugWindow.focus();
			kui_debugger.debugWindow.scrollTo(kui_debugger.debugWindow.scrollX,100000);
			kui_debugger.debugWindow.oncontextmenu = function(){
				//显示清空控制台菜单
			}
			/**
			 * 切割换行
			 */
			function formatToLine(val){
				var result="";
				var length=val.length;
				if(length<kui_debugger.lineWidth){
					return val;
				}
				for(var i=0;i<Math.ceil(length/kui_debugger.lineWidth);i++){
					if(i==(Math.ceil(length/kui_debugger.lineWidth)-1)){
						result+=val.substring(i*kui_debugger.lineWidth,length);
					}else{
						result+=val.substring(i*kui_debugger.lineWidth,(i+1)*kui_debugger.lineWidth)+"<br>";
					}
				}
				
				return result;
				
			}
			
			/**
			 * 格式化日期
			 */
			function formatDate(date){
				var result="";
				var d=date.getDate();
				var h=date.getHours();
				var m=date.getMinutes();
				var s=date.getSeconds();
				var ms=date.getMilliseconds();
				result+=d+" "+h+":"+m+":"+s+":"+ms;
				return result;
			}
			
		
		}
		
};