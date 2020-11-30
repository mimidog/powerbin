package com.szkingdom.business.util;

import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.util.StringUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ObjectUtils;

import java.net.InetAddress;
import java.util.*;

public class MapUtil {

    public static final String DEFAULT_MAPKEY_SORT_TYPE = "DEFAULT";
    public static final String NUMBER_MAPKEY_SORT_TYPE = "NUMBER";
    public static final String NUMBER_REVERSE_MAPKEY_SORT_TYPE = "NUMBER_REVERSE";


    public static Map isNullSetDefVal(Map params,String defVal,String... keys){

        for(int i = 0, len = keys.length; i < len; i++) {
            if("".equals(ObjectUtils.toString(params.get(keys[i])))) {
                params.put(keys[i],defVal);
            }
        }
        return params;
    }
    /**
     * @desc Map指定键的非空校验
     * @param params
     * @param keys
     * @author jinlw 20160809
     */
    public static void chkNoNull(Map params, String... keys) {
        //方法入参非null校验
        ObjectUtil.chkNoNull(params, keys);
        for(int i = 0, len = keys.length; i < len; i++) {
            if("".equals(ObjectUtils.toString(params.get(keys[i])))) {
                throw new AtomException(-100001, "字段【" + keys[i] + "】值不能为空，请检查",
                        FrameworkConstants.ATOM_LVL);
            }
        }
    }

    /**
     * @desc Map指定键的非空校验(校验多条记录显示报错行数时使用)
     * @param params
     * @param keys
     */
    public static void chkIRowNoNull(Map params,int rowNum, String... keys) {
        //方法入参非null校验
        ObjectUtil.chkNoNull(params, keys);
        for(int i = 0, len = keys.length; i < len; i++) {
            if("".equals(ObjectUtils.toString(params.get(keys[i])))) {
                throw new AtomException(-100001, "第【"+rowNum+"】行记录"+"字段【" + keys[i] + "】值不能为空，请检查",
                        FrameworkConstants.ATOM_LVL);
            }
        }
    }

    /**
     * @desc Map指定键的非空判断
     * @param params
     * @param keys
     * @author jinlw 20160809
     */
    public static boolean isNoNull(Map params, String... keys) {
        //方法入参非null校验
        boolean isFlag = true;
        try {
            chkNoNull(params, keys);
        } catch (AtomException e) {
            isFlag = false;
        }
        return isFlag;
    }

    /**
     * 相关参数不能同时不null
     * @param params
     * @param keys
     * @return
     */
    public static void isNotSameNull(Map params, String... keys){
        boolean flag = false;
        String temp = "";
        for(int i = 0; i < keys.length; i ++){
            temp = temp + ObjectUtils.toString(keys[i]) + ",";
            if(!"".equals(ObjectUtils.toString(params.get(keys[i])))){
                flag = true;
                break;
            }
        }
        if(!flag){
            throw new AtomException(-100001, "字段【" + temp.substring(0, temp.length() - 1) + "】值不能同时为空，请检查",
                    FrameworkConstants.ATOM_LVL);
        }
    }


    /**
     * @desc 删除Map中值为空的键值对
     * @param params
     * @author jinlw 20160902
     */
    public static void removeNull(Map params) {
        ObjectUtil.chkNoNull(params);
        Iterator<String> keyItr = params.keySet().iterator();
        while (keyItr.hasNext()) {
            String key = keyItr.next();
            if("".equals(ObjectUtils.toString(params.get(key)))) {
                keyItr.remove();
            }
        }
    }

    /**
     * @desc 删除Map指定键值对
     * @param params 目标Map
     * @param keys 指定删除的键值
     * @author jinlw 20160902
     */
    public static void removeByKeys(Map params, String... keys) {
        ObjectUtil.chkNoNull(params, keys);
        for(int i = 0, len = keys.length; i < len; i++) {
            params.remove(keys[i]);
        }
    }

    /**
     * @desc 删除Map中未指定的键值对
     * @param params 目标Map
     * @param saveKeys 指定保留的键值
     * @author jinlw 20160913
     */
    public static void removeBySaveKeys(Map params, String... saveKeys) {
        ObjectUtil.chkNoNull(params, saveKeys);
        Iterator<String> iterator = params.keySet().iterator();
        List<String> saveKeyList = Arrays.asList(saveKeys);
        while (iterator.hasNext()) {
            String saveKey = iterator.next();
            if(!saveKeyList.contains(saveKey)) {
                iterator.remove();
            }
        }
    }

    /**
     * @desc Map的指定键空值校验
     * @param params
     * @param keys
     * @author jinlw 20160809
     */
    public static void chkAllNull(Map params, String... keys) {
        if(!isAllNull(params, keys)) {
            throw new AtomException(-100002, "字段【" + Arrays.toString(keys) + "】值均必须为空，请检查",
                    FrameworkConstants.ATOM_LVL);
        }
    }

