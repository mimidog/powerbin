ORYX.I18N.PropertyWindow.dateFormat = "d/m/y";

ORYX.I18N.View.East = "对象属性";
ORYX.I18N.View.West = "流程引擎对象";

ORYX.I18N.Oryx.title	= "Signavio";
ORYX.I18N.Oryx.pleaseWait = "流程编辑器正在加载，请稍等...";
ORYX.I18N.Edit.cutDesc = "剪切选择到剪贴板";
ORYX.I18N.Edit.copyDesc = "复制选择到剪贴板";
ORYX.I18N.Edit.pasteDesc = "粘贴剪贴板到画布";
ORYX.I18N.ERDFSupport.noCanvas = "xml文档不包含画布节点!";
ORYX.I18N.ERDFSupport.noSS = "流程编辑器画布节点不包含模板定义!";
ORYX.I18N.ERDFSupport.deprText = "导出到ERDF不推荐了，因为支持将在Signavio中提供支持流程编辑器的未来版本将停止。如果可能的话，将模型导出为JSON。你还想要导出吗？";
ORYX.I18N.Save.pleaseWait = "请稍等<br/>正在保存...";

ORYX.I18N.Save.saveAs = "保存一个副本...";
ORYX.I18N.Save.saveAsDesc = "保存一个副本...";
ORYX.I18N.Save.saveAsTitle = "保存一个副本...";
ORYX.I18N.Save.savedAs = "保存副本";
ORYX.I18N.Save.savedDescription = "该程序图保存下";
ORYX.I18N.Save.notAuthorized = "你目前尚未登录. 请在一个新的窗口<a href='/p/login' target='_blank'>登录</a>，以便您可以保存当前图."
ORYX.I18N.Save.transAborted = "保存请求的时间太长。您可以使用更快的互联网连接。如果使用无线LAN时，请检查您的连接强度.";
ORYX.I18N.Save.noRights = "您没有所需的权限存储该模型., 如果你仍然要在目标目录中的写权限，请在<a href='/p/explorer' target='_blank'>Signavio 浏览器</a>检查.";
ORYX.I18N.Save.comFailed = "与Signavio中提供支持服务器的通信失败。请检查您的互联网连接。如果问题仍然存在，请通过工具栏中的信封符号联系Signavio提供支持.";
ORYX.I18N.Save.failed = "尝试保存时候出现了错误。请再试一次。如果问题仍然存在，请通过工具栏中的信封符号联系Signavio中提供支持.";
ORYX.I18N.Save.exception = "在试图保存时引发一些异常。请再试一次。如果问题仍然存在，请通过工具栏中的信封符号联系Signavio中提供支持.";
ORYX.I18N.Save.retrieveData = "数据获取，请稍候...";

/** New Language Properties: 10.6.09*/
if(!ORYX.I18N.ShapeMenuPlugin) ORYX.I18N.ShapeMenuPlugin = {};
ORYX.I18N.ShapeMenuPlugin.morphMsg = "转换形状";
ORYX.I18N.ShapeMenuPlugin.morphWarningTitleMsg = "转换形状";
ORYX.I18N.ShapeMenuPlugin.morphWarningMsg = "这个子形状中不包含转换元素.<br/>你还想要转换吗？";

if (!Signavio) { var Signavio = {}; }
if (!Signavio.I18N) { Signavio.I18N = {} }
if (!Signavio.I18N.Editor) { Signavio.I18N.Editor = {} }

