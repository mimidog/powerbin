package com.szkingdom.business.common;

import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import org.apache.commons.lang.ObjectUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public abstract class AtomAbstract extends com.szkingdom.frame.business.atom.basic.AtomAbstract {

    /**
     * 检查多个值不能为空
     * @param params
     * @param keys
     */
    public static void isNullsInMap(Map params,String... keys){
        for (String key : keys) {
            Object val = params.get(key);
            if(val == null||ObjectUtils.toString(val).isEmpty()){
                throw new AtomException(-66689, "["+key+"]不能为空", FrameworkConstants.ATOM_LVL);
            }
        }
    }

    /**
     * 检查入参是否为空,为空 报异常
     * @param params 要检查的Map
     * @param keyName 键
     * @param des 异常描述
     * 调用实例：isNullInMap(params,"CUST_STATUS","客户状态不能为空");
     */
    public void isNullInMap(Map<String, String> params,String keyName,String des) {
        if(ObjectUtils.toString(params.get(keyName)).isEmpty()){
            throw new AtomException(-66688, des, FrameworkConstants.ATOM_LVL);
        }
    }

    /**
     * 获取交互区中的值转换成字符串
     * @param params
     * @param key
     * @return
     */
    public String getStrInMap(Map params, String key) {
        return ObjectUtils.toString(params.get(key));
    }

        /**
         * 去除前后指定字符
         * @param source 目标紫都城
         * @param beTrim 要删除的指定字符
         * @return 删除之后的字符串
         * 调用示例：System.out.println(trim(", ashuh  ",","));
         */
    public String trim(String source, String beTrim) {
        if(source==null){
            return "";
        }
        source = source.trim(); // 循环去掉字符串首的beTrim字符
        if(source.isEmpty()){
            return "";
        }
        String beginChar = source.substring(0, 1);
        if (beginChar.equalsIgnoreCase(beTrim)) {
            source = source.substring(1, source.length());
            beginChar = source.substring(0, 1);
        }
        // 循环去掉字符串尾的beTrim字符
        String endChar = source.substring(source.length() - 1, source.length());
        if (endChar.equalsIgnoreCase(beTrim)) {
            source = source.substring(0, source.length() - 1);
            endChar = source.substring(source.length() - 1, source.length());
        }
        return source;
    }

    /**
     * 创建返回值
     * @param vals
     * @return 默认返回键 依次为map0 、 map1 ...
     */
    public List<Map> buildReturnList(Object... vals){
        List rsList = new ArrayList();
        Map rsMap = new HashMap();
        for (int i = 0,vlen =vals.length ; i < vlen; i++) {
            rsMap.put("map"+i,vals[i]);
        }
        rsList.add(rsMap);
        return rsList;
    }
}