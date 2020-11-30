package com.szkingdom.business.mts;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.business.common.CommBiz;
import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

public class OperationLog {

    public GenericResult queryOperationLog(DataExchangeAssembly dataExchange){
        Map commParams= DataExchangeUtil.getCommParams(dataExchange);
        Map params=DataExchangeUtil.getParams(dataExchange);
        GenericResult result = new GenericResult();
        params.put("OP_USER", commParams.get("OP_CODE"));
        CommBiz.commBexCall("QUERY_T_OP_LOG_Bex", params, commParams, result,
                AtomError.QUERY_T_OP_LOG_FAIL_CODE, AtomError.QUERY_T_OP_LOG_FAIL_MSG);

        return new AtomResult("0", "操作日志查询！", result.getDataList());
    }

    public void insertOpLog(String opTheme, String opType, Map commParams) {
        GenericResult result = new GenericResult();
        Map map = new HashMap();
        map.put("OP_THEME", opTheme);
        map.put("OP_TYPE", opType);
        map.put("OP_USER", ObjectUtils.toString(commParams.get("OP_CODE")));
        map.put("OP_NAME", ObjectUtils.toString(commParams.get("USER_NAME")));
        map.put("OP_ORG", ObjectUtils.toString(commParams.get("ORG_CODE")));
        CommBiz.commBexCall("INSERT_T_OP_LOG_Bex", map, commParams, result,
                AtomError.ADD_T_OP_LOG_ERROR_CODE, AtomError.ADD_T_OP_LOG_ERROR_MSG);
    }
}
