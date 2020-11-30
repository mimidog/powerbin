package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.SEQGenerator;
import com.szkingdom.business.util.*;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.ObjectUtils;
import sun.security.util.BigInt;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file_desc: 客户持仓管理
 *
 */
public class CustHoldAssetManager {

    private OperationLog opLog = new OperationLog();
    /**
     * @method_desc: 查询客户股份二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryfundAssetInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100061，错误信息：查询客户股份二级持仓信息失败
        CommBiz.commBexCall("query_T_MTS_ASSET_SUB_Bex", params, commParams, result,
                AtomError.QUERY_T_MTS_ASSET_SUB_ERROR_CODE, AtomError.QUERY_T_MTS_ASSET_SUB_ERROR_MSG);

        List<Map> dataList=result.getDataList();

        List<Map> retList=new ArrayList<Map>();

        //组装行情信息中【最新价格】
        for(Map recMap : dataList){
            //市值
            recMap.put("MAKET_VAL","0");
            //当前价
            recMap.put("STK_PRICE","0");
            //持仓成本
            recMap.put("HOLD_COST","0");
            //持仓盈亏
            recMap.put("HOLD_PROFIT","0");
            //盈亏比例
            recMap.put("PROFIT_RATIO","0%");

            List<Map> rsHqList=queryStockTrendInfoByStkId(ObjectUtils.toString(recMap.get("INST_ID")));
            if(rsHqList.size()>0){
                //当前价格
                float todayPrice=ObjectUtils.toString(rsHqList.get(0).get("STK_PRICE")).isEmpty() ? 0 :
                        Float.parseFloat(ObjectUtils.toString(rsHqList.get(0).get("STK_PRICE")));
                recMap.put("STK_PRICE",todayPrice);
                //股份余额(即持仓股数)
                int instBal=ObjectUtils.toString(recMap.get("INST_BAL")).isEmpty() ? 0:
                        Integer.parseInt(ObjectUtils.toString(recMap.get("INST_BAL")));
                //产品市值=当前价X 股份余额
                float instMaketVal=todayPrice*instBal;

                recMap.put("MAKET_VAL",instMaketVal);

                //成本价
                float costPrice=ObjectUtils.toString(recMap.get("COST_PRICE")).isEmpty() ? 0:
                        Float.parseFloat(ObjectUtils.toString(recMap.get("COST_PRICE")));

                //单股票持仓成本=成本X 股数
                float holdCost=costPrice * instBal;
                recMap.put("HOLD_COST",holdCost);

                //单股票持仓盈亏=单股票市值-单股票持仓成本
                float holdProfit=instMaketVal-holdCost;
                recMap.put("HOLD_PROFIT",holdProfit);

                float profitRatio=(holdCost==0.0 ? 0: holdProfit/holdCost);
                  profitRatio=new BigDecimal(profitRatio).setScale(2,BigDecimal.ROUND_HALF_DOWN).floatValue();

                //盈亏比例=持仓盈亏/持仓成本*100
                recMap.put("PROFIT_RATIO",NumberUtil.parseBigDecimal(ObjectUtils.toString(profitRatio*100),2)+"%");


                //当持仓盈亏为负
                if(ObjectUtils.toString(params.get("QRY_HOLD_PROFIT_MINUS")).equals("true") && holdProfit<0){
                    retList.add(recMap);
                }
            }
        }
        if(retList.size()==0){
            retList.addAll(dataList);
        }
        dataExchange.setServiceData("SEC_HOLD_ASSET",retList);

        return new AtomResult("0", "查询客户股份二级持仓信息成功！", retList);
    }

    /**
     * @method_desc：根据股票代码查询行情信息
     * @param stkId
     * @return
     */
    private List queryStockTrendInfoByStkId(String stkId){
        List retList=new ArrayList();
        Map params=new HashMap();

        String dbIP= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.ip"));
        String dbPort= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.port"));
        String dbName= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.name"));
        String userId= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.uid"));
        String userPwd= ObjectUtils.toString(CustomizedPropertyPlaceholderConfigurer.getContextProperty("stock.trend.db.pwd"));

        params.put("DB_IP",dbIP);
        params.put("DB_PORT",dbPort);
        params.put("DB_NAME",dbName);
        params.put("USER_ID",userId);
        params.put("USER_PWD",userPwd);

        //放入股票代码
        params.put("STK_ID",stkId);

        GenericResult result = new GenericResult();
        //错误代码：-100062，错误信息：查询客户股票行情信息失败
        CommBiz.commBexCall("query_T_STOCK_HQ_Bex", params, null, result,
                AtomError.QUERY_T_STOCK_HQ_ERROR_CODE, AtomError.QUERY_T_STOCK_HQ_ERROR_MSG);


        if(result.getDataList().size()>0){
            retList.add(result.getDataList().get(0));
        }
        return retList;
    }

