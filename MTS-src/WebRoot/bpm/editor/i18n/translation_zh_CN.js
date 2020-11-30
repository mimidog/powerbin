/**
 * @author nicolas.peters
 * 
 * Contains all strings for the default language (en-us).
 * Version 1 - 08/29/08
 */
if(!ORYX) var ORYX = {};

if(!ORYX.I18N) ORYX.I18N = {};

ORYX.I18N.Language = "zh_CN"; //Pattern <ISO language code>_<ISO country code> in lower case!

if(!ORYX.I18N.Oryx) ORYX.I18N.Oryx = {};

ORYX.I18N.Oryx.title		= "Oryx";
ORYX.I18N.Oryx.noBackendDefined	= "注意！无后端定义。本要求的模型不能被加载。尝试加载配置与保存插件。";
ORYX.I18N.Oryx.pleaseWait 	= "请稍等......";
ORYX.I18N.Oryx.notLoggedOn = "没有登录";
ORYX.I18N.Oryx.editorOpenTimeout = "编辑器似乎并没有被尚未开始。请检查您是否已启用了弹出窗口阻止程序，禁用它或允许弹出窗口。我们永远不会显示该网站的任何广告。";

if(!ORYX.I18N.AddDocker) ORYX.I18N.AddDocker = {};

ORYX.I18N.AddDocker.group = "Docker";
ORYX.I18N.AddDocker.add = "添加拐点";
ORYX.I18N.AddDocker.addDesc = "点击他添加一个拐点";
ORYX.I18N.AddDocker.del = "删除拐点";
ORYX.I18N.AddDocker.delDesc = "点击他删除一个拐点";

if(!ORYX.I18N.Arrangement) ORYX.I18N.Arrangement = {};

ORYX.I18N.Arrangement.groupZ = "Z-顺序";
ORYX.I18N.Arrangement.btf = "移至最前";
ORYX.I18N.Arrangement.btfDesc = "移至最前";
ORYX.I18N.Arrangement.btb = "移至最后";
ORYX.I18N.Arrangement.btbDesc = "移至最后";
ORYX.I18N.Arrangement.bf = "前移";
ORYX.I18N.Arrangement.bfDesc = "前移";
ORYX.I18N.Arrangement.bb = "后移";
ORYX.I18N.Arrangement.bbDesc = "后移";
ORYX.I18N.Arrangement.groupA = "对齐";
ORYX.I18N.Arrangement.ab = "对齐按钮";
ORYX.I18N.Arrangement.abDesc = "按钮";
ORYX.I18N.Arrangement.am = "居中对齐";
ORYX.I18N.Arrangement.amDesc = "居中";
ORYX.I18N.Arrangement.at = "顶部对齐";
ORYX.I18N.Arrangement.atDesc = "顶部";
ORYX.I18N.Arrangement.al = "左对齐";
ORYX.I18N.Arrangement.alDesc = "左边";
ORYX.I18N.Arrangement.ac = "中间对齐";
ORYX.I18N.Arrangement.acDesc = "中间";
ORYX.I18N.Arrangement.ar = "右对齐";
ORYX.I18N.Arrangement.arDesc = "右边";
ORYX.I18N.Arrangement.as = "对齐相同大小";
ORYX.I18N.Arrangement.asDesc = "相同大小";

if(!ORYX.I18N.Edit) ORYX.I18N.Edit = {};

ORYX.I18N.Edit.group = "编辑";
ORYX.I18N.Edit.cut = "剪切";
ORYX.I18N.Edit.cutDesc = "剪切选择到Oryx剪贴板";
ORYX.I18N.Edit.copy = "复制";
ORYX.I18N.Edit.copyDesc = "复制选择到Oryx剪贴板";
ORYX.I18N.Edit.paste = "粘帖";
ORYX.I18N.Edit.pasteDesc = "粘帖Oryx剪贴板到画布上";
ORYX.I18N.Edit.del = "删除";
ORYX.I18N.Edit.delDesc = "删除所有选择形状";

if(!ORYX.I18N.EPCSupport) ORYX.I18N.EPCSupport = {};

