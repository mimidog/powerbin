package com.szkingdom.business.common;

import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SEQGenerator {
    private static final int defIdNum = 1;
    private static final String seqIdKey = "ID";


    /**
     * 功能：获取mts序列号结果集
     * @param seqName 序列号名称
     * @param idNum 获取序列号的个数 必须大于0
     * @return List<Map> 返回的序列号结果集，若idNum小于等于0则返回null
     *
     */
    private static List<Map> getSeqId(String seqName, int idNum) {
        if(idNum > 0) {
            Map params = new HashMap();
            params.put("SEQ_NAME", seqName);
            params.put("SEQ_LIST", new String[idNum]);
            GenericResult result = new GenericResult();
            CommBiz.commBexCall("QRY_SEQ_BEX", params, new HashMap(), result,
                    -300000, "序列【" + seqName + "】获取值失败" );
            return result.getDataList();
        } else {
            throw new AtomException(AtomError.PLEASE_INPUT_SEQ_NUM_ATOM_ERROR_CODE, AtomError.PLEASE_INPUT_SEQ_NUM_ATOM_ERROR_MSG, FrameworkConstants.ATOM_LVL);
        }
    }

    public static String getDimensionId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_TRADE_CFG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getStockPoolAllotId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_STK_POOL_REL_OP", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getStockPoolCfgId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_STK_POOL_CFG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getRiskTypeCfgId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_RISK_TYPE_CFG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getRiskCfgId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_RISK_CFG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getOMSId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_OMS", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }
    public static String getOMSMatchId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_MATCH", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }
    public static String getPostLvlChgAppId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_OPER_POST_LVL_CHG_APP", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }
    public static String getTraderFundAssetLogId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_TRADER_FUND_ASSET_LOG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }

    public static String getCustFundAssetLogId() {
        return ObjectUtils.toString(getSeqId("SEQ_T_CUST_FUND_ASSET_LOG", defIdNum).get(defIdNum - 1).get(seqIdKey));
    }
}


