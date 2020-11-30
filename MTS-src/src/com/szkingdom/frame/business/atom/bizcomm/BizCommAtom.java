package com.szkingdom.frame.business.atom.bizcomm;

import com.szkingdom.frame.business.atom.basic.FrameDao;
import com.szkingdom.frame.business.atom.exchange.DataExchangeAssembly;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
public class BizCommAtom {
    public static int KUI_CREATELVL(Map<String, String> params, String[] outParams){
        int iRetCode = 0;
        try {
            GenericResult genericResult = new GenericResult();
            String lvlFld = (String)params.get("LVL_FLD");
            String tbName = (String)params.get("TB_NAME");
            String pidFld = (String)params.get("PID_FLD");
            String idFld = (String)params.get("ID_FLD");
            String pid = (String)params.get("PID");
            if ((lvlFld == null) || (tbName == null) || (pidFld == null) || (pid == null) || (idFld == null))
            {
                throw new AtomException(-700010, "KUI_CREATELVL级别计算函数缺少必要参数", "2");
            }

            int ret = FrameDao.doBexCall("frameParMaxLvlQuery", params, genericResult);

            if (ret != 0) {
                throw new AtomException(-700011, "KUI_CREATELVL级别计算函数执行失败", "2");
            }

            String newLvl = "0000000000000000000000";
            int lvlLen = Integer.parseInt((String)params.get("LVL_LEN"));
            if ((genericResult.getDataList() != null) && (genericResult.getDataList().size() > 0) && (genericResult.getDataList().get(0) != null))
            {
                String maxLvl = ObjectUtils.toString(((Map)genericResult.getDataList().get(0)).get("MAX_LVL"));

                String pLvl = ObjectUtils.toString(((Map)genericResult.getDataList().get(0)).get("PAR_LVL"));

                if (StringUtils.isEmpty(pLvl))
                    pLvl = "";
                if (StringUtils.isNotEmpty(maxLvl))
                {
                    int iMax = Integer.parseInt(maxLvl.substring(maxLvl.length() - lvlLen, maxLvl.length()));

                    iMax++; newLvl = newLvl + iMax;
                } else {
                    newLvl = newLvl + "1";
                }
                outParams[0] = (pLvl + newLvl.substring(newLvl.length() - lvlLen, newLvl.length()));
            }
            else
            {
                newLvl = newLvl + "1";
                outParams[0] = newLvl.substring(newLvl.length() - lvlLen, newLvl.length());
            }
        }
        catch (AtomException exception) {
            iRetCode = exception.getErrorCode();
            outParams[0] = null;
        }
        return iRetCode;
    }
    public static int KUI_SEQNEXTVAL(Map<String, Object> params, String seqAttr, String[] outParams){
        int iRetCode = 0;
        try {
            GenericResult genericResult = new GenericResult();
            String seqName = (String)params.get("SEQ_NAME");
            String seqBex = (String)params.get("SEQ_BEX");
            if (StringUtils.isNotEmpty(seqAttr)) {
                seqName = seqAttr;
                params.put("SEQ_NAME", seqName);
            }

            if ((seqName == null) || ("".equals(seqName))) {
                throw new AtomException(-700010, "KUI_SEQNEXTVAL函数缺少必要参数", "2");
            }

            String dsType = String.valueOf(CustomizedPropertyPlaceholderConfigurer.getContextProperty("ds.type"));

            if ("null".equals(dsType)) {
                dsType = "ORACLE";
            }
            int ret = 0;
            if (dsType.equals("ORACLE"))
            {
                if (StringUtils.isEmpty(seqBex)) {
                    ret = FrameDao.doBexCall("FRAMESEQ_ORA", params, genericResult);
                }
                else {
                    ret = FrameDao.doBexCall(seqBex + "_ORA", params, genericResult);
                }

            }
            else if (dsType.equals("MSSQL")) {
                if (StringUtils.isEmpty(seqBex)) {
                    ret = FrameDao.doBexCall("FRAMESEQ_MSSQL", params, genericResult);

                    FrameDao.doBexCall("FRAMESEQDELETE_MSSQL", params, null);
                } else {
                    ret = FrameDao.doBexCall(seqBex + "_MSSQL", params, genericResult);

                    FrameDao.doBexCall(seqBex + "DELETE_MSSQL", params, null);
                }
            }
            else if (dsType.equals("MYSQL")) {
                if (StringUtils.isEmpty(seqBex)) {
                    ret = FrameDao.doBexCall("FRAMESEQ_MYSQL", params, genericResult);

                    FrameDao.doBexCall("FRAMESEQDELETE_MYSQL", params, null);
                } else {
                    ret = FrameDao.doBexCall(seqBex + "_MYSQL", params, genericResult);

                    FrameDao.doBexCall(seqBex + "DELETE_MYSQL", params, null);
                }
            }
            else {
                ret = -700000;
                throw new AtomException(-700000, "配置文件ds.type参数配置错误", "2");
            }

            if (ret != 0) {
                throw new AtomException(-700010, "KUI_SEQNEXTVAL函数执行失败", "2");
            }

            String seqId = String.valueOf(((Map)genericResult.getDataList().get(0)).get("ID"));

            params.put("ID", seqId);
            outParams[0] = seqId;
        } catch (AtomException exception) {
            iRetCode = exception.getErrorCode();
            outParams[0] = null;
        }
        return iRetCode;
    }
    public GenericResult COMM_SEQNEXTVAL(DataExchangeAssembly dataExchange){
        try{
            List attr = (List)dataExchange.getBusinessData("attr");

            Map params = (Map)dataExchange.getBusinessData("params");

            String seqName = (String)attr.get(0);
            //返回序列的key值
            String retSeqKey = (String)attr.get(1);

            params.put("SEQ_NAME", seqName);
            String[] seqId = new String[1];
            int retCode = KUI_SEQNEXTVAL(params, (String)attr.get(0), seqId);
            if (retCode != 0) {
                throw new AtomException(-700109, "COMM_SEQNEXTVAL原子业务执行失败", "2");
            }

            List dataList = new ArrayList();
            Map data = new HashMap();
            if(!ObjectUtils.toString(retSeqKey).trim().isEmpty()){
                params.put(retSeqKey,seqId[0]);
            }else{
                data.put("ID", seqId[0]);
            }

            dataList.add(data);
            GenericResult result = new GenericResult("0", "生成序列成功,当前序列号:" + seqId[0]);

            result.setDataList(dataList);
            return result;
        } catch (AtomException exception) {
            return new GenericResult(exception.getErrorCode(), exception.getMessage());
        }

    }
    public  GenericResult COMM_CREATELVL(DataExchangeAssembly dataExchange){
        try {
            List attr = (List)dataExchange.getBusinessData("attr");

            Map params = (Map)dataExchange.getBusinessData("params");

            String parStr = (String)attr.get(0);
            String[] lvlPars = parStr.split(",");
            params.put("TB_NAME", lvlPars[0]);
            params.put("ID_FLD", lvlPars[1]);
            params.put("PID_FLD", lvlPars[2]);
            params.put("LVL_FLD", lvlPars[3]);
            params.put("LVL_LEN", lvlPars[4]);
            String pidFld = lvlPars[5];
            if (pidFld.startsWith("${")) {
                pidFld = pidFld.replaceAll("\\$\\{", "").replaceAll("\\}", "");
                pidFld = (String)params.get(pidFld);
            }
            params.put("PID", pidFld);

            String[] lvl = new String[1];
            int retCode = KUI_CREATELVL(params, lvl);
            if (retCode != 0) {
                throw new AtomException(-700110, "COMM_CREATELVL原子业务执行失败", "2");
            }

            params.put(lvlPars[3], lvl[0]);
            return new GenericResult("0", "生成级别成功,当前级别:" + lvl);

        } catch (AtomException exception) {
            return new GenericResult(exception.getErrorCode(),exception.getMessage());
        }
    }
}