    /**
     * @method_desc：计算二级持仓资产信息
     * @param dataExchange
     * @return
     */
    public GenericResult clacfundAssetInfo(DataExchangeAssembly dataExchange) {

       List<Map> assetList=(List)dataExchange.getServiceData("SEC_HOLD_ASSET");
       //总市值
       float totalMaketVAl=0;
       float totalHoldCost=0;

        if(assetList.size()>0){
            for(Map recMap : assetList){

                totalMaketVAl += ObjectUtils.toString(recMap.get("MAKET_VAL")).isEmpty() ?'0':
                        Float.parseFloat(ObjectUtils.toString(recMap.get("MAKET_VAL")));

                totalHoldCost += ObjectUtils.toString(recMap.get("HOLD_COST")).isEmpty() ?'0':
                        Float.parseFloat(ObjectUtils.toString(recMap.get("HOLD_COST")));
            }
        }
        Map retMap=new HashMap();
        //总市值
        retMap.put("TOTAL_MAKET_VAL", totalMaketVAl);
        //总持仓成本
        retMap.put("TOTAL_HOLD_COST", totalHoldCost);
        //总持仓盈亏
        float totalHoldProfit=totalMaketVAl-totalHoldCost;
        retMap.put("TOTAL_HOLD_PROFIT", totalHoldProfit);
        //总盈亏比例
        float totalProfitRatio=(totalHoldCost==0.0 ?0:totalHoldProfit/totalHoldCost);
        totalProfitRatio=new BigDecimal(totalProfitRatio).setScale(2,BigDecimal.ROUND_HALF_DOWN).floatValue();

        retMap.put("TOTAL_PROFIT_RATIO",  NumberUtil.parseBigDecimal(ObjectUtils.toString(totalHoldProfit*100),2)+"%");

        List retList = new ArrayList();
        retList.add(retMap);

        return new AtomResult("0", "计算客户股份二级总市值成功！", retList);
    }
    /**
     * @method_desc: 查询客户资金一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryFunInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "C.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);

        //错误代码：-100064，错误信息：查询客户资金一级持仓信息失败
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));
        CommBiz.commBexCall("query_T_FUND_INFO_Bex", params, commParams, result,
                AtomError.QUERY_T_FUND_INFO_ERROR_CODE, AtomError.QUERY_T_FUND_INFO_ERROR_MSG);

        return new AtomResult("0", "查询客户资金一级持仓信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 初始化客户资金一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult initFunInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //未分配额度
        params.put("UNUSE_AMOUNT","0");
        //昨日余额
        params.put("FUND_LAST_BAL","0");
        //资金余额
        params.put("FUND_BAL","0");
        //资金可用
        params.put("FUND_AVL","0");
        //资金交易冻结金额
        params.put("FUND_TRD_FRZ","0");
        //资金长期冻结金额
        params.put("FUND_LONG_FRZ","0");
        //负债金额
        params.put("FUND_DEBT","0");
        //在途金额
        params.put("FUND_OTD","0");
        //信用金额
        params.put("FUND_CREDIT","0");
        //利息基数
        params.put("FUND_BLN_ACCU","0");
        //上次计息日期
        params.put("LAST_CAL_DATE","0");
        //存管利率
        params.put("FUND_RATE","0");
        //融资利率
        params.put("CREDIT_RATE","0");
        //转入金额
        params.put("CALLOT_IN_FUND","0");
        //转出金额
        params.put("CALLOT_OUT_FUND","0");
        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //添加更新日期
        params.put("REMARK","");

        GenericResult result = new GenericResult();

        //错误代码：-100062，错误信息：新增客户资金一级持仓信息失败
        CommBiz.commBexCall("insert_T_FUND_INFO_Bex", params, commParams, result,
                AtomError.ADD_T_FUND_INFO_ERROR_CODE, AtomError.ADD_T_FUND_INFO_ERROR_MSG);

        return new AtomResult("0", "新增客户资金一级持仓信息成功！");
    }

    /**
     * @method_desc: 修改客户资金一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult modFunInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //科学计数法转普通计数处理
        params.put("FUND_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_BAL")),4));
        params.put("FUND_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_AVL")),4));
        params.put("UNUSE_AMOUNT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("UNUSE_AMOUNT")),4));
        params.put("FUND_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_TRD_FRZ")),4));
        params.put("CALLOT_IN_FUND",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_IN_FUND")),4));
        params.put("CALLOT_OUT_FUND",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_OUT_FUND")),4));

        GenericResult result = new GenericResult();


        //错误代码：-100066，错误信息：修改客户资金一级持仓信息失败
        CommBiz.commBexCall("update_T_FUND_INFO_Bex", params, commParams, result,
                AtomError.MOD_T_FUND_INFO_ERROR_CODE, AtomError.MOD_T_FUND_INFO_ERROR_MSG);

        //修改资金股份初始化日志
        opLog.insertOpLog("5", "2", commParams);

        return new AtomResult("0", "修改客户资金一级持仓信息成功！");
    }
    /**
     * @method_desc: 查询客户资金二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryFunInfosub(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "S.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        //错误代码：-100065，错误信息：查询客户资金二级持仓信息失败
        CommBiz.commBexCall("query_T_FUND_INFO_SUB_Bex", params, commParams, result,
                AtomError.QUERY_T_FUND_INFO_SUB_ERROR_CODE, AtomError.QUERY_T_FUND_INFO_SUB_ERROR_MSG);


        return new AtomResult("0", "查询客户资金二级持仓信息成功！", result.getDataList());
    }

    /**
     * @method_desc: 初始化客户资金二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult initFunInfosub(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //转入资金
        params.put("CALLOT_IN_FUND","0");
        //转入资金
        params.put("CALLOT_OUT_FUND","0");
        //昨日余额
        params.put("FUND_LAST_BAL","0");
        //资金余额
        params.put("FUND_BAL","0");
        //资金可用
        params.put("FUND_AVL","0");
        //资金交易冻结金额
        params.put("FUND_TRD_FRZ","0");
        //资金长期冻结金额
        params.put("FUND_LONG_FRZ","0");
        //负债金额
        params.put("FUND_DEBT","0");
        //在途金额
        params.put("FUND_OTD","0");
        //信用金额
        params.put("FUND_CREDIT","0");
        //利息基数
        params.put("FUND_BLN_ACCU","0");
        //上次计息日期
        params.put("LAST_CAL_DATE","0");
        //存管利率
        params.put("FUND_RATE","0");
        //融资利率
        params.put("CREDIT_RATE","0");
        //融资利率
        params.put("CREDIT_RATE","0");

        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //添加更新日期
        params.put("REMARK","");

        GenericResult result = new GenericResult();

        //错误代码：-100063，错误信息：新增客户资金二级持仓信息失败
        CommBiz.commBexCall("insert_T_FUND_INFO_SUB_Bex", params, commParams, result,
                AtomError.ADD_T_FUND_INFO_SUB_ERROR_CODE, AtomError.ADD_T_FUND_INFO_SUB_ERROR_MSG);

        //新增资金子账户设置日志
        opLog.insertOpLog("3", "1", commParams);

        return new AtomResult("0", "新增客户资金二级持仓信息成功！");
    }

    /**
     * @method_desc: 修改客户资金二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  modFunInfosub(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //科学计数法转普通计数处理
        params.put("CALLOT_IN_FUND",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_IN_FUND")),4));
        params.put("CALLOT_OUT_FUND",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_OUT_FUND")),4));
        params.put("FUND_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_BAL")),4));
        params.put("FUND_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_AVL")),4));
        params.put("FUND_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("FUND_TRD_FRZ")),4));


        GenericResult result = new GenericResult();

        //错误代码：-100067，错误信息：修改客户资金二级持仓信息失败
        CommBiz.commBexCall("update_T_FUND_INFO_SUB_Bex", params, commParams, result,
                AtomError.MOD_T_FUND_INFO_SUB_ERROR_CODE, AtomError.MOD_T_FUND_INFO_SUB_ERROR_MSG);

        //修改资金额度设置日志
        opLog.insertOpLog("6", "2", commParams);

        return new AtomResult("0", "修改客户资金二级持仓信息成功！");
    }

    /**
     * @method_desc: 查询客户股份一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  queryMtsAsset(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "F.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        //错误代码：-100069，错误信息：查询客户股份一级持仓信息失败
        CommBiz.commBexCall("query_T_MTS_ASSET_Bex", params, commParams, result,
                AtomError.QUERY_T_MTS_ASSET_ERROR_CODE, AtomError.QUERY_T_MTS_ASSET_ERROR_MSG);

        return new AtomResult("0", "查询客户股份一级持仓信息成功！",result.getDataList());
    }
    /**
     * @method_desc: 新增客户股份一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  addMtsAsset(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);

        GenericResult result = new GenericResult();

        MapUtil.chkNoNull(params, "CUST_ID","INST_ID","CUACCT_ID","TRDACCT");

        //科学计数法转普通计数处理
        params.put("COST_PRICE",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("COST_PRICE"))));
        params.put("INST_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_BAL"))));
        params.put("INST_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_AVL"))));
        params.put("UNUSE_AMOUNT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("UNUSE_AMOUNT"))));
        params.put("INST_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_TRD_FRZ"))));
        params.put("BUY_COST_AMT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("BUY_COST_AMT"))));
        params.put("CALLOT_IN_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_IN_ASSET"))));
        params.put("CALLOT_OUT_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_OUT_ASSET"))));

        //给为空值参数设置0
        MapUtil.isNullSetDefVal(params, "0","COST_PRICE","INST_LAST_BAL","INST_BAL","INST_AVL","UNUSE_AMOUNT",
                "INST_TRD_FRZ","INST_LONG_FRZ","INST_OTD","INST_BAL_OTD","MKT_VALUE","BUY_COST_AMT","CALLOT_IN_ASSET",
                "CALLOT_OUT_ASSET");

        //错误代码：-100068，错误信息：新增客户股份一级持仓信息失败
        CommBiz.commBexCall("insert_T_MTS_ASSET_Bex", params, commParams, result,
                AtomError.ADD_T_MTS_ASSET_ERROR_CODE, AtomError.ADD_T_MTS_ASSET_ERROR_MSG);

        //新增资金股份初始化日志
        opLog.insertOpLog("5", "1", commParams);

        return new AtomResult("0", "新增客户股份一级持仓信息成功！");
    }
    /**
     * @method_desc: 修改客户股份一级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  modMtsAsset(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID","INST_ID","CUACCT_ID","TRDACCT");
        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //科学计数法转普通计数处理
        params.put("COST_PRICE",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("COST_PRICE"))));
        params.put("INST_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_BAL"))));
        params.put("INST_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_AVL"))));
        params.put("UNUSE_AMOUNT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("UNUSE_AMOUNT"))));
        params.put("INST_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_TRD_FRZ"))));
        params.put("BUY_COST_AMT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("BUY_COST_AMT"))));
        params.put("CALLOT_IN_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_IN_ASSET"))));
        params.put("CALLOT_OUT_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_OUT_ASSET"))));

        GenericResult result = new GenericResult();
        //错误代码：-100069，错误信息：修改客户股份一级持仓信息失败
        CommBiz.commBexCall("update_T_MTS_ASSET_Bex", params, commParams, result,
                AtomError.MOD_T_MTS_ASSET_ERROR_CODE, AtomError.MOD_T_MTS_ASSET_ERROR_MSG);

        return new AtomResult("0", "修改客户股份一级持仓信息成功！");
    }

    /**
     * @method_desc: 新增客户股份二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  addMtsAssetSub(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        GenericResult qryResult = new GenericResult();

        Map qryParam=new HashMap();
            qryParam.put("CUST_ID", params.get("CUST_ID"));
            qryParam.put("OP_ID", params.get("OP_ID"));
            qryParam.put("CUACCT_ID", params.get("CUACCT_ID"));
            qryParam.put("TRDACCT", params.get("TRDACCT"));
            qryParam.put("INST_ID", params.get("INST_ID"));

        //错误代码：-100061，错误信息：查询客户股份二级持仓信息失败
        CommBiz.commBexCall("query_T_MTS_ASSET_SUB_Bex", qryParam, commParams, qryResult,
                AtomError.QUERY_T_MTS_ASSET_SUB_ERROR_CODE, AtomError.QUERY_T_MTS_ASSET_SUB_ERROR_MSG);

        MapUtil.chkNoNull(params, "CUST_ID","OP_ID","INST_ID","TRDACCT","CUACCT_ID");
        //添加更新日期
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        GenericResult upResult = new GenericResult();

        //科学计数法转普通计数处理
        params.put("COST_PRICE",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("COST_PRICE"))));
        params.put("INST_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_BAL"))));
        params.put("INST_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_AVL"))));
        params.put("INST_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_TRD_FRZ"))));
        params.put("BUY_COST_AMT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("BUY_COST_AMT"))));
        params.put("ALLOT_AMOUNT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("ALLOT_AMOUNT"))));


        if(qryResult.getDataList().size()>0){

            //当调度方向不为空时,（额度设置页面会转进来）
            if(!ObjectUtils.toString(params.get("CALLOT_DIRECT")).isEmpty()){


                BigInteger callotInAsset= new BigInteger(ObjectUtils.toString(qryResult.getDataList().get(0).get("CALLOT_IN_ASSET")));
                BigInteger callotOutAsset=new BigInteger(ObjectUtils.toString(qryResult.getDataList().get(0).get("CALLOT_OUT_ASSET")));

                //股份额度设置调入对应表中调出，反之....
                if(ObjectUtils.toString(params.get("CALLOT_DIRECT")).equals("2")){

                    BigInteger calcInAsset= callotInAsset.add(new BigInteger(ObjectUtils.toString(params.get("ALLOT_AMOUNT"))));
                    params.put("CALLOT_IN_ASSET",calcInAsset);


                }else if(ObjectUtils.toString(params.get("CALLOT_DIRECT")).equals("1")){
                    BigInteger calcOutAsset=callotOutAsset.add(new BigInteger(ObjectUtils.toString(params.get("ALLOT_AMOUNT"))));
                    params.put("CALLOT_OUT_ASSET",calcOutAsset);

                }

            }
            //错误代码：-100071，错误信息：修改客户股份二级持仓信息失败
            CommBiz.commBexCall("update_T_MTS_ASSET_SUB_Bex", params, commParams, upResult,
                    AtomError.MOD_MTS_ASSET_SUB_ERROR_CODE, AtomError.MOD_MTS_ASSET_SUB_ERROR_MSG);

            //修改股份额度设置日志
            opLog.insertOpLog("7", "2", commParams);
        }else{

            //股份额度设置调入对应表中调出，反之....
            if(ObjectUtils.toString(params.get("CALLOT_DIRECT")).equals("2")){
                params.put("CALLOT_IN_ASSET",new BigInteger(ObjectUtils.toString(params.get("ALLOT_AMOUNT"))));
            }else if(ObjectUtils.toString(params.get("CALLOT_DIRECT")).equals("1")){
                params.put("CALLOT_OUT_ASSET",new BigInteger(ObjectUtils.toString(params.get("ALLOT_AMOUNT"))));
            }

            //给为空值参数设置0
            MapUtil.isNullSetDefVal(params, "0","COST_PRICE","INST_LAST_BAL","INST_BAL","INST_AVL","INST_TRD_FRZ","INST_LONG_FRZ",
                    "INST_OTD","INST_BAL_OTD","MKT_VALUE","BUY_COST_AMT","CALLOT_IN_ASSET","CALLOT_OUT_ASSET");

            params.put("CREATE_DATE", sysDate);
            //错误代码：-100071，错误信息：新增客户股份二级持仓信息失败
            CommBiz.commBexCall("insert_T_MTS_ASSET_SUB_Bex", params, commParams, upResult,
                    AtomError.ADD_T_MTS_ASSET_SUB_ERROR_CODE, AtomError.ADD_T_MTS_ASSET_SUB_ERROR_MSG);

            //新增股份额度设置日志
            opLog.insertOpLog("7", "1", commParams);
        }

        return new AtomResult("0", "客户股份二级持仓设置信息成功！");
    }
    /**
     * @method_desc: 修改客户股份二级持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  modMtsAssetSub(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //科学计数法转普通计数处理
        params.put("COST_PRICE",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("COST_PRICE"))));
        params.put("INST_BAL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_BAL"))));
        params.put("INST_AVL",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_AVL"))));
        params.put("INST_TRD_FRZ",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("INST_TRD_FRZ"))));
        params.put("BUY_COST_AMT",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("BUY_COST_AMT"))));
        params.put("CALLOT_IN_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_IN_ASSET"))));
        params.put("CALLOT_OUT_ASSET",NumberUtil.parseBigDecimal(ObjectUtils.toString(params.get("CALLOT_OUT_ASSET"))));


        GenericResult qryResult = new GenericResult();
        //错误代码：-100061，错误信息：查询客户股份二级持仓信息失败
        MapUtil.chkNoNull(params, "CUST_ID","OP_ID","INST_ID","TRDACCT","CUACCT_ID");
        //添加更新日期

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        GenericResult upResult = new GenericResult();

        //错误代码：-100071，错误信息：修改客户股份二级持仓信息失败
        CommBiz.commBexCall("update_T_MTS_ASSET_SUB_Bex", params, commParams, upResult,
                AtomError.MOD_MTS_ASSET_SUB_ERROR_CODE, AtomError.MOD_MTS_ASSET_SUB_ERROR_MSG);

        return new AtomResult("0", "修改客户股份二级持仓信息成功！");
    }
    /**
     * @method_desc: 日切清算资金持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  clearFundHolder(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        GenericResult result = new GenericResult();
        //错误代码：-100075，错误信息：清算一级资金持仓信息失败
        CommBiz.commBexCall("clear_T_FUND_INFO_Bex", params, commParams, result,
                AtomError.CLEAR_T_FUND_INFO_ERROR_CODE, AtomError.CLEAR_T_FUND_INFO_INFOERROR_MSG);
        //错误代码：-100076，错误信息：清算二级资金持仓信息失败
        CommBiz.commBexCall("clear_T_FUND_INFO_SUB_Bex", params, commParams, result,
                AtomError.CLEAR_T_FUND_INFO_SUB_ERROR_CODE, AtomError.CLEAR_T_FUND_INFO_SUB_INFOERROR_MSG);

        return new AtomResult("0", "修改客户股份二级持仓信息成功！");
    }
    /**
     * @method_desc: 日切清算股份持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  clearAssetHolder(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100077，错误信息：清算一级股份持仓信息失败
        CommBiz.commBexCall("clear_T_MTS_ASSET_Bex", params, commParams, result,
                AtomError.CLEAR_T_MTS_ASSET_ERROR_CODE, AtomError.CLEAR_T_MTS_ASSET_INFOERROR_MSG);
        //错误代码：-100078，错误信息：清算二级股份持仓信息失败
        CommBiz.commBexCall("clear_T_MTS_ASSET_SUB_Bex", params, commParams, result,
                AtomError.CLEAR_T_MTS_ASSET_SUB_ERROR_CODE, AtomError.CLEAR_T_MTS_ASSET_SUB_ERROR_MSG);

        //错误代码：-100114，错误信息：更新二级股份收盘价信息
        CommBiz.commBexCall("update_MTS_ASSET_SUB_STK_PRICE_Bex",params, commParams, result,
                AtomError.MOD_MTS_ASSET_SUB_STK_PRICE_ERROR_CODE, AtomError.MOD_MTS_ASSET_SUB_STK_PRICE_ERROR_MSG);

        return new AtomResult("0", "清算股份持仓信息成功！");
    }

    /**
     * @method_desc: 查询易员日结汇总信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryTradeDayClearSum(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "F.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100104，错误信息：查询交易员日结汇总信息失败
        CommBiz.commBexCall("query_T_TRADE_DAY_CLEAR_SUM_Bex", params, commParams, result,
                AtomError.QUERY_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE, AtomError.QUERY_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG);


        return new AtomResult("0", "查询交易员日结汇总信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 查询交易员日结明细信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryTradeDayClearDetail(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //错误代码：-100105，错误信息：查询交易员日结明细信息失败
        CommBiz.commBexCall("query_T_TRADE_DAY_CLEAR_DETAIL_Bex", params, commParams, result,
                AtomError.QUERY_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE, AtomError.QUERY_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG);


        return new AtomResult("0", "查询交易员日结明细信息成功！", result.getDataList());
    }
    /**
     * @method_desc:清算交易员日结信息
     * @param dataExchange
     * @return
     */
    public GenericResult  clearTraderDaySettle(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        GenericResult result = new GenericResult();


        //错误代码：-100108，错误信息：清空交易员日结汇总信息失败
        CommBiz.commBexCall("delete_T_TRADE_DAY_CLEAR_SUM_Bex", params, commParams, result,
                AtomError.DEL_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE, AtomError.DEL_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG);

        //错误代码：-100109，错误信息：新增交易员日结汇总信息失败
        CommBiz.commBexCall("insert_T_TRADE_DAY_CLEAR_SUM_Bex", params, commParams, result,
                AtomError.ADD_T_TRADE_DAY_CLEAR_SUM_ERROR_CODE, AtomError.ADD_T_TRADE_DAY_CLEAR_SUM_ERROR_MSG);


        //错误代码：-100109，错误信息：新增交易员日结汇总信息失败
        CommBiz.commBexCall("delete_T_TRADE_DAY_CLEAR_DETAIL_Bex", params, commParams, result,
                AtomError.DEL_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE, AtomError.DEL_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG);

        //错误代码：-100111，错误信息：新增交易员日结明细信息失败
        CommBiz.commBexCall("insert_T_TRADE_DAY_CLEAR_DETAIL_Bex", params, commParams, result,
                AtomError.ADD_T_TRADE_DAY_CLEAR_DETAIL_ERROR_CODE, AtomError.ADD_T_TRADE_DAY_CLEAR_DETAIL_ERROR_MSG);


        return new AtomResult("0", "交易员日结信息清算成功！");
    }
    /**
     * @method_desc:清算前数据准备
     * @param dataExchange
     * @return
     */
    public GenericResult  clearBreforeDataReady(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult fundInfoBakRs = new GenericResult();
        //错误代码：-100126，错误信息：查询客户资金一级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_FUND_INFO_CLEAR_BAK_Bex", params, commParams, fundInfoBakRs,
                AtomError.QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_MSG);
        if(fundInfoBakRs.getDataList().size()>0){
            //错误代码：-100127，错误信息：客户资金一级持仓信息清算备份数据已存在,请先进行清算回退
            throw new AtomException(AtomError.T_FUND_INFO_CLEAR_BAK_DATA_EXIST_FAIL_CODE,
                    AtomError.T_FUND_INFO_CLEAR_BAK_DATA_EXIST_FAIL_MSG+",请先进行清算回退.",
                        FrameworkConstants.ATOM_LVL);
        }

