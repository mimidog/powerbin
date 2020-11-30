package com.szkingdom.business.common;

import org.apache.commons.lang.ObjectUtils;

import java.util.*;

/**
 * Created by Administrator on 2016/11/15.
 */
public class AtomError {

    /**
     * 1-2内部Atom错误信息，以-1开头，开度6位,
     * CODE变量以_ATOM_ERROR_CODE结尾
     * MSG变量以_ATOM_ERROR_MSG结尾
     **/
    public static final int QUERY_UPM_SYSPARAM_ERROR_CODE = -100000;
    public static final String QUERY_UPM_SYSPARAM_ERROR_MSG = "查询平台系统参数失败";

    public static final int QUERY_T_CUACCT_ERROR_CODE = -100001;
    public static final String QUERY_T_CUACCT_ERROR_MSG = "查询客户资金账号信息失败";

    public static final int ADD_T_CUACCT_ERROR_CODE = -100002;
    public static final String ADD_T_CUACCT_ERROR_MSG = "新增客户资金账号信息失败";

    public static final int MOD_T_CUACCT_ERROR_CODE = -100003;
    public static final String MOD_T_CUACCT_ERROR_MSG = "修改客户资金账号信息失败";

    public static final int DEL_T_CUACCT_ERROR_CODE = -100004;
    public static final String DEL_T_CUACCT_ERROR_MSG = "删除客户资金账号信息失败";

    public static final int QUERY_T_TRDACCT_ERROR_CODE = -100005;
    public static final String QUERY_T_TRDACCT_ERROR_MSG = "查询客户交易账号信息失败";

    public static final int ADD_T_TRDACCT_ERROR_CODE = -100006;
    public static final String ADD_T_TRDACCT_ERROR_MSG = "新增客户交易账号信息失败";

    public static final int MOD_T_TRDACCT_ERROR_CODE = -100007;
    public static final String MOD_T_TRDACCT_ERROR_MSG = "修改客户交易账号信息失败";

    public static final int DEL_T_TRDACCT_ERROR_CODE = -100008;
    public static final String DEL_T_TRDACCT_ERROR_MSG = "删除客户交易账号信息失败";

    public static final int QUERY_T_CUSTOMER_OPEN_INFO_ERROR_CODE = -100009;
    public static final String QUERY_T_CUSTOMER_OPEN_INFO_ERROR_MSG = "查询客户开户信息失败";

    public static final int ADD_T_CUST_BASE_INFO_ERROR_CODE = -100010;
    public static final String ADD_T_CUST_BASE_INFO_ERROR_MSG = "新增个人客户基本信息失败";

    public static final int ADD_T_CUSTOMER_ERROR_CODE = -100011;
    public static final String ADD_T_CUSTOMER_INFO_ERROR_MSG = "新增个人客户开户信息";

    public static final int MOD_T_CUST_BASE_INFO_ERROR_CODE = -100012;
    public static final String MOD_T_CUST_BASE_INFO_ERROR_MSG = "修改个人客户基本信息失败";

    public static final int MOD_T_CUSTOMER_ERROR_CODE = -100013;
    public static final String MOD_T_CUSTOMER_INFO_ERROR_MSG = "修改个人客户开户信息";

    public static final int DEL_T_CUSTOMER_ERROR_CODE = -100014;
    public static final String DEL_T_CUSTOMER_INFO_ERROR_MSG = "删除个人客户开户信息失败";

    public static final int DEL_T_CUST_BASE_INFO_ERROR_CODE = -100015;
    public static final String DEL_T_CUST_BASE_INFO_ERROR_MSG = "删除个人客户基本信息失败";

    public static final int QUERY_T_CUACCT_SUB_ERROR_CODE = -100016;
    public static final String QUERY_T_CUACCT_SUB_ERROR_MSG = "查询资金子账户设置信息失败";

    public static final int ADD_T_CUACCT_SUB_ERROR_CODE = -100017;
    public static final String ADD_T_CUACCT_SUB_ERROR_MSG = "新增资金子账户设置信息失败";

    public static final int MOD_T_CUACCT_SUB_ERROR_CODE = -100018;
    public static final String MOD_T_CUACCT_SUB_ERROR_MSG = "修改资金子账户设置信息失败";

    public static final int DEL_T_CUACCT_SUB_ERROR_CODE = -100019;
    public static final String DEL_T_CUACCT_SUB_ERROR_MSG = "删除资金子账户设置信息失败";

    public static final int QUERY_T_TRADE_CFG_ERROR_CODE = -100020;
    public static final String QUERY_T_TRADE_CFG_ERROR_MSG = "查询维度设置信息失败";

    public static final int ADD_T_TRADE_CFG_ERROR_CODE = -100021;
    public static final String ADD_T_TRADE_CFG_ERROR_MSG = "新增维度设置信息失败";

    public static final int MOD_T_TRADE_CFG_ERROR_CODE = -100022;
    public static final String MOD_T_TRADE_CFG_ERROR_MSG = "修改维度设置信息失败";

    public static final int DEL_T_TRADE_CFG_ERROR_CODE = -100023;
    public static final String DEL_T_TRADE_CFG_ERROR_MSG = "删除维度设置信息失败";