if (!Signavio.I18N.Editor.Linking) { Signavio.I18N.Editor.Linking = {} }
Signavio.I18N.Editor.Linking.CreateDiagram = "创建一个新流程图";
Signavio.I18N.Editor.Linking.UseDiagram = "使用已存在的流程图";
Signavio.I18N.Editor.Linking.UseLink = "使用网络连接";
Signavio.I18N.Editor.Linking.Close = "关闭";
Signavio.I18N.Editor.Linking.Cancel = "取消";
Signavio.I18N.Editor.Linking.UseName = "采取流程图名称";
Signavio.I18N.Editor.Linking.UseNameHint = "取代了建模元素的当前名称（{类型}）与链接流程图的名称.";
Signavio.I18N.Editor.Linking.CreateTitle = "建立链接";
Signavio.I18N.Editor.Linking.AlertSelectModel = "你必须选择一个模型.";
Signavio.I18N.Editor.Linking.ButtonLink = "链接流程图";
Signavio.I18N.Editor.Linking.LinkNoAccess = "你没有这个流程图的访问权限.";
Signavio.I18N.Editor.Linking.LinkUnavailable = "这个流程图是不可用的.";
Signavio.I18N.Editor.Linking.RemoveLink = "删除链接";
Signavio.I18N.Editor.Linking.EditLink = "编辑链接";
Signavio.I18N.Editor.Linking.OpenLink = "打开";
Signavio.I18N.Editor.Linking.BrokenLink = "该链接坏了!";
Signavio.I18N.Editor.Linking.PreviewTitle = "预览";

if(!Signavio.I18N.Glossary_Support) { Signavio.I18N.Glossary_Support = {}; }
Signavio.I18N.Glossary_Support.renameEmpty = "没有字典项";
Signavio.I18N.Glossary_Support.renameLoading = "搜索...";

/** New Language Properties: 08.09.2009*/
if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};
ORYX.I18N.PropertyWindow.oftenUsed = "主要属性";
ORYX.I18N.PropertyWindow.moreProps = "更多属性";

ORYX.I18N.PropertyWindow.btnOpen = "打开";
ORYX.I18N.PropertyWindow.btnRemove = "删除";
ORYX.I18N.PropertyWindow.btnEdit = "编辑";
ORYX.I18N.PropertyWindow.btnUp = "上移";
ORYX.I18N.PropertyWindow.btnDown = "下移";
ORYX.I18N.PropertyWindow.createNew = "新创建";

if(!ORYX.I18N.PropertyWindow) ORYX.I18N.PropertyWindow = {};
ORYX.I18N.PropertyWindow.oftenUsed = "基础属性";
ORYX.I18N.PropertyWindow.moreProps = "扩展属性";
ORYX.I18N.PropertyWindow.characteristicNr = "成本放大器; 资源分析";
ORYX.I18N.PropertyWindow.meta = "自定义属性";

if(!ORYX.I18N.PropertyWindow.Category){ORYX.I18N.PropertyWindow.Category = {}}
ORYX.I18N.PropertyWindow.Category.popular = "主要属性";
ORYX.I18N.PropertyWindow.Category.characteristicnr = "成本放大器; 资源分析";
ORYX.I18N.PropertyWindow.Category.others = "主要属性";
ORYX.I18N.PropertyWindow.Category.meta = "自定义属性";

if(!ORYX.I18N.PropertyWindow.ListView) ORYX.I18N.PropertyWindow.ListView = {};
ORYX.I18N.PropertyWindow.ListView.title = "编辑: ";
ORYX.I18N.PropertyWindow.ListView.dataViewLabel = "已经存在的项目.";
ORYX.I18N.PropertyWindow.ListView.dataViewEmptyText = "没有列表项目.";
ORYX.I18N.PropertyWindow.ListView.addEntryLabel = "增加新的项目";
ORYX.I18N.PropertyWindow.ListView.buttonAdd = "添加";
ORYX.I18N.PropertyWindow.ListView.save = "保存";
ORYX.I18N.PropertyWindow.ListView.cancel = "取消";

if(!Signavio.I18N.Buttons) Signavio.I18N.Buttons = {};
Signavio.I18N.Buttons.save		= "保存";
Signavio.I18N.Buttons.cancel 	= "取消";
Signavio.I18N.Buttons.remove	= "删除";

if(!Signavio.I18N.btn) {Signavio.I18N.btn = {};}
Signavio.I18N.btn.btnEdit = "编辑";
Signavio.I18N.btn.btnRemove = "删除";
Signavio.I18N.btn.moveUp = "上移";
Signavio.I18N.btn.moveDown = "下移";

if(!Signavio.I18N.field) {Signavio.I18N.field = {};}
Signavio.I18N.field.Url = "URL";
Signavio.I18N.field.UrlLabel = "Label";