        GenericResult fundInfoSubBakRs = new GenericResult();
        //错误代码：-100128，错误信息：查询客户资金二级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_FUND_INFO_SUB_CLEAR_BAK_Bex", params, commParams, fundInfoSubBakRs,
                AtomError.QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG);
        if(fundInfoSubBakRs.getDataList().size()>0){
            //错误代码：-100129，错误信息：客户资金二级持仓信息清算备份数据已存在,请先进行清算回退
            throw new AtomException(AtomError.T_FUND_INFO_SUB_CLEAR_BAK_DATA_EXIST_FAIL_CODE,
                    AtomError.T_FUND_INFO_SUB_CLEAR_BAK_DATA_EXIST_FAIL_MSG+",请先进行清算回退.",
                    FrameworkConstants.ATOM_LVL);
        }

        GenericResult assetBakRs = new GenericResult();
        //错误代码：-100130，错误信息：查询客户股份一级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_MTS_ASSET_CLEAR_BAK_Bex", params, commParams, assetBakRs,
                AtomError.QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG);
        if(assetBakRs.getDataList().size()>0){
            //错误代码：-100131，错误信息：客户股份一级持仓信息清算备份数据已存在,请先进行清算回退
            throw new AtomException(AtomError.T_MTS_ASSET_CLEAR_BAK_DATA_EXIST_FAIL_CODE,
                    AtomError.T_MTS_ASSET_CLEAR_BAK_DATA_EXIST_FAIL_MSG+",请先进行清算回退.",
                    FrameworkConstants.ATOM_LVL);
        }

        GenericResult assetSubBakRs = new GenericResult();
        //错误代码：-100132，错误信息：客户股份二级持仓信息清算备份数据已存在
        CommBiz.commBexCall("query_T_MTS_ASSET_SUB_CLEAR_BAK_Bex", params, commParams, assetSubBakRs,
                AtomError.QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG);
        if(assetSubBakRs.getDataList().size()>0){
            //错误代码：-100131，错误信息：客户股份二级持仓信息清算备份数据已存在,请先进行清算回退
            throw new AtomException(AtomError.T_MTS_ASSET_SUB_CLEAR_BAK_DATA_EXIST_FAIL_CODE,
                    AtomError.T_MTS_ASSET_SUB_CLEAR_BAK_DATA_EXIST_FAIL_MSG+",请先进行清算回退.",
                    FrameworkConstants.ATOM_LVL);
        }

        GenericResult result = new GenericResult();
        //错误代码：-100122，错误信息：新增客户资金一级持仓信息清算备份信息失败
        CommBiz.commBexCall("insert_T_FUND_INFO_CLEAR_BAK_Bex", params, commParams, result,
                AtomError.ADD_T_FUND_INFO_CLEAR_BAK_FAIL_CODE, AtomError.ADD_T_FUND_INFO_CLEAR_BAK_FAIL_MSG);

        //错误代码：-100123，错误信息：新增客户资金二级持仓信息清算备份信息失败
        CommBiz.commBexCall("insert_T_FUND_INFO_SUB_CLEAR_BAK_Bex", params, commParams, result,
                AtomError.ADD_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE, AtomError.ADD_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG);

        //错误代码：-100124，错误信息：新增客户股份一级持仓信息清算备份信息失败
        CommBiz.commBexCall("insert_T_MTS_ASSET_CLEAR_BAK_Bex", params, commParams, result,
                AtomError.ADD_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE, AtomError.ADD_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG);

        //错误代码：-100125，错误信息：新增客户股份二级持仓信息清算备份信息失败
        CommBiz.commBexCall("insert_T_MTS_ASSET_SUB_CLEAR_BAK_Bex", params, commParams, result,
                AtomError.ADD_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE, AtomError.ADD_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG);

        return new AtomResult("0", "清算数据准备成功！");
    }
    /**
     * @method_desc:回退资金持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  regressClearFundInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult fundInfoBakRs = new GenericResult();
        //错误代码：-100126，错误信息：查询客户资金一级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_FUND_INFO_CLEAR_BAK_Bex", params, commParams, fundInfoBakRs,
                AtomError.QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_FUND_INFO_CLEAR_BAK_FAIL_MSG);

        //判断一级资金备份表有数据时进行回滚
        if(fundInfoBakRs.getDataList().size()>0){

            GenericResult fundRs = new GenericResult();
            //错误代码：-100134，错误信息：删除客户资金一级持仓信息失败
            CommBiz.commBexCall("delete_T_FUND_INFO_Bex", params, commParams, fundRs,
                    AtomError.DELETE_T_FUND_INFO_FAIL_CODE, AtomError.DELETE_T_FUND_INFO_FAIL_MSG);
            //错误代码：-100135，错误信息：回退客户资金一级持仓信息失败
            CommBiz.commBexCall("restore_T_FUND_INFO_Bex", params, commParams, fundRs,
                    AtomError.RESTORE_T_FUND_INFO_FAIL_CODE, AtomError.RESTORE_T_FUND_INFO_FAIL_MSG);

            //错误代码：-100141，错误信息：删除客户资金一级持仓备份信息失败
            CommBiz.commBexCall("delete_T_FUND_INFO_CLEAR_BAK_Bex", params, commParams, fundRs,
                    AtomError.DELETE_T_FUND_INFO_CLEAR_BAK_FAIL_CODE, AtomError.DELETE_T_FUND_INFO_CLEAR_BAK_FAIL_MSG);
        }


        GenericResult fundInfoSubBakRs = new GenericResult();
        //错误代码：-100128，错误信息：查询客户资金二级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_FUND_INFO_SUB_CLEAR_BAK_Bex", params, commParams, fundInfoSubBakRs,
                AtomError.QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG);

        //判断二级资金备份表有数据时进行回滚
        if(fundInfoSubBakRs.getDataList().size()>0){

            GenericResult fundsubRs = new GenericResult();
            //错误代码：-100134，错误信息：删除客户资金一级持仓信息失败
            CommBiz.commBexCall("delete_T_FUND_INFO_SUB_Bex", params, commParams, fundsubRs,
                    AtomError.DELETE_T_FUND_INFO_SUB_FAIL_CODE, AtomError.DELETE_T_FUND_INFO_SUB_FAIL_MSG);
            //错误代码：-100136，错误信息：回退客户资金发给级持仓信息失败
            CommBiz.commBexCall("restore_T_FUND_INFO_SUB_Bex", params, commParams, fundsubRs,
                    AtomError.RESTORE_T_FUND_INFO_SUB_FAIL_CODE, AtomError.RESTORE_T_FUND_INFO_SUB_FAIL_MSG);

            //错误代码：-100142，错误信息：删除客户资金二级持仓备份信息失败
            CommBiz.commBexCall("delete_T_FUND_INFO_SUB_CLEAR_BAK_Bex", params, commParams, fundsubRs,
                    AtomError.DELETE_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_CODE, AtomError.DELETE_T_FUND_INFO_SUB_CLEAR_BAK_FAIL_MSG);

        }
        String sysDate=SysConfigManager.getSysDate();
        Map feeSubMap=new HashedMap();
        feeSubMap.put("UP_DATE", sysDate);

        GenericResult feeSubRs = new GenericResult();
        //错误代码：-100145，错误信息：删除客户二级费用信息失败
        CommBiz.commBexCall("delete_T_MTS_FEE_SUB_Bex", feeSubMap, commParams, feeSubRs,
                AtomError.DELETE_T_MTS_FEE_SUB_FAIL_CODE, AtomError.DELETE_T_MTS_FEE_SUB_FAIL_MSG);


        return new AtomResult("0", "回退资金持仓数据成功！");
    }
    /**
     * @method_desc:回退股份持仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult  regressClearAssetInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult assetBakRs = new GenericResult();
        //错误代码：-100130，错误信息：查询客户股份一级持仓信息清算备份信息失败
        CommBiz.commBexCall("query_T_MTS_ASSET_CLEAR_BAK_Bex", params, commParams, assetBakRs,
                AtomError.QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG);

        //判断一级股份备份表有数据时进行回滚
        if(assetBakRs.getDataList().size()>0){

            GenericResult assetRs = new GenericResult();
            //错误代码：-100137，错误信息：删除客户资金一级持仓信息失败
            CommBiz.commBexCall("delete_T_MTS_ASSET_Bex", params, commParams, assetRs,
                    AtomError.DELETE_T_MTS_ASSET_FAIL_CODE, AtomError.DELETE_T_MTS_ASSET_FAIL_MSG);
            //错误代码：-100138，错误信息：回退客户股份一级持仓信息失败
            CommBiz.commBexCall("restore_T_MTS_ASSET_Bex", params, commParams, assetRs,
                    AtomError.RESTORE_T_MTS_ASSET_FAIL_CODE, AtomError.RESTORE_T_MTS_ASSET_FAIL_MSG);
            //错误代码：-100143，错误信息：删除客户股份一级持仓备份信息失败
            CommBiz.commBexCall("delete_T_MTS_ASSET_CLEAR_BAK_Bex", params, commParams, assetRs,
                    AtomError.DELETE_T_MTS_ASSET_CLEAR_BAK_FAIL_CODE, AtomError.DELETE_T_MTS_ASSET_CLEAR_BAK_FAIL_MSG);
        }

        GenericResult assetSubBakRs = new GenericResult();
        //错误代码：-100132，错误信息：客户股份二级持仓信息清算备份数据已存在
        CommBiz.commBexCall("query_T_MTS_ASSET_SUB_CLEAR_BAK_Bex", params, commParams, assetSubBakRs,
                AtomError.QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE, AtomError.QUERY_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG);

        //判断二级股份备份表有数据时进行回滚
        if(assetSubBakRs.getDataList().size()>0){

            GenericResult assetSubRs = new GenericResult();
            //错误代码：-100139，错误信息：删除客户资金二级持仓信息失败
            CommBiz.commBexCall("delete_T_MTS_ASSET_SUB_Bex", params, commParams, assetSubRs,
                    AtomError.DELETE_T_MTS_ASSET_SUB_FAIL_CODE, AtomError.DELETE_T_MTS_ASSET_SUB_FAIL_MSG);
            //错误代码：-100140，错误信息：回退客户资金二级持仓信息失败
            CommBiz.commBexCall("restore_T_MTS_ASSET_SUB_Bex", params, commParams, assetSubRs,
                    AtomError.RESTORE_T_MTS_ASSET_SUB_FAIL_CODE, AtomError.RESTORE_T_MTS_ASSET_SUB_FAIL_MSG);
            //错误代码：-100140，错误信息：回退客户资金二级持仓信息失败
            CommBiz.commBexCall("delete_T_MTS_ASSET_SUB_CLEAR_BAK_Bex", params, commParams, assetSubRs,
                    AtomError.DELETE_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_CODE, AtomError.DELETE_T_MTS_ASSET_SUB_CLEAR_BAK_FAIL_MSG);

        }
        return new AtomResult("0", "回退股份持仓数据成功！");
    }
    /**
     * @method_desc:交易费用清算
     * @param dataExchange
     * @return
     */
    public GenericResult  tradeCostClear(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        //错误代码：-100113，错误信息：新增客户二级费用信息失败
        CommBiz.commBexCall("insert_T_MTS_FEE_SUB_Bex", params, commParams, result,
                AtomError.ADD_T_MTS_FEE_SUB_ERROR_CODE, AtomError.ADD_T_MTS_FEE_SUB_ERROR_MSG);

        return new AtomResult("0", "交易费用清算成功！");
    }
    /**
     * @method_desc:交易费用清算
     * @param dataExchange
     * @return
     */
    public GenericResult  calcTraderTotalCost(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        String lastTradeDay=SysConfigManager.getLastTradeDay();
         Map qryMap=new HashMap();

        qryMap.put("UP_DATE", lastTradeDay);
        qryMap.put("TRADE_ID", params.get("OP_ID"));
        //错误代码：-100148，错误信息：计算交易员费用汇总信息失败！
        CommBiz.commBexCall("calc_Trader_total_cost_Bex", qryMap, commParams, result,
                AtomError.CALC_TRADER_TOTAL_COST_FAIL_CODE, AtomError.CALC_TRADER_TOTAL_COST_FAIL_MSG);


        return new AtomResult("0", "计算交易员费用汇总信息成功",result.getDataList());
    }
    /**
     * @method_desc:新增交易员资金股份流水
     * @param dataExchange
     * @return
     */
    public GenericResult addTraderFundAssetLog(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String logId = SEQGenerator.getTraderFundAssetLogId();

        String sysDate=SysConfigManager.getSysDate();

        params.put("LOG_ID", logId);
        params.put("BEGIN_DATE", sysDate);
        params.put("END_DATE", sysDate);
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        GenericResult result = new GenericResult();

        //错误代码：-100153，错误信息：新增交易员资金股份流水失败！
        CommBiz.commBexCall("insert_T_TRADER_FUND_ASSET_LOG_Bex", params, commParams, result,
                AtomError.ADD_T_TRADER_FUND_ASSET_LOG_FAIL_CODE, AtomError.ADD_T_TRADER_FUND_ASSET_LOG_MSG);

        return new AtomResult("0", "新增交易员资金股份流水成功",result.getDataList());
    }
    /**
     * @method_desc:查询交易员盈亏汇总信息
     * @param dataExchange
     * @return
     */
    public GenericResult  queryTraderSurplusSumInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100154，错误信息：查询交易员盈亏汇总信息失败！
        CommBiz.commBexCall("query_TRADER_SURPLUS_SUM_INFO_Bex", params, commParams, result,
                AtomError.QUERY_TRADER_SURPLUS_SUM_INFO_FAIL_CODE, AtomError.QUERY_TRADER_SURPLUS_SUM_INFO_FAIL_MSG);

        return new AtomResult("0", "查询交易员盈亏汇总信息成功",result.getDataList());
    }

    /**
     * @method_desc:新增客户资金股份流水
     * @param dataExchange
     * @return
     */
    public GenericResult addCustFundAssetLog(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String logId = SEQGenerator.getCustFundAssetLogId();

        String sysDate=SysConfigManager.getSysDate();

        params.put("LOG_ID", logId);
        params.put("BEGIN_DATE", sysDate);
        params.put("END_DATE", sysDate);
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        GenericResult result = new GenericResult();

        //错误代码：-100162，错误信息：新增客户资金股份流水失败！
        CommBiz.commBexCall("insert_T_CUST_FUND_ASSET_LOG_Bex", params, commParams, result,
                AtomError.ADD_T_CUST_FUND_ASSET_LOG_ERROR_CODE, AtomError.ADD_T_CUST_FUND_ASSET_LOG_ERROR_MSG);

        return new AtomResult("0", "新增客户资金股份流水成功",result.getDataList());
    }

    /**
     * @method_desc: 统计持仓产品的市值
     * @param dataExchange
     * @return
     */
    public GenericResult  queryHoldStockMaketTotal(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //错误代码：-100168，错误信息：统计持仓产品的市值失败！
        CommBiz.commBexCall("query_HOLD_STOCK_MAKET_TOTAL_Bex", params, commParams, result,
                AtomError.query_HOLD_STOCK_MAKET_TOTAL_ERROR_CODE, AtomError.query_HOLD_STOCK_MAKET_TOTAL_ERROR_MSG);

        return new AtomResult("0", "查询客户股份一级持仓信息成功！",result.getDataList());
    }
}
