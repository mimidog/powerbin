// 文件描述：期权API功能封装
//--------------------------------------------------------------------------------------------------
// 修改日期      版本          作者            备注
//--------------------------------------------------------------------------------------------------
// 2020/6/18    001.000.001  SHENGHB          创建
//--------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace macli
{
    class optFunc
    {
        public static byte[] StructureToByte<T>(T structure)
        {
            int size = Marshal.SizeOf(typeof(T));
            byte[] buffer = new byte[size];
            IntPtr bufferIntPtr = Marshal.AllocHGlobal(size);
            try
            {
                Marshal.StructureToPtr(structure, bufferIntPtr, true);
                Marshal.Copy(bufferIntPtr, buffer, 0, size);
            }
            finally
            {
                Marshal.FreeHGlobal(bufferIntPtr);
            }
            return buffer;
        }

        public static T ByteToStructure<T>(byte[] dataBuffer)
        {
            object structure = null;
            int size = Marshal.SizeOf(typeof(T));
            IntPtr allocIntPtr = Marshal.AllocHGlobal(size);
            try
            {
                Marshal.Copy(dataBuffer, 0, allocIntPtr, size);
                structure = Marshal.PtrToStructure(allocIntPtr, typeof(T));
            }
            finally
            {
                Marshal.FreeHGlobal(allocIntPtr);
            }
            return (T)structure;
        }

        public static byte[] charToByte(char ch)
        {
            byte[] bt = new byte[2];
            bt[0] = (byte)((ch & 0xFF00) >> 8);
            bt[1] = (byte)(ch & 0xFF);
            return bt;
        }

        //错误信息分类
        public static void ShowErrorInfo(int iRetCode)
        {
            Console.WriteLine("错误码:%d;  错误信息:", iRetCode);
            switch (iRetCode)
            {
                case -3:
                    Console.WriteLine("invalid parameter");
                    break;
                case -2:
                    Console.WriteLine("invalid handle");
                    break;
                case 100:
                    Console.WriteLine("no data");
                    break;
                case 101:
                    Console.WriteLine("timeout");
                    break;
                case 102:
                    Console.WriteLine("exists");
                    break;
                case 103:
                    Console.WriteLine("more data");
                    break;
                case 500:
                    Console.WriteLine("call object function failed");
                    break;
                case 501:
                    Console.WriteLine("create object failed");
                    break;
                case 502:
                    Console.WriteLine("initialize object failed ");
                    break;
                case 503:
                    Console.WriteLine("object uninitiated");
                    break;
                case 504:
                    Console.WriteLine("create resource failed");
                    break;
                case 505:
                    Console.WriteLine("dispatch event failed");
                    break;
                case 506:
                    Console.WriteLine("event  undefined ");
                    break;
                case 507:
                    Console.WriteLine("register event {@1} from {@2} failed");
                    break;
                case 508:
                    Console.WriteLine("startup service {@1} failed");
                    break;
                case 509:
                    Console.WriteLine("init service env {@1} failed");
                    break;
                case 510:
                    Console.WriteLine("kernel/service env {@1} invalid");
                    break;
                case 511:
                    Console.WriteLine("service {@1} status not expect");
                    break;
                case 512:
                    Console.WriteLine("open internal queue {@1} failed");
                    break;
                case 513:
                    Console.WriteLine("open internal queue {@1} failed");
                    break;
                case 514:
                    Console.WriteLine("invalid message queue");
                    break;
                case 515:
                    Console.WriteLine("xml file {@1} format invalid");
                    break;
                case 516:
                    Console.WriteLine("open runtimedb {@1} failed");
                    break;
                case 517:
                    Console.WriteLine("create or initialize service function {@1}:{@2} fail ");
                    break;
                case 518:
                    Console.WriteLine("option {@2} read only");
                    break;
                case 519:
                    Console.WriteLine("option {@2} unsupported ");
                    break;
                case 520:
                    Console.WriteLine("purpose access {@2},but not granted");
                    break;
                case 521:
                    Console.WriteLine("queue {@1} fulled, max depth");
                    break;
                case 522:
                    Console.WriteLine("xa {@1} undefined");
                    break;
                case 523:
                    Console.WriteLine("call biz function {@1} exception");
                    break;
                case 524:
                    Console.WriteLine("timer {@1} callback failed, return");
                    break;
                case 525:
                    Console.WriteLine("filter expression {@1} invalid");
                    break;
                case 526:
                    Console.WriteLine("oem {@1} illegal");
                    break;
                case 1000:
                    Console.WriteLine("API基本错误");
                    break;
                case 1001:
                    Console.WriteLine("DLL缺失");
                    break;
                case 1002:
                    Console.WriteLine("DLL初始化失败(版本不对)");
                    break;
                case 1003:
                    Console.WriteLine("API实例已存在");
                    break;
                case 1101:
                    Console.WriteLine("insufficient space expect");
                    break;
                case 1102:
                    Console.WriteLine("receive packet from {@1} failed");
                    break;
                case 1103:
                    Console.WriteLine("send packet to {@1} failed");
                    break;
                case 1104:
                    Console.WriteLine("connect to {@1} failed");
                    break;
                case 1105:
                    Console.WriteLine("reconnect failed in function");
                    break;
                case 1106:
                    Console.WriteLine("reconnect {@1} success");
                    break;
                case 1107:
                    Console.WriteLine("disconnect");
                    break;
                case 1100:
                    Console.WriteLine("call zmq api {@2} failed");
                    break;
                case 1200:
                    Console.WriteLine("MA_ERROR_DB_EXCEPTION");
                    break;
                case 1201:
                    Console.WriteLine("data {@1} unload");
                    break;
                case 1202:
                    Console.WriteLine("table {@1} cursor {@2} has already opened");
                    break;
                case 1203:
                    Console.WriteLine("table {@1} cursor {@2} not opened");
                    break;
                case 1204:
                    Console.WriteLine("database {@1} not opened");
                    break;
                case 1205:
                    Console.WriteLine("invalid database connect string");
                    break;
                case 1250:
                    Console.WriteLine("MA_ERROR_DAO_EXCEPTION");
                    break;
                case 1500:
                    Console.WriteLine("call fix api {@2} failed");
                    break;
                case 1501:
                    Console.WriteLine("fix parse from {@1} failed");
                    break;
                case 1502:
                    Console.WriteLine("call kcbp api {@2} failed");
                    break;
                case 1503:
                    Console.WriteLine("invalid packet {@2} failed");
                    break;
                case 1504:
                    Console.WriteLine("call json api {@2} failed");
                    break;
                case 1600:
                    Console.WriteLine("call kcxp api {@2} failed");
                    break;
                case 2000:
                    Console.WriteLine("API套接字错误");
                    break;
                case 2001:
                    Console.WriteLine("客户端连接失败(请检查连接参数与服务器是否开启)");
                    break;
                case 2002:
                    Console.WriteLine("服务器创建失败");
                    break;
                case 3000:
                    Console.WriteLine("API配置错误");
                    break;
                case 3001:
                    Console.WriteLine("GTU节点配置文件错误");
                    break;
                default:
                    Console.WriteLine("尚无详细信息");
                    break;

            }
        }

        public static int RetCode = 0;
        public static int size = 0;
        public static LoginInfo stLoginInfo = new LoginInfo( "0", "0", "0", 0x00, "0", 0, "o", "", "", ""); //用于缓存登录信息
        public static ReqClientField stClientInfo = new ReqClientField("", "", "", "", "", "", "", "", "", ""); //缓存终端信息

        public static void OnRecvPs(IntPtr id, IntPtr buff, int len) //订阅主题推送
        {
            IntPtr Handle = IntPtr.Zero;
            RetCode = maCliApi.maCli_Init(ref Handle);
            RetCode = maCliApi.maCli_Parse(Handle, buff, len);

            IntPtr Buf = Marshal.AllocHGlobal(256);
            IntPtr FuncIdPtr = Marshal.AllocHGlobal(16 + 1);
            maCliApi.maCli_GetHdrValueS(Handle, FuncIdPtr, 16, (int)MACLI_HEAD_FID.FUNC_ID);
            string FuncId = Marshal.PtrToStringAnsi(FuncIdPtr);
            Console.WriteLine(DateTime.Now.ToString());
            if (FuncId == "00102023")
            {
                //交易成交推送 MATCH+XX
                RtnOrderField FieldData = new RtnOrderField();
                maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdCodeCls, "TRD_CODE_CLS");
                FieldData.MatchedSn = _maCli_GetValueS(Handle, Buf, 64, "MATCHED_SN");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "STKEX");
                FieldData.StkCode = _maCli_GetValueS(Handle, Buf, 64, "STK_CODE");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "ORDER_NO");
                FieldData.OrderId = _maCli_GetValueS(Handle, Buf, 64, "ORDER_ID");
                FieldData.Trdacct = _maCli_GetValueS(Handle, Buf, 64, "TRDACCT");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.MatchedQty, "MATCHED_QTY");
                FieldData.MatchedPrice = _maCli_GetValueS(Handle, Buf, 64, "MATCHED_PRICE");
                FieldData.OrderFrzAmt = _maCli_GetValueS(Handle, Buf, 64, "ORDER_FRZ_AMT");
                FieldData.RltSettAmt = _maCli_GetValueS(Handle, Buf, 64, "RLT_SETT_AMT");
                FieldData.FundAvl = _maCli_GetValueS(Handle, Buf, 64, "FUND_AVL");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.StkAvl, "STK_AVL");
                FieldData.OpptStkpbu = _maCli_GetValueS(Handle, Buf, 64, "OPPT_STKPBU");
                FieldData.OpptTrdacct = _maCli_GetValueS(Handle, Buf, 64, "OPPT_TRDACCT");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.MatchedDate, "MATCHED_DATE");
                FieldData.MatchedTime = _maCli_GetValueS(Handle, Buf, 64, "MATCHED_TIME");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "IS_WITHDRAW");
                FieldData.CustCode = _maCli_GetValueS(Handle, Buf, 64, "CUST_CODE");
                FieldData.CuacctCode = _maCli_GetValueS(Handle, Buf, 64, "CUACCT_CODE");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "ORDER_BSN");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "CUACCT_SN");
                FieldData.Stkbd = _maCli_GetValueS(Handle, Buf, 64, "STKBD");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.MatchedType, "MATCHED_TYPE");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "ORDER_STATUS");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "STK_BIZ");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "STK_BIZ_ACTION");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "ORDER_DATE");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderSn, "ORDER_SN");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "INT_ORG");
                FieldData.Stkpbu = _maCli_GetValueS(Handle, Buf, 64, "STKPBU");
                FieldData.SubacctCode = _maCli_GetValueS(Handle, Buf, 64, "SUBACCT_CODE");
                FieldData.OptTrdacct = _maCli_GetValueS(Handle, Buf, 64, "OPT_TRDACCT");
                FieldData.OwnerType = _maCli_GetValueS(Handle, Buf, 64, "OWNER_TYPE");
                FieldData.OptCode = _maCli_GetValueS(Handle, Buf, 64, "OPT_CODE");
                FieldData.OptName = _maCli_GetValueS(Handle, Buf, 64, "OPT_NAME");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "CURRENCY");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.OptUndlCls, "OPT_UNDL_CLS");
                FieldData.OptUndlCode = _maCli_GetValueS(Handle, Buf, 64, "OPT_UNDL_CODE");
                FieldData.OptUndlName = _maCli_GetValueS(Handle, Buf, 64, "OPT_UNDL_NAME");
                FieldData.OrderPrice = _maCli_GetValueS(Handle, Buf, 64, "ORDER_PRICE");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "ORDER_QTY");
                FieldData.OrderAmt = _maCli_GetValueS(Handle, Buf, 64, "ORDER_AMT");
                FieldData.MatchedAmt = _maCli_GetValueS(Handle, Buf, 64, "MATCHED_AMT");
                FieldData.MarginPreFrz = _maCli_GetValueS(Handle, Buf, 64, "MARGIN_PRE_FRZ");
                FieldData.MarginFrz = _maCli_GetValueS(Handle, Buf, 64, "MARGIN_FRZ");
                FieldData.MarginPreUfz = _maCli_GetValueS(Handle, Buf, 64, "MARGIN_PRE_UFZ");
                FieldData.MarginUfz = _maCli_GetValueS(Handle, Buf, 64, "MARGIN_UFZ");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.ErrorId, "ERROR_ID");
                FieldData.ErrorMsg = _maCli_GetValueS(Handle, Buf, 128, "ERROR_MSG");
                FieldData.BrokerId = _maCli_GetValueS(Handle, Buf, 64, "BROKER_ID");
                FieldData.InstrumentId = _maCli_GetValueS(Handle, Buf, 64, "INSTRUMENT_ID");
                FieldData.OrderRef = _maCli_GetValueS(Handle, Buf, 64, "ORDER_REF");
                FieldData.UserId = _maCli_GetValueS(Handle, Buf, 64, "USER_ID");
                FieldData.ExchangeId = _maCli_GetValueS(Handle, Buf, 64, "EXCHANGE_ID");
                FieldData.OrderSysId = _maCli_GetValueS(Handle, Buf, 64, "ORDER_SYS_ID");
                FieldData.CombOffsetFlag = _maCli_GetValueS(Handle, Buf, 64, "COMB_OFFSET_FLAG");
                FieldData.CombHedgeFlag = _maCli_GetValueS(Handle, Buf, 64, "COMB_HEDGE_FLAG");
                FieldData.OrderLocalId = _maCli_GetValueS(Handle, Buf, 64, "ORDER_LOCAL_ID");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.SequenceNo, "SEQUENCE_NO");
                FieldData.CliOrderNo = _maCli_GetValueS(Handle, Buf, 64, "CLI_ORDER_NO");
                FieldData.StkName = _maCli_GetValueS(Handle, Buf, 64, "STK_NAME");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.TotalMatchedQty, "TOTAL_MATCHED_QTY");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.WithdrawnQty, "WITHDRAWN_QTY");
                FieldData.TotalMatchedAmt = _maCli_GetValueS(Handle, Buf, 64, "TOTAL_MATCHED_AMT");
                Console.WriteLine("[成交信息]");
                Console.WriteLine("{0}", FieldData.ToString());
            }
            else if (FuncId == "00102024")
            {
                //交易确认推送 CONFIRM+XX
                RtnOptOrderConfirmField FieldData = new RtnOptOrderConfirmField();
                maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "STKEX");
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "STK_CODE");
                FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "ORDER_ID");
                FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "TRDACCT");
                FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "IS_WITHDRAW");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "CUST_CODE");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "CUACCT_CODE");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "ORDER_BSN");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "CUACCT_SN");
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "STKBD");
                FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "ORDER_STATUS");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "STK_BIZ");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "STK_BIZ_ACTION");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "ORDER_DATE");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderSn, "ORDER_SN");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "INT_ORG");
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "STKPBU");
                FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "ORDER_PRICE");
                FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "ORDER_QTY");
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "SUBACCT_CODE");
                FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "OPT_TRDACCT");
                FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "OPT_CODE");
                FieldData.OptCode = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "OPT_NAME");
                FieldData.OptName = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "CURRENCY");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.OptUndlCls, "OPT_UNDL_CLS");
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "OPT_UNDL_CODE");
                FieldData.OptUndlCode = Marshal.PtrToStringAnsi(Buf);
                maCliApi.maCli_GetValueS(Handle, Buf, 64, "OPT_UNDL_NAME");
                FieldData.OptUndlName = Marshal.PtrToStringAnsi(Buf);
                Console.WriteLine("[委托确认回报信息]");
                Console.WriteLine("{0}", FieldData.ToString());

            }
            Marshal.FreeHGlobal(Buf);
            Marshal.FreeHGlobal(FuncIdPtr);
        }

        public static void OnRecvAsyn(IntPtr id, IntPtr buff, int len)
        {
            IntPtr Handle = IntPtr.Zero;
            RetCode = maCliApi.maCli_Init(ref Handle);
            RetCode = maCliApi.maCli_Parse(Handle, buff, len);
            IntPtr Buf = Marshal.AllocHGlobal(256);
            RetCode = maCliApi.maCli_GetValueS(Handle, Buf, 256, "11");
            string strBuf = Marshal.PtrToStringAnsi(Buf);
            Console.WriteLine("ORDER_ID:{0}", strBuf);
        }

        //账户登录校验
        public static int CheckIsLogin()
        {
            if (stLoginInfo.SessionId == "")
            {
                Console.WriteLine("Error: Not Login on, Login First");
                return -1;
            }
            return 0;
        }

        //终端信息自动填充
        public static string AutoFillClientInfo(IntPtr Handle, string clientInfo)
        {
            if (clientInfo == null ||clientInfo.Length == 0)
            {
                IntPtr Buf = Marshal.AllocHGlobal(64 + 1);
                if (stClientInfo.Iip.Length == 0)
                {
                    stClientInfo.Iip = "NA";
                }
                if (stClientInfo.Iport.Length == 0 || stClientInfo.Iport.Substring(0, 1) == "N")
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.LPORT, Buf, 6);
                    stClientInfo.Iport = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Iport.Length == 0)
                    {
                        stClientInfo.Iport = "NA";
                    }
                }
                if (stClientInfo.Lip.Length == 0 || stClientInfo.Lip.Substring(0, 1) == "N")
                {
                    maCliApi.maCli_GetConnIpAddr(Handle, Buf, 16);
                    stClientInfo.Lip = Marshal.PtrToStringAnsi(Buf);
                    string str1 = stClientInfo.Lip.Substring(stClientInfo.Lip.Length - 1, 1);
                    Console.WriteLine(stClientInfo.Lip.Length);
                    if (stClientInfo.Lip.Length == 0)
                    {
                        stClientInfo.Lip = "NA";
                    }
                }
                if (stClientInfo.Mac.Length == 0 || stClientInfo.Mac.Substring(0, 1) == "N")
                {
                    maCliApi.maCli_GetConnMac(Handle, Buf, 19);
                    stClientInfo.Mac = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Mac.Length == 0)
                    {
                        stClientInfo.Mac = "NA";
                    }
                }
                if(stClientInfo.Hd.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.HD_ID, Buf, 32);
                    stClientInfo.Hd = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Hd.Length == 0)
                    {
                        stClientInfo.Hd = "NA";
                    }
                }
                if (stClientInfo.Pcn.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.PC_NAME, Buf, 20);
                    stClientInfo.Pcn = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Pcn.Length == 0)
                    {
                        stClientInfo.Pcn = "NA";
                    }
                }
                if (stClientInfo.Cpu.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.CPU_ID, Buf, 20);
                    stClientInfo.Cpu = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Cpu.Length == 0)
                    {
                        stClientInfo.Cpu = "NA";
                    }
                }
                if (stClientInfo.Pi.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.HD_PART, Buf, 20);
                    stClientInfo.Pi = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Pi.Length == 0)
                    {
                        stClientInfo.Pi = "NA";
                    }
                }
                if (stClientInfo.Vol.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.SYS_VOL, Buf, 10);
                    stClientInfo.Vol = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Vol.Length == 0)
                    {
                        stClientInfo.Vol = "NA";
                    }
                }
                if (stClientInfo.Ext.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.APP_NAME, Buf, 53);
                    stClientInfo.Ext = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Ext.Length == 0)
                    {
                        stClientInfo.Ext = "NA";
                    }
                }
                Marshal.FreeHGlobal(Buf);
                clientInfo = string.Format("PC;IIP={0};IPORT={1};LIP={2};MAC={3};HD={4};PCN={5};CPU={6};PI={7};VOL={8}{9}{10}",
                    stClientInfo.Iip, stClientInfo.Iport, stClientInfo.Lip, stClientInfo.Mac, stClientInfo.Hd,
                    stClientInfo.Pcn, stClientInfo.Cpu, stClientInfo.Pi, stClientInfo.Vol, "@", stClientInfo.Ext);
            }
            Console.WriteLine(clientInfo);
            return clientInfo;
        }

        //固定入参传值
        public static void SetPacketHead(IntPtr Handle, string FunId, byte FunType, byte PktType)
        {
            IntPtr Buf = Marshal.AllocHGlobal(64 + 1);
            maCliApi.maCli_BeginWrite(Handle);
            string SessionId = stLoginInfo.SessionId != string.Empty ? stLoginInfo.SessionId : "0";
            maCliApi.maCli_GetUuid(Handle, Buf, (int)MACLI_SIZE.MSG_ID_SIZE + 1);
            maCliApi.maCli_SetHdrValueS(Handle, Buf, (int)MACLI_HEAD_FID.MSG_ID);
            maCliApi.maCli_SetHdrValueS(Handle, FunId, (int)MACLI_HEAD_FID.FUNC_ID);
            maCliApi.maCli_SetHdrValueC(Handle, FunType, (int)MACLI_HEAD_FID.FUNC_TYPE);
            maCliApi.maCli_SetHdrValueC(Handle, 0x52, (int)MACLI_HEAD_FID.MSG_TYPE);
            maCliApi.maCli_SetHdrValueS(Handle, "01", (int)MACLI_HEAD_FID.PKT_VER);
            maCliApi.maCli_SetHdrValueC(Handle, PktType, (int)MACLI_HEAD_FID.PKT_TYPE);
            string strTimestamp = string.Format("{0:yyyyMMddHHmmssffff}", System.DateTime.Now);
            IntPtr ipTimestamp = Marshal.StringToHGlobalAnsi(strTimestamp);
            RetCode = maCliApi.maCli_SetHdrValue(Handle, ipTimestamp, 17, (int)MACLI_HEAD_FID.TIMESTAMP);
            maCliApi.maCli_SetHdrValueS(Handle, SessionId, (int)MACLI_HEAD_FID.USER_SESSION); //用户session值

            _maCli_SetValueS(Handle, stLoginInfo.CustCode != string.Empty ? stLoginInfo.CustCode : "0", "8810"); // 操作用户代码默认传0保证不为空
            _maCli_SetValueS(Handle, "1", "8811");
            IntPtr OpSite = Marshal.AllocHGlobal(32 + 1);
            maCliApi.maCli_GetConnIpAddr(Handle, OpSite, 32);
            _maCli_SetValueS(Handle, Marshal.PtrToStringAnsi(OpSite), "8812");
            _maCli_SetValueS(Handle, "o", "8813");
            //maCliApi.maCli_GetVersion(Handle, Buf, 64);
            _maCli_SetValueS(Handle, SessionId, "8814");
            _maCli_SetValueS(Handle, FunId, "8815");
            _maCli_SetValueS(Handle, System.DateTime.Now.TimeOfDay.ToString(), "8816");
            maCliApi.maCli_SetValueN(Handle, stLoginInfo.IntOrg, "8821");
            maCliApi.maCli_SetValueC(Handle, stLoginInfo.CuacctType, "8826");//操作账户类型字符型 需要调整
            Marshal.FreeHGlobal(OpSite);
            Marshal.FreeHGlobal(Buf);
        }

        //解析第一结果集
        public static int ParseAnsTb1(IntPtr Handle, string FuncRemark, FirstSetAns stFirstSetAns)
        {
            RetCode = maCliApi.maCli_OpenTable(Handle, 1);
            RetCode = maCliApi.maCli_ReadRow(Handle, 1);
            maCliApi.maCli_GetValueN(Handle, ref RetCode, "8817"); //返回值，错误代码
            stFirstSetAns.RetCode = RetCode;
            IntPtr MsgText = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_GetValueS(Handle, MsgText, 256, "8819"); //返回信息
            stFirstSetAns.MsgText = Marshal.PtrToStringAnsi(MsgText);
            Console.WriteLine("{0}:{1}|{2}", FuncRemark, RetCode, Marshal.PtrToStringAnsi(MsgText));
            Marshal.FreeHGlobal(MsgText);

            return RetCode;
        }

        //返回异常处理
        public static void ThrowAnsError(IntPtr Handle, out int RetCode)
        {
            maCliApi.maCli_GetLastErrorCode(Handle, out RetCode);
            IntPtr ErrorMsg = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_GetLastErrorMsg(Handle, ErrorMsg, 256);
            Console.WriteLine("请求返回异常:{0}|{1}", RetCode, Marshal.PtrToStringAnsi(ErrorMsg));
            Marshal.FreeHGlobal(ErrorMsg);
        }

        //重写string类型设置值的方法,无初始值时进行特殊处理
        public static int _maCli_SetValueS(IntPtr Handle, string Value, string FieldIdx)
        {
            if (Value != null)
            {
                maCliApi.maCli_SetValueS(Handle, Value, FieldIdx);
            }
            return -1;
        }

        public static string _maCli_GetValueS(IntPtr Handle, IntPtr Buf, int FieldLen, string FieldCode)
        {
            int iRetCode = maCliApi.maCli_GetValueS(Handle, Buf, FieldLen, FieldCode);
            if (iRetCode == 0)
            {
                return Marshal.PtrToStringAnsi(Buf);
            }
            return "";
        }

        //主题订阅
        public static void MakePkgSubTopic(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqSubTopicField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "00102012", (byte)'Q', (byte)'S');

            _maCli_SetValueS(Handle, stReqField.Topic, "TOPIC");
            _maCli_SetValueS(Handle, stReqField.Filter, "FILTER");
            _maCli_SetValueS(Handle, stReqField.DataSet, "DATA_SET");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgSubTopic(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 1);
                RetCode = maCliApi.maCli_ReadRow(Handle, 1);
                maCliApi.maCli_GetValueN(Handle, ref RetCode, "MSG_CODE");
                IntPtr MsgText = Marshal.AllocHGlobal(256 + 1);
                maCliApi.maCli_GetValueS(Handle, MsgText, 256, "MSG_TEXT");
                Console.WriteLine("主题订阅请求响应:{0}|{1}", RetCode, Marshal.PtrToStringAnsi(MsgText));
                Marshal.FreeHGlobal(MsgText);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(256 + 1);
                    RspSubTopicField FieldData = new RspSubTopicField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "TOPIC");
                    FieldData.Topic = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "FILTER");
                    FieldData.Filter = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "ACCEPT_SN");
                    FieldData.AcceptSn = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "CHANNEL");
                    FieldData.Channel = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "DATA_SET");
                    FieldData.DataSet = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }

        //主题退订
        public static void MakePkgUnSubTopic(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, string Topic, string AcceptSn)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "00102013", (byte)'Q', (byte)'S');

            _maCli_SetValueS(Handle, Topic, "TOPIC");
            _maCli_SetValueS(Handle, AcceptSn, "ACCEPT_SN");

            maCliApi.maCli_EndWrite(Handle);
            RetCode = maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgUnSubTopic(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 1);
                RetCode = maCliApi.maCli_ReadRow(Handle, 1);
                maCliApi.maCli_GetValueN(Handle, ref RetCode, "MSG_CODE");
                IntPtr MsgText = Marshal.AllocHGlobal(256 + 1);
                maCliApi.maCli_GetValueS(Handle, MsgText, 256, "MSG_TEXT");
                Console.WriteLine("退订主题请求响应:{0}|{1}", RetCode, Marshal.PtrToStringAnsi(MsgText));
                Marshal.FreeHGlobal(MsgText);
                return RetCode;
            }
            else
            {
                return -1;
            }
        }

        /**************************期权订单功能***************************/
        //期权登录组包
        public static void MakePkgOptLogin(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptUserLoginField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            stLoginInfo.CuacctType = (byte)'1';
            SetPacketHead(Handle, "10314001", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.AcctType, "8987");
            _maCli_SetValueS(Handle, stReqField.AcctId, "9081");
            maCliApi.maCli_SetValueC(Handle, stReqField.UseScope, "9082");
            _maCli_SetValueS(Handle, stReqField.EncryptKey, "9086");
            maCliApi.maCli_SetValueC(Handle, stReqField.AuthType, "9083");
            maCliApi.maCli_SetValueC(Handle, stReqField.EncryptType, "9085");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, stReqField.EncryptKey);
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");
            stLoginInfo.EnAuthData = Marshal.PtrToStringAnsi(szAuthData);

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //期权登录解包
        public static int ParsePkgOptLogin(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptUserLoginField> UserLoginAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权登录响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptUserLoginField FieldData = new RspOptUserLoginField();

                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    stLoginInfo.CustCode = FieldData.CustCode.ToString(); //保存客户代码
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    stLoginInfo.CuacctCode = FieldData.CuacctCode.ToString(); //保存账户代码
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    if (FieldData.Stkbd == "15") stLoginInfo.ShAcct = FieldData.Trdacct;
                    if (FieldData.Stkbd == "05") stLoginInfo.SzAcct = FieldData.Trdacct;
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.TrdacctStatus, "8933");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8987");
                    FieldData.AcctType = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.AcctId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8932");
                    FieldData.TrdacctName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "8814");
                    FieldData.Session = Marshal.PtrToStringAnsi(Buf);
                    stLoginInfo.SessionId = FieldData.Session;
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    stLoginInfo.IntOrg = FieldData.IntOrg; //保存机构代码
                    Marshal.FreeHGlobal(Buf);
                    UserLoginAns.Add(FieldData);
                    Console.WriteLine("返回内容:[{0},{1}]", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //股票期权委托申报

        public static void MakePkgOptOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptOrderField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10312001", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.IntOrg, "8911");
            _maCli_SetValueS(Handle, StReqFiled.Stkbd, "625");
            _maCli_SetValueS(Handle, StReqFiled.Trdacct, "448");
            _maCli_SetValueS(Handle, StReqFiled.OptNum, "9082");
            _maCli_SetValueS(Handle, StReqFiled.OrderPrice, "44");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.OrderQty, "38");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBizAction, "40");
            _maCli_SetValueS(Handle, StReqFiled.Stkpbu, "8843");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.OrderBsn, "66");
            _maCli_SetValueS(Handle, StReqFiled.ClientInfo, "9039");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.SecurityLevel, "9080");
            _maCli_SetValueS(Handle, StReqFiled.SecurityInfo, "9081");
            _maCli_SetValueS(Handle, StReqFiled.OrderIdEx, "9093");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.EncryptType, "9085");
            _maCli_SetValueS(Handle, StReqFiled.EncryptKey, "9086");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptOrderField> OptOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权委托响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptOrderField FieldData = new RspOptOrderField();

                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8830");
                    FieldData.OrderAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9084");
                    FieldData.OptCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9087");
                    FieldData.OptName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.OptUndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.OptUndlName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.OrderIdEx = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptOrderAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //股票期权委托撤单

        public static void MakePkgOptCancelOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptCancelOrderField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10310502", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.IntOrg, "8911");
            _maCli_SetValueS(Handle, StReqFiled.Stkbd, "625");
            _maCli_SetValueS(Handle, StReqFiled.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.OrderBsn, "66");
            _maCli_SetValueS(Handle, StReqFiled.ClientInfo, "9039");
            _maCli_SetValueS(Handle, StReqFiled.OrderIdEx, "9093");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.ForceWth, "9094");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptCancelOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptCancelOrderField> OptCancelOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权撤单响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptCancelOrderField FieldData = new RspOptCancelOrderField();

                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8830");
                    FieldData.OrderAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CancelStatus, "9080");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.OrderIdEx = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9199");
                    FieldData.OrderIdWtd = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptCancelOrderAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //期权可用资金查询

        public static void MakePkgOptExpendableFund(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptExpendableFundField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10313019", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.Currency, "15");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.ValueFlag, "9080");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptExpendableFund(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptExpendableFundField> OptExpendableFundAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权可用资金查询响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptExpendableFundField FieldData = new RspOptExpendableFundField();

                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.MarketValue = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.FundValue = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9083");
                    FieldData.StkValue = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8860");
                    FieldData.FundPrebln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8984");
                    FieldData.FundBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8861");
                    FieldData.FundAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8862");
                    FieldData.FundFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8863");
                    FieldData.FundUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8864");
                    FieldData.FundTrdFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8865");
                    FieldData.FundTrdUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8866");
                    FieldData.FundTrdOtd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8867");
                    FieldData.FundTrdBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.FundStatus, "8868");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9084");
                    FieldData.MarginUsed = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.MarginInclRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9085");
                    FieldData.FundExeMargin = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9086");
                    FieldData.FundExeFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9089");
                    FieldData.FundFeeFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9087");
                    FieldData.Paylater = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8934");
                    FieldData.PreadvaPay = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9088");
                    FieldData.ExpPenInt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9096");
                    FieldData.FundDraw = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9097");
                    FieldData.FundAvlRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8901");
                    FieldData.MarginInclDyn = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8933");
                    FieldData.DailyInAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8931");
                    FieldData.DailyOutAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9092");
                    FieldData.FundRealAvl = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptExpendableFundAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //期权可用合约资产查询

        public static void MakePkgOptExpendableCu(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptExpendableCuField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10313001", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            _maCli_SetValueS(Handle, StReqFiled.Stkbd, "625");
            _maCli_SetValueS(Handle, StReqFiled.Trdacct, "448");
            _maCli_SetValueS(Handle, StReqFiled.OptNum, "9081");
            _maCli_SetValueS(Handle, StReqFiled.OptUndlCode, "9090");
            _maCli_SetValueS(Handle, StReqFiled.Stkpbu, "8843");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.OptSide, "9091");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.OptCvdFlag, "9092");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.QueryFlag, "9080");
            _maCli_SetValueS(Handle, StReqFiled.QryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.QryNum, "8992");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptExpendableCu(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptExpendableCuField> OptExpendableCuAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权合约资产查询请求响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptExpendableCuField FieldData = new RspOptExpendableCuField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.OptCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OptType, "8930");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OptSide, "9091");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OptCvdFlag, "9092");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptPrebln, "8860");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptBln, "8861");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptAvl, "8869");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptFrz, "8862");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptUfz, "8863");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptTrdFrz, "8872");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptTrdUfz, "8873");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptTrdOtd, "8874");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptTrdBln, "8867");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptClrFrz, "8887");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptClrUfz, "8888");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptClrOtd, "8889");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8875");
                    FieldData.OptBcost = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8876");
                    FieldData.OptBcostRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8877");
                    FieldData.OptPlamt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8878");
                    FieldData.OptPlamtRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8879");
                    FieldData.OptMktVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9085");
                    FieldData.OptPremium = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9086");
                    FieldData.OptMargin = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptCvdAsset, "9087");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9088");
                    FieldData.OptClsProfit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.SumClsProfit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9089");
                    FieldData.OptFloatProfit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9094");
                    FieldData.TotalProfit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptRealPosi, "9095");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptClsUnmatched, "9096");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OptDailyOpenRlt, "17");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9090");
                    FieldData.OptUndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9100");
                    FieldData.ExerciseVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CombedQty, "8926");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9083");
                    FieldData.CostPrice = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptExpendableCuAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //期权当日委托查询

        public static void MakePkgOptCurrDayOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptCurrDayOrderField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10313003", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            _maCli_SetValueS(Handle, StReqFiled.Stkbd, "625");
            _maCli_SetValueS(Handle, StReqFiled.Trdacct, "448");
            _maCli_SetValueS(Handle, StReqFiled.OptNum, "9082");
            _maCli_SetValueS(Handle, StReqFiled.OptUndlCode, "9086");
            _maCli_SetValueS(Handle, StReqFiled.CombStraCode, "8928");
            _maCli_SetValueS(Handle, StReqFiled.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.OrderBsn, "66");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBizAction, "40");
            _maCli_SetValueS(Handle, StReqFiled.OwnerType, "9091");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.QueryFlag, "9080");
            _maCli_SetValueS(Handle, StReqFiled.QryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.QryNum, "8992");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptCurrDayOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptCurrDayOrderField> OptCurrDayOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权委托查询响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptCurrDayOrderField FieldData = new RspOptCurrDayOrderField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdDate, "8844");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8845");
                    FieldData.OrderTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "39");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderValidFlag, "8833");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.OwnerType = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9083");
                    FieldData.OptCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9084");
                    FieldData.OptName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8900");
                    FieldData.CombNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8928");
                    FieldData.CombStraCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8926");
                    FieldData.Leg1Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8925");
                    FieldData.Leg2Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8924");
                    FieldData.Leg3Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8923");
                    FieldData.Leg4Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8830");
                    FieldData.OrderAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8835");
                    FieldData.OrderUfzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OfferQty, "37");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OfferStime, "8500");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.WithdrawnQty, "8837");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.MatchedQty, "387");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "8836");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdrawn, "8838");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OptUndlCls, "9085");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9086");
                    FieldData.OptUndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9087");
                    FieldData.OptUndlName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.UndlFrzQty, "9088");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.UndlUfzQty, "9089");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.UndlWthQty, "9090");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9092");
                    FieldData.OfferRetMsg = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.OrderIdEx = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderSn, "8832");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9094");
                    FieldData.MarginPreFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9095");
                    FieldData.MarginFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9096");
                    FieldData.MarginPreUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9097");
                    FieldData.MarginUfz = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptCurrDayOrderAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }
        //股票期权当日成交查询

        public static void MakePkgOptCurrDayFill(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqOptCurrDayFillField StReqFiled)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10313004", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, StReqFiled.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, StReqFiled.CuacctCode, "8920");
            _maCli_SetValueS(Handle, StReqFiled.Stkbd, "625");
            _maCli_SetValueS(Handle, StReqFiled.Trdacct, "448");
            _maCli_SetValueS(Handle, StReqFiled.OptNum, "48");
            _maCli_SetValueS(Handle, StReqFiled.OptUndlCode, "9086");
            _maCli_SetValueS(Handle, StReqFiled.CombStraCode, "8928");
            _maCli_SetValueS(Handle, StReqFiled.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.OrderBsn, "66");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.StkBizAction, "40");
            _maCli_SetValueS(Handle, StReqFiled.OwnerType, "9091");
            maCliApi.maCli_SetValueC(Handle, StReqFiled.QueryFlag, "9080");
            _maCli_SetValueS(Handle, StReqFiled.QryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, StReqFiled.QryNum, "8992");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        public static int ParsePkgOptCurrDayFill(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspOptCurrDayFillField> OptCurrDayFillAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "期权成交查询响应", stFirstSetAns);
            }
            else
            {
                return -1;
            }
            if (RetCode == 0 && TableCount > 1)
            {
                RetCode = maCliApi.maCli_OpenTable(Handle, 2);
                int RowCount;
                RetCode = maCliApi.maCli_GetRowCount(Handle, out RowCount);
                for (int Row = 0; Row < RowCount; ++Row)
                {
                    RetCode = maCliApi.maCli_ReadRow(Handle, Row + 1);
                    IntPtr Buf = Marshal.AllocHGlobal(128 + 1);
                    RspOptCurrDayFillField FieldData = new RspOptCurrDayFillField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdDate, "8844");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8840");
                    FieldData.MatchedTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderSn, "8832");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Stkex, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8927");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9099");
                    FieldData.SubacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.OptTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.OwnerType = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9083");
                    FieldData.OptCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9084");
                    FieldData.OptName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8900");
                    FieldData.CombNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8928");
                    FieldData.CombStraCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8926");
                    FieldData.Leg1Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8925");
                    FieldData.Leg2Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8924");
                    FieldData.Leg3Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8923");
                    FieldData.Leg4Num = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OptUndlCls, "9085");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9086");
                    FieldData.OptUndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9087");
                    FieldData.OptUndlName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8830");
                    FieldData.OrderAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "8836");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.MatchedType, "8992");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "17");
                    FieldData.MatchedSn = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8841");
                    FieldData.MatchedPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.MatchedQty, "387");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.OrderIdEx = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9094");
                    FieldData.MarginPreFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9095");
                    FieldData.MarginFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9096");
                    FieldData.MarginPreUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9097");
                    FieldData.MarginUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9088");
                    FieldData.MatchedFee = Marshal.PtrToStringAnsi(Buf);

                    Marshal.FreeHGlobal(Buf);
                    OptCurrDayFillAns.Add(FieldData);
                    Console.WriteLine("返回内容: [{0},{1}] ", RowCount, Row + 1);
                    Console.WriteLine("{0}", FieldData.ToString());
                }
            }
            else
            {
                ThrowAnsError(Handle, out RetCode);
                return -1;
            }
            return 0;
        }

        /**************************期权功能调用**************************/
        //期权登录
        public static int OptLogin(IntPtr Handle, ReqOptUserLoginField stReqOptLogin, FirstSetAns stFirstSetAns, List<RspOptUserLoginField> OptLoginAns)//传入量化登录对象
        {
            //******调用账户登录
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptLogin(Handle, out ReqData, out ReqDataLen, stReqOptLogin);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10314001";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptLogin(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptLoginAns);
            return RetCode;
        }
        
        //期权委托
        public static int OptOrder(IntPtr Handle, ReqOptOrderField stReqOptOrder, FirstSetAns stFirstSetAns, List<RspOptOrderField> OptOrderAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptOrder(Handle, out ReqData, out ReqDataLen, stReqOptOrder);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10312001";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptOrderAns);
            return RetCode;
        }

        //期权撤单
        public static int OptCancelOrder(IntPtr Handle, ReqOptCancelOrderField stReqOptCancelOrder, FirstSetAns stFirstSetAns, List<RspOptCancelOrderField> OptCancelOrderAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptCancelOrder(Handle, out ReqData, out ReqDataLen, stReqOptCancelOrder);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10310502";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptCancelOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptCancelOrderAns);
            return RetCode;
        }

        //期权可用资金查询
        public static int OptExpendableFund(IntPtr Handle, ReqOptExpendableFundField stReqOptExpendableFund, FirstSetAns stFirstSetAns, List<RspOptExpendableFundField> OptExpendableFundAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptExpendableFund(Handle, out ReqData, out ReqDataLen, stReqOptExpendableFund);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10313019";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptExpendableFund(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptExpendableFundAns);
            return RetCode;
        }

        //期权可用合约资产查询
        public static int OptExpendableCu(IntPtr Handle, ReqOptExpendableCuField stReqOptExpendableCu, FirstSetAns stFirstSetAns, List<RspOptExpendableCuField> OptExpendableCuAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptExpendableCu(Handle, out ReqData, out ReqDataLen, stReqOptExpendableCu);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10313001";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptExpendableCu(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptExpendableCuAns);
            return RetCode;
        }

        //期权委托查询
        public static int OptCurrDayOrder(IntPtr Handle, ReqOptCurrDayOrderField stReqOptCurrDayOrder, FirstSetAns stFirstSetAns, List<RspOptCurrDayOrderField> OptCurrDayOrderAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptCurrDayOrder(Handle, out ReqData, out ReqDataLen, stReqOptCurrDayOrder);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10313003";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptCurrDayOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptCurrDayOrderAns);
            return RetCode;
        }

        //期权成交查询
        public static int OptCurrDayFill(IntPtr Handle, ReqOptCurrDayFillField stReqOptCurrDayFill, FirstSetAns stFirstSetAns, List<RspOptCurrDayFillField> OptCurrDayFillAns)//传入量化登录对象
        {
            if (CheckIsLogin() == -1) return -1;
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgOptCurrDayFill(Handle, out ReqData, out ReqDataLen, stReqOptCurrDayFill);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10313003";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgOptCurrDayFill(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, OptCurrDayFillAns);
            return RetCode;
        }
        
        //订阅主题
        public static int CosSubTopic(IntPtr Handle, string Topic, string Filter, string DataSet)
        {
            //主题订阅
            IntPtr ReqData;
            int ReqDataLen;
            ReqSubTopicField stReqSubTopic = new ReqSubTopicField();
            stReqSubTopic.Topic = Topic;
            stReqSubTopic.Filter = Filter;
            stReqSubTopic.DataSet = DataSet;
            MakePkgSubTopic(Handle, out ReqData, out ReqDataLen, stReqSubTopic);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "00102012";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgSubTopic(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //退订主题
        public static int CosUnSubTopic(IntPtr Handle, string Topic, string AcceptSn)
        {
            //主题退订
            if (Topic.Length == 0 || AcceptSn.Length == 0)
            {
                Console.WriteLine("取消订阅---请输入主题: ");
                Topic = Console.ReadLine();
            }
            if (AcceptSn.Length == 0)
            {
                Console.WriteLine("取消订阅---请输入受理号: ");
                AcceptSn = Console.ReadLine();
            }
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgUnSubTopic(Handle, out ReqData, out ReqDataLen, Topic, AcceptSn);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "00102013";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgUnSubTopic(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //功能选项菜单
        public static void CosMenu()
        {
            Console.WriteLine("--------------------------------------------------------------------------------------");
            Console.WriteLine("      1:期权登录           2:订阅主题请求         3:退订主题请求                      ");
            Console.WriteLine("      4:期权委托           5:期权撤单                                                 ");
            Console.WriteLine("      6:期权资金查询       7:期权合约资产查询     8:期权委托查询      9:期权成交查询  ");
            Console.WriteLine("      m/M:菜单               x/X:退出");
            Console.WriteLine("--------------------------------------------------------------------------------------");
        }
        static void Main(string[] args)
        {
            IntPtr Handle = IntPtr.Zero;
            
            RetCode = maCliApi.maCli_Init(ref Handle);

            ST_MACLI_CONNECT_OPTION ConnOpt = new ST_MACLI_CONNECT_OPTION();
            IntPtr PtrConnOpt = Marshal.AllocHGlobal(Marshal.SizeOf(ConnOpt));
            ConnOpt.nCommType = 3;
            ConnOpt.nProtocal = 1;
            ConnOpt.szSvrAddress = "192.168.26.157"; //连接服务器地址
            ConnOpt.nSvrPort = 41000; //连接服务器端口
            Marshal.StructureToPtr(ConnOpt, PtrConnOpt, false);
            RetCode = maCliApi.maCli_SetOptions(Handle, (int)MACLI_OPTION.CONNECT_PARAM, PtrConnOpt, Marshal.SizeOf(ConnOpt));
            Marshal.FreeHGlobal(PtrConnOpt);

            int SyncTimeout = 1;
            IntPtr PtrSyncTimeout = Marshal.AllocHGlobal(Marshal.SizeOf(SyncTimeout));
            Marshal.WriteInt32(PtrSyncTimeout, SyncTimeout);
            RetCode = maCliApi.maCli_SetOptions(Handle, (int)MACLI_OPTION.SYNCCALL_TIMEOUT, PtrSyncTimeout, Marshal.SizeOf(SyncTimeout));
            Marshal.FreeHGlobal(PtrSyncTimeout);

            int AsynTimeout = 10;
            IntPtr PtrAsynTimeout = Marshal.AllocHGlobal(Marshal.SizeOf(AsynTimeout));
            Marshal.WriteInt32(PtrAsynTimeout, AsynTimeout);
            RetCode = maCliApi.maCli_SetOptions(Handle, (int)MACLI_OPTION.ASYNCALL_TIMEOUT, PtrAsynTimeout, Marshal.SizeOf(AsynTimeout));
            Marshal.FreeHGlobal(PtrAsynTimeout);

            ST_MACLI_USERINFO UserInfo = new ST_MACLI_USERINFO();
            UserInfo.strServerName = "SERVER";
            UserInfo.strUserId = "KMAP00";
            UserInfo.strPassword = "888888";
            UserInfo.strAppId = "KD_FORTUNE_2";
            RetCode = maCliApi.maCli_Open(Handle, ref UserInfo);
            if (RetCode != 0)
            {
                ShowErrorInfo(RetCode);
                ThrowAnsError(Handle, out RetCode);
                return;
            }
            Console.WriteLine("客户端与服务器成功建立通信连接");

            ST_MACLI_PSCALLBACK PsCallback = new ST_MACLI_PSCALLBACK();
            PsCallback.strTopic = "*";
            PsCallback.fnCallback = OnRecvPs;
            RetCode = maCliApi.maCli_SetPsCallback(Handle, ref PsCallback);
            
            //功能选项菜单
            int iSelect = 0; //选项标签
            CosMenu();
            string str;
            while (true)
            {
                str = Console.ReadLine();
                if (str.Trim() == string.Empty)
                {
                    continue;
                }
                if (str[0] == 'm' || str[0] == 'M')
                {
                    CosMenu();
                }
                else if (str[0] == 'x' || str[0] == 'X')
                {
                    break;
                }
                else
                {
                    bool isInt = Regex.IsMatch(str, @"^([0-9]+)$");
                    if (!isInt)
                    {
                        Console.WriteLine("非法的功能选项，请重新输入！");
                        continue;
                    }
                    iSelect = int.Parse(str);
                    switch (iSelect)
                    {
                        case 1:
                            //期权登录测试
                            FirstSetAns FirstSetOpt = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptUserLoginField> OptLoginAns = new List<RspOptUserLoginField>(); //返回结果
                            ReqOptUserLoginField stReqOptLogin = new ReqOptUserLoginField();
                            stReqOptLogin.AcctType = "Z"; //账号类型:Z-资金账号，U-客户代码
                            stReqOptLogin.AcctId = "1653000001"; //账号
                            stReqOptLogin.EncryptKey = "111111"; //加密因子
                            stReqOptLogin.AuthData = "111111"; //密码
                            stReqOptLogin.EncryptType = (byte)'1';
                            stReqOptLogin.AuthType = (byte)'0';
                            stReqOptLogin.UseScope = (byte)'4';
                            RetCode = OptLogin(Handle, stReqOptLogin, FirstSetOpt, OptLoginAns);
                            break;
                        case 2:
                            //成交回报主题订阅
                            //CosSubTopic(Handle, "MARKET1", "SH600000", "0");
                            //CosSubTopic(Handle, "MARKET0", "SZ90000055", "0");
                            //CosSubTopic(Handle, "TSU_ORDER", stLoginInfo.ShAcct, "1");
                            CosSubTopic(Handle, "MATCH15", stLoginInfo.ShAcct, "1");
                            CosSubTopic(Handle, "CONFIRM15", stLoginInfo.ShAcct, "1");
                            break;
                        case 3:
                            //主题退订
                            CosUnSubTopic(Handle, "MATCH*", "");
                            break;
                        case 4:
                            //期权委托测试
                            FirstSetAns FirstSetOptOrder = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptOrderField> OptOrderAns = new List<RspOptOrderField>(); //返回结果
                            ReqOptOrderField stReqOptOrder = new ReqOptOrderField();
                            stReqOptOrder.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptOrder.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOptOrder.IntOrg = stLoginInfo.IntOrg;
                            stReqOptOrder.Stkbd = "15";
                            stReqOptOrder.Trdacct = stLoginInfo.ShAcct;
                            stReqOptOrder.OptNum = "10002291";
                            stReqOptOrder.OrderPrice = "0.3257";
                            stReqOptOrder.OrderQty = 5;
                            stReqOptOrder.StkBiz = 400;
                            stReqOptOrder.StkBizAction = 130;
                            stReqOptOrder.Stkpbu = "20751";
                            stReqOptOrder.ClientInfo = "MAC:XXXXXX";
                            stReqOptOrder.SecurityLevel = (byte)'0';
                            RetCode = OptOrder(Handle, stReqOptOrder, FirstSetOptOrder, OptOrderAns);
                            break;
                        case 5:
                            //期权撤单测试
                            FirstSetAns FirstSetOptCancel = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptCancelOrderField> OptCancelAns = new List<RspOptCancelOrderField>(); //返回结果
                            ReqOptCancelOrderField stReqOptCancel = new ReqOptCancelOrderField();
                            stReqOptCancel.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptCancel.IntOrg = stLoginInfo.IntOrg;
                            stReqOptCancel.Stkbd = "15";
                            stReqOptCancel.OrderId = "0530503103";
                            RetCode = OptCancelOrder(Handle, stReqOptCancel, FirstSetOptCancel, OptCancelAns);
                            break;
                        case 6:
                            //期权资金查询
                            FirstSetAns FirstSetOptFund = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptExpendableFundField> OptFundAns = new List<RspOptExpendableFundField>(); //返回结果
                            ReqOptExpendableFundField stReqOptFund = new ReqOptExpendableFundField();
                            stReqOptFund.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptFund.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOptFund.Currency = (byte)'0';
                            stReqOptFund.ValueFlag = 15;
                            RetCode = OptExpendableFund(Handle, stReqOptFund, FirstSetOptFund, OptFundAns);
                            break;
                        case 7:
                            //期权合约资产查询
                            FirstSetAns FirstSetOptFundCu = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptExpendableCuField> OptFundCuAns = new List<RspOptExpendableCuField>(); //返回结果
                            ReqOptExpendableCuField stReqOptFundCu = new ReqOptExpendableCuField();
                            stReqOptFundCu.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptFundCu.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOptFundCu.Stkbd = "";
                            stReqOptFundCu.Trdacct = "";
                            stReqOptFundCu.OptSide = 0x00; //L-权力仓，S-义务仓，C-备兑策略持仓
                            stReqOptFundCu.OptCvdFlag = 0x00; //0-非备兑合约 1-备兑合约
                            RetCode = OptExpendableCu(Handle, stReqOptFundCu, FirstSetOptFundCu, OptFundCuAns);
                            break;
                        case 8:
                            //期权当日委托查询
                            FirstSetAns FirstSetOptOrderInfo = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptCurrDayOrderField> OptOrderInfoAns = new List<RspOptCurrDayOrderField>(); //返回结果
                            ReqOptCurrDayOrderField stReqOptOrderInfo = new ReqOptCurrDayOrderField();
                            stReqOptOrderInfo.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptOrderInfo.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOptOrderInfo.Stkbd = "";
                            stReqOptOrderInfo.Trdacct = "";
                            RetCode = OptCurrDayOrder(Handle, stReqOptOrderInfo, FirstSetOptOrderInfo, OptOrderInfoAns);
                            break;
                        case 9:
                            //期权当日成交查询
                            FirstSetAns FirstSetOptOrderFill = new FirstSetAns(); //返回码以及提示信息
                            List<RspOptCurrDayFillField> OptOrderFillAns = new List<RspOptCurrDayFillField>(); //返回结果
                            ReqOptCurrDayFillField stReqOptOrderFill = new ReqOptCurrDayFillField();
                            stReqOptOrderFill.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOptOrderFill.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOptOrderFill.Stkbd = "";
                            stReqOptOrderFill.Trdacct = "";
                            RetCode = OptCurrDayFill(Handle, stReqOptOrderFill, FirstSetOptOrderFill, OptOrderFillAns);
                            break;
                        default:
                            Console.WriteLine("其他");
                            break;
                    }
                }
            }
            RetCode = maCliApi.maCli_Close(Handle);
            RetCode = maCliApi.maCli_Exit(Handle);

            //Console.ReadLine();
        }
    }
}
