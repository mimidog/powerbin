package com.szkingdom.business.util;

import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;

import java.util.List;
import java.util.Map;

public class DataExchangeUtil {
    /**
     * 交换区入参结果集获取
     * @param dataExchange
     * @return
     *
     */
    public static Map getParams (DataExchangeAssembly dataExchange) {
        return (Map)dataExchange.getBusinessData("params");
    }

    /**
     * 交换区公共入参结果集获取
     * @param dataExchange
     * @return
     *
     */
    public static Map getCommParams (DataExchangeAssembly dataExchange) {
        return (Map)dataExchange.getBusinessData("commParams");
    }
    /**
     * 交换区公共入参结果集获取
     * @param dataExchange
     * @return
     *
     */
    public static List getAttrList (DataExchangeAssembly dataExchange) {
        return (List)dataExchange.getBusinessData("attr");
    }

}
