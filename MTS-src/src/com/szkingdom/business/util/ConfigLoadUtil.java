package com.szkingdom.business.util;


import com.szkingdom.business.common.AtomEntity;
import com.szkingdom.business.util.ClassUtil;
import com.szkingdom.frame.bpm.spring.SpringProcessEngineConfiguration;
import com.szkingdom.frame.business.atom.config.AtomConfigAssembler;
import com.szkingdom.frame.business.bex.config.BexConfigAssembler;
import com.szkingdom.frame.config.ConfigLoader;
import com.szkingdom.frame.service.config.ServiceConfigAssembler;
import org.springframework.context.ApplicationContext;

import java.util.*;


public class ConfigLoadUtil{
    public static ApplicationContext applicationContext = SpringProcessEngineConfiguration.getApplicationContext();
    private static Map<String, ServiceConfigAssembler> serviceConfigAssembler;
    private static Map<String, AtomConfigAssembler> atomConfigAssembler;
    private static Map<String, BexConfigAssembler> bexConfigAssembler;
    public static Map<String, List<AtomEntity>> serviceMap;
    public static Map<String, ClassUtil> atomMap;
    public static Map<String, String> bexMap;

    /**
     * 获取service的配置
     * @param serviceMap
     * @return
     */
    public static Map<String, List<AtomEntity>> getServiceMap(Map<String, ServiceConfigAssembler> serviceMap){
        Map<String, List<AtomEntity>> result = new HashMap<String, List<AtomEntity>>();
        Iterator<Map.Entry<String, ServiceConfigAssembler>> it =  serviceMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, ServiceConfigAssembler> entry = it.next();
            ServiceConfigAssembler serviceConfigAssembler = entry.getValue();
            List<AtomEntity> list = new ArrayList<AtomEntity>();
            for(int i = 0; i < serviceConfigAssembler.getBusinessConfigs().size(); i ++){
                AtomEntity atom = new AtomEntity();
                atom.setBusinessCode(serviceConfigAssembler.getBusinessConfigs().get(i).getBusinessCode());
                atom.setBusinessType(serviceConfigAssembler.getBusinessConfigs().get(i).getBusinessType());
                list.add(atom);
            }
            result.put(entry.getKey(), list);
        }

        return result;
    }

    /**
     * 获取atom配置
     * @param atomMap
     * @return
     */
    public static Map<String, ClassUtil> getAtomMap(Map<String, AtomConfigAssembler> atomMap){
        Map<String, ClassUtil> result = new HashMap<String, ClassUtil>();
        Iterator<Map.Entry<String, AtomConfigAssembler>> it =  atomMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, AtomConfigAssembler> entry = it.next();
            AtomConfigAssembler atomConfigAssembler = entry.getValue();
            ClassUtil clazz = new ClassUtil();
            clazz.setClazzName(atomConfigAssembler.getClazz());
            clazz.setMethodName(atomConfigAssembler.getMethod());
            result.put(entry.getKey(), clazz);
        }
        return result;
    }

    /**
     * 获取bex配置
     * @param bexMap
     * @return
     */
    public static Map<String, String> getBexMap(Map<String, BexConfigAssembler> bexMap){
        Map<String, String> result = new HashMap<String, String>();
        Iterator<Map.Entry<String, BexConfigAssembler>> it =  bexMap.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, BexConfigAssembler> entry = it.next();
            BexConfigAssembler bexConfigAssembler = entry.getValue();
            result.put(entry.getKey(), bexConfigAssembler.getCode());
        }

        return result;
    }

    static {
        ConfigLoader loader = (ConfigLoader) applicationContext.getBean("configLoader");
        serviceConfigAssembler = loader.getServiceConfigMap();
        atomConfigAssembler = loader.getAtomConfigMap();
        bexConfigAssembler = loader.getBexConfigMap();
        serviceMap = getServiceMap(serviceConfigAssembler);
        atomMap = getAtomMap(atomConfigAssembler);
        bexMap = getBexMap(bexConfigAssembler);
    }
}