ORYX.I18N.EPCSupport.group = "EPC";
ORYX.I18N.EPCSupport.exp = "导出 EPC";
ORYX.I18N.EPCSupport.expDesc = "导出流程图到EPML";
ORYX.I18N.EPCSupport.imp = "导入 EPC";
ORYX.I18N.EPCSupport.impDesc = "导入一个EPML文件";
ORYX.I18N.EPCSupport.progressExp = "导出模型";
ORYX.I18N.EPCSupport.selectFile = "选择一个EPML (.empl)文件导入.";
ORYX.I18N.EPCSupport.file = "文件";
ORYX.I18N.EPCSupport.impPanel = "导入EPML文件";
ORYX.I18N.EPCSupport.impBtn = "导入";
ORYX.I18N.EPCSupport.close = "关闭";
ORYX.I18N.EPCSupport.error = "错误";
ORYX.I18N.EPCSupport.progressImp = "导入中...";

if(!ORYX.I18N.ERDFSupport) ORYX.I18N.ERDFSupport = {};

ORYX.I18N.ERDFSupport.exp = "导出到ERDF";
ORYX.I18N.ERDFSupport.expDesc = "导出到ERDF";
ORYX.I18N.ERDFSupport.imp = "从ERDF导入";
ORYX.I18N.ERDFSupport.impDesc = "从ERDF导入";
ORYX.I18N.ERDFSupport.impFailed = "导入ERDF请求失败.";
ORYX.I18N.ERDFSupport.impFailed2 = "导入口发生错误! <br/>请查看错误信息: <br/><br/>";
ORYX.I18N.ERDFSupport.error = "错误";
ORYX.I18N.ERDFSupport.noCanvas = "xml文档不包含Oryx画布节点!";
ORYX.I18N.ERDFSupport.noSS = "Oryx画布节点有没有包含模板集定义!";
ORYX.I18N.ERDFSupport.wrongSS = "指定模板集不适合当前编辑器!";
ORYX.I18N.ERDFSupport.selectFile = "选择一个 ERDF (.xml) 文件 或者 类型为ERDF导入!";
ORYX.I18N.ERDFSupport.file = "文件";
ORYX.I18N.ERDFSupport.impERDF = "导入 ERDF";
ORYX.I18N.ERDFSupport.impBtn = "导入";
ORYX.I18N.ERDFSupport.impProgress = "导入中...";
ORYX.I18N.ERDFSupport.close = "关闭";
ORYX.I18N.ERDFSupport.deprTitle = "确定导出ERDF?";
ORYX.I18N.ERDFSupport.deprText = "导出到ERDF不推荐了，因为支持将Oryz编辑器的未来版本将停止。如果可能的话，将模型导出为JSON。你是否仍要导出？";

if(!ORYX.I18N.jPDLSupport) ORYX.I18N.jPDLSupport = {};

ORYX.I18N.jPDLSupport.group = "执行BPMN";
ORYX.I18N.jPDLSupport.exp = "导出到 jPDL";
ORYX.I18N.jPDLSupport.expDesc = "导出到 jPDL";
ORYX.I18N.jPDLSupport.imp = "从 jPDL 导入";
ORYX.I18N.jPDLSupport.impDesc = "导入 jPDL 文件";
ORYX.I18N.jPDLSupport.impFailedReq = "导入jPDL请求失败.";
ORYX.I18N.jPDLSupport.impFailedJson = "转换 jPDL 失败.";
ORYX.I18N.jPDLSupport.impFailedJsonAbort = "导入中断.";
ORYX.I18N.jPDLSupport.loadSseQuestionTitle = "jBPM的模板集扩展需要加载";
ORYX.I18N.jPDLSupport.loadSseQuestionBody = "为了导入jPDL，模板集扩展必须加载。你要继续?";
ORYX.I18N.jPDLSupport.expFailedReq = "请求导出模型失败.";
ORYX.I18N.jPDLSupport.expFailedXml = "导出 jPDL 失败. 导出报告: ";
ORYX.I18N.jPDLSupport.error = "错误";
ORYX.I18N.jPDLSupport.selectFile = "选择一个 jPDL (.xml) 文件或者类型为jPDL的导入!";
ORYX.I18N.jPDLSupport.file = "文件";
ORYX.I18N.jPDLSupport.impJPDL = "导入 jPDL";
ORYX.I18N.jPDLSupport.impBtn = "导入";
ORYX.I18N.jPDLSupport.impProgress = "导入中...";
ORYX.I18N.jPDLSupport.close = "关闭";

if(!ORYX.I18N.Save) ORYX.I18N.Save = {};

