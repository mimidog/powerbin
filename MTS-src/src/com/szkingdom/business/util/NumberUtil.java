package com.szkingdom.business.util;
import org.apache.commons.lang3.ObjectUtils;
import sun.security.pkcs11.wrapper.CK_SSL3_KEY_MAT_OUT;

import java.math.BigDecimal;
import java.util.regex.Pattern;

/**
 * @DESC 数字帮助类
 */
public class NumberUtil {

    /**
     * @desc 校验是否为数字
     * @param numStr
     * @return
     */
    public static boolean isNumber(String numStr) {
        return patternMatches("^(0|-?[1-9]\\d*||-?(0|[1-9]\\d*)\\.\\d+)$", numStr);
    }

    /**
     * @desc 校验是否为整数
     * @param numStr
     * @return
     */
    public static boolean isInteger(String numStr) {
        return patternMatches("^(0|-?[1-9]\\d*)$", numStr);
    }

    public static Integer parseInteger(String numStr) {
        if(isInteger(numStr)) {
            return Integer.parseInt(numStr);
        } else {
          return 0;
        }
    }

    /**
     * @desc 校验是否为小数
     * @param numStr
     * @return
     */
    public static boolean isDecimals(String numStr) {
        return patternMatches("^-?(0|[1-9]\\d*)\\.\\d+$", numStr);
    }

    /**
     * @desc 解析Double类型字符串
     * @param numStr
     * @return
     */
    public static Double parseDouble(String numStr) {
        if(isNumber(numStr)) {
            return Double.parseDouble(numStr);
        } else {
            return new Double(0);
        }
    }

    /**
     * @desc JAVA正则匹配
     * @param numStr
     * @return
     * @author jinlw 2016-09-09
     */
    private static boolean patternMatches(String patternStr, String numStr) {
        Pattern pattern = Pattern.compile(patternStr);
        return pattern.matcher(numStr).matches();
    }
    /**
     * @method_desc:解析科学计数法，此方法不做判断直接解析
     * @param str :转换符串
     * @param Decimal ：小数位数
     * @return
     */
    public static String parseBigDecimal(String str,int Decimal) {

        return (str.isEmpty() || str.equalsIgnoreCase("null")) ? "":
                new BigDecimal(str).setScale(Decimal, BigDecimal.ROUND_HALF_UP).toPlainString();

    }
    public static String parseBigDecimal(String str) {

        return (str.isEmpty() || str.equalsIgnoreCase("null")) ? "":new BigDecimal(str).toPlainString();

    }

}
