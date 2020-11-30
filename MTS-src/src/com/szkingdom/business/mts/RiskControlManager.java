package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.SEQGenerator;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @file_desc: 风控信息管理
 *
 */
public class RiskControlManager {

    private OperationLog opLog = new OperationLog();

    /**
     * @method_desc: 查询风控类型信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryRiskControlTypeCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100042，错误信息：查询风控类型信息失败
        CommBiz.commBexCall("query_T_RISK_TYPE_CFG_Bex", params, commParams, result,
                AtomError.QUERY_T_RISK_TYPE_CFG_ERROR_CODE, AtomError.QUERY_T_RISK_TYPE_CFG_ERROR_MSG);

        return new AtomResult("0", "查询风控类型信息成功！", result.getDataList());
    }
    /**
     * @method_desc: 新增风控类型信息
     * @param dataExchange
     * @return
     */
    public GenericResult addRiskControlTypeCfgInfo(DataExchangeAssembly dataExchange) {


        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        List<String> attrList=DataExchangeUtil.getAttrList(dataExchange);
        String[] lvl = new String[1];

        int iRetCode = RiskControlBiz.getRiskControlLvl((String)params.get("PAR_TYPE_ID"), lvl);

        if (iRetCode != 0) {
            throw new AtomException(AtomError.GET_T_RISK_TYPE_CFG_LVL_ERROR_CODE,
                    AtomError.GET_RISK_TYPE_CFG_LVL_ERROR_MSG,
                    FrameworkConstants.ATOM_LVL);
        }

        if (lvl[0].length() > 64) {
            throw new AtomException(AtomError.RISK_TYPE_LVL_TO_BIG_ERROR_CODE,
                    AtomError.RISK_TYPE_LVL_TO_BIG_ERROR_MSG,
                    FrameworkConstants.ATOM_LVL);
        }

        params.put("TYPE_LVL", lvl[0]);

        String riskTypeId = SEQGenerator.getRiskTypeCfgId();

        params.put("TYPE_ID", riskTypeId);
        params.put("OP_ID", commParams.get("OP_CODE"));
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100043，错误信息：新增风控类型信息失败
        CommBiz.commBexCall("insert_T_RISK_TYPE_CFG_Bex", params, commParams, result,
                AtomError.ADD_T_RISK_TYPE_CFG_ERROR_CODE, AtomError.ADD_T_RISK_TYPE_CFG_ERROR_MSG);

        return new AtomResult("0", "新增风控类型信息成功！");
    }
    /**
     * @method_desc: 修改风控类型信息
     * @param dataExchange
     * @return
     */
    public GenericResult modRiskControlTypeCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "TYPE_ID");

        params.put("UP_DATE", DateUtil.today());
        params.put("OP_ID", commParams.get("OP_CODE"));

        GenericResult result = new GenericResult();
        //错误代码：-100044，错误信息：修改风控类型信息失败
        CommBiz.commBexCall("update_T_RISK_TYPE_CFG_Bex", params, commParams, result,
                AtomError.MOD_T_RISK_TYPE_CFG_ERROR_CODE, AtomError.MOD_T_RISK_TYPE_CFG_ERROR_MSG);

        return new AtomResult("0", "修改风控类型信息成功！");
    }

    /**
     * @method_desc: 修改风控类型状态信息
     * @param dataExchange
     * @return
     */
    public GenericResult modRiskControlTypeCfgStaInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "TYPE_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100045，错误信息：修改风控类型状态信息失败
        CommBiz.commBexCall("update_T_RISK_TYPE_CFG_STA_Bex", params, commParams, result,
                AtomError.MOD_T_RISK_TYPE_CFG_STA_ERROR_CODE, AtomError.MOD_T_RISK_TYPE_CFG_STA_ERROR_MSG);

        return new AtomResult("0", "修改维度状态信息成功！");
    }
    /**
     * @method_desc: 删除风控类型信息
     * @param dataExchange
     * @return
     */
    public GenericResult delRiskControlTypeCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "TYPE_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100046，错误信息：删除风控类型信息失败
        CommBiz.commBexCall("delete_T_RISK_TYPE_CFG_Bex", params, commParams, result,
                AtomError.DEL_T_RISK_TYPE_CFG_ERROR_CODE, AtomError.DEL_T_RISK_TYPE_CFG_ERROR_MSG);

        return new AtomResult("0", "删除风控类型信息成功！");
    }

    /**
     * @method_desc: 查询风控配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryRiskCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100049，错误信息：查询风控配置信息失败
        CommBiz.commBexCall("query_T_RISK_CFG_Bex", params, commParams, result,
                AtomError.QUERY_T_RISK_CFG_ERROR_CODE, AtomError.QUERY_T_RISK_CFG_ERROR_MSG);

        return new AtomResult("0", "查询风控配置信息成功！", result.getDataList());
    }

    /**
     * @method_desc: 新增风控配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult addRiskCfgInfo(DataExchangeAssembly dataExchange) {


        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String riskCfgId = SEQGenerator.getRiskCfgId();

        params.put("RISK_ID", riskCfgId);
        params.put("OP_ID", commParams.get("OP_CODE"));
        params.put("UP_DATE", DateUtil.today());

        GenericResult result = new GenericResult();
        //错误代码：-100050，错误信息：新增风控配置信息失败
        CommBiz.commBexCall("insert_T_RISK_CFG_Bex", params, commParams, result,
                AtomError.ADD_T_RISK_CFG_ERROR_CODE, AtomError.ADD_T_RISK_CFG_ERROR_MSG);

        return new AtomResult("0", "新增风控配置信息成功！");
    }

    /**
     * @method_desc: 修改风控配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult modRiskCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "RISK_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100051，错误信息：修改风控配置信息失败
        CommBiz.commBexCall("update_T_RISK_CFG_Bex", params, commParams, result,
                AtomError.MOD_T_RISK_CFG_ERROR_CODE, AtomError.MOD_T_RISK_CFG_ERROR_MSG);

        return new AtomResult("0", "修改风控配置信息成功！");
    }
    /**
     * @method_desc: 删除风控配置信息
     * @param dataExchange
     * @return
     */
    public GenericResult delRiskCfgInfo(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "RISK_ID");

        GenericResult result = new GenericResult();
        //错误代码：-100052，错误信息：删除风控配置信息失败
        CommBiz.commBexCall("delete_T_RISK_CFG_Bex", params, commParams, result,
                AtomError.DEL_T_RISK_CFG_ERROR_CODE, AtomError.DEL_T_RISK_CFG_ERROR_MSG);

        return new AtomResult("0", "删除风控配置信息成功！");
    }
    /**
     * @method_desc: 查询操作员交易行为控制信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryTradeActCtrl(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100101，错误信息：查询操作员交易行为控制信息失败
        CommBiz.commBexCall("query_T_TRADE_ACT_CTRL_Bex", params, commParams, result,
                AtomError.QUERY_T_TRADE_ACT_CTRL_ERROR_CODE, AtomError.QUERY_T_TRADE_ACT_CTRL_ERROR_MSG);

        return new AtomResult("0", "查询操作员交易行为控制信息成功",result.getDataList());
    }

    /**
     * @method_desc: 新增操作员交易行为控制信息
     * @param dataExchange
     * @return
     */
    public GenericResult addTradeActCtrl(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();

        //错误代码：-100102，错误信息：新增操作员交易行为控制信息失败
        CommBiz.commBexCall("insert_T_TRADE_ACT_CTRL_Bex", params, commParams, result,
                AtomError.ADD_T_TRADE_ACT_CTRL_ERROR_CODE, AtomError.ADD_T_TRADE_ACT_CTRL_ERROR_MSG);

        //新增禁止交易设置日志
        opLog.insertOpLog("8", "2", commParams);
        return new AtomResult("0", "新增操作员交易行为控制信息成功！");
    }
    /**
     * @method_desc: 修改操作员交易行为控制信息
     * @param dataExchange
     * @return
     */
    public GenericResult modTradeActCtrl(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        MapUtil.chkNoNull(params, "POST_ID","OP_ID");
        String sysDate=SysConfigManager.getSysDate();
        params.put("UP_DATE", sysDate);
        params.put("UP_TIME", DateUtil.nowMinute());
        GenericResult result = new GenericResult();
        //错误代码：-100102，错误信息：新增操作员交易行为控制信息失败
        CommBiz.commBexCall("update_T_TRADE_ACT_CTRL_Bex", params, commParams, result,
                AtomError.MOD_T_TRADE_ACT_CTRL_ERROR_CODE, AtomError.MOD_T_TRADE_ACT_CTRL_ERROR_MSG);

        //修改恢复交易设置日志
        opLog.insertOpLog("9", "2", commParams);

        return new AtomResult("0", "修改操作员交易行为控制信息成功！");
    }
}
