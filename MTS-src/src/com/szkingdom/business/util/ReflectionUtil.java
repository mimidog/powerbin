package com.szkingdom.business.util;

import com.szkingdom.business.common.AtomEntity;
import com.szkingdom.business.util.ClassUtil;
import com.szkingdom.frame.business.atom.basic.FrameDao;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.FrameErrorCode;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReflectionUtil{

    /**
     * by hurf 反射获取功能号的结果集，不做特殊参数，直接截获抛出底层异常
     * @param serviceCode 业务功能号
     * @param dataExchange 交换区
     * @param map 需要放入的新入参
     * @return List<Map> 结果集
     */
    public static List<Map> reflectThrowException(String serviceCode, DataExchangeAssembly dataExchange, Map map){
        Map rparams = (Map) dataExchange.getBusinessData("params");
        String rfbusCode = ObjectUtils.toString(rparams.get("BUS_CODE"));
        List<GenericResult> resultList = new ArrayList<GenericResult>();
        List<AtomEntity> atomList = ConfigLoadUtil.serviceMap.get(serviceCode);
        if(atomList == null || atomList.size() < 1){
            throw new AtomException(-20000,
                    "功能号【" + serviceCode + "】不存在", FrameworkConstants.ATOM_LVL);
        }
        try {
            for (int i = 0,atomListLen=atomList.size(); i < atomListLen; i ++){
                ClassUtil atom = ConfigLoadUtil.atomMap.get(atomList.get(i).getBusinessCode());
                Map params = (Map) dataExchange.getBusinessData("params");
                Map commParams = (Map) dataExchange.getBusinessData("commParams");
                if(map!=null){
                    params.putAll(map);
                    dataExchange.setBusinessData("params", params);
                }
                commParams.put("SERVER_ID", serviceCode);
                dataExchange.setBusinessData("params", params);
                dataExchange.setBusinessData("commParams", commParams);
                if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 3){
                    Class<?> clazz = Class.forName(atom.getClazzName());
                    Object obj = clazz.newInstance();
                    Method method = clazz.getMethod(atom.getMethodName(), dataExchange.getClass());
                    Object result = method.invoke(obj, dataExchange);
                    GenericResult genericResult = (GenericResult)result;
                    resultList.add(genericResult);
                }else if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 1){
                    GenericResult result = new GenericResult();
                    String bex = ConfigLoadUtil.bexMap.get(atomList.get(i).getBusinessCode());
                    int iRetCode = FrameDao.doBexCall(bex, params, commParams, result);
                    if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                        throw new AtomException(-30000, "反射调用失败",
                                FrameworkConstants.BIZ_LVL);
                    }
                    resultList.add(result);
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        if(resultList.get(0).getFlag()==null||!resultList.get(0).getFlag().equals("0")){
            throw new AtomException(Integer.parseInt(resultList.get(0).getFlag()),resultList.get(0).getPrompt(), FrameworkConstants.ATOM_LVL);
        }
        rparams.put("BUS_CODE",rfbusCode);
        dataExchange.setBusinessData("params",rparams);
       return resultList.get(0).getDataList();
    }

    /**
     * by hurf 反射获取功能号的结果集，不做特殊参数，直接截获抛出底层异常
     * 保持反射前后params入参不变（新放入的入参恢复）,只能保持原基本数据类型数据不变
     * @param serviceCode 业务功能号
     * @param dataExchange 交换区
     * @param map 需要放入的新入参 ,可为NULL
     * @return List<Map> 结果集
     */
    public static List<Map> reflectThrowExceptionClearly(String serviceCode, DataExchangeAssembly dataExchange, Map map){
        Map rparams = (Map) dataExchange.getBusinessData("params");
        Map oldMap = new HashMap(rparams);
        List<GenericResult> resultList = new ArrayList<GenericResult>();
        List<AtomEntity> atomList = ConfigLoadUtil.serviceMap.get(serviceCode);
        if(atomList == null || atomList.size() < 1){
            throw new AtomException(-20000,
                    "功能号【" + serviceCode + "】不存在", FrameworkConstants.ATOM_LVL);
        }
        try {
            for (int i = 0,atomListLen=atomList.size(); i < atomListLen; i ++){
                ClassUtil atom = ConfigLoadUtil.atomMap.get(atomList.get(i).getBusinessCode());
                Map params = (Map) dataExchange.getBusinessData("params");
                Map commParams = (Map) dataExchange.getBusinessData("commParams");

                if(map!=null){
                    params.putAll(map);
                    dataExchange.setBusinessData("params", params);
                }
                commParams.put("SERVER_ID", serviceCode);
                dataExchange.setBusinessData("params", params);
                dataExchange.setBusinessData("commParams", commParams);
                if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 3){
                    Class<?> clazz = Class.forName(atom.getClazzName());
                    Object obj = clazz.newInstance();
                    Method method = clazz.getMethod(atom.getMethodName(), dataExchange.getClass());
                    Object result = method.invoke(obj, dataExchange);
                    GenericResult genericResult = (GenericResult)result;
                    resultList.add(genericResult);
                }else if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 1){
                    GenericResult result = new GenericResult();
                    String bex = ConfigLoadUtil.bexMap.get(atomList.get(i).getBusinessCode());
                    int iRetCode = FrameDao.doBexCall(bex, params, commParams, result);
                    if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                        throw new AtomException(-30000, "反射调用失败",
                                FrameworkConstants.BIZ_LVL);
                    }
                    resultList.add(result);
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        if(resultList.get(0).getFlag()==null||!resultList.get(0).getFlag().equals("0")){
            throw new AtomException(Integer.parseInt(resultList.get(0).getFlag()),resultList.get(0).getPrompt(), FrameworkConstants.ATOM_LVL);
        }
       dataExchange.setBusinessData("params",oldMap);
       return resultList.get(0).getDataList();
    }

    /**
     * 只声明异常，不抛出异常
     * @param serviceCode
     * @param dataExchange
     * @param map
     * @return
     * @throws Exception
     */
    public static List<Map> reflectThrowsException(String serviceCode, DataExchangeAssembly dataExchange, Map map) throws ClassNotFoundException,InstantiationException,IllegalAccessException,NoSuchMethodException,InvocationTargetException{
        Map rparams = (Map) dataExchange.getBusinessData("params");
        Map oldMap = new HashMap(rparams);
        List<GenericResult> resultList = new ArrayList<GenericResult>();
        List<AtomEntity> atomList = ConfigLoadUtil.serviceMap.get(serviceCode);
        if(atomList == null || atomList.size() < 1){
            throw new AtomException(-20000,
                    "功能号【" + serviceCode + "】不存在", FrameworkConstants.ATOM_LVL);
        }
        for (int i = 0,atomListLen=atomList.size(); i < atomListLen; i ++){
            ClassUtil atom = ConfigLoadUtil.atomMap.get(atomList.get(i).getBusinessCode());
            Map params = (Map) dataExchange.getBusinessData("params");
            Map commParams = (Map) dataExchange.getBusinessData("commParams");

            if(map!=null){
                params.putAll(map);
                dataExchange.setBusinessData("params", params);
            }
            commParams.put("SERVER_ID", serviceCode);
            dataExchange.setBusinessData("params", params);
            dataExchange.setBusinessData("commParams", commParams);
            if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 3){
                Class<?> clazz = Class.forName(atom.getClazzName());
                Object obj = clazz.newInstance();
                Method method = clazz.getMethod(atom.getMethodName(), dataExchange.getClass());
                Object result = method.invoke(obj, dataExchange);
                GenericResult genericResult = (GenericResult)result;
                resultList.add(genericResult);
            }else if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 1){
                GenericResult result = new GenericResult();
                String bex = ConfigLoadUtil.bexMap.get(atomList.get(i).getBusinessCode());
                int iRetCode = FrameDao.doBexCall(bex, params, commParams, result);
                if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                    throw new AtomException(-30000, "反射调用失败",
                            FrameworkConstants.BIZ_LVL);
                }
                resultList.add(result);
            }
        }
        if(resultList.get(0).getFlag()==null||!resultList.get(0).getFlag().equals("0")){
            throw new AtomException(Integer.parseInt(resultList.get(0).getFlag()),resultList.get(0).getPrompt(), FrameworkConstants.ATOM_LVL);
        }
       dataExchange.setBusinessData("params",oldMap);
       return resultList.get(0).getDataList();
    }

    /**
     * by hurf 只使用新的入参
     * @param serviceCode
     * @param dataExchange
     * @param map
     * @return
     */
    public static List<Map> reflectThrowExceptionNoOldParams(String serviceCode, DataExchangeAssembly dataExchange, Map map){
        Map oldParams = (Map) dataExchange.getBusinessData("params");
        if(map==null){
            map= new HashMap();
        }
        List<GenericResult> resultList = new ArrayList<GenericResult>();
        List<AtomEntity> atomList = ConfigLoadUtil.serviceMap.get(serviceCode);
        if(atomList == null || atomList.size() < 1){
            throw new AtomException(-20000,
                    "功能号【" + serviceCode + "】不存在", FrameworkConstants.ATOM_LVL);
        }
        try {
            for (int i = 0,atomListLen=atomList.size(); i < atomListLen; i ++){
                ClassUtil atom = ConfigLoadUtil.atomMap.get(atomList.get(i).getBusinessCode());
                Map params = new HashMap(map);
                Map commParams = (Map) dataExchange.getBusinessData("commParams");
                commParams.put("SERVER_ID", serviceCode);
                dataExchange.setBusinessData("params", params);
                dataExchange.setBusinessData("commParams", commParams);
                if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 3){
                    Class<?> clazz = Class.forName(atom.getClazzName());
                    Object obj = clazz.newInstance();
                    Method method = clazz.getMethod(atom.getMethodName(), dataExchange.getClass());
                    Object result = method.invoke(obj, dataExchange);
                    GenericResult genericResult = (GenericResult)result;
                    resultList.add(genericResult);
                }else if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 1){
                    GenericResult result = new GenericResult();
                    String bex = ConfigLoadUtil.bexMap.get(atomList.get(i).getBusinessCode());
                    int iRetCode = FrameDao.doBexCall(bex, params, commParams, result);
                    if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                        throw new AtomException(-30000,"反射调用失败",
                                FrameworkConstants.BIZ_LVL);
                    }
                    resultList.add(result);
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        if(resultList.get(0).getFlag()==null||!resultList.get(0).getFlag().equals("0")){
            throw new AtomException(Integer.parseInt(resultList.get(0).getFlag()),resultList.get(0).getPrompt(), FrameworkConstants.ATOM_LVL);
        }
       dataExchange.setBusinessData("params",oldParams);
       return resultList.get(0).getDataList();
    }

    public static GenericResult reflectNo(String serviceCode, DataExchangeAssembly dataExchange, Map map){
        Map rparams = (Map) dataExchange.getBusinessData("params");
        List<GenericResult> resultList = new ArrayList<GenericResult>();
        List<AtomEntity> atomList = ConfigLoadUtil.serviceMap.get(serviceCode);
        if(atomList == null || atomList.size() < 1){
            throw new AtomException(-20000,
                    "功能号【" + serviceCode + "】不存在", FrameworkConstants.ATOM_LVL);
        }
        try {
            for (int i = 0,atomListLen=atomList.size(); i < atomListLen; i ++){
                ClassUtil atom = ConfigLoadUtil.atomMap.get(atomList.get(i).getBusinessCode());
                Map params = (Map) dataExchange.getBusinessData("params");
                Map commParams = (Map) dataExchange.getBusinessData("commParams");
                if(map!=null){
                    params.putAll(map);
                    dataExchange.setBusinessData("params", params);
                }
                commParams.put("SERVER_ID", serviceCode);
                dataExchange.setBusinessData("params", params);
                dataExchange.setBusinessData("commParams", commParams);
                if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 3){
                    Class<?> clazz = Class.forName(atom.getClazzName());
                    Object obj = clazz.newInstance();
                    Method method = clazz.getMethod(atom.getMethodName(), dataExchange.getClass());
                    Object result = method.invoke(obj, dataExchange);
                    GenericResult genericResult = (GenericResult)result;
                    resultList.add(genericResult);
                }else if(atomList != null && atomList.size() > 0 && atomList.get(i).getBusinessType() == 1){
                    GenericResult result = new GenericResult();
                    String bex = ConfigLoadUtil.bexMap.get(atomList.get(i).getBusinessCode());
                    int iRetCode = FrameDao.doBexCall(bex, params, commParams, result);
                    if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                        throw new AtomException(-30000, "反射调用失败",
                                FrameworkConstants.BIZ_LVL);
                    }
                    resultList.add(result);
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        GenericResult fgr= resultList.get(0);
        if(fgr.getFlag()==null||!fgr.getFlag().equals("0")){
            throw new AtomException(Integer.parseInt(fgr.getFlag()),fgr.getPrompt(), FrameworkConstants.ATOM_LVL);
        }
        dataExchange.setBusinessData("params",rparams);
        return fgr;
    }

}
