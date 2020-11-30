package com.szkingdom.business.util;

import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import org.apache.commons.lang.ObjectUtils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class MapUtils {
    public static String getValue(Map params, String key) {
        return ObjectUtils.toString(params.get(key));
    }

    /**
     * 将交互区中的用户代码保存到USER_CODE 和 CUST_CODE
     * @param params
     */
    public static Map setParamsCodes(Map params){
        String code = ObjectUtils.toString(ObjectUtils.defaultIfNull(params.get("USER_CODE"),params.get("CUST_CODE")));
        if(!code.isEmpty()){
            params.put("USER_CODE",code);
            params.put("CUST_CODE",code);
        }
        return params;
    }

    public static void deleteNull(Map params,String[] keys){
        for (String key : keys) {
            if(params.get(key) == null){
                params.put(key, "");
            }
        }
    }
    /**
     * 检查入参是否为空
     * @param params 要检查的Map
     * @param keyName 键
     * @param des 异常描述
     * 调用实例：MapUtils.checkParam(params,"CUST_STATUS","客户状态不能为空");
     */
    public static void checkParam(Map<String, String> params,String keyName,String des) throws AtomException {
        if(ObjectUtils.toString(params.get(keyName)).isEmpty()){
            throw new AtomException(-990001, des, FrameworkConstants.ATOM_LVL);
        }
    }
    /**
     * 将Map中的value全部转换成值是String的ConcurrentHashMap
     * @param targetMap
     * @return
     */
    public static Map<String, Object> toStrMap(Map<String, Object> targetMap){
        Map<String, Object> theMap = new ConcurrentHashMap<String, Object>();
        for (Map.Entry<String, Object> e: targetMap.entrySet()) {
            theMap.put(e.getKey(), ObjectUtils.toString(e.getValue()));
        }

        return theMap;
    }


}
