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
    class cosFunc
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
            }
            else if (FuncId == "00102025")
            {
                //中台确认推送 TSU_ORDER
                RtnTsuOrderField FieldData = new RtnTsuOrderField();
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "ORDER_BSN");
                FieldData.OrderId = _maCli_GetValueS(Handle, Buf, 64, "ORDER_ID");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "ORDER_NO");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "ORDER_DATE");
                FieldData.OrderTime = _maCli_GetValueS(Handle, Buf, 64, "ORDER_TIME");
                FieldData.CuacctCode = _maCli_GetValueS(Handle, Buf, 64, "CUACCT_CODE");
                FieldData.OrderPrice = _maCli_GetValueS(Handle, Buf, 64, "ORDER_PRICE");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "ORDER_QTY");
                FieldData.OrderAmt = _maCli_GetValueS(Handle, Buf, 64, "ORDER_AMT");
                FieldData.OrderFrzAmt = _maCli_GetValueS(Handle, Buf, 64, "ORDER_FRZ_AMT");
                FieldData.Stkpbu = _maCli_GetValueS(Handle, Buf, 64, "STKPBU");
                FieldData.Stkbd = _maCli_GetValueS(Handle, Buf, 64, "STKBD");
                FieldData.StkCode = _maCli_GetValueS(Handle, Buf, 64, "STK_CODE");
                FieldData.StkName = _maCli_GetValueS(Handle, Buf, 64, "STK_NAME");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "STK_BIZ");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "STK_BIZ_ACTION");
                FieldData.Trdacct = _maCli_GetValueS(Handle, Buf, 64, "TRDACCT");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.CuacctSn, "CUACCT_SN");
                FieldData.OptNum = _maCli_GetValueS(Handle, Buf, 64, "OPT_NUM");
                FieldData.OptCode = _maCli_GetValueS(Handle, Buf, 64, "OPT_CODE");
                FieldData.OptName = _maCli_GetValueS(Handle, Buf, 64, "OPT_NAME");
                FieldData.OptUndlCode = _maCli_GetValueS(Handle, Buf, 64, "OPT_UNDL_CODE");
                maCliApi.maCli_GetValueC(Handle, ref FieldData.ExeStatus, "EXE_STATUS");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.FrontId, "FRONT_ID");
                maCliApi.maCli_GetValueL(Handle, ref FieldData.SessionId, "SESSION_ID");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.ErrorId, "ERROR_ID");
                FieldData.ErrorMsg = _maCli_GetValueS(Handle, Buf, 64, "ERROR_MSG");
                maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderChange, "ORDER_CHANGE");
                FieldData.CliOrderNo = _maCli_GetValueS(Handle, Buf, 64, "CLI_ORDER_NO");
                Console.WriteLine("[量化委托确认回报]");
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
            RetCode = maCliApi.maCli_SetHdrValueS(Handle, System.DateTime.Now.TimeOfDay.ToString(), (int)MACLI_HEAD_FID.TIMESTAMP);
            maCliApi.maCli_SetHdrValueS(Handle, SessionId, (int)MACLI_HEAD_FID.USER_SESSION); //用户session值
            maCliApi.maCli_SetHdrValueC(Handle, 0x30, (int)MACLI_HEAD_FID.BIZ_CHANNEL);

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
            if (Value == null)
            {
                return -1;
            }
            return maCliApi.maCli_SetValueS(Handle, Value, FieldIdx);//合约编码
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

        //COS量化登录组包
        public static void MakePkgCosConn(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosLogin stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10388750", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.UserCode, "8080");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            _maCli_SetValueS(Handle, stReqField.EncryptKey, "9086");
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, stReqField.EncryptKey);
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");
            _maCli_SetValueS(Handle, "0", "9000");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //COS量化登录解包
        public static int ParsePkgCosConn(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "量化登录请求响应", stFirstSetAns);
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
                    RspCosLogin FieldData = new RspCosLogin();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8080");
                    FieldData.UserCode = Marshal.PtrToStringAnsi(Buf);
                    stLoginInfo.UserCode = FieldData.UserCode; //保存用户代码
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8081");
                    FieldData.PhoneNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "8814");
                    FieldData.SessionId = Marshal.PtrToStringAnsi(Buf);
                    stLoginInfo.SessionId = FieldData.SessionId; //保存session值
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.MenuValidDays, "8941");
                    //maCliApi.maCli_GetValueC(Handle, ref FieldData.IsLv2Auth, "8989");
                    //maCliApi.maCli_GetValueC(Handle, ref FieldData.MtkProType, "8990");
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

        //用户登录组包
        public static void MakePkgAcctLogin(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqAcctLogin stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            stLoginInfo.CuacctType = (byte)'0';
            SetPacketHead(Handle, "10301105", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.AcctType, "8987");
            _maCli_SetValueS(Handle, stReqField.AcctId, "9081");
            _maCli_SetValueS(Handle, "0", "9082");
            _maCli_SetValueS(Handle, stReqField.Encryptkey, "9086");
            _maCli_SetValueS(Handle, "0", "9083");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, "111111");
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");
            stLoginInfo.EnAuthData = Marshal.PtrToStringAnsi(szAuthData);

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //用户登录解包
        public static int ParsePkgAcctLogin(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspUserLogin> UserLoginAns)
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
                    RspUserLogin FieldData = new RspUserLogin();

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

        //信用登录组包
        public static void MakePkgAcctLoginFisl(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqAcctLogin stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            stLoginInfo.CuacctType = (byte)'3';
            SetPacketHead(Handle, "10301105", (byte)'T', (byte)'B');
            _maCli_SetValueS(Handle, stReqField.AcctType, "8987");
            _maCli_SetValueS(Handle, stReqField.AcctId, "9081");
            _maCli_SetValueS(Handle, "0", "9082");
            _maCli_SetValueS(Handle, stReqField.Encryptkey, "9086");
            _maCli_SetValueS(Handle, "0", "9083");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, "111111");
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");
            stLoginInfo.EnAuthData = Marshal.PtrToStringAnsi(szAuthData);

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //COS量化委托组包
        public static void MakePkgCosOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosOrderField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10388101", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.CustCode, "8902");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            maCliApi.maCli_SetValueC(Handle, stReqField.Exchange, "207");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBizAction, "40");
            _maCli_SetValueS(Handle, stReqField.TrdCode, "48");
            _maCli_SetValueS(Handle, stReqField.OptNum, "9083");//合约编码
            maCliApi.maCli_SetValueN(Handle, stReqField.IntOrg, "8821");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            maCliApi.maCli_SetValueL(Handle, stReqField.OrderQty, "38");
            _maCli_SetValueS(Handle, stReqField.OrderPrice, "44");
            _maCli_SetValueS(Handle, stReqField.StopPrice, "8975");
            _maCli_SetValueS(Handle, stReqField.OrderAttr, "9100");
            maCliApi.maCli_SetValueN(Handle, stReqField.ValidDate, "8859");//截止日期
            maCliApi.maCli_SetValueN(Handle, stReqField.TrdCodeCls, "8970");
            maCliApi.maCli_SetValueN(Handle, stReqField.AttrCode, "9101");
            maCliApi.maCli_SetValueN(Handle, stReqField.BgnExeTime, "916");
            maCliApi.maCli_SetValueN(Handle, stReqField.EndExeTime, "917");
            _maCli_SetValueS(Handle, stReqField.SpreadName, "8971");//组合名称
            _maCli_SetValueS(Handle, stReqField.UndlCode, "8972");//行权价格
            maCliApi.maCli_SetValueN(Handle, stReqField.ConExpDate, "8976");//合约到期日
            _maCli_SetValueS(Handle, stReqField.ExercisePrice, "8973");//行权价
            maCliApi.maCli_SetValueL(Handle, stReqField.ConUnit, "8974");//合约单位
            _maCli_SetValueS(Handle, stReqField.CliOrderNo, "9102");//客户端委托编号
            _maCli_SetValueS(Handle, stReqField.CliRemark, "8914");//留痕信息
            _maCli_SetValueS(Handle, stReqField.BusinessUnit, "8717");//业务单元
            _maCli_SetValueS(Handle, stReqField.GtdData, "8723");//GTD日期
            maCliApi.maCli_SetValueC(Handle, stReqField.ContingentCondition, "8713");//触发条件
            maCliApi.maCli_SetValueC(Handle, stReqField.ForceCloseReason, "8715");//强平原因
            maCliApi.maCli_SetValueN(Handle, stReqField.IsSwapOrder, "8720");//互换单标志
            _maCli_SetValueS(Handle, stReqField.OrderIdEx, "9093");//外部合同序号
            maCliApi.maCli_SetValueC(Handle, stReqField.CuacctType, "8826");//账户类型

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS量化委托解包
        public static int ParsePkgCosOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspCosOrderField> CosOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "量化委托请求响应", stFirstSetAns);
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
                    RspCosOrderField FieldData = new RspCosOrderField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9102");
                    FieldData.CliOrderNo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "9106");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8845");
                    FieldData.OrderTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.ExeStatus, "9103");
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "9104");
                    FieldData.ExeInfo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.TrdCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8972");
                    FieldData.UndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "8920");
                    FieldData.CuacctCode = Marshal.PtrToStringAnsi(Buf);
                    Marshal.FreeHGlobal(Buf);
                    CosOrderAns.Add(FieldData);
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

        //COS委托撤单组包
        public static void MakePkgCosCancelOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosCancelOrderField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10388102", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.CuacctCode, "8920");//资金账户
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");//交易板块
            maCliApi.maCli_SetValueN(Handle, stReqField.IntOrg, "8911");//内部机构
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderDate, "8834");//委托日期
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderNo, "9106");//委托编号
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");//委托批号
            maCliApi.maCli_SetValueC(Handle, stReqField.CuacctType, "8826");//账户类型
            //stReqField.CliRemark = AutoFillClientInfo(Handle, stReqField.CliRemark); //后面跟随API3.2启用，按最新终端信息规范自动填充
            _maCli_SetValueS(Handle, stReqField.CliRemark, "8914");//留痕信息

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS量化撤单解包
        public static int ParsePkgCosCancelOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspCosCancelOrderField> CosCancelOrderAns)
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
                    RspCosCancelOrderField FieldData = new RspCosCancelOrderField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8920");
                    FieldData.CuacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "9106");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9102");
                    FieldData.CliOrderNo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.ExeStatus, "9103");
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "9104");
                    FieldData.ExeInfo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.TrdCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8972");
                    FieldData.UndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CancelStatus, "9080");
                    CosCancelOrderAns.Add(FieldData);
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

        //COS委托查询组包
        public static void MakePkgCosOrderInfo(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosOrderInfoField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);

            SetPacketHead(Handle, "10388301", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            maCliApi.maCli_SetValueN(Handle, stReqField.TrdCodeCls, "8970");
            _maCli_SetValueS(Handle, stReqField.TrdCode, "48");
            _maCli_SetValueS(Handle, stReqField.OptNum, "9082");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderNo, "9106");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            maCliApi.maCli_SetValueN(Handle, stReqField.AttrCode, "9101");
            maCliApi.maCli_SetValueN(Handle, stReqField.BgnExeTime, "916");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            maCliApi.maCli_SetValueC(Handle, stReqField.Flag, "9081");
            maCliApi.maCli_SetValueC(Handle, stReqField.CuacctType, "8826");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS委托查询解包
        public static int ParsePkgCosOrderInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspCosOrderInfoField> CosOrderInfoAns)
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
                    RspCosOrderInfoField FieldData = new RspCosOrderInfoField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8920");
                    FieldData.CuacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8902");
                    FieldData.CustCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Exchange, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.TrdCodeCls, "8970");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.TrdCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8845");
                    FieldData.OrderTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "9106");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.OrderQty, "38");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "44");
                    FieldData.OrderPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8975");
                    FieldData.StopPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.ValidDate, "8859");
                    maCliApi.maCli_GetValueS(Handle, Buf, 256, "9100");
                    FieldData.OrderAttr = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.AttrCode, "9101");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.BgnExeTime, "916");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.EndExeTime, "917");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8971");
                    FieldData.SpreadName = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8972");
                    FieldData.UndlCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.ConExpDate, "8976");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8973");
                    FieldData.ExercisePrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.ConUnit, "8974");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9102");
                    FieldData.CliOrderNo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 256, "8914");
                    FieldData.CliRemark = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.ExeStatus, "9103");
                    maCliApi.maCli_GetValueS(Handle, Buf, 128, "9104");
                    FieldData.ExeInfo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.ExeQty, "9105");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.MatchedQty, "387");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.WithdrawnQty, "8837");
                    maCliApi.maCli_GetValueS(Handle, Buf, 256, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 256, "8757");
                    FieldData.UpdateTime = Marshal.PtrToStringAnsi(Buf);
                    CosOrderInfoAns.Add(FieldData); //存到返回结果
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

        //COS自定义蓝子委托组包
        public static void MakePkgCosCustomBasketOrder(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosCustomBasketOrderField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10388108", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.CustCode, "8902");
            _maCli_SetValueS(Handle, stReqField.CuacctCode, "8920");
            maCliApi.maCli_SetValueC(Handle, stReqField.CuacctType, "8826");
            _maCli_SetValueS(Handle, stReqField.SubsysConnstr, "8827");
            maCliApi.maCli_SetValueN(Handle, stReqField.PassNum, "8828");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBiz, "8842");
            maCliApi.maCli_SetValueN(Handle, stReqField.StkBizAction, "40");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.StrategyText, "58");
            _maCli_SetValueS(Handle, stReqField.HdId, "9015");
            _maCli_SetValueS(Handle, stReqField.TrdTermcode, "9012");
            maCliApi.maCli_SetValueN(Handle, stReqField.CuacctSn, "8928");
            maCliApi.maCli_SetValueC(Handle, stReqField.ErrorFlag, "9082");
            maCliApi.maCli_SetValueC(Handle, stReqField.PublishCtrlFlag, "9083");
            _maCli_SetValueS(Handle, stReqField.CliRemark, "8914");
            maCliApi.maCli_SetValueN(Handle, stReqField.IntOrg, "8911");
            _maCli_SetValueS(Handle, stReqField.CliOrderNo, "9102");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS自定义蓝子委托解包
        public static int ParsePkgCosCustomBasketOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspCosCustomBasketOrderField> CosCustomBasketOrderAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "篮子委托请求响应", stFirstSetAns);
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
                    RspCosCustomBasketOrderField FieldData = new RspCosCustomBasketOrderField();

                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8920");
                    FieldData.CuacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CuacctType, "8826");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8845");
                    FieldData.OrderTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.ExeStatus, "9103");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9104");
                    FieldData.ExeInfo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    CosCustomBasketOrderAns.Add(FieldData);
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

        //COS成交查询组包
        public static void MakePkgCosMatchInfo(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqCosMatchInfoField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10388312", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.CuacctCode, "8920");
            _maCli_SetValueS(Handle, stReqField.Stkbd, "625");
            maCliApi.maCli_SetValueC(Handle, stReqField.CuacctType, "8826");
            _maCli_SetValueS(Handle, stReqField.TrdCode, "48");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderNo, "9106");
            maCliApi.maCli_SetValueN(Handle, stReqField.OrderBsn, "66");
            _maCli_SetValueS(Handle, stReqField.Trdacct, "448");
            _maCli_SetValueS(Handle, stReqField.OptNum, "9082");
            maCliApi.maCli_SetValueC(Handle, stReqField.QueryFlag, "9080");
            _maCli_SetValueS(Handle, stReqField.QueryPos, "8991");
            maCliApi.maCli_SetValueN(Handle, stReqField.QueryNum, "8992");
            _maCli_SetValueS(Handle, stReqField.CliOrderNo, "9102");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS成交查询解包
        public static int ParsePkgCosMatchInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspCosMatchInfoField> CosMatchInfoAns)
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
                    RspCosMatchInfoField FieldData = new RspCosMatchInfoField();

                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8991");
                    FieldData.QryPos = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderDate, "8834");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.MatchedType, "8992");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "17");
                    FieldData.MatchedSn = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderBsn, "66");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CliOrderGroupNo, "9301");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8858");
                    FieldData.ClientId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.OrderNo, "9106");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "11");
                    FieldData.OrderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8920");
                    FieldData.CuacctCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CuacctType, "8826");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8902");
                    FieldData.CustCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "448");
                    FieldData.Trdacct = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Exchange, "207");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "625");
                    FieldData.Stkbd = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBiz, "8842");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.StkBizAction, "40");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "48");
                    FieldData.TrdCode = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.MatchedQty, "387");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8841");
                    FieldData.MatchedPrice = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.MatchedDate, "8839");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8840");
                    FieldData.MatchedTime = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.Subsys, "9080");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.SubsysSn, "8988");
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.ErrorId, "8900");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8901");
                    FieldData.ErrorMsg = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8890");
                    FieldData.BrokerId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8724");
                    FieldData.ParticipantId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.TradingRole, "8763");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8741");
                    FieldData.CombOffsetFlag = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8742");
                    FieldData.CombHedgeFlag = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.PriceSource, "8765");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8726");
                    FieldData.TraderId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8759");
                    FieldData.ClearingPartId = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.BrokerOrderSeq, "8746");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9082");
                    FieldData.OptNum = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsWithdraw, "8836");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8504");
                    FieldData.MatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8831");
                    FieldData.OrderFrzAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8755");
                    FieldData.TotalMatchedAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8853");
                    FieldData.RltSettAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.TotalMatchedQty, "8753");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.WithdrawnQty, "8837");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.OrderStatus, "39");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9102");
                    FieldData.CliOrderNo = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "55");
                    FieldData.TrdCodeName = Marshal.PtrToStringAnsi(Buf);
                    CosMatchInfoAns.Add(FieldData);
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

        //COS可用资金查询组包
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

        //COS可用资金查询解包
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

        //COS可用股份查询组包
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

        //COS可用股份查询解包
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
                    FieldData.CostPrice = Marshal.PtrToStringAnsi(Buf);
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

        //主题订阅
        public static void MakePkgSubTopic(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqSubTopicField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "00102012", (byte)'Q', (byte)'S');

            _maCli_SetValueS(Handle, stReqField.Topic, "TOPIC");
            _maCli_SetValueS(Handle, stReqField.Filter, "FILTER");
            maCliApi.maCli_SetValueS(Handle, stReqField.DataSet, "DATA_SET");

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

        //COS客户负债查询组包
        public static void MakePkgCreditCustDebts(IntPtr Handle, out IntPtr ReqData, out int ReqDataLen, ReqFislQryCreditCustDebtsField stReqField)
        {
            maCliApi.maCli_BeginWrite(Handle);
            SetPacketHead(Handle, "10323006", (byte)'T', (byte)'B');

            maCliApi.maCli_SetValueL(Handle, stReqField.CuacctCode, "8920");
            maCliApi.maCli_SetValueC(Handle, stReqField.Currency, "15");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS客户负债查询解包
        public static int ParsePkgCreditCustDebts(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen, FirstSetAns stFirstSetAns, List<RspFislQryCreditCustDebtsField> FislQryCreditCustDebtsAns)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "信用账户资金查询请求响应", stFirstSetAns);
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
                    RspFislQryCreditCustDebtsField FieldData = new RspFislQryCreditCustDebtsField();

                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CustCode, "8902");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.CuacctCode, "8920");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.Currency, "15");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9240");
                    FieldData.FiRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9241");
                    FieldData.SlRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9141");
                    FieldData.FreeIntRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.CreditStatus, "9242");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9243");
                    FieldData.MarginRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9244");
                    FieldData.RealRate = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9245");
                    FieldData.TotalAssert = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9246");
                    FieldData.TotalDebts = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9081");
                    FieldData.MarginValue = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8861");
                    FieldData.FundAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8984");
                    FieldData.FundBln = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9247");
                    FieldData.SlAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9248");
                    FieldData.GuaranteOut = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9222");
                    FieldData.ColMktVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9224");
                    FieldData.FiAmt = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9227");
                    FieldData.TotalFiFee = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9249");
                    FieldData.FiTotalDebts = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9251");
                    FieldData.SlMktVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9237");
                    FieldData.TotalSlFee = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9250");
                    FieldData.SlTotalDebts = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9154");
                    FieldData.FiCredit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9220");
                    FieldData.FiCreditAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9252");
                    FieldData.FiCreditFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9155");
                    FieldData.SlCredit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9230");
                    FieldData.SlCreditAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9253");
                    FieldData.SlCreditFrz = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9254");
                    FieldData.Rights = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9255");
                    FieldData.RightsUncomer = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.RightsQty, "9256");
                    maCliApi.maCli_GetValueL(Handle, ref FieldData.RightsQtyUncomer, "9257");
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9258");
                    FieldData.TotalCredit = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9259");
                    FieldData.TotalCteditAvl = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9853");
                    FieldData.FiUsedMargin = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9854");
                    FieldData.SlUsedMargin = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9858");
                    FieldData.OpenFiMtkConVal = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9301");
                    FieldData.FiContractPlval = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9302");
                    FieldData.SlContractPlval = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "8999");
                    FieldData.Mayrepay = Marshal.PtrToStringAnsi(Buf);
                    maCliApi.maCli_GetValueS(Handle, Buf, 64, "9001");
                    FieldData.StkValue = Marshal.PtrToStringAnsi(Buf);
                    FislQryCreditCustDebtsAns.Add(FieldData);
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

        /**************************功能调用操作**************************/

        //量化登录
        public static int CosLogin(IntPtr Handle, ReqCosLogin stReqCosLogin, FirstSetAns stFirstSetAns)//传入量化登录对象
        {
            //******登录COS
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosConn(Handle, out ReqData, out ReqDataLen, stReqCosLogin); //请求组包

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388750";
            SyscCall.strMsgId = "10388750103887501038875010388750";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen); //同步调用
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosConn(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns); //解析返回包
            return RetCode;
        }

        //用户登录
        public static int AcctLogin(IntPtr Handle, ReqAcctLogin stReqAcctLogin, FirstSetAns stFirstSetAns, List<RspUserLogin> UserLoginAns)//传入量化登录对象
        {
            //******调用账户登录
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgAcctLogin(Handle, out ReqData, out ReqDataLen, stReqAcctLogin);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10301105";
            SyscCall.strMsgId = "10301105103011051030110510301105";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgAcctLogin(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, UserLoginAns);
            return RetCode;
        }

        //信用登录
        public static int AcctLoginFisl(IntPtr Handle, ReqAcctLogin stReqAcctLogin, FirstSetAns stFirstSetAns, List<RspUserLogin> UserLoginAns)//传入量化登录对象
        {
            //******调用账户登录
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgAcctLoginFisl(Handle, out ReqData, out ReqDataLen, stReqAcctLogin);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10301105";
            SyscCall.strMsgId = "10301105103011051030110510301105";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgAcctLogin(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, UserLoginAns);
            return RetCode;
        }
        //量化委托
        public static int CosOrder(IntPtr Handle, ReqCosOrderField stReqCosOrderField, FirstSetAns stFirstSetAns, List<RspCosOrderField> CosOrderAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******进行委托报单
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosOrder(Handle, out ReqData, out ReqDataLen, stReqCosOrderField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388101";
            SyscCall.strMsgId = "10388101103881011038810110388101";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, CosOrderAns);
            return RetCode;
        }

        //量化委托撤单
        public static int CosCancelOrder(IntPtr Handle, ReqCosCancelOrderField stReqCosCancelOrderField, FirstSetAns stFirstSetAns, List<RspCosCancelOrderField> CosCancelOrderAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******撤单操作
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosCancelOrder(Handle, out ReqData, out ReqDataLen, stReqCosCancelOrderField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388102";
            SyscCall.strMsgId = "10388101103881011038810110388101";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosCancelOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, CosCancelOrderAns);
            return RetCode;
        }

        //量化委托查询
        public static int CosQryOrderInfo(IntPtr Handle, ReqCosOrderInfoField stReqCosOrderInfoField, FirstSetAns stFirstSetAns, List<RspCosOrderInfoField> CosOrderInfoAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询委托信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosOrderInfo(Handle, out ReqData, out ReqDataLen, stReqCosOrderInfoField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388301";
            SyscCall.strMsgId = "10388301103883011038830110388301";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosOrderInfo(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, CosOrderInfoAns);
            return RetCode;
        }

        //量化成交查询
        public static int CosQryMatchInfo(IntPtr Handle, ReqCosMatchInfoField stReqField, FirstSetAns stFirstSetAns, List<RspCosMatchInfoField> CosMatchInfoAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询成交信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosMatchInfo(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388312";
            SyscCall.strMsgId = "10388312103883121038831210388312";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosMatchInfo(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, CosMatchInfoAns);
            return RetCode;
        }

        //量化批量委托
        public static int CosCustomBasketOrder(IntPtr Handle, ReqCosCustomBasketOrderField stReqField, FirstSetAns stFirstSetAns, List<RspCosCustomBasketOrderField> CosCustomBasketOrderAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******进行批量委托下单
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCosCustomBasketOrder(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10388108";
            SyscCall.strMsgId = "10388108103881081038810810388108";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCosCustomBasketOrder(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, CosCustomBasketOrderAns);
            return RetCode;
        }

        //资金查询
        public static int CosQryStkFund(IntPtr Handle, ReqStkQryFundField stReqField, FirstSetAns stFirstSetAns, List<RspStkQryFundField> StkQryFundAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询资金信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkQryFund(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10303001";
            SyscCall.strMsgId = "10303001103030011030300110303001";
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
        public static int CosQryStkShares(IntPtr Handle, ReqStkQrySharesField stReqField, FirstSetAns stFirstSetAns, List<RspStkQrySharesField> StkQrySharesAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询股份信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgStkQryShares(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10303002";
            SyscCall.strMsgId = "10303002103030021030300210303002";
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
            SyscCall.strMsgId = "001020120010201200102012";
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
            SyscCall.strMsgId = "001020120010201200102012";
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

        //客户负债查询--信用
        public static int CosQryCreditCustDebts(IntPtr Handle, ReqFislQryCreditCustDebtsField stReqField, FirstSetAns stFirstSetAns, List<RspFislQryCreditCustDebtsField> FislQryCreditCustDebtsAns)
        {
            if (CheckIsLogin() == -1) return -1;
            //******查询资金信息
            IntPtr ReqData;
            int ReqDataLen;
            MakePkgCreditCustDebts(Handle, out ReqData, out ReqDataLen, stReqField);

            ST_MACLI_SYNCCALL SyscCall = new ST_MACLI_SYNCCALL();
            SyscCall.strFuncId = "10303001";
            SyscCall.strMsgId = "10303001103030011030300110303001";
            SyscCall.nTimeout = 0;
            IntPtr AnsData;
            int AnsDataLen;
            RetCode = maCliApi.maCli_SyncCall2(Handle, ref SyscCall, ReqData, ReqDataLen, out AnsData, out AnsDataLen);
            if (RetCode != 0)
            {
                Console.WriteLine("maCli_SyncCall2 Call end ,iRetCode={0}", RetCode);
                return -1;
            }
            RetCode = ParsePkgCreditCustDebts(Handle, ref AnsData, ref AnsDataLen, stFirstSetAns, FislQryCreditCustDebtsAns);
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
        public static void CosMenu()
        {
            Console.WriteLine("      101:量化登录           0:现货登录             1:信用登录");
            Console.WriteLine("      2:订阅主题请求         3:退订主题请求");
            Console.WriteLine("      4:量化委托             5:批量委托             6:委托撤单");
            Console.WriteLine("      7:委托查询             8:成交查询             9:资金查询             10:股份查询");
            Console.WriteLine("      m/M:菜单               x/X:退出");
        }
        static void Main(string[] args)
        {
            IntPtr Handle = IntPtr.Zero;
            
            RetCode = maCliApi.maCli_Init(ref Handle);

            ST_MACLI_CONNECT_OPTION ConnOpt = new ST_MACLI_CONNECT_OPTION();
            IntPtr PtrConnOpt = Marshal.AllocHGlobal(Marshal.SizeOf(ConnOpt));
            ConnOpt.nCommType = 3;
            ConnOpt.nProtocal = 1;
            ConnOpt.szSvrAddress = "192.168.25.24"; //连接服务器地址
            ConnOpt.nSvrPort = 42000; //连接服务器端口
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
                        case 101:
                            //量化登录测试CosLogin
                            FirstSetAns FirstSetLogin = new FirstSetAns(); //返回码以及提示信息
                            ReqCosLogin stReqCosLogin = new ReqCosLogin();
                            stReqCosLogin.UserCode = "112358";
                            stReqCosLogin.AuthData = "111111";
                            stReqCosLogin.EncryptKey = "123456";
                            CosLogin(Handle, stReqCosLogin, FirstSetLogin);
                            break;
                        case 0:
                            //账户登录测试
                            //账户登录
                            FirstSetAns FirstSet = new FirstSetAns(); //返回码以及提示信息
                            List<RspUserLogin> UserLoginAns = new List<RspUserLogin>(); //返回结果
                            ReqAcctLogin stReqAcctLogin = new ReqAcctLogin();
                            stReqAcctLogin.AcctType = "Z"; //账号类型:Z-资金账号，U-客户代码
                            stReqAcctLogin.AcctId = "1653039999"; //账号
                            stReqAcctLogin.Encryptkey = "111111"; //加密因子
                            stReqAcctLogin.AuthData = "111111"; //密码
                            RetCode = AcctLogin(Handle, stReqAcctLogin, FirstSet, UserLoginAns);
                            break;
                        case 1:
                            //账户登录测试
                            //账户登录
                            FirstSetAns FirstSetFisl = new FirstSetAns(); //返回码以及提示信息
                            List<RspUserLogin> UserLoginAnsFisl = new List<RspUserLogin>(); //返回结果
                            ReqAcctLogin stReqAcctLoginFisl = new ReqAcctLogin();
                            stReqAcctLoginFisl.AcctType = "Z"; //账号类型:Z-资金账号，U-客户代码
                            stReqAcctLoginFisl.AcctId = "1653123321"; //账号
                            stReqAcctLoginFisl.Encryptkey = "111111"; //加密因子
                            stReqAcctLoginFisl.AuthData = "111111"; //密码
                            RetCode = AcctLoginFisl(Handle, stReqAcctLoginFisl, FirstSetFisl, UserLoginAnsFisl);
                            break;
                        case 2:
                            //成交回报主题订阅
                            //CosSubTopic(Handle, "MARKET1", "*", "0");
                            //CosSubTopic(Handle, "MARKET0", "SZ002139", "0");
                            CosSubTopic(Handle, "TSU_ORDER", stLoginInfo.SzAcct, "1");
                            //CosSubTopic(Handle, "MATCH10", stLoginInfo.ShAcct, "1");
                            CosSubTopic(Handle, "MATCH00", stLoginInfo.SzAcct, "1");
                            break;
                        case 3:
                            //主题退订
                            CosUnSubTopic(Handle, "MATCH*", "");
                            break;
                        case 4:
                            //量化委托CosOrder
                            ReqCosOrderField stReqOrder = new ReqCosOrderField();
                            stReqOrder.TrdCode = "002230";
                            stReqOrder.OrderQty = 100;
                            stReqOrder.OrderPrice = "33.97";
                            stReqOrder.CuacctCode = stLoginInfo.CuacctCode;
                            stReqOrder.CustCode = stLoginInfo.CustCode;
                            stReqOrder.Trdacct = stLoginInfo.SzAcct;
                            stReqOrder.Stkbd = "00";
                            stReqOrder.StkBiz = 702;
                            stReqOrder.StkBizAction = 100;
                            stReqOrder.IntOrg = stLoginInfo.IntOrg;
                            
                            for (int i = 0; i < 1; i++)
                            {
                                stReqOrder.CliOrderNo = "20200527-23-"+i;
                                FirstSetAns stFirst = new FirstSetAns();
                                List<RspCosOrderField> AnsOrder = new List<RspCosOrderField>();
                                CosOrder(Handle, stReqOrder, stFirst, AnsOrder);
                            }
                            break;
                        case 5:
                            break;
                        case 6:
                            //委托撤单CosCancelOrder
                            break;
                        case 7:
                            //委托查询CosQryOrderInfo
                            break;
                        case 8:
                            break;
                        case 9:
                            //资金查询
                            FirstSetAns FirstSetFund = new FirstSetAns(); //返回码以及提示信息
                            ReqStkQryFundField stReqField = new ReqStkQryFundField();
                            stReqField.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            stReqField.ValueFlag = 15;
                            List<RspStkQryFundField> rspFundField = new List<RspStkQryFundField>();
                            CosQryStkFund(Handle, stReqField, FirstSetFund, rspFundField);
                            break;
                        case 10:
                            FirstSetAns FirstSetShares = new FirstSetAns(); //返回码以及提示信息
                            ReqStkQrySharesField stReqShare = new ReqStkQrySharesField();
                            stReqShare.CuacctCode = long.Parse(stLoginInfo.CuacctCode);
                            List<RspStkQrySharesField> rspSharesField = new List<RspStkQrySharesField>();
                            CosQryStkShares(Handle, stReqShare, FirstSetShares, rspSharesField);
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
