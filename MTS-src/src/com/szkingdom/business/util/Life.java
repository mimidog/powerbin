package com.szkingdom.business.util;


import org.apache.log4j.Level;


public class Life extends Level {
    /**
     *  功能：级别类构造器
     * @param level: 级别值
     * @param levelStr：级别名称
     * @param syslogEquivalent：级别层数
     */
    protected Life(int level, String levelStr, int syslogEquivalent) {
        super(level, levelStr, syslogEquivalent);
    }

    /**
     * 定义log的权重为介于OFF和FATAL之间，便于打印LIFE级别的log
     * OFF:关闭日志级别，
     * FATAL:系统崩溃
     */
    public static final int LIFE_INT = OFF_INT - 10;
    //调用构造方法
    public static final Level LIFE = new Life(LIFE_INT, "LIFE", 10);



}