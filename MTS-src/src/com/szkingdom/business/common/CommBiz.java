package com.szkingdom.business.common;

import com.szkingdom.frame.business.atom.basic.FrameDao;
import com.szkingdom.frame.config.FrameErrorCode;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;

import java.util.List;
import java.util.Map;

public class CommBiz {




    /**
     * 通用bex接口调用
     *
     * @param bexCode    bex接口代码
     * @param params     入参Map
     * @param commParams 公共入参Map
     * @param rs         返回结果集
     * @param errCode    调用错误提示代码
     * @param errMsg     调用错误提示信息
     * @author jinlw 2016-08-18
     */
    public static void commBexCall(String bexCode, Map params, Map commParams, GenericResult rs,
                                   int errCode, String errMsg) {
        doBexCall(bexCode, params, commParams, rs, errCode, errMsg);
    }

    /**
     * bex接口调用
     *
     * @param bexCode    bex接口代码
     * @param params     入参
     * @param commParams 公共入参
     * @param rs         返回结果集
     * @param errCode    调用错误提示代码
     * @param errMsg     调用错误提示信息
     * @author jinlw 2016-08-12
     */
    private static void doBexCall(String bexCode, Map params, Map commParams, GenericResult rs,
                                  int errCode, String errMsg) {
        int iRetCode = -1;
        try {
            //bex接口调用
            iRetCode = FrameDao.doBexCall(bexCode, params, commParams, rs);
            //校验接口调用状态
            if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                //错误信息包装向上抛
                String errSql = ObjectUtils.toString(params.get("_KJDP_SQL"));
                throw new AtomException(-300001, "BEX接口【" + bexCode + "】调用失败！"
                        + (!"".equals(errSql) ? "SQL语句【" + errSql + "】" : "") + "，详情【" + rs.getFlag()
                        + "-" + rs.getPrompt() + "】", FrameworkConstants.BIZ_LVL);
            }

        } catch (AtomException e) {
            //打印错误信息
            e.printStackTrace();
            //获取错误代码
            iRetCode = e.getErrorCode();
        }
        //校验接口调用状态
        if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
            //错误信息包装向上抛
            throw new AtomException(errCode, errMsg + " | BEX接口【" + bexCode + "】失败，详情【" + rs.getPrompt() + "】", FrameworkConstants.ATOM_LVL);
        }
    }

}
