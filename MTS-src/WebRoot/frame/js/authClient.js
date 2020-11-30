if(typeof(app)=='object'){
	function callAppFunc(callbackFunc, paramJSON, contextJSON){
		var shellBindingId = 'KDBJsInterface';
		try{app.removeMessageCallback(shellBindingId);}catch(e){}
		app.setMessageCallback(shellBindingId, function(name, args) {
			if (args.length>1) {
				callbackFunc(JSON.parse(args[0]), JSON.parse(args[1]));
			}else{
				callbackFunc(JSON.parse(args[0]));
			}
		});		
		app.sendMessage(shellBindingId, [JSON.stringify(paramJSON)]);
	}
	$k.login.submit = function(){
		if($k.logining) return;
			$k.logining = true;
            if ($("input[name='saveIt']").attr("checked") == "checked") {
                $.cookie('account', $("#username").val(),{expires:30});
            } else {
                $.cookie('account', null);
            }
            if (/\s/.test($.trim($("#username").val()))) {
                alert("用户名不合法，请重新输入!");
				this.logining = false;
                return ;
            }
            $("#validate", "#loginDiv").blur();
            $('a.submit-button', '#loginDiv').attr('disabled', true);
			//第一步 获取SecrecyCode
			var getSecrecyCode = function(){
				var p={"name":"authclient","body":{"type":"rndcode","length":"8"}};
				callAppFunc(function(resultJSON, contextJSON){
					if(resultJSON.code=='0'){
						encSecrecyCode(resultJSON.body.data);
					}
				},p);
			}
			//第二步 加密SecrecyCode
			var encSecrecyCode = function(secrecyCode){
				var p={"name":"authclient","body":{"type":"enccode","data":secrecyCode}};
				callAppFunc(function(resultJSON, contextJSON){
					if(resultJSON.code=='0'){
						encUserId(resultJSON.body.data);
					}
				},p);
			}
			//第三步 加密userId
			var encUserId = function(secrecyCode){
				var userId = $("#username").val();
				var p={"name":"authclient","body":{"type":"enccode","data":userId}};
				callAppFunc(function(resultJSON, contextJSON){
					if(resultJSON.code=='0'){
						getServcerSecrecyCode(secrecyCode,resultJSON.body.data);
					}
				},p);
			}
			//第四步 调用LBM T0000101
			var getServcerSecrecyCode = function(secrecyCode,userId){
				ajaxRequest({
					url:'kjdp_ajax?returnType=json',
					func: function(data) {
						$alert(data);
					},
					req: [{
						"service": "T0000101",
						"USER_ID_TYPE":'1',
						"USER_ROLE":'2',
						"USER_ID":userId,
						"SECRECY_CODE1":secrecyCode
					}]
				});
			}

			//第五步 加密密码
			var encUserPassword = function(secrecyCode2){
				var password = $("#password").val();
				var p={"name":"authclient","body":{"type":"encpwd","data":password,"code1":secrecyCode2,"code2":secrecyCode}};
				callAppFunc(function(resultJSON, contextJSON){
					if(resultJSON.code=='0'){
						authUser(resultJSON.body.data);
					}
				},p);
			}

			//第六步 认证
			var authUser = function(encpass){
				var userId = $("#username").val();
				ajaxRequest({
					url:'kjdp_ajax?returnType=json',
					func: function(data) {
						$alert(data);
					},
					req: [{
						"service": "T0000102",
						"USER_CODE":'1',
						"F_OP_SRC":'0',
						"USER_ROLE":'2',
						"USER_ID":userId,
						"TRD_PWD":encpass
						
					}]
				});
			}
			 $('a.submit-button', '#loginDiv').attr('disabled', false);
			$k.logining = false;
            /*var password = encrypt($("#password").val(), $("#username").val());
            var params = {
                USER_CODE: $("#username").val(),
                TRD_PWD: password,
                validateCode: $("#validate").val()
            };
            $alert($k.encKey);
            var requestXmlStr = encrypt(kui.makeXmlRequestStr([params]));
            var loginProccess = function(retStr) {
                if (retStr['IRETCODE'] == "0") {
                    window.g_user = {
                        'userId': retStr['USER_CODE'],
                        'userName': retStr['USER_NAME'],
                        'userPass': retStr['USER_PASS'],
                        'userRole': retStr['USER_ROLE'],
                        'userTicket': retStr['USER_TICKET_INFO'],
                        'userIcon':retStr['USER_ICON'],
                        'loginIp':retStr['LOG_IP'],
                        'orgCode':retStr['ORG_CODE'],
                        'openDate':retStr['OPEN_DATE'],
                        'loginDate':retStr['LOG_DATE'],
                        'userIcon':retStr['USER_ICON'],
                        'offTel':retStr['OFF_TEL'],
                        'mobile':retStr['MOBILE'],
                        'email':retStr['EMAIL'],
                        'asign':retStr['SIGNATRUE']
                    };
                    $k.startup();
                } else if (retStr['IRETCODE'] == "-3") {
                    alert("验证码错误，请重新输入!");
                    $('#validateimg').click();
                } else if(retStr['IRETCODE'] == "-1") {
                    alert("用户名或密码错误，用户认证失败!");
                    $('#validateimg').click();
                } else if(retStr['IRETCODE'] == "-4") {
                    alert("用户状态不合法，登陆失败，请联系管理员!");
                    $('#validateimg').click();
                }else {
                    alert("用户登陆失败!");
                    $('#validateimg').click();
                }
                $('a.submit-button', '#loginDiv').attr('disabled', false);
				$k.logining=false;
            };
            $.ajax({
                url: "kjdp_login",
                type: "POST",
                data: requestXmlStr,
                contentType: 'text/xml; charset=utf-8',
                dataType: 'text',
                success: function(data) {
                    var retStr = eval('(' + data + ')');
                    loginProccess(retStr);					
                }
            });*/
	}
}