    public static final int GET_T_TRADE_CFG_LVL_ERROR_CODE = -100024;
    public static final String GET_T_TRADE_CFG_LVL_ERROR_MSG = "计算维度级别失败";

    public static final int T_TRADE_CFG_LVL_TO_BIG_ERROR_CODE = -100025;
    public static final String T_TRADE_CFG_LVL_TO_BIG_ERROR_MSG = "建立级维度别过大，无法建立此维度";

    public static final int QUERY_T_TRADE_STOCK_ERROR_CODE = -100026;
    public static final String QUERY_T_TRADE_STOCK_ERROR_MSG = "查询维度证券信息失败";

    public static final int ADD_T_TRADE_STOCK_ERROR_CODE = -100027;
    public static final String ADD_T_TRADE_STOCK_ERROR_MSG = "新增维度证券信息失败";

    public static final int MOD_T_TRADE_STOCK_ERROR_CODE = -100028;
    public static final String MOD_T_TRADE_STOCK_ERROR_MSG = "删除维度证券信息失败";

    public static final int DEL_T_TRADE_STOCK_ERROR_CODE = -100029;
    public static final String DEL_T_TRADE_STOCK_ERROR_MSG = "删除维度证券信息失败";

    public static final int QUERY_T_STK_INFO_ERROR_CODE = -100030;
    public static final String QUERY_T_STK_INFO_ERROR_MSG = "查询证券产品信息失败";

    public static final int QUERY_T_STK_POOL_REL_OP_ERROR_CODE = -100031;
    public static final String QUERY_T_STK_POOL_REL_OP_ERROR_MSG = "查询交易员分配股票池信息";

    public static final int ADD_T_STK_POOL_REL_OP_ERROR_CODE = -100032;
    public static final String ADD_T_STK_POOL_REL_OP_ERROR_MSG = "新增交易员分配股票池信息失败";

    public static final int  MOD_T_STK_POOL_REL_OP_ERROR_CODE = -100033;
    public static final String MOD_T_STK_POOL_REL_OP_ERROR_MSG = "修改交易员分配股票池信息失败";

    public static final int DEL_T_STK_POOL_REL_OP_ERROR_CODE = -100034;
    public static final String DEL_T_STK_POOL_REL_OP_ERROR_MSG = "删除交易员分配股票池信息失败";

    public static final int T_STK_POOL_REL_OP_EXIST_ERROR_CODE = -100035;
    public static final String T_STK_POOL_REL_OP_EXIST_ERROR_MSG = "该股票池之前已经分配置交易员了";

    public static final int MOD_T_TRADE_CFG_STA_ERROR_CODE = -100036;
    public static final String MOD_T_TRADE_CFG_STA_ERROR_MSG = "修改维度状态信息失败";

    public static final int QUERY_T_STK_POOL_CFG_ERROR_CODE = -100037;
    public static final String QUERY_T_STK_POOL_CFG_ERROR_MSG = "查询股票池配置信息失败";

    public static final int ADD_T_STK_POOL_CFG_ERROR_CODE = -100038;
    public static final String ADD_T_STK_POOL_CFG_ERROR_MSG = "新增股票池配置信息失败";

    public static final int MOD_T_STK_POOL_CFG_ERROR_CODE = -100039;
    public static final String MOD_T_STK_POOL_CFG_ERROR_MSG = "修改股票池配置信息失败";

    public static final int DEL_T_STK_POOL_CFG_ERROR_CODE = -100040;
    public static final String DEL_T_STK_POOL_CFG_ERROR_MSG = "删除股票池配置信息失败";

    public static final int T_STK_POOL_CFG_EXIST_ERROR_CODE = -100041;
    public static final String T_STK_POOL_CFG_EXIST_ERROR_MSG = "类型与范围相同池子信息已经存在";

    public static final int QUERY_T_RISK_TYPE_CFG_ERROR_CODE = -100042;
    public static final String QUERY_T_RISK_TYPE_CFG_ERROR_MSG = "查询风控类型信息失败";

    public static final int ADD_T_RISK_TYPE_CFG_ERROR_CODE = -100043;
    public static final String ADD_T_RISK_TYPE_CFG_ERROR_MSG = "新增风控类型信息失败";

    public static final int MOD_T_RISK_TYPE_CFG_ERROR_CODE = -100044;
    public static final String MOD_T_RISK_TYPE_CFG_ERROR_MSG = "修改风控类型信息失败";

    public static final int MOD_T_RISK_TYPE_CFG_STA_ERROR_CODE = -100045;
    public static final String MOD_T_RISK_TYPE_CFG_STA_ERROR_MSG = "修改风控类型状态信息失败";

    public static final int DEL_T_RISK_TYPE_CFG_ERROR_CODE = -100046;
    public static final String DEL_T_RISK_TYPE_CFG_ERROR_MSG = "删除风控类型信息失败";

    public static final int GET_T_RISK_TYPE_CFG_LVL_ERROR_CODE = -100047;
    public static final String GET_RISK_TYPE_CFG_LVL_ERROR_MSG = "计算风控类型级别失败";

    public static final int RISK_TYPE_LVL_TO_BIG_ERROR_CODE = -100048;
    public static final String RISK_TYPE_LVL_TO_BIG_ERROR_MSG = "建立级风控类型级别过大，无法建立此维度";