ORYX.I18N.Save.group = "文件";
ORYX.I18N.Save.save = "保存";
ORYX.I18N.Save.saveDesc = "保存";
ORYX.I18N.Save.saveAs = "另存为...";
ORYX.I18N.Save.saveAsDesc = "另存为...";
ORYX.I18N.Save.unsavedData = "有未保存的数据，请在你关闭之前保存，否则您所做的更改会丢失！";
ORYX.I18N.Save.newProcess = "新建流程";
ORYX.I18N.Save.saveAsTitle = "另存为...";
ORYX.I18N.Save.saveBtn = "保存";
ORYX.I18N.Save.close = "关闭";
ORYX.I18N.Save.savedAs = "另存为";
ORYX.I18N.Save.saved = "保存成功!";
ORYX.I18N.Save.failed = "保存失败！";
ORYX.I18N.Save.noRights = "您没有权限修改！";
ORYX.I18N.Save.saving = "保存中";
ORYX.I18N.Save.saveAsHint = "该流程图存储在：";

if(!ORYX.I18N.File) ORYX.I18N.File = {};

ORYX.I18N.File.group = "文件";
ORYX.I18N.File.print = "打印";
ORYX.I18N.File.printDesc = "打印当前模型";
ORYX.I18N.File.pdf = "当作PDF导出";
ORYX.I18N.File.pdfDesc = "当作PDF导出";
ORYX.I18N.File.info = "信息";
ORYX.I18N.File.infoDesc = "信息";
ORYX.I18N.File.genPDF = "生成 PDF";
ORYX.I18N.File.genPDFFailed = "生成 PDF 失败.";
ORYX.I18N.File.printTitle = "打印";
ORYX.I18N.File.printMsg = "我们目前遇到打印功能的问题。我们建议使用PDF导出打印的图。你真的想要继续打印?";

if(!ORYX.I18N.Grouping) ORYX.I18N.Grouping = {};

ORYX.I18N.Grouping.grouping = "分组中";
ORYX.I18N.Grouping.group = "分组";
ORYX.I18N.Grouping.groupDesc = "所有形状分组";
ORYX.I18N.Grouping.ungroup = "不分组";
ORYX.I18N.Grouping.ungroupDesc = "删除所有形状的分组";

if(!ORYX.I18N.Loading) ORYX.I18N.Loading = {};

ORYX.I18N.Loading.waiting ="请稍等...";

if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};

ORYX.I18N.PropertyWindow.name = "属性名称";
ORYX.I18N.PropertyWindow.value = "属性值";
ORYX.I18N.PropertyWindow.selected = "选择";
ORYX.I18N.PropertyWindow.clickIcon = "点击图标";
ORYX.I18N.PropertyWindow.add = "新增";
ORYX.I18N.PropertyWindow.rem = "删除";
ORYX.I18N.PropertyWindow.complex = "组合编辑框";
ORYX.I18N.PropertyWindow.text = "文本编辑框";
ORYX.I18N.PropertyWindow.ok = "确定";
ORYX.I18N.PropertyWindow.cancel = "取消";
ORYX.I18N.PropertyWindow.dateFormat = "m/d/y";

if(!ORYX.I18N.ShapeMenuPlugin) ORYX.I18N.ShapeMenuPlugin = {};

ORYX.I18N.ShapeMenuPlugin.drag = "拖拽";
ORYX.I18N.ShapeMenuPlugin.clickDrag = "点击 or 拖拽";
ORYX.I18N.ShapeMenuPlugin.morphMsg = "改变形状";

if(!ORYX.I18N.SyntaxChecker) ORYX.I18N.SyntaxChecker = {};

ORYX.I18N.SyntaxChecker.group = "验证";
ORYX.I18N.SyntaxChecker.name = "语法检查器";
ORYX.I18N.SyntaxChecker.desc = "检查语法";
ORYX.I18N.SyntaxChecker.noErrors = "没有语法错误.";
ORYX.I18N.SyntaxChecker.invalid = "无效的服务器答复.";
ORYX.I18N.SyntaxChecker.checkingMessage = "检查中 ...";

if(!ORYX.I18N.Deployer) ORYX.I18N.Deployer = {};

ORYX.I18N.Deployer.group = "部署";
ORYX.I18N.Deployer.name = "部署";
ORYX.I18N.Deployer.desc = "部署引擎";

if(!ORYX.I18N.Undo) ORYX.I18N.Undo = {};

