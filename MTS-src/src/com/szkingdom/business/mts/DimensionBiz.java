package com.szkingdom.business.mts;

import com.szkingdom.frame.exception.AtomException;

import java.util.HashMap;
import java.util.Map;

public class DimensionBiz {

    public DimensionBiz(){}

    public static int getDimenssionLvl(String pid, String[] outParams) {
        int iRetCode=0;
        try
        {
            Map<String, String> lvlParam;
            lvlParam = new HashMap();
            lvlParam.put("LVL_FLD", "TRADE_LVL");
            lvlParam.put("TB_NAME", "T_TRADE_CFG");
            lvlParam.put("PID_FLD", "PAR_SUP_ID");
            lvlParam.put("ID_FLD", "TRADE_ID");
            lvlParam.put("PID", pid);
            lvlParam.put("LVL_LEN", "4");
            String[] lvl = new String[1];
            iRetCode =MtsBizcomm.MTS_CREATELVL(lvlParam, lvl);
            if (iRetCode != 0) {
                throw new AtomException(-600011, "【业务操作层异常】:getTradeLvl获取维度级别数据操作失败", "3");
            }
            outParams[0] = lvl[0];
        }
        catch (AtomException exception)
        {
            iRetCode = exception.getErrorCode();
        }
        return iRetCode;
    }


}
