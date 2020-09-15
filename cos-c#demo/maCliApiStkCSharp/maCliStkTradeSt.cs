// 文件描述：中台API功能结构体定义
//--------------------------------------------------------------------------------------------------
// 修改日期      版本          作者            备注
//--------------------------------------------------------------------------------------------------
// 2020/4/16    001.000.001  SHENGHB          创建
// 2020/5/26    001.000.002  SHENGHB          新增双融客户负债信息查询
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
    // 现货登录
    public struct ReqAcctLogin
    {
        public string AcctType; // 账户类型
        public string AcctId; // 账户标识
        public string Encryptkey; // 加密因子
        public string AuthData; // 认证数据
        public byte AuthType; // 认证类型
        public byte UseScope; // 使用范围
        public byte EncryptType; // 加密方式
    }

    public struct RspAcctLogin
    {
        public long CustCode;
        public long CuacctCode;
        public byte StkEx;
        public string StkBd;
        public string TrdAcct;
        public byte TrdAcctStatus;
        public string StkPbu;
        public string AcctType;
        public string AcctId;
        public string TrdAcctName;
        public string SessionId;
        public int IntOrg;
        public override string ToString()
        {
            return String.Format(@"客户代码:{0},资产账户:{1},交易市场:{2},交易板块:{3},证券账户:{4}," +
                "账户状态:{5},交易单元:{6},账户类型:{7},账户标识:{8},账户名称:{9},会话凭证:{10},内部机构:{11}",
                CustCode, CuacctCode, ((char)StkEx).ToString(), StkBd, TrdAcct,
                ((char)TrdAcctStatus).ToString(), StkPbu, AcctType, AcctId, TrdAcctName, SessionId, IntOrg);
        }
    }

    // 证券信息查询（10301036）
    public struct ReqStkInfoField
    {
        public string Stkbd;              // 交易板块
        public string StkCode;              // 交易板块
        public byte QueryFlag;             // 查询方向
        public string QueryPos;              // 定位串
        public int QueryNum;              // 查询行数,最大1000
    }

    public struct RspStkInfoField
    {
        public string QueryPos;           // 定位串
        public string Stkbd;              // 交易板块
        public string StkCode;            // 证券代码
        public string StkName;            // 证券名称
        public byte StkCls;             // 证券类别
        public int StkCirculation;     // 流通量
        public string StkUplmtPrice;      // 涨停价
        public string StkLwlmtPrice;      // 跌停价
        public int StkLotSize;         // 每手数量
        public byte StkSuspended;       //停牌标志
        public byte StkStatus;          //证券状态

        public override string ToString()
        {
            return String.Format(@"定位串:{0},交易板块:{1},证券代码:{2},证券名称:{3},证券类别:{4}," +
                "流通量:{5},涨停价:{6},跌停价:{7},每手数量:{8},停牌标志:{9},证券状态:{10}",
                QueryPos, Stkbd, StkCode, StkName, ((char)StkCls).ToString(), StkCirculation,
                StkUplmtPrice, StkLwlmtPrice, StkLotSize, ((char)StkSuspended).ToString(), ((char)StkStatus).ToString());
        }
    }

    // 10302001:委托
    public struct ReqStkOrderField
    {
        public long CustCode; //客户代码
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string StkCode; //证券代码
        public string OrderPrice; //委托价格
        public long OrderQty; //委托数量
        public int StkBiz; //证券业务
        public int StkBizAction; //业务行为
        public string Stkpbu; //交易单元
        public int OrderBsn; //委托批号
        public string OrderText; //委托扩展
        public string ClientInfo; //终端信息
        public byte SecurityLevel; //安全手段
        public string SecurityInfo; //安全信息
        public string ComponetStkCode; //成份股代码
        public string ComponetStkbd; //成份股板块
        public string StkbdLink; //关联板块
        public string Trdacct; //证券账户
        public int CuacctSn; //账户序号
        public byte PublishCtrlFlag; //股票风控标志
        public string RepayOrderId; //偿还合同序号
        public int RepayOpeningDate; //偿还合约日期
        public string RepayStkCode; //偿还证券代码
        public string TrdacctLink; //关联股东
        public string InitTrdAmt; //初始交易金额
        public int RepchDay; //购回天数
        public string LoanerTrdacct; //出借人证券账户
        public string RepaySno; //合约编号
        public int Itemno; //合约序号
        public byte OutputDelayFlag; //输出时延标志
        public byte CloseOutMode; //平仓方式
        public byte RtgsFlag; //是否启用RTGS
        public string MeetingSeq; //股东大会编码
        public string VoteId; //议案编号
        public string OppLofCode; //转入方基金编码
    }

    public struct RspStkOrderField
    {
        public int OrderBsn; //委托批号
        public string OrderId; //合同序号
        public long CuacctCode; //资产账户
        public string OrderPrice; //委托价格
        public long OrderQty; //委托数量
        public string OrderAmt; //委托金额
        public string OrderFrzAmt; //冻结金额
        public string Stkpbu; //交易单元
        public string Stkbd; //交易板块
        public string StkCode; //证券代码
        public string StkName; //证券名称
        public int StkBiz; //证券业务
        public int StkBizAction; //业务行为
        public string Trdacct; //证券账户
        public int CuacctSn; //账户序号
        public override string ToString()
        {
            return String.Format(@"委托批号:{0}, 合同序号:{1}, 资产账户:{2}, 委托价格:{3}, 委托数量:{4}, 委托金额:{5}, 冻结金额:{6}, 交易单元:{7}, 交易板块:{8}, 证券代码:{9}, 证券名称:{10}," + 
                "证券业务:{11}, 业务行为:{12}, 证券账户:{13}, 账户序号:{14}",
                OrderBsn, OrderId, CuacctCode, OrderPrice, OrderQty, OrderAmt, OrderFrzAmt, Stkpbu, Stkbd, StkCode, StkName, 
                StkBiz, StkBizAction, Trdacct, CuacctSn);
        }
    }

    //103802004:委托撤单
    public struct ReqStkCancelOrderField
    {
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string OrderId; //合同序号
        public int OrderBsn; //委托批号
        public string ClientInfo; //终端信息
    }

    public struct RspStkCancelOrderField
    {
        public int OrderBsn; //委托批号
        public string OrderId; //合同序号
        public long CuacctCode; //资产账户
        public string OrderPrice; //委托价格
        public long OrderQty; //委托数量
        public string OrderAmt; //委托金额
        public string OrderFrzAmt; //冻结金额
        public string Stkpbu; //交易单元
        public string Stkbd; //交易板块
        public string StkCode; //证券代码
        public string StkName; //证券名称
        public int StkBiz; //证券业务
        public int StkBizAction; //业务行为
        public byte CancelStatus; //内部撤单标志
        public string Trdacct; //证券账户
        public string MsgOk; //内撤信息
        public string CancelList; //撤单列表
        public string WtOrderId; //委托合同号
        public override string ToString()
        {
            return String.Format(@"委托批号:{0}, 合同序号:{1}, 资产账户:{2}, 委托价格:{3}, 委托数量:{4}, 委托金额:{5}, 冻结金额:{6}, 交易单元:{7}, 交易板块:{8}, 证券代码:{9}, 证券名称:{10}," + 
                "证券业务:{11}, 业务行为:{12}, 内部撤单标志:{13}, 证券账户:{14}, 内撤信息:{15}, 撤单列表:{16}, 委托合同号:{17}",
                OrderBsn, OrderId, CuacctCode, OrderPrice, OrderQty, OrderAmt, OrderFrzAmt, Stkpbu, Stkbd, StkCode, StkName,
                StkBiz, StkBizAction, ((char)CancelStatus).ToString(), Trdacct, MsgOk, CancelList, WtOrderId);
        }

    }

    //10303003:委托查询
    public struct ReqStkOrderInfoField
    {
        public long CustCode; //客户代码
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string StkCode; //证券代码
        public string OrderId; //合同序号
        public int OrderBsn; //委托批号
        public string Trdacct; //交易账户
        public byte QueryFlag; //查询方向
        public string QueryPos; //定位串
        public int QueryNum; //查询行数
        public int CuacctSn; //账户序号
        public byte Flag; //查询标志

    };

    public struct RspStkOrderInfoField
    {
        public string QryPos; //定位串查询
        public int IntOrg; //内部机构
        public int TrdDate; //交易日期
        public int OrderDate; //委托日期
        public string OrderTime; //委托时间
        public string OrderId; //合同序号
        public byte OrderStatus; //委托状态
        public byte OrderValidFlag; //委托有效标志
        public long CustCode; //客户代码
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string Stkpbu; //交易单元
        public int StkBiz; //证券业务
        public int StkBizAction; //业务行为
        public string StkCode; //证券代码
        public string StkName; //证券名称
        public byte Currency; //货币代码
        public string BondInt; //债券利息
        public string OrderPrice; //委托价格
        public long OrderQty; //委托数量
        public string OrderAmt; //委托金额
        public string OrderFrzAmt; //委托冻结金额
        public string OrderUfzAmt; //委托解冻金额
        public long OfferQty; //申报数量
        public int OfferStime; //申报时间
        public long WithdrawnQty; //已撤单数量
        public long MatchedQty; //已成交数量
        public byte IsWithdraw; //撤单标志
        public byte IsWithdrawn; //已撤单标志
        public int OrderBsn; //委托批号
        public string MatchedAmt; //成交金额
        public string Trdacct; //交易账户
        public int CuacctSn; //账户序号
        public string RawOrderId; //原合同序号
        public string OfferRetMsg; //申报信息
        public string OpSite; //操作站点
        public byte Channel; //操作渠道
        public string RltSettAmt; //实时清算金额
        public override string ToString()
        {
            return String.Format(@"定位串查询:{0}, 内部机构:{1}, 交易日期:{2}, 委托日期:{3}, 委托时间:{4}, 合同序号:{5}, 委托状态:{6}, 委托有效标志:{7}, 客户代码:{8}, 资产账户:{9}, 交易板块:{10}," + 
                "交易单元:{11}, 证券业务:{12}, 业务行为:{13}, 证券代码:{14}, 证券名称:{15}, 货币代码:{16}, 债券利息:{17}, 委托价格:{18}, 委托数量:{19}, 委托金额:{20}," + 
                "委托冻结金额:{21}, 委托解冻金额:{22}, 申报数量:{23}, 申报时间:{24}, 已撤单数量:{25}, 已成交数量:{26}, 撤单标志:{27}, 已撤单标志:{28}, 委托批号:{29}, 成交金额:{30}," + 
                "交易账户:{31}, 账户序号:{32}, 原合同序号:{33}, 申报信息:{34}, 操作站点:{35}, 操作渠道:{36}, 实时清算金额:{37}",
                QryPos, IntOrg, TrdDate, OrderDate, OrderTime, OrderId, ((char)OrderStatus).ToString(), ((char)OrderValidFlag).ToString(), CustCode, CuacctCode, Stkbd,
                Stkpbu, StkBiz, StkBizAction, StkCode, StkName, ((char)Currency).ToString(), BondInt, OrderPrice, OrderQty, OrderAmt,
                OrderFrzAmt, OrderUfzAmt, OfferQty, OfferStime, WithdrawnQty, MatchedQty, ((char)IsWithdraw).ToString(), ((char)IsWithdrawn).ToString(), OrderBsn, MatchedAmt, Trdacct, CuacctSn, RawOrderId, OfferRetMsg, OpSite, ((char)Channel).ToString(), RltSettAmt);
        }

    };

    //10303004成交查询
    public struct ReqStkMatchInfoField
    {
        public long CustCode; //客户代码
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string StkCode; //证券代码
        public string OrderId; //合同序号
        public int OrderBsn; //委托批号
        public string Trdacct; //交易账户
        public byte QueryFlag; //查询方向
        public string QueryPos; //定位串
        public int QueryNum; //查询行数
        public int CuacctSn; //账户序号
        public byte Flag; //查询标志
    };

    public struct RspStkMatchInfoField
    {
        public string QryPos; //定位串查询
        public string MatchedTime; //成交时间
        public int OrderDate; //委托日期
        public int OrderSn; //委托序号
        public int OrderBsn; //委托批号
        public string OrderId; //合同序号
        public int IntOrg; //内部机构
        public long CustCode; //客户代码
        public long CuacctCode; //资产账户
        public string Stkbd; //交易板块
        public string Stkpbu; //交易单元
        public string StkTrdacct; //证券账户
        public int StkBiz; //证券业务
        public int StkBizAction; //证券业务行为
        public string StkCode; //证券代码
        public string StkName; //证券名称
        public byte Currency; //货币代码
        public string BondInt; //债券利息
        public string OrderPrice; //委托价格
        public long OrderQty; //委托数量
        public string OrderAmt; //委托金额
        public string OrderFrzAmt; //委托冻结金额
        public string MatchedSn; //成交编号
        public string MatchedPrice; //成交价格
        public string MatchedQty; //已成交数量
        public string MatchedAmt; //已成交金额
        public byte MatchedType; //成交类型
        public int CuacctSn; //账户序号
        public byte IsWithdraw; //撤单标志
        public byte OrderStatus; //委托状态
        public string RltSettAmt; //实时清算金额
        public override string ToString()
        {
            return String.Format(@"定位串查询:{0}, 成交时间:{1}, 委托日期:{2}, 委托序号:{3}, 委托批号:{4}, 合同序号:{5}, 内部机构:{6}, 客户代码:{7}, 资产账户:{8}, 交易板块:{9}, 交易单元:{10}," + 
                "证券账户:{11}, 证券业务:{12}, 证券业务行为:{13}, 证券代码:{14}, 证券名称:{15}, 货币代码:{16}, 债券利息:{17}, 委托价格:{18}, 委托数量:{19}, 委托金额:{20}," + 
                "委托冻结金额:{21}, 成交编号:{22}, 成交价格:{23}, 已成交数量:{24}, 已成交金额:{25}, 成交类型:{26}, 账户序号:{27}, 撤单标志:{28}, 委托状态:{29}, 实时清算金额:{30}",
                QryPos, MatchedTime, OrderDate, OrderSn, OrderBsn, OrderId, IntOrg, CustCode, CuacctCode, Stkbd, Stkpbu,
                StkTrdacct, StkBiz, StkBizAction, StkCode, StkName, ((char)Currency).ToString(), BondInt, OrderPrice, OrderQty, OrderAmt,
                OrderFrzAmt, MatchedSn, MatchedPrice, MatchedQty, MatchedAmt, ((char)MatchedType).ToString(), CuacctSn, ((char)IsWithdraw).ToString(), ((char)OrderStatus).ToString(), RltSettAmt);
        }
    };

    //10303001:可用资金查询
    public struct ReqStkQryFundField
    {
        public long CustCode; // 客户代码
        public long CuacctCode; // 资产账户
        public byte Currency; // 货币代码
        public int ValueFlag; // 取值标志
    };

    public struct RspStkQryFundField
    {
        public long CustCode; // 客户代码
        public long CuacctCode; // 资产账户
        public byte Currency; // 货币代码
        public int IntOrg; // 内部机构
        public string MarketValue; // 资产总值
        public string FundValue; // 资金资产
        public string StkValue; // 市值
        public string FundLoan; // 融资总金额
        public string FundLend; // 融券总金额
        public string FundPrebln; // 资金昨日余额
        public string FundBln; // 资金余额
        public string FundAvl; // 资金可用金额
        public string FundFrz; // 资金冻结金额
        public string FundUfz; // 资金解冻金额
        public string FundTrdFrz; // 资金交易冻结金额
        public string FundTrdUfz; // 资金交易解冻金额
        public string FundTrdOtd; // 资金交易在途金额
        public string FundTrdBln; // 资金交易轧差金额
        public byte FundStatus; // 资金状态
        public byte CuacctAttr; // 资产账户属性
        public string FundBorrowBln; // 资金内部拆借金额
        public string HFundAvl; // 港通资金可用
        public string HFundTrdFrz; // 港通资金交易冻结
        public string HFundTrdUfz; // 港通资金交易解冻
        public string HFundTrdOtd; // 港通资金交易在途
        public string HFundTrdBln; // 港通资金交易轧差
        public string CreditFundBln; // 融券卖出金额
        public string CreditFundFrz; // 融券卖出金额冻结
        public string QryPos; // 定位串
        public byte HgtFlag; // 港股通资金通用标志
        public int ExtOrg; // 外部机构
        public string Cashproval; // 现金宝资产

        public override string ToString()
        {
            return String.Format(@"客户代码:{0}, 资产账户:{1}, 货币代码:{2}, 内部机构:{3}, 资产总值:{4}, 资金资产:{5}, 市值:{6}, " +
                "融资总金额:{7}, 融券总金额:{8}, 资金昨日余额:{9}, 资金余额:{10}, 资金可用余额:{11}, 资金冻结金额:{12}, 资金解冻金额:{13}, " +
                "资金交易冻结金额:{14}, 资金交易解冻金额:{15}, 资金交易在途金额:{16}, 资金交易轧差金额:{17}, 资金状态:{18}, 资金账户属性:{19}",
                CustCode, CuacctCode, ((char)Currency).ToString(), IntOrg, MarketValue, FundValue, StkValue,
                FundLoan, FundLend, FundPrebln, FundBln, FundAvl, FundFrz, FundUfz,
                FundTrdFrz, FundTrdUfz, FundTrdOtd, FundTrdBln, ((char)FundStatus).ToString(), ((char)CuacctAttr).ToString());
        }
    };

    //10303002:可用股份查询
    public struct ReqStkQrySharesField
    {
        public long CustCode; // 客户代码
        public long CuacctCode; // 资产账户
        public string Stkbd; // 交易板块
        public string StkCode; // 证券代码
        public string Stkpbu; // 交易单元
        public byte QueryFlag; // 查询方向
        public string Trdacct; // 交易账户
        public string QueryPos; // 定位串
        public int QueryNum; // 查询行数
        public byte ContractFlag; // 启用合约开关
        public byte BizFlag; // 业务标志
        public int IntOrg; // 内部机构
    };

    public struct RspStkQrySharesField
    {
        public string QryPos; // 定位串
        public int IntOrg; // 内部机构
        public long CustCode; // 客户代码
        public long CuacctCode; // 资产账户
        public string Stkbd; // 交易板块
        public string Stkpbu; // 交易单元
        public string Trdacct; // 交易账户
        public byte Currency; // 货币代码
        public string StkCode; // 证券代码
        public string StkName; // 证券名称
        public byte StkCls; // 证券类别
        public long StkPrebln; // 证券昨日余额
        public long StkBln; // 证券余额
        public long StkAvl; // 证券可用数量
        public long StkFrz; // 证券冻结数量
        public long StkUfz; // 证券解冻数量
        public long StkTrdFrz; // 证券交易冻结数量
        public long StkTrdUfz; // 证券交易解冻数量
        public long StkTrdOtd; // 证券交易在途数量
        public long StkTrdBln; // 证券交易扎差数量
        public string StkPcost; // 证券持仓成本
        public string StkPcostRlt; // 证券持仓成本（实时）
        public string StkPlamt; // 证券盈亏金额
        public string StkPlamtRlt; // 证券盈亏金额（实时）
        public string MktVal; // 市值
        public string StktPrice; // 成本价格
        public string ProIncome; // 参考盈亏
        public byte StkCalMktval; // 市值计算标识
        public long StkQty; // 当前拥股数
        public string CurrentPrice; // 最新价格
        public string ProfitPrice; // 参考成本价
        public long StkDiff; // 可申赎数量
        public long StkTrdUnfrz; // 已申赎数量
        public string Income; // 盈亏
        public long StkRemain; // 余券可用数量
        public long StkSale; // 卖出冻结数量
        public byte IsCollat; // 是否是担保品
        public string CollatRatio; // 担保品折算率
        public string MarketValue; // 市值（账户）
        public long MktQty; // 当前拥股数（账户）
        public string LastPrice; // 最新价格（账户）
        public string ProfitRate; // 盈亏比例
        public string AveragePrice; // 买入均价
        public long StkTrdEtfctn; // ETF申购数量
        public long StkTrdEtfrmn; // ETF赎回数量

        public override string ToString()
        {
            return String.Format(@"客户代码:{0}, 资产账户:{1}, 货币代码:{2}, 内部机构:{3}, 交易板块:{4}, 交易单元:{5}, 交易账户:{6}, " +
                "证券代码:{7}, 证券名称:{8}, 证券类别:{9}, 证券昨日余额:{10}, 证券余额:{11}, 证券可用数量:{12}, 证券冻结数量:{13}, " +
                "证券解冻数量:{14}, 证券交易冻结数量:{15}, 证券交易解冻数量:{16}, 证券交易在途数量:{17}, 证券交易轧差数量:{18}, 证券持仓成本:{19}, " +
                "证券持仓成本（实时）:{20}, 证券盈亏金额:{21}, 证券盈亏金额（实时）:{22}, 市值:{23}, 成本价格:{24}, 参考盈亏:{25}, " +
                "市值计算标识:{26}, 当前拥股数:{27}, 最新价格:{28}, 参考成本价:{29}, 可申赎数量:{30}, 已申赎数量:{31}, " +
                "盈亏:{32}, 余券可用数量:{33}, 卖出冻结数量:{34}",
                CustCode, CuacctCode, ((char)Currency).ToString(), IntOrg, Stkbd, Stkpbu, Trdacct,
                StkCode, StkName, ((char)StkCls).ToString(), StkPrebln, StkBln, StkAvl, StkFrz,
                StkUfz, StkTrdFrz, StkTrdUfz, StkTrdOtd, StkTrdBln, StkPcost,
                StkPcostRlt, StkPlamt, StkPlamtRlt, MktVal, StktPrice, ProIncome,
                ((char)StkCalMktval).ToString(), StkQty, CurrentPrice, ProfitPrice, StkDiff, StkTrdUnfrz,
                Income, StkRemain, StkSale);
        }
    };

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
    public struct RtnStkOrderConfirmField
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
        public byte CuacctAttr;               // 账户属性
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
            return String.Format(@"交易市场:{0},证券代码:{1},合同序号:{2},交易账户:{3},撤单标志:{4},客户代码:{5},资产账户:{6},委托批号:{7},账户序号:{8}," +
                "交易板块:{9},委托状态:{10},证券业务:{11},业务行为:{12},账户属性:{13},委托日期:{14},委托序号:{15},内部机构:{16},交易单元:{17},委托价格:{18}," +
                "委托数量:{19},证券账户子编码:{20},期权合约账户:{21},合约代码:{22},合约简称:{23},货币代码:{24},标的证券类别:{25},标的证券代码:{26},标的证券名称:{27}",
                ((char)Stkex).ToString(), StkCode, OrderId, Trdacct, ((char)IsWithdraw).ToString(), CustCode, CuacctCode, OrderBsn, CuacctSn,
                Stkbd, OrderStatus, StkBiz, StkBizAction, ((char)CuacctAttr).ToString(), OrderDate, OrderSn, IntOrg, Stkpbu, OrderPrice,
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
        public string OpSite; //操作站点

        public LoginInfo(string usercode, string cuacctcode, string custcode, byte cuaccttype, string enauthdata, int intorg, string channel, string sessionid, string shacct, string szacct, string opSite)
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
            OpSite = opSite;
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

}