ORYX.I18N.Undo.group = "撤销";
ORYX.I18N.Undo.undo = "撤销";
ORYX.I18N.Undo.undoDesc = "撤销上次操作";
ORYX.I18N.Undo.redo = "重做";
ORYX.I18N.Undo.redoDesc = "重做上次撤消的操作";

if(!ORYX.I18N.View) ORYX.I18N.View = {};

ORYX.I18N.View.group = "放大";
ORYX.I18N.View.zoomIn = "放大";
ORYX.I18N.View.zoomInDesc = "放大模型";
ORYX.I18N.View.zoomOut = "缩小";
ORYX.I18N.View.zoomOutDesc = "缩小模型";
ORYX.I18N.View.zoomStandard = "放大标准";
ORYX.I18N.View.zoomStandardDesc = "放大到标准值";
ORYX.I18N.View.zoomFitToModel = "放大适合的模型";
ORYX.I18N.View.zoomFitToModelDesc = "放大适合的大小";

/** New Language Properties: 08.12.2008 */

ORYX.I18N.PropertyWindow.title = "对象属性";

if(!ORYX.I18N.ShapeRepository) ORYX.I18N.ShapeRepository = {};
ORYX.I18N.ShapeRepository.title = "流程引擎对象";

ORYX.I18N.Save.dialogDesciption = "请输入模型的名称和描述.";
ORYX.I18N.Save.dialogLabelTitle = "名称";
ORYX.I18N.Save.dialogLabelDesc = "描述";
ORYX.I18N.Save.dialogLabelType = "类型";
ORYX.I18N.Save.dialogLabelComment = "修订注释";

/*Ext.MessageBox.buttonText.yes = "是";
Ext.MessageBox.buttonText.no = "否";
Ext.MessageBox.buttonText.cancel = "取消";
Ext.MessageBox.buttonText.ok = "确定";*/

if(!ORYX.I18N.Perspective) ORYX.I18N.Perspective = {};
ORYX.I18N.Perspective.no = "没有透视"
ORYX.I18N.Perspective.noTip = "卸载当前透视图"

/** New Language Properties: 21.04.2009 */
ORYX.I18N.JSONSupport = {
    imp: {
        name: "从JSON导入",
        desc: "从JSON导入模型",
        group: "导出",
        selectFile: "选择一个JSON (.json)文件或者类型为JSON的导入!",
        file: "文件",
        btnImp: "导入",
        btnClose: "关闭",
        progress: "导入中 ...",
        syntaxError: "语法错误"
    },
    exp: {
        name: "导出到 JSON",
        desc: "导出当前模型到JSON",
        group: "导出"
    }
};

/** New Language Properties: 09.05.2009 */
if(!ORYX.I18N.JSONImport) ORYX.I18N.JSONImport = {};

ORYX.I18N.JSONImport.title = "JSON 导入";
ORYX.I18N.JSONImport.wrongSS = "在加载的模型集中没有匹配({1})导入文件的模型集({0})."

/** New Language Properties: 14.05.2009 */
if(!ORYX.I18N.RDFExport) ORYX.I18N.RDFExport = {};
ORYX.I18N.RDFExport.group = "导出";
ORYX.I18N.RDFExport.rdfExport = "导出到 RDF";
ORYX.I18N.RDFExport.rdfExportDescription = "导出当前模型到 XML资源描述框架(RDF)序列定义";

/** New Language Properties: 15.05.2009*/
if(!ORYX.I18N.SyntaxChecker.BPMN) ORYX.I18N.SyntaxChecker.BPMN={};
ORYX.I18N.SyntaxChecker.BPMN_NO_SOURCE = "一条边必须有一个源码.";
ORYX.I18N.SyntaxChecker.BPMN_NO_TARGET = "一条边必须有一个对象.";
ORYX.I18N.SyntaxChecker.BPMN_DIFFERENT_PROCESS = "源和目标节点必须被包含在同一进程.";
ORYX.I18N.SyntaxChecker.BPMN_SAME_PROCESS = "源和目标节点必须包含在不同的存储池.";
ORYX.I18N.SyntaxChecker.BPMN_FLOWOBJECT_NOT_CONTAINED_IN_PROCESS = "一个流程对象必须包含在一个进程中.";
ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITHOUT_INCOMING_CONTROL_FLOW = "结束事件必须有一个进入顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "开始的事件必须有一个外向顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITH_INCOMING_CONTROL_FLOW = "开始事件不能有进入顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITH_INCOMING_CONTROL_FLOW = "附加相互影响的事件不能有进入顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "附加中间事件必须有一个向外的顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITH_OUTGOING_CONTROL_FLOW = "结束事件不能有外出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN_EVENTBASEDGATEWAY_BADCONTINUATION = "基于事件的网关必须后面不能跟网关或子过程.";
ORYX.I18N.SyntaxChecker.BPMN_NODE_NOT_ALLOWED = "节点类型是不允许.";