    public static final int  QUERY_T_RISK_CFG_ERROR_CODE = -100049;
    public static final String QUERY_T_RISK_CFG_ERROR_MSG = "查询风控配置信息失败";

    public static final int  ADD_T_RISK_CFG_ERROR_CODE = -100050;
    public static final String ADD_T_RISK_CFG_ERROR_MSG = "新增风控配置信息失败";

    public static final int  MOD_T_RISK_CFG_ERROR_CODE = -100051;
    public static final String MOD_T_RISK_CFG_ERROR_MSG = "修改风控配置信息失败";

    public static final int  DEL_T_RISK_CFG_ERROR_CODE = -100052;
    public static final String DEL_T_RISK_CFG_ERROR_MSG = "删除风控配置信息失败";

    public static final int  QUERY_T_OMS_ERROR_CODE = -100053;
    public static final String QUERY_T_OMS_ERROR_MSG = "查询订单管理信息失败";

    public static final int  ADD_T_OMS_ERROR_CODE = -100054;
    public static final String ADD_T_OMS_ERROR_MSG = "新增订单管理信息失败";

    public static final int  MOD_T_OMS_ERROR_CODE = -100055;
    public static final String MOD_T_OMS_ERROR_MSG = "修改订单管理信息失败";

    public static final int  DEL_T_OMS_ERROR_CODE = -100056;
    public static final String DEL_T_OMS_ERROR_MSG = "删除订单管理信息失败";

    public static final int  QUERY_T_MATCH_ERROR_CODE = -100057;
    public static final String QUERY_T_MATCH_ERROR_MSG = "查询订单成交信息失败";

    public static final int  ADD_T_MATCH_ERROR_CODE = -100058;
    public static final String ADD_T_MATCH_ERROR_MSG = "新增订单成交信息失败";

    public static final int  MOD_T_MATCH_ERROR_CODE = -100059;
    public static final String MOD_T_MATCH_ERROR_MSG = "修改订单成交信息失败";

    public static final int  DEL_T_MATCH_ERROR_CODE = -100060;
    public static final String DEL_T_MATCH_ERROR_MSG = "删除订单成交信息失败";

    public static final int  QUERY_T_MTS_ASSET_SUB_ERROR_CODE = -100061;
    public static final String QUERY_T_MTS_ASSET_SUB_ERROR_MSG = "查询客户股份二级持仓信息失败";

    public static final int  QUERY_T_STOCK_HQ_ERROR_CODE = -100062;
    public static final String QUERY_T_STOCK_HQ_ERROR_MSG = "查询客户股票行情信息失败";

    public static final int  ADD_T_FUND_INFO_ERROR_CODE = -100062;
    public static final String ADD_T_FUND_INFO_ERROR_MSG = "新增客户资金一级持仓信息失败";

    public static final int  ADD_T_FUND_INFO_SUB_ERROR_CODE = -100063;
    public static final String ADD_T_FUND_INFO_SUB_ERROR_MSG = "新增客户资金二级持仓信息失败";

    public static final int  QUERY_T_FUND_INFO_ERROR_CODE = -100064;
    public static final String QUERY_T_FUND_INFO_ERROR_MSG = "查询客户资金一级持仓信息失败";

    public static final int  QUERY_T_FUND_INFO_SUB_ERROR_CODE = -100065;
    public static final String QUERY_T_FUND_INFO_SUB_ERROR_MSG = "查询客户资金二级持仓信息失败";

    public static final int  MOD_T_FUND_INFO_ERROR_CODE = -100066;
    public static final String MOD_T_FUND_INFO_ERROR_MSG = "修改客户资金一级持仓信息失败";

    public static final int  MOD_T_FUND_INFO_SUB_ERROR_CODE = -100067;
    public static final String MOD_T_FUND_INFO_SUB_ERROR_MSG = "修改客户资金二级持仓信息失败";

    public static final int  ADD_T_MTS_ASSET_ERROR_CODE = -100068;
    public static final String ADD_T_MTS_ASSET_ERROR_MSG = "新增客户股份一级持仓信息失败";

    public static final int  QUERY_T_MTS_ASSET_ERROR_CODE = -100069;
    public static final String QUERY_T_MTS_ASSET_ERROR_MSG = "查询客户股份一级持仓信息失败";

    public static final int  MOD_T_MTS_ASSET_ERROR_CODE = -100070;
    public static final String MOD_T_MTS_ASSET_ERROR_MSG = "修改客户股份一级持仓信息失败";

    public static final int  ADD_T_MTS_ASSET_SUB_ERROR_CODE = -100071;
    public static final String ADD_T_MTS_ASSET_SUB_ERROR_MSG = "新增客户股份二级持仓信息失败";

    public static final int  MOD_MTS_ASSET_SUB_ERROR_CODE = -100072;
    public static final String MOD_MTS_ASSET_SUB_ERROR_MSG = "修改客户股份二级持仓信息失败";

    public static final int  QUERY_NEXT_TRD_DAY_ERROR_CODE = -100073;
    public static final String QUERY_NEXT_TRD_DAY_ERROR_MSG = "查询下一个交易日失败";

