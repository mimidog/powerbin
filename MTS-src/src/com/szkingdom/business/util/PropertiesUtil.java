package com.szkingdom.business.util;

import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.ResourceBundle;


public class PropertiesUtil {
    protected static ResourceBundle res;
    protected static Map<String, String> map;

    protected static Properties properties = new Properties();

    public static String getValue(String path, String key) {
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(path);
            properties.load(fileInputStream);
            return properties.getProperty(key);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Map getBusiness(String path,String key){
        String values = getValue(path,key);
        String value[] = values.split(",");
        map = new HashMap<String, String>();
        for(int i = 0; i < value.length; i ++){
            map.put(value[i], value[i]);
        }
        return map;
    }
}