if(!ORYX.I18N.SyntaxChecker.IBPMN) ORYX.I18N.SyntaxChecker.IBPMN={};
ORYX.I18N.SyntaxChecker.IBPMN_NO_ROLE_SET = "相互作用必须有一个发送者和一个接收者的角色组";
ORYX.I18N.SyntaxChecker.IBPMN_NO_INCOMING_SEQFLOW = "该节点必须有进入顺序流.";
ORYX.I18N.SyntaxChecker.IBPMN_NO_OUTGOING_SEQFLOW = "该节点必须有外向顺序流.";

if(!ORYX.I18N.SyntaxChecker.InteractionNet) ORYX.I18N.SyntaxChecker.InteractionNet={};
ORYX.I18N.SyntaxChecker.InteractionNet_SENDER_NOT_SET = "没有设置发送者";
ORYX.I18N.SyntaxChecker.InteractionNet_RECEIVER_NOT_SET = "没有设置接收者";
ORYX.I18N.SyntaxChecker.InteractionNet_MESSAGETYPE_NOT_SET = "没有设置消息类型";
ORYX.I18N.SyntaxChecker.InteractionNet_ROLE_NOT_SET = "没有设置角色";

if(!ORYX.I18N.SyntaxChecker.EPC) ORYX.I18N.SyntaxChecker.EPC={};
ORYX.I18N.SyntaxChecker.EPC_NO_SOURCE = "每条边都需要有个源码.";
ORYX.I18N.SyntaxChecker.EPC_NO_TARGET = "每天变都需要有个对象.";
ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED = "节点必须连接边.";
ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED_2 = "节点必须连接更多的边.";
ORYX.I18N.SyntaxChecker.EPC_TOO_MANY_EDGES = "节点可以有多条连接边.";
ORYX.I18N.SyntaxChecker.EPC_NO_CORRECT_CONNECTOR = "节点是是不能更改的连接器.";
ORYX.I18N.SyntaxChecker.EPC_MANY_STARTS = "这里必须有且仅有一个开始事件.";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_OR = "在OR/XOR后面必须不能有有函数.";
ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_OR = "在OR/XOR后面必须不能有程序接口.";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_FUNCTION =  "一个函数之后必须是没有函数.";
ORYX.I18N.SyntaxChecker.EPC_EVENT_AFTER_EVENT =  "一个事件后必须没有事件.";
ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_FUNCTION =  "一个函数后必须没有程序接口.";
ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_PI =  "一个程序接口后必须没有函数.";
ORYX.I18N.SyntaxChecker.EPC_SOURCE_EQUALS_TARGET = "边必须连接两个不同的节点."

if(!ORYX.I18N.SyntaxChecker.PetriNet) ORYX.I18N.SyntaxChecker.PetriNet={};
ORYX.I18N.SyntaxChecker.PetriNet_NOT_BIPARTITE = "该图不是双向";
ORYX.I18N.SyntaxChecker.PetriNet_NO_LABEL = "标签不是一个标记设置转换";
ORYX.I18N.SyntaxChecker.PetriNet_NO_ID = "这个节点没有id标识";
ORYX.I18N.SyntaxChecker.PetriNet_SAME_SOURCE_AND_TARGET = "两个流的关系具有相同的源和目标";
ORYX.I18N.SyntaxChecker.PetriNet_NODE_NOT_SET = "一个节点没有设置流关系";

/** New Language Properties: 02.06.2009*/
ORYX.I18N.Edge = "边";
ORYX.I18N.Node = "节点";

/** New Language Properties: 03.06.2009*/
ORYX.I18N.SyntaxChecker.notice = "将鼠标移动到红色十字图标可查看该错误消息.";