    public static final int  MOD_SYSTEM_DATE_INFO_ERROR_CODE = -100074;
    public static final String MOD_SYSTEM_DATE_INFOERROR_MSG = "修改系统日期失败";

    public static final int  CLEAR_T_FUND_INFO_ERROR_CODE = -100075;
    public static final String CLEAR_T_FUND_INFO_INFOERROR_MSG = "清算一级资金持仓信息失败";

    public static final int  CLEAR_T_FUND_INFO_SUB_ERROR_CODE = -100076;
    public static final String CLEAR_T_FUND_INFO_SUB_INFOERROR_MSG = "清算二级资金持仓信息失败";

    public static final int  CLEAR_T_MTS_ASSET_ERROR_CODE = -100077;
    public static final String CLEAR_T_MTS_ASSET_INFOERROR_MSG = "清算一级股份持仓信息失败";

    public static final int  CLEAR_T_MTS_ASSET_SUB_ERROR_CODE = -100078;
    public static final String CLEAR_T_MTS_ASSET_SUB_ERROR_MSG = "清算二级份持仓信息失败";

    public static final int  QUERY_SYSTEM_DATE_ERROR_CODE = -100079;
    public static final String QUERY_SYSTEM_DATE_ERROR_MSG = "查询系统日期失败";

    public static final int File_PATH_OR_FILE_ATOM_ERROR_CODE = -100080;
    public static final String File_PATH_OR_FILE_ATOM_ERROR_MSG = "文件路径或文件不存在！";

    public static final int ADD_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_CODE = -100081;
    public static final String ADD_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_MSG = "买入信息文件批量新增临时表失败！";

    public static final int CLEAR_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_CODE = -100082;
    public static final String CLEAR_T_BUY_BUILD_POS_TEMP_ATOM_ERROR_MSG = "清空买入信号临时表失败！";

    public static final int ADD_T_STOK_BUILD_POS_BUY_ATOM_ERROR_CODE= -100083;
    public static final String ADD_T_STOK_BUILD_POS_BUY_ATOM_ERROR_MSG = "买入股票正式建仓新增失败！";

    public static final int  MOD_T_STOK_BUILD_POS_BUY_STA_ATOM_ERROR_CODE = -100084;
    public static final String MOD_T_STOK_BUILD_POS_BUY_STA_ATOM_ERROR_MSG = "更新买方向股票建仓信息状态！";

    public static final int  ADD_OMS_BY_BUY_BUILD_POS_ATOM_ERROR_CODE = -100085;
    public static final String ADD_OMS_BY_BUY_BUILD_POS_ATOM_ERROR_MSG = "根据买入建仓信息插入到订单信息失败！";

    public static final int ADD_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_CODE = -100086;
    public static final String ADD_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_MSG = "卖出信息文件批量新增临时表失败！";

    public static final int CLEAR_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_CODE = -100087;
    public static final String CLEAR_T_SELL_BUILD_POS_TEMP_ATOM_ERROR_MSG = "清空卖出信号临时表失败！";

    public static final int ADD_T_STOK_BUILD_POS_SELL_ATOM_ERROR_CODE= -100088;
    public static final String ADD_T_STOK_BUILD_POS_SELL_ATOM_ERROR_MSG = "卖出股票正式建仓新增失败！";

    public static final int  ADD_OMS_BY_SELL_BUILD_POS_ATOM_ERROR_CODE = -100089;
    public static final String ADD_OMS_BY_SELL_BUILD_POS_ATOM_ERROR_MSG = "根据卖出建仓信息插入到订单信息失败！";

    public static final int  QUERY_T_OMS_HIS_ERROR_CODE = -100090;
    public static final String QUERY_T_OMS_HIS_ERROR_MSG = "查询订单的历史信息失败！";

    public static final int  ADD_T_OMS_HIS_ERROR_CODE = -100091;
    public static final String ADD_T_OMS_HIS_ERROR_MSG = "新增订单的历史信息失败！";

    public static final int  QUERY_T_MATCH_HIS_ERROR_CODE = -100092;
    public static final String QUERY_T_MATCH_HIS_ERROR_MSG = "查询成交的历史信息失败！";

    public static final int  ADD_T_MATCH_HIS_ERROR_CODE = -100093;
    public static final String ADD_T_MATCH_HIS_ERROR_MSG = "新增成交的历史信息失败！";

    public static final int  QUERY_T_OUTLAY_SET_ERROR_CODE = -100094;
    public static final String QUERY_T_OUTLAY_SET_ERROR_MSG = "查询客户费用设置信息失败！";

    public static final int  ADD_T_OUTLAY_SET_ERROR_CODE = -100095;
    public static final String ADD_T_OUTLAY_SET_ERROR_MSG = "新增客户费用设置信息失败！";

    public static final int  MOD_T_OUTLAY_SET_ERROR_CODE = -100096;
    public static final String MOD_T_OUTLAY_SET_ERROR_MSG = "修改客户费用设置信息失败！";

    public static final int  DEL_T_OUTLAY_SET_ERROR_CODE = -100097;
    public static final String DEL_T_OUTLAY_SET_ERROR_MSG = "删除客户费用设置信息失败！";

