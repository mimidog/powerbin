package com.szkingdom.business.util;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class DateUtil {

    /**
     * @desc 校验日期字符串格式
     * @param dateStr
     * @param fmtStr
     * @return
     */
    public static boolean isFmtDateStr(String dateStr, String fmtStr) {
        ObjectUtil.chkNoNull(dateStr, fmtStr);
        boolean flag = false;
        if(dateStr.length() != fmtStr.length()){
            return flag;
        }
        try {
            SimpleDateFormat dateFormat = (SimpleDateFormat)DateFormat.getDateInstance();
            dateFormat.applyPattern(fmtStr);
            dateFormat.setLenient(false);
            dateFormat.parse(dateStr);
            flag = true;
        } catch (ParseException e) {
            flag = false;
        }
        return flag;
    }


    /**
     * 默认从今天开始days天以后的日期
     * @param days
     * @return
     */
    public static String getPointDay(int days) {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Calendar ca = Calendar.getInstance();
        int day = ca.get(Calendar.DATE);
        ca.set(Calendar.DATE, day + days);
        return format.format(ca.getTime());
    }

    /**
     * 计算指定日期在指定天数之后的日期
     * @param pointDay 指定日期 格式yyyyMMdd
     * @param days 指定天数
     * @return
     */
    public static String getPointDay(String pointDay,int days) {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Calendar ca = Calendar.getInstance();
        Date date = null;
        try {
            date = format.parse(pointDay);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        ca.setTime(date);
        int day = ca.get(Calendar.DATE);
        ca.set(Calendar.DATE, day + days);
        return format.format(ca.getTime());
    }

    /**
     * 获取两年后的今天日期字符串比如：20170618
     *
     * @return
     */
    public static String twoYearsDay() {
        String fmt = "yyMMdd";
        Calendar cal = new GregorianCalendar();
        int year = cal.get(Calendar.YEAR)+2;//yy  直接计算年数+2
        int month = cal.get(Calendar.MONTH) + 1;//MM
        int day = cal.get(Calendar.DATE);//dd
        int hour = cal.get(Calendar.HOUR_OF_DAY);//HH
        int minute = cal.get(Calendar.MINUTE);//mm

        if (fmt.indexOf("yy") != -1) {
            fmt = fmt.replaceAll("yy", String.valueOf(year).substring(0,4));
        }
        if (fmt.indexOf("MM") != -1) {
            fmt = fmt.replaceAll("MM", month < 10 ? "0" + String.valueOf(month)
                    : String.valueOf(month));
        }
        if(fmt.indexOf("HH")!=-1){
            fmt = fmt.replaceAll("HH", hour<10 ? "0" + String.valueOf(hour):String.valueOf(hour));
        }
        if (fmt.indexOf("dd") != -1) {
            fmt = fmt.replaceAll("dd", day < 10 ? "0" + String.valueOf(day)
                    : String.valueOf(day));
        }
        if (fmt.indexOf("mm") != -1) {
            fmt = fmt.replaceAll(
                    "mm",
                    minute < 10 ? "0" + String.valueOf(minute) : String
                            .valueOf(minute));
        }
        return fmt;
    }

    /**
     * 获取当天字符串
     * @return
     */
    public static String today(){
        Date now=new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        return dateFormat.format(now);
    }

    /**
     * 获取现在时间字符串
     * @return
     */
    public static String now(){
        Date now=new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
        return dateFormat.format(now);
    }

    /**
     * 获取当前时间
     * @return
     */
    public static String time(){
        Date now=new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        return dateFormat.format(now);
    }

    /**
     * 获取现在时间秒字符串
     * @return
     */
    public static String nowMinute(){
        Date now=new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HHmmss");
        return dateFormat.format(now);
    }

    /**
     * 获取现在时间毫秒字符串
     * @return
     */
    public static String nowMillisconds(){
        Date now=new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HHmmssSSS");
        return dateFormat.format(now);
    }

    /**
     * 前者>后者，返回1
     * 前者=后者，返回0
     * 前者<后者，返回-1
     * @param s1
     * @param s2
     * @return
     */
    public static int compare(String s1, String s2) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd",Locale.CHINA);
        Date d1 = null;
        Date d2 = null;
        try {
            d1 = simpleDateFormat.parse(s1);
            d2 = simpleDateFormat.parse(s2);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (d1.getTime() > d2.getTime()) {
            return 1;
        } else if(d1.getTime() == d2.getTime()){
            return 0;
        }else{
            return -1;
        }
    }
    /**
     * 获取当前时间的日期时间字符串
     * @return
     */
    public static String getNowTimeStr() {
        return getNowDateStr("yyyyMMddHHmmss");
    }
    /**
     * 获取当前时间的日期字符串
     * @param fmtStr
     * @return
     */
    public static String getNowDateStr(String fmtStr) {
        ObjectUtil.chkNoNull(fmtStr);
        Date date = new Date();
        SimpleDateFormat sDateFmt = (SimpleDateFormat)DateFormat.getInstance();
        sDateFmt.applyPattern(fmtStr);
        return sDateFmt.format(date);
    }


    public static void main(String[] args) {
        /*String time = twoYearsDay();//预定格式为yyMMddHHmm
        System.out.println(time);*/
        System.out.println("增加天数以后的日期：" + getPointDay("20150731",3365));
    }
}