    /**
     * @desc Map的指定键空值判断
     * @param params
     * @param keys
     * @author jinlw 20160809
     */
    public static boolean isAllNull(Map params, String... keys) {
        //方法入参非null校验
        ObjectUtil.chkNoNull(params, keys);
        boolean isFlag = true;
        for(int i = 0, len = keys.length; i < len; i++) {
            if(!"".equals(ObjectUtils.toString(params.get(keys[i])))) {
                isFlag = false;
                break;
            }
        }
        return isFlag;
    }

    /**
     * @desc Map指定所有键的空或非空校验
     * @param params
     * @param keys
     * @author jinlw 20160809
     */
    public static void chkAllNullOrNoNull(Map params, String... keys) {
        //方法入参非null校验
        ObjectUtil.chkNoNull(params, keys);
        if(!isNoNull(params, keys) && !isAllNull(params, keys)) {
            throw new AtomException(-100003, "字段【" + Arrays.toString(keys) + "】需均有值或均为空",
                    FrameworkConstants.ATOM_LVL);
        }
    }

    /**
     * @desc Map指定键值的单个非空校验
     * @param params
     * @param keys
     * @author jinlw 20160926
     */
    public static void chkNotAllNull(Map params, String... keys) {
        if(!isNotAllNull(params, keys)) {
            throw new AtomException(-100004, "字段【" + Arrays.toString(keys) + "】值不能同时为空，请检查",
                    FrameworkConstants.ATOM_LVL);
        }
    }

    /**
     * @desc Map指定键值的单个非空判断
     * @param params
     * @param keys
     * @author jinlw 20160926
     */
    public static boolean isNotAllNull(Map params, String... keys) {
        ObjectUtil.chkNoNull(params, keys);
        boolean isFlag = false;
        for(int i = 0, len = keys.length; i < len; i++) {
            if(!"".equals(ObjectUtils.toString(params.get(keys[i])))) {
                isFlag = true;
                break;
            }
        }
        return isFlag;
    }

    /**
     * 根据键值keys得到新的映射Map
     * @param aMap
     * @param keys
     * @return
     * @author jinlw 20160922
     */
    public static Map getNewHashMapByKeys(Map aMap, String... keys) {
        ObjectUtil.chkNoNull(aMap, keys);
        Map newMap = new HashMap();
        for(int i = 0, len = keys.length; i < len; i++) {
            newMap.put(keys[i], aMap.get(keys[i]));
        }
        return newMap;
    }
    /**
     * 根据键值keys得到新的映射Map
     * @param aMap
     * @param keys
     * @return
     * @author jinlw 20160922
     */
    public static Map getNewHashMapByKeys(Map aMap, List keys) {
        ObjectUtil.chkNoNull(aMap, keys);
        Map newMap = new HashMap();
        for(int i = 0, len = keys.size(); i < len; i++) {
            newMap.put(keys.get(i), aMap.get(keys.get(i)));
        }
        return newMap;
    }

    /**
     * @desc 将指定映射中的指定映射关系复制到目标映射中(不覆盖已有的映射关系)
     * @param targetMap 目标映射
     * @param assignMap 指定映射
     * @param keys 指定映射关系键值
     * @author jinlw 20161025
     */
    public static void putAllByKeys(Map targetMap, Map assignMap, String... keys) {
        putAllByKeys(false, targetMap, assignMap, keys);
    }

    /**
     * @desc 将指定映射中的指定映射关系复制到目标映射中
     * @param isCover 是否覆盖目标映射的映射关系
     * @param targetMap 目标映射
     * @param assignMap 指定映射
     * @param keys 指定映射关系键值
     * @author jinlw 20161025
     */
    public static void putAllByKeys(boolean isCover, Map targetMap, Map assignMap, String... keys) {
        ObjectUtil.chkNoNull(targetMap, assignMap, keys);
        for(int i = 0, len = keys.length; i < len; i++) {
            if(isCover || "".equals(ObjectUtils.toString(targetMap.get(keys[i])))) {
                targetMap.put(keys[i], assignMap.get(keys[i]));
            }
        }
    }

    /**
     * json格式数据转成Map
     * @param jsonStr
     * @return
     */
    public  static Map<String, Object> jsonToMap(String jsonStr){
        Map<String, Object> map = new HashMap<String, Object>();
        jsonStr=jsonStr.trim();

        if(!jsonStr.startsWith("{")){
            jsonStr="{"+jsonStr;
        }

        if(!jsonStr.endsWith("}")){
            jsonStr=jsonStr+"}";
        }

        JSONObject json = JSONObject.fromObject(jsonStr);
        for(Object key : json.keySet()){
            Object value = json.get(key);
            //如果内层还是数组的话，继续解析
            if(value instanceof JSONArray){
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
                Iterator<JSONObject> it = ((JSONArray)value).iterator();
                while(it.hasNext()){
                    JSONObject json2 = it.next();
                    list.add(jsonToMap(json2.toString()));
                }
                map.put(key.toString().toUpperCase(), list);
            } else {
                map.put(key.toString().toUpperCase(), value);
            }
        }
        return map;
    }

