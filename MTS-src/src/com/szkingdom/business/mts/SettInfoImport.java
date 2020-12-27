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
import org.apache.commons.lang3.ObjectUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file_desc: 清算导入文件信息
 *
 */
public class SettInfoImport {
    /**
     * @method_desc: 锚点信息导入
     * @param dataExchange
     * @return
     */
    public GenericResult AnchorPiontImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        String opCode = (String) params.get("OP_CODE");
        //校验必要入参
        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE");

        GenericResult result1 = new GenericResult();
        String filePath = "";
        //查询账户清算文件配置信息
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result1,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        //获取文件路径
        if(result1.getDataList().size()>0){
            filePath = ObjectUtils.toString(result1.getDataList().get(0).get("FILE_PATH"));
        }
        //filePath = "E:/java-work/AnchorPoint.xlsx";

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 1) {
            xlsxInfoList.remove(0);
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                MapUtil.chkIRowNoNull(lineParam, j + 1, "STK_ID");
                lineParam.put("STK_ID", ObjectUtils.toString(lineParam.get("STK_ID")).substring(2));
                //lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("UP_ANCHOR_POINT", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("UP_ANCHOR_POINT"))));
                lineParam.put("LOW_ANCHOR_POINT", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("LOW_ANCHOR_POINT"))));
                lineParam.put("UP_ANCHOR_RADIO", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("UP_ANCHOR_RADIO"))));
                lineParam.put("LOW_ANCHOR_RADIO", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("LOW_ANCHOR_RADIO"))));
                lineParam.put("LAST_CLOSE_PRICE", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("LAST_CLOSE_PRICE"))));
                lineParam.put("NEWS", NumberUtil.parseBigDecimal(ObjectUtils.toString(lineParam.get("UP_ANCHOR_POINT"))));

                MapUtil.isNullSetDefVal(lineParam, "0","UP_ANCHOR_POINT","LOW_ANCHOR_POINT","UP_ANCHOR_RADIO",
                        "LOW_ANCHOR_RADIO","LAST_CLOSE_PRICE","NEWS");

                Map qryMap = new HashMap();
                qryMap.put("STK_ID", lineParam.get("STK_ID"));
                CommBiz.commBexCall("delete_T_ANCHOR_POINT_INFO_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_ANCHOR_POINT_INFO_ERROR_CODE, AtomError.QUERY_T_ANCHOR_POINT_INFO_ERROR_MSG);

                //lineParam.put("OP_ID",params.get("OP_ID"));
                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_ANCHOR_POINT_INFO_LIST","batch_insert_T_ANCHOR_POINT_INFO_Bex",
                    AtomError.ADD_T_ANCHOR_POINT_INFO_ERROR_CODE, AtomError.ADD_T_ANCHOR_POINT_INFO_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "锚点数据批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 成交信息导入
     * @param dataExchange
     * @return
     */
    public GenericResult MatchInfoImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        //校验必要入参
        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE");

        GenericResult result1 = new GenericResult();
        String filePath = "";
        //查询账户清算文件配置信息
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result1,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        //获取文件路径
        if(result1.getDataList().size()>0){
            filePath = ObjectUtils.toString(result1.getDataList().get(0).get("FILE_PATH"));
        }

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 1) {
            xlsxInfoList.remove(0);
            Map errorMap = new HashMap();
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                //MapUtil.chkIRowNoNull(lineParam, j + 1,"OMS_ID","OMS_TYPE","CUST_ID","STK_ID","MATCH_PRICE","MATCH_QTY",
                //        "MATCH_AMT","CHANNEL", "MATCH_STATUS");

                //lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("MATCH_ID", ObjectUtils.toString(lineParam.get("MATCH_ID")));
                lineParam.put("OMS_ID", ObjectUtils.toString(lineParam.get("OMS_ID")));
                lineParam.put("OMS_DATE", ObjectUtils.toString(lineParam.get("OMS_DATE")));
                lineParam.put("OP_ID", params.get("OP_ID"));
                lineParam.put("TRADER_ID", params.get("OP_ID"));
                String omsType = ObjectUtils.toString(lineParam.get("OMS_TYPE"));
                if (omsType.indexOf("-") != -1) {
                    lineParam.put("OMS_TYPE", omsType.split("-")[0]);
                }
                lineParam.put("CUST_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("CUACCT_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("CUACCT_LVL", ObjectUtils.toString(lineParam.get("CUACCT_LVL")));
                String stkBd = ObjectUtils.toString(lineParam.get("STKBD"));
                if (stkBd.indexOf("-") != -1) {
                    lineParam.put("STKBD", stkBd.split("-")[0]);
                }
                lineParam.put("TRDACCT", ObjectUtils.toString(lineParam.get("TRDACCT")));
                lineParam.put("STK_ID", ObjectUtils.toString(lineParam.get("STK_ID")));
                lineParam.put("MATCH_PRICE", ObjectUtils.toString(lineParam.get("MATCH_PRICE")));
                lineParam.put("MATCH_QTY", ObjectUtils.toString(lineParam.get("MATCH_QTY")));
                lineParam.put("MATCH_AMT", ObjectUtils.toString(lineParam.get("MATCH_AMT")));
                lineParam.put("PROC_COST", ObjectUtils.toString(lineParam.get("PROC_COST")));
                lineParam.put("TRANSFER_COST", ObjectUtils.toString(lineParam.get("TRANSFER_COST")));
                lineParam.put("OTHER_COST", ObjectUtils.toString(lineParam.get("OTHER_COST")));
                lineParam.put("STAMP_TAX", ObjectUtils.toString(lineParam.get("STAMP_TAX")));
                String ordertype = ObjectUtils.toString(lineParam.get("ORDER_TYPE"));
                if (ordertype.indexOf("-") != -1) {
                    lineParam.put("ORDER_TYPE", ordertype.split("-")[0]);
                }
                String channel = ObjectUtils.toString(lineParam.get("CHANNEL"));
                if (channel.indexOf("-") != -1) {
                    lineParam.put("CHANNEL", channel.split("-")[0]);
                }
                lineParam.put("MATCH_STATUS", ObjectUtils.toString(lineParam.get("MATCH_STATUS")));
                lineParam.put("TRADE_DIRECT", ObjectUtils.toString(lineParam.get("TRADE_DIRECT")).equals("证券卖出") ? "2":"1");
                /*String tradeDirect = ObjectUtils.toString(lineParam.get("TRADE_DIRECT"));
                if (tradeDirect.indexOf("-") != -1) {
                    lineParam.put("TRADE_DIRECT", tradeDirect.split("-")[0]);
                }*/
                lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("UP_TIME", DateUtil.nowMinute());
                lineParam.put("REMARK", ObjectUtils.toString(lineParam.get("REMARK")));

                //给为空值参数设置0
                MapUtil.isNullSetDefVal(lineParam, "0","MATCH_PRICE","MATCH_QTY","MATCH_AMT","PROC_COST","TRANSFER_COST",
                        "OTHER_COST","STAMP_TAX");

                Map qryMap = new HashMap();
                qryMap.put("MATCH_ID", lineParam.get("MATCH_ID"));
                CommBiz.commBexCall("delete_sett_T_MATCH_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_MATCH_ERROR_CODE, AtomError.QUERY_T_MATCH_ERROR_MSG);

                //lineParam.put("OP_ID",params.get("OP_ID"));
                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_MATCH_LIST","batch_insert_T_MATCH_Bex",
                    AtomError.ADD_T_MATCH_ERROR_CODE, AtomError.ADD_T_MATCH_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "成交数据批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 委托信息导入
     * @param dataExchange
     * @return
     */
    public GenericResult OmsInfoImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        //校验必要入参
        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE");

        GenericResult result1 = new GenericResult();
        String filePath = "";
        //查询账户清算文件配置信息
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result1,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        //获取文件路径
        if(result1.getDataList().size()>0){
            filePath = ObjectUtils.toString(result1.getDataList().get(0).get("FILE_PATH"));
        }

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 1) {
            xlsxInfoList.remove(0);
            Map errorMap = new HashMap();
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                //MapUtil.chkIRowNoNull(lineParam, j + 1,"OMS_ID","OMS_TYPE","CUST_ID","STK_ID");

                lineParam.put("OMS_ID", ObjectUtils.toString(lineParam.get("OMS_ID")));
                lineParam.put("OMS_DATE", ObjectUtils.toString(lineParam.get("OMS_DATE")));
                lineParam.put("OP_ID", params.get("OP_ID"));
                lineParam.put("TRADER_ID", ObjectUtils.toString(lineParam.get("TRADER_ID")));
                String omsType = ObjectUtils.toString(lineParam.get("OMS_TYPE"));
                if (omsType.indexOf("-") != -1) {
                    lineParam.put("OMS_TYPE", omsType.split("-")[0]);
                }
                lineParam.put("CUST_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("CUACCT_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("CUACCT_LVL", ObjectUtils.toString(lineParam.get("CUACCT_LVL")));
                String stkBd = ObjectUtils.toString(lineParam.get("STKBD"));
                if (stkBd.indexOf("-") != -1) {
                    lineParam.put("STKBD", stkBd.split("-")[0]);
                }
                lineParam.put("TRDACCT", ObjectUtils.toString(lineParam.get("TRDACCT")));
                lineParam.put("STK_ID", ObjectUtils.toString(lineParam.get("STK_ID")));
                lineParam.put("OMS_PRICE", ObjectUtils.toString(lineParam.get("OMS_PRICE")));
                lineParam.put("OMS_QTY", ObjectUtils.toString(lineParam.get("OMS_QTY")));
                lineParam.put("DEPOS_PRICE", ObjectUtils.toString(lineParam.get("DEPOS_PRICE")));
                lineParam.put("DEPOS_QTY", ObjectUtils.toString(lineParam.get("DEPOS_QTY")));
                lineParam.put("UMMATCH_QTY", ObjectUtils.toString(lineParam.get("UMMATCH_QTY")));
                lineParam.put("TRANSFER_COST", ObjectUtils.toString(lineParam.get("TRANSFER_COST")));
                lineParam.put("OTHER_COST", ObjectUtils.toString(lineParam.get("OTHER_COST")));
                String ordertype = ObjectUtils.toString(lineParam.get("ORDER_TYPE"));
                if (ordertype.indexOf("-") != -1) {
                    lineParam.put("ORDER_TYPE", ordertype.split("-")[0]);
                }
                String channel = ObjectUtils.toString(lineParam.get("CHANNEL"));
                if (channel.indexOf("-") != -1) {
                    lineParam.put("CHANNEL", channel.split("-")[0]);
                }
                String omsStatus = ObjectUtils.toString(lineParam.get("OMS_STATUS"));
                if (omsStatus.indexOf("-") != -1) {
                    lineParam.put("OMS_STATUS", omsStatus.split("-")[0]);
                }
                lineParam.put("TRADE_DIRECT", ObjectUtils.toString(lineParam.get("TRADE_DIRECT")).equals("证券卖出") ? "2":"1");
                /*String tradeDirect = ObjectUtils.toString(lineParam.get("TRADE_DIRECT"));
                if (tradeDirect.indexOf("-") != -1) {
                    lineParam.put("TRADE_DIRECT", tradeDirect.split("-")[0]);
                }*/
                lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("UP_TIME", DateUtil.nowMinute());
                lineParam.put("REMARK", ObjectUtils.toString(lineParam.get("REMARK")));

                //给为空值参数设置0
                MapUtil.isNullSetDefVal(lineParam, "0","OMS_PRICE","OMS_QTY","DEPOS_PRICE","DEPOS_QTY","UNMATCH_QTY",
                        "PROC_COST","TRANSFER_COST","OTHER_COST","STAMP_TAX");

                Map qryMap = new HashMap();
                qryMap.put("OMS_ID", lineParam.get("OMS_ID"));
                CommBiz.commBexCall("delete_sett_T_OMS_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_OMS_ERROR_CODE, AtomError.QUERY_T_OMS_ERROR_MSG);

                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_OMS_LIST","batch_insert_T_OMS_Bex",
                    AtomError.ADD_T_OMS_ERROR_CODE, AtomError.ADD_T_OMS_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "委托数据批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 资金信息导入
     * @param dataExchange
     * @return
     */
    public GenericResult FundInfoImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        //校验必要入参
        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE");

        GenericResult result1 = new GenericResult();
        String filePath = "";
        //查询账户清算文件配置信息
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result1,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        //获取文件路径
        if(result1.getDataList().size()>0){
            filePath = ObjectUtils.toString(result1.getDataList().get(0).get("FILE_PATH"));
        }

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 1) {
            xlsxInfoList.remove(0);
            Map errorMap = new HashMap();
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                //MapUtil.chkIRowNoNull(lineParam, j + 1,"CUST_ID","CUACCT_ID");

                lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("CUST_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("CUACCT_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("OP_ID", params.get("OP_ID"));
                lineParam.put("UNUSE_AMOUNT", ObjectUtils.toString(lineParam.get("UNUSE_AMOUNT")));
                lineParam.put("FUND_LAST_BAL", ObjectUtils.toString(lineParam.get("FUND_LAST_BAL")));
                lineParam.put("FUND_BAL", ObjectUtils.toString(lineParam.get("FUND_BAL")));
                lineParam.put("FUND_AVL", ObjectUtils.toString(lineParam.get("FUND_AVL")));
                lineParam.put("FUND_TRD_FRZ", ObjectUtils.toString(lineParam.get("FUND_TRD_FRZ")));
                lineParam.put("FUND_LONG_FRZ", ObjectUtils.toString(lineParam.get("FUND_LONG_FRZ")));
                lineParam.put("FUND_DEBT", ObjectUtils.toString(lineParam.get("FUND_DEBT")));
                lineParam.put("FUND_OTD", ObjectUtils.toString(lineParam.get("FUND_OTD")));
                lineParam.put("FUND_CREDIT", ObjectUtils.toString(lineParam.get("FUND_CREDIT")));
                lineParam.put("FUND_BLN_ACCU", ObjectUtils.toString(lineParam.get("FUND_BLN_ACCU")));
                lineParam.put("LAST_CAL_DATE", ObjectUtils.toString(lineParam.get("LAST_CAL_DATE")));
                lineParam.put("FUND_RATE", ObjectUtils.toString(lineParam.get("FUND_RATE")));
                lineParam.put("CREDIT_DATE", ObjectUtils.toString(lineParam.get("CREDIT_DATE")));
                lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("REMARK", ObjectUtils.toString(lineParam.get("REMARK")));
                lineParam.put("CALLOT_IN_FUND", ObjectUtils.toString(lineParam.get("CALLOT_IN_FUND")));
                lineParam.put("CALLOT_OUT_FUND", ObjectUtils.toString(lineParam.get("CALLOT_OUT_FUND")));

                //给为空值参数设置0
                MapUtil.isNullSetDefVal(lineParam, "0","UNUSE_AMOUNT","FUND_LAST_BAL","FUND_BAL","FUND_AVL","FUND_TRD_FRZ",
                        "FUND_LONG_FRZ","FUND_DEBT","FUND_OTD","FUND_CREDIT","FUND_BLN_ACCU","FUND_RATE","CREDIT_RATE",
                        "CALLOT_IN_FUND","CALLOT_OUT_FUND");

                Map qryMap = new HashMap();
                qryMap.put("CUST_ID", lineParam.get("CUST_ID"));
                qryMap.put("CUACCT_ID", lineParam.get("CUACCT_ID"));
                CommBiz.commBexCall("delete_sett_T_FUND_INFO_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_FUND_INFO_ERROR_CODE, AtomError.QUERY_T_FUND_INFO_ERROR_MSG);
                Map qryMapSub = new HashMap();

                qryMapSub.put("CUST_ID", lineParam.get("CUST_ID"));
                qryMapSub.put("OP_ID", lineParam.get("OP_ID"));
                qryMapSub.put("CUACCT_ID", lineParam.get("CUACCT_ID"));
                CommBiz.commBexCall("delete_sett_T_FUND_INFO_SUB_Bex", qryMapSub, commParams, result,
                        AtomError.QUERY_T_FUND_INFO_ERROR_CODE, AtomError.QUERY_T_FUND_INFO_ERROR_MSG);

                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_FUND_INFO_LIST","batch_insert_T_FUND_INFO_Bex",
                    AtomError.ADD_T_FUND_INFO_ERROR_CODE, AtomError.ADD_T_FUND_INFO_ERROR_MSG,
                    100);
            //todo 分批导入数据
            int iRetCodeSub = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_FUND_INFO_SUB_LIST","batch_insert_T_FUND_INFO_SUB_Bex",
                    AtomError.ADD_T_FUND_INFO_SUB_ERROR_CODE, AtomError.ADD_T_FUND_INFO_SUB_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "资金数据批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 股份信息导入
     * @param dataExchange
     * @return
     */
    public GenericResult AssetInfoImport(DataExchangeAssembly dataExchange) {
        Map params = (Map) dataExchange.getBusinessData("params");
        Map commParams = (Map) dataExchange.getBusinessData("commParams");
        GenericResult result = new GenericResult();
        if (!MapUtil.isNoNull(params, "OP_ID")) {
            params.put("OP_ID",ObjectUtils.toString(commParams.get("OP_CODE")));
        }
        //校验必要入参
        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE");

        GenericResult result1 = new GenericResult();
        String filePath = "";
        //查询账户清算文件配置信息
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result1,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        //获取文件路径
        if(result1.getDataList().size()>0){
            filePath = ObjectUtils.toString(result1.getDataList().get(0).get("FILE_PATH"));
        }

        //最终要插入的list
        List lastList=new ArrayList();

        List<Map> xlsxInfoList = XlsxUtil.readXlsx(filePath);
        if (xlsxInfoList != null && xlsxInfoList.size() > 1) {
            xlsxInfoList.remove(0);
            Map errorMap = new HashMap();
            //数据正确性校验及处理
            for (int j = 0; j < xlsxInfoList.size(); j++) {
                Map lineParam = xlsxInfoList.get(j);
                //校验必输项
                MapUtil.chkIRowNoNull(lineParam, j + 1,"TRDACCT","INST_ID");

                //lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("CUST_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("TRDACCT", ObjectUtils.toString(lineParam.get("TRDACCT")));
                lineParam.put("OP_ID", params.get("OP_ID"));
                lineParam.put("CUACCT_ID", ObjectUtils.toString(params.get("CUST_ID")));
                lineParam.put("INST_ID", ObjectUtils.toString(lineParam.get("INST_ID")));
                lineParam.put("COST_PRICE", ObjectUtils.toString(lineParam.get("COST_PRICE")));
                lineParam.put("INST_LAST_BAL", ObjectUtils.toString(lineParam.get("INST_LAST_BAL")));
                lineParam.put("INST_BAL", ObjectUtils.toString(lineParam.get("INST_BAL")));
                lineParam.put("INST_AVL", ObjectUtils.toString(lineParam.get("INST_AVL")));
                lineParam.put("UNUSE_AMOUNT", ObjectUtils.toString(lineParam.get("UNUSE_AMOUNT")));
                lineParam.put("INST_TRD_FRZ", ObjectUtils.toString(lineParam.get("INST_TRD_FRZ")));
                lineParam.put("INST_LONG_FRZ", ObjectUtils.toString(lineParam.get("INST_LONG_FRZ")));
                lineParam.put("INST_OTD", ObjectUtils.toString(lineParam.get("INST_OTD")));
                lineParam.put("INST_BAL_OTD", ObjectUtils.toString(lineParam.get("INST_BAL_OTD")));
                lineParam.put("MKT_VALUE", ObjectUtils.toString(lineParam.get("MKT_VALUE")));
                lineParam.put("CREATE_DATE", ObjectUtils.toString(lineParam.get("CREATE_DATE")));
                lineParam.put("UP_DATE",DateUtil.today());
                lineParam.put("REMARK", ObjectUtils.toString(lineParam.get("REMARK")));
                lineParam.put("STK_PRICE", ObjectUtils.toString(lineParam.get("SRK_PRICE")));
                lineParam.put("BUY_COST_AMT", ObjectUtils.toString(lineParam.get("BUY_COST_AMT")));
                lineParam.put("CALLOT_IN_ASSET", ObjectUtils.toString(lineParam.get("CALLOT_IN_ASSET")));
                lineParam.put("CALLOT_OUT_ASSET", ObjectUtils.toString(lineParam.get("CALLOT_OUT_ASSET")));

                //给为空值参数设置0
                MapUtil.isNullSetDefVal(lineParam, "0","COST_PRICE","INST_LAST_BAL","INST_BAL","INST_AVL","UNUSE_AMOUNT",
                        "INST_TRD_FRZ","INST_LONG_FRZ","INST_OTD","INST_BAL_OTD","MKT_VALUE","UP_DATE","STK_PRICE",
                        "BUY_COST_AMT","CALLOT_IN_ASSET","CALLOT_OUT_ASSET");
                Map qryMap = new HashMap();
                qryMap.put("CUST_ID", lineParam.get("CUST_ID"));
                qryMap.put("CUACCT_ID", lineParam.get("CUACCT_ID"));
                qryMap.put("INST_ID", lineParam.get("INST_ID"));
                CommBiz.commBexCall("delete_sett_T_MTS_ASSET_Bex", qryMap, commParams, result,
                        AtomError.QUERY_T_MTS_ASSET_ERROR_CODE, AtomError.QUERY_T_MTS_ASSET_ERROR_MSG);

                Map qryMapSub = new HashMap();
                qryMapSub.put("CUST_ID", lineParam.get("CUST_ID"));
                qryMapSub.put("OP_ID", lineParam.get("OP_ID"));
                qryMapSub.put("CUACCT_ID", lineParam.get("CUACCT_ID"));
                qryMapSub.put("INST_ID", lineParam.get("INST_ID"));
                CommBiz.commBexCall("delete_sett_T_MTS_ASSET_SUB_Bex", qryMapSub, commParams, result,
                        AtomError.QUERY_T_MTS_ASSET_ERROR_CODE, AtomError.QUERY_T_MTS_ASSET_ERROR_MSG);
                if (ObjectUtils.toString(lineParam.get("MKT_VALUE")).trim().equals("0")){
                    continue;
                }
                lastList.add(lineParam);

            }

            //todo 分批导入数据
            int  iRetCode = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_MTS_ASSET_LIST","batch_insert_T_MTS_ASSET_Bex",
                    AtomError.ADD_T_MTS_ASSET_ERROR_CODE, AtomError.ADD_T_MTS_ASSET_ERROR_MSG,
                    100);
            //todo 分批导入数据
            int  iRetCodeSub = DBUtil.savebyGroup(new HashMap(), commParams, result, lastList,
                    "T_MTS_ASSET_SUB_LIST","batch_insert_T_MTS_ASSET_SUB_Bex",
                    AtomError.ADD_T_MTS_ASSET_SUB_ERROR_CODE, AtomError.ADD_T_MTS_ASSET_SUB_ERROR_MSG,
                    100);
        }

        return new AtomResult("0", "股份数据批量导入成功", result.getDataList());
    }

    /**
     * @method_desc: 查询账户清算文件配置
     * @param dataExchange
     * @return
     */
    public GenericResult AcctToFileQuery(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100205，错误信息：查询账户清算文件配置信息失败
        CommBiz.commBexCall("AcctToFileQuery_Bex", params, commParams, result,
                AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);

        return new AtomResult("0", "查询账户清算文件配置信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增账户清算文件配置
     * @param dataExchange
     * @return
     */
    public GenericResult AcctToFileInsert(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "CUST_ID", "DATA_TYPE","FILE_PATH");
        GenericResult addResult = new GenericResult();

        //错误代码：-100206，错误信息：新增账户清算文件配置信息失败
        CommBiz.commBexCall("AcctToFileInsert_Bex", params, commParams, addResult,
                AtomError.ADD_T_ACCT_TO_FILE_ERROR_CODE, AtomError.ADD_T_ACCT_TO_FILE_ERROR_MSG);

        return new AtomResult("0", "新增账户清算文件配置信息成功！");
    }
    /**
     * @method_desc: 修改账户清算文件配置
     * @param dataExchange
     * @return
     */
    public GenericResult AcctToFileUpdate(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100207，错误信息：修改账户清算文件配置信息失败
        CommBiz.commBexCall("AcctToFileUpdate_Bex", params, commParams, result,
                AtomError.MOD_T_ACCT_TO_FILE_ERROR_CODE, AtomError.MOD_T_ACCT_TO_FILE_ERROR_MSG);

        return new AtomResult("0", "修改账户清算文件配置信息成功！");
    }
    /**
     * @method_desc: 删除账户清算文件配置
     * @param dataExchange
     * @return
     */
    public GenericResult AcctToFileDelete(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //错误代码：-100208，错误信息：删除账户清算文件配置信息失败
        CommBiz.commBexCall("AcctToFileDelete_Bex", params, commParams, result,
                AtomError.DEL_T_ACCT_TO_FILE_ERROR_CODE, AtomError.DEL_T_ACCT_TO_FILE_ERROR_MSG);

        return new AtomResult("0", "删除账户清算文件配置信息成功！");
    }

    /**
     * @method_desc: 查询账户清算文件配置
     * @param dataExchange
     * @return
     */
    public GenericResult queryAcctToFile(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100205，错误信息：查询账户清算文件配置信息失败
        if (ObjectUtils.toString(params.get("DATA_TYPE")).equals("3")) {
            CommBiz.commBexCall("queryAcctToFileAch_Bex", params, commParams, result,
                    AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        } else {
            CommBiz.commBexCall("queryAcctToFile_Bex", params, commParams, result,
                    AtomError.QUERY_T_ACCT_TO_FILE_ERROR_CODE, AtomError.QUERY_T_ACCT_TO_FILE_ERROR_MSG);
        }
        return new AtomResult("0", "查询账户清算文件配置信息成功！", result.getDataList());
    }

}