    public static final int  T_OUTLAY_SET_EXIST_ERROR_CODE = -100098;
    public static final String T_OUTLAY_SET_EXIST_ERROR_MSG = "对应费用设置信息已经存在！";

    public static final int   DEL_T_MTS_ASSET_EMPTY_STOCK_ERROR_CODE = -100099;
    public static final String DEL_T_MTS_ASSET_EMPTY_STOCK_ERROR_MSG = "日切清空一级股份持仓空股份数据失败！";

    public static final int   DEL_T_MTS_ASSET_SUB_EMPTY_STOCK_ERROR_CODE = -100100;
    public static final String DEL_T_MTS_ASSET_SUB_EMPTY_STOCK_ERROR_MSG = "日切清空二级股份持仓空股份数据失败！";

    public static final int    QUERY_T_TRADE_ACT_CTRL_ERROR_CODE = -100101;
    public static final String QUERY_T_TRADE_ACT_CTRL_ERROR_MSG = "查询操作员交易行为控制信息失败！";

    public static final int    ADD_T_TRADE_ACT_CTRL_ERROR_CODE = -100102;
    public static final String ADD_T_TRADE_ACT_CTRL_ERROR_MSG = "新增操作员交易行为控制信息失败！";

    public static final int    MOD_T_TRADE_ACT_CTRL_ERROR_CODE = -100103;
    public static final String MOD_T_TRADE_ACT_CTRL_ERROR_MSG = "修改操作员交易行为控制信息失败！";

    public static final int    QUERY_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE = -100104;
    public static final String QUERY_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG = "查询交易员日结汇总信息失败！";

    public static final int    QUERY_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE = -100105;
    public static final String QUERY_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG = "查询交易员日结明细信息失败！";

    public static final int    HAND_ADD_T_STOK_BUILD_POS_ERROR_CODE = -100106;
    public static final String HAND_ADD_T_STOK_BUILD_POS_ERROR_MSG = "手动添加股票持仓信息失败！";

    public static final int    QUERY_T_STOK_BUILD_POS_ERROR_CODE = -100107;
    public static final String QUERY_T_STOK_BUILD_POS_ERROR_MSG = "查询股票持仓信息失败！";

    public static final int    DEL_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE = -100108;
    public static final String DEL_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG = "清空交易员日结汇总信息失败";

    public static final int    ADD_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE = -100109;
    public static final String ADD_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG = "新增交易员日结汇总信息失败";

    public static final int    DEL_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE = -100110;
    public static final String DEL_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG = "清空交易员日结明细信息失败";

    public static final int    ADD_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE = -100111;
    public static final String ADD_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG = "新增交易员日结明细信息失败";

    public static final int    ADD_T_OP_LOG_ERROR_CODE = -100112;
    public static final String ADD_T_OP_LOG_ERROR_MSG = "新增操作日志失败";

    public static final int    ADD_T_MTS_FEE_SUB_ERROR_CODE = -100113;
    public static final String ADD_T_MTS_FEE_SUB_ERROR_MSG = "新增客户二级费用信息失败";

    public static final int    MOD_MTS_ASSET_SUB_STK_PRICE_ERROR_CODE = -100114;
    public static final String MOD_MTS_ASSET_SUB_STK_PRICE_ERROR_MSG = "更新二级股份收盘价信息失败！";

    public static final int QUERY_SERIAL_DATA_FAIL_CODE = -100115;
    public static final String QUERY_SERIAL_DATA_FAIL_MSG = "序列号表查询无记录";

    public static final int CHECK_CUR_SERIAL_VAL_FAIL_CODE = -100116;
    public static final String CHECK_CUR_SERIAL_VAL_FAIL_MSG = "当前序列号值不能大于最大序列值";

    public static final int UPDATE_SERIAL_FAIL_CODE = -100117;
    public static final String UPDATE_SERIAL_FAIL_MSG = "修改序列号配置信息失败";

    public static final int QUERY_SERIAL_FAIL_CODE = -100118;
    public static final String QUERY_SERIAL_FAIL_MSG = "序列号表记录查询失败";

    public static final int CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE = -100119;
    public static final String CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG = "调用数据权限失败";

    public static final int QUERY_T_OP_LOG_FAIL_CODE = -100120;
    public static final String QUERY_T_OP_LOG_FAIL_MSG = "操作日志查询失败";

    public static final int DATABASE_BACKUP_FAIL_CODE = -100121;
    public static final String DATABASE_BACKUP_FAIL_MSG = "数据库备份失败！";

    public static final int ADD_T_FUND_INFO_CLEAR_BAK_FAIL_CODE = -100122;
    public static final String ADD_T_FUND_INFO_CLEAR_BAK_FAIL_MSG = "新增客户资金一级持仓信息清算备份信息失败！";

    public static final int ADD_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE = -100123;
    public static final String ADD_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG = "新增客户资金二级持仓信息清算备份信息失败！";

    public static final int ADD_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE = -100124;
    public static final String ADD_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG = "新增客户股份一级持仓信息清算备份信息失败！";

    public static final int ADD_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE = -100125;
    public static final String ADD_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG = "新增客户股份一级持仓信息清算备份信息失败！";