    public static Map ifNotExistPutNull(Map targetMap,String... keys){
        for (int i = 0; i < keys.length; i++) {
            if(targetMap.get(keys[i]) == null ){
                targetMap.put(keys[i],"");
            }
        }
        return targetMap;

    }

    public static void putUserSiteWaySubSys(Map targetMap,Map params,Map commParams){
        String opUser = StringUtils.isNotEmpty(ObjectUtils.toString(params.get("OP_USER"))) ? ObjectUtils.toString(params.get("OP_USER")) : ObjectUtils.toString(commParams.get("OP_CODE"));
        String opWay = StringUtils.isNotEmpty(ObjectUtils.toString(params.get("OP_WAY"))) ? ObjectUtils.toString(params.get("OP_WAY")) : ObjectUtils.toString(commParams.get("OP_WAY"));
        String opSite = StringUtils.isNotEmpty(ObjectUtils.toString(params.get("OP_SITE"))) ? ObjectUtils.toString(params.get("OP_SITE")) : ObjectUtils.toString(commParams.get("OP_SITE"));
        String subsys = StringUtils.isNotEmpty(ObjectUtils.toString(params.get("SUBSYS"))) ? ObjectUtils.toString(params.get("SUBSYS")) : ObjectUtils.toString(commParams.get("SUBSYS"));
        targetMap.put("OP_USER", StringUtils.isEmpty(opUser) ? " " :opUser);
        targetMap.put("OP_WAY", StringUtils.isEmpty(opWay) ? "-1" :opWay);
        targetMap.put("OP_SITE", StringUtils.isEmpty(opSite) ? getIp() :opSite);
        targetMap.put("SUBSYS", StringUtils.isEmpty(subsys) ? "-1" :subsys);

    }

    /**
     * 获取操作站点
     */
    public static String getIp() {
        InetAddress ia=null;//InetAddress
        String ip = null;
        try {
            ia=ia.getLocalHost();
            ip =ia.getHostAddress();
        } catch (Exception e) {
            ip = "127.0.0.1";
        }
        return ip;
    }

    /**
     * 方法名称:transStringToMap
     * 传入参数:mapString 形如 username'chenziwen^password'1234
     * 返回值:Map
     */
    public static Map transStringToMap(String mapString){
        Map map = new HashMap();
        StringTokenizer items;
        for(StringTokenizer entrys = new StringTokenizer(mapString, "=");entrys.hasMoreTokens();
            map.put(items.nextToken(), items.hasMoreTokens() ? ((Object) (items.nextToken())) : null)) {
            items = new StringTokenizer(entrys.nextToken(), "'");
        }
        return map;
    }

    //比较器类(默认排序)
    public static class MapKeyComparator implements Comparator<String>{
        public int compare(String str1, String str2) {
            return str1.compareTo(str2);
        }
    }
    //比较器类(数字大小)
    public static class NumberComparator implements Comparator<String>{
        public int compare(String str1, String str2) {
            if(Double.valueOf(str1) > Double.valueOf(str2)){
                return 1;
            }else if(Double.valueOf(str1) == Double.valueOf(str2)){
                return 0;
            }else{
                return -1;
            }
        }
    }
    //比较器类(数字倒序大小排序)
    public static class NumberReverseComparator implements Comparator<String>{
        public int compare(String str1, String str2) {
            if(Double.valueOf(str1) > Double.valueOf(str2)){
                return -1;
            }else if(Double.valueOf(str1) == Double.valueOf(str2)){
                return 0;
            }else{
                return 1;
            }
        }
    }
    /**
     * 使用 Map按key进行排序
     * @param map
     * @return
     */
    public static Map sortMapByKey(Map map,String sortType) {
        Map sortMap =  null;
        if(sortType.equals(DEFAULT_MAPKEY_SORT_TYPE)) {
             sortMap = new TreeMap<String, String>(
                    new MapKeyComparator());
        }else if(sortType.equals(NUMBER_MAPKEY_SORT_TYPE)){
             sortMap = new TreeMap<String, String>(
                    new NumberComparator());
        }else if(sortType.equals(NUMBER_REVERSE_MAPKEY_SORT_TYPE)){
            sortMap = new TreeMap<String, String>(
                    new NumberReverseComparator());
        }else{
            sortMap = new TreeMap<String, String>();
        }

        if (map == null || map.isEmpty()) {
            return sortMap;
        }
        sortMap.putAll(map);
        return sortMap;
    }

}
