package com.szkingdom.business.util;

import org.apache.log4j.Logger;

public class CustomLogUtil{
    private static final Logger LOGGER = Logger.getLogger(CustomLogUtil.class);

    /**
     * 功能:写自定义日志方法
     * @param msg ：要打印的消息体。
     */
    public static void writeCustLog(Object msg){
        LOGGER.log(Life.LIFE,msg);
    }

}