    public static final int QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_CODE = -100126;
    public static final String QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_MSG = "查询客户资金一级持仓信息清算备份信息失败！";

    public static final int T_FUND_INFO_CLEAR_BAK_DATA_EXIST_FAIL_CODE = -100127;
    public static final String T_FUND_INFO_CLEAR_BAK_DATA_EXIST_FAIL_MSG = "客户资金一级持仓信息清算备份数据已存在";

    public static final int QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE = -100128;
    public static final String QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG = "查询客户资金二级持仓信息清算备份信息失败！";

    public static final int T_FUND_INFO_SUB_CLEAR_BAK_DATA_EXIST_FAIL_CODE = -100129;
    public static final String T_FUND_INFO_SUB_CLEAR_BAK_DATA_EXIST_FAIL_MSG = "客户资金二级持仓信息清算备份数据已存在";

    public static final int QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE = -100130;
    public static final String QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG = "查询客户股份一级持仓信息清算备份信息失败！";

    public static final int T_MTS_ASSET_CLEAR_BAK_DATA_EXIST_FAIL_CODE = -100131;
    public static final String T_MTS_ASSET_CLEAR_BAK_DATA_EXIST_FAIL_MSG = "客户股份一级持仓信息清算备份数据已存在";

    public static final int QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE = -100132;
    public static final String QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG = "客户股份二级持仓信息清算备份数据已存在";

    public static final int T_MTS_ASSET_SUB_CLEAR_BAK_DATA_EXIST_FAIL_CODE = -100133;
    public static final String T_MTS_ASSET_SUB_CLEAR_BAK_DATA_EXIST_FAIL_MSG = "客户股份二级持仓信息清算备份数据已存在";

    public static final int  DELETE_T_FUND_INFO_FAIL_CODE = -100134;
    public static final String DELETE_T_FUND_INFO_FAIL_MSG = "删除客户资金一级持仓信息失败";

    public static final int  RESTORE_T_FUND_INFO_FAIL_CODE = -100135;
    public static final String RESTORE_T_FUND_INFO_FAIL_MSG = "回退客户资金一级持仓信息失败";

    public static final int  DELETE_T_FUND_INFO_SUB_FAIL_CODE = -100136;
    public static final String DELETE_T_FUND_INFO_SUB_FAIL_MSG = "删除客户资金二级持仓信息失败";

    public static final int  RESTORE_T_FUND_INFO_SUB_FAIL_CODE = -100136;
    public static final String RESTORE_T_FUND_INFO_SUB_FAIL_MSG = "回退客户资金二级持仓信息失败";

    public static final int  DELETE_T_MTS_ASSET_FAIL_CODE = -100137;
    public static final String DELETE_T_MTS_ASSET_FAIL_MSG = "删除客户股份一级持仓信息失败";

    public static final int  RESTORE_T_MTS_ASSET_FAIL_CODE = -100138;
    public static final String RESTORE_T_MTS_ASSET_FAIL_MSG = "回退客户股份一级持仓信息失败";

    public static final int  DELETE_T_MTS_ASSET_SUB_FAIL_CODE = -100139;
    public static final String DELETE_T_MTS_ASSET_SUB_FAIL_MSG = "删除客户股份二级持仓信息失败";

    public static final int  RESTORE_T_MTS_ASSET_SUB_FAIL_CODE = -100140;
    public static final String RESTORE_T_MTS_ASSET_SUB_FAIL_MSG = "回退客户股份二级持仓信息失败";

    public static final int  DELETE_T_FUND_INFO_CLEAR_BAK_FAIL_CODE = -100141;
    public static final String DELETE_T_FUND_INFO_CLEAR_BAK_FAIL_MSG = "删除客户资金一级持仓备份信息失败";

    public static final int  DELETE_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE = -100142;
    public static final String DELETE_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG = "删除客户资金二级持仓备份信息失败";

    public static final int  DELETE_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE = -100143;
    public static final String DELETE_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG = "删除客户股份一级持仓备份信息失败";

    public static final int  DELETE_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE = -100144;
    public static final String DELETE_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG = "删除客户股份一级持仓备份信息失败";

    public static final int  DELETE_T_MTS_FEE_SUB_FAIL_CODE = -100145;
    public static final String DELETE_T_MTS_FEE_SUB_FAIL_MSG = "删除客户二级费用信息失败";

    public static final int   CURRENT_ORG_SERIAL_NOT_EXIST_FAIL_CODE= -100146;
    public static final String CURRENT_ORG_SERIAL_NOT_EXIST_FAIL_MSG = "当前机构对应的序列号配置信息不存在！";

    public static final int   QRY_UUM_USER_FAIL_CODE= -100147;
    public static final String QRY_UUM_USER_FAIL_MSG = "查询操作员人员信息失败！";

    public static final int   CALC_TRADER_TOTAL_COST_FAIL_CODE= -100148;
    public static final String CALC_TRADER_TOTAL_COST_FAIL_MSG = "计算交易员费用汇总信息失败！";

    public static final int   QUERY_T_OPER_POST_LVL_CHG_APP_FAIL_CODE= -100149;
    public static final String QUERY_T_OPER_POST_LVL_CHG_APP_FAIL_MSG = "查询操作员岗位变更申请信息失败！";

