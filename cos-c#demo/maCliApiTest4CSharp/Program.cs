using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
namespace macli
{
    class Program
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

        public static int RetCode = 0;
        public static int size = 0;
        public static LoginInfo stLoginInfo = new LoginInfo(); //用于缓存登录信息

        public static void OnRecvPs(IntPtr id, IntPtr buff, int len) //成交回报
        {
            IntPtr Handle = IntPtr.Zero;
            RetCode = maCliApi.maCli_Init(ref Handle);
            RetCode = maCliApi.maCli_Parse(Handle, buff, len);

            RspCosMatchReportField FieldData = new RspCosMatchReportField();
            IntPtr Buf = Marshal.AllocHGlobal(256);
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
            maCliApi.maCli_GetValueL(Handle, ref FieldData.VolumeTraded, "VOLUME_TRADED");
            maCliApi.maCli_GetValueL(Handle, ref FieldData.WithdrawnQty, "WITHDRAWN_QTY");
            Marshal.FreeHGlobal(Buf);
            Console.WriteLine("[成交信息]");
            Console.WriteLine("{0}", FieldData.ToString());
            
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

        //固定入参传值
        public static void SetPacketHead(IntPtr Handle, string FunId, byte FunType, byte PktType)
        {
            IntPtr Buf = Marshal.AllocHGlobal(64 + 1);
            maCliApi.maCli_BeginWrite(Handle);
            string SessionId = stLoginInfo.CuacctCode != string.Empty ? stLoginInfo.CuacctCode : "0";
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

            _maCli_SetValueS(Handle, stLoginInfo.CuacctCode != string.Empty ? stLoginInfo.CuacctCode : "0", "8810");
            _maCli_SetValueS(Handle, "1", "8811");
            _maCli_SetValueS(Handle, "0", "8812");
            _maCli_SetValueS(Handle, "o", "8813");
            //maCliApi.maCli_GetVersion(Handle, Buf, 64);
            _maCli_SetValueS(Handle, SessionId, "8814");
            _maCli_SetValueS(Handle, FunId, "8815");
            _maCli_SetValueS(Handle, System.DateTime.Now.TimeOfDay.ToString(), "8816");
            maCliApi.maCli_SetValueN(Handle, stLoginInfo.IntOrg, "8821");
            _maCli_SetValueS(Handle, "0", "8826");//操作账户类型字符型 需要调整

            Marshal.FreeHGlobal(Buf);
        }

        //解析第一结果集
        public static int ParseAnsTb1(IntPtr Handle, string FuncRemark)
        {
            RetCode = maCliApi.maCli_OpenTable(Handle, 1);
            RetCode = maCliApi.maCli_ReadRow(Handle, 1);
            maCliApi.maCli_GetValueN(Handle, ref RetCode, "8817"); //返回值，错误代码
            IntPtr MsgText = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_GetValueS(Handle, MsgText, 256, "8819"); //返回信息
            Console.WriteLine("{0}:{1}|{2}", FuncRemark, RetCode, Marshal.PtrToStringAnsi(MsgText));
            Marshal.FreeHGlobal(MsgText);
            return RetCode;
        }

        //返回异常处理
        public static void ThrowAnsError(IntPtr Handle, out int RetCode)
        {
            maCliApi.maCli_GetLastErrorCode(Handle, out RetCode);
            IntPtr ErrorMsg = Marshal.AllocHGlobal(64 + 1); ;
            maCliApi.maCli_GetLastErrorMsg(Handle, ErrorMsg, 64);
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
        public static int ParsePkgCosConn(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "量化登录请求响应");
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
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.IsLv2Auth, "8989");
                    maCliApi.maCli_GetValueC(Handle, ref FieldData.MtkProType, "8990");
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

            SetPacketHead(Handle, "10301105", (byte)'T', (byte)'B');

            _maCli_SetValueS(Handle, stReqField.AcctType, "8987");
            _maCli_SetValueS(Handle, stReqField.AcctId, "9081");
            _maCli_SetValueS(Handle, "0", "9082");
            _maCli_SetValueS(Handle, stReqField.Encryptkey, "9086");
            _maCli_SetValueS(Handle, "0", "9083");
            IntPtr szAuthData = Marshal.AllocHGlobal(256 + 1);
            maCliApi.maCli_ComEncrypt(Handle, szAuthData, 256, stReqField.AuthData, "111111");
            maCliApi.maCli_SetValue(Handle, szAuthData, 256, "9084");

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
            Marshal.FreeHGlobal(szAuthData);
        }

