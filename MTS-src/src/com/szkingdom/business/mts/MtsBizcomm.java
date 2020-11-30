package com.szkingdom.business.mts;

import com.szkingdom.frame.business.atom.basic.FrameDao;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;

import java.util.Map;

public class MtsBizcomm {

    public static int MTS_CREATELVL(Map<String, String> params, String[] outParams) {
        int iRetCode = 0;

        try {
            GenericResult genericResult = new GenericResult();
            String lvlFld = (String)params.get("LVL_FLD");
            String tbName = (String)params.get("TB_NAME");
            String pidFld = (String)params.get("PID_FLD");
            String idFld = (String)params.get("ID_FLD");
            String pid = (String)params.get("PID");
            if (lvlFld == null || tbName == null || pidFld == null || pid == null || idFld == null) {
                throw new AtomException(-700010, "KUI_CREATELVL级别计算函数缺少必要参数", "2");
            }

            int ret = FrameDao.doBexCall("mts_frameParMaxLvlQueryBex", params, genericResult);
            if (ret != 0) {
                throw new AtomException(-700011, "KUI_CREATELVL级别计算函数执行失败", "2");
            }

            String newLvl = "0000000000000000000000";
            int lvlLen = Integer.parseInt((String)params.get("LVL_LEN"));
            if (genericResult.getDataList() != null && genericResult.getDataList().size() > 0 && genericResult.getDataList().get(0) != null) {
                String maxLvl = ObjectUtils.toString(((Map)genericResult.getDataList().get(0)).get("MAX_LVL"));
                String pLvl = ObjectUtils.toString(((Map)genericResult.getDataList().get(0)).get("PAR_LVL"));
                if (StringUtils.isEmpty(pLvl)) {
                    pLvl = "";
                }

                if (StringUtils.isNotEmpty(maxLvl)) {
                    int iMax = Integer.parseInt(maxLvl.substring(maxLvl.length() - lvlLen, maxLvl.length()));
                    StringBuilder var10000 = (new StringBuilder()).append(newLvl);
                    ++iMax;
                    newLvl = var10000.append(iMax).toString();
                } else {
                    newLvl = newLvl + "1";
                }

                outParams[0] = pLvl + newLvl.substring(newLvl.length() - lvlLen, newLvl.length());
            } else {
                newLvl = newLvl + "1";
                outParams[0] = newLvl.substring(newLvl.length() - lvlLen, newLvl.length());
            }
        } catch (AtomException var15) {
            iRetCode = var15.getErrorCode();
            outParams[0] = null;
        }

        return iRetCode;
    }
}