    public static final int   ADD_T_OPER_POST_LVL_CHG_APP_FAIL_CODE= -100150;
    public static final String ADD_T_OPER_POST_LVL_CHG_APP_FAIL_MSG = "新增操作员岗位变更申请信息失败！";

    public static final int   AUDIT_T_OPER_POST_LVL_CHG_APP_FAIL_CODE= -100151;
    public static final String AUDIT_T_OPER_POST_LVL_CHG_APP_FAIL_MSG = "审核操作员岗位变更申请信息失败！";

    public static final int   MOD_UUM_USER_POST_LVL_FAIL_CODE= -100152;
    public static final String MOD_UUM_USER_POST_LVL_FAIL_MSG = "更新操作员表中岗位级别失败！";

    public static final int   ADD_T_TRADER_FUND_ASSET_LOG_FAIL_CODE= -100153;
    public static final String ADD_T_TRADER_FUND_ASSET_LOG_MSG = "新增交易员资金股份流水失败！";

    public static final int   QUERY_TRADER_SURPLUS_SUM_INFO_FAIL_CODE= -100154;
    public static final String QUERY_TRADER_SURPLUS_SUM_INFO_FAIL_MSG = "查询交易员盈亏汇总信息失败！";

    public static final int   MOD_T_STOK_BUILD_POS_SELL_STA_ATOM_ERROR_CODE= -100155;
    public static final String MOD_T_STOK_BUILD_POS_SELL_STA_ATOM_ERROR_MSG = "更新卖方向股票建仓信息状态！";

    public static final int   EXE_PRO_TRADE_DAYSUM_CLEAR_ATOM_ERROR_CODE= -100156;
    public static final String EXE_PRO_TRADE_DAYSUM_CLEAR_ATOM_ERROR_MSG = "交易员交易信息清算归档失败！";

    public static final int   GET_WEBROOT_URL_FAIL_ATOM_ERROR_CODE= -100157;
    public static final String GET_WEBROOT_URL_FAIL_ATOM_ERROR_MSG = "获取项目WebRoot路径失败";

    public static final int PLEASE_WAIT_FILE_UPLOAD_ATOM_ERROR_CODE = -100158;
    public static final String PLEASE_WAIT_FILE_UPLOAD_ATOM_ERROR_MSG = "请等文件上传完成后再执行导入操作";

    public static final int   QUERY_T_SUBSCRBIE_ERROR_CODE= -100159;
    public static final String QUERY_T_SUBSCRBIE_ERROR_MSG= "查询行情订阅信息失败！";

    public static final int   ADD_T_SUBSCRBIE_ERROR_CODE= -100160;
    public static final String ADD_T_SUBSCRBIE_ERROR_MSG= "新增行情订阅信息失败！";

    public static final int   MOD_T_SUBSCRBIE_ERROR_CODE= -100161;
    public static final String MOD_T_SUBSCRBIE_ERROR_MSG= "修改行情订阅信息失败！";

    public static final int   ADD_T_CUST_FUND_ASSET_LOG_ERROR_CODE= -100162;
    public static final String ADD_T_CUST_FUND_ASSET_LOG_ERROR_MSG= "新增客户资金股份流水失败！";

    public static final int   DEL_T_SUBSCRBIE_ERROR_CODE= -100163;
    public static final String DEL_T_SUBSCRBIE_ERROR_MSG= "删除行情订阅信息失败！";

    public static final int   T_SUBSCRBIE_AlREADY_EXIST_ERROR_CODE= -100164;
    public static final String T_SUBSCRBIE_AlREADY_EXIST_0ERROR_MSG= "行情订阅信息已存在！";

    public static final int   ADD_T_SERIAL_ERROR_CODE= -100165;
    public static final String ADD_T_SERIAL_ERROR_MSG= "新增序列号配置信息失败！";

    public static final int   DEL_T_SERIAL_ERROR_CODE= -100166;
    public static final String DEL_T_SERIAL_ERROR_MSG= "删除序列号配置信息失败！";

    public static final int   T_SERIAL_AlREADY_EXIST_ERROR_CODE= -100167;
    public static final String T_SERIAL_AlREADY_EXIST_ERROR_MSG= "新增序列号配置信息已存在！";

    public static final int  query_HOLD_STOCK_MAKET_TOTAL_ERROR_CODE = -100168;
    public static final String query_HOLD_STOCK_MAKET_TOTAL_ERROR_MSG = "统计持仓产品的市值失败！";

    public static final int  MOD_HAND_SIGNAL_AUDIT_STA_ERROR_CODE = -100169;
    public static final String MOD_HAND_SIGNAL_AUDIT_STA__ERROR_MSG = "更新手工信号的审核状态失败！";

    public static final int MOD_T_STK_INFO_ERROR_CODE = -100170;
    public static final String MOD_T_STK_INFO_ERROR_MSG = "更新证券产品股票池标志失败";

    public static final int MOD_T_STK_INFO_UNDL_CODE_ERROR_CODE = -100171;
    public static final String MOD_T_STK_INFO_UNDL_CODE_ERROR_MSG = "更新证券产品黑名单标志失败";

