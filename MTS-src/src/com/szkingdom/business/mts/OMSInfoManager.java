package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.SEQGenerator;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtil;
import com.szkingdom.business.util.MapUtils;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *@file_desc: 订单信息管理
 */
public class OMSInfoManager {

    private OperationLog opLog = new OperationLog();

    /**
     * @method_desc: 查询订单管理信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryOMSInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        if(ObjectUtils.toString(params.get("OP_ID")).isEmpty()){
            //操作员编号
            params.put("OP_ID", commParams.get("OP_CODE"));
            //操作员岗位
            params.put("USER_POST", commParams.get("USER_POST"));
        }

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "T2.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100053，错误信息：查询订单管理信息失败
        CommBiz.commBexCall("query_T_OMS_Bex", params, commParams, result,
                AtomError.QUERY_T_OMS_ERROR_CODE, AtomError.QUERY_T_OMS_ERROR_MSG);

        return new AtomResult("0", "查询订单管理信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增订单管理信息
     * @param dataExchange
     * @return
     */
    public GenericResult addOMSInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String omsId = SEQGenerator.getOMSId();

        params.put("OMS_ID", omsId);

        String sysDate=SysConfigManager.getSysDate();

        params.put("OMS_DATE", sysDate);
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "OMS_ID","OMS_TYPE","CUST_ID","STK_ID","OMS_PRICE","OMS_QTY","CHANNEL",
                          "OMS_STATUS");

        GenericResult result = new GenericResult();
        //错误代码：-100021，错误信息：新增维度设置信息失败
        CommBiz.commBexCall("insert_T_OMS_Bex", params, commParams, result,
                AtomError.ADD_T_OMS_ERROR_CODE, AtomError.ADD_T_OMS_ERROR_MSG);

        return new AtomResult("0", "新增订单管理信息成功！");
    }
    /**
     * @method_desc: 修改订单管理信息
     * @param dataExchange
     * @return
     */
    public GenericResult modOMSInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String sysDate=SysConfigManager.getSysDate();

        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "OMS_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100055，错误信息：修改订单管理信息失败
        CommBiz.commBexCall("update_T_OMS_Bex", params, commParams, result,
                AtomError.MOD_T_OMS_ERROR_CODE, AtomError.MOD_T_OMS_ERROR_MSG);

        return new AtomResult("0", "修改订单管理信息成功！");
    }
    /**
     * @method_desc: 删除订单管理信息
     * @param dataExchange
     * @return
     */
    public GenericResult delOMSInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "OMS_ID");
        GenericResult result = new GenericResult();
        //错误代码：-100056，错误信息：删除订单管理信息失败
        CommBiz.commBexCall("delete_T_OMS_Bex", params, commParams, result,
                AtomError.DEL_T_OMS_ERROR_CODE, AtomError.DEL_T_OMS_ERROR_MSG);

        return new AtomResult("0", "删除订单管理信息成功！");
    }
    /**
     * @method_desc: 查询订单成交信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryOMSMatchInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        if(ObjectUtils.toString(params.get("OP_ID")).isEmpty()){
            //操作员编号
            params.put("OP_ID", commParams.get("OP_CODE"));
            //操作员岗位
            params.put("USER_POST", commParams.get("USER_POST"));
        }



        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "T2.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100057，错误信息：查询订单成交信息失败
        CommBiz.commBexCall("query_T_MATCH_Bex", params, commParams, result,
                AtomError.QUERY_T_MATCH_ERROR_CODE, AtomError.QUERY_T_MATCH_ERROR_MSG);

        return new AtomResult("0", "查询订单成交信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增订单成交信息
     * @param dataExchange
     * @return
     */
    public GenericResult addOMSMatchInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("MATCH_ID",SEQGenerator.getOMSMatchId());

        //操作员编号
        params.put("OP_ID", commParams.get("OP_CODE"));

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "OMS_ID","OMS_TYPE","CUST_ID","STK_ID","MATCH_PRICE","MATCH_QTY",
                "MATCH_AMT","CHANNEL", "MATCH_STATUS");

        GenericResult result = new GenericResult();
        //错误代码：-100058，错误信息：新增订单成交信息失败
        CommBiz.commBexCall("insert_T_MATCH_Bex", params, commParams, result,
                AtomError.ADD_T_MATCH_ERROR_CODE, AtomError.ADD_T_MATCH_ERROR_MSG);

        return new AtomResult("0", "新增订单成交信息成功！");
    }
    /**
     * @method_desc: 修改订单成交信息
     * @param dataExchange
     * @return
     */
    public GenericResult modOMSMatchInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "MATCH_ID","OMS_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100059，错误信息：修改订单成交信息失败
        CommBiz.commBexCall("update_T_MATCH_Bex", params, commParams, result,
                AtomError.MOD_T_MATCH_ERROR_CODE, AtomError.MOD_T_MATCH_ERROR_MSG);

        return new AtomResult("0", "修改订单成交信息成功！");
    }
    /**
     * @method_desc: 删除订单成交信息
     * @param dataExchange
     * @return
     */
    public GenericResult delOMSMatchInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "MATCH_ID");
        GenericResult result = new GenericResult();
        //错误代码：-100060，错误信息：删除订单成交信息失败
        CommBiz.commBexCall("delete_single_T_MATCH_Bex", params, commParams, result,
                AtomError.DEL_T_MATCH_ERROR_CODE, AtomError.DEL_T_MATCH_ERROR_MSG);

        return new AtomResult("0", "删除订单成交信息成功！");
    }
    /**
     * @method_desc: 查询订单的历史信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryOmsHisInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "T2.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100090，错误信息：查询订单的历史信息失败
        CommBiz.commBexCall("query_T_OMS_HIS_Bex", params, commParams, result,
                AtomError.QUERY_T_OMS_HIS_ERROR_CODE, AtomError.QUERY_T_OMS_HIS_ERROR_MSG);

        return new AtomResult("0", "查询订单的历史信息成功",result.getDataList());

    }
    /**
     * @method_desc: 新增订单的历史信息
     * @param dataExchange
     * @return
     */
    public GenericResult addOmsHisInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);

        GenericResult result = new GenericResult();

        //错误代码：-100156，错误信息：交易员交易信息清算归档失败
        CommBiz.commBexCall("exe_proTradeDaySumClear_Bex", params, commParams, result,
                AtomError.EXE_PRO_TRADE_DAYSUM_CLEAR_ATOM_ERROR_CODE,
                AtomError.EXE_PRO_TRADE_DAYSUM_CLEAR_ATOM_ERROR_MSG);

        //错误代码：-100091，错误信息：新增订单的历史信息失败
        CommBiz.commBexCall("insert_T_OMS_HIS_Bex", params, commParams, result,
                AtomError.ADD_T_OMS_HIS_ERROR_CODE, AtomError.ADD_T_OMS_HIS_ERROR_MSG);

        //错误代码：-100056，错误信息：删除订单管理信息失败
        CommBiz.commBexCall("delete_T_OMS_Bex", params, commParams, result,
                AtomError.DEL_T_OMS_ERROR_CODE, AtomError.DEL_T_OMS_ERROR_MSG);

        return new AtomResult("0", "新增订单的历史信息成功");

    }
    /**
     * @method_desc: 查询成交的历史信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryMatchHisInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "T2.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100092，错误信息：查询订单的历史信息失败
        CommBiz.commBexCall("query_T_MATCH_HIS_Bex", params, commParams, result,
                AtomError.QUERY_T_MATCH_HIS_ERROR_CODE, AtomError.QUERY_T_MATCH_HIS_ERROR_MSG);

        return new AtomResult("0", "查询成交的历史信息成功",result.getDataList());
    }
    /**
     * @method_desc: 新增成交的历史信息
     * @param dataExchange
     * @return
     */
    public GenericResult addMatchHisInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);


        GenericResult result = new GenericResult();
        //错误代码：-100093，错误信息：新增成交的历史信息失败
        CommBiz.commBexCall("insert_T_MATCH_HIS_Bex", params, commParams, result,
                AtomError.ADD_T_MATCH_HIS_ERROR_CODE, AtomError.ADD_T_MATCH_HIS_ERROR_MSG);

        //错误代码：-100060，错误信息：删除订单成交信息失败
        CommBiz.commBexCall("delete_T_MATCH_Bex", params, commParams, result,
                AtomError.DEL_T_MATCH_ERROR_CODE, AtomError.DEL_T_MATCH_ERROR_MSG);

        return new AtomResult("0", "新增订单的成交历史信息成功");
    }
    /**
     * @method_desc: 查询客户费用设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryOutlaySet(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        //调用数据权限
        GenericResult permission = new GenericResult();
        Map map = new HashMap();
        map.put("OP_CODE", commParams.get("OP_CODE"));
        map.put("T_CODE_ID", "K.CUST_ID");
        CommBiz.commBexCall("CALL_FUN_GET_DATA_PERMISSION_Bex", map, commParams, permission,
                AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_CODE, AtomError.CALL_FUN_GET_DATA_PERMISSION_FAIL_MSG);
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));

        GenericResult result = new GenericResult();
        //错误代码：-100094，错误信息：查询客户费用设置信息失败
        CommBiz.commBexCall("query_T_OUTLAY_SET_Bex", params, commParams, result,
                AtomError.QUERY_T_OUTLAY_SET_ERROR_CODE, AtomError.QUERY_T_OUTLAY_SET_ERROR_MSG);

        return new AtomResult("0", "查询客户费用设置信息成功",result.getDataList());
    }
    /**
     * @method_desc: 新增客户费用设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addOutlaySet(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        Map qryParam=new HashMap();
        qryParam.putAll(params);
        qryParam.remove("PROC_COST");
        qryParam.remove("TRANSFER_COST");
        qryParam.remove("OTHER_COST");
        qryParam.remove("STAMP_TAX");

        //错误代码：-100094，错误信息：查询客户费用设置信息失败
        CommBiz.commBexCall("query_T_OUTLAY_SET_Bex", qryParam, commParams, result,
                AtomError.QUERY_T_OUTLAY_SET_ERROR_CODE, AtomError.QUERY_T_OUTLAY_SET_ERROR_MSG);

        if(result.getDataList().size()>0){
            //错误代码：-100098，错误信息：对应费用设置信息已经存在
            throw new AtomException(AtomError.T_OUTLAY_SET_EXIST_ERROR_CODE,
                    AtomError.T_OUTLAY_SET_EXIST_ERROR_MSG,FrameworkConstants.ATOM_LVL);
        }

        params.put("UP_DATE", DateUtil.today());
        params.put("UP_TIME", DateUtil.nowMinute());


        //错误代码：-100094，错误信息：查询客户费用设置信息失败
        CommBiz.commBexCall("insert_T_OUTLAY_SET_Bex", params, commParams, result,
                AtomError.ADD_T_OUTLAY_SET_ERROR_CODE, AtomError.ADD_T_OUTLAY_SET_ERROR_MSG);

        //新增客户费率设置日志
        opLog.insertOpLog("4", "1", commParams);

        return new AtomResult("0", "新增客户费用设置信息成功");
    }
    /**
     * @method_desc: 修改客户费用设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modOutlaySet(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        params.put("UP_DATE", DateUtil.today());
        params.put("UP_TIME", DateUtil.nowMinute());

        GenericResult result = new GenericResult();
        //错误代码：-100096，错误信息：修改客户费用设置信息失败
        CommBiz.commBexCall("update_T_OUTLAY_SET_Bex", params, commParams, result,
                AtomError.MOD_T_OUTLAY_SET_ERROR_CODE, AtomError.MOD_T_OUTLAY_SET_ERROR_MSG);

        //修改客户费率设置日志
        opLog.insertOpLog("4", "2", commParams);

        return new AtomResult("0", "修改客户费用设置信息成功");
    }
    /**
     * @method_desc: 删除客户费用设置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delOutlaySet(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100097，错误信息：删除客户费用设置信息失败
        CommBiz.commBexCall("delete_T_OUTLAY_SET_Bex", params, commParams, result,
                AtomError.DEL_T_OUTLAY_SET_ERROR_CODE, AtomError.DEL_T_OUTLAY_SET_ERROR_MSG);

        //修改客户费率设置日志
        opLog.insertOpLog("4", "3", commParams);

        return new AtomResult("0", "删除客户费用设置信息成功");
    }
    /**
     * @method_desc: 手动新增股票建仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult addStockBuildPosHand(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);

        if(ObjectUtils.toString(params.get("UP_TIME")).isEmpty()){
            params.put("UP_TIME", DateUtil.nowMinute());
        }else{
            params.put("UP_TIME",ObjectUtils.toString(params.get("UP_TIME")).replaceAll(":",""));
        }


        GenericResult result = new GenericResult();
        //错误代码：-100106，错误信息：手动添加股票持仓信息失败
        CommBiz.commBexCall("insert_T_STOK_BUILD_POS_HAND_Bex", params, commParams, result,
                                AtomError.HAND_ADD_T_STOK_BUILD_POS_ERROR_CODE,AtomError.HAND_ADD_T_STOK_BUILD_POS_ERROR_MSG);

        return new AtomResult("0", "手动添加股票持仓信息成功");
    }
    /**
     * @method_desc: 查询股票建仓信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryStockBuildPos(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100107，错误信息：查询股票持仓信息失败
        CommBiz.commBexCall("query_T_STOK_BUILD_POS_Bex", params, commParams, result,
                AtomError.QUERY_T_STOK_BUILD_POS_ERROR_CODE,AtomError.QUERY_T_STOK_BUILD_POS_ERROR_MSG);

        return new AtomResult("0", "查询股票持仓信息成功",result.getDataList());
    }

    /**
     * @method_desc: 更新手工信号的审核状态
     * @param dataExchange
     * @return
     */
    public GenericResult updateHandSignalAuditSta(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100169，错误信息：更新手工信号的审核状态失败
        CommBiz.commBexCall("update_HAND_SIGNAL_AUDIT_STA_Bex", params, commParams, result,
                AtomError.MOD_HAND_SIGNAL_AUDIT_STA_ERROR_CODE,AtomError.MOD_HAND_SIGNAL_AUDIT_STA__ERROR_MSG);

        return new AtomResult("0", "更新手工信号的审核状态成功",result.getDataList());
    }

    /**
     * @method_desc: 校验买委托时额度限制
     * @param dataExchange
     * @return
     */
    public GenericResult validOrderlimitByBuyEntract(DataExchangeAssembly dataExchange){

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        //param里面只有STK_ID、INST_ID、UP_DATE,OP_ID
        Map params=DataExchangeUtil.getParams(dataExchange);

        Map rsMap=new HashMap();
           rsMap.put("ORDER_LVL",1);

        //未成交费用总计
        BigDecimal unmatchAmtSum=new BigDecimal(0);
        //持仓市值总计
        BigDecimal instBalSum=new BigDecimal(0);
        //产品标准额度
        BigDecimal stkLwlmtAmt=new BigDecimal(0);


        GenericResult result1 = new GenericResult();
        //错误代码：-100172，错误信息：委托单股票未成交费用总计失败
        CommBiz.commBexCall("SIGLE_STOCK_ENTRACT_UNMATCH_AMT_SUM_Bex", params, commParams, result1,
                AtomError.SIGLE_STOCK_ENTRACT_UNMATCH_AMT_SUM_ERROR_CODE,
                AtomError.SIGLE_STOCK_ENTRACT_UNMATCH_AMT_SUM_ERROR_MSG);

        if(result1.getDataList().size()>0){
            unmatchAmtSum=new BigDecimal(ObjectUtils.toString(result1.getDataList().get(0).get("UNMATCH_AMT_SUM")));
        }

        GenericResult result2 = new GenericResult();
        //错误代码：-100173，错误信息：委托单股票持仓市值总计失败
        CommBiz.commBexCall("SIGLE_STOCK_ENTRACT_HOLD_INST_MARKET_SUM_Bex", params, commParams, result2,
                AtomError.SIGLE_STOCK_ENTRACT_HOLD_INST_MARKET_SUM_ERROR_CODE,
                AtomError.SIGLE_STOCK_ENTRACT_HOLD_INST_MARKET_SUM_ERROR_MSG);

        if(result2.getDataList().size()>0){
            instBalSum=new BigDecimal(ObjectUtils.toString(result2.getDataList().get(0).get("INST_MARKET_SUM")));
        }

        GenericResult result3 = new GenericResult();
        //错误代码：-100030，错误信息：查询证券产品信息失败
        CommBiz.commBexCall("query_T_STK_INFO_Bex", params, commParams, result3,
                AtomError.QUERY_T_STK_INFO_ERROR_CODE, AtomError.QUERY_T_STK_INFO_ERROR_MSG);
        if(result3.getDataList().size()>0){
            stkLwlmtAmt=new BigDecimal(ObjectUtils.toString(result3.getDataList().get(0).get("STK_LWLMT_QTY")));
        }
        //未成交费用总计+持仓市值总计>=产品标准额度
        if(((unmatchAmtSum.add(instBalSum)).compareTo(stkLwlmtAmt))>=0){
            GenericResult result4 = new GenericResult();
            Map updMap= MapUtil.getNewHashMapByKeys(params,"STK_ID","OP_ID","UP_DATE");
            updMap.put("OMS_STATUS","0");
            updMap.put("ORDER_LVL","2");
            updMap.put("REMARK","该产品市值超出最大可买额度,系统自行关闭");

            //错误代码：-100174，错误信息：修改订单管级别信息失败
            CommBiz.commBexCall("MOD_T_OMS_ORDER_LVL_Bex", updMap, commParams, result4,
                    AtomError.MOD_T_OMS_ORDER_LVL_ERROR_CODE, AtomError.MOD_T_OMS_ORDER_LVL_ERROR_MSG);
            rsMap.put("ORDER_LVL",2);

        }

        List rsList=new ArrayList();
        rsList.add(rsMap);

        return new AtomResult("0", "校验买委托时额度限制校验成功！",rsList);
    }

}
