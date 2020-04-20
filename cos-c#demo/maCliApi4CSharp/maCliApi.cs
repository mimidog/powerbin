using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;

namespace macli
{
    // 通信包头字段域定义
    public enum MACLI_HEAD_FID
    {
        PKT_LEN         = 0,
        PKT_CRC         = 1,
        PKT_ID          = 2,
        PKT_VER         = 3,
        PKT_TYPE        = 4,
        MSG_TYPE        = 5,
        RESEND_FLAG     = 6,
        TIMESTAMP       = 7,
        MSG_ID          = 8,
        CORR_ID         = 9,
        MSG_INDEX       = 10,
        FUNC_ID         = 11,
        SRC_NODE        = 12,
        DEST_NODE       = 13,
        PAGE_FLAG       = 14,
        PAGE_NO         = 15,
        PAGE_CNT        = 16,
        BODY_LEN        = 21,
        PKT_HEAD_END    = 25,
        PKT_HEAD_LEN    = 35,
        PKT_HEAD_MSG    = 41,
        PKT_BODY_MSG    = 42,
        PKT_MSG         = 43,
        FUNC_TYPE       = 1052672,
        BIZ_CHANNEL     = 1052674,
        TOKEN_FLAG      = 1069056,
        PUB_TOPIC       = 1073152,
        USER_SESSION    = 1871872
    }

    // 选项索引
    public enum MACLI_OPTION
    {
        CONNECT_PARAM       = 1,
        SYNCCALL_TIMEOUT    = 2,
        ASYNCALL_TIMEOUT    = 3,
        WRITELOG_LEVEL      = 4,
        WRITELOG_PATH       = 5,
        WRITELOG_SIZE       = 6,
        WRITELOG_TIME       = 7,
        WRITELOG_MODE       = 8,
        SSL_CONNECTION      = 9,
        LIP_ADDR            = 10,
        MAC_ADDR            = 11,
        APP_NAME            = 12,
        HD_ID               = 13,
        CPU_INFO            = 14,
        CPU_ID              = 15,
        PC_NAME             = 16,
        HD_PART             = 17,
        SYS_VOL             = 18,
        OS_VER              = 19,
        SIP_ADDR            = 20,
    }

    // 日志模式定义
    public enum MACLI_WRITELOG_MODE
    {
        LOOP    = 0,
        FORWARD = 1
    }

    // 日志级别定义
    public enum MACLI_WRITELOG_LEVEL
    {
        NOLOG       = 0,
        ALLLOG      = 63,
        DEBUG       = 1,
        INFO        = 2,
        WARN        = 4,
        ERROR       = 8,
        FATAL       = 16,
        IMPORTANT   = 32
    }

    // 通信类型定义
    public enum MACLI_COMM_TYPE
    {
        KCXP    = 1,
        ZMQ     = 2,
        SOCKET  = 3,
        SHM     = 4
    }

    // 字符串长度定义
    public enum MACLI_SIZE
    {
        SERVERNAME_MAX  = 32,
        ADRRESS_MAX     = 128,
        PROXY_MAX       = 128,
        SSL_MAX         = 256,
        MSG_ID_SIZE     = 32,
        TOPIC_MAX       = 12,
        TERM_CODE       = 32,
        USERDATA_MAX    = 256,
        USERINFO_MAX    = 64,
        FUNC_ID_SIZE    = 8,
        PUB_TOPIC_SIZE  = 12
    }

    // 常用功能定义
    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct MA_FUNC
    {
        public const string SUBSCRIBE       = "00102012";
        public const string UNSUBSCRIBE     = "00102013";
        public const string PUB_CONTENT     = "00102020";
        public const string LOGIN_API       = "10301105";
        public const string LOGIN_ACCREDIT  = "10301104";
    }
    
    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_CONNECT_OPTION
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szServerName;             //服务器别名
        public int nCommType;                   //通信类型：1-KCXP 2-0MQ 3-SOCKET 4-SHM
        public int nProtocal;                   //通信协议：1-TCP 2-UDP 3-EPGM 4-IPC

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szSvrAddress;             //服务器地址
        public int nSvrPort;                    //服务器端口

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szLocalAddress;           //本地地址
        public int nLocalPort;                  //本地端口

