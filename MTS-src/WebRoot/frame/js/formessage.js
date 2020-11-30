
function suscribe(userCode,userRole,orgCode){ //消息订阅
	PL.userCode = userCode;
	PL.userRole = userRole;
	PL.orgCode = orgCode;
	PL.webRoot = "http://192.168.90.227:8881/framepushlet/";
	PL._init(); 
	PL.joinListen('/kacp/msg');  //事件标识 在数据源中引用
}

function onData(event){//Pushlet回调
	var msgId = event.get("msg");
	if(msgId){
		var title = decodeURIComponent(event.get("titleContent"),"utf-8");
		var message = decodeURIComponent(event.get("message"),"utf-8");
		var sendTime = decodeURIComponent(event.get("sendTime"),"utf-8");
		message = message.replace(/\n/g, "<br/>");
		message = message.replace(/ /g, "&nbsp" );
		msg = {
			"msgId":msgId,
			"publishSytem":event.get("publishSytem"),
			"msgClassification":event.get("msgClassification"),
			"returnDelivery":event.get("returnDelivery"),
			"processRequirement":event.get("processRequirement"),
			"businessType":event.get("businessType"),
			"sendTime" :sendTime,
			"title":title,
			"message":message
		};
		$.message.addMessage(msg);
	}
}

function initMessage(){
	suscribe("8888","444","555");
	$.message.init("message","message-cont","message-div","msgClassification");//参数1为消息盒子的id，参数2为消息总数的id，参数3为装消息的div，参数4为后台消息类别名称
};
