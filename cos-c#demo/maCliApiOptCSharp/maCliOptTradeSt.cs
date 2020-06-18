// 文件描述：期权API功能结构体定义
//--------------------------------------------------------------------------------------------------
// 修改日期      版本          作者            备注
//--------------------------------------------------------------------------------------------------
// 2020/6/12    001.000.001  SHENGHB          创建
//--------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace macli
{
    // 第1结果集内容
    public class FirstSetAns
    {
        public int RetCode; // 信息代码
        public string MsgText; // 信息内容
    };
    //-------------------------------10314001:用户登录------------------------------------
    public struct ReqOptUserLoginField
    {
        public string AcctType;          // 账户类型 'U':客户代码 'Z':资产账户
        public string AcctId;           // 账户标识
        public byte  UseScope;                 // 使用范围 '4':期权交易密码
        public byte  AuthType;                 // 认证类型 '0':密码
        public string AuthData;        // 认证数据(明文)
        public byte  EncryptType;              // 加密方式 ‘0’:金证KBSS系统加密 ‘1’:金证Win版集中交易加密 ‘2’:金证Unix版集中交易加密 ‘3’:外部重加密 ‘4’ : 外部加密
        public string EncryptKey;       // 加密因子
    }

    public struct RspOptUserLoginField
    {
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public byte  Stkex;                    // 交易市场
        public string Stkbd;             // 交易板块
        public string Trdacct;          // 证券账户
        public string SubacctCode;			// 证券账户子编码   2015/8/5
        public string OptTrdacct;			// 期权合约账户		2015/8/5
        public int IntOrg;                    // 内部机构
        public byte  TrdacctStatus;            // 账户状态
        public string Stkpbu;            // 交易单元
        public string AcctType;          // 账户类型 'U':客户代码 'Z':资产账户
        public string AcctId;           // 账户标识
        public string TrdacctName;      // 账户名称
        public string Session;         // 会话凭证
        public override string ToString()
        {
            return String.Format(@"客户代码:{0},资产账户:{1},交易市场:{2},交易板块:{3},证券账户:{4}," +
                "证券账户子编码{5},期权合约账户:{6},内部机构:{7},账户状态:{8},交易单元:{9},账户类型:{10},账户标识:{11}," +
                "账户名称:{12},会话凭证:{13}",
                CustCode, CuacctCode, ((char)Stkex).ToString(), Stkbd, Trdacct,
                SubacctCode, OptTrdacct, IntOrg, ((char)TrdacctStatus).ToString(), Stkpbu, AcctType, AcctId,
                TrdacctName, Session);
        }
    }

    //-------------------------------10312001:个股期权委托申报------------------------------------
    public struct ReqOptOrderField
    {
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public int IntOrg;                    // 内部机构
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Trdacct;          // 证券账户
        public string OptNum;           // 合约编码
        public string OrderPrice;       // 委托价格 CPRICE4 单位：元，精确到0.1厘
        public long OrderQty;                 // 委托数量
        public int StkBiz;                    // 证券业务 字典[STK_BIZ]
        public int StkBizAction;              // 证券业务行为 字典[STK_BIZ_ACTION]
        public string Stkpbu;            // 交易单元
        public int OrderBsn;                  // 委托批号
        public string ClientInfo;      // 终端信息 包括硬盘号\CPU\机器名等
        public byte  SecurityLevel;            // 安全手段 0:无安全 1:校验票据 2:校验密码
        public string SecurityInfo;    // 安全手段为校验票据则需填写票据,安全手段为密码则需填写交易密码密文
        public string OrderIdEx;        // 此序号为外部传入，期权系统不做任何处理
        public byte  EncryptType;	     //2015/8/3添加 加密方式
        public string EncryptKey;	//2015/8/3添加  加密因子
    }

    public struct RspOptOrderField
    {
        public int OrderBsn;                  // 委托批号
        public string OrderId;          // 合同序号
        public long CuacctCode;               // 资产账户
        public string OrderPrice;       // 委托价格 CPRICE4
        public long OrderQty;                 // 委托数量
        public string OrderAmt;			// 委托金额
        public string OrderFrzAmt;      // 委托冻结金额
        public string Stkpbu;            // 交易单元
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Trdacct;          // 证券账户
        public string SubacctCode;       // 证券账户子编码
        public string OptTrdacct;	 //2015/8/3添加期权合约账户 
        public string OptNum;           // 合约编码
        public string OptCode;          // 合约代码
        public string OptName;          // 合约简称
        public string OptUndlCode;       // 标的证券代码
        public string OptUndlName;      // 标的证券名称
        public int StkBiz;					// 证券业务
        public int StkBizAction;				// 证券业务行为
        public string OrderIdEx;        // 外部合同序号
        public override string ToString()
        {
            return String.Format(@"委托批号:{0},合同序号:{1},资金账户:{2},委托价格:{3},委托数量:{4},委托金额:{5},委托冻结金额:{6},交易单元:{7}," +
            "交易板块:{8},证券账户:{9},证券账户子编码:{10},期权合约账户:{11},合约编码:{12},合约代码:{13},标的证券代码:{14},标的证券名称:{15}," +
            "证券业务:{16},证券业务行为:{17},外部合同序号:{18}",
             OrderBsn, OrderId, CuacctCode, OrderPrice, OrderQty, OrderAmt, OrderFrzAmt, Stkpbu,
             Stkbd, Trdacct, SubacctCode, OptTrdacct, OptNum, OptCode, OptUndlCode, OptUndlName,
             StkBiz, StkBizAction, OrderIdEx);
        }
    }

    //-------------------------------10310502:股票期权委托撤单------------------------------------
    public struct ReqOptCancelOrderField
    {
        public long CuacctCode;               // 资产账户 
        public int IntOrg;                    // 内部机构 
        public string Stkbd;             // 交易板块 
        public string OrderId;          // 合同序号 
        public int OrderBsn;                  // 委托批号 
        public string ClientInfo;      // 客户端信息 1，通过mid接入时，值必须和固定入参F_OP_SITE(操作站点)的值保持一致； 2，通过其它方式接入时，值可以为空，如果送值，必须和固定入参F_OP_SITE(操作站点)的值保持一致
        public string OrderIdEx;        // 外部合同序号 此序号为外部传入，期权系统不做任何处理
        public byte  ForceWth;                 // 强撤标志 非1-非强撤；1-强撤
    }

    public struct RspOptCancelOrderField
    {
        public int OrderBsn;                  // 委托批号 
        public string OrderId;          // 合同序号 
        public long CuacctCode;               // 资产账户 
        public string OrderPrice;       // 委托价格 
        public long OrderQty;                 // 委托数量 
        public string OrderAmt;         // 委托金额 
        public string OrderFrzAmt;      // 委托冻结金额 
        public string Stkpbu;            // 交易单元 
        public string Stkbd;             // 交易板块 
        public string Trdacct;          // 证券账户 
        public string SubacctCode;       // 证券账户子编码 
        public string OptTrdacct;       // 期权合约账户 
        public string StkCode;          // 证券代码 
        public string StkName;          // 证券名称 
        public int StkBiz;                    // 证券业务 
        public int StkBizAction;              // 证券业务行为 
        public byte  CancelStatus;             // 内部撤单标志 1:内部撤单 非1:普通撤单
        public string OrderIdEx;        // 外部合同序号 
        public string OrderIdWtd;       // 撤单合同序号

        public override string ToString()
        {
            return String.Format(@"委托批号:{0},合同序号:{1},资金代码:{2},委托价格:{3},委托数量:{4},委托金额:{5},委托冻结金额:{6},交易单元:{7}," +
                "交易板块:{8},证券账户:{9},证券账户子编码:{10},期权合约账户:{11},标的证券代码:{12},标的证券名称:{13},证券业务代码:{14},证券业务行为:{15}," +
                "撤销状态:{16},外部合同序号:{17},撤单合同序号:{18}",
                OrderBsn, OrderId, CuacctCode, OrderPrice, OrderQty, OrderAmt, OrderFrzAmt, Stkpbu,
                Stkbd, Trdacct, SubacctCode, OptTrdacct, StkCode, StkName, StkBiz, StkBizAction, ((char)CancelStatus).ToString(), OrderIdEx, OrderIdWtd);
        }
    }

    //-------------------------------10313019:可用资金查询--------------------------
    public struct ReqOptExpendableFundField
    {
        public long CustCode;                 // 客户代码 两项不能同时为空
        public long CuacctCode;               // 资产账户 
        public byte  Currency;                 // 货币代码 字典[CURRENCY]
        public int ValueFlag;                 // 取值标志 字段用于标识，可复合取值 MARKET_VALUE、FUND_VALUE、 STK_VALUE、FUND_LOAN 四个字段是否取值 0：均不计算 1：取MARKET_VALUE值 2：取FUND_VALUE值 4：取STK_VALUE值 8：取FUND_LOAN值 可复合取值
    }

    public struct RspOptExpendableFundField
    {
        public long CustCode;                 // 客户代码 
        public long CuacctCode;               // 资产账户 
        public byte  Currency;                 // 货币代码 
        public int IntOrg;                    // 内部机构 
        public string MarketValue;      // 资产总值 客户资产总额（实时）见文档
        public string FundValue;        // 资金资产 资金资产总额
        public string StkValue;         // 市值 非资金资产总额 = 市值
        public string FundPrebln;       // 资金昨日余额 
        public string FundBln;          // 资金余额 
        public string FundAvl;          // 资金可用金额 
        public string FundFrz;          // 资金冻结金额 
        public string FundUfz;          // 资金解冻金额 
        public string FundTrdFrz;       // 资金交易冻结金额 
        public string FundTrdUfz;       // 资金交易解冻金额 
        public string FundTrdOtd;       // 资金交易在途金额 
        public string FundTrdBln;       // 资金交易轧差金额 
        public byte  FundStatus;               // 资金状态 字典[FUND_STATUS]
        public string MarginUsed;       // 占用保证金 
        public string MarginInclRlt;    // 已占用保证金(含未成交) 包含卖出开仓委托未成交冻结的保证金(按前结算价计算)
        public string FundExeMargin;    // 行权锁定保证金 
        public string FundExeFrz;       // 行权资金冻结金额 
        public string FundFeeFrz;       // 资金费用冻结金额 
        public string Paylater;         // 垫付资金 
        public string PreadvaPay;       // 预计垫资金额 深圳ETF行权E+1日预交收使用
        public string ExpPenInt;        // 预计负债利息 
        public string FundDraw;         // 资金可取金额 
        public string FundAvlRlt;       // 资金动态可用 
        public string MarginInclDyn;    // 动态占用保证金(含未成交) 包含卖出开仓委托未成交冻结的保证金(按实时价格计算)
        public string DailyInAmt;       // 当日入金 
        public string DailyOutAmt;      // 当日出金 
        public string FundRealAvl;      // 资金实际可用 当金证股票期权柜台系统启用动态可用功能时，资金实际可用=min（资金可用金额，资金动态可用）；当不启用动态可用时，资金实际可用=资金可用金额

        public override string ToString()
        {
            return String.Format(@"客户代码:{0},资产账户:{1},货币代码:{2},内部机构:{3},资产总值:{4},资金资产:{5},市值:{6},资金昨日余额:{7},资金余额:{8},资金可用金额:{9}," +
                "资金冻结金额:{10},资金解冻金额:{11},资金交易冻结金额:{12},资金交易解冻金额:{13},资金交易在途金额:{14},资金交易轧差金额:{15},资金状态:{16},占用保证金:{17},已占用保证金(含未成交):{18},行权锁定保证金:{19}," +
                "行权资金冻结金额:{20},资金费用冻结金额:{21},垫付资金:{22},预计垫资金额:{23},预计负债利息:{24},资金可取金额:{25},资金动态可用:{26},动态占用保证金(含未成交):{27},当日入金:{28},当日出金:{29}," +
                "资金实际可用:{30}",
                CustCode, CuacctCode, ((char)Currency).ToString(), IntOrg, MarketValue, FundValue, StkValue, FundPrebln, FundBln, FundAvl,
                FundFrz, FundUfz, FundTrdFrz, FundTrdUfz, FundTrdOtd, FundTrdBln, ((char)FundStatus).ToString(), MarginUsed, MarginInclRlt, FundExeMargin,
                FundExeFrz, FundFeeFrz, Paylater, PreadvaPay, ExpPenInt, FundDraw, FundAvlRlt, MarginInclDyn, DailyInAmt, DailyOutAmt,
                FundRealAvl);
        }
    }

    //-------------------------------10313001:可用合约资产查询------------------------------------
    public struct ReqOptExpendableCuField
    {
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Trdacct;          // 交易账户
        public string OptNum;           // 合约编码
        public string OptUndlCode;       // 标的证券代码
        public string Stkpbu;            // 交易单元
        public byte  OptSide;                  // 持仓方向 L-权力仓，S-义务仓，C-备兑策略持仓
        public byte  OptCvdFlag;               // 备兑标志 0-非备兑合约 1-备兑合约
        public byte  QueryFlag;                // 查询方向 0:向后取数据 1:向前取数据 其他全部返回
        public string QryPos;           // 定位串
        public int QryNum;                    // 查询行数
    }

    public struct RspOptExpendableCuField
    {
        public string QryPos;           // 定位串
        public long CustCode;                 // 客户代码 
        public long CuacctCode;               // 资产账户 
        public int IntOrg;                    // 内部机构 
        public byte  Stkex;                    // 交易市场 字典[STKEX]
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Stkpbu;            // 交易单元 
        public string Trdacct;          // 证券账户 
        public string SubacctCode;       // 证券账户子编码 
        public string OptTrdacct;       // 期权合约账户 
        public byte  Currency;                 // 货币代码 
        public string OptNum;           // 合约编码 
        public string OptCode;          // 合约代码 
        public string OptName;          // 合约简称 
        public byte  OptType;                  // 合约类型 字典[OPT_TYPE]
        public byte  OptSide;                  // 持仓方向 
        public byte  OptCvdFlag;               // 备兑标志 0-非备兑合约 1-备兑合约
        public long OptPrebln;                // 合约昨日余额 
        public long OptBln;                   // 合约余额 
        public long OptAvl;                   // 合约可用数量 
        public long OptFrz;                   // 合约冻结数量 
        public long OptUfz;                   // 合约解冻数量 
        public long OptTrdFrz;                // 合约交易冻结数量 
        public long OptTrdUfz;                // 合约交易解冻数量 
        public long OptTrdOtd;                // 合约交易在途数量 
        public long OptTrdBln;                // 合约交易轧差数量 
        public long OptClrFrz;                // 合约清算冻结数量 
        public long OptClrUfz;                // 合约清算解冻数量 
        public long OptClrOtd;                // 合约清算在途数量 
        public string OptBcost;         // 合约买入成本 
        public string OptBcostRlt;      // 合约买入成本（实时） 
        public string OptPlamt;         // 合约盈亏金额 
        public string OptPlamtRlt;      // 合约盈亏金额（实时） 
        public string OptMktVal;        // 合约市值 
        public string OptPremium;       // 权利金 
        public string OptMargin;        // 保证金 
        public long OptCvdAsset;              // 备兑股份数量 
        public string OptClsProfit;     // 当日平仓盈亏 
        public string SumClsProfit;     // 累计平仓盈亏 
        public string OptFloatProfit;   // 浮动盈亏 浮动盈亏=证券市值-买入成本
        public string TotalProfit;      // 总盈亏 
        public long OptRealPosi;              // 合约实际持仓 
        public long OptClsUnmatched;          // 合约平仓挂单数量 即平仓委托未成交数量
        public long OptDailyOpenRlt;          // 当日累计开仓数量 
        public string OptUndlCode;       // 标的证券代码 
        public string ExerciseVal;      // 行权价值 认购权利仓的行权价值：MAX((标的-行权价), 0) * 合约单位 * 合约张数 认沽权利仓的行权价值：MAX((行权价-标的价), 0) * 合约单位 * 合约张数
        public long CombedQty;                // 已组合合约数量 参与组合的期权合约持仓数量
        public string CostPrice;        // 合约成本价 

        public override string ToString()
        {
            return String.Format(@"定位串:{0},客户代码:{1},资产账户:{2},内部机构:{3},交易市场:{4},交易板块:{5},交易单元:{6},证券账户:{7}," +
                "证券账户子编码:{8},期权合约账户:{9},货币代码:{10},合约编码:{11},合约代码:{12},合约简称:{13},合约类型:{14},持仓方向:{15}," +
                "备兑标志:{16},合约昨日余额:{17},合约余额:{18},合约可用数量:{19},合约冻结数量:{20},合约解冻数量:{21},合约交易冻结数量:{22},合约交易解冻数量:{23}," +
                "合约交易在途数量:{24},合约交易轧差数量:{25},合约清算冻结数量:{26},合约清算解冻数量:{27},合约清算在途数量:{28},合约买入成本:{29},合约买入成本（实时）:{30},合约盈亏金额:{31}," +
                "合约盈亏金额（实时）:{32},合约市值:{33},权利金:{34},保证金:{35},备兑股份数量:{36},当日平仓盈亏:{37},累计平仓盈亏:{38},浮动盈亏:{39}," +
                "总盈亏:{40},合约实际持仓:{41},合约平仓挂单数量:{42},当日累计开仓数量:{43},标的证券代码:{44}",
                QryPos, CustCode, CuacctCode, IntOrg, ((char)Stkex).ToString(), Stkbd, Stkpbu, Trdacct,
                SubacctCode, OptTrdacct, ((char)Currency).ToString(), OptNum, OptCode, OptName, ((char)OptType).ToString(), ((char)OptSide).ToString(),
                ((char)OptCvdFlag).ToString(), OptPrebln, OptBln, OptAvl, OptFrz, OptUfz, OptTrdFrz, OptTrdUfz,
                OptTrdOtd, OptTrdBln, OptClrFrz, OptClrUfz, OptClrOtd, OptBcost, OptBcostRlt, OptPlamt,
                OptPlamtRlt, OptMktVal, OptPremium, OptMargin, OptCvdAsset, OptClsProfit, SumClsProfit, OptFloatProfit,
                TotalProfit, OptRealPosi, OptClsUnmatched, OptDailyOpenRlt, OptUndlCode);
        }
    }

    //-------------------------------10313003:个股期权当日委托查询------------------------------------
    public struct ReqOptCurrDayOrderField
    {
        public long CustCode;                 // 客户代码 两项不能同时为空
        public long CuacctCode;               // 资产账户
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Trdacct;          // 交易账户
        public string OptNum;           // 合约编码
        public string OptUndlCode;       // 标的证券代码
        public string CombStraCode;		// 组合策略代码        2015/8/5
        public string OrderId;          // 合同序号
        public int OrderBsn;                  // 委托批号
        public int StkBiz;                    // 证券业务 字典[STK_BIZ]
        public int StkBizAction;              // 证券业务行为 字典[STK_BIZ_ACTION]
        public byte  OrderStatus;              // 委托状态
        public string OwnerType;         // 订单所有类型  
        public byte  QueryFlag;                // 查询方向 0:向后取数据 1:向前取数据 其他全部返回
        public string QryPos;           // 定位串
        public int QryNum;                    // 查询行数
    }

    public struct RspOptCurrDayOrderField
    {
        public string QryPos;           // 定位串
        public int TrdDate;                   // 交易日期
        public int OrderDate;                 // 委托日期
        public string OrderTime;        // 委托时间
        public int OrderBsn;                  // 委托批号
        public string OrderId;          // 合同序号
        public byte  OrderStatus;              // 委托状态
        public byte  OrderValidFlag;           // 委托有效标志
        public int IntOrg;                    // 内部机构
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public byte  Stkex;                    // 交易市场 字典[STKEX]
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Stkpbu;            // 交易单元
        public string Trdacct;          // 证券账户
        public string SubacctCode;       // 证券账户子编码
        public string OptTrdacct;			// 期权合约账户				2015/8/5
        public int StkBiz;                    // 证券业务 字典[STK_BIZ]
        public int StkBizAction;              // 证券业务行为 字典[STK_BIZ_ACTION]
        public string OwnerType;         // 订单所有类型
        public string OptNum;           // 合约编码
        public string OptCode;          // 合约代码
        public string OptName;          // 合约简称
        public string CombNum;			// 组合编码				    2015/8/5       
        public string CombStraCode;		// 组合策略代码				2015/8/5
        public string Leg1Num;			// 成分一合约编码			2015/8/5
        public string Leg2Num;			// 成分二合约编码			2015/8/5
        public string Leg3Num;			// 成分三合约编码			2015/8/5
        public string Leg4Num;			// 成分四合约编码			2015/8/5
        public byte  Currency;                 // 货币代码 字典[CURRENCY]
        public string OrderPrice;       // 委托价格 CPRICE4
        public long OrderQty;                 // 委托数量
        public string OrderAmt;         // 委托金额
        public string OrderFrzAmt;      // 委托冻结金额
        public string OrderUfzAmt;      // 委托解冻金额
        public long OfferQty;                 // 申报数量
        public int OfferStime;                // 申报时间
        public long WithdrawnQty;             // 已撤单数量
        public long MatchedQty;               // 已成交数量
        public string MatchedAmt;       // 已成交金额
        public byte  IsWithdraw;               // 撤单标志
        public byte  IsWithdrawn;              // 已撤单标志
        public byte  OptUndlCls;               // 标的证券类别
        public string OptUndlCode;       // 标的证券代码
        public string OptUndlName;      // 标的证券名称
        public long UndlFrzQty;               // 标的券委托冻结数量
        public long UndlUfzQty;               // 标的券委托解冻数量
        public long UndlWthQty;               // 标的券已撤单数量
        public string OfferRetMsg;      // 申报返回信息
        public string OrderIdEx;        // 外部合同序号
        public int OrderSn;                   // 委托序号
        public string RawOrderId;       // 外部合同序号
        public string MarginPreFrz;     // 预占用保证金 卖开委托时填写预冻结的保证金金额，其他情况填“0”
        public string MarginFrz;        // 占用保证金 卖开成交时填写实际冻结的保证金金额，其他情况填“0”
        public string MarginPreUfz;     // 预解冻保证金 买平委托时填写预解冻的保证金金额，其他情况填“0”
        public string MarginUfz;        // 解冻保证金 买平成交时填写实际解冻的保证金金额，其他情况填“0”

        public override string ToString()
        {
            return String.Format(@"定位串:{0},交易日期:{1},委托日期:{2},委托时间:{3},委托批号:{4},合同序号:{5},委托状态:{6},委托有效标志:{7},内部机构:{8}," +
                "客户代码:{9},资产账户:{10},交易市场:{11},交易板块:{12},交易单元:{13},证券账户:{14},证券账户子编码:{15},期权合约账户:{16},证券业务:{17}," +
                "证券业务行为:{18},订单所有类型:{19},合约编码:{20},合约代码:{21},合约简称:{22},组合编码:{23},组合策略代码:{24},成分一:{25},成分二:{26}," +
                "成分三:{27},成分四:{28},货币代码:{29},委托价格:{30},委托数量:{31},委托金额:{32},委托冻结金额:{33},委托解冻金额:{34},申报数量:{35}," +
                "申报时间:{36},已撤单数量:{37},已成交数量:{38},已成交金额:{39},撤单标志:{40},已撤单标志:{41},标的证券类别:{42},标的证券代码:{43}," +
                "标的证券名称:{44},标的券委托冻结数量:{45},标的券委托解冻数量:{46},标的券已撤单数量:{47},申报返回信息:{48},外部合同序号:{49},委托序号:{50},外部合同序号:{51},预占用保证金:{52}," +
                "占用保证金:{53},预解冻保证金:{54},解冻保证金:{55}",
                QryPos, TrdDate, OrderDate, OrderTime, OrderBsn, OrderId, ((char)OrderStatus).ToString(), ((char)OrderValidFlag).ToString(), IntOrg,
                CustCode, CuacctCode, ((char)Stkex).ToString(), Stkbd, Stkpbu, Trdacct, SubacctCode, OptTrdacct, StkBiz,
                StkBizAction, OwnerType, OptNum, OptCode, OptName, CombNum, CombStraCode, Leg1Num, Leg2Num,
                Leg3Num, Leg4Num, ((char)Currency).ToString(), OrderPrice, OrderQty, OrderAmt, OrderFrzAmt, OrderUfzAmt, OfferQty,
                OfferStime, WithdrawnQty, MatchedQty, MatchedAmt, ((char)IsWithdraw).ToString(), ((char)IsWithdrawn).ToString(), ((char)OptUndlCls).ToString(), OptUndlCode, OptUndlName,
                UndlFrzQty, UndlUfzQty, UndlWthQty, OfferRetMsg, OrderIdEx, OrderSn, RawOrderId, MarginPreFrz, MarginFrz, MarginPreUfz, MarginUfz);
        }
    }

    //-------------------------------10313004:个股期权当日成交查询------------------------------------
    public struct ReqOptCurrDayFillField
    {
        public long CustCode;                 // 客户代码 两项不能同时为空
        public long CuacctCode;               // 资产账户
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Trdacct;          // 交易账户
        public string OptNum;           // 合约编码
        public string OptUndlCode;       // 标的证券代码
        public string CombStraCode;		// 组合策略代码    2015/8/5
        public string OrderId;          // 合同序号
        public int OrderBsn;                  // 委托批号
        public int StkBiz;                    // 证券业务 字典[STK_BIZ]
        public int StkBizAction;              // 证券业务行为 字典[STK_BIZ_ACTION]
        public string OwnerType;			// 订单所有类型    2015/8/5
        public byte  QueryFlag;                // 查询方向 0:向后取数据 1:向前取数据 其他全部返回
        public string QryPos;           // 定位串
        public int QryNum;                    // 查询行数
    }

    public struct RspOptCurrDayFillField
    {
        public string QryPos;           // 定位串
        public int TrdDate;                   // 交易日期
        public string MatchedTime;       // 成交时间
        public int OrderDate;                 // 委托日期
        public int OrderSn;                   // 委托序号
        public int OrderBsn;                  // 委托批号
        public string OrderId;          // 合同序号
        public int IntOrg;                    // 内部机构
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public byte  Stkex;                    // 交易市场 字典[STKEX]
        public string Stkbd;             // 交易板块 字典[STKBD]
        public string Stkpbu;            // 交易单元
        public string Trdacct;          // 证券账户
        public string SubacctCode;       // 证券账户子编码
        public string OptTrdacct;			// 期权合约账户          2015/8/5
        public int StkBiz;                    // 证券业务 字典[STK_BIZ]
        public int StkBizAction;              // 证券业务行为 字典[STK_BIZ_ACTION]
        public string OwnerType;         // 订单所有类型
        public string OptNum;           // 合约编码
        public string OptCode;          // 合约代码
        public string OptName;          // 合约简称
        public string CombNum;			// 组合编码              2015/8/5
        public string CombStraCode;		// 组合策略代码          2015/8/5
        public string Leg1Num;			// 成分一合约编码        2015/8/5
        public string Leg2Num;			// 成分二合约编码        2015/8/5
        public string Leg3Num;			// 成分三合约编码        2015/8/5
        public string Leg4Num;			// 成分四合约编码        2015/8/5
        public byte  Currency;                 // 货币代码 字典[CURRENCY]
        public byte  OptUndlCls;               // 标的证券类别
        public string OptUndlCode;       // 标的证券代码
        public string OptUndlName;      // 标的证券名称
        public string OrderPrice;       // 委托价格 CPRICE4
        public long OrderQty;                 // 委托数量
        public string OrderAmt;         // 委托金额
        public string OrderFrzAmt;      // 委托冻结金额
        public byte  IsWithdraw;               // 撤单标志
        public byte  MatchedType;              // 成交类型
        public string MatchedSn;        // 成交编号
        public string MatchedPrice;     // 成交价格 CPRICE4
        public long MatchedQty;               // 已成交数量
        public string MatchedAmt;       // 已成交金额
        public string OrderIdEx;        // 外部合同序号
        public string MarginPreFrz;     // 预占用保证金 卖开委托时填写预冻结的保证金金额，其他情况填“0”
        public string MarginFrz;        // 占用保证金 卖开成交时填写实际冻结的保证金金额，其他情况填“0”
        public string MarginPreUfz;     // 预解冻保证金 买平委托时填写预解冻的保证金金额，其他情况填“0”
        public string MarginUfz;        // 解冻保证金 买平成交时填写实际解冻的保证金金额，其他情况填“0”
        public string MatchedFee;			// 成交费用        2015/8/5   

        public override string ToString()
        {
            return String.Format(@"定位串:{0},交易日期:{1},成交时间:{2},委托日期:{3},委托序号:{4},委托批号:{5},合同序号:{6},内部机构:{7},客户代码:{8}," +
                "资产账户:{9},交易市场:{10},交易板块:{11},交易单元:{12},证券账户:{13},证券账户子编码:{14},期权合约账户:{15},证券业务:{16},证券业务行为:{17}," +
                "订单所有类型:{18},合约编码:{19},合约代码:{20},合约简称:{21},组合编码:{22},组合策略代码:{23},成分一:{24},成分二:{25},成分三:{26}," +
                "成分四:{27},货币代码:{28},标的证券类别:{29},标的证券代码:{30},标的证券名称:{31},委托价格:{32},委托数量:{33},委托金额:{34},委托冻结金额:{35}," +
                "撤单标志:{36},成交类型:{37},成交编号:{38},成交价格:{39},已成交数量:{40},已成交金额:{41},外部合同序号:{42},预占用保证金:{43},占用保证金:{44}," +
                "预解冻保证金:{45},解冻保证金:{46},成交费用:{47}",
                QryPos, TrdDate, MatchedTime, OrderDate, OrderSn, OrderBsn, OrderId, IntOrg, CustCode,
                CuacctCode, ((char)Stkex).ToString(), Stkbd, Stkpbu, Trdacct, SubacctCode, OptTrdacct, StkBiz, StkBizAction,
                OwnerType, OptNum, OptCode, OptName, CombNum, CombStraCode, Leg1Num, Leg2Num, Leg3Num,
                Leg4Num, ((char)Currency).ToString(), OptUndlCls, OptUndlCode, OptUndlName, OrderPrice, OrderQty, OrderAmt, OrderFrzAmt,
                ((char)IsWithdraw).ToString(), ((char)MatchedType).ToString(), MatchedSn, MatchedPrice, MatchedQty, MatchedAmt, OrderIdEx, MarginPreFrz, MarginFrz,
                MarginPreUfz, MarginUfz, MatchedFee);
        }
    }

    //主题订阅
    public struct ReqSubTopicField
    {
        public string Topic;
        public string Filter;
        public string DataSet;
    }
    public struct RspSubTopicField
    {
        public string Topic;
        public string Filter;
        public string AcceptSn;
        public string Channel;
        public string DataSet;

        public override string ToString()
        {
            return String.Format(@"Topic:{0},Filter:{1},DataSet:{2},Channel:{3},AcceptSn:{4}",
                Topic, Filter, DataSet, Channel, AcceptSn);
        }
    }

    //-------------------------------委托确认回报-----------------------------------------------------
    public struct RtnOptOrderConfirmField
    {
        public byte Stkex;                    // 交易市场
        public string StkCode;           // 证券代码
        public string OrderId;          // 合同序号
        public string Trdacct;          // 交易账户
        public byte IsWithdraw;               // 撤单标志
        public long CustCode;                 // 客户代码
        public long CuacctCode;               // 资产账户
        public int OrderBsn;                  // 委托批号
        public int CuacctSn;                  // 账户序号
        public string Stkbd;             // 交易板块
        public byte OrderStatus;              // 委托状态
        public int StkBiz;                    // 证券业务
        public int StkBizAction;              // 业务行为
        public int OrderDate;                 // 委托日期
        public int OrderSn;                   // 委托序号
        public int IntOrg;                    // 内部机构
        public string Stkpbu;            // 交易单元
        public string OrderPrice;       // 委托价格
        public long OrderQty;                 // 委托数量
        public string SubacctCode;       // 证券账户子编码
        public string OptTrdacct;       // 期权合约账户
        public string OptCode;          // 合约代码
        public string OptName;          // 合约简称
        public byte Currency;                 // 货币代码
        public byte OptUndlCls;               // 标的证券类别
        public string OptUndlCode;       // 标的证券代码
        public string OptUndlName;      // 标的证券名称
        public string CombNum;          // 组合编码       构建组合、解除组合时填写，其他情况填空
        public string CombStraCode;     // 组合策略代码    构建组合、解除组合时填写，其他情况填空
        public string Leg1Num;          // 成分一合约编码  构建组合、解除组合、行权指令合并申报时填写，其他情况填空
        public string Leg2Num;          // 成分二合约编码  构建组合、解除组合、行权指令合并申报时填写，其他情况填空
        public string Leg3Num;          // 成分三合约编码  构建组合、解除组合时填写，其他情况填空
        public string Leg4Num;          // 成分四合约编码  构建组合、解除组合时填写，其他情况填空
        public string Remark1;          // 预留字段1
        public string Remark2;          // 预留字段2
        public string Remark3;          // 预留字段3
        public string Remark4;          // 预留字段4
        public string Remark5;          // 预留字段5
        public string Remark6;          // 预留字段6
        public string Remark7;          // 预留字段7
        public string Remark8;          // 预留字段8
        public string Remark9;          // 预留字段9
        public string RemarkA;          // 预留字段A

        public override string ToString()
        {
            return String.Format(@"交易市场:{0},证券代码:{1},合同序号:{2},交易账户:{3},撤单标志:{4},客户代码:{5},资产账户:{6},委托批号:{7},账户序号:{8},"+
                "交易板块:{9},委托状态:{10},证券业务:{11},业务行为:{12},委托日期:{13},委托序号:{14},内部机构:{15},交易单元:{16},委托价格:{17},"+
                "委托数量:{18},证券账户子编码:{19},期权合约账户:{20},合约代码:{21},合约简称:{22},货币代码:{23},标的证券类别:{24},标的证券代码:{25},标的证券名称:{26}",
                ((char)Stkex).ToString(), StkCode, OrderId, Trdacct, ((char)IsWithdraw).ToString(), CustCode, CuacctCode, OrderBsn, CuacctSn,
                Stkbd, ((char)OrderStatus).ToString(), StkBiz, StkBizAction, OrderDate, OrderSn, IntOrg, Stkpbu, OrderPrice,
                OrderQty, SubacctCode, OptTrdacct, OptCode, OptName, ((char)Currency).ToString(), ((char)OptUndlCls).ToString(), OptUndlCode, OptUndlName);
        }
    }

    //成交回报响应
    public struct RtnOrderField
    {
        public int TrdCodeCls;         //品种类型    TRD_CODE_CLS    INTEGER    8970
        public string MatchedSn;  //成交编号    MATCHED_SN      VARCHAR(32)17  
        public byte Stkex;             //交易市场    STKEX           CHAR(1)    207 字典[STKEX]
        public string StkCode;     //证券代码    STK_CODE        VARCHAR(8) 48  
        public int OrderNo;            //委托编号    ORDER_NO        INTEGER    9106
        public string OrderId;    //合同序号    ORDER_ID        VARCHAR(10)11  
        public string Trdacct;    //交易账户    TRDACCT         VARCHAR(16)448 
        public long MatchedQty;        //成交数量    MATCHED_QTY     BIGINT     387 撤单成交时数为负数
        public string MatchedPrice;//成交价格    MATCHED_PRICE   CPRICE     8841
        public string OrderFrzAmt; //委托冻结金额  ORDER_FRZ_AMT   CMONEY     8831
        public string RltSettAmt;  //实时清算金额  RLT_SETT_AMT    CMONEY     8853
        public string FundAvl;     //资金可用金额  FUND_AVL        CMONEY     8861
        public long StkAvl;            //证券可用数量  STK_AVL         BIGINT     8869
        public string OpptStkpbu;  //对方席位    OPPT_STKPBU     VARCHAR(8) 9107
        public string OpptTrdacct;//对方交易账号  OPPT_TRDACCT    VARCHAR(10)9108
        public int MatchedDate;        //成交日期    MATCHED_DATE    INTEGER    8839
        public string MatchedTime; //成交时间    MATCHED_TIME    VARCHAR(8) 8840
        public byte IsWithdraw;        //撤单标志    IS_WITHDRAW     CHAR(1)    8836字典[IS_WITHDRAW]
        public string CustCode;          //客户代码    CUST_CODE       BIGINT     8902
        public string CuacctCode;        //资产账户    CUACCT_CODE     BIGINT     8920
        public int OrderBsn;           //委托批号    ORDER_BSN       INTEGER    66  
        public int CuacctSn;           //账户序号    CUACCT_SN       SMALLINT   8928
        public string Stkbd;       //交易板块    STKBD           CHAR(2)    625 字典[STKBD]
        public byte MatchedType;       //成交类型    MATCHED_TYPE    CHAR(1)    9080‘0’:内部撤单成交
        public byte OrderStatus;       //委托状态    ORDER_STATUS    CHAR(1)    39  字典[ORDER_STATUS]
        public int StkBiz;             //证券业务    STK_BIZ         SMALLINT   8842
        public int StkBizAction;       //证券业务行为  STK_BIZ_ACTION  SMALLINT   40  
        public int OrderDate;          //委托日期    ORDER_DATE      INTEGER    8834期权专有字段
        public int OrderSn;            //委托序号    ORDER_SN        INTEGER    8832期权专有字段
        public int IntOrg;             //内部机构    INT_ORG         SMALLINT   8911期权专有字段
        public string Stkpbu;      //交易单元    STKPBU          VARCHAR(8) 8843期权专有字段
        public string SubacctCode; //证券账户子编码 SUBACCT_CODE    VARCHAR(8) 9099期权专有字段
        public string OptTrdacct; //期权合约账户  OPT_TRDACCT     VARCHAR(18)9098期权专有字段
        public string OwnerType;   //订单所有类型  OWNER_TYPE      CHAR(3)    9091期权专有字段
        public string OptCode;    //合约代码    OPT_CODE        VARCHAR(32)9083期权专有字段
        public string OptName;    //合约简称    OPT_NAME        VARCHAR(32)9084期权专有字段
        public byte Currency;          //货币代码    CURRENCY        CHAR(1)    15  期权专有字段
        public byte OptUndlCls;        //标的证券类别  OPT_UNDL_CLS    CHAR(1)    9085期权专有字段
        public string OptUndlCode; //标的证券代码  OPT_UNDL_CODE   VARCHAR(8) 9086期权专有字段
        public string OptUndlName;//标的证券名称  OPT_UNDL_NAME   VARCHAR(16)9087期权专有字段
        public string OrderPrice;  //委托价格    ORDER_PRICE     CPRICE4    44  期权专有字段
        public long OrderQty;          //委托数量    ORDER_QTY       BIGINT     38  期权专有字段
        public string OrderAmt;    //委托金额    ORDER_AMT       CMONEY     8830期权专有字段
        public string MatchedAmt;  //已成交金额   MATCHED_AMT     CMONEY     8504期权专有字段
        public string MarginPreFrz;//预占用保证金  MARGIN_PRE_FRZ  CMONEY     9094期权专有字段（卖开委托时填写预冻结的保证金金额，其他情况填“0”）
        public string MarginFrz;   //占用保证金   MARGIN_FRZ      CMONEY     9095期权专有字段（卖开成交时填写实际冻结的保证金金额，其他情况填“0”）
        public string MarginPreUfz;//预释放保证金  MARGIN_PRE_UFZ  CMONEY     9096期权专有字段（买平委托时填写预解冻的保证金金额，其他情况填“0”）
        public string MarginUfz;   //释放保证金   MARGIN_UFZ      CMONEY     9097期权专有字段（买平成交时填写实际解冻的保证金金额，其他情况填“0”）
        public int ErrorId;            //错误代码    ERROR_ID        SMALLINT   8900错误代码
        public string ErrorMsg;   //错误信息    ERROR_MSG       VARCHAR(81)8901错误信息
        public string BrokerId;   //经纪公司代码  BROKER_ID       VARCHAR(11)8890经纪公司代码
        public string InstrumentId;//合约代码    INSTRUMENT_ID   VARCHAR(31)48  合约代码
        public string OrderRef;   //报单引用    ORDER_REF       VARCHAR(13)8738报单引用
        public string UserId;     //用户代码    USER_ID         VARCHAR(16)9080用户代码
        public string ExchangeId;  //交易所代码   EXCHANGE_ID     VARCHAR(9) 207 交易所代码
        public string OrderSysId; //报单编号    ORDER_SYS_ID    VARCHAR(21)8745报单编号
        public string CombOffsetFlag;//组合开平标志  COMB_OFFSET_FLAGVARCHAR(5) 8741组合开平标志
        public string CombHedgeFlag;//组合投机套保标志COMB_HEDGE_FLAG VARCHAR(5) 8742组合投机套保标志
        public string OrderLocalId;//本地报单编号  ORDER_LOCAL_ID  VARCHAR(13)8722本地报单编号
        public int SequenceNo;         //序号      SEQUENCE_NO     SMALLINT   8832序号
        public string CliOrderNo; //客户端委托编号 CLI_ORDER_NO    VARCHAR(32)9102
        public string StkName; //证券名称 STK_NAME VARCHAR(16) 55
        public long TotalMatchedQty;      //已成交总量   TOTAL_MATCHED_QTY   BIGINT     9100已成交总量
        public long WithdrawnQty;      //已撤单数量   WITHDRAWN_QTY   BIGINT     8837已撤单数量
        public string TotalMatchedAmt; //累计成交金额 TOTAL_MATCHED_AMT CPRICE   9101累计成交金额
        public long MatchBuyQty;       //买成交数量 MATCH_BUY_QTY 9152
        public long MatchSellQty;       //卖成交数量 MATCH_SELL_QTY 9153
        public string MatchBuyAmt;       //买成交金额 MATCH_BUY_AMT 9154
        public string MatchSellAmt;       //卖成交金额 MATCH_SELL_AMT 9155
        public string MatchBuyAvgPrice;       //买成交均价 MATCH_BUY_AVG_PRICE 9156
        public string MatchSellAvgPrice;       //卖成交均价 MATCH_SELL_AVG_PRICE 9157
        public string WithdrawnBuyQty;       //买撤单数量 WITHDRAWN_BUY_QTY 9158
        public string WithdrawnSellQty;       //买撤单数量 WITHDRAWN_SELL_QTY 9158

        public override string ToString()
        {
            return String.Format(@"品种类型:{0},成交编号:{1},交易市场:{2},证券代码:{3},证券名称:{4},委托编号:{5},合同序号:{6},交易账户:{7},成交数量:{8},成交价格:{9}," +
                "委托冻结金额:{10},实时清算金额:{11},资金可用金额:{12},证券可用数量:{13},对方席位:{14},对方交易账号:{15},成交日期:{16},成交时间:{17}," +
                "撤单标志:{18},客户代码:{19},资产账户:{20},委托批号:{21},账户序号:{22},交易板块:{23},成交类型:{24},委托状态:{25}," +
                "证券业务:{26},证券业务行为:{27},委托日期:{28},委托序号:{29},内部机构:{30},交易单元:{31},证券账户子编码:{32},期权合约账户:{33}," +
                "订单所有类型:{34},合约代码:{35},合约简称:{36},货币代码:{37},标的证券类别:{38},标的证券代码:{39},标的证券名称:{40},委托价格:{41}," +
                "委托数量:{42},委托金额:{43},已成交金额:{44},预占用保证金:{45},占用保证金:{46},预释放保证金:{47},释放保证金:{48},错误代码:{49}," +
                "错误信息:{50},经纪公司代码:{51},合约代码:{52},报单引用:{53},用户代码:{54},交易所代码:{55},报单编号:{56},组合开平标志:{57}," +
                "组合投机套保标志:{58},本地报单编号:{59},序号:{60},客户端委托编号:{61},已成交总量:{62},已撤单数量:{63},累计成交金额:{64}",
                TrdCodeCls, MatchedSn, ((char)Stkex).ToString(), StkCode, StkName, OrderNo, OrderId, Trdacct, MatchedQty, MatchedPrice,
                OrderFrzAmt, RltSettAmt, FundAvl, StkAvl, OpptStkpbu, OpptTrdacct, MatchedDate, MatchedTime,
                ((char)IsWithdraw).ToString(), CustCode, CuacctCode, OrderBsn, CuacctSn, Stkbd, ((char)MatchedType).ToString(), ((char)OrderStatus).ToString(),
                StkBiz, StkBizAction, OrderDate, OrderSn, IntOrg, Stkpbu, SubacctCode, OptTrdacct,
                OwnerType, OptCode, OptName, ((char)Currency).ToString(), ((char)OptUndlCls).ToString(), OptUndlCode, OptUndlName, OrderPrice,
                OrderQty, OrderAmt, MatchedAmt, MarginPreFrz, MarginFrz, MarginPreUfz, MarginUfz, ErrorId,
                ErrorMsg, BrokerId, InstrumentId, OrderRef, UserId, ExchangeId, OrderSysId, CombOffsetFlag,
                CombHedgeFlag, OrderLocalId, SequenceNo, CliOrderNo, TotalMatchedQty, WithdrawnQty, TotalMatchedAmt);
        }
    }

    // 终端信息参数
    public struct ReqClientField
    {
        public string Iip;              // 公网IP
        public string Iport;             // 公网IP端口号
        public string Lip;              // 内网IP
        public string Mac;              // MAC地址
        public string Hd;               // 硬盘序列号
        public string Pcn;              // PC终端设备名
        public string Cpu;              // CPU序列号
        public string Pi;               // 硬盘分区信息
        public string Vol;              // 系统盘卷标号
        public string Ext;              // 扩展信息 以‘;’进行分隔

        public ReqClientField(string iip, string iport, string lip, string mac, string hd, string pcn, string cpu, string pi, string vol, string ext)
        {
            Iip = iip;
            Iport = iport;
            Lip = lip;
            Mac = mac;
            Hd = hd;
            Pcn = pcn;
            Cpu = cpu;
            Pi = pi;
            Vol = vol;
            Ext = ext;
        }
    }

    //登录信息
    public struct LoginInfo
    {
        public string UserCode; //用户代码
        public string CuacctCode; //资金账号
        public string CustCode; //客户代码
        public string EnAuthData; //账户登录密码
        public byte CuacctType; //操作账户类型
        public int IntOrg; //机构代码
        public string Channel; //渠道
        public string SessionId; //会话凭证
        public string ShAcct; //沪A股东账户
        public string SzAcct; //深A股东账户

        public LoginInfo(string usercode, string cuacctcode, string custcode, byte cuaccttype, string enauthdata, int intorg, string channel, string sessionid, string shacct, string szacct)
        {
            UserCode = usercode;
            CuacctCode = cuacctcode;
            CustCode = custcode;
            CuacctType = cuaccttype;
            EnAuthData = enauthdata;
            IntOrg = intorg;
            Channel = channel;
            SessionId = sessionid;
            ShAcct = shacct;
            SzAcct = szacct;
        }
    }
}