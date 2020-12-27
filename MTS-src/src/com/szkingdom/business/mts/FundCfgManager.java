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
public class FundCfgManager {

    private OperationLog opLog = new OperationLog();

    /**
     * @method_desc: 查询客户资金出入信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryFunInfoCfg(DataExchangeAssembly dataExchange) {

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

        //错误代码：-100064，错误信息：查询客户资金出入信息失败
        params.put("PERMISSION_SQL", permission.getDataList().get(0).get("PERMISSION_SQL"));
        CommBiz.commBexCall("query_T_FUND_INFO_CFG_Bex", params, commParams, result,
                AtomError.QUERY_T_FUND_INFO_ERROR_CODE, AtomError.QUERY_T_FUND_INFO_ERROR_MSG);

        return new AtomResult("0", "查询客户资金出入信息成功！", result.getDataList());
    }

    /**
     * @method_desc: 初始化客户资金出入信息
     * @param dataExchange
     * @return
     */
    public GenericResult initFunInfoCfg(DataExchangeAssembly dataExchange) {

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
        CommBiz.commBexCall("insert_T_FUND_INFO_CFG_Bex", params, commParams, result,
                AtomError.ADD_T_FUND_INFO_ERROR_CODE, AtomError.ADD_T_FUND_INFO_ERROR_MSG);

        return new AtomResult("0", "新增客户资金出入信息成功！");
    }

    /**
     * @method_desc: 修改客户资金出入信息
     * @param dataExchange
     * @return
     */
    public GenericResult modFunInfoCfg(DataExchangeAssembly dataExchange) {

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
        CommBiz.commBexCall("update_T_FUND_INFO_CFG_Bex", params, commParams, result,
                AtomError.MOD_T_FUND_INFO_ERROR_CODE, AtomError.MOD_T_FUND_INFO_ERROR_MSG);

        //修改资金股份初始化日志
        opLog.insertOpLog("5", "2", commParams);

        return new AtomResult("0", "修改客户资金出入信息成功！");
    }
}
