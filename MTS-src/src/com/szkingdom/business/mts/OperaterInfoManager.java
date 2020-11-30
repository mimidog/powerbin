package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.common.SEQGenerator;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.business.util.DateUtil;
import com.szkingdom.business.util.MapUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 功能:操作员管理
 */
public class OperaterInfoManager {

    /**
     * @method_desc:查询操作员岗位变更申请信息
     * @param dataExchange
     * @return
     */
    public GenericResult queryOperaterPostLvlChg(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        GenericResult result = new GenericResult();
        //错误代码：-100053，错误信息：查询订单管理信息失败
        CommBiz.commBexCall("query_T_OPER_POST_LVL_CHG_APP_Bex", params, commParams, result,
                AtomError.QUERY_T_OPER_POST_LVL_CHG_APP_FAIL_CODE,
                AtomError.QUERY_T_OPER_POST_LVL_CHG_APP_FAIL_MSG);

        return new AtomResult("0", "查询操作员岗位变更申请信息成功！", result.getDataList());
    }
    /**
     * @method_desc:新增操作员岗位变更申请信息
     * @param dataExchange
     * @return
     */
    public GenericResult addOperaterPostLvlChgApp(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);

        String logId = SEQGenerator.getPostLvlChgAppId();

        params.put("LOG_ID", logId);


        params.put("APP_DATE", DateUtil.today());
        params.put("APP_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "OPER_USER","OPER_NAME","OPER_ORG","OPER_TYPE","POST_ID","MAIN_POST_ID",
                "OPER_STA","CHG_B_POST_LVL","CHG_A_POST_LVL");

        GenericResult result = new GenericResult();
        //错误代码：-100021，错误信息：新增维度设置信息失败
        CommBiz.commBexCall("insert_T_OPER_POST_LVL_CHG_APP_Bex", params, commParams, result,
                AtomError.ADD_T_OPER_POST_LVL_CHG_APP_FAIL_CODE,
                AtomError.ADD_T_OPER_POST_LVL_CHG_APP_FAIL_MSG);

        return new AtomResult("0", "新增操作员岗位变更申请信息成功！");
    }
    /**
     * @method_desc:审核操作员岗位变更申请信息
     * @param dataExchange
     * @return
     */
    public GenericResult auditOperaterPostLvlChg(DataExchangeAssembly dataExchange) {

        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);


        params.put("AUDIT_DATE", DateUtil.today());
        params.put("AUDIT_TIME", DateUtil.nowMinute());

        MapUtil.chkNoNull(params, "AUDIT_USER","AUDIT_RS");

        GenericResult result = new GenericResult();
        //错误代码：-100151，错误信息：审核操作员岗位变更申请信息失败
        CommBiz.commBexCall("update_T_OPER_POST_LVL_CHG_AUDIT_Bex", params, commParams, result,
                AtomError.AUDIT_T_OPER_POST_LVL_CHG_APP_FAIL_CODE,
                AtomError.AUDIT_T_OPER_POST_LVL_CHG_APP_FAIL_MSG);

        //当审核通过时，再更新操作员表
        if(ObjectUtils.toString(params.get("AUDIT_RS")).equals("1")){
            Map operaterMap=new HashMap();
            operaterMap.put("USER_CODE", params.get("USER_CODE"));
            operaterMap.put("POST_LVL", params.get("POST_LVL"));


            //错误代码：-100152，错误信息：更新操作员表中岗位级别失败
            CommBiz.commBexCall("update_UUM_USER_POST_LVL_Bex", operaterMap, commParams, result,
                    AtomError.MOD_UUM_USER_POST_LVL_FAIL_CODE,
                    AtomError.MOD_UUM_USER_POST_LVL_FAIL_MSG);
        }

        return new AtomResult("0", "审核操作员岗位变更申请信息成功！");
    }
}