/** New Language Properties: 05.06.2009*/
if(!ORYX.I18N.RESIZE) ORYX.I18N.RESIZE = {};
ORYX.I18N.RESIZE.tipGrow = "增加画布大小:";
ORYX.I18N.RESIZE.tipShrink = "减小画布大小:";
ORYX.I18N.RESIZE.N = "顶部";
ORYX.I18N.RESIZE.W = "左边";
ORYX.I18N.RESIZE.S ="底部";
ORYX.I18N.RESIZE.E ="右边";

/** New Language Properties: 15.07.2009*/
if(!ORYX.I18N.Layouting) ORYX.I18N.Layouting ={};
ORYX.I18N.Layouting.doing = "布局中...";

/** New Language Properties: 18.08.2009*/
ORYX.I18N.SyntaxChecker.MULT_ERRORS = "多个错误";

/** New Language Properties: 08.09.2009*/
if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};
ORYX.I18N.PropertyWindow.oftenUsed = "常用";
ORYX.I18N.PropertyWindow.moreProps = "更多属性";

/** New Language Properties 01.10.2009 */
if(!ORYX.I18N.SyntaxChecker.BPMN2) ORYX.I18N.SyntaxChecker.BPMN2 = {};

ORYX.I18N.SyntaxChecker.BPMN2_DATA_INPUT_WITH_INCOMING_DATA_ASSOCIATION = "数据输入不能有任何传入数据关联.";
ORYX.I18N.SyntaxChecker.BPMN2_DATA_OUTPUT_WITH_OUTGOING_DATA_ASSOCIATION = "数据输出不能有任何传出数据关联.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_TARGET_WITH_TOO_MANY_INCOMING_SEQUENCE_FLOWS = "基于事件的网关的目标只能有一个进入顺序流.";

/** New Language Properties 02.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_OUTGOING_SEQUENCE_FLOWS = "基于事件的网关必须有两个或两个以上外出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_EVENT_TARGET_CONTRADICTION = "如果消息中级事件是在配置中使用，然后领取任务不得使用，反之亦然.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_TRIGGER = "只有以下中级事件触发器是有效的：消息，信号，定时器，条件.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_CONDITION_EXPRESSION = "事件网关的外出顺序流不能有一个条件表达式.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_NOT_INSTANTIATING = "网关不符合条件的实例化过程。请使用一个启动事件或实例化属性的网关.";

/** New Language Properties 05.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_MIXED_FAILURE = "网关必须同时具有多个输入和输出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_CONVERGING_FAILURE = "网关必须拥有多个进入，但大多数不会有多个外出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_DIVERGING_FAILURE = "网关不能有多个传入，但必须有多个外出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN2_GATEWAY_WITH_NO_OUTGOING_SEQUENCE_FLOW = "网关必须至少有一个外出顺序流.";
ORYX.I18N.SyntaxChecker.BPMN2_RECEIVE_TASK_WITH_ATTACHED_EVENT = "在事件网关的配置使用，领取任务不能有任何附加的中间事件.";
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_SUBPROCESS_BAD_CONNECTION = "事件子过程不能有任何输入或输出顺序流.";

/** New Language Properties 13.10.2009 */
ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_CONNECTED = "在消息流中的至少一个侧必须连接.";

/** New Language Properties 24.11.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_MESSAGES = "编排活动只能有一个启动消息.";
ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_ALLOWED = "消息流是不允许在这里.";

/** New Language Properties 27.11.2009 */
ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_INCOMING_SEQUENCE_FLOWS = "基于事件的网关未实例化必须有最少一个进入顺序流的.";
ORYX.I18N.SyntaxChecker.BPMN2_TOO_FEW_INITIATING_PARTICIPANTS = "编排活动必须有一个发起参与者（白色）.";
ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_PARTICIPANTS = "编排活性机制不能有一个以上的发起参与者（白色）."

ORYX.I18N.SyntaxChecker.COMMUNICATION_AT_LEAST_TWO_PARTICIPANTS = "通信必须连接到至少两个参与者.";
ORYX.I18N.SyntaxChecker.MESSAGEFLOW_START_MUST_BE_PARTICIPANT = "该消息流的源必须是一个参与者.";
ORYX.I18N.SyntaxChecker.MESSAGEFLOW_END_MUST_BE_PARTICIPANT = "该消息流的对象必须是参与者.";
ORYX.I18N.SyntaxChecker.CONV_LINK_CANNOT_CONNECT_CONV_NODES = "会话的链接必须连接一个参与者​​通信或子节点对话.";
