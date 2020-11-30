package com.szkingdom.business.util;

import com.szkingdom.frame.business.atom.basic.FrameDao;
import com.szkingdom.frame.config.FrameErrorCode;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import com.szkingdom.frame.service.model.GenericResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DBUtil {
    private static int save2DbCountEveryTime = 0;

    public static int savebyGroup(Map<String, String> commParams, GenericResult result, List<Map> listM, String mapsKey,
                                  String bexKey, int errCode, String errMsg, int submitData_sum) {
        int iRetCode =0;
        List<List<Map>> pList = getListsByGroup(listM,submitData_sum);
        Map par = new HashMap();
        for (List<Map> ap:pList){
            par.clear();
            par.put(mapsKey,ap);
            iRetCode = FrameDao.doBexCall(bexKey, par, commParams, result);
            if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                throw new AtomException(errCode, errMsg, FrameworkConstants.BIZ_LVL);
            }
        }
        return iRetCode;
    }

    public static int savebyGroup(Map<String, String> params, Map<String, String> commParams, GenericResult result, List<Map> listM, String mapsKey,
                                  String bexKey, int errCode, String errMsg, int submitData_sum) {
        int iRetCode =0;
        List<List<Map>> pList = getListsByGroup(listM,submitData_sum);
        Map par = new HashMap();
        for (List<Map> ap:pList){
            par.clear();
            par.put(mapsKey,ap);
            par.putAll(params);
            iRetCode = FrameDao.doBexCall(bexKey, par, commParams, result);
            if (iRetCode != FrameErrorCode.ISUCCESS_CODE) {
                throw new AtomException(errCode, errMsg, FrameworkConstants.BIZ_LVL);
            }
        }
        return iRetCode;
    }

    /**
     * 将结果集按照配置的每页大小进行划分
     * @param listM
     * @return
     */
    public static List<List<Map>> getListsByGroup(List<Map> listM,int submitData_sum) {
        if(save2DbCountEveryTime==0){
            save2DbCountEveryTime = submitData_sum;
        }
        //将结果集分成多分插入数据库
        List<Map> listM1 = null;
        List<List<Map>> pList = new ArrayList<List<Map>>();
        for(int i=0,len=listM.size();i<len;i++){
            if((i%save2DbCountEveryTime)==0){
                listM1 = new ArrayList<Map>() ;
                pList.add(listM1);
            }
            listM1.add(listM.get(i));
        }
        return pList;
    }
}
