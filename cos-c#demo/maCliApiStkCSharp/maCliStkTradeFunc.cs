// 文件描述：中台API功能封装
//--------------------------------------------------------------------------------------------------
// 修改日期      版本          作者            备注
//--------------------------------------------------------------------------------------------------
// 2020/4/16    001.000.001  SHENGHB          创建
// 2020/4/20    001.000.001  SHENGHB          调整固定入参OpSite的传值，调整资金查询取值标志（新增必传）
// 2020/4/27    001.000.001  SHENGHB          成交推送更新输出项，显示已成交数量和累计成交金额（用于分笔成交）
// 2020/5/26    001.000.002  SHENGHB          新增双融客户负债信息查询
//--------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace macli
{
    class stkFunc
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
        public static LoginInfo stLoginInfo = new LoginInfo( "0", "0", "0", 0x00, "0", 0, "o", "", "", "", ""); //用于缓存登录信息
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
                RtnStkOrderConfirmField FieldData = new RtnStkOrderConfirmField();
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
                maCliApi.maCli_GetValueC(Handle, ref FieldData.CuacctAttr, "CUACCT_ATTR");
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
            RetCode = maCliApi.maCli_Exit(Handle);
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
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.HD_ID, Buf, 33);
                    stClientInfo.Hd = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Hd.Length == 0)
                    {
                        stClientInfo.Hd = "NA";
                    }
                }
                if (stClientInfo.Pcn.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.PC_NAME, Buf, 21);
                    stClientInfo.Pcn = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Pcn.Length == 0)
                    {
                        stClientInfo.Pcn = "NA";
                    }
                }
                if (stClientInfo.Cpu.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.CPU_ID, Buf, 21);
                    stClientInfo.Cpu = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Cpu.Length == 0)
                    {
                        stClientInfo.Cpu = "NA";
                    }
                }
                if (stClientInfo.Pi.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.HD_PART, Buf, 21);
                    stClientInfo.Pi = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Pi.Length == 0)
                    {
                        stClientInfo.Pi = "NA";
                    }
                }
                if (stClientInfo.Vol.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.SYS_VOL, Buf, 20);
                    stClientInfo.Vol = Marshal.PtrToStringAnsi(Buf);
                    if (stClientInfo.Vol.Length == 0)
                    {
                        stClientInfo.Vol = "NA";
                    }
                }
                if (stClientInfo.Ext.Length == 0)
                {
                    maCliApi.maCli_GetOptions(Handle, (int)MACLI_OPTION.APP_NAME, Buf, 54);
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
            string OpSite = AutoFillClientInfo(Handle, stLoginInfo.OpSite); //跟随API3.2启用
            _maCli_SetValueS(Handle, OpSite, "8812");
            _maCli_SetValueS(Handle, "o", "8813");//操作渠道
            //maCliApi.maCli_GetVersion(Handle, Buf, 64);
            _maCli_SetValueS(Handle, SessionId, "8814");
            _maCli_SetValueS(Handle, FunId, "8815");
            _maCli_SetValueS(Handle, System.DateTime.Now.TimeOfDay.ToString(), "8816");
            maCliApi.maCli_SetValueN(Handle, stLoginInfo.IntOrg, "8821");
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

        //现货登录组包
        public static void MakePkgStkLogin(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqAcctLogin stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            stLoginInfo.CuacctType = (byte)'0';
            SetPacketHead(Handle, "10301105", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.AcctType, "8987");
            _maCli_SetValueS(Handle, stReqField.AcctId, "9081");
            maCliApi.maCli_SetValueC(Handle, stReqField.UseScope, "9082");
            _maCli_SetValueS(Handle, stReqField.Encryptkey, "9086");
            maCliApi.maCli_SetValueC(Handle, stReqField.AuthType, "9083");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, stReqField.Encryptkey);
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");
            stLoginInfo.EnAuthData = Marshal.PtrToStringAnsi(szAuthData);

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //现货登录解包
        public static int ParsePkgStkLogin(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspAcctLogin> UserLoginAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "用户登录请求响应", stFirstSetAns);
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
                    RspAcctLogin FieldData = new RspAcctLogin();

                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    stLoginInfo.CustCode = FieldData.CustCode.ToString(); //保存客户代码
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    stLoginInfo.CuacctCode = FieldData.CuacctCode.ToString(); //保存账户代码
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkEx, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.StkBd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.TrdAcct = Marshal.PtrToStringAnsi(Buf);
                    if (FieldData.StkBd == "10") stLoginInfo.ShAcct = FieldData.TrdAcct;
                    if (FieldData.StkBd == "00") stLoginInfo.SzAcct = FieldData.TrdAcct;
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.TrdAcctStatus, "8933");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.StkPbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8987");
                    FieldData.AcctType = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.AcctId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8932");
                    FieldData.TrdAcctName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "8814");
                    FieldData.SessionId = Marshal.PtrToStringAnsi(Buf);
                    stLoginInfo.SessionId = FieldData.SessionId;
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

        //委托组包
        public static void MakePkgStkOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkOrderField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10302001", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            _maCli_SetValueS(Handle, stReqField.StkCode, "48");
            _maCli_SetValueS(Handle, stReqField.OrderPrice, "44");
            maCliApi.maCli_SetValueL(Handle, stReqField.OrderQty, "38");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBizAction, "40");
            _maCli_SetValueS(Handle, stReqField.Stkpbu, "8843");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.OrderText, "58");
            stReqField.ClientInfo = AutoFillClientInfo(Handle, stReqField.ClientInfo);//终端信息自动填入
            _maCli_SetValueS(Handle, stReqField.ClientInfo, "9039");
            maCliApi.maCli_SetValueC(Handle, stReqField.SecurityLevel, "9080");
            _maCli_SetValueS(Handle, stReqField.SecurityInfo, "9081");
            _maCli_SetValueS(Handle, stReqField.ComponetStkCode, "8911");
            _maCli_SetValueS(Handle, stReqField.ComponetStkbd, "8962");
            _maCli_SetValueS(Handle, stReqField.StkbdLink, "17");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            maCliApi.maCli_SetValueN(Handle, stReqField.CuacctSn, "8928");
            maCliApi.maCli_SetValueC(Handle, stReqField.PublishCtrlFlag, "9083");
            _maCli_SetValueS(Handle, stReqField.RepayOrderId, "11");
            maCliApi.maCli_SetValueN(Handle, stReqField.RepayOpeningDate, "9121");
            _maCli_SetValueS(Handle, stReqField.RepayStkCode, "9218");
            _maCli_SetValueS(Handle, stReqField.TrdacctLink, "8964");
            _maCli_SetValueS(Handle, stReqField.InitTrdAmt, "9084");
            maCliApi.maCli_SetValueN(Handle, stReqField.RepchDay, "9085");
            _maCli_SetValueS(Handle, stReqField.LoanerTrdacct, "9086");
            _maCli_SetValueS(Handle, stReqField.RepaySno, "9087");
            maCliApi.maCli_SetValueN(Handle, stReqField.Itemno, "9088");
            maCliApi.maCli_SetValueC(Handle, stReqField.OutputDelayFlag, "9089");
            maCliApi.maCli_SetValueC(Handle, stReqField.CloseOutMode, "9359");
            maCliApi.maCli_SetValueC(Handle, stReqField.RtgsFlag, "9090");
            _maCli_SetValueS(Handle, stReqField.MeetingSeq, "9360");
            _maCli_SetValueS(Handle, stReqField.VoteId, "9361");
            _maCli_SetValueS(Handle, stReqField.OppLofCode, "9362");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //委托解包
        public static int ParsePkgStkOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkOrderField> StkOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "委托请求响应", stFirstSetAns);
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
                    RspStkOrderField FieldData = new RspStkOrderField();

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
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "8928");
                    Marshal.FreeHGlobal(Buf);
                    StkOrderAns.Add(FieldData);
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

        //委托撤单组包
        public static void MakePkgStkCancelOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkCancelOrderField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10302004", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            _maCli_SetValueS(Handle, stReqField.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            stReqField.ClientInfo = AutoFillClientInfo(Handle, stReqField.ClientInfo);//终端信息自动填入
            _maCli_SetValueS(Handle, stReqField.ClientInfo, "9039");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //撤单解包
        public static int ParsePkgStkCancelOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkCancelOrderField> StkCancelOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "委托撤单请求响应", stFirstSetAns);
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
                    RspStkCancelOrderField FieldData = new RspStkCancelOrderField();

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
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CancelStatus, "9080");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.MsgOk = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.CancelList = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9387");
                    FieldData.WtOrderId = Marshal.PtrToStringAnsi(Buf);
                    StkCancelOrderAns.Add(FieldData);
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

        //委托查询组包
        public static void MakePkgStkOrderInfo(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkOrderInfoField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10303003", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            _maCli_SetValueS(Handle, stReqField.StkCode, "48");
            _maCli_SetValueS(Handle, stReqField.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            maCliApi.maCli_SetValueN(Handle, stReqField.CuacctSn, "8928");
            maCliApi.maCli_SetValueC(Handle, stReqField.Flag, "9081");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //委托查询解包
        public static int ParsePkgStkOrderInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkOrderInfoField> StkOrderInfoAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "委托查询请求响应", stFirstSetAns);
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
                    RspStkOrderInfoField FieldData = new RspStkOrderInfoField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdDate, "8844");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8845");
                    FieldData.OrderTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "39");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderValidFlag, "8833");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8960");
                    FieldData.BondInt = Marshal.PtrToStringAnsi(Buf);
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
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "8836");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdrawn, "8838");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "8928");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "41");
                    FieldData.RawOrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9080");
                    FieldData.OfferRetMsg = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8812");
                    FieldData.OpSite = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Channel, "8813");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.RltSettAmt = Marshal.PtrToStringAnsi(Buf);
                    StkOrderInfoAns.Add(FieldData); //存到返回结果
                    Marshal.FreeHGlobal(Buf);
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

        //成交查询组包
        public static void MakePkgStkMatchInfo(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkMatchInfoField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10303004", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            _maCli_SetValueS(Handle, stReqField.StkCode, "48");
            _maCli_SetValueS(Handle, stReqField.OrderId, "11");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            maCliApi.maCli_SetValueN(Handle, stReqField.CuacctSn, "8928");
            maCliApi.maCli_SetValueC(Handle, stReqField.Flag, "9081");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //成交查询解包
        public static int ParsePkgStkMatchInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkMatchInfoField> StkMatchInfoAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "成交查询请求响应", stFirstSetAns);
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
                    RspStkMatchInfoField FieldData = new RspStkMatchInfoField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
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
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.StkTrdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8960");
                    FieldData.BondInt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8830");
                    FieldData.OrderAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "17");
                    FieldData.MatchedSn = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8841");
                    FieldData.MatchedPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "387");
                    FieldData.MatchedQty = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.MatchedType, "9080");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "8928");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "8836");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "39");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.RltSettAmt = Marshal.PtrToStringAnsi(Buf);
                    StkMatchInfoAns.Add(FieldData);
                    Marshal.FreeHGlobal(Buf);
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

        //可用资金查询组包
        public static void MakePkgStkQryFund(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkQryFundField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10303001", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            maCliApi.maCli_SetValueC(Handle, stReqField.Currency, "15");
            maCliApi.maCli_SetValueN(Handle, 15, "9080"); //0：均不计算,1：取MARKET_VALUE值,2：取FUND_VALUE值,4：取STK_VALUE值,8：取FUND_LOAN值(组合取值)

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //可用资金查询解包
        public static int ParsePkgStkQryFund(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkQryFundField> StkQryFundAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "资金查询请求响应", stFirstSetAns);
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
                    RspStkQryFundField FieldData = new RspStkQryFundField();

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
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9084");
                    FieldData.FundLoan = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9085");
                    FieldData.FundLend = Marshal.PtrToStringAnsi(Buf);
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
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CuacctAttr, "8921");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9090");
                    FieldData.FundBorrowBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.HFundAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9092");
                    FieldData.HFundTrdFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9093");
                    FieldData.HFundTrdUfz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9094");
                    FieldData.HFundTrdOtd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9095");
                    FieldData.HFundTrdBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9101");
                    FieldData.CreditFundBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9102");
                    FieldData.CreditFundFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.HgtFlag, "9103");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.ExtOrg, "9104");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9107");
                    FieldData.Cashproval = Marshal.PtrToStringAnsi(Buf);
                    StkQryFundAns.Add(FieldData);
                    Marshal.FreeHGlobal(Buf);
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

        //可用股份查询组包
        public static void MakePkgStkQryShares(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkQrySharesField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10303002", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CustCode, "8902");
            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            _maCli_SetValueS(Handle, stReqField.StkCode, "48");
            _maCli_SetValueS(Handle, stReqField.Stkpbu, "8843");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            maCliApi.maCli_SetValueC(Handle, stReqField.ContractFlag, "8993");
            maCliApi.maCli_SetValueC(Handle, stReqField.BizFlag, "8994"); //0、当前账户股份，1、当前信用账户对应的普通账户股份
            maCliApi.maCli_SetValueN(Handle, stReqField.IntOrg, "8911");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //可用股份查询解包
        public static int ParsePkgStkQryShares(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkQrySharesField> StkQrySharesAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "股份查询请求响应", stFirstSetAns);
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
                    RspStkQrySharesField FieldData = new RspStkQrySharesField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8843");
                    FieldData.Stkpbu = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkCls, "461");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkPrebln, "8501");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkBln, "8985");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkAvl, "8869");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkFrz, "8870");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkUfz, "8871");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdFrz, "8872");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdUfz, "8873");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdOtd, "8874");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdBln, "8880");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8875");
                    FieldData.StkPcost = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8876");
                    FieldData.StkPcostRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8877");
                    FieldData.StkPlamt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8878");
                    FieldData.StkPlamtRlt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8879");
                    FieldData.MktVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9090");
                    FieldData.StktPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9091");
                    FieldData.ProIncome = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkCalMktval, "9092");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkQty, "9093");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9094");
                    FieldData.CurrentPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9095");
                    FieldData.ProfitPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkDiff, "9096");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdUnfrz, "9097");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9098");
                    FieldData.Income = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkRemain, "9398");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkSale, "8988");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsCollat, "9104");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9105");
                    FieldData.CollatRatio = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9120");
                    FieldData.MarketValue = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.MktQty, "9121");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9122");
                    FieldData.LastPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9080");
                    FieldData.ProfitRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.AveragePrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdEtfctn, "9082");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.StkTrdEtfrmn, "9083");
                    StkQrySharesAns.Add(FieldData);
                    Marshal.FreeHGlobal(Buf);
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

        //证券信息查询组包
        public static void MakePkgQryStkInfo(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqStkInfoField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10301036", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.StkCode, "48");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            maCliApi.maCli_SetValueL(Handle, long.Parse(stLoginInfo.CuacctCode), "8920");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //证券信息查询解包
        public static int ParsePkgQryStkInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspStkInfoField> StkInfoAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "证券信息查询请求响应", stFirstSetAns);
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
                    RspStkInfoField FieldData = new RspStkInfoField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QueryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.StkCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.StkName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkCls, "461");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8519");
                    FieldData.StkUplmtPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8520");
                    FieldData.StkLwlmtPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkLotSize, "461");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkSuspended, "8956");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.StkStatus, "326");
                    Marshal.FreeHGlobal(Buf);
                    StkInfoAns.Add(FieldData);
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

        /**************************功能调用操作**************************/

        //账户登录
        public static int StkLogin(IntPtr Handle, ReqAcctLogin stReqAcctLogin, FirstSetAns stFirstSetAns, List<RspAcctLogin> UserLoginAns)//
        {
            //******调用账户登录
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkLogin(Handle, out ReqData, out ReqDataLen, stReqAcctLogin);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10301105";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkLogin(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, UserLoginAns);
            return RetCode;
        }

        //委托
        public static int StkOrder(IntPtr Handle, ReqStkOrderField stReqStkOrderField, FirstSetAns stFirstSetAns, List<RspStkOrderField> StkOrderAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******进行委托报单
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkOrder(Handle, out ReqData, out ReqDataLen, stReqStkOrderField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388101";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkOrderAns);
            return RetCode;
        }

        //委托撤单
        public static int StkCancelOrder(IntPtr Handle, ReqStkCancelOrderField stReqStkCancelOrderField, FirstSetAns stFirstSetAns, List<RspStkCancelOrderField> StkCancelOrderAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******撤单操作
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkCancelOrder(Handle, out ReqData, out ReqDataLen, stReqStkCancelOrderField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388102";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkCancelOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkCancelOrderAns);
            return RetCode;
        }

        //委托查询
        public static int StkQryOrderInfo(IntPtr Handle, ReqStkOrderInfoField stReqStkOrderInfoField, FirstSetAns stFirstSetAns, List<RspStkOrderInfoField> StkOrderInfoAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询委托信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkOrderInfo(Handle, out ReqData, out ReqDataLen, stReqStkOrderInfoField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388301";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkOrderInfo(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkOrderInfoAns);
            return RetCode;
        }

        //成交查询
        public static int StkQryMatchInfo(IntPtr Handle, ReqStkMatchInfoField stReqField, FirstSetAns stFirstSetAns, List<RspStkMatchInfoField> StkMatchInfoAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询成交信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkMatchInfo(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388312";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkMatchInfo(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkMatchInfoAns);
            return RetCode;
        }

        //资金查询
        public static int StkQryStkFund(IntPtr Handle, ReqStkQryFundField stReqField, FirstSetAns stFirstSetAns, List<RspStkQryFundField> StkQryFundAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询资金信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkQryFund(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10303001";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkQryFund(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkQryFundAns);
            return RetCode;
        }

        //股份查询
        public static int StkQryStkShares(IntPtr Handle, ReqStkQrySharesField stReqField, FirstSetAns stFirstSetAns, List<RspStkQrySharesField> StkQrySharesAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询股份信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkQryShares(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10303002";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgStkQryShares(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, StkQrySharesAns);
            return RetCode;
        }
        
        //证券信息查询
        public static int StkQryStkInfoQk(IntPtr Handle, ReqStkInfoField stReqField, FirstSetAns stFirstSetAns, List<RspStkInfoField> QryStkInfoAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询证券信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgQryStkInfo(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388367";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgQryStkInfo(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, QryStkInfoAns);
            return RetCode;
        }
        
        //订阅主题
        public static int StkSubTopic(IntPtr Handle, string Topic, string Filter, string DataSet)
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
        public static int StkUnSubTopic(IntPtr Handle, string Topic, string AcceptSn)
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

        //系统连接，用于外部再调用
        public static int ServerConnect(ref IntPtr Handle, string ipAddress, int port)
        {
            maCliApi.maCli_Init(ref Handle);

            ST_MACLI_CONNECT_OPTION ConnOpt = new ST_MACLI_CONNECT_OPTION();
            IntPtr PtrConnOpt = Marshal.AllocHGlobal(Marshal.SizeOf(ConnOpt));
            ConnOpt.nCommType = 3;
            ConnOpt.nProtocal = 1;
            ConnOpt.szSvrAddress = ipAddress; //连接服务器地址
            ConnOpt.nSvrPort = port; //连接服务器端口
            Marshal.StructureToPtr(ConnOpt, PtrConnOpt, false);
            RetCode = maCliApi.maCli_SetOptions(Handle, (int)MACLI_OPTION.CONNECT_PARAM, PtrConnOpt, Marshal.SizeOf(ConnOpt));
            Marshal.FreeHGlobal(PtrConnOpt);

            int SyncTimeout = 1;
            IntPtr PtrSyncTimeout = Marshal.AllocHGlobal(Marshal.SizeOf(SyncTimeout));
            Marshal.WriteInt32(PtrSyncTimeout, SyncTimeout);
            RetCode = maCliApi.maCli_SetOptions(Handle, (int)MACLI_OPTION.SYNCCALL_TIMEOUT, PtrSyncTimeout, Marshal.SizeOf(SyncTimeout));
            Marshal.FreeHGlobal(PtrSyncTimeout);

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
                return -1;
            }
            Console.WriteLine("客户端与服务器成功建立通信连接");
            return 0;
        }

        //功能选项菜单
        public static void StkMenu()
        {
            Console.WriteLine("----------------------------------------------------------------------------------------------");
            Console.WriteLine("      1:现货登录           ");
            Console.WriteLine("      2:订阅主题请求         3:退订主题请求");
            Console.WriteLine("      4:股票委托             5:委托撤单             6:委托查询             7:成交查询");
            Console.WriteLine("      8:资金查询             9:股份查询             10:证券信息查询");
            Console.WriteLine("      m/M:菜单               x/X:退出");
            Console.WriteLine("----------------------------------------------------------------------------------------------");
        }
        static void Main(string[] args)
        {
            IntPtr Handle = IntPtr.Zero;

            RetCode = maCliApi.maCli_Init(ref Handle);

            ST_MACLI_CONNECT_OPTION ConnOpt = new ST_MACLI_CONNECT_OPTION();
            IntPtr PtrConnOpt = Marshal.AllocHGlobal(Marshal.SizeOf(ConnOpt));
            ConnOpt.nCommType = 3;
            ConnOpt.nProtocal = 1;
            ConnOpt.szSvrAddress = "192.168.25.223"; //连接服务器地址
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
            StkMenu();
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
                    StkMenu();
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
                            //股票登录
                            FirstSetAns FirstSet = new FirstSetAns(); //返回码以及提示信息
                            List<RspAcctLogin> UserLoginAns = new List<RspAcctLogin>(); //返回结果
                            ReqAcctLogin stReqAcctLogin = new ReqAcctLogin();
                            stReqAcctLogin.AcctType = "Z"; //账号类型:Z-资金账号，U-客户代码
                            stReqAcctLogin.AcctId = "1653039999"; //账号
                            stReqAcctLogin.Encryptkey = "111111"; //加密因子
                            stReqAcctLogin.AuthData = "111111"; //密码
                            stReqAcctLogin.AuthType = (byte)'0';
                            stReqAcctLogin.UseScope = (byte)'0';
                            RetCode = StkLogin(Handle, stReqAcctLogin, FirstSet, UserLoginAns);
                            break;
                        case 2:
                            //成交回报主题订阅
                            StkSubTopic(Handle, "MATCH10", stLoginInfo.ShAcct, "1");
                            StkSubTopic(Handle, "CONFIRM10", stLoginInfo.ShAcct, "1");
                            break;
                        case 3:
                            //主题退订
                            StkUnSubTopic(Handle, "MATCH*", "");
                            break;
                        case 4:
                            //委托StkOrder
                            ReqStkOrderField stReqOrder = new ReqStkOrderField();
                            stReqOrder.StkCode = "603657";
                            stReqOrder.OrderQty = 300;
                            stReqOrder.OrderPrice = "19.97";
                            stReqOrder.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOrder.CustCode = long.Parse(stLoginInfo.CustCode);
                            stReqOrder.Trdacct = stLoginInfo.ShAcct;
                            stReqOrder.Stkbd = "10";
                            stReqOrder.StkBiz = 100;
                            stReqOrder.StkBizAction = 100;
                            stReqOrder.SecurityLevel = (byte)'1';
                            
                            for (int i = 0; i < 1; i++)
                            {
                                FirstSetAns stFirst = new FirstSetAns();
                                List<RspStkOrderField> AnsOrder = new List<RspStkOrderField>();
                                StkOrder(Handle, stReqOrder, stFirst, AnsOrder);
                            }
                            break;
                        case 5:
                            //委托撤单StkCancelOrder
                            ReqStkCancelOrderField stReqCancel = new ReqStkCancelOrderField();
                            stReqCancel.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqCancel.OrderId = "5300900016";
                            stReqCancel.Stkbd = "10";
                            FirstSetAns stFirstCancel = new FirstSetAns();
                            List<RspStkCancelOrderField> AnsCancel = new List<RspStkCancelOrderField>();
                            StkCancelOrder(Handle, stReqCancel, stFirstCancel, AnsCancel);
                            break;
                        case 6:
                            //委托查询StkQryOrderInfo
                            ReqStkOrderInfoField stReqOrderInfo = new ReqStkOrderInfoField();
                            stReqOrderInfo.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqOrderInfo.OrderId = "5300900003";
                            stReqOrderInfo.QueryFlag = (byte)'0';
                            stReqOrderInfo.QueryNum = 100;
                            FirstSetAns stFirstInfo = new FirstSetAns();
                            List<RspStkOrderInfoField> AnsOrderInfo = new List<RspStkOrderInfoField>();
                            StkQryOrderInfo(Handle, stReqOrderInfo, stFirstInfo, AnsOrderInfo);
                            break;
                        case 7:
                            //成交查询StkQryMatchInfo
                            ReqStkMatchInfoField stReqMatchInfo = new ReqStkMatchInfoField();
                            stReqMatchInfo.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqMatchInfo.OrderId = "5300900002";
                            stReqMatchInfo.QueryFlag = (byte)'0';
                            stReqMatchInfo.QueryNum = 100;
                            FirstSetAns stFirstMatchInfo = new FirstSetAns();
                            List<RspStkMatchInfoField> AnsMatchInfo = new List<RspStkMatchInfoField>();
                            StkQryMatchInfo(Handle, stReqMatchInfo, stFirstMatchInfo, AnsMatchInfo);
                            break;
                        case 8:
                            //资金查询
                            FirstSetAns FirstSetFund = new FirstSetAns(); //返回码以及提示信息
                            ReqStkQryFundField stReqField = new ReqStkQryFundField();
                            stReqField.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqField.ValueFlag = 15;
                            List<RspStkQryFundField> rspFundField = new List<RspStkQryFundField>();
                            StkQryStkFund(Handle, stReqField, FirstSetFund, rspFundField);
                            break;
                        case 9:
                            FirstSetAns FirstSetShares = new FirstSetAns(); //返回码以及提示信息
                            ReqStkQrySharesField stReqShare = new ReqStkQrySharesField();
                            stReqShare.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            List<RspStkQrySharesField> rspSharesField = new List<RspStkQrySharesField>();
                            StkQryStkShares(Handle, stReqShare, FirstSetShares, rspSharesField);
                            break;
                        case 10:
                            FirstSetAns FirstStkInfo = new FirstSetAns(); //返回码以及提示信息
                            ReqStkInfoField stReqStkInfo = new ReqStkInfoField();
                            stReqStkInfo.Stkbd = "00";
                            stReqStkInfo.StkCode = "002230";
                            List<RspStkInfoField> rspStkInfoField = new List<RspStkInfoField>();
                            StkQryStkInfoQk(Handle, stReqStkInfo, FirstStkInfo, rspStkInfoField);
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
