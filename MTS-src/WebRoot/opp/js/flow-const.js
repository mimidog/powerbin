/**
 * 门户引擎流程组件使用的常量
 */

//流程事件常量
var FLOW_EVENT = {
	FLOW_PREV : "H1",	//流程跳转
	FLOW_NEXT : "H2",	//流程跳转
	COMPONENT : "H3",	//流程跳转前组件事件处理
	TOOLBAR_UI : "H4"	//流程工具界面处理
},

//工具条界面控制常量
TOOLBAR_TYPE = {
	BEGIN : 0,	//流程开始，只有下一步按钮
	PROGRESS : 1,	//流程进行，包含上一步，下一步按钮
	END : 2	//流程结束，包含上一步，提交按钮
}