    public static final int SIGLE_STOCK_ENTRACT_UNMATCH_AMT_SUM_ERROR_CODE = -100172;
    public static final String SIGLE_STOCK_ENTRACT_UNMATCH_AMT_SUM_ERROR_MSG = "委托单股票未成交费用总计失败";

    public static final int SIGLE_STOCK_ENTRACT_HOLD_INST_MARKET_SUM_ERROR_CODE = -100173;
    public static final String SIGLE_STOCK_ENTRACT_HOLD_INST_MARKET_SUM_ERROR_MSG = "委托单股票持仓市值总计失败";

    public static final int  MOD_T_OMS_ORDER_LVL_ERROR_CODE = -100174;
    public static final String MOD_T_OMS_ORDER_LVL_ERROR_MSG = "修改订单管级别信息失败";

    public static final int QUERY_T_SETT_INFO_ERROR_CODE = -100201;
    public static final String QUERY_T_SETT_INFO_ERROR_MSG = "查询导入信息失败";

    public static final int ADD_T_SETT_INFO_ERROR_CODE = -100202;
    public static final String ADD_T_SETT_INFO_ERROR_MSG = "新增导入信息失败";

    public static final int MOD_T_SETT_INFO_ERROR_CODE = -100203;
    public static final String MOD_T_SETT_INFO_ERROR_MSG = "更新导入信息失败";

    public static final int DEL_T_SETT_INFO_ERROR_CODE = -100204;
    public static final String DEL_T_SETT_INFO_ERROR_MSG = "删除导入信息失败";

    public static final int QUERY_T_ACCT_TO_FILE_ERROR_CODE = -100205;
    public static final String QUERY_T_ACCT_TO_FILE_ERROR_MSG = "查询账户清算文件配置失败";

    public static final int ADD_T_ACCT_TO_FILE_ERROR_CODE = -100206;
    public static final String ADD_T_ACCT_TO_FILE_ERROR_MSG = "新增账户清算文件配置失败";

    public static final int MOD_T_ACCT_TO_FILE_ERROR_CODE = -100207;
    public static final String MOD_T_ACCT_TO_FILE_ERROR_MSG = "更新账户清算文件配置失败";

    public static final int DEL_T_ACCT_TO_FILE_ERROR_CODE = -100208;
    public static final String DEL_T_ACCT_TO_FILE_ERROR_MSG = "删除账户清算文件配置失败";

    public static final int QUERY_T_ANCHOR_POINT_INFO_ERROR_CODE = -100209;
    public static final String QUERY_T_ANCHOR_POINT_INFO_ERROR_MSG = "查询锚点信息失败";

    public static final int ADD_T_ANCHOR_POINT_INFO_ERROR_CODE = -100210;
    public static final String ADD_T_ANCHOR_POINT_INFO_ERROR_MSG = "新增锚点信息失败";

    /**
     * 动态错误信息
     *
     * @param msg
     * @param error
     * @return
     */
    public static String getErrorMsg(String msg, Map error) {
        if (msg != null && error != null && error.size() > 0) {
            List<String> list = new ArrayList<String>();
            Iterator<String> it = error.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();
                list.add(key);
            }
            //字符长度由大到小进行排序，防止CUST_CODE, CUST_CODES这种数据出错
            for (int i = 0; i < list.size(); i++) {
                for (int k = i + 1; k < list.size(); k++) {
                    if (list.get(k).length() > list.get(i).length()) {
                        String temp = list.get(i);
                        list.set(i, list.get(k));
                        list.set(k, temp);
                    }
                }
            }
            for (int i = 0; i < list.size(); i++) {
                msg = msg.replaceAll(list.get(i), ObjectUtils.toString(error.get(list.get(i))));
            }
        }
        return msg;
    }

    /**
     * 3.外部Atom错误信息，以-3开头，长度6位
     * CODE变量以_ATOM_ERROR_CODE结尾
     * MSG变量以_ATOM_ERROR_MSG结尾
     */

    /**
     * 4.外部Biz错误信息，以-4开头，长度6位
     * CODE变量以_BIZ_ERROR_CODE结尾
     * MSG变量以_BIZ_ERROR_MSG结尾
     */


    /**
     * 5.外围Atom错误信息，以-5开头，长度6位
     * CODE变量以_ATOM_ERROR_CODE结尾
     * MSG变量以_ATOM_ERROR_MSG结尾
     */



    /**
     * 6.外围Biz错误信息，以-6开头，长度6位
     * CODE变量以_BIZ_ERROR_CODE结尾
     * MSG变量以_BIZ_ERROR_MSG结尾
     */

    /**
     * 7.公共Atom错误信息，以-7开头，长度6位
     * CODE变量以_ATOM_ERROR_CODE结尾
     * MSG变量以_ATOM_ERROR_MSG结尾
     */

    public static final int PLEASE_INPUT_SEQ_NUM_ATOM_ERROR_CODE = -700001;
    public static final String PLEASE_INPUT_SEQ_NUM_ATOM_ERROR_MSG = "请输入需获取的序列号个数";
    public static final int PARAM_NOT_NULL_ATOM_ERROR_CODE = -700002;
    public static final String PARAM_NOT_NULL_ATOM_ERROR_MSG = "方法调用错误，入参不能为null";

}