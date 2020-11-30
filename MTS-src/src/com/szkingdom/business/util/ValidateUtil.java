package com.szkingdom.business.common;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public final class ValidateUtil {

    /**
     * 判断字符串是否是整数
     */
    public static boolean isInteger(String value) {
        try {
            Integer.parseInt(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     * 判断字符串是否是浮点数
     */
    public static boolean isDouble(String value) {
        try {
            Double.parseDouble(value);
            if (value.contains("."))
                return true;
            return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     * 判断字符串是否是数字
     */
    public static boolean isNumber(String value) {
        return isInteger(value) || isDouble(value);
    }

    /**
     * 判断是不是客户代码,是就返回true(是数值类型)
     * @param str
     * @return
     */
    public static boolean isCustCode(String str){
        if(str==null||"".equals(str)||str.startsWith("0")){
            return false;
        }
        String regex ="^[0-9]*$";
        return match(regex, str);
    }

    /**
     * 判断一个字符串是不是可以转换成数字
     * @param str
     * @return
     */
    public static boolean isInt(String str){
        String regex ="^[0-9]*$";
        return match(regex, str);
    }

    /**
     * 验证别名(字符与数据同时出现)
     * 别名必须是6到30位的字母和数字
     * @param str 待验证的别名
     * @return 如果是符合格式的别名,返回 <b>true </b>,否则为 <b>false </b>
     */
    public static boolean isUserDname(String str) {
        final String regex = "^[a-zA-Z0-9]{6,30}$";
        return match(regex, str);
    }

    /**
     * 验证输入密码条件(字符与数据同时出现)
     *
     * @param str 待验证的字符串
     * @return 如果是符合格式的字符串,返回 <b>true </b>,否则为 <b>false </b>
     */
    public static boolean IsPassword(String str) {
        String regex = "[A-Za-z]+[0-9]";
        return match(regex, str);
    }

    /**
     * @param regex
     * 正则表达式字符串
     * @param str
     * 要匹配的字符串
     * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
     */
    public static boolean match(String regex, String str) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }
    //检验E账通号是否是88开头的12位纯数字
    public static boolean custNameValidityCheck(String name){
        String regEx = "[0-9]*";//检查是否是纯数字
        Pattern pat = Pattern.compile(regEx);
        Matcher mat = pat.matcher(name);
        if(mat.matches()){
            if(name.length() == 12 && name.startsWith("88")){//检查是否是以88开头，位数为12位
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }

    public static boolean dateFormatValiCheck(String dateStr) {
        if(dateStr != null && isInteger(dateStr) && dateStr.length() <= 8) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            try{
                Date date = dateFormat.parse(dateStr);
                return dateStr.equals(dateFormat.format(date));
            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }
    }
}