        //用户登录解包
        public static int ParsePkgAcctLogin(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "用户登录请求响应");
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
                    maCliApi.maCli_GetValueN(Handle, ref FieldData.IntOrg, "8911");
                    stLoginInfo.IntOrg = FieldData.IntOrg; //保存机构代码
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
        public static int ParsePkgCosOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "量化委托请求响应");
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

            maCliApi.maCli_EndWrite(Handle);

            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS量化撤单解包
        public static int ParsePkgCosCancelOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "委托撤单请求响应");
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
        public static int ParsePkgCosOrderInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "委托查询请求响应");
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

                    Marshal.FreeHGlobal(Buf);
                    Console.WriteLine("返回内容:[{0},{1}]", RowCount, Row+1);
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
        public static int ParsePkgCosCustomBasketOrder(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "篮子委托请求响应");
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
        public static int ParsePkgCosMatchInfo(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "成交查询请求响应");
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
            maCliApi.maCli_SetValueN(Handle, stReqField.ValueFlag, "9080");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS可用资金查询解包
        public static int ParsePkgStkQryFund(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "资金查询请求响应");
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
            maCliApi.maCli_SetValueC(Handle, stReqField.BizFlag, "8994");
            maCliApi.maCli_SetValueN(Handle, stReqField.IntOrg, "8911");

            maCliApi.maCli_EndWrite(Handle);
            maCliApi.maCli_Make(Handle, out ReqData, out ReqDataLen);
        }

        //COS可用股份查询解包
        public static int ParsePkgStkQryShares(IntPtr Handle, ref IntPtr AnsData, ref int AnsDataLen)
        {
            RetCode = maCliApi.maCli_Parse(Handle, AnsData, AnsDataLen);
            int TableCount;
            RetCode = maCliApi.maCli_GetTableCount(Handle, out TableCount);
            if (TableCount > 0)
            {
                ParseAnsTb1(Handle, "股份查询请求响应");
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

        /**************************自定义调用操作**************************/

        //量化登录
        public static int CosLogin(IntPtr Handle)//传入量化登录对象
        {
            //此处编辑输入参数
            ReqCosLogin stReqCosLogin = new ReqCosLogin();
            stReqCosLogin.UserCode = "112358";
            stReqCosLogin.AuthData = "111111";
            stReqCosLogin.EncryptKey = "123456";
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
            RetCode = ParsePkgCosConn(Handle, ref AnsData, ref AnsDataLen); //解析返回包
            return RetCode;
        }

        //用户登录
        public static int AcctLogin(IntPtr Handle)//传入量化登录对象
        {
            //此处编辑输入参数
            ReqAcctLogin stReqAcctLogin = new ReqAcctLogin();
            stReqAcctLogin.AcctType = "Z";
            stReqAcctLogin.AcctId = "1653130265";
            stReqAcctLogin.Encryptkey = "111111";
            stReqAcctLogin.AuthData = "111111";
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
            RetCode = ParsePkgAcctLogin(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //量化委托
        public static int CosOrder(IntPtr Handle)
        {
            //此处进行编辑入参，终端信息
            ReqCosOrderField stReqCosOrderField = new ReqCosOrderField();
            stReqCosOrderField.CuacctCode = "1653130265";
            stReqCosOrderField.CustCode = "1653130265";
            stReqCosOrderField.Trdacct = "A206021360";
            stReqCosOrderField.Exchange = (byte)'1';
            stReqCosOrderField.Stkbd = "10";
            stReqCosOrderField.StkBiz = 100;
            stReqCosOrderField.StkBizAction = 100;
            stReqCosOrderField.CuacctType = (byte)'0';
            stReqCosOrderField.TrdCode = "600050";
            stReqCosOrderField.IntOrg = 124;
            stReqCosOrderField.OrderQty = 100;
            stReqCosOrderField.OrderPrice = "5.42";
            stReqCosOrderField.AttrCode = 0;
            stReqCosOrderField.CliOrderNo = "20200413-1005-50001";
            stReqCosOrderField.CliRemark = "IP:10.10.10.1";
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
            RetCode = ParsePkgCosOrder(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //量化委托撤单
        public static int CosCancelOrder(IntPtr Handle)
        {
            //此处编辑入参
            ReqCosCancelOrderField stReqCosCancelOrderField = new ReqCosCancelOrderField();
            stReqCosCancelOrderField.CuacctCode = "1653039999";
            stReqCosCancelOrderField.IntOrg = 124;
            stReqCosCancelOrderField.Stkbd = "00";
            stReqCosCancelOrderField.OrderDate = 20200410;
            stReqCosCancelOrderField.OrderNo = 1500040502;
            stReqCosCancelOrderField.OrderBsn = 1500040502;
            stReqCosCancelOrderField.CuacctType = (byte)'0';
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
            RetCode = ParsePkgCosCancelOrder(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //量化委托查询
        public static int CosQryOrderInfo(IntPtr Handle)
        {
            //此处编辑入参
            ReqCosOrderInfoField stReqCosOrderInfoField = new ReqCosOrderInfoField();
            stReqCosOrderInfoField.CuacctCode = "1653039999";
            stReqCosOrderInfoField.CuacctType = (byte)'0';
            stReqCosOrderInfoField.QueryFlag = (byte)'0';
            stReqCosOrderInfoField.QueryNum = 100;
            stReqCosOrderInfoField.TrdCode = "600029";
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
            RetCode = ParsePkgCosOrderInfo(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //量化成交查询
        public static int CosQryMatchInfo(IntPtr Handle, ReqCosMatchInfoField stReqField)
        {
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
            RetCode = ParsePkgCosMatchInfo(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //量化批量委托
        public static int CosCustomBasketOrder(IntPtr Handle, ReqCosCustomBasketOrderField stReqField)
        {
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
            RetCode = ParsePkgCosCustomBasketOrder(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //资金查询
        public static int CosQryStkFund(IntPtr Handle, ReqStkQryFundField stReqField)
        {
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
            RetCode = ParsePkgStkQryFund(Handle, ref AnsData, ref AnsDataLen);
            return RetCode;
        }

        //股份查询
        public static int CosQryStkShares(IntPtr Handle, ReqStkQrySharesField stReqField)
        {
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
            RetCode = ParsePkgStkQryShares(Handle, ref AnsData, ref AnsDataLen);
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

        //功能选项菜单
        public static void CosMenu()
        {
            Console.WriteLine("      101:量化登录           0:现货登录");
            Console.WriteLine("      1:订阅主题请求         2:退订主题请求");
            Console.WriteLine("      3:量化委托             4:批量委托             5:委托撤单");
            Console.WriteLine("      6:委托查询             7:成交查询             8:资金查询             9:股份查询");
            Console.WriteLine("      m/M:菜单               x/X:退出");
        }

        static void Main(string[] args)
        {
            stLoginInfo.SessionId = ""; //会话凭证
            stLoginInfo.CuacctCode = ""; //资金账号
            stLoginInfo.IntOrg = 0; //机构编码
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
                    iSelect = int.Parse(str);
                    switch (iSelect)
                    {
                        case 101:
                            //量化登录测试
                            CosLogin(Handle);
                            break;
                        case 0:
                            //账户登录测试
                            AcctLogin(Handle);
                            break;
                        case 1:
                            //成交回报主题订阅
                            CosSubTopic(Handle, "MATCH*", "*", "0");
                            break;
                        case 2:
                            //主题退订
                            CosUnSubTopic(Handle, "MATCH*", "");
                            break;
                        case 3:
                            
                            CosOrder(Handle);
                            break;
                        case 4:
                            break;
                        case 5:
                            //委托撤单
                            CosCancelOrder(Handle);
                            break;
                        case 6:
                            //委托查询
                            CosQryOrderInfo(Handle);
                            break;
                        case 7:
                            break;
                        case 8:
                            break;
                        case 9:
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
