package com.szkingdom.business.common;


import com.szkingdom.business.util.DataExchangeUtil;
import com.szkingdom.frame.business.atom.AtomResult;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang3.ObjectUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class PlatSysParamManager {

    /**
     * 功能：查询系统参数记录（页面调用此方法）
     * @param dataExchange
     * @return
     */
    public GenericResult qrySysParamRecord(DataExchangeAssembly dataExchange) {
        Map params = DataExchangeUtil.getParams(dataExchange);
        Map commParams = DataExchangeUtil.getCommParams(dataExchange);

        GenericResult rs = new GenericResult();
        CommBiz.commBexCall("sysParamQuery",params, commParams, rs,AtomError.QUERY_UPM_SYSPARAM_ERROR_CODE,AtomError.QUERY_UPM_SYSPARAM_ERROR_MSG);
        List<Map> rsList = rs.getDataList();
        return new AtomResult("0", "查询平台系统参数成功", rsList);
    }

    /**
     * 功能：根据系统参数代码得到系统参数值
     * @param paraCode:系统参数代码
     * @return
     */
    public static String getParamValByParamCode(String paraCode){
        Map params = new HashMap();
        Map commParams = new HashMap();

        params.put("PAR_CODE", paraCode);

        GenericResult result = new GenericResult();
        CommBiz.commBexCall("sysParamQuery",params, commParams, result,AtomError.QUERY_UPM_SYSPARAM_ERROR_CODE,
                AtomError.QUERY_UPM_SYSPARAM_ERROR_MSG);
        if(result.getDataList() != null && result.getDataList().size() > 0){
            return ObjectUtils.toString(result.getDataList().get(0).get("PAR_VAL"));
        }
        return "";
    }
}