        public int nReqId;                      //请求标识：通信类型为4-SHM时为请求队列编号
        public int nAnsId;                      //应答标识：通信类型为4-SHM时为应答队列编号

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szSubId;                  //订阅标识: 通信类型为KCXP时为订阅队列

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.PROXY_MAX + 1)]
        public string szProxy;                  //代理服务器(保留)
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SSL_MAX + 1)]
        public string szSSL;                    //SSL(保留)
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.TERM_CODE + 1)]
        public string szTermCode;               //终端特征码

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szReqName;                //通信类型为4-SHM时填写共享内存请求队列名称
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szAnsName;                //通信类型为4-SHM时填写共享内存应答队列名称
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szReqConnstr;             //通信类型为4-SHM时填写共享内存请求队列连接串, 例如IPC/@@IP
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szAnsConnstr;             //通信类型为4-SHM时填写共享内存应答队列连接串

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szMonitorReqName;         //监听请求队列名称
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.SERVERNAME_MAX + 1)]
        public string szMonitorAnsName;         //监听应答队列名称
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szMonitorReqConnstr;      //监听请求队列连接串, 例如IPC/@@IP
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szMonitorAnsConnstr;      //监听应答队列连接串

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.ADRRESS_MAX + 1)]
        public string szSocketSubConnstr;       //SOCKET订阅队列连接串

        public int nReqMaxDepth;                //通信类型为4-SHM时填写共享内存请求队列最大深度
        public int nAnsMaxDepth;                //通信类型为4-SHM时填写共享内存应答队列最大深度
    }

    public delegate void MACLI_NOTIFY(IntPtr id, IntPtr buff, int len);

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_ARCALLBACK
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.FUNC_ID_SIZE + 1)]
        public string strFuncId;            //功能号
        public MACLI_NOTIFY fnCallback;     //异步应答委托
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_PSCALLBACK
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.TOPIC_MAX + 1)]
        public string strTopic;             //主题
        public MACLI_NOTIFY fnCallback;     //发布内容委托
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_USERINFO
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERINFO_MAX + 1)]
        public string strServerName;    //连接名称

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERINFO_MAX + 1)]
        public string strUserId;        //用户名

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERINFO_MAX + 1)]
        public string strPassword;      //密码

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERINFO_MAX + 1)]
        public string strAppId;         //APP标识

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERINFO_MAX + 1)]
        public string strAuthCode;      //认证码  
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_SYNCCALL
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.FUNC_ID_SIZE + 1)]
        public string strFuncId;        //功能号
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.MSG_ID_SIZE + 1)]
        public string strMsgId;         //消息ID
        public int nTimeout;            //调用超时
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData1;     //用户数据1
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData2;     //用户数据2
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_ASYNCALL
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.FUNC_ID_SIZE + 1)]
        public string strFuncId;        //功能号
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.MSG_ID_SIZE + 1)]
        public string strMsgId;         //消息ID
        public int nTimeout;            //调用超时
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData1;     //用户数据1
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData2;     //用户数据2
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct ST_MACLI_PUBCALL
    {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.PUB_TOPIC_SIZE + 1)]
        public string strTopic;         //主题
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.MSG_ID_SIZE + 1)]
        public string strAcceptSn;      //订阅受理号
        public int nTimeout;            //调用超时
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData1;     //用户数据1
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = (int)MACLI_SIZE.USERDATA_MAX + 1)]
        public string strUserData2;     //用户数据2
    }

    public class maCliApi
    {
        // 初始化/清理
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Init")]
        public static extern int maCli_Init(ref IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Exit")]
        public static extern int maCli_Exit(IntPtr Handle);

        //版本/参数
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetVersion")]
        public static extern int maCli_GetVersion(IntPtr Handle, IntPtr Version, int VerSize);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetOptions")]
        public static extern int maCli_GetOptions(IntPtr Handle, int OptionIdx, IntPtr ValuePtr, int ValueSize);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetOptions")]
        public static extern int maCli_SetOptions(IntPtr Handle, int OptionIdx, IntPtr ValuePtr, int ValueSize);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetArCallback")]
        public static extern int maCli_SetArCallback(IntPtr Handle, ref ST_MACLI_ARCALLBACK ArCallback);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetArCallback")]
        public static extern int maCli_SetArCallback(IntPtr Handle, IntPtr ArCallbackArCallback);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetPsCallback")]
        public static extern int maCli_SetPsCallback(IntPtr Handle, ref ST_MACLI_PSCALLBACK PsCallback);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetPsCallback")]
        public static extern int maCli_SetPsCallback(IntPtr Handle, IntPtr PsCallback);

        //连接
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Open")]
        public static extern int maCli_Open(IntPtr Handle, ref ST_MACLI_USERINFO UserInfo);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_MonitorOpen")]
        public static extern int maCli_MonitorOpen(IntPtr Handle, ref ST_MACLI_USERINFO UserInfo);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Close")]
        public static extern int maCli_Close(IntPtr Handle);

        //调用1
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SyncCall")]
        public static extern int maCli_SyncCall(IntPtr Handle, ref ST_MACLI_SYNCCALL SyncCall);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynCall")]
        public static extern int maCli_AsynCall(IntPtr Handle, ref ST_MACLI_ASYNCALL AsynCall);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynGetReply")]
        public static extern int maCli_AsynGetReply(IntPtr Handle, out ST_MACLI_ASYNCALL AsynCall);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetPsContent")]
        public static extern int maCli_GetPsContent(IntPtr Handle, out ST_MACLI_PUBCALL PubCall);

        //调用2
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SyncCall2")]
        public static extern int maCli_SyncCall2(IntPtr Handle, ref ST_MACLI_SYNCCALL SyncCall,
            IntPtr ReqData, int ReqDataLen, out IntPtr AnsData, out int AnsDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynCall2")]
        public static extern int maCli_AsynCall2(IntPtr Handle, ref ST_MACLI_ASYNCALL AsynCall,
            IntPtr ReqData, int ReqDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynGetReply2")]
        public static extern int maCli_AsynGetReply2(IntPtr Handle, out ST_MACLI_ASYNCALL AsynCall,
            out IntPtr AnsData, out int AnsDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetPsContent2")]
        public static extern int maCli_GetPsContent2(IntPtr Handle, out ST_MACLI_PUBCALL PubCall,
            out IntPtr PubData, out int PubDataLen);

        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynMonitorCall2")]
        public static extern int maCli_AsynMonitorCall2(IntPtr Handle, ref ST_MACLI_ASYNCALL AsynCall,
            byte[] ReqData, int ReqDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AsynMonitorGetReply2")]
        public static extern int maCli_AsynMonitorGetReply2(IntPtr Handle, ref ST_MACLI_ASYNCALL AsynCall,
            out IntPtr AnsData, out int AnsDataLen);

        //组包(请求)
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Make")]
        public static extern int maCli_Make(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_BeginWrite")]
        public static extern int maCli_BeginWrite(IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_EndWrite")]
        public static extern int maCli_EndWrite(IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_CreateTable")]
        public static extern int maCli_CreateTable(IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_AddRow")]
        public static extern int maCli_AddRow(IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SaveRow")]
        public static extern int maCli_SaveRow(IntPtr Handle);

        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValue")]
        public static extern int maCli_SetHdrValue(IntPtr Handle, IntPtr Value, int ValLen, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueS")]
        public static extern int maCli_SetHdrValueS(IntPtr Handle, IntPtr Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueS")]
        public static extern int maCli_SetHdrValueS(IntPtr Handle, string Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueN")]
        public static extern int maCli_SetHdrValueN(IntPtr Handle, int Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueC")]
        public static extern int maCli_SetHdrValueC(IntPtr Handle, byte Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueD")]
        public static extern int maCli_SetHdrValueD(IntPtr Handle, double Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetHdrValueL")]
        public static extern int maCli_SetHdrValueL(IntPtr Handle, long Value, int FieldIdx);

        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValue")]
        public static extern int maCli_SetValue(IntPtr Handle, IntPtr Value, int ValLen, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValueS")]
        public static extern int maCli_SetValueS(IntPtr Handle, string Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValueN")]
        public static extern int maCli_SetValueN(IntPtr Handle, int Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValueC")]
        public static extern int maCli_SetValueC(IntPtr Handle, byte Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValueD")]
        public static extern int maCli_SetValueD(IntPtr Handle, double Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_SetValueL")]
        public static extern int maCli_SetValueL(IntPtr Handle, long Value, string FieldIdx);
        
        //解包(应答)
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_Parse")]
        public static extern int maCli_Parse(IntPtr Handle, IntPtr AnsData, int AnsDataLen);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetTableCount")]
        public static extern int maCli_GetTableCount(IntPtr Handle, out int TableCount);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_OpenTable")]
        public static extern int maCli_OpenTable(IntPtr Handle, int TableIndex);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetRowCount")]
        public static extern int maCli_GetRowCount(IntPtr Handle, out int RowCount);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_ReadRow")]
        public static extern int maCli_ReadRow(IntPtr Handle, int RowIndex);

        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValue")]
        public static extern int maCli_GetHdrValue(IntPtr Handle, IntPtr Value, int ValSize, ref int ValLen, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValueS")]
        public static extern int maCli_GetHdrValueS(IntPtr Handle, IntPtr Value, int ValSize, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValueN")]
        public static extern int maCli_GetHdrValueN(IntPtr Handle, ref int Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValueC")]
        public static extern int maCli_GetHdrValueC(IntPtr Handle, ref char Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValueD")]
        public static extern int maCli_GetHdrValueD(IntPtr Handle, ref double Value, int FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetHdrValueL")]
        public static extern int maCli_GetHdrValueL(IntPtr Handle, ref long Value, int FieldIdx);

        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValue")]
        public static extern int maCli_GetValue(IntPtr Handle, IntPtr Value, int ValSize, out IntPtr ValLen, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValueS")]
        public static extern int maCli_GetValueS(IntPtr Handle, IntPtr Value, int ValSize, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValueN")]
        public static extern int maCli_GetValueN(IntPtr Handle, ref int Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValueC")]
        public static extern int maCli_GetValueC(IntPtr Handle, ref byte Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValueD")]
        public static extern int maCli_GetValueD(IntPtr Handle, ref double Value, string FieldIdx);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetValueL")]
        public static extern int maCli_GetValueL(IntPtr Handle, ref long Value, string FieldIdx);

        //辅助
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetUuid")]
        public static extern int maCli_GetUuid(IntPtr Handle, IntPtr Uuid, int UuidSize);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_RestorePsList")]
        public static extern int maCli_RestorePsList(IntPtr Handle);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetLastErrorCode")]
        public static extern int maCli_GetLastErrorCode(IntPtr Handle, out int ErrorCode);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetLastErrorMsg")]
        public static extern int maCli_GetLastErrorMsg(IntPtr Handle, IntPtr ErrorMsg, int MsgSize);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_ComEncrypt")]
        public static extern int maCli_ComEncrypt(IntPtr Handle, IntPtr Output, int Size, string Input, string Key);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_ComDecrypt")]
        public static extern int maCli_ComDecrypt(IntPtr Handle, IntPtr Output, int Size, string Input, string Key);
        //增加IP和MAC获取
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetConnIpAddr")]
        public static extern int maCli_GetConnIpAddr(IntPtr Handle, IntPtr IpAddr, int Size);
        [DllImport("maCliApi.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall, EntryPoint = "maCli_GetConnMac")]
        public static extern int maCli_GetConnMac(IntPtr Handle, IntPtr Mac, int Size);

    }
